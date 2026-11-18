"""Extract the supplied Warcraft map without modifying its contents."""
import sys, io, json, struct, zlib, bz2, hashlib, subprocess
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent / 'vendor'))
import mpyq

class Archive(mpyq.MPQArchive):
    def read_file(self, name, force_decompress=False):
        h = self.get_hash_table_entry(name)
        if h is None: return None
        b = self.block_table[h.block_table_index]
        self.file.seek(b.offset)
        raw = self.file.read(b.archived_size)
        enc = b.flags & mpyq.MPQ_FILE_ENCRYPTED
        key = self._hash(name.replace('/', '\\').split('\\')[-1], 'TABLE')
        if b.flags & mpyq.MPQ_FILE_FIX_KEY: key = ((key + b.offset) ^ b.size) & 0xffffffff
        def decrypt(data, k):
            n = len(data) // 4 * 4
            return self._decrypt(data[:n], k & 0xffffffff) + data[n:]
        def unpack(data, expected):
            if len(data) >= expected: return data
            mode, data = data[0], data[1:]
            if mode == 2: return zlib.decompress(data)
            if mode == 16: return bz2.decompress(data)
            if mode == 8: return subprocess.run(['node',str(Path(__file__).parent/'explode.cjs')],input=data,stdout=subprocess.PIPE,stderr=subprocess.PIPE,check=True).stdout
            raise ValueError(f'{name}: unsupported compression {mode}')
        if b.flags & mpyq.MPQ_FILE_SINGLE_UNIT:
            if enc: raw = decrypt(raw, key)
            return unpack(raw,b.size) if b.flags & mpyq.MPQ_FILE_COMPRESS else raw
        size = 512 << self.header['sector_size_shift']
        count = (b.size + size - 1) // size
        if not b.flags & (mpyq.MPQ_FILE_COMPRESS | mpyq.MPQ_FILE_IMPLODE):
            return b''.join(decrypt(raw[i*size:(i+1)*size],key+i) if enc else raw[i*size:(i+1)*size] for i in range(count))
        table_size = (count + 1 + bool(b.flags & mpyq.MPQ_FILE_SECTOR_CRC))*4
        table = decrypt(raw[:table_size],key-1) if enc else raw[:table_size]
        offsets = struct.unpack('<' + 'I'*(table_size//4),table)
        output=[]
        for i in range(count):
            part=raw[offsets[i]:offsets[i+1]]
            if enc: part=decrypt(part,key+i)
            output.append(unpack(part,min(size,b.size-i*size)))
        return b''.join(output)

root=Path(__file__).resolve().parents[1]/'content'/'original-3.0'
source=root/'source'/'map.w3x'
data=source.read_bytes()
archive=Archive(io.BytesIO(data[data.index(b'MPQ\x1a'):]),listfile=False)
names=set(['(listfile)','war3map.j','Scripts\\war3map.j','war3map.w3i','war3map.wts','war3map.w3u','war3map.w3t','war3map.w3a','war3map.w3b','war3map.w3d','war3map.w3h','war3map.w3q','war3map.w3e','war3map.doo','war3mapUnits.doo','war3map.wpm','war3map.w3r','war3map.w3s','war3map.imp','war3mapMap.blp','war3mapPreview.tga'])
listing=archive.read_file('(listfile)')
if listing: names.update(listing.decode('utf-8',errors='replace').splitlines())
manifest={'sha256':hashlib.sha256(data).hexdigest(),'sourceBytes':len(data),'archiveHeader':{k:(v.hex() if isinstance(v,bytes) else v) for k,v in archive.header.items()},'files':[],'errors':[]}
for name in sorted(names):
    try:
        content=archive.read_file(name)
        if content is None: continue
        target=root/'extracted'/name.replace('\\','/')
        if not target.resolve().is_relative_to((root/'extracted').resolve()): raise ValueError('invalid path')
        target.parent.mkdir(parents=True,exist_ok=True)
        target.write_bytes(content)
        manifest['files'].append({'name':name,'bytes':len(content),'sha256':hashlib.sha256(content).hexdigest()})
    except Exception as e: manifest['errors'].append({'name':name,'error':str(e)})
(root/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(manifest,ensure_ascii=True,indent=2))

import struct,json,random,collections
from pathlib import Path
from PIL import Image,ImageDraw
ROOT=Path(__file__).resolve().parents[1];BASE=ROOT/'content'/'original-3.0'
b=(BASE/'extracted'/'war3map.w3e').read_bytes();pos=13
def uint():
    global pos
    n=struct.unpack_from('<I',b,pos)[0];pos+=4;return n
def ids():
    global pos
    n=uint();out=[b[pos+i*4:pos+i*4+4].decode('ascii') for i in range(n)];pos+=4*n;return out
tiles=ids();cliffs=ids();w,h=uint(),uint();ox,oy=struct.unpack_from('<ff',b,pos);pos+=8
heights=[];textures=[];textureVariations=[];cliffLevels=[];cliffTypes=[];waterHeights=[];terrainFlags=[]
for i in range(w*h):
    ground,water,flags,variation,cliff=struct.unpack_from('<HHBBB',b,pos);pos+=7
    heights.append((ground-8192)/4+((cliff&15)-2)*128);textures.append(flags&15);textureVariations.append(variation);cliffLevels.append(cliff&15);cliffTypes.append(cliff>>4);waterHeights.append(None if not water&0x4000 else ((water&0x3fff)-8192)/4);terrainFlags.append(flags)
p=(BASE/'extracted'/'war3map.wpm').read_bytes();pw,ph=struct.unpack_from('<II',p,8)
out={'width':w,'height':h,'offset':[ox,oy],'tileSize':128,'tiles':tiles,'cliffs':cliffs,'heights':heights,'textures':textures,'textureVariations':textureVariations,'cliffLevels':cliffLevels,'cliffTypes':cliffTypes,'waterHeights':waterHeights,'terrainFlags':terrainFlags,'pathing':{'width':pw,'height':ph,'cell':32,'flags':list(p[16:])}}
terrain_json=json.dumps(out,separators=(',',':'))
(BASE/'terrain.json').write_text(terrain_json,encoding='utf-8')
public_map=ROOT/'public'/'map';public_map.mkdir(parents=True,exist_ok=True)
(public_map/'terrain.json').write_text(terrain_json,encoding='utf-8')
assets=ROOT/'public'/'assets';assets.mkdir(exist_ok=True)
palette=[(110,86,58),(91,80,61),(93,103,64),(81,83,70),(65,92,53),(76,92,54)]
im=Image.new('RGB',((w-1)*8,(h-1)*8));draw=ImageDraw.Draw(im);rng=random.Random(301)
for y in range(h-1):
    for x in range(w-1):
        color=palette[textures[y*w+x]%len(palette)];level=cliffLevels[y*w+x]
        for dy in range(8):
            for dx in range(8):
                noise=rng.randint(-12,12);v=tuple(max(0,min(255,c+noise+int(heights[y*w+x]/70))) for c in color);im.putpixel((x*8+dx,(h-2-y)*8+dy),v)
im.save(assets/'terrain.png')
print(json.dumps({'dimensions':[w,h],'offset':[ox,oy],'tileTypes':tiles,'heightRange':[min(heights),max(heights)],'pathFlags':dict(collections.Counter(p[16:]))}))

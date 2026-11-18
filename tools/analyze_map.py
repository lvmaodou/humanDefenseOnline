import re,json,struct,hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
BASE=ROOT/'content'/'original-3.0'
EX=BASE/'extracted'
def text(p):
    raw=p.read_bytes()
    try:s=raw.decode('utf-8')
    except UnicodeDecodeError:s=raw.decode('gb18030',errors='replace')
    return s.replace('\r\n','\n').replace('\r','\n')
def slk(p):
    cells={};x=y=1
    for line in text(p).splitlines():
        if not line.startswith('C;'):continue
        # Semicolons in quoted tooltip strings are part of the value.
        fields=re.findall(r'(?:[^;"\n]|"(?:[^"]|"")*")+',line)
        for part in fields[1:]:
            if part.startswith('X'):x=int(part[1:])
            elif part.startswith('Y'):y=int(part[1:])
            elif part.startswith('K'):
                v=part[1:]
                if v.startswith('"'):v=v[1:-1].replace('""','"')
                else:
                    try:v=float(v) if '.' in v else int(v)
                    except ValueError:pass
                cells[x,y]=v
    headers={x:v for (x,y),v in cells.items() if y==1}
    rows={}
    for (x,y),v in cells.items():
        if y>1:rows.setdefault(y,{})[headers.get(x,str(x))]=v
    return {str(next(iter(row.values()))):row for row in rows.values()}
def ini(p):
    sections={};current=None
    for line in text(p).splitlines():
        if line.startswith('['):current=line[1:line.index(']')];sections.setdefault(current,{})
        elif current and '=' in line and not line.startswith('//'):
            k,v=line.split('=',1);sections[current][k]=v.strip().strip('"')
    return sections
tables={}
for p in (EX/'units').glob('*'):
    if p.suffix=='.slk':tables[p.stem]=slk(p)
    elif p.suffix=='.txt':tables[p.stem]=ini(p)
units={}
for name in ['unitdata','unitbalance','unitui','unitweapons','unitabilities','campaignunitfunc']:
    for id,row in tables.get(name,{}).items():units.setdefault(id,{}).update(row)
items={}
for name in ['itemdata','itemfunc']:
    for id,row in tables.get(name,{}).items():items.setdefault(id,{}).update(row)
def objectmod(path,levels):
    b=path.read_bytes();pos=4;out={}
    def i():
        nonlocal pos
        v=struct.unpack_from('<i',b,pos)[0];pos+=4;return v
    def raw():
        nonlocal pos
        v=b[pos:pos+4].decode('latin1');pos+=4;return v
    def string():
        nonlocal pos
        end=b.index(0,pos);v=b[pos:end];pos=end+1
        try:return v.decode('utf-8')
        except:return v.decode('gb18030',errors='replace')
    for table in range(2):
        for _ in range(i()):
            old,new=raw(),raw();key=new if new!='\0'*4 else old
            row={'base':old,'id':key,'fields':{}}
            for _ in range(i()):
                field,typ=raw(),i();level,pointer=(i(),i()) if levels else (0,0)
                if typ==0:value=i()
                elif typ in (1,2):value=struct.unpack('<f',struct.pack('<i',i()))[0]
                elif typ==3:value=string()
                else:raise ValueError(typ)
                raw();row['fields'].setdefault(field,{})[str(level)]=value
            out[key]=row
    return out
abilities=objectmod(EX/'war3map.w3a',True)
doodads=objectmod(EX/'war3map.w3b',False)
s=text(EX/'war3map.j');(BASE/'script.j').write_text(s,encoding='utf-8')
funcs=dict(re.findall(r'function\s+(\w+)\s+takes\s+([^\n]+)\n(.*?)endfunction',s,re.S)) if False else {}
for m in re.finditer(r'^function (\w+) takes (.*?) returns (\w+)\n(.*?)^endfunction',s,re.M|re.S):funcs[m[1]]={'args':m[2],'return':m[3],'body':m[4]}
calls=set(re.findall(r'(?<![\w])([A-Za-z_]\w*)\s*\(',re.sub(r'"(?:\\.|[^"\\])*"','""',s)));native=sorted(calls-set(funcs)-{'if','elseif','return','exitwhen','loop','not','and','or','function'})
arrays={}
for m in re.finditer(r"set udg_(\w+)\[(\d+)\]=('([^']{4})'|\"([^\"]*)\"|([\d.]+))",s):arrays.setdefault(m[1],{})[m[2]]=m[4] or m[5] or m[6]
def seq(name,idx):return re.findall(rf"set udg_{name}\[udg_{idx}\]='(.{{4}})'",s)
waves=seq('EnemyType','i');bosses=seq('BossType','j')
rects={m[1]:list(map(float,m.groups()[1:])) for m in re.finditer(r'set (gg_rct_\w+)=Rect\(([-\d.]+),([-\d.]+),([-\d.]+),([-\d.]+)\)',s)}
out={'source':{'name':'人族无敌III 3.0终极版','sha256':hashlib.sha256((BASE/'source'/'map.w3x').read_bytes()).hexdigest()},'units':units,'items':items,'abilities':abilities,'abilityData':tables.get('abilitydata',{}),'abilityStrings':tables.get('campaignabilitystrings',{}),'upgrades':tables.get('upgradedata',{}),'upgradeStrings':tables.get('neutralupgradestrings',{}),'arrays':arrays,'waveUnits':waves,'bossUnits':bosses,'rects':rects,'doodads':doodads}
(BASE/'data.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8')
(BASE/'functions.json').write_text(json.dumps(funcs,ensure_ascii=False,indent=2),encoding='utf-8')
(BASE/'native-api.json').write_text(json.dumps(native,indent=2),encoding='utf-8')
summary={'units':len(units),'items':len(items),'abilities':len(abilities),'abilityData':len(out['abilityData']),'waves':len(waves),'bosses':len(bosses),'functions':len(funcs),'natives':len(native),'rects':len(rects),'classes':arrays.get('zhiyexuanze',{}),'nativeNames':native}
(BASE/'analysis.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(summary,ensure_ascii=True,indent=2))

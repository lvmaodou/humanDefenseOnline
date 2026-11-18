"""Compile this map's JASS into generator functions; waits use simulation time."""
import json,re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
BASE=ROOT/'content'/'original-3.0'
source=(BASE/'script.j').read_text(encoding='utf-8')
functions=json.loads((BASE/'functions.json').read_text(encoding='utf-8'))
types={};returns={n:f['return'] for n,f in functions.items()}
for n in ['GetRandomInt','GetPlayerId','GetConvertedPlayerId','GetUnitTypeId','GetItemTypeId','GetUnitUserData','GetUnitFoodUsed','GetUnitPointValue','GetForLoopIndexA','GetForLoopIndexB','GetPlayerState','GetUnitAbilityLevel','GetSpellAbilityId','GetIssuedOrderIdBJ','GetStoredInteger','R2I','ModuloInteger','CountPlayersInForceBJ','RandomDistChoose','ChooseRandomItemBJ','ChooseRandomItemEx']:returns[n]='integer'
for n in ['GetRandomReal','GetUnitFacing','GetUnitStateSwap','DistanceBetweenPoints','GetRandomDirectionDeg','I2R','GetCameraMargin']:returns[n]='real'
for n in ['I2S','GetUnitName','GetPlayerName']:returns[n]='string'
token_re=re.compile(r'\s+|//[^\n]*|"(?:\\.|[^"\\])*"|\x27[^\x27]*\x27|\$[0-9a-fA-F]+|(?:\d+\.\d*|\.\d+|\d+)(?:[eE][+-]?\d+)?|[A-Za-z_]\w*|==|!=|>=|<=|[\S]')
class Expr:
    def __init__(self,s,local):self.t=[m[0] for m in token_re.finditer(s) if not m[0].isspace() and not m[0].startswith('//')];self.i=0;self.local=local
    def take(self):v=self.t[self.i];self.i+=1;return v
    def peek(self):return self.t[self.i] if self.i<len(self.t) else ''
    def expect(self,v):
        got=self.take()
        if got!=v:raise ValueError((got,v,self.t))
    def expr(self,minp=0):
        t=self.take()
        if t in ('not','-','+'):
            a,typ=self.expr(7);a=f'({"!" if t=="not" else t}{a})'
        elif t=='(':
            a,typ=self.expr();self.expect(')')
        elif t=='function':a=json.dumps(self.take());typ='code'
        elif t.startswith('"'):
            # JASS escape sequences match JSON, with literal embedded newlines allowed.
            raw=t[1:-1];raw=raw.replace('\n','\\n').replace('\r','\\r').replace('\t','\\t')
            a='"'+raw+'"';typ='string'
        elif t.startswith("'"):
            a=str(int.from_bytes(t[1:-1].encode('latin1'),'big'));typ='integer'
        elif t.startswith('$'):a=str(int(t[1:],16));typ='integer'
        elif re.match(r'^(\d|\.)',t):a=t if not t.endswith('.') else t+'0';typ='real' if '.' in t else 'integer'
        elif t in ('true','false','null'):a=t;typ='boolean' if t!='null' else 'handle'
        else:
            if self.peek()=='(':
                self.take();args=[]
                if self.peek()!=')':
                    while True:
                        args.append(self.expr()[0])
                        if self.peek()!=',':break
                        self.take()
                self.expect(')');a=f'(yield* V.call({json.dumps(t)}{"," if args else ""}{",".join(args)}))';typ=returns.get(t,'handle')
            else:
                a=t if t in self.local else f'G.{t}';typ=self.local.get(t,types.get(t,'integer'))
                if self.peek()=='[':
                    self.take();idx=self.expr()[0];self.expect(']');a+=f'[{idx}]'
        precedence={'or':1,'and':2,'==':3,'!=':3,'>':4,'<':4,'>=':4,'<=':4,'+':5,'-':5,'*':6,'/':6}
        while self.peek() in precedence and precedence[self.peek()]>=minp:
            op=self.take();b,bt=self.expr(precedence[op]+1)
            if op=='/' and typ==bt=='integer':a=f'V.idiv({a},{b})';typ='integer'
            else:
                a=f'({a} { {"or":"||","and":"&&","==":"===","!=":"!=="}.get(op,op)} {b})'
                if op in ('and','or','==','!=','>','<','>=','<='):typ='boolean'
                elif typ=='string' or bt=='string':typ='string'
                elif typ=='real' or bt=='real':typ='real'
        return a,typ
    def result(self):
        out=self.expr()[0]
        if self.i!=len(self.t):raise ValueError(('unparsed',self.t[self.i:]))
        return out
def expr(s,local):return Expr(s,local).result()
def default(typ):return '0' if typ in ('integer','real') else 'false' if typ=='boolean' else '""' if typ=='string' else 'null'
global_lines=source[source.index('globals')+7:source.index('endglobals')].splitlines()
globals=[]
for line in global_lines:
    m=re.match(r'(\w+)\s+(array\s+)?(\w+)(?:=(.*))?$',line.strip())
    if not m:continue
    typ,arr,n,value=m.groups();types[n]=typ
    globals.append((n,arr,typ,value))
out=['// Generated from the supplied map; regenerate with tools/compile_jass.py.','export function install(V) {','const G=V.globals;','const F=V.functions;']
out.append('F.__globals = function* () {')
for n,arr,typ,value in globals:
    out.append(f'G.{n} = '+(f'V.array({default(typ)})' if arr else expr(value,{}) if value else default(typ))+';')
out.append('};')
count=0
for name,f in functions.items():
    args=[];local={}
    if f['args']!='nothing':
        for a in f['args'].split(','):
            typ,n=a.split();args.append(n);local[n]=typ
    out.append(f'F.{name}=function* ({",".join(args)}) {{')
    # Source statements are newline separated except multiline string literals.
    lines=[];buf='';quoted=False;escape=False
    for c in f['body']:
        if c=='"' and not escape:quoted=not quoted
        if c=='\n' and not quoted:lines.append(buf.strip());buf=''
        else:buf+=c
        escape=(c=='\\' and not escape)
    if buf.strip():lines.append(buf.strip())
    for line in lines:
        if not line or line.startswith('//'):continue
        try:
            if line.startswith('local '):
                m=re.match(r'local (\w+) (array )?(\w+)(?:=(.*))?',line);typ,arr,n,value=m.groups();local[n]=typ
                code=f'let {n} = '+(f'V.array({default(typ)})' if arr else expr(value,local) if value else default(typ))+';'
            elif line.startswith('set '):
                target,value=line[4:].split('=',1);code=f'{expr(target,local)} = {expr(value,local)};'
            elif line.startswith('call '):code=expr(line[5:],local)+';'
            elif line.startswith('if'):code='if ('+expr(re.sub(r'then$','',line[2:]).strip(),local)+') {'
            elif line.startswith('elseif'):code='} else if ('+expr(re.sub(r'then$','',line[6:]).strip(),local)+') {'
            elif line=='else':code='} else {'
            elif line=='endif':code='}'
            elif line=='loop':code='while (V.guard()) {'
            elif line=='endloop':code='}'
            elif line.startswith('exitwhen'):code='if ('+expr(line[8:],local)+') break;'
            elif line.startswith('return'):code='return '+(expr(line[6:].strip(),local) if line[6:].strip() else '')+';'
            else:raise ValueError('unknown statement')
            out.append(code)
        except Exception as e:raise ValueError(f'{name}: {line}: {e}') from e
    out.append('};');count+=1
out.append('}')
target=ROOT/'engine'/'map-script.js';target.parent.mkdir(exist_ok=True)
target.write_text('\n'.join(out),encoding='utf-8')
print(f'Compiled {count} functions and {len(globals)} globals to {target.name}')

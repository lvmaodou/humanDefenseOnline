import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {Runtime,fourCC,rawId} from '../engine/runtime.js';
import {abilityControls} from '../engine/ability-data.js';
import {targetMask} from '../engine/targeting.js';
import {professionRoster,modelPath} from './audit_professions.mjs';

const read=async path=>JSON.parse(await readFile(new URL(path,import.meta.url),'utf8'));
const [data,functions,manifest,gameplay]=await Promise.all([
  read('../content/original-3.0/data.json'),read('../content/original-3.0/functions.json'),
  read('../public/warcraft/manifest.json'),read('../content/original-3.0/gameplay.json')
]);
const advance=(game,seconds)=>{const end=game.time+seconds;while(game.time<end-.000001)game.tick(Math.min(.05,end-game.time));};
const report={sourceSha256:createHash('sha256').update(await readFile(new URL('../content/original-3.0/source/map.w3x',import.meta.url))).digest('hex'),
  scenario:'Each form independently runs the archived profession triggers for 8 seconds, then exercises its initial active commands and runs 3 more seconds. This verifies project execution; it is not a Warcraft client equivalence recording.',professions:[]};

for(const [index,roster] of professionRoster(data,functions).entries()){
  const row={name:roster.name,prefix:roster.prefix,buildings:[],errors:[],missingModels:[]};
  for(const type of roster.buildings){
    const entry={type,name:data.units[type].Name,damageEvents:0,attackEvents:0,spellCodes:{},summons:{},commands:[],errors:[],missingModels:[]};
    try{
      const game=new Runtime(data,[{slot:0,name:'Audit'}],7,null,gameplay.rules);game.start();game.tasks=[];game.timers=[];
      for(const unit of [...game.units.values()])game.removeUnit(unit);
      game.globals.udg_playerzz[0]=index+1;game.globals.udg_waves=11;game.globals.udg_nokuaisumode=true;game.run('OpenTrigger',[index+1]);
      const player=game.players[0];player.gold=1e6;player.lumber=1e6;player.cap=1000;player.handicap=1;
      const observedModels=new Set(),effect=game.effect.bind(game),create=game.createUnit.bind(game);
      const trackModel=path=>{if(path&&path!=='_')observedModels.add(modelPath(path));};
      game.effect=(kind,source,target,fields={})=>{
        if(kind==='damage'||kind==='hit')entry.damageEvents++;
        if(kind==='projectile'&&source?.owner===player)entry.attackEvents++;
        if(kind==='spell'&&fields.code)entry.spellCodes[fields.code]=(entry.spellCodes[fields.code]||0)+1;
        if(kind==='model'||kind==='projectile')trackModel(fields.model);
        return effect(kind,source,target,fields);
      };
      game.createUnit=(...args)=>{const unit=create(...args);if(args[0]===player)entry.summons[unit.raw]=(entry.summons[unit.raw]||0)+1;trackModel(data.units[unit.raw]?.file);return unit;};
      const tower=game.createUnit(player,fourCC(type),0,0,270);tower.mana=tower.maxMana;
      const candidates=[tower];
      for(const [i,raw]of ['hfoo','hgry','Udea','Ulic','Udre','Ucrl','Hvsh','n004','efon','hwat','hfoo','hgry'].entries()){
        const angle=i*.5,distance=100+(i%5)*160,unit=game.createUnit(game.players[8],fourCC(raw),Math.cos(angle)*distance,Math.sin(angle)*distance);
        unit.hp=unit.maxHp=1e12;unit.cooldown=1e6;unit.stats.hpRegen=0;candidates.push(unit);
      }
      for(const [i,raw]of [roster.worker,'h032','n004'].entries()){
        const unit=game.createUnit(player,fourCC(raw),-120,100+i*100);unit.mana=0;unit.cooldown=1e6;candidates.push(unit);
      }
      advance(game,8);
      for(const [id,level]of [...tower.abilities]){
        if(tower.removed||tower.death)break;
        const ability=game.ability(id),controls=abilityControls(data,type,rawId(id),ability);
        if(!controls.castable||ability.code==='Atau')continue;
        const target=controls.targeting==='unit'?candidates.find(unit=>game.matchesTargetMask(tower,unit,targetMask(ability,level))):null;
        const point=controls.targeting==='point'?{x:300,y:0}:null;
        tower.castCooldown.delete(id);tower.mana=tower.maxMana;
        const cast=game.cast(tower,id,target,point);
        entry.commands.push({ability:rawId(id),code:ability.code,target:target?.raw||null,cast});
      }
      advance(game,3);
      entry.errors=game.errors;entry.missingModels=[...observedModels].filter(path=>/\.mdx$/i.test(path)&&!manifest.models[path]);
      entry.movementAndTargets=[...new Set([type,...Object.keys(entry.summons)])].map(id=>({id,movement:data.units[id].movetp,targetType:data.units[id].targType}));
    }catch(error){entry.errors.push({message:error.stack});}
    row.buildings.push(entry);
  }
  row.errors=row.buildings.filter(entry=>entry.errors.length).map(entry=>({type:entry.type,errors:entry.errors}));
  row.missingModels=[...new Set(row.buildings.flatMap(entry=>entry.missingModels))];
  report.professions.push(row);
  console.log(JSON.stringify({profession:row.name,forms:row.buildings.length,damageEvents:row.buildings.reduce((sum,entry)=>sum+entry.damageEvents,0),commands:row.buildings.reduce((sum,entry)=>sum+entry.commands.length,0),errors:row.errors,missingModels:row.missingModels}));
}
await writeFile(new URL('../artifacts/profession-runtime-detail-audit.json',import.meta.url),JSON.stringify(report,null,2));
if(report.professions.some(row=>row.errors.length||row.missingModels.length))process.exitCode=1;

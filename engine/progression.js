// Milestones from Trig_LevelUp and Trig_MJSguihuoluanwu in the archived JASS.
const learned = [
  ['h00F',1000,'A04A'],['h01G',1000,'A04B'],['h02C',1000,'A062'],
  ['h06D',800,'A0EE'],['h03C',1000,'A07D'],['h046',800,'A08Q'],
  ['h01M',5000,'A04N'],['h01A',5000,'A04O'],['h02F',5000,'A061'],
  ['h043',5000,'A07C'],['h043',10000,'A097'],['h04R',5000,'A08R'],['h077',5000,'A0E9']
];
const text = value => String(value || '').replace(/\|c[\da-f]{8}|\|r/gi,'').replace(/\|n/g,' ');

export function installProgression(V) {
  const milestones = new Map(), setTypes = new Set(Object.values(V.data.arrays.levelT1));
  const add = (type, milestone) => {
    if (!milestones.has(type)) milestones.set(type, []);
    milestones.get(type).push(milestone);
  };
  for (const [from,to,start,end,required] of [[1,2,1,24,150],[2,3,1,48,250],[3,4,25,72,500],[4,5,49,72,800]]) {
    for (let index=start;index<=end;index++) {
      const type=V.data.arrays[`level${from}`][index],next=V.data.arrays[`level${to}`][index];
      if(type&&next)add(type,{kind:'promotion',required,nextUnit:next});
    }
  }
  for (const [index,type] of Object.entries(V.data.arrays.levelT1)) {
    const second=V.data.arrays.jinengT2[index],third=V.data.arrays.jinengT3[index];
    add(type,{kind:'ability',required:150,nextAbility:second,completedBy:[second,third]});
    add(type,{kind:'ability',required:400,nextAbility:third,completedBy:[third]});
  }
  for(const [type,required,ability] of learned)add(type,{kind:'learn',required,nextAbility:ability,completedBy:[ability]});
  milestones.set('h073',[{kind:'promotion',required:250,nextUnit:'h072',source:'cast'}]);
  milestones.set('h072',[{kind:'promotion',required:400,nextUnit:'h071',source:'cast'}]);
  const negativeTraining = new Map([['A08P',3000],['A08O',6000],['A08N',9000]]);

  V.buildingProgression = unit => {
    if(!unit.building||unit.summoner||unit.owner.id>=4)return null;
    const value=Number(unit.data)||0,pending=(unit.pendingMerit||[]).reduce((sum,entry)=>sum+entry.wave+2,0);
    if(value<0){
      const training=[...negativeTraining].find(([ability])=>unit.abilities.has(V.fourCC(ability)));
      if(training)return{kind:'training',current:Math.max(0,training[1]+value)+pending,required:training[1],next:'训练完成后继续功勋成长',source:'kill',pending};
    }
    const rule=milestones.get(unit.raw)?.find(rule=>!rule.completedBy?.some(id=>unit.abilities.has(V.fourCC(id))));
    const current=Math.max(0,value)+pending,fast=V.globals.udg_nokuaisumode===false&&rule?.source!=='cast';
    if(rule){
      const required=fast?current+Math.max(1,(Number(V.globals.udg_waves)||0)+2):rule.required;
      const next=rule.nextUnit?`晋升为 ${text(V.data.units[rule.nextUnit]?.Name)||rule.nextUnit}`:rule.kind==='ability'?`提升 ${text(V.data.abilityStrings[rule.nextAbility]?.Name)||rule.nextAbility}`:`领悟 ${text(V.data.abilityStrings[rule.nextAbility]?.Name)||rule.nextAbility}`;
      return{kind:rule.kind,current,required,next,source:rule.source||'kill',fast,pending};
    }
    const upgrade=String(V.data.units[unit.raw]?.Upgrade||'').split(',')[0];
    return{kind:upgrade?'manual':'complete',current,required:null,next:upgrade?'此形态通过下方按钮花费资源升级':setTypes.has(unit.raw)?'套装技能已升满':'功勋成长已完成',source:'kill',pending};
  };

  V.progressionOwner = killer => {
    const owner=killer?.owner,seen=new Set();let unit=killer,result=null;
    while(unit&&!seen.has(unit)){
      seen.add(unit);
      if(unit.replacement){unit=unit.replacement;continue;}
      if(unit.owner!==owner)return null;
      if(unit.building)result=unit;
      unit=unit.summoner;
    }
    return result&&!result.removed&&!result.death?result:null;
  };
  V.linkProgressionUnit = unit => {
    const actors=[V.ctx.caster,V.ctx.attacker,V.ctx.killer,V.ctx.unit].filter(actor=>actor&&actor!==unit&&actor.owner===unit.owner);
    if(!unit.building){
      const creator=[V.ctx.caster,V.ctx.attacker].find(actor=>actor&&actor!==unit&&actor.owner===unit.owner);
      if(creator)unit.summoner=creator;
    }else{
      const previous=actors.find(actor=>actor.building&&actor.removed&&!actor.replacement&&Math.hypot(actor.x-unit.x,actor.y-unit.y)<1);
      if(previous){previous.replacement=unit;unit.replaces=[previous.hid,...(previous.replaces||[])];}
    }
  };

  // Only the map's growth trigger sees the credited building. Gold, player
  // kill counts and all other death callbacks keep the actual killing unit.
  const execute=V.execute.bind(V);
  V.execute=(trigger,context={},conditions=false)=>{
    if(trigger&&!trigger.dead&&trigger.actions.includes('Trig_LevelUp_Actions')&&context.killer){
      const credit=V.progressionOwner(context.killer);
      if(!credit)return;
      if(credit.upgradeEnd||!credit.constructed){
        if(conditions&&trigger.conditions.some(condition=>!V.run(condition,[],{...context,killer:credit})))return;
        (credit.pendingMerit??=[]).push({wave:Number(V.globals.udg_waves)||0});return;
      }
      context={...context,killer:credit};
    }
    return execute(trigger,context,conditions);
  };
  V.flushMerit = unit => {
    const entries=unit.pendingMerit||[];unit.pendingMerit=[];
    const trigger=V.globals.gg_trg_LevelUp;if(!trigger||!entries.length)return;
    const wave=V.globals.udg_waves;
    try{
      for(const entry of entries){
        const current=V.progressionOwner(unit);if(!current)break;
        V.globals.udg_waves=entry.wave;V.execute(trigger,{killer:current,player:current.owner},true);
      }
    }finally{V.globals.udg_waves=wave;}
  };
}

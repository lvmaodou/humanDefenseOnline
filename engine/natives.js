import {fourCC,rawId,clean} from './runtime.js';

export function installNatives(V){
  const N=V.natives,G=V.globals,C=()=>V.ctx;
  const noop=()=>null, last=(key,value)=>(G[key]=value), reg=(t,event,extra)=>V.register(t,event,extra);
  const stats={PLAYER_STATE_RESOURCE_GOLD:'gold',PLAYER_STATE_RESOURCE_LUMBER:'lumber',PLAYER_STATE_RESOURCE_FOOD_USED:'food',PLAYER_STATE_RESOURCE_FOOD_CAP:'cap'};
  const foreach=(group,key,fn)=>{for(const member of [...(group||[])])V.run(fn,[],{...C(),[key]:member});};
  Object.assign(N,{
    Player:id=>V.players[id]||V.players[15],ConvertedPlayer:id=>V.players[id-1]||V.players[15],GetPlayerId:p=>p?.id??0,GetConvertedPlayerId:p=>(p?.id??0)+1,
    GetLocalPlayer:()=>V.players[0],GetPlayerName:p=>p?.name||'',GetPlayerSlotState:p=>p?.active?'PLAYER_SLOT_STATE_PLAYING':'PLAYER_SLOT_STATE_EMPTY',
    GetPlayerState:(p,s)=>p?.[stats[s]]??0,SetPlayerState:(p,s,v)=>{if(p&&stats[s])p[stats[s]]=v;},SetPlayerStateBJ:(p,s,v)=>N.SetPlayerState(p,s,v),AdjustPlayerStateBJ:(v,p,s)=>{if(p&&stats[s])p[stats[s]]+=v;},
    IsPlayerAlly:(a,b)=>a&&b?a.team===b.team:false,IsUnitAlly:(u,p)=>u?.owner.team===p?.team,IsUnitEnemy:(u,p)=>!!u&&u.owner.team!==p?.team,
    SetPlayerTeam:(p,t)=>p.team=t,SetPlayerHandicapBJ:(p,n)=>p.handicap=n/100,
    SetPlayerTechResearched:(p,id,level)=>{p.tech[rawId(id)]=level;V.refreshPlayerUnits(p);},SetPlayerTechResearchedSwap:(id,level,p)=>{p.tech[rawId(id)]=level;V.refreshPlayerUnits(p);},
    GetPlayersAll:()=>V.players.filter(p=>p.id<12),GetPlayersAllies:p=>V.players.filter(x=>x.id<12&&x.team===p.team),
    GetPlayersMatching:fn=>V.players.filter(p=>p.id<12&&V.run(fn,[],{...C(),filterPlayer:p})),GetFilterPlayer:()=>C().filterPlayer,
    ForForce:(group,fn)=>foreach(group,'enumPlayer',fn),GetEnumPlayer:()=>C().enumPlayer,CountPlayersInForceBJ:f=>f?.length||0,
    Rect:(x1,y1,x2,y2)=>V.handle({x1,y1,x2,y2}),GetRectCenter:r=>({x:(r.x1+r.x2)/2,y:(r.y1+r.y2)/2}),GetPlayableMapRect:()=>({x1:-8192,y1:-8192,x2:8192,y2:8192}),
    DistanceBetweenPoints:(a,b)=>Math.hypot((a?.x||0)-(b?.x||0),(a?.y||0)-(b?.y||0)),PolarProjectionBJ:(p,d,a)=>({x:p.x+d*Math.cos(a*Math.PI/180),y:p.y+d*Math.sin(a*Math.PI/180)}),
    GetRandomDirectionDeg:()=>V.random()*360,GetRandomInt:(min,max)=>Math.floor(min+V.random()*(max-min+1)),GetRandomReal:(min,max)=>min+V.random()*(max-min),
    R2I:x=>Math.trunc(x),I2R:x=>Number(x),I2S:x=>String(Math.trunc(x)),ModuloInteger:(a,b)=>a%b,GetBooleanAnd:(a,b)=>!!(a&&b),
    GetForLoopIndexA:()=>G.bj_forLoopAIndex,GetForLoopIndexB:()=>G.bj_forLoopBIndex,
    CreateGroup:()=>[],GroupClear:g=>{g.length=0;},GetEnumUnit:()=>C().enumUnit,GetFilterUnit:()=>C().filterUnit,
    ForGroupBJ:(group,fn)=>foreach(group,'enumUnit',fn),GetUnitsInRangeOfLocMatching:(radius,p,fn)=>[...V.units.values()].filter(u=>!u.death&&!u.removed&&Math.hypot(u.x-p.x,u.y-p.y)<=radius&&(!fn||V.run(fn,[],{...C(),filterUnit:u}))),
    CreateUnit:(p,id,x,y,facing)=>V.createUnit(p,id,x,y,facing),CreateUnitAtLoc:(p,id,loc,facing)=>V.createUnit(p,id,loc.x,loc.y,facing),
    CreateNUnitsAtLoc:(count,id,p,loc,facing)=>{const list=[];for(let i=0;i<count;i++)list.push(V.createUnit(p,id,loc.x,loc.y,facing));G.bj_lastCreatedGroup=list;return list;},
    GetLastCreatedUnit:()=>G.bj_lastCreatedUnit,GetOwningPlayer:u=>u?.owner??V.players[15],GetUnitTypeId:u=>u?.type??0,GetUnitName:u=>V.data.units[u?.raw]?.Name||'',GetUnitLoc:u=>({x:u?.x||0,y:u?.y||0}),GetUnitFacing:u=>u?.facing??0,
    GetUnitUserData:u=>u?.data??0,SetUnitUserData:(u,n)=>{if(u)u.data=n;},GetUnitPointValue:u=>Number(V.data.units[u?.raw]?.points)||0,GetUnitFoodUsed:u=>u?.food||0,
    SetUnitPositionLoc:(u,p)=>{if(u){u.x=p.x;u.y=p.y;V.enterRegions(u);}},SetUnitUseFoodBJ:(use,u)=>{if(u&&u.useFood!==use){u.owner.food+=use?u.food:-u.food;u.useFood=use;}},
    GetUnitStateSwap:(state,u)=>state==='UNIT_STATE_LIFE'?u?.hp??0:state==='UNIT_STATE_MAX_LIFE'?u?.maxHp??0:state==='UNIT_STATE_MAX_MANA'?u?.maxMana??0:u?.mana??0,
    SetUnitManaBJ:(u,n)=>{if(u)u.mana=Math.min(u.maxMana,n);},SetUnitManaPercentBJ:(u,n)=>{if(u)u.mana=u.maxMana*n/100;},
    IsUnitAliveBJ:u=>!!u&&!u.death&&!u.removed,IsUnitHidden:u=>!!u?.hidden,IsUnitType:(u,t)=>!!u&&(t==='UNIT_TYPE_STRUCTURE'?u.building:t==='UNIT_TYPE_HERO'?u.raw[0]===u.raw[0].toUpperCase():t==='UNIT_TYPE_FLYING'?V.data.units[u.raw]?.movetp==='fly':false),
    UnitAddAbility:(u,id)=>{if(u)u.abilities.set(id,1);return true;},UnitAddAbilityBJ:(id,u)=>N.UnitAddAbility(u,id),UnitRemoveAbilityBJ:(id,u)=>u?.abilities.delete(id),GetUnitAbilityLevel:(u,id)=>u?.abilities.get(id)||0,
    RemoveUnit:u=>V.removeUnit(u),KillUnit:u=>V.kill(u),ExplodeUnitBJ:u=>{V.effect('explosion',u,u);V.kill(u);},
    UnitDamageTarget:(source,target,damage,attack,ranged,attackType,damageType)=>{V.damage(source,target,damage,attack,damageType,attackType);return true;},
    SetUnitOwner:(u,p)=>{if(!u)return;const previous=u.owner;if(u.useFood){previous.food-=u.food;p.food+=u.food;}u.owner=p;V.fire('EVENT_UNIT_CHANGE_OWNER',{unit:u,player:p,previousOwner:previous});},
    SetHeroLevel:(u,level)=>{if(u)u.level=level;},SetHeroStr:(u,n)=>{if(u)u.str=n;},SetHeroAgi:(u,n)=>{if(u)u.agi=n;},SetHeroInt:(u,n)=>{if(u)u.int=n;},
    UnitApplyTimedLifeBJ:(duration,buff,u)=>{if(u)u.expires=V.time+duration;},
    CreateTrigger:()=>{const t=V.handle({enabled:true,conditions:[],actions:[],events:[]});V.triggers.push(t);return t;},
    DestroyTrigger:t=>{if(t)t.dead=true;},DisableTrigger:t=>{if(t)t.enabled=false;},EnableTrigger:t=>{if(t)t.enabled=true;},Condition:fn=>fn,
    TriggerAddAction:(t,fn)=>(t.actions.push(fn),fn),TriggerAddCondition:(t,fn)=>(t.conditions.push(fn),fn),TriggerExecute:t=>V.execute(t,C()),ConditionalTriggerExecute:t=>V.execute(t,C(),true),ExecuteFunc:fn=>V.run(fn,[],C()),
    TriggerRegisterAnyUnitEventBJ:(t,event)=>reg(t,event),TriggerRegisterPlayerUnitEventSimple:(t,player,event)=>reg(t,event,{player}),TriggerRegisterUnitEvent:(t,unit,event)=>reg(t,event,{unit}),
    TriggerRegisterEnterRectSimple:(t,rect)=>reg(t,'enter',{rect}),TriggerRegisterDialogEventBJ:(t,dialog)=>reg(t,'dialog',{dialog}),
    TriggerRegisterTimerEventPeriodic:(t,time)=>V.timer(time,true,null,{trigger:t}),TriggerRegisterTimerEventSingle:(t,time)=>V.timer(time,false,null,{trigger:t}),
    TriggerRegisterPlayerEventLeave:(t,player)=>reg(t,'leave',{player}),TriggerRegisterPlayerChatEvent:(t,player,text,exact)=>reg(t,'chat',{player,text,exact}),
    TriggerRegisterPlayerEventEndCinematic:(t,player)=>reg(t,'cinematicEnd',{player}),TriggerRegisterPlayerKeyEventBJ:(t,player,when,key)=>reg(t,'key',{player,key,when}),
    CreateTimer:()=>V.handle({}),TimerStart:(t,time,repeat,fn)=>{Object.assign(t,{at:V.time+Math.max(.001,time),period:time,repeat,callback:fn,dead:false});if(!V.timers.includes(t))V.timers.push(t);},DestroyTimer:t=>{if(t)t.dead=true;},GetExpiredTimer:()=>C().timer,
    CreateTimerDialogBJ:(t,title)=>last('bj_lastCreatedTimerDialog',V.handle({timer:t,title,visible:true})),GetLastCreatedTimerDialogBJ:()=>G.bj_lastCreatedTimerDialog,DestroyTimerDialog:t=>{if(t)t.visible=false;},TimerDialogDisplay:(d,v)=>{if(d)d.visible=v;},TimerDialogDisplayBJ:(v,d)=>{if(d)d.visible=v;},TimerDialogSetTitle:(d,title)=>{if(d)d.title=title;},
    DialogCreate:()=>{const d=V.handle({title:'',buttons:[],visible:new Set()});V.dialogs.set(d.hid,d);return d;},DialogAddButtonBJ:(d,text)=>{const b=V.handle({text});d.buttons.push(b);return b;},DialogSetMessage:(d,title)=>d.title=title,DialogClear:d=>{d.buttons=[];d.visible.clear();},DialogDisplayBJ:(show,d,p)=>{if(show&&p.active)d.visible.add(p.id);else d.visible.delete(p.id);},
    GetClickedButtonBJ:()=>C().button,GetTriggerPlayer:()=>C().player||C().unit?.owner,GetTriggerUnit:()=>C().unit,GetTriggeringTrigger:()=>C().trigger,GetDyingUnit:()=>C().dying||C().unit,GetKillingUnitBJ:()=>C().killer,
    GetAttacker:()=>C().attacker,GetAttackedUnitBJ:()=>C().unit,GetConstructedStructure:()=>C().unit,GetSpellAbilityUnit:()=>C().caster||C().unit,GetSpellAbilityId:()=>C().ability??0,GetSpellTargetUnit:()=>C().target,GetIssuedOrderIdBJ:()=>C().order??0,GetChangingUnit:()=>C().unit,GetChangingUnitPrevOwner:()=>C().previousOwner,
    InitGameCacheBJ:()=>last('bj_lastCreatedGameCache',new Map()),StoreInteger:(cache,mission,key,value)=>{cache?.set(`${mission}:${key}`,value);return true;},GetStoredInteger:(cache,mission,key)=>cache?.get(`${mission}:${key}`)||0,
    H2I:o=>o?.hid??0,I2U:id=>V.handles.get(id)||null,I2L:id=>V.handles.get(id)||null,I2TG:id=>V.handles.get(id)||null,I2TC:id=>V.handles.get(id)||null,I2TA:id=>V.handles.get(id)||null,
    DisplayTextToForce:(force,text)=>V.message(text),DisplayTextToPlayer:(p,x,y,text)=>V.message(text,p),DisplayTimedTextToForce:(f,d,text)=>V.message(text),DisplayTimedTextToPlayer:(p,x,y,d,text)=>V.message(text,p),
    CustomDefeatBJ:(p,text)=>{V.status='defeat';V.message(text,p);},CustomVictoryBJ:p=>{V.status='victory';V.message('胜利！雅典娜的军团已被击退。',p);},
    AddSpecialEffectLocBJ:(p,model)=>last('bj_lastCreatedEffect',V.effect('model',p,p,{model,persistent:true})),AddSpecialEffectTargetUnitBJ:(attach,u,model)=>last('bj_lastCreatedEffect',V.effect('model',u,u,{model,attachment:attach,follow:true,persistent:true})),GetLastCreatedEffectBJ:()=>G.bj_lastCreatedEffect,
    DestroyEffect:e=>{if(e){e.destroyed=true;e.destroyedAt=V.time;}},AddLightningLoc:(code,a,b)=>last('bj_lastCreatedLightning',V.effect('lightning',a,b,{code,persistent:true})),GetLastCreatedLightningBJ:()=>G.bj_lastCreatedLightning,DestroyLightning:e=>{if(e){e.destroyed=true;e.destroyedAt=V.time;}return true;},
    CreateTextTagUnitBJ:(text,u)=>last('bj_lastCreatedTextTag',V.effect('text',u,u,{text:clean(text)})),GetLastCreatedTextTag:()=>G.bj_lastCreatedTextTag,
    CreateLeaderboardBJ:(force,title)=>last('bj_lastCreatedLeaderboard',{title,entries:[]}),GetLastCreatedLeaderboard:()=>G.bj_lastCreatedLeaderboard,
    LeaderboardAddItemBJ:(p,board,label,value)=>board?.entries.push({player:p,label,value}),LeaderboardSetPlayerItemValueBJ:(p,b,v)=>{const row=b?.entries.find(e=>e.player===p);if(row)row.value=v;},LeaderboardGetIndexedPlayerBJ:(i,b)=>b?.entries[i-1]?.player||V.players[0],LeaderboardSortItemsBJ:(b,sort,asc)=>b?.entries.sort((a,b)=>(asc?1:-1)*(a.value-b.value)),
    CreateQuestBJ:(type,title,text,icon)=>{const q=V.handle({type,title:clean(title),text:clean(text),icon});V.quests.push(q);return q;},
    CreateItemLoc:(id,p)=>V.createItem(id,p),GetItemTypeId:i=>i?.type??0,GetManipulatedItem:()=>C().item,RemoveItem:i=>V.removeItem(i),UnitDropItem:(u,id)=>V.createItem(id,u),WidgetDropItem:(u,id)=>V.createItem(id,u),
    EnumItemsInRectBJ:(r,fn)=>{for(const i of V.items.values())if(!i.removed&&!i.carrier&&V.inside(i,r))V.run(fn,[],{...C(),enumItem:i});},GetEnumItem:()=>C().enumItem,
    RandomDistReset:()=>V.dist=[],RandomDistAddItem:(id,chance)=>(V.dist||=[]).push({id,chance}),RandomDistChoose:()=>{let n=V.random()*(V.dist||[]).reduce((s,x)=>s+x.chance,0);for(const x of V.dist||[]){n-=x.chance;if(n<=0)return x.id;}return 0;},
    ChooseRandomItemBJ:level=>V.randomItem(level),ChooseRandomItemEx:(type,level)=>V.randomItem(level,type),
    GetCameraMargin:()=>0,ConvertPlayerColor:p=>p,CreateCameraSetup:()=>({}),CameraSetupSetDestPosition:(c,x,y,d)=>Object.assign(c,{x,y}),CameraSetupSetField:(c,f,v)=>c[f]=v,
    CreateDestructableLoc:(id,p)=>V.handle({type:id,...p}),GetEnumDestructable:()=>C().enumDestructable,EnumDestructablesInRectAll:noop,RemoveDestructable:noop
  });
  N.TriggerSleepAction=N.PolledWait=function*(seconds){yield {wait:seconds};};
  // These calls affect Warcraft's local HUD, camera, music or lobby, not combat rules.
  const presentation=['InitBlizzard','CreateFogModifierRectBJ','RemoveLocation','CinematicModeBJ','SetUserControlForceOff','TransmissionFromUnitWithNameBJ','PanCameraToTimedLocForPlayer','SetCameraTargetController','SetCameraBounds','SetDayNightModels','NewSoundEnvironment','SetAmbientDaySound','SetAmbientNightSound','SetMapMusic','PlayMusicBJ','SetGamePlacement','SetMapDescription','SetMapName','SetPlayers','SetTeams','DefineStartLocation','SetPlayerStartLocation','ForcePlayerStartLocation','SetPlayerColor','SetPlayerController','SetPlayerRacePreference','SetPlayerRaceSelectable','SetStartLocPrio','SetStartLocPrioCount','SetPlayerAllianceStateVisionBJ','SetPlayerAllianceStateAllyBJ','SetTextTagFadepoint','SetTextTagLifespan','SetTextTagPermanent','SetTextTagVelocityBJ','LeaderboardDisplayBJ'];
  for(const n of presentation)N[n]=noop;
  N.SetPlayerColor=(p,color)=>{if(p)p.color=color;};
  N.PanCameraToTimedLocForPlayer=(player,point,duration)=>V.effect('camera',point,point,{player:player.id,duration,operation:'pan'});
  N.SetCameraTargetController=(unit,x,y,inherit)=>V.effect('camera',unit,unit,{player:C().player?.id??null,operation:'follow',offset:[x,y],inherit:!!inherit});
  N.SetCameraBounds=(...bounds)=>{V.cameraBounds=bounds;};
  N.OpenTrigger=xz=>V.run('OpenTrigger',[xz],C());
  N.TriggerSleepAction=N.PolledWait=function*(seconds){yield {wait:seconds};};
  // Preserve handle casts used by the map's game-cache tables, instead of the old JASS return-type exploit.
  V.nativeOverrides=new Set(['H2I','I2U','I2L','I2TG','I2TC','I2TA']);
}

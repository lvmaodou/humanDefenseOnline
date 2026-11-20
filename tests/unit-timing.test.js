import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { attackSpeed, attackTiming, angleDifference, turnTowards } from '../engine/unit-timing.js';

const data=JSON.parse(await readFile(new URL('../content/original-3.0/data.json',import.meta.url),'utf8'));

test('movement turns in source radians per 50 ms step and opens at the degree prop-window',()=>{
  const unit={x:0,y:0,facing:270,building:false};
  const definition={turnRate:.6,propWin:60};
  let movementTime=0;
  for(let step=0;step<4;step++)movementTime+=turnTowards(unit,definition,{x:0,y:100},.05);
  assert.ok(Math.abs(unit.facing-132.490)<.01);
  assert.equal(unit.turning,false);
  assert.equal(movementTime,.05);
  assert.equal(angleDifference(350,10),20);
});

test('the source propulsion and attack windows are strict at their angle boundary',()=>{
  const unit={x:0,y:0,facing:0,building:false};
  turnTowards(unit,{turnRate:0,propWin:45},{x:1,y:1},.05,45);
  assert.equal(unit.turning,true,'an exact 45 degree difference is outside the strict window');
});

test('building weapons keep their fixed facing and attack animation timings use original fields',()=>{
  const building={x:0,y:0,facing:270,building:true,turning:true};
  assert.equal(turnTowards(building,{turnRate:.6,propWin:60},{x:100,y:0},.05),.05);
  assert.equal(building.facing,270);assert.equal(building.turning,false);
  const timing=attackTiming({buffs:[],auraAttackSpeed:0},data.units.hfoo,0);
  assert.deepEqual(timing,{speed:1,damagePoint:Number(data.units.hfoo.dmgpt1),backswing:Number(data.units.hfoo.backSw1),cooldown:Number(data.units.hfoo.cool1)});
});

test('attack-speed auras, buffs, and slow effects modify windup and cooldown together',()=>{
  const unit={auraAttackSpeed:.1,buffs:[{kind:'power',speed:.2,until:5},{kind:'attackSlow',factor:.5,until:5}]};
  const speed=attackSpeed(unit,0);
  assert.equal(speed,.65);
  const timing=attackTiming(unit,data.units.hfoo,0);
  assert.ok(Math.abs(timing.damagePoint-Number(data.units.hfoo.dmgpt1)/speed)<1e-12);
  assert.ok(Math.abs(timing.backswing-Number(data.units.hfoo.backSw1)/speed)<1e-12);
  assert.ok(Math.abs(timing.cooldown-Number(data.units.hfoo.cool1)/speed)<1e-12);
  assert.equal(attackSpeed(unit,5),1.1,'expired attack slows no longer affect cadence');
});

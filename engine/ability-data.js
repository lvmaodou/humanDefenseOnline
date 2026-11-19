// Order IDs are the orders used by the archived JASS, including dummy casters.
export const spellOrders = {
  852089: 'AHbz', 852095: 'AHtb', 852096: 'AHtc', 852097: 'AHwe',
  852106: 'Aens', 852110: 'Alsh', 852119: 'AOcl', 852125: 'AOsh',
  852128: 'AOww', 852164: 'Aroa', 852171: 'AEer', 852183: 'AEsf',
  852218: 'AUcs', 852224: 'AUin', 852226: 'AUfn', 852238: 'ANrf',
  852480: 'Amls', 852526: 'AEfk', 852527: 'AEsh', 852555: 'AUim',
  852556: 'AUls', 852580: 'ANbf', 852583: 'ANdo', 852587: 'ANfl',
  852588: 'ANht', 852591: 'ANmo', 852593: 'ANst', 852652: 'ANcs',
  852658: 'ANsy', 852667: 'ANlm'
};

export const passiveAbilityCodes = new Set([
  'AHbh','AOcr','AEev','ANca','Aapl','Avul','AInv','Aroc','Amgl','Afra','Afrz',
  'Aven','Apxf','AIat','AIab','AIcb','AIfb','AIbl','AIva','AIas','AHad','AHab',
  'AEar','AOae','AUau','ANms','AIaa','Awar','Aien','Abds','Aeat','Aro1','Aro2',
  'Abdl','Aspi','Argl','Aion','Abgs','Aloc','Adtn','Aren','Awha','Amim','ANpi','Arsk','Alit','Apiv','Ault'
]);
const autocastCodes = new Set(['Afae','ANba','Ablo','Ainf','Aslo','Ahea','Acrs','Arai','AUfu','Aadm','Apsh','Avng','AHca','AHfa','Asps','Afak']);
const pointCodes = new Set(['AEbl','AHbz','AOsh','AUcs','AUim','ANbf','ANrf','ANst','ANcs','ANsy','AUin','ARal']);
const unitCodes = new Set(['Afae','ANba','AHca','AHfa','AHtb','AUfn','AOcl','ANfl','AEer','AEsh','Amls','Alsh','ANdo','Aslo','Acri','Acyc','Abli','Aens','Aprg','Auhf','Ablo','Ainf']);

export function resolveAbility(data, id) {
  const key = typeof id === 'number' ? String.fromCharCode((id>>>24)&255,(id>>>16)&255,(id>>>8)&255,id&255) : id;
  const raw = data.abilityData[key] || {}, override = data.abilities[key];
  if (!override) return raw;
  const ability = { ...data.abilityData[override.base], ...raw };
  const names = { anam:'Name', acdn:'Cool', amcs:'Cost', aare:'Area', aran:'Rng', adur:'Dur', ahdu:'HeroDur' };
  for (const [field, levels] of Object.entries(override.fields)) for (const [level, value] of Object.entries(levels)) {
    ability[(names[field] || field) + (level === '0' ? '' : level)] = value;
  }
  return ability;
}

export function abilityValue(ability, field, level = 1, fallback = 0) {
  const value = Number(ability[`${field}${level}`] ?? ability[`${field}1`] ?? fallback);
  return Number.isFinite(value) ? value : fallback;
}

export function abilityControls(data, unitId, id, ability = resolveAbility(data, id)) {
  const code = ability.code || id;
  return {
    castable: !passiveAbilityCodes.has(code) && code !== 'Atau',
    // Unit.auto selects the initial state; the native ability determines
    // whether the player can switch automatic casting on and off.
    autocastSupported: autocastCodes.has(code),
    targeting: pointCodes.has(code) ? 'point' : unitCodes.has(code) ? 'unit' : 'self'
  };
}

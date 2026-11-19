// Shop stock and script drops determine availability; item.sellable alone does
// not put an item on sale in this map.
export function originalItemSources(data, script) {
  const usedIds = new Set([...script.matchAll(/'([A-Za-z0-9]{4})'/g)].map(match => match[1]));
  const fixed = new Set([...script.matchAll(/CreateItemLoc\('([A-Za-z0-9]{4})'/g)].map(match => match[1]));
  const oldLevels = new Set([...script.matchAll(/ChooseRandomItemBJ\((\d+)\)/g)].map(match => Number(match[1])));
  const levels = new Set([...script.matchAll(/ChooseRandomItemEx\(ITEM_TYPE_ANY,(\d+)\)/g)].map(match => Number(match[1])));
  const shops = Object.entries(data.units).filter(([id, unit]) => usedIds.has(id) && unit.Sellitems && unit.Sellitems !== '_');
  return Object.fromEntries(Object.entries(data.items).map(([id, item]) => {
    const stock = shops.filter(([, shop]) => shop.Sellitems.split(',').includes(id)).map(([shop]) => shop);
    const drop = Number(item.pickRandom) === 1 && (oldLevels.has(Number(item.oldLevel)) || levels.has(Number(item.Level)));
    const sources = [drop && '击杀掉落', fixed.has(id) && '地图剧情', stock.length > 0 && '商店购买'].filter(Boolean);
    return [id, { inMap: usedIds.has(id) || sources.length > 0, purchasable: stock.length > 0, shops: stock, sources }];
  }));
}

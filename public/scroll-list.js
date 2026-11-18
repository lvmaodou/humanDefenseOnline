export function enableRotatedListScroll(list, isRotated) {
  let gesture = null, suppressClick = false;
  list.addEventListener('pointerdown', event => {
    suppressClick = false;
    if (event.pointerType !== 'touch' || !isRotated()) return;
    gesture = { id: event.pointerId, x: event.clientX, scroll: list.scrollTop, dragged: false };
  }, { capture: true });
  list.addEventListener('pointermove', event => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const delta = event.clientX - gesture.x;
    if (!gesture.dragged && Math.abs(delta) <= 6) return;
    if (!gesture.dragged) {
      gesture.dragged = true;
      list.setPointerCapture(event.pointerId);
    }
    // The portrait game rotates 90 degrees: screen +X is the list's -Y.
    list.scrollTop = gesture.scroll + delta;
    event.preventDefault();event.stopPropagation();
  }, { capture: true });
  const finish = event => {
    if (!gesture || gesture.id !== event.pointerId) return;
    if (gesture.dragged) {
      suppressClick = true;
      event.preventDefault();event.stopPropagation();
    }
    gesture = null;
  };
  list.addEventListener('pointerup', finish, { capture: true });
  list.addEventListener('pointercancel', finish, { capture: true });
  list.addEventListener('lostpointercapture', event => { if (event.target === list) gesture = null; });
  list.addEventListener('click', event => {
    if (!suppressClick) return;
    suppressClick = false;event.preventDefault();event.stopImmediatePropagation();
  }, { capture: true });
}

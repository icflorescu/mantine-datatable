/**
 * Forwards a click on a selector cell to the checkbox inside it, so that clicking anywhere in the cell
 * behaves exactly like clicking the checkbox itself (including calling a user-provided checkbox `onChange`).
 * The modifier keys are preserved, so shift-click range selection keeps working.
 *
 * Returns `true` if the click was forwarded, or `false` if it already originated from the checkbox
 * (or there's no checkbox to forward it to), in which case the caller should handle it.
 */
export function forwardClickToCheckbox(event: React.MouseEvent): boolean {
  const input = event.currentTarget.querySelector<HTMLInputElement>('input[type="checkbox"]');
  if (!input || event.target === input) return false;
  input.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      shiftKey: event.shiftKey,
      ctrlKey: event.ctrlKey,
      altKey: event.altKey,
      metaKey: event.metaKey,
    })
  );
  return true;
}

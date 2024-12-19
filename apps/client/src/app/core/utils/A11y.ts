export function focusPrev(event: Event) {
  event.preventDefault();
  event.stopPropagation();
  const prevElement = <HTMLElement>(<HTMLElement>event.target).previousElementSibling;
  if (!prevElement) return;
  prevElement.focus();
}

export function focusNext(event: Event) {
  event.preventDefault();
  event.stopPropagation();
  const nextElement = <HTMLElement>(<HTMLElement>event.target).nextElementSibling;
  if (!nextElement) return;
  nextElement.focus();
}
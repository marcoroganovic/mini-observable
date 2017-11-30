export const debounce = (fn, period) => {
  let timer = null;

  return function() {
    const context = this;
    const args = Array.from(arguments);
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, period);
  }
}

export const throttle = (fn, period = 100, ctx) => {
  let last, defferTimer;

  return function() {
    const args = Array.from(arguments);
    const context = ctx || this;
    let now = +new Date;

    if(last && now < period + last) {
      clearTimeout(defferTimer);

      defferTimer = setTimeout(() => {
        last = now;
        fn.apply(context, args);
      }, period);
    } else {
      last = now;
      fn.apply(context, args);
    }
  }
}

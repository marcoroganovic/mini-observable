class Observable {

  static fromEvent(eventName, target) {
    return new Observable(observer => {
      const handler = (event) => { observer.next(event) };
      target.addEventListener(eventName, handler, false);
      return () => target.removeEventListener(eventName, handler);
    });
  }

  static fromPromise(promise) {
    return new Observable(observer => {
      promise.then((val => observer.next(val)));
      observer.completed();
      return this.noop;
    });
  }

  static of(...vals) {
    return new Observable(observer => {
      vals.forEach(value => observer.next(value));
      observer.completed();
      return this.noop;
    });
  }

  static idle(...vals) {
    return new Observable(observer => {
      vals.forEach(value => requestIdleCallback(() => observer.next(value)));
      observer.completed();
      return this.noop;
    });
  }


  static interval(period) {
    let counter = 0;
    return new Observable(observer => {
      const handler = () => observer.next(counter);
      setInterval(handler, period);
      return () => {
        counter = 0;
        clearInterval(handler);
      }
    });
  }

  constructor(subscriber) {
    this.subscriber = subscriber;
  }

  noop() {}


  map(predicate) {
    return new Observable(observer => {
      const customObserver = {
        ...observer,
        next(data) {
          observer.next(projection(data));
        }
      }

      this.subscribe(customObserver);
    })
  }

  filter(predicate) {
    return new Observable(observer => {
      const customObserver = {
        ...observer,
        next(data) {
          if(predicate(data)) {
            observer.next(data);
          }
        }
      }

      this.subscribe(customObserver);
    });
  }


  subscribe(observer) {
    let safeObserver = {};

    if(typeof observer === "function") {
      safeObserver.next = observer;
      safeObserver.completed = this.noop;
      safeObserver.error = this.noop;
    }

    if(typeof observer === "object" && Array.isArray(observer)) {
      safeObserver = {
        ...observer,
        completed: observer.completed || this.noop,
        error: observer.error || this.noop
      }
    }

    this.subscription(safeObserver);
  }

}

export default Observable;

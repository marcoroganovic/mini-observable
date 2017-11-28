class Observable {

  static fromEvent(eventName, target) {
    return new Observable(observer => {
      const handler = (event) => { observer.next(event) };
      target.addEventListener(eventName, handler, false);
      return () => target.removeEventListener(eventName, handler);
    });
  }

  constructor(subscriber) {
    this.subscriber = subscriber;
  }

  noop() {}

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

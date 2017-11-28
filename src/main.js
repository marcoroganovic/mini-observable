import Observable from "./Observable";

export const fromEvent = Observable.fromEvent;
export const fromPromise = Observable.fromPromise;
export const interval = Observable.interval;
export const of = Observable.of;
export const idle = Observable.idle
window.Observable = Observable;
export default Observable;

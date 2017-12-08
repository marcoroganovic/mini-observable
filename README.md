### mini-observable
Small observable library built for learning purposes and toy projects when only basic
functionality is required. API is pretty barebones, from observable constructors
there is only `fromEvent`, `fromPromise`, `of`, `interval` and `idle`. As far as
operators go, it supports `map`, `filter`, `delay`, `debounce`, `throttle`, `takeEvery`,`throw` and `skip` for
now.

#### Example
```javascript
import { fromEvent } from "./Observable";

const $button = document.querySelector(".button");
const move$ = fromEvent("mousemove", document)
  .map(event => ({ x: event.clientX, y: event.clientY }))
  // Could be one line, I know :)
  .map(rawCoords => ({ x: rawCoords.x + "px", y: rawCoords.y + "px" }))
  .delay(50);

  move$.subscribe({
    next(coords) {
      $button.style.transform = `translate(${coords.x}, ${coords.y})`
    }
  });
```

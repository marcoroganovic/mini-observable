const { fromEvent } = Observable;

const $btn = document.querySelector(".button");

const move$ = fromEvent("mousemove", document)
  .map(event => ({ x: event.clientX + "px", y: event.clientY + "px" }))
  .delay(50)
  .subscribe({
    next(coords) {
      $btn.style.transform = `translate(${coords.x}, ${coords.y})`
    }
  });


const click$ = fromEvent("click", $btn)
  .subscribe({
    next(event) {
      // remove subscription
      move$();
      alert("Great job!");
    }
  })


let element = document.documentElement;

element.addEventListener("mousedown", event => {
  start(event);
  let mousemove = event => {
    move(event);
  }
  let mouseup = event => {
    end(event);
    element.removeEventListener("mousemove", mousemove);
    element.removeEventListener("mouseup", mouseup);
  }
  element.addEventListener("mousemove", mousemove);
  element.addEventListener("mouseup", mouseup);
})

element.addEventListener("touchstart", event => {
  for(let touch of event.changedTouches) {
    start(touch);
  }
})

element.addEventListener("touchmove", event => {
  for(let touch of event.changedTouches) {
    move(touch);
  }
})

element.addEventListener("touchend", event => {
  for(let touch of event.changedTouches) {
    end(touch);
  }
})

element.addEventListener("touchcancel", event => {
  for(let touch of event.changedTouches) {
    cancel(touch);
  }
})

let handler;
let startX, startY;
let isPan = false, isPress = false, isTap = true;

let start = (point) => {
  // console.log("start", point.clientX, point.clientY);
  isPan = false;
  isPress = false;
  isTap = true;
  startX = point.clientX; startY = point.clientY;
  handler = setTimeout(() => {
    isPan = false;
    isPress = true;
    isTap = false;
    handler = null;
    console.log("press");
  }, 500);
}

let move = (point) => {
  // console.log("move", point.clientX, point.clientY);
  let dx = point.clientX - startX, dy = point.clientY - startY;
  if(!isPan && dx ** 2 + dy ** 2 > 100) {
    isPan = true;
    isPress = false;
    isTap = false;
    clearTimeout(handler);
    console.log("panstart");
  }

  if(isPan) {
    console.log("pan");
  }
}

let end = (point) => {
  // console.log("end", point.clientX, point.clientY);
  if(isTap) {
    console.log("tap");
    clearTimeout(handler);
  }
  if(isPress) {
    console.log("pressend");
  }
  if(isPan) {
    console.log("panend");
  }
}

let cancel = (point) => {
  clearTimeout(handler);
  // console.log("cancel", point.clientX, point.clientY);
}
export class Dispatcher {
  constructor(element) {
    this.element = element;
  }
  dispatch(type, properties) {
    let event = new Event(type);
    for (let name in properties) {
      event.name = properties[name];
    }
    // 派发事件
    this.element.dispatchEvent(event);
  }
}

// Listener -> Recognize -> Dispatch 
// 监听->识别->分发
// new Listener(new Recognizer(dispatch))

export class Listener {
  constructor(regconizer, element) {
    let isListeningMouse = false;
    let contexts = new Map();

    // 鼠标的监听
    element.addEventListener("mousedown", event => {
      // console.log("按下了" + event.button);
      let context = Object.create(null);
      contexts.set("mouse" + (1 << event.button), context);

      regconizer.start(event, context);

      let mousemove = event => {
        let button = 1;

        // event.buttons是掩码设计，在这里循环了下
        while (button <= event.buttons) {
          if (button & event.buttons) {
            // buttons的顺序和button的属性不一样
            let key;
            if (button === 2)
              key = 4;
            else if (button === 4)
              key = 2;
            else
              key = button;

            let context = contexts.get("mouse" + key);
            regconizer.move(event, context);
          }
          button = button << 1;
        }
      }

      let mouseup = event => {
        let context = contexts.get("mouse" + (1 << event.button));
        regconizer.end(event, context);
        contexts.delete("mouse" + (1 << event.button));

        if (event.buttons === 0) {
          document.removeEventListener("mousemove", mousemove);
          document.removeEventListener("mouseup", mouseup);
          isListeningMouse = false;
        }
      }
      if (!isListeningMouse) {
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
        isListeningMouse = true;
      }
    })


    // 触屏的监听
    element.addEventListener("touchstart", event => {
      for (let touch of event.changedTouches) {
        let context = Object.create(null);
        contexts.set(touch.identifier, context);
        regconizer.start(touch, context);
      }
    })
    
    element.addEventListener("touchmove", event => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        regconizer.move(touch, context);
      }
    })
    
    element.addEventListener("touchend", event => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        regconizer.end(touch, context);
        contexts.delete(touch.identifier);
      }
    })
    
    element.addEventListener("touchcancel", event => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        regconizer.cancel(touch, context);
        contexts.delete(touch.identifier);
      }
    })
  }

}

export class Recognizer {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }
  start(point, context) {
    // console.log("start");
    context.isPan = false;
    context.isPress = false;
    context.isTap = true;
    context.startX = point.clientX; context.startY = point.clientY;
    context.points = [{
      t: Date.now(),
      x: point.clientX,
      y: point.clientY
    }];
  
    context.handler = setTimeout(() => {
      context.isPan = false;
      context.isPress = true;
      context.isTap = false;
      context.handler = null;
      console.log("press");
      this.dispatcher.dispatch("press", {});
    }, 500);
  }
  move(point, context) {
    // console.log("move");
    let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
    if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
      context.isPan = true;
      context.isPress = false;
      context.isTap = false;
      context.isVertical = Math.abs(dx) < Math.abs(dy);
      clearTimeout(context.handler);
      console.log("panstart");
      this.dispatcher.dispatch("panstart", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical
      });
    }
  
    if (context.isPan) {
      console.log("pan");
      this.dispatcher.dispatch("pan", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical
      });
    }
  
    context.points = context.points.filter(point => (Date.now() - point.t > 500));
  
    context.points.push({
      t: Date.now(),
      x: point.clientX,
      y: point.clientY
    });
  }
  end(point, context) {
    // console.log("end");
    if (context.isTap) {
      console.log("tap");
      this.dispatcher.dispatch("tap", {});
      clearTimeout(context.handler);
    }
    if (context.isPress) {
      console.log("pressend");
      this.dispatcher.dispatch("pressend", {});
    }

  
    context.points = context.points.filter(point => (Date.now() - point.t) > 500);
    let d, v;
  
    if (!context.points.length) {
      v = 0;
    } else {
      d = Math.sqrt((point.clientX - context.points[0].x) ** 2 +
        (point.clientY - context.points[0].y) ** 2);
      v = d / (Date.now() - context.points[0].t);
    }
    console.log("速度", v);
    context.isFlick = true;
    if (v > 1.5) {
      this.dispatcher.dispatch("flick", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick,
        velocity: v
      });
      context.isFlick = true;
    } else {
      context.isFlick = false;
    }

    if (context.isPan) {
      console.log("panend");
      this.dispatcher.dispatch("panend", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick
      });
    }
  }
  // 触屏才会有cancel
  cancel(point, context) {
    console.log("cancel");
    clearTimeout(context.handler);
    this.dispatcher.dispatch("cancel", {})
  }
}

export function enableGesture(element) {
  new Listener(new Recognizer(new Dispatcher(element)), element)
}

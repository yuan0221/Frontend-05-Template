const TICK = Symbol("tick");
const TICK_HANDLER = Symbol("tick-handler");
const ANIMATIONS = Symbol("animations");


export class TimeLine {
  constructor() {
    this[ANIMATIONS] = new Set();
  }
  start() {
    let startTime = Date.now();
    this[TICK] = () => {
      let t0 = Date.now() - startTime;
      for(let animation of this[ANIMATIONS]) {
        if(animation.duration < t0) {
          this[ANIMATIONS].delete(animation);
          t0 = animation.duration;
        }
        animation.receive(t0);
      }
      requestAnimationFrame(this[TICK]);
    }
    this[TICK]();
  }
  pause() {

  }
  resume() {

  }
  reset() {

  }
  add(animation) {
    this[ANIMATIONS].add(animation);
  }
}

export class Animation {
  constructor(object, property, startValue, endValue, duration, timeingFunction) {
    this.object = object;
    this.property = property;
    this.startValue = startValue;
    this.endValue = endValue;
    this.duration = duration;
    this.timeingFunction = timeingFunction;
  }
  receive(time) {
    let range = this.endValue - this.startValue;
    this.object[this.property] = this.startValue + range * time / this.duration;
  }
}
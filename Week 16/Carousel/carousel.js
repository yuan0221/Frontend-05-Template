import { Component, createElement, STATE, ATTRIBUTE } from "./framework"
import { enableGesture } from "./gesture.js"
import { Animation, TimeLine } from "./animation.js"
import { ease } from "./cubicBezier.js"

export { STATE, ATTRIBUTE } from './framework.js';

export class Carousel extends Component {
  constructor() {
    super();
  }
  render() {
    this.root = document.createElement("div");
    this.root.classList.add("carousel");
    for (let record of this[ATTRIBUTE].src) {
      let child = document.createElement("div");
      child.style.backgroundImage = `url('${record.img}')`;
      this.root.appendChild(child);
    }

    enableGesture(this.root);
    let tl = new TimeLine;
    tl.start();

    let handler = null;

    let children = this.root.children;

    this[STATE].position = 0;
    let t = 0;
    let ax = 0;

    this.root.addEventListener("start", (event) => {
      tl.pause();
      clearInterval(handler);
      let progress = (Date.now() - t) / 500;
      ax = ease(progress) * 500 - 500;
    })

    this.root.addEventListener("tap", event => {
      this.triggerEvent("click", {
        data: this[ATTRIBUTE].src[this[STATE].position],
        position: this[STATE].position
      })
    })

    this.root.addEventListener("pan", (event) => {
      let x = event.clientX - event.startX - ax;
      let current = this[STATE].position - ((x - x % 500) / 500);

      for (let offset of [-1, 0, 1]) {
        let pos = current + offset;
        pos = (pos % children.length + children.length) % children.length;

        children[pos].style.transition = "none";
        children[pos].style.transform = `translateX(${- pos * 500 + offset * 500 + x % 500}px)`;
      }
    })

    this.root.addEventListener("end", (event) => {

      tl.reset();
      tl.start();
      handler = setInterval(nextPictrue, 3000)

      let x = event.clientX - event.startX - ax;
      let current = this[STATE].position - ((x - x % 500) / 500);

      let direction = Math.round((x % 500) / 500);

      if (event.isFlick) {
        if (event.velocity < 0) {
          direction = Math.ceil((x % 500) / 500);
        } else {
          direction = Math.floor((x % 500) / 500);
        }
      }

      for (let offset of [-1, 0, 1]) {
        let pos = current + offset;
        pos = (pos % children.length + children.length) % children.length;

        children[pos].style.transition = "none";
        tl.add(new Animation(children[pos].style, "transform",
          - pos * 500 + offset * 500 + x % 500,
          - pos * 500 + offset * 500 + direction * 500,
          500, 0, ease, v => `translateX(${v}px)`))
      }

      this[STATE].position = this[STATE].position - ((x - x % 500) / 500) - direction;
      this[STATE].position = (this[STATE].position % children.length + children.length) % children.length;

      this.triggerEvent("change", { position: this[STATE].position });
    })
    /*this.root.addEventListener("mousedown", event => {
      let children = this.root.children;
      let startX = event.clientX;

      let move = event => {
        let x = event.clientX - startX;

        let current = position - ((x - x % 500) / 500);
        for(let offset of [-1, 0, 1]) {
          let pos = current + offset;
          pos = (pos + children.length) % children.length;

          children[pos].style.transition = "none";
          children[pos].style.transform = `translateX(${- pos * 500 + offset * 500 + x % 500}px)`;
        }
        // for(let child of children) {
        //   child.style.transition = "none";
        //   child.style.transform = `translateX(${- position * 500 + x}px)`;
        // }
      }

      let up = event => {
        let x = event.clientX - startX;
        position = position - Math.round(x / 500);

        for(let offset of [0, -Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))]) {
          let pos = position + offset;
          pos = (pos + children.length) % children.length;

          children[pos].style.transition = "";
          children[pos].style.transform = `translateX(${- pos * 500 + offset * 500}px)`;
        }

        // for(let child of children) {
        //   child.style.transition = "";
        //   child.style.transform = `translateX(${- position * 500}px)`;
        // }
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      }

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    })*/

    let nextPictrue = () => {
      let children = this.root.children;
      let nextIndex = (this[STATE].position + 1) % children.length;

      let current = children[this[STATE].position];

      let next = children[nextIndex];

      t = Date.now();

      tl.add(new Animation(current.style, "transform",
        - this[STATE].position * 500, - 500 - this[STATE].position * 500, 500, 0, ease, v => `translateX(${v}px)`))

      tl.add(new Animation(next.style, "transform",
        500 - nextIndex * 500, - nextIndex * 500, 500, 0, ease, v => `translateX(${v}px)`))

      this.triggerEvent("change", { position: this[STATE].position });
      this[STATE].position = nextIndex;

    }

    handler = setInterval(nextPictrue, 3000)
    return this.root;
  }
}
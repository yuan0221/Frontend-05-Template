import { Component, createElement } from "./framework"

class Carousel extends Component {
  constructor() {
    super();
    // 这里将数据 d 存到 attributes 中
    this.attributes = Object.create(null);
  }
  // 重写 setAttribute
  setAttribute(name, value) {
    this.attributes[name] = value;
  }
  render() {
    this.root = document.createElement("div");
    this.root.classList.add("carousel");
    for(let record of this.attributes.src) {
      let child = document.createElement("div");
      child.style.backgroundImage = `url('${record}')`;
      this.root.appendChild(child);
    }

    // 鼠标拖动轮播
    let position = 0;
    this.root.addEventListener("mousedown", event => {
      let children = this.root.children;
      let startX = event.clientX;

      let move = event => {
        let x = event.clientX - startX;

        // 如果 position=0 表示当前屏幕上图片的位置，那么计算出的 current 是移动后当前屏幕上的图片位置
        // eg. 向右边移动，移动不足500px时候，current=0，移动>=500px时候，current=-1
        let current = position - ((x - x % 500) / 500);

        // 循环数组[-1, 0, 1]，修改了当前图片前后的图片能正确显示其位置
        for(let offset of [-1, 0, 1]) {
          let pos = current + offset;
          pos = (pos + children.length) % children.length;

          children[pos].style.transition = "none";
          children[pos].style.transform = `translateX(${- pos * 500 + offset * 500 + x % 500}px)`;
        }

        // 存在问题：1）不能循环拖动，2）每次拖动移动了所有 children，性能问题
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
          if(offset === 0)
            position = pos;

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
    })

    
    // 自动轮播
    /*let currentIndex = 0;
    setInterval(() => {
      let children = this.root.children;
      let nextIndex = (currentIndex + 1) % children.length;

      let current = children[currentIndex];
      let next = children[nextIndex];

      next.style.transition = "none";
      next.style.transform = `translateX(${100 - nextIndex * 100}%)`;

      setTimeout(() => {
        next.style.transition = "";
        current.style.transform = `translateX(${-100 - currentIndex * 100}%)`;
        next.style.transform = `translateX(${-nextIndex * 100}%)`;

        currentIndex = nextIndex;
      }, 16)
    }, 3000)*/
    return this.root;
  }
  mountTo(parent) {
    parent.appendChild(this.render());
  }
}

let d = [
  "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
  "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
  "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
  "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"
]

let a = <Carousel src={d} />
a.mountTo(document.body);
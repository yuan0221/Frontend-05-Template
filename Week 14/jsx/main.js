

function createElement(type, attributes, ...children) {
  console.log(children);
  let element;
  if(typeof type === "string")
    // 原生html标签
    element = new ElementWrapper(type);
  else 
    // class
    element = new type();

  for(let name in attributes) {
    element.setAttribute(name, attributes[name]);
  }
  for(let child of children) {
    if(typeof child === 'string') {
      child = new TextWrapper(child);
    }
    element.appendChild(child);
  }
  return element;
}

// 如果是原生html标签，就会没有 mountTo 方法，所以这里加一个 wrapper 
class ElementWrapper {
  constructor (type){
    this.root = document.createElement(type);
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }
  appendChild(child) {
    child.mountTo(this.root);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

class TextWrapper {
  constructor (content){
    this.root = document.createTextNode(content);
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }
  appendChild(child) {
    child.mountTo(this.root);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

class Div {
  constructor (){
    this.root = document.createElement('div');
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }
  appendChild(child) {
    child.mountTo(this.root);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

// 1.这里声明的的jsx，在没有jsx插件编译的情况下，出现语法错误
// 2.在我们没有声明自己的 createElement 方法之前，会报错 createElement 未定义
// 3.jsx语法默认传给 createElement 方法三个参数：标签名，属性集合，节点
// 4.因此看到，jsx语法实际上只是把我们平常写的函数调用，改写成类似HTML的结构，可以称作语法糖

// let a = <div id="a">123</div>;



// 5. 如果写的元素有子元素，将会递归调用 createElement，
// 子元素将作为 createElement 的后面的参数传进去，像下面这样
// createElement("div", {
//   id: "a"
// }, 
// createElement("span", null, "1"),
// createElement("span", null, "2"), 
// createElement("span", null, "3"));

// let a = <div id="a">
//     <span>1</span>
//     <span>2</span>
//     <span>3</span>
//   </div>



// 6.class

let a = <Div id="a"> 
    <span>1</span>
    <span>2</span>
    <span>3</span>
  </Div>

a.mountTo(document.body);
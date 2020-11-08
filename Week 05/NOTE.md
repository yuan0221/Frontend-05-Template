## 1. proxy
proxy是javascript中一个内置对象，使用的时候通过 `new Proxy()` 创建 `proxy` 对象，传入两个参数 `target` 和 `handler`
```
  const p = new Proxy(target, handler)
```
`target` 表示要代理的对象， `handler` 是一个对象，里面包含了一个个属性，属性的值是一个函数，用来操作 `p` 的行为；

handler 对象是一个容纳一批特定属性的占位符对象。它包含有 Proxy 的各个捕获器（trap），比如下文要实现的响应式，就要使用其中 `get` `set` 两个捕获器。

## 2. vue 3.0 响应式的原理

```
  let data = {
    a: 1
  }

  let vm = new Proxy(data, {
    get(target, key) {
      console.log('get', target, key)
      return target[key]
    },
    set(target, key, newVal) {
      console.log('set', target, key)
      if(target[key] === newVal)
        return
      console.log(target[key] + '--->' + newVal)
      target[key] = newVal
    }
  })
```

## 3. 监听机制

使用 `effect` 函数，实现DOM对数据的监听。

  ```
    let object = {
      a: 1
    };

    let po = new reactive(object);

    effect(() => {
      console.log(po.a); //打印出变化后的值
    })

    function effect(callback) {
      callback();
    }

    function reactive(object) {
      let proxy = new Proxy(object, {
        set(obj, prop, val) {
          obj[prop] = val;
          callback();
        },
        get(obj, prop) {
          return obj[prop];
        }
    })
  }
  ```

  数据对DOM的监听，是利用DOM元素的本身的事件机制

  ## 4. 拖拽

  Range 接口表示一个包含节点与文本节点的一部分的文档片段，语法如下

  ```
    let range = document.createRange();
  ```

  CSSOM(CSS Object Model), CSS对象模型，是对CSS样式表的对象化表示，同时还提供了相关API用来操作CSS样式,例如要获取元素的位置信息，可以使用如下Api

  ```
    const rect = range.getBoundingClientRect();
  ```




# 重学HTML

## HTML的定义
- 主要源流：XML 和 SGML
- html最早是SGML的一个子集，所以有SGML的DTD，DTD是SGML规定的定义它的子集的这样的文档的格式
- W3c想规范html。于是出来了XHTML，xhtml1.0对应HTML的4.2版本，是html4的严格模式
- HTML5 后：接受了 XML 和 SGML 灵感的一门独立语言
- SGML的DTD与XML的namespace
  - DTD
    - https://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd
      - 重点是实体定义见xhtml-lat1.ent
    - https://www.w3.org/TR/xhtml1/dtds.html
  - namaspace:
    - https://www.w3.org/1999/xhtml

## HTML标签语义
- 语义标签使用方法见wiki.html

## HTML语法
- **合法元素**
  - Element: `<tagName> </tagName>`
  - Text: `text`
  - Commont: `<!-- commonts -->`
  - DocumentType: `<!DOCTYPE html>`
  - ProcessingInstruction: `<?a 1?>`
    - 将数据 1 传给处理器 a
    - 预处理语法
  - CDATA: `<![CDATA[]]>`
    - 文本的另一种语法的表达
- **字符引用**
  - &#161; - `&#161;`
  - &amp; - `&amp;`
  - &lt; - `&lt;`
  - &quot; - `&quot;`
  - &apos; - `&apos;`
  - &#39; - `&#39;`


# 浏览器API

## DOM API
### 节点
- 见nodeApi.json
- 导航类操作: 允许我们在 DOM 树上，自由的移动
  - 节点
    - parentNode
    - childNodes
    - firstNode
    - lastNode
    - nextSibling
    - previousSibling
  - 元素
    - parentElement
    - children
    - firstElementChild
    - lastElementChild
    - nextElementSibling
    - previousElementSibling
  - 重复设计：parentNode 和 parentElement指的是同一个东西
- 修改操作
  - appendChild
  - insertBefore
    `根据最小化原则，可以搭配 appendChild + insertBefore 实现 insertAfter`
  - removeChild
  - replaceChild
    `先找到 parent，在进行操作。replaceChild 违背最小化原则。`
  - append / insert DOM 树上的节点时，会自动 remove
- 高级操作
  - compareDocumentPosition: 用于比较两个节点中关系的函数
  - contains: 检查一个节点是否包含另一个节点
  - isEqualNode: 检查两个节点是否相同
  - isSameNode: 检查两个节点是否为同一个，实际上在 javascript 中可以用“===”。
  - cloneNode: 复制一个节点，如果传入参数 true，则会连同子元素做深拷贝。

## 事件API
- EventTarget.addEventListener()

## Range API

## CSSOM（批量操作样式）
- styleSheets 对象
  - document.styleSheets
- Rules
  - ```js
    document.styleSheets[0].cssRules;
    document.styleSheets[0].insertRule("p{color:pink;}", 0);
    document.styleSheets[0].removeRule(0);
    ```
  - Rule
    - CSSStyleRule
    - CSSCharetRule
    - CSSImportRule
    - CSSMediaRule
    - CSSFontFaceRule
    - CSSKeyframesRule
    - ...
  - CSSStyleRule
    - selectorText String
    - style K-V 结构
- 如何修改伪元素的样式？
  - 通过 Dom API 无法直接访问伪元素
  - ```
    document.styleSheets[0].cssRule[0].style
    ```
- getComputedStyle （最终真实渲染的 css 属性）
  - `window.getComputedStyle(elt,pseudoElt)`
    - elt 想要获取的元素
    - pseudoElt 可选，指定一个要匹配的伪元素的字符串。必须对普通元素省略（或 null）。
  - transform / 元素拖拽 / 动画中间态（暂停）


## CSSOM View
- 与render后的浏览器视图相关
- window API
  - window.innerHeight, widnow.innerwidth
  - window.outerHeight, window.outerWidth
  - widnow.devicePixelRatio（DPR
    - 屏幕物理像素 与 代码逻辑像素 比值关系
    - 正常情况 1:1
    - retina 1:2
    - 有些安卓机 1:3
  - window.screen
    - window.screen.width
    - window.screen.height
    - window.screen.availWidth
    - window.screen.availHeight
  - window.open('about:blank','\_blank','width=100,height=100,left=100,right=100')
  - moveTo(x,y)
  - moveBy(x,y)
  - resizeTo(x,y)
  - resizeBy(x,y)
- scroll
  - overflow:scroll 元素
    - scrollTop: 获取/设置一个元素的内容垂直滚动的像素数。
    - scrollLeft
    - scrollWidth
    - scrollHeight
    - scrollTo(x,y) / scroll(x,y)
    - scrollBy(x,y)
    - scrollIntoView()
  - window
    - scrollX
    - scrollY
    - scroll(x,y) / scrollTo(x,y)
    - scrollBy(x,y)
- layout
  - getClientRects( )
    - 返回一个指向客户端中每一个盒子的边界矩形的矩形集合。
  - getBoundingClientRect( )
    - 返回的结果是包含完整元素的最小矩形
## 其它API
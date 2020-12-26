## CSS排版

### 盒
- 标签，元素，盒概念区分
  - 源代码 标签 Tag
  - 语义  元素  Element
  - 表现  盒    Box
- HTML代码中可以书写开始__Tag__，结束__Tag__ ，和自封闭__Tag__ 。
- 一对起止__Tag__ ，表示一个__Element__ 。
- DOM树中存储的是__Element__和其它类型的节点（Node）。
  - CDATA 被<![CDATA[]]>这个标记所包含的内容将表示为纯文本，比如<![CDATA[<]]>表示文本内容“<”。
　　此标记用于xml文档中
  - XML DOM - ProcessingInstruction 对象，表示处理指令
  - DTD，文档类型定义(Document Type Definition)
- CSS选择器选中的是__Element__ 。
- CSS选择器选中的__Element__ ，在排版时可能产生多个__Box__ 。
- 排版和渲染的基本单位是__Box__ 。
- 盒模型

### 正常流（Normal Flow）
- 收集盒进行
- 计算盒在行中的排布
- 计算行的排布
- IFC （Inline Formatting Context）
  - 从左往右排 inline-box
  - 因为排的时候要保存一些信息，所以有行内级格式化上下文
- BFC (Block Formatting Context)
  - 从上往下排 block-level-box
  - 块级格式化上下文
- writing-mode 属性定义了文本在水平或垂直方向上如何排布。
- 两个机制
  - float
    - 依附于正常流排布的方式
  - clear
    - 找到一块干净的空间执行浮动

### 正常流的行级排布
- baseline 基线对齐
  - 英文以四线格的第三条线为基准
  - 中文以方块字的上下缘为基准
  - 中英混排时候，认为中文有点偏移
- Text 
  - 码点
  - 字体的形状由字体库决定，比如C++的 freeType 字体库
- 行模型
  - line-top
  - text-top
  - base-line
  - text-bottom
  - line-bottom
  - line-top 和 line-bottom当行高大于文字高度时候出现
  - 如果文字和盒混排的时候，会出现line-top和line-bottom偏移

### 正常流的块级排布
  - Margin Collapse
    - 只有在正常流的同一个BFC中会出现margin折叠现象

### BFC合并
- Block Container 里面有BFC的
  - 能容纳正常流的盒，里面就有BFC，有哪些？
    - 所有的里面能容纳不是特殊的display模式的
    - block
    - inline-block
    - table-cell
    - flex item
    - grid cell
    - table-caption
- Block-level Box 外面有BFC的
  - Block level
    - display: block
    - dispay: flex
    - display: table
    - display: grid
  - Inline level
    - display: inline-block
    - dispay: inline-flex
    - display: inline-table
    - display: inline-grid 
- Block Box = Block Container + Block-level Box 里外都有BFC的

### 建立BFC
- [css标准](https://www.w3.org/TR/CSS2/visuren.html#normal-flow)中有四大类设立BFC的情况
  - Floats
  - absolutely positioned elements
  - block containers (such as inline-blocks, table-cells, and table-captions) that are not block boxes
  - and block boxes with 'overflow' other than 'visible' (except when that value has been propagated to the viewport) establish new block formatting contexts for their contents.
- 另一种及角度思考设立BFC的情况：
  - 默认能容纳正常流的盒，都认为它会创建BFC，但是有一种例外情况，Block Box 里外都是BFC，并且overflow是visible
- block box && overflow:visible
  - BFC合并与float
  - BFC合并与边距折叠

### Flex排版
- 收集盒进行
  - 根据主轴尺寸，把元素分进行
  - 若设置了no-wrap，则强行分配进第一行
- 计算盒在主轴方向的排布
  - 找出所有Flex元素
  - 把主轴方向的剩余尺寸按比例分配给这些元素
  - 若剩余空间为负数，所有flex元素为0，等比压缩剩余元素
- 计算盒在交叉轴方向的排布
  - 根据每一行中最大元素尺寸计算行高
  - 根据行高flex-align和item-align，确定元素具体位置



## CSS动画与绘制

### 动画
- Animation
  - @keyframes定义
    - @keyframes mykf
      {
        from {background: red;}
        to {background: yellow;}
      }
    - @keyframes myfk {
        0% {top:0; transition: top ease}
        50% {top:30px; transition: top ease-in}
        75% {top:10px; transition: top ease-out}
        100% {top:0; transition: top linear}
      }
  - animation使用
    - div
      {
        animation: mykf 5s infinite;
      }
    - animation-name 时间曲线
    - animation-duration 动画的时长
    - animation-timing-function 动画的时间曲线
    - animation-delay 动画开始前的延迟
    - animation-iteration-count 动画的播放次数
    - animation-direction 动画的方向
- Transition
  - transition-property 要变换的属性
  - transition-duration 变换的时长
  - transition-timing-function 时间曲线
    - 贝塞尔曲线
  - transition-delay 延迟

### 颜色
- CMYK 与 RGB
- HSL 与 HSV

### 绘制
- 几何图形
  - border
  - box-shadow
  - border-radius
- 文字
  - font
  - text-decoration
- 位图
  - background-image
- 手机上依赖的图形库Skia，windows上依赖GDI，再底层用shader绘制
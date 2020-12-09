## 排版，得到带位置的dom树
- 第一步，排版方式
  - 正常流
  - flex
    - 主轴
      - flex-direction: row;
      - Main: x width left right
      - Cross: y height top bottom
    - 交叉轴
      - flex-direction: column;
      - Main: y height top bottom
      - Cross: x width left right
  - grid
  - CSS Houdini

- 第二步，分行
  - 根据主轴尺寸，把元素分进行
  - 若设置了no-wrap，则强行分配进第一行

- 第三步，计算主轴方向
  - 找出所有Flex元素
  - 把主轴方向剩余的尺寸按比例分配给这些元素
  - 若剩余空间为负数，所有flex元素为0，等比例压缩剩余元素

- 第四步，计算交叉轴
  - 根据每一行中最大元素计算行高
  - 根据行高flex-align和item-align,确定元素具体位置


## 绘制
- 第一步
  - 绘制需要依赖一个图形环境
  - 这里采用npm包images
  - 绘制在一个viewport上进行
  - 与绘制相关的属性：background-color、border、background-images等等。

- 第二步
  - 递归调用子元素的绘制方法完成dom树的绘制
  - 忽略一些不需要绘制的节点
  - 实际浏览器中，文字绘制是难点，需要依赖字体库，这里忽略
  - 实际浏览器中，还会对一些图层做compositing，这里也忽略
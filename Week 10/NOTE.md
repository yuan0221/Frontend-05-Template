- 排版，得到带位置的dom树


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
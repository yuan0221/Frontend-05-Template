- CSS(Cascading Style Sheet 级联样式表)
  - at-rules
    - @charset
    - @import
    - @media (重要)
    - @page
    - @counter-style
    - @keyframes (重要)
    - @fontface (重要)
    - @support
    - @namespace
  - rule
    - Selector
      - selector_group
      - selector
        - >
        - <sp>
        - +
        - ~
      - simple_selector
        - type
        - *
        - .
        - #
        - []
        - :
        - ::
        - :not()
    - Declaration
      - Key
        - variables
        - properties
      - value
        - calc
        - number
        - length
        - ...



- 选择器语法
  - 简单选择器
    - *
    - div svg|a
    - .cls
    - #id
    - [attr=value]
    - :hover 伪类
    - ::before 伪元素
  - 复合选择器
    - <简单选择器><简单选择器><简单选择器>
    - *或者div必须写在最前面
  - 复杂选择器
    - <复合选择器><sp><复合选择器>  
    - <复合选择器>">"<复合选择器>
    - <复合选择器>"～"<复合选择器>
    - <复合选择器>"+"<复合选择器>
    - <复合选择器>"||"<复合选择器>  Level4


- 选择器优先级
  - div#a.b .c[id=X]
    - a=1 b=3 c=1 -> [0, 1, 3, 1] -> s = 0 * 10 ** 3 + 1 * 10 ** 2 + 3 * 10 ** 1 + 1 * 10 ** 0 = 131
  - #a:not(#b)
    - a=2 b=0 c=0 -> [0, 2, 0, 0] -> s = 0 * 10 ** 3 + 2 * 10 ** 2 + 0 * 10 ** 1 + 0 * 10 ** 0 = 200
  - *.a
    - a=0 b=1 c=0 -> [0, 0, 1, 0] -> s = 0 * 10 ** 3 + 0 * 10 ** 2 + 1 * 10 ** 1 + 0 * 10 ** 0 = 10
  - div.a 
    - a=0 b=1 c=1 -> [0, 0, 1, 1] -> s = 0 * 10 ** 3 + 0 * 10 ** 2 + 1 * 10 ** 1 + 1 * 10 ** 0 = 11


- 伪类
  - 链接/行为
    - :any-link 匹配任何的超链接
    - :link:visited link匹配还没访问过的，visited匹配访问过的
      - 设置了link或visited的元素之后，除颜色以外的css属性不能更改，和浏览器安全相关
    - :hover
    - :active
    - :focus
    - :target
  - 树结构
    - :empty
    - :nth-child()
    - :nth-last-child()
    - :first-child:last-child:only-child
  - 逻辑型
    - :not
    - :where:has  Level4


- 伪元素
  - ::before
  - ::after
  - ::first-line
  - ::first-letter
  - TODO 为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？
    
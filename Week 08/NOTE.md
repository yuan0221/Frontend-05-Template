# 浏览器工作原理

## 1. 浏览器渲染步骤
  - URL（HTTP）
  - HTML（parse）
  - DOM（css computing）
  - DOM with CSS（layout）
  - DOM with position（render）
  - Bitmap

## 2.状态机
  - 状态机是有限状态机的简称，是现实事物运行规则抽象而成的一个数学模型。
  - 每一个状态都是一个机器，每一个机器用函数表示就是一个纯函数。
  - e.g: 自动售货机
  - 作业：
    - 字符串中找到'a',for in循环
    - 字符串中找到'ab',不使用正则
    - 字符串中找到'abcdef',不使用正则
    - 状态机字符串中找到'abcdef'
    - 状态机字符串中找到'abcabx'
    - 状态机字符串中找到'abababx'
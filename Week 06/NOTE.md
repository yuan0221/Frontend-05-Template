## 1.语言按语法分类
- 非形式语言
  - 中文，英文
- 形式语言（乔姆斯基谱系）
  - 0型 无限制文法
  - 1型 上下文相关文法
  - 2型 上下文无关文法
  - 3型 正则文法
  - TODO 语言分类

## 2. 产生式
- 描述方法
  - （BNF）Backus-Naur Form，巴斯科诺尔范式
    - 用尖括号扩起来的名称表示语法结构名
    - 语法结构分为**基础结构**和需要用其他的语法结构定义的**复合结构**
      - 基础结构称**终结符**
      - 复合结构称**非终结符**
    - 引号和中间的字符表示终结符
    - 可以有括号
    - *表示重复多次
    - ｜ 表示或
    - \+ 表示至少一次
    - [《编译原理》](http://sighingnow.github.io/%E7%BC%96%E8%AF%91%E5%8E%9F%E7%90%86/bnf.html)中有这么一段话
      >BNF(Backus-Naur Form)是描述编程语言的**文法**。巴科斯范式是一种用于表示上下文无关文法的语言，上下文无关文法描述了一类**形式语言**。
      自然语言存在不同程度的二义性。这种模糊、不确定的方式无法精确定义一门程序设计语言。必须设计一种准确无误地描述程序设计语言的语法结构，这种严谨、简洁、易读的形式规则描述的语言结构模型称为**文法**。

## 3. 一般命令式编程语言
- Atom 
  - identifier 标示符
  - Literal 字面量
- Expression
  - Atom 原子
  - Operator 运算符
  - Punctuator 符号
- Statement 语句
  - Expression
  - Keyword
  - Punctuator
- Structure 机构化
  - Function
  - Class
  - Process
  - Namespace
- Program 
  - Program
  - Module
  - Package
  - Library

语法 语义 运行时

## 4. js最小单位
- Atom 原子
  - Grammar 语法
    - Literal （字面值）
    - Variable (变量)
    - KeyWorlds （关键字）
    - Whitespace （空白符）
    - Line Terminator （换行符）
  - Runtime 运行时
    - Types （运行时类型）
    - Execution Context （执行上下文）

## 5. js类型
  - Number
  - String
  - Boolean
  - Object
  - Null
  - Undefined
  - Symbol
  - (BigInt) 

  ### Number
  - 概念
    - IEEE754 Double Float 双精度浮点数
      - Sign (1) 符号位，0表示正 1表示负
      - Exponent (11) 指数位
      - Fraction (52) 精度位

  - 语法
    - 十进制 
      - 0 
      - 0. 
      - .0 
      - 1e2
    - 二进制
      - 0b111  0b开头只能表示整数
    - 八进制
      - 0o10  0o开头
    - 十六进制
      - 0xFF  0x开头

  - 案例
    ```
      0.toString()
      0 .tostring()
    ```
    ```
      0.1 + 0.2 ！== 0.3
      十进制转为二进制表示的时候，有精度损失
      两次准换，一次相加，一次比较，有四次精度损失
    ```
  ### String
  - 概念
    - Character 字符
      - ASCII 
        - 127个字符，26个大写，26个小写，制表符，换行符， 特殊字符，最早的美国计算机编码方式
      - Unicode
        - 全世界的语言字符合集
      - UCS
        - 0000 ～ FFFF 两个字节
      - GB
        - GB2312
        - GBK(GB13000)
        - GB18030
        - GB和Unicode不兼容，兼容ASCII
      - ISO-8859
        - 兼容ASCII，但是互不兼容
      - BIG5
        - 台湾
    - Code Point 码点表示
    - Encoding 编码方式
      - UTF
        - UTF8 
          - 一个字符占1个字节（8个bit位）
        - UTF16
          - 一个字符占2个字节（16个bit位）
      
  ### Null 和 Undefined 
  - Null
    - 有值但是为空
    - 关键字，不能给null赋值
  - Undefined
    - 没有设置值，未定义
    - 全局变量，可以给undefined赋值
  - void 0

  ### Object
  - 概念
    - 英语意思是一切物体的统称，中文中的找不到一个词概括表示这个意思，就翻译成了对象，台湾翻译成‘物件‘
    - 任何一个对象都是唯一的，与它的状态无关，因此即使状态一样，两个对象也不相等
    - 可以用鱼的例子理解
  - Class
    - 用类来描述对象
      - 归类思想
        - 多继承，C++
      - 分类思想
        - 单继承，有一个基类Object, C#、Java
        - Javascript 接近分类思想
    - 用原型描述对象
    - 案例-'狗咬人'
      ```
        错误：
        class Dog {
          bite(human) {
            // something
          }
        }

        正确：
        class Human {
          hurt(damage) {
            // something
          }
        }
      ```
      - 描述对象时候，不应该受到语言描述的干扰
      - 总是遵循'行为改变状态'的原则
      - 启示：人类交流的自然语言、口语和程序设计表达形式是不一样的
  
## 6. js中的对象
  - Javascript运行时，原生对象的描述，只需要关心**原型**和**属性**两个部分
  - 属性可以描述状态，也可以描述行为
  - 唯一表示符是内存地址
  - 找对象上的属性的时候，自身没有的话，就在原型上找，一直找到原型为null，找属性的这种行为，形成了原型链
  - 属性的是kv对，k是字符串或者symbol
  - javascript用属性统一抽象对象的状态和行为，数据属性描述状态， 访问器属性描述行为，数据属性中值是函数，也可以描述行为
  - 数据属性
    - \[[value]] 
    - writeble 
    - enumerble 
    - configurable
  - 访问器属性
    - get 
    - set 
    - enumerble 
    - configurable
  - Api/Grammer
    - 基本面向对象能力
      - {}
      - . 
      - [] 
      - Object.defineproperty
    - 基于原型的对象描述方法
      - Object.create 
      - Object.setPrototypeOf
      - Object.getPrototypeOf  
    - 基于分类
      - new
      - class
      - extends
    - es3版本
      - new
      - function
      - prototype
    - 特殊行为对象
      - Array：Array 的 length 属性根据最大的下标自动发生变化。
      - Object.prototype：作为所有正常对象的默认原型，不能再给它设置原型了。
      - String：为了支持下标运算，String 的正整数属性访问会去字符串里查找。
      - Arguments：arguments 的非负整数型下标属性跟对应的变量联动。
      - 模块的 namespace 对象：特殊的地方非常多，跟一般对象完全不一样，尽量只用于 import
      - 类型数组和数组缓冲区：跟内存块相关联，下标运算比较特殊
      - bind 后的 function：跟原来的函数相关联
















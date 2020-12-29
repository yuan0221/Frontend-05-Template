# js语言通识

## 泛用语言的分类方式
- 语言按语法分类
  - 非形式语言
    - 中文，英文
  - 形式语言
    - 按乔姆斯基谱系的这种按照文法的复杂程度分类
      - 0型 无限制文法
      - 1型 上下文相关文法
      - 2型 上下文无关文法
      - 3型 正则文法
    - 按用途
      - 数据描述语言  JSON，HTML，XML，CSS，SQL
      - 编程语言     JavaScript、Java、PHP、Rube、Python、C、C++、C#  
    - 按表达方式
      - 声明式（告诉结果是什么样的）   
        - JSON，HTML，XML，CSS，SQL
      - 命令式 （告诉达成这个结果，每个步骤是什么样的）  
        - JavaScript、Java、PHP、Rube、Python、C、C++、C#


## 产生式
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
- JavaSript属于什么文法？
  - JavaSript总体上属于上下文无关文法，其中的表达式部分大部分属于正则文法
  - 有2个特例，例如2 ** 1 ** 2乘方运算是右结合的，所以不属于正则文法
  - 另外一个例子
  ```
    {
      get a {return 1;},
      get: 1
    }
  ```
  在get后面有a，get代表一个类似关键字，get后面冒号的话，get是属性，如果严格按照乔姆斯基谱系定义，属于上下文相关文法


## 现代语言的特例
- C++中，* 可能表示乘号或指针，具体是哪个，取决于星号前面的标识符是否被声明为类型
- VB中，< 可能是小于号，也可能是XML直接量的开始，取决于当前位置是否可以接受XML直接量
- Python中，行首的tab符和空格会根据上一行的行首空白以一定规则被处理成虚拟终结符indent或者dedent
- js中，/ 可能是除号，也可能是正则表达式的开头，处理方式类似于VB，字符串模板中也需要特殊处理 }, 还有自动插入分号规则


## 编程语言的性质
- 图灵完备性
  - 命令式-图灵机
    - goto语句
    - if和while语句
  - 声明式-lambda演算
    - 递归
- 动态和静态
  - 动态
    - 在用户的设备或者在线的服务器上
    - 产品实际运行时
    - Runtime
  - 静态
    - 在程序员的设备上
    - 产品开发时
    - Compiletime
- 类型系统
  - 动态类型系统与静态类型系统
    - 动态类型系统是在用户的机器上，内存中能找到的类型，例如js
    - 静态类型系统是在程序员写代码时候能找到类型，例如C++
    - java半静态半动态，反射机制，可以在运行时通过反射取到类型
  - 强类型与弱类型
    - 编程语言中类型转换发生的形式
    - 强类型语言的类型转换是不会发生的
    - 弱类型例如js中类型转换
      - String + Number
      - String == Boolean
  - 复合类型
    - 结构体
        ```
          {
            a: T1,
            b: T2
          }
          (T1, T2) => T3
        ```
    - 函数签名
      - 例如js中函数也有类型，称为函数签名，函数签名包括参数类型和返回值类型
  - 子类型
    - C++有子类型的概念
  - 泛型
    - 把类型当做参数传给一段代码结构，代码结构可能是类或者函数，分别对应着泛型类和泛型函数
    - 泛型和子类型结合又会产生逆变/协变的概念
      - 协变-凡是能用Array<Parent>的地方，都能用Array<Child>
      - 逆变-凡是能用Function<Child>的地方，都能用Function<Parent>


## 一般命令式编程语言的设计方式
- Atom 原子级
  - keyword 关键字
  - identifier 标示符
  - Literal 字面量
- Expression
  - Atom 
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


## 重学JavaScript
- 以一定的语法，表达一定的语义，改变运行时
- 语法 语义 运行时


## Number
- js最小单位
  - Atom 原子
    - Grammar 语法
      - Literal （字面值）
      - Variable (变量)
      - KeyWords （关键字）
      - Whitespace （空白符）
      - Line Terminator （换行符）
    - Runtime
      - Types （运行时类型）
      - Execution Context （执行上下文）
- js类型
  - Number
  - String
  - Boolean
  - Object
  - Null
  - Undefined
  - Symbol
    - 专门用于Object的属性名的这样一种特殊的基本类型
  - (BigInt) 
- 定义
  - IEEE754 Double Float 双精度浮点数
    - float表示浮点数，意思是小数点可以来回浮动，基本思想是：把一个数字拆成它的指数和有效位数，
      有效位数决定了浮点数表示的精度，指数决定了浮点数表示的范围
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
      两次转换，一次相加，一次比较，有四次精度损失
    ```


## String 
- 概念
  - Character 字符
    - ASCII 
      - 127个字符，26个大写，26个小写，制表符，换行符，特殊字符，最早的美国计算机发明的编码方式
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
  - Code Point 计算机中用码点表示字符，比如规定97代表a
  - Encoding 编码方式
    - UTF
      - UTF8 
        - 一个字符占1个字节（8个bit位）和ASCII一样
      - UTF16
        - 一个字符占2个字节（16个bit位）
- Grammar
  - "a"
  - 'a'
  - `a`    
- Grammar-Template
  - `ab${x}abc${y}abc`
    - `ab${
    - }abc${
    - }abc`
  - 一个反引号产生4中token


## Null 和 Undefined 
- Null
  - 有值但是为空
  - 关键字，不能给null赋值
- Undefined
  - 没有设置值，未定义
  - 全局变量，可以给undefined赋值
- void 0
  - void是一个关键字，通过void进行一次运算得到undefined
- 代码例子：
  ```
    function f(){
      let undefined = 1;
      console.log(undefined);  //1
    }

    function f(){
      let null = 0;
      console.log(null);  //Uncaught SyntaxError: Unexpected token 'null'
    }
  ```


## Object
- 概念
  - Object在英语意思是一切物体的统称，中文中的找不到一个词概括表示这个意思，就翻译成了对象，台湾翻译成‘物件‘
  - 在人类最早的认知中，就知道三条一模一样的鱼是三个不同的东西，三个相同的苹果也是三个不同的东西
  - 三条鱼中其中一只状态发生改变，比如失去尾巴，那另外两条鱼没有受到影响，因此在计算机中描述这三条鱼时必须把相同的数据存储三份
  - 因此说任何一个对象都是唯一的，与它的状态无关，即使状态一样，两个对象也不相等
  - 不是状态决定对象，而是对象决定状态
  - 用状态描述对象
  - 状态的改变即是行为
  - 对象三要素组成：唯一标识，状态，行为

- 描述对象的方式
  - Class
    - 归类思想
      - 将对象抽象出不同的共性，对象继承多个类
      - 多继承，C++
    - 分类思想
      - 同一个对象只有一个继承的类，对象和抽象的类一一对应的
      - 单继承，有一个基类Object, C#、Java
      - Javascript 接近分类思想
  - Prototype
    - 照猫画虎
    - 我们不做严谨的分类，而是采用”相似“这样的方式去描述对象
    - 任何对象仅仅需要描述它与原型的区别即可
    - 最终版的原型-Object Prototype，再往上就是Nihilo（虚无空有）的东西，js中是null


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
  

## js中的对象
  - Javascript运行时，原生对象的描述，只需要关心**原型**和**属性**两个部分
    - property属性集合
      - js中属性可以描述状态，也可以描述行为，因为函数也可以放进属性里面，所以对象三要素中的状态和行为在这里得到统一，
        唯一标识性呢，使用内存地址表示
    - [[Prototype]]
      - js原生支持原型机制，当我们在一个对象上找一个属性时候，如果对象自身不包含这个属性，则在原型上去找，如果原型的原型不为空，则继续在原型的原型上去找，因此形成一个链式的行为，原型链。

  - 属性是kv对，k是字符串或者symbol
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
















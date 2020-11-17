## 1.js 表达式
  - 运算符和表达式
    - Atom
      - Grammar
        - Grammar Tree vs Priority  语法树 vs 运算符优先级关系
      - Runtime
        - Type Conversion 类型转换
        - Reference 引用类型
          - Object
          - key
    - Expression
      - Member 运算（.运算作为代表）
        - a.b
        - a[b] b可以传入运行时的字符串
        - foo\`string`
        - super.b
        - super[ 'b' ]
        - new target
        - new Foo()
      - new 运算
        - new Foo
        - 例子
          ```
            new a()()   //第一对括号和前面的结合，new a()优先级高
            new new a() //new a()优先级高，先结合
          ```
      - call 运算
        - foo()
        - super()
        - foo()['b']
        - foo().b
        - foo()`abc`
        - 例子
          ```
            new a()['b']  //new出来的a对象，再取属性b
          ```
      - Left hand side & Right hand side 运算符左值和右值
        - 例子
          ```
            a.b = c   //a.b是左值表达式，a + b是右值表达式，只有左值表达式能放在等号左边
            a + b = c  //不合法
          ```
      - Update 表达式
        - a ++
        - a --
        - -- a
        - ++ a
        - 例子
          ```
          - ++ a ++  //后面的a ++ 先执行
          - ++ (a ++)  //不合法
          ```
      - Unary 单步运算
        - delete a.b
        - void foo()
        - typeof a
        - \+ a
        - \- a
        - ~ a  //位运算
        - ! a
        - await a 
      - Exponental 
        - ** 乘方，右结合
        - 例子
          ```
          3 ** 2 ** 3  //2 ** 3先执行
          3 ** (2 ** 3) 
          ```
      - Multiplicative
        - \* / % //参与运算的值必须是number类型，会自动发生类型转换
      - Additive
        - \+ -  
      - Shift 位运算
        - <<  左移
        - \>> 右移
        - \>>> 带符号的右移
      - Relationship 关系比较
        - < > <= >= //会发生类型转换 
        - instanceof
      - Equality 字符串比较，比较的是字典顺序
        - ==
          - 会把布尔类型转为number，因此确定==两边的类型情况下，可以使用
          - 例子
            ```
            true == 2  //会把true转为1，再与2进行比较，结果为false
            true == 1 //结果为true
            ```
        - !=
        - ===
        - !==
      - Bitwise
        - & ^ |
      - Logical 逻辑运算，有短路原则
        - && 
        - ||
      - Conditional 三部运算符，有短路原则
        - ? : 

  - 类型转换
    - Unboxing 拆箱转换
      - toPremitive
      - toString VS valueOf
      - Symbol.toPremitive
    - Boxing 装箱转换
      - Number  --- new Number(1) --- 1
      - String  --- new String("a")  --- "a"
      - Boolean --- new Boolean(true) --- true
      - Symbol  --- new Object(Symbol("a")) --- Symbol("a")

## 2. js语句
  - 运行时相关概念
      
  - 简单语句和复合语句

  - 声明

## 3. js结构化
  - 宏任务和微任务

  - js函数调用
# js表达式

## 运算符和表达式
- Atom
  - Grammar
    - Grammar Tree vs Priority  语法树 vs 运算符优先级关系
      - 运算符的优先级会影响语法树的构成
      - 乘除优先形成最小的语法结构，加减形成更高的语法结构，加括号强制优先执行
      - 在js标准中用产生式表达运算符优先级
    - Left Handside Expresstion & Right Handside Expresstion 运算符左值和右值
      - 例子
        ```
          a.b = c   //a.b是左值表达式，a + b是右值表达式，只有左值表达式能放在等号左边
          a + b = c  //不合法
        ```
  - Runtime
    - Type Conversion 类型转换
    - Reference 引用类型
      - .运算访问的是属性值的引用，而不是值本身，.运算取出的是一个引用类型
      - 引用类型有两个部分 Object和key
      - 做加减运算时
        - 就会解引用，当做普通值作加减
      - 做删除，赋值运算时
        - delete运算就会用到引用类型，因为要知道删除的哪个对象的哪个key
        - +=这种运算也要用到引用类型，因为要知道赋给哪个对象的哪个key


- Expression 运算优先级（以下从高到低）
  - Member 运算（.运算作为代表）
    - 成员访问
      - a.b   
      - a[b] b可以传入运行时的字符串（动态语言）
    - 反引号字符串前放一个函数，反引号的字符串会当做参数传入函数
      - foo\`string`
    - class构造函数中使用
      - super.b
      - super['b']
    - new.target
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
  
  - **总结call new Member三种Expresstion**
    - 可以理解为三种运算优先级差不多一样的，只是为了处理new后面()和谁结合的问题，引入了这三种Expresstion
  

  - Update 表达式
    - 从update Expresstion开始都是右值表达式，都不能放在等号左边
    - a ++
    - a --
    - -- a
    - ++ a
    - 例子
      ```
      - ++ a ++  //后面的a ++ 先执行
      - ++ (a ++)  //不合法
      ```

  - Unary 单目运算
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
    - \* / %    //参与运算的值必须是number类型，会自动发生类型转换

  - Additive
    - \+ -  

  - Shift 位运算
    - <<  左移
    - \>> 右移
    - \>>> 带符号的右移

  - Relationship 关系比较
    - < > <= >=       //会发生类型转换 
    - instanceof
    - in
    - 字符串比较，比较的是字典顺序

  - Equality 
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

  - Conditional 三目运算符，有短路原则
    - ? :
    - 短路原则的表达式可以代替if 

## 类型转换
- Unboxing 拆箱转换
  - toPremitive
  - toString VS valueOf
  - Symbol.toPremitive
- Boxing 装箱转换 number-object 
  - Number  --- new Number(1) --- 1
  - String  --- new String("a")  --- "a"
  - Boolean --- new Boolean(true) --- true
  - Symbol  --- new Object(Symbol("a")) --- Symbol("a")


# js语句

## 运行时相关概念
- Completion Record 完成记录 
  - \[[type]]: normol, break, continue, return, throw
  - \[[value]]: 基本类型
  - \[[target]]: label
  - 例子
    ```
      if(x == 1)
        return 10;
    ```

## 简单语句和复合语句
- 简单语句
  - ExpressionStatement 表达式语句
  - EmptyStatement 空语句
  - DebuggerStament 调试语句
  - ThrowStatement 
  - ContinueStatement
  - BreakStatement
  - ReturnStatement
  - 总结：表达式语句是js核心驱动语句，后四种是流程控制语句，js的作用是让计算机完成计算，和流程控制
- 复合语句
  - BlockStatement  
  - ifStatement
  - SwichStatement  
    - 在C++和C中比if性能好，在js中建议用if代替swith
  - InterationStatement 循环语句
    - while
    - do while
    - for
    - for in
    - for of
  - WithStatement
  - LabelledStatement
    - 语句名字，配合循环语句使用
  - TryStatement
    ```
      try {

      } catch() {

      } finally {

      }
    ```

## 声明
- 类型
  - 老版本
    - 四种函数声明
      - FunctionDeclaration  普通函数声明 
      - GeneratorDeclaration 函数后面加*号
      - AsyncFunctionDeclaration 函数前面加 async
      - AsyncGeneratorDeclaration 函数前面加 async 后面加*号
    - VariableStatement  变量声明 var声明的
  - es6
    - ClassDeclaration  类的声明
    - LexicalDeclaration  作用域声明，let const声明的
- 行为
  - 老版本
    - function
    - function *
    - async function
    - async function*
    - var
  - es6
    - class
    - const 
    - let
      
- 预处理 pre-process
  - 所有的声明都是有预处理机制的，都能把变量变成局部变量，区别是const声明，在const之前使用的话会抛错，并且会被try catch处理
  - 例子
    ```
      var a = 2;
      void funciton() {
        a = 1;
        return;
        var a;
      }();
      console.log(a); //2


      var a = 2;
      void funciton() {
        a = 1;
        return;
        const a;
      }();
      console.log(a); //抛错
    ```

- 作用域
  - var的作用域是它所在的函数的作用域，const作用域是它外面花括号的作用域
  ```
    var a = 2;
    void function() {
      a=1;
      {
        var a;
      }
    }();
    console.log(a); //2

    var a = 2;
    void function() {
      a=1;
      {
        const a;
      }
    }();
    console.log(a); //1
  ```

# js结构化
- js执行力度（运行时）
  - 宏任务（MacroTask）
    - 传给javascript引擎的任务
    - 可以理解javascript引擎是一个静态库，我们将外部的一段代码传给js引擎时候，这个过程叫做一个宏任务，这段代码中的promise的then产生异步，将这段代码分成几个微任务，一个微任务在js中叫做一个job
  - 微任务（MicroTask）
    - javascript引擎内部的任务
    - 在js中只有promise会产微任务
  - 函数调用
    - 在一个微任务代码也不是顺次执行的，函数调用会改变一个微任务里面代码执行顺序
    - 函数调用会产生调用栈，每一次代码执行都会在调用栈中形成一个执行上下文（Execution Context）
      - Execution Context包含七部分：
        - code evalution
        - Function
        - Script or Module
        - Generator
        - Realm
        - LexicalEnvironment
        - VariableEnviroment
    - 例子
    ```
      import { foo } from 'foo.js';
      var i = 0;
      console.log(i);
      foo();
      console.log(i);
      i++;

      function foo() {
        console.log(i);
      }
      export foo;
    ```
  - 语句/声明 （Completion Record）
  - 表达式（Reference）
  - 直接量/变量/this...

- Execution Context
  - ECMAScript Code Execution Context
    - code evalution
    - Function
    - Script or Module
    - Realm
    - LexicalEnvironment
    - VariableEnviroment
  - Generator Execution Contexts
    - code evalution
    - Function
    - Script or Module
    - Realm
    - LexicalEnvironment
      - this
      - new.target
      - super
      - 变量
    - VariableEnviroment
      - 仅仅处理var声明的
    - Generator

- Environment Record
  - Declarative Environment Records
    - Function Environment Records
    - Module Environment Records
  - Global Environment Records
  - Object Environment Records

- Closure
  - js中每个函数都会生成一个闭包，闭包由代码部分，和环境部分组成
  - 环境部分由一个object和一个变量序列组成
  - 在js中每一个函数都会带一个它定义时所在的 Environment Records，把这个对象保存在自己函数身上，当做一个属性

- Realm

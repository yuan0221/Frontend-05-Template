学习笔记
1. AST (Abstract Syntax Tree) 抽象语法树,源代码的抽象语法结构的树状表示，树上的每个节点都表示源代码中的一种结构。

2. 接收代码并输出 AST, 这个步骤分为两个阶段：词法分析（Lexical Analysis） 和语法分析（Syntactic Analysis）。

3. 词法分析阶段把字符串形式的代码转换为 令牌（tokens） 流，令牌是一个扁平的语法片段一维数组。

4. 语法分析阶段会把一个令牌流转换成 AST 的形式。

5. AST的应用包括，编译器，css处理器等。

参考链接：
https://www.zhihu.com/question/268622554/answer/384881779
https://zhuanlan.zhihu.com/p/51174224
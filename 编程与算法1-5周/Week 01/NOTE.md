# 学习笔记 #

## 概要 ##

week01是编程能力练习, 主要完成了 TicTacToe 小游戏的实现, 和 js 的异步编程练习。

## 学习方法 ##

先看视频，对于每一步记录一个提纲，然后不看视频，根据提纲完成代码，对于不懂的地方，代码写不下去的时候，再看下视频。

## TicTacToe 的代码思路 ##

1. 棋盘表示：分为抽象的数据表示，和可视化。
2. 棋盘落子事件，通过修改数据，重绘棋盘。
3. 判断谁赢，共 8 条线可赢（3横3纵2斜线）。
4. AI 功能，遍历空节点，把即将填充的颜色加进去，再 check 下。
5. 策略，-1表示一定输， 1表示一定赢， 0表示和棋。
6. 数据表示改为一维数组，在 clone 数据时候，节约内存。
7. 人机对战，完善 move 函数。

## js 异步编程 ##

常用的有：callback， promise， async/await。

## 答疑 ##

### 1. 立即执行函数 ###

Immediately-Invoked Function Expression (IIFE) 立即执行函数
<pre name="code">
1个i, 1个j
for (var i = 0; i < 3; i++) {
	for (var j = 0; j < 3; j++) {
		let cell = document.createElement('div');
		cell.classList.add('cell');
		cell.innerText = pattern[i * 3 + j] === 2 ? '❌' :
			pattern[i * 3 + j] === 1 ? '⭕' : '';
		cell.addEventListener('click', () => userMove(j, i));
		board.appendChild(cell);
 	}
}

3个i, 9个j
for (let i = 0; i < 3; i++) {
	for (let j = 0; j < 3; j++) {
		let cell = document.createElement('div');
		cell.classList.add('cell');
		cell.innerText = pattern[i * 3 + j] === 2 ? '❌' :
			pattern[i * 3 + j] === 1 ? '⭕' : '';
		cell.addEventListener('click', () => userMove(j, i));
		board.appendChild(cell);
 	}
}

9个i, 9个j
for (var i = 0; i < 3; i++) {
	for (var j = 0; j < 3; j++) {
		void function (i, j) {
			let cell = document.createElement('div');
			cell.classList.add('cell');
			cell.innerText = pattern[i * 3 + j] === 2 ? '❌' :
				pattern[i * 3 + j] === 1 ? '⭕' : '';
			cell.addEventListener('click', () => userMove(j, i));
			board.appendChild(cell);
		} (i, j)
 	}
}
</pre>

### 2. 五子棋博弈算法 ###
限制最大深度搜索

### 3.寻路算法 ###
双向寻路
力扣 200题

1. 允许怎么写（语法）
2. 要表达的是啥（运行时）
3. 怎么样描述的过程（语义）

英文下
 语法 grammer

中文下
	词法 Lexical
	语法 syntax
	文法 grammer，包含词法和语法

时间复杂度

移动端适配
	vw flexible

图片组件

304缓存

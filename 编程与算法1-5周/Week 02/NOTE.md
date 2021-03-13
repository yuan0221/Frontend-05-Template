学习笔记
1.week02 内容是寻路算法，有广度优先搜索，和启发式搜索两种方案。

2.实现地图编辑器。
  1）100*100 的方格，用一维数组表示，0表示空，1表示障碍，2表示已访问过的点；

3.广度优先：
  1）将每个点的“上下左右斜”八个方向的可以走的点，依次push到queue数组中；
  2）通过 push 和 shift 一组方法，先进先出，模拟堆，将访问的每个点坐标和终点坐标比较，如果相等则跳出。
    Tips：unshift 和 pop 配合也可以实现堆。

4. A* 算法：
  1）建立先进先出的数据结构，实现了 Sorted 类，通过 give 和 take 方法实现存和取；
  2）将每个点的“上下左右斜”八个方向的可以走的点，依次存入queue数组中，通过 compare 函数控制，
  取出的点是距离终点较近的那一个点；

5. 广度优先和A*的区别：
  1）相同：思想一样，将访问的每个点坐标和终点坐标，以某种关系（A*是compare函数，广度优先直接比较访问点坐标是否和终点坐标相等）比较；
  2）区别：
    a. 在于 queue 数组，一个是普通数组，一个是构建的堆结构；
    b. 广度优先是直接拿两个坐标比较是否相等，搜索所有点，比较笨；
    c. A*搜索距离终点较近的点，访问的点少，性能优；

6. 使用二叉堆，实现了一个 MinHeap 类，功能和 Sorted 相同。

问题？
  1. 从搜索的点看上去，MinHeap 没有 Sorted 性能好，原因何在？ 

参考链接：
https://mp.weixin.qq.com/s?__biz=MzI1MTIzMzI2MA==&mid=2650562926&idx=1&sn=4ad824f145b890ff68f35c34f1d9a164&chksm=f1fed7edc6895efb200151d82a4180a925ae28da1f9fe586b7c82526d6f074468181a9babc0e&scene=21#wechat_redirect

https://blog.csdn.net/weixin_42647798/article/details/103421369?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522160265555819724835823038%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=160265555819724835823038&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_v2~rank_v28-1-103421369.first_rank_ecpm_v3_pc_rank_v2&utm_term=%E4%BA%8C%E5%8F%89%E5%A0%86+js&spm=1018.2118.3001.4187
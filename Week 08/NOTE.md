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

## 3. ISO-OSI 七层网络模型
  - 应用层
  - 表示层
  - 会话层      1，2，3层为HTTP层     require('http')
  - 传输层      4层为TCP
  - 网络层      5层为Internet        require('net')
  - 数据链路层
  - 物理层      6，7层为4G/5G/WIFI

## 4. TCP & IP
  - TCP
    - 流
    - 端口
    - require('net')
  - IP
    - 包
    - IP地址
    - Libnet/Libpcap  C++中的两个包

## 5. HTTP
  - Request
    - POST / HTTP/1.1      (Request line)
      Host: 127.0.0.1
      Content-Type: application/x-www-form-urlencoded  (headers)
 
      filed1=aaa&code=123        (body)  

  - Response
    - HTTP/1.1 200 OK     (status line)
      Content-Type: text/html
      Date: Mon, 21 Dec 2020 13:53:12 GMT
      Content-Length: 0
      Connection: Keep-alive
      Transfer-Encoding: chunked   (headers)

      26
      <html><body>Hello world</body></html>
      0                                     (chunked body)

  - 第一步HTTP请求总结
    - 设计HTTP请求的类
    - Content-Type是一个必要字段，要有默认值
    - body是KV格式
    - 不同的Content-Type影响body的格式

  - 第二步send函数总结
    - 在Request构造器中收集必要的信息
    - 设计send函数，将请求真实发送到服务器
    - send函数是异步的，返回Promise
  
  - 第三步发送请求
    - 支持已有的connection或者自己新建的connection
    - 收到数据传给parser
    - 根据parser的状态，resolve promise
   
  - 第四步ResponseParser总结
    - Response必须分段构造，使用ResponseParser来’装配‘
    - ResponseParser分段处理ResponseText，利用状态机分析文本的结构

  - 第五步 BodyParser总结
    - Response的body可能根据Content-Type有不同的结构，因此采用子Parser的结构解决问题
    - 以TrunkedBodyParser为例，使用状态机处理body的格式

  



  - 第二次直播答疑
    - 学习编译原理，《龙书》
    - Realm
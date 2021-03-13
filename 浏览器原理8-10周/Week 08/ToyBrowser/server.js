const http = require("http")

http.createServer((req, res) => {
  let body = [];
  req.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    // 服务端接收到请求body
    console.log(body);  //name=winter&age=18
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(' Hello World\n')
  });
}).listen(8088)

console.log(`server is running`);



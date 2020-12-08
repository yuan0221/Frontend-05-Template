const http = require("http")

http.createServer((req, res) => {
  let body = [];
  req.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk.toString());
  }).on('end', () => {
    // body = Buffer.concat(body).toString();
    body = (Buffer.concat([ Buffer.from(body.toString()) ])).toString();
    console.log(body);
    res.writeHead(200, {'Content-Type': 'text/html'})
    // trunk body
    // res.end('<html lang="en"><head><style>#red {color: red;}</style></head><body><div id="red">Hello World</div></body></html>')
    res.end(
`<html maaa=a >
<head>
  <style>
#container {
  width: 500px;
  height: 300px;
  display: flex;
}
#container #myid {
  width: 200px;
}
#container .c1 {
  flex: 1;
}
  </style>
</head>
<body>
  <div id="container">
    <div id="myid" />
    <div class="c1" />
  </div>
</body>
</html>`)
  });
}).listen(8088)

console.log(`server is running`);



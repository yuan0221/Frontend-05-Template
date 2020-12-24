const http = require("http")

http.createServer((req, res) => {
  let body = [];
  req.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    console.log(body);
    res.writeHead(200, {'Content-Type': 'text/html'})
    // trunk body
    // res.end('<html lang="en"><head><style>#red {color: red;}</style></head><body><div id="red">Hello World</div></body></html>')
    res.end(
`<html maaa=a >
<head>
  <style>
body div #myid{
  width: 100px;
  background-color: #ff5000;
}
body div img{
  width: 30px;
  background-color: #ff1111;
}
  </style>
</head>
<body>
  <div>
    <img id="myid" />
    <img />
  </div>
</body>
</html>`)
  });
}).listen(8088)

console.log(`server is running`);



const http = require("http");

http.createServer((req, res) => {
  console.log(req);
  res.end("hello publish-server");
}).listen("8082");
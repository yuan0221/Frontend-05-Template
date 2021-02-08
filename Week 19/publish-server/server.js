const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
  console.log("request");
  const outFile = fs.createWriteStream("../server/public/index.html");
  req.pipe(outFile);
  
}).listen("8082");
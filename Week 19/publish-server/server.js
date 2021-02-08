const http = require("http");
const fs = require("fs");
const unzipper = require("unzipper");

http.createServer((req, res) => {
  console.log("request");
  // const outFile = fs.createWriteStream("../server/public/tmp.zip");
  // req.pipe(outFile);

  req.pipe(unzipper.Extract({ path: '../server/public' }));
  
}).listen("8082");
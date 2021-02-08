const http = require("http");
const fs = require("fs");
const archiver = require('archiver');
const child_process = require("child_process");
const querystring = require("querystring");


// 1.打开 https://github.com/login/oauth/authorize

child_process.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.fdc1d765fff61c41`);



// 3.创建server，接受token，后点击发布
http.createServer((req, res) => {
  let query = querystring.parse(req.url.match(/^\/\?([\s\S]+)$/)[1]);
  publish(query.token);

}).listen("8083");

function publish(token) {

  let request = http.request({
    hostname: "127.0.0.1",
    port: 8082,
    method: "POST",
    path: `/publish?token=${token}`,
    headers: {
      "Content-Type": "application/octet-stream",
      // "Content-Size": stats.size
    }
  }, response => {
    console.log(response);
  })

  const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  archive.directory('sample/', false);

  // archive.pipe(fs.createWriteStream("tmp.zip"));
  archive.pipe(request);

  archive.finalize();
}

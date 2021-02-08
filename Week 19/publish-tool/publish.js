const http = require("http");
const fs = require("fs");
const archiver = require('archiver');

// fs.stat("./sample.html", (err, stats) => {

  let request = http.request({
    hostname: "127.0.0.1",
    port: 8082,
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
      // "Content-Size": stats.size
    }
  }, response => {
    console.log(response);
  })

  // const file = fs.createReadStream("./sample.html");

  const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  archive.directory('sample/', false);

  // archive.pipe(fs.createWriteStream("tmp.zip"));
  archive.pipe(request);

  archive.finalize();
// })

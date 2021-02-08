const http = require("http");
const fs = require("fs");

fs.stat("./sample.html", (err, stats) => {

  let request = http.request({
    hostname: "127.0.0.1",
    port: 8082,
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Size": stats.size
    }
  }, response => {
    console.log(response);
  })

  const file = fs.createReadStream("./sample.html");

  file.pipe(request);

  request.on("end", () => request.end());
})

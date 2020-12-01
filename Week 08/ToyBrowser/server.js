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
    res.end(' Hello World\n')
  });
}).listen(8088)

console.log(`server is running`);



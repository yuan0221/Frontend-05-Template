const http = require("http");
const https = require("https");
const fs = require("fs");
const unzipper = require("unzipper");
const querystring = require("querystring");

// 2. auth路由：接受token，用code+client_id+secret_id换token
function auth(req, res) {
  let query = querystring.parse(req.url.match(/^\/auth\?([\s\S]+)$/)[1]);
  getToken(query.code, info => {
    // res.write(JSON.stringify(info));
    res.write(`<a href='http://localhost:8083/?token=${info.access_token}'>publish</a>`)
    res.end();
  });
}

function getToken(code, callback) {
  let request = https.request({
    hostname: "github.com",
    method: "POST",
    path: `/login/oauth/access_token?code=${code}&client_id=Iv1.fdc1d765fff61c41&client_secret=1c58f1116e7ef733b9e199c0b74fa0a42e06fc9f`,
    port: 443
  }, function(response) {
    let body = "";
    response.on("data", chunk => {
      body += chunk.toString();
    })
    response.on("end", () => {
      callback(querystring.parse(body));
    })
  })
  request.end();
}

function publish(req, res) {
  let query = querystring.parse(req.url.match(/^\/publish\?([\s\S]+)$/)[1]);
  getUser(query.token, info => {
    if(info.login === "yuan0221") {
      req.pipe(unzipper.Extract({ path: '../server/public' }));
      req.on("end", () => {
        res.end("success!");
      })
    }
  });
}

function getUser(token, callback) {
  let request = https.request({
    hostname: "api.github.com",
    method: "GET",
    path: `/user`,
    port: 443,
    headers: {
      Authorization: `token ${token}`,
      "User-Agent": "toy-publish-william"
    }
  }, function(response) {
    let body = "";
    response.on("data", chunk => {
      body += chunk.toString();
    })
    response.on("end", () => {
      callback(JSON.parse(body));
    })
  })
  request.end();
}


// 4. publish路由：用token获取用户信息，检查权限，接受发布

http.createServer((req, res) => {

  if(req.url.match(/^\/auth\?/))
    return auth(req, res);
  if(req.url.match(/^\/publish\?/))
    return publish(req, res);

  // console.log("request");
  // const outFile = fs.createWriteStream("../server/public/tmp.zip");
  // req.pipe(outFile);

  // req.pipe(unzipper.Extract({ path: '../server/public' }));
  
}).listen(8082);
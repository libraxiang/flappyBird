let http = require("http");

http.createServer(function(req, res) {
  res.setHeader("Content-Type", "text/html;charset=utf-8");
  res.setHeader("Set-Cookie", ["type=ninja", "language=javascript"]);
  res.end('{status:"0",msg:"随便返回点数据"}');
}).listen(4000);




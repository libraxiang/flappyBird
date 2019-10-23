let http = require("http");
let fd = require("formidable");
http.createServer(function (req, res) {
    let form = new fd.IncomingForm();
    form.uploadDir = "./";
    form.parse(req, function (err, fields, files) {
        console.log(fields);
        console.log(files);
        res.end("xxx");
    })
}).listen(4000)
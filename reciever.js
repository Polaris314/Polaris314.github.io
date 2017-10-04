


var http = require('http');
var url = require('url')
var fs = require('fs');





var svr = http.createServer(function(req, res) {

    var request = url.parse(req.url, true);

    if (req.method === "POST"){
        console.log("POST");

        var body = "";
        req.on('data', (chunk) => {
            body+= chunk;
            console.log("Partial body" + body);
        })

        req.on("end", function() {
            console.log("Body: " + body);
        })

        res.writeHead(200, {"Content-Type": "text/html"});
        res.end("post recieved")

    }

    if (request.pathname.startsWith("/public")){
        var img = fs.readFileSync("./"+request.pathname);
        let action = request.pathname;
        console.log(action.substring(action.length-3));
        res.writeHead(200, {'Content-Type': 'image/' + action.substring(action.length - 3)});
        res.end(img, 'binary');
    }

    else {
        console.log("GET");
        console.log(request.pathname);
        var html = fs.readFileSync('index.html');
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(html);
    }

});


svr.listen(3000);
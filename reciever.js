


var http = require('http');
var url = require('url')
var fs = require('fs');





var svr = http.createServer(function(req, res) {

    var request = url.parse(req.url, true);
    var action = request.pathname;

    if (req.method === "POST"){
        console.log("POST");

        var body = "";
        req.on('data', (chunk) => {
            body+= chunk;
            // console.log("Partial body" + body);
        })

        req.on("end", function() {
            console.log("Body: " + body);
        })

        res.writeHead(200, {"Content-Type": "text/html"});
        res.end("post recieved")

    }

    if (action.startsWith("/public")){
        try {
            var img = fs.readFileSync("./"+action);
            res.writeHead(200, {'Content-Type': 'image/' + action.substring(action.length - 3)});
            res.end(img, 'binary');
        } catch(err) {
            console.log(err);
            send404Res(res);
        }
    }

    else {
        if (action.endsWith(".js") && action.startsWith("/")) {

            try {

            var scriptToServe = fs.readFileSync("./" +action);
            res.writeHead(200, {'Content-Type':'text/javascript'});
            res.end(scriptToServe, 'binary');
            } catch(err){
                console.log(err);
                send404Res(res);
            }

        } else {
        console.log("GET");
        console.log(action);
        var html = fs.readFileSync('index.html');
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(html);
        }
    }

});


function send404Res(res){
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.write("404");
    res.end();
}

svr.listen(3000);
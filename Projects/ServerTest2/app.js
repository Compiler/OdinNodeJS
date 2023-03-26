const http = require('http')
const fs = require('fs')

const port = 4444

const server = http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type':'text/html'})
    fs.readFile('index.html', function(error, data){
        if(error){
            res.writeHead(404);
            res.write("Failed to load index.html :(")
        }else{
            console.log(data)
            res.write(data)
        }
        res.end()
    })
})


server.listen(port, function(error){
    if(error) console.error('OOPS!!!!',error)
    else console.log("server is listening on", port)
})
const http = require('http')


const server = http.createServer((req, res) =>{
    console.log(req.url)
    res.write("!!")
    res.end()
})


server.listen(8080, (error) => {
    if(error) console.error("!!!", error)
    else{
        
        console.log("Listening on", 8080)
    }
})
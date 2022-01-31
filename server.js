const http = require('http');

const server = http.createServer((req,res)=>{
console.log(req.url);

  res.writeHead(200,{
      "Content-Type":"text/plain",
      "msg":"Hello"
    });
    res.write('<h1>Hello Iam Node</h1>');
    res.end();
});

server.listen(3000,()=>console.log('server Running on 3000'));
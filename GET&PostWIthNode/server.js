const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{

  var requrl = req.url;
  var httpmethode = req.method;

  if(requrl === '/'){
    res.writeHead(200,{'Content-Type':'text/html'});
    var html = fs.readFileSync('index.html');
    res.write(html);
    return res.end();
  }

  if(req.url === '/greet' && httpmethode === 'POST'){
    req.on('data',(data)=>{
      var temp = [];
      temp.push(data);
      var inputdata = Buffer.concat(temp).toString();
      var user = inputdata.split('=')[1];
      res.write('<h1>Welcome Mr/Mrs.'+user+'</h1>');
      res.end();
    });
  }
});

server.listen(3000,()=>{
console.log('Server Running on 3000');
});
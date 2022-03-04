const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({extended:false}));

const server = app.listen(3000,()=>console.log('server Started 3000'));
const sockio = require('socket.io')(server);

app.post('/notification',(req,res)=>{
    const notiy = req.body
sockio.emit('notification',notiy);
res.json(req.body)
});

app.get('/mesg',(req,res)=>{
sockio.emit('greet','Hello Grretings from Sockio');
res.send('hello');
});

let user = 0
sockio.on('connection',sock=>{
    user = user+1;
    console.log('No of Users: '+ user);
})









const http = require('http');
const express = require('express');

const app = express(); 

app.use((req,res,next)=>{
console.log('Hello Iam One MiddleWare');
res.send('<h1>Welcome From Express.Js</h1>');
});


app.listen(3000,()=>{
console.log('Server is Running');
});
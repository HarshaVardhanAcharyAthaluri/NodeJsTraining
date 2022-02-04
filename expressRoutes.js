const http = require('http');
const express = require('express');

const app = express(); 

app.get('/',(req,res,next)=>{
    console.log('Root Midleware');
    res.send('<h1>Express Home</h1>');
});

app.get('/hello',(req,res,next)=>{
console.log('Hello MiddleWare');
res.send('<h1>Route Hello</h1>');
});

app.get('/greet',(req,res,next)=>{
    console.log('Greet MiddleWare');
    res.send('<h1>ROute Greet</h1>');
});

app.listen(3000,()=>{
console.log('Server is Running');
});
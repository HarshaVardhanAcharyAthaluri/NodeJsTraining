const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});

app.post('/addproduct',(req,res)=>{
    console.log(req.body);
    res.sendFile(__dirname+'/product.html')
});

app.get('/productlist',(req,res)=>{
    res.sendFile(__dirname+'/prductlist.html');
});

app.use((req,res)=>{
res.sendFile(__dirname+'/404.html')
})

app.listen(3000,()=>{
console.log('Server is runing at 3000')
});

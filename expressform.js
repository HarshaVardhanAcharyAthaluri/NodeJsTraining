const express = require('express');
const bodyparser = require('body-parser');
const app = express(); 

app.use(bodyparser.urlencoded({extended:false}));

app.get('/',(req,res,next)=>{
    res.send('<form action="/addproduct" method="POST"><input type="text" name="product"> <button type="submit">Add Product</button></form>')
});

app.post('/addproduct',(req,res,next)=>{
    res.send('<h1>'+req.body.product+' Added</h1>');
});


app.listen(3000,()=>{
console.log('Server is Running');
});
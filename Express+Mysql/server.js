const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pug = require('pug');

const db = require('./database'); 

app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine','pug');
app.set('views','views');

app.use((req,res,next)=>{
   db.execute('select * from products').then(reslut=>console.log(reslut[0])).catch(err=>console.log(err));
   next();
});
const prodcuts = [];
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});

app.post('/addproduct',(req,res)=>{
    prodcuts.push({'ProductName':req.body.pname,'prductQuantity':req.body.qty,'prodcutstatus':req.body.pstatus});
    console.log(prodcuts);
    res.render('product',{'products':prodcuts});
});

app.get('/productlist',(req,res)=>{
    res.render('product',{'products':prodcuts});
});

app.use((req,res)=>{
res.sendFile(__dirname+'/404.html')
})

app.listen(3000,()=>{
console.log('Server is runing at 3000')
});

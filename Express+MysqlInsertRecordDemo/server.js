const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pug = require('pug');

const db = require('./database'); 

app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine','pug');
app.set('views','views');


const prodcuts = [];
app.get('/',(req,res)=>{
   
    res.sendFile(__dirname+'/index.html');
});

app.post('/addproduct',(req,res)=>{
    db.execute('INSERT INTO products(product_name,product_quantity,product_status) values (?,?,?)',
    [req.body.pname,req.body.qty,req.body.pstatus])
    .then(reslut=>{
        console.log(reslut);
        res.redirect('/productlist');
    }).catch(err=>{
        res.send(err);
    });
});



app.get('/productlist',(req,res)=>{
    let productlist = [];
    db.execute('select * from products')
    .then(reslut=>{
        productlist = reslut[0];
        console.log(productlist);
        res.render('product',{'productlist':productlist});
    })
    .catch(err=>console.log(err));
   
});

app.use((req,res)=>{
res.sendFile(__dirname+'/404.html')
})

app.listen(3000,()=>{
console.log('Server is runing at 3000')
});

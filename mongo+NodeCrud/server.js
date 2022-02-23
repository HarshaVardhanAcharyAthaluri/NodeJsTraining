const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pug = require('pug');

const mongoConnection = require('./database').connection;
const getdb = require('./database').getDb;


app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine','pug');
app.set('views','views');

app.get('/',(req,res)=>{   
    res.sendFile(__dirname+'/index.html');
});

app.get('/productlist',(req,res)=>{
    let productlist = [];
    const db = getdb();
    db.collection('products').find({}).toArray().then(prods=>{
        productlist = prods;
        pid = prods[(prods.length-1)].id;
        console.log(productlist);
        res.render('product',{'productlist':productlist});
    })
    .catch(err=>console.log(err));
});


app.post('/addproduct',(req,res)=>{
    let pid = 0;
    const db = getdb();
    db.collection('products').find({}).toArray().then(
        prods => {
            pid = prods[(prods.length-1)].id;
            db.collection('products').insertOne(
                {"id":pid+1,
                "Product_Name":req.body.pname,
                "Product_Quantity":req.body.qty,
                "Product_Status":req.body.pstatus}
                )
            .then(reslut=>{
                res.redirect('/productlist');
            }).catch(err=>{
                res.send(err);
            });
        });
    
});


app.use((req,res)=>{
res.sendFile(__dirname+'/404.html')
});



mongoConnection(()=> app.listen(3000,()=>console.log('server Started 3000')));











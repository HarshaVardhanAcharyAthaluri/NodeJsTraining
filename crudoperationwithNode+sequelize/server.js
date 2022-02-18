const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pug = require('pug');
const sequelize = require('./database');
const Product = require('./product');

app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine','pug');
app.set('views','views');


const prodcuts = [];
app.get('/',(req,res)=>{   
    res.sendFile(__dirname+'/index.html');
});

app.get('/productlist',(req,res)=>{
    let productlist = [];
    Product.findAll().then(result=>{
        productlist = result;
        res.render('product',{'productlist':productlist});
    }).catch(err=>console.log(err));
});

app.post('/addproduct',(req,res)=>{
    Product.create({
        Product_Name:req.body.pname,
        Product_Quantity:req.body.qty,
        Product_Status:req.body.pstatus
    })
    .then(reslut=>{
        res.redirect('/productlist');
    }).catch(err=>{
        res.send(err);
    });
});

app.post('/deleteproduct',(req,res)=>{
    Product.findByPk(req.body.id).then(product=>{
        product.destroy();
        res.redirect('/productlist');
    }).catch(err=>console.log(err));
});

app.get('/updateform',(req,res)=>{
    res.render('updateproduct');
});

app.post('/updateproduct',(req,res)=>{
    Product.findByPk(req.body.id)
    .then(product=>{
        console.log(product);
        product.Product_Name=req.body.prodname?req.body.prodname:product.Product_Name,
        product.Product_Quantity =  req.body.prdoqty?req.body.prdoqty:product.Product_Quantity,
        product.Product_Status = req.body.prodstatus?req.body.prodstatus:product.Product_Status
        return product.save();
    }).then(result=>{
        res.redirect('/productlist');
    }).catch(err=>console.log(err));
});

app.use((req,res)=>{
res.sendFile(__dirname+'/404.html')
})

sequelize.sync().then(result=>{
    app.listen(3000,()=>console.log('Server RUnning on 3000'));
}).catch(err=>console.log(err));




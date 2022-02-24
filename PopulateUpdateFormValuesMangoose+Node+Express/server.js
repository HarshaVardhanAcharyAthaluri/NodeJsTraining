const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pug = require('pug');
const mongoose = require('mongoose');
const productModel = require('./product');


app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine','pug');
app.set('views','views');

app.get('/',(req,res)=>{   
    res.sendFile(__dirname+'/index.html');
});

app.get('/productlist',(req,res)=>{
    let productlist = [];
    productModel.find().then(prods=>{
        productlist = prods;
        res.render('product',{'productlist':productlist});
    })
    .catch(err=>console.log(err));
});

let pid = 0;
app.post('/addproduct',(req,res)=>{
    
    productModel.findOne().sort({ field: 'asc', _id: -1 }).limit(1)
    .exec()
    .then(pr=>{

        const product = new productModel({
            "id": pr.id+1,
            "Product_Name":req.body.pname,
            "Product_Quantity":req.body.qty,
            "Product_Status":req.body.pstatus
        });

        product.save()
          .then(reslut=>{
              res.redirect('/productlist');
          }).catch(err=>{
              res.send(err);
          });

    });

        

});

app.post('/deleteproduct',(req,res)=>{
    productModel.find({ id:req.body.id}).remove(()=>{
        res.redirect('/productlist');
    }).catch(err=>console.log(err));
});

app.get('/updateform/:id',(req,res)=>{
    productModel.findOne({id:req.params.id}).then(product=>{
        console.log(product)
        res.render('updateproduct',{'product':product});
    }).catch(err=>console.log(err));
});

app.post('/updateproduct',(req,res)=>{
    productModel.findOne({ id:req.body.id})
    .then(product=>{
        product.Product_Name=req.body.prodname?req.body.prodname:product.Product_Name,
        product.Product_Quantity =  req.body.prdoqty?req.body.prdoqty:product.Product_Quantity,
        product.Product_Status = req.body.prodstatus?req.body.prodstatus:product.Product_Status
        product.save();
        res.redirect('/productlist');
    }).catch(err=>console.log(err));
});


app.use((req,res)=>{
res.sendFile(__dirname+'/404.html')
});

mongoose.connect('mongodb://localhost:27017/nodetraining').then(con=>{
    app.listen(3000,()=>console.log('server Started 3000'));
}).catch(err=>console.log(err));













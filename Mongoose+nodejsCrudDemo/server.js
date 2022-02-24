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
        pid = prods[(prods.length-1)].id;
        console.log(productlist);
        res.render('product',{'productlist':productlist});
    })
    .catch(err=>console.log(err));
});


app.post('/addproduct',(req,res)=>{

  productModel.find().then(
      prods => {
          let pid = 0;
        const product = new productModel({
            "id": pid,
            "Product_Name":req.body.pname,
            "Product_Quantity":req.body.qty,
            "Product_Status":req.body.pstatus
        });
        console.log(prods);
          pid = prods[(prods.length-1)].id;
          console.log(pid)
          product.save()
          .then(reslut=>{
              res.redirect('/productlist');
          }).catch(err=>{
              res.send(err);
          });
      });
});

app.post('/deleteproduct',(req,res)=>{
    productModel.findOneAndRemove(req.body.id).then(()=>{
        res.redirect('/productlist');
    }).catch(err=>console.log(err));
});

app.get('/updateform',(req,res)=>{
    res.render('updateproduct');
});

app.post('/updateproduct',(req,res)=>{
    productModel.findByIdAndUpdate(req.body.id)
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
});

mongoose.connect('mongodb://localhost:27017/nodetraining').then(con=>{
    console.log(con);
    app.listen(3000,()=>console.log('server Started 3000'));
}).catch(err=>console.log(err));













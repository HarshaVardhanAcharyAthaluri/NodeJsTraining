const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const productModel = require('./product');
const userModel = require('./users');
const joi = require('joi');

app.use(express.json());






app.use(bodyParser.urlencoded({extended:false}));

app.get('/',(req,res)=>{   
    res.send('Hello API')
});

app.get('/productlist',(req,res)=>{
        productModel.find().then(prods=>{
            res.send(prods);
        })
        .catch(err=>console.log(err));
});
const schema = joi.object().keys({
    Product_Name:joi.string(),
    Product_Quantity:joi.string(),
    Product_Status:joi.string(),
    email:joi.string().email()
});

let pid = 0;
app.post('/addproduct',(req,res)=>{
    const schemaeerr = schema.validate(req.body);
    if(schemaeerr.error){
           return res.send(schemaeerr.error);
    }

    productModel.findOne().sort({ field: 'asc', _id: -1 }).limit(1)
    .exec()
    .then(pr=>{
        const product = new productModel({
            "id": pr.id+1,
            "Product_Name":req.body.Product_Name,
            "Product_Quantity":req.body.Product_Quantity,
            "Product_Status":req.body.Product_Status
        });
        product.save()
          .then(reslut=>{
              res.json(reslut);
          }).catch(err=>{
              res.send(err);
          });
    });
});


app.post('/adduser',(req,res)=>{
        const user = new userModel(req.body);
        user.save()
          .then(reslut=>{
              res.send(reslut);
          }).catch(err=>{
              res.send(err);
          });

    
});


app.delete('/deleteproduct/:productid',(req,res)=>{
    productModel.findOne({id:req.params.productid}).remove(rsult=>{
        res.send('Product WIth ID '+req.params.productid + 'is deleted');
    }).catch(err=>console.log(err));
});

app.get('/updateform/:id',(req,res)=>{
    productModel.findOne({id:req.params.id}).then(product=>{
        res.render('updateproduct',{'product':product});
    }).catch(err=>console.log(err));
});

app.put('/updateproduct/:productId',(req,res)=>{
    console.log(req.body);
    productModel.findOne({ id:req.params.productId})
    .then(product=>{
        product.Product_Name=req.body.Product_Name?req.body.Product_Name:product.Product_Name,
        product.Product_Quantity =  req.body.Product_Quantity?req.body.Product_Quantity:product.Product_Quantity,
        product.Product_Status = req.body.Product_Status?req.body.Product_Status:product.Product_Status
        product.save();
        res.redirect('/productlist');
    }).catch(err=>console.log(err));
});


app.use((req,res)=>{
res.sendFile(__dirname+'/404.html')
});


module.exports = app;











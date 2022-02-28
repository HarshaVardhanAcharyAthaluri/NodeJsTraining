const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pug = require('pug');
const mongoose = require('mongoose');
const productModel = require('./product');
const userModel = require('./users');
const popup = require('alert');

const session  = require('express-session');
const req = require('express/lib/request');
const res = require('express/lib/response');
const { cookie } = require('express/lib/response');


app.use(session({name:'isloggedIn',secret:'mysession',resave:false,saveUninitialized:false}));

app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine','pug');
app.set('views','views');

app.get('/login',(req,res)=>{   
    res.sendFile(__dirname+'/login.html');
});

app.get('/signup',(req,res)=>{
    res.sendFile(__dirname+'/signup.html');
});

app.post('/validatelogin',(req,res)=>{
    userModel.findOne({username:req.body.username}).then(user=>{

        if(req.body.username === user.username&& req.body.password === user.password){
            req.session.isloggedIn = true;
            res.redirect('/productlist');
        }else{
            popup('Login Failed');
            res.redirect('/login');
        }

    }).catch(err=>{
        console.log(err)
        popup('Login Failed');
        res.redirect('/login');
    });


    
});

app.get('/',(req,res)=>{   
    if(req.session.isloggedIn){
        res.sendFile(__dirname+'/index.html');
    }
    else{
    res.redirect('/login');
    }
});

app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/login');
});


app.get('/productlist',(req,res)=>{
    if(req.session.isloggedIn){
        let productlist = [];
        productModel.find().then(prods=>{
            productlist = prods;
            res.render('product',{'productlist':productlist});
        })
        .catch(err=>console.log(err));
    }else{
        res.redirect('/login');
    }
    
    
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


app.post('/adduser',(req,res)=>{
    
    userModel.findOne().sort({ field: 'asc', _id: -1 }).limit(1)
    .exec()
    .then(pr=>{

        const user = new userModel({
            "id": pr.id+1,
            "username":req.body.username,
            "password":req.body.password
        });
        user.save()
          .then(reslut=>{
              console.log(reslut);
              res.redirect('/login');
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












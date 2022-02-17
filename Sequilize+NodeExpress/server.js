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
    db.execute('DELETE from  products where id = ?',[req.body.id])
    .then(reslut=>{
        res.redirect('/productlist');
    }).catch(err=>{
        res.send(err);
    });
});

app.get('/updateform',(req,res)=>{
    res.render('updateproduct');
});

app.post('/updateproduct',(req,res)=>{
  db.execute('select * from products where id = ?',[req.body.id])
  .then(result=>{
         return db.execute('update products set Product_Name=?,Product_Quantity=?, Product_Status = ? where id = ?',
          [req.body.prodname?req.body.prodname:result[0][0].Product_Name,
          req.body.prdoqty?req.body.prdoqty:result[0][0].Product_Quantity,
          req.body.prodstatus?req.body.prodstatus:result[0][0].Product_Status,
          req.body.id])
          .then(selreslut=>{
              res.redirect('/productlist');
          }).catch(err=>{
              res.send(err);
          });
        }).catch(err=>console.log(err));
});




app.use((req,res)=>{
res.sendFile(__dirname+'/404.html')
})



sequelize.sync().then(result=>{
    console.log(result);
    app.listen(3000,()=>console.log('Server RUnning on 3000'));
}).catch(err=>console.log(err));




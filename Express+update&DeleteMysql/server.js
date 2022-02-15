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
    res.sendFile(__dirname+'/updateproduct.html')
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


app.get('/productlist',(req,res)=>{
    let productlist = [];
    db.execute('select * from products')
    .then(reslut=>{
        productlist = reslut[0];
       
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

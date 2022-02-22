const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pug = require('pug');
const db = require('./database');

app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine','pug');
app.set('views','views');

app.get('/',(req,res)=>{   
    res.sendFile(__dirname+'/index.html');
});

app.use((req,res)=>{
res.sendFile(__dirname+'/404.html')
})


db(()=>app.listen(3000,()=>console.log('server Started 3000')));







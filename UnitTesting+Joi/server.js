const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect('mongodb://localhost:27017/nodetraining').then(con=>{
    app.listen(3000,()=>console.log('server Started 3000'));
}).catch(err=>console.log(err));












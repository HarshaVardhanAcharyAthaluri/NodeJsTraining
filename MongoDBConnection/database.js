const mongodb = require('mongodb');

const mongoclient = mongodb.MongoClient;


const connection = client =>{
                    mongoclient.connect('mongodb://localhost:27017')
                    .then(result=>{
                        console.log(result);
                        client();
                    })
                    .catch(err=>console.log(err));
                }

module.exports = connection;



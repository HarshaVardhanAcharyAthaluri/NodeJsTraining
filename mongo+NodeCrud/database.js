const mongodb = require('mongodb');

const mongoclient = mongodb.MongoClient;

let isConnected;
const connection = item =>{
                    mongoclient.connect('mongodb://localhost:27017/nodetraining')
                    .then(result=>
                        {
                            isConnected = result.db();
                            item();
                        })
                    .catch(err=>console.log(err));
                }


const getDb =  ()=>{
                        if(isConnected){
                            return isConnected;
                        }else{
                            return 'Db COnnection Failed';
                    }
                    }

exports.connection=connection;
exports.getDb = getDb;
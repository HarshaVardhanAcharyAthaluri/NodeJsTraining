const Sequelize = require('sequelize');

const sequilizeConnection  = require('./database');

const Product = sequilizeConnection.define('products',{  id:{type:Sequelize.INTEGER,primaryKey:true,autoIncrement:true},
                                                        Product_Name:{type:Sequelize.STRING},
                                                        Product_Quantity:{type:Sequelize.STRING}, 
                                                        Product_Status:{type:Sequelize.STRING}
                                                      }
                                          );


module.exports = Product;
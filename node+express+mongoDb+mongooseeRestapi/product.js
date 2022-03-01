const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
                                id: Number,
                                Product_Name:String,
                                Product_Quantity:String,
                                Product_Status:String
                            });

module.exports = mongoose.model('products',productSchema);



const mongoose = require("mongoose")

const productShema = new mongoose.Schema({
    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    description: String,
    price: Number,
    sellingPrice : Number
},{
    timestamps : true
})

const productModel = new mongoose.model("products",productShema)

module.exports = productModel 
const productModel = require("../../models/productModel")

async function getProductsController(req,res){
    try {

        const allProducts = await productModel.find().sort({ createdAt : -1 })

        res.status(200).json({
            message : "Successfully gotten",
            error : false,
            success : true,
            data : allProducts
        })
        
    } catch (error) {
        res.status(400).json({
            message : err || err.message,
            error : true,
            success :false
        })
    }

}

module.exports = getProductsController;
const productModel = require("../../models/productModel");


const getProductDetailsController = async (req,res)=>{
    try {

        const { productId } = req.body

        const product = await productModel.findById(productId)

        res.status(200).json({
            data :product ,
            message: "Product details retrieved ",
            error: false,
            success: true,
        });
        
    }catch (error) {
        res.status(400).json({
            message: err || err.message,
            error: true,
            success: false,
        })
    }
}
 module.exports = getProductDetailsController;
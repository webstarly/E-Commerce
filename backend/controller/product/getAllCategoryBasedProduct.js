const productModel = require("../../models/productModel")

const getAllCategoryBasedProductControler  = async(req,res)=>{
    try{
        const { category } = req?.body || req?.query
        const product = await productModel.find({ category })

        res.json({
            data : product,
            message : "All Category Product Retrieved ",
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = getAllCategoryBasedProductControler
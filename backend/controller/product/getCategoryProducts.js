const productModel = require("../../models/productModel")

const getCategoryProductController = async (req, res) =>{
    try{

        const productCategory = await productModel.distinct("category");

        console.log("category", productCategory)

        const productByCategory = []; //array to store one product from each category

        for(const category of productCategory){
            const product = await productModel.findOne({category})

            if(product){
                productByCategory.push(product);
            }
        }

        res.status(200).json({
            message : "Successful",
            error : false,
            success : true,
            data : productByCategory
        })


    }catch(err){
        res.status(400).json({
            message : err || err.message,
            error : true,
            success :false
        })
    }
}

module.exports = getCategoryProductController;
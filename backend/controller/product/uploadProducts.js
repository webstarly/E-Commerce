const uploadProductPermissionController = require('../../helper/uploadProductPermission');
const productModel = require('../../models/productModel');

async function uploadProductController(req,res) {
    try {
 
        const sessionUser = req.userId;

        if(!uploadProductPermissionController (sessionUser)){
            throw new Error("permission denied")
        }

        const uploadProduct = new productModel(req.body) ;
        const saveProduct = await uploadProduct.save()

        res.status(200).json({
            message : "Product successfully Uploaded",
            error : false,
            success : true,
            data : saveProduct
        })
        
    } catch (error) {
        res.status(400).json({
            message : "failed to Upload Product",
            error : true,
            success : false
        })
    }
    
}

module.exports = uploadProductController;
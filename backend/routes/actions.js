const express = require('express');

const router = express.Router();

//const userSignUpController = require("../controller/userSignup");

//router.post("/signup", userSignUpController);

const userSignUpController = require("../controller/user/userSignup");
const userSignInController = require("../controller/user/userSignin");
const userDetailsController = require("../controller/user/userDetails");
const tokenCookieAuth = require('../middleware/tokenAuth');
const logoutController = require('../controller/user/logoutUser');
const allUserController = require('../controller/user/allUsers');
const updateUserController = require('../controller/user/updateUser');
const uploadProductController = require('../controller/product/uploadProducts');
const getProductsController = require('../controller/product/getAllProducts');
const updataEditProductController = require('../controller/product/updateEditProduct');
const getCategoryProductController = require('../controller/product/getCategoryProducts');
const getAllCategoryBasedProductControler = require('../controller/product/getAllCategoryBasedProduct');
const getProductDetailsController = require('../controller/product/getProductDetails');
const addToCartController = require('../controller/user/addToCartController');
const countAddToCartProductController = require('../controller/user/countAddToCartProduct');
const addToCartViewProductController = require('../controller/user/addToCartViewProduct');
const updateAddToCartProductController = require('../controller/user/updateAddToCartProduct');
const deleteAddToCartProductController = require('../controller/user/deleteAddToCartProduct');
const searchProductController = require('../controller/product/searchProducts');
const filterProductController = require('../controller/product/filterProducts');
const forgetPasswordController = require('../controller/user/userForgetPassword');
const userResetPasswordController = require('../controller/user/userResetPassword');

/*for User*/
router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user_details",tokenCookieAuth,userDetailsController);
router.get("/logout", logoutController );
router.post("/forget_password", forgetPasswordController);
router.post("/reset_password",userResetPasswordController )

/** for user add to cart */
router.post("/add_to_cart", tokenCookieAuth ,addToCartController)
router.get("/countAddToCartProduct",tokenCookieAuth,countAddToCartProductController)
router.get("/view_card_product",tokenCookieAuth,addToCartViewProductController)
router.post("/update_cart_product",tokenCookieAuth,updateAddToCartProductController)
router.post("/delete_cart_product",tokenCookieAuth,deleteAddToCartProductController)

/* for admin panel*/
router.get("/all_users", tokenCookieAuth, allUserController );
router.post("/update_user", tokenCookieAuth, updateUserController);


/**for Products */
router.post("/upload_product", tokenCookieAuth , uploadProductController);
router.get("/get_products",  getProductsController);
router.post("/update_product", tokenCookieAuth, updataEditProductController);
router.get("/get_categoryProduct" , getCategoryProductController);
router.post("/get_allcategoryproduct",getAllCategoryBasedProductControler);
router.post("/product_details", getProductDetailsController);
router.get("/search",searchProductController)
router.post("/filter_product",filterProductController)


module.exports = router;
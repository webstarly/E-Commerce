const backendDomain = process.env.REACT_APP_BACKEND_URL;

const FullApi = {
    signUP : {
        url : `${backendDomain}/api/signup`,
        method : "post"
    },
    signIN : {
        url : `${backendDomain}/api/signin`,
        method : "post"
      // `${backendDomain}/api/signin`
    },
    forgetPassword : {
        url : `${backendDomain}/api/forget_password`,
        method : "post"
    },
    resetPassword : {
        url : `${backendDomain}/api/reset_password`,
        method : "post"
    },
    currentUSER: {
        url : `${backendDomain}/api/user_details`,
        method : "get"
    },
    userLogout: {
        url : `${backendDomain}/api/logout`,
        method : "get"
    },
    getAllUsers:{
        url : `${backendDomain}/api/all_users`,
        method : "get"
    },
    userUpdate: {
        url : `${backendDomain}/api/update_user`,
        method : "post"
    },
    productUpload: {
        url : `${backendDomain}/api/upload_product`,
        method : "post"
    },
    getProducts: {
        url : `${backendDomain}/api/get_products`,
        method : "get"
    },
    updateProduct: {
        url : `${backendDomain}/api/update_product` ,
        method : "post"
    },
    loadCategoryProduct: {
        url : `${backendDomain}/api/get_categoryProduct`,
        method : "get"
    },
    showAllCategoryProduct: {
        url : `${backendDomain}/api/get_allcategoryproduct`,
        method : "post"
    },
    productDetails : {
        url : `${backendDomain}/api/product_details`,
        method : "post"
    },
    productAddToCart : {
        url : `${backendDomain}/api/add_to_cart`,
        method : "post"
    }, 
    addToCartProductCount : {
        url : `${backendDomain}/api/countAddToCartProduct`,
        method : "get"
    }, 
    addToCartProductView : {
        url : `${backendDomain}/api/view_card_product`,
        method : "get"
    }, 
    updateCartProduct : {
        url : `${backendDomain}/api/update_cart_product`,
        method : "post"
    },
    deleteCartProduct : {
        url : `${backendDomain}/api/delete_cart_product`,
        method : "post"
    },
    searchProduct : {
        url : `${backendDomain}/api/search`,
        method : "get"
    },
    filterProduct : {
        url : `${backendDomain}/api/filter_product`,
        method : "post"
    } 
}


export default FullApi; 
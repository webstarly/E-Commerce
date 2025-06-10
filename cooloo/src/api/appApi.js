const backendDomain = process.env.REACT_APP_BACKEND_URL;

const FullApi = {
    signUP : {
        url : `${backendDomain}/api/signup`,
        method : "Post"
        //`${backendDomain}/api/signup`,
    },
    signIN : {
        url : `${backendDomain}/api/signin`,
        method : "Post"
      // `${backendDomain}/api/signin`
    },
    forgetPassword : {
        url : `${backendDomain}/api/forget_password`,
        method : "Post"
    },
    resetPassword : {
        url : `${backendDomain}/api/reset_password`,
        method : "Post"
    },
    currentUSER: {
        url : `${backendDomain}/api/user_details`,
        method : "Get"
    },
    userLogout: {
        url : `${backendDomain}/api/logout`,
        method : "Get"
    },
    getAllUsers:{
        url : `${backendDomain}/api/all_users`,
        method : "Get"
    },
    userUpdate: {
        url : `${backendDomain}/api/update_user`,
        method : "Post"
    },
    productUpload: {
        url : `${backendDomain}/api/upload_product`,
        method : "Post"
    },
    getProducts: {
        url : `${backendDomain}/api/get_products`,
        method : "Get"
    },
    updateProduct: {
        url : `${backendDomain}/api/update_product` ,
        method : "Post"
    },
    loadCategoryProduct: {
        url : `${backendDomain}/api/get_categoryProduct`,
        method : "Get"
    },
    showAllCategoryProduct: {
        url : `${backendDomain}/api/get_allcategoryproduct`,
        method : "Post"
    },
    productDetails : {
        url : `${backendDomain}/api/product_details`,
        method : "Post"
    },
    productAddToCart : {
        url : `${backendDomain}/api/add_to_cart`,
        method : "Post"
    }, 
    addToCartProductCount : {
        url : `${backendDomain}/api/countAddToCartProduct`,
        method : "Get"
    }, 
    addToCartProductView : {
        url : `${backendDomain}/api/view_card_product`,
        method : "Get"
    }, 
    updateCartProduct : {
        url : `${backendDomain}/api/update_cart_product`,
        method : "Post"
    },
    deleteCartProduct : {
        url : `${backendDomain}/api/delete_cart_product`,
        method : "Post"
    },
    searchProduct : {
        url : `${backendDomain}/api/search`,
        method : "Get"
    },
    filterProduct : {
        url : `${backendDomain}/api/filter_product`,
        method : "Post"
    } 
}


export default FullApi; 
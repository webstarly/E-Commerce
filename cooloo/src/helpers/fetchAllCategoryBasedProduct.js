const { default: FullApi } = require("../api/appApi")
//import FullApi from "../api/appApi"

const fetchAllCategoryBasedProduct = async(category) => {
    const fetchDataresponse = await fetch(FullApi.showAllCategoryProduct.url,{
        method : FullApi.showAllCategoryProduct.method,
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            category : category
        })
    })

    console.log("API URL:", FullApi.showAllCategoryProduct.url)
    
    console.log("Category sent to API:", category);

    console.log("Request Payload:", JSON.stringify({ category }));

    console.log("allCategoryResponse", fetchDataresponse)

    const fetchDataApi = await fetchDataresponse.json();

    console.log("allCategory", fetchDataApi)

    return fetchDataApi

}
export default fetchAllCategoryBasedProduct;
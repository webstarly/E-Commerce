import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Forgotpassword from "../Pages/Forgotpassword";
import Adminpanel from "../Pages/Adminpanel";
import Alluser from "../Pages/Alluser";
import Allproducts from "../Pages/Allproducts";
import Categoryproduct from "../Pages/Categoryproduct";
import ProductDetails from "../Pages/Productdetails";
import Cart from "../Pages/Cart";
import SearchProduct from "../Pages/Searchproduct";
import Resetpassword from "../Pages/Resetpassword";



const router = createBrowserRouter([
    {
      path : "/",
      element : <App/>,
      children : [
        {
            path : "",
            element : <Home />
        },
        {
            path : "login",
            element : <Login />
        },
        {
          path : "signup",
          element : <Signup />
        },
        {
          path : "forgot-password",
          element : <Forgotpassword/>
        },
        {
          path : "reset-password",
          element : <Resetpassword />
        },
        {
          path : "product-category",
          element : <Categoryproduct/>
        },
        {
          path : "product/:id",
          element : <ProductDetails/>
        },
        {
          path : "cart",
          element : <Cart/>
        },
        {
          path : "search",
          element : <SearchProduct/>
        },
        {
          path : "admin-panel",
          element : < Adminpanel/>,
          children : [
            {
              path : "all-users",
              element : < Alluser />
            },
            {
              path : "all-products",
              element : < Allproducts />
            }
          ]
        }
      ]
    },
])


export default router
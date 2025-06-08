import React, { useEffect, useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FullApi from "./api/appApi";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
  

function App() {
  
  const dispatch = useDispatch();
  const [cartProductCount,setCartProductCount] = useState(0)

  const fetchUserDetails = async()=>{
   const dataResponse = await fetch(FullApi.currentUSER.url,{
    method : FullApi.currentUSER.method,
    credentials : "include"
   })

   const dataApi = await dataResponse.json();

   if(dataApi.success){
      dispatch(setUserDetails(dataApi.data));
   }

   console.log("dataApi", dataResponse)

  }

  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(FullApi.addToCartProductCount.url,{
      method : FullApi.addToCartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    console.log("dataApicount", dataApi)

    setCartProductCount(dataApi?.data?.count)
  }

  useEffect(() => {
    /* user details */
    fetchUserDetails();
    /**user Details cart product */
    fetchUserAddToCart()

  },[])

  return (
    <> 
      <Context.Provider value={{
        fetchUserDetails, // fetch user details
        cartProductCount,//Add current user product count to cart
        fetchUserAddToCart 
      }}>
      <ToastContainer position="top-center" />
      <Header/>
      <main className="min-h-[calc(100vh-120px)]">
      <Outlet />
      </main>
      <Footer/>
      </Context.Provider>
    </>
  );
}

export default App;

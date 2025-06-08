import React, { useEffect, useState } from 'react'
import UploadProducts from '../Components/UploadProducts'
import FullApi from '../api/appApi';
import AllProductCard from '../Components/AllProductCard';

const Allproducts = () => {
  const [openUploadProduts, setOpenUploadProduts] = useState(false);
  const [allProducts, setAllProducts] = useState([])

  const fetchAllProducts = async() =>{
    const fetchProducts = await fetch(FullApi.getProducts.url);
    const dataResponse = await fetchProducts.json();

    setAllProducts(dataResponse?.data || []);
  }

  useEffect(()=>{
    fetchAllProducts()
  },[]);

  const handleOnClick = (e) => {
    setOpenUploadProduts(true);
  }

  return (
    <div>
      <div className='bg-white px-4 py-2 flex w-full'>
        <h1 className='font-bold test-lg'>
          All Products
        </h1>
        <button className= 'border-orange-600 border-2 block ml-auto rounded-full text-orange-600 px-2 py-1 hover:bg-orange-600 hover:text-white shadow-md transition-all cursor-pointer' onClick={handleOnClick}>
          Upload Product
        </button>
      </div>

      {/**For all products */}
      <div className='flex gap-4 flex-wrap items-center py-2 h-[calc(100vh-100px)] overflow-y-scroll'>
        {
          allProducts.map((product,index)=>{
            return(
              <AllProductCard data={product} key={index + "allProducts"} fetchData={fetchAllProducts} />
            )}
          )    
        }
      </div>

      


      {/* Upload products */}
      {
       openUploadProduts && (
        <UploadProducts 
        onClose = {()=>setOpenUploadProduts(false)}
        fetchData={fetchAllProducts}
        />
       ) 
      }
    </div>
  )
}

export default Allproducts

import React, { useContext, useEffect, useRef, useState } from 'react'  
import currencySymbol from '../helpers/currencySymbol'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import fetchAllCategoryBasedProduct from '../helpers/fetchAllCategoryBasedProduct';


const ProductHorizontalCard = ({category, heading}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    //const [scroll,setScroll] = useState(0)
    const scrollElement = useRef()


    const { fetchUserAddToCart  } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart()
    }

    const fetchData = async() =>{
        setLoading(true)
        const categoryProduct = await fetchAllCategoryBasedProduct(category)
        setLoading(false)

        console.log("horizontal data",categoryProduct.data)
        setData(categoryProduct?.data)
    }

    console.log("datafetch",fetchData)

    useEffect(()=>{
        fetchData()
    },[])

    const scrollRight = () =>{
        scrollElement.current.scrollLeft += 350
    }
    const scrollLeft = () =>{
        scrollElement.current.scrollLeft -= 350
    }


  return (
    <div className='container mx-auto px-4 my-6 relative'>

            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

                
           <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>

            <button  className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><IoIosArrowBack/></button>
            <button  className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><IoIosArrowForward/></button> 

           {   loading ? (
                loadingList.map((product,index)=>{
                    return(
                        <div key={index} className='w-full min-w-[280px] md:min-w-[350px] max-w-[280px] md:max-w-[350px] h-36 bg-white rounded-sm shadow flex'>
                            <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>

                            </div>
                            <div className='p-4 grid w-full gap-2'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                                <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                                <div className='flex gap-3 w-full'>
                                    <p className='text-orange-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                    <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                </div>
                                <button className='text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse'></button>
                            </div>
                        </div>
                    )
                })
           ) : (
            data.map((product,index)=>{
                return(
                    <Link to={"product/"+product?._id} key={"product"+ index} className='w-full min-w-[300px] md:min-w-[350px] max-w-[300px] md:max-w-[350px] h-40  bg-white rounded-sm shadow flex'>
                        <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                            <img src={product.productImage[0]} alt='productImage' className='object-scale-down h-full hover:scale-110 transition-all'/>
                        </div>
                        <div className='p-4 flex flex-col border w-full'>
                            <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                            <p className='capitalize text-slate-500'>{product?.category}</p>
                            <div className='flex-col  gap-1 mt-2'>
                                <p className='text-orange-600 font-medium'>{ currencySymbol(product?.sellingPrice) }</p>
                                <p className='text-slate-500 line-through'>{ currencySymbol(product?.price)  }</p>
                            </div>
                            
                            <button className='text-sm w-3/4 md:w-[80%] bg-orange-600 hover:bg-orange-700 text-white px-3 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                            
                        </div>
                    </Link>
                )
            })
           )
               
            }
           </div>
            

    </div>
  )
}

export default ProductHorizontalCard
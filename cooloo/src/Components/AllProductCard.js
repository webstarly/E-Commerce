import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import EditProduct from "./EditProduct";
import currencySymbol from "../helpers/currencySymbol";


const AllProductCard = ({ data , fetchData }) => {
  const [editCardProduct, setEditCardProduct] = useState(false);

  return (
    <div className="bg-white p-4 rounded shadow-md  ">
      <div className="w-40 ">

            <div className="w-35 h-40 flex justify-center items-center m-3 ">
                <img src={data?.productImage[0]} /**width={120} height={120}*/ className="w-full h-full mx-auto object-contain "/>
            </div>
            <h1 className="text-ellipsis line-clamp-1">{data?.productName}</h1>

            <div>
                <p className="font-semibold">
                    {
                        currencySymbol(data?.sellingPrice)
                    }
                </p>
                <div className=" w-fit ml-auto bg-green-100 p-2 text-black cursor-pointer rounded-full hover:bg-green-800 hover:text-white" onClick={(e) =>{setEditCardProduct(true)}}>
                    <CiEdit />
                </div>  
            </div>
      </div>

      {
        editCardProduct && (
            <EditProduct productData = {data} onClose={(e) =>{setEditCardProduct(false)}} fetchData={fetchData}/>
            
        )
      }
      
      
    </div>
  );
};

export default AllProductCard;

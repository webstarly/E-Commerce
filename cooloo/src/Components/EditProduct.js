import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import productCategory from "../helpers/productCategory";
import { IoCloudUpload } from "react-icons/io5";
import uploadImage from "../helpers/uploadImagesApi";
import DisplayImage from "./DisplayImage";
import { MdDeleteForever } from "react-icons/md";
import FullApi from "../api/appApi";
import { toast } from "react-toastify";

const EditProduct = ({ onClose, productData, fetchData }) => {
  const [data, setData] = useState ({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState("");
  const [fullScreenImage, setfullScreenImage] = useState("");

  const handleOnChange = async (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const cloudinaryUploadImage = await uploadImage(file);

    console.log("image_upload", cloudinaryUploadImage.url);

    setData((preve) => {
      return {
        ...preve,
        productImage: [...preve.productImage, cloudinaryUploadImage.url],
      };
    });
  };

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((preve) => {
      return {
        ...preve,
        productImage: [...newProductImage],
      };
    });
  };

  {/**For Upload Product */}
  const handleSubmit = async(e) =>{
    e.preventDefault()
    
    const response = await fetch(FullApi.updateProduct.url,{
      method : FullApi.updateProduct.method,
        credentials : "include",
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify(data)
        })

      const responseData = await response.json();

      if(responseData.success){
          toast.success(responseData.message);
          onClose()
          fetchData()
      }

      if(responseData.error){
        toast.error(responseData.message)
    }

  }

  return (
    <div className="fixed h-full w-full bg-slate-200 bg-opacity-30 top-0 left-0 bottom-0 right-0 justify-center items-center flex">
      <div className="bg-white p-4 h-full max-h-[80%] w-full max-w-2xl overflow-hidden">
            <div className="flex justify-between items-center pb-3">
            <h1 className="font-bold text-lg">Edit Product</h1>
            <button
                className="w-fit ml-auto text-xl hover:text-orange-600 cursor-pointer"
                onClick={onClose}
            >
                <MdClose />
            </button>
            </div>

            <form
            className="grid p-4 gap-3 overflow-y-scroll h-full"
            onSubmit={handleSubmit}
            >
            <label htmlFor="productName">Product Name :</label>
            <input
                type="text"
                id="productName"
                placeholder="Enter product name"
                name="productName"
                value={data.productName}
                onChange={handleOnChange}
                className="p-1 rounded bg-slate-100 border"
                required
            />

            <label htmlFor="brandName" className="mt-3">
                Brand Name :
            </label>
            <input
                type="text"
                id="brandName"
                placeholder="Enter product name"
                name="brandName"
                value={data.brandName}
                onChange={handleOnChange}
                className="p-1 rounded bg-slate-100 border"
                required
            />

            <label htmlFor="category" className="mt-3">
                Category :
            </label>
            <select
                name="category"
                value={data.category}
                onChange={handleOnChange}
                className="p-2 rounded bg-slate-100 border"
                required
            >
                <option value={""}>Select Category</option>
                {productCategory.map((el, index) => {
                return (
                    <option value={el.value} key={el.value + index}>
                    {el.label}
                    </option>
                );
                })}
            </select>

            <label htmlFor="productImage" className="mt-3">
                Product Image :
            </label>
            <label htmlFor="uploadImage">
                <div className="p-2 bg-slate-100 rounded w-full h-32 border flex justify-center items-center cursor-pointer">
                <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                    <span className="text-4xl">
                    <IoCloudUpload />
                    </span>
                    <p className="text-sm">Upload picture</p>
                    <input
                    name="uploadImage"
                    type="file"
                    id="uploadImage"
                    className="hidden "
                    onChange={handleUploadProduct}
                    />
                </div>
                </div>
            </label>
            <div>
                {data?.productImage[0] ? (
                <div className="flex item-center gap-2">
                    {data.productImage.map((el, index) => {
                    return (
                        <div className="relative group">
                        <img
                            src={el}
                            alt={el}
                            width={80}
                            height={80}
                            className="border bg-slate-100 cursor-pointer"
                            onClick={(e) => {
                            setOpenFullScreenImage(true);
                            setfullScreenImage(el);
                            }}
                        />
                        <div
                            className="absolute bottom-0 right-0 p-1 text-white bg-orange-600 rounded-full hidden group-hover:block cursor-pointer "
                            onClick={(e) => handleDeleteProductImage(index)}
                        >
                            <MdDeleteForever />
                        </div>
                        </div>
                    );
                    })}
                </div>
                ) : (
                <p className="text-red-600 text-xs">
                    **Please Upload product image
                </p>
                )}
            </div>

            <label htmlFor="price" className="mt-3">
                Price :
            </label>
            <input
                type="number"
                id="price"
                placeholder="Enter product price"
                name="price"
                value={data.price}
                onChange={handleOnChange}
                className="p-1 rounded bg-slate-100 border"
                required
            />

            <label htmlFor="sellingPrice" className="mt-3">
                Selling Price :
            </label>
            <input
                type="number"
                id="sellingPrice"
                placeholder="Enter selling price"
                name="sellingPrice"
                value={data.sellingPrice}
                onChange={handleOnChange}
                className="p-1 rounded bg-slate-100 border"
                required
            />

            <label htmlFor="description" className="mt-3">
                Description :
            </label>
            <textarea
                name="description"
                value={data.description}
                className="h-28 bg-slate-100 border resize-none p-1"
                rows={3}
                placeholder="Enter product description"
                onChange={handleOnChange}
                required
            ></textarea>

            <button className="bg-orange-600 py-2 text-white rounded mb-10 hover:bg-orange-700">
                Update Product
            </button>
            </form>
        </div>

        {/** displays image  */}
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => {
            setOpenFullScreenImage(false);
          }}
          imgUrl={fullScreenImage}
        />
      )}

    </div>
    /** 
   <div className=' bg-white w-96 h-60  p-4 rounded'>
        <div>
            <button className='ml-auto block p-1 ' onClick={onClose}>
                < MdClose/>
            </button>
            <div>
                EditProduct
            </div>
        </div>
    </div>
    **/
  );
};

export default EditProduct;

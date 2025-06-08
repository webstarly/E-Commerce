import React, { useEffect, useState } from "react";
import FullApi from "../api/appApi";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [getCategoryProduct, setGetCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const responseData = await fetch(FullApi.loadCategoryProduct.url);
    const response = await responseData.json();
    setLoading(false);
    setGetCategoryProduct(response.data);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto p-4  ">
      <div className="flex justify-between items-center gap-2 overflow-scroll scrollbar-none">
        {loading
          ? categoryLoading.map((el, index) => {
              return (
                <div
                  className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                  key={"categoryLoading" + index}
                ></div>
              );
            })
          : getCategoryProduct.map((product, index) => {
              return (
                <Link
                  to={"/product-category?category="+ product?.category}
                  key={'product'+ index}
                  className="cursor-pointer"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-200 rounded-full overflow-hidden flex justify-center p-4 items-center">
                    <img
                      src={product?.productImage[1]}
                      className=" h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                    />
                  </div>
                  <h1 className="capitalize text-center text-sm md:text-base ">
                    {product?.category}
                  </h1>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;

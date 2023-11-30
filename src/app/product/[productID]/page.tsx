"use client";
import React, { useEffect, useState } from "react";
import { getProductByID } from "../getProduct";

function ProductDetail({ params }: { params: { productID: string } }) {
  const [product, setproduct] = useState<any>(null);

  useEffect(() => {
    console.log(params);
    getProductDetail();
  }, []);

  const getProductDetail = async () => {
    const res = await getProductByID(params.productID);
    if (res) setproduct(res);
    console.log(res);
  };

  return (
    <div className="main-container w-full p-16">
      <div className="product-content relative bg-slate-800 rounded-lg p-4">
        <div className="title text-2xl font-semibold mb-3">{product?.title}</div>
        <div className="images-group w-3/4 flex gap-3 overflow-x-scroll cursor-pointer mb-4">
          {product?.images?.map((m: any, id: any) => {
            return <img key={id} src={m} alt={product.title} className="w-[350px] rounded-lg" />;
          })}
        </div>
        <div className="product-price text-xl font-semibold text-green-500">$ {product?.price}</div>
        <div className="description mb-3">{product?.description}</div>
        <div className="stock-badge absolute top-0 right-0 p-2 bg-orange-500 rounded-se-lg rounded-bl-lg">
          {product?.stock} left
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

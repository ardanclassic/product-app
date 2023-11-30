"use client";
import React, { useEffect, useState } from "react";
import { getProduct, getProductByCategory } from "./product/getProduct";
import { useRouter } from "next/navigation";
import { useReportWebVitals } from "next/web-vitals";

function ProductPage() {
  const router = useRouter();
  const [products, setproducts] = useState<any[]>([]);
  const [category, setcategory] = useState<any>("");
  const [price, setprice] = useState<any>("asc");

  useReportWebVitals((metric) => {
    console.log(metric);
    switch (metric.name) {
      case "FCP": {
        // handle FCP results
      }
      case "LCP": {
        // handle LCP results
      }
      // ...
    }
  });

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    const res: any = await getProduct();
    if (res?.products?.length > 0) {
      setproducts(res?.products);
      sortPrices(res?.products, price);
    }
  };

  const getProductsCategory = async (id: string) => {
    setcategory(id);
    if (id) {
      const res: any = await getProductByCategory(id);
      if (res?.products?.length > 0) {
        setproducts(res?.products);
        sortPrices(res?.products, price);
      }
    } else {
      getdata();
    }
  };

  const sortPrices = async (data: any, id: string) => {
    setprice(id);
    if (id === "asc") {
      data.sort((a: any, b: any) => parseFloat(a.price) - parseFloat(b.price));
    } else {
      data.sort((a: any, b: any) => parseFloat(b.price) - parseFloat(a.price));
    }
  };

  return (
    <div className="main-container w-full p-16">
      <div className="flex gap-3">
        <div className="sidebar flex flex-col gap-4 w-[300px] min-h-[500px] p-6 bg-slate-800 rounded-lg">
          <div className="title text-center mb-4 font-semibold text-xl">Filters</div>

          <div className="category">
            <div className="title mb-2">Category</div>
            <select
              name="category"
              id="category"
              value={category}
              onChange={(e) => getProductsCategory(e.target.value)}
              className="text-black p-2 w-full rounded-lg"
            >
              <option value="">All</option>
              <option value="smartphones">Smartphone</option>
              <option value="laptops">Laptop</option>
              <option value="fragrances">Fragrance</option>
              <option value="skincare">Skincare</option>
              <option value="groceries">Groceries</option>
              <option value="home-decoration">Home Decoration</option>
            </select>
          </div>
          <div className="price">
            <div className="title">Sort by Price</div>
            <select
              name="price"
              id="price"
              value={price}
              onChange={(e) => sortPrices(products, e.target.value)}
              className="text-black p-2 w-full rounded-lg"
            >
              <option value="asc">Lowest to Highest</option>
              <option value="desc">Highest to Lowest</option>
            </select>
          </div>
        </div>

        <div className="content w-full p-6 bg-slate-800 rounded-lg">
          <div className="title text-center mb-4 font-semibold text-xl">Products</div>
          <div className="list grid grid-cols-4 gap-3">
            {products?.length > 0 &&
              products.map((pro): any => {
                return (
                  <div
                    key={pro.id}
                    onClick={() => router.push(`product/${pro.id}`)}
                    className="product relative p-2 rounded-lg bg-slate-600 cursor-pointer overflow-y-auto"
                  >
                    <div className="product-title mb-2">{pro.title}</div>
                    <div className="product-image bg-black mb-2 rounded-lg">
                      <img src={pro.images[0]} alt={pro.title} className="rounded-lg max-h-[200px] mx-auto" />
                    </div>
                    <div className="product-price font-semibold text-green-500">$ {pro.price}</div>
                    <div className="product-description mb-2 text-xs">{pro.description}</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;

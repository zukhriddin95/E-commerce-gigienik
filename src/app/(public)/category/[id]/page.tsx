"use client";

import { Fragment, useEffect, useState } from "react";
import ProductCard from "@/components/productCard";
import request from "@/server";
import CategoryType from "@/types/category";
import Params from "@/types/dinamicParams";
import ProductType from "@/types/product";
import Image from "next/image";
import { toast } from "react-toastify";
import LoadingPage from "@/components/LoadingPage";
import CustomImage from "@/components/image";

const CategoryId = ({ params: { id } }: Params) => {
const [category, setCategory] = useState<CategoryType | null>(null);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true);

  async function getCategory() {
    try {
      setLoading(true);
      const { data } = await request.get(`category/${id}`);
      setCategory(data); // yoki data[0] o'rniga mos keladigan boshqa indeks
    } catch (error) {
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  }

  console.log(category);

  async function getcategories() {
    try {
      setLoading(true);
      const {
        data: { total, products },
      } = await request.get(`product`, { params: { category: id } });
      setProducts(products);
      setTotal(total);
    } catch (err) {
      toast.error("error");
    }finally {
      setLoading(false);
    }
  }


  
  useEffect(() => {
    getcategories();
    getCategory();
  }, []);

  return (
    <Fragment>
      {loading ? <LoadingPage /> : <div className="container mx-auto mt-[100px] border-b-2 pb-28">
        
          <div className="max-w-5xl mx-auto border-b-2 flex flex-col md:flex-row items-center gap-12 px-4 mt-[110px] pb-10">
            <Image
              src={category?.image.url || ""}
              alt={"category-photo"}
              width={300}
              height={400}
              className={`object-contain duration-700 ease-in-out group-hover:opacity-75 ${
                loadingImage
                  ? "scale-110 blur-2xl grayscale"
                  : "scale-100 blur-0 grayscale-0"
              }}`}
              onLoadingComplete={() => setLoadingImage(false)}
            />

            <div className="divide-2">
              <div className="space-y-8 pb-8">
                <h1 className="text-2xl md:text-4xl font-bold">
                  {category?.name}
                </h1>
                <h2 className="text-gray-500 font-bold text-xl md:text-3xl">
                  {category?.name}
                </h2>
              </div>
            </div>
          </div>
     

        <div className="mt-[30px]">
          <h3 className="text-center text-[30px] text-bold">
            Product Total: ({total})
          </h3>
        </div>
        <div className="grid pl-6 pr-6 m-6 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>}
    </Fragment>
  );
};

export default CategoryId;

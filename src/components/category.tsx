"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import request from "@/server";
import CategoryType from "@/types/category";

import { BiCategoryAlt } from "react-icons/bi";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CategoryPage = () => {
  const [category, setCategory] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingImg, setLoadingImg] = useState(true);
  const router = useRouter()

  useEffect(() => {
    getCategory();
  }, []);

  async function getCategory() {
    try {
      setLoading(true);
      const { data } = await request.get("category");
      setCategory(data);
    } catch (error) {
      toast.error("error" + error)
    } finally {
      setLoading(false);
    }
  }

  

  return (
    <section className="text-gray-600 body-font py-24 border-b-2">
      <div className="container px-5  mx-auto">
        <div className="flex items-center justify-center gap-4 mb-10">
          <BiCategoryAlt className="text-[35px] font-semibold bg-blue-500 text-white rounded" />
          <h1 className="text-[35px] font-semibold ">Product Category</h1>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[25px]">
          {category.map((el) => (
            <div
              key={el?._id}
              onClick={() => router.push(`category/${el?._id}`)}
              className="border hover:scale-105 cursor-pointer duration-300 shadow-lg p-4 w-full"
            >
              <a className="block relative h-48 rounded overflow-hidden">
                <Image
                  src={el?.image?.url}
                  alt={el?.name}
                  fill
                  className={`object-contain duration-700 ease-in-out group-hover:opacity-75 ${
                    loadingImg
                      ? "scale-110 blur-2xl grayscale"
                      : "scale-100 blur-0 grayscale-0"
                  }}`}
                  onLoadingComplete={() => setLoadingImg(false)}
                />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  {el?.name}
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  {el.updatedAt.split("T")[0]}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;

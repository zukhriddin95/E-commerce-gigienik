"use client";

import { LIMIT } from "@/constants";
import ProductType from "@/types/product";
import { Fragment, useEffect, useState } from "react";
import { MdCategory } from "react-icons/md";
import { toast } from "react-toastify";
import request from "@/server";

import ProductCard from "@/components/productCard";
import LoadingPage from "@/components/LoadingPage";
import Searching from "@/components/Searching";
import Pagination from "@/components/pagination";

const AllProduct = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const currency = total / +LIMIT;


  useEffect(() => {
    getProducts();
  }, [page]);


  async function getProducts() {
    setLoading(true);
    try {
      const {
        data: { total, products },
      } = await request.get(`product`, {
        params: {
          page: page,
          limit: LIMIT,
        },
      });
      setProducts(products);
      setTotal(total);
    } catch (err) {
      toast.error("error");
    } finally {
      setLoading(false);
    }
  }

    
 

  return (
    <Fragment>
      {loading ? (
        <LoadingPage />
      ) : products.length ? (
        <section className="mt-[100px] border-b-2 pb-[100px]">
          <div className="container mx-auto">
            <div className="mb-6 pl-6 pr-6 flex flex-col lg:flex-row lg:justify-between items-center justify-center gap-4">
              <h1 className="flex items-center gap-4 text-bold lg:text-[35px]">
                {" "}
                <MdCategory className="text-[30px] bg-blue-500 text-white rounded" />{" "}
                barcha maxsulotlar ({total})
              </h1>
              <Searching setProducts={setProducts} setLoading={setLoading} />
            </div>
            <div className="grid pl-6 pr-6 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* <div className="flex items-center justify-between gap-4 mt-[25px] p-10">
              <button
                onClick={handlePrevious}
                className={`flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  page === 1 ? "cursor-not-allowed" : "none"
                }`}
              >
                <svg
                  className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 5H1m0 0 4 4M1 5l4-4"
                  />
                </svg>
                Previous
              </button>
              <button
                onClick={handleNext}
                className={`flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  page === currency ? "cursor-not-allowed" : "none"
                }`}
              >
                Next
                <svg
                  className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div> */}
            <div className="p-6 pt-0">
            
              <Pagination
                setPage={setPage}
                page={page}
                currency={currency}
              />
            </div>
          </div>
        </section>
      ) : (
        <div className="pt-44 text-center">
          <h1 className="mb-4 text-4xl font-semibold text-red-500">
            Products is empty
          </h1>
          <div className="mt-8 animate-bounce">
            <svg
              className="mx-auto h-16 w-16 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </div>
          <p className="mt-4 text-gray-600">
            Let s get you back{" "}
            <button onClick={() => location.reload()} className="text-blue-500">
              Products
            </button>
            .
          </p>
        </div>
      )}
    </Fragment>
  );
};

export default AllProduct;

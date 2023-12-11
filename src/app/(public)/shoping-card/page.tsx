"use client";

import { useState, useEffect } from "react";
import CustomImage from "@/components/image";
import ProductType from "@/types/product";
import { CART } from "@/constants";

const ShoppingCard = () => {
  const [total, setTotal] = useState<number>(0);
  const [products, setProducts] = useState<ProductType[]>([]);

  const removeProduct = (id: string) => {
    const updatedcart = products.filter((product) => product._id !== id);
    localStorage.setItem(CART, JSON.stringify(updatedcart));
    setProducts(updatedcart);
  };

  const handleIncriment = (id: string) => {
    const updatedcart = products.map((product) => {
      if (product._id === id) {
        return {
          ...product,
          soni: product.soni + 1,
        };
      }
      return product;
    });
    localStorage.setItem(CART, JSON.stringify(updatedcart));
    setProducts(updatedcart);
  };

  const handleDencriment = (id: string) => {
    const existProduct = products.find((product) => product._id === id);
    if (existProduct?.soni === 1) {
      removeProduct(existProduct?._id);
    } else {
      const updatedcart = products.map((product) => {
        if (product._id === id) {
          return {
            ...product,
            soni: product.soni - 1,
          };
        }
        return product;
      });
      localStorage.setItem(CART, JSON.stringify(updatedcart));
      setProducts(updatedcart);
    }
  };
  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const storedCarts =
        JSON.parse(localStorage.getItem(CART) as string) || [];
      setProducts(storedCarts);
    }
  }, []);

  useEffect(() => {
    const total = products.reduce((acc, i) => {
      return acc + i.price * i.soni;
    }, 0);
    setTotal(total);
  }, [products]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem(CART) || "[]");
    setProducts(storedCart);
  }, []);

  const removeItem = () => {
    localStorage.removeItem(CART);
    location.reload();
  };

  return (
    <>
      {products.length ? (
        <section className="bg-gray-100 overflow-auto p-4 ">
          <div className="h-screen bg-gray-100 pt-20 mb-20">
            <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
              <div className="rounded-lg md:w-2/3">
                {products.map((product) => (
                  <div
                    key={product?._id}
                    className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                  >
                    <div className="relative w-52">
                      <CustomImage product={product} fill />
                    </div>
                    <div className="sm:ml-4 sm:flex sm:w-full gap-x-4 sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900 line-clamp-1">
                          {product?.title}
                        </h2>
                        <p className="mt-1 text-xs text-gray-700 line-clamp-2">
                          {product?.description}
                        </p>
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">
                          <span
                            onClick={() => handleDencriment(product._id)}
                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          >
                            -
                          </span>
                          <input
                            className="h-8 w-8 border bg-white text-center text-xs outline-none"
                            type="number"
                            value={product.soni}
                            min="1"
                            // onChange={(e) => handlesoniChange(e)}
                          />
                          <span
                            onClick={() => handleIncriment(product._id)}
                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          >
                            +
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="text-sm">
                            {(product.price * product.soni).toLocaleString(
                              "uz-Uz",
                              {
                                currency: "UZS",
                                style: "currency",
                              }
                            )}
                          </p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                            onClick={() => removeProduct(product._id)}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* <!-- Sub total --> */}
              <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-700">Subtotal</p>
                  <p className="text-gray-700">
                    {total.toLocaleString("uz-Uz", {
                      currency: "UZS",
                      style: "currency",
                    })}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">Shipping</p>
                  <p className="text-gray-700">
                    {(10).toLocaleString("uz-Uz", {
                      currency: "UZS",
                      style: "currency",
                    })}
                  </p>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Total</p>
                  <div className="">
                    <p className="mb-1 text-lg font-bold">
                      {(total + 10).toLocaleString("uz-Uz", {
                        currency: "UZS",
                        style: "currency",
                      })}{" "}
                    </p>
                    <p className="text-sm text-gray-700">including VAT</p>
                  </div>
                </div>
                <button
                  onClick={removeItem}
                  className="border mt-6 w-full rounded-md bg-blue-500 py-4 font-medium text-blue-50 hover:bg-white hover:text-black hover:border "
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="pt-44  text-center">
          <h1 className="mb-4 text-4xl font-semibold text-red-500">
            shopping cart is empty
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
            <a href="/" className="text-blue-500">
              home
            </a>
            .
          </p>
        </div>
      )}
    </>
  );
};

export default ShoppingCard;

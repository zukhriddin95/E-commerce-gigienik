"use client";

import { MdOutlineShoppingCartCheckout } from "react-icons/md";
// import { GrFavorite } from "react-icons/gr";
import { TiThMenuOutline } from "react-icons/ti";
import { LuPanelLeftClose } from "react-icons/lu";

import Image from "next/image";
import ImageLogo from "../../public/logo.png";
import NavLink from "@/shared";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductType from "@/types/product";
import { CART } from "@/constants";

const PublicHeader = () => {
  const [toggle, setToggle] = useState(false);
  // const [products, setProducts] = useState<ProductType[]>([]);

  // useEffect(() => {
  //   if (typeof localStorage !== "undefined") {
  //     const storedCarts =
  //       JSON.parse(localStorage.getItem(CART) as string) || [];
  //     setProducts(storedCarts);
  //   }
  // }, []);

  // useEffect(() => {}, [products]);

  // useEffect(() => {
  //   const storedCart = JSON.parse(localStorage.getItem(CART) || "[]");
  //   setProducts(storedCart);
  // }, []);
  return (
    <header className="text-gray-600 body-font fixed w-full top-0 bg-white z-10 shadow">
      <div className="container mx-auto flex  justify-between items-center pr-3 pl-3 md:p-5 ">
        <Link
          href="/"
          className="flex title-font pt-2 md:pt-0 font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <Image src={ImageLogo} alt="logo" width={50} className="rounded" />
          <span className="ml-3  text-xl  font-bold text-gray-900">
            E-commerce
          </span>
        </Link>
        <nav className="md:mr-auto md:ml-4  md:py-1 md:pl-4 md:border-l md:border-gray-400 hidden	md:flex  items-center text-base justify-center gap-5">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/products">All products</NavLink>
          <NavLink href="/about">about</NavLink>
          <NavLink href="/register">register</NavLink>
        </nav>
        <div className=" hidden md:flex items-center  justify-center gap-x-4">
          <Link href="/login">
            <button className="lg:button pr-2 pl-2 pt-1 pb-1 border rounded  border-blue-600 hover:bg-blue-500 duration-300 hover:text-white">
              Sign Up
            </button>
          </Link>
          {/* <button className="border-blue-600 inline-flex items-center bg-gray-100 border-0 py-[5px] px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            <GrFavorite className=" text-[25px] " />
          </button> */}
          <Link href="/shoping-card">
            <button className="relative border-blue-600 inline-flex items-center bg-gray-100 border-0 py-[5px]  px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
              <MdOutlineShoppingCartCheckout className=" text-[25px] " />
              {/* <h1 className="absolute -top-2 rounded-lg -right-2 bg-red-500 text-white px-1 ">
                {products?.length}
              </h1> */}
            </button>
          </Link>
        </div>
        <div className=" block md:hidden ">
          <button
            onClick={() => setToggle(!toggle)}
            className="pr-3 pl-3 pt-1 pb-1 hover:text-white hover:bg-blue-500 duration-200 rounded-md "
          >
            <TiThMenuOutline className="text-[25px]" />
          </button>
        </div>
      </div>
      {/* toggleHeader */}

      <div
        className={`absolute top-0 left-0 bg-white p-10  h-screen transtion-all duration-300 ${
          toggle ? "w-[75%] translate-x-0" : "w-0 -translate-x-[200px]"
        }`}
      >
        <nav className="flex flex-col gap-4 mt-10  pb-2">
          <Link
            onClick={() => setToggle(!toggle)}
            className="hover:pl-3 duration-150 hover:text-blue-700 hover:font-bold pb-3 border-b"
            href="/"
          >
            Home
          </Link>
          <Link
            onClick={() => setToggle(!toggle)}
            className="hover:pl-3 duration-150 hover:text-blue-700 hover:font-bold pb-3 border-b"
            href="/products"
          >
            All products
          </Link>
          <Link
            onClick={() => setToggle(!toggle)}
            className="hover:pl-3 duration-150 hover:text-blue-700 hover:font-bold pb-3 border-b"
            href="/about"
          >
            about
          </Link>
          <Link
            onClick={() => setToggle(!toggle)}
            className="hover:pl-3 duration-150 hover:text-blue-700 hover:font-bold pb-3 border-b"
            href="/register"
          >
            register
          </Link>
        </nav>
        <div className="flex flex-col gap-3 mt-6">
          <Link
            onClick={() => setToggle(!toggle)}
            className="pr-3 pl-3 pb-2 pt-2 flex justify-center border bg-blue-500 text-white rounded-md hover:border hover:bg-transparent hover:text-black duration-200"
            href="/login"
          >
            Sign Up
          </Link>
          <Link
            onClick={() => setToggle(!toggle)}
            className="border pr-6 pl-6 pb-2 pt-2 flex justify-center rounded-md"
            href="/shoping-card"
          >
            <MdOutlineShoppingCartCheckout className=" text-[25px] " />
          </Link>
        </div>
        <button
          onClick={() => setToggle(!toggle)}
          className="absolute top-5 right-5 p-2  rounded-md  hover:text-white hover:bg-blue-400 duration-200"
        >
          <LuPanelLeftClose className="text-[25px]" />
        </button>
      </div>

      {/* toggleHeader */}
    </header>
  );
};

export default PublicHeader;

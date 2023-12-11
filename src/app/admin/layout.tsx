"use client";
import { Fragment, useEffect, useState } from "react";
import childrenType from "@/types/childType";
import NavLink from "@/shared";
import Link from "next/link";
import {
  MdAdminPanelSettings,
  MdOutlineCategory,
  MdOutlineProductionQuantityLimits,
  MdOutlineSettings,
} from "react-icons/md";
import { FaUsers, FaCcAmazonPay } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import Image from "next/image";
import ImageLogo from "../../../public/logo.png";
import { useAppSelector } from "@/redux/hooks";
import { useRouter, redirect } from "next/navigation";
import { setIsAuthenticated } from "@/redux/slice/authSlice";
import { deleteCookie } from "cookies-next";
import { ECOMMERCE_ROLE, ECOMMERCE_TOKEN } from "@/constants";
import ROLES from "@/roles";

const AdminLayout = ({ children }: childrenType) => {
  const [activeMenuItem, setActiveMenuItem] = useState("/admin/dashboard");
  const { isAuthenticated, role } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const handleMenuItemClick = (active: string) => {
    setActiveMenuItem(active);
  };

  useEffect(() => {
    const pathname = location.pathname;
    setActiveMenuItem(pathname);
  }, []);

  const logout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(false);
    deleteCookie(ECOMMERCE_TOKEN);
    deleteCookie(ECOMMERCE_ROLE);
    router.push("/login");
  };

   useEffect(() => {
     if (!isAuthenticated || ROLES.ADMIN !== role) {
       redirect("/login");
     }
   }, [isAuthenticated, role]);

  return (
    <Fragment>
      <section className="fixed left-0 top-0 w-[100px] md:w-[260px] h-screen bg-slate-50 z-10  border-r-2 transition-all duration-200 overflow-hidden">
        <div className="container">
          <div className="p-6 flex items-center justify-center md:justify-start">
            <Link
              href="/admin"
              className="flex title-font pt-2 md:pt-0 font-medium items-center text-gray-900 mb-4 md:mb-0"
            >
              <Image
                src={ImageLogo}
                alt="logo"
                width={50}
                className="rounded"
              />
              <span className="hidden md:block ml-3  text-xl  font-bold text-gray-900">
                E-commerce
              </span>
            </Link>
          </div>
          <nav className="p-3">
            <ul className="flex flex-col gap-4 md:pl-6 border-b pb-3">
              <li
                className={`transition-colors pt-1 pb-1 pr-3 pl-3 border-transparents duration-300 ease-in-out ${
                  activeMenuItem === "/admin/dashboard"
                    ? " pt-1 pb-1 pr-3 pl-3 border border-transparents border-gray-400 rounded-[30%]"
                    : ""
                }`}
              >
                <Link
                  className="flex items-center justify-center md:justify-start gap-2 "
                  href="/admin/dashboard"
                  onClick={() => handleMenuItemClick("/admin/dashboard")}
                >
                  <MdAdminPanelSettings className="text-[35px] md:text-[25px]" />{" "}
                  <span className="hidden md:block text-xl  font-semibold text-gray-900">
                    Dashboard
                  </span>
                </Link>
              </li>
              <li
                className={`transition-colors pt-1 pb-1 pr-3 pl-3 border-transparents duration-300 ease-in-out ${
                  activeMenuItem === "/admin/categories"
                    ? " pt-1 pb-1 pr-3 pl-3 border border-gray-400  border-transparents rounded-[30%]"
                    : ""
                }`}
              >
                <Link
                  className="flex items-center justify-center  md:justify-start  gap-2 "
                  href="/admin/categories"
                  onClick={() => handleMenuItemClick("/admin/categories")}
                >
                  <MdOutlineCategory className="text-[35px] md:text-[25px]" />{" "}
                  <span className="hidden md:block text-xl  font-semibold text-gray-900">
                    Categories
                  </span>
                </Link>
              </li>
              <li
                className={`transition-colors pt-1 pb-1 pr-3 pl-3 border-transparents duration-300 ease-in-out ${
                  activeMenuItem === "/admin/products"
                    ? " pt-1 pb-1 pr-3 pl-3 border border-gray-400  border-transparents rounded-[30%]"
                    : ""
                }`}
              >
                <Link
                  className="flex items-center justify-center md:justify-start   gap-2 "
                  href="/admin/products"
                  onClick={() => handleMenuItemClick("/admin/products")}
                >
                  <MdOutlineProductionQuantityLimits className="text-[35px] md:text-[25px] " />{" "}
                  <span className="hidden md:block text-xl  font-semibold text-gray-900">
                    Products
                  </span>
                </Link>
              </li>
              <li
                className={`transition-colors   pt-1 pb-1 pr-3 pl-3 border-transparents  duration-300 ease-in-out ${
                  activeMenuItem === "/admin/users"
                    ? " pt-1 pb-1 pr-3 pl-3 border border-gray-400  border-transparents rounded-[30%]"
                    : ""
                }`}
              >
                <Link
                  className="flex items-center justify-center md:justify-start   gap-2 "
                  href="/admin/users"
                  onClick={() => handleMenuItemClick("/admin/users")}
                >
                  <FaUsers className="text-[35px] md:text-[25px] " />{" "}
                  <span className="hidden md:block text-xl  font-semibold text-gray-900">
                    Users
                  </span>
                </Link>
              </li>
              <li
                className={`transition-colors pt-1 pb-1 pr-3 pl-3 border-transparents duration-300 ease-in-out ${
                  activeMenuItem === "/admin/payments"
                    ? "pt-1 pb-1 pr-3 pl-3 border border-gray-400 border-transparents rounded-[30%]"
                    : ""
                }`}
              >
                <Link
                  className="flex items-center justify-center md:justify-start   gap-2 "
                  href="/admin/payments"
                  onClick={() => handleMenuItemClick("/admin/payments")}
                >
                  <FaCcAmazonPay className="text-[35px] md:text-[25px]" />{" "}
                  <span className="hidden md:block text-xl  font-semibold text-gray-900">
                    Payments
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex flex-col gap-3 mt-3 md:pl-6 ">
            <Link
              className="flex items-center justify-center md:justify-start   gap-2  "
              href="/admin/setting"
            >
              <MdOutlineSettings className="text-[35px] md:text-[25px] text-blue-800" />{" "}
              <span className="hidden md:block text-blue-800">Setting</span>
            </Link>
            <button
              onClick={(e) => logout(e)}
              className="flex items-center justify-center md:justify-start   gap-2 "
            >
              <TbLogout2 className="text-[35px] md:text-[25px] text-red-700" />{" "}
              <span className="hidden md:block text-red-700">Loagout</span>
            </button>
          </div>
        </div>
      </section>
      <section className="fixed w-full h-[60px] pl-4 bg-slate-50 z-10  top-0 ml-[100px] md:ml-[260px]  bg-whit border-b shadow-md  transition-all duration-300 rounded-bl">
        <div className="flex items-center gap-6 mt-5">
          <h1 className="text-gray-800 ml-1 text-bold">
            E-commerce-adminPanel
          </h1>
          <Link
            href="https://t.me/zukhriddin0095"
            className="text-blue-600 ml-1 text-bold"
            rel="noopener noreferrer"
            target="_blank"
          >
            @Zuhriddin
          </Link>
        </div>
      </section>
      <section className=" mt-[65px] ml-[100px] md:ml-[250px] pl-4  transition-all duration-300 ">
        {children}
      </section>
    </Fragment>
  );
};

export default AdminLayout;

{
  /* <Fragment>
      <section
        id="sidebar"
        className={`transform ${
          sidebarVisible ? "" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <Link
          href="/"
          className="brand flex items-center space-x-2 text-white p-4"
        >
          <i className="bx bxs-smile text-2xl"></i>
          <span className="text">Client Portfolio</span>
        </Link>
        <ul className="side-menu top">
          <li
            className={`transition-colors duration-300 ease-in-out ${
              activeMenuItem === "/expriences" ? "active bg-blue-500" : ""
            }`}
          >
            <Link
              href="/expriences"
              onClick={() => handleMenuItemClick("/expriences")}
              className="flex items-center space-x-2 p-4"
            >
              <i className="bx bxs-dashboard text-xl"></i>
              <span className="text">Experiences</span>
            </Link>
          </li>
          <li
            className={`transition-colors duration-300 ease-in-out ${
              activeMenuItem === "/skills" ? "active bg-blue-500" : ""
            }`}
          >
            <Link
              href="/skills"
              onClick={() => handleMenuItemClick("/skills")}
              className="flex items-center space-x-2 p-4"
            >
              <i className="bx bxl-react text-xl"></i>
              <span className="text">Skills</span>
            </Link>
          </li>
        </ul>
      </section>

      <section
        id="content"
        className="transition-transform duration-300 ease-in-out"
      >
        <nav className="navbar flex items-center justify-between p-4">
          <div onClick={toggleSidebar}>
            <i className="bx bx-menu text-2xl"></i>
          </div>
          <a href="#" className="nav-link text-white">
            Nuramtov Zukhriddin
          </a>

          <input type="checkbox" id="switch-mode" className="hidden" />
          <label htmlFor="switch-mode" className="switch-mode"></label>
          <Link
            href="/message"
            className="notification flex items-center space-x-2 text-white p-4"
          >
            <i className="bx bxs-bell text-xl"></i>
            <span className="num">23</span>
          </Link>
          <button className="profile border-2 border-gray-800 p-2 rounded-full"></button>
        </nav>
        <div className="user__modal transition-transform duration-300 ease-in-out">
        </div>
        {children}
      </section>
    </Fragment> */
}

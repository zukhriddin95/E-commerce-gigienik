"use client";

import { Fragment, useEffect, useState } from "react";
import CustomImage from "@/components/image";
import request from "@/server";
import ProductType from "@/types/product";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { toast } from "react-toastify";
import Pagination from "@/components/pagination";
import { LIMIT } from "@/constants";
import Searching from "@/components/Searching";
import Loading from "@/app/(public)/loading";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import CategoryType from "@/types/category";
import { CateType } from "../categories/page";

interface prodType {
  target: {
    id: string;
    value: string;
  };
}

const ProductsPage = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [category, setCategory] = useState<CategoryType[]>([]);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const currency = total / +LIMIT;
  const [isOpen, setIsOpen] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  const [selected, setSelected] = useState("");
  const [photo, setPhoto] = useState(null);
  const [values, setValues] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    quantity: "",
    category: "",
  });

  const handeChange = (e: CateType) => {
    if (e.target) {
      // e.target.id ni olish
      const { id, value } = e.target;
      setValues({ ...values, [id]: value });
    }
  };

  const handleCategoryChange = (selectedCategory: string) => {
    setValues({ ...values, category: selectedCategory });
  };

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    setLoadingImg(true);
    true;
    try {
      const form = new FormData();
      // form.append("file", e.target.files[0]);
      if (e.target.files) {
        form.append("file", e.target.files[0]);
      }
      const { data } = await request.post("upload", form);
      setPhoto(data);
      console.log(photo);
    } finally {
      setLoadingImg(false);
    }
  }

  async function getcategory() {
    setLoading(true);
    try {
      const { data } = await request.get(`category`);
      setCategory(data);
    } catch (er: any) {
      toast.error(er.message);
    } finally {
      setLoading(false);
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setSelected("");
    setIsOpen(true);
    setValues({
      title: "",
      price: "",
      description: "",
      image: "",
      quantity: "",
      category: "",
    });
  }

  useEffect(() => {
    getProducts();
    getcategory();
  }, [page]);

  async function getProducts() {
    setLoading(true);
    try {
      const {
        data: { total, products },
      } = await request.get("product", {
        params: {
          page: page,
          limit: LIMIT,
        },
      });
      setProducts(products);
      setTotal(total);
    } catch (err: any) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handeSubmit(e: React.FormEvent) {
    e.preventDefault();
    const user = { ...values, image: photo };
    try {
      if (selected === "") {
        await request.post(`product`, user);
      } else {
        await request.put(`product/${selected}`, user);
      }
      getProducts();
      closeModal();
    } catch (err: any) {
      toast.error(err);
    }
  }

  const handleDelete = async (id: string) => {
    setLoading(true);
    const confirmed: boolean = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmed) {
      try {
        await request.delete(`product/${id}`);
        getProducts();
        toast.success("Delete product successfully");
      } catch (err: any) {
        toast.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = async (id: string) => {
    setSelected(id);
    setIsOpen(true);
    try {
      const { data } = await request.get(`product/${id}`);
      setValues({
        ...values,
        title: data.title,
        description: data.description,
        category: data.category,
        price: data.price,
        quantity: data.quantity,
      });
    } catch (err: any) {
      toast.error(err);
    }
  };

  return (
    <Fragment>
      <section className="w-full h-screen overflow-scroll py-6 ">
        <h1 className="text-[25px] font-semibold px-6 pb-5">All product: ({total})</h1>
        <div className="flex  flex-col gap-6 md:flex-row md:justify-between px-6 mb-6">
          <Searching setProducts={setProducts} setLoading={setLoading} />

          <button
            onClick={openModal}
            className="bg-blue-500 w-[60px] text-white text-[20px] px-4 py-2 rounded-[25px]"
          >
            <MdOutlineAddShoppingCart className="text-[25px]" />
          </button>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="grid pl-6 pr-6 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-[20px]">
            {products.map((product) => (
              <div
                key={product._id}
                className="border w-full h-96 flex flex-col p-6 rounded-lg group relative  transition-transform ease-out duration-200 border-blue-500 "
              >
                <Link
                  href={`/product/${product?._id}`}
                  className="relative max-h-72 flex-1 border-b "
                >
                  <CustomImage product={product} fill />
                </Link>
                <h3 className="tracking-widest mt-5 text-indigo-500 text-xs font-medium title-font">
                  {product?.title}
                </h3>
                <div className="font-semibold flex items-center justify-between mt-4 mb-1">
                  <p>
                    {product?.price.toLocaleString("uz-UZ", {
                      style: "currency",
                      currency: "UZS",
                    })}
                  </p>
                </div>

                <div className="font-semibold flex items-center justify-between mt-4 mb-1">
                  <p className="w-44 truncate">{product?.description}</p>
                  <p>{product?.quantity} dona</p>
                </div>

                <div className="mt-[5px] flex items-center justify-between gap-6">
                  <button
                    onClick={() => handleEdit(product._id)}
                    className="bg-blue-500 text-white text-[20px] px-4 py-2 rounded-[25px]"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white text-[20px] px-4 py-2 rounded-[25px]"
                  >
                    <RiDeleteBin5Line />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="px-6">
          <Pagination setPage={setPage} page={page} currency={currency} />
        </div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            {loadingImg ? (
              <Loading />
            ) : (
              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        category
                      </Dialog.Title>
                      <div className="mt-2">
                        <form
                          onSubmit={handeSubmit}
                          className="flex flex-col gap-8 mt-6"
                          // onSubmit={handeSubmit}
                        >
                          <input
                            className="w-full border-b px-3 py-1 outline-none "
                            id="title"
                            value={values.title}
                            onChange={(e) => handeChange(e)}
                            type="text"
                            placeholder="title"
                          />
                          <input
                            className="w-full border-b px-3 py-1 outline-none "
                            id="price"
                            value={values.price}
                            onChange={(e) => handeChange(e)}
                            type="number"
                            placeholder="price"
                          />
                          <input
                            className="w-full border-b px-3 py-1 outline-none "
                            id="description"
                            value={values.description}
                            onChange={(e) => handeChange(e)}
                            type="text"
                            placeholder="description"
                          />
                          <input
                            className="w-full border-b px-3 py-1 outline-none "
                            id="quantity"
                            value={values.quantity}
                            onChange={(e) => handeChange(e)}
                            type="number"
                            placeholder="quantity"
                          />
                          <Listbox
                            value={values.category}
                            onChange={(selectedCategory) =>
                              handleCategoryChange(selectedCategory)
                            }
                          >
                            <div className="relative mt-1">
                              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <span className="block truncate">
                                  select a category
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                  <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                </span>
                              </Listbox.Button>
                              <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                  {category.map((el, i) => (
                                    <Listbox.Option
                                      key={i}
                                      className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                          active
                                            ? "bg-amber-100 text-amber-900"
                                            : "text-gray-900"
                                        }`
                                      }
                                      value={el}
                                    >
                                      {({ values }: any) => (
                                        <>
                                          <span
                                            className={`block truncate ${
                                              values
                                                ? "font-medium"
                                                : "font-normal"
                                            }`}
                                          >
                                            {el.name}
                                          </span>
                                          {values ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                              <CheckIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                              />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </Listbox>

                          <input
                            className="w-full border-b px-3 py-1 outline-none "
                            id="image"
                            type="file"
                            onChange={(e) => uploadImage(e)}
                          />

                          {/* selected  */}

                          <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={closeModal}
                          >
                            {selected ? "Save category" : "Add Category"}
                          </button>
                        </form>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            )}
          </Dialog>
        </Transition>
      </section>
    </Fragment>
  );
};

export default ProductsPage;

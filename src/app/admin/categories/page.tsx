"use client";

import React, { Fragment, useState, useEffect } from "react";
import request from "@/server";
import CategoryType from "@/types/category";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import Image from "next/image";
import Loading from "@/app/(public)/loading";
import { Dialog, Transition } from "@headlessui/react";

export interface CateType {
  target: {
    id: string;
    value: string;
  };
}

const CategoryPage = () => {
  const [category, setCategory] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);
  const [Imgloading, setImgLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [selected, setSelected] = useState("");
  const [values, setValues] = useState({
    name: "",
    image: "",
  });

  const handeChange = (e: CateType) => {
    const { id, value } = e.target;
    setValues({ ...values, [id]: value });
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setSelected("");
    setIsOpen(true);
    setValues({ name: "", image: "" });
  }

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

  useEffect(() => {
    getcategory();
  }, []);

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

  async function handeSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const user = { ...values, image: photo };
    try {
      if (selected == "") {
        await request.post(`category`, user);
        
      } else {
        await request.put(`category/${selected}`, user);
      }
      getcategory();
      closeModal();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await request.delete(`category/${id}`);
      toast.success("Delete category successfully");
      getcategory();
    } catch (er: any) {
      toast.error(er.message);
    }
  };

  const handleEdit = async (id: string) => {
    setSelected(id);
    setIsOpen(true);
    try {
      const { data } = await request.get(`category/${id}`);
      setValues({ ...values, name: data.name });
    } catch (err: any) {
      toast.error(err);
    }
  };

  return (
    <Fragment>
      <section className="w-full h-screen overflow-scroll">
        <div className=" p-6 mb-[50px] flex flex-col gap-6">
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-semibold text-[25px]">
              Category: ({category.length})
            </h1>
            <button
              onClick={openModal}
              className="bg-blue-500 text-white text-[20px] px-4 py-2 rounded-[25px]"
            >
              <MdOutlineAddShoppingCart className="text-[25px]" />
            </button>
          </div>

          {/* table  */}
          <div className=" border-b-2  flex items-center justify-between bg-white p-4 rounded shadow-md">
            <div className="flex items-center space-x-4">
              <span className="font-semibold">name</span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="font-semibold">image</span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="font-semibold">Data</span>
            </div>

            <div className="flex space-x-2">actions</div>
          </div>

          {loading ? (
            <Loading />
          ) : (
            category.map((el) => (
              <div
                key={el._id}
                className="flex items-center justify-between  bg-white p-4 rounded shadow-md"
              >
                <div className="flex items-center space-x-4">
                  <span className="font-semibold">{el.name}</span>
                </div>

                <div className="w-12 h-12 overflow-hidden bg-gray-300 rounded-full">
                  <Image
                    src={el?.image?.url}
                    alt={el?.name}
                    height={50}
                    width={50}
                    className={`object-contain duration-700 ease-in-out group-hover:opacity-75 ${
                      Imgloading
                        ? "scale-110 blur-2xl grayscale"
                        : "scale-100 blur-0 grayscale-0"
                    }}`}
                    onLoadingComplete={() => setImgLoading(false)}
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <span className="font-semibold">
                    {el.createdAt.split("T")[0]}
                  </span>
                </div>

                <div className="flex space-x-2 ">
                  <button
                    onClick={() => handleEdit(el._id)}
                    className="bg-blue-500 text-white text-[20px] px-4 py-2 rounded-[25px]"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(el._id)}
                    className="bg-red-500 text-white text-[20px] px-4 py-2 rounded-[25px]"
                  >
                    <RiDeleteBin5Line />
                  </button>
                </div>
              </div>
            ))
          )}

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
                            className="flex flex-col gap-8 mt-6"
                            onSubmit={handeSubmit}
                          >
                            <input
                              className="w-full border-b px-3 py-1 outline-none "
                              id="name"
                              value={values.name}
                              onChange={(e) => handeChange(e)}
                              type="text"
                              placeholder="Name"
                            />
                            <input
                              className="w-full border-b px-3 py-1 outline-none "
                              id="image"
                              type="file"
                              onChange={(e) => uploadImage(e)}
                            />
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
        </div>
      </section>
    </Fragment>
  );
};

export default CategoryPage;

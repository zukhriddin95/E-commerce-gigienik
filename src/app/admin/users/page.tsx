"use client";

import { Fragment, useEffect, useState } from "react";
import UsersType from "@/types/UserType";
import { toast } from "react-toastify";
import request from "@/server";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Dialog, Transition } from "@headlessui/react";
import Loading from "@/app/(public)/loading";
import { LIMIT } from "@/constants";
import Pagination from "@/components/pagination";
import { CateType } from "../categories/page";
import LoadingPage from "@/components/LoadingPage";
import SearchingUsers from "@/components/Searchusers";

const UsersPage = () => {
  const [users, setUsers] = useState<UsersType[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const currency = total / +LIMIT;
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    password: "",
  });

  const handeChange = (e: CateType) => {
    if (e.target) {
      // e.target.id ni olish
      const { id, value } = e.target;
      setValues({ ...values, [id]: value });
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setSelected("");
    setIsOpen(true);
    setValues({
      firstName: "",
      lastName: "",
      username: "",
      phoneNumber: "",
      password: "",
    });
  }

  useEffect(() => {
    getUsers();
  }, [page]);

  async function getUsers() {
    setLoading(true);
    try {
      const {
        data: { total, users },
      } = await request.get("user", {
        params: {
          page: page,
          limit: LIMIT,
        },
      });
      setUsers(users);
      setTotal(total);
    } catch (err: any) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (selected === "") {
        await request.post(`user`, values);
      } else {
        await request.put(`user/${selected}`, values);
      }
      getUsers();
      closeModal();
      toast.success("successfully");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    const confirmed: boolean = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      try {
        await request.delete(`user/${id}`);
        getUsers();
        toast.success("Delete users successfully");
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
      const { data } = await request.get(`user/${id}`);
      setValues({
        ...values,
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        phoneNumber: data.phoneNumber,
        password: data.password,
      });
    } catch (err: any) {
      toast.error(err);
    }
  };

  return (
    <Fragment>
      <div className=" mx-auto overflow-scroll p-4 ">
        <h1 className="text-2xl font-semibold mb-4">Users ({total})</h1>
        <div className="flex  flex-col gap-6 md:flex-row md:justify-between px-6 mb-6">
          <SearchingUsers setUsers={setUsers} setLoading={setLoading} />
          <button
            onClick={openModal}
            className="bg-blue-500 w-[60px] text-white text-[20px] px-4 py-2 rounded-[25px]"
          >
            <MdOutlineAddShoppingCart className="text-[25px]" />
          </button>
        </div>
        {loading ? (
          <LoadingPage />
        ) : (
          <table className=" min-w-full pr-6 divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  N#
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  firstName
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  lastName
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  phoneNumber
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users?.map((user, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.firstName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.phoneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-5">
                    <button
                      onClick={() => handleEdit(user._id)}
                      className="bg-blue-500 text-white text-[20px] px-4 py-2 rounded-[25px]"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white text-[20px] px-4 py-2 rounded-[25px]"
                    >
                      <RiDeleteBin5Line />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                      >
                        <input
                          className="w-full border-b px-3 py-1 outline-none "
                          id="firstName"
                          value={values.firstName}
                          onChange={(e) => handeChange(e)}
                          type="text"
                          placeholder="firstName"
                        />
                        <input
                          className="w-full border-b px-3 py-1 outline-none "
                          id="lastName"
                          value={values.lastName}
                          onChange={(e) => handeChange(e)}
                          type="text"
                          placeholder="lastName"
                        />
                        <input
                          className="w-full border-b px-3 py-1 outline-none "
                          id="username"
                          value={values.username}
                          onChange={(e) => handeChange(e)}
                          type="text"
                          placeholder="username"
                        />
                        <input
                          className="w-full border-b px-3 py-1 outline-none "
                          id="phoneNumber"
                          value={values.phoneNumber}
                          onChange={(e) => handeChange(e)}
                          type="text"
                          placeholder="phoneNumber"
                        />
                       { !selected && <input
                          className="w-full border-b px-3 py-1 outline-none "
                          id="password"
                          value={values.password}
                          onChange={(e) => handeChange(e)}
                          type="password"
                          placeholder="password"
                        />}

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
          </Dialog>
        </Transition>
      </div>
    </Fragment>
  );
};

export default UsersPage;

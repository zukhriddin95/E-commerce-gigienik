"use client";
import request from "@/server";
import UsersType from "@/types/UserType";
import React, { Dispatch, SetStateAction, useEffect } from "react";

interface SearchingProps {
  setUsers: Dispatch<SetStateAction<UsersType[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
import { useState } from "react";

const SearchingUsers: React.FC<SearchingProps> = ({ setUsers, setLoading }) => {
  const [query, setQuery] = useState("");

  const handeSearch = async () => {
    setLoading(true);
    try {
      const {
        data: { users },
      } = await request.get(`user?search=${query}`);
      setUsers(users);
    } catch (err) {
      console.log("error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[450px] md:w-[450px] flex items-center">
      <input
        className="border rounded w-full pl-4 pr-4 pt-2 pb-2 outline-none"
        type="text"
        placeholder="search . . . "
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={() => handeSearch()}
        className="pr-6 pl-6 pt-2 pb-2 border hover:bg-blue-600 hover:text-white duration-300 rounded"
      >
        Search
      </button>
    </div>
  );
};

export default SearchingUsers;

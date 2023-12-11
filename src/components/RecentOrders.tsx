import React, { Fragment } from "react";
import { FaShoppingBag } from "react-icons/fa";

const RecentOrders = () => {
  const data = [
    {
      id: 1,
      name: {
        first: "John",
        last: "Smith",
      },
      total: 2795.95,
      status: "On Hold",
      method: "PayPal",
      date: "15 Minutes ago",
    },
    {
      id: 2,
      name: {
        first: "Chris",
        last: "Adams",
      },
      total: 1195.95,
      status: "Processing",
      method: "PayPal",
      date: "23 Minutes ago",
    },
    {
      id: 3,
      name: {
        first: "Sarah",
        last: "Smith",
      },
      total: 495.85,
      status: "Completed",
      method: "Visa",
      date: "1 Hour ago",
    },
    {
      id: 4,
      name: {
        first: "Joseph",
        last: "Choo",
      },
      total: 150.45,
      status: "Processing",
      method: "MasterCard",
      date: "1 Hour ago",
    },
    {
      id: 5,
      name: {
        first: "Steve",
        last: "Harding",
      },
      total: 175.25,
      status: "On Hold",
      method: "PayPal",
      date: "2 Hour ago",
    },
    {
      id: 6,
      name: {
        first: "Laura",
        last: "Croft",
      },
      total: 1295.75,
      status: "Completed",
      method: "Check",
      date: "3 Hour ago",
    },
    {
      id: 7,
      name: {
        first: "Michael",
        last: "Jones",
      },
      total: 89.95,
      status: "Completed",
      method: "MasterCard",
      date: "3 Hour ago",
    },
    {
      id: 8,
      name: {
        first: "James",
        last: "Bond",
      },
      total: 689.45,
      status: "Completed",
      method: "Visa",
      date: "7 Hour ago",
    },
    {
      id: 9,
      name: {
        first: "Haley",
        last: "Whiting",
      },
      total: 14.99,
      status: "Completed",
      method: "PayPal",
      date: "1 Day ago",
    },
    {
      id: 10,
      name: {
        first: "Tim",
        last: "Thomas",
      },
      total: 218.99,
      status: "Completed",
      method: "MasterCard",
      date: "1 Day ago",
    },
  ];

  return (
    <Fragment>
      <div className="w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll">
        <h1>Recent Orders</h1>
        <ul>
          {data.map((el) => (
            <li
              key={el.id}
              className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer"
            >
              <div className="bg-purple-100 rounded-lg p-3">
                <FaShoppingBag />
              </div>
              <div className="p-4">
                <p className="text-grat-800 font-bold">
                  {el.total.toLocaleString("uz-UZ", {
                    style: "currency",
                    currency: "UZS",
                  })}
                </p>
                <p className="text-gray-400 text-sm">{el.name.first}</p>
              </div>
              <p className="lg:flex md:hidden absolute right-6 text-sm">{el.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default RecentOrders;

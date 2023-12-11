"use client";

import request from "@/server";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export interface PaymentType {
  status: string;
  _id: string;
  userId: string;
  cart: [
    {
      _id: string;
      product: string;
      quantity: number;
    },
    {
      _id: string;
      product: string;
      quantity: number;
    }
  ];
  comment: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Payments = () => {
  const [paymentsList, setPaymentsList] = useState<PaymentType[]>([]);

  useEffect(() => {
    getPayments();
  }, []);

  async function getPayments() {
    try {
     const { data } = await request.get("payment");
     setPaymentsList(data)
    }catch (err: any) {
      toast.error(err.message)
    }

  }

  return (
    <section>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Payments Page</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-50">ID</th>
                <th className="py-2 px-4 bg-gray-50">User ID</th>
                <th className="py-2 px-4 bg-gray-50">Products</th>
                <th className="py-2 px-4 bg-gray-50">Comment</th>
                <th className="py-2 px-4 bg-gray-50">Created At</th>
                {/* Boshqa ustunlar... */}
              </tr>
            </thead>
            <tbody>
              {paymentsList.map((payment) => (
                <tr key={payment._id}>
                  <td className="py-2 px-4">{payment._id}</td>
                  <td className="py-2 px-4">{payment.userId}</td>
                  <td className="py-2 px-4">
                    <ul>
                      {payment.cart.map((item) => (
                        <li key={item._id}>
                          Product ID: {item.product}, Quantity: {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-2 px-4">{payment.comment}</td>
                  <td className="py-2 px-4">{payment.createdAt}</td>
                  {/* Boshqa ma'lumotlar... */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Payments;

"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";
import ProductType from "@/types/product";
import request from "@/server";
import CustomImage from "@/components/image";
import { CART } from "@/constants";

const ProductId = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProductType>();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const { data } = await request.get(`product/${id}`);
      setProduct(data);
      setLoading(false);
    }
    getData();
  }, [id]);

  const handleClick = () => {
    const products: ProductType[] =
      JSON.parse(localStorage.getItem(CART) as string) || [];
    const isExestProducts = products.find((el) => el._id === product?._id);
    if (isExestProducts) {
      const updatedData = products.map((el) => {
        if (el._id === product?._id) {
          return {
            ...el,
            soni: el.soni + 1,
          };
        }

        return el;
      });
      localStorage.setItem(CART, JSON.stringify(updatedData));
    } else {
      const data = [...products, { ...product, soni: 1 }];
      localStorage.setItem(CART, JSON.stringify(data));
    }
    toast(" ✅ Product Added to Your Bag!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
        router.back();
      }}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex  min-h-full items-center justify-center p-4">
          <Dialog.Panel className={"mx-auto max-w-3xl rounded bg-white p-10"}>
            {loading ? (
              <div className="h-8 w-8 rounded-full border-2 border-dotted border-blue-600 animate-spin"></div>
            ) : (
              <div className="flex items-center  gap-x-8 h-96">
                {product?.image.url && (
                  <div className="relative w-72 h-full hidden md:inline">
                    <CustomImage product={product} fill />
                  </div>
                )}
                <div className="flex-1 gap-8 flex flex-col">
                  <div className="flex-1">
                    <h4 className="font-semibold">{product?.title}</h4>
                    <p className="font-medium text-sm">
                      {product?.price.toLocaleString("uz-UZ", {
                        style: "currency",
                        currency: "UZS",
                      })}
                    </p>

                    <p className="line-clamp-5 text-sm">
                      {product?.description}
                    </p>
                  </div>
                  <div className="space-y-3 text-sm">
                    <button
                      onClick={handleClick}
                      className="button w-full bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black"
                    >
                      Add to bag
                    </button>
                    <button
                      onClick={() => window.location.reload()}
                      className="button w-full bg-transparent border-blue-600 hover:bg-blue-600 hover:text-white hover:border-transparent"
                    >
                      View full details
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductId;

import { Fragment } from "react";
import CustomImage from "@/components/image";
import request from "@/server";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

const ProductDetailsPage = async ({ params: { id } }: Props) => {
  try {
    const {data} = await request.get(`/product/${id}`);
    const product = data;

    return (
      <Fragment>
        {" "}
        <div className="max-w-5xl mx-auto border-b flex flex-col md:flex-row items-center gap-12 px-4 mt-[110px] pb-10">
          <CustomImage product={product} />

          <div className="divide-2">
            <div className="space-y-8 pb-8">
              <h1 className="text-2xl md:text-4xl font-bold">
                {product.title}
              </h1>
              <h2 className="text-gray-500 font-bold text-xl md:text-3xl">
                {product.price.toLocaleString("uz-UZ", {
                  style: "currency",
                  currency: "UZS",
                })}
              </h2>
            </div>

            <div>
              <p className="text-xs md:text-sm">{product.description}</p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  } catch (error) {
    notFound();
  }
};

export default ProductDetailsPage;

"use client";
import { useState, useEffect } from "react";
import { FreeMode, Autoplay } from "swiper/modules";
import { BsArchive } from "react-icons/bs";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductType from "@/types/product";
import { toast } from "react-toastify";
import request from "@/server";
import ProductLoading from "./loading";
import ProductCard from "./productCard";

const LatestProducts = () => {
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLatestProduct();
  }, []);

  async function getLatestProduct() {
    try {
      setLoading(true);
      const { data } = await request.get("last-products");
      setProducts(data);
    } catch (error) {
      toast.error("error: " + error);
    } finally {
      setLoading(false);
    }
  }


  return (
    <section className="p-6 ">
      <div className="flex items-center  justify-center gap-6 mb-6 ">
        <BsArchive className="text-[40px] rounded text-white bg-blue-500" />
        <h1 className="text-[40px] font-mono font-semibold">
          Popular Products
        </h1>
      </div>
      {loading ? (
        <Swiper
          loop
          modules={[FreeMode, Autoplay]}
          height={350}
          spaceBetween={30}
          slidesPerView={3.5}
          freeMode={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            350: {
              width: 450,
              slidesPerView: 1,
            },
            450: {
              width: 576,
              slidesPerView: 1.5,
            },
            576: {
              width: 950,
              slidesPerView: 2.5,
            },
            950: {
              width: 1280,
              slidesPerView: 3,
            },
            1280: {
              width: 1340,
              slidesPerView: 3.5,
            },
          }}
          className="mySwiper"
        >
          <SwiperSlide>
            <ProductLoading />
          </SwiperSlide>
          <SwiperSlide>
            <ProductLoading />
          </SwiperSlide>
          <SwiperSlide>
            <ProductLoading />
          </SwiperSlide>
          <SwiperSlide>
            <ProductLoading />
          </SwiperSlide>
          <SwiperSlide>
            <ProductLoading />
          </SwiperSlide>
          <SwiperSlide>
            <ProductLoading />
          </SwiperSlide>
          <SwiperSlide>
            <ProductLoading />
          </SwiperSlide>
          <SwiperSlide>
            <ProductLoading />
          </SwiperSlide>
          <SwiperSlide>
            <ProductLoading />
          </SwiperSlide>
          <SwiperSlide>
            <ProductLoading />
          </SwiperSlide>
        </Swiper>
      ) : (
        <Swiper
          loop
          modules={[FreeMode, Autoplay]}
          height={350}
          spaceBetween={30}
          slidesPerView={3.5}
          freeMode={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            350: {
              width: 450,
              slidesPerView: 1.5,
            },
            450: {
              width: 576,
              slidesPerView: 2,
            },
            576: {
              width: 950,
              slidesPerView: 2.5,
            },
            950: {
              width: 1280,
              slidesPerView: 3,
            },
            1280: {
              width: 1340,
              slidesPerView: 3.5,
            },
          }}
          className="mySwiper"
        >
          {products?.map((product) => (
            <SwiperSlide  key={product?._id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default LatestProducts;

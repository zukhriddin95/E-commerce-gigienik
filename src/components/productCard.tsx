import Link from "next/link";
import CustomImage from "./image";
import ProductType from "@/types/product";
import { toast } from "react-toastify";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { CART } from "@/constants";

const ProductCard: React.FC<{ product: ProductType }> = ({ product }) => {
  // const [isClick, setClick] = useState(false);
  // const [productId, setProductId] = useState<ProductType[]>([]);
  // const [loading, setLoading] = useState(false);

  //   useEffect(() => {}, []);

  //  async function getLike(id: string) {
  //    setClick(!isClick);

  //     const products: ProductType[] =
  //       JSON.parse(localStorage.getItem("like") as string) || [];
  //       console.log([products]);
  //     const isExestProducts = products.find((el) => el._id === product?._id);

  //     if (isExestProducts && isClick) {
  //       const updatedData = products.map((el) => {
  //         if (el._id === product?._id) {
  //           return {
  //             ...el,
  //             like: +1
  //           };
  //         }

  //         return el;
  //       });
  //       localStorage.setItem("like", JSON.stringify(updatedData));
  //     } else {
  //       const data = [...products, { ...product, like: 1 }];
  //       localStorage.setItem("like", JSON.stringify(data));
  //     }
  //     toast("❤️", {
  //       position: "top-center",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });

  //  }
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
    <div className="border w-full h-96 flex flex-col p-6 rounded-lg group relative  transition-transform ease-out duration-200 border-blue-500 ">
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
      {/* <div className="App  translate-x-[20px] translate-y-[-20px]  absolute top-0 right-0">
        <Heart isClick={isClick} onClick={() => getLike(product?._id)} />
      </div> */}
      <div className="mt-[5px] flex items-center justify-between gap-6">
        <button
          onClick={handleClick}
          className="border pr-2 pl-2 pt-2 pb-2 text-center rounded font-semibold transition duration-200 ease-out   hover:bg-blue-600 hover:text-white text-[12px] border-blue-600 bg-transparent text-black"
        >
          <MdOutlineShoppingCartCheckout className='text-[26px] text-center' />
        </button>
        <Link
          href={`product/${product?._id}`}
          // onClick={() => }
          className="border pt-2 pb-2 rounded font-semibold text-[17px] text-center transition duration-200 ease-out w-full bg-transparent border-blue-600 hover:bg-blue-600 hover:text-white hover:border-transparent"
        >
          View full details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

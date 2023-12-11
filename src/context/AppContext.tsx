// "use client";
// export interface ProductContextState {
//   cart: ProductType[];
//   setCart: (cart: ProductType[]) => void;
//   // totalPriceOfCart: number;
//   // addToCart: (id: string) => void;
//   // increaseQuantity: (id: string) => void;
//   // decreaseQuantity: (id: string) => void;
// }

// import { createContext, ReactNode, useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import { CART } from "@/constants";
// import ProductType from "@/types/product";

// export const ProductContext = createContext<ProductContextState | undefined>(
//   undefined
// );

// interface ProductContextProviderProps {
//   children: ReactNode;
// }

// const ProductContextProvider: React.FC<ProductContextProviderProps> = ({
//   children,
// }) => {
//   const [cart, setCart] = useState<ProductType[]>(JSON.parse(localStorage.getItem(CART) || "[]"));

//   // const [products, setProduct] = useState<ProductType[]>([]);

//   // async function getProducts() {
//   //   try {
//   //     const {
//   //       data: { products },
//   //     } = await request.get("product");
//   //     setProduct(products);
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // }
//   // useEffect(() => {
//   //   getProducts();
//   // }, []);

//   // const controlQuantity = (id: string, sign: "+" | "-"): ProductType[] => {
//   //   let res = cart.map((pr) => {
//   //     if (pr._id === id) {
//   //       sign === "+" ? pr.count++ : pr.count--;
//   //     }
//   //     return pr;
//   //   });
//   //   return res;
//   // };

//   // const addToCart = (id: string): void => {
//   //   let product = products.find((product) => product._id === id);
//   //   let productInCart = cart.find((product) => product._id === id);

//   //   let newCart;

//   //   if (productInCart) {
//   //     newCart = controlQuantity(id, "+");
//   //   } else {
//   //     product!.quantity = 1;
//   //     newCart = [...cart, product!];
//   //   }
//   //   setCart(newCart);
//   //   localStorage.setItem(CART, JSON.stringify(newCart));
//   // };

//   // const increaseQuantity = (id: string): void => {
//   //   const newCart = controlQuantity(id, "+");
//   //   setCart(newCart);
//   //   localStorage.setItem(CART, JSON.stringify(newCart));
//   // };

//   // const decreaseQuantity = (id: string): void => {
//   //   let newCart;
//   //   let productInCart = cart.find((pr) => pr._id === id);
//   //   if (productInCart!.quantity > 1) {
//   //     newCart = controlQuantity(id, "-");
//   //   } else {
//   //     newCart = cart.filter((pr) => pr._id !== id);
//   //   }
//   //   setCart(newCart);
//   //   localStorage.setItem(CART, JSON.stringify(newCart));
//   // };

//   // let totalPriceOfCart = cart.reduce(
//   //   (acc, pr) => acc + pr.price * pr.quantity,
//   //   0
//   // );

//   const state: ProductContextState = {
//     cart,
//     setCart,
//   };

//   console.log(cart);

//   return (
//     <ProductContext.Provider value={state}>{children}</ProductContext.Provider>
//   );
// };

// ProductContextProvider.propTypes = {
//   children: PropTypes.node,
// };

// export default ProductContextProvider;

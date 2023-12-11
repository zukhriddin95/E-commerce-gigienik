import ProductType from "./product";

export type ItemKey = "cart" | "wishlist" | "checkout";

// export interface Istate {
//   cart: Item[];
//   products: ProductType[];
//   wishlist: Item[];
//   checkout: Item[];
// }
export interface Istate {
  products: ProductType[];
}

export interface Item extends ProductType {
  count: number;
}

// export interface Icontext {
//   state: Istate;
//   addItem: (key: ItemKey, product: ProductType, count?: number) => void;
//   removeItem: (key: ItemKey, productId: string) => void;
//   increaseCount: (key: ItemKey, productId: string) => void;
//   decreaseCount: (key: ItemKey, productId: string) => void;
//   resetItem: (key: ItemKey) => void;
// }
export interface Icontext {
  state: Istate;
  setProducts: () => void;
  
}

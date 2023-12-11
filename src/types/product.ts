

interface ProductType {
  checked: boolean;
  sold: number;
  _id: string;
  title: string;
  price: number;
  description: string;
  image: { url: string; public_id: string };
  quantity: number;
  category: string;
  createdAt: string;
  updatedAt: string;
  soni: number;
}

export default ProductType;

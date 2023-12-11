import ImageType from "./image";

interface CategoryType {
  _id: string;
  name: string;
  image: { url: string; public_id: string };
  createdAt: string;
  updatedAt: string;
}

export default CategoryType;

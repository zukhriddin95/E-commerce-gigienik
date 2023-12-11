import LatestProducts from "@/components/LatestProduct";
import CategoryPage from "@/components/category";
import HomeSection from "@/components/hero";

export default function Home() {
  return (
    <main>
      <div className="container mx-auto mt-6">
        <HomeSection />
        <LatestProducts />
        <CategoryPage />
      </div>
    </main>
  )
}

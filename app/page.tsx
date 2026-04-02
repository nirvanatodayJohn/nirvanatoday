import ShopByCategory from "@/components/custom/ShopByCategory";
import ProductListSection from "@/components/custom/ProductListSection";
import WhyChooseUs from "@/components/custom/WhyChooseUs";
import Assurance from "@/components/custom/Assurance";
import Testimonials from "@/components/custom/Testimonials";
import FAQ from "@/components/custom/FAQ";

export default function Home() {
  return (
    <main className="flex-1 bg-background">
      <ShopByCategory />
      <ProductListSection />
      <WhyChooseUs />
      <Assurance />
      <Testimonials />
      <FAQ />
    </main>
  );
}

import ShopByCategory from "@/components/custom/ShopByCategory";
import ProductListSection from "@/components/custom/ProductListSection";
import WhyChooseUs from "@/components/custom/WhyChooseUs";
import Assurance from "@/components/custom/Assurance";
import Testimonials from "@/components/custom/Testimonials";
import FAQ from "@/components/custom/FAQ";
import BlogSection from "@/components/custom/BlogSection";
import Hero from "@/components/custom/Hero";

export default function Home() {
  return (
    <main className="bg-background">
      <Hero />
      <ShopByCategory />
      <ProductListSection />
      <WhyChooseUs />
      <Assurance />
      <Testimonials />
      <BlogSection />
      <FAQ />
    </main>
  );
}

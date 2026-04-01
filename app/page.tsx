import ProductListSection from "@/components/custom/ProductListSection";
import Testimonials from "@/components/custom/Testimonials";

export default function Home() {
  return (
    <main className="flex-1 bg-background">
      <ProductListSection />
      <Testimonials />
    </main>
  );
}

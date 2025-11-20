import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/home/HeroBanner";
import CategoriesHighlight from "@/components/home/CategoriesHighlight";
import BenefitsBlock from "@/components/home/BenefitsBlock";
import QuickQuoteCTA from "@/components/products/QuickQuoteCTA";
import ProductCard from "@/components/products/ProductCard";
import { useGetAllProducts } from "@/api/products/useGetAllProducts";
import { useEffect } from "react";

const Index = () => {
  const handleQuoteRequest = (productId: string) => {
    console.log("Quote requested for product:", productId);
    // Here you would typically navigate to contact form or open a modal
    window.location.href = "/contacto";
  };

  const { getAllProducts } = useGetAllProducts();

  useEffect(() => {
    getAllProducts.fetch();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroBanner
          backgroundImages={[
            "https://firstlogisticsllc.com/wp-content/uploads/2024/11/parts-aftermarket-hero.png",
            "https://shautoparts.com/wp-content/uploads/2024/09/history-capacity-hero-1920x1080-1.jpg",
            "https://previews.123rf.com/images/tonaorh/tonaorh2305/tonaorh230501907/205400505-spare-parts-and-tools-for-car-mechanic-on-dark-background-close-up.jpg",
            "https://article.images.consumerreports.org/image/upload/w_652%2Cf_auto%2Cq_auto%2Car_16%3A9%2Cc_lfill/v1724779978/prod/content/dam/CRO-Images-2024/Cars/CR-Cars-InlineHero-Get-Your-Car-Fixed-for-Almost-Free-0824",
          ]}
        />

        <CategoriesHighlight />

        <BenefitsBlock />

        {/* Featured Products Section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Productos Destacados
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Descubre nuestra selección de productos más populares
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getAllProducts.data.map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  onQuoteRequest={handleQuoteRequest}
                />
              ))}
            </div>
          </div>
        </section>

        <QuickQuoteCTA />
      </main>

      <Footer />
    </div>
  );
};

export default Index;

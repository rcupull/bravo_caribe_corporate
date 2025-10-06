import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/home/HeroBanner";
import CategoriesHighlight from "@/components/home/CategoriesHighlight";
import BenefitsBlock from "@/components/home/BenefitsBlock";
import QuickQuoteCTA from "@/components/products/QuickQuoteCTA";
import ProductCard from "@/components/products/ProductCard";

// Sample products for demonstration
const featuredProducts = [
  {
    id: "1",
    name: "Filtro de Aceite Premium",
    description: "Filtro de aceite de alta calidad compatible con múltiples modelos de vehículos",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop",
    price: 24.99,
    inStock: true,
    category: "Autos",
    brand: "OEM Premium",
  },
  {
    id: "2",
    name: "Pastillas de Freno Cerámicas",
    description: "Pastillas de freno de alto rendimiento con tecnología cerámica",
    image: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&h=600&fit=crop",
    price: 89.99,
    inStock: true,
    category: "Autos",
    brand: "BrakeTech",
  },
  {
    id: "3",
    name: "Kit de Cadena para Moto",
    description: "Kit completo de cadena y piñones para motocicletas deportivas",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&h=600&fit=crop",
    price: 156.00,
    inStock: false,
    category: "Motos",
    brand: "ChainPro",
  },
];

const Index = () => {
  const handleQuoteRequest = (productId: string) => {
    console.log("Quote requested for product:", productId);
    // Here you would typically navigate to contact form or open a modal
    window.location.href = "/contacto";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroBanner />
        
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
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
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

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";

interface HeroBannerProps {
  title?: string;
  subtitle?: string;
  primaryCTA?: {
    text: string;
    link: string;
  };
  secondaryCTA?: {
    text: string;
    link: string;
  };
  backgroundImage?: string;
  /** Nuevo: varias imágenes que rotan automáticamente */
  backgroundImages?: string[];
  /** Intervalo en milisegundos (por defecto 5000 = 5s) */
  rotationInterval?: number;
}

const HeroBanner = ({
  title = "Encuentra las Partes y Piezas que Necesitas",
  subtitle = "Amplio catálogo de repuestos originales y compatibles para autos, motos y vehículos pesados. Entrega rápida en toda Cuba.",
  primaryCTA = { text: "Ver Catálogo", link: "/productos" },
  secondaryCTA = { text: "Cotizar Ahora", link: "/contacto" },
  backgroundImage,
  backgroundImages,
  rotationInterval = 10000,
}: HeroBannerProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Cambiar imagen cada X segundos
  useEffect(() => {
    if (!backgroundImages || backgroundImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [backgroundImages, rotationInterval]);

  const currentBackground =
    backgroundImages && backgroundImages.length > 0
      ? backgroundImages[currentImageIndex]
      : backgroundImage;

  return (
    <section
      className="relative min-h-[600px] flex items-center justify-center overflow-hidden transition-all duration-1000 ease-in-out "
      style={{
        background: currentBackground
          ? `linear-gradient(rgba(31, 41, 55, 0.2), rgba(31, 41, 55, 0.85)), url(${currentBackground}) center/cover no-repeat`
          : "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(218 20% 25%) 100%)",
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 -left-20 w-80 h-80 bg-warning/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg"
            >
              <Link to={primaryCTA.link} className="flex items-center">
                <Search className="mr-2 h-5 w-5" />
                {primaryCTA.text}
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold px-8 py-6 text-lg"
            >
              <Link to={secondaryCTA.link} className="flex items-center">
                {secondaryCTA.text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { value: "1,000+", label: "Productos" },
              { value: "500+", label: "Clientes" },
              { value: "24/48h", label: "Entrega" },
              { value: "100%", label: "Garantía" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;

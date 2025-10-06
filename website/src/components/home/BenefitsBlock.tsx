import { Truck, Shield, Package, HeadphonesIcon, Clock, Award } from "lucide-react";

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface BenefitsBlockProps {
  benefits?: Benefit[];
}

const defaultBenefits: Benefit[] = [
  {
    icon: <Truck className="h-8 w-8" />,
    title: "Envío Rápido",
    description: "Entregas en 24-48 horas en la región",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Garantía de Calidad",
    description: "100% de garantía en todos nuestros productos",
  },
  {
    icon: <Package className="h-8 w-8" />,
    title: "Amplio Inventario",
    description: "Más de 10,000 productos disponibles",
  },
  {
    icon: <HeadphonesIcon className="h-8 w-8" />,
    title: "Soporte Experto",
    description: "Asesoría técnica personalizada",
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "Horario Extendido",
    description: "Atención de lunes a sábado",
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "Marcas Originales",
    description: "Repuestos originales y certificados",
  },
];

const BenefitsBlock = ({ benefits = defaultBenefits }: BenefitsBlockProps) => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ¿Por Qué Elegirnos?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nos comprometemos a ofrecer el mejor servicio y productos de calidad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-secondary transition-all duration-300 group"
            >
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsBlock;

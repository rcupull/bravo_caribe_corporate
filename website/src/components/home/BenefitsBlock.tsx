import { StyleProps } from "@/types/general";
import {
  Truck,
  Shield,
  Package,
  HeadphonesIcon,
  Clock,
  Award,
} from "lucide-react";
import { FunctionComponent } from "react";

interface Benefit {
  svg: FunctionComponent<StyleProps>;
  title: string;
  description: string;
}

const defaultBenefits: Benefit[] = [
  {
    svg: Truck,
    title: "Envío Rápido",
    description: "Entregas en 24-48 horas en la región",
  },
  {
    svg: Shield,
    title: "Garantía de Calidad",
    description: "100% de garantía en todos nuestros productos",
  },
  {
    svg: Package,
    title: "Amplio Inventario",
    description: "Más de 1,000 productos disponibles",
  },
  {
    svg: HeadphonesIcon,
    title: "Soporte Experto",
    description: "Asesoría técnica personalizada",
  },
  {
    svg: Clock,
    title: "Horario Extendido",
    description: "Atención de lunes a viernes",
  },
  {
    svg: Award,
    title: "Marcas Originales",
    description: "Repuestos originales y certificados",
  },
];

const BenefitsBlock = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nos comprometemos a ofrecer el mejor servicio y productos de calidad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {defaultBenefits.map(({ description, svg: Svg, title }, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-secondary transition-all duration-300 group"
              >
                <div className="mb-4 inline-flex items-center justify-center size-20 rounded-full bg-warning/10 text-warning group-hover:bg-warning group-hover:text-white transition-all duration-300">
                  <Svg className="size-10" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {title}
                </h3>
                <p className="text-md text-muted-foreground">{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsBlock;

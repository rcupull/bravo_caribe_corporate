import { Link } from "react-router-dom";
import { Car, Bike, Truck, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Category {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  image?: string;
}

interface CategoriesHighlightProps {
  categories?: Category[];
}

const defaultCategories: Category[] = [
  {
    title: "Autos",
    description: "Repuestos para vehículos ligeros, sedanes, SUVs y más",
    icon: <Car className="h-12 w-12" />,
    link: "/productos?category=autos",
  },
  {
    title: "Motos",
    description: "Partes y piezas para motocicletas de todas las marcas",
    icon: <Bike className="h-12 w-12" />,
    link: "/productos?category=motos",
  },
  {
    title: "Vehículos Pesados",
    description: "Componentes para camiones, buses y maquinaria pesada",
    icon: <Truck className="h-12 w-12" />,
    link: "/productos?category=pesados",
  },
  {
    title: "Accesorios",
    description: "Herramientas, aceites, lubricantes y más",
    icon: <Wrench className="h-12 w-12" />,
    link: "/productos?category=accesorios",
  },
];

const CategoriesHighlight = ({
  categories = defaultCategories,
}: CategoriesHighlightProps) => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nuestras Categorías
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encuentra exactamente lo que necesitas en nuestro amplio catálogo de
            productos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link key={index} to={category.link} className="group">
              <Card className="h-full border-2 hover:border-accent hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8 text-center">
                  <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesHighlight;

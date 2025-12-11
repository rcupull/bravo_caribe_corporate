import { Card, CardContent } from "@/components/ui/card";
import { categories } from "@/utils/category";
import { Link } from "../link";

const CategoriesHighlight = () => {
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
          {categories.map(({ svg: Svg, name, description, type }, index) => (
            <Link
              key={index}
              to={`/productos?category=${type}`}
              className="group"
            >
              <Card className="h-full border-2 hover:border-warning hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8 text-center">
                  <div className="my-6 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-warning/10 text-warning group-hover:bg-warning group-hover:text-accent-foreground transition-all duration-300">
                    <Svg className="h-12 w-12" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-warning transition-colors">
                    {name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{description}</p>
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

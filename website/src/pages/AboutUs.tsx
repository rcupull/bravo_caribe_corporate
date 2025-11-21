import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Target, Eye, Award, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AboutUs = () => {
  const values = [
    {
      icon: Award,
      title: "Calidad Garantizada",
      description:
        "Todas nuestras piezas cumplen con los más altos estándares de calidad y vienen con garantía.",
    },
    {
      icon: Users,
      title: "Atención Personalizada",
      description:
        "Nuestro equipo de expertos está siempre disponible para asesorarte en la elección correcta.",
    },
    {
      icon: Target,
      title: "Precios Competitivos",
      description:
        "Ofrecemos las mejores piezas del mercado a precios justos y accesibles.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-primary text-primary-foreground py-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Sobre Nosotros
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90">
                Más de 15 años siendo el socio confiable en repuestos
                automotrices para Cuba.
              </p>
            </div>
          </div>
        </section>

        {/* Historia */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
                Nuestra Historia
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                <strong className="text-foreground">Bravo Caribe</strong>
                nació en 2023 con una visión clara: proporcionar repuestos
                automotrices y servicios de calidad superior a precios
                accesibles, enfocados en la sostenibilidad y satisfacción del
                cliente. Lo que comenzó como una pequeña idea, se ha convertido
                en una de las distribuidoras más confiables de Cuba.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Durante este tiempo, hemos construido relaciones sólidas con
                proveedores y fabricantes de prestigio, líderes mundiales,
                permitiéndonos ofrecer un catálogo extenso que abarca desde
                piezas para vehículos específicos hasta componentes
                especializados para flotas comerciales y lubricantes de la más
                alta calidad.
              </p>
            </div>
          </div>
        </section>

        {/* Misión y Visión */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Misión */}
              <Card className="border-2 border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6 mx-auto">
                    <Target className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-4 text-foreground">
                    Nuestra Misión
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-center">
                    Proveer autopartes, lubricantes y herramientas de la más
                    alta calidad, con un servicio personalizado y eficiente,
                    garantizando la satisfacción de nuestros clientes y
                    contribuyendo a la seguridad y óptimo funcionamiento de sus
                    vehículos.
                  </p>
                </CardContent>
              </Card>

              {/* Visión */}
              <Card className="border-2 border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6 mx-auto">
                    <Eye className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-4 text-foreground">
                    Nuestra Visión
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-center">
                    Ser la empresa líder en distribución de autopartes en toda
                    Cuba, reconocida por nuestra excelencia en servicio, precios
                    competitivos, variedad de productos y compromiso con la
                    innovación tecnológica del sector. Donde la pasión por la
                    excelencia sea una constante en nuestro trabajo.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
                Nuestros Valores
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <Card
                      key={index}
                      className="text-center hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-warning/10 mb-4 mx-auto">
                          <Icon className="h-8 w-8 text-warning" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-foreground">
                          {value.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {value.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Nuestro Equipo y Almacén */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4 text-foreground">
                Nuestro Equipo y Almacén
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Contamos con un equipo profesional y modernas instalaciones para
                atenderte mejor
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    image:
                      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop",
                    title: "Almacén Central",
                    description: "Más de 5,000 m² de inventario organizado",
                  },
                  {
                    image:
                      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop",
                    title: "Equipo Especializado",
                    description:
                      "Profesionales con más de 10 años de experiencia",
                  },
                  {
                    image:
                      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
                    title: "Área de Atención",
                    description: "Servicio personalizado y asesoría técnica",
                  },
                ].map((item, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Certificaciones y Alianzas */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4 text-foreground">
                Certificaciones y Alianzas
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Trabajamos con las mejores marcas y contamos con certificaciones
                que avalan nuestra calidad
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  {
                    name: "Castrol",
                    description: "Distribuidor autorizado",
                  },
                  {
                    name: "FIXTEC Tools",
                    description: "Distribuidor autorizado",
                  },
                  {
                    name: "Lubricantes AD",
                    description: "Distribuidor autorizado",
                  },
                  {
                    name: "CENTARA",
                    description: "Distribuidor autorizado",
                  },
                ].map((cert, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-3">
                      <Award className="h-10 w-10 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-center mb-1 text-foreground">
                      {cert.name}
                    </h3>
                    <p className="text-xs text-muted-foreground text-center">
                      {cert.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                ¿Listo para Trabajar con Nosotros?
              </h2>
              <p className="text-lg mb-8 text-primary-foreground/90">
                Contáctanos hoy y descubre por qué somos la mejor opción en
                repuestos automotrices.
              </p>
              <a
                href="/contacto"
                className="inline-flex items-center justify-center px-8 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-md transition-colors"
              >
                Contáctanos Ahora
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;

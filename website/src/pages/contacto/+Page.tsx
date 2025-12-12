import { useGetOneProduct } from "@/api/products/useGetOneProduct";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink } from "@/utils/general";
import { MapOl } from "@/components/ui/map";
import { MapPin, Clock, Phone, Mail, Send, FileImage } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ImageComponent } from "@/components/image-component";
import { categories } from "@/utils/category";
import { useRouter } from "@/hooks/useRouter";

const defaultHours = [
  { days: "Lunes - Viernes", time: "8:00 AM - 6:00 PM" },
  { days: "Domingo y domingo", time: "Cerrado" },
];

const address = "Zanja esquina a Espada. Centro Habana, Cuba";
const phone = "+53 63672603";
const email = "ventas@bravocaribe.com";
const hours = defaultHours;

export const Page = () => {
  const { query } = useRouter();

  const productSlug = query.productSlug as string | undefined;

  const { getOneProduct } = useGetOneProduct();

  useEffect(() => {
    if (productSlug) {
      getOneProduct.fetch({ productSlug });
    }
  }, [productSlug]);

  const product = getOneProduct.data;

  const currentCategory = categories.find(
    ({ type }) => product?.categoryType === type
  );

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contáctanos</h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Estamos aquí para ayudarte con todas tus necesidades de repuestos
            automotrices
          </p>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div className="space-y-12">
              {product ? (
                <Card className="border shadow-sm">
                  <CardContent>
                    <div className="p-6 flex flex-col sm:flex-row gap-6 mt-6">
                      {product.images?.length ? (
                        <ImageComponent
                          image={product.images[0]}
                          className="w-40 h-40 object-cover rounded-md shadow"
                        />
                      ) : (
                        <FileImage className="w-40 h-40" />
                      )}

                      <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-semibold">
                          {product.name}
                        </h3>
                        <p className="font-bold text-accent">
                          {product.price} {product.currency}
                        </p>

                        {product.specs && (
                          <div className="text-sm text-muted-foreground">
                            {Object.keys(product.specs)
                              .slice(0, 3)
                              .map((key) => {
                                const { specsFields } = currentCategory || {};
                                const currentField = specsFields?.find(
                                  ({ field }) => field === key
                                );

                                return (
                                  <p key={key}>
                                    <strong>{currentField?.label}:</strong>{" "}
                                    {product.specs![key]}
                                  </p>
                                );
                              })}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <a
                        href={`mailto:ventas@bravocaribe.com?subject=Consulta sobre ${product.name}&body=Hola, estoy interesado en ${product.name}. ¿Podrian brindarme más información?`}
                        className="w-full"
                      >
                        <Button size="lg" variant="outline" className="w-full">
                          <Mail className="mr-2 h-5 w-5" />
                          Enviar correo electrónico
                        </Button>
                      </a>

                      <a
                        href={`${getWhatsAppLink(
                          "5363672603"
                        )}?text=Hola, estoy interesado en ${
                          product.name
                        }. ¿Podrian brindarme más información?`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="lg" variant="outline" className="w-full">
                          <Send className="mr-2 h-5 w-5" />
                          Enviar mensaje por Whatsapp
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="p-6 border rounded-md bg-secondary/30 text-center shadow-sm mt-6 bg-white">
                  <h3 className="text-xl font-semibold mb-2">
                    ¿Buscas un neumático o alguna pieza especifica?
                  </h3>

                  <p className="text-muted-foreground mb-4">
                    Revisa nuestro catálogo para encontrar el producto que
                    necesitas, o contáctanos y nuestro equipo de ventas te
                    ayudará a encontrar exactamente lo que buscas.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                    <a href="/productos" className="w-full">
                      <Button size="lg" variant="default" className="w-full">
                        Ver productos
                      </Button>
                    </a>

                    <a
                      href={`${getWhatsAppLink(
                        "5363672603"
                      )}?text = hola quiero pregunta por un producto`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button size="lg" variant="outline" className="w-full">
                        <Send className="mr-2 h-5 w-5" />
                        Contactar por WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Información de Contacto
                  </h3>

                  <div className="space-y-4 gap-4">
                    <Card>
                      <CardContent className="flex items-start pt-6">
                        <div className="mr-4 mt-1">
                          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                            <MapPin className="h-6 w-6 text-accent" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">
                            Dirección
                          </h4>
                          <p className="text-muted-foreground">{address}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="flex items-start pt-6">
                        <div className="mr-4 mt-1">
                          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                            <Phone className="h-6 w-6 text-accent" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">
                            Teléfono
                          </h4>
                          <a
                            href={`tel:${phone.replace(/\D/g, "")}`}
                            className="text-muted-foreground hover:text-accent transition-colors"
                          >
                            {phone}
                          </a>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="flex items-start pt-6">
                        <div className="mr-4 mt-1">
                          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                            <Mail className="h-6 w-6 text-accent" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">
                            Email
                          </h4>
                          <a
                            href={`mailto:${email}`}
                            className="text-muted-foreground hover:text-accent transition-colors"
                          >
                            {email}
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Horario de Atención
                  </h3>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mr-4">
                          <Clock className="h-6 w-6 text-accent" />
                        </div>
                        <h4 className="font-semibold text-foreground">
                          Horarios
                        </h4>
                      </div>
                      <div className="space-y-3">
                        {hours.map((schedule, index) => (
                          <div
                            key={index}
                            className="flex flex-col justify-between items-start py-2 border-b border-border last:border-0"
                          >
                            <span className="text-muted-foreground font-medium">
                              {schedule.days}
                            </span>
                            <span className="text-foreground font-semibold">
                              {schedule.time}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Ubicación
              </h3>

              <MapOl
                center={{
                  lat: 23.133455339265353,
                  lon: -82.37645038781906,
                }}
                markers={[
                  {
                    lat: 23.133455339265353,
                    lon: -82.37645038781906,
                  },
                ]}
                zoom={18}
                className="h-full min-h-96"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

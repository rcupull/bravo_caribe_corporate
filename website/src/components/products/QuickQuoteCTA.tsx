import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, Phone } from "lucide-react";

interface QuickQuoteCTAProps {
  title?: string;
  description?: string;
  phoneNumber?: string;
  whatsappNumber?: string;
}

const QuickQuoteCTA = ({
  title = "¿Necesitas una Cotización Rápida?",
  description = "Nuestro equipo está listo para ayudarte a encontrar las partes que necesitas",
  phoneNumber = "+53 63672603",
  whatsappNumber = "+53 63672603",
}: QuickQuoteCTAProps) => {
  const whatsappMessage = encodeURIComponent(
    "Hola, necesito una cotización para partes de vehículos."
  );

  return (
    <section className="py-16 bg-gradient-to-r from-accent to-accent/80">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-accent-foreground/90 mb-8">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
            >
              <Link to="/contacto" className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Formulario de Contacto
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-accent-foreground hover:bg-accent-foreground font-semibold px-8"
            >
              <a
                href={`https://wa.me/${whatsappNumber.replace(
                  /\D/g,
                  ""
                )}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Phone className="mr-2 h-5 w-5" />
                WhatsApp
              </a>
            </Button>
          </div>

          <p className="mt-6 text-accent-foreground/80">
            También puedes llamarnos al:
            <a
              href={`tel:${phoneNumber}`}
              className="font-semibold ml-2 hover:underline"
            >
              {phoneNumber}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default QuickQuoteCTA;

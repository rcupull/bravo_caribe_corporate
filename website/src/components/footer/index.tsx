import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import logo from "@/assets/logo-v.png";
import { categories } from "@/utils/category";
import { Link } from "../link";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <img src={logo} alt="Bravo Caribe" className="h-28 w-auto mb-4" />
            <p className="text-sm text-primary-foreground/70 mb-4">
              Precio y Calidad.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/1GdwhsB4CT/"
                className="text-primary-foreground/70 hover:text-accent transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/bravocaribe_?igsh=eHg2NGNzcWd1ODZ6"
                className="text-primary-foreground/70 hover:text-accent transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-lg text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/nosotros"
                  className="text-lg text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  to="/productos"
                  className="text-lg text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-lg text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categorías</h3>
            <ul className="space-y-2">
              {categories.map(({ name, type }, index) => (
                <li key={index}>
                  <Link
                    to={`/productos?categoryType=${type}`}
                    className="text-lg text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-lg text-primary-foreground/70">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>Zanja esquina a Espada. Centro Habana, Cuba</span>
              </li>
              <li className="flex items-center space-x-3 text-lg text-primary-foreground/70">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <a
                  href="tel:+53 63672603"
                  className="hover:text-accent transition-colors"
                >
                  +53 63672603
                </a>

                <a
                  href="tel:+53 63672603"
                  className="hover:text-accent transition-colors"
                >
                  +53 63518395
                </a>
              </li>
              <li className="flex items-center space-x-3 text-lg text-primary-foreground/70">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a
                  href="mailto:ventas@bravocaribe.com"
                  className="hover:text-accent transition-colors"
                >
                  ventas@bravocaribe.com
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-lg text-primary-foreground/70">
                <strong>Horario:</strong>
                <br />
                Lun - Vie: 8:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center">
          <p className="text-lg text-primary-foreground/60">
            © {new Date().getFullYear()} Bravo Caribe. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

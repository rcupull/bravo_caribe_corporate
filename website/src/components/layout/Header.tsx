import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, LogIn, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import CartSheet from "@/components/cart/CartSheet";
import logo from "@/assets/logo-h.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Nosotros", path: "/nosotros" },
    { name: "Productos", path: "/productos" },
    { name: "Blog", path: "/blog" },
    { name: "Contacto", path: "/contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-primary border-b border-border/40 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="Bravo Caribe" className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-4 py-2 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-md transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+1234567890"
              className="flex items-center text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <Phone className="h-4 w-4 mr-2" />
              <span>(123) 456-7890</span>
            </a>
            <CartSheet />

            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Button
                    asChild
                    variant="outline"
                    className="hover:bg-primary-foreground/10"
                  >
                    <Link to="/admin">
                      <Shield className="h-4 w-4" />
                      Admin
                    </Link>
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={logout}
                  className="hover:bg-primary-foreground/10"
                >
                  <LogOut className="h-4 w-4" />
                  Salir
                </Button>
              </>
            ) : (
              <Button
                asChild
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link to="/auth">
                  <LogIn className="h-4 w-4 mr-2" />
                  Iniciar Sesión
                </Link>
              </Button>
            )}

            <Button
              asChild
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            >
              <Link to="/contacto">Cotizar Ahora</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-primary-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border/40">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-4 py-3 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="px-4 pt-4 border-t border-border/40 space-y-2">
                {isAuthenticated ? (
                  <>
                    {isAdmin && (
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                          <Shield className="h-4 w-4 mr-2" />
                          Admin
                        </Link>
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Salir
                    </Button>
                  </>
                ) : (
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      <LogIn className="h-4 w-4 mr-2" />
                      Iniciar Sesión
                    </Link>
                  </Button>
                )}
                <Button
                  asChild
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                >
                  <Link to="/contacto" onClick={() => setIsMenuOpen(false)}>
                    Cotizar Ahora
                  </Link>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

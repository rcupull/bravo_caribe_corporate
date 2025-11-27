import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, LogIn, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartSheet from "@/components/cart/CartSheet";
import logo from "@/assets/logo-h.png";
import { useAuth } from "@/hooks/useAuth";
import { resetPersistentAuthData } from "@/utils/persistent-auth";
import { HeaderAnnouncement } from "../header-announcement";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { resetData } = useAuth();

  const { isAdmin, isAuthenticated } = useAuth();

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Nosotros", path: "/nosotros" },
    { name: "Productos", path: "/productos" },
    { name: "Blog", path: "/blog" },
    { name: "Contacto", path: "/contacto" },
  ];

  const logout = () => {
    resetData();
    resetPersistentAuthData();
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-accent border-b border-border/40 backdrop-blur-sm">
      <HeaderAnnouncement />
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
                className="px-4 py-2 text-lg font-medium text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-md transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+53 63672603"
              className="flex items-center text-lg text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <Phone className="h-4 w-4 mr-2" />
              <span>+53 63672603</span>
            </a>
            {/* <CartSheet /> */}

            <Button variant={"outline"}>
              <Link to="/contacto">Contáctanos</Link>
            </Button>

            {(() => {
              if (isAuthenticated) {
                return (
                  <>
                    {isAdmin && (
                      <Link to="/admin">
                        <Button variant="outline">
                          <Shield className="h-4 w-4" />
                          Admin
                        </Button>
                      </Link>
                    )}
                    <Button variant="outline" onClick={logout}>
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </>
                );
              }

              return null;

              // return (
              //   <Button asChild variant="outline">
              //     <Link to="/cuenta">
              //       <LogIn className="h-4 w-4" />
              //     </Link>
              //   </Button>
              // );
            })()}
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
                    </Button>
                  </>
                ) : (
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/cuenta" onClick={() => setIsMenuOpen(false)}>
                      <LogIn className="h-4 w-4 mr-2" />
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

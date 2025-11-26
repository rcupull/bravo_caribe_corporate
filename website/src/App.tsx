import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import AboutUs from "./pages/AboutUs";
import Auth from "./pages/Auth";
import Admin from "./pages/admin";
import Contact from "./pages/contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import { Providers } from "./Providers";

const App = () => (
  <Providers>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/productos" element={<Products />} />
      <Route path="/nosotros" element={<AboutUs />} />
      <Route path="/contacto" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogPost />} />
      <Route path="/cuenta" element={<Auth />} />
      <Route path="/admin" element={<Admin />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Providers>
);

export default App;

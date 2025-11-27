import { Routes, Route } from "react-router-dom";
import Index from "./pages/home/Index";
import NotFound from "./pages/not-found";
import Products from "./pages/products";
import AboutUs from "./pages/sobre-nosotros";
import Auth from "./pages/cuenta";
import Admin from "./pages/admin";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import BlogPost from "./pages/blog/blog-slug";
import { Providers } from "./Providers";

const App = () => (
  <Providers>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/productos" element={<Products />} />
      <Route path="/nosotros" element={<AboutUs />} />
      <Route path="/contacto" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:blogSlug" element={<BlogPost />} />
      <Route path="/cuenta" element={<Auth />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Providers>
);

export default App;

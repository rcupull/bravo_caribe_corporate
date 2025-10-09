import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  featured: boolean;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  useEffect(() => {
    const storedPosts = localStorage.getItem("blogPosts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      // Posts iniciales
      const initialPosts: BlogPost[] = [
        {
          id: "1",
          title: "Guía Completa de Mantenimiento Preventivo",
          excerpt:
            "Descubre cómo el mantenimiento preventivo puede extender la vida útil de tu vehículo y ahorrarte dinero.",
          content: "El mantenimiento preventivo es clave...",
          image:
            "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop",
          author: "Carlos Mendoza",
          date: "2024-01-15",
          category: "Mantenimiento",
          featured: true,
        },
        {
          id: "2",
          title: "Cómo Elegir las Pastillas de Freno Correctas",
          excerpt:
            "Todo lo que necesitas saber para seleccionar las pastillas de freno ideales para tu vehículo.",
          content: "Las pastillas de freno son fundamentales...",
          image:
            "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&h=600&fit=crop",
          author: "María González",
          date: "2024-01-10",
          category: "Frenos",
          featured: false,
        },
        {
          id: "3",
          title: "Filtros de Aceite: Cuándo y Por Qué Cambiarlos",
          excerpt:
            "Aprende la importancia de cambiar el filtro de aceite regularmente y sus beneficios.",
          content: "Los filtros de aceite juegan un papel crucial...",
          image:
            "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&h=600&fit=crop",
          author: "Juan Pérez",
          date: "2024-01-05",
          category: "Lubricación",
          featured: false,
        },
      ];
      setPosts(initialPosts);
      localStorage.setItem("blogPosts", JSON.stringify(initialPosts));
    }
  }, []);

  const categories = [
    "Todos",
    ...Array.from(new Set(posts.map((p) => p.category))),
  ];

  const filteredPosts =
    selectedCategory === "Todos"
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  const featuredPost = posts.find((p) => p.featured);
  const regularPosts = filteredPosts.filter(
    (p) => !p.featured || selectedCategory !== "Todos"
  );

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
                Blog Bravo Caribe
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90">
                Consejos, guías y noticias sobre el mundo automotriz
              </p>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && selectedCategory === "Todos" && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-8 text-foreground">
                  Destacado
                </h2>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="grid md:grid-cols-2 gap-6">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                    <CardContent className="p-8 flex flex-col justify-center">
                      <Badge className="w-fit mb-4">
                        {featuredPost.category}
                      </Badge>
                      <h3 className="text-3xl font-bold mb-4 text-foreground">
                        {featuredPost.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 text-lg">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {featuredPost.author}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(featuredPost.date).toLocaleDateString(
                            "es-ES",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </div>
                      </div>
                      <Button
                        className="w-fit gap-2"
                        onClick={() =>
                          (window.location.href = `/blog/${featuredPost.id}`)
                        }
                      >
                        Leer más
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Category Filter */}
        <section className="py-8 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {regularPosts.length === 0 ? (
                <p className="text-center text-muted-foreground py-12">
                  No hay artículos en esta categoría
                </p>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map((post) => (
                    <Card
                      key={post.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                      <CardContent className="p-6 flex flex-col flex-1">
                        <Badge className="w-fit mb-3">{post.category}</Badge>
                        <h3 className="text-xl font-bold mb-3 text-foreground">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 flex-1">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(post.date).toLocaleDateString("es-ES", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full gap-2"
                          onClick={() =>
                            (window.location.href = `/blog/${post.id}`)
                          }
                        >
                          Leer más
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;

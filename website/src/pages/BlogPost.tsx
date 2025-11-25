import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const storedPosts = localStorage.getItem("blogPosts");
    if (storedPosts) {
      const posts: BlogPost[] = JSON.parse(storedPosts);
      const currentPost = posts.find((p) => p.id === id);

      if (currentPost) {
        setPost(currentPost);
        // Get related posts from same category
        const related = posts
          .filter((p) => p.id !== id && p.category === currentPost.category)
          .slice(0, 3);
        setRelatedPosts(related);
      }
    }
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Artículo no encontrado
            </h1>
            <Button onClick={() => navigate("/blog")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Blog
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Back Button */}
        <section className="py-6 bg-secondary/30">
          <div className="container mx-auto px-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/blog")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al Blog
            </Button>
          </div>
        </section>

        {/* Article Header */}
        <article className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Meta Info */}
              <div className="mb-6">
                <Badge className="mb-4">{post.category}</Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span>
                      {new Date(post.date).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>5 min de lectura</span>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-[400px] md:h-[500px] object-cover rounded-lg mb-8"
              />

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="text-foreground space-y-6 leading-relaxed">
                  {post.content.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Compartir este artículo
                </h3>
                <div className="flex gap-3">
                  <Button variant="outline">Facebook</Button>
                  <Button variant="outline">Twitter</Button>
                  <Button variant="outline">LinkedIn</Button>
                  <Button variant="outline">WhatsApp</Button>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-secondary/30">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-foreground mb-8">
                  Artículos Relacionados
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Card
                      key={relatedPost.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => navigate(`/blog/${relatedPost.id}`)}
                    >
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-48 object-cover"
                      />
                      <CardContent className="p-6">
                        <Badge className="mb-3">{relatedPost.category}</Badge>
                        <h3 className="text-xl font-bold text-foreground mb-3">
                          {relatedPost.title}
                        </h3>
                        <p className="text-muted-foreground line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;

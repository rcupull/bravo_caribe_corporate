import { useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, Clock, FileImage } from "lucide-react";
import { useGetOneBlog } from "@/api/blogs/useGetOneBlog";
import { ImageComponent } from "@/components/image-component";
import { HtmlTextContainer } from "@/components/ui/html-text-container";
import { useGetAllBlogs } from "@/api/blogs/useGetAllBlogs";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "@/hooks/useRouter";

export const Page = () => {
  const { params, pushRoute } = useRouter();
  const { blogSlug } = params;

  const { getOneBlog } = useGetOneBlog();
  const { getAllBlogs } = useGetAllBlogs();

  useEffect(() => {
    if (blogSlug) {
      getOneBlog.fetch({ blogSlug });
    }
  }, [blogSlug]);

  useEffect(() => {
    getAllBlogs.fetch();
  }, []);

  const post = getOneBlog.data;
  const relatedPosts = (getAllBlogs.data || []).filter(
    (p) => post && p.blogSlug !== post.blogSlug
  );

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Artículo no encontrado
            </h1>
            <Button onClick={() => pushRoute("/blog")}>
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
              onClick={() => pushRoute("/blog")}
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
                {/* <Badge className="mb-4">{post.category}</Badge> */}
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
                      {new Date(post.createdAt).toLocaleDateString("es-ES", {
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

              {post.coverImage ? (
                <ImageComponent
                  image={post.coverImage}
                  className="w-full h-[400px] md:h-[500px] object-cover rounded-lg mb-8"
                />
              ) : (
                <FileImage className="w-full h-[400px] md:h-[500px] object-cover rounded-lg mb-8" />
              )}

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  {post.description}
                </p>

                <HtmlTextContainer
                  className="text-foreground space-y-6 leading-relaxed"
                  ckEditorData={post.message}
                />
              </div>

              {/* Share Section */}
              {/* <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Compartir este artículo
                </h3>
                <div className="flex gap-3">
                  <Button variant="outline">Facebook</Button>
                  <Button variant="outline">Twitter</Button>
                  <Button variant="outline">LinkedIn</Button>
                  <Button variant="outline">WhatsApp</Button>
                </div>
              </div> */}
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
                  {relatedPosts.map((relatedPost, index) => (
                    <Card
                      key={index}
                      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => pushRoute(`/blog/${relatedPost.blogSlug}`)}
                    >
                      {relatedPost.coverImage ? (
                        <ImageComponent
                          image={relatedPost.coverImage}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <FileImage className="w-full h-48 object-cover" />
                      )}

                      <CardContent className="p-6">
                        {/* <Badge className="mb-3">{relatedPost.category}</Badge> */}
                        <h3 className="text-xl font-bold text-foreground mb-3">
                          {relatedPost.title}
                        </h3>
                        <p className="text-muted-foreground line-clamp-2">
                          {relatedPost.description}
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

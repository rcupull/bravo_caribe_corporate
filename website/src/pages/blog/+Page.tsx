import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User, ArrowRight, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetAllBlogs } from "@/api/blogs/useGetAllBlogs";
import { ImageComponent } from "@/components/image-component";
import { useRouter } from "@/hooks/useRouter";
import { getBlogRoute } from "@/utils/routes";

export const Page = () => {
  const { pushRoute } = useRouter();

  const { getAllBlogs } = useGetAllBlogs();

  useEffect(() => {
    getAllBlogs.fetch();
  }, []);

  const featuredBlog = getAllBlogs.data?.find((p) => p.featured);

  // const categories = [
  //   "Todos",
  //   ...Array.from(new Set(posts.map((p) => p.category))),
  // ];

  // const filteredPosts =
  //   selectedCategory === "Todos"
  //     ? posts
  //     : posts.filter((p) => p.category === selectedCategory);

  // const featuredPost = posts.find((p) => p.featured);
  // const regularPosts = filteredPosts.filter(
  //   (p) => !p.featured || selectedCategory !== "Todos"
  // );

  return (
    <>
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
      {featuredBlog && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-foreground">
                Destacado
              </h2>
              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredBlog.coverImage ? (
                    <ImageComponent
                      image={featuredBlog.coverImage}
                      className="h-[20rem] object-cover"
                    />
                  ) : (
                    <FileImage className="w-full h-[20rem]" />
                  )}

                  <CardContent className="p-8 flex flex-col justify-center">
                    {/* <Badge className="w-fit mb-4">
                        {featuredPost.category}
                      </Badge> */}
                    <h3 className="text-3xl font-bold mb-4 text-foreground">
                      {featuredBlog.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 text-lg">
                      {featuredBlog.description}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {featuredBlog.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(featuredBlog.createdAt).toLocaleDateString(
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
                      onClick={() => {
                        pushRoute(
                          getBlogRoute({ blogSlug: featuredBlog.blogSlug })
                        );
                      }}
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
      {/* <section className="py-8 bg-secondary/30">
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
        </section> */}

      {/* Blog Posts Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {!getAllBlogs.data?.length ? (
              <p className="text-center text-muted-foreground py-12">
                No hay artículos en esta categoría
              </p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getAllBlogs.data?.map((blog, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                  >
                    {blog.coverImage ? (
                      <ImageComponent
                        image={blog.coverImage}
                        className="w-48 object-cover mx-auto"
                      />
                    ) : (
                      <FileImage className="w-48 mx-auto" />
                    )}
                    <CardContent className="p-6 flex flex-col flex-1">
                      {/* <Badge className="w-fit mb-3">{post.category}</Badge> */}
                      <h3 className="text-xl font-bold mb-3 text-foreground">
                        {blog.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 flex-1">
                        {blog.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {blog.author}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(blog.createdAt).toLocaleDateString(
                            "es-ES",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full gap-2"
                        onClick={() => {
                          pushRoute(getBlogRoute({ blogSlug: blog.blogSlug }));
                        }}
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
    </>
  );
};

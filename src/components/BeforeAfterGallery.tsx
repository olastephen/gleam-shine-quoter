import before1 from "@/assets/gallery/before-1.jpg";
import before2 from "@/assets/gallery/before-2.jpg";
import before3 from "@/assets/gallery/before-3.jpg";
import before4 from "@/assets/gallery/before-4.jpg";

const BeforeAfterGallery = () => {
  const images = [
    { before: before1, title: "Window Cleaning" },
    { before: before2, title: "Window Restoration" },
    { before: before3, title: "Window Deep Clean" },
    { before: before4, title: "Bathroom Cleaning" }
  ];

  return (
    <section className="py-20 px-6 bg-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Work in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See the difference our professional cleaning makes
          </p>
          <p className="text-sm text-accent font-medium mt-2">
            Before photos - After photos coming soon!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-card/60 backdrop-blur-lg border border-glass-border shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative aspect-square">
                  <img
                    src={image.before}
                    alt={`${image.title} before cleaning`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-destructive/90 backdrop-blur-sm text-destructive-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    Before
                  </div>
                </div>
                <div className="p-4 bg-background/80 backdrop-blur-sm">
                  <h3 className="font-semibold text-foreground">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            We'll be adding amazing after photos soon to show you the full transformation!
          </p>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;

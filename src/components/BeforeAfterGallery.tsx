import beforeImage from "@/assets/gallery/before-new.jpg";
import afterImage from "@/assets/gallery/after-new.jpg";

const BeforeAfterGallery = () => {
  const beforeImage_data = { src: beforeImage, alt: "Before cleaning - Dirty floor area" };
  const afterImage_data = { src: afterImage, alt: "After cleaning - Spotless clean room" };

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            See the Difference
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Real results from real customers across Manchester
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-6 text-center">Before</h3>
            <div className="relative overflow-hidden rounded-xl border-2 border-glass-border bg-card/60 backdrop-blur-lg hover:shadow-[var(--shadow-glow)] transition-all duration-500 hover:-translate-y-2 animate-fade-in group">
              <img
                src={beforeImage_data.src}
                alt={beforeImage_data.alt}
                className="w-full h-96 md:h-[500px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-6 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">After</h3>
            <div className="relative overflow-hidden rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-lg hover:shadow-[var(--shadow-glow)] transition-all duration-500 hover:-translate-y-2 animate-fade-in">
              <img
                src={afterImage_data.src}
                alt={afterImage_data.alt}
                className="w-full h-96 md:h-[500px] object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="mt-4 p-4 md:p-6 text-center bg-gradient-to-br from-accent/10 to-primary/10 backdrop-blur-sm border border-accent/20 rounded-xl">
              <p className="text-sm md:text-base text-muted-foreground">
                ✨ More amazing transformations coming soon!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;

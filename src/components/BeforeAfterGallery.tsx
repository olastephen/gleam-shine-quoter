import before1 from "@/assets/gallery/before-1.jpg";
import before2 from "@/assets/gallery/before-2.jpg";
import before3 from "@/assets/gallery/before-3.jpg";
import before4 from "@/assets/gallery/before-4.jpg";
import after1 from "@/assets/gallery/after-1.mp4";

const BeforeAfterGallery = () => {
  const beforeImages = [
    { src: before1, alt: "Before cleaning - Kitchen", type: "image" },
    { src: before2, alt: "Before cleaning - Bathroom", type: "image" },
    { src: before3, alt: "Before cleaning - Living Room", type: "image" },
    { src: before4, alt: "Before cleaning - Bedroom", type: "image" }
  ];

  const afterMedia = [
    { src: after1, alt: "After cleaning - Sparkling results", type: "video" }
  ];

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
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {beforeImages.map((image, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-xl border-2 border-glass-border bg-card/60 backdrop-blur-lg hover:shadow-[var(--shadow-glow)] transition-all duration-500 hover:-translate-y-2 animate-fade-in group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-48 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-6 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">After</h3>
            <div className="grid gap-3 md:gap-4">
              {afterMedia.map((media, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-lg hover:shadow-[var(--shadow-glow)] transition-all duration-500 hover:-translate-y-2 animate-fade-in"
                  style={{ animationDelay: `${(beforeImages.length + index) * 100}ms` }}
                >
                  {media.type === "video" ? (
                    <video
                      src={media.src}
                      className="w-full h-auto rounded-lg"
                      controls
                      loop
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <img
                      src={media.src}
                      alt={media.alt}
                      className="w-full h-64 object-cover"
                    />
                  )}
                </div>
              ))}
              <div className="p-4 md:p-6 text-center bg-gradient-to-br from-accent/10 to-primary/10 backdrop-blur-sm border border-accent/20 rounded-xl">
                <p className="text-sm md:text-base text-muted-foreground">
                  ✨ More amazing transformations coming soon!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;

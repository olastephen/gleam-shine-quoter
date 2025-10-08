import before1 from "@/assets/gallery/before-new.jpg";
import after1 from "@/assets/gallery/after-new.jpg";
import before2 from "@/assets/gallery/before-2.jpg";
import after2 from "@/assets/gallery/after-2.mp4";
import before3 from "@/assets/gallery/before-3.jpg";
import after3 from "@/assets/gallery/after-3.mp4";

const BeforeAfterGallery = () => {
  const transformations = [
    {
      before: { src: before1, alt: "Before cleaning - Dirty floor area" },
      after: { src: after1, alt: "After cleaning - Spotless clean room", type: "image" }
    },
    {
      before: { src: before2, alt: "Before cleaning - Dirty microwave and kitchen" },
      after: { src: after2, alt: "After cleaning - Sparkling clean appliances", type: "video" }
    },
    {
      before: { src: before3, alt: "Before cleaning - Dirty outdoor area" },
      after: { src: after3, alt: "After cleaning - Clean outdoor space", type: "video" }
    }
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

        <div className="space-y-12 md:space-y-16">
          {transformations.map((transformation, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              <div>
                {index === 0 && (
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-6 text-center">Before</h3>
                )}
                <div 
                  className="relative overflow-hidden rounded-xl border-2 border-glass-border bg-card/60 backdrop-blur-lg hover:shadow-[var(--shadow-glow)] transition-all duration-500 hover:-translate-y-2 animate-fade-in group"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <img
                    src={transformation.before.src}
                    alt={transformation.before.alt}
                    className="w-full h-80 md:h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              <div>
                {index === 0 && (
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-6 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">After</h3>
                )}
                <div 
                  className="relative overflow-hidden rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-lg hover:shadow-[var(--shadow-glow)] transition-all duration-500 hover:-translate-y-2 animate-fade-in"
                  style={{ animationDelay: `${index * 200 + 100}ms` }}
                >
                  {transformation.after.type === "video" ? (
                    <video
                      src={transformation.after.src}
                      className="w-full h-80 md:h-96 object-cover rounded-lg"
                      controls
                      loop
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <img
                      src={transformation.after.src}
                      alt={transformation.after.alt}
                      className="w-full h-80 md:h-96 object-cover transition-transform duration-500 hover:scale-110"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
          
          <div className="p-4 md:p-6 text-center bg-gradient-to-br from-accent/10 to-primary/10 backdrop-blur-sm border border-accent/20 rounded-xl">
            <p className="text-sm md:text-base text-muted-foreground">
              ✨ More amazing transformations coming soon!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;

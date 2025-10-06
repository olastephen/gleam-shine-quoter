import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Manchester",
      rating: 5,
      text: "Absolutely brilliant service! The team was professional, punctual, and my flat looked spotless. I'll definitely be booking again.",
      service: "Domestic Cleaning",
      avatar: "👩🏻‍💼",
      color: "from-primary/20 to-secondary/20"
    },
    {
      name: "Mark Thompson",
      location: "Salford",
      rating: 5,
      text: "Used them for our office cleaning and couldn't be happier. Great attention to detail and very reliable. Highly recommend!",
      service: "Commercial Cleaning",
      avatar: "👨🏼‍💼",
      color: "from-secondary/20 to-primary/20"
    },
    {
      name: "Emily Roberts",
      location: "Stockport",
      rating: 5,
      text: "The end of lease clean was outstanding. Got my full deposit back thanks to their thorough work. Worth every penny!",
      service: "End of Lease",
      avatar: "👩🏽‍🦱",
      color: "from-primary/20 to-accent/20"
    },
    {
      name: "David Chen",
      location: "Bolton",
      rating: 5,
      text: "Fantastic job on our student accommodation. Quick, efficient, and the price was very reasonable. Will use again next year!",
      service: "Student Accommodation",
      avatar: "👨🏻‍🎓",
      color: "from-accent/20 to-primary/20"
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Join 100+ satisfied customers across Greater Manchester
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`bg-gradient-to-br ${testimonial.color} backdrop-blur-lg border-glass-border hover:shadow-[var(--shadow-glow)] transition-all duration-500 hover:-translate-y-2 hover:scale-105 animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl md:text-5xl">{testimonial.avatar}</div>
                  <div className="flex-1">
                    <div className="flex gap-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-border/50 pt-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{testimonial.location}</p>
                  <p className="text-xs text-primary mt-2 font-medium">{testimonial.service}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 md:mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 md:px-6 py-3 animate-fade-in">
            <Star className="h-5 w-5 fill-accent text-accent" />
            <span className="font-semibold text-foreground">4.9/5.0</span>
            <span className="text-sm md:text-base text-muted-foreground">from 100+ satisfied customers</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

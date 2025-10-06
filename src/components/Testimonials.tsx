import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Manchester",
      rating: 5,
      text: "Absolutely brilliant service! The team was professional, punctual, and my flat looked spotless. I'll definitely be booking again.",
      service: "Domestic Cleaning"
    },
    {
      name: "Mark Thompson",
      location: "Salford",
      rating: 5,
      text: "Used them for our office cleaning and couldn't be happier. Great attention to detail and very reliable. Highly recommend!",
      service: "Commercial Cleaning"
    },
    {
      name: "Emily Roberts",
      location: "Stockport",
      rating: 5,
      text: "The end of lease clean was outstanding. Got my full deposit back thanks to their thorough work. Worth every penny!",
      service: "End of Lease"
    },
    {
      name: "David Chen",
      location: "Bolton",
      rating: 5,
      text: "Fantastic job on our student accommodation. Quick, efficient, and the price was very reasonable. Will use again next year!",
      service: "Student Accommodation"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-card/60 backdrop-blur-lg border-glass-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-border/50 pt-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  <p className="text-xs text-primary mt-2 font-medium">{testimonial.service}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full px-6 py-3">
            <Star className="h-5 w-5 fill-accent text-accent" />
            <span className="font-semibold text-foreground">4.9/5.0</span>
            <span className="text-muted-foreground">from 100+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

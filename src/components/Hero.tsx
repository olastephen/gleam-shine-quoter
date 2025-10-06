import { Button } from "@/components/ui/button";
import { Users, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-cleaner.jpg";

const Hero = () => {
  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-form');
    bookingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[600px] bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))] py-20 px-6 overflow-hidden">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
            Professional Domestic and Commercial Cleaning Services
          </h1>
          <p className="text-lg text-foreground/80 max-w-xl">
            Cleaning and handyman tasks booked and performed by experienced providers who are highly rated by customers like you.
          </p>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background" />
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-secondary border-2 border-background" />
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-primary border-2 border-background" />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span className="font-semibold">100+ Satisfied Customers</span>
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <Button onClick={scrollToBooking} variant="secondary" size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
              Book a Clean
            </Button>
            <Button onClick={scrollToBooking} variant="outline" size="lg" className="bg-background/50 backdrop-blur-sm">
              Get a Quote
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="relative rounded-full overflow-hidden w-full max-w-md mx-auto aspect-square shadow-2xl border-4 border-accent/30">
            <img 
              src={heroImage} 
              alt="Professional cleaning service expert" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-10 -left-4 bg-background rounded-xl shadow-lg p-4 animate-pulse">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              <span className="font-semibold text-sm">Spotless Results</span>
            </div>
          </div>
          <div className="absolute bottom-10 -right-4 bg-background rounded-xl shadow-lg p-4 animate-pulse delay-150">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-accent" />
              <span className="font-semibold text-sm">Industry Experts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

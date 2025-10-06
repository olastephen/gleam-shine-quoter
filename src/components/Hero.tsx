import { Button } from "@/components/ui/button";
import { Users, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-cleaner.jpg";
import logo from "@/assets/logo.png";

const Hero = () => {
  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-form');
    bookingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[600px] bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))] py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Background Logo Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] pointer-events-none animate-pulse">
        <img src={logo} alt="" className="w-full h-full object-contain" />
      </div>

      {/* Floating Watermark Logo */}
      <div className="absolute bottom-8 right-8 w-24 h-24 md:w-32 md:h-32 opacity-10 pointer-events-none animate-fade-in">
        <img src={logo} alt="" className="w-full h-full object-contain" />
      </div>

      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 z-10 animate-fade-in">
          {/* Logo Integrated with Content */}
          <div className="flex items-center gap-4 mb-4">
            <img src={logo} alt="Freshshine Solutions" className="h-16 w-auto animate-fade-in" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Professional Domestic and Commercial Cleaning Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
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
            <Button 
              onClick={scrollToBooking} 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              Book a Clean
            </Button>
            <Button 
              onClick={scrollToBooking} 
              variant="outline" 
              size="lg" 
              className="bg-card/60 backdrop-blur-lg border-glass-border hover:bg-card/80 transition-all hover:-translate-y-1"
            >
              Get a Quote
            </Button>
          </div>
        </div>
        <div className="relative animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="relative rounded-full overflow-hidden w-full max-w-md mx-auto aspect-square shadow-2xl border-4 border-primary/20">
            <img 
              src={heroImage} 
              alt="Professional cleaning service expert" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="absolute top-10 -left-4 bg-card/80 backdrop-blur-lg border border-glass-border rounded-xl shadow-xl p-4 animate-pulse">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              <span className="font-semibold text-sm text-foreground">Spotless Results</span>
            </div>
          </div>
          <div className="absolute bottom-10 -right-4 bg-card/80 backdrop-blur-lg border border-glass-border rounded-xl shadow-xl p-4 animate-pulse" style={{ animationDelay: "150ms" }}>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-accent" />
              <span className="font-semibold text-sm text-foreground">Industry Experts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

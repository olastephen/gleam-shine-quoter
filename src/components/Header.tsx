import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Header = () => {
  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-form');
    bookingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="bg-card/80 backdrop-blur-lg border-b border-glass-border py-4 px-6 sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Freshshine Solutions" className="h-12 w-auto" />
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="#services" className="text-foreground hover:text-primary transition-colors font-medium">Services</a>
          <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors font-medium">How It Works</a>
          <a href="#faqs" className="text-foreground hover:text-primary transition-colors font-medium">FAQs</a>
        </div>
        <Button 
          onClick={scrollToBooking} 
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
          size="lg"
        >
          Book a Clean
        </Button>
      </nav>
    </header>
  );
};

export default Header;

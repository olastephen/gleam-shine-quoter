import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-form');
    bookingSection?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-card/80 backdrop-blur-lg border-b border-glass-border py-4 px-6 sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Freshshine Solutions" className="h-10 sm:h-12 w-auto" />
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#services" className="text-foreground hover:text-primary transition-colors font-medium">Services</a>
          <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors font-medium">How It Works</a>
          <a href="#faqs" className="text-foreground hover:text-primary transition-colors font-medium">FAQs</a>
        </div>
        
        {/* Desktop CTA Button */}
        <Button 
          onClick={scrollToBooking} 
          className="hidden sm:flex bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
          size="lg"
        >
          Book a Clean
        </Button>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-lg border-t border-glass-border">
          <div className="container mx-auto py-4 space-y-4">
            <a 
              href="#services" 
              onClick={() => scrollToSection('services')}
              className="block text-foreground hover:text-primary transition-colors font-medium py-2"
            >
              Services
            </a>
            <a 
              href="#how-it-works" 
              onClick={() => scrollToSection('how-it-works')}
              className="block text-foreground hover:text-primary transition-colors font-medium py-2"
            >
              How It Works
            </a>
            <a 
              href="#faqs" 
              onClick={() => scrollToSection('faqs')}
              className="block text-foreground hover:text-primary transition-colors font-medium py-2"
            >
              FAQs
            </a>
            <Button 
              onClick={scrollToBooking} 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all mt-4"
              size="lg"
            >
              Book a Clean
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

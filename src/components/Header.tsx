import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Header = () => {
  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-form');
    bookingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 sticky top-0 z-50 shadow-md">
      <nav className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6" />
          <span className="text-xl font-bold">CleanPro Services</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="#services" className="hover:text-accent transition-colors">Services</a>
          <a href="#about" className="hover:text-accent transition-colors">About</a>
          <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
        </div>
        <Button onClick={scrollToBooking} variant="secondary" size="lg">
          Book a Clean
        </Button>
      </nav>
    </header>
  );
};

export default Header;

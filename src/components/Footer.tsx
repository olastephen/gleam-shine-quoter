import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-card/90 backdrop-blur-lg border-t border-glass-border py-8 md:py-12 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="space-y-4">
            <img src={logo} alt="Freshshine Solutions" className="h-10 md:h-12 w-auto" />
            <p className="text-xs md:text-sm text-muted-foreground">
              Professional cleaning services you can trust. Serving the Greater Manchester area since 2020.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 hover:scale-110">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 hover:scale-110">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 hover:scale-110">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 md:mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-xs md:text-sm">
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors duration-300">Services</a></li>
              <li><a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors duration-300">How It Works</a></li>
              <li><a href="#faqs" className="text-muted-foreground hover:text-primary transition-colors duration-300">FAQs</a></li>
              <li><a href="#booking-form" className="text-muted-foreground hover:text-primary transition-colors duration-300">Get a Quote</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 md:mb-4 text-foreground">Services</h3>
            <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
              <li>Domestic Cleaning</li>
              <li>Commercial Cleaning</li>
              <li>End of Lease</li>
              <li>Student Accommodations</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 md:mb-4 text-foreground">Contact Us</h3>
            <ul className="space-y-3 text-xs md:text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span>0161 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="break-all">info@freshshine.co.uk</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Manchester, UK</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-xs md:text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Freshshine Solutions Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

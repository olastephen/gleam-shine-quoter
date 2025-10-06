import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-card/90 backdrop-blur-lg border-t border-glass-border py-12 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <img src={logo} alt="Freshshine Solutions" className="h-12 w-auto" />
            <p className="text-sm text-muted-foreground">
              Professional cleaning services you can trust. Serving the Greater Manchester area since 2020.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Services</a></li>
              <li><a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#faqs" className="text-muted-foreground hover:text-primary transition-colors">FAQs</a></li>
              <li><a href="#booking-form" className="text-muted-foreground hover:text-primary transition-colors">Get a Quote</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Domestic Cleaning</li>
              <li>Commercial Cleaning</li>
              <li>End of Lease</li>
              <li>Student Accommodations</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>0161 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@freshshine.co.uk</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Manchester, UK</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Freshshine Solutions Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

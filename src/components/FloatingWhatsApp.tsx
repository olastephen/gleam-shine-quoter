import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingWhatsApp = () => {
  const phoneNumber = "447494523307"; // WhatsApp number for Fresh Shine Solutions
  const message = "Hi! I'd like to inquire about your cleaning services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 animate-fade-in"
      style={{ animationDelay: "500ms" }}
    >
      <Button
        size="lg"
        className="h-14 w-14 rounded-full shadow-[var(--shadow-glow)] hover:shadow-[0_0_50px_hsl(var(--primary)/0.6)] transition-all duration-300 hover:scale-110 bg-[#25D366] hover:bg-[#20BD5A] text-white border-2 border-white/20"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Chat with us on WhatsApp</span>
      </Button>
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]"></span>
      </span>
    </a>
  );
};

export default FloatingWhatsApp;

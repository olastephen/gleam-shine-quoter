import { Home, Building2, KeyRound, GraduationCap, Hotel, Droplets } from "lucide-react";
import ServiceCard from "./ServiceCard";

const services = [
  {
    title: "Regular Domestic Cleaning",
    description: "Keep your home spotless with our regular cleaning services. Perfect for busy households.",
    icon: Home,
  },
  {
    title: "Commercial Property Cleaning",
    description: "Professional cleaning solutions for offices, retail spaces, and commercial buildings.",
    icon: Building2,
  },
  {
    title: "End of Lease Cleaning",
    description: "Comprehensive move-out cleaning to ensure you get your deposit back.",
    icon: KeyRound,
  },
  {
    title: "Student Accommodations",
    description: "Specialized cleaning services for student housing and dormitories.",
    icon: GraduationCap,
  },
  {
    title: "AirBnB Short Term Let",
    description: "Quick turnaround cleaning for short-term rental properties.",
    icon: Hotel,
  },
  {
    title: "Special Add-On Services",
    description: "Oven cleaning, window washing, carpet cleaning, and more specialized services.",
    icon: Droplets,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 px-6 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Our Cleaning Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional cleaning solutions tailored to your needs
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

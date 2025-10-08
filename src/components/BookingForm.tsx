import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Home, Building2, KeyRound, GraduationCap, Hotel, Droplets } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const services = [
  { id: "domestic", label: "Regular Domestic Cleaning", icon: Home },
  { id: "commercial", label: "Commercial Property Cleaning", icon: Building2 },
  { id: "endoflease", label: "End of Lease Cleaning", icon: KeyRound },
  { id: "student", label: "Student Accommodations", icon: GraduationCap },
  { id: "airbnb", label: "AirBnB Short Term Let", icon: Hotel },
  { id: "special", label: "Special Add-On Services", icon: Droplets },
];

const BookingForm = () => {
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState({
    address: "",
    postcode: "",
    bedrooms: "",
    bathrooms: "",
    date: "",
    time: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService) {
      toast.error("Please select a service type");
      return;
    }

    if (!formData.address || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const { error } = await supabase.from("quotes").insert({
        service_type: selectedService,
        address: formData.address,
        postcode: formData.postcode || null,
        bedrooms: formData.bedrooms || null,
        bathrooms: formData.bathrooms || null,
        preferred_date: formData.date || null,
        preferred_time: formData.time || null,
        email: formData.email,
        phone: formData.phone,
        status: "pending",
      });

      if (error) throw error;

      toast.success("Quote request submitted! We'll contact you soon.");
      
      // Reset form
      setSelectedService("");
      setFormData({
        address: "",
        postcode: "",
        bedrooms: "",
        bathrooms: "",
        date: "",
        time: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      console.error("Error submitting quote:", error);
      toast.error("Failed to submit quote. Please try again.");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="booking-form" className="py-20 px-6 bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))]">
      <div className="container mx-auto max-w-4xl">
        <Card className="shadow-2xl border-none">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-bold">Book a Clean</CardTitle>
            <CardDescription className="text-base">Get your personalized quote in minutes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-semibold">Select Service Type</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setSelectedService(service.id)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                        selectedService === service.id
                          ? "border-accent bg-accent/10 shadow-md"
                          : "border-border hover:border-accent/50 hover:bg-accent/5"
                      }`}
                    >
                      <Icon className={`h-8 w-8 ${selectedService === service.id ? "text-accent" : "text-muted-foreground"}`} />
                      <span className="text-xs text-center font-medium">{service.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Full Address*</Label>
                  <Input
                    id="address"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postcode">Postcode*</Label>
                  <Input
                    id="postcode"
                    placeholder="e.g., M1 1AA"
                    value={formData.postcode}
                    onChange={(e) => handleInputChange("postcode", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Number of Bedrooms</Label>
                  <Select value={formData.bedrooms} onValueChange={(value) => handleInputChange("bedrooms", value)}>
                    <SelectTrigger id="bedrooms">
                      <SelectValue placeholder="Select bedrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Bedroom</SelectItem>
                      <SelectItem value="2">2 Bedrooms</SelectItem>
                      <SelectItem value="3">3 Bedrooms</SelectItem>
                      <SelectItem value="4">4 Bedrooms</SelectItem>
                      <SelectItem value="5">5+ Bedrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Number of Bathrooms</Label>
                  <Select value={formData.bathrooms} onValueChange={(value) => handleInputChange("bathrooms", value)}>
                    <SelectTrigger id="bathrooms">
                      <SelectValue placeholder="Select bathrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Bathroom</SelectItem>
                      <SelectItem value="2">2 Bathrooms</SelectItem>
                      <SelectItem value="3">3 Bathrooms</SelectItem>
                      <SelectItem value="4">4+ Bathrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Preferred Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email*</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number*</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+44 123 456 7890"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" variant="secondary" size="lg" className="w-full mt-6 shadow-lg">
                Get Your Quote Now
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BookingForm;

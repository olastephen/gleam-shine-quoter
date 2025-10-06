import { MapPin } from "lucide-react";

const LocationMap = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Serving Greater Manchester
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            We cover all areas across Greater Manchester
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
          <div className="relative overflow-hidden rounded-2xl border-2 border-glass-border bg-card/60 backdrop-blur-lg hover:shadow-[var(--shadow-glow)] transition-all duration-500 animate-fade-in h-[300px] md:h-[450px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d151800.77668728938!2d-2.3252052!3d53.4807593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487a4d4c5226f5db%3A0xd9be143804fe6baa!2sManchester%2C%20UK!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl"
            />
          </div>

          <div className="space-y-4 md:space-y-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="p-4 md:p-6 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm border border-glass-border rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="p-2 md:p-3 bg-primary/20 rounded-lg">
                  <MapPin className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-base md:text-lg text-foreground mb-2">Coverage Areas</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Manchester City Centre • Salford • Trafford • Stockport • Bolton • Bury • Rochdale • Oldham • Tameside • Wigan
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 bg-gradient-to-br from-secondary/10 to-primary/10 backdrop-blur-sm border border-glass-border rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <h3 className="font-semibold text-base md:text-lg text-foreground mb-3">Why Choose Us?</h3>
              <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  Fast response times across all areas
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-secondary"></div>
                  Local teams who know the area
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  Flexible scheduling to suit you
                </li>
              </ul>
            </div>

            <div className="p-4 md:p-6 bg-gradient-to-br from-accent/10 to-primary/10 backdrop-blur-sm border border-glass-border rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <h3 className="font-semibold text-base md:text-lg text-foreground mb-2">Service Hours</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Monday - Saturday: 7:00 AM - 8:00 PM<br />
                Sunday: 9:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;

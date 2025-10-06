import { Shield, Heart, Star, Clock } from "lucide-react";

const CleanPromise = () => {
  const promises = [
    {
      icon: Shield,
      title: "100% Satisfaction Guarantee",
      description: "If you're not happy, we'll make it right - no questions asked"
    },
    {
      icon: Star,
      title: "Professional Excellence",
      description: "Highly trained and experienced cleaning experts every time"
    },
    {
      icon: Heart,
      title: "Eco-Friendly Products",
      description: "Safe for your family, pets, and the environment"
    },
    {
      icon: Clock,
      title: "Always On Time",
      description: "Punctual service that respects your schedule"
    }
  ];

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Clean Promise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to delivering exceptional service with every clean
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {promises.map((promise, index) => (
            <div
              key={index}
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-card/60 backdrop-blur-lg border border-glass-border rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-center h-full">
                <div className="mb-6 inline-block p-5 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <promise.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{promise.title}</h3>
                <p className="text-muted-foreground">{promise.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-card/60 backdrop-blur-lg border border-glass-border rounded-2xl p-8 shadow-xl max-w-3xl">
            <p className="text-lg text-foreground leading-relaxed">
              "We don't just clean - we transform your space into a spotless sanctuary. 
              Our commitment to excellence means every surface sparkles, every corner shines, 
              and you enjoy complete peace of mind."
            </p>
            <p className="mt-4 font-semibold text-primary">- The Freshshine Team</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CleanPromise;

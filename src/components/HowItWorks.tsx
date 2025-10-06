import { Calendar, Search, Sparkles, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Choose Your Service",
      description: "Select from our range of professional cleaning services tailored to your needs"
    },
    {
      icon: Calendar,
      title: "Book Your Slot",
      description: "Pick a date and time that works best for you through our easy booking form"
    },
    {
      icon: Sparkles,
      title: "We Clean",
      description: "Our experienced professionals arrive on time and deliver spotless results"
    },
    {
      icon: CheckCircle,
      title: "Enjoy & Relax",
      description: "Sit back and enjoy your fresh, clean space with complete peace of mind"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting your space professionally cleaned is simple and hassle-free
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="bg-card/50 backdrop-blur-md border border-glass-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="absolute -top-4 -left-4 bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {index + 1}
                </div>
                <div className="mb-6 inline-block p-4 bg-accent/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

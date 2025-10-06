import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQs = () => {
  const faqs = [
    {
      question: "What areas do you serve?",
      answer: "We provide professional cleaning services throughout the Greater Manchester area and surrounding regions. Contact us to confirm availability in your specific location."
    },
    {
      question: "Do I need to provide cleaning supplies?",
      answer: "No, our team comes fully equipped with professional-grade cleaning products and equipment. We use eco-friendly, safe cleaning solutions that deliver exceptional results."
    },
    {
      question: "How long does a typical cleaning take?",
      answer: "The duration depends on the service type and property size. A standard domestic clean typically takes 2-4 hours, while deep cleans may require more time. We'll provide an accurate estimate during booking."
    },
    {
      question: "Are your cleaners insured and vetted?",
      answer: "Yes, all our cleaning professionals are fully insured, background-checked, and highly trained. Your safety and peace of mind are our top priorities."
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer: "We stand behind our Clean Promise. If you're not completely satisfied, contact us within 24 hours and we'll return to address any concerns at no additional cost."
    },
    {
      question: "Can I book a regular cleaning service?",
      answer: "Absolutely! We offer flexible scheduling for weekly, bi-weekly, or monthly cleaning services. Regular clients enjoy priority booking and special rates."
    }
  ];

  return (
    <section id="faqs" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about our cleaning services
          </p>
        </div>

        <div className="bg-card/50 backdrop-blur-md border border-glass-border rounded-2xl p-8 shadow-xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border/50 rounded-xl px-6 bg-background/50 backdrop-blur-sm"
              >
                <AccordionTrigger className="text-left hover:text-primary transition-colors">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQs;

import { SERVICE_RECORDS_SEED } from "@/data";
import ServiceCard from "./ServiceCard";

type ServicesSectionProps = {
  id?: string;
  title?: string;
  subtitle?: string;
};

export default function ServicesSection({
  id = "services",
  title = "Our Services",
  subtitle = "We provide expert support across selling, buying, letting, renting, international property, and negotiation.",
}: ServicesSectionProps) {
  return (
    <section id={id} className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col gap-10">
        <div className="flex flex-col gap-3 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-semibold text-neutral-900">
            {title}
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {SERVICE_RECORDS_SEED.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
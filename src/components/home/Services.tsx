import { SERVICES, SERVICE_IMAGES } from "@/constants";
import ServiceCardImage from "@/components/home/ServiceCardImage";

export default function Services() {
  return (
    <section id="services" className="bg-secondary/30 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Services We Cover
          </h2>
          <p className="mt-4 text-muted">
            Premium leads across all interior design categories
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <div
              key={service}
              className="card-hover group overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="relative h-48 overflow-hidden">
                <ServiceCardImage
                  src={SERVICE_IMAGES[service] ?? SERVICE_IMAGES["Full Home"]}
                  alt={service}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-semibold">{service}</h3>
                <p className="mt-2 text-sm text-muted">
                  Verified clients looking for {service.toLowerCase()} design services
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

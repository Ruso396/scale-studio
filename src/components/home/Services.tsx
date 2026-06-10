import { SERVICES, SERVICE_IMAGES } from "@/constants";
import ServiceCardImage from "@/components/home/ServiceCardImage";

export default function Services() {
  return (
    <section id="services" className="services-section relative py-28 sm:py-32">
      <div className="services-section-glow pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="services-heading font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            Services We Cover
          </h2>
          <div className="services-heading-accent mx-auto mt-5" aria-hidden />
          <p className="services-subtitle mt-6 text-sm leading-relaxed sm:text-base">
            Premium leads across all interior design categories
          </p>
        </div>

        <div className="mt-16 grid gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-8">
          {SERVICES.map((service) => (
            <article
              key={service}
              className="service-card group flex h-full flex-col overflow-hidden"
            >
              <div className="service-card-image relative h-52 overflow-hidden sm:h-56">
                <ServiceCardImage
                  src={SERVICE_IMAGES[service] ?? SERVICE_IMAGES["Full Home"]}
                  alt={service}
                  className="service-card-img h-full w-full object-cover"
                />
                <div className="service-card-image-overlay absolute inset-0" />
              </div>

              <div className="service-card-content flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                  {service}
                </h3>
                <p className="service-card-desc mt-3 flex-1 text-sm leading-relaxed sm:text-[0.9375rem]">
                  Verified clients looking for {service.toLowerCase()} design
                  services
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

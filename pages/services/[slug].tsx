import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { getServiceBySlug, servicesData, type ServiceItem } from "@/data/services-data";

type Props = {
  service: ServiceItem;
};

const ServiceDetailPage: NextPage<Props> = ({ service }) => {
  return (
    <main className="bg-[#F4F4F7] text-[#2F3540]">
      <section className="relative min-h-[85vh] overflow-hidden">
        <Image
          src={service.heroImage}
          alt={service.heroTitle}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 flex min-h-[85vh] items-center justify-center px-6 text-center">
          <div className="max-w-5xl">
            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl">
              {service.heroTitle}
            </h1>
            <p className="mt-5 text-xl text-white/95 sm:text-2xl md:text-3xl">
              {service.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/services"
            className="inline-flex items-center text-sm uppercase tracking-[0.16em] text-[#2F3540] transition hover:text-[#67d7cb]"
          >
            ← Back to Services
          </Link>
        </div>
      </section>

      {service.intro && (
        <section className="px-6 pb-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-8 h-[3px] w-24 bg-[#9FE0DB]" />
            <p className="text-2xl leading-[1.5] text-[#3B414A] sm:text-3xl md:text-4xl">
              {service.intro}
            </p>
          </div>
        </section>
      )}

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto space-y-24 max-w-7xl">
          {service.sections.map((section, index) => {
            const reverse = index % 2 === 1;

            return (
              <div
                key={`${service.slug}-${index}`}
                className={`grid items-start gap-12 lg:grid-cols-2 ${
                  reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
                }`}
              >
                <div className="space-y-6">
                  {section.title && (
                    <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                      {section.title}
                    </h2>
                  )}

                  {section.text?.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-lg leading-9 text-[#535862] sm:text-[20px]"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets && (
                    <ul className="space-y-4 pt-2 text-lg leading-8 text-[#535862]">
                      {section.bullets.map((bullet, bIndex) => (
                        <li key={bIndex}>• {bullet}</li>
                      ))}
                    </ul>
                  )}

                  {section.ctaText && section.ctaHref && (
                    <Link
                      href={section.ctaHref}
                      className="inline-flex flex-col pt-4 text-2xl font-medium text-[#2F3540]"
                    >
                      <span>{section.ctaText}</span>
                      <span className="mt-2 h-[2px] w-[120px] bg-[#9FE0DB]" />
                    </Link>
                  )}
                </div>

                <div>
                  {section.video ? (
                    <div className="overflow-hidden">
                      <video
                        controls
                        playsInline
                        className="h-auto w-full object-cover"
                      >
                        <source src={section.video} />
                      </video>
                    </div>
                  ) : section.image ? (
                    <div className="relative min-h-[420px] overflow-hidden sm:min-h-[520px]">
                      <Image
                        src={section.image}
                        alt={section.title || service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: servicesData.map((service) => ({
      params: { slug: service.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = String(params?.slug || "");
  const service = getServiceBySlug(slug);

  if (!service) {
    return { notFound: true };
  }

  return {
    props: {
      service,
    },
  };
};

export default ServiceDetailPage;
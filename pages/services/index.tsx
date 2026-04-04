import Image from "next/image";
import Link from "next/link";
import { servicesData } from "@/data/services-data";

export default function ServicesPage() {
  return (
    <main className="bg-white text-[#2F3540]">
      <section className="relative min-h-screen overflow-hidden">
        <Image
          src="/assets/images/home.jpg"
          alt="Above and Beyond"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center">
          <div className="max-w-5xl">
            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Above &amp; Beyond
            </h1>
            <p className="mt-5 text-xl text-white/95 sm:text-2xl md:text-3xl">
              Setting the New Standard
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#F4F4F7] px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-8 h-[3px] w-24 bg-[#9FE0DB]" />
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Real Estate. Redefined.
          </h2>
          <p className="mt-8 text-lg leading-9 text-[#535862] sm:text-[20px]">
            Our modern, tailor-made approach real estate is based on three
            fundamentals: the relationships we have, the advanced technology we
            use, and the high-end production values we apply to the marketing
            of our properties. Selling no one does it the way we do and our
            results speak for themselves. Ensure your property attracts the most
            discerning buyers worldwide by investing in our pioneering marketing
            strategies and the global exposure of our trusted Advisors. As the
            Most Influential Real Estate Firm Marketing &amp; Selling Homes, we
            guarantee unparalleled experience with our expertise.
          </p>
        </div>

        <div className="mx-auto mt-20 grid max-w-7xl gap-8 md:grid-cols-2 xl:grid-cols-3">
          {servicesData.map((service) => (
            <article
              key={service.slug}
              className="group relative h-[460px] overflow-hidden bg-black"
            >
              <Image
                src={service.coverImage}
                alt={service.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-110 group-hover:opacity-35"
              />

              <div className="absolute inset-0 bg-black/20 transition duration-500 group-hover:bg-black/60" />

              <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 sm:p-10">
                <div className="transition duration-500 group-hover:-translate-y-2">
                  <h3 className="text-3xl font-semibold text-white sm:text-4xl">
                    {service.title}
                  </h3>
                  <div className="mt-4 h-[2px] w-[95px] bg-[#8CE2DB]" />
                </div>

                <div className="mt-6 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-[260px] group-hover:opacity-100">
                  <p className="text-base leading-8 text-white/95">
                    {service.shortDescription}
                  </p>

                  <Link
                    href={`/services/${service.slug}`}
                    className="mt-6 inline-flex items-center rounded-sm border border-white px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
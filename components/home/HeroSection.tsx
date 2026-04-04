
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type QuickLink = {
  name: string;
  href: string;
};

type HeroSectionProps = {
  headline: string;
  subheadline: string;
  quickLinks?: QuickLink[];
  overlayClassName?: string;
};

const DEFAULT_QUICK_LINKS: QuickLink[] = [
  { name: "Properties", href: "/properties" },
  { name: "Team", href: "/team" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact_us" },
];

export default function HeroSection({
  headline,
  subheadline,
  quickLinks = DEFAULT_QUICK_LINKS,
  overlayClassName = "bg-black/45",
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/assets/BOSCO.webm" type="video/webm" />
        <source src="/assets/BOSCO.mp4" type="video/mp4" />
      </video>

      <div className={`absolute inset-0 ${overlayClassName}`} />

      <div className="relative z-20 flex min-h-screen items-center justify-center px-4 pt-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto flex w-full max-w-6xl flex-col items-center text-center"
        >
          <h1 className="max-w-5xl text-white text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {headline}
          </h1>

          <p className="mt-4 max-w-3xl text-white/95 text-lg sm:text-2xl md:text-3xl">
            {subheadline}
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-12">
            {quickLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group inline-flex flex-col items-center text-white text-xl font-medium sm:text-2xl"
              >
                <span>{item.name}</span>
                <span className="mt-2 h-[2px] w-full min-w-[90px] origin-center bg-[#7FE7D8] transition-transform duration-300 group-hover:scale-x-110" />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
import Head from "next/head";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  FiArrowRight,
  FiClock,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const launchDate = new Date("2026-06-01T00:00:00");

function getTimeLeft(targetDate: Date): TimeLeft {
  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

export default function HotelsManagementComingSoonPage() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft(launchDate));

    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(launchDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const stats = useMemo(
    () => [
      { label: "Days", value: String(timeLeft.days).padStart(2, "0") },
      { label: "Hours", value: String(timeLeft.hours).padStart(2, "0") },
      { label: "Minutes", value: String(timeLeft.minutes).padStart(2, "0") },
      { label: "Seconds", value: String(timeLeft.seconds).padStart(2, "0") },
    ],
    [timeLeft]
  );

  return (
    <>
      <Head>
        <title>Hotels Management | Coming Soon</title>
      </Head>

      <main className="relative min-h-screen overflow-hidden bg-[#0b1220] text-white">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/assets/images/home.jpg')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#071019]/95 via-[#0d1726]/88 to-[#132033]/95" />
        </div>

        {/* Glow */}
        <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-[#7FE7D8]/10 blur-3xl" />
        <div className="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

        {/* Content */}
        <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-12">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            
            {/* LEFT SIDE */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#7FE7D8]/30 bg-[#7FE7D8]/10 px-4 py-2 text-sm text-[#8ff3e5]">
                <FiClock />
                <span>Coming Soon</span>
              </div>

              <h1 className="mt-6 text-5xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
                Hotels Management
              </h1>

              <p className="mt-6 text-lg text-white/70 sm:text-xl">
                A new standard for luxury hospitality operations, guest
                experience, and performance visibility.
              </p>

              {/* COUNTDOWN */}
              <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
                {(mounted
                  ? stats
                  : [
                      { label: "Days", value: "--" },
                      { label: "Hours", value: "--" },
                      { label: "Minutes", value: "--" },
                      { label: "Seconds", value: "--" },
                    ]
                ).map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="text-3xl font-semibold">
                      {item.value}
                    </div>
                    <div className="text-sm text-white/50">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-10">
                <a
                  href="/contact_us"
                  className="inline-flex items-center gap-3 rounded-full bg-[#7FE7D8] px-6 py-3 text-sm font-semibold text-black hover:scale-[1.03]"
                >
                  Contact Us
                  <FiArrowRight />
                </a>
              </div>
            </motion.div>

            {/* RIGHT SIDE CARD */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <h2 className="text-2xl font-semibold">
                  Hospitality Excellence
                </h2>

                <div className="mt-6 space-y-4">
                  <FeatureRow
                    title="Operations Control"
                    description="Manage hotel workflows efficiently."
                  />
                  <FeatureRow
                    title="Guest Experience"
                    description="Deliver world-class stays."
                  />
                  <FeatureRow
                    title="Performance Visibility"
                    description="Track revenue and insights."
                  />
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <ContactMini
                    icon={<FiMail />}
                    label="Email"
                    value="info@ddreglobal.com"
                  />
                  <ContactMini
                    icon={<FiPhone />}
                    label="Call"
                    value="+250 078 457 8531"
                  />
                  <ContactMini
                    icon={<FiMapPin />}
                    label="Location"
                    value="Kigali, Rwanda"
                  />
                  <ContactMini
                    icon={<FiClock />}
                    label="Status"
                    value="Launching Soon"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}

function FeatureRow({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="font-medium">{title}</div>
      <p className="text-sm text-white/60 mt-1">{description}</p>
    </div>
  );
}

function ContactMini({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 text-[#8ff3e5] text-sm">
        {icon}
        {label}
      </div>
      <p className="mt-2 text-sm text-white/80">{value}</p>
    </div>
  );
}
"use client";
import { HiOutlineArrowTrendingUp } from "react-icons/hi2";
import type { SerializableAppUser } from "@/lib/auth-guards";
import MiniHeroStat from "./MiniHeroStat";
import { heroStats } from "@/data/admin-dashboard";
import { use } from "react";

type DashboardHeroProps = {
  currentUser: SerializableAppUser;
};

export default function DashboardHero({
  currentUser,
}: DashboardHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-black/5 bg-gradient-to-br from-black via-[#111111] to-[#1C1C1C] text-white shadow-[0_20px_70px_rgba(0,0,0,0.18)]">
      <div className="absolute top-0 right-0 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 left-10 h-40 w-40 rounded-full bg-white/5 blur-2xl" />

      <div className="relative p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/90">
              <HiOutlineArrowTrendingUp className="text-base" />
              Modern Admin Workspace
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Admin Dashboard
            </h1>
             <h3 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {currentUser.name}.
            </h3>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              Visualize your Property Contents
            </p>
          </div>

          <div className="grid min-w-full grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[420px]">
            {heroStats.map((item) => (
              <MiniHeroStat
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
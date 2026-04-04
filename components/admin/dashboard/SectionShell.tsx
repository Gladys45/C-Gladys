import type { ReactNode } from "react";
import { HiOutlineBellAlert, HiOutlineUserCircle } from "react-icons/hi2";

type SectionShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function SectionShell({
  title,
  subtitle,
  children,
}: SectionShellProps) {
  return (
    <section className="rounded-[26px] border border-neutral-200 bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.05)] sm:p-6">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-xl font-bold text-black sm:text-2xl">{title}</h3>
          <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3 text-neutral-500">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-200 transition hover:border-black hover:text-black"
          >
            <HiOutlineBellAlert className="text-xl" />
          </button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-200 transition hover:border-black hover:text-black"
          >
            <HiOutlineUserCircle className="text-xl" />
          </button>
        </div>
      </div>

      {children}
    </section>
  );
}
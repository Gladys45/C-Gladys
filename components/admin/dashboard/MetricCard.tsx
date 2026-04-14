"use client";
import classNames from "classnames";

type MetricCardProps = {
  title: string;
  value: string;
  hint: string;
  trend: string;
};

export default function MetricCard({
  title,
  value,
  hint,
  trend,
}: MetricCardProps) {
  const positive = !trend.startsWith("-");

  return (
    <div className="rounded-[24px] border border-neutral-200 bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.05)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-neutral-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold tracking-tight text-black">{value}</h3>
          <p className="mt-2 text-sm text-neutral-500">{hint}</p>
        </div>

        <span
          className={classNames(
            "rounded-full px-3 py-1 text-xs font-semibold",
            positive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          )}
        >
          {trend}
        </span>
      </div>
    </div>
  );
}
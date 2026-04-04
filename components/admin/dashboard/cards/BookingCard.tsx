import { HiOutlineCalendarDays } from "react-icons/hi2";
import StatusBadge from "../StatusBadge";

type BookingCardProps = {
  title: string;
  client: string;
  status: string;
  date: string;
  extra: string;
};

export default function BookingCard({
  title,
  client,
  status,
  date,
  extra,
}: BookingCardProps) {
  return (
    <div className="rounded-[24px] border border-neutral-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="rounded-2xl bg-neutral-100 p-3">
          <HiOutlineCalendarDays className="text-2xl text-black" />
        </div>
        <StatusBadge label={status} />
      </div>

      <h4 className="mt-4 text-lg font-semibold text-black">{title}</h4>
      <p className="mt-1 text-sm text-neutral-500">{client}</p>
      <p className="mt-3 text-sm text-neutral-700">{extra}</p>

      <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
        <span className="text-sm text-neutral-500">Scheduled</span>
        <span className="text-sm font-semibold text-black">{date}</span>
      </div>
    </div>
  );
}
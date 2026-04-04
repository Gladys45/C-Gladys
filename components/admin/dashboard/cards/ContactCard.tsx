import { HiOutlineInbox } from "react-icons/hi2";
import StatusBadge from "../StatusBadge";

type ContactCardProps = {
  name: string;
  subject: string;
  status: string;
  email: string;
};

export default function ContactCard({
  name,
  subject,
  status,
  email,
}: ContactCardProps) {
  return (
    <div className="rounded-[24px] border border-neutral-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="rounded-2xl bg-neutral-100 p-3">
          <HiOutlineInbox className="text-2xl text-black" />
        </div>
        <StatusBadge label={status} />
      </div>

      <h4 className="mt-4 text-lg font-semibold text-black">{name}</h4>
      <p className="mt-1 text-sm text-neutral-500">{email}</p>
      <p className="mt-4 text-sm leading-6 text-neutral-700">{subject}</p>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-semibold text-black transition hover:border-black"
        >
          Open
        </button>
        <button
          type="button"
          className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Reply
        </button>
      </div>
    </div>
  );
}
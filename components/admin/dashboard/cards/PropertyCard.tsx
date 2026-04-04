// import { HiOutlineHomeModern } from "react-icons/hi2";
// import StatusBadge from "../StatusBadge";

// type PropertyCardProps = {
//   title: string;
//   status: string;
//   type: string;
//   location: string;
//   price: string;
// };

// export default function PropertyCard({
//   title,
//   status,
//   type,
//   location,
//   price,
// }: PropertyCardProps) {
//   return (
//     <div className="group rounded-[24px] border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
//       <div className="flex items-start justify-between gap-3">
//         <div className="rounded-2xl bg-neutral-100 p-3">
//           <HiOutlineHomeModern className="text-2xl text-black" />
//         </div>
//         <StatusBadge label={status} />
//       </div>

//       <h4 className="mt-4 text-lg font-semibold text-black">{title}</h4>
//       <p className="mt-1 text-sm text-neutral-500">
//         {type} • {location}
//       </p>

//       <div className="mt-5 flex items-center justify-between">
//         <span className="text-sm text-neutral-500">Expected Price</span>
//         <span className="text-lg font-bold text-black">{price}</span>
//       </div>

//       <div className="mt-5 flex items-center gap-3">
//         <button
//           type="button"
//           className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-semibold text-black transition hover:border-black"
//         >
//           View
//         </button>
//         <button
//           type="button"
//           className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
//         >
//           Edit
//         </button>
//       </div>
//     </div>
//   );
// }



import Link from "next/link";
import { HiOutlineHomeModern } from "react-icons/hi2";
import StatusBadge from "../StatusBadge";

type PropertyCardProps = {
  id: string;
  title: string;
  status: string;
  type: string;
  location: string;
  price: string;
};

export default function PropertyCard({
  id,
  title,
  status,
  type,
  location,
  price,
}: PropertyCardProps) {
  return (
    <div className="group rounded-[24px] border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="rounded-2xl bg-neutral-100 p-3">
          <HiOutlineHomeModern className="text-2xl text-black" />
        </div>
        <StatusBadge label={status} />
      </div>

      <h4 className="mt-4 text-lg font-semibold text-black">{title}</h4>
      <p className="mt-1 text-sm text-neutral-500">
        {type} • {location}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm text-neutral-500">Expected Price</span>
        <span className="text-lg font-bold text-black">{price}</span>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <Link
          href={`/admin/properties/${id}`}
          className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-semibold text-black transition hover:border-black"
        >
          View
        </Link>

        <Link
          href={`/admin/properties/${id}/edit`}
          className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}
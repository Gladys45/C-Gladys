// import {
//   HiOutlineMagnifyingGlass,
//   HiOutlineAdjustmentsHorizontal,
//   HiOutlinePlus,
// } from "react-icons/hi2";
// import type { ViewMode } from "@/types/admin-dashboard";
// import ViewSwitcher from "./ViewSwitcher";

// type DashboardTopbarProps = {
//   title: string;
//   description: string;
//   viewMode: ViewMode;
//   onChangeView: (mode: ViewMode) => void;
//   searchValue: string;
//   onChangeSearch: (value: string) => void;
// };

// export default function DashboardTopbar({
//   title,
//   description,
//   viewMode,
//   onChangeView,
//   searchValue,
//   onChangeSearch,
// }: DashboardTopbarProps) {
//   return (
//     <div className="rounded-[26px] border border-neutral-200 bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.05)]">
//       <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
//         <div>
//           <h2 className="text-2xl font-bold text-black sm:text-3xl">{title}</h2>
//           <p className="mt-1 text-sm text-neutral-500">{description}</p>
//         </div>

//         <div className="flex flex-col gap-3 md:flex-row md:items-center">
//           <div className="relative min-w-[260px]">
//             <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-neutral-400" />
//             <input
//               value={searchValue}
//               onChange={(e) => onChangeSearch(e.target.value)}
//               placeholder={`Search ${title.toLowerCase()}...`}
//               className="h-12 w-full rounded-2xl border border-neutral-200 bg-[#FAFAFA] pl-11 pr-4 text-sm outline-none transition focus:border-black"
//             />
//           </div>

//           <ViewSwitcher viewMode={viewMode} onChangeView={onChangeView} />

//           <button
//             type="button"
//             className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 text-sm font-semibold text-black transition hover:border-black"
//           >
//             <HiOutlineAdjustmentsHorizontal className="text-lg" />
//             Filters
//           </button>

//           <button
//             type="button"
//             className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-black px-5 text-sm font-semibold text-white transition hover:opacity-90"
//           >
//             <HiOutlinePlus className="text-lg" />
//             New Item
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import {
  HiOutlineMagnifyingGlass,
  HiOutlineAdjustmentsHorizontal,
  HiOutlinePlus,
} from "react-icons/hi2";
import type { ViewMode } from "@/types/admin-dashboard";
import ViewSwitcher from "./ViewSwitcher";

type DashboardTopbarProps = {
  title: string;
  description: string;
  viewMode: ViewMode;
  onChangeView: (mode: ViewMode) => void;
  searchValue: string;
  onChangeSearch: (value: string) => void;
  onCreateNew?: () => void;
  createLabel?: string;
};

export default function DashboardTopbar({
  title,
  description,
  viewMode,
  onChangeView,
  searchValue,
  onChangeSearch,
  onCreateNew,
  createLabel = "New Item",
}: DashboardTopbarProps) {
  return (
    <div className="rounded-[26px] border border-neutral-200 bg-white p-[20px] shadow-[0_10px_35px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-black sm:text-3xl">{title}</h2>
          <p className="mt-1 text-sm text-neutral-500">{description}</p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
          <div className="relative min-w-[260px] flex-1">
            <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-neutral-400" />
            <input
              value={searchValue}
              onChange={(e) => onChangeSearch(e.target.value)}
              placeholder={`Search ${title.toLowerCase()}...`}
              className="h-12 w-full rounded-2xl border border-neutral-200 bg-[#FAFAFA] pl-11 pr-4 text-sm outline-none transition focus:border-black"
            />
          </div>

          <ViewSwitcher viewMode={viewMode} onChangeView={onChangeView} />

          <button
            type="button"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 text-sm font-semibold text-black transition hover:border-black"
          >
            <HiOutlineAdjustmentsHorizontal className="text-lg" />
            Filters
          </button>

          <button
            type="button"
            onClick={onCreateNew}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-black px-5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <HiOutlinePlus className="text-lg" />
            {createLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
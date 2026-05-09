// import classNames from "classnames";
// import {
//   HiOutlineSquares2X2,
//   HiOutlineListBullet,
//   HiOutlineViewColumns,
// } from "react-icons/hi2";
// import type { ViewMode } from "@/types/admin-dashboard";

// type ViewSwitcherProps = {
//   viewMode: ViewMode;
//   onChangeView: (mode: ViewMode) => void;
// };

// export default function ViewSwitcher({
//   viewMode,
//   onChangeView,
// }: ViewSwitcherProps) {
//   const items: {
//     key: ViewMode;
//     label: string;
//     icon: React.ReactNode;
//   }[] = [
//     {
//       key: "grid",
//       label: "Grid",
//       icon: HiOutlineSquares2X2,
//     },
//     {
//       key: "list",
//       label: "List",
//       icon: HiOutlineListBullet,
//     },
//     {
//       key: "kanban",
//       label: "Kanban",
//       icon: HiOutlineViewColumns,
//     },
//   ];

//   return (
//     <div className="inline-flex items-center rounded-2xl border border-neutral-200 bg-[#FAFAFA] p-1">
//       {items.map((item) => {
//         const active = item.key === viewMode;

//         return (
//           <button
//             key={item.key}
//             type="button"
//             onClick={() => onChangeView(item.key)}
//             className={classNames(
//               "inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold transition",
//               active
//                 ? "bg-black text-white shadow-sm"
//                 : "text-neutral-600 hover:text-black"
//             )}
//           >
//             {item.icon}
//             <span className="hidden sm:inline">{item.label}</span>
//           </button>
//         );
//       })}
//     </div>
//   );
// }



import classNames from "classnames";
import {
  HiOutlineSquares2X2,
  HiOutlineListBullet,
  HiOutlineViewColumns,
} from "react-icons/hi2";

import type { IconType } from "react-icons";
import type { ViewMode } from "@/types/admin-dashboard";

type ViewSwitcherProps = {
  viewMode: ViewMode;
  onChangeView: (mode: ViewMode) => void;
};

type ViewItem = {
  key: ViewMode;
  label: string;
  icon: IconType;
};

const items: ViewItem[] = [
  {
    key: "grid",
    label: "Grid",
    icon: HiOutlineSquares2X2,
  },
  {
    key: "list",
    label: "List",
    icon: HiOutlineListBullet,
  },
  {
    key: "kanban",
    label: "Kanban",
    icon: HiOutlineViewColumns,
  },
];

export default function ViewSwitcher({
  viewMode,
  onChangeView,
}: ViewSwitcherProps) {
  return (
    <div className="inline-flex items-center rounded-2xl border border-neutral-200 bg-[#FAFAFA] p-1">
      {items.map((item) => {
        const active = item.key === viewMode;

        // IMPORTANT
        const Icon = item.icon;

        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onChangeView(item.key)}
            className={classNames(
              "inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold transition",
              active
                ? "bg-black text-white shadow-sm"
                : "text-neutral-600 hover:text-black"
            )}
          >
            <Icon className="text-lg" />

            <span className="hidden sm:inline">
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
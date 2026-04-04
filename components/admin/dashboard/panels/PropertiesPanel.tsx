// import SectionShell from "../SectionShell";
// import KanbanColumns from "../KanbanColumns";
// import PropertyCard from "../cards/PropertyCard";
// import StatusBadge from "../StatusBadge";
// import { propertyItems, propertyKanban } from "@/data/admin-dashboard";
// import type { ViewMode } from "@/types/admin-dashboard";

// type PropertiesPanelProps = {
//   viewMode: ViewMode;
//   searchValue: string;
// };

// export default function PropertiesPanel({
//   viewMode,
//   searchValue,
// }: PropertiesPanelProps) {
//   return (
//     <SectionShell
//       title="Properties Overview"
//       subtitle={`Visual property workspace${searchValue ? ` — searching for "${searchValue}"` : ""}`}
//     >
//       {viewMode === "grid" && (
//         <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
//           {propertyItems.map((item) => (
//             <PropertyCard key={item.id} {...item} />
//           ))}
//         </div>
//       )}

//       {viewMode === "list" && (
//         <div className="overflow-hidden rounded-[24px] border border-neutral-200">
//           <div className="grid grid-cols-5 gap-4 bg-neutral-50 px-5 py-4 text-sm font-semibold text-neutral-600">
//             <span>Title</span>
//             <span>Type</span>
//             <span>Location</span>
//             <span>Status</span>
//             <span>Price</span>
//           </div>

//           <div className="bg-white">
//             {propertyItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="grid grid-cols-5 gap-4 border-t border-neutral-100 px-5 py-4 text-sm text-neutral-700"
//               >
//                 <span className="font-semibold text-black">{item.title}</span>
//                 <span>{item.type}</span>
//                 <span>{item.location}</span>
//                 <span>
//                   <StatusBadge label={item.status} />
//                 </span>
//                 <span>{item.price}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {viewMode === "kanban" && <KanbanColumns columns={propertyKanban} />}
//     </SectionShell>
//   );
// }



import SectionShell from "../SectionShell";
import KanbanColumns from "../KanbanColumns";
import PropertyCard from "../cards/PropertyCard";
import StatusBadge from "../StatusBadge";
import type { PropertyItem, KanbanColumn, ViewMode } from "@/types/admin-dashboard";

type PropertiesPanelProps = {
  viewMode: ViewMode;
  searchValue: string;
  propertyItems: PropertyItem[];
  propertyKanban: KanbanColumn[];
};

export default function PropertiesPanel({
  viewMode,
  searchValue,
  propertyItems,
  propertyKanban,
}: PropertiesPanelProps) {
  const normalizedSearch = searchValue.trim().toLowerCase();

  const filteredItems = propertyItems.filter((item) => {
    if (!normalizedSearch) return true;

    return (
      item.title.toLowerCase().includes(normalizedSearch) ||
      item.type.toLowerCase().includes(normalizedSearch) ||
      item.location.toLowerCase().includes(normalizedSearch) ||
      item.status.toLowerCase().includes(normalizedSearch) ||
      item.price.toLowerCase().includes(normalizedSearch)
    );
  });

  return (
    <SectionShell
      title="Properties Overview"
      subtitle={`Visual property workspace${
        searchValue ? ` — searching for "${searchValue}"` : ""
      }`}
    >
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
          {filteredItems.map((item) => (
            <PropertyCard key={item.id} {...item} />
          ))}
        </div>
      )}

      {viewMode === "list" && (
        <div className="overflow-hidden rounded-[24px] border border-neutral-200">
          <div className="grid grid-cols-5 gap-4 bg-neutral-50 px-5 py-4 text-sm font-semibold text-neutral-600">
            <span>Title</span>
            <span>Type</span>
            <span>Location</span>
            <span>Status</span>
            <span>Price</span>
          </div>

          <div className="bg-white">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-5 gap-4 border-t border-neutral-100 px-5 py-4 text-sm text-neutral-700"
              >
                <span className="font-semibold text-black">{item.title}</span>
                <span>{item.type}</span>
                <span>{item.location}</span>
                <span>
                  <StatusBadge label={item.status} />
                </span>
                <span>{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {viewMode === "kanban" && <KanbanColumns columns={propertyKanban} />}
    </SectionShell>
  );
}
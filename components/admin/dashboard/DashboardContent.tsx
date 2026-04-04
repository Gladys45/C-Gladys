// import type {
//   DashboardTabKey,
//   ViewMode,
// } from "@/types/admin-dashboard";
// import PropertiesPanel from "./panels/PropertiesPanel";
// import BookingsPanel from "./panels/BookingsPanel";
// import ContactsPanel from "./panels/ContactsPanel";

// type DashboardContentProps = {
//   activeTab: DashboardTabKey;
//   viewMode: ViewMode;
//   searchValue: string;
// };

// export default function DashboardContent({
//   activeTab,
//   viewMode,
//   searchValue,
// }: DashboardContentProps) {
//   if (activeTab === "properties") {
//     return (
//       <PropertiesPanel
//         viewMode={viewMode}
//         searchValue={searchValue}
//       />
//     );
//   }

//   if (activeTab === "bookings") {
//     return (
//       <BookingsPanel
//         viewMode={viewMode}
//         searchValue={searchValue}
//       />
//     );
//   }

//   return (
//     <ContactsPanel
//       viewMode={viewMode}
//       searchValue={searchValue}
//     />
//   );
// }


import type {
  DashboardTabKey,
  ViewMode,
  PropertyItem,
  KanbanColumn,
} from "@/types/admin-dashboard";
import PropertiesPanel from "./panels/PropertiesPanel";
import BookingsPanel from "./panels/BookingsPanel";
import ContactsPanel from "./panels/ContactsPanel";

type DashboardContentProps = {
  activeTab: DashboardTabKey;
  viewMode: ViewMode;
  searchValue: string;
  propertyItems: PropertyItem[];
  propertyKanban: KanbanColumn[];
};

export default function DashboardContent({
  activeTab,
  viewMode,
  searchValue,
  propertyItems,
  propertyKanban,
}: DashboardContentProps) {
  if (activeTab === "properties") {
    return (
      <PropertiesPanel
        viewMode={viewMode}
        searchValue={searchValue}
        propertyItems={propertyItems}
        propertyKanban={propertyKanban}
      />
    );
  }

  if (activeTab === "bookings") {
    return (
      <BookingsPanel
        viewMode={viewMode}
        searchValue={searchValue}
      />
    );
  }

  return (
    <ContactsPanel
      viewMode={viewMode}
      searchValue={searchValue}
    />
  );
}
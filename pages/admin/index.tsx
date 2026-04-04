

// import type { GetServerSideProps, NextPage } from "next";
// import { requireAdminPage, type SerializableAppUser } from "@/lib/auth-guards";
// import { useMemo, useState } from "react";
// import classNames from "classnames";
// import {
//   HiOutlineHomeModern,
//   HiOutlineCalendarDays,
//   HiOutlineInbox,
//   HiOutlineSquares2X2,
//   HiOutlineListBullet,
//   HiOutlineViewColumns,
//   HiOutlineMagnifyingGlass,
//   HiOutlineBellAlert,
//   HiOutlineUserCircle,
//   HiOutlinePlus,
//   HiOutlineAdjustmentsHorizontal,
//   HiOutlineArrowTrendingUp,
// } from "react-icons/hi2";

// type Props = {
//   currentUser: SerializableAppUser;
// };

// type DashboardTabKey = "properties" | "bookings" | "contacts";
// type ViewMode = "grid" | "list" | "kanban";

// type DashboardTab = {
//   key: DashboardTabKey;
//   label: string;
//   description: string;
//   icon: React.ReactNode;
//   count: string;
// };

// const AdminDashboardPage: NextPage<Props> = ({ currentUser }) => {
//   const [activeTab, setActiveTab] = useState<DashboardTabKey>("properties");
//   const [viewMode, setViewMode] = useState<ViewMode>("grid");
//   const [searchValue, setSearchValue] = useState("");

//   const tabs: DashboardTab[] = useMemo(
//     () => [
//       {
//         key: "properties",
//         label: "Properties",
//         description: "Manage listings, statuses, and publishing workflow.",
//         icon: <HiOutlineHomeModern className="text-[20px]" />,
//         count: "24",
//       },
//       {
//         key: "bookings",
//         label: "Bookings",
//         description: "Track requests, approvals, and scheduling activities.",
//         icon: <HiOutlineCalendarDays className="text-[20px]" />,
//         count: "18",
//       },
//       {
//         key: "contacts",
//         label: "Contacts",
//         description: "Review leads, inquiries, and communication pipeline.",
//         icon: <HiOutlineInbox className="text-[20px]" />,
//         count: "31",
//       },
//     ],
//     []
//   );

//   const activeTabMeta = tabs.find((tab) => tab.key === activeTab);

//   return (
//     <main className="min-h-screen bg-[#F6F7FB] pt-28 px-4 pb-10">
//       <div className="max-w-7xl mx-auto">
//         <DashboardHero currentUser={currentUser} />

//         <div className="mt-8 grid grid-cols-1 xl:grid-cols-[280px_minmax(0,1fr)] gap-6">
//           <DashboardSidebar
//             tabs={tabs}
//             activeTab={activeTab}
//             onChangeTab={setActiveTab}
//           />

//           <section className="min-w-0">
//             <DashboardTopbar
//               title={activeTabMeta?.label ?? "Dashboard"}
//               description={activeTabMeta?.description ?? ""}
//               viewMode={viewMode}
//               onChangeView={setViewMode}
//               searchValue={searchValue}
//               onChangeSearch={setSearchValue}
//             />

//             <div className="mt-6 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
//               <MetricCard
//                 title="Total Items"
//                 value={activeTab === "properties" ? "124" : activeTab === "bookings" ? "86" : "219"}
//                 hint="All records in this section"
//                 trend="+12.4%"
//               />
//               <MetricCard
//                 title="Active"
//                 value={activeTab === "properties" ? "87" : activeTab === "bookings" ? "24" : "140"}
//                 hint="Currently active or open"
//                 trend="+8.1%"
//               />
//               <MetricCard
//                 title="Pending"
//                 value={activeTab === "properties" ? "16" : activeTab === "bookings" ? "42" : "28"}
//                 hint="Need attention or approval"
//                 trend="-2.3%"
//               />
//               <MetricCard
//                 title="Completed"
//                 value={activeTab === "properties" ? "21" : activeTab === "bookings" ? "20" : "51"}
//                 hint="Already finalized"
//                 trend="+4.7%"
//               />
//             </div>

//             <div className="mt-6">
//               <DashboardContent
//                 activeTab={activeTab}
//                 viewMode={viewMode}
//                 searchValue={searchValue}
//               />
//             </div>
//           </section>
//         </div>
//       </div>
//     </main>
//   );
// };

// type DashboardHeroProps = {
//   currentUser: SerializableAppUser;
// };

// function DashboardHero({ currentUser }: DashboardHeroProps) {
//   return (
//     <section className="relative overflow-hidden rounded-[28px] border border-black/5 bg-gradient-to-br from-black via-[#111111] to-[#1C1C1C] text-white shadow-[0_20px_70px_rgba(0,0,0,0.18)]">
//       <div className="absolute top-0 right-0 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
//       <div className="absolute bottom-0 left-10 h-40 w-40 rounded-full bg-white/5 blur-2xl" />

//       <div className="relative p-6 sm:p-8 lg:p-10">
//         <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
//           <div className="max-w-3xl">
//             <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/90">
//               <HiOutlineArrowTrendingUp className="text-base" />
//               Modern Admin Workspace
//             </div>

//             <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
//               Admin Dashboard
//             </h1>

//             <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/75 leading-7">
//               Welcome back, {currentUser.name}. This interface is prepared for advanced
//               property management, booking workflows, contact handling, and future
//               visualizations including grid, list, and Kanban views.
//             </p>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 min-w-full lg:min-w-[420px]">
//             <MiniHeroStat label="Properties" value="124" />
//             <MiniHeroStat label="Bookings" value="86" />
//             <MiniHeroStat label="Contacts" value="219" />
//             <MiniHeroStat label="Alerts" value="07" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function MiniHeroStat({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm">
//       <p className="text-xs text-white/60">{label}</p>
//       <p className="mt-1 text-2xl font-bold">{value}</p>
//     </div>
//   );
// }

// type DashboardSidebarProps = {
//   tabs: DashboardTab[];
//   activeTab: DashboardTabKey;
//   onChangeTab: (tab: DashboardTabKey) => void;
// };

// function DashboardSidebar({
//   tabs,
//   activeTab,
//   onChangeTab,
// }: DashboardSidebarProps) {
//   return (
//     <aside className="rounded-[26px] border border-neutral-200 bg-white p-4 shadow-[0_10px_35px_rgba(0,0,0,0.05)]">
//       <div className="px-2 pb-4 border-b border-neutral-100">
//         <h2 className="text-lg font-semibold text-black">Workspace</h2>
//         <p className="mt-1 text-sm text-neutral-500">
//           Switch between dashboard sections.
//         </p>
//       </div>

//       <div className="mt-4 flex flex-col gap-2">
//         {tabs.map((tab) => {
//           const active = activeTab === tab.key;

//           return (
//             <button
//               key={tab.key}
//               type="button"
//               onClick={() => onChangeTab(tab.key)}
//               className={classNames(
//                 "w-full rounded-2xl border px-4 py-4 text-left transition-all duration-200",
//                 active
//                   ? "border-black bg-black text-white shadow-lg"
//                   : "border-neutral-200 bg-white text-black hover:border-neutral-300 hover:bg-neutral-50"
//               )}
//             >
//               <div className="flex items-start justify-between gap-3">
//                 <div className="flex items-start gap-3">
//                   <div
//                     className={classNames(
//                       "mt-0.5 rounded-xl p-2",
//                       active ? "bg-white/10" : "bg-neutral-100"
//                     )}
//                   >
//                     {tab.icon}
//                   </div>

//                   <div>
//                     <h3 className="font-semibold">{tab.label}</h3>
//                     <p
//                       className={classNames(
//                         "mt-1 text-xs leading-5",
//                         active ? "text-white/70" : "text-neutral-500"
//                       )}
//                     >
//                       {tab.description}
//                     </p>
//                   </div>
//                 </div>

//                 <span
//                   className={classNames(
//                     "rounded-full px-2.5 py-1 text-xs font-semibold",
//                     active
//                       ? "bg-white/10 text-white"
//                       : "bg-neutral-100 text-neutral-700"
//                   )}
//                 >
//                   {tab.count}
//                 </span>
//               </div>
//             </button>
//           );
//         })}
//       </div>

//       <div className="mt-6 rounded-2xl bg-[#F8F8F8] p-4">
//         <p className="text-sm font-semibold text-black">Next upgrades</p>
//         <ul className="mt-3 space-y-2 text-sm text-neutral-600">
//           <li>• Kanban workflow boards</li>
//           <li>• Filter drawer</li>
//           <li>• Bulk actions toolbar</li>
//           <li>• Analytics widgets</li>
//         </ul>
//       </div>
//     </aside>
//   );
// }

// type DashboardTopbarProps = {
//   title: string;
//   description: string;
//   viewMode: ViewMode;
//   onChangeView: (mode: ViewMode) => void;
//   searchValue: string;
//   onChangeSearch: (value: string) => void;
// };

// function DashboardTopbar({
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
//           <h2 className="text-2xl sm:text-3xl font-bold text-black">{title}</h2>
//           <p className="mt-1 text-sm text-neutral-500">{description}</p>
//         </div>

//         <div className="flex flex-col md:flex-row gap-3 md:items-center">
//           <div className="relative min-w-[260px]">
//             <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-lg" />
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

// function ViewSwitcher({
//   viewMode,
//   onChangeView,
// }: {
//   viewMode: ViewMode;
//   onChangeView: (mode: ViewMode) => void;
// }) {
//   const items: { key: ViewMode; label: string; icon: React.ReactNode }[] = [
//     { key: "grid", label: "Grid", icon: <HiOutlineSquares2X2 className="text-lg" /> },
//     { key: "list", label: "List", icon: <HiOutlineListBullet className="text-lg" /> },
//     { key: "kanban", label: "Kanban", icon: <HiOutlineViewColumns className="text-lg" /> },
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

// function MetricCard({
//   title,
//   value,
//   hint,
//   trend,
// }: {
//   title: string;
//   value: string;
//   hint: string;
//   trend: string;
// }) {
//   const positive = !trend.startsWith("-");

//   return (
//     <div className="rounded-[24px] border border-neutral-200 bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.05)]">
//       <div className="flex items-start justify-between gap-4">
//         <div>
//           <p className="text-sm text-neutral-500">{title}</p>
//           <h3 className="mt-2 text-3xl font-bold tracking-tight text-black">{value}</h3>
//           <p className="mt-2 text-sm text-neutral-500">{hint}</p>
//         </div>

//         <span
//           className={classNames(
//             "rounded-full px-3 py-1 text-xs font-semibold",
//             positive
//               ? "bg-green-50 text-green-700"
//               : "bg-red-50 text-red-700"
//           )}
//         >
//           {trend}
//         </span>
//       </div>
//     </div>
//   );
// }

// function DashboardContent({
//   activeTab,
//   viewMode,
//   searchValue,
// }: {
//   activeTab: DashboardTabKey;
//   viewMode: ViewMode;
//   searchValue: string;
// }) {
//   if (activeTab === "properties") {
//     return <PropertiesPanel viewMode={viewMode} searchValue={searchValue} />;
//   }

//   if (activeTab === "bookings") {
//     return <BookingsPanel viewMode={viewMode} searchValue={searchValue} />;
//   }

//   return <ContactsPanel viewMode={viewMode} searchValue={searchValue} />;
// }

// function PropertiesPanel({
//   viewMode,
//   searchValue,
// }: {
//   viewMode: ViewMode;
//   searchValue: string;
// }) {
//   const items = [
//     { id: "PR-001", title: "Kigali Heights Apartment", status: "Published", type: "Apartment", location: "Kigali", price: "$120,000" },
//     { id: "PR-002", title: "Nyarutarama Family Villa", status: "Draft", type: "Villa", location: "Nyarutarama", price: "$310,000" },
//     { id: "PR-003", title: "Kacyiru Office Space", status: "Review", type: "Commercial", location: "Kacyiru", price: "$2,100/mo" },
//     { id: "PR-004", title: "Kimihurura Penthouse", status: "Published", type: "Penthouse", location: "Kimihurura", price: "$450,000" },
//   ];

//   return (
//     <SectionShell
//       title="Properties Overview"
//       subtitle={`Visual property workspace${searchValue ? ` — searching for "${searchValue}"` : ""}`}
//     >
//       {viewMode === "grid" && (
//         <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
//           {items.map((item) => (
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
//             {items.map((item) => (
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

//       {viewMode === "kanban" && (
//         <KanbanColumns
//           columns={[
//             {
//               title: "Draft",
//               items: ["Nyarutarama Family Villa", "Remera Townhouse"],
//             },
//             {
//               title: "Review",
//               items: ["Kacyiru Office Space", "Rebero Residence"],
//             },
//             {
//               title: "Published",
//               items: ["Kigali Heights Apartment", "Kimihurura Penthouse"],
//             },
//           ]}
//         />
//       )}
//     </SectionShell>
//   );
// }

// function BookingsPanel({
//   viewMode,
//   searchValue,
// }: {
//   viewMode: ViewMode;
//   searchValue: string;
// }) {
//   const items = [
//     { id: "BK-1001", title: "Site Visit Request", client: "John Smith", status: "Pending", date: "12 Mar 2026", extra: "Kacyiru Office Space" },
//     { id: "BK-1002", title: "Apartment Viewing", client: "Amina Keza", status: "Confirmed", date: "14 Mar 2026", extra: "Kigali Heights Apartment" },
//     { id: "BK-1003", title: "Villa Consultation", client: "David Lee", status: "Follow-up", date: "16 Mar 2026", extra: "Nyarutarama Family Villa" },
//   ];

//   return (
//     <SectionShell
//       title="Bookings Workspace"
//       subtitle={`Manage booking pipeline${searchValue ? ` — searching for "${searchValue}"` : ""}`}
//     >
//       {viewMode === "grid" && (
//         <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
//           {items.map((item) => (
//             <BookingCard key={item.id} {...item} />
//           ))}
//         </div>
//       )}

//       {viewMode === "list" && (
//         <div className="space-y-3">
//           {items.map((item) => (
//             <div
//               key={item.id}
//               className="rounded-[22px] border border-neutral-200 bg-white p-5 shadow-sm"
//             >
//               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
//                 <div>
//                   <p className="text-lg font-semibold text-black">{item.title}</p>
//                   <p className="mt-1 text-sm text-neutral-500">
//                     {item.client} • {item.extra}
//                   </p>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <StatusBadge label={item.status} />
//                   <span className="text-sm text-neutral-500">{item.date}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {viewMode === "kanban" && (
//         <KanbanColumns
//           columns={[
//             {
//               title: "Pending",
//               items: ["Site Visit Request", "Apartment Viewing Inquiry"],
//             },
//             {
//               title: "Confirmed",
//               items: ["Apartment Viewing", "Client Meeting"],
//             },
//             {
//               title: "Follow-up",
//               items: ["Villa Consultation", "Phone Callback"],
//             },
//           ]}
//         />
//       )}
//     </SectionShell>
//   );
// }

// function ContactsPanel({
//   viewMode,
//   searchValue,
// }: {
//   viewMode: ViewMode;
//   searchValue: string;
// }) {
//   const items = [
//     { id: "CT-001", name: "Alice Uwase", subject: "Interested in apartment pricing", status: "Unread", email: "alice@example.com" },
//     { id: "CT-002", name: "Eric Mugisha", subject: "Need investment consultation", status: "Replied", email: "eric@example.com" },
//     { id: "CT-003", name: "Sandra Bello", subject: "Schedule a viewing", status: "Pending", email: "sandra@example.com" },
//   ];

//   return (
//     <SectionShell
//       title="Contact Center"
//       subtitle={`Handle incoming leads and communications${searchValue ? ` — searching for "${searchValue}"` : ""}`}
//     >
//       {viewMode === "grid" && (
//         <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
//           {items.map((item) => (
//             <ContactCard key={item.id} {...item} />
//           ))}
//         </div>
//       )}

//       {viewMode === "list" && (
//         <div className="space-y-3">
//           {items.map((item) => (
//             <div
//               key={item.id}
//               className="rounded-[22px] border border-neutral-200 bg-white p-5 shadow-sm"
//             >
//               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
//                 <div className="min-w-0">
//                   <p className="font-semibold text-black">{item.name}</p>
//                   <p className="text-sm text-neutral-500">{item.email}</p>
//                   <p className="mt-2 text-sm text-neutral-700">{item.subject}</p>
//                 </div>

//                 <StatusBadge label={item.status} />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {viewMode === "kanban" && (
//         <KanbanColumns
//           columns={[
//             {
//               title: "Unread",
//               items: ["Interested in apartment pricing", "Need full property details"],
//             },
//             {
//               title: "Pending",
//               items: ["Schedule a viewing", "Waiting for quotation"],
//             },
//             {
//               title: "Replied",
//               items: ["Need investment consultation", "Follow-up sent"],
//             },
//           ]}
//         />
//       )}
//     </SectionShell>
//   );
// }

// function SectionShell({
//   title,
//   subtitle,
//   children,
// }: {
//   title: string;
//   subtitle: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <section className="rounded-[26px] border border-neutral-200 bg-white p-5 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.05)]">
//       <div className="mb-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//         <div>
//           <h3 className="text-xl sm:text-2xl font-bold text-black">{title}</h3>
//           <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>
//         </div>

//         <div className="flex items-center gap-3 text-neutral-500">
//           <button
//             type="button"
//             className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-200 hover:border-black hover:text-black transition"
//           >
//             <HiOutlineBellAlert className="text-xl" />
//           </button>
//           <button
//             type="button"
//             className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-200 hover:border-black hover:text-black transition"
//           >
//             <HiOutlineUserCircle className="text-xl" />
//           </button>
//         </div>
//       </div>

//       {children}
//     </section>
//   );
// }

// function PropertyCard({
//   title,
//   status,
//   type,
//   location,
//   price,
// }: {
//   title: string;
//   status: string;
//   type: string;
//   location: string;
//   price: string;
// }) {
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

// function BookingCard({
//   title,
//   client,
//   status,
//   date,
//   extra,
// }: {
//   title: string;
//   client: string;
//   status: string;
//   date: string;
//   extra: string;
// }) {
//   return (
//     <div className="rounded-[24px] border border-neutral-200 bg-white p-5 shadow-sm transition hover:shadow-md">
//       <div className="flex items-start justify-between gap-3">
//         <div className="rounded-2xl bg-neutral-100 p-3">
//           <HiOutlineCalendarDays className="text-2xl text-black" />
//         </div>
//         <StatusBadge label={status} />
//       </div>

//       <h4 className="mt-4 text-lg font-semibold text-black">{title}</h4>
//       <p className="mt-1 text-sm text-neutral-500">{client}</p>
//       <p className="mt-3 text-sm text-neutral-700">{extra}</p>

//       <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
//         <span className="text-sm text-neutral-500">Scheduled</span>
//         <span className="text-sm font-semibold text-black">{date}</span>
//       </div>
//     </div>
//   );
// }

// function ContactCard({
//   name,
//   subject,
//   status,
//   email,
// }: {
//   name: string;
//   subject: string;
//   status: string;
//   email: string;
// }) {
//   return (
//     <div className="rounded-[24px] border border-neutral-200 bg-white p-5 shadow-sm transition hover:shadow-md">
//       <div className="flex items-start justify-between gap-3">
//         <div className="rounded-2xl bg-neutral-100 p-3">
//           <HiOutlineInbox className="text-2xl text-black" />
//         </div>
//         <StatusBadge label={status} />
//       </div>

//       <h4 className="mt-4 text-lg font-semibold text-black">{name}</h4>
//       <p className="mt-1 text-sm text-neutral-500">{email}</p>
//       <p className="mt-4 text-sm leading-6 text-neutral-700">{subject}</p>

//       <div className="mt-5 flex items-center gap-3">
//         <button
//           type="button"
//           className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-semibold text-black transition hover:border-black"
//         >
//           Open
//         </button>
//         <button
//           type="button"
//           className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
//         >
//           Reply
//         </button>
//       </div>
//     </div>
//   );
// }

// function KanbanColumns({
//   columns,
// }: {
//   columns: { title: string; items: string[] }[];
// }) {
//   return (
//     <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
//       {columns.map((column) => (
//         <div
//           key={column.title}
//           className="rounded-[24px] border border-neutral-200 bg-[#FAFAFA] p-4"
//         >
//           <div className="mb-4 flex items-center justify-between">
//             <h4 className="font-semibold text-black">{column.title}</h4>
//             <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-neutral-600 border border-neutral-200">
//               {column.items.length}
//             </span>
//           </div>

//           <div className="space-y-3">
//             {column.items.map((item, idx) => (
//               <div
//                 key={`${column.title}-${idx}`}
//                 className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm"
//               >
//                 <p className="text-sm font-medium text-black">{item}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// function StatusBadge({ label }: { label: string }) {
//   const tone = label.toLowerCase();

//   const classes =
//     tone === "published" || tone === "confirmed" || tone === "replied"
//       ? "bg-green-50 text-green-700"
//       : tone === "draft" || tone === "pending" || tone === "unread"
//       ? "bg-amber-50 text-amber-700"
//       : "bg-blue-50 text-blue-700";

//   return (
//     <span className={classNames("rounded-full px-3 py-1 text-xs font-semibold", classes)}>
//       {label}
//     </span>
//   );
// }

// export const getServerSideProps: GetServerSideProps = requireAdminPage;

// export default AdminDashboardPage;


// import type { GetServerSideProps, NextPage } from "next";
// import { useMemo, useState } from "react";
// import {
//   HiOutlineHomeModern,
//   HiOutlineCalendarDays,
//   HiOutlineInbox,
// } from "react-icons/hi2";

// import { requireAdminPage, type SerializableAppUser } from "@/lib/auth-guards";
// import type {
//   DashboardTab,
//   DashboardTabKey,
//   MetricItem,
//   PropertyItem,
//   KanbanColumn,
//   ViewMode,
// } from "@/types/admin-dashboard";
// import DashboardHero from "@/components/admin/dashboard/DashboardHero";
// import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
// import DashboardTopbar from "@/components/admin/dashboard/DashboardTopbar";
// import DashboardContent from "@/components/admin/dashboard/DashboardContent";
// import MetricCard from "@/components/admin/dashboard/MetricCard";
// import PropertyForm from "@/components/admin/properties/propertyForm";
// import { getAdminDashboardData } from "@/lib/services/admin-dashboard.service";

// type HeroStat = {
//   label: string;
//   value: string;
// };

// type Props = {
//   currentUser: SerializableAppUser;
//   propertyItems: PropertyItem[];
//   propertyKanban: KanbanColumn[];
//   propertyMetrics: MetricItem[];
//   heroStats: HeroStat[];
// };

// const AdminDashboardPage: NextPage<Props> = ({
//   currentUser,
//   propertyItems,
//   propertyKanban,
//   propertyMetrics,
//   heroStats,
// }) => {
//   const [activeTab, setActiveTab] = useState<DashboardTabKey>("properties");
//   const [viewMode, setViewMode] = useState<ViewMode>("grid");
//   const [searchValue, setSearchValue] = useState("");
//   const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);

//   const dashboardTabs: DashboardTab[] = useMemo(
//     () => [
//       {
//         key: "properties",
//         label: "Properties",
//         description: "Manage listings, statuses, and publishing workflow.",
//         icon: <HiOutlineHomeModern className="text-[20px]" />,
//         count: String(propertyItems.length),
//       },
//       {
//         key: "bookings",
//         label: "Bookings",
//         description: "Track requests, approvals, and scheduling activities.",
//         icon: <HiOutlineCalendarDays className="text-[20px]" />,
//         count: "0",
//       },
//       {
//         key: "contacts",
//         label: "Contacts",
//         description: "Review leads, inquiries, and communication pipeline.",
//         icon: <HiOutlineInbox className="text-[20px]" />,
//         count: "0",
//       },
//     ],
//     [propertyItems]
//   );

//   const activeTabMeta = useMemo(() => {
//     return dashboardTabs.find((tab) => tab.key === activeTab) ?? dashboardTabs[0];
//   }, [dashboardTabs, activeTab]);

//   const metrics = useMemo(() => {
//     if (activeTab === "properties") return propertyMetrics;

//     return [
//       {
//         title: "Total Items",
//         value: "0",
//         hint: "No database table connected yet",
//         trend: "Live",
//       },
//       {
//         title: "Active",
//         value: "0",
//         hint: "No database table connected yet",
//         trend: "Live",
//       },
//       {
//         title: "Pending",
//         value: "0",
//         hint: "No database table connected yet",
//         trend: "Live",
//       },
//       {
//         title: "Completed",
//         value: "0",
//         hint: "No database table connected yet",
//         trend: "Live",
//       },
//     ];
//   }, [activeTab, propertyMetrics]);

//   const handleOpenCreate = () => {
//     setIsAddPropertyOpen(true);
//   };

//   return (
//     <>
//       <main className="min-h-screen bg-[#F6F7FB] px-[30px] pb-[30px] pt-[30px]">
//         <div className="w-full">
//           <DashboardHero currentUser={currentUser} heroStats={heroStats} />

//           <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
//             <DashboardSidebar
//               tabs={dashboardTabs}
//               activeTab={activeTab}
//               onChangeTab={setActiveTab}
//             />

//             <section className="min-w-0">
//               <DashboardTopbar
//                 title={activeTabMeta?.label ?? "Dashboard"}
//                 description={activeTabMeta?.description ?? ""}
//                 viewMode={viewMode}
//                 onChangeView={setViewMode}
//                 searchValue={searchValue}
//                 onChangeSearch={setSearchValue}
//                 onCreateNew={handleOpenCreate}
//                 createLabel={activeTab === "properties" ? "Add Property" : "New Item"}
//               />

//               <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
//                 {metrics.map((metric) => (
//                   <MetricCard key={metric.title} {...metric} />
//                 ))}
//               </div>

//               <div className="mt-6">
//                 <DashboardContent
//                   activeTab={activeTab}
//                   viewMode={viewMode}
//                   searchValue={searchValue}
//                   propertyItems={propertyItems}
//                   propertyKanban={propertyKanban}
//                 />
//               </div>
//             </section>
//           </div>
//         </div>
//       </main>

//       <PropertyForm
//         isOpen={isAddPropertyOpen}
//         onClose={() => setIsAddPropertyOpen(false)}
//       />
//     </>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const authResult = await requireAdminPage(ctx);

//   if ("redirect" in authResult || "notFound" in authResult) {
//     return authResult;
//   }

//   const dashboardData = await getAdminDashboardData();

//   return {
//     props: {
//       ...(authResult.props as { currentUser: SerializableAppUser }),
//       propertyItems: dashboardData.propertyItems,
//       propertyKanban: dashboardData.propertyKanban,
//       propertyMetrics: dashboardData.propertyMetrics,
//       heroStats: dashboardData.heroStats,
//     },
//   };
// };

// export default AdminDashboardPage;



import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import {
  HiOutlineHomeModern,
  HiOutlineCalendarDays,
  HiOutlineInbox,
} from "react-icons/hi2";

import { requireAdminPage, type SerializableAppUser } from "@/lib/auth-guards";
import type {
  DashboardTab,
  DashboardTabKey,
  MetricItem,
  PropertyItem,
  KanbanColumn,
  ViewMode,
} from "@/types/admin-dashboard";
import DashboardHero from "@/components/admin/dashboard/DashboardHero";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/admin/dashboard/DashboardTopbar";
import DashboardContent from "@/components/admin/dashboard/DashboardContent";
import MetricCard from "@/components/admin/dashboard/MetricCard";
import PropertyForm from "@/components/admin/properties/propertyForm";
import { getAdminDashboardData } from "@/lib/services/admin-dashboard.service";

type HeroStat = {
  label: string;
  value: string;
};

type Props = {
  currentUser: SerializableAppUser;
  propertyItems: PropertyItem[];
  propertyKanban: KanbanColumn[];
  propertyMetrics: MetricItem[];
  heroStats: HeroStat[];
};

const AdminDashboardPage: NextPage<Props> = ({
  currentUser,
  propertyItems,
  propertyKanban,
  propertyMetrics,
  heroStats,
}) => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<DashboardTabKey>("properties");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchValue, setSearchValue] = useState("");
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);

  useEffect(() => {
    const tab = router.query.tab;
    if (tab === "properties" || tab === "bookings" || tab === "contacts") {
      setActiveTab(tab);
    }
  }, [router.query.tab]);

  const dashboardTabs: DashboardTab[] = useMemo(
    () => [
      {
        key: "properties",
        label: "Properties",
        description: "Manage listings, statuses, and publishing workflow.",
        icon: <HiOutlineHomeModern className="text-[20px]" />,
        count: String(propertyItems.length),
      },
      {
        key: "bookings",
        label: "Bookings",
        description: "Track requests, approvals, and scheduling activities.",
        icon: <HiOutlineCalendarDays className="text-[20px]" />,
        count: "0",
      },
      {
        key: "contacts",
        label: "Contacts",
        description: "Review leads, inquiries, and communication pipeline.",
        icon: <HiOutlineInbox className="text-[20px]" />,
        count: "0",
      },
    ],
    [propertyItems]
  );

  const activeTabMeta = useMemo(() => {
    return dashboardTabs.find((tab) => tab.key === activeTab) ?? dashboardTabs[0];
  }, [dashboardTabs, activeTab]);

  const metrics = useMemo(() => {
    if (activeTab === "properties") return propertyMetrics;

    return [
      {
        title: "Total Items",
        value: "0",
        hint: "No database table connected yet",
        trend: "Live",
      },
      {
        title: "Active",
        value: "0",
        hint: "No database table connected yet",
        trend: "Live",
      },
      {
        title: "Pending",
        value: "0",
        hint: "No database table connected yet",
        trend: "Live",
      },
      {
        title: "Completed",
        value: "0",
        hint: "No database table connected yet",
        trend: "Live",
      },
    ];
  }, [activeTab, propertyMetrics]);

  const handleOpenCreate = () => {
    setIsAddPropertyOpen(true);
  };

  return (
    <>
      <main className="min-h-screen bg-[#F6F7FB] px-[30px] pb-[30px] pt-[30px]">
        <div className="w-full">
          <DashboardHero currentUser={currentUser} heroStats={heroStats} />

          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
            <DashboardSidebar
              tabs={dashboardTabs}
              activeTab={activeTab}
              onChangeTab={setActiveTab}
            />

            <section className="min-w-0">
              <DashboardTopbar
                title={activeTabMeta?.label ?? "Dashboard"}
                description={activeTabMeta?.description ?? ""}
                viewMode={viewMode}
                onChangeView={setViewMode}
                searchValue={searchValue}
                onChangeSearch={setSearchValue}
                onCreateNew={handleOpenCreate}
                createLabel={activeTab === "properties" ? "Add Property" : "New Item"}
              />

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
                {metrics.map((metric) => (
                  <MetricCard key={metric.title} {...metric} />
                ))}
              </div>

              <div className="mt-6">
                <DashboardContent
                  activeTab={activeTab}
                  viewMode={viewMode}
                  searchValue={searchValue}
                  propertyItems={propertyItems}
                  propertyKanban={propertyKanban}
                />
              </div>
            </section>
          </div>
        </div>
      </main>

      <PropertyForm
        isOpen={isAddPropertyOpen}
        onClose={() => setIsAddPropertyOpen(false)}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const authResult = await requireAdminPage(ctx);

  if ("redirect" in authResult || "notFound" in authResult) {
    return authResult;
  }

  const dashboardData = await getAdminDashboardData();

  return {
    props: {
      ...(authResult.props as { currentUser: SerializableAppUser }),
      propertyItems: dashboardData.propertyItems,
      propertyKanban: dashboardData.propertyKanban,
      propertyMetrics: dashboardData.propertyMetrics,
      heroStats: dashboardData.heroStats,
    },
  };
};

export default AdminDashboardPage;
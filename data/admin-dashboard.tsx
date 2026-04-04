import {
  HiOutlineHomeModern,
  HiOutlineCalendarDays,
  HiOutlineInbox,
} from "react-icons/hi2";
import type {
  DashboardTab,
  DashboardTabKey,
  MetricItem,
  PropertyItem,
  BookingItem,
  ContactItem,
  KanbanColumn,
} from "@/types/admin-dashboard";

export const dashboardTabs: DashboardTab[] = [
  {
    key: "properties",
    label: "Properties",
    description: "Manage listings, statuses, and publishing workflow.",
    icon: <HiOutlineHomeModern className="text-[20px]" />,
    count: "24",
  },
  {
    key: "bookings",
    label: "Bookings",
    description: "Track requests, approvals, and scheduling activities.",
    icon: <HiOutlineCalendarDays className="text-[20px]" />,
    count: "18",
  },
  {
    key: "contacts",
    label: "Contacts",
    description: "Review leads, inquiries, and communication pipeline.",
    icon: <HiOutlineInbox className="text-[20px]" />,
    count: "31",
  },
];

export const heroStats = [
  { label: "Properties", value: "124" },
  { label: "Bookings", value: "86" },
  { label: "Contacts", value: "219" },
  { label: "Alerts", value: "07" },
];

export const upgrades = [
  "Kanban workflow boards",
  "Filter drawer",
  "Bulk actions toolbar",
  "Analytics widgets",
];

export const propertyItems: PropertyItem[] = [
  {
    id: "PR-001",
    title: "Kigali Heights Apartment",
    status: "Published",
    type: "Apartment",
    location: "Kigali",
    price: "$120,000",
  },
  {
    id: "PR-002",
    title: "Nyarutarama Family Villa",
    status: "Draft",
    type: "Villa",
    location: "Nyarutarama",
    price: "$310,000",
  },
  {
    id: "PR-003",
    title: "Kacyiru Office Space",
    status: "Review",
    type: "Commercial",
    location: "Kacyiru",
    price: "$2,100/mo",
  },
  {
    id: "PR-004",
    title: "Kimihurura Penthouse",
    status: "Published",
    type: "Penthouse",
    location: "Kimihurura",
    price: "$450,000",
  },
];

export const bookingItems: BookingItem[] = [
  {
    id: "BK-1001",
    title: "Site Visit Request",
    client: "John Smith",
    status: "Pending",
    date: "12 Mar 2026",
    extra: "Kacyiru Office Space",
  },
  {
    id: "BK-1002",
    title: "Apartment Viewing",
    client: "Amina Keza",
    status: "Confirmed",
    date: "14 Mar 2026",
    extra: "Kigali Heights Apartment",
  },
  {
    id: "BK-1003",
    title: "Villa Consultation",
    client: "David Lee",
    status: "Follow-up",
    date: "16 Mar 2026",
    extra: "Nyarutarama Family Villa",
  },
];

export const contactItems: ContactItem[] = [
  {
    id: "CT-001",
    name: "Alice Uwase",
    subject: "Interested in apartment pricing",
    status: "Unread",
    email: "alice@example.com",
  },
  {
    id: "CT-002",
    name: "Eric Mugisha",
    subject: "Need investment consultation",
    status: "Replied",
    email: "eric@example.com",
  },
  {
    id: "CT-003",
    name: "Sandra Bello",
    subject: "Schedule a viewing",
    status: "Pending",
    email: "sandra@example.com",
  },
];

export const propertyKanban: KanbanColumn[] = [
  { title: "Draft", items: ["Nyarutarama Family Villa", "Remera Townhouse"] },
  { title: "Review", items: ["Kacyiru Office Space", "Rebero Residence"] },
  { title: "Published", items: ["Kigali Heights Apartment", "Kimihurura Penthouse"] },
];

export const bookingKanban: KanbanColumn[] = [
  { title: "Pending", items: ["Site Visit Request", "Apartment Viewing Inquiry"] },
  { title: "Confirmed", items: ["Apartment Viewing", "Client Meeting"] },
  { title: "Follow-up", items: ["Villa Consultation", "Phone Callback"] },
];

export const contactKanban: KanbanColumn[] = [
  { title: "Unread", items: ["Interested in apartment pricing", "Need full property details"] },
  { title: "Pending", items: ["Schedule a viewing", "Waiting for quotation"] },
  { title: "Replied", items: ["Need investment consultation", "Follow-up sent"] },
];

export function getMetricsByTab(tab: DashboardTabKey): MetricItem[] {
  if (tab === "properties") {
    return [
      { title: "Total Items", value: "124", hint: "All records in this section", trend: "+12.4%" },
      { title: "Active", value: "87", hint: "Currently active or open", trend: "+8.1%" },
      { title: "Pending", value: "16", hint: "Need attention or approval", trend: "-2.3%" },
      { title: "Completed", value: "21", hint: "Already finalized", trend: "+4.7%" },
    ];
  }

  if (tab === "bookings") {
    return [
      { title: "Total Items", value: "86", hint: "All records in this section", trend: "+12.4%" },
      { title: "Active", value: "24", hint: "Currently active or open", trend: "+8.1%" },
      { title: "Pending", value: "42", hint: "Need attention or approval", trend: "-2.3%" },
      { title: "Completed", value: "20", hint: "Already finalized", trend: "+4.7%" },
    ];
  }

  return [
    { title: "Total Items", value: "219", hint: "All records in this section", trend: "+12.4%" },
    { title: "Active", value: "140", hint: "Currently active or open", trend: "+8.1%" },
    { title: "Pending", value: "28", hint: "Need attention or approval", trend: "-2.3%" },
    { title: "Completed", value: "51", hint: "Already finalized", trend: "+4.7%" },
  ];
}


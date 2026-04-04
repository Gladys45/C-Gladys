// import type { ReactNode } from "react";

// export type DashboardTabKey = "properties" | "bookings" | "contacts";
// export type ViewMode = "grid" | "list" | "kanban";

// export type DashboardTab = {
//   key: DashboardTabKey;
//   label: string;
//   description: string;
//   icon: ReactNode;
//   count: string;
// };

// export type MetricItem = {
//   title: string;
//   value: string;
//   hint: string;
//   trend: string;
// };

// export type PropertyItem = {
//   id: string;
//   title: string;
//   status: string;
//   type: string;
//   location: string;
//   price: string;
// };

// export type BookingItem = {
//   id: string;
//   title: string;
//   client: string;
//   status: string;
//   date: string;
//   extra: string;
// };

// export type ContactItem = {
//   id: string;
//   name: string;
//   subject: string;
//   status: string;
//   email: string;
// };

// export type KanbanColumn = {
//   title: string;
//   items: string[];
// };
import type { IconType } from "react-icons";

export type DashboardTabKey = "properties" | "bookings" | "contacts";
export type ViewMode = "grid" | "list" | "kanban";

export type DashboardTab = {
  key: DashboardTabKey;
  label: string;
  description: string;
  icon: IconType;
  count: string;
};

export type MetricItem = {
  title: string;
  value: string;
  hint: string;
  trend: string;
};

export type PropertyItem = {
  id: string;
  title: string;
  status: string;
  type: string;
  location: string;
  price: string;
};

export type BookingItem = {
  id: string;
  title: string;
  client: string;
  status: string;
  date: string;
  extra: string;
};

export type ContactItem = {
  id: string;
  name: string;
  subject: string;
  status: string;
  email: string;
};

export type KanbanColumn = {
  title: string;
  items: string[];
};
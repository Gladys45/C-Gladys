import SectionShell from "../SectionShell";
import KanbanColumns from "../KanbanColumns";
import ContactCard from "../cards/ContactCard";
import StatusBadge from "../StatusBadge";
import { contactItems, contactKanban } from "@/data/admin-dashboard";
import type { ViewMode } from "@/types/admin-dashboard";

type ContactsPanelProps = {
  viewMode: ViewMode;
  searchValue: string;
};

export default function ContactsPanel({
  viewMode,
  searchValue,
}: ContactsPanelProps) {
  return (
    <SectionShell
      title="Contact Center"
      subtitle={`Handle incoming leads and communications${searchValue ? ` — searching for "${searchValue}"` : ""}`}
    >
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {contactItems.map((item) => (
            <ContactCard key={item.id} {...item} />
          ))}
        </div>
      )}

      {viewMode === "list" && (
        <div className="space-y-3">
          {contactItems.map((item) => (
            <div
              key={item.id}
              className="rounded-[22px] border border-neutral-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <p className="font-semibold text-black">{item.name}</p>
                  <p className="text-sm text-neutral-500">{item.email}</p>
                  <p className="mt-2 text-sm text-neutral-700">{item.subject}</p>
                </div>

                <StatusBadge label={item.status} />
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === "kanban" && <KanbanColumns columns={contactKanban} />}
    </SectionShell>
  );
}
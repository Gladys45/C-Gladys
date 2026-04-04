import SectionShell from "../SectionShell";
import KanbanColumns from "../KanbanColumns";
import BookingCard from "../cards/BookingCard";
import StatusBadge from "../StatusBadge";
import { bookingItems, bookingKanban } from "@/data/admin-dashboard";
import type { ViewMode } from "@/types/admin-dashboard";

type BookingsPanelProps = {
  viewMode: ViewMode;
  searchValue: string;
};

export default function BookingsPanel({
  viewMode,
  searchValue,
}: BookingsPanelProps) {
  return (
    <SectionShell
      title="Bookings Workspace"
      subtitle={`Manage booking pipeline${searchValue ? ` — searching for "${searchValue}"` : ""}`}
    >
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {bookingItems.map((item) => (
            <BookingCard key={item.id} {...item} />
          ))}
        </div>
      )}

      {viewMode === "list" && (
        <div className="space-y-3">
          {bookingItems.map((item) => (
            <div
              key={item.id}
              className="rounded-[22px] border border-neutral-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-lg font-semibold text-black">{item.title}</p>
                  <p className="mt-1 text-sm text-neutral-500">
                    {item.client} • {item.extra}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <StatusBadge label={item.status} />
                  <span className="text-sm text-neutral-500">{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === "kanban" && <KanbanColumns columns={bookingKanban} />}
    </SectionShell>
  );
}
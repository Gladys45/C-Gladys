import type { KanbanColumn } from "@/types/admin-dashboard";

type KanbanColumnsProps = {
  columns: KanbanColumn[];
};

export default function KanbanColumns({ columns }: KanbanColumnsProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      {columns.map((column) => (
        <div
          key={column.title}
          className="rounded-[24px] border border-neutral-200 bg-[#FAFAFA] p-4"
        >
          <div className="mb-4 flex items-center justify-between">
            <h4 className="font-semibold text-black">{column.title}</h4>
            <span className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-600">
              {column.items.length}
            </span>
          </div>

          <div className="space-y-3">
            {column.items.map((item, idx) => (
              <div
                key={`${column.title}-${idx}`}
                className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm"
              >
                <p className="text-sm font-medium text-black">{item}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
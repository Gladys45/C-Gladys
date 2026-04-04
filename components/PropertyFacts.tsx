type PropertyFactsProps = {
  items: Array<{
    label: string;
    value: string | number | null | undefined;
  }>;
};

export default function PropertyFacts({ items }: PropertyFactsProps) {
  const filtered = items.filter(
    (item) => item.value !== null && item.value !== undefined && `${item.value}`.trim() !== ""
  );

  if (!filtered.length) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {filtered.map((item) => (
        <div key={item.label} className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">{item.label}</p>
          <p className="mt-2 text-lg font-semibold text-gray-900">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
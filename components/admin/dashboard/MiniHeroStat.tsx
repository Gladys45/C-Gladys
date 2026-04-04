type MiniHeroStatProps = {
  label: string;
  value: string;
};

export default function MiniHeroStat({
  label,
  value,
}: MiniHeroStatProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm">
      <p className="text-xs text-white/60">{label}</p>
      <p className="mt-1 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
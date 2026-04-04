type SectionCardProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function SectionCard({
  title,
  subtitle,
  children,
}: SectionCardProps) {
  return (
    <section className="rounded-[24px] border border-neutral-200 bg-white p-5">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-black">{title}</h3>
        {subtitle ? <p className="mt-1 text-sm text-neutral-500">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}
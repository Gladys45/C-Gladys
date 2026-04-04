import classNames from "classnames";

type StatusBadgeProps = {
  label: string;
};

export default function StatusBadge({ label }: StatusBadgeProps) {
  const tone = label.toLowerCase();

  const classes =
    tone === "published" || tone === "confirmed" || tone === "replied"
      ? "bg-green-50 text-green-700"
      : tone === "draft" || tone === "pending" || tone === "unread"
      ? "bg-amber-50 text-amber-700"
      : "bg-blue-50 text-blue-700";

  return (
    <span className={classNames("rounded-full px-3 py-1 text-xs font-semibold", classes)}>
      {label}
    </span>
  );
}
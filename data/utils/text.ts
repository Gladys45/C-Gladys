export function normalizeText(v: string) {
  return (v || "").toLowerCase().trim();
}

export function includesText(haystack: string, needle: string) {
  const h = normalizeText(haystack);
  const n = normalizeText(needle);
  if (!n) return true;
  return h.includes(n);
}
export function asset(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  const normalized = path.replace(/^\//, "");
  return `${import.meta.env.BASE_URL}${normalized}`;
}

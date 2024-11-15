export function fParams(obj?: Record<string, string | string[] | number>) {
  if (!obj) return {};
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== null && value !== undefined && value !== '' && value !== 0
    )
  );
}

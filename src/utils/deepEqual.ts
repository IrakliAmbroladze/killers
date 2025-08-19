export const deepEqual = (
  a: Record<string, object>,
  b: Record<string, object>
): boolean => {
  if (a === b) return true;

  if (a == null || typeof a != "object" || b == null || typeof b != "object")
    return false;

  const keysA = Object.keys(a),
    keysB = Object.keys(b);

  if (keysA.length != keysB.length) return false;

  for (const key of keysA) {
    if (
      !keysB.includes(key) ||
      !deepEqual(
        a[key] as Record<string, object>,
        b[key] as Record<string, object>
      )
    )
      return false;
  }

  return true;
};

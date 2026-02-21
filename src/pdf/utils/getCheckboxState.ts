export function getCheckboxState(value: boolean | null) {
  if (value === true) return "checked";
  if (value === false) return "crossed";
  if (value === null) return "NA";
  return "blank";
}

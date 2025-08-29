export function getFirstDateOfMonth(year: number, month: number): string {
  const date = new Date(year, month - 1, 1);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = "01";
  return `${yyyy}-${mm}-${dd}`;
}

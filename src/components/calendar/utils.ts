const months: string[] = [
  "იანვარი",
  "თებერვალი",
  "მარტი",
  "აპრილი",
  "მაისი",
  "ივნისი",
  "ივლისი",
  "აგვისტო",
  "სექტმებერი",
  "ოქტომბერი",
  "ნოემბერი",
  "დეკემბერი",
];
const weekdays: string[] = [
  "კვირა",
  "ორშ.",
  "სამშ.",
  "ოთხ",
  "ხუთ.",
  "პარ",
  "შაბათი",
];
const today = new Date();
const currentMonth: number = today.getMonth();
const currentYear: number = today.getFullYear();

const firstDayOfMonth = (year: number, month: number) =>
  new Date(year, month, 1);

const daysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

const dayOfWeekOfFirstDayOfMonth = (year: number, month: number) =>
  firstDayOfMonth(year, month).getDay();

const currentWeek = Math.ceil(
  (dayOfWeekOfFirstDayOfMonth(currentYear, currentMonth) + today.getDate()) / 7
);

const getDateKey = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

export {
  getDateKey,
  months,
  weekdays,
  currentMonth,
  currentYear,
  currentWeek,
  daysInMonth,
  dayOfWeekOfFirstDayOfMonth,
};

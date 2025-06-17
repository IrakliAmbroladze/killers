const today = new Date();
const currentMonth: number = today.getMonth();
const currentYear: number = today.getFullYear();

const firstDayOfMonth = (year: number, month: number) =>
  new Date(year, month, 1);

const daysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

//this is responsible for the first day of month. now set on Monday
const dayOfWeekOfFirstDayOfMonth = (year: number, month: number) => {
  const day = firstDayOfMonth(year, month).getDay();
  return day === 0 ? 6 : day - 1;
  // return day;
};

const currentWeek = Math.ceil(
  (dayOfWeekOfFirstDayOfMonth(currentYear, currentMonth) + today.getDate()) / 7
);

const getDateKey = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

export {
  getDateKey,
  currentMonth,
  currentYear,
  currentWeek,
  daysInMonth,
  dayOfWeekOfFirstDayOfMonth,
};

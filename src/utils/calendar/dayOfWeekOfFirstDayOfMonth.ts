import { firstDayOfMonth } from "./firstDayOfMonth";

//set on Monday
export const dayOfWeekOfFirstDayOfMonth = (year: number, month: number) => {
  const day = firstDayOfMonth(year, month).getDay();
  return day === 0 ? 6 : day - 1;
};

import { dayOfWeekOfFirstDayOfMonth } from "./dayOfWeekOfFirstDayOfMonth";
import { daysInMonth } from "./daysInMonth";

export const weeksNumberInMonth = (year: number, month: number): number =>
  Math.ceil(
    (dayOfWeekOfFirstDayOfMonth(year, month) + daysInMonth(year, month)) / 7
  );

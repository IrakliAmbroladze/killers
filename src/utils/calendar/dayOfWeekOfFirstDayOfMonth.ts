import { firstDayOfMonth } from "./firstDayOfMonth";

export const dayOfWeekOfFirstDayOfMonth = (year: number, month: number) =>
  firstDayOfMonth(year, month).getDay();

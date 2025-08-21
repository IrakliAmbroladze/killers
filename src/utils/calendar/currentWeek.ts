import { currentMonth, currentYear } from "@/constants";
import { dayOfWeekOfFirstDayOfMonth } from "./dayOfWeekOfFirstDayOfMonth";

export const currentWeek = Math.ceil(
  (dayOfWeekOfFirstDayOfMonth(currentYear, currentMonth) +
    new Date().getDate()) /
    7
);

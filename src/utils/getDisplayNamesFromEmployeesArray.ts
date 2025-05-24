import { Employee } from "@/types/Employee";

export const getDisplayNamesFromEmployeesArray = (employeesArray: Employee[]) =>
  employeesArray.map((employee) => employee.display_name);

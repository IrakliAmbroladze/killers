import { Employee } from "@/types/Employee";
import useTechniciansAndTechManager from "./useTechniciansAndTechManager";
import { getDisplayNamesFromEmployeesArray } from "@/utils/getDisplayNamesFromEmployeesArray";

export const useTechniciansAndManagersDisplayNames = (): string[] => {
  const techniciansAndTechManager: Employee[] = useTechniciansAndTechManager();
  return getDisplayNamesFromEmployeesArray(techniciansAndTechManager);
};

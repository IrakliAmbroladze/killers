import { EmployeesContext } from "@/context/employees/Context";
import { useContext } from "react";

export const useEmployees = () => {
  const context = useContext(EmployeesContext);
  if (!context)
    throw new Error("useEmployees must be used within EmployeesProvider");
  return context;
};

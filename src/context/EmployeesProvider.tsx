import { Employee } from "@/types/Employee";
import { EmployeesContext } from "./EmployeesContext";

export const EmployeesProvider = ({
  employees,
  children,
}: {
  employees: Employee[];
  children: React.ReactNode;
}) => {
  return (
    <EmployeesContext.Provider value={{ employees }}>
      {children}
    </EmployeesContext.Provider>
  );
};

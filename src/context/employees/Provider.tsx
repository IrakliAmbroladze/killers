import { Employee } from "@/types/Employee";
import { EmployeesContext } from "@/context/employees/Context";

export const Provider = ({
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

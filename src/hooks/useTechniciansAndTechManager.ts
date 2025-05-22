import { useEmployees } from "./useEmployees ";
import { role } from "@/constants/role";

const useTechniciansAndTechManager = () => {
  const { employees } = useEmployees();
  const techniciansAndTechManager = employees.filter(
    (emp) =>
      emp.role_id === role.technician_id || emp.role_id === role.techManager_id
  );
  return techniciansAndTechManager;
};

export default useTechniciansAndTechManager;

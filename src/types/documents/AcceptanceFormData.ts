export type AcceptanceFormData = {
  date: string;
  services: {
    disinsection: boolean;
    deratization: boolean;
    disinfection: boolean;
    subcontractorPrevention: boolean;
  };
  pests: Array<{
    name: string;
    checked: boolean;
    monitor: string;
    spray: string;
    gel: string;
  }>;
  products: Array<{
    name: string;
    checked: boolean;
    dosage: string;
    used: string;
  }>;
  inventory: Array<{
    name: string;
    price: string;
    quantity: string;
  }>;
  spaces: { [key: string]: boolean };
  startTime: string;
  endTime: string;
  address: string;
  customer: {
    name: string;
    personalNumber: string;
    signature: string;
  };
  executor: {
    signature: string;
  };
};

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
    monitor: boolean;
    spray: boolean;
    gel: boolean;
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
    representative: {
      name: string;
      id: string;
    };
    signature: string;
  };
  executor: {
    signature: string;
  };
  flying_pest_monitor: Array<{
    id: string;
    fly: string;
    kinkla: string;
    blank: string;
    plate_was_changed: boolean;
  }>;
  crawling_pest_monitor: Array<{
    id: string;
    ant: string;
    cockroach: string;
    blank: string;
    plate_was_changed: boolean;
  }>;
  rodent_monitor: Array<{
    id: string;
    captured: string;
    plate_was_changed: boolean;
    chemical_was_added: boolean;
  }>;
  criteria: { [key: string]: boolean | null };
};

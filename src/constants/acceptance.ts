import { AcceptanceFormData, OrderExtended } from "@/types";
import { SanitaryService } from "@/types/SanitaryServices";

export const pestTableData: string[] = [
  "ბუზი",
  "ქინქლა",
  "ტარაკანი",
  "ჭიანჭველა",
  "რწყილი",
  "ბაღლინჯო",
  "თაგვი",
  "ვირთხა",
  "ქვეწარმავალი",
  "ბაქტერია",
  "ბზიკი",
];

export const productsTableData: string[] = [
  "მხოხავი მავნებლის ფირფიტა",
  "Killzone მღრღ. ფირფიტა",
  "Killzone მწერის ფირფიტა",
  "BROMOBLEU",
  "RATIMOR",
  "Cipex10e",
  "RAPTOR GEL",
  "BLEU DELTA",
  "AGITA",
  "SURFANIOS PREMIUM",
  "REPTIL NATURAL STOP",
  "ALFADOM",
];

export const services: SanitaryService[] = [
  "დეზინსექცია",
  "დერატიზაცია",
  "დეზინფექცია",
  "ქვეწარმავლების პრევენცია",
];

export const acceptanceFormData = (
  order: OrderExtended,
): AcceptanceFormData => {
  return {
    date: "2025-12-19",
    services: {
      disinsection: false,
      deratization: false,
      disinfection: false,
      subcontractorPrevention: false,
    },
    pests: pestTableData.map((pest) => ({
      name: pest,
      checked: true,
      monitor: false,
      spray: false,
      gel: false,
    })),
    products: productsTableData.map((product) => ({
      name: product,
      checked: true,
      dosage: "-",
      used: "",
    })),
    inventory: [
      { name: "", price: "", quantity: "" },
      { name: "", price: "", quantity: "" },
      { name: "", price: "", quantity: "" },
    ],
    spaces: { სამზარეულო: true, ოფისი: true },
    startTime: "09:00",
    endTime: "11:00",
    address: "საქანელას ქ.2",
    customer: {
      name: order.customers.name,
      personalNumber: order.customers.id,
      signature: "",
    },
    executor: {
      signature: "",
    },
  };
};

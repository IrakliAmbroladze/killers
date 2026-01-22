import { AcceptanceFormData, OrderExtended } from "@/types";
import { SanitaryService } from "@/types/SanitaryServices";
import { getTodaysYYYY_MM_DDString } from "@/utils/calendar/getTodaysString";

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
  "permex 22e",
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
    date: getTodaysYYYY_MM_DDString(),
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
    inventory: Array.from({ length: 3 }, () => ({
      name: "",
      price: "",
      quantity: "",
    })),
    spaces: Object.fromEntries(DONE_AREAS.map((area) => [area, false])),
    startTime: "",
    endTime: "",
    address: order.address,
    customer: {
      name: order.customers.name,
      personalNumber: order.customers.id,
      representative: {
        name: "",
        id: "",
      },
      signature: "",
    },
    executor: {
      signature: "",
    },
  };
};

export const DONE_AREAS = [
  "მიმღები",
  "სასტუმრო ოთახი",
  "სამზარეულო",
  "ოფისი",
  "დერეფანი",
  "რესტორანი",
  "ბარი",
  "ტერასა",
  "სველი წერტილები",
  "საწყობი",
  "საერთო სივრცე",
  "სხვენი",
  "სარდაფი",
  "მარანი",
  "ტექნიკური ოთახი",
  "საწარმო",
  "მომარაგების ოთახი",
  "ნაგავსაყრელი",
  "გარე ტერიტორია",
];

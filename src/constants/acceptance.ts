import { AcceptanceFormData, OrderExtended } from "@/types";
import { SanitaryService } from "@/types/SanitaryServices";
import { getTodaysYYYY_MM_DDString } from "@/utils/calendar/getTodaysString";

export const pestTableData: string[] = [
  "ბუზი",
  "ქინქლა",
  "ტარაკანი",
  "რწყილი",
  "ჭიანჭველა",
  "ბზიკი",
  "ბაღლინჯო",
  "თაგვი",
  "ვირთხა",
  "ქვეწარმავალი",
  "ბაქტერია",
  "",
  "",
  // in case i add some staff have to remember that i use this array
  // in this context
  //   const pestRows: UiTableCell[][] = useMemo(
  /*() =>
      formData.pests.map((pest, index) => [
        index < 10
          ? { type: "text", text: pest.name }
          : { type: "pestInputText", text: pest.name },
        {*/
];

export const productsTableData: { name: string; dosage: string }[] = [
  { name: "მხოხავი მავნებლის ფირფიტა", dosage: "-" },
  { name: "Killzone მღრღ. ფირფიტა", dosage: "-" },
  { name: "Killzone მწერის ფირფიტა", dosage: "-" },
  { name: "BROMOBLEU", dosage: "-" },
  { name: "RATIMOR", dosage: "-" },
  { name: "Cipex10e", dosage: "10მლ/1ლ" },
  { name: "RAPTOR GEL", dosage: "-" },
  { name: "BLEU DELTA", dosage: "-" },
  { name: "AGITA", dosage: "30-130გრ/1ლ" },
  { name: "SURFANIOS PREMIUM", dosage: "2.5მლ/1ლ" },
  { name: "REPTIL NATURAL STOP", dosage: "-" },
  { name: "ALFADOM 10SC", dosage: "2-5მლ/1ლ" },
  { name: "permex 22e", dosage: "8მლ/1ლ" },
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
      name: product.name,
      checked: true,
      dosage: product.dosage,
      used: "",
    })),
    inventory: Array.from({ length: 5 }, () => ({
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
    flying_pest_monitor: Array.from({ length: 5 }, () => ({
      id: "",
      fly: "",
      kinkla: "",
      blank: "",
      plate_was_changed: false,
    })),
    crawling_pest_monitor: Array.from({ length: 5 }, () => ({
      id: "",
      ant: "",
      cockroach: "",
      blank: "",
      plate_was_changed: false,
    })),
    rodent_monitor: Array.from({ length: 5 }, () => ({
      id: "",
      captured: "",
      plate_was_changed: false,
      chemical_was_added: false,
    })),
    criteria: {},
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

export const criteria_constants = [
  { id: "1.1", label: "ნაგვის ურნები შენობიდან მოშორებითაა" },
  { id: "1.2", label: "ნაგვის ურნები არის სათანადოდ მოწესრიგებული" },
  { id: "2.1", label: "კედლებს არ აქვს ღიობები" },
  { id: "2.2", label: "კარებს არ აქვს ღიობები" },
  { id: "2.3", label: "ფანჯრებს არ აქვს ღიობები" },
  { id: "2.4", label: "საფეხმავლო ბილიკს არ აქვს ღიობები" },
  { id: "2.5", label: "ტროტუარს არ აქვს ღიობები" },
  { id: "3.1", label: "სანიაღვრე წყლები შენობიდან შორს არის მიმართული" },
  { id: "3.2", label: "არ ხდება წყლის დადგომა" },
  { id: "4.1", label: "მილები და საკანალიზაციო ჭები დაცულია მეტალის ბადით" },
  {
    id: "5.1",
    label:
      "ხეები, ბუჩქები, ნაფოტები, ნახერხი და სხვა ტიპის მცენარეები არის შენობიდან მოშორებით",
  },
  { id: "6.1", label: "შენობის გარშემო არ გროვდება ნაგავი" },
  { id: "6.2", label: "მოწესრიგებულია ბალახი და სხვა მცენარეები" },
  { id: "7.1", label: "კედლები და ჭერი არის სუფთა, არ არის ცხიმიანი" },
  { id: "7.2", label: "და არ იქმნება კონდესატი" },
  {
    id: "8.1",
    label: "იატაკი და ტრაპები არის სუფთა, არ გროვდება ცხიმი ან ნარჩენები",
  },
  {
    id: "9.1",
    label:
      "საკვების მოსამზადებელი სივრცე მოწესრიგებულია, არ რჩება ნარჩენები, საკვები არ არის ხელმისაწვდომი მავნებლისთვის",
  },
  {
    id: "10.1",
    label:
      "საკვების მოსამზადებელი დანადგარები არის სუფთა, არ გროვდება ცხიმი ან ნარჩენები",
  },
  { id: "11.1", label: "ჭურჭლის სარეცხი სივრცე სუფთადაა" },
  { id: "11.2", label: "შენარჩუნებულია სიმშრალე" },
  { id: "11.3", label: "გასარეცხი ჭურჭელი არ გროვდება სამზარეულოში" },
  {
    id: "12.1",
    label: "ნარჩენების ოთახი მოწესრიგებულია, ნაგავი სწორად არის შეფუთული",
  },
  { id: "12.2", label: "კონტეინერები სუფთა მდგომარეობაშია" },
  {
    id: "13.1",
    label: "სასაწყობე სივრცეში პროდუქტი იატაკიდან და კედლებიდან მოშორებითაა",
  },
  { id: "13.2", label: "მუყაოს ყუთებში არ ინახება პროდუქცია" },
  {
    id: "14.1",
    label: "სასადილო ოთახში მაგიდები სუფთაა, საკვების ნარჩენებისგან თავისუფალი",
  },
  { id: "14.2", label: "ინვენტარი სუფთა მდგომარეობაში" },
  {
    id: "15.1",
    label: "სველი წერტილები სუფთა და მომშრალებულია, არ ჟონავს წყალი",
  },
  { id: "15.2", label: "ტრაპებში არ გროვდება ნაგავი" },
  {
    id: "16.1",
    label:
      "ოფისები და მსგავსი სივრცეები არის მოწესრიგებული, არ არის საკვების ნარჩენები",
  },
  { id: "17.1", label: "გასახდელები მოწესრიგებულია" },
  {
    id: "17.2",
    label: "საშხაპეები და ტრაპები გაწმენდილია, არ ხდება წყლის დაგროვება",
  },
];

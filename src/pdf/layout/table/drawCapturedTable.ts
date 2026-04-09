type BaseMonitorRow = {
  id: string;
  blank: string;
  plate_was_changed: boolean;
};

// type FlyingMonitorRow = BaseMonitorRow & {
//   fly: string;
//   kinkla: string;
// };
//
// type CrawlingMonitorRow = BaseMonitorRow & {
//   ant: string;
//   cockroach: string;
// };
//
// type RodentMonitorRow = BaseMonitorRow & {
//   captured: string;
//   chemical_was_added: boolean;
// };

type DrawCapturedTableProps<T extends BaseMonitorRow> = {
  title: string;
  monitorData: T[];
};

export const drawCapturedTable = <T extends BaseMonitorRow>({
  title,
  monitorData,
}: DrawCapturedTableProps<T>) => {
  console.log("title is ", title);
  console.log("monitor data is: ", monitorData);
};

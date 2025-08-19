// utils/customDateComparator.ts

export const dateOnlyComparator = (
  filterDate: Date,
  cellValue: string
): number => {
  if (!cellValue) return -1;

  const cellDate = new Date(cellValue);

  const filterY = filterDate.getFullYear();
  const filterM = filterDate.getMonth();
  const filterD = filterDate.getDate();

  const cellY = cellDate.getFullYear();
  const cellM = cellDate.getMonth();
  const cellD = cellDate.getDate();

  if (cellY < filterY) return -1;
  if (cellY > filterY) return 1;
  if (cellM < filterM) return -1;
  if (cellM > filterM) return 1;
  if (cellD < filterD) return -1;
  if (cellD > filterD) return 1;
  return 0;
};

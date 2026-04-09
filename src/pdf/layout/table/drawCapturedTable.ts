type drawCapturedTableProps = {
  title: string;
  monitorData:
    | Array<{
        id: string;
        fly: string;
        kinkla: string;
        blank: string;
        plate_was_changed: boolean;
      }>
    | Array<{
        id: string;
        ant: string;
        cockroach: string;
        blank: string;
        plate_was_changed: boolean;
      }>;
};
export const drawCapturedTable = ({
  title,
  monitorData,
}: drawCapturedTableProps) => {};

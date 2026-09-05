import { UpdatePestMonitorHeaders } from "./types/UpdatePestMonitorHeaders";

export const BlankInputForPestMonitorTable = ({
  value,
  propName,
  updatePestMonitorHeaders,
}: {
  value: string;
  propName: string;
  updatePestMonitorHeaders: UpdatePestMonitorHeaders;
}) => {
  return (
    <input
      className="w-full text-center"
      value={value}
      onChange={(e) => {
        updatePestMonitorHeaders(propName, e.target.value);
      }}
    />
  );
};

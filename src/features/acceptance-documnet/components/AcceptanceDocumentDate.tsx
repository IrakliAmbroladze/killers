import { InputDate } from "@/components";
import { getTodaysYYYY_MM_DDString } from "@/utils/calendar/getTodaysString";
import { memo } from "react";

export const AcceptanceDocumentDate = memo(function AcceptanceDocumentDate({
  handleChange,
}: {
  handleChange: (e: React.ChangeEvent<HTMLDataElement>) => void;
}) {
  console.log("render date");
  return (
    <InputDate
      name="date"
      defaultValue={getTodaysYYYY_MM_DDString()}
      handleChange={handleChange}
    />
  );
});

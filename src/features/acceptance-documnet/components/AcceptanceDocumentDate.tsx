import { InputDate } from "@/components";
import { getTodaysYYYY_MM_DDString } from "@/utils/calendar/getTodaysString";

export const AcceptanceDocumentDate = ({
  handleChange,
}: {
  handleChange: (e: React.ChangeEvent<HTMLDataElement>) => void;
}) => {
  return (
    <InputDate
      name="date"
      defaultValue={getTodaysYYYY_MM_DDString()}
      handleChange={handleChange}
    />
  );
};

import { getTodaysYYYY_MM_DDString } from "@/utils/calendar/getTodaysString";

export const AcceptanceDocumentDate = ({
  handleChange,
}: {
  handleChange: (e: React.ChangeEvent<HTMLDataElement>) => void;
}) => {
  return (
    <>
      <input
        type="date"
        name="date"
        defaultValue={getTodaysYYYY_MM_DDString()}
        onChange={handleChange}
      />
    </>
  );
};

import { CrawlingPestMonitorTableHeaders } from "@/types/documents/CrawlingPestMonitorTableHeaders";
import { UpdatePestMonitorHeaders } from "./types/UpdatePestMonitorHeaders";

export const BlankInputForPestMonitorTable = ({
  crawlingPestMonitorHeaders,
  updateCrawlingPestMonitorHeaders,
}: {
  crawlingPestMonitorHeaders: CrawlingPestMonitorTableHeaders;
  updateCrawlingPestMonitorHeaders: UpdatePestMonitorHeaders;
}) => {
  return (
    <input
      className="w-full text-center"
      value={crawlingPestMonitorHeaders.blank}
      onChange={(e) => {
        updateCrawlingPestMonitorHeaders("blank", e.target.value);
      }}
    />
  );
};

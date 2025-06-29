import { statuses } from "../constants/statuses";
import ListsContainer from "./ListsContainer";

const ToDoDoneList = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-around w-full gap-2.5 overflow-auto items-center sm:items-start">
      {statuses.map((status) => (
        <div key={status.id}>
          <ListsContainer status={status} />
        </div>
      ))}
    </div>
  );
};

export default ToDoDoneList;

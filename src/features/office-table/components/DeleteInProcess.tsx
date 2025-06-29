import React from "react";

const DeleteInProcess = ({
  count,
  total,
}: {
  count: number;
  total: number;
}) => {
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "calc(100vh - 100px)" }}
    >
      <div>
        იშლება... {count} / {total}
      </div>
    </div>
  );
};

export default DeleteInProcess;

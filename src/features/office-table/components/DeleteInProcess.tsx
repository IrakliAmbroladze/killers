import React from "react";

const DeleteInProcess = ({ total }: { total: number }) => {
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "calc(100vh - 100px)" }}
    >
      <div>იშლება... {total} მონაცემი</div>
    </div>
  );
};

export default DeleteInProcess;

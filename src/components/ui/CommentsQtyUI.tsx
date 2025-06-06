import React from "react";

const CommentsQtyUI = ({ children }: { children: number }) => {
  return (
    <div className="flex rounded-2xl bg-[#8338EC] text-white px-1.5 text-xs items-center">
      {children}
    </div>
  );
};

export default CommentsQtyUI;

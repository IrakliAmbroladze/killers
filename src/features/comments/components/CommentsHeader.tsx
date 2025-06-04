import React from "react";

const CommentsHeader = ({ commentsNumber }: { commentsNumber: number }) => {
  return (
    <div className="flex my-5 gap-1.5">
      <div className="font-bold ">კომენტარები</div>
      <div className="rounded-2xl bg-[#8338EC] text-white px-2.5">
        {commentsNumber}
      </div>
    </div>
  );
};

export default CommentsHeader;

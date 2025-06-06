import CommentsQtyUI from "@/components/ui/CommentsQtyUI";
import React from "react";

const CommentsHeader = ({ commentsNumber }: { commentsNumber: number }) => {
  return (
    <div className="flex my-5 gap-1.5">
      <div className="font-bold ">კომენტარები</div>
      <CommentsQtyUI>{commentsNumber}</CommentsQtyUI>
    </div>
  );
};

export default CommentsHeader;

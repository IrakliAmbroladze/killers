import React from "react";

export const Header = ({
  id,
  status,
  onHandleClick,
}: {
  id: string;
  status: string;
  onHandleClick: (e: React.MouseEvent) => void;
}): React.ReactElement => {
  return (
    <button
      id={id}
      onClick={onHandleClick}
      className="bg-green-500 text-white text-xs rounded-t-lg justify-center text-center p-1.5 cursor-pointer active:scale-95 ease-in-out transition-transform duration-150 hover:scale-102"
    >
      {status}
    </button>
  );
};

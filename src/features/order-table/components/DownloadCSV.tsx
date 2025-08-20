import { ReactNode } from "react";

const DownloadCSV = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className="hover:underline border rounded-lg px-2.5 py-0.5 cursor-pointer text-s"
    >
      {children}
    </button>
  );
};

export default DownloadCSV;

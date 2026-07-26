import { JSX, ReactNode } from "react";

export const Modal = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <div className="fixed inset-0 bg-gray-600/50 flex justify-center items-center">
      <div className=" bg-white text-black p-2 rounded-lg shadow-lg text-center max-h-[80vh] w-[90%] md:w-[50%] overflow-y-auto flex flex-col mt-20">
        <div className="flex justify-end">
          <button
            onClick={() => {
              console.log("we are in progcess");
              // setOpenModalIndex(null);
            }}
            className="border px-2.5 cursor-pointer hover:bg-gray-200 rounded-md"
          >
            close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

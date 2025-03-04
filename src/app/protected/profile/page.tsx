import Image from "next/image";
import { JSX } from "react";

const Profile = async (): Promise<JSX.Element> => {
  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-3xl sm:text-5xl md:text-8xl  m-10 dark:text-white text-black font-bold animate-rise0_25s">
        P R O F I L E
      </h2>
      <div className="relative flex w-full max-w-[1100px] mx-auto items-center p-5 min-h-screen bg-[linear-gradient(135deg,rgba(34,46,70,0.15)_50%,rgba(255,226,193,0.15)_50%)] rounded-lg h-[1000px]">
        <Image
          className="absolute z-20 top-10 w-24 md:w-52 bg-transparent shadow-[0px_0px_10px_2px_rgba(128,128,128,1)] rounded-full"
          src="/avatar.jpg"
          height={900}
          width={900}
          alt="User-image"
          priority
        />
        <div className="absolute flex flex-col items-end z-10 top-20 left-[10%] w-[80%] h-[80%] bg-[linear-gradient(0deg,#f0eff4,#5ea6c400)] text-black p-4"></div>
      </div>
    </div>
  );
};

export default Profile;

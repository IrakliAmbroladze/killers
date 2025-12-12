import { SignatureCanvas } from "./SignatureCanvas";

export const SignatureField = () => {
  return (
    <>
      <SignatureCanvas />

      <button
        className="px-4 py-2 bg-gray-200 rounded text-[#000] cursor-pointer hover:scale-105 active:scale-95"
        /*   onClick={() => {
            sigRef.current?.clear();
            setHasSignature(false);
          }}*/
      >
        Clear
      </button>
    </>
  );
};

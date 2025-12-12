import { SignatureField } from "@/components";

export default function AcceptanceSignature() {
  return (
    <div className="my-2.5 flex sm:justify-between flex-col gap-10 md:gap-0 md:flex-row">
      <div className="flex flex-col justify-between">
        <h2 className="font-bold ">დამკვეთის წარმომადგენელი</h2>
        <div className="flex flex-col ">
          <label>
            სახელი, გვარი <input type="text" className="border-b" />
          </label>{" "}
          <label>
            პირადი ნომერი <input type="text" className="border-b" />
          </label>{" "}
          <div>ხელმოწერა</div>
          <div className="w-[320px] min-h-[150px]">
            <SignatureField />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <h2 className="font-bold ">შემსრულებელი</h2>
        <div>ხელმოწერა</div>
        <div className="w-[320px] min-h-[150px]">
          <SignatureField />
        </div>
      </div>
    </div>
  );
}

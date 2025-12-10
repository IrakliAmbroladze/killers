export default function AcceptanceSignature() {
  return (
    <div className="my-2.5 flex justify-between">
      <div>
        <h2 className="font-bold my-5">დამკვეთის წარმომადგენელი</h2>
        <div className="flex flex-col pl-5">
          <label>
            სახელი, გვარი <input type="text" className="border-b" />
          </label>{" "}
          <label>
            პირადი ნომერი <input type="text" className="border-b" />
          </label>{" "}
          <label>
            ხელმოწერა <input type="text" className="border-b" />
          </label>
        </div>
      </div>
      <div>
        <h2 className="font-bold my-5">შემსრულებელი</h2>
        <label className="pl-5">
          ხელმოწერა <input type="text" className="border-b" />
        </label>
        <div className="w-full border-b my-5 pl-5"></div>
        <div className="w-full border-b my-5 pl-5"></div>
      </div>
    </div>
  );
}

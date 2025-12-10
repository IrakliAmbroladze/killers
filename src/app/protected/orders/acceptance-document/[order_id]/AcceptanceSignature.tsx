export default function AcceptanceSignature() {
  return (
    <div className="my-2.5">
      <h2 className="font-bold">დამკვეთის წარმომადგენელი</h2>
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
  );
}

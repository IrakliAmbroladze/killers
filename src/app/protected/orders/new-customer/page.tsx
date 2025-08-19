// app/new-customer/page.tsx
"use client";

import { useActionState } from "react";
import { insertCustomer } from "@/lib";
import Link from "next/link";

export default function NewCustomerPage() {
  const [state, formAction, isPending] = useActionState(insertCustomer, {
    message: "",
  });

  return (
    <div className="fixed inset-0 bg-gray-600/50 flex justify-center items-center">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg text-center max-h-[80vh] w-[90%] md:w-[50%] overflow-y-auto">
        <div className="flex justify-end">
          <Link href="./" className="font-semibold cursor-pointer">
            X
          </Link>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">ახალი მომხმარებელი</h2>

          <form action={formAction} className="space-y-4">
            <input
              type="text"
              name="id"
              placeholder="ს/კ"
              required
              className="w-full p-1 border rounded"
            />
            <input
              type="text"
              name="name"
              placeholder="დასახელება"
              required
              className="w-full p-1 border rounded"
            />
            <textarea
              name="description"
              placeholder="აღწერა"
              className="w-full p-1 border rounded"
            />
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-black hover:bg-gray-800 text-white active:scale-95 p-1 rounded cursor-pointer"
            >
              {isPending ? "Submitting..." : "Submit"}
            </button>
          </form>

          {state.message && (
            <p className="mt-2 text-sm text-green-600">{state.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

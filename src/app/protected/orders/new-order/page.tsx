import Link from "next/link";
import React from "react";
import { NewOrderForm } from "@/components";
import { getAuthenticatedUser } from "@/lib";
import { User } from "@supabase/supabase-js";

const NewOrder = async () => {
  const user: User | null = await getAuthenticatedUser();

  return (
    <div className="fixed inset-0 bg-gray-600/50 flex justify-center items-center">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg text-center max-h-[80vh] w-[90%] md:w-[50%] overflow-y-auto">
        <div className="flex justify-end">
          <Link href="./" className="font-semibold cursor-pointer">
            X
          </Link>
        </div>
        {user && <NewOrderForm user={user} />}
      </div>
    </div>
  );
};

export default NewOrder;

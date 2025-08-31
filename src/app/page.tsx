import { AuthUserEmail } from "@/components";
import { getAuthenticatedUser } from "@/lib";
import { User } from "@supabase/supabase-js";
import { Suspense } from "react";

export default function Home() {
  const userPromise: Promise<User | null> = getAuthenticatedUser();
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4 justify-center items-center h-lvh w-full">
        <h2 className="font-medium text-3xl mb-4 ">
          <div>Welcome to Killers</div>
        </h2>
        <Suspense fallback={" ... "}>
          <AuthUserEmail userPromise={userPromise} />
        </Suspense>
      </main>
    </>
  );
}

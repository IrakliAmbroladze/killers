import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    console.warn("error fetching user data");
  }

  const { data, error: displayError } = await supabase
    .from("employees")
    .select("display_name")
    .eq("id", user?.id);
  if (displayError) {
    console.warn("error displaying user name");
  }

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4 justify-center items-center h-lvh w-full">
        <h2 className="font-medium text-3xl mb-4">
          Welcome to Killers {data && data[0].display_name} !
        </h2>
      </main>
    </>
  );
}

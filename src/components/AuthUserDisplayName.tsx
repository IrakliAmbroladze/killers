import { getEmployeeDisplayName } from "@/lib";
import { User } from "@supabase/supabase-js";

export const AuthUserDisplayName = async ({
  userPromise,
}: {
  userPromise: Promise<User | null>;
}) => {
  const user = await userPromise;

  const displayName = await getEmployeeDisplayName(user);
  return <div>{displayName}</div>;
};

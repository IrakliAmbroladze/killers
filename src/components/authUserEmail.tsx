"use client";

import { User } from "@supabase/supabase-js";
import { use } from "react";

export const AuthUserEmail = ({
  userPromise,
}: {
  userPromise: Promise<User | null>;
}) => {
  const user = use(userPromise);
  return <div>{user?.email}</div>;
};

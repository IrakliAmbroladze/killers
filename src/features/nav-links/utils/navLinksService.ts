import { createClient } from "@/utils/supabase/server";
import { allLinks } from "../constants/allLinks";
import { isTechnician } from "@/utils/supabase/utils";

export const getNavLinks = async () => {
  const supabase = await createClient();

  const userResponse = await supabase.auth.getUser();

  const linksToShow = (await isTechnician(userResponse))
    ? allLinks.filter((link) => link.name !== "Sales" && link.name !== "Orders")
    : allLinks;

  return { linksToShow };
};

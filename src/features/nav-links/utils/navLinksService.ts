import { allLinks } from "../constants/allLinks";
import { isTechnician } from "@/utils/supabase/utils";
import { getCurrentUserResponse } from "../../../lib/getCurrentUserResponse";

export const getNavLinks = async () => {
  const { userResponse } = await getCurrentUserResponse();

  return userResponse.data.user
    ? (await isTechnician(userResponse))
      ? allLinks.filter(
          (link) => link.name !== "Sales" && link.name !== "Orders"
        )
      : allLinks
    : null;
};

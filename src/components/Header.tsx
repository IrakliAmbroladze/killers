import NavLinks from "@/features/nav-links/NavLinks";
import React from "react";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";

const Header = () => {
  return (
    <>
      <NavLinks />
      <div className="flex gap-5 items-center">
        {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
        <ThemeSwitcher />
      </div>
    </>
  );
};

export default Header;

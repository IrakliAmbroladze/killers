import { useEffect, useState } from "react";

export function useIsSmallScreen(breakpoint = 1024) {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setIsSmall(media.matches);
    const listener = () => setIsSmall(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [breakpoint]);

  return isSmall;
}

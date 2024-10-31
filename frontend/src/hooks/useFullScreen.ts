import { RefObject, useRef, useState } from "react";
import { useEventListener } from "./useEventListener";
import { logger } from "@/utils/logger";

export function useFullscreen(r?: RefObject<HTMLElement>) {
  const ref = r ?? useRef(document.documentElement);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(
    document.fullscreenElement !== null,
  );

  function openFullScreen() {
    if (!ref.current) {
      return;
    }

    if (ref.current.requestFullscreen) {
      ref.current.requestFullscreen().catch((err) => logger(err));
    }
  }

  function exitFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch((err) => logger(err));
    }
  }

  function toggleFullScreen(open?: boolean) {
    const shouldOpen = open ?? !isFullscreen;
    shouldOpen ? openFullScreen() : exitFullScreen();
  }

  useEventListener({
    ref,
    ev: "fullscreenchange",
    handler: () => {
      setIsFullscreen(document.fullscreenElement !== null);
    },
  });

  /* useEffect(() => {
    if(!ref.current) return;
    setIs
  }, []) */

  return { isFullscreen, openFullScreen, exitFullScreen, toggleFullScreen };
}

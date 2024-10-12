import { RefObject, useRef, useState } from "react";
import { useEventListener } from "./useEventListener";

export function useFullscreen(r?: RefObject<HTMLElement>) {
  const ref = r ?? useRef(document.documentElement);
  const [isFullscreen, setIsFullscreen] = useState<boolean>();

  function openFullScreen() {
    if (!ref.current) {
      return;
    }

    if (ref.current.requestFullscreen) {
      ref.current.requestFullscreen().catch((err) => console.error(err));
    }
  }

  function exitFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch((err) => console.error(err));
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

  return { isFullscreen, openFullScreen, exitFullScreen, toggleFullScreen };
}

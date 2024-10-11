import { RefObject, useEffect } from "react";

type UseEventListenerOptions<T = keyof HTMLElementEventMap> = {
  ref: RefObject<HTMLElement>;
  ev: T;
  handler: (e: Event) => any;
  options?: AddEventListenerOptions;
};

export function useEventListener({
  ref,
  ev,
  handler,
  options,
}: UseEventListenerOptions) {
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.addEventListener(ev, handler, options);

    return () => {
      if (!ref.current) {
        return;
      }

      ref.current.removeEventListener(ev, handler);
    };
  }, [ref, ev, options]);
}

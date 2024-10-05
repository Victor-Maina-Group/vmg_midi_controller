import React, { useMemo } from "react";
import { useState, RefObject, useEffect } from "react";

type GradientOverlayPropsType = {
  parentRef: RefObject<HTMLElement>;
};
export const GradientOverlay = React.memo((props: GradientOverlayPropsType) => {
  type SizeType = {
    clientWidth: number;
    scrollWidth: number;
  };
  const [parentRectInfo, setParentRectInfo] = useState<SizeType>();
  const [showOverlay, setShowOverlay] = useState<boolean>();
  const [showLeftOverlay, setShowLeftOverlay] = useState<boolean>();
  const [showRightOverlay, setShowRightOverlay] = useState<boolean>();
  const parentEl = useMemo(
    () => props.parentRef.current,
    [props.parentRef.current],
  );

  function updateParentWidth(entries: ResizeObserverEntry[]) {
    for (let entry of entries) {
      const { clientWidth, scrollWidth } = entry.target;
      if (
        clientWidth !== parentRectInfo?.clientWidth ||
        scrollWidth !== parentRectInfo.scrollWidth
      ) {
        setParentRectInfo({ clientWidth, scrollWidth });
      }
    }
  }

  // Create ResizeObserver to monitor size changes in parent
  useEffect(() => {
    const observer = new ResizeObserver(updateParentWidth);
    const el = parentEl;

    if (el) observer.observe(el);
    setShowOverlay(
      () =>
        parentRectInfo &&
        parentRectInfo?.scrollWidth > parentRectInfo?.clientWidth,
    );

    return () => observer.disconnect();
  }, [parentRectInfo, showOverlay]);

  // Toggle left overlay on scroll
  useEffect(() => {
    const el = props.parentRef.current;
    if (!el) return;

    const listener: EventListener = () => {
      setShowLeftOverlay(el.scrollLeft > 1);
    };
    el.addEventListener("scroll", listener);

    return () => {
      el.removeEventListener("scroll", listener);
    };
  }, [showLeftOverlay]);

  // Toggle right overlay on scroll
  useEffect(() => {
    if (!props.parentRef.current) return;
    const el = props.parentRef.current;
    const condition = () => el.offsetWidth + el.scrollLeft <= el.scrollWidth;
    setShowRightOverlay(condition());

    const listener: EventListener = () => {
      setShowRightOverlay(condition());
    };
    el.addEventListener("scroll", listener);

    return () => {
      el.removeEventListener("scroll", listener);
    };
  }, [showRightOverlay]);

  return (
    <div
      className={`absolute z-50 ${!showOverlay && "hidden"} pointer-events-none inset-0`}
    >
      {/* Left Overlay */}
      <div
        id="leftOverlay"
        className={`absolute inset-0 right-[80%] bg-gradient-to-r from-white to-white/0 ${showLeftOverlay ? "opacity-100" : "opacity-0"}`}
      ></div>

      {/* Right Overlay */}
      <div
        id="leftOverlay"
        className={`absolute inset-0 left-[80%] bg-gradient-to-l from-white to-white/0 ${showRightOverlay ? "opacity-100" : "opacity-0"}`}
      ></div>
    </div>
  );
});

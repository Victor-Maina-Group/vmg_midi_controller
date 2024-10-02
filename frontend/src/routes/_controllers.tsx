import { GradientOverlay } from "@/components/GradientOverlay";
import {
  createFileRoute,
  createLink,
  Link,
  LinkProps,
  Outlet,
  ToSubOptions,
  useLocation,
} from "@tanstack/react-router";
import { ForwardedRef, forwardRef, useEffect, useRef } from "react";
import { Icon, IconifyIconProps } from "@iconify/react";
import { Pill } from "@/components/Pill";
import { Button } from "@/components/Button";

export const Route = createFileRoute("/_controllers")({
  component: ControllerLayout,
});

function ControllerLayout() {
  return (
    <div className="p-4 container m-auto flex flex-col gap-4 min-h-full">
      <Header />
      <main className="flex-1 flex">
        <Outlet />
      </main>
      <aside></aside>
    </div>
  );
}

function Header() {
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef(new Array());
  const linkProps = [
    { to: "/transport", icon: "bx:play", text: "Transport" },
    {
      to: "/sliders",
      icon: "bx:slider-alt",
      text: "Sliders",
    },
    { to: "/pads", icon: "bxs:grid", text: "Pads" },
  ];

  // Scroll to respective tab when location changes
  useEffect(() => {
    const navEl = navRef.current;
    const els = linkRefs.current as HTMLAnchorElement[];
    const timeout = setTimeout(() => {
      els.forEach((el) => {
        if (navEl && el.dataset.status === "active") {
          navEl.scrollTo({ left: el.offsetLeft, behavior: "smooth" });
        }
      });
    }, 100);

    return () => {
      linkRefs.current = new Array();
      clearTimeout(timeout);
    };
  }, [location]);

  return (
    <header className="font-medium flex item-center justify-between gap-4">
      <nav className="relative flex-1">
        <GradientOverlay parentRef={navRef} />
        <div
          ref={navRef}
          className="flex gap-2 absolute z-10 inset-0 max-w-max overflow-x-auto [overflow:-moz-scrollbars-none] [scrollbar-with:_none] [-ms-overflow-style:_none] [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:hidden"
        >
          {linkProps.map((linkProp, i) => (
            <NavLink
              key={i}
              to={linkProp.to}
              icon={linkProp.icon}
              ref={(link) => linkRefs.current.push(link)}
            >
              {linkProp.text}
            </NavLink>
          ))}
        </div>
      </nav>
      <TrackInfo />

      <div className="flex items-center gap-1">
        <Button>
          <Icon icon="bx:cog" />
        </Button>

        <Button>
          <Icon icon="bx:power-off" />
        </Button>
      </div>
    </header>
  );
}

type NavLinkPropsType = LinkProps & {
  href?: ToSubOptions["to"];
  icon: IconifyIconProps["icon"];
};
const NavLink = createLink(
  forwardRef(
    (props: NavLinkPropsType, ref: ForwardedRef<HTMLAnchorElement>) => {
      const location = useLocation();
      const isActive = props.href
        ? location.pathname.includes(props.href)
        : false;

      return (
        <Link
          ref={ref}
          {...props}
          to={props.href}
          className={`flex gap-3 items-center px-4 py-3 rounded-full transition-[150ms]  ${isActive ? "bg-gray-400" : "bg-gray-200  hover:bg-gray-300"}`}
        >
          <Icon icon={props.icon} />
          {props.children as React.ReactNode}
          <Icon
            icon={isActive ? "bxs:circle" : "bx:circle"}
            className="text-[10px]"
          />
        </Link>
      );
    },
  ),
);

function TrackInfo() {
  return (
    <div className="flex items-center gap-1">
      <TimeSignature />
      <Tempo />
      <PlaybackStatus />
      <SongPosition />
    </div>
  );
}

function TimeSignature() {
  return (
    <Pill>
      <span>4</span>
      <span>/</span>
      <span>4</span>
    </Pill>
  );
}

function Tempo() {
  return (
    <Pill>
      <span>120</span>
      <span>BPM</span>
    </Pill>
  );
}

function PlaybackStatus() {
  return (
    <div className="px-2">
      <Icon icon="bx:play" />
    </div>
  );
}

function SongPosition() {
  return (
    <Pill>
      <span>4</span>
      <span>.</span>
      <span>0</span>
      <span>.</span>
      <span>1</span>
    </Pill>
  );
}

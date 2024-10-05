import { Button } from "@/components/Button";
import { GradientOverlay } from "@/components/GradientOverlay";
import { Pill } from "@/components/Pill";
import { Tab } from "@/components/Tab";
import { lastGroupStore } from "@/stores/lastGroup";
import { Icon, IconifyIconProps } from "@iconify/react/dist/iconify.js";
import {
  createLink,
  CreateLinkProps,
  Link,
  ToSubOptions,
  useLocation,
  useMatch,
} from "@tanstack/react-router";
import {
  ForwardedRef,
  forwardRef,
  memo,
  PropsWithChildren,
  useMemo,
  useRef,
} from "react";
import { useStore } from "zustand";

type ControllerPropsType = PropsWithChildren;
export const ControllerLayout = memo((props: ControllerPropsType) => {
  return (
    <div className="container m-auto flex min-h-full flex-col gap-4 p-4">
      <Header />
      <div className="flex flex-1 gap-4 md:gap-8">{props.children}</div>
    </div>
  );
});

const Header = () => {
  const navRef = useRef<HTMLDivElement>(null);
  // Scroll to respective tab when location changes
  // useEffect(() => {
  //   const navEl = navRef.current;
  //   const els = linkRefs.current as HTMLAnchorElement[];
  //   const timeout = setTimeout(() => {
  //     els.forEach((el) => {
  //       if (navEl && el.dataset.status === "active") {
  //         navEl.scrollTo({ left: el.offsetLeft, behavior: "smooth" });
  //       }
  //     });
  //   }, 100);
  //
  //   return () => {
  //     linkRefs.current = new Array();
  //     clearTimeout(timeout);
  //   };
  // }, [pathname]);

  return (
    <header className="item-center flex justify-between gap-4 font-medium">
      <nav className="relative max-lg:flex-1">
        <GradientOverlay parentRef={navRef} />
        <div
          ref={navRef}
          className="inset-0 z-10 flex max-w-max gap-2 overflow-x-auto [-ms-overflow-style:_none] [overflow:-moz-scrollbars-none] [scrollbar-with:_none] max-lg:absolute [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:w-0"
        >
          {/* {linkProps.map((linkProp, i) => (
            <NavLink
              key={i}
              to={linkProp.to}
              icon={linkProp.icon}
              // ref={(link) => linkRefs.current.push(link)}
            >
              {linkProp.text}
            </NavLink>
          ))} */}

          <NavLink to="/transport" icon="bx:play">
            Transport
          </NavLink>
          <SlidersNavLink />
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
};

function SlidersNavLink() {
  const { sliders: lastSliderGroup } = useStore(lastGroupStore);
  return (
    <NavLink
      to={"/sliders/$groupId" as ToSubOptions["to"]}
      params={{ groupId: lastSliderGroup } as ToSubOptions["params"]}
      icon="bx:slider-alt"
    >
      Sliders
    </NavLink>
  );
}

type NavLinkPropsType = CreateLinkProps & {
  to?: ToSubOptions["to"];
  href?: ToSubOptions["to"];
  icon: IconifyIconProps["icon"];
};
const NavLink = memo(
  createLink(
    forwardRef(
      (props: NavLinkPropsType, ref: ForwardedRef<HTMLAnchorElement>) => {
        const isActive = false;

        const match = useMatch({ from: props.href });
        console.log(match);

        return (
          <Link ref={ref} {...props} to={props.href}>
            <Tab isActive={isActive}>
              <Icon icon={props.icon} />
              {props.children as React.ReactNode}
            </Tab>
          </Link>
        );
      },
    ),
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

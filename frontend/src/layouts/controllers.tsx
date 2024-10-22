import { Button } from "@/components/Button";
import { GradientOverlay } from "@/components/GradientOverlay";
import { Pill } from "@/components/Pill";
import { Tab } from "@/components/Tab";
import { useFullscreen } from "@/hooks/useFullScreen";
import { Icon, IconifyIconProps } from "@iconify/react/dist/iconify.js";
import {
  createLink,
  CreateLinkProps,
  Link,
  ToSubOptions,
  useLocation,
} from "@tanstack/react-router";
import {
  ForwardedRef,
  forwardRef,
  memo,
  PropsWithChildren,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { useStore } from "zustand";
import { Route as transportRoute } from "@/routes/control/transport/route";
import { Route as slidersRoute } from "@/routes/control/sliders/$groupId";
import { Route as padsRoute } from "@/routes/control/pads/$groupId";
import { GroupTabs } from "@/components/GroupTabs";
import { boundStore } from "@/store";

type ControllerPropsType = PropsWithChildren;
export const ControllerLayout = memo((props: ControllerPropsType) => {
  return (
    <div className="container m-auto flex min-h-full flex-col gap-4 p-4">
      <Header />
      <div className="flex flex-1 gap-8 md:gap-12">
        {props.children}
        <GroupTabs />
      </div>
    </div>
  );
});

const Header = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  // Scroll to respective tab when location changes
  useEffect(() => {
    const navEl = navRef.current;
    const els = navEl?.querySelectorAll("a");
    if (!els || els?.length == 0) return;

    const timeout = setTimeout(() => {
      els.forEach((el) => {
        if (navEl && el.classList.contains("active")) {
          navEl.scrollTo({ left: el.offsetLeft, behavior: "smooth" });
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [pathname]);

  const { isFullscreen, toggleFullScreen } = useFullscreen();

  return (
    <header className="item-center flex justify-between gap-4 font-medium">
      <nav className="relative max-lg:flex-1">
        <GradientOverlay parentRef={navRef} />
        <div
          ref={navRef}
          className="inset-0 z-10 flex max-w-max gap-2 overflow-x-auto [-ms-overflow-style:_none] [overflow:-moz-scrollbars-none] [scrollbar-with:_none] max-lg:absolute [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:w-0"
        >
          <NavLink to={transportRoute.to} icon="bx:play" parentref={navRef}>
            Transport
          </NavLink>
          <SlidersNavLink />
          <PadsNavLink />
        </div>
      </nav>

      {/* <TrackInfo /> */}

      <div className="flex items-center gap-1">
        {/* <Button>
          <Icon icon="bx:cog" />
        </Button> */}

        <Button onClick={() => toggleFullScreen()}>
          <Icon icon={isFullscreen ? "bx:exit-fullscreen" : "bx:fullscreen"} />
        </Button>
      </div>
    </header>
  );
};

function SlidersNavLink() {
  const lastSliderGroup = useStore(
    boundStore,
    (state) => state.lastSliderGroup,
  );
  return (
    <NavLink
      to={slidersRoute.to}
      // @ts-ignore
      params={{ groupId: lastSliderGroup } as ToSubOptions["params"]}
      icon="bx:slider-alt"
    >
      Sliders
    </NavLink>
  );
}

function PadsNavLink() {
  const lastPadGroup = useStore(boundStore, (state) => state.lastPadGroup);
  return (
    <NavLink
      to={padsRoute.to}
      // @ts-ignore
      params={{ groupId: lastPadGroup } as ToSubOptions["params"]}
      icon="bxs:grid"
    >
      Pads
    </NavLink>
  );
}

type NavLinkPropsType = CreateLinkProps & {
  to?: ToSubOptions["to"];
  href?: ToSubOptions["to"];
  icon: IconifyIconProps["icon"];
  parentref?: RefObject<HTMLElement>;
};
const NavLink = memo(
  createLink(
    forwardRef(
      (props: NavLinkPropsType, ref: ForwardedRef<HTMLAnchorElement>) => {
        const [isActive, setIsActive] = useState(false);
        const { href: locationHref } = useLocation();

        useEffect(() => {
          setIsActive(locationHref === props.href);
        }, [isActive, locationHref, props.href]);

        useEffect(() => {
          if (isActive) {
            const parentEl = props.parentref?.current;
            const el = ref;
            if (!parentEl || !el) {
              return;
            }
            parentEl.scrollTo({ left: el.offsetLeft, behavior: "smooth" });
          }
        }, [isActive]);

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

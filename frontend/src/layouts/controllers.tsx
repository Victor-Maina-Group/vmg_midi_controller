import QRCode from "qrcode";
import { Button } from "@/components/Button";
import { GradientOverlay } from "@/components/GradientOverlay";
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
  const is_socket_open = useStore(boundStore, (state) => state.is_socket_open);
  return (
    <div className="container m-auto flex min-h-full flex-col gap-4 p-4">
      <Header showNav={is_socket_open} />
      <div className="flex flex-1 gap-8 md:gap-12 portrait:flex-col landscape:flex-row">
        {props.children}
        {is_socket_open && <GroupTabs />}
        {!is_socket_open && <HostInfo />}
      </div>
    </div>
  );
});

type HeaderProps = { showNav: boolean };
const Header = ({ showNav }: HeaderProps) => {
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
    <header className="relative flex items-center justify-between gap-4 font-medium">
      {showNav ? (
        <nav className="relative min-h-10 flex-1">
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
      ) : (
        <span className="h-full font-medium leading-none">
          Disconnected from host.
        </span>
      )}

      {/* <TrackInfo /> */}

      <div className="ml-auto flex items-center gap-1">
        {/* <Button>
          <Icon icon="bx:cog" />
        </Button> */}

        <ToggleConnection />
        <Button onClick={() => toggleFullScreen()} className="h-full">
          <Icon icon={isFullscreen ? "bx:exit-fullscreen" : "bx:fullscreen"} />
        </Button>
      </div>
    </header>
  );
};

function HostInfo() {
  const [host_address, set_host_address] = useState<string>();
  const qr_canvas_ref = useRef<HTMLCanvasElement>(null);

  async function get_ip() {
    const url = new URL(window.location.href + "address");
    const res = await fetch(url);
    const hostname = await res.text();

    if (hostname.startsWith("<!doctype html>")) return;

    const port = window.location.port;

    return `http://${hostname}:${port}`;
  }

  function generate_qr_code(val: string) {
    if (qr_canvas_ref.current === undefined) return;

    QRCode.toCanvas(qr_canvas_ref.current, val, function (error) {
      if (error) console.error(error);
      console.log("success!");
    });
  }

  useEffect(() => {
    get_ip().then((ip) => {
      set_host_address(ip);

      if (host_address) generate_qr_code(host_address);
    });
  }, [host_address]);

  if (host_address !== undefined) {
    return (
      <div className="grid gap-8 md:grid-cols-[auto_1fr]">
        <div className="flex flex-1 flex-col">
          <h1 className="mb-4 text-2xl font-bold">Scan this QR code</h1>
          <div className="w-full md:max-w-80">
            <canvas
              ref={qr_canvas_ref}
              className="!h-full !w-full object-contain object-top"
            ></canvas>
          </div>
        </div>

        <div className="other-info flex-1">
          <h1 className="mb-4 text-2xl font-bold">
            Or enter this link in your device's browser.
          </h1>
          <Button className="rounded-xl text-left text-lg font-medium dark:bg-gray-700">
            {host_address}
          </Button>
        </div>
      </div>
    );
  } else return null;
}

function ToggleConnection() {
  const open_socket = useStore(boundStore, (state) => state.open_socket);
  const close_socket = useStore(boundStore, (state) => state.close_socket);
  const is_socket_open = useStore(boundStore, (state) => state.is_socket_open);

  function handleClick() {
    if (is_socket_open) close_socket();
    else open_socket();
  }

  // if (is_socket_open) {
  // }
  return (
    <Button onClick={() => handleClick()} className="h-full">
      {!is_socket_open ? (
        <>
          <span className="font-medium leading-none">Connect</span>
          <Icon icon="bx:chevrons-right" />
        </>
      ) : (
        <Icon icon="bx:x" />
      )}
    </Button>
  );
}

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
            // @ts-ignore
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

// function TrackInfo() {
//   return (
//     <div className="flex items-center gap-1">
//       <TimeSignature />
//       <Tempo />
//       <PlaybackStatus />
//       <SongPosition />
//     </div>
//   );
// }

// function TimeSignature() {
//   return (
//     <Pill>
//       <span>4</span>
//       <span>/</span>
//       <span>4</span>
//     </Pill>
//   );
// }
//
// function Tempo() {
//   return (
//     <Pill>
//       <span>120</span>
//       <span>BPM</span>
//     </Pill>
//   );
// }
//
// function PlaybackStatus() {
//   return (
//     <div className="px-2">
//       <Icon icon="bx:play" />
//     </div>
//   );
// }
//
// function SongPosition() {
//   return (
//     <Pill>
//       <span>4</span>
//       <span>.</span>
//       <span>0</span>
//       <span>.</span>
//       <span>1</span>
//     </Pill>
//   );
// }

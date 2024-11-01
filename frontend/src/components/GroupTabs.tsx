import {
  createLink,
  CreateLinkProps,
  Link,
  ToSubOptions,
  useLocation,
  useMatches,
} from "@tanstack/react-router";
import {
  ForwardedRef,
  forwardRef,
  memo,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Tab } from "./Tab";

export const GroupTabs = memo(() => {
  const tabArr = [1, 2, 3, 4];
  const matches = useMatches();
  const { params, routeId } = matches[matches.length - 1];
  const { groupId } = params as { groupId?: string };

  if (!groupId) return null;

  return (
    <aside className="grid-cols-2 justify-center gap-4 portrait:grid landscape:flex landscape:flex-col">
      {tabArr.map((num) => {
        return (
          <GroupTab
            key={num}
            to={routeId}
            // @ts-ignore
            params={{ groupId: num.toString() }}
          >
            <span className="text-sm font-medium">Group {num}</span>
          </GroupTab>
        );
      })}
    </aside>
  );
});

type GroupTabProps = {
  href?: ToSubOptions["to"];
} & CreateLinkProps;
export const GroupTab = memo(
  createLink(
    forwardRef((props: GroupTabProps, ref: ForwardedRef<HTMLAnchorElement>) => {
      const [isActive, setIsActive] = useState(false);
      const { href: locationHref } = useLocation();

      useEffect(() => {
        setIsActive(locationHref === props.href);
      }, [locationHref, isActive, props.href]);

      return (
        <Link ref={ref} {...props} to={props.href}>
          <Tab
            ref={ref}
            isActive={isActive}
            className="flex h-max w-full justify-center"
          >
            {props.children as ReactNode}
          </Tab>
        </Link>
      );
    }),
  ),
);

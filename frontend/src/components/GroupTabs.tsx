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
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Tab } from "./Tab";

type GroupTabsType = {
  parentRoute: string;
};
export function GroupTabs({ parentRoute }: GroupTabsType) {
  const tabArr = [1, 2, 3, 4];

  return (
    <aside className="flex flex-col justify-center gap-4">
      {tabArr.map((num) => {
        return (
          <GroupTab
            key={num}
            to={parentRoute}
            // @ts-ignore
            params={{ groupId: num.toString() }}
          >
            <span className="text-sm font-medium">Group {num}</span>
          </GroupTab>
        );
      })}
    </aside>
  );
}

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
          <Tab ref={ref} isActive={isActive} className="h-max">
            {props.children as ReactNode}
          </Tab>
        </Link>
      );
    }),
  ),
);

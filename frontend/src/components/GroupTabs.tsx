import {
  createLink,
  CreateLinkProps,
  Link,
  ToSubOptions,
  useLocation,
  useMatch,
} from "@tanstack/react-router";
import { ForwardedRef, forwardRef, memo, ReactNode, useMemo } from "react";
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
      const { pathname } = useMatch({ from: props.to });
      const isActive = useMemo(() => {
        return pathname === props.href;
      }, [pathname]);
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

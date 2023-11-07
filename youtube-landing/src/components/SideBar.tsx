import { ChevronDown, ChevronUp, Clapperboard, Home, Library, Repeat } from "lucide-react";
import { ElementType, ReactNode, useState } from "react";
import { Button, buttonStyles } from "./Button";
import { twMerge } from "tailwind-merge";
import React from "react";

export function SideBar () {
return (
  <>
    <aside className="sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 lg:hidden">
      <SmallSidebarItem Icon={Home} title="Home" url="/" />
      <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
      <SmallSidebarItem Icon={Clapperboard} title="Subscriptions" url="/subscriptions" />
      <SmallSidebarItem Icon={Library} title="Home" url="/library" />
    </aside>
    <aside className="w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 flex">
      <LargeSideBarSection>
        <LargeSideBarItem isActive Icon={Home} title="Home" url="/" />
        <SmallSidebarItem Icon={Clapperboard} title="Subscriptions" url="/subscriptions" />

      </LargeSideBarSection>
    </aside>
  </>
)
}

type SmallSidebarItemProps = {
Icon: ElementType;
title: string;
url: string;
}

function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
  return (
    <a href={url} className={twMerge(buttonStyles({ variant: "ghost" }), "py-4 px-1 flex flex-col items-center rounded-lg gap-1")}>
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  )
}

type LargeSideBarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number; 
}

function LargeSideBarSection ({ children, title, visibleItemCount = Number.POSITIVE_INFINITY }: LargeSideBarSectionProps) {
  const [isExpanded, setIsExpended] = useState(false);
  const childrenArray = React.Children.toArray(children).flat();
  const showExpandedButton = childrenArray.length > visibleItemCount;
  const visibleChildren = isExpanded ? childrenArray : childrenArray.slice(0, visibleItemCount);
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;
  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
      {visibleChildren}
      {showExpandedButton && (
      <Button
        variant="ghost"
        className="w-full flex items-center rounded-lg ap-4 p-3"
        onClick={() => setIsExpended(e => !e)}
      >
        <ButtonIcon className="w-6 h-6" />
        <div>{isExpanded ? "Show less" : "Show more"}</div>

      </Button>
      )}
    </div>
  )
}

type LargeSideBarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
  isActive?: boolean;
}

function LargeSideBarItem ({ title, Icon, url, isActive = false }: LargeSideBarItemProps) {
  return (
    <a href={url} className={twMerge(buttonStyles({ variant: "ghost" }), `w-full flex items-center rounded-lg gap-4 p-3 ${isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined}`)}>
      <Icon className="w-6 h-6" />
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  )
}
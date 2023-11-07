import { ChevronDown, ChevronUp, Clapperboard, Home, Library, Repeat, History, PlaySquare, Clock, ListVideo, Flame, ShoppingBag, Music2, Film, Radio, Gamepad2, Newspaper, Trophy, Lightbulb, Shirt, Podcast } from "lucide-react";
import React, { ElementType, ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button, buttonStyles } from "./Button";
import { playlists, subscriptions } from "../data/sidebar";
import { useSideBarContext } from "../context/SideBarContext";
import { PageHeaderFirstSection } from "../layout/PageHeader";

export function SideBar () {
  const { isLargeOpen, isSmallOpen, close } = useSideBarContext();

return (
  <>
    <aside className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${isLargeOpen ? "lg:hidden" : "lg:flex"}`}>
      <SmallSidebarItem Icon={Home} title="Home" url="/" />
      <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
      <SmallSidebarItem Icon={Clapperboard} title="Subscriptions" url="/subscriptions" />
      <SmallSidebarItem Icon={Library} title="Home" url="/library" />
    </aside>
    {isSmallOpen && (
      <div
        onClick={close}
        className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"
      >

      </div>
    )}
    <aside className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 ${isLargeOpen ? "lg:flex" : "lg:hidden"} ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}>
      <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
        <PageHeaderFirstSection />
      </div>
      <LargeSideBarSection>
        <LargeSideBarItem isActive IconOrImgUrl={Home} title="Home" url="/" />
        <LargeSideBarItem IconOrImgUrl={Clapperboard} title="Subscriptions" url="/subscriptions" />
      </LargeSideBarSection>
      <hr />
      <LargeSideBarSection visibleItemCount={5}>
      <LargeSideBarItem isActive IconOrImgUrl={Library} title="Library" url="/library" />
      <LargeSideBarItem isActive IconOrImgUrl={History} title="History" url="/history" />
      <LargeSideBarItem isActive IconOrImgUrl={PlaySquare} title="Your Videos" url="/your-videos" />
      <LargeSideBarItem isActive IconOrImgUrl={Clock} title="Watch Later" url="/playlist?list=WL" />
      {playlists.map(playlist => (
        <LargeSideBarItem
          key={playlist.id}
          IconOrImgUrl={ListVideo}
          title={playlist.name}
          url={`/playlist?list=${playlist.id}`}
        />
      ))}
      </LargeSideBarSection>
      <hr />
      <LargeSideBarSection visibleItemCount={5}>
        {subscriptions.map(subscription => (
          <LargeSideBarItem
            key={subscription.id}
            IconOrImgUrl={subscription.imgUrl}
            title={subscription.channelName}
            url={`/@${subscription.id}`}
          />
        ))}
      </LargeSideBarSection>
      <hr />
      <LargeSideBarSection title="Explore">
        <LargeSideBarItem
          IconOrImgUrl={Flame}
          title="Trending"
          url="/trending"
        />
        <LargeSideBarItem
          IconOrImgUrl={ShoppingBag}
          title="Shopping"
          url="/shopping"
        />
        <LargeSideBarItem IconOrImgUrl={Music2} title="Music" url="/music" />
        <LargeSideBarItem
          IconOrImgUrl={Film}
          title="Movies & TV"
          url="/movies-tv"
        />
        <LargeSideBarItem IconOrImgUrl={Radio} title="Live" url="/live" />
        <LargeSideBarItem
          IconOrImgUrl={Gamepad2}
          title="Gaming"
          url="/gaming"
        />
        <LargeSideBarItem IconOrImgUrl={Newspaper} title="News" url="/news" />
        <LargeSideBarItem
          IconOrImgUrl={Trophy}
          title="Sports"
          url="/sports"
        />
        <LargeSideBarItem
          IconOrImgUrl={Lightbulb}
          title="Learning"
          url="/learning"
        />
        <LargeSideBarItem
          IconOrImgUrl={Shirt}
          title="Fashion & Beauty"
          url="/fashion-beauty"
        />
        <LargeSideBarItem
          IconOrImgUrl={Podcast}
          title="Podcasts"
          url="/podcasts"
        />
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
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-4 px-1 flex flex-col items-center rounded-lg gap-1"
      )}
    >
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
        className="w-full flex items-center rounded-lg gap-4 p-3"
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
  IconOrImgUrl: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
}

function LargeSideBarItem ({ title, IconOrImgUrl, url, isActive = false }: LargeSideBarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }), `w-full flex items-center rounded-lg gap-4 p-3 ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
        }`
      )}
    >
      {typeof IconOrImgUrl === 'string' ? (
        <img src={IconOrImgUrl} className="w-6 h-6 rounded-full" />
      ) : (
        <IconOrImgUrl className="w-6 h-6" />
      )}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  )
}
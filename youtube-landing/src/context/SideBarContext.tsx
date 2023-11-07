import { ReactNode, createContext, useContext, useEffect, useState } from "react"

type SideBarContextType = {
  isLargeOpen: boolean;
  isSmallOpen: boolean;
  toggle: () => void;
  close: () => void;
}

const SideBarContext = createContext<SideBarContextType | null>(null);

type SideBarContextProviderProps = {
  children: ReactNode;
}
export function useSideBarContext() {
  const value = useContext(SideBarContext);

  if (value == null) throw new Error("can't use outside of SideBarProvider");
  return value;
}
export function SideBarProvider ({ children }: SideBarContextProviderProps) {
  const [isLargeOpen, setIsLargeOpen] = useState(true);
  const [isSmallOpen, setIsSmallOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (!isScreenSmall()) setIsSmallOpen(false);
    }

    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
    }
  }, []);

  function isScreenSmall () {
    return window.innerWidth < 1024
  }

  function close () {
    if (isScreenSmall()) {
      setIsSmallOpen(false);
    } else {
      setIsLargeOpen(false);
    }
  }
  function toggle () {
    if (isScreenSmall()) {
      setIsSmallOpen(s => !s);
    } else {
      setIsLargeOpen(l => !l);
    }
  }

  return (
    <SideBarContext.Provider value={{
      isLargeOpen,
      isSmallOpen,
      toggle,
      close
      }}
    >
      {children}
    </SideBarContext.Provider>
  )
}
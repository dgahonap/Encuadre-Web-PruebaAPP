"use client";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { BottomNav } from "@/components/BottomNav";
import { GlobalSheets } from "@/components/GlobalSheets";

const NAV_ROUTES = ["/home", "/explore", "/missions", "/profile"];

export function PhoneFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showNav = NAV_ROUTES.includes(pathname);
  return (
    <div className="enc">
      <div className="stage">
        <div className="phone">
          {children}
          {showNav && <BottomNav />}
          <GlobalSheets />
        </div>
      </div>
    </div>
  );
}

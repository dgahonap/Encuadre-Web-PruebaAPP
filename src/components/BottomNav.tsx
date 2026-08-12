"use client";
import { usePathname, useRouter } from "next/navigation";
import { Home, Compass, Trophy, User, type LucideIcon } from "lucide-react";

const tabs: [string, string, LucideIcon][] = [
  ["/home", "Inicio", Home],
  ["/explore", "Explorar", Compass],
  ["/missions", "Misiones", Trophy],
  ["/profile", "Perfil", User],
];

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="nav">
      {tabs.map(([href, label, I]) => (
        <button key={href} className={"navi" + (pathname === href ? " on" : "")} onClick={() => router.push(href)}>
          <I size={22} /><span>{label}</span>
        </button>
      ))}
    </div>
  );
}

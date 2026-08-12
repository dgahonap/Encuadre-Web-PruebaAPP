import { Sun, Zap, Timer, Aperture, Plane, Focus, Gauge, Mountain, Building2, Users, type LucideIcon } from "lucide-react";

/* Mapea claves de datos (concepts.icon, mission.icon, categoría) a componentes de icono. */
export const ICONS: Record<string, LucideIcon> = {
  sun: Sun, zap: Zap, timer: Timer, aperture: Aperture, plane: Plane, focus: Focus, gauge: Gauge,
};
export const catIcon: Record<string, LucideIcon> = {
  Naturaleza: Mountain, Ciudad: Building2, Personas: Users, Dron: Plane, Deportes: Activity
};

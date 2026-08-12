import type { Camera, Lens, Drone } from "@/types";

/* Etiqueta legible del equipo actual, usada en varias pantallas. */
export function equipLabel(camera: Camera | null, lens: Lens | null, drone: Drone, droneId: string | null): string {
  if (camera) return `${camera.brand} ${camera.model}${lens ? ` · ${lens.model.split(" ").slice(1).join(" ")}` : ""}`;
  if (droneId) return `${drone.brand} ${drone.model}`;
  return "Sin equipo";
}

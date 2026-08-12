import type { Mission, Photo } from "@/types";

export const MISSIONS: Mission[] = [
  { id: "m1", title: "Golden Hour", desc: "Consigue una foto durante la hora dorada.", xp: 100, icon: "sun", match: (p: Photo) => p.light === "Golden hour" },
  { id: "m2", title: "Congela el movimiento", desc: "Completa un desafío con velocidad ≥ 1/1000.", xp: 80, icon: "zap", match: (p: Photo) => p.shutter <= 1 / 1000 },
  { id: "m3", title: "Efecto seda", desc: "Domina una larga exposición (≥ 1 s).", xp: 120, icon: "timer", match: (p: Photo) => p.shutter >= 1 },
  { id: "m4", title: "Desenfoque perfecto", desc: "Haz un retrato con apertura ≤ f/2.8.", xp: 90, icon: "aperture", match: (p: Photo) => p.ap <= 2.8 && p.cat === "Personas" },
  { id: "m5", title: "Primer vuelo", desc: "Completa tu primer desafío con dron.", xp: 150, icon: "plane", match: (p: Photo) => Boolean(p.drone) },
];

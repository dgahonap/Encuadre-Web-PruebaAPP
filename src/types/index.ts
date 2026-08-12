/* =========================================================================
   Tipos del dominio de Encuadre.
   Cada interfaz mapea 1:1 a una tabla de PostgreSQL/Supabase en producción.
   ========================================================================= */

export type Mount = "EF" | "RF" | "E" | "Z";
export type Difficulty = "Principiante" | "Intermedio" | "Avanzado";
export type Priority = "lowISO" | "freeze" | "balanced";

export interface Camera {
  id: string;
  brand: string;
  model: string;
  type: string;
  mount: Mount;
  sensor: string;
  sensorSize: string;
  isoMin: number;
  isoMax: number;
  shutterMin: number; // en segundos (1/4000 = 0.00025)
  shutterMax: number; // en segundos (30)
  modes: string[];
  af: string[];
  metering: string[];
  wb: string[];
  raw: boolean;
  video: string;
  notes: string;
}

export interface Lens {
  id: string;
  brand: string;
  model: string;
  mounts: string[]; // "RF*" = compatible vía adaptador
  focalMin: number;
  focalMax: number;
  apWide: number; // apertura máxima a focal corta
  apTele: number; // apertura máxima a focal larga
  apMin: number; // diafragma más cerrado
  stab: boolean;
  notes: string;
}

export interface Drone {
  id: string;
  brand: string;
  model: string;
  type: string;
  sensor: string;
  apertureFixed: number;
  isoMin: number;
  isoMax: number;
  maxRes: string;
  maxFps: number;
  colorProfiles: string[];
  gimbalRange: string;
  notes: string;
}

export interface DroneShot {
  type: string;
  altStart: number;
  altEnd: number;
  gimbal: number;
  speed: string;
  move: string;
  orient: string;
}

export interface Photo {
  id: string;
  title: string;
  cat: string;
  scene: string;
  diff: Difficulty;
  env: string;
  light: string;
  subject: string;
  comp: string;
  learn: string[];
  edu: string;
  premium: boolean;
  ap: number;
  iso: number;
  shutter: number; // en segundos
  // solo cámara
  focal?: [number, number];
  priority?: Priority;
  // solo dron
  drone?: boolean;
  ev?: number;
  wb?: string;
  res?: string;
  fps?: number;
  color?: string;
  shot?: DroneShot;
}

export interface Mission {
  id: string;
  title: string;
  desc: string;
  xp: number;
  icon: string;
  match: (p: Photo) => boolean;
}

export interface Concept {
  icon: string;
  short: string;
  what: string;
  effect: string;
  tip: string;
}

export interface Warning {
  t: string;
  d: string;
}

export interface SettingRow {
  key: string;
  val: string;
  sub: string;
  noWhy?: boolean;
}

export interface SettingsResult {
  kind: "camera" | "drone";
  settings: SettingRow[];
  warnings: Warning[];
  why: Record<string, string>;
  shot?: DroneShot;
  focal?: number;
  ap?: number;
  iso?: number;
  shutter?: number;
}

export interface User {
  name: string;
  email: string;
}

export type Plan = "free" | "premium";

export interface OnboardingDraft {
  step: number;
  type: "camera" | "drone" | null;
  cam: string | null;
  lens: string | null;
  drone: string | null;
  level: string | null;
}

export interface LastGain {
  gain: number;
  base: number;
  missions: Mission[];
  already: boolean;
}

"use client";
/* =========================================================================
   Estado global de Encuadre (en memoria, cliente).
   En la Fase 3 este provider se respalda con Supabase: `user`, `plan` y el
   equipo vienen de la sesión + tablas `profiles`/`user_equipment`; el XP y los
   desafíos completados de `user_progress`. La interfaz pública del hook no
   cambiaría, así que las pantallas no se tocan al migrar.
   ========================================================================= */
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { CAMERAS, LENSES, DRONES } from "@/data/equipment";
import { ALL_PHOTOS } from "@/data/photos";
import { MISSIONS } from "@/data/missions";
import { CONCEPTS } from "@/data/concepts";
import { levelFor, type LevelInfo } from "@/data/levels";
import type {
  Camera, Lens, Drone, Photo, Plan, User, OnboardingDraft, LastGain,
} from "@/types";

type SheetState = { type: "concept"; name: string } | { type: "paywall" } | null;

interface AppState {
  user: User | null;
  plan: Plan;
  camId: string | null;
  lensId: string | null;
  droneId: string | null;
  xp: number;
  completed: string[];
  streak: number;
  checks: Record<string, boolean>;
  lastGain: LastGain | null;
  ob: OnboardingDraft;
  sheet: SheetState;
  // filtros de explore
  q: string;
  fCat: string;
  fDiff: string;
  // auth
  authMode: "login" | "register";
  form: { name: string; email: string; pass: string };

  // derivados
  camera: Camera | null;
  lens: Lens | null;
  drone: Drone;
  lvl: LevelInfo;

  // setters
  setUser: (u: User | null) => void;
  setPlan: (p: Plan) => void;
  setCamId: (v: string | null) => void;
  setLensId: (v: string | null) => void;
  setDroneId: (v: string | null) => void;
  setChecks: (c: Record<string, boolean>) => void;
  setOb: (o: OnboardingDraft) => void;
  setSheet: (s: SheetState) => void;
  setQ: (v: string) => void;
  setFCat: (v: string) => void;
  setFDiff: (v: string) => void;
  setAuthMode: (m: "login" | "register") => void;
  setForm: (f: { name: string; email: string; pass: string }) => void;

  // acciones
  isLocked: (p: Photo) => boolean;
  openConcept: (name: string) => void;
  subscribe: () => void;
  completeChallenge: (photo: Photo) => void;
}

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [plan, setPlan] = useState<Plan>("free");
  const [camId, setCamId] = useState<string | null>(null);
  const [lensId, setLensId] = useState<string | null>(null);
  const [droneId, setDroneId] = useState<string | null>(null);
  const [xp, setXp] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const [streak, setStreak] = useState(1);
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [lastGain, setLastGain] = useState<LastGain | null>(null);
  const [ob, setOb] = useState<OnboardingDraft>({ step: 0, type: null, cam: null, lens: null, drone: null, level: null });
  const [sheet, setSheet] = useState<SheetState>(null);
  const [q, setQ] = useState("");
  const [fCat, setFCat] = useState("Todas");
  const [fDiff, setFDiff] = useState("Todas");
  const [authMode, setAuthMode] = useState<"login" | "register">("register");
  const [form, setForm] = useState({ name: "", email: "", pass: "" });

  const camera = useMemo(() => CAMERAS.find((c) => c.id === camId) || null, [camId]);
  const lens = useMemo(() => LENSES.find((l) => l.id === lensId) || null, [lensId]);
  const drone = useMemo(() => DRONES.find((d) => d.id === droneId) || DRONES[0], [droneId]);
  const lvl = useMemo(() => levelFor(xp), [xp]);

  const isLocked = (p: Photo) => p.premium && plan === "free";
  const openConcept = (name: string) => { if (CONCEPTS[name]) setSheet({ type: "concept", name }); };
  const subscribe = () => setPlan("premium");

  function completeChallenge(photo: Photo) {
    const already = completed.includes(photo.id);
    const base = photo.diff === "Avanzado" ? 60 : photo.diff === "Intermedio" ? 40 : 25;
    const missionXp = MISSIONS.filter((m) => m.match(photo)).reduce((a, m) => a + m.xp, 0);
    const doneMissions = MISSIONS.filter(
      (m) => m.match(photo) && !completed.some((id) => { const pp = ALL_PHOTOS.find((x) => x.id === id); return pp && m.match(pp); })
    );
    const gain = already ? 0 : base + missionXp;
    if (!already) {
      setXp((x) => x + gain);
      setCompleted((c) => [...c, photo.id]);
      setStreak((s) => s + (Math.random() > 0.5 ? 1 : 0));
    }
    setLastGain({ gain, base, missions: doneMissions, already });
  }

  const value: AppState = {
    user, plan, camId, lensId, droneId, xp, completed, streak, checks, lastGain, ob, sheet,
    q, fCat, fDiff, authMode, form, camera, lens, drone, lvl,
    setUser, setPlan, setCamId, setLensId, setDroneId, setChecks, setOb, setSheet,
    setQ, setFCat, setFDiff, setAuthMode, setForm,
    isLocked, openConcept, subscribe, completeChallenge,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp(): AppState {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp debe usarse dentro de <AppProvider>");
  return v;
}

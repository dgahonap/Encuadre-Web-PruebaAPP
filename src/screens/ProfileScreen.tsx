"use client";
import { useRouter } from "next/navigation";
import { Star, Camera, Plane, Lock, ChevronRight, Crown, BookOpen } from "lucide-react";
import { ALL_PHOTOS } from "@/data/photos";
import { MISSIONS } from "@/data/missions";
import { CONCEPTS } from "@/data/concepts";
import { ICONS } from "@/data/icons";
import { useApp } from "@/hooks/useApp";
import type { Photo } from "@/types";

export function ProfileScreen() {
  const router = useRouter();
  const { user, setUser, xp, lvl, completed, streak, camId, lensId, droneId, camera, lens, drone, plan, ob, setOb, openConcept, setSheet } = useApp();

  const missionsDone = MISSIONS.filter((m) =>
    (completed.map((id) => ALL_PHOTOS.find((p) => p.id === id)).filter(Boolean) as Photo[]).some((p) => m.match(p))
  ).length;

  const addEquipment = () => {
    if (plan === "free" && (camId || droneId)) { setSheet({ type: "paywall" }); }
    else { setOb({ step: 0, type: null, cam: camId, lens: lensId, drone: droneId, level: ob.level }); router.push("/onboarding"); }
  };

  return (
    <div className="scroll fade">
      <div className="pad">
        <div className="between" style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 26 }}>Perfil</h1>
          <button className="pill" onClick={() => { setUser(null); router.push("/"); }}>Salir</button></div>
        <div className="card" style={{ padding: 20, marginBottom: 16, textAlign: "center" }}>
          <div className="oi" style={{ width: 66, height: 66, margin: "0 auto 12px", background: "var(--ink)", color: "#fff", fontSize: 26, fontFamily: "var(--disp)", fontWeight: 700 }}>{(user?.name || "F")[0].toUpperCase()}</div>
          <div style={{ fontFamily: "var(--disp)", fontWeight: 700, fontSize: 20 }}>{user?.name || "Fotógrafo"}</div>
          <div className="mut" style={{ fontSize: 13, marginBottom: 12 }}>{user?.email}</div>
          <span className="pill teal"><Star size={13} /> {lvl.cur.name} · {xp} XP</span>
          <div className="progress xpbar" style={{ marginTop: 12 }}><i style={{ width: `${lvl.pct}%` }} /></div>
          {lvl.next && <div className="mut2" style={{ fontSize: 12, marginTop: 6 }}>{lvl.next.min - xp} XP para {lvl.next.name}</div>}
        </div>

        <div className="grid" style={{ marginBottom: 16 }}>
          {([["Fotos", completed.length], ["Misiones", missionsDone], ["Racha", streak], ["Equipos", (camId ? 1 : 0) + (droneId ? 1 : 0)]] as [string, number][]).map(([l, n], i) => (
            <div key={i} className="stat"><div className="n">{n}</div><div className="mut" style={{ fontSize: 13 }}>{l}</div></div>))}
        </div>

        <div className="section-t" style={{ marginBottom: 10 }}>Tu equipo</div>
        <div className="col" style={{ gap: 10, marginBottom: 16 }}>
          {camera && <div className="card row" style={{ padding: 14 }}><div className="oi" style={{ width: 38, height: 38 }}><Camera size={18} /></div>
            <div className="grow"><div style={{ fontWeight: 700, fontSize: 14 }}>{camera.brand} {camera.model}</div>
              {lens && <div className="mut" style={{ fontSize: 12 }}>{lens.model}</div>}</div></div>}
          {droneId && <div className="card row" style={{ padding: 14 }}><div className="oi" style={{ width: 38, height: 38 }}><Plane size={18} /></div>
            <div className="grow"><div style={{ fontWeight: 700, fontSize: 14 }}>{drone.brand} {drone.model}</div></div></div>}
          <button className="opt" onClick={addEquipment}>
            <div className="oi"><Camera size={18} /></div>
            <div className="grow"><div style={{ fontWeight: 700, fontSize: 14 }}>Añadir equipo</div>
              <div className="mut" style={{ fontSize: 12 }}>{plan === "free" ? "Free: 1 equipo · Pro: ilimitados" : "Añade cámaras, lentes o drones"}</div></div>
            {plan === "free" ? <Lock size={16} className="mut2" /> : <ChevronRight size={16} className="mut2" />}</button>
        </div>

        <div className="section-t" style={{ marginBottom: 10 }}>Aprende fotografía</div>
        <div className="grid" style={{ marginBottom: 16 }}>
          {Object.keys(CONCEPTS).slice(0, 6).map((k) => { const Ic = ICONS[CONCEPTS[k].icon] || BookOpen; return (
            <button key={k} className="card" style={{ padding: 14, textAlign: "left" }} onClick={() => openConcept(k)}>
              <div className="oi" style={{ width: 36, height: 36, marginBottom: 8, background: "var(--amber-soft)", color: "var(--amber-deep)" }}><Ic size={18} /></div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{k}</div>
              <div className="mut" style={{ fontSize: 12 }}>{CONCEPTS[k].short}</div></button>); })}
        </div>

        <div className="card" style={{ padding: 18, background: plan === "premium" ? "var(--teal-soft)" : "var(--ink)", color: plan === "premium" ? "var(--ink)" : "var(--paper)", borderColor: plan === "premium" ? "#B8E4DC" : "var(--ink)" }}>
          <div className="row" style={{ marginBottom: 6 }}><Crown size={18} color={plan === "premium" ? "var(--teal-deep)" : "var(--amber)"} />
            <span style={{ fontWeight: 700 }}>{plan === "premium" ? "Encuadre Pro activo" : "Plan Free"}</span></div>
          <p style={{ fontSize: 13, opacity: 0.85, marginBottom: plan === "premium" ? 0 : 14 }}>
            {plan === "premium" ? "Tienes acceso completo. ¡A disparar!" : "Estás usando la versión gratuita. Desbloquea toda la biblioteca, misiones y la comparación con IA."}</p>
          {plan === "free" && <button className="btn amber" onClick={() => router.push("/subscription")}>Ver planes</button>}
        </div>
      </div>
    </div>
  );
}

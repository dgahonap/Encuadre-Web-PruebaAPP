"use client";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Plane, Camera, Info, Sparkles, Check } from "lucide-react";
import { computeSettings } from "@/utils/engine";
import { CONCEPTS } from "@/data/concepts";
import { equipLabel } from "@/utils/labels";
import { useApp } from "@/hooks/useApp";
import type { Photo } from "@/types";

export function SetupScreen({ photo }: { photo: Photo }) {
  const router = useRouter();
  const { camera, lens, drone, droneId, openConcept, setChecks } = useApp();
  const result = useMemo(() => computeSettings(photo, camera, lens, drone), [photo, camera, lens, drone]);

  return (
    <div className="scroll fade">
      <div className="top"><button className="icback" onClick={() => router.back()}><ChevronLeft size={20} /></button>
        <div className="grow"><div style={{ fontWeight: 700, fontFamily: "var(--disp)", fontSize: 15 }}>Configuración</div>
          <div className="mut" style={{ fontSize: 12 }}>{photo.title}</div></div></div>
      <div className="pad">
        <div className="card row" style={{ padding: 13, marginBottom: 14 }}>
          <div className="oi" style={{ width: 38, height: 38 }}>{photo.drone ? <Plane size={18} /> : <Camera size={18} />}</div>
          <div className="grow" style={{ fontSize: 13 }}><b>{equipLabel(camera, lens, drone, droneId)}</b></div>
          <span className="pill teal">Compatible</span></div>

        <div className="lcd" style={{ marginBottom: 14 }}>
          <div className="lcd-grid">
            {result.settings.map((s, i) => (
              <button key={i} className="dial"
                onClick={() => (CONCEPTS[s.key] ? openConcept(s.key) : undefined)} style={{ cursor: CONCEPTS[s.key] ? "pointer" : "default" }}>
                {CONCEPTS[s.key] && <Info size={13} className="qmark" />}
                <div className="lab">{s.key}</div>
                <div className="val">{s.val}</div>
                <div className="sub">{s.sub}</div>
              </button>))}
          </div>
        </div>

        {result.kind === "drone" && result.shot && (
          <div className="card" style={{ padding: 16, marginBottom: 14 }}>
            <div className="section-t" style={{ marginBottom: 10 }}>El movimiento</div>
            {([["Tipo", result.shot.type], ["Altura", `${result.shot.altStart} m → ${result.shot.altEnd} m`],
              ["Velocidad", result.shot.speed], ["Gimbal", `${result.shot.gimbal}°`],
              ["Movimiento", result.shot.move], ["Orientación", result.shot.orient]] as [string, string][]).map(([k, v], i) => (
              <div key={i} className="between" style={{ padding: "7px 0", borderBottom: i < 5 ? "1px solid var(--line)" : "none" }}>
                <span className="mut" style={{ fontSize: 14 }}>{k}</span><span style={{ fontWeight: 700, fontSize: 14 }}>{v}</span></div>))}
          </div>)}

        {result.warnings.length > 0 && (<div className="col" style={{ gap: 10, marginBottom: 14 }}>
          {result.warnings.map((w, i) => (<div key={i} className="warn">
            <div className="t"><Info size={15} /> {w.t}</div>
            <div style={{ fontSize: 13, marginTop: 6, color: "var(--ink2)", lineHeight: 1.5 }}>{w.d}</div></div>))}
        </div>)}

        <div className="card" style={{ padding: 16, marginBottom: 14 }}>
          <div className="row" style={{ marginBottom: 12 }}><Sparkles size={17} color="var(--amber-deep)" />
            <span style={{ fontWeight: 700 }}>¿Por qué estos ajustes?</span></div>
          <div className="col" style={{ gap: 12 }}>
            {Object.entries(result.why).map(([k, v], i) => (
              <div key={i}>
                <button className="row" style={{ marginBottom: 3 }} onClick={() => openConcept(k)}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{k}</span>
                  {CONCEPTS[k] && <Info size={13} className="mut2" />}</button>
                <div className="mut" style={{ fontSize: 13, lineHeight: 1.5 }}>{v}</div>
              </div>))}
          </div>
        </div>

        <button className="btn amber" onClick={() => { setChecks({}); router.push(`/photo/${photo.id}/challenge`); }}><Check size={18} /> Ir al desafío</button>
        <p className="center mut2" style={{ fontSize: 12, marginTop: 10 }}>Toca cualquier ajuste subrayado para aprender qué significa.</p>
      </div>
    </div>
  );
}

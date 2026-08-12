"use client";
import { useRouter } from "next/navigation";
import { Award, TrendingUp, Crown } from "lucide-react";
import { ICONS } from "@/data/icons";
import { useApp } from "@/hooks/useApp";
import type { Photo } from "@/types";

export function ResultScreen({ photo }: { photo: Photo }) {
  const router = useRouter();
  const { lastGain, plan, setSheet } = useApp();
  if (!lastGain) { router.replace(`/photo/${photo.id}`); return null; }
  return (
    <div className="scroll fade">
      <div className="pad center" style={{ paddingTop: 40 }}>
        <div className="oi" style={{ width: 88, height: 88, margin: "0 auto 18px", background: "var(--teal-soft)", color: "var(--teal-deep)", borderRadius: 26 }}>
          <Award size={44} /></div>
        <h1 style={{ fontSize: 28, marginBottom: 6 }}>¡Desafío completado!</h1>
        <p className="mut" style={{ marginBottom: 22 }}>Hiciste “{photo.title}”. Cada toma te acerca a dominar tu cámara.</p>

        {lastGain.already
          ? <div className="pill" style={{ margin: "0 auto 20px" }}>Ya lo habías completado — repasar también suma.</div>
          : <div className="card" style={{ padding: 18, marginBottom: 16, background: "var(--ink)", color: "var(--paper)", borderColor: "var(--ink)" }}>
              <div style={{ fontFamily: "var(--disp)", fontSize: 40, fontWeight: 700, color: "var(--amber)" }}>+{lastGain.gain} XP</div>
              <div style={{ opacity: 0.7, fontSize: 13 }}>Base {lastGain.base} XP{lastGain.missions.length ? ` · Misiones ${lastGain.gain - lastGain.base} XP` : ""}</div>
            </div>}

        {lastGain.missions.length > 0 && (<div className="col" style={{ gap: 8, marginBottom: 18 }}>
          {lastGain.missions.map((m) => { const Mi = ICONS[m.icon]; return (
            <div key={m.id} className="card row" style={{ padding: 13, textAlign: "left" }}>
              <div className="oi" style={{ width: 38, height: 38, background: "var(--amber-soft)", color: "var(--amber-deep)" }}><Mi size={18} /></div>
              <div className="grow"><div style={{ fontWeight: 700, fontSize: 14 }}>Misión: {m.title}</div><div className="mut" style={{ fontSize: 12 }}>Completada</div></div>
              <span className="pill amber">+{m.xp}</span></div>); })}
        </div>)}
      </div>

      <div className="pad" style={{ paddingTop: 0 }}>
        <div className="card" style={{ padding: 16, marginBottom: 12 }}>
          <div className="row" style={{ marginBottom: 6 }}><TrendingUp size={17} color="var(--teal)" /><span style={{ fontWeight: 700 }}>Compara tu resultado</span>
            {plan === "free" && <span className="pill amber" style={{ marginLeft: "auto" }}><Crown size={12} /> Pro</span>}</div>
          <p className="mut" style={{ fontSize: 13, marginBottom: 12 }}>Sube tu foto y compárala con la referencia. La IA evaluará exposición, composición y color (próximamente).</p>
          <button className="btn ghost" onClick={() => (plan === "free" ? setSheet({ type: "paywall" }) : router.push(`/photo/${photo.id}/compare`))}>Comparar con la referencia</button>
        </div>
        <button className="btn primary" onClick={() => router.push("/home")}>Volver al inicio</button>
        <button className="btn ghost" onClick={() => router.push("/explore")} style={{ marginTop: 8 }}>Buscar otra foto</button>
      </div>
    </div>
  );
}

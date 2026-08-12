"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Camera, Sparkles } from "lucide-react";
import { Scene } from "@/components/Scene";
import type { Photo } from "@/types";

export function CompareScreen({ photo }: { photo: Photo }) {
  const router = useRouter();
  const [revealed, setRevealed] = useState(false);
  const rows: [string, number][] = [["Exposición", 88], ["Composición", 79], ["Color", 84], ["Nitidez", 91], ["Perspectiva", 76]];
  const score = Math.round(rows.reduce((a, r) => a + r[1], 0) / rows.length);
  return (
    <div className="scroll fade">
      <div className="top"><button className="icback" onClick={() => router.back()}><ChevronLeft size={20} /></button>
        <span style={{ fontWeight: 700, fontFamily: "var(--disp)" }}>Tu foto vs. referencia</span></div>
      <div className="pad">
        <div className="row" style={{ gap: 10, marginBottom: 16 }}>
          <div className="grow"><div className="section-t center" style={{ marginBottom: 6 }}>Tu foto</div>
            <div style={{ aspectRatio: "3/4", borderRadius: 14, border: "2px dashed var(--line)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", color: "var(--muted2)", gap: 6 }}>
              <Camera size={26} /><span style={{ fontSize: 12 }}>Subir foto</span></div></div>
          <div className="grow"><div className="section-t center" style={{ marginBottom: 6 }}>Referencia</div>
            <div style={{ aspectRatio: "3/4", borderRadius: 14, overflow: "hidden", position: "relative" }}><Scene kind={photo.scene} /><div className="grain" /></div></div>
        </div>
        {!revealed
          ? <button className="btn amber" onClick={() => setRevealed(true)}><Sparkles size={18} /> Analizar (demo)</button>
          : <div className="fade">
              <div className="card center" style={{ padding: 20, marginBottom: 14 }}>
                <div className="mut" style={{ fontSize: 13 }}>Similitud general</div>
                <div style={{ fontFamily: "var(--disp)", fontSize: 52, fontWeight: 700, color: "var(--teal)" }}>{score}<span style={{ fontSize: 22 }} className="mut">/100</span></div></div>
              <div className="card" style={{ padding: 16 }}>
                {rows.map(([k, v], i) => (<div key={i} style={{ marginBottom: i < rows.length - 1 ? 12 : 0 }}>
                  <div className="between" style={{ marginBottom: 5 }}><span style={{ fontSize: 14, fontWeight: 600 }}>{k}</span><span className="mut" style={{ fontSize: 13 }}>{v}/100</span></div>
                  <div className="progress"><i style={{ width: `${v}%`, background: v > 85 ? "var(--teal)" : v > 75 ? "var(--amber)" : "var(--danger)" }} /></div></div>))}
              </div>
              <p className="center mut2" style={{ fontSize: 12, marginTop: 12 }}>Puntuación simulada. En V2 la genera el módulo de IA multimodal.</p>
            </div>}
      </div>
    </div>
  );
}

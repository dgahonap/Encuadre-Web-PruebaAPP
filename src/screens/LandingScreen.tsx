"use client";
import { useRouter } from "next/navigation";
import { Aperture, Sparkles, Camera, ArrowRight } from "lucide-react";
import { Scene } from "@/components/Scene";
import { useApp } from "@/hooks/useApp";

export function LandingScreen() {
  const router = useRouter();
  const { setAuthMode } = useApp();
  const goAuth = (mode: "login" | "register") => { setAuthMode(mode); router.push("/auth"); };
  const steps: [string, string][] = [
    ["Elige una foto", "De montañas a tomas con dron, encuentra la que te inspire."],
    ["Selecciona tu cámara", "Dinos tu equipo y calculamos ajustes reales para TU material."],
    ["Recibe la configuración", "ISO, apertura, velocidad, focal… y el porqué de cada decisión."],
    ["Sal a hacerla", "Sigue la checklist paso a paso mientras disparas."],
    ["Aprende de verdad", "Cada foto te enseña, hasta que ya no nos necesites."],
  ];
  return (
    <div className="scroll fade">
      <div style={{ position: "relative", height: 420, color: "#fff" }}>
        <Scene kind="sunsetMountain" /><div className="grain" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 30%,rgba(15,16,20,.85))" }} />
        <div style={{ position: "absolute", inset: 0, padding: 24, display: "flex", flexDirection: "column" }}>
          <div className="between">
            <div className="row"><div className="oi" style={{ width: 34, height: 34, background: "rgba(255,255,255,.15)", borderRadius: 10 }}><Aperture size={18} color="#fff" /></div>
              <span style={{ fontFamily: "var(--disp)", fontWeight: 700, fontSize: 18 }}>Encuadre</span></div>
            <button className="pill" style={{ background: "rgba(255,255,255,.15)", color: "#fff" }} onClick={() => goAuth("login")}>Entrar</button>
          </div>
          <div className="grow" />
          <span className="hero-badge" style={{ alignSelf: "flex-start", marginBottom: 14 }}><Sparkles size={14} /> Tu copiloto de fotografía</span>
          <h1 style={{ fontSize: 34, lineHeight: 1.05, marginBottom: 10 }}>Encuentra una foto.<br />Aprende a hacerla<br />con tu cámara.</h1>
          <p style={{ fontSize: 15, opacity: 0.9, maxWidth: 320 }}>Convertimos “quiero una foto como esta” en los ajustes exactos para tu equipo, y te enseñamos por qué.</p>
        </div>
      </div>
      <div className="pad">
        <button className="btn amber" onClick={() => goAuth("register")} style={{ marginBottom: 8 }}><Camera size={18} /> Empezar a disparar</button>
        <p className="center mut2" style={{ fontSize: 12, marginBottom: 26 }}>Gratis para empezar · sin tarjeta</p>
        <div className="section-t center" style={{ marginBottom: 18 }}>Cómo funciona</div>
        <div className="col" style={{ gap: 14 }}>
          {steps.map((s, i) => (
            <div key={i} className="row" style={{ alignItems: "flex-start", gap: 14 }}>
              <div className="step-num">{i + 1}</div>
              <div><div style={{ fontWeight: 700, fontFamily: "var(--disp)", fontSize: 16 }}>{s[0]}</div>
                <div className="mut" style={{ fontSize: 14 }}>{s[1]}</div></div>
            </div>
          ))}
        </div>
        <div className="card" style={{ marginTop: 26, padding: 20, background: "var(--ink)", color: "var(--paper)", borderColor: "var(--ink)" }}>
          <div className="pill amber" style={{ marginBottom: 10 }}>La diferencia</div>
          <h3 style={{ fontSize: 20, marginBottom: 8 }}>No es un curso. Es aprender haciendo.</h3>
          <p style={{ fontSize: 14, opacity: 0.85 }}>YouTube y los cursos te dan teoría genérica. Encuadre te da la instrucción precisa para la foto que quieres, con TU cámara, en el momento en que la vas a disparar.</p>
        </div>
        <button className="btn amber" onClick={() => goAuth("register")} style={{ marginTop: 20 }}>Empezar a disparar <ArrowRight size={18} /></button>
      </div>
    </div>
  );
}

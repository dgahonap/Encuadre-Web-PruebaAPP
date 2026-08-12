"use client";
import type { ReactNode } from "react";
import { Info, Check, Crown } from "lucide-react";
import { CONCEPTS } from "@/data/concepts";
import { ICONS } from "@/data/icons";

export function Sheet({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="grab" />
        {children}
      </div>
    </div>
  );
}

export function ConceptSheet({ name, onClose }: { name: string; onClose: () => void }) {
  const c = CONCEPTS[name];
  if (!c) return null;
  const Ic = ICONS[c.icon] || Info;
  const blocks: [string, string][] = [
    ["¿Qué es?", c.what],
    ["¿Cómo afecta a tu foto?", c.effect],
    ["Consejo", c.tip],
  ];
  return (
    <Sheet onClose={onClose}>
      <div className="row" style={{ marginBottom: 14 }}>
        <div className="oi" style={{ background: "var(--amber-soft)", color: "var(--amber-deep)" }}><Ic size={22} /></div>
        <div><h2 style={{ fontSize: 22 }}>{name}</h2><div className="mut" style={{ fontSize: 13 }}>{c.short}</div></div>
      </div>
      {blocks.map(([t, d], i) => (
        <div key={i} style={{ marginBottom: 14 }}>
          <div className="section-t" style={{ marginBottom: 6 }}>{t}</div>
          <div style={{ fontSize: 15, color: "var(--ink2)" }}>{d}</div>
        </div>
      ))}
      <button className="btn ghost" onClick={onClose} style={{ marginTop: 6 }}>Entendido</button>
    </Sheet>
  );
}

export function Paywall({ onClose, onSubscribe }: { onClose: () => void; onSubscribe: () => void }) {
  const feats = [
    "Biblioteca completa de referencias",
    "Todas las misiones y niveles",
    "Registra equipos ilimitados",
    "Comparación de tu foto vs. la referencia",
    "Funciones con IA (próximamente)",
  ];
  return (
    <Sheet onClose={onClose}>
      <div className="center" style={{ padding: "6px 4px 4px" }}>
        <div className="oi" style={{ margin: "0 auto 12px", width: 56, height: 56, background: "var(--amber)", color: "#3A2708" }}><Crown size={26} /></div>
        <h2 style={{ fontSize: 24 }}>Desbloquea Encuadre Pro</h2>
        <p className="mut" style={{ fontSize: 14, margin: "6px 0 18px" }}>Aprende sin límites y sal a hacer cada foto que te propongas.</p>
      </div>
      <div className="col" style={{ gap: 10, marginBottom: 18 }}>
        {feats.map((f, i) => (
          <div key={i} className="row"><div className="checkbox done" style={{ width: 22, height: 22 }}><Check size={14} color="#fff" /></div><span style={{ fontSize: 14 }}>{f}</span></div>
        ))}
      </div>
      <div className="row" style={{ gap: 10, marginBottom: 14 }}>
        <div className="card grow" style={{ padding: 15, textAlign: "center", borderColor: "var(--ink)" }}>
          <div className="pill amber" style={{ marginBottom: 6 }}>Más popular</div>
          <div style={{ fontFamily: "var(--disp)", fontSize: 24, fontWeight: 700 }}>4,99 €<span style={{ fontSize: 13, fontWeight: 400 }} className="mut">/mes</span></div>
          <div className="mut2" style={{ fontSize: 12 }}>Anual · 39,99 €/año</div>
        </div>
      </div>
      <button className="btn amber" onClick={onSubscribe}><Crown size={18} /> Empezar prueba de 7 días</button>
      <button className="btn ghost" onClick={onClose} style={{ marginTop: 8 }}>Ahora no</button>
      <p className="center mut2" style={{ fontSize: 11, marginTop: 10 }}>Demo: sin cobro real. En producción se integra Stripe Checkout.</p>
    </Sheet>
  );
}

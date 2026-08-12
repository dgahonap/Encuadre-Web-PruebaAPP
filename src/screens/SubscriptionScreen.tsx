"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft, Crown, Check } from "lucide-react";
import { useApp } from "@/hooks/useApp";

export function SubscriptionScreen() {
  const router = useRouter();
  const { subscribe } = useApp();
  const free = ["3 referencias de muestra", "Lecciones básicas", "1 equipo registrado", "Misión de bienvenida"];
  const pro = ["Biblioteca completa (+30 y creciendo)", "Todas las misiones y niveles", "Equipos ilimitados", "Comparación foto vs. referencia", "Funciones con IA (próximamente)", "Sin límites de uso"];
  return (
    <div className="scroll fade">
      <div className="top"><button className="icback" onClick={() => router.back()}><ChevronLeft size={20} /></button>
        <span style={{ fontWeight: 700, fontFamily: "var(--disp)" }}>Planes</span></div>
      <div className="pad">
        <div className="center" style={{ marginBottom: 22 }}>
          <div className="oi" style={{ width: 56, height: 56, margin: "0 auto 12px", background: "var(--amber)", color: "#3A2708" }}><Crown size={26} /></div>
          <h1 style={{ fontSize: 26 }}>Aprende sin límites</h1>
          <p className="mut" style={{ fontSize: 14, marginTop: 6 }}>Empieza gratis. Hazte Pro cuando quieras salir a por todo.</p>
        </div>
        <div className="card" style={{ padding: 18, marginBottom: 14, borderColor: "var(--ink)" }}>
          <div className="between" style={{ marginBottom: 12 }}>
            <div><div style={{ fontFamily: "var(--disp)", fontWeight: 700, fontSize: 18 }}>Pro</div>
              <div className="mut" style={{ fontSize: 13 }}>Todo desbloqueado</div></div>
            <div className="center"><div style={{ fontFamily: "var(--disp)", fontSize: 26, fontWeight: 700 }}>4,99 €</div><div className="mut2" style={{ fontSize: 12 }}>/mes · o 39,99 €/año</div></div></div>
          <div className="col" style={{ gap: 9, marginBottom: 16 }}>
            {pro.map((f, i) => (<div key={i} className="row"><div className="checkbox done" style={{ width: 20, height: 20 }}><Check size={12} color="#fff" /></div><span style={{ fontSize: 14 }}>{f}</span></div>))}
          </div>
          <button className="btn amber" onClick={() => { subscribe(); router.push("/profile"); }}><Crown size={18} /> Prueba 7 días gratis</button>
        </div>
        <div className="card" style={{ padding: 18 }}>
          <div style={{ fontFamily: "var(--disp)", fontWeight: 700, fontSize: 18, marginBottom: 2 }}>Free</div>
          <div className="mut" style={{ fontSize: 13, marginBottom: 12 }}>Para empezar · 0 €</div>
          <div className="col" style={{ gap: 9 }}>
            {free.map((f, i) => (<div key={i} className="row"><div className="checkbox" style={{ width: 20, height: 20, borderColor: "var(--muted2)" }} /><span style={{ fontSize: 14 }} className="mut">{f}</span></div>))}
          </div>
        </div>
        <p className="center mut2" style={{ fontSize: 11, marginTop: 14 }}>Demo sin cobro. En producción: Stripe Checkout + webhooks para gestionar el estado de suscripción.</p>
      </div>
    </div>
  );
}

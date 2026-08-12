"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft, Aperture } from "lucide-react";
import { useApp } from "@/hooks/useApp";

export function AuthScreen() {
  const router = useRouter();
  const { authMode, setAuthMode, form, setForm, setUser } = useApp();
  const ok = form.email && form.pass && (authMode === "login" || form.name);
  const enter = (name: string, email: string) => { setUser({ name, email }); router.push("/onboarding"); };
  return (
    <div className="scroll fade">
      <div className="top"><button className="icback" onClick={() => router.push("/")}><ChevronLeft size={20} /></button>
        <span style={{ fontWeight: 700, fontFamily: "var(--disp)" }}>{authMode === "login" ? "Entrar" : "Crear cuenta"}</span></div>
      <div className="pad">
        <div className="oi" style={{ width: 52, height: 52, background: "var(--amber-soft)", color: "var(--amber-deep)", marginBottom: 16 }}><Aperture size={26} /></div>
        <h1 style={{ fontSize: 26, marginBottom: 6 }}>{authMode === "login" ? "Bienvenido de nuevo" : "Empieza a aprender"}</h1>
        <p className="mut" style={{ marginBottom: 22 }}>{authMode === "login" ? "Continúa donde lo dejaste." : "Crea tu cuenta gratis en segundos."}</p>
        <div className="col" style={{ gap: 12 }}>
          {authMode === "register" && <input className="field" placeholder="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />}
          <input className="field" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="field" type="password" placeholder="Contraseña" value={form.pass} onChange={(e) => setForm({ ...form, pass: e.target.value })} />
        </div>
        <button className="btn primary" disabled={!ok} style={{ marginTop: 16 }} onClick={() => enter(form.name || "Fotógrafo", form.email)}>
          {authMode === "login" ? "Entrar" : "Crear cuenta"}</button>
        <div className="row" style={{ margin: "16px 0" }}><div style={{ flex: 1, height: 1, background: "var(--line)" }} /><span className="mut2" style={{ fontSize: 12 }}>o</span><div style={{ flex: 1, height: 1, background: "var(--line)" }} /></div>
        <button className="btn ghost" onClick={() => enter("Fotógrafo", "demo@encuadre.app")}>
          <span style={{ fontWeight: 700, color: "#4285F4" }}>G</span> Continuar con Google</button>
        <p className="center mut" style={{ fontSize: 13, marginTop: 20 }}>
          {authMode === "login" ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
          <button style={{ fontWeight: 700, textDecoration: "underline" }} onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}>{authMode === "login" ? "Regístrate" : "Entra"}</button>
        </p>
      </div>
    </div>
  );
}

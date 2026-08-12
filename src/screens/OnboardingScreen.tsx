"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Camera, Plane, Circle, Check, ArrowRight } from "lucide-react";
import { CAMERAS, LENSES, DRONES, lensFits } from "@/data/equipment";
import { useApp } from "@/hooks/useApp";

export function OnboardingScreen() {
  const router = useRouter();
  const { ob, setOb, setCamId, setLensId, setDroneId } = useApp();
  const step = ob.step;
  const obCam = CAMERAS.find((c) => c.id === ob.cam);
  const compatLenses = ob.cam ? LENSES.filter((l) => lensFits(l, obCam)) : [];
  const next = () => setOb({ ...ob, step: step + 1 });
  const finish = () => { setCamId(ob.cam); setLensId(ob.lens); setDroneId(ob.drone); router.push("/home"); };

  const Header = ({ t, s }: { t: string; s: string }) => (
    <>
      <div className="progress" style={{ marginBottom: 22 }}><i style={{ width: `${((step + 1) / 4) * 100}%` }} /></div>
      <h1 style={{ fontSize: 26, marginBottom: 6 }}>{t}</h1>
      <p className="mut" style={{ marginBottom: 22 }}>{s}</p>
    </>
  );

  return (
    <div className="scroll fade">
      <div className="top">
        <button className="icback" onClick={() => (step > 0 ? setOb({ ...ob, step: step - 1 }) : router.push("/auth"))}><ChevronLeft size={20} /></button>
        <span style={{ fontWeight: 700, fontFamily: "var(--disp)" }}>Configura tu equipo</span></div>
      <div className="pad">
        {step === 0 && (<><Header t="¿Con qué disparas?" s="Elige tu tipo de equipo principal. Podrás añadir más luego." />
          <div className="col" style={{ gap: 12 }}>
            {([["camera", "Cámara", "DSLR, mirrorless o compacta", Camera], ["drone", "Dron", "Fotografía y vídeo aéreo", Plane]] as const).map(([v, t, d, I]) => (
              <button key={v} className={"opt" + (ob.type === v ? " sel" : "")} onClick={() => setOb({ ...ob, type: v as "camera" | "drone", step: 1 })}>
                <div className="oi"><I size={22} /></div>
                <div className="grow"><div style={{ fontWeight: 700 }}>{t}</div><div className="mut" style={{ fontSize: 13 }}>{d}</div></div>
                <ChevronRight size={18} className="mut2" /></button>))}
          </div></>)}

        {step === 1 && ob.type === "camera" && (<><Header t="¿Qué cámara tienes?" s="Usaremos sus límites reales (ISO, velocidad, montura)." />
          <div className="col" style={{ gap: 10 }}>
            {CAMERAS.map((c) => (<button key={c.id} className={"opt" + (ob.cam === c.id ? " sel" : "")} onClick={() => setOb({ ...ob, cam: c.id })}>
              <div className="oi"><Camera size={20} /></div>
              <div className="grow"><div style={{ fontWeight: 700, fontSize: 15 }}>{c.brand} {c.model}</div>
                <div className="mut" style={{ fontSize: 12 }}>{c.type} · {c.sensor} · ISO {c.isoMin}–{c.isoMax}</div></div>
              {ob.cam === c.id && <Check size={18} />}</button>))}
          </div>
          <button className="btn primary" disabled={!ob.cam} style={{ marginTop: 16 }} onClick={next}>Continuar</button></>)}

        {step === 1 && ob.type === "drone" && (<><Header t="¿Qué dron tienes?" s="La lógica de vuelo y cámara se adapta al modelo." />
          <div className="col" style={{ gap: 10 }}>
            {DRONES.map((d) => (<button key={d.id} className={"opt" + (ob.drone === d.id ? " sel" : "")} onClick={() => setOb({ ...ob, drone: d.id })}>
              <div className="oi"><Plane size={20} /></div>
              <div className="grow"><div style={{ fontWeight: 700, fontSize: 15 }}>{d.brand} {d.model}</div>
                <div className="mut" style={{ fontSize: 12 }}>{d.sensor} · f/{d.apertureFixed} · {d.maxRes}</div></div>
              {ob.drone === d.id && <Check size={18} />}</button>))}
          </div>
          <button className="btn primary" disabled={!ob.drone} style={{ marginTop: 16 }} onClick={() => setOb({ ...ob, step: 3 })}>Continuar</button></>)}

        {step === 2 && ob.type === "camera" && (<><Header t="¿Qué lente usas?" s="Solo mostramos lentes compatibles con tu montura." />
          <div className="col" style={{ gap: 10 }}>
            {compatLenses.map((l) => { const viaAdapter = !l.mounts.includes(obCam?.mount as string);
              return (<button key={l.id} className={"opt" + (ob.lens === l.id ? " sel" : "")} onClick={() => setOb({ ...ob, lens: l.id })}>
                <div className="oi"><Circle size={20} /></div>
                <div className="grow"><div style={{ fontWeight: 700, fontSize: 14 }}>{l.model}</div>
                  <div className="mut" style={{ fontSize: 12 }}>{l.focalMin === l.focalMax ? `${l.focalMin}mm` : `${l.focalMin}-${l.focalMax}mm`} · f/{l.apWide}{l.apWide !== l.apTele ? `-${l.apTele}` : ""} {viaAdapter ? "· vía adaptador" : ""}</div></div>
                {ob.lens === l.id && <Check size={18} />}</button>); })}
          </div>
          <button className="btn primary" disabled={!ob.lens} style={{ marginTop: 16 }} onClick={() => setOb({ ...ob, step: 3 })}>Continuar</button></>)}

        {step === 3 && (<><Header t="¿Cuál es tu nivel?" s="Ajustaremos las explicaciones y recomendaciones a ti." />
          <div className="col" style={{ gap: 12 }}>
            {([["Principiante", "Estoy empezando de cero"], ["Intermedio", "Conozco lo básico del triángulo"], ["Avanzado", "Domino mi cámara, busco retos"]] as const).map(([t, d]) => (
              <button key={t} className={"opt" + (ob.level === t ? " sel" : "")} onClick={() => setOb({ ...ob, level: t })}>
                <div className="grow"><div style={{ fontWeight: 700 }}>{t}</div><div className="mut" style={{ fontSize: 13 }}>{d}</div></div>
                {ob.level === t && <Check size={18} />}</button>))}
          </div>
          <button className="btn amber" disabled={!ob.level} style={{ marginTop: 16 }} onClick={finish}>Empezar a aprender <ArrowRight size={18} /></button></>)}
      </div>
    </div>
  );
}

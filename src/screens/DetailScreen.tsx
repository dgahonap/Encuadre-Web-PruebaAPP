"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft, Crown, Info, Camera, Lock, Mountain } from "lucide-react";
import { Scene } from "@/components/Scene";
import { catIcon } from "@/data/icons";
import { useApp } from "@/hooks/useApp";
import type { Photo } from "@/types";

export function DetailScreen({ photo }: { photo: Photo }) {
  const router = useRouter();
  const { isLocked, droneId, drone, setSheet } = useApp();
  const locked = isLocked(photo);
  const Cat = catIcon[photo.cat] || Mountain;
  const needDrone = photo.drone && !droneId;
  return (
    <div className="scroll fade">
      <div style={{ height: 300, position: "relative" }}>
        <Scene kind={photo.scene} /><div className="grain" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 40%,rgba(15,16,20,.8))" }} />
        <button className="icback" style={{ position: "absolute", top: 16, left: 16, background: "rgba(255,255,255,.18)", color: "#fff" }} onClick={() => router.back()}><ChevronLeft size={20} /></button>
        {locked && <span className="pill amber" style={{ position: "absolute", top: 18, right: 16 }}><Crown size={13} /> Pro</span>}
        <div style={{ position: "absolute", left: 20, bottom: 18, color: "#fff" }}>
          <div className="row" style={{ gap: 8, marginBottom: 8 }}>
            <span className="pill dark"><Cat size={13} /> {photo.cat}</span>
            <span className="pill dark">{photo.diff}</span></div>
          <h1 style={{ fontSize: 28 }}>{photo.title}</h1>
        </div>
      </div>
      <div className="pad">
        <div className="section-t" style={{ marginBottom: 8 }}>Qué aprenderás</div>
        <div className="row" style={{ flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
          {photo.learn.map((t, i) => (<span key={i} className="pill">{t}</span>))}
        </div>

        <div className="section-t" style={{ marginBottom: 8 }}>La idea de la toma</div>
        <p style={{ fontSize: 15, color: "var(--ink2)", marginBottom: 18 }}>{photo.edu}</p>

        <div className="card" style={{ padding: 16, marginBottom: 16 }}>
          <div className="row"><Info size={18} className="mut" /><span style={{ fontWeight: 700, fontSize: 14 }}>Equipo recomendado</span></div>
          <div className="mut" style={{ fontSize: 14, marginTop: 6 }}>
            {photo.drone
              ? `Dron con cámara estabilizada. ${photo.shot!.type}, gimbal a ${photo.shot!.gimbal}°.`
              : `Focal ${photo.focal![0]}–${photo.focal![1]}mm · apertura de referencia f/${photo.ap}. Calcularemos la versión posible con tu equipo.`}
          </div>
        </div>

        {needDrone && <div className="warn" style={{ marginBottom: 16 }}><div className="t"><Info size={15} /> Necesitas un dron</div>
          <div style={{ fontSize: 13, marginTop: 5, color: "var(--ink2)" }}>Esta toma es aérea. Te mostramos los ajustes tomando de referencia el {drone.model}.</div></div>}

        <button className="btn amber" onClick={() => (locked ? setSheet({ type: "paywall" }) : router.push(`/photo/${photo.id}/setup`))}>
          {locked ? <><Lock size={17} /> Desbloquear con Pro</> : <><Camera size={18} /> Intentar esta fotografía</>}</button>
      </div>
    </div>
  );
}

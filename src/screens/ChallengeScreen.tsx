"use client";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Check, Camera } from "lucide-react";
import { Scene } from "@/components/Scene";
import { computeSettings } from "@/utils/engine";
import { useApp } from "@/hooks/useApp";
import type { Photo } from "@/types";

export function ChallengeScreen({ photo }: { photo: Photo }) {
  const router = useRouter();
  const { camera, lens, drone, checks, setChecks, completeChallenge } = useApp();
  const result = useMemo(() => computeSettings(photo, camera, lens, drone), [photo, camera, lens, drone]);

  const items: [string, string][] = result.kind === "drone"
    ? [["iso", "ISO ajustado a " + result.settings[0].val], ["shutter", "Velocidad en " + result.settings[1].val],
       ["gimbal", "Gimbal a " + result.shot!.gimbal + "°"], ["alt", "Altura " + result.shot!.altStart + "–" + result.shot!.altEnd + " m"],
       ["comp", "Composición: " + photo.comp]]
    : [["iso", "ISO en " + result.settings[0].val], ["ap", "Apertura en " + result.settings[1].val],
       ["shutter", "Velocidad en " + result.settings[2].val], ["focal", "Focal en " + result.settings[3].val],
       ["comp", "Composición: " + photo.comp]];
  const done = items.filter(([k]) => checks[k]).length;
  const all = done === items.length;

  const finish = () => { completeChallenge(photo); router.push(`/photo/${photo.id}/result`); };

  return (
    <div className="scroll fade">
      <div className="top"><button className="icback" onClick={() => router.back()}><ChevronLeft size={20} /></button>
        <span style={{ fontWeight: 700, fontFamily: "var(--disp)" }}>Desafío</span></div>
      <div className="pad">
        <div style={{ height: 120, borderRadius: 16, overflow: "hidden", position: "relative", marginBottom: 16 }}>
          <Scene kind={photo.scene} /><div className="grain" />
          <div style={{ position: "absolute", inset: 0, background: "rgba(15,16,20,.35)" }} />
          <div style={{ position: "absolute", left: 14, bottom: 12, color: "#fff" }}>
            <div style={{ fontFamily: "var(--disp)", fontWeight: 700, fontSize: 16 }}>{photo.title}</div>
            <div style={{ fontSize: 12, opacity: 0.85 }}>Sigue los pasos y sal a hacerla</div></div>
        </div>
        <div className="between" style={{ marginBottom: 12 }}>
          <span className="section-t">Tu checklist</span>
          <span className="pill teal">{done}/{items.length}</span></div>
        <div className="col" style={{ gap: 10, marginBottom: 18 }}>
          {items.map(([k, label]) => (
            <button key={k} className={"check" + (checks[k] ? " done" : "")} onClick={() => setChecks({ ...checks, [k]: !checks[k] })}>
              <div className="checkbox">{checks[k] && <Check size={16} color="#fff" />}</div>
              <span style={{ fontSize: 15, fontWeight: checks[k] ? 600 : 500, paddingTop: 2 }}>{label}</span></button>))}
        </div>
        <button className="btn amber" onClick={finish}><Camera size={18} /> {all ? "¡Tomé la fotografía!" : "Ya la hice de todas formas"}</button>
        {!all && <p className="center mut2" style={{ fontSize: 12, marginTop: 10 }}>Marca los pasos a medida que ajustas tu cámara.</p>}
      </div>
    </div>
  );
}

"use client";
import { Check, Crown, Trophy } from "lucide-react";
import { ALL_PHOTOS } from "@/data/photos";
import { MISSIONS } from "@/data/missions";
import { ICONS } from "@/data/icons";
import { useApp } from "@/hooks/useApp";
import type { Photo } from "@/types";

export function MissionsScreen() {
  const { completed, plan, streak } = useApp();
  const completedPhotos = completed.map((id) => ALL_PHOTOS.find((p) => p.id === id)).filter(Boolean) as Photo[];
  return (
    <div className="scroll fade">
      <div className="pad">
        <h1 style={{ fontSize: 26, marginBottom: 4 }}>Misiones</h1>
        <p className="mut" style={{ marginBottom: 18 }}>Retos que te empujan a probar técnicas nuevas.</p>
        <div className="col" style={{ gap: 12 }}>
          {MISSIONS.map((m) => {
            const Mi = ICONS[m.icon];
            const doneNow = completedPhotos.some((p) => m.match(p));
            const needsPro = ALL_PHOTOS.filter(m.match).every((p) => p.premium) && plan === "free";
            return (
              <div key={m.id} className="card" style={{ padding: 16, opacity: needsPro && !doneNow ? 0.7 : 1 }}>
                <div className="row">
                  <div className="oi" style={{ background: doneNow ? "var(--teal-soft)" : "var(--amber-soft)", color: doneNow ? "var(--teal-deep)" : "var(--amber-deep)" }}>
                    {doneNow ? <Check size={22} /> : <Mi size={22} />}</div>
                  <div className="grow"><div className="row" style={{ gap: 7 }}><span style={{ fontWeight: 700 }}>{m.title}</span>
                    {needsPro && !doneNow && <span className="pill amber" style={{ fontSize: 10 }}><Crown size={10} /> Pro</span>}</div>
                    <div className="mut" style={{ fontSize: 13 }}>{m.desc}</div></div>
                  <span className={"pill " + (doneNow ? "teal" : "amber")}>{doneNow ? "Hecho" : `+${m.xp}`}</span>
                </div>
              </div>);
          })}
        </div>
        <div className="card" style={{ padding: 16, marginTop: 16, background: "var(--paper2)", borderColor: "var(--line)" }}>
          <div className="row"><Trophy size={18} color="var(--amber-deep)" /><span style={{ fontWeight: 700, fontSize: 14 }}>Racha de {streak} días</span></div>
          <p className="mut" style={{ fontSize: 13, marginTop: 6 }}>Completa un desafío cada día para mantenerla. Las rachas multiplican tu XP en futuras versiones.</p>
        </div>
      </div>
    </div>
  );
}

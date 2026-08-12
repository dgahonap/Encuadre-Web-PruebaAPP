"use client";
import { useRouter } from "next/navigation";
import { Flame, Star, Play, Camera, Plane, Settings } from "lucide-react";
import { Scene } from "@/components/Scene";
import { PhotoTile } from "@/components/PhotoTile";
import { ALL_PHOTOS } from "@/data/photos";
import { MISSIONS } from "@/data/missions";
import { ICONS } from "@/data/icons";
import { equipLabel } from "@/utils/labels";
import { useApp } from "@/hooks/useApp";

export function HomeScreen() {
  const router = useRouter();
  const { user, streak, xp, lvl, camera, lens, droneId, drone, isLocked } = useApp();
  const rec = ALL_PHOTOS.filter((p) => (camera && !p.drone) || (droneId && p.drone) || (!camera && !droneId)).slice(0, 4);
  const cont = rec[0];
  const open = (id: string) => router.push(`/photo/${id}`);
  const m = MISSIONS[0];
  const Mi = ICONS[m.icon];

  return (
    <div className="scroll fade">
      <div className="pad" style={{ paddingBottom: 8 }}>
        <div className="between" style={{ marginBottom: 18 }}>
          <div><div className="mut" style={{ fontSize: 13 }}>Hola de nuevo</div>
            <div style={{ fontFamily: "var(--disp)", fontWeight: 700, fontSize: 22 }}>{user?.name || "Fotógrafo"}</div></div>
          <div className="row" style={{ gap: 8 }}>
            <span className="pill amber"><Flame size={14} /> {streak}</span>
            <div className="oi" style={{ width: 42, height: 42, background: "var(--ink)", color: "#fff" }}>{(user?.name || "F")[0].toUpperCase()}</div>
          </div>
        </div>
        <div className="card" style={{ padding: 14, marginBottom: 18 }}>
          <div className="between" style={{ marginBottom: 8 }}>
            <span className="pill teal"><Star size={13} /> {lvl.cur.name}</span>
            <span className="mut" style={{ fontSize: 13, fontWeight: 600 }}>{xp} XP</span></div>
          <div className="progress xpbar"><i style={{ width: `${lvl.pct}%` }} /></div>
          {lvl.next && <div className="mut2" style={{ fontSize: 12, marginTop: 6 }}>{lvl.next.min - xp} XP para {lvl.next.name}</div>}
        </div>
      </div>

      {cont && (<div className="pad" style={{ paddingTop: 0, paddingBottom: 10 }}>
        <div className="section-t" style={{ marginBottom: 10 }}>Continúa aprendiendo</div>
        <div className="card" style={{ overflow: "hidden" }} onClick={() => open(cont.id)}>
          <div style={{ height: 150, position: "relative" }}><Scene kind={cont.scene} /><div className="grain" />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(15,16,20,.7),transparent)" }} />
            <div style={{ position: "absolute", left: 16, bottom: 14, color: "#fff" }}>
              <div className="pill dark" style={{ marginBottom: 6 }}>{cont.diff}</div>
              <div style={{ fontFamily: "var(--disp)", fontWeight: 700, fontSize: 19 }}>{cont.title}</div></div>
          </div>
          <div className="between" style={{ padding: 14 }}>
            <span className="mut" style={{ fontSize: 13 }}>{cont.learn[0]}</span>
            <span className="pill dark"><Play size={13} /> Intentar</span></div>
        </div>
      </div>)}

      <div className="pad" style={{ paddingTop: 8 }}>
        <div className="between" style={{ marginBottom: 10 }}>
          <div className="section-t">Recomendadas para ti</div>
          <button className="mut" style={{ fontSize: 13, fontWeight: 600 }} onClick={() => router.push("/explore")}>Ver todas</button></div>
        <div className="grid">
          {rec.map((p) => (<PhotoTile key={p.id} photo={p} locked={isLocked(p)} onClick={() => open(p.id)} />))}
        </div>
      </div>

      <div className="pad" style={{ paddingTop: 8 }}>
        <div className="section-t" style={{ marginBottom: 10 }}>Misión del día</div>
        <div className="card" style={{ padding: 16 }} onClick={() => router.push("/missions")}>
          <div className="row"><div className="oi" style={{ background: "var(--amber-soft)", color: "var(--amber-deep)" }}><Mi size={22} /></div>
            <div className="grow"><div style={{ fontWeight: 700 }}>{m.title}</div><div className="mut" style={{ fontSize: 13 }}>{m.desc}</div></div>
            <span className="pill amber">+{m.xp} XP</span></div>
        </div>
      </div>

      <div className="pad" style={{ paddingTop: 8 }}>
        <div className="section-t" style={{ marginBottom: 10 }}>Tu equipo</div>
        <div className="card row" style={{ padding: 16 }} onClick={() => router.push("/profile")}>
          <div className="oi">{droneId && !camera ? <Plane size={20} /> : <Camera size={20} />}</div>
          <div className="grow"><div style={{ fontWeight: 700, fontSize: 14 }}>{equipLabel(camera, lens, drone, droneId)}</div>
            <div className="mut" style={{ fontSize: 12 }}>Toca para gestionar</div></div>
          <Settings size={18} className="mut2" /></div>
      </div>
    </div>
  );
}

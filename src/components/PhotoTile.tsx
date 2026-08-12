"use client";
import { Lock } from "lucide-react";
import { Scene } from "./Scene";
import type { Photo } from "@/types";

export function PhotoTile({ photo, locked, onClick }: { photo: Photo; locked: boolean; onClick: () => void }) {
  return (
    <div className="tile" onClick={onClick}>
      <Scene kind={photo.scene} />
      <div className="grain" />
      <span className="pill dark tag" style={{ fontSize: 11, padding: "4px 9px" }}>{photo.diff}</span>
      {locked && <div className="lockbadge"><Lock size={14} color="#fff" /></div>}
      <div className="cap">
        <div style={{ fontWeight: 700, fontSize: 14, fontFamily: "var(--disp)" }}>{photo.title}</div>
        <div style={{ fontSize: 12, opacity: 0.85 }}>{photo.cat}</div>
      </div>
    </div>
  );
}

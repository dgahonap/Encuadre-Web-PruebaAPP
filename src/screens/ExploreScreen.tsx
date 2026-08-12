"use client";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { PhotoTile } from "@/components/PhotoTile";
import { ALL_PHOTOS } from "@/data/photos";
import { useApp } from "@/hooks/useApp";

export function ExploreScreen() {
  const router = useRouter();
  const { q, setQ, fCat, setFCat, fDiff, setFDiff, isLocked } = useApp();
  const cats = ["Todas", "Naturaleza", "Ciudad", "Personas", "Dron"];
  const diffs = ["Todas", "Principiante", "Intermedio", "Avanzado"];
  const list = ALL_PHOTOS.filter((p) => {
    const mq = !q || (p.title + p.cat + p.subject + p.light).toLowerCase().includes(q.toLowerCase());
    const mc = fCat === "Todas" || p.cat === fCat;
    const md = fDiff === "Todas" || p.diff === fDiff;
    return mq && mc && md;
  });
  return (
    <div className="scroll fade">
      <div className="pad" style={{ paddingBottom: 8 }}>
        <h1 style={{ fontSize: 26, marginBottom: 14 }}>Explorar</h1>
        <div className="row" style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: 13, padding: "12px 14px", marginBottom: 12 }}>
          <Search size={18} className="mut" /><input style={{ border: "none", outline: "none", flex: 1, fontSize: 15, background: "transparent" }}
            placeholder="Busca: montaña, atardecer, dron…" value={q} onChange={(e) => setQ(e.target.value)} />
          {q && <button onClick={() => setQ("")}><X size={16} className="mut" /></button>}
        </div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginBottom: 6 }}>
          {cats.map((c) => (<button key={c} className={"pill" + (fCat === c ? " dark" : "")} style={{ whiteSpace: "nowrap" }} onClick={() => setFCat(c)}>{c}</button>))}
        </div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
          {diffs.map((d) => (<button key={d} className={"pill" + (fDiff === d ? " amber" : "")} style={{ whiteSpace: "nowrap" }} onClick={() => setFDiff(d)}>{d}</button>))}
        </div>
      </div>
      <div className="pad" style={{ paddingTop: 6 }}>
        <div className="mut" style={{ fontSize: 13, marginBottom: 12 }}>{list.length} referencias</div>
        {list.length === 0
          ? <div className="center mut" style={{ padding: "40px 0" }}><Search size={28} style={{ margin: "0 auto 8px" }} /><div>Sin resultados. Prueba otra búsqueda.</div></div>
          : <div className="grid">{list.map((p) => (<PhotoTile key={p.id} photo={p} locked={isLocked(p)} onClick={() => router.push(`/photo/${p.id}`)} />))}</div>}
      </div>
    </div>
  );
}

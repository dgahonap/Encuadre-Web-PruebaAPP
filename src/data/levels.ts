const LEVELS = [
  { name:"Aprendiz", min:0 }, { name:"Aficionado", min:200 },
  { name:"Entusiasta", min:500 }, { name:"Avanzado", min:1000 }, { name:"Fotógrafo", min:2000 },
];
export interface LevelInfo { cur: { name: string; min: number }; next: { name: string; min: number } | null; pct: number; }
export function levelFor(xp: number): LevelInfo {
  let cur = LEVELS[0], next: { name: string; min: number } | null = LEVELS[1];
  for(let i=0;i<LEVELS.length;i++){ if(xp>=LEVELS[i].min){ cur=LEVELS[i]; next=LEVELS[i+1]||null; } }
  return { cur, next, pct: next? Math.round((xp-cur.min)/(next.min-cur.min)*100):100 };
}

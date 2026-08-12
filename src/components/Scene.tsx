import type { JSX } from "react";

/* Escenas procedurales (gradiente + SVG) en lugar de fotos con copyright.
   En producción, `scene` se reemplaza por <img> de Supabase Storage + EXIF. */
export function Scene({ kind }: { kind: string }) {
  const S: Record<string, JSX.Element> = {
    sunsetMountain: (
      <div className="scene" style={{background:"linear-gradient(#F6C36B,#F29C5B 42%,#B85C6B 70%,#5B3B66)"}}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <circle cx="50" cy="46" r="12" fill="#FDE9B8" opacity=".9"/>
          <polygon points="0,100 22,52 40,72 60,40 80,66 100,48 100,100" fill="#3C2F52"/>
          <polygon points="0,100 30,66 52,84 72,58 100,78 100,100" fill="#241C33"/>
        </svg>
      </div>),
    forestFog: (
      <div className="scene" style={{background:"linear-gradient(#DDE6DE,#A9BFAE 55%,#4E6B54)"}}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          {[8,22,36,50,64,78,92].map((x,i)=>(<polygon key={i} points={`${x-3},100 ${x},${30+i%3*10} ${x+3},100`} fill="#2E4433" opacity={.85-i*.08}/>))}
          <rect x="0" y="40" width="100" height="30" fill="#EDF2ED" opacity=".5"/>
        </svg>
      </div>),
    waterfall: (
      <div className="scene" style={{background:"linear-gradient(#3A5A44,#5E8168 60%,#2C3F34)"}}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <rect x="38" y="0" width="24" height="80" fill="#EAF3EE" opacity=".85"/>
          <rect x="42" y="0" width="6" height="80" fill="#fff" opacity=".6"/>
          <ellipse cx="50" cy="86" rx="30" ry="8" fill="#DCEAE2" opacity=".7"/>
        </svg>
      </div>),
    lakeReflection: (
      <div className="scene" style={{background:"linear-gradient(#BFD9E6,#7FA8C4 48%,#4A7391 50%,#2E4A5E)"}}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="0,50 30,22 55,40 78,18 100,44 100,50" fill="#5A6E7A"/>
          <polygon points="0,50 30,78 55,60 78,82 100,56 100,50" fill="#3E5462" opacity=".7"/>
        </svg>
      </div>),
    beach: (
      <div className="scene" style={{background:"linear-gradient(#FBE3B4,#F4B98A 46%,#6FB4C4 60%,#3E8FA6)"}}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <circle cx="70" cy="40" r="9" fill="#FFF3D6" opacity=".9"/>
          <path d="M0,72 Q50,66 100,72 L100,100 L0,100 Z" fill="#EBD6A8"/>
        </svg>
      </div>),
    wildlife: (
      <div className="scene" style={{background:"linear-gradient(#C9D6A8,#93AE6E 60%,#4E6136)"}}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <ellipse cx="55" cy="60" rx="18" ry="12" fill="#6B4A2E"/>
          <ellipse cx="72" cy="52" rx="8" ry="7" fill="#6B4A2E"/>
          <rect x="0" y="0" width="30" height="100" fill="#3E4E2C" opacity=".3"/>
        </svg>
      </div>),
    architecture: (
      <div className="scene" style={{background:"linear-gradient(#EBE7E0,#CFCabe 70%,#A79E90)"}}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="20,100 20,20 80,30 80,100" fill="#D8D2C6"/>
          <polygon points="80,100 80,30 100,38 100,100" fill="#B7AF9F"/>
          {[...Array(6)].map((_,r)=>[...Array(3)].map((_,c)=>(<rect key={r+'-'+c} x={28+c*16} y={30+r*11} width="9" height="7" fill="#8C8474"/>)))}
        </svg>
      </div>),
    streetNight: (
      <div className="scene" style={{background:"linear-gradient(#2A2440,#42304A 55%,#1A1622)"}}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          {[15,32,50,68,85].map((x,i)=>(<rect key={i} x={x} y={30+i%2*10} width="10" height="70" fill="#100C18"/>))}
          {[...Array(14)].map((_,i)=>(<circle key={i} cx={12+i*6} cy={44+ (i%3)*9} r="1.6" fill="#F2C46A" opacity=".9"/>))}
          <rect x="0" y="78" width="100" height="4" fill="#E8A94B" opacity=".5"/>
        </svg>
      </div>),
    longExposureCity: (
      <div className="scene" style={{background:"linear-gradient(#20263A,#33405C 60%,#141824)"}}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          {[10,26,44,62,80].map((x,i)=>(<rect key={i} x={x} y={20+i%2*14} width="12" height="80" fill="#0E1420"/>))}
          <rect x="0" y="70" width="100" height="3" fill="#F05A3B" opacity=".85"/>
          <rect x="0" y="76" width="100" height="3" fill="#F2C46A" opacity=".85"/>
        </svg>
      </div>),
    blueHourCity: (
      <div className="scene" style={{background:"linear-gradient(#F0A15E,#8E6F9E 40%,#3C4E7E 70%,#1E2A46)"}}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          {[8,24,42,60,78].map((x,i)=>(<rect key={i} x={x} y={34+i%3*10} width="13" height="66" fill="#20304E" opacity=".9"/>))}
          {[...Array(10)].map((_,i)=>(<rect key={i} x={12+i*8} y={50+(i%4)*8} width="2.5" height="2.5" fill="#F2C46A"/>))}
        </svg>
      </div>),
    portraitGolden: (
      <div className="scene" style={{background:"radial-gradient(80% 60% at 60% 40%, #F7D79E, #D98F5A 55%, #7A4B44)"}}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <ellipse cx="46" cy="44" rx="15" ry="18" fill="#3A2A2A" opacity=".55"/>
          <circle cx="80" cy="30" r="18" fill="#FFE9C0" opacity=".35"/>
        </svg>
      </div>),
    silhouette: (
      <div className="scene" style={{background:"linear-gradient(#F5B85E,#E86F52 55%,#7A3A55)"}}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <circle cx="50" cy="44" r="14" fill="#FBDca0" opacity=".8"/>
          <ellipse cx="50" cy="66" rx="8" ry="20" fill="#241426"/>
          <circle cx="50" cy="42" r="6" fill="#241426"/>
          <rect x="0" y="86" width="100" height="14" fill="#241426"/>
        </svg>
      </div>),
    sports: (
      <div className="scene" style={{background:"linear-gradient(#BDD4A6,#7FA85F 60%,#41582C)"}}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <ellipse cx="50" cy="60" rx="10" ry="14" fill="#2C3A56"/>
          <circle cx="50" cy="42" r="6" fill="#E8B98A"/>
          <rect x="0" y="0" width="100" height="8" fill="#fff" opacity=".18" transform="skewX(-20)"/>
        </svg>
      </div>),
    droneTopdown: (
      <div className="scene" style={{background:"linear-gradient(135deg,#2E7D6E,#6BAE93 60%,#D9C48E)"}}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,60 Q30,50 55,58 T100,54 L100,100 L0,100Z" fill="#C9B87A"/>
          <path d="M20,0 Q40,40 30,100" stroke="#1F5F52" strokeWidth="5" fill="none" opacity=".7"/>
        </svg>
      </div>),
    droneReveal: (
      <div className="scene" style={{background:"linear-gradient(#CFE3EC,#8FB6C4 45%,#4B7E7A 70%,#2E5145)"}}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="0,58 24,34 46,52 70,28 100,50 100,100 0,100" fill="#3E6357"/>
          <path d="M0,74 Q50,68 100,76 L100,100 0,100Z" fill="#7FA9AE" opacity=".7"/>
        </svg>
      </div>),
    droneSymmetry: (
      <div className="scene" style={{background:"linear-gradient(#B7CBB0,#7C9E82 55%,#3E5641)"}}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <circle cx="50" cy="50" r="26" fill="none" stroke="#25382A" strokeWidth="3"/>
          <circle cx="50" cy="50" r="14" fill="#25382A" opacity=".5"/>
          {[0,45,90,135].map(a=>(<line key={a} x1="50" y1="50" x2={50+40*Math.cos(a*Math.PI/180)} y2={50+40*Math.sin(a*Math.PI/180)} stroke="#25382A" strokeWidth="2" opacity=".5"/>))}
        </svg>
      </div>),
    droneCoastline: (
      <div className="scene" style={{background:"linear-gradient(120deg,#3D9AA8,#6FC3C0 45%,#E8D9A6 46%,#CDB983)"}}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,0 Q40,30 55,55 T80,100 L0,100Z" fill="#2E7E86"/>
          <path d="M0,0 Q40,30 55,55 T80,100" stroke="#EAF6F2" strokeWidth="2" fill="none" opacity=".7"/>
        </svg>
      </div>),
    cityscape: (
      <div className="scene" style={{background:"linear-gradient(#F1B36A,#C97E7A 45%,#5B5480 75%,#2E3050)"}}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          {[6,20,34,48,62,76,90].map((x,i)=>(<rect key={i} x={x} y={40+((i*13)%30)} width="11" height="60" fill="#2B2E4A" opacity={.9}/>))}
        </svg>
      </div>),
    aurora: (
      <div className="scene" style={{background:"linear-gradient(#0E1630,#16324A 55%,#0A0F1E)"}}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,40 Q30,20 55,42 T100,36" stroke="#3FE0A0" strokeWidth="10" fill="none" opacity=".5"/>
          <path d="M0,52 Q35,34 60,54 T100,48" stroke="#59C6F0" strokeWidth="7" fill="none" opacity=".4"/>
          {[...Array(30)].map((_,i)=>(<circle key={i} cx={(i*37)%100} cy={(i*53)%70} r=".7" fill="#fff" opacity=".8"/>))}
          <polygon points="0,100 40,74 70,86 100,72 100,100" fill="#070B14"/>
        </svg>
      </div>),
  };
  return S[kind] || S.sunsetMountain;
}

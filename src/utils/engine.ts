/* ============================ RULES ENGINE ==============================
   Núcleo de valor: convierte (foto + cámara + lente) en ajustes REALES,
   verificando que el equipo pueda ejecutarlos y explicando el porqué.
   En V2 este módulo se sustituye/complementa por un AIPhotographyAnalyzer
   con la MISMA firma de entrada/salida. */
import type { Photo, Camera, Lens, Drone, Warning, SettingsResult } from "@/types";

const STD_ISO = [100,125,160,200,250,320,400,500,640,800,1000,1250,1600,2000,2500,3200,4000,5000,6400,8000,10000,12800,16000,25600,32000,51200];
const STD_SHUTTER = [1/8000,1/4000,1/2000,1/1000,1/500,1/250,1/200,1/125,1/100,1/80,1/60,1/50,1/40,1/30,1/20,1/15,1/10,1/8,1/6,1/4,1/2,1,2,4,8,15,20,30];

const apStops = (f1: number, f2: number)=> 2*Math.log2(f2/f1);              // pasos entre dos aperturas
const snapISO = (v: number)=> STD_ISO.reduce((a,b)=> Math.abs(Math.log2(b/v))<Math.abs(Math.log2(a/v))?b:a);
const snapShutter = (s: number)=> STD_SHUTTER.reduce((a,b)=> Math.abs(Math.log2(b/s))<Math.abs(Math.log2(a/s))?b:a);
function fmtShutter(s: number){
  if(s>=1) return Number.isInteger(s)? `${s}"` : `${s}"`;
  return `1/${Math.round(1/s)}`;
}
const dofLabel = (f: number)=> f<=2?"Muy baja · fondo muy desenfocado": f<=4?"Baja · fondo desenfocado":
  f<=8?"Media · fondo algo definido": f<=16?"Amplia · casi todo nítido":"Muy amplia · todo nítido";

/* --- Motor para CÁMARAS ------------------------------------------------ */
function computeCameraSettings(photo: Photo, camera: Camera | null, lens: Lens | null): SettingsResult {
  const warnings: Warning[] = [];
  let iso = photo.iso, ap = photo.ap, shutter = photo.shutter;
  const focalTarget = Math.round((photo.focal![0]+photo.focal![1])/2);
  let focal = focalTarget;

  // 1) FOCAL vs rango del lente
  if(lens){
    if(focal < lens.focalMin){ focal = lens.focalMin;
      warnings.push({t:"Tu lente no llega a esa focal", d:`Recomendábamos ${focalTarget}mm pero tu ${lens.model} empieza en ${lens.focalMin}mm. Usamos ${lens.focalMin}mm; el encuadre será algo más amplio, retrocede un poco para recomponer.`});
    } else if(focal > lens.focalMax){ focal = lens.focalMax;
      warnings.push({t:"Tu lente no alcanza esa focal", d:`Recomendábamos ${focalTarget}mm pero tu ${lens.model} llega a ${lens.focalMax}mm. Usamos ${lens.focalMax}mm; acércate físicamente al sujeto para compensar.`});
    }
  }

  // 2) APERTURA vs capacidad del lente (apertura útil a esa focal)
  let lensMaxAp = 3.5;
  if(lens){
    const t = lens.focalMax===lens.focalMin?0:(focal-lens.focalMin)/(lens.focalMax-lens.focalMin);
    lensMaxAp = +(lens.apWide + (lens.apTele-lens.apWide)*Math.max(0,Math.min(1,t))).toFixed(1);
  }
  let apClamped=false, apStopsLost=0;
  if(lens && ap < lensMaxAp){                       // pedimos MÁS abierta de lo posible
    apStopsLost = apStops(ap, lensMaxAp);           // pasos de luz perdidos
    ap = lensMaxAp; apClamped=true;
    warnings.push({
      t:`Tu lente no puede abrir a f/${photo.ap}`,
      d:`La referencia usa f/${photo.ap}, pero tu ${lens?lens.model:"lente"} abre como máximo a f/${lensMaxAp} a ${focal}mm. Usamos f/${lensMaxAp}. Consecuencia: menos desenfoque de fondo del que ves en la referencia. Para acercarte, sitúa al sujeto más lejos del fondo o acércate a él. Además entra ${apStopsLost.toFixed(1)} pasos menos de luz, que compensamos abajo.`});
  } else if(lens && ap > lens.apMin){ ap = lens.apMin; }

  // 3) COMPENSAR la luz perdida por la apertura (según prioridad de la foto)
  if(apStopsLost>0.15){
    if(photo.priority==="freeze"){                  // mantener velocidad -> subir ISO
      iso = snapISO(iso * Math.pow(2, apStopsLost));
    } else if(photo.priority==="lowISO"){           // mantener ISO -> bajar velocidad
      shutter = snapShutter(shutter * Math.pow(2, apStopsLost));
    } else {                                         // balanced -> repartir mitad y mitad
      iso = snapISO(iso * Math.pow(2, apStopsLost/2));
      shutter = snapShutter(shutter * Math.pow(2, apStopsLost/2));
    }
  }

  // 4) ISO vs rango de la cámara
  if(camera){
    if(iso < camera.isoMin){ iso = camera.isoMin; }
    if(iso > camera.isoMax){ const cap=iso; iso = camera.isoMax;
      warnings.push({t:"ISO por encima del máximo de tu cámara", d:`La escena pedía ISO ${cap}, pero tu ${camera.model} llega a ISO ${camera.isoMax}. Con ese tope, la foto puede salir algo oscura: usa un trípode y baja la velocidad, o busca más luz.`});
    }
    iso = snapISO(iso);
  }

  // 5) Avisos de trepidación / trípode
  const handheldLimit = 1/Math.max(60, focal);      // regla 1/focal (mín 1/60)
  const needsTripod = shutter > 1/15;
  if(shutter > handheldLimit && shutter <= 1/15){
    warnings.push({t:"Riesgo de foto movida a mano", d:`A ${fmtShutter(shutter)} y ${focal}mm puede notarse la trepidación. Apoya la cámara, activa el estabilizador o sube el ISO para ganar velocidad.`});
  }
  if(needsTripod){
    warnings.push({t:"Necesitas trípode", d:`Con ${fmtShutter(shutter)} es imposible sostener la cámara sin que salga movida. Usa trípode y disparo con temporizador.`});
  }

  const mode = photo.priority==="freeze" ? "Tv / Prioridad de velocidad"
             : (photo.ap<=2.8 || apClamped) ? "Av / Prioridad de apertura"
             : "Av / Prioridad de apertura";
  const af = photo.priority==="freeze" ? (camera?.af?.find(a=>/servo|AF-C|continu/i.test(a))||"AF continuo") : (camera?.af?.[0]||"One Shot");
  const metering = photo.light==="Contraluz" ? "Puntual" : (camera?.metering?.[0]||"Evaluativa");
  const wb = photo.light==="Golden hour"||photo.light==="Contraluz" ? "Luz día"
           : photo.light==="Nocturna" ? "Auto" : "Luz día";

  // Explicaciones por parámetro (el "¿por qué?")
  const why = {
    ISO:`ISO ${iso}: ${iso<=200?"hay luz suficiente, así que lo mantenemos bajo para máxima calidad y sin ruido.":iso<=800?"la luz es moderada; este ISO equilibra brillo y ruido.":"hay poca luz; subimos el ISO para lograr una velocidad usable, asumiendo algo de grano."}`,
    Apertura:`f/${ap}: ${ap<=2.8?"apertura amplia para desenfocar el fondo y aislar al sujeto.":ap<=8?"apertura media que equilibra nitidez y algo de separación.":"diafragma cerrado para gran profundidad de campo: casi todo queda nítido."}${apClamped?" (Ajustada al máximo de tu lente.)":""}`,
    Velocidad:`${fmtShutter(shutter)}: ${shutter<=1/1000?"muy rápida para congelar el movimiento por completo.":shutter<=1/125?"rápida y segura a mano alzada.":shutter<1?"lenta; necesitarás estabilidad o apoyo.":"exposición larga para capturar movimiento; trípode obligatorio."}`,
    "Distancia focal":`${focal}mm: ${focal<=24?"gran angular para abarcar toda la escena.":focal<=70?"focal versátil con perspectiva natural.":"focal larga que acerca y comprime los planos."}`,
    "Balance de blancos":`${wb}: conserva la temperatura de color adecuada para esta luz.`,
    Modo:`${mode}: tú fijas ${photo.priority==="freeze"?"la velocidad":"la apertura"} y la cámara calcula el resto.`,
  };

  return {
    kind:"camera",
    settings:[
      { key:"ISO", val:String(iso), sub:iso<=200?"Máxima calidad":iso<=1600?"Equilibrado":"Poca luz" },
      { key:"Apertura", val:`f/${ap}`, sub:dofLabel(ap) },
      { key:"Velocidad", val:fmtShutter(shutter), sub:shutter<=1/500?"Congela":shutter<1?"A mano":"Trípode" },
      { key:"Distancia focal", val:`${focal} mm`, sub:focal<=24?"Gran angular":focal<=70?"Estándar":"Tele" },
      { key:"Balance de blancos", val:wb, sub:"Temperatura de color" },
      { key:"Modo", val:mode.split(" / ")[0], sub:mode.split(" / ")[1] },
      { key:"Enfoque", val:af, sub:photo.priority==="freeze"?"Sigue al sujeto":"Sujeto quieto", noWhy:true },
      { key:"Medición", val:metering, sub:photo.light==="Contraluz"?"Al cielo":"General", noWhy:true },
    ],
    warnings, why, focal, ap, iso, shutter,
  };
}

/* --- Motor para DRONES ------------------------------------------------- */
function computeDroneSettings(photo: Photo, drone: Drone | null): SettingsResult {
  const warnings: Warning[] = [];
  if(drone && photo.ap!==drone.apertureFixed){
    warnings.push({t:"Tu dron tiene apertura fija", d:`El ${drone.model} dispara siempre a f/${drone.apertureFixed}. La exposición se controla con ISO, velocidad y compensación EV, no con la apertura.`});
  }
  const s = photo.shot!;
  return {
    kind:"drone",
    settings:[
      { key:"ISO", val:String(photo.iso), sub:"Sensor del dron" },
      { key:"Velocidad", val:fmtShutter(photo.shutter), sub:"Obturación" },
      { key:"Apertura", val:`f/${photo.ap}`, sub:"Fija", noWhy:true },
      { key:"EV", val:(photo.ev!>0?"+":"")+photo.ev, sub:"Compensación", noWhy:true },
      { key:"Balance de blancos", val:photo.wb!, sub:"Temperatura" },
      { key:"Resolución", val:`${photo.res} · ${photo.fps}fps`, sub:"Calidad", noWhy:true },
      { key:"Perfil de color", val:photo.color!, sub:"Look", noWhy:true },
      { key:"Gimbal", val:`${s.gimbal}°`, sub:"Ángulo cámara", noWhy:true },
    ],
    shot:s,
    warnings,
    why:{
      ISO:`ISO ${photo.iso}: en vuelo mantenemos el ISO bajo para máxima calidad; hay luz suficiente.`,
      Velocidad:`${fmtShutter(photo.shutter)}: velocidad que evita el "jello" y congela el paisaje en movimiento del vuelo.`,
      "Balance de blancos":`${photo.wb}: fija el color para que los clips no cambien de tono en el aire.`,
    },
  };
}

export function computeSettings(photo: Photo, camera: Camera | null, lens: Lens | null, drone: Drone | null): SettingsResult {
  return photo.drone ? computeDroneSettings(photo, drone) : computeCameraSettings(photo, camera, lens);
}

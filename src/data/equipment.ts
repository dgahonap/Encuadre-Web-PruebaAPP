import type { Camera, Lens, Drone } from "@/types";

export const CAMERAS: Camera[] = [
  { id:"canon-t100", brand:"Canon", model:"EOS Rebel T100", type:"DSLR", mount:"EF",
    sensor:"APS-C CMOS", sensorSize:"22.3×14.9mm", isoMin:100, isoMax:6400,
    shutterMin:1/4000, shutterMax:30, modes:["Auto","P","Tv","Av","M"],
    af:["One Shot","AI Servo"], metering:["Evaluativa","Parcial","Central"],
    wb:["Auto","Luz día","Nublado","Tungsteno","Fluorescente"], raw:true, video:"1080p24", notes:"Entrada de gama, ideal para principiantes." },
  { id:"canon-r50", brand:"Canon", model:"EOS R50", type:"Mirrorless", mount:"RF",
    sensor:"APS-C CMOS", sensorSize:"22.3×14.9mm", isoMin:100, isoMax:32000,
    shutterMin:1/4000, shutterMax:30, modes:["Auto","P","Tv","Av","M"],
    af:["One Shot","Servo","Detección de ojo"], metering:["Evaluativa","Puntual","Central"],
    wb:["Auto","Luz día","Sombra","Nublado","Tungsteno"], raw:true, video:"4K30", notes:"Mirrorless moderna con AF por detección." },
  { id:"sony-a6400", brand:"Sony", model:"α6400", type:"Mirrorless", mount:"E",
    sensor:"APS-C Exmor", sensorSize:"23.5×15.6mm", isoMin:100, isoMax:32000,
    shutterMin:1/4000, shutterMax:30, modes:["Auto","P","S","A","M"],
    af:["AF-S","AF-C","Real-time Eye AF"], metering:["Multi","Puntual","Central"],
    wb:["Auto","Luz día","Sombra","Nublado","Incandescente"], raw:true, video:"4K30", notes:"AF de seguimiento excelente." },
  { id:"nikon-z50", brand:"Nikon", model:"Z50", type:"Mirrorless", mount:"Z",
    sensor:"APS-C CMOS", sensorSize:"23.5×15.7mm", isoMin:100, isoMax:51200,
    shutterMin:1/4000, shutterMax:30, modes:["Auto","P","S","A","M"],
    af:["AF-S","AF-C","Eye-Detection"], metering:["Matricial","Puntual","Ponderada"],
    wb:["Auto","Luz día","Sombra","Nublado","Incandescente"], raw:true, video:"4K30", notes:"Buen rango ISO para poca luz." },
];

// Lentes. Aperturas como número f (menor = más luminoso). Zooms guardan apertura wide/tele.
export const LENSES: Lens[] = [
  { id:"ef-s-18-55", brand:"Canon", model:"EF-S 18-55mm f/3.5-5.6", mounts:["EF","RF*"],
    focalMin:18, focalMax:55, apWide:3.5, apTele:5.6, apMin:22, stab:true, notes:"Lente de kit versátil." },
  { id:"ef-50-18", brand:"Canon", model:"EF 50mm f/1.8 STM", mounts:["EF","RF*"],
    focalMin:50, focalMax:50, apWide:1.8, apTele:1.8, apMin:22, stab:false, notes:"El 'nifty fifty', muy luminoso." },
  { id:"ef-s-55-250", brand:"Canon", model:"EF-S 55-250mm f/4-5.6", mounts:["EF","RF*"],
    focalMin:55, focalMax:250, apWide:4, apTele:5.6, apMin:32, stab:true, notes:"Teleobjetivo para fauna y deporte." },
  { id:"rf-s-18-45", brand:"Canon", model:"RF-S 18-45mm f/4.5-6.3", mounts:["RF"],
    focalMin:18, focalMax:45, apWide:4.5, apTele:6.3, apMin:29, stab:true, notes:"Kit compacto para la R50/R10." },
  { id:"sony-16-50", brand:"Sony", model:"E 16-50mm f/3.5-5.6", mounts:["E"],
    focalMin:16, focalMax:50, apWide:3.5, apTele:5.6, apMin:22, stab:true, notes:"Kit compacto de Sony." },
  { id:"sony-50-18", brand:"Sony", model:"E 50mm f/1.8 OSS", mounts:["E"],
    focalMin:50, focalMax:50, apWide:1.8, apTele:1.8, apMin:22, stab:true, notes:"Retrato luminoso APS-C." },
  { id:"nikon-16-50", brand:"Nikon", model:"Z DX 16-50mm f/3.5-6.3", mounts:["Z"],
    focalMin:16, focalMax:50, apWide:3.5, apTele:6.3, apMin:22, stab:true, notes:"Kit retráctil de la Z50." },
];
// "RF*" = compatible vía adaptador EF→RF.

export const DRONES: Drone[] = [
  { id:"dji-neo-2", brand:"DJI", model:"Neo 2", type:"Dron", sensor:"1/2\" CMOS",
    apertureFixed:2.8, isoMin:100, isoMax:12800, maxRes:"4K", maxFps:60,
    colorProfiles:["Estándar","D-Log M"], gimbalRange:"-90° a +45°", notes:"Dron ligero, apertura fija f/2.8." },
];

const ADAPTERS: Record<string, string[]> = { RF:["EF","RF*"] };
export function lensFits(lens: Lens | undefined | null, camera: Camera | undefined | null): boolean {
  if(!camera || !lens) return false;
  if(lens.mounts.includes(camera.mount)) return true;
  const adapt = ADAPTERS[camera.mount] || [];
  return lens.mounts.some(m => adapt.includes(m));
}

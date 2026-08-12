import "./globals.css";
import type { Metadata } from "next";
import { AppProvider } from "@/services/AppProvider";
import { PhoneFrame } from "@/layouts/PhoneFrame";

export const metadata: Metadata = {
  title: "Encuadre — Tu copiloto de fotografía",
  description: "Encuentra una foto que te guste y aprende a hacerla con tu propia cámara: ajustes reales para tu equipo y el porqué de cada decisión.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AppProvider>
          <PhoneFrame>{children}</PhoneFrame>
        </AppProvider>
      </body>
    </html>
  );
}

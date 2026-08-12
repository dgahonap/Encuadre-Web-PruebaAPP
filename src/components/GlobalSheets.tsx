"use client";
import { useApp } from "@/hooks/useApp";
import { ConceptSheet, Paywall } from "./Sheets";

export function GlobalSheets() {
  const { sheet, setSheet, subscribe } = useApp();
  if (!sheet) return null;
  if (sheet.type === "concept") return <ConceptSheet name={sheet.name} onClose={() => setSheet(null)} />;
  if (sheet.type === "paywall") return <Paywall onClose={() => setSheet(null)} onSubscribe={() => { subscribe(); setSheet(null); }} />;
  return null;
}

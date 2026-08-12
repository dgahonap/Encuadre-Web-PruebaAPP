import { notFound } from "next/navigation";
import { ALL_PHOTOS } from "@/data/photos";
import { ResultScreen } from "@/screens/ResultScreen";

export default function Page({ params }: { params: { id: string } }) {
  const photo = ALL_PHOTOS.find((p) => p.id === params.id);
  if (!photo) notFound();
  return <ResultScreen photo={photo} />;
}

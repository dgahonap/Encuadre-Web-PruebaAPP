import { notFound } from "next/navigation";
import { ALL_PHOTOS } from "@/data/photos";
import { SetupScreen } from "@/screens/SetupScreen";

export default function Page({ params }: { params: { id: string } }) {
  const photo = ALL_PHOTOS.find((p) => p.id === params.id);
  if (!photo) notFound();
  return <SetupScreen photo={photo} />;
}

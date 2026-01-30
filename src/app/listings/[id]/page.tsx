import BoatDetails from "./BoatDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BoatDetails id={id} />;
}

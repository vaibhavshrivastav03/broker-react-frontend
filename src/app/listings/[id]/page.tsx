import BoatDetails from "./BoatDetails";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/public/listings`;

  const res = await fetch(url, {
    cache: "force-cache",
  });

  if (!res.ok) {
    console.error("generateStaticParams failed:", res.status, url);
    return [];
  }

  const contentType = res.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    const text = await res.text();
    console.error("Non-JSON response:", text.slice(0, 200));
    return [];
  }

  const json = await res.json();

  const listings =
    Array.isArray(json) ? json :
    Array.isArray(json.data) ? json.data :
    Array.isArray(json.listings) ? json.listings :
    [];

  return listings.map((item: { id: number | string }) => ({
    id: String(item.id),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BoatDetails id={id} />;
}

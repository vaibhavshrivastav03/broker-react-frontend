import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Ruler } from "lucide-react";

interface BoatCardProps {
  boat: any; // API-driven
  viewMode: "grid" | "list";
}

export function BoatCard({ boat, viewMode }: BoatCardProps) {
  const formatPrice = (price?: number | string | null) => {
    if (!price) return "Price on request";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(Number(price));
  };

  // ✅ IMAGE (API SAFE)
  const image =
    boat.featured_image ||
    (Array.isArray(boat.gallery_urls) ? boat.gallery_urls[0] : null) ||
    "/placeholder.jpg";

  // ✅ LOCATION (API SAFE)
  const location = [boat.location_city, boat.location_country]
    .filter(Boolean)
    .join(", ");

  /* ================= LIST VIEW ================= */
  if (viewMode === "list") {
    return (
      <Link href={`/listings/${boat.id}`}>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-64 h-48 bg-slate-200 relative overflow-hidden">
                <img src={image} alt={boat.title} className="w-full h-full object-cover" />

                {boat.is_featured && (
                  <Badge className="absolute top-3 left-3 bg-yellow-500 text-yellow-950 border-0">
                    Featured
                  </Badge>
                )}
              </div>

              <div className="p-6 flex-grow">
                <h3 className="text-xl font-semibold">{boat.title}</h3>

                <div className="flex gap-4 mt-3 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <Ruler className="h-4 w-4" />
                    {boat.length_ft} ft
                  </div>

                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {location}
                  </div>
                </div>

                <p className="mt-4 text-2xl font-bold">
                  {formatPrice(boat.price_usd)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  /* ================= GRID VIEW ================= */
  return (
    <Link href={`/listings/${boat.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardContent className="p-0">
          <div className="relative h-48 bg-slate-200 overflow-hidden">
            <img src={image} alt={boat.title} className="w-full h-full object-cover" />

            {boat.is_featured && (
              <Badge className="absolute top-3 left-3 bg-yellow-500 text-yellow-950 border-0">
                Featured
              </Badge>
            )}

            <Badge className="absolute top-3 right-3 bg-slate-900/90 text-white border-0 capitalize">
              {boat.type}
            </Badge>
          </div>

          <div className="p-5">
            <h3 className="font-semibold text-lg mb-2">{boat.title}</h3>

            <div className="flex items-center gap-3 text-sm text-slate-600 mb-3">
              <div className="flex items-center gap-1">
                <Ruler className="h-4 w-4" />
                {boat.length_ft} ft
              </div>

              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {location}
              </div>
            </div>

            <p className="text-xl font-bold">
              {formatPrice(boat.price_usd)}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Boat } from "@/lib/types";
import { MapPin, Ruler, Calendar } from "lucide-react";

interface BoatCardProps {
  boat: Boat;
  viewMode: "grid" | "list";
}

export function BoatCard({ boat, viewMode }: BoatCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (viewMode === "list") {
    return (
      <Link href={`/listings/${boat.id}`}>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-64 h-48 sm:h-auto bg-slate-200 relative overflow-hidden flex-shrink-0">
                {boat.images[0] ? (
                  <img
                    src={boat.images[0]}
                    alt={boat.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    No image
                  </div>
                )}
                {boat.featured && (
                  <Badge className="absolute top-3 left-3 bg-yellow-500 text-yellow-950 border-0">
                    Featured
                  </Badge>
                )}
              </div>
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-1">{boat.name}</h3>
                    <p className="text-sm text-slate-600">
                      {boat.year} {boat.make} {boat.model}
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{formatPrice(boat.price_usd)}</p>
                </div>
                <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <Ruler className="h-4 w-4" />
                    {boat.length_ft}ft
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {boat.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {boat.year}
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-600 line-clamp-2">{boat.description}</p>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-slate-500">Available via Broker Listings API</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/listings/${boat.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardContent className="p-0">
          <div className="relative h-48 bg-slate-200 overflow-hidden">
            {boat.images[0] ? (
              <img
                src={boat.images[0]}
                alt={boat.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                No image
              </div>
            )}
            {boat.featured && (
              <Badge className="absolute top-3 left-3 bg-yellow-500 text-yellow-950 border-0">
                Featured
              </Badge>
            )}
            <Badge className="absolute top-3 right-3 bg-slate-900/90 text-white border-0 capitalize">
              {boat.type}
            </Badge>
          </div>
          <div className="p-5">
            <h3 className="font-semibold text-lg text-slate-900 mb-1">{boat.name}</h3>
            <p className="text-sm text-slate-600 mb-3">
              {boat.year} {boat.make} {boat.model}
            </p>
            <div className="flex items-center gap-3 text-sm text-slate-600 mb-3">
              <div className="flex items-center gap-1">
                <Ruler className="h-4 w-4" />
                {boat.length_ft}ft
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {boat.location.split(",")[0]}
              </div>
            </div>
            <p className="text-xl font-bold text-slate-900 mb-3">{formatPrice(boat.price_usd)}</p>
            <p className="text-xs text-slate-500 border-t pt-3">Available via API</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

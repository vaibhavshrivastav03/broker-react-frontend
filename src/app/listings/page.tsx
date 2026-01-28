"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Grid3x3, List, Search } from "lucide-react";
import { getBoats } from "@/lib/api-client";
import type { Boat } from "@/lib/types";
import { BoatCard } from "@/components/boat-card";
import { Checkbox } from "@/components/ui/checkbox";

export default function ListingsPage() {
  const [boats, setBoats] = useState<Boat[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filters
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [lengthRange, setLengthRange] = useState([0, 100]);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    loadBoats();
  }, [typeFilter, locationFilter, priceRange, lengthRange, featuredOnly]);

  async function loadBoats() {
    setLoading(true);
    try {
      const data = await getBoats({
        type: typeFilter !== "all" ? typeFilter : undefined,
        location: locationFilter || undefined,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        minLength: lengthRange[0],
        maxLength: lengthRange[1],
        featured: featuredOnly || undefined,
      });
      setBoats(data);
    } catch (error) {
      console.error("Failed to load boats:", error);
    } finally {
      setLoading(false);
    }
  }

  const sortedBoats = [...boats].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price_usd - b.price_usd;
      case "price-high":
        return b.price_usd - a.price_usd;
      case "length":
        return b.length_ft - a.length_ft;
      case "newest":
      default:
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    }
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Yacht Listings</h1>
          <p className="text-slate-600">Browse available yachts from independent brokers</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-20">
              <h2 className="font-semibold text-lg mb-4">Filters</h2>

              <div className="space-y-6">
                {/* Type Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Type</label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="catamaran">Catamaran</SelectItem>
                      <SelectItem value="monohull">Monohull</SelectItem>
                      <SelectItem value="power">Power</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search location..."
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Price Range: ${(priceRange[0] / 1000).toFixed(0)}K - ${(priceRange[1] / 1000).toFixed(0)}K
                  </label>
                  <Slider
                    min={0}
                    max={5000000}
                    step={100000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mt-2"
                  />
                </div>

                {/* Length Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Length: {lengthRange[0]}ft - {lengthRange[1]}ft
                  </label>
                  <Slider
                    min={0}
                    max={100}
                    step={5}
                    value={lengthRange}
                    onValueChange={setLengthRange}
                    className="mt-2"
                  />
                </div>

                {/* Featured Only */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={featuredOnly}
                    onCheckedChange={(checked) => setFeaturedOnly(checked as boolean)}
                  />
                  <label
                    htmlFor="featured"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Featured only
                  </label>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setTypeFilter("all");
                    setLocationFilter("");
                    setPriceRange([0, 5000000]);
                    setLengthRange([0, 100]);
                    setFeaturedOnly(false);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </Card>
          </div>

          {/* Listings */}
          <div className="lg:col-span-3">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <p className="text-sm text-slate-600">
                {loading ? "Loading..." : `${sortedBoats.length} listing${sortedBoats.length !== 1 ? "s" : ""} found`}
              </p>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="length">Length: Largest First</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Boats Grid/List */}
            {loading ? (
              <div className="text-center py-12">
                <p className="text-slate-600">Loading listings...</p>
              </div>
            ) : sortedBoats.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-600">No listings found matching your filters.</p>
              </div>
            ) : (
              <div className={viewMode === "grid"
                ? "grid sm:grid-cols-2 xl:grid-cols-3 gap-6"
                : "space-y-4"
              }>
                {sortedBoats.map((boat) => (
                  <BoatCard key={boat.id} boat={boat} viewMode={viewMode} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Ruler, Calendar, Mail, Phone, Building, Anchor, Waves, Gauge, Users, Bed, Wrench, Palette, FileText, Ship, Zap } from "lucide-react";
import { getBoatById } from "@/lib/api-client";
import type { Boat } from "@/lib/types";

export default function BoatDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [boat, setBoat] = useState<Boat | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    loadBoat();
  }, [params.id]);

  async function loadBoat() {
    try {
      const data = await getBoatById(params.id as string);
      setBoat(data);
    } catch (error) {
      console.error("Failed to load boat:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center">Loading...</p>
        </div>
      </div>
    );
  }

  if (!boat) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center">Boat not found</p>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.push("/listings")} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Listings
          </Button>
          <div className="text-sm text-slate-600">
            <span className="hover:text-slate-900 cursor-pointer" onClick={() => router.push("/listings")}>
              Listings
            </span>
            {" / "}
            <span className="text-slate-900">{boat.name}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">{boat.name}</h1>
                  <p className="text-lg text-slate-600">
                    {boat.year} {boat.make} {boat.model}
                  </p>
                </div>
                {boat.featured && (
                  <Badge className="bg-yellow-500 text-yellow-950 border-0">
                    Featured
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-2 text-slate-600">
                  <Ruler className="h-5 w-5" />
                  <span>{boat.length_ft} feet</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="h-5 w-5" />
                  <span>{boat.location}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="h-5 w-5" />
                  <span>{boat.year}</span>
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-slate-200 relative overflow-hidden">
                  {boat.images[selectedImage] ? (
                    <img
                      src={boat.images[selectedImage]}
                      alt={`${boat.name} - Image ${selectedImage + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      No image available
                    </div>
                  )}
                </div>
                {boat.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 p-4">
                    {boat.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-video bg-slate-200 rounded overflow-hidden border-2 transition-all ${
                          selectedImage === index
                            ? "border-slate-900"
                            : "border-transparent hover:border-slate-300"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 leading-relaxed">{boat.description}</p>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>Vessel Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Vessel Details */}
                  <div className="flex items-start gap-3 pb-4 border-b">
                    <Ruler className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Length Overall</p>
                      <p className="font-semibold">{boat.length_ft} ft / {(boat.length_ft * 0.3048).toFixed(2)} m</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pb-4 border-b">
                    <Calendar className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Year Built</p>
                      <p className="font-semibold">{boat.year}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pb-4 border-b">
                    <Building className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Builder</p>
                      <p className="font-semibold">{boat.make}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pb-4 border-b">
                    <MapPin className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Current Location</p>
                      <p className="font-semibold">{boat.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pb-4 border-b">
                    <span className="text-slate-500 mt-0.5 flex-shrink-0">⚓</span>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Hull Material</p>
                      <p className="font-semibold">GRP (Fiberglass)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pb-4 border-b">
                    <span className="text-slate-500 mt-0.5 flex-shrink-0">⛵</span>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Vessel Type</p>
                      <p className="font-semibold capitalize">{boat.type}</p>
                    </div>
                  </div>
                </div>

                {/* Additional Specifications */}
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold mb-4">Additional Details</h4>
                  <div className="grid sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-slate-600">Beam</p>
                      <p className="font-medium">32'2" / 9.8 m</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Draft</p>
                      <p className="font-medium">5'5" / 1.65 m</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Fuel Capacity</p>
                      <p className="font-medium">315 gal / 1,192 L</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Water Capacity</p>
                      <p className="font-medium">275 gal / 1,041 L</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Cabins</p>
                      <p className="font-medium">6 cabins</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Heads</p>
                      <p className="font-medium">5 heads</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Sleeps</p>
                      <p className="font-medium">10 guests</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Crew Cabins</p>
                      <p className="font-medium">2 cabins</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Hull Shape</p>
                      <p className="font-medium">Catamaran</p>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold mb-4">Key Features</h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Deck Jacuzzi</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Full Air Conditioning</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Generator</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Watermaker</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Charter Ready - 8 PAX</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance & Technical */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-slate-700" />
                  <CardTitle>Performance & Technical</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <Waves className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Cruise Speed</p>
                      <p className="font-semibold">10 knots</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Anchor className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Dry Weight</p>
                      <p className="font-semibold">78,400 lbs</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-slate-500 mt-0.5 flex-shrink-0">⛽</span>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Fuel Type</p>
                      <p className="font-semibold">Diesel</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-slate-500 mt-0.5 flex-shrink-0">📊</span>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Hull Shape</p>
                      <p className="font-semibold">Catamaran</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold mb-4">Propulsion Systems</h4>
                  <div className="grid sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-slate-600 mb-1">Bow Thrusters</p>
                      <p className="font-medium">No</p>
                    </div>
                    <div>
                      <p className="text-slate-600 mb-1">Stern Thrusters</p>
                      <p className="font-medium">No</p>
                    </div>
                    <div>
                      <p className="text-slate-600 mb-1">SeaKeeper Gyro</p>
                      <p className="font-medium">No</p>
                    </div>
                    <div>
                      <p className="text-slate-600 mb-1">Stabilizers</p>
                      <p className="font-medium">None</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Accommodations Detail */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-slate-700" />
                  <CardTitle>Accommodations Detail</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Guest Capacity</p>
                      <p className="font-semibold">10 guests in 6 cabins</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Crew Capacity</p>
                      <p className="font-semibold">3 crew in 2 cabins</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-slate-500 mt-0.5 flex-shrink-0">🍽️</span>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Seating Capacity</p>
                      <p className="font-semibold">12 guests</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-slate-500 mt-0.5 flex-shrink-0">🚿</span>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Total Heads</p>
                      <p className="font-semibold">5 heads + 2 crew heads</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-4">Berth Configuration</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-sm text-slate-600 mb-1">King Berths</p>
                      <p className="text-2xl font-bold text-slate-900">1</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-sm text-slate-600 mb-1">Queen Berths</p>
                      <p className="text-2xl font-bold text-slate-900">3</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-blue-600">⭐</span>
                      <p className="font-semibold text-blue-900">Master Suite</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-blue-700">Full Beam Master:</p>
                        <p className="font-medium text-blue-900">No</p>
                      </div>
                      <div>
                        <p className="text-blue-700">On-Deck Master:</p>
                        <p className="font-medium text-blue-900">No</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span>👨‍✈️</span>
                      <p className="font-semibold">Crew Quarters</p>
                    </div>
                    <p className="text-sm text-slate-600">Captain's Quarters: No</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tenders & Water Toys */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Ship className="h-5 w-5 text-slate-700" />
                  <CardTitle>Tenders & Water Toys</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl">🚤</span>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">Tender Included</h4>
                        <p className="text-slate-700">Highfield 4M + 60 HP Honda</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-lg border border-green-200">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl">🏄</span>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Water Toys Included</h4>
                        <div className="grid sm:grid-cols-2 gap-2">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                            <span>Seabob</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                            <span>Kayaks</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                            <span>Paddleboard</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                            <span>Snorkeling Gear</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Equipment & Systems */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-slate-700" />
                  <CardTitle>Equipment & Systems</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-sm text-slate-700">Climate Control</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Air Conditioning:</span>
                        <span className="font-medium text-green-600">Yes - Full</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-sm text-slate-700">Accessibility</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Elevator:</span>
                        <span className="font-medium">No</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Wheelchair Access:</span>
                        <span className="font-medium">No</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-sm text-slate-700">Amenities</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Gym Equipment:</span>
                        <span className="font-medium">No</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Helideck:</span>
                        <span className="font-medium">No</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Tower:</span>
                        <span className="font-medium">No</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Design & Construction */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-slate-700" />
                  <CardTitle>Design & Construction</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <Building className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Builder</p>
                      <p className="font-semibold">Fountaine Pajot</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-slate-500 mt-0.5 flex-shrink-0">🎨</span>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Model</p>
                      <p className="font-semibold">Alegria 67</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-slate-500 mt-0.5 flex-shrink-0">⚙️</span>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Hull Material</p>
                      <p className="font-semibold">GRP (Fiberglass)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-slate-500 mt-0.5 flex-shrink-0">🛡️</span>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Hull Warranty</p>
                      <p className="font-semibold">None</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold mb-3 text-sm">Design Credits</h4>
                  <p className="text-sm text-slate-600 italic">Designer information not specified</p>
                </div>
              </CardContent>
            </Card>

            {/* Documentation & Registration */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-slate-700" />
                  <CardTitle>Documentation & Registration</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-slate-500 mt-0.5 flex-shrink-0">🔢</span>
                    <div className="flex-1">
                      <p className="text-sm text-slate-600 mb-1">Hull Identification Number (HIN)</p>
                      <code className="bg-slate-100 px-3 py-1.5 rounded text-sm font-mono">
                        FRFPA60026L122
                      </code>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Flag</p>
                      <p className="font-semibold">🇲🇹 Malta</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Condition</p>
                      <p className="font-semibold">Used - Excellent</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Year Built</p>
                      <p className="font-semibold">{boat.year}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">CE Certified</p>
                      <p className="font-semibold">Not Specified</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-semibold mb-3 text-sm">Listing Information</h4>
                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-slate-600">Status:</p>
                        <p className="font-medium">On Market</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Listing Type:</p>
                        <p className="font-medium">Central/Exclusive</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Share Type:</p>
                        <p className="font-medium">Available for Co-Brokerage</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Current Location:</p>
                        <p className="font-medium">Cruising - {boat.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t bg-yellow-50 -mx-6 -mb-6 p-6 rounded-b-lg">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">💰</span>
                      <div>
                        <h4 className="font-semibold text-yellow-900 mb-1">Tax Benefits Available</h4>
                        <p className="text-sm text-yellow-800">
                          Eligible for 100% Bonus Depreciation under current U.S. tax law for qualified buyers.
                          Consult with your CPA or tax attorney.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* API Data Reference */}
            <Card className="bg-slate-100 border-slate-200">
              <CardHeader>
                <CardTitle className="text-base">API Data Reference</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="space-y-2">
                  <div>
                    <span className="text-slate-600">Listing ID:</span>{" "}
                    <code className="bg-white px-2 py-1 rounded text-xs">{boat.id}</code>
                  </div>
                  <div>
                    <span className="text-slate-600">Last Updated:</span>{" "}
                    <span className="font-medium">{formatDate(boat.updated_at)}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Data Source:</span>{" "}
                    <span className="font-medium">Broker Listings API</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Price */}
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <p className="text-xs text-green-600 font-semibold mb-1">100% BONUS DEPRECIATION</p>
                    <p className="text-sm text-slate-600 mb-2">Asking Price (USD)</p>
                    <p className="text-3xl font-bold text-slate-900">
                      {formatPrice(boat.price_usd)}
                    </p>
                  </div>

                  {/* Multi-Currency Pricing */}
                  <div className="border-t pt-4 mb-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Euro:</span>
                      <span className="font-semibold">€2,722,579</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">British Pound:</span>
                      <span className="font-semibold">£2,392,720</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Canadian Dollar:</span>
                      <span className="font-semibold">CA$4,406,542</span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    Request Information
                  </Button>
                  <p className="text-xs text-center text-slate-500 mt-3">
                    Charter Ready • 8 PAX Certified
                  </p>
                </CardContent>
              </Card>

              {/* Vessel Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Vessel Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-slate-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Current Location</p>
                      <p className="font-medium">Cruising - {boat.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-slate-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Last Updated</p>
                      <p className="font-medium">{formatDate(boat.updated_at)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-slate-600 mt-0.5">🏴</span>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Flag Registry</p>
                      <p className="font-medium">🇲🇹 Malta</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-slate-600 mt-0.5">📋</span>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Condition</p>
                      <p className="font-medium">Used - Excellent</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-slate-600 mt-0.5">⚓</span>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Vessel Type</p>
                      <p className="font-medium capitalize">Sail - {boat.type}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t space-y-2">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-green-600">✓</span>
                        <p className="text-sm font-semibold text-green-900">Available for Viewing</p>
                      </div>
                      <p className="text-xs text-green-700">Currently cruising in Grenada</p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-blue-600">★</span>
                        <p className="text-sm font-semibold text-blue-900">Special Features</p>
                      </div>
                      <p className="text-xs text-blue-700">Tax benefits • Charter ready • Turnkey</p>
                    </div>
                  </div>

                  <Button className="w-full mt-4">
                    Request Information
                  </Button>
                  <Button variant="outline" className="w-full">
                    Schedule Viewing
                  </Button>
                  <Button variant="outline" className="w-full">
                    Download Brochure
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

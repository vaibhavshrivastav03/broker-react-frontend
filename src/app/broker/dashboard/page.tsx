"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import {
  List, PlusCircle, Shield, FileText, Upload,
  Ship, DollarSign, Gauge, Bed, Wrench, Palette, FileCheck, Cog
} from "lucide-react";
import { toast } from "sonner";

/* ================= API ================= */

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* ================= PAGE ================= */

export default function BrokerDashboardPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("my-listings");
  const [broker, setBroker] = useState<any>(null);
  const [boats, setBoats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);

  /* ================= FORM STATE (UNCHANGED FIELDS) ================= */
const EMPTY_FORM = {
  vessel_name: "",
  type: "catamaran",
  manufacturer: "",
  model: "",
  year: "",

  loa_feet: "",
  beam_feet: "",
  draft_min_feet: "",
  loa_meters: "",
  beam_meters: "",
  draft_min_meters: "",

  location_city: "",
  location_country: "",
  flag: "",

  full_description: "",

  price_usd: "",
  price_eur: "",
  price_gbp: "",
  price_cad: "",
  price_headline: "",

  fuel_type: "",
  cruise_speed_kn: "",
  max_speed_kn: "",
  displacement: "",

  cabins: "",
  heads: "",
  sleeps: "",
  seating_capacity: "",
  king_berths: "",
  queen_berths: "",
  crew_cabins: "",
  crew_sleeps: "",

  hull_material: "",
  condition: "used",
  hin_imo: "",

  fuel_tank_capacity_gallons: "",
  water_tank_capacity_gallons: "",

  gallery_urls: [],

  /* ================= CORE ================= */
  title: "",
  content: "",
  summary: "",
  full_details: "",
  status: "pending",
  
  catamarans_type: "",

  /* ================= DIMENSIONS ================= */
  display_length_feet: "",
  display_length_meters: "",
  draft_max_feet: "",
  draft_max_meters: "",
  displacement2: "",

  /* ================= BUILD / STRUCTURE ================= */
  tower: false,
  builder: false,
  bridge_clearance: false,
  holding_tank: "",
  dry_weight: "",
  dry2_weight: "",

  /* ================= ENGINE (PRIMARY) ================= */
  engine_qty: "",
  engine_make: "",
  engine_model: "",
  engine_year: "",
  drive_type: "",
  engine_type: "",
  engine_hours: "",
  engine_hours_date: "",
  engine_location: "",
  power_hp: "",
  power_kw: "",

  /* ================= ENGINE (SECONDARY) ================= */
  engine2_qty: "",
  engine2_make: "",
  engine2_model: "",
  engine2_year: "",
  drive2_type: "",
  engine2_type: "",
  fuel2_type: "",
  engine2_hours: "",
  engine2_hours_date: "",
  engine2_location: "",
  power2_hp: "",
  power2_kw: "",
  cruise2_speed_kn: "",
  max2_speed_kn: "",

  /* ================= TANKS ================= */
  fuel2_tank_capacity_gallons: "",
  water2_tank_capacity_gallons: "",

  /* ================= GENERATOR ================= */
  generator: "",
  generator_make: "",
  generator_kw: "",
  generator_hours: "",
  generator_date_hours_recorded: "",

  /* ================= EXTRAS ================= */
  watermaker: "",
  features: "",
  notable_upgrades: "",
  toys_included: "",
  jacuzzi: false,
  tender: "",

  is_featured:false,

  /* ================= MEDIA ================= */
  pdf_brochure: "",
};

const [formData, setFormData] = useState(EMPTY_FORM);
const [featuredImage, setFeaturedImage] = useState<File | null>(null);
const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

const [existingFeaturedImage, setExistingFeaturedImage] = useState<string | null>(null);
const [existingGallery, setExistingGallery] = useState<string[]>([]);

const [pdfBrochure, setPdfBrochure] = useState<File | null>(null);
const [existingPdfBrochure, setExistingPdfBrochure] = useState<string | null>(null);

  /* ================= LOAD DASHBOARD ================= */

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);

      const me = await api.get("/broker/me");
      if (me.data.role_id !== 3) {
        router.push("/broker/login");
        return;
      }

      setBroker(me.data);

      const listings = await api.get("/broker/listings");
      setBoats(listings.data || []);
    } catch (err) {
      localStorage.removeItem("token");
      router.push("/broker/login");
    } finally {
      setLoading(false);
    }
  }




/* ================= CREATE / UPDATE ================= */

async function handleSubmitListing() {
  if (!formData.vessel_name) {
    toast.error("Vessel name is required");
    return;
  }

  const fd = new FormData();

  /* ================= BASIC ================= */
  fd.append("vessel_name", formData.vessel_name);
  fd.append("title", formData.vessel_name);
  fd.append("type", formData.type);
  fd.append("manufacturer", formData.manufacturer);
  fd.append("model", formData.model);
  fd.append("year", String(formData.year || ""));
  fd.append("loa_feet", String(formData.loa_feet || ""));
  fd.append("beam_feet", String(formData.beam_feet || ""));
  fd.append("draft_min_feet", String(formData.draft_min_feet || ""));
  fd.append("location_city", formData.location_city || "");
  fd.append("location_country", formData.location_country || "");
  fd.append("full_description", formData.full_description || "");
  fd.append("content", formData.full_description || "");
  fd.append("summary", formData.summary || "");

  /* ================= PRICING ================= */
  fd.append("price_usd", String(formData.price_usd || ""));
  fd.append("price_eur", String(formData.price_eur || ""));
  fd.append("price_gbp", String(formData.price_gbp || ""));
  fd.append("price_cad", String(formData.price_cad || ""));
  fd.append("featured", String(formData.featured || false));
  fd.append("price_headline", String(formData.price_headline || ""));

  

  /* ================= PERFORMANCE ================= */
  fd.append("fuel_type", formData.fuel_type || "");
  fd.append("cruise_speed_kn", String(formData.cruise_speed_kn || ""));
  fd.append("max_speed_kn", String(formData.max_speed_kn || ""));
  fd.append("displacement", String(formData.displacement || ""));
  fd.append("fuel_tank_capacity_gallons", String(formData.fuel_tank_capacity_gallons || ""));
  fd.append("water_tank_capacity_gallons", String(formData.water_tank_capacity_gallons || ""));

  /* ================= ACCOMMODATION ================= */
  fd.append("cabins", String(formData.cabins || ""));
  fd.append("heads", String(formData.heads || ""));
  fd.append("sleeps", String(formData.sleeps || ""));
  fd.append("crew_cabins", String(formData.crew_cabins || ""));
  fd.append("crew_sleeps", String(formData.crew_sleeps || ""));
  fd.append("seating_capacity", String(formData.seating_capacity || ""));
  fd.append("king_berths", String(formData.king_berths || ""));
  fd.append("queen_berths", String(formData.queen_berths || ""));

  /* ================= DESIGN / DOCS ================= */
  fd.append("hull_material", formData.hull_material || "");
  fd.append("condition", formData.condition || "");
  fd.append("hin_imo", formData.hin_imo || "");
  fd.append("flag", formData.flag || "");

  /* ================= IDENTIFIERS ================= */
  fd.append("catamarans_type", formData.catamarans_type || "");

  /* ================= DIMENSIONS ================= */
  fd.append("display_length_feet", formData.display_length_feet || "");
  fd.append("display_length_meters", formData.display_length_meters || "");
  fd.append("draft_max_feet", formData.draft_max_feet || "");
  fd.append("draft_min_meters", formData.draft_min_meters || "");
  fd.append("draft_max_meters", formData.draft_max_meters || "");
  fd.append("displacement2", formData.displacement2 || "");

  /* ================= BUILD ================= */
  fd.append("tower", String(formData.tower || false));
  fd.append("builder", formData.builder || false);
  fd.append("bridge_clearance", formData.bridge_clearance || false);
  fd.append("holding_tank", formData.holding_tank || "");
  fd.append("dry_weight", formData.dry_weight || "");
  fd.append("dry2_weight", formData.dry2_weight || "");

  /* ================= ENGINE PRIMARY ================= */
  fd.append("engine_qty", formData.engine_qty || "");
  fd.append("engine_make", formData.engine_make || "");
  fd.append("engine_model", formData.engine_model || "");
  fd.append("engine_year", formData.engine_year || "");
  fd.append("drive_type", formData.drive_type || "");
  fd.append("engine_type", formData.engine_type || "");
  fd.append("engine_hours", formData.engine_hours || "");
  fd.append("engine_hours_date", formData.engine_hours_date || "");
  fd.append("engine_location", formData.engine_location || "");
  fd.append("power_hp", formData.power_hp || "");
  fd.append("power_kw", formData.power_kw || "");

  /* ================= ENGINE SECONDARY ================= */
  fd.append("engine2_qty", formData.engine2_qty || "");
  fd.append("engine2_make", formData.engine2_make || "");
  fd.append("engine2_model", formData.engine2_model || "");
  fd.append("engine2_year", formData.engine2_year || "");
  fd.append("drive2_type", formData.drive2_type || "");
  fd.append("engine2_type", formData.engine2_type || "");
  fd.append("fuel2_type", formData.fuel2_type || "");
  fd.append("engine2_hours", formData.engine2_hours || "");
  fd.append("engine2_hours_date", formData.engine2_hours_date || "");
  fd.append("engine2_location", formData.engine2_location || "");
  fd.append("power2_hp", formData.power2_hp || "");
  fd.append("power2_kw", formData.power2_kw || "");
  fd.append("cruise2_speed_kn", formData.cruise2_speed_kn || "");
  fd.append("max2_speed_kn", formData.max2_speed_kn || "");

  /* ================= SECONDARY TANKS ================= */
  fd.append("fuel2_tank_capacity_gallons", formData.fuel2_tank_capacity_gallons || "");
  fd.append("water2_tank_capacity_gallons", formData.water2_tank_capacity_gallons || "");

  /* ================= GENERATOR ================= */
  fd.append("generator", formData.generator || "");
  fd.append("generator_make", formData.generator_make || "");
  fd.append("generator_kw", formData.generator_kw || "");
  fd.append("generator_hours", formData.generator_hours || "");
  fd.append("generator_date_hours_recorded", formData.generator_date_hours_recorded || "");

  /* ================= EXTRAS ================= */
  fd.append("watermaker", formData.watermaker || "");
  fd.append("features", formData.features || "");
  fd.append("notable_upgrades", formData.notable_upgrades || "");
  fd.append("toys_included", formData.toys_included || "");
  fd.append("jacuzzi", String(formData.jacuzzi || false));
  fd.append("tender", formData.tender || "");

  fd.append("is_featured", String(formData.is_featured || false));
  /* ================= MEDIA ================= */
  if(pdfBrochure){
    fd.append("pdf_brochure", pdfBrochure);
  }

  /* ================= FEATURED IMAGE (SINGLE) ================= */
  if (featuredImage) {
    fd.append("featured_image", featuredImage);
  }

  /* ================= GALLERY IMAGES (MULTIPLE) ================= */
  galleryFiles.forEach((file) => {
    fd.append("gallery_images", file);
  });

  /* ================= BROKER META ================= */
  fd.append("brokerage_id", String(broker.user_id));
  fd.append("broker_name", broker.name);
  fd.append("broker_email", broker.email);
  fd.append("user_id", String(broker.user_id));
  fd.append("status", "pending");

  try {
    if (editingId) {
      await api.put(`/broker/listings/${editingId}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Listing updated");
    } else {
      await api.post("/broker/listings", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Listing submitted");
    }
    
   
    setExistingFeaturedImage(null);
    setExistingGallery([]);
    setPdfBrochure(null);
    setExistingPdfBrochure(null);
    setEditingId(null);
    setFormData(EMPTY_FORM);
    setFeaturedImage(null);
    setGalleryFiles([]);
    setActiveTab("my-listings");
    loadDashboard();
  } catch (err) {
    console.error(err);
    toast.error("Failed to save listing");
  }
}



/* ================= EDIT ================= */

async function editListing(id: number) {
  try {
    const { data } = await api.get(`/broker/listings/${id}`);

    setEditingId(id);

    setFormData({
      ...EMPTY_FORM,

      /* ===== BASIC ===== */
      vessel_name: data.vessel_name || "",
      type: data.type || "catamaran",
      manufacturer: data.manufacturer || "",
      model: data.model || "",
      year: data.year || "",

      loa_feet: data.loa_feet || "",
      beam_feet: data.beam_feet || "",
      draft_min_feet: data.draft_min_feet || "",

      location_city: data.location_city || "",
      location_country: data.location_country || "",
      full_description: data.full_description || "",

      /* ===== PRICING ===== */
      price_usd: data.price_usd || "",
      price_eur: data.price_eur || "",
      price_gbp: data.price_gbp || "",
      price_cad: data.price_cad || "",
      price_headline: data.price_headline || "",

      /* ===== PERFORMANCE ===== */
      cruise_speed_kn: data.cruise_speed_kn || "",
      max_speed_kn: data.max_speed_kn || "",
      displacement: data.displacement || "",
      fuel_type: data.fuel_type || "",

      fuel_tank_capacity_gallons: data.fuel_tank_capacity_gallons || "",
      water_tank_capacity_gallons: data.water_tank_capacity_gallons || "",

      /* ===== ACCOMMODATION ===== */
      cabins: data.cabins || "",
      heads: data.heads || "",
      sleeps: data.sleeps || "",
      crew_cabins: data.crew_cabins || "",
      crew_sleeps: data.crew_sleeps || "",
      seating_capacity: data.seating_capacity || "",
      king_berths: data.king_berths || "",
      queen_berths: data.queen_berths || "",

      /* ===== DESIGN ===== */
      hull_material: data.hull_material || "",
      condition: data.condition || "used",
      hin_imo: data.hin_imo || "",
      flag: data.flag || "",

      content: data.full_description || "",
      summary: data.summary || "",
  
      catamarans_type: data.catamarans_type || "",

      display_length_feet: data.display_length_feet || "",
      display_length_meters: data.display_length_meters || "",
      draft_max_feet: data.draft_max_feet || "",
      draft_min_meters: data.draft_min_meters || "",
      draft_max_meters: data.draft_max_meters || "",
      displacement2: data.displacement2 || "",

      tower: data.tower || false,
      builder: data.builder || false,
      bridge_clearance: data.bridge_clearance || false,
      holding_tank: data.holding_tank || "",
      dry_weight: data.dry_weight || "",
      dry2_weight: data.dry2_weight || "",

      engine_qty: data.engine_qty || "",
      engine_make: data.engine_make || "",
      engine_model: data.engine_model || "",
      engine_year: data.engine_year || "",
      drive_type: data.drive_type || "",
      engine_type: data.engine_type || "",
      engine_hours: data.engine_hours || "",
      engine_hours_date: data.engine_hours_date || "",
      engine_location: data.engine_location || "",
      power_hp: data.power_hp || "",
      power_kw: data.power_kw || "",

      engine2_qty: data.engine2_qty || "",
      engine2_make: data.engine2_make || "",
      engine2_model: data.engine2_model || "",
      engine2_year: data.engine2_year || "",
      drive2_type: data.drive2_type || "",
      engine2_type: data.engine2_type || "",
      fuel2_type: data.fuel2_type || "",
      engine2_hours: data.engine2_hours || "",
      engine2_hours_date: data.engine2_hours_date || "",
      engine2_location: data.engine2_location || "",
      power2_hp: data.power2_hp || "",
      power2_kw: data.power2_kw || "",
      cruise2_speed_kn: data.cruise2_speed_kn || "",
      max2_speed_kn: data.max2_speed_kn || "",

      fuel2_tank_capacity_gallons: data.fuel2_tank_capacity_gallons || "",
      water2_tank_capacity_gallons: data.water2_tank_capacity_gallons || "",

      generator: data.generator || "",
      generator_make: data.generator_make || "",
      generator_kw: data.generator_kw || "",
      generator_hours: data.generator_hours || "",
      generator_date_hours_recorded: data.generator_date_hours_recorded || "",

      watermaker: data.watermaker || "",
      features: data.features || "",
      notable_upgrades: data.notable_upgrades || "",
      toys_included: data.toys_included || "",
      jacuzzi: data.jacuzzi || false,
      tender: data.tender || "",
      
      is_featured: data.is_featured || false,

    });

    // 🔹 existing PDF from DB
    setExistingPdfBrochure(data.pdf_brochure || null);

    // 🔹 reset new upload
    setPdfBrochure(null);

    
    /* 🔹 existing images */
    setExistingFeaturedImage(data.featured_image || null);
    setExistingGallery(
      Array.isArray(data.gallery_urls)
        ? data.gallery_urls
        : JSON.parse(data.gallery_urls || "[]")
    );

    /* 🔹 reset new uploads */
    setFeaturedImage(null);
    setGalleryFiles([]);

    setActiveTab("submit");
  } catch (err) {
    console.error(err);
    toast.error("Failed to load listing");
  }
}



  const [copied, setCopied] = useState(false);
const [newIp, setNewIp] = useState("");

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
  setCopied(true);
  setTimeout(() => setCopied(false), 1500);
}

async function handleRegenerateToken() {
  try {
    const res = await api.post("/broker/regenerate-token");
    setBroker({ ...broker, api_token: res.data.token });
    toast.success("API token regenerated");
  } catch {
    toast.error("Failed to regenerate token");
  }
}

async function handleAddIp() {
  if (!newIp) return;
  try {
    const res = await api.post("/broker/ip-whitelist", { ip: newIp });
    setBroker({ ...broker, whitelisted_ips: res.data.whitelisted_ips });
    setNewIp("");
    toast.success("IP added");
  } catch {
    toast.error("Failed to add IP");
  }
}

async function handleRemoveIp(ip: string) {
  try {
    const res = await api.delete(`/broker/ip-whitelist/${ip}`);
    setBroker({ ...broker, whitelisted_ips: res.data.whitelisted_ips });
    toast.success("IP removed");
  } catch {
    toast.error("Failed to remove IP");
  }
}

async function deleteListing(id: number) {
  if (!confirm("Delete this listing?")) return;

  try {
    await api.delete(`/broker/listing-delete/${id}`);
    toast.success("Listing deleted");
    loadDashboard();
  } catch {
    toast.error("Failed to delete listing");
  }
}

  /* ================= RENDER ================= */

  if (loading || !broker) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <DashboardLayout
      title={`Broker Portal - ${broker.name}`}
      userRole="broker"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      menuItems={[
        { label: "My Listings", value: "my-listings", icon: <List className="h-4 w-4" /> },
        { label: "Submit Listing", value: "submit", icon: <PlusCircle className="h-4 w-4" /> },
        { label: "Access & Security", value: "security", icon: <Shield className="h-4 w-4" /> },
        { label: "API Docs", value: "api-docs", icon: <FileText className="h-4 w-4" /> },
      ]}
    >

      {/* ================= MY LISTINGS ================= */}
      {activeTab === "my-listings" && (
        <Card>
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>My Listings ({boats.length})</CardTitle>
            <Button
              onClick={() => {
                setEditingId(null);
                setFormData(EMPTY_FORM);
                setActiveTab("submit");
              }}
            >
              New Listing
            </Button>


          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {boats.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell>{b.vessel_name}</TableCell>
                    <TableCell>{b.type}</TableCell>
                    <TableCell>{b.year}</TableCell>
                    <TableCell>${Number(b.price_usd).toLocaleString()}</TableCell>
                    <TableCell>
                      <Button size="sm" onClick={() => editListing(b.id)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteListing(b.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* ================= SUBMIT LISTING ================= */}
      {activeTab === "submit" && (
        <div className="space-y-6">

          {/* ================= HEADER ================= */}
          <div>
            <h2 className="text-2xl font-bold">
              {editingId ? "Update Listing" : "Submit Listing"}
            </h2>
            <p className="text-slate-600">
              {editingId ? "Update listing details" : "Create a new vessel listing"}
            </p>
          </div>

          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid grid-cols-7">
              <TabsTrigger value="basic"><Ship className="h-4 w-4 mr-1" />Basic</TabsTrigger>
              <TabsTrigger value="pricing"><DollarSign className="h-4 w-4 mr-1" />Pricing</TabsTrigger>
              <TabsTrigger value="performance"><Gauge className="h-4 w-4 mr-1" />Performance</TabsTrigger>
              <TabsTrigger value="accommodations"><Bed className="h-4 w-4 mr-1" />Accommodation</TabsTrigger>
              <TabsTrigger value="engines"><Cog className="h-4 w-4 mr-1" />Engines</TabsTrigger>
              <TabsTrigger value="design"><Palette className="h-4 w-4 mr-1" />Design</TabsTrigger>
              <TabsTrigger value="media"><Upload className="h-4 w-4 mr-1" />Media</TabsTrigger>

            </TabsList>

            {/* ================= BASIC ================= */}
            <TabsContent value="basic">
              <Card>
                <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">

                  <Input placeholder="Vessel Name" value={formData.vessel_name}
                    onChange={e => setFormData({ ...formData, vessel_name: e.target.value })} />

                  <Select value={formData.type} onValueChange={v => setFormData({ ...formData, type: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="catamarans">Catamaran</SelectItem>
                      <SelectItem value="monohull">Monohull</SelectItem>
                      <SelectItem value="power">Power</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input placeholder="Manufacturer" value={formData.manufacturer}
                    onChange={e => setFormData({ ...formData, manufacturer: e.target.value })} />

                  <Input placeholder="Catamarans Type" value={formData.catamarans_type}
                    onChange={e => setFormData({ ...formData, catamarans_type: e.target.value })} />

                  <Input placeholder="Model" value={formData.model}
                    onChange={e => setFormData({ ...formData, model: e.target.value })} />

                  <Input type="number" placeholder="Year" value={formData.year}
                    onChange={e => setFormData({ ...formData, year: e.target.value })} />

                  <Input type="number" placeholder="Length (ft)" value={formData.loa_feet}
                    onChange={e => setFormData({ ...formData, loa_feet: e.target.value })} />

                  <Input type="number" placeholder="Beam (ft)" value={formData.beam_feet}
                    onChange={e => setFormData({ ...formData, beam_feet: e.target.value })} />

                  <Input type="number" placeholder="Display Length (ft)" value={formData.display_length_feet}
                    onChange={e => setFormData({ ...formData, display_length_feet: e.target.value })} />

                  <Input type="number" placeholder="Display Length (m)" value={formData.display_length_meters}
                    onChange={e => setFormData({ ...formData, display_length_meters: e.target.value })} />

                  <Input type="number" placeholder="Draft Min (ft)" value={formData.draft_min_feet}
                    onChange={e => setFormData({ ...formData, draft_min_feet: e.target.value })} />

                  <Input type="number" placeholder="Draft Max (ft)" value={formData.draft_max_feet}
                  onChange={e => setFormData({ ...formData, draft_max_feet: e.target.value })} />

                  <Input type="number" placeholder="Draft Min (m)" value={formData.draft_min_meters}
                  onChange={e => setFormData({ ...formData, draft_min_meters: e.target.value })} />

                  <Input type="number" placeholder="Draft Max (m)" value={formData.draft_max_meters}
                  onChange={e => setFormData({ ...formData, draft_max_meters: e.target.value })} />

                  <Input placeholder="City" value={formData.location_city}
                    onChange={e => setFormData({ ...formData, location_city: e.target.value })} />

                  <Input placeholder="Country" value={formData.location_country}
                    onChange={e => setFormData({ ...formData, location_country: e.target.value })} />

                  <Textarea
                    className="sm:col-span-2"
                    rows={2}
                    placeholder="Summary"
                    value={formData.summary}
                    onChange={e => setFormData({ ...formData, summary: e.target.value })}
                  />

                  <Textarea
                    className="sm:col-span-2"
                    rows={5}
                    placeholder="Full description"
                    value={formData.full_description}
                    onChange={e => setFormData({ ...formData, full_description: e.target.value })}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* ================= PRICING ================= */}
            <TabsContent value="pricing">
              <Card>
                <CardHeader><CardTitle>Pricing</CardTitle></CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">

                  <Input type="number" placeholder="Price USD" value={formData.price_usd}
                    onChange={e => setFormData({ ...formData, price_usd: e.target.value })} />

                  <Input type="number" placeholder="Price EUR" value={formData.price_eur}
                    onChange={e => setFormData({ ...formData, price_eur: e.target.value })} />

                  <Input type="number" placeholder="Price GBP" value={formData.price_gbp}
                    onChange={e => setFormData({ ...formData, price_gbp: e.target.value })} />

                  <Input type="number" placeholder="Price CAD" value={formData.price_cad}
                    onChange={e => setFormData({ ...formData, price_cad: e.target.value })} />

                  <Input
                    className="sm:col-span-2"
                    placeholder="Price Headline (e.g. Priced to Sell)"
                    value={formData.price_headline}
                    onChange={e => setFormData({ ...formData, price_headline: e.target.value })}
                  />

                  <label className="flex items-center gap-2 sm:col-span-2">
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={e => setFormData({ ...formData, is_featured: e.target.checked })}
                    />
                    Featured Listing
                  </label>

                </CardContent>
              </Card>
            </TabsContent>

            {/* ================= PERFORMANCE ================= */}
            <TabsContent value="performance">
              
              <Card className="space-y-3 mt-5">
                <CardHeader><CardTitle>Performance</CardTitle></CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">

                  <Input type="number" placeholder="Cruise Speed (kn)" value={formData.cruise_speed_kn}
                    onChange={e => setFormData({ ...formData, cruise_speed_kn: e.target.value })} />

                  <Input type="number" placeholder="Max Speed (kn)" value={formData.max_speed_kn}
                    onChange={e => setFormData({ ...formData, max_speed_kn: e.target.value })} />

                  <Input type="number" placeholder="Cruise 2 Speed (kn)" value={formData.cruise2_speed_kn}
                    onChange={e => setFormData({ ...formData, cruise2_speed_kn: e.target.value })} />

                  <Input type="number" placeholder="Max 2 Speed (kn)" value={formData.max2_speed_kn}
                    onChange={e => setFormData({ ...formData, max2_speed_kn: e.target.value })} />           

                  <Input type="number" placeholder="Displacement" value={formData.displacement}
                    onChange={e => setFormData({ ...formData, displacement: e.target.value })} />

                  <Input type="number" placeholder="Displacement 2"
                    value={formData.displacement2}
                    onChange={e => setFormData({ ...formData, displacement2: e.target.value })} />

                  <Select value={formData.fuel_type}
                    onValueChange={v => setFormData({ ...formData, fuel_type: v })}>
                    <SelectTrigger><SelectValue placeholder="Fuel Type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="gas">Gasoline</SelectItem>
                      <SelectItem value="electric">Electric</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={formData.fuel2_type}
                    onValueChange={v => setFormData({ ...formData, fuel2_type: v })}>
                    <SelectTrigger><SelectValue placeholder="Fuel 2 Type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="gas">Gasoline</SelectItem>
                      <SelectItem value="electric">Electric</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>

                </CardContent>
              </Card>

              <Card className="space-y-3 mt-5">
                <CardHeader>
                  <CardTitle>Tanks & Capacities</CardTitle>
                </CardHeader>

                <CardContent className="grid sm:grid-cols-2 gap-4">

                  <Input placeholder="Fuel Tank Capacity (gal)"
                    value={formData.fuel_tank_capacity_gallons}
                    onChange={e => setFormData({ ...formData, fuel_tank_capacity_gallons: e.target.value })} />

                  <Input placeholder="Water Tank Capacity (gal)"
                    value={formData.water_tank_capacity_gallons}
                    onChange={e => setFormData({ ...formData, water_tank_capacity_gallons: e.target.value })} />

                  <Input placeholder="Fuel Tank 2 Capacity (gal)"
                    value={formData.fuel2_tank_capacity_gallons}
                    onChange={e => setFormData({ ...formData, fuel2_tank_capacity_gallons: e.target.value })} />

                  <Input placeholder="Water Tank 2 Capacity (gal)"
                    value={formData.water2_tank_capacity_gallons}
                    onChange={e => setFormData({ ...formData, water2_tank_capacity_gallons: e.target.value })} />

                  <Input placeholder="Holding Tank"
                    value={formData.holding_tank}
                    onChange={e => setFormData({ ...formData, holding_tank: e.target.value })} />

                  <Input placeholder="Dry Weight"
                    value={formData.dry_weight}
                    onChange={e => setFormData({ ...formData, dry_weight: e.target.value })} />

                  <Input placeholder="Dry 2 Weight"
                    value={formData.dry2_weight}
                    onChange={e => setFormData({ ...formData, dry2_weight: e.target.value })} />

                </CardContent>
              </Card>
            </TabsContent>

            {/* ================= ACCOMMODATION ================= */}
            <TabsContent value="accommodations">
              <Card className="space-y-3 mt-5">
                <CardHeader><CardTitle>Accommodation</CardTitle></CardHeader>
                <CardContent className="grid sm:grid-cols-3 gap-4">

                  <Input type="number" placeholder="Cabins" value={formData.cabins}
                    onChange={e => setFormData({ ...formData, cabins: e.target.value })} />

                  <Input type="number" placeholder="Heads" value={formData.heads}
                    onChange={e => setFormData({ ...formData, heads: e.target.value })} />

                  <Input type="number" placeholder="Sleeps" value={formData.sleeps}
                    onChange={e => setFormData({ ...formData, sleeps: e.target.value })} />

                  <Input type="number" placeholder="Crew Cabins" value={formData.crew_cabins}
                    onChange={e => setFormData({ ...formData, crew_cabins: e.target.value })} />

                  <Input type="number" placeholder="Crew Sleeps" value={formData.crew_sleeps}
                    onChange={e => setFormData({ ...formData, crew_sleeps: e.target.value })} />

                  <Input type="number" placeholder="Seating Capacity" value={formData.seating_capacity}
                    onChange={e => setFormData({ ...formData, seating_capacity: e.target.value })} />

                  <Input type="number" placeholder="King Berths" value={formData.king_berths}
                    onChange={e => setFormData({ ...formData, king_berths: e.target.value })} />

                  <Input type="number" placeholder="Queen Berths" value={formData.queen_berths}
                    onChange={e => setFormData({ ...formData, queen_berths: e.target.value })} />

                </CardContent>
              </Card>
              <Card className="space-y-3 mt-5">
                <CardHeader>
                  <CardTitle>Extras & Features</CardTitle>
                </CardHeader>

                <CardContent className="grid sm:grid-cols-2 gap-4">

                  <Input placeholder="Watermaker"
                    value={formData.watermaker}
                    onChange={e => setFormData({ ...formData, watermaker: e.target.value })} />

                  <Textarea placeholder="Features"
                    value={formData.features}
                    onChange={e => setFormData({ ...formData, features: e.target.value })} />

                  <Textarea placeholder="Notable Upgrades"
                    value={formData.notable_upgrades}
                    onChange={e => setFormData({ ...formData, notable_upgrades: e.target.value })} />

                  <Textarea placeholder="Toys Included"
                    value={formData.toys_included}
                    onChange={e => setFormData({ ...formData, toys_included: e.target.value })} />

                  <Input placeholder="Tender"
                    value={formData.tender}
                    onChange={e => setFormData({ ...formData, tender: e.target.value })} />

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.tower}
                      onChange={e => setFormData({ ...formData, tower: e.target.checked })}
                    />
                    Tower
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.builder}
                      onChange={e => setFormData({ ...formData, builder: e.target.checked })}
                    />
                    Builder
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.bridge_clearance}
                      onChange={e => setFormData({ ...formData, bridge_clearance: e.target.checked })}
                    />
                    Bridge Clearance
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.jacuzzi}
                      onChange={e => setFormData({ ...formData, jacuzzi: e.target.checked })}
                    />
                    Jacuzzi
                  </label>

                </CardContent>
              </Card>
            </TabsContent>

            {/* ================= ENGINES ================= */}
            <TabsContent value="engines">
              <Card className="space-y-3 mt-5">
                <CardHeader>
                  <CardTitle>Engines</CardTitle>
                  <CardDescription>Primary & secondary engine details</CardDescription>
                </CardHeader>

                <CardContent className="grid sm:grid-cols-2 gap-4">

                  {/* ===== PRIMARY ENGINE ===== */}
                  <Input placeholder="Engine Quantity"
                    value={formData.engine_qty}
                    onChange={e => setFormData({ ...formData, engine_qty: e.target.value })} />

                  <Input placeholder="Engine Make"
                    value={formData.engine_make}
                    onChange={e => setFormData({ ...formData, engine_make: e.target.value })} />

                  <Input placeholder="Engine Model"
                    value={formData.engine_model}
                    onChange={e => setFormData({ ...formData, engine_model: e.target.value })} />

                  <Input placeholder="Engine Year"
                    value={formData.engine_year}
                    onChange={e => setFormData({ ...formData, engine_year: e.target.value })} />

                  <Input placeholder="Drive Type"
                    value={formData.drive_type}
                    onChange={e => setFormData({ ...formData, drive_type: e.target.value })} />

                  <Input placeholder="Engine Type"
                    value={formData.engine_type}
                    onChange={e => setFormData({ ...formData, engine_type: e.target.value })} />

                  <Input placeholder="Engine Hours"
                    value={formData.engine_hours}
                    onChange={e => setFormData({ ...formData, engine_hours: e.target.value })} />

                  <Input placeholder="Engine Hours Date"
                    value={formData.engine_hours_date}
                    onChange={e => setFormData({ ...formData, engine_hours_date: e.target.value })} />

                  <Input placeholder="Engine Location"
                    value={formData.engine_location}
                    onChange={e => setFormData({ ...formData, engine_location: e.target.value })} />

                  <Input placeholder="Power (HP)"
                    value={formData.power_hp}
                    onChange={e => setFormData({ ...formData, power_hp: e.target.value })} />

                  <Input placeholder="Power (kW)"
                    value={formData.power_kw}
                    onChange={e => setFormData({ ...formData, power_kw: e.target.value })} />

                  {/* ===== SECOND ENGINE ===== */}
                  <Input placeholder="Second Engine Qty"
                    value={formData.engine2_qty}
                    onChange={e => setFormData({ ...formData, engine2_qty: e.target.value })} />

                  <Input placeholder="Second Engine Make"
                    value={formData.engine2_make}
                    onChange={e => setFormData({ ...formData, engine2_make: e.target.value })} />

                  <Input placeholder="Second Engine Model"
                    value={formData.engine2_model}
                    onChange={e => setFormData({ ...formData, engine2_model: e.target.value })} />

                  <Input placeholder="Second Engine Year"
                    value={formData.engine2_year}
                    onChange={e => setFormData({ ...formData, engine2_year: e.target.value })} />

                  <Input placeholder="Drive 2 Type"
                    value={formData.drive2_type}
                    onChange={e => setFormData({ ...formData, drive2_type: e.target.value })} />

                  <Input placeholder="Engine 2 Type"
                    value={formData.engine2_type}
                    onChange={e => setFormData({ ...formData, engine2_type: e.target.value })} />

                  <Input placeholder="Second Engine Hours"
                    value={formData.engine2_hours}
                    onChange={e => setFormData({ ...formData, engine2_hours: e.target.value })} />

                  <Input placeholder="Engine 2 Hours Date"
                    value={formData.engine2_hours_date}
                    onChange={e => setFormData({ ...formData, engine2_hours_date: e.target.value })} />

                  <Input placeholder="Engine 2 location"
                    value={formData.engine2_location}
                    onChange={e => setFormData({ ...formData, engine2_location: e.target.value })} />
                  
                  <Input placeholder="Engine 2 Power(HP)"
                    value={formData.power2_hp}
                    onChange={e => setFormData({ ...formData, power2_hp: e.target.value })} />

                  <Input placeholder="Engine 2 Power(KW)"
                    value={formData.power2_kw}
                    onChange={e => setFormData({ ...formData, power2_kw: e.target.value })} />

                </CardContent>
              </Card>

              <Card className="space-y-3 mt-5">
                <CardHeader>
                  <CardTitle>Generator</CardTitle>
                </CardHeader>

                <CardContent className="grid sm:grid-cols-2 gap-4">

                  <Input placeholder="Generator"
                    value={formData.generator}
                    onChange={e => setFormData({ ...formData, generator: e.target.value })} />

                  <Input placeholder="Generator Make"
                    value={formData.generator_make}
                    onChange={e => setFormData({ ...formData, generator_make: e.target.value })} />

                  <Input placeholder="Generator kW"
                    value={formData.generator_kw}
                    onChange={e => setFormData({ ...formData, generator_kw: e.target.value })} />

                  <Input placeholder="Generator Hours"
                    value={formData.generator_hours}
                    onChange={e => setFormData({ ...formData, generator_hours: e.target.value })} />

                  <Input placeholder="Hours Recorded Date"
                    value={formData.generator_date_hours_recorded}
                    onChange={e => setFormData({ ...formData, generator_date_hours_recorded: e.target.value })} />

                </CardContent>
              </Card>
            </TabsContent>

            {/* ================= DESIGN ================= */}
            <TabsContent value="design">
              
              <Card className="space-y-3 mt-5">
                <CardHeader><CardTitle>Design</CardTitle></CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">

                  <Select value={formData.hull_material}
                    onValueChange={v => setFormData({ ...formData, hull_material: v })}>
                    <SelectTrigger><SelectValue placeholder="Hull Material" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grp">GRP</SelectItem>
                      <SelectItem value="aluminum">Aluminum</SelectItem>
                      <SelectItem value="steel">Steel</SelectItem>
                      <SelectItem value="carbon">Carbon</SelectItem>
                      <SelectItem value="wood">Wood</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={formData.condition}
                    onValueChange={v => setFormData({ ...formData, condition: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="used">Used</SelectItem>
                    </SelectContent>
                  </Select>

                </CardContent>
              </Card>

              <Card className="space-y-3 mt-5">
                <CardHeader><CardTitle>Documentation</CardTitle></CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">

                  <Input placeholder="HIN / IMO" value={formData.hin_imo}
                    onChange={e => setFormData({ ...formData, hin_imo: e.target.value })} />

                  <Input placeholder="Flag" value={formData.flag}
                    onChange={e => setFormData({ ...formData, flag: e.target.value })} />

                </CardContent>
              </Card>

            </TabsContent>

          {/* ================= MEDIA ================= */}
            <TabsContent value="media">
              <Card className="space-y-3">
                <CardHeader>
                  <CardTitle>Featured Image</CardTitle>
                  <CardDescription>Upload one main image</CardDescription>
                </CardHeader>

                <CardContent className="grid sm:grid-cols-2 gap-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setFeaturedImage(e.target.files[0]);
                      }
                    }}
                  />

                  {/* ✅ Preview logic */}
                  {featuredImage ? (
                    <img
                      src={URL.createObjectURL(featuredImage)}
                      className="h-32 rounded border"
                      alt="New Featured"
                    />
                  ) : existingFeaturedImage ? (
                    <img
                      src={existingFeaturedImage}
                      className="h-32 rounded border"
                      alt="Existing Featured"
                    />
                  ) : null}
                </CardContent>
              </Card>

              <Card className="space-y-3 mt-5">
                <CardHeader>
                  <CardTitle>Gallery Images</CardTitle>
                  <CardDescription>Upload multiple images</CardDescription>
                </CardHeader>

                <CardContent className="grid sm:grid-cols-2 gap-4">
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      if (e.target.files) {
                        setGalleryFiles(Array.from(e.target.files));
                      }
                    }}
                  />

                  {/* ✅ Preview logic */}
                  {galleryFiles.length > 0 ? (
                    <div className="grid grid-cols-4 gap-2 mt-3">
                      {galleryFiles.map((file, i) => (
                        <img
                          key={i}
                          src={URL.createObjectURL(file)}
                          className="h-24 rounded border"
                        />
                      ))}
                    </div>
                  ) : existingGallery.length > 0 ? (
                    <div className="grid grid-cols-4 gap-2 mt-3">
                      {existingGallery.map((url, i) => (
                        <img
                          key={i}
                          src={url}
                          className="h-24 rounded border"
                        />
                      ))}
                    </div>
                  ) : null}
                </CardContent>
              </Card>

              {/* ================= PDF BROCHURE ================= */}
              <Card className="space-y-3 mt-5">
                <CardHeader>
                  <CardTitle>PDF Brochure</CardTitle>
                  <CardDescription>Upload a vessel brochure (PDF)</CardDescription>
                </CardHeader>

                <CardContent className="grid sm:grid-cols-2 gap-4">
                  <Input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setPdfBrochure(e.target.files[0]);
                      }
                    }}
                  />

                  {/* ✅ Preview logic (same rule as gallery) */}
                  {pdfBrochure ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{pdfBrochure.name}</span>
                    </div>
                  ) : existingPdfBrochure ? (
                    <a
                      href={existingPdfBrochure}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-sm"
                    >
                      View existing PDF
                    </a>
                  ) : (
                    <span className="text-sm text-slate-500">No brochure uploaded</span>
                  )}
                </CardContent>
              </Card>

            </TabsContent>
          </Tabs>



          {/* ================= SUBMIT ================= */}
          <Card>
            <CardContent className="pt-6 flex justify-end">
              <Button size="lg" onClick={handleSubmitListing}>
                {editingId ? "Update Listing" : "Submit Listing"}
              </Button>
            </CardContent>
          </Card>

        </div>
      )}

        
      
      {/* ================= ACCESS & SECURITY ================= */}
      {activeTab === "security" && broker && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">
              Access & Security
            </h2>
            <p className="text-slate-600">
              Manage API access and permissions
            </p>
          </div>

          {/* ================= ACCOUNT STATUS ================= */}
          <Card>
            <CardHeader>
              <CardTitle>Account Status</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-600 mb-1">Status</p>
                <Badge>
                  {broker.status ?? "unknown"}
                </Badge>
              </div>

              <div>
                <p className="text-sm text-slate-600 mb-1">Permission Level</p>
                <Badge variant="outline" className="capitalize">
                  {broker.permission_level
                    ? broker.permission_level.replace("_", " ")
                    : "loading"}
                </Badge>
              </div>

              
            </CardContent>
          </Card>

          {/* ================= API CREDENTIALS ================= */}
          <Card>
            <CardHeader>
              <CardTitle>API Credentials</CardTitle>
              <CardDescription>
                Use these credentials for external integrations
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">API Token</label>
                <div className="flex gap-2 mt-1">
                  <code className="flex-1 bg-slate-100 px-3 py-2 rounded text-sm overflow-x-auto">
                    {broker.api_token || "—"}
                  </code>

                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!broker.api_token}
                    onClick={() => copyToClipboard(broker.api_token)}
                  >
                    {copied ? "Copied" : "Copy"}
                  </Button>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={handleRegenerateToken}
              >
                Regenerate Token
              </Button>
            </CardContent>
          </Card>

          {/* ================= IP WHITELIST ================= */}
          <Card>
            <CardHeader>
              <CardTitle>IP Whitelist</CardTitle>
              <CardDescription>
                Only whitelisted IPs may access the API
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {broker.whitelisted_ips?.length ? (
                broker.whitelisted_ips.map((ip: string) => (
                  <div
                    key={ip}
                    className="flex justify-between items-center bg-slate-50 p-3 rounded"
                  >
                    <code className="text-sm">{ip}</code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveIp(ip)}
                    >
                      Remove
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">
                  No IPs whitelisted
                </p>
              )}

              <div className="flex gap-2 pt-4 border-t">
                <Input
                  placeholder="e.g. 192.168.1.1"
                  value={newIp}
                  onChange={(e) => setNewIp(e.target.value)}
                />
                <Button onClick={handleAddIp}>
                  Add IP
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}



      {/* ================= API DOCS ================= */}
      {activeTab === "api-docs" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">API Documentation</h2>
            <p className="text-slate-600">How to integrate with Broker Listings API</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-slate-900 text-white p-4 rounded">
      {`Authorization: Bearer ${broker.api_token}`}
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Broker Endpoints</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold">GET /broker/listings</h3>
                <pre className="bg-slate-900 text-white p-4 rounded mt-2">
      {`curl -H "Authorization: Bearer ${broker.api_token}" \\
      ${process.env.NEXT_PUBLIC_API_URL}/broker/listings`}
                </pre>
              </div>

              {broker.permission_level === "read_write" && (
                <>
                  <div>
                    <h3 className="font-semibold">POST /broker/listings</h3>
                    <pre className="bg-slate-900 text-white p-4 rounded mt-2">
      {`curl -X POST \\
      -H "Authorization: Bearer ${broker.api_token}" \\
      -H "Content-Type: application/json" \\
      -d '{ "vessel_name": "Ocean Whisper", "price_usd": "950000" }' \\
      ${process.env.NEXT_PUBLIC_API_URL}/broker/listings`}
                    </pre>
                  </div>

                  <div>
                    <h3 className="font-semibold">PUT /broker/listings/:id</h3>
                    <pre className="bg-slate-900 text-white p-4 rounded mt-2">
      {`curl -X PUT \\
      -H "Authorization: Bearer ${broker.api_token}" \\
      -H "Content-Type: application/json" \\
      -d '{ "price_usd": "900000" }' \\
      ${process.env.NEXT_PUBLIC_API_URL}/broker/listings/123`}
                    </pre>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          
        </div>
      )}


    </DashboardLayout>
  );
}

"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { UserRole } from "@/lib/roles";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import {
  LayoutDashboard,
  Ship,
  Users,
  UserCog,
  CheckCircle,
  Key,
  Activity,
  Star,
  Trash2,
  Search,
  Copy,
  Check,
  PlusCircle,DollarSign, Upload,
  Gauge, Bed, Palette, Cog,
} from "lucide-react";
import { toast } from "sonner";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";



/* ================= API ================= */
const api = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001") + "/api",
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});



const RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  CAD: 1.35,
};

/* ================= PAGE ================= */
export default function SuperAdminDashboardPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  const [admins, setAdmins] = useState<any[]>([]);
  const [brokers, setBrokers] = useState<any[]>([]);
  const [boats, setBoats] = useState<any[]>([]);
  const [pendingBrokers, setPendingBrokers] = useState<any[]>([]);
  const [pendingBoats, setPendingBoats] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [showAddBroker, setShowAddBroker] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);

  const [newBroker, setNewBroker] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
    role_id: 2,
  });

    const [editingId, setEditingId] = useState<number | null>(null);

  
  /* ================= ENGINE / GENERATOR UI CONTROL ================= */

  const MAX_ENGINES = 5;
  const MAX_GENERATORS = 3;

  // Engine blocks shown in UI (0 = engine1, 1 = engine2, etc.)
  const [engineBlocks, setEngineBlocks] = useState<number[]>([0, 1]);

  // Generator blocks shown in UI
  const [generatorBlocks, setGeneratorBlocks] = useState<number[]>([0]);

  /* ================= HELPERS ================= */

  const engineIndexSuffix = (i: number) => (i === 0 ? "" : `${i + 1}`);

  const engineField = (i: number, field: string) =>
    `engine${engineIndexSuffix(i)}_${field}`;

  const powerHpField = (i: number) =>
    i === 0 ? "power_hp" : `power${i + 1}_hp`;

  const powerKwField = (i: number) =>
    i === 0 ? "power_kw" : `power${i + 1}_kw`;

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

  virtual_tour: "",
  video_2: "",

  is_featured:false,

  engine3_qty: "",
  engine3_make: "",
  engine3_model: "",
  engine3_year: "",
  drive3_type: "",
  engine3_type: "",
  fuel3_type: "",
  engine3_hours: "",
  engine3_hours_date: "",
  engine3_location: "",
  power3_hp: "",
  power3_kw: "",

  engine4_qty: "",
  engine4_make: "",
  engine4_model: "",
  engine4_year: "",
  drive4_type: "",
  engine4_type: "",
  fuel4_type: "",
  engine4_hours: "",
  engine4_hours_date: "",
  engine4_location: "",
  power4_hp: "",
  power4_kw: "",

  engine5_qty: "",
  engine5_make: "",
  engine5_model: "",
  engine5_year: "",
  drive5_type: "",
  engine5_type: "",
  fuel5_type: "",
  engine5_hours: "",
  engine5_hours_date: "",
  engine5_location: "",
  power5_hp: "",
  power5_kw: "",

  generator2: "",
  generator2_make: "",
  generator2_kw: "",
  generator2_hours: "",
  generator2_date_hours_recorded: "",

  generator3: "",
  generator3_make: "",
  generator3_kw: "",
  generator3_hours: "",
  generator3_date_hours_recorded: "",


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

const [selectedCurrency, setSelectedCurrency] = useState("USD");

const [virtualTour, setVirtualTour] = useState<File | null>(null);
const [video2, setVideo2] = useState<File | null>(null);

const [existingVirtualTour, setExistingVirtualTour] = useState<string | null>(null);
const [existingVideo2, setExistingVideo2] = useState<string | null>(null);

const [isEditing, setIsEditing] = useState(false);


  /* ================= AUTH + INITIAL LOAD ================= */
  useEffect(() => {
    async function init() {
      try {
        const me = await api.get("/auth/me");
        if (me.data.role_id !== 1) {
          router.push("/admin/login");
          return;
        }

      // Load overview immediately
      await loadOverview();

      } catch {
        localStorage.removeItem("token");
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  /* ================= TAB-BASED LOAD ================= */
  useEffect(() => {
    if (activeTab === "overview") loadOverview();
    if (activeTab === "boats") loadBoats();
    if (activeTab === "brokers" || activeTab === "api-keys") loadBrokers();
    if (activeTab === "admins") loadAdmins();
    if (activeTab === "approvals") loadApprovals();
    if (activeTab === "logs") loadLogs();
  }, [activeTab, page, search]);
  

  /* ================= LOADERS ================= */
  async function loadOverview() {
    if (!boats.length) await loadBoats();
    if (!brokers.length) await loadBrokers();
    if (!logs.length) await loadLogs();
    if (!pendingBrokers.length || !pendingBoats.length) await loadApprovals();
  }

  useEffect(() => {
  if (isEditing) return; // 🚫 DO NOT auto-recalculate on edit

  const engines: number[] = [];
  for (let i = 1; i <= 5; i++) {
    if (formData[`engine${i === 1 ? "" : i}_make`]) {
      engines.push(i - 1);
    }
  }
  setEngineBlocks(engines.length ? engines : [0]);

  const gens: number[] = [];
  for (let i = 1; i <= 3; i++) {
    if (formData[`generator${i === 1 ? "" : i}_make`]) {
      gens.push(i - 1);
    }
  }
  setGeneratorBlocks(gens.length ? gens : [0]);
}, [formData, isEditing]);


  const calculatePrices = (value, currency) => {
    const usdValue = value / RATES[currency];
  
    return {
      price_usd: Math.round(usdValue * RATES.USD),
      price_eur: Math.round(usdValue * RATES.EUR),
      price_gbp: Math.round(usdValue * RATES.GBP),
      price_cad: Math.round(usdValue * RATES.CAD),
    };
  };
  
  
  
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
  
    fd.append("tower", String(formData.tower ?? ""));
    fd.append("builder", String(formData.builder ?? ""));
    fd.append("bridge_clearance", String(formData.bridge_clearance ?? ""));
    fd.append("holding_tank", String(formData.holding_tank ?? ""));
    fd.append("dry_weight", String(formData.dry_weight ?? ""));
  
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
  
    /* ================= ENGINE 3–5 (DYNAMIC) ================= */
    for (let suffix = 3; suffix <= 5; suffix++) {
    fd.append(`engine${suffix}_qty`, formData[`engine${suffix}_qty`] || "");
    fd.append(`engine${suffix}_make`, formData[`engine${suffix}_make`] || "");
    fd.append(`engine${suffix}_model`, formData[`engine${suffix}_model`] || "");
    fd.append(`engine${suffix}_year`, formData[`engine${suffix}_year`] || "");
    fd.append(`drive${suffix}_type`, formData[`drive${suffix}_type`] || "");
    fd.append(`engine${suffix}_type`, formData[`engine${suffix}_type`] || "");
    fd.append(`fuel${suffix}_type`, formData[`fuel${suffix}_type`] || "");
    fd.append(`engine${suffix}_hours`, formData[`engine${suffix}_hours`] || "");
    fd.append(`engine${suffix}_hours_date`, formData[`engine${suffix}_hours_date`] || "");
    fd.append(`engine${suffix}_location`, formData[`engine${suffix}_location`] || "");
    fd.append(`power${suffix}_hp`, formData[`power${suffix}_hp`] || "");
    fd.append(`power${suffix}_kw`, formData[`power${suffix}_kw`] || "");
  }

  
    /* ================= GENERATOR 2–3 ================= */
    for (let suffix = 2; suffix <= 3; suffix++) {
      fd.append(`generator${suffix}`, formData[`generator${suffix}`] || "");
      fd.append(`generator${suffix}_make`, formData[`generator${suffix}_make`] || "");
      fd.append(`generator${suffix}_kw`, formData[`generator${suffix}_kw`] || "");
      fd.append(`generator${suffix}_hours`, formData[`generator${suffix}_hours`] || "");
      fd.append(
        `generator${suffix}_date_hours_recorded`,
        formData[`generator${suffix}_date_hours_recorded`] || ""
      );
    }

  
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
    // ✅ ONLY ON CREATE
    if (!editingId) {
      fd.append("brokerage_id", String(broker.user_id));
      fd.append("broker_name", broker.name);
      fd.append("broker_email", broker.email);
      fd.append("user_id", String(broker.user_id));
    }

    fd.append("status", "pending");
  
    if (virtualTour) {
      fd.append("virtual_tour", virtualTour);
    }
  
    if (video2) {
      fd.append("video_2", video2);
    }
  
  
    try {
      if (editingId) {
        await api.put(`/super-admin/update-listings/${editingId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Listing updated");
      } else {
        await api.post("/super-admin/create-listings", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Listing submitted");
      }
      
      // ✅ clear video states after update
      setVirtualTour(null);
      setVideo2(null);
  
      setExistingVirtualTour(null);
      setExistingVideo2(null);
  
  
      setExistingFeaturedImage(null);
      setExistingGallery([]);
      setPdfBrochure(null);
      setExistingPdfBrochure(null);
      setEditingId(null);
      setFormData(EMPTY_FORM);
      setFeaturedImage(null);
      setGalleryFiles([]);
  
      setActiveTab("boats");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save listing");
    }
  }
  
  
  
  
  /* ================= EDIT ================= */
  
  async function editListing(id: number) {
    try {
      const { data } = await api.get(`/super-admin/listings/${id}`);
  
      setEditingId(id);

      setIsEditing(true);
  
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
        
        /* ===== ENGINE 3 ===== */
        engine3_qty: data.engine3_qty || "",
        engine3_make: data.engine3_make || "",
        engine3_model: data.engine3_model || "",
        engine3_year: data.engine3_year || "",
        drive3_type: data.drive3_type || "",
        engine3_type: data.engine3_type || "",
        fuel3_type: data.fuel3_type || "",
        engine3_hours: data.engine3_hours || "",
        engine3_hours_date: data.engine3_hours_date || "",
        engine3_location: data.engine3_location || "",
        power3_hp: data.power3_hp || "",
        power3_kw: data.power3_kw || "",
  
        /* ===== ENGINE 4 ===== */
        engine4_qty: data.engine4_qty || "",
        engine4_make: data.engine4_make || "",
        engine4_model: data.engine4_model || "",
        engine4_year: data.engine4_year || "",
        drive4_type: data.drive4_type || "",
        engine4_type: data.engine4_type || "",
        fuel4_type: data.fuel4_type || "",
        engine4_hours: data.engine4_hours || "",
        engine4_hours_date: data.engine4_hours_date || "",
        engine4_location: data.engine4_location || "",
        power4_hp: data.power4_hp || "",
        power4_kw: data.power4_kw || "",
  
        /* ===== ENGINE 5 ===== */
        engine5_qty: data.engine5_qty || "",
        engine5_make: data.engine5_make || "",
        engine5_model: data.engine5_model || "",
        engine5_year: data.engine5_year || "",
        drive5_type: data.drive5_type || "",
        engine5_type: data.engine5_type || "",
        fuel5_type: data.fuel5_type || "",
        engine5_hours: data.engine5_hours || "",
        engine5_hours_date: data.engine5_hours_date || "",
        engine5_location: data.engine5_location || "",
        power5_hp: data.power5_hp || "",
        power5_kw: data.power5_kw || "",
  
        /* ===== GENERATOR 2 ===== */
        generator2: data.generator2 || "",
        generator2_make: data.generator2_make || "",
        generator2_kw: data.generator2_kw || "",
        generator2_hours: data.generator2_hours || "",
        generator2_date_hours_recorded:
        data.generator2_date_hours_recorded || "",
  
        /* ===== GENERATOR 3 ===== */
        generator3: data.generator3 || "",
        generator3_make: data.generator3_make || "",
        generator3_kw: data.generator3_kw || "",
        generator3_hours: data.generator3_hours || "",
        generator3_date_hours_recorded: data.generator3_date_hours_recorded || "",
  
  
      });

      const enginesFromDb = [];
      if (data.engine_make) enginesFromDb.push(0);
      if (data.engine2_make) enginesFromDb.push(1);
      if (data.engine3_make) enginesFromDb.push(2);
      if (data.engine4_make) enginesFromDb.push(3);
      if (data.engine5_make) enginesFromDb.push(4);
      setEngineBlocks(enginesFromDb.length ? enginesFromDb : [0]);

      const gensFromDb = [];
      if (data.generator_make) gensFromDb.push(0);
      if (data.generator2_make) gensFromDb.push(1);
      if (data.generator3_make) gensFromDb.push(2);
      setGeneratorBlocks(gensFromDb.length ? gensFromDb : [0]);

  
       /* ✅ SET SELECTED CURRENCY BASED ON EXISTING PRICE */
      if (data.price_usd) setSelectedCurrency("USD");
      else if (data.price_eur) setSelectedCurrency("EUR");
      else if (data.price_gbp) setSelectedCurrency("GBP");
      else if (data.price_cad) setSelectedCurrency("CAD");
      else setSelectedCurrency("USD"); // fallback
  
      setExistingVirtualTour(data.virtual_tour || null);
      setExistingVideo2(data.video_2 || null);
  
      setVirtualTour(null);
      setVideo2(null);
  
  
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

  async function loadAdmins() {
    const res = await api.get("/super-admin/admins");
    setAdmins(res.data);
  }

  async function loadBrokers() {
    const res = await api.get("/super-admin/brokers");
    setBrokers(res.data);
  }

  async function loadBoats() {
    const res = await api.get("/super-admin/listings");
    setBoats(res.data);
  }

  async function loadApprovals() {
    const [b, v] = await Promise.all([
      api.get("/super-admin/brokers/pending"),
      api.get("/super-admin/boats/pending"),
    ]);

    setPendingBrokers(b.data);
    setPendingBoats(v.data);
  }

  async function loadLogs() {
    const res = await api.get("/super-admin/api-logs");
    setLogs(res.data);
  }

  /* ================= ACTIONS (NO FULL RELOAD) ================= */
  async function createBroker() {
    await api.post("/auth/create-boat-manager", newBroker);
    toast.success("Broker created");
    setShowAddBroker(false);
    setNewBroker({ name: "", email: "", password: "" });
    loadBrokers();
  }

  async function createAdmin() {
    await api.post("/auth/create-admin", newAdmin);
    toast.success("Admin created");
    setShowAddAdmin(false);
    setNewAdmin({ name: "", email: "", password: "", role_id: 2 });
    loadAdmins();
  }

  async function toggleFeatured(id: number, is_featured: boolean) {
    await api.patch(`/super-admin/vessels/${id}/feature`, {
      is_featured: !is_featured,
    });

    setBoats((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, is_featured: !b.is_featured } : b
      )
    );
  }


  async function approveBroker(id: number) {
    await api.post(`/super-admin/brokers/${id}/approve`);
    setPendingBrokers(p => p.filter(b => b.id !== id));
    toast.success("Broker approved");
  }

  async function rejectBroker(id: number) {
    await api.post(`/super-admin/brokers/${id}/reject`);
    setPendingBrokers(p => p.filter(b => b.id !== id));
    toast.success("Broker rejected");
  }

  async function approveBoat(id: number) {
    await api.post(`/super-admin/boats/${id}/approve`);
    setPendingBoats(p => p.filter(v => v.id !== id));
    toast.success("Boat approved");
  }

  async function rejectBoat(id: number) {
    await api.post(`/super-admin/boats/${id}/reject`);
    setPendingBoats(p => p.filter(v => v.id !== id));
    toast.success("Boat rejected");
  }

  async function deleteAdmin(id: number) {
    await api.delete(`/super-admin/users/${id}`);
    setAdmins(a => a.filter(x => x.id !== id));
    toast.success("Admin deleted");
  }

  async function deleteBroker(id: number) {
    await api.delete(`/super-admin/users/${id}`);
    setBrokers(b => b.filter(x => x.id !== id));
    toast.success("Broker deleted");
  }

  async function deleteListing(id: number) {
    await api.delete(`/super-admin/listing-delete/${id}`);
    setBoats(b => b.filter(x => x.id !== id));
    toast.success("Listing deleted");
  }

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1200);
  }

  /* ================= DERIVED ================= */
  const activeBrokers = brokers.filter(b => b.status === "active");

  const filteredBoats = useMemo(() => {
    return boats.filter(b =>
      !search ||
      b.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.broker_name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [boats, search]);

  const paginatedBoats = filteredBoats.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  if (loading) return <div className="p-10">Loading…</div>;

  /* ================= UI ================= */
  return (
    <DashboardLayout
      title="Super Admin Dashboard"
      userRole="super-admin"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      menuItems={[
        { label: "Overview", value: "overview", icon: <LayoutDashboard className="h-4 w-4" /> },
        { label: "Boats", value: "boats", icon: <Ship className="h-4 w-4" /> },
        { label: "Brokers", value: "brokers", icon: <Users className="h-4 w-4" /> },
        { label: "Admins", value: "admins", icon: <UserCog className="h-4 w-4" /> },
        { label: "Approvals", value: "approvals", icon: <CheckCircle className="h-4 w-4" /> },
        { label: "API Keys", value: "api-keys", icon: <Key className="h-4 w-4" /> },
        { label: "Logs", value: "logs", icon: <Activity className="h-4 w-4" /> },
      ]}
    >

      {/* ================= OVERVIEW ================= */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Overview</h2>
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card><CardHeader><CardDescription>Total Listings</CardDescription></CardHeader><CardContent><CardTitle>{boats.length}</CardTitle></CardContent></Card>
              <Card><CardHeader><CardDescription>Active Brokers</CardDescription></CardHeader><CardContent><CardTitle>{activeBrokers.length}</CardTitle></CardContent></Card>
              <Card><CardHeader><CardDescription>Pending Approvals</CardDescription></CardHeader><CardContent><CardTitle>{pendingBrokers.length + pendingBoats.length}</CardTitle></CardContent></Card>
              <Card><CardHeader><CardDescription>API Logs</CardDescription></CardHeader><CardContent><CardTitle>{logs.length}</CardTitle></CardContent></Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
                <CardContent>
                  {logs.slice(0,5).map(l => (
                    <div key={l.id} className="flex justify-between text-sm space-y-3">
                      <span>{l.endpoint}</span>
                      <Badge>{l.status_code}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Broker Distribution</CardTitle></CardHeader>
                <CardContent>
                  {brokers.map(b => (
                    <div key={b.id} className="flex justify-between space-y-3">
                      <span>{b.name} <br /> {b.total_listings}</span>
                      <Badge>{b.status}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* ================= BOATS ================= */}
      {activeTab === "boats" && (
        <div className="space-y-6">
          <div className="flex flex-row justify-between">

            <h2 className="text-2xl font-bold text-slate-900">Boats</h2>
            
          </div>
          <Card>
            <CardHeader>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search listings..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Broker</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedBoats.map(b => (
                    <TableRow key={b.id}>
                      <TableCell>{b.title}</TableCell>
                      <TableCell>{b.broker_name}</TableCell>
                      <TableCell>${Number(b.price_usd || 0).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={b.status === "pending" ? "destructive" : b.status === "publish" ? "default": "secondary"}>
                          {b.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant={b.is_featured ? "default" : "outline"}
                          onClick={() => toggleFeatured(b.id, b.is_featured)}
                        >
                          <Star
                            className={`h-4 w-4 ${b.is_featured ? "fill-current" : ""}`}
                          />
                        </Button>
                      </TableCell>
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

              <div className="flex justify-end gap-2 pt-4">
                <Button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</Button>
                <Button disabled={page * pageSize >= filteredBoats.length} onClick={() => setPage(p => p + 1)}>Next</Button>
              </div>
            </CardContent>
          </Card>
        </div>
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
                    <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
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
                <CardHeader><CardTitle>Pricing</CardTitle>
                
                  <p className="text-xs text-gray-500">
                    Enter price in selected currency. Other currencies are auto-calculated.
                  </p>
                </CardHeader>
                
                <CardContent className="grid sm:grid-cols-2 gap-4">

                  <select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                    className="input"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="CAD">CAD</option>
                  </select>

                  <Input
                    type="number"
                    placeholder={`Price ${selectedCurrency}`}
                    value={formData[`price_${selectedCurrency.toLowerCase()}`] ?? ""}
                    onChange={(e) => {
                      const value = Number(e.target.value || 0);
                      setFormData(prev => ({
                        ...prev,
                        ...calculatePrices(value, selectedCurrency),
                      }));
                    }}
                  />


                  <Input type="number" value={formData.price_usd ?? ""} disabled />
                  <Input type="number" value={formData.price_eur ?? ""} disabled />
                  <Input type="number" value={formData.price_gbp ?? ""} disabled />
                  <Input type="number" value={formData.price_cad ?? ""} disabled />

                  
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
              <Card className="space-y-4 mt-5">
                <CardHeader>
                  <CardTitle>Engines</CardTitle>
                  <CardDescription>Up to 5 engines supported</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {engineBlocks.map((i) => (
                    <div
                      key={i}
                      className="border rounded-lg p-4 grid sm:grid-cols-2 gap-4"
                    >
                      <h4 className="sm:col-span-2 font-semibold">
                        Engine {i + 1}
                      </h4>

                      <Input
                        placeholder="Engine Quantity"
                        value={formData[engineField(i, "qty")] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [engineField(i, "qty")]: e.target.value,
                          })
                        }
                      />

                      <Input
                        placeholder="Engine Make"
                        value={formData[engineField(i, "make")] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [engineField(i, "make")]: e.target.value,
                          })
                        }
                      />

                      <Input
                        placeholder="Engine Model"
                        value={formData[engineField(i, "model")] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [engineField(i, "model")]: e.target.value,
                          })
                        }
                      />

                      <Input
                        placeholder="Engine Year"
                        value={formData[engineField(i, "year")] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [engineField(i, "year")]: e.target.value,
                          })
                        }
                      />

                      <Input
                        placeholder="Drive Type"
                        value={formData[`drive${engineIndexSuffix(i)}_type`] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [`drive${engineIndexSuffix(i)}_type`]: e.target.value,
                          })
                        }
                      />

                      <Input
                        placeholder="Engine Type"
                        value={formData[engineField(i, "type")] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [engineField(i, "type")]: e.target.value,
                          })
                        }
                      />

                      <Input
                        placeholder="Fuel Type"
                        value={formData[`fuel${engineIndexSuffix(i)}_type`] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [`fuel${engineIndexSuffix(i)}_type`]: e.target.value,
                          })
                        }
                      />

                      <Input
                        placeholder="Engine Hours"
                        value={formData[engineField(i, "hours")] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [engineField(i, "hours")]: e.target.value,
                          })
                        }
                      />

                      <Input
                        placeholder="Engine Hours Date"
                        value={formData[engineField(i, "hours_date")] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [engineField(i, "hours_date")]: e.target.value,
                          })
                        }
                      />

                      <Input
                        placeholder="Engine Location"
                        value={formData[engineField(i, "location")] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [engineField(i, "location")]: e.target.value,
                          })
                        }
                      />

                      <Input
                        placeholder="Power (HP)"
                        value={formData[powerHpField(i)] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [powerHpField(i)]: e.target.value,
                          })
                        }
                      />

                      <Input
                        placeholder="Power (kW)"
                        value={formData[powerKwField(i)] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [powerKwField(i)]: e.target.value,
                          })
                        }
                      />

                      {i > 1 && (
                        <Button
                          variant="destructive"
                          size="sm"
                          className="sm:col-span-2"
                          onClick={() =>
                            setEngineBlocks(engineBlocks.filter((x) => x !== i))
                          }
                        >
                          Remove Engine
                        </Button>
                      )}
                    </div>
                  ))}

                  <Button
                    disabled={engineBlocks.length >= MAX_ENGINES}
                    onClick={() =>
                      setEngineBlocks([...engineBlocks, engineBlocks.length])
                    }
                  >
                    + Add Engine
                  </Button>
                </CardContent>
              </Card>

              {/* ================= GENERATORS ================= */}
              <Card className="space-y-4 mt-6">
                <CardHeader>
                  <CardTitle>Generators</CardTitle>
                  <CardDescription>Up to 3 generators supported</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {generatorBlocks.map((i) => {
                    const suffix = i === 0 ? "" : `${i + 1}`;
                    return (
                      <div
                        key={i}
                        className="border rounded-lg p-4 grid sm:grid-cols-2 gap-4"
                      >
                        <h4 className="sm:col-span-2 font-semibold">
                          Generator {i + 1}
                        </h4>

                        <Input
                          placeholder="Generator Make"
                          value={formData[`generator${suffix}_make`] || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [`generator${suffix}_make`]: e.target.value,
                            })
                          }
                        />

                        <Input
                          placeholder="Generator kW"
                          value={formData[`generator${suffix}_kw`] || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [`generator${suffix}_kw`]: e.target.value,
                            })
                          }
                        />

                        <Input
                          placeholder="Generator Hours"
                          value={formData[`generator${suffix}_hours`] || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [`generator${suffix}_hours`]: e.target.value,
                            })
                          }
                        />

                        <Input
                          placeholder="Hours Recorded Date"
                          value={
                            formData[`generator${suffix}_date_hours_recorded`] || ""
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [`generator${suffix}_date_hours_recorded`]:
                                e.target.value,
                            })
                          }
                        />
                      </div>
                    );
                  })}

                  <Button
                    disabled={generatorBlocks.length >= MAX_GENERATORS}
                    onClick={() =>
                      setGeneratorBlocks([...generatorBlocks, generatorBlocks.length])
                    }
                  >
                    + Add Generator
                  </Button>
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

              {/* ================= Virtual Tour ================= */}
              <Card className="space-y-3 mt-5">
                <CardHeader>
                  <CardTitle>Virtual Tour</CardTitle>
                  <CardDescription>Upload virtual tour</CardDescription>
                </CardHeader>

                <CardContent className="grid sm:grid-cols-2 gap-4">
                  <Input
                    type="file"
                    accept="video/mp4,video/webm"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setVirtualTour(e.target.files[0]);
                      }
                    }}
                  />

                  {existingVirtualTour && !virtualTour && (
                    <video controls className="h-32 rounded border">
                      <source src={existingVirtualTour} />
                    </video>
                  )}
                </CardContent>
              </Card>

              {/* ================= Video ================= */}
              <Card className="space-y-3 mt-5">
                <CardHeader>
                  <CardTitle>Video</CardTitle>
                  <CardDescription>Upload video</CardDescription>
                </CardHeader>

                <CardContent className="grid sm:grid-cols-2 gap-4">
                  <Input
                    type="file"
                    accept="video/mp4,video/webm"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setVideo2(e.target.files[0]);
                      }
                    }}
                  />

                  {existingVideo2 && !video2 && (
                    <video controls className="h-32 rounded border">
                      <source src={existingVideo2} />
                    </video>
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

      {/* ================= BROKERS ================= */}
      {activeTab === "brokers" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Brokers</h2>

            <Button onClick={() => setShowAddBroker(true)}>
              + Add Broker
            </Button>
          </div>

          {showAddBroker && (
            <Card>
              <CardHeader>
                <CardTitle>Create Broker</CardTitle>
                <CardDescription>
                  This will create a broker (boat manager) account
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <Input
                  placeholder="Name"
                  value={newBroker.name}
                  onChange={(e) => setNewBroker({ ...newBroker, name: e.target.value })}
                />
                <Input
                  placeholder="Email"
                  value={newBroker.email}
                  onChange={(e) => setNewBroker({ ...newBroker, email: e.target.value })}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={newBroker.password}
                  onChange={(e) =>
                    setNewBroker({ ...newBroker, password: e.target.value })
                  }
                />

                <div className="flex gap-2">
                  <Button onClick={createBroker}>Create</Button>
                  <Button variant="outline" onClick={() => setShowAddBroker(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Broker Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Permission</TableHead>
                    <TableHead>Listings</TableHead>
                    <TableHead>IPs</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {brokers.map((b) => (
                    <TableRow key={b.broker_id}>
                      <TableCell>{b.name}</TableCell>
                      <TableCell>
                        <Badge variant={b.status === "active" ? "default" : "secondary"}>
                          {b.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{b.permission_level}</Badge>
                      </TableCell>
                      <TableCell>{b.total_listings}</TableCell>
                      <TableCell>{b.whitelisted_ips.length}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="destructive" onClick={() => deleteBroker(b.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ================= ADMINS ================= */}
      {activeTab === "admins" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Admins</h2>

            <Button onClick={() => setShowAddAdmin(true)}>
              + Add Admin
            </Button>
          </div>

          {showAddAdmin && (
            <Card>
              <CardHeader>
                <CardTitle>Create Admin</CardTitle>
                <CardDescription>
                  This will create a admin account
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <Input
                  placeholder="Name"
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                />
                <Input
                  placeholder="Email"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={newAdmin.password}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, password: e.target.value })
                  }
                />

                <div className="flex gap-2">
                  <Button onClick={createAdmin}>Create</Button>
                  <Button variant="outline" onClick={() => setShowAddAdmin(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          <Card>
            <CardHeader><CardTitle>Admins</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {admins.map(a => (
                    <TableRow key={a.id}>
                      <TableCell>{a.name}</TableCell>
                      <TableCell>{a.email}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="destructive" onClick={() => deleteAdmin(a.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ================= APPROVALS ================= */}
      {activeTab === "approvals" && (
        <div className="space-y-6">
                   
          <h2 className="text-2xl font-bold text-slate-900">Boat Approval</h2>
          {pendingBoats.map(v => (
            <Card key={v.id}>
              <CardHeader><CardTitle>{v.title}</CardTitle></CardHeader>
              <CardContent className="flex gap-3">
                <Button onClick={() => approveBoat(v.id)}>Approve</Button>
                <Button variant="destructive" onClick={() => rejectBoat(v.id)}>Reject</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* ================= API KEYS ================= */}
      {activeTab === "api-keys" && (
        <div className="space-y-4">
          {brokers.filter(b => b.status === "active").map(b => (
            <Card key={b.id}>
              <CardHeader><CardTitle>{b.name}</CardTitle></CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <code className="flex-1 bg-slate-100 p-2 rounded">{b.api_token}</code>
                  <Button size="sm" variant="outline" onClick={() => copy(b.api_token, b.id)}>
                    {copiedKey === b.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* ================= LOGS ================= */}
      {activeTab === "logs" && (
        <Card>
          <CardHeader><CardTitle>API Logs</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Endpoint</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>IP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map(l => (
                  <TableRow key={l.id}>
                    <TableCell>{l.endpoint}</TableCell>
                    <TableCell><Badge>{l.status_code}</Badge></TableCell>
                    <TableCell>{l.ip_address}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

    </DashboardLayout>
  );
}

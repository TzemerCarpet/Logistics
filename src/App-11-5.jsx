import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Plus, X, Camera, MapPin, Phone, Calendar as CalIcon, ChevronLeft, ChevronRight,
  Edit2, Trash2, Filter, Clock, Truck, Save, AlertCircle,
  ClipboardList, Calculator as CalcIcon, User, ArrowLeftRight,
  ClipboardPaste, Route, FileText, Lock, Unlock, Settings, Printer, Car,
  Wrench, Sparkles, MessageCircle, Building2, GripVertical, Search, ChevronUp, ChevronDown, CheckCircle2, Menu
} from "lucide-react";

const LOGO_DATA_URI = "data:image/png;base64,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";
const FAVICON_DATA_URI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFgElEQVR4nO2Za4xdUxTHf/c1aFUrEqVqNB4RpFqNpJIKIT54fCAdQQhp+OKLR6ITEVUkGkMqHiXxTqQj4pGRqFDSCiU14hUh4hEJqqooImjHzD3Hh7VWz7r7nnvn9M7NTCX7n5yce/Zea+211l577bX3hYiIiIiIiIiIiIiIiIiIiIgIykBpCsfv9tgdyysDlYkI6GC8chfpQp5xYYYeC8zJEVDUGSWlzXvyFDF6Q7XNOL59PH2sr+ro28JC/3VgO7AW6AMOyqHrRmSEhvcC9wFPtdEPYAA4O6fdw4xeDmwGjnLtuXqbkHnAP0Dqnh+AQeB8YGYOnznDBJ8E3APcCdylzwCwGriaZsPnav+vOt4OYLr2mUyj71OaMeWZ7vpD2lOBEaX/GbjAyWxymnnsWmUY1UHGAmdsAZ5UYQcEMmzgZQGPfz5w9IcDdwC/uP5/dcyznEyLzEOArdpfV/r31VBDTd+zgW+czBRIgNtCww2WWDaQediUqrdxxuPAucD+ZF69VGl3Ob4Rfa9XQ24nm3FzeOKUvVFlVckcO+h0S5THeFcB05wtr7g+syHR3y8ikb47ai10eoGdzlt5M9jKGaucMy8LBvfPb8gshobbt8l9yTkAYGnQ7/Wx3+8Bi4EVbca3JXGLyq34QTxjqFgrZ4zo+8GCDvCG5sk3g7YCM5DJORL4k8bQ90/iHDPm2vLGTIFNZBFbKisxwO/At+oQy5aeMYQlwLLSFIEp12oXsTFnA4v0dxX41I1Vz+GpOLnW5pEo73bgcuAv08c74CFgAbKmH0NmoUT7fdkrUQQ+A9uMh/11NWSRtn0FLAH6kSVaIYsEj3JOm42TquyrgO/IHNYkwGMmsvU9gSS8VqGcAvc7vqJLYLy+dSrPR8vJwDsF5fg8kwIrVYYt+Vz4Ks5jBvk7xJ46ICFbn7uAm8lyTz14byPL7BaJIBO1giyhtXOCyXrV2Va4gDOGffT72RzDOo2AF5DlBnC8UzRx7zHgTKWpuLcZcAowXMD4LcjWm1sAtTskmJA6jTPQCUypbcB5wIXAJ2rQj8BPAb3lgYX6XXLtIAXPMOKEG8i2b8sB9t4JXKHyfb7bjaKnKi+8EySIEZ8jRUoJ6NH2P5B1DZmBZvAZQbtVhaP6fRjiKPv2sKRoxudiT4+VE4VVdilZ1dcHzNffpo85YAGSByyLWw6ZDzyAbI93I2W5P4/YbjINuJVsaTVhsh1gy6qGnOjeQvLBcTSuUasHDkUOV4YlwDPAR8A1wIE0b6UGi4ClwIk01gkNRJMJm6FZwBBwGvl7OkiEVIHT9fsRZKlcou2WgFud8y3KasjJ0RzSsAtMtgMMO5DwDde8RUgJ2X1SYF/t+0LftnRaFWiJyiirjO+BN5S+ydFTsQSsCnvT/faGV5DZHUKS4ErVcw0S+j3kR4w3vII4rB+pKFeTOa6BdyJbW6cwBT50bb6efx65GRoO+EaBm4DXgnYz2ibzY8RZg2S7g5XPHcGc9Bytz/n3Ovp29wEbHd0c4G/EISPA08i+blgGXA/sR2MVt87x+FPfJuAiJEJArsEGyK7DOr7CMwe87AYLn4cDxVvR+VmtqNJDSI3vUUPCPUUyvddjIY3H4vXAOQF/GTn4pMjpz8ZrQtFb3lSVPALxvE9aPcDXSFIDueNbnENXQ46jm53cg7UNJLyvRKrEL5EtsBfZKr1hCbJEjkFqAOs/GnHoGm2fhaz/d5Hjr9mx18HO+cuRo+885HZnrfaHk1QK2qy4OkH5LwauQyZlrtJ0JdmX3WD+qQYDlNrQhWEYGldBbnrfBh6l9X8JxttKXj/wGZkDpvKfrsLIc8Zk8u8V6NZM/S9mfDx045+niIiIiIiIiIiIiIiIiIiIiIgQ/wGKrRzMLYHdrQAAAABJRU5ErkJggg==";

/* ============================= קבועים כלליים ============================= */

const ZONES = [
  { id: "צפון", label: "צפון", color: "#3B7BA6" },
  { id: "מרכז", label: "מרכז", color: "#6B4FA0" },
  { id: "שרון", label: "שרון", color: "#1F8A6E" },
  { id: "ירושלים", label: "ירושלים", color: "#B8703F" },
  { id: "דרום", label: "דרום", color: "#A0475B" },
];

const BRANCHES = [
  { id: "jerusalem", label: "ירושלים" },
  { id: "rishon2", label: "ראשון לציון בוטיק" },
  { id: "herzliya", label: "הרצליה" },
  { id: "netanya", label: "נתניה" },
  { id: "telaviv", label: "תל אביב - Outlet" },
  { id: "maale", label: "מעלה אדומים Dcity" },
];
const branchLabel = (id) => BRANCHES.find((b) => b.id === id)?.label || id;
const BRANCH_ADDRESSES = {
  jerusalem: "פייר קניג 39, תלפיות, ירושלים",
  rishon2: "לישנסקי 4, שבעת הכוכבים, ראשון לציון",
  herzliya: "מדינת היהודים 60, הרצליה",
  netanya: "מפ״י 5, קומה 2, מתחם הסוהו, נתניה",
  telaviv: "קיבוץ גלויות 34, תל אביב",
  maale: "דרך ימית 10, מעלה אדומים",
};
const WAREHOUSE_ADDRESS = "אליהו איתן 3ב, ראשון לציון";

const STATUS_FLOW_GENERAL = [
  { id: "התקבל", label: "התקבל", color: "#B23B3B" },
  { id: "בטיפול", label: "בטיפול", color: "#B8862F" },
  { id: "הסתיים", label: "הסתיים", color: "#2E8B57" },
  { id: "בוטל", label: "בוטל", color: "#9B9890" },
];
const STATUS_FLOW_CLEANING = [
  { id: "לפני ניקוי", label: "לפני ניקוי", color: "#8A8677" },
  { id: "בניקוי", label: "בניקוי", color: "#B8862F" },
  { id: "לפני האספקה", label: "לפני האספקה", color: "#3B6FA0" },
  { id: "הסתיים", label: "הסתיים", color: "#2E8B57" },
  { id: "בוטל", label: "בוטל", color: "#9B9890" },
  { id: "ממשיך לתיקון", label: "ממשיך לתיקון", color: "#CC5B33" },
];
const STATUS_FLOW_REPAIR = [
  { id: "לפני תיקון", label: "לפני תיקון", color: "#8A8677" },
  { id: "בתיקון", label: "בתיקון", color: "#B8862F" },
  { id: "לפני אספקה", label: "לפני אספקה", color: "#3B6FA0" },
  { id: "הסתיים", label: "הסתיים", color: "#2E8B57" },
  { id: "בוטל", label: "בוטל", color: "#9B9890" },
  { id: "ממשיך לניקוי", label: "ממשיך לניקוי", color: "#0E7A6B" },
];
const getStatusFlow = (type) => type === "cleaning" ? STATUS_FLOW_CLEANING : type === "repair" ? STATUS_FLOW_REPAIR : STATUS_FLOW_GENERAL;
const ALL_STATUSES = [...STATUS_FLOW_GENERAL, ...STATUS_FLOW_CLEANING, ...STATUS_FLOW_REPAIR];
// לתאימות לאחור: STATUS_FLOW משמש רשימות/סינונים כלליים שלא תלויים בסוג משימה ספציפי
const STATUS_FLOW = [
  { id: "התקבל", label: "התקבל (משימה)", color: "#B23B3B" },
  { id: "לפני ניקוי", label: "לפני ניקוי", color: "#8A8677" },
  { id: "בניקוי", label: "בניקוי", color: "#B8862F" },
  { id: "לפני תיקון", label: "לפני תיקון", color: "#8A8677" },
  { id: "בתיקון", label: "בתיקון", color: "#B8862F" },
  { id: "בטיפול", label: "בטיפול (משימה)", color: "#B8862F" },
  { id: "לפני האספקה", label: "לפני האספקה (ניקוי)", color: "#3B6FA0" },
  { id: "לפני אספקה", label: "לפני אספקה (תיקון)", color: "#3B6FA0" },
  { id: "הסתיים", label: "הסתיים", color: "#2E8B57" },
  { id: "בוטל", label: "בוטל", color: "#9B9890" },
];
const statusMeta = (id) => ALL_STATUSES.find((s) => s.id === id) || STATUS_FLOW_GENERAL[0];

const TASK_TYPES = [
  { id: "general", label: "משימה", color: "#7B4FA0", icon: ClipboardList },
  { id: "cleaning", label: "ניקוי", color: "#3B6FA0", icon: Sparkles },
  { id: "repair", label: "תיקון", color: "#CC5B33", icon: Wrench },
  { id: "branch", label: "סניף", color: "#0E7A6B", icon: Building2 },
];
const typeMeta = (id) => TASK_TYPES.find((t) => t.id === id) || TASK_TYPES[0];

const PERFORMER_OPTIONS = ["מורד לויאן", "עיני", "ארגמן", "תפעול", "ארז", "אבי שוק", "אחר"];
const CALL_AHEAD_OPTIONS = [
  { id: "none", label: "ללא" },
  { id: "30min", label: "חצי שעה לפני" },
  { id: "60min", label: "שעה לפני" },
];

const TRANSFER_STATUS = [
  { id: "ממתין", label: "ממתין", color: "#7B4FA0" },
  { id: "בדרך", label: "בדרך", color: "#3B6FA0" },
  { id: "הועבר", label: "הועבר", color: "#2E8B57" },
];

/* ============================= קבועי המחשבון האמיתי ============================= */

const C_TYPES = [
  { id: "machine", name: "עבודת מכונה" },
  { id: "hand", name: "עבודת יד" },
  { id: "silk", name: "משי" },
];
const C_SVCS = [
  { id: "urine", name: "חיטוי ריח שתן", fixed: false },
  { id: "stain", name: "טיפול בכתם", fixed: true },
  { id: "flood", name: "תוספת להצפה", fixed: false },
  { id: "hardstain", name: "טיפול בכתם קשה", fixed: true },
];

const R_CATS = [
  { cat: "עבודות סרט", billing: "sides4", svcs: [
    { id: "t1", name: "הדבקת סרט / סרט חם לקנט" }, { id: "t2", name: "סרט P.V.C תפור (עבודת יד)" },
    { id: "t3", name: "סרט חיבור סרט חם" }, { id: "t4", name: "סרט לשטיח מכונה" }, { id: "t5", name: "סרט יוטה" },
  ]},
  { cat: "תיקון ורסטורציה", billing: "sqm", svcs: [
    { id: "r1", name: "מתיחה" }, { id: "r2", name: "רסטורציה צמר" }, { id: "r3", name: "רסטורציה משי" },
    { id: "r4", name: "טיפול ברקע צהוב" }, { id: "r5", name: "חיזוק ראש", billing: "sides2long" },
  ]},
  { cat: "חיתוך ותפירה", billing: "sides4", svcs: [
    { id: "c1", name: "חיתוך פרעושים / עש" }, { id: "c2", name: "חיתוך שטיח שאגי / עבודת יד" }, { id: "c3", name: "חיתוך שטיח רגיל" },
  ]},
  { cat: "עבודות פרנזים", billing: "sides4", svcs: [
    { id: "f1", name: "הלבנת פרנזים" }, { id: "f2", name: "פרנז יד / צמר / כותנה" }, { id: "f3", name: "פרנז מקורי" },
  ]},
  { cat: "תפירת פינות", billing: "fixed", svcs: [{ id: "p1", name: "תפירת 4 פינות עור", fixed: true }] },
  { cat: "עבודות גיזוז", billing: "sqm", svcs: [{ id: "g1", name: "גיזוז חוטים בולטים" }] },
];
const ALL_REPAIR_SVCS = R_CATS.flatMap((c) => c.svcs);

const ADMIN_PASSWORD = "admin1234";
const DEFAULT_ACCOUNTS = [
  { id: "warehouse", name: "מחסן", password: "admin1234", role: "admin", canViewAllTasks: true },
];
function canSeeTask(task, account) {
  if (!account) return false;
  if (account.role === "driver") return task.driver === account.name && !task.pending;
  const fullAccess = account.role === "admin" || account.role === "manager";
  if (task.pending || task.rejected) return fullAccess || task.submittedBy === account.name;
  if (fullAccess) return true;
  return account.canViewAllTasks || task.submittedBy === account.name;
}
function tabAllowed(account, tabId) {
  if (!account) return false;
  if (account.role === "admin" || account.role === "manager") return true;
  if (!account.permissions?.tabs) return true;
  return account.permissions.tabs[tabId] !== false;
}
function opsTypeAllowed(account, typeId) {
  if (!account) return false;
  if (account.role === "admin" || account.role === "manager") return true;
  if (!account.permissions?.opsTypes) return true;
  return account.permissions.opsTypes[typeId] !== false;
}
const DEFAULT_CALC_CONFIG = {
  general: { minOrder: 250, minSide: 100, warehouseAddress: "אליהו איתן 3ב, ראשון לציון" },
  cleaningPrices: { machine: 95, hand: 135, silk: 190, urine: 60, stain: 750, flood: 50, hardstain: 1000 },
  repairPrices: { t1: 60, t2: 100, t3: 75, t4: 100, t5: 100, r1: 360, r2: 950, r3: 1150, r4: 280, r5: 350, c1: 75, c2: 160, c3: 35, f1: 60, f2: 580, f3: 780, p1: 280, g1: 200 },
  discounts: [{ n: 3, p: 5, label: "הנחת 3+ שטיחים (-5%)" }, { n: 5, p: 10, label: "הנחת 5+ שטיחים (-10%)" }],
  deliveryPrices: [
    { name: "גוש שרון / מרכז", price: 90 }, { name: "תל אביב", price: 100 }, { name: "פתח תקווה / רמלה / לוד", price: 110 },
    { name: "רמת גן / גבעתיים / בני ברק", price: 120 }, { name: "ראשון לציון / חולון / בת ים", price: 120 },
    { name: "הרצליה / רעננה / כפר סבא", price: 130 }, { name: "נתניה / חדרה", price: 130 }, { name: "ירושלים", price: 150 },
    { name: "חיפה / קריות", price: 160 }, { name: "באר שבע / דרום", price: 180 }, { name: "צפון (נצרת ומעלה)", price: 200 },
  ],
};

/* ============================= עזרים ============================= */

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const fmtDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("he-IL", { day: "2-digit", month: "2-digit", year: "2-digit" }) + " " + d.toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" });
};
// תאריך בלבד (בלי שעה) — תמיד מתחיל ביום, לא בשנה. משתמשים ב-T00:00:00 כדי למנוע הזזה של יום בגלל אזור זמן.
const fmtDateOnly = (isoDateStr) => {
  if (!isoDateStr) return "";
  const d = new Date(isoDateStr.length <= 10 ? isoDateStr + "T00:00:00" : isoDateStr);
  return d.toLocaleDateString("he-IL", { day: "2-digit", month: "2-digit", year: "numeric" });
};
const ils = (n) => `₪${Math.round(n).toLocaleString("he-IL")}`;
function sqmBilled(w, l, minSide = 100) { return (Math.max(Number(w) || 0, minSide) * Math.max(Number(l) || 0, minSide)) / 10000; }
function sqmReal(w, l) { return ((Number(w) || 0) * (Number(l) || 0)) / 10000; }

function compressImage(file, maxDim = 900, quality = 0.6) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxDim) { height = (height * maxDim) / width; width = maxDim; }
        else if (height > maxDim) { width = (width * maxDim) / height; height = maxDim; }
        const canvas = document.createElement("canvas");
        canvas.width = width; canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject; img.src = e.target.result;
    };
    reader.onerror = reject; reader.readAsDataURL(file);
  });
}

const MAX_WAYPOINTS_PER_LINK = 9; // מגבלת Google Maps (ללא מפתח API) על מספר עצירות בקישור אחד

function buildGoogleMapsRoutes(addresses, manualOrder = false, warehouseAddress = WAREHOUSE_ADDRESS) {
  const clean = addresses.filter(Boolean);
  if (clean.length === 0) return [];
  const chunks = [];
  for (let i = 0; i < clean.length; i += MAX_WAYPOINTS_PER_LINK) chunks.push(clean.slice(i, i + MAX_WAYPOINTS_PER_LINK));
  return chunks.map((chunk, idx) => {
    const isFirst = idx === 0;
    const isLast = idx === chunks.length - 1;
    const origin = isFirst ? warehouseAddress : chunks[idx - 1][chunks[idx - 1].length - 1];
    const destination = isLast ? warehouseAddress : chunk[chunk.length - 1];
    const waypointAddrs = isLast ? chunk : chunk.slice(0, -1);
    let url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;
    if (waypointAddrs.length) {
      const wp = (manualOrder ? "" : "optimize:true|") + waypointAddrs.map(encodeURIComponent).join("|");
      url += `&waypoints=${wp}`;
    }
    return url + "&travelmode=driving";
  });
}

const WEEKDAYS_HE = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];
const MONTHS_HE = ["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"];
function isoDate(d) { const y = d.getFullYear(); const m = String(d.getMonth() + 1).padStart(2, "0"); const day = String(d.getDate()).padStart(2, "0"); return `${y}-${m}-${day}`; }
function buildMonthGrid(monthDate) {
  const year = monthDate.getFullYear(), month = monthDate.getMonth();
  const first = new Date(year, month, 1);
  const startOffset = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

/* ============================= אחסון ============================= */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const REST = `${SUPABASE_URL}/rest/v1`;
const SB_HEADERS = { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}`, "Content-Type": "application/json" };

async function sbSelect(table, query = "") {
  const r = await fetch(`${REST}/${table}?${query}`, { headers: SB_HEADERS });
  if (!r.ok) throw new Error(`Supabase select failed: ${table}`);
  return r.json();
}
async function sbUpsert(table, rows, onConflict = "id") {
  if (!rows.length) return;
  const r = await fetch(`${REST}/${table}?on_conflict=${onConflict}`, {
    method: "POST",
    headers: { ...SB_HEADERS, Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify(rows),
  });
  if (!r.ok) console.error(`Supabase upsert failed: ${table}`, await r.text());
}
async function sbDelete(table, column, value) {
  const r = await fetch(`${REST}/${table}?${column}=eq.${encodeURIComponent(value)}`, { method: "DELETE", headers: SB_HEADERS });
  if (!r.ok) console.error(`Supabase delete failed: ${table}`);
}

function taskToRow(t) {
  return {
    id: t.id, type: t.type, zone: t.zone || null, status: t.status || null,
    scheduled_date: t.scheduledDate || null, driver: t.driver || null,
    pending: !!t.pending, submitted_by: t.submittedBy || null,
    route_order: t.routeOrder ?? null, data: t,
  };
}
function transferToRow(t) {
  return { id: t.id, to_location: t.toLocation || null, status: t.status || null, pending: !!t.pending, submitted_by: t.submittedBy || null, data: t };
}

async function loadTasks() {
  try { const rows = await sbSelect("tasks", "select=data"); return rows.map((r) => r.data); }
  catch (e) { console.error(e); return []; }
}
async function saveTasks(next, prev = []) {
  try {
    const nextIds = new Set(next.map((t) => t.id));
    const removed = prev.filter((t) => !nextIds.has(t.id)).map((t) => t.id);
    await sbUpsert("tasks", next.map(taskToRow));
    for (const id of removed) await sbDelete("tasks", "id", id);
  } catch (e) { console.error(e); }
}
async function loadPhotos(id) {
  try {
    const rows = await sbSelect("task_photos", `task_id=eq.${encodeURIComponent(id)}&select=before,after`);
    return rows[0] ? { before: rows[0].before || [], after: rows[0].after || [] } : { before: [], after: [] };
  } catch (e) { console.error(e); return { before: [], after: [] }; }
}
async function savePhotos(id, p) {
  try { await sbUpsert("task_photos", [{ task_id: id, before: p.before, after: p.after }], "task_id"); }
  catch (e) { console.error(e); }
}
async function loadTransfers() {
  try { const rows = await sbSelect("transfers", "select=data"); return rows.map((r) => r.data); }
  catch (e) { console.error(e); return []; }
}
async function saveTransfers(next, prev = []) {
  try {
    const nextIds = new Set(next.map((t) => t.id));
    const removed = prev.filter((t) => !nextIds.has(t.id)).map((t) => t.id);
    await sbUpsert("transfers", next.map(transferToRow));
    for (const id of removed) await sbDelete("transfers", "id", id);
  } catch (e) { console.error(e); }
}
async function loadCalcConfig() {
  try {
    const rows = await sbSelect("app_config", "id=eq.calc_config&select=data");
    return rows[0] ? { ...DEFAULT_CALC_CONFIG, ...rows[0].data } : DEFAULT_CALC_CONFIG;
  } catch (e) { console.error(e); return DEFAULT_CALC_CONFIG; }
}
async function saveCalcConfig(c) {
  try { await sbUpsert("app_config", [{ id: "calc_config", data: c }]); }
  catch (e) { console.error(e); }
}
async function loadNextNumber() {
  try {
    const rows = await sbSelect("app_config", "id=eq.next_carpet_number&select=data");
    return rows[0] ? rows[0].data : 4137;
  } catch (e) { console.error(e); return 4137; }
}
async function saveNextNumber(n) {
  try { await sbUpsert("app_config", [{ id: "next_carpet_number", data: n }]); }
  catch (e) { console.error(e); }
}
async function loadAccounts() {
  try {
    const rows = await sbSelect("accounts", "select=*");
    if (!rows.length) return DEFAULT_ACCOUNTS;
    return rows.map((r) => ({ id: r.id, name: r.name, password: r.password, role: r.role, canViewAllTasks: r.can_view_all_tasks, permissions: r.permissions || {} }));
  } catch (e) { console.error(e); return DEFAULT_ACCOUNTS; }
}
async function saveAccounts(next, prev = []) {
  try {
    const nextIds = new Set(next.map((a) => a.id));
    const removed = prev.filter((a) => !nextIds.has(a.id)).map((a) => a.id);
    const rows = next.map((a) => ({ id: a.id, name: a.name, password: a.password, role: a.role, can_view_all_tasks: !!a.canViewAllTasks, permissions: a.permissions || {} }));
    await sbUpsert("accounts", rows);
    for (const id of removed) await sbDelete("accounts", "id", id);
  } catch (e) { console.error(e); }
}
// התחברות נשמרת בדפדפן עצמו (localStorage) — כבר לא בתוך Claude, זה זמין ובטוח לשימוש הזה
async function loadSession() {
  try { const v = localStorage.getItem("tzemer_session"); return v ? JSON.parse(v) : null; } catch { return null; }
}
async function saveSession(accountId) {
  try { localStorage.setItem("tzemer_session", JSON.stringify(accountId)); } catch {}
}
async function clearSession() {
  try { localStorage.removeItem("tzemer_session"); } catch {}
}

/* ============================= UI קטנים ============================= */

function Chip({ color, children }) { return <span className="chip" style={{ background: color + "1a", color, borderColor: color + "55" }}>{children}</span>; }
function Field({ label, children }) { return <label className="field"><span className="field-label">{label}</span>{children}</label>; }
function PillGroup({ options, value, onChange, size, multi }) {
  const isActive = (id) => multi ? (Array.isArray(value) && value.includes(id)) : value === id;
  const handleClick = (id) => {
    if (!multi) { onChange(id); return; }
    const arr = Array.isArray(value) ? value : [];
    onChange(arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]);
  };
  return (
    <div className={"pill-group" + (size === "sm" ? " sm" : "")}>
      {options.map((o) => {
        const Icon = o.icon;
        return (
          <button key={o.id} type="button" className={"pill" + (isActive(o.id) ? " active" : "")} onClick={() => handleClick(o.id)}>
            {o.color && <span className="pill-dot" style={{ background: o.color }} />}
            {Icon && <Icon size={14} />} {o.label}
          </button>
        );
      })}
    </div>
  );
}

/* ============================= שורת שטיח בתוך משימה (ללא מחיר) ============================= */

function TaskCarpetRow({ carpet, type, onChange, onRemove, index }) {
  const set = (patch) => onChange({ ...carpet, ...patch });
  const typeName = type === "cleaning" ? C_TYPES.find((t) => t.id === carpet.cleanType)?.name : null;
  return (
    <div className="carpet-row">
      <div className="carpet-row-head">
        <span className="carpet-index">שטיח {index + 1}{typeName ? ` · ${typeName}` : ""}</span>
        <button type="button" className="icon-btn danger" onClick={onRemove}><Trash2 size={15} /></button>
      </div>

      <div className="carpet-grid">
        <Field label="מספר"><input type="text" inputMode="numeric" pattern="[0-9]*" className="carpet-number-input" value={carpet.number ?? ""} onChange={(e) => set({ number: e.target.value })} placeholder="יוקצה אוטומטית בשמירה" /></Field>
        <Field label="שם השטיח"><input type="text" value={carpet.name} onChange={(e) => set({ name: e.target.value })} placeholder="לדוגמה: שטיח פרסי כחול" /></Field>
      </div>

      {type === "cleaning" && (
        <Field label="סוג ניקוי"><PillGroup options={C_TYPES.map(t => ({ id: t.id, label: t.name }))} value={carpet.cleanType} onChange={(v) => set({ cleanType: v })} size="sm" /></Field>
      )}

      <div className="carpet-grid">
        <Field label="אורך (ס״מ)"><input type="number" min="0" value={carpet.length} onChange={(e) => set({ length: e.target.value })} placeholder="200" /></Field>
        <Field label="רוחב (ס״מ)"><input type="number" min="0" value={carpet.width} onChange={(e) => set({ width: e.target.value })} placeholder="150" /></Field>
      </div>

      {type === "cleaning" ? (
        <div className="extras-row">
          {C_SVCS.map((s) => (
            <label key={s.id} className={"extra-pill" + (carpet.extras[s.id] ? " active" : "")}>
              <input type="checkbox" checked={carpet.extras[s.id]} onChange={(e) => set({ extras: { ...carpet.extras, [s.id]: e.target.checked } })} /><span>{s.name}</span>
            </label>
          ))}
        </div>
      ) : (
        <div className="repair-checklist">
          {R_CATS.map((cat) => (
            <div key={cat.cat} className="repair-cat">
              <div className="repair-cat-title">{cat.cat}</div>
              <div className="extras-row">
                {cat.svcs.map((s) => (
                  <label key={s.id} className={"extra-pill" + (carpet.repairs[s.id] ? " active" : "")}>
                    <input type="checkbox" checked={carpet.repairs[s.id]} onChange={(e) => set({ repairs: { ...carpet.repairs, [s.id]: e.target.checked } })} /><span>{s.name}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <Field label="הערות לשטיח"><input type="text" value={carpet.notes} onChange={(e) => set({ notes: e.target.value })} placeholder="לדוגמה: כתם יין בפינה" /></Field>
    </div>
  );
}

function newTaskCarpet(type, number) {
  if (type === "cleaning") return { id: uid(), number, name: "", cleanType: "machine", width: "", length: "", extras: { urine: false, stain: false, flood: false, hardstain: false }, notes: "" };
  const repairs = {}; ALL_REPAIR_SVCS.forEach((s) => (repairs[s.id] = false));
  return { id: uid(), number, name: "", width: "", length: "", repairs, notes: "" };
}
function carpetSizeLabel(c) { return c.width && c.length ? `${c.length}×${c.width} ס״מ` : null; }

/* ============================= טופס משימה ============================= */

function TaskForm({ initial, onSave, onCancel, allowedTypes, defaultType, defaultScheduledDate, getNextNumber, account, driverNames }) {
  const isAdmin = account?.role === "admin"; // רק מחסן — פטור מאישור ומספור מיידי
  const taskIdRef = useRef(initial?.id || uid());
  const typeOptions = allowedTypes ? TASK_TYPES.filter((t) => allowedTypes.includes(t.id)) : TASK_TYPES;
  const [type, setType] = useState(initial?.type || defaultType || typeOptions[0].id);
  const [description, setDescription] = useState(initial?.description || "");
  const [client, setClient] = useState(initial?.client || { name: "", phone: "", address: "", contact2Name: "", contact2Phone: "", branchId: "" });
  const [assignedBy, setAssignedBy] = useState(initial?.assignedBy || "");
  const [driver, setDriver] = useState(initial?.driver || "");
  const [zone, setZone] = useState(initial?.zone || "מרכז");
  const [scheduledDate, setScheduledDate] = useState(initial?.scheduledDate || defaultScheduledDate || "");
  const [receivedDate, setReceivedDate] = useState(initial?.receivedDate || isoDate(new Date()));
  const [inProgressDate, setInProgressDate] = useState(initial?.inProgressDate || "");
  const [timeWindow, setTimeWindow] = useState(initial?.timeWindow || "");
  const [callAhead, setCallAhead] = useState(initial?.callAhead || "none");
  const [performedBy, setPerformedBy] = useState(initial?.performedBy || "");
  const [performedByOther, setPerformedByOther] = useState(initial?.performedByOther || "");
  const [carpets, setCarpets] = useState(initial?.carpets?.length ? initial.carpets : (!["general", "branch"].includes(type) ? [newTaskCarpet(type, null)] : []));
  const [error, setError] = useState("");
  const [photos, setPhotos] = useState({ before: [], after: [] });
  const [loadingPhotos, setLoadingPhotos] = useState(true);

  useEffect(() => { let alive = true; loadPhotos(taskIdRef.current).then((p) => { if (alive) { setPhotos(p); setLoadingPhotos(false); } }); return () => { alive = false; }; }, []);
  const handleUploadPhoto = async (files) => {
    const arr = Array.from(files).slice(0, 6 - photos.before.length);
    const compressed = await Promise.all(arr.map((f) => compressImage(f)));
    const next = { ...photos, before: [...photos.before, ...compressed] };
    setPhotos(next); savePhotos(taskIdRef.current, next);
  };
  const removePhotoInForm = (idx) => { const next = { ...photos, before: photos.before.filter((_, i) => i !== idx) }; setPhotos(next); savePhotos(taskIdRef.current, next); };

  const isGeneral = type === "general";
  const isBranch = type === "branch";
  const isCarpetType = !isGeneral && !isBranch;
  const changeType = (t) => { setType(t); if (!["general", "branch"].includes(t) && !initial) setCarpets([newTaskCarpet(t, null)]); };
  const updateCarpet = (idx, updated) => { const next = [...carpets]; next[idx] = updated; setCarpets(next); };
  const pickBranch = (branchId) => setClient({ ...client, branchId, address: BRANCH_ADDRESSES[branchId] || client.address, name: branchLabel(branchId) });

  const handleSubmit = () => {
    if (isBranch) { if (!client.branchId) { setError("נא לבחור סניף"); return; } }
    else if (isGeneral) { if (!client.name.trim()) { setError("נא למלא שם"); return; } }
    else { if (!client.name.trim()) { setError("נא למלא שם לקוח"); return; } if (carpets.length === 0) { setError("נא להוסיף לפחות שטיח אחד"); return; } }
    setError("");
    // מספרים מוקצים כאן, ברגע השמירה בפועל — ולא בזמן פתיחת הטופס/הוספת שורה, כדי שביטול לא "יבזבז" מספרים
    const finalCarpets = (isCarpetType && isAdmin) ? carpets.map((c) => (c.number ? c : { ...c, number: getNextNumber() })) : carpets;
    onSave({
      id: taskIdRef.current, type,
      title: isBranch ? `ביקור בסניף ${branchLabel(client.branchId)}` : isGeneral ? client.name : (client.name || typeMeta(type).label),
      description: (isGeneral || isBranch) ? description : "",
      client, assignedBy, driver, zone, scheduledDate, receivedDate, inProgressDate: isCarpetType ? inProgressDate : "",
      timeWindow: !isBranch ? timeWindow : "", callAhead: !isBranch ? callAhead : "none",
      performedBy: isCarpetType ? performedBy : "", performedByOther: isCarpetType ? performedByOther : "",
      carpets: isCarpetType ? finalCarpets : [],
      status: initial?.status || getStatusFlow(type)[0].id,
      pending: initial?.pending ?? !isAdmin,
      submittedBy: initial?.submittedBy || account?.name || "",
      createdAt: initial?.createdAt || new Date().toISOString(),
      log: initial?.log || [{ ts: new Date().toISOString(), action: "נוצרה משימה", note: "" }],
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-head"><h2>{initial ? "עריכת משימה" : "משימה חדשה"}</h2><button className="icon-btn" onClick={onCancel}><X size={18} /></button></div>
        <div className="modal-body">
          {!initial && typeOptions.length > 1 && <Field label="סוג משימה"><PillGroup options={typeOptions} value={type} onChange={changeType} /></Field>}

          {isBranch ? (
            <>
              <div className="section-title">בחר סניף</div>
              <PillGroup options={BRANCHES} value={client.branchId} onChange={pickBranch} />
              {client.address && <p className="muted small">{client.address}</p>}
              <div className="form-grid" style={{ marginTop: 10 }}>
                <Field label="מי נתן את המשימה"><input value={assignedBy} onChange={(e) => setAssignedBy(e.target.value)} placeholder="שם העובד" /></Field>
              </div>
              <Field label="תיאור / מטרת הביקור (לא חובה)"><textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="פרטים נוספים..." /></Field>
            </>
          ) : isGeneral ? (
            <>
              <div className="section-title">פרטי המשימה</div>
              <div className="form-grid">
                <Field label="שם"><input value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} placeholder="ישראל ישראלי" /></Field>
                <Field label="טלפון"><input type="tel" inputMode="numeric" value={client.phone} onChange={(e) => setClient({ ...client, phone: e.target.value })} placeholder="050-0000000" /></Field>
                <Field label="איש קשר נוסף (לא חובה)"><input value={client.contact2Name} onChange={(e) => setClient({ ...client, contact2Name: e.target.value })} placeholder="שם" /></Field>
                <Field label="טלפון נוסף (לא חובה)"><input type="tel" inputMode="numeric" value={client.contact2Phone} onChange={(e) => setClient({ ...client, contact2Phone: e.target.value })} placeholder="050-0000000" /></Field>
                <Field label="כתובת (לא חובה)"><input value={client.address} onChange={(e) => setClient({ ...client, address: e.target.value })} placeholder="רחוב, עיר" /></Field>
                <Field label="מי נתן את המשימה"><input value={assignedBy} onChange={(e) => setAssignedBy(e.target.value)} placeholder="שם העובד" /></Field>
              </div>
              <Field label="תיאור המשימה"><textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="פרטים נוספים..." /></Field>
            </>
          ) : (
            <>
              <div className="section-title">פרטי לקוח</div>
              <div className="form-grid">
                <Field label="שם לקוח"><input value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} placeholder="ישראל ישראלי" /></Field>
                <Field label="טלפון"><input type="tel" inputMode="numeric" value={client.phone} onChange={(e) => setClient({ ...client, phone: e.target.value })} placeholder="050-0000000" /></Field>
                <Field label="איש קשר נוסף (לא חובה)"><input value={client.contact2Name} onChange={(e) => setClient({ ...client, contact2Name: e.target.value })} placeholder="שם" /></Field>
                <Field label="טלפון נוסף (לא חובה)"><input type="tel" inputMode="numeric" value={client.contact2Phone} onChange={(e) => setClient({ ...client, contact2Phone: e.target.value })} placeholder="050-0000000" /></Field>
                <Field label="כתובת"><input value={client.address} onChange={(e) => setClient({ ...client, address: e.target.value })} placeholder="רחוב, עיר" /></Field>
                <Field label="מי נתן את המשימה"><input value={assignedBy} onChange={(e) => setAssignedBy(e.target.value)} placeholder="שם העובד" /></Field>
              </div>
            </>
          )}

          <Field label="אזור"><PillGroup options={ZONES} value={zone} onChange={setZone} /></Field>

          {isCarpetType && (
            <>
              <div className="section-title">שטיחים ({carpets.length})</div>
              {carpets.map((c, i) => <TaskCarpetRow key={c.id} carpet={c} type={type} index={i} onChange={(u) => updateCarpet(i, u)} onRemove={() => setCarpets(carpets.filter((_, j) => j !== i))} />)}
              <button type="button" className="btn-ghost" onClick={() => setCarpets([...carpets, newTaskCarpet(type, null)])}><Plus size={16} /> הוסף שטיח</button>
            </>
          )}

          <div className="section-title">תמונות</div>
          <PhotoGrid photos={photos.before} onUpload={handleUploadPhoto} onRemove={removePhotoInForm} loading={loadingPhotos} />

          <div className="section-title">תזמון ושיוך</div>
          <div className="form-grid">
            <Field label="תאריך קבלה"><input type="date" value={receivedDate} onChange={(e) => setReceivedDate(e.target.value)} /></Field>
            {isCarpetType && <Field label="תאריך תחילת טיפול (לא חובה)"><input type="date" value={inProgressDate} onChange={(e) => setInProgressDate(e.target.value)} /></Field>}
            <Field label="תאריך מתוכנן (מסירה/משלוח)"><input type="date" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} /></Field>
            <Field label="נהג משויך (לא חובה)">
              <select value={driver} onChange={(e) => setDriver(e.target.value)}>
                <option value="">— ללא שיוך —</option>
                {driverNames && driverNames.map((n) => <option key={n} value={n}>{n}</option>)}
                {driver && driverNames && !driverNames.includes(driver) && <option value={driver}>{driver} (לא במערכת)</option>}
              </select>
            </Field>
          </div>

          {!isBranch && (
            <>
              <div className="form-grid">
                <Field label="שעה שסוכמה עם הלקוח (לא חובה)"><input value={timeWindow} onChange={(e) => setTimeWindow(e.target.value)} placeholder="לדוגמה: 14:00-15:00" /></Field>
              </div>
              <Field label="להתקשר מראש?"><PillGroup options={CALL_AHEAD_OPTIONS} value={callAhead} onChange={setCallAhead} size="sm" /></Field>
            </>
          )}

          {isCarpetType && (
            <>
              <Field label="לביצוע אצל (לא חובה)"><PillGroup options={PERFORMER_OPTIONS.map((p) => ({ id: p, label: p }))} value={performedBy} onChange={setPerformedBy} size="sm" /></Field>
              {performedBy === "אחר" && <Field label="פירוט"><input value={performedByOther} onChange={(e) => setPerformedByOther(e.target.value)} placeholder="שם" /></Field>}
            </>
          )}

          {!isAdmin && !initial && <p className="muted small">המשימה תישלח לאישור מחסן לפני שתופיע ברשימה הראשית{isCarpetType ? " ומספר יוקצה עם האישור." : "."}</p>}
          {error && <div className="error-box"><AlertCircle size={15} /> {error}</div>}
        </div>
        <div className="modal-foot"><button className="btn-ghost" onClick={onCancel}>ביטול</button><button className="btn-primary" onClick={handleSubmit}><Save size={16} /> שמירה</button></div>
      </div>
    </div>
  );
}

/* ============================= פרטי משימה ============================= */

function TaskDetail({ task, onClose, onUpdate, driverNames }) {
  const [photos, setPhotos] = useState({ before: [], after: [] });
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [noteDraft, setNoteDraft] = useState("");
  const [driverDraft, setDriverDraft] = useState(task.driver || "");
  const [timeWindowDraft, setTimeWindowDraft] = useState(task.timeWindow || "");
  const [performedByOtherDraft, setPerformedByOtherDraft] = useState(task.performedByOther || "");

  useEffect(() => { let alive = true; loadPhotos(task.id).then((p) => { if (alive) { setPhotos(p); setLoadingPhotos(false); } }); return () => { alive = false; }; }, [task.id]);

  const handleUpload = async (side, files) => {
    const arr = Array.from(files).slice(0, 6 - photos[side].length);
    const compressed = await Promise.all(arr.map((f) => compressImage(f)));
    const next = { ...photos, [side]: [...photos[side], ...compressed] };
    setPhotos(next); savePhotos(task.id, next);
  };
  const removePhoto = (side, idx) => { const next = { ...photos, [side]: photos[side].filter((_, i) => i !== idx) }; setPhotos(next); savePhotos(task.id, next); };
  const advanceStatus = (statusId) => {
    if (statusId === "ממשיך לתיקון" && task.type === "cleaning") {
      const repairsBlank = {}; ALL_REPAIR_SVCS.forEach((s) => (repairsBlank[s.id] = false));
      const carpets = task.carpets.map((c) => ({ ...c, repairs: c.repairs || repairsBlank }));
      onUpdate({ ...task, type: "repair", status: "לפני תיקון", carpets, log: [...task.log, { ts: new Date().toISOString(), action: "הועבר מניקוי לתיקון", note: noteDraft }] });
      setNoteDraft(""); return;
    }
    if (statusId === "ממשיך לניקוי" && task.type === "repair") {
      const carpets = task.carpets.map((c) => ({ ...c, cleanType: c.cleanType || "machine", extras: c.extras || { urine: false, stain: false, flood: false, hardstain: false } }));
      onUpdate({ ...task, type: "cleaning", status: "לפני ניקוי", carpets, log: [...task.log, { ts: new Date().toISOString(), action: "הועבר מתיקון לניקוי", note: noteDraft }] });
      setNoteDraft(""); return;
    }
    const log = [...task.log, { ts: new Date().toISOString(), action: `סטטוס עודכן ל-${statusMeta(statusId).label}`, note: noteDraft }];
    const autoInProgress = (["בטיפול", "בניקוי", "בתיקון"].includes(statusId) && !task.inProgressDate) ? isoDate(new Date()) : task.inProgressDate;
    onUpdate({ ...task, status: statusId, inProgressDate: autoInProgress, log }); setNoteDraft("");
  };
  const saveDriver = () => {
    if (driverDraft === (task.driver || "")) return;
    const log = [...task.log, { ts: new Date().toISOString(), action: "נהג שויך", note: driverDraft || "בוטל שיוך" }];
    onUpdate({ ...task, driver: driverDraft, log });
  };
  const saveTimeWindow = () => {
    if (timeWindowDraft === (task.timeWindow || "")) return;
    onUpdate({ ...task, timeWindow: timeWindowDraft, log: [...task.log, { ts: new Date().toISOString(), action: "שעה שסוכמה עודכנה", note: timeWindowDraft }] });
  };
  const setCallAhead = (val) => onUpdate({ ...task, callAhead: val, log: [...task.log, { ts: new Date().toISOString(), action: "עודכן: להתקשר מראש", note: CALL_AHEAD_OPTIONS.find(o=>o.id===val)?.label || val }] });
  const setPerformedBy = (val) => onUpdate({ ...task, performedBy: val, log: [...task.log, { ts: new Date().toISOString(), action: "עודכן: לביצוע אצל", note: val }] });
  const savePerformedByOther = () => {
    if (performedByOtherDraft === (task.performedByOther || "")) return;
    onUpdate({ ...task, performedByOther: performedByOtherDraft, log: [...task.log, { ts: new Date().toISOString(), action: "עודכן: פירוט לביצוע אצל", note: performedByOtherDraft }] });
  };

  const wazeLink = task.client?.address ? `https://waze.com/ul?q=${encodeURIComponent(task.client.address)}&navigate=yes` : null;
  const isGeneral = task.type === "general";
  const isBranch = task.type === "branch";
  const tMeta = typeMeta(task.type);

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-head"><h2>{(isGeneral || isBranch) ? task.title : task.client.name}</h2><button className="icon-btn" onClick={onClose}><X size={18} /></button></div>
        <div className="modal-body">
          <div className="detail-top">
            <Chip color={tMeta.color}>{tMeta.label}</Chip>
            <Chip color={ZONES.find(z=>z.id===task.zone)?.color}>{task.zone}</Chip>
            <Chip color={statusMeta(task.status).color}>{statusMeta(task.status).label}</Chip>
          </div>

          <div className="detail-info">
            {task.client?.phone && <div><Phone size={14}/> {task.client.phone}</div>}
            {task.client?.contact2Name && <div><User size={14}/> {task.client.contact2Name}{task.client.contact2Phone ? ` · ${task.client.contact2Phone}` : ""}</div>}
            {task.client?.address && <div><MapPin size={14}/> {task.client.address}</div>}
            <div><User size={14}/> נמסר ע״י: {task.assignedBy || "—"}</div>
            {wazeLink && <a className="waze-link" href={wazeLink} target="_blank" rel="noreferrer"><Truck size={14}/> ניווט ב-Waze</a>}
          </div>

          {(isGeneral || isBranch) && task.description && <><div className="section-title">תיאור</div><p className="task-description">{task.description}</p></>}

          {!isBranch && (
            <>
              <div className="section-title">סטטוס</div>
              <div className="status-buttons">
                {getStatusFlow(task.type).map((s) => (
                  <button key={s.id} className={"status-btn" + (task.status === s.id ? " active" : "")}
                    style={{ borderColor: s.color, color: task.status === s.id ? "#fff" : s.color, background: task.status === s.id ? s.color : "transparent" }}
                    onClick={() => advanceStatus(s.id)}>{s.label}</button>
                ))}
              </div>
              <input className="note-input" placeholder="הערה לעדכון הסטטוס (לא חובה)" value={noteDraft} onChange={(e) => setNoteDraft(e.target.value)} />
            </>
          )}

          {!isGeneral && !isBranch && (
            <>
              <div className="section-title">שטיחים ({task.carpets.length})</div>
              {task.carpets.map((c, i) => (
                <div key={c.id} className="carpet-summary-block">
                  <div className="carpet-summary-head">{c.number ? `#${c.number} · ` : ""}{c.name || `שטיח ${i+1}`} {carpetSizeLabel(c) && <span className="muted">· {carpetSizeLabel(c)}</span>}{task.type === "cleaning" && <span className="muted"> · {C_TYPES.find(t=>t.id===c.cleanType)?.name}</span>}</div>
                  {task.type === "cleaning" && (
                    <div className="muted small">{C_SVCS.filter(s=>c.extras[s.id]).map(s=>s.name).join(", ") || "ללא שירותים נוספים"}</div>
                  )}
                  {task.type === "repair" && (
                    <div className="muted small">{ALL_REPAIR_SVCS.filter(s=>c.repairs[s.id]).map(s=>s.name).join(", ") || "לא נבחרו שירותים"}</div>
                  )}
                  {c.notes && <div className="muted small">הערה: {c.notes}</div>}
                </div>
              ))}
            </>
          )}

          <div className="section-title">תמונות</div>
          <PhotoGrid photos={photos.before} onUpload={(f) => handleUpload("before", f)} onRemove={(i) => removePhoto("before", i)} loading={loadingPhotos} />

          <div className="section-title">תזמון ושיוך</div>
          <div className="form-grid">
            <Field label="תאריך קבלה"><input type="date" value={task.receivedDate || ""} onChange={(e) => onUpdate({ ...task, receivedDate: e.target.value, log: [...task.log, { ts: new Date().toISOString(), action: "תאריך קבלה עודכן", note: e.target.value }] })} /></Field>
            {!isGeneral && !isBranch && <Field label="תאריך תחילת טיפול"><input type="date" value={task.inProgressDate || ""} onChange={(e) => onUpdate({ ...task, inProgressDate: e.target.value, log: [...task.log, { ts: new Date().toISOString(), action: "תאריך תחילת טיפול עודכן", note: e.target.value }] })} /></Field>}
            <Field label="תאריך מתוכנן (מסירה/משלוח)">
              <div className="detail-date-row">
                <input type="date" value={task.scheduledDate || ""} onChange={(e) => onUpdate({ ...task, scheduledDate: e.target.value, log: [...task.log, { ts: new Date().toISOString(), action: "תאריך עודכן", note: e.target.value || "בוטל תזמון" }] })} />
                {task.scheduledDate && <button className="icon-btn" title="הסר תזמון" onClick={() => onUpdate({ ...task, scheduledDate: "", log: [...task.log, { ts: new Date().toISOString(), action: "תזמון הוסר", note: "" }] })}><X size={14}/></button>}
              </div>
            </Field>
            <Field label="נהג משויך">
              <select value={driverDraft} onChange={(e) => { setDriverDraft(e.target.value); const log = [...task.log, { ts: new Date().toISOString(), action: "נהג שויך", note: e.target.value || "בוטל שיוך" }]; onUpdate({ ...task, driver: e.target.value, log }); }}>
                <option value="">— ללא שיוך —</option>
                {driverNames && driverNames.map((n) => <option key={n} value={n}>{n}</option>)}
                {driverDraft && driverNames && !driverNames.includes(driverDraft) && <option value={driverDraft}>{driverDraft} (לא במערכת)</option>}
              </select>
            </Field>
            {!isBranch && <Field label="שעה שסוכמה עם הלקוח"><input value={timeWindowDraft} onChange={(e) => setTimeWindowDraft(e.target.value)} onBlur={saveTimeWindow} placeholder="לדוגמה: 14:00-15:00" /></Field>}
          </div>

          {!isBranch && <Field label="להתקשר מראש?"><PillGroup options={CALL_AHEAD_OPTIONS} value={task.callAhead || "none"} onChange={setCallAhead} size="sm" /></Field>}

          {!isGeneral && !isBranch && (
            <>
              <Field label="לביצוע אצל"><PillGroup options={PERFORMER_OPTIONS.map((p) => ({ id: p, label: p }))} value={task.performedBy || ""} onChange={setPerformedBy} size="sm" /></Field>
              {task.performedBy === "אחר" && <Field label="פירוט"><input value={performedByOtherDraft} onChange={(e) => setPerformedByOtherDraft(e.target.value)} onBlur={savePerformedByOther} placeholder="שם" /></Field>}
            </>
          )}

          <div className="section-title">יומן פעולות</div>
          <div className="log-list">
            {[...task.log].reverse().map((l, i) => (
              <div key={i} className="log-item"><Clock size={13} className="muted" /><div><div className="log-action">{l.action}</div>{l.note && <div className="log-note">{l.note}</div>}<div className="log-ts muted">{fmtDate(l.ts)}</div></div></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PhotoGrid({ photos, onUpload, onRemove, loading }) {
  return (
    <div className="photo-grid">
      {loading ? <span className="muted">טוען...</span> : photos.map((src, i) => (
        <div key={i} className="photo-thumb"><img src={src} alt="" /><button className="photo-remove" onClick={() => onRemove(i)}><X size={12} /></button></div>
      ))}
      {!loading && photos.length < 6 && <label className="photo-add"><Camera size={18} /><input type="file" accept="image/*" multiple hidden onChange={(e) => e.target.files.length && onUpload(e.target.files)} /></label>}
    </div>
  );
}

/* ============================= רשימת משימות ============================= */

function parseTimeDisplay(tw) {
  if (!tw) return null;
  const parts = tw.split(/[-–—]/).map((s) => s.trim()).filter(Boolean);
  if (parts.length === 2) return { type: "range", from: parts[0], to: parts[1] };
  return { type: "single", value: tw };
}

function TaskCard({ task, onOpen, quickAssignDate, onQuickAssign, showDriverControls, driverNames, onAssignDriver, onRemoveFromDay }) {
  const zoneColor = ZONES.find((z) => z.id === task.zone)?.color;
  const status = statusMeta(task.status);
  const isGeneral = task.type === "general";
  const isBranch = task.type === "branch";
  const tMeta = typeMeta(task.type);
  const TIcon = tMeta.icon;
  const firstCarpet = (!isGeneral && !isBranch) ? task.carpets[0] : null;
  const firstSize = firstCarpet ? carpetSizeLabel(firstCarpet) : null;
  const timeInfo = parseTimeDisplay(task.timeWindow);

  return (
    <div className="task-card" style={{ "--zone-color": zoneColor }} onClick={onOpen}>
      <div className="time-col">
        {timeInfo?.type === "range" ? (
          <span className="time range"><span>{timeInfo.from}</span><i></i><span>{timeInfo.to}</span></span>
        ) : timeInfo?.type === "single" ? (
          <span className="time">{timeInfo.value}</span>
        ) : (
          <span className="time empty">—</span>
        )}
        <span className="type-icon" style={{ background: tMeta.color + "1a", color: tMeta.color }}><TIcon size={13}/></span>
      </div>

      <div className="body-col">
        <div className="body-top">
          <span className="name">{isGeneral && task.number ? `#${task.number} · ` : ""}{(isGeneral || isBranch) ? task.title : task.client.name}</span>
          <span className="badge-group">
            <span className="zone-badge" style={{ background: zoneColor + "1a", color: zoneColor }}>{task.zone}</span>
            {!isBranch && <span className="status-badge" style={{ background: status.color + "1a", color: status.color }}>{status.label}</span>}
            {quickAssignDate && onQuickAssign && (
              task.scheduledDate === quickAssignDate ? (
                <button className="quick-assign-btn already" onClick={(e) => { e.stopPropagation(); onQuickAssign(task.id); }}>
                  <CheckCircle2 size={11}/> כבר בלו״ז {fmtDateOnly(quickAssignDate)}
                </button>
              ) : (
                <button className="quick-assign-btn" onClick={(e) => { e.stopPropagation(); onQuickAssign(task.id); }}>
                  <Plus size={11}/> הוסף ללו״ז {fmtDateOnly(quickAssignDate)}
                </button>
              )
            )}
            {showDriverControls && (
              <span className="inline-driver-controls desktop-only">
                {onAssignDriver && (
                  <select value={task.driver || ""} onClick={(e) => e.stopPropagation()} onChange={(e) => { e.stopPropagation(); onAssignDriver(e.target.value); }}>
                    <option value="">— ללא שיוך —</option>
                    {driverNames && driverNames.map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                )}
                {onRemoveFromDay && <button className="remove-day-btn" onClick={(e) => { e.stopPropagation(); onRemoveFromDay(); }} aria-label="הסר מהיום" title="הסר מהיום"><X size={13}/></button>}
              </span>
            )}
          </span>
        </div>

        {isGeneral && task.client?.name && task.client.name !== task.title && <div className="addr"><User size={12} style={{ display: "inline", verticalAlign: "-2px" }}/> {task.client.name}</div>}
        {task.client?.address && <div className="addr"><MapPin size={12} style={{ display: "inline", verticalAlign: "-2px" }}/> {task.client.address}</div>}

        <div className="facts">
          {task.client?.phone && <span className="fact"><span className="lbl">טלפון</span><b>{task.client.phone}</b></span>}
          {task.client?.contact2Name && <span className="fact"><span className="lbl">{task.client.contact2Name}</span><b>{task.client.contact2Phone || ""}</b></span>}
          {firstCarpet && <span className="fact"><span className="lbl">{tMeta.label}</span><b>{firstCarpet.number ? `#${firstCarpet.number}` : "ללא מספר"}{firstCarpet.name ? ` ${firstCarpet.name}` : ""}{firstSize ? ` · ${firstSize}` : ""}{task.carpets.length > 1 ? ` +${task.carpets.length - 1}` : ""}</b></span>}
          {!isGeneral && !isBranch && task.performedBy && <span className="fact"><span className="lbl">לביצוע אצל</span><b>{task.performedBy === "אחר" ? (task.performedByOther || "אחר") : task.performedBy}</b></span>}
          {task.driver && <span className="fact"><span className="lbl">נהג</span><b>{task.driver}</b></span>}
          {task.assignedBy && <span className="fact"><span className="lbl">סוכן</span><b>{task.assignedBy}</b></span>}
          {task.receivedDate && <span className="fact"><span className="lbl">התקבל</span><b>{fmtDateOnly(task.receivedDate)}</b></span>}
          {!isGeneral && !isBranch && task.inProgressDate && <span className="fact"><span className="lbl">בטיפול מ</span><b>{fmtDateOnly(task.inProgressDate)}</b></span>}
          {task.scheduledDate && <span className="fact"><span className="lbl">מתוזמן</span><b>{fmtDateOnly(task.scheduledDate)}</b></span>}
          {task.callAhead && task.callAhead !== "none" && <span className="fact"><span className="lbl">התקשרות</span><b>{CALL_AHEAD_OPTIONS.find((o) => o.id === task.callAhead)?.label}</b></span>}
          {task.pending && <span className="fact"><b style={{ color: "#B8862F" }}>ממתין לאישור</b></span>}
        </div>

        {task.description && <div className="desc">{task.description}</div>}
        {task.rejected && <div className="reject-note">נדחה ע״י מחסן: {task.rejectionReason || "—"}</div>}
      </div>
    </div>
  );
}

function CarpetIntakeTab({ tasks, updateTasks }) {
  const [numbers, setNumbers] = useState([]);
  const [buffer, setBuffer] = useState("");
  const [result, setResult] = useState(null);

  const commit = (digits, list) => (digits && !list.includes(digits)) ? [...list, digits] : list;

  // מספרי שטיחים הם תמיד 4 ספרות — ברגע שהוקלדו 4 ספרות הן הופכות לתגית אוטומטית.
  const handleInputChange = (e) => {
    const digitsOnly = e.target.value.replace(/[^0-9]/g, "");
    if (digitsOnly.length >= 4) {
      setNumbers((prev) => commit(digitsOnly.slice(0, 4), prev));
      setBuffer(digitsOnly.slice(4));
    } else {
      setBuffer(digitsOnly);
    }
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData("text");
    if (!/[\n,]/.test(text)) return; // הדבקה של מספר בודד — תתנהג כרגיל
    e.preventDefault();
    const parsed = [...new Set(text.split(/\r?\n|,/).map((s) => s.trim().replace(/[^0-9]/g, "")).filter(Boolean))];
    setNumbers((prev) => [...new Set([...prev, ...parsed])]);
    setBuffer("");
  };

  const removeNumber = (n) => setNumbers(numbers.filter((x) => x !== n));

  const isMatch = (n) => tasks.some((t) => (t.type === "cleaning" || t.type === "repair") && (t.carpets || []).some((c) => c.number && String(c.number) === n));

  const process = () => {
    const list = buffer ? commit(buffer, numbers) : numbers;
    if (list.length === 0) return;
    const matchedTasks = [];
    const matchedNumbers = new Set();
    const next = tasks.map((t) => {
      if (t.type !== "cleaning" && t.type !== "repair") return t;
      const hasMatch = (t.carpets || []).some((c) => c.number && list.includes(String(c.number)));
      if (!hasMatch) return t;
      (t.carpets || []).forEach((c) => { if (c.number && list.includes(String(c.number))) matchedNumbers.add(String(c.number)); });
      const newStatus = t.type === "cleaning" ? "לפני האספקה" : "לפני אספקה";
      const updated = { ...t, status: newStatus, log: [...t.log, { ts: new Date().toISOString(), action: "התקבלו שטיחים — עודכן ל" + newStatus, note: "" }] };
      matchedTasks.push(updated);
      return updated;
    });
    const notFound = list.filter((n) => !matchedNumbers.has(n));
    if (matchedTasks.length > 0) updateTasks(next);
    setResult({ matchedTasks, notFound });
    setNumbers([]);
    setBuffer("");
  };

  return (
    <div>
      <p className="muted small" style={{ marginBottom: 12 }}>הקלידו/הדביקו מספרי הזמנה שהתקבלו במחסן — כל מספר בן 4 ספרות הופך אוטומטית לתגית. כל משימת ניקוי/תיקון עם מספר תואם תעודכן ל"לפני אספקה" בלחיצת הכפתור.</p>

      <div className="intake-box">
        <input inputMode="numeric" pattern="[0-9]*" value={buffer} onChange={handleInputChange} onPaste={handlePaste} placeholder="הקלידו או הדביקו מספרים..." className="intake-input" />
        {numbers.length > 0 && (
          <>
            <div className="intake-count">הוזנו {numbers.length} מספרים</div>
            <div className="intake-chips">
              {numbers.map((n) => {
                const matched = isMatch(n);
                return (
                  <span key={n} className={"intake-chip " + (matched ? "matched" : "unmatched")} onClick={() => removeNumber(n)} title="לחצו להסרה">
                    {matched ? <CheckCircle2 size={13}/> : <AlertCircle size={13}/>}
                    {n}
                  </span>
                );
              })}
            </div>
          </>
        )}
        <button className="btn-primary" style={{ marginTop: 14 }} onClick={process} disabled={numbers.length === 0 && !buffer}><CheckCircle2 size={16}/> אשר קליטה</button>
      </div>

      {result && (
        <>
          <div className="intake-stats">
            <div className="intake-stat success"><div className="intake-stat-num">{result.matchedTasks.length}</div><div className="intake-stat-lbl">משימות עודכנו</div></div>
            {result.notFound.length > 0 && <div className="intake-stat danger"><div className="intake-stat-num">{result.notFound.length}</div><div className="intake-stat-lbl">לא נמצא</div></div>}
          </div>
          {result.notFound.length > 0 && <p className="muted small" style={{ marginTop: 8 }}>לא נמצאו: {result.notFound.join(", ")}</p>}
          {result.matchedTasks.length > 0 && (
            <>
              <div className="section-title">משימות שעודכנו</div>
              <div className="task-list">{result.matchedTasks.map((t) => <TaskCard key={t.id} task={t} onOpen={() => {}} />)}</div>
            </>
          )}
        </>
      )}
    </div>
  );
}

function TasksTab({ tasks, updateTasks, scope, getNextNumber, assignMode, onAssignPick, onCancelAssign, account, driverNames, quickAssignDate, onQuickAssign }) {
  const scopeTypes = scope === "general" ? ["general"] : ["cleaning", "repair"].filter((t) => opsTypeAllowed(account, t));
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [openTaskId, setOpenTaskId] = useState(null);
  const [filterZone, setFilterZone] = useState([]);
  const [filterStatus, setFilterStatus] = useState([]);
  const [filterType, setFilterType] = useState(scopeTypes[0] || "cleaning");

  const visible = tasks.filter((t) => canSeeTask(t, account));
  const scoped = visible.filter((t) => scopeTypes.includes(t.type) && (scopeTypes.length <= 1 || t.type === filterType));
  const filtered = scoped.filter((t) =>
    (filterZone.length === 0 || filterZone.includes(t.zone)) && (filterStatus.length === 0 || filterStatus.includes(t.status)) &&
    (!assignMode || t.scheduledDate !== assignMode.date)
  ).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  const openCount = scoped.filter((t) => (filterZone.length === 0 || filterZone.includes(t.zone)) && !["הסתיים", "בוטל"].includes(t.status) && !t.pending).length;
  const createTypes = scope === "general" ? ["general"] : scopeTypes;
  const statusOptionsForFilter = scope === "general" ? STATUS_FLOW_GENERAL : getStatusFlow(filterType);

  const openTask = tasks.find(t => t.id === openTaskId) || null;

  const handleSave = (task) => {
    const exists = tasks.some((t) => t.id === task.id);
    updateTasks(exists ? tasks.map((t) => (t.id === task.id ? task : t)) : [...tasks, task]);
    setShowForm(false); setEditing(null);
  };
  const handleUpdate = (task) => updateTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  const handleDelete = (id) => { updateTasks(tasks.filter((t) => t.id !== id)); setOpenTaskId(null); };

  return (
    <div>
      {assignMode && (
        <div className="assign-banner">
          <span>בחרו משימה לשיוך ליום {assignMode.date}</span>
          <button className="btn-ghost small" onClick={onCancelAssign}>ביטול</button>
        </div>
      )}

      {scopeTypes.length > 1 && (
        <PillGroup
          options={TASK_TYPES.filter((t) => scopeTypes.includes(t.id))}
          value={filterType}
          onChange={setFilterType}
        />
      )}

      <div className="stats-row">
        <div className="stat-card accent"><div className="stat-num">{openCount}</div><div className="stat-lbl">משימות פתוחות</div></div>
      </div>

      <div className="filter-pair">
        <div>
          <div className="filter-label">אזור</div>
          <PillGroup options={ZONES} value={filterZone} onChange={setFilterZone} size="sm" multi />
        </div>
        <div>
          <div className="filter-label">סטטוס</div>
          <PillGroup options={statusOptionsForFilter} value={filterStatus} onChange={setFilterStatus} size="sm" multi />
        </div>
      </div>
      {(filterZone.length > 0 || filterStatus.length > 0) && <button className="btn-ghost small" onClick={() => { setFilterZone([]); setFilterStatus([]); }}>נקה סינון</button>}

      <div className="toolbar" style={{ marginTop: 4 }}>
        {!assignMode && <button className="btn-primary" onClick={() => { setEditing(null); setShowForm(true); }}><Plus size={16} /> משימה חדשה</button>}
        <span />
      </div>

      {filtered.length === 0 && <div className="empty-state"><ClipboardList size={28} className="muted" /><p>אין משימות להצגה. לחצו על "משימה חדשה" כדי להתחיל.</p></div>}

      <div className="task-list">{filtered.map((t) => <TaskCard key={t.id} task={t} onOpen={() => assignMode ? onAssignPick(t.id) : setOpenTaskId(t.id)} quickAssignDate={!assignMode ? quickAssignDate : null} onQuickAssign={onQuickAssign} />)}</div>

      {showForm && <TaskForm initial={editing} allowedTypes={createTypes} defaultType={createTypes[0]} getNextNumber={getNextNumber} account={account} driverNames={driverNames} onSave={handleSave} onCancel={() => { setShowForm(false); setEditing(null); }} />}

      {openTask && !assignMode && (
        <>
          <TaskDetail task={openTask} onClose={() => setOpenTaskId(null)} onUpdate={handleUpdate} driverNames={driverNames} />
          <div className="detail-actions-float">
            <button className="btn-ghost small" onClick={() => { setEditing(openTask); setShowForm(true); setOpenTaskId(null); }}><Edit2 size={14}/> עריכה</button>
            <button className="btn-ghost small danger" onClick={() => handleDelete(openTask.id)}><Trash2 size={14}/> מחיקה</button>
          </div>
        </>
      )}
    </div>
  );
}

/* ============================= המחשבון האמיתי ============================= */

function newCalcCleaningCarpet() { return { id: uid(), type: "machine", length: "", width: "", svcs: { urine: false, stain: false, flood: false, hardstain: false } }; }
function newCalcRepairCarpet() {
  const svcs = {};
  R_CATS.forEach((cat) => cat.svcs.forEach((s) => { svcs[s.id] = { checked: false, sides: { A: true, B: true, C: false, D: false } }; }));
  return { id: uid(), length: "", width: "", svcs };
}

function calcCleaningSubtotal(c, config) {
  const sqm = sqmBilled(c.width, c.length, config.general.minSide);
  let sub = sqm * (config.cleaningPrices[c.type] || 0);
  if (c.svcs.urine) sub += sqm * config.cleaningPrices.urine;
  if (c.svcs.stain) sub += config.cleaningPrices.stain;
  if (c.svcs.flood) sub += sqm * config.cleaningPrices.flood;
  if (c.svcs.hardstain) sub += config.cleaningPrices.hardstain;
  return sub;
}
function calcRepairSubtotal(c, config) {
  const sqm = sqmBilled(c.width, c.length, config.general.minSide);
  const l = Number(c.length) || 0, w = Number(c.width) || 0;
  const longM = Math.max(l, w) / 100, shortM = Math.min(l, w) / 100;
  let sub = 0;
  R_CATS.forEach((cat) => cat.svcs.forEach((s) => {
    const state = c.svcs[s.id]; if (!state?.checked) return;
    const price = config.repairPrices[s.id] || 0;
    const billing = s.billing || cat.billing;
    if (s.fixed) { sub += price; return; }
    if (billing === "sqm") { sub += sqm * price; return; }
    let meters = 0;
    if (state.sides.A) meters += longM; if (state.sides.B) meters += longM;
    if (state.sides.C) meters += shortM; if (state.sides.D) meters += shortM;
    sub += meters * price;
  }));
  return sub;
}

function CleaningCard({ carpet, index, config, onChange, onRemove }) {
  const set = (patch) => onChange({ ...carpet, ...patch });
  const sub = calcCleaningSubtotal(carpet, config);
  const real = sqmReal(carpet.width, carpet.length);
  const billed = sqmBilled(carpet.width, carpet.length, config.general.minSide);
  return (
    <div className="calc-card">
      <div className="calc-card-head"><span className="calc-num">שטיח מס׳ {index + 1}</span>{index > 0 && <button className="remove-btn" onClick={onRemove}>✕</button>}</div>
      <div className="calc-dims-row">
        <div className="calc-dims-inputs">
          <div className="calc-field"><label>אורך (ס״מ)</label><input type="number" min="0" placeholder="200" value={carpet.length} onChange={(e) => set({ length: e.target.value })} /></div>
          <div className="calc-field"><label>רוחב (ס״מ)</label><input type="number" min="0" placeholder="150" value={carpet.width} onChange={(e) => set({ width: e.target.value })} /></div>
          <div className="calc-area-info"><span className="calc-area-lbl">שטח בפועל</span><span className="calc-area-val">{real.toFixed(2)} מ״ר</span></div>
        </div>
      </div>
      {billed !== real && real > 0 && <div className="calc-bill-note">* חיוב לפי מינימום {config.general.minSide} ס״מ לכל צלע</div>}
      <div className="calc-type-grid">
        {C_TYPES.map((t) => (
          <label key={t.id} className={"calc-type-opt" + (carpet.type === t.id ? " checked" : "")}>
            <input type="radio" checked={carpet.type === t.id} onChange={() => set({ type: t.id })} />
            <span className="calc-type-name">{t.name}</span><span className="calc-type-price">₪{config.cleaningPrices[t.id]}/מ״ר</span>
          </label>
        ))}
      </div>
      <p className="calc-services-title">שירותים נוספים לניקוי</p>
      <div className="calc-services-grid">
        {C_SVCS.map((s) => (
          <label key={s.id} className={"calc-svc-opt" + (carpet.svcs[s.id] ? " checked" : "")}>
            <input type="checkbox" checked={carpet.svcs[s.id]} onChange={(e) => set({ svcs: { ...carpet.svcs, [s.id]: e.target.checked } })} />
            <span className="calc-chk">✓</span>
            <span><span className="calc-svc-name">{s.name}</span><span className="calc-svc-price">{s.fixed ? `₪${config.cleaningPrices[s.id]} סה״כ` : `₪${config.cleaningPrices[s.id]}/מ״ר`}</span></span>
          </label>
        ))}
      </div>
      <div className="calc-subtotal"><span>עלות שטיח זה</span><span className="calc-subtotal-amt">{ils(sub)}</span></div>
    </div>
  );
}

function RepairCard({ carpet, index, config, onChange, onRemove }) {
  const set = (patch) => onChange({ ...carpet, ...patch });
  const sub = calcRepairSubtotal(carpet, config);
  const l = Number(carpet.length) || 0, w = Number(carpet.width) || 0;
  const longM = (Math.max(l, w) / 100).toFixed(2), shortM = (Math.min(l, w) / 100).toFixed(2);

  return (
    <div className="calc-card">
      <div className="calc-card-head"><span className="calc-num">שטיח תיקון מס׳ {index + 1}</span>{index > 0 && <button className="remove-btn" onClick={onRemove}>✕</button>}</div>
      <div className="calc-dims-inputs">
        <div className="calc-field"><label>אורך (ס״מ)</label><input type="number" min="0" placeholder="200" value={carpet.length} onChange={(e) => set({ length: e.target.value })} /></div>
        <div className="calc-field"><label>רוחב (ס״מ)</label><input type="number" min="0" placeholder="150" value={carpet.width} onChange={(e) => set({ width: e.target.value })} /></div>
      </div>
      <div className="repair-services">
        {R_CATS.map((cat) => (
          <div key={cat.cat}>
            <div className="calc-rsvc-category">{cat.cat}</div>
            {cat.svcs.map((s) => {
              const billing = s.billing || cat.billing;
              const price = config.repairPrices[s.id] || 0;
              const state = carpet.svcs[s.id];
              const priceLabel = s.fixed ? `₪${price} לאיחוד` : billing === "sqm" ? `₪${price}/מ״ר` : `₪${price}/מ׳`;
              return (
                <div key={s.id}>
                  <label className={"calc-rsvc-opt" + (state.checked ? " checked" : "")}>
                    <span className="calc-rsvc-left"><span className="calc-rsvc-check">✓</span><input type="checkbox" checked={state.checked} onChange={(e) => set({ svcs: { ...carpet.svcs, [s.id]: { ...state, checked: e.target.checked } } })} /><span>{s.name}</span></span>
                    <span className="calc-rsvc-badge">{priceLabel}</span>
                  </label>
                  {state.checked && billing !== "sqm" && !s.fixed && (
                    <div className="calc-side-selector">
                      <div className="calc-side-title">בחר צלעות לעיבוד</div>
                      <div className={"calc-sides-grid" + (billing === "sides2long" ? " two" : "")}>
                        {(billing === "sides2long"
                          ? [{ k: "A", label: "צלע ארוכה 1", m: longM }, { k: "B", label: "צלע ארוכה 2", m: longM }]
                          : [{ k: "A", label: "צלע ארוכה 1", m: longM }, { k: "B", label: "צלע ארוכה 2", m: longM }, { k: "C", label: "צלע קצרה 1", m: shortM }, { k: "D", label: "צלע קצרה 2", m: shortM }]
                        ).map((sd) => (
                          <div key={sd.k} className={"calc-side-btn" + (state.sides[sd.k] ? " active" : "")} onClick={() => set({ svcs: { ...carpet.svcs, [s.id]: { ...state, sides: { ...state.sides, [sd.k]: !state.sides[sd.k] } } } })}>
                            {sd.label}<span className="calc-side-m">{sd.m} מ׳</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="calc-subtotal"><span>עלות שטיח זה</span><span className="calc-subtotal-amt">{ils(sub)}</span></div>
    </div>
  );
}

const CALCULATOR_HTML_B64 = "PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImhlIiBkaXI9InJ0bCI+CjxoZWFkPgo8bWV0YSBjaGFyc2V0PSJVVEYtOCI+CjxsaW5rIHJlbD0iaWNvbiIgdHlwZT0iaW1hZ2Uvd2VicCIgaHJlZj0iZGF0YTppbWFnZS93ZWJwO2Jhc2U2NCxVa2xHUmxBUkFBQlhSVUpRVmxBNFdBb0FBQUFRQUFBQUt3RUFod0FBUVV4UVNMOE9BQUFCdDhlZ2JTUkg1L0NIZmUwTGdJakk0ZTBnYTU3bUxyTEpuRGZ5RjNqRHR1MlFYbXZiMXJnelpwTGhrWkVldG0zYnRtM2J0bTNidG0zYkhqM3NNVG81LzQvUjNWVjFubFdwYS82TTZMOUVTWkxydHRrU0V3aCt6YTVJNEE2ZkFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQXpMSGJSUDlIYWZkdzV3NlQxVTRXZ3lzY3hOUnJsMHY5WUFqaG56dDNySmVKOVQrNXFycVdYZ2hIbEFrOU1vUVFRZ2p0dTdlYXBDNUdhejRmd3F0SitNNTR2SXhGNitnUXd0M0R5MHRrK3hCQ3o4U2ZkMnhSQnorKzl0TmRHVXlWQUhEV0VIN1lKTG1wbGJzOGZiWmdhWm5jSDBMb21lZ3NBamR0TytsWVBucThKNEFVNlgvUXdidHVaRnBYelRFOXJuWXVLWlJKZXJBemYvemFMU1lZYTBlclA1VGgvdlI0eG1PNitYN1lNS212TnpOc1hWVGkrL3lKWDI3ZWRLeXNYMVo2T05QNmUvRVZWZ2JoVlJPbU0zWnhwcTlYWmlvam1NNGRWR3ppOTV2V0d6KzloMzZUTnB2TlpyUFpiRGFieldhejJXdzJtODFtczlsc05wdk5aclBaYkk3cUh3Rzk3Q041eGllUDlmaE9oN0JuY3YxVXNXemU3YXQzRDEwemZhd1RoeEJDNFlsZnIxNC85U0xRK0tyZGJyZmI3WGE3M1c2MzIrMTJ1OTF1dDl2dGRydmRicmZiN1hiNzk1SEZSL2ZsdTQ0Ti9zZ2N4c3ZTM0U2ejVEczdOcmwyQ0NIRVRWeXo4YkNrK2l1RUVHdWs2SWExM04wWmhLbFdzdGx5SWIvZElFRW8vYjhxWU8yQkNSUHJpUVNwZm4vWitrUFQ2ZHQ0RTM4VisyZnhPNG9odmhQbjhQMENtSmVNR3gxS01YTmZMMXFGOS9sM3k5VnJqcWlPQ28wS00wYVZtTWNXeTN1dHlFd09LbXB1ajVUYU00U1FhT0tueTlZZFZrMHRjVWNFWTh6alBGZFIwRXZIeTRpa3lKMVEzTjNWZzlMcHNSQkN6MFNLUmVEQ3RZWlVUZ3ZmRU1WNFNvUy9qd3VUZmhPeHBZNzRMY0xlVzdPa3VxWUlJWVRpRThXZXI0dlhIRklsTFhCVEpPT2JFWE14ckJmK3J5anFzMUgrUm0rYzdCZ29oT0lUeGUrWnkxY2FVQkhOZlZNODVLakMxVzhjNjVlckZVTTlMZGJncVduMGFBaWhqSWt2TGx4cFNQbWE1NW9VL3RZdTNIL0cwbDR3VGdIUzllSWRQcHlpOTU0b2hCQkttdmpxbk5VSGxxcDVyMGhqN3J5Q1lSMGZoZHQ5ZXBFL09XV1NQV0NaZU8wV1FpaHg0dlBUVml4Rm5SdG56cXgrTVBrWE90QkpnTS9LSzBUZlMyTnkzeVEvWGU3RVIrY3MxeWlrdVBXYldTOUpaMnZNSklXeStpUU44U2VyWnBKZW5jcmxEWkhGeFdRaGhGRDZ4T1Y1U2xCTnozdDZVbE9iRnNucWhHVElaMmVVYXp1bmMvbkJVb1dVUVYrR2lyUnlxZlZiWWxQbkZQbU5DWmsvWEtHYmRMNlVObCtQMHRPVjBNMFJxb1NwMXdwRTlWR0hPdDFrNTJFZTU4YzR6cnpEb2VsanJtYW9wS3IybWpwL0x2VXl2andQcE1SY0tlNm42MUNiZENXVlZUYW41OTV2djVTTXg4Wjk1d3QxcURQeWt2bzBoQkJDQ0NHRUVDcG44YUYvcjdqM2RhajNjcEk2dWRMWGowUGp0RzgxVmIzb3BzZzVBYXEwNXVrcGdBdTMvUFdvRGJPcjMwcGZ1MFZlazRhS3FzSmY2SDlyU1ZleVhpRzJyOXE3SnZWU2xpNHY0VXBaTDBmM29GOVdWQldNYjdJc1Y2dDlVVjFORzYxbGpucXJIclZCcHExaEYxVDFXbzhFeDJiekgvTjZEZXJVbktSVy8remZxNnJXa2t3c2NOSmJkYWUzOG5JYWVsbW82RktjYkdLeEU5NnFrcXA0dHpWelkxcjM2NnI1K21OQ3BKMDQ5djBhMDlyNUlZMTNhY1Y4TFE2cEo1WSs4Y082MHJsRk10cndoeXJaT2hES21Gajg5SGRxU1c4V1NtaWlxNnZqNm5Zb2EyS3BzejRzVzVYY0hpY3BGdEJtUDFiRTA3ZjlVZWJFQ3FkOVZEZmF0R0E4STYrdmhxYzVVZktnMzdLbmYxa3JPcnR3UEZ2OFhnRkwyMEQ1RTROWFBQZUwrdEFyeGNPWnZQd3UvaEtveHNUQUZjNy9aS3pSVDc5R1lrMGRrYzFXSlUrK0RyMFRGVmdFVnI5NzdOQ0pFejRaeWJWSlRESlQzbFYyZFYydHdTTGxLdG5pTVNmWFJKS2RFWmZNRG4rVmQ2MnZkT1UzTXVsVlFoTzRjb2QzejBpMjF5S2ptZXJ1OHJhcXltbTlxdXY3WGJ0NTU0dWtHeFBkS2U0eXVwVHJEVFdnMUljdzQvYndEb2l0YURlTVRtZjZlOHZRWkRXcm0rYklBbjQwa3ZDc0JQbnNudjVhVFIwb1piVzJlamJ3Y1pHTUw2WUlhTlpIRWwrbnExTzFkczN6dDBvczV1UkpJdG9yNzRyZXBlcFVwNDNJTC8xak9UZjRONk1razA4bjFLZ2ExVzJGT3VYWVk1VlRVcVYwUUxKckxUV2hKSDlrMVdJR0w0cGtmU3RaVEhNK2xlcWI2bEtqOXlscWNLZktQS3lISlNtNzFhYitMR3h3NFZqY3RSTW1OZnVWZjhkYStIcHdmZXF2a1lVUG4zNkt4RDB2WlZSTC9oQzk5ZGVxQ2p1OEp4TDN6WFJCYmZSd2l0T3lQa0FueFBLT1RKUFNPTHU4bnFpdHFuK3RFOHU3YVlxTUpqN2ttMVMvNi9MNlZNU04rV3ZaSnplem5QSmJ5bjY5OXJYOUw1RzhyOGJtczlpVmFidlFxMnBlVzd3UkR6eEpUanE1WGV6dHlVODNwcXh6cmZGQ2lsalhpTWhtODJkTE9EUzd0cjYxMUtOcFlqMnJhREREZHVsMHNDVzhtald0aFpJOXQ2OFhpMldLSTc4TG9SeGRXY3VhNCtwMHFZNlpxRWlIZm00N2hORHpTdi9sK3RWVUZ5ZE5kYVA4TGZmV0VFS0p1cTV1TmZMRWY5S21lbWJlTnZSUUNLSGMxOVMxcXNrUC96MDcxTVJIT0lOMmVDMkUwblZqcldxVDNsUkxxUEluMk8rVEVFSUZYdFBVb25xN3hoTDJndzI3ZVMvNjc5UW9pVklFVnF2VGo2VVA5ZFR1Y1FpaEtxOFo2bFFucGMvMHJXN2U1YXVqMitwUUdUdG9lVVgrNDlWNUxWS2pHdkYzK2t6WDdnYWV1VG82cmdhVkFmbEMra3dmNmdHK3ZDS2p1MWNZVXFjNk5YbW9QKzdmQXp6ZW1DcU1ibHFvWnZ1RlZST0grczBoNDJVUUgxcis2Tks1NnJSbjc2N1Frb2I2N1lIRE11ME5LTG0wKy9PVUdkWHd1ZGtyQ1VkN0Q4dUxZL015Ujc4Y01ZbzYxb21wVXYxcXYyRUY4bmkzdE5IbkIweEluU3JUVkpwVVA5Mm5VU2lQUmJ0R0pWVFJ1d3lpcnRWTWtlb1greFpPOWY0eVJpOXVnL3BWd3NydXM5MGJ4UU9aT3Yzb2lYV3BkNTBaaWZqbHpuRlA2cm1KUi9jdFI5MXI0eWpBajNhTExlZi9sOVdhcGNobVVlcGZVMFhnZmJCenYvaEk5a2szdW5odWFsdlpuQjhWaGZ0d3QzNUpNdmt1emN6b3MyZWl4cFZnc1h0dnUvN1piQTgrdEVMaFRGS01majVtcW16UzZkNDVkZm9hMXhaRndON01yU2htQ1NHOHNuTm01WnJaYnlRb2VNZlBBejBtaEhETGlyV3RtUXFNdHN0M2ZsRjNSM1RTSElNTGhESmZoc09DajhXZVhhVFo3ZXNQWFVBdmJ6ZXFmMjBxeDlkN09WQ3ZGNmxTUi96VkM3Vk1rVlJ1Sytpdis0UFl1Z2ptcGhtVjlhQjYxaVdaU0c5c1ZzajRucjFVZjR3b0FqVnBSTUc3VHJFUVgrdkZ1bEk5YThlczBSWUZqYi9meTNWSU1hcFRpaGE4S3hlME1HOEcyRlExcldsN2U4Uk5pL3BlT3dONC9HSllRd29Wd2pjdVhqakR1M3ZKN3EzUmI4a3o5a25Yb3JaNUJzZGNCMCtaalhWN0YyOW4yeXlheXg3NXZxNllKd3RxcXgyekVTZktZRnU2R2lxMERDZlFBOW1ZUThjazRCeVZaK3pxRUo3Zk5HZmhISDFoWmljMHhTNHZkZU11VkRpWUw3STl0YytZTFJOcFlBanZIZFRNdXZjWE9PWEg3bDZrc3I5b2pWYXIxV3ExV3ExV3E5VnF0VnF0VnF2VmFyVmFyVmFyMVdxMVdxM1daZjloWnVYd2Rqem1seFBuN2hrZnJaZU5NZnl2cmkxaGk4eCtZYmtiTzZ0bzhXQld5UnI5ZnZSL2owSitsL3YzNVF0a2tZeTc0eHNoaEYycW8veFNxTkZvTkJxTlJxUFJhRFFhalVhajBXZzBHbzFHbzlGb05CcU5ScVB4Yi9HVTh6WUJaMjdYTkN5dnhOcXRKKytQRDg2RW1mV2tIN2FQU09hNUh0S3ZEeGxacUVUdStzU3pGODZWSHZoNUdBQUFBQUFBQUFBQUFBQUFZT3pwNVQ3cnZUbXY2VHk4all6YmZFQUU2ZXhkbU8vdU9UUm11MTN5djNzaDY0TVp2K2F2ek9jOEk5ZnhzTzNYUjArZGd2WEtFRjdacWhEUGpSbWxTNGZpb2F4YXFNL1FYYjI1M3RyN1dGKzJSRHpyTlBkbjdONTUyMjFHbzlHcGlUcDd5YUZUOUNuWElobTVMb2padWhHZTNtcXljanhjbDNHdzFLRTRvd3RoOUpXTGorZzdOTWRWUFYzbjJ4Mkt5M3BUdnJ1a0t1dnhIdXJkTVNpalZsNnZMeG1PT3VpZFRwSmJkdmFSMFoxY3V5aEtlem91Nkh3eWYzWTJwaDB5U3ZEeCs1Z2ZXT2VlRURyYjdmNFpweEVsV3Boc3Z3KzcrL09QZWowY3BXLzQ5ZG0xMXpxZC83L3Z6ZlhBVWkzMDI2clRRYXllc2Y1MnR3OTl6N2N1Mnh2cm1DcHNBK2RuTmMxOWlITGF0SGt2L0wwNmgxempiZnh3dHpwSEgzM1Z4TWo5M2dvaHpGNFJEd3VkODJjSTcwSmZOZEZaNFo1NXBrSmIrOTZmL3R1dDkzR3ZkVGVyMG1xeTIxd0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUQwY1YwZEFGWlFPQ0JxQWdBQU1CNEFuUUVxTEFHSUFENlJScHhKSmFRaklTcy9LQUN3RWdsamJ0L3dMMEM4QWZxQkFnUHdBL0FEeUFQb0E1d0Q4QVB3QXRmL0tBdndEOEFMa2QwVDV6cVgvTHVFTTY0K1g1SjMvTjJnUDBBeFFIOEEvZ0g3QWUvL1RmNDFIWUQ2dGExclZSWTgyRG93RisyQVVxSHVmeGowNTNQNHg1THFOWUJLWTN0MXhNWkFMeUpqZ0U0elRJNXRRWU1mZ2VoRENLem9Ya1RIQUp4bW1SemF2TjVreC9RZnpqTk1qbTFlY0FuR2FaSE5vWG5YQUlpWHMweU9iVjV3Q2NacGtjMnJ2MDk0Z0ZxdzhaSE5xODRCT00weU9iVjV2VnZPaThmckZ2RURoNmFTa0Z5anF1L3JDKzhrZWZBbkZ5Uzg0Qk9MaUtwVnN2Y0RTdGorQUFEKy9QUmVnekdtbnZ0NDN3MDhhMTcxOUl1QTVhdGQ3QTJOajFtZnB4czc5WTNzd3huVzNabFN1d2pRc2h4RE1hYWUrM2pmRFR4clh2WDBpNG43SzhucWc1OEhZUFFXcjRlek9YekNoWGRqK3lWSmNUMU1HY0lyaldXSVRuUFFzQm1OTlBmYnh2aHA0MXIzcjZSY1Q5bGVUMVFjK0VLZU1TTWFxa3lKZnFZSEpRTi9UWWNCYlNiQThuR2NZcFdCRHEydUtrUVRqUDZlSllWYUVHMEhUQ0xTOWpBVjNtdzdtbzl6c05MVFVlb290WXlveTEzelNGN2gwbXlnV2xNQjE1WkIwUG8yZ0l0SHNnanRjQzBNaXJUSlBaZmI0R3VVQVpteWNEaXB5UjdFMDJHckhvSC8vaWVtaWRNRlBvZEtERERwM2FwL0syYW05ZDVKWG10c2p2Q0NyZlpsL2VKN3MrNFZFcWpjK3VPd2dkNkExMWcyZjhwZi8vUXhVUWhoWm9yOUJWY2N1S1dhQzdHdGlWSE5TaFk1T2xaWWZ1NG9Ocy9MTFdlZFp2MVB6c0xFZmJ3ZVJ6NDNaN2NKWVpBMjNJcXQ3bWZISEhUcUFGSWE5YVVGK1pmV2hSOGU5TVhHMHFFeTZKM05Hb0FBIj4KPG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAiPgo8dGl0bGU+16bXnteoINep15jXmdeX15nXnSDXmdek15nXnSDigJQg157Xl9ep15HXldefINee15fXmdeoPC90aXRsZT4KPGxpbmsgaHJlZj0iaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1IZWVibzp3Z2h0QDIwMDszMDA7NDAwOzcwMDs5MDAmZmFtaWx5PVNwYWNlK0dyb3Rlc2s6d2dodEAzMDA7NDAwOzcwMCZkaXNwbGF5PXN3YXAiIHJlbD0ic3R5bGVzaGVldCI+CjxzdHlsZT4KCip7bWFyZ2luOjA7cGFkZGluZzowO2JveC1zaXppbmc6Ym9yZGVyLWJveH0KaHRtbCxib2R5e2JhY2tncm91bmQ6IzAzMDMwNCFpbXBvcnRhbnQ7bWluLWhlaWdodDoxMDAlfQo6cm9vdHsKICAtLWJnOiMwMzAzMDQ7LS1zMTojMDgwODA5Oy0tczI6IzBmMGYxMTsKICAtLW9yYW5nZTojZTg4MTJhOy0tb3JhbmdlMjojZjVhMDVhOwogIC0tYmx1ZTojM2E2ZmQ4Oy0tdGVhbDojMmE4YTgwOwogIC0tdGV4dDojZjBmMGYyOy0tbXV0ZWQ6IzYwNjA2YTsKICAtLWJvcmRlcjpyZ2JhKDI1NSwyNTUsMjU1LC4wNikKfQpib2R5e2JhY2tncm91bmQ6dmFyKC0tYmcpO2NvbG9yOnZhcigtLXRleHQpO2ZvbnQtZmFtaWx5OidIZWVibycsc2Fucy1zZXJpZjtkaXJlY3Rpb246cnRsO292ZXJmbG93LXg6aGlkZGVufQoKLyogYW5pbWF0ZWQgZ3JhZGllbnQgb3JicyAqLwoub3Jie3Bvc2l0aW9uOmZpeGVkO2JvcmRlci1yYWRpdXM6NTAlO2ZpbHRlcjpibHVyKDgwcHgpO3BvaW50ZXItZXZlbnRzOm5vbmU7YW5pbWF0aW9uOmRyaWZ0IDEycyBlYXNlIGluZmluaXRlO3dpbGwtY2hhbmdlOnRyYW5zZm9ybX0KLm9yYjF7d2lkdGg6NTAwcHg7aGVpZ2h0OjUwMHB4O2JhY2tncm91bmQ6cmdiYSgyNTUsMTAwLDIwLC4xOCk7dG9wOi0xMDBweDtyaWdodDotMTAwcHg7YW5pbWF0aW9uLWRlbGF5OjBzfQoub3JiMnt3aWR0aDo0MDBweDtoZWlnaHQ6NDAwcHg7YmFja2dyb3VuZDpyZ2JhKDU4LDExMSwyMTYsLjA4KTtib3R0b206LTEwMHB4O2xlZnQ6LTEwMHB4O2FuaW1hdGlvbi1kZWxheTotNHN9Ci5vcmIze3dpZHRoOjMwMHB4O2hlaWdodDozMDBweDtiYWNrZ3JvdW5kOnJnYmEoNDIsMTM4LDEyOCwuMDYpO3RvcDo1MCU7bGVmdDo1MCU7YW5pbWF0aW9uLWRlbGF5Oi04c30KQGtleWZyYW1lcyBkcmlmdHswJSwxMDAle3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwwKSBzY2FsZSgxKX0zMyV7dHJhbnNmb3JtOnRyYW5zbGF0ZSgzMHB4LC0yMHB4KSBzY2FsZSgxLjA1KX02NiV7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtMjBweCwzMHB4KSBzY2FsZSguOTUpfX0KCi8qIOKUgOKUgCBOQVYg4pSA4pSAICovCmJvZHl7YmFja2dyb3VuZDojMDMwMzA0fS5uYXZ7CiAgcG9zaXRpb246Zml4ZWQ7dG9wOjA7bGVmdDowO3JpZ2h0OjA7ei1pbmRleDo1MDsKICBwYWRkaW5nOjE4cHggNDBweDtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47YWxpZ24taXRlbXM6Y2VudGVyOwogIGJhY2tncm91bmQ6cmdiYSgzLDMsNCwuODUpO2JhY2tkcm9wLWZpbHRlcjpibHVyKDIwcHgpOwogIGJvcmRlci1ib3R0b206MXB4IHNvbGlkIHZhcigtLWJvcmRlcikKfQoubmF2LWxvZ297ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtnYXA6MTJweH0KLm5hdi1sb2dvIGltZ3toZWlnaHQ6MzBweDtmaWx0ZXI6YnJpZ2h0bmVzcygwKSBpbnZlcnQoMSl9Ci5uYXYtbmFtZXtmb250LXNpemU6MTNweDtmb250LXdlaWdodDo2MDA7Y29sb3I6dmFyKC0tdGV4dCl9Ci5uYXYtY3RhewogIGJhY2tncm91bmQ6dmFyKC0tb3JhbmdlKTtjb2xvcjojMDcwNzA4OwogIGZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjcwMDtwYWRkaW5nOjlweCAyMHB4O2JvcmRlci1yYWRpdXM6NHB4OwogIGxldHRlci1zcGFjaW5nOi41cHg7Y3Vyc29yOnBvaW50ZXIKfQoKLyog4pSA4pSAIEhFUk8g4pSA4pSAICovCi5oZXJvewogIG1pbi1oZWlnaHQ6MTAwdmg7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjsKICBqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjt0ZXh0LWFsaWduOmNlbnRlcjsKICBwYWRkaW5nOjEyMHB4IDMycHggODBweDtwb3NpdGlvbjpyZWxhdGl2ZTt6LWluZGV4OjEKfQoKLmhlcm8tYmFkZ2V7CiAgZGlzcGxheTppbmxpbmUtZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjhweDsKICBiYWNrZ3JvdW5kOnJnYmEoMjMyLDEyOSw0MiwuMSk7Ym9yZGVyOjFweCBzb2xpZCByZ2JhKDIzMiwxMjksNDIsLjI1KTsKICBjb2xvcjp2YXIoLS1vcmFuZ2UyKTtmb250LXNpemU6MTFweDtmb250LXdlaWdodDo2MDA7bGV0dGVyLXNwYWNpbmc6MnB4O3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTsKICBwYWRkaW5nOjdweCAxNnB4O2JvcmRlci1yYWRpdXM6MjBweDttYXJnaW4tYm90dG9tOjMycHg7CiAgYW5pbWF0aW9uOmJhZGdlUG9wIC42cyBlYXNlIGJvdGgKfQouaGVyby1iYWRnZTo6YmVmb3Jle2NvbnRlbnQ6J+KXjyc7Zm9udC1zaXplOjdweDthbmltYXRpb246YmxpbmsgMnMgZWFzZSBpbmZpbml0ZX0KQGtleWZyYW1lcyBibGlua3swJSwxMDAle29wYWNpdHk6MX01MCV7b3BhY2l0eTouM319CkBrZXlmcmFtZXMgYmFkZ2VQb3B7ZnJvbXtvcGFjaXR5OjA7dHJhbnNmb3JtOnNjYWxlKC45KX10b3tvcGFjaXR5OjE7dHJhbnNmb3JtOnNjYWxlKDEpfX0KCi5oZXJvLXRpdGxlewogIGZvbnQtc2l6ZTpjbGFtcCg0OHB4LDl2dywxMTBweCk7Zm9udC13ZWlnaHQ6OTAwOwogIGxpbmUtaGVpZ2h0Oi45O2xldHRlci1zcGFjaW5nOi0zcHg7bWFyZ2luLWJvdHRvbToyOHB4OwogIGFuaW1hdGlvbjp0aXRsZVJldmVhbCAuOHMgZWFzZSAuMnMgYm90aAp9CkBrZXlmcmFtZXMgdGl0bGVSZXZlYWx7ZnJvbXtvcGFjaXR5OjA7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoMzBweCl9dG97b3BhY2l0eToxO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDApfX0KCi53b3JkLWNhcnBldHsKICBkaXNwbGF5OmJsb2NrOwogIGJhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDEzNWRlZywjZmY3YTJhLCNmZjQ1MDApOwogIC13ZWJraXQtYmFja2dyb3VuZC1jbGlwOnRleHQ7LXdlYmtpdC10ZXh0LWZpbGwtY29sb3I6dHJhbnNwYXJlbnQ7YmFja2dyb3VuZC1jbGlwOnRleHQKfQoud29yZC1jbGVhbntkaXNwbGF5OmJsb2NrO2NvbG9yOnZhcigtLXRleHQpfQoud29yZC1maXh7ZGlzcGxheTpibG9jaztjb2xvcjpyZ2JhKDI0MCwyNDAsMjQyLC4yKTtmb250LXdlaWdodDoyMDA7Zm9udC1zdHlsZTppdGFsaWN9CgouaGVyby1zdWJ7CiAgZm9udC1zaXplOjE2cHg7Y29sb3I6dmFyKC0tbXV0ZWQpO21heC13aWR0aDo1MjBweDtsaW5lLWhlaWdodDoxLjc7bWFyZ2luLWJvdHRvbTo0OHB4OwogIGFuaW1hdGlvbjpmYWRlSW4gLjhzIGVhc2UgLjRzIGJvdGg7Zm9udC13ZWlnaHQ6MzAwCn0KQGtleWZyYW1lcyBmYWRlSW57ZnJvbXtvcGFjaXR5OjB9dG97b3BhY2l0eToxfX0KCi5oZXJvLWJ0bnN7CiAgZGlzcGxheTpmbGV4O2dhcDoxNHB4O2p1c3RpZnktY29udGVudDpjZW50ZXI7ZmxleC13cmFwOndyYXA7CiAgYW5pbWF0aW9uOmZhZGVJbiAuOHMgZWFzZSAuNnMgYm90aAp9Ci5idG4tb3JhbmdlewogIGJhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDEzNWRlZyx2YXIoLS1vcmFuZ2UpLCNjOTZhMTgpOwogIGNvbG9yOiNmZmY7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NzAwOwogIHBhZGRpbmc6MTVweCAzNnB4O2JvcmRlci1yYWRpdXM6NHB4O2N1cnNvcjpwb2ludGVyOwogIGJveC1zaGFkb3c6MCA0cHggMjRweCByZ2JhKDIzMiwxMjksNDIsLjMpOwogIHRyYW5zaXRpb246dHJhbnNmb3JtIC4ycyxib3gtc2hhZG93IC4ycwp9Ci5idG4tb3JhbmdlOmhvdmVye3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0ycHgpO2JveC1zaGFkb3c6MCA4cHggMzJweCByZ2JhKDIzMiwxMjksNDIsLjQpfQouYnRuLW91dGxpbmV7CiAgYmFja2dyb3VuZDp0cmFuc3BhcmVudDtjb2xvcjp2YXIoLS10ZXh0KTtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo2MDA7CiAgcGFkZGluZzoxNXB4IDMycHg7Ym9yZGVyLXJhZGl1czo0cHg7Y3Vyc29yOnBvaW50ZXI7CiAgYm9yZGVyOjFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO3RyYW5zaXRpb246YWxsIC4ycwp9Ci5idG4tb3V0bGluZTpob3Zlcntib3JkZXItY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuMik7YmFja2dyb3VuZDpyZ2JhKDI1NSwyNTUsMjU1LC4wNCl9CgovKiDilIDilIAgQ0FMQ1VMQVRPUiBNT0NLVVAg4pSA4pSAICovCi5tb2NrdXAtd3JhcHsKICBtYXJnaW46MjhweCBhdXRvIDA7bWF4LXdpZHRoOjM4MHB4O3dpZHRoOjEwMCU7CiAgYW5pbWF0aW9uOmZsb2F0VXAgMXMgZWFzZSAuOHMgYm90aAp9CkBrZXlmcmFtZXMgZmxvYXRVcHtmcm9te29wYWNpdHk6MDt0cmFuc2Zvcm06dHJhbnNsYXRlWSg0MHB4KX10b3tvcGFjaXR5OjE7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoMCl9fQoubW9ja3VwewogIGJhY2tncm91bmQ6dmFyKC0tczEpO2JvcmRlcjoxcHggc29saWQgdmFyKC0tYm9yZGVyKTtib3JkZXItcmFkaXVzOjIwcHg7CiAgcGFkZGluZzoyNHB4O2JveC1zaGFkb3c6MCA0MHB4IDgwcHggcmdiYSgwLDAsMCwuNiksMCAwIDAgMXB4IHJnYmEoMjU1LDI1NSwyNTUsLjA0KSxpbnNldCAwIDFweCAwIHJnYmEoMjU1LDI1NSwyNTUsLjA2KQp9Ci5tb2NrLWhlYWRlcntkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47YWxpZ24taXRlbXM6Y2VudGVyO21hcmdpbi1ib3R0b206MjBweH0KLm1vY2stdGl0bGV7Zm9udC1zaXplOjEycHg7Y29sb3I6dmFyKC0tbXV0ZWQpO2xldHRlci1zcGFjaW5nOjFweH0KLm1vY2stdGFic3tkaXNwbGF5OmZsZXg7YmFja2dyb3VuZDp2YXIoLS1zMik7Ym9yZGVyLXJhZGl1czozMHB4O3BhZGRpbmc6M3B4O2dhcDozcHh9Ci5tb2NrLXRhYntmb250LXNpemU6MTFweDtmb250LXdlaWdodDo2MDA7cGFkZGluZzo2cHggMTJweDtib3JkZXItcmFkaXVzOjI2cHg7Y29sb3I6dmFyKC0tbXV0ZWQpfQoubW9jay10YWIub257YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLHZhcigtLW9yYW5nZSksI2M5NmExOCk7Y29sb3I6I2ZmZn0KLm1vY2stZmllbGR7YmFja2dyb3VuZDp2YXIoLS1zMik7Ym9yZGVyOjFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO2JvcmRlci1yYWRpdXM6OHB4O3BhZGRpbmc6MTJweCAxNHB4O21hcmdpbi1ib3R0b206MTBweH0KLm1vY2stZmllbGQtbGFiZWx7Zm9udC1zaXplOjlweDtjb2xvcjp2YXIoLS1tdXRlZCk7bGV0dGVyLXNwYWNpbmc6LjhweDt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7bWFyZ2luLWJvdHRvbTo0cHh9Ci5tb2NrLWZpZWxkLXZhbHtmb250LXNpemU6MjBweDtmb250LXdlaWdodDo4MDA7Y29sb3I6dmFyKC0tdGV4dCl9Ci5tb2NrLXJvd3tkaXNwbGF5OmdyaWQ7Z3JpZC10ZW1wbGF0ZS1jb2x1bW5zOjFmciAxZnI7Z2FwOjEwcHg7bWFyZ2luLWJvdHRvbToxNHB4fQoubW9jay10eXBlc3tkaXNwbGF5OmdyaWQ7Z3JpZC10ZW1wbGF0ZS1jb2x1bW5zOjFmciAxZnIgMWZyO2dhcDo2cHg7bWFyZ2luLWJvdHRvbToxNHB4fQoubW9jay10eXBlewogIGJhY2tncm91bmQ6dmFyKC0tczIpO2JvcmRlcjoxcHggc29saWQgdmFyKC0tYm9yZGVyKTtib3JkZXItcmFkaXVzOjZweDsKICBwYWRkaW5nOjhweCA0cHg7dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC1zaXplOjEwcHg7Y29sb3I6dmFyKC0tbXV0ZWQpO2ZvbnQtd2VpZ2h0OjYwMAp9Ci5tb2NrLXR5cGUub257Ym9yZGVyLWNvbG9yOnZhcigtLW9yYW5nZSk7YmFja2dyb3VuZDpyZ2JhKDIzMiwxMjksNDIsLjEpO2NvbG9yOnZhcigtLW9yYW5nZTIpfQoubW9jay10b3RhbHsKICBiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxMzVkZWcscmdiYSgyMzIsMTI5LDQyLC4xMikscmdiYSgyMzIsMTI5LDQyLC4wNikpOwogIGJvcmRlcjoxcHggc29saWQgcmdiYSgyMzIsMTI5LDQyLC4yKTtib3JkZXItcmFkaXVzOjEwcHg7CiAgcGFkZGluZzoxNnB4O2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjthbGlnbi1pdGVtczpjZW50ZXIKfQoubW9jay10b3RhbC1sYWJlbHtmb250LXNpemU6MTJweDtjb2xvcjp2YXIoLS1tdXRlZCl9Ci5tb2NrLXRvdGFsLWFtdHtmb250LXNpemU6MjhweDtmb250LXdlaWdodDo5MDA7Y29sb3I6dmFyKC0tb3JhbmdlMil9CgovKiB0eXBpbmcgYW5pbWF0aW9uICovCi50eXBpbmd7b3ZlcmZsb3c6aGlkZGVuO3doaXRlLXNwYWNlOm5vd3JhcDthbmltYXRpb246dHlwaW5nIDJzIHN0ZXBzKDMsZW5kKSBpbmZpbml0ZX0KQGtleWZyYW1lcyB0eXBpbmd7MCUsMTAwJXt3aWR0aDowfTUwJXt3aWR0aDoxMDAlfX0KCi8qIOKUgOKUgCBGRUFUVVJFUyBHUklEIOKUgOKUgCAqLwouZmVhdC1ncmlkewogIGRpc3BsYXk6Z3JpZDtncmlkLXRlbXBsYXRlLWNvbHVtbnM6cmVwZWF0KDMsMWZyKTtnYXA6MXB4OwogIGJhY2tncm91bmQ6dmFyKC0tYm9yZGVyKTttYXJnaW46MDtwb3NpdGlvbjpyZWxhdGl2ZTt6LWluZGV4OjEKfQouZmVhdC1jZWxsewogIGJhY2tncm91bmQ6dmFyKC0tYmcpO3BhZGRpbmc6NDhweCAzNnB4OwogIGJvcmRlci1ib3R0b206MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7CiAgdHJhbnNpdGlvbjpiYWNrZ3JvdW5kIC4zcwp9Ci5mZWF0LWNlbGw6aG92ZXJ7YmFja2dyb3VuZDp2YXIoLS1zMSl9Ci5mZWF0LWljb24yewogIHdpZHRoOjQ0cHg7aGVpZ2h0OjQ0cHg7Ym9yZGVyLXJhZGl1czoxMHB4OwogIGRpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjtmb250LXNpemU6MjBweDsKICBtYXJnaW4tYm90dG9tOjIwcHg7Cn0KLmZlYXQtaWNvbjIub3Jhbmdle2JhY2tncm91bmQ6cmdiYSgyMzIsMTI5LDQyLC4xMik7Ym9yZGVyOjFweCBzb2xpZCByZ2JhKDIzMiwxMjksNDIsLjIpfQouZmVhdC1pY29uMi5ibHVle2JhY2tncm91bmQ6cmdiYSg1OCwxMTEsMjE2LC4wOCk7Ym9yZGVyOjFweCBzb2xpZCByZ2JhKDU4LDExMSwyMTYsLjIpfQouZmVhdC1pY29uMi50ZWFse2JhY2tncm91bmQ6cmdiYSg0MiwxMzgsMTI4LC4xMik7Ym9yZGVyOjFweCBzb2xpZCByZ2JhKDQyLDEzOCwxMjgsLjIpfQouZmVhdC10aXRsZTJ7Zm9udC1zaXplOjE2cHg7Zm9udC13ZWlnaHQ6NzAwO21hcmdpbi1ib3R0b206OHB4fQouZmVhdC1kZXNjMntmb250LXNpemU6MTNweDtjb2xvcjp2YXIoLS1tdXRlZCk7bGluZS1oZWlnaHQ6MS43O2ZvbnQtd2VpZ2h0OjMwMH0KCi8qIOKUgOKUgCBCT1RUT00gQkFSIOKUgOKUgCAqLwouYm90dG9tLWJhcnsKICBiYWNrZ3JvdW5kOnZhcigtLXMxKTtib3JkZXItdG9wOjFweCBzb2xpZCB2YXIoLS1ib3JkZXIpOwogIHBhZGRpbmc6MjhweCA0MHB4O2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjthbGlnbi1pdGVtczpjZW50ZXI7CiAgZmxleC13cmFwOndyYXA7Z2FwOjE2cHg7cG9zaXRpb246cmVsYXRpdmU7ei1pbmRleDoxCn0KLmJvdHRvbS1icmFuZHsKICBkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2dhcDoxMHB4Owp9Ci5ib3R0b20tYnJhbmQgaW1ne2hlaWdodDoyNHB4O2ZpbHRlcjpicmlnaHRuZXNzKDApIGludmVydCgxKX0KLmJvdHRvbS10ZXh0e2ZvbnQtc2l6ZToxMnB4O2NvbG9yOnZhcigtLW11dGVkKX0KLmJvdHRvbS11cmx7Zm9udC1zaXplOjExcHg7Y29sb3I6dmFyKC0tb3JhbmdlKTtsZXR0ZXItc3BhY2luZzoxcHh9CgpAbWVkaWEobWF4LXdpZHRoOjY0MHB4KXsKICAuZmVhdC1ncmlke2dyaWQtdGVtcGxhdGUtY29sdW1uczoxZnJ9CiAgLmhlcm8tdGl0bGV7bGV0dGVyLXNwYWNpbmc6LTJweH0KICAubmF2LWN0YXtkaXNwbGF5Om5vbmV9Cn0KCgovKiDilIDilIAgU1RBVCBHUklEIChyZXBsYWNlcyBoZXJvLWJ0bnMpIOKUgOKUgCAqLwouc3RhdC1ncmlkewogIGRpc3BsYXk6Z3JpZDtncmlkLXRlbXBsYXRlLWNvbHVtbnM6cmVwZWF0KDQsMWZyKTsKICBnYXA6MXB4O2JhY2tncm91bmQ6dmFyKC0tYm9yZGVyKTsKICBtYXJnaW4tYm90dG9tOjQ4cHg7d2lkdGg6MTAwJTttYXgtd2lkdGg6NTIwcHg7CiAgYW5pbWF0aW9uOmZhZGVJbiAuOHMgZWFzZSAuNXMgYm90aDsKfQouc3RhdC1jZWxsewogIGJhY2tncm91bmQ6dmFyKC0tczEpO3BhZGRpbmc6MThweCAxMHB4O3RleHQtYWxpZ246Y2VudGVyOwogIHRyYW5zaXRpb246YmFja2dyb3VuZCAuMjVzOwp9Ci5zdGF0LWNlbGw6aG92ZXJ7YmFja2dyb3VuZDp2YXIoLS1zMil9Ci5zdGF0LW51bXsKICBmb250LXNpemU6MjRweDtmb250LXdlaWdodDo5MDA7bGV0dGVyLXNwYWNpbmc6LTFweDtsaW5lLWhlaWdodDoxOwogIGJhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDEzNWRlZywjZmY3YTJhLCNmZjQ1MDApOwogIC13ZWJraXQtYmFja2dyb3VuZC1jbGlwOnRleHQ7LXdlYmtpdC10ZXh0LWZpbGwtY29sb3I6dHJhbnNwYXJlbnQ7YmFja2dyb3VuZC1jbGlwOnRleHQ7Cn0KLnN0YXQtbGJse2ZvbnQtc2l6ZTo5cHg7Y29sb3I6dmFyKC0tbXV0ZWQpO2xldHRlci1zcGFjaW5nOjEuNXB4O3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTttYXJnaW4tdG9wOjVweH0KCi8qIOKUgOKUgCBTQ1JPTEwgQVJST1cg4pSA4pSAICovCi5zY3JvbGwtY3RhewogIGRpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47YWxpZ24taXRlbXM6Y2VudGVyO2dhcDoxMHB4OwogIGFuaW1hdGlvbjpmYWRlSW4gLjhzIGVhc2UgLjdzIGJvdGg7Y3Vyc29yOnBvaW50ZXI7bWFyZ2luLWJvdHRvbTowOwp9Ci5zY3JvbGwtbGJse2ZvbnQtc2l6ZToxMHB4O2NvbG9yOnJnYmEoMjU1LDI1NSwyNTUsLjIpO2xldHRlci1zcGFjaW5nOjNweDt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2V9Ci5zY3JvbGwtYXJyewogIHdpZHRoOjQycHg7aGVpZ2h0OjQycHg7CiAgYm9yZGVyOjFweCBzb2xpZCByZ2JhKDIzMiwxMjksNDIsLjMpO2JvcmRlci1yYWRpdXM6NTAlOwogIGRpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjsKICBjb2xvcjp2YXIoLS1vcmFuZ2UpO2ZvbnQtc2l6ZToxOHB4OwogIGFuaW1hdGlvbjpib3VuY2UgMnMgZWFzZSBpbmZpbml0ZTt0cmFuc2l0aW9uOmFsbCAuM3M7Cn0KLnNjcm9sbC1jdGE6aG92ZXIgLnNjcm9sbC1hcnJ7YmFja2dyb3VuZDpyZ2JhKDIzMiwxMjksNDIsLjEpO2JvcmRlci1jb2xvcjp2YXIoLS1vcmFuZ2UpfQpAa2V5ZnJhbWVzIGJvdW5jZXswJSwxMDAle3RyYW5zZm9ybTp0cmFuc2xhdGVZKDApfTUwJXt0cmFuc2Zvcm06dHJhbnNsYXRlWSg4cHgpfX0KCi8qIOKUgOKUgCBDQUxDIFRSQU5TSVRJT04g4pSA4pSAICovCi5jYWxjLWludHJvewogIHRleHQtYWxpZ246Y2VudGVyO3BhZGRpbmc6NjBweCAyNHB4IDA7CiAgYmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCMwMzAzMDQgMCUsIzA4MDgwOCAxMDAlKTsKICBwb3NpdGlvbjpyZWxhdGl2ZTt6LWluZGV4OjE7Cn0KLmNpLWxhYmVse2ZvbnQtc2l6ZToxMHB4O2NvbG9yOnZhcigtLW9yYW5nZSk7bGV0dGVyLXNwYWNpbmc6NHB4O3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTttYXJnaW4tYm90dG9tOjEycHg7CiAgb3BhY2l0eTowO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDEwcHgpO3RyYW5zaXRpb246b3BhY2l0eSAuN3MsdHJhbnNmb3JtIC43czt9Ci5jaS10aXRsZXtmb250LXNpemU6Y2xhbXAoMjhweCw1dncsNDhweCk7Zm9udC13ZWlnaHQ6OTAwO2NvbG9yOnZhcigtLXRleHQpO2xldHRlci1zcGFjaW5nOi0xcHg7bWFyZ2luLWJvdHRvbTo4cHg7CiAgb3BhY2l0eTowO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDEwcHgpO3RyYW5zaXRpb246b3BhY2l0eSAuN3MgLjFzLHRyYW5zZm9ybSAuN3MgLjFzO30KLmNpLWRlc2N7Zm9udC1zaXplOjE0cHg7Y29sb3I6dmFyKC0tbXV0ZWQpO2ZvbnQtd2VpZ2h0OjMwMDsKICBvcGFjaXR5OjA7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoMTBweCk7dHJhbnNpdGlvbjpvcGFjaXR5IC43cyAuMnMsdHJhbnNmb3JtIC43cyAuMnM7fQouY2ktbGluZXt3aWR0aDowO2hlaWdodDoycHg7bWFyZ2luOjI4cHggYXV0byAwOwogIGJhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDkwZGVnLHRyYW5zcGFyZW50LHZhcigtLW9yYW5nZSksdHJhbnNwYXJlbnQpOwogIHRyYW5zaXRpb246d2lkdGggMXMgLjNzO30KLmNpLWxhYmVsLnZpc3tvcGFjaXR5OjE7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoMCl9Ci5jaS10aXRsZS52aXN7b3BhY2l0eToxO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDApfQouY2ktZGVzYy52aXN7b3BhY2l0eToxO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDApfQouY2ktbGluZS52aXN7d2lkdGg6MjgwcHh9CgovKiDilIDilIAgQ0FMQyBTRUNUSU9OIOKUgOKUgCAqLwojY2FsY3VsYXRvcntiYWNrZ3JvdW5kOiMwNTA1MDY7cG9zaXRpb246cmVsYXRpdmU7ei1pbmRleDoxO30KLmNhbGMtcmV2ZWFse29wYWNpdHk6MDt0cmFuc2Zvcm06dHJhbnNsYXRlWSgzMnB4KTt0cmFuc2l0aW9uOm9wYWNpdHkgLjhzIC4ycyx0cmFuc2Zvcm0gLjhzIC4yczt9Ci5jYWxjLXJldmVhbC52aXN7b3BhY2l0eToxO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDApfQojY2FsY3VsYXRvciAud3JhcHBlcntwYWRkaW5nLXRvcDoxMnB4IWltcG9ydGFudDttYXgtd2lkdGg6NzIwcHghaW1wb3J0YW50O21hcmdpbjowIGF1dG8haW1wb3J0YW50O30KI2NhbGN1bGF0b3IgaGVhZGVyLmhlYWRlcntkaXNwbGF5Om5vbmUhaW1wb3J0YW50fQoKLyog4pSA4pSAIFBST1RFQ1QgSEVSTyBGT05UUyBmcm9tIGNhbGMgQ1NTIG92ZXJyaWRlIOKUgOKUgCAqLwouaGVybyAuaGVyby10aXRsZXsKICBmb250LXNpemU6Y2xhbXAoNDhweCw5dncsMTEwcHgpIWltcG9ydGFudDsKICBmb250LXdlaWdodDo5MDAhaW1wb3J0YW50OwogIGxpbmUtaGVpZ2h0Oi45IWltcG9ydGFudDsKICBsZXR0ZXItc3BhY2luZzotM3B4IWltcG9ydGFudDsKICBmb250LWZhbWlseTonSGVlYm8nLHNhbnMtc2VyaWYhaW1wb3J0YW50Owp9Ci5oZXJvIC53b3JkLWNhcnBldHsKICBmb250LXNpemU6aW5oZXJpdCFpbXBvcnRhbnQ7CiAgZm9udC13ZWlnaHQ6aW5oZXJpdCFpbXBvcnRhbnQ7CiAgbGV0dGVyLXNwYWNpbmc6aW5oZXJpdCFpbXBvcnRhbnQ7CiAgYmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCNmZjdhMmEsI2ZmNDUwMCkhaW1wb3J0YW50OwogIC13ZWJraXQtYmFja2dyb3VuZC1jbGlwOnRleHQhaW1wb3J0YW50OwogIC13ZWJraXQtdGV4dC1maWxsLWNvbG9yOnRyYW5zcGFyZW50IWltcG9ydGFudDsKICBiYWNrZ3JvdW5kLWNsaXA6dGV4dCFpbXBvcnRhbnQ7Cn0KLmhlcm8gLndvcmQtY2xlYW57CiAgZm9udC1zaXplOmluaGVyaXQhaW1wb3J0YW50O2ZvbnQtd2VpZ2h0OmluaGVyaXQhaW1wb3J0YW50O2xldHRlci1zcGFjaW5nOmluaGVyaXQhaW1wb3J0YW50Owp9Ci5oZXJvIC53b3JkLWZpeHsKICBmb250LXNpemU6aW5oZXJpdCFpbXBvcnRhbnQ7Zm9udC13ZWlnaHQ6MjAwIWltcG9ydGFudDtsZXR0ZXItc3BhY2luZzppbmhlcml0IWltcG9ydGFudDsKfQouaGVybyAuaGVyby1zdWJ7CiAgZm9udC1zaXplOjE2cHghaW1wb3J0YW50O2ZvbnQtd2VpZ2h0OjMwMCFpbXBvcnRhbnQ7Zm9udC1mYW1pbHk6J0hlZWJvJyxzYW5zLXNlcmlmIWltcG9ydGFudDsKfQovKiDilIDilIAgQ0FMQyBPUklHSU5BTCBDU1Mg4pSA4pSAICovCi8qIE92ZXJyaWRlIGNhbGMgdmFyaWFibGVzIHRvIG1hdGNoIG1vY2t1cCBleGFjdGx5ICovCiNjYWxjdWxhdG9yIHsKICAtLWJnOiAjMDMwMzA0OwogIC0tc3VyZmFjZTogIzBlMGUxMDsKICAtLXN1cmZhY2UyOiAjMTYxNjE4OwogIC0tYm9yZGVyOiByZ2JhKDI1NSwyNTUsMjU1LC4wNik7CiAgLS1nb2xkOiAjZTg4MTJhOwogIC0tZ29sZC1saWdodDogI2Y1YTA1YTsKICAtLWdvbGQtZGltOiByZ2JhKDIzMiwxMjksNDIsLjM1KTsKICAtLXRleHQ6ICNmMGYwZjI7CiAgLS10ZXh0LW11dGVkOiAjNjA2MDZhOwogIC0tdGV4dC1kaW06ICM0MDQwNDg7CiAgLS1hY2NlbnQ6ICNlODgxMmE7CiAgLS1ncmVlbjogIzRjYWY3NDsKfQojY2FsY3VsYXRvciAud3JhcHBlciB7CiAgYmFja2dyb3VuZDogIzAzMDMwNCAhaW1wb3J0YW50Owp9Ci8qIHRhYnMg4oCUIG1hdGNoIG1vY2t1cCB0YWJzIGV4YWN0bHkgKi8KI2NhbGN1bGF0b3IgLnRhYnMgewogIGJhY2tncm91bmQ6ICMwZTBlMTAgIWltcG9ydGFudDsKICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LC4wNikgIWltcG9ydGFudDsKfQojY2FsY3VsYXRvciAudGFiLWJ0bi5hY3RpdmUgewogIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNlODgxMmEsICNjOTZhMTgpICFpbXBvcnRhbnQ7CiAgY29sb3I6ICMwMzAzMDQgIWltcG9ydGFudDsKICBib3gtc2hhZG93OiAwIDRweCAyMHB4IHJnYmEoMjMyLDEyOSw0MiwuMykgIWltcG9ydGFudDsKfQovKiBjYXJkcyAqLwojY2FsY3VsYXRvciAuY2FycGV0LWNhcmQsCiNjYWxjdWxhdG9yIC5yZXBhaXItY2FyZCB7CiAgYmFja2dyb3VuZDogIzBlMGUxMCAhaW1wb3J0YW50OwogIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsLjA2KSAhaW1wb3J0YW50Owp9Ci8qIGlucHV0cyAqLwojY2FsY3VsYXRvciAuZmllbGQgaW5wdXRbdHlwZT0ibnVtYmVyIl0gewogIGJhY2tncm91bmQ6ICMxNjE2MTggIWltcG9ydGFudDsKICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LC4wNikgIWltcG9ydGFudDsKICBjb2xvcjogI2YwZjBmMiAhaW1wb3J0YW50Owp9CiNjYWxjdWxhdG9yIC5maWVsZCBpbnB1dDpmb2N1cyB7CiAgYm9yZGVyLWNvbG9yOiByZ2JhKDIzMiwxMjksNDIsLjUpICFpbXBvcnRhbnQ7CiAgYm94LXNoYWRvdzogMCAwIDAgM3B4IHJnYmEoMjMyLDEyOSw0MiwuMSkgIWltcG9ydGFudDsKfQovKiB0eXBlIGJ1dHRvbnMgKi8KI2NhbGN1bGF0b3IgLnR5cGUtb3B0IGxhYmVsIHsKICBiYWNrZ3JvdW5kOiAjMTYxNjE4ICFpbXBvcnRhbnQ7CiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwuMDYpICFpbXBvcnRhbnQ7Cn0KI2NhbGN1bGF0b3IgLnR5cGUtb3B0IGlucHV0OmNoZWNrZWQgKyBsYWJlbCB7CiAgYm9yZGVyLWNvbG9yOiAjZTg4MTJhICFpbXBvcnRhbnQ7CiAgYmFja2dyb3VuZDogcmdiYSgyMzIsMTI5LDQyLC4xKSAhaW1wb3J0YW50Owp9CiNjYWxjdWxhdG9yIC50eXBlLW9wdCBpbnB1dDpjaGVja2VkICsgbGFiZWwgLnR5cGUtbmFtZSB7IGNvbG9yOiAjZjVhMDVhICFpbXBvcnRhbnQ7IH0KI2NhbGN1bGF0b3IgLnR5cGUtb3B0IGlucHV0OmNoZWNrZWQgKyBsYWJlbCAudHlwZS1wcmljZSB7IGNvbG9yOiAjZTg4MTJhICFpbXBvcnRhbnQ7IH0KLyogc2VydmljZXMgKi8KI2NhbGN1bGF0b3IgLnN2Yy1vcHQgbGFiZWwsCiNjYWxjdWxhdG9yIC5yc3ZjLW9wdCBsYWJlbCB7CiAgYmFja2dyb3VuZDogIzE2MTYxOCAhaW1wb3J0YW50OwogIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsLjA2KSAhaW1wb3J0YW50Owp9CiNjYWxjdWxhdG9yIC5zdmMtb3B0IGlucHV0OmNoZWNrZWQgKyBsYWJlbCB7CiAgYm9yZGVyLWNvbG9yOiByZ2JhKDIzMiwxMjksNDIsLjQpICFpbXBvcnRhbnQ7CiAgYmFja2dyb3VuZDogcmdiYSgyMzIsMTI5LDQyLC4wOCkgIWltcG9ydGFudDsKfQojY2FsY3VsYXRvciAuc3ZjLW9wdCBpbnB1dDpjaGVja2VkICsgbGFiZWwgLmNoayB7CiAgYmFja2dyb3VuZDogI2U4ODEyYSAhaW1wb3J0YW50OwogIGJvcmRlci1jb2xvcjogI2U4ODEyYSAhaW1wb3J0YW50Owp9CiNjYWxjdWxhdG9yIC5yc3ZjLW9wdCBpbnB1dDpjaGVja2VkICsgbGFiZWwgewogIGJvcmRlci1jb2xvcjogI2U4ODEyYSAhaW1wb3J0YW50OwogIGJhY2tncm91bmQ6IHJnYmEoMjMyLDEyOSw0MiwuMDgpICFpbXBvcnRhbnQ7Cn0KI2NhbGN1bGF0b3IgLnJzdmMtb3B0IGlucHV0OmNoZWNrZWQgKyBsYWJlbCAucnN2Yy1jaGVjayB7CiAgYmFja2dyb3VuZDogI2U4ODEyYSAhaW1wb3J0YW50OwogIGJvcmRlci1jb2xvcjogI2U4ODEyYSAhaW1wb3J0YW50Owp9CiNjYWxjdWxhdG9yIC5yc3ZjLW9wdCBpbnB1dDpjaGVja2VkICsgbGFiZWwgLnJzdmMtcHJpY2UtYmFkZ2UgewogIGNvbG9yOiAjZTg4MTJhICFpbXBvcnRhbnQ7CiAgYm9yZGVyLWNvbG9yOiAjZTg4MTJhICFpbXBvcnRhbnQ7Cn0KLyogYXJlYSBpbmZvICovCiNjYWxjdWxhdG9yIC5hcmVhLWluZm8gewogIGJhY2tncm91bmQ6IHJnYmEoMjMyLDEyOSw0MiwuMDgpICFpbXBvcnRhbnQ7CiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyMzIsMTI5LDQyLC4yKSAhaW1wb3J0YW50Owp9Ci8qIHN1YnRvdGFscyAqLwojY2FsY3VsYXRvciAuY2FyZC1zdWJ0b3RhbCB7CiAgYmFja2dyb3VuZDogcmdiYSgyMzIsMTI5LDQyLC4wOCkgIWltcG9ydGFudDsKICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDIzMiwxMjksNDIsLjI1KSAhaW1wb3J0YW50Owp9CiNjYWxjdWxhdG9yIC5yZXBhaXItY2FyZC1zdWJ0b3RhbCB7CiAgYmFja2dyb3VuZDogcmdiYSgyMzIsMTI5LDQyLC4wNikgIWltcG9ydGFudDsKICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDIzMiwxMjksNDIsLjI1KSAhaW1wb3J0YW50Owp9Ci8qIHRvdGFsIHBhbmVsICovCiNjYWxjdWxhdG9yIC50b3RhbC1wYW5lbCB7CiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzBlMGUxMCwgIzA4MDgwOSkgIWltcG9ydGFudDsKICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDIzMiwxMjksNDIsLjI1KSAhaW1wb3J0YW50Owp9Ci8qIGRlbGl2ZXJ5ICovCiNjYWxjdWxhdG9yIC5kZWxpdmVyeS1zZWN0aW9uIHsKICBiYWNrZ3JvdW5kOiAjMGUwZTEwICFpbXBvcnRhbnQ7CiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwuMDYpICFpbXBvcnRhbnQ7Cn0KI2NhbGN1bGF0b3IgLmRlbGl2ZXJ5LW9wdCBsYWJlbCB7CiAgYmFja2dyb3VuZDogIzE2MTYxOCAhaW1wb3J0YW50OwogIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsLjA2KSAhaW1wb3J0YW50Owp9CiNjYWxjdWxhdG9yIC5kZWxpdmVyeS1vcHQgaW5wdXQ6Y2hlY2tlZCArIGxhYmVsIHsKICBib3JkZXItY29sb3I6ICNlODgxMmEgIWltcG9ydGFudDsKICBiYWNrZ3JvdW5kOiByZ2JhKDIzMiwxMjksNDIsLjEpICFpbXBvcnRhbnQ7Cn0KI2NhbGN1bGF0b3IgLmJyYW5jaC1yb3cgc2VsZWN0IHsKICBiYWNrZ3JvdW5kOiAjMTYxNjE4ICFpbXBvcnRhbnQ7CiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwuMDYpICFpbXBvcnRhbnQ7CiAgY29sb3I6ICNmMGYwZjIgIWltcG9ydGFudDsKfQojY2FsY3VsYXRvciAuYnJhbmNoLWRldGFpbCB7CiAgYmFja2dyb3VuZDogIzE2MTYxOCAhaW1wb3J0YW50OwogIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsLjA2KSAhaW1wb3J0YW50Owp9Ci8qIHNpZGUgc2VsZWN0b3IgKi8KI2NhbGN1bGF0b3IgLnNpZGUtc2VsZWN0b3IgewogIGJhY2tncm91bmQ6ICMxNjE2MTggIWltcG9ydGFudDsKICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDIzMiwxMjksNDIsLjIpICFpbXBvcnRhbnQ7Cn0KI2NhbGN1bGF0b3IgLnNpZGUtYnRuIHsKICBiYWNrZ3JvdW5kOiAjMGUwZTEwICFpbXBvcnRhbnQ7CiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwuMDYpICFpbXBvcnRhbnQ7CiAgY29sb3I6ICM2MDYwNmEgIWltcG9ydGFudDsKfQojY2FsY3VsYXRvciAuc2lkZS1idG4uYWN0aXZlIHsKICBib3JkZXItY29sb3I6ICNlODgxMmEgIWltcG9ydGFudDsKICBiYWNrZ3JvdW5kOiByZ2JhKDIzMiwxMjksNDIsLjEyKSAhaW1wb3J0YW50OwogIGNvbG9yOiAjZjVhMDVhICFpbXBvcnRhbnQ7Cn0KLyogYWRkIGJ0biAqLwojY2FsY3VsYXRvciAuYWRkLWJ0biB7CiAgYm9yZGVyLWNvbG9yOiByZ2JhKDI1NSwyNTUsMjU1LC4wOCkgIWltcG9ydGFudDsKICBjb2xvcjogIzYwNjA2YSAhaW1wb3J0YW50Owp9CiNjYWxjdWxhdG9yIC5hZGQtYnRuOmhvdmVyIHsKICBib3JkZXItY29sb3I6IHJnYmEoMjMyLDEyOSw0MiwuNCkgIWltcG9ydGFudDsKICBjb2xvcjogI2U4ODEyYSAhaW1wb3J0YW50Owp9Ci8qIHByaW50IGJ0biAqLwojY2FsY3VsYXRvciAucHJpbnQtYnRuIHsKICBib3JkZXItY29sb3I6IHJnYmEoMjU1LDI1NSwyNTUsLjA4KSAhaW1wb3J0YW50OwogIGNvbG9yOiAjNjA2MDZhICFpbXBvcnRhbnQ7Cn0KLyogbWluIG5vdGljZSAqLwojY2FsY3VsYXRvciAubWluLW5vdGljZSB7CiAgYmFja2dyb3VuZDogcmdiYSgyMzIsMTI5LDQyLC4wOCkgIWltcG9ydGFudDsKICBib3JkZXItY29sb3I6IHJnYmEoMjMyLDEyOSw0MiwuMykgIWltcG9ydGFudDsKfQojY2FsY3VsYXRvcnsKICAtLWJnOiMwMzAzMDQ7LS1zdXJmYWNlOiMwZTBlMTA7LS1zdXJmYWNlMjojMTYxNjE4Oy0tYm9yZGVyOnJnYmEoMjU1LDI1NSwyNTUsLjA2KTsKICAtLWdvbGQ6I2U4ODEyYTstLWdvbGQtbGlnaHQ6I2Y1YTA1YTstLWdvbGQtZGltOnJnYmEoMjMyLDEyOSw0MiwuMzUpOwogIC0tdGV4dDojZjBmMGYyOy0tdGV4dC1tdXRlZDojNjA2MDZhOy0tdGV4dC1kaW06IzQwNDA0ODsKICAtLWFjY2VudDojZTg4MTJhOy0tZ3JlZW46IzRjYWY3NDstLXJhZGl1czoxNHB4Oy0tcmFkaXVzLXNtOjhweDsKfQoqe2JveC1zaXppbmc6Ym9yZGVyLWJveDttYXJnaW46MDtwYWRkaW5nOjB9Ci8qIGJvZHkgb3ZlcnJpZGUgcmVtb3ZlZCAtIHByb21vIGhhbmRsZXMgdGhpcyAqLwovKiBib2R5OjpiZWZvcmUgcmVtb3ZlZCAtIHByb21vIGhhbmRsZXMgYmFja2dyb3VuZCAqLwojY2FsY3VsYXRvciAud3JhcHBlcntwb3NpdGlvbjpyZWxhdGl2ZTt6LWluZGV4OjE7bWF4LXdpZHRoOjkyMHB4O21hcmdpbjowIGF1dG87cGFkZGluZzozMnB4IDE2cHggODBweH0KLmhlYWRlcnt0ZXh0LWFsaWduOmNlbnRlcjttYXJnaW4tYm90dG9tOjM2cHh9Ci5sb2dvLXdyYXB7ZGlzcGxheTppbmxpbmUtZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjE0cHg7bWFyZ2luLWJvdHRvbToxNnB4O2N1cnNvcjpwb2ludGVyO3RleHQtZGVjb3JhdGlvbjpub25lfQoubG9nby1pbWd7aGVpZ2h0OjU2cHg7d2lkdGg6YXV0bztmaWx0ZXI6ZHJvcC1zaGFkb3coMCA0cHggMTZweCByZ2JhKDIwMSwxNjgsNzYsLjMpKX0KLmxvZ28tdGV4dCBoMXtmb250LXNpemU6MjRweDtmb250LXdlaWdodDo4MDA7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLHZhcigtLWdvbGQtbGlnaHQpLHZhcigtLWdvbGQpKTstd2Via2l0LWJhY2tncm91bmQtY2xpcDp0ZXh0Oy13ZWJraXQtdGV4dC1maWxsLWNvbG9yOnRyYW5zcGFyZW50O2JhY2tncm91bmQtY2xpcDp0ZXh0O3RleHQtYWxpZ246cmlnaHR9Ci5sb2dvLXRleHQgcHtmb250LXNpemU6MTNweDtjb2xvcjp2YXIoLS10ZXh0LW11dGVkKTt0ZXh0LWFsaWduOnJpZ2h0fQouaGVhZGVyLWRpdmlkZXJ7aGVpZ2h0OjFweDtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCg5MGRlZyx0cmFuc3BhcmVudCx2YXIoLS1nb2xkLWRpbSksdHJhbnNwYXJlbnQpO21heC13aWR0aDo0NDBweDttYXJnaW46MCBhdXRvfQoudGFic3tkaXNwbGF5OmZsZXg7YmFja2dyb3VuZDp2YXIoLS1zdXJmYWNlKTtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7Ym9yZGVyLXJhZGl1czo1MHB4O3BhZGRpbmc6NHB4O21hcmdpbi1ib3R0b206MjhweDtnYXA6NHB4fQoudGFiLWJ0bntmbGV4OjE7cGFkZGluZzoxMXB4O2JvcmRlcjpub25lO2JhY2tncm91bmQ6dHJhbnNwYXJlbnQ7Y29sb3I6dmFyKC0tdGV4dC1tdXRlZCk7Zm9udC1mYW1pbHk6J0hlZWJvJyxzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNXB4O2ZvbnQtd2VpZ2h0OjYwMDtib3JkZXItcmFkaXVzOjQ2cHg7Y3Vyc29yOnBvaW50ZXI7dHJhbnNpdGlvbjphbGwgLjI1c30KLnRhYi1idG4uYWN0aXZle2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDEzNWRlZyx2YXIoLS1nb2xkKSwjYTg3ODJhKTtjb2xvcjojMGYwZTBkO2JveC1zaGFkb3c6MCA0cHggMjBweCByZ2JhKDIwMSwxNjgsNzYsLjM1KX0KLnRhYi1idG46bm90KC5hY3RpdmUpOmhvdmVye2NvbG9yOnZhcigtLXRleHQpO2JhY2tncm91bmQ6dmFyKC0tc3VyZmFjZTIpfQouc2VjdGlvbntkaXNwbGF5Om5vbmV9LnNlY3Rpb24uYWN0aXZle2Rpc3BsYXk6YmxvY2t9Ci5jYXJwZXQtbGlzdHtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2dhcDoxOHB4fQouY2FycGV0LWNhcmR7YmFja2dyb3VuZDp2YXIoLS1zdXJmYWNlKTtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7Ym9yZGVyLXJhZGl1czp2YXIoLS1yYWRpdXMpO3BhZGRpbmc6MjJweDtwb3NpdGlvbjpyZWxhdGl2ZTt0cmFuc2l0aW9uOmJvcmRlci1jb2xvciAuMnM7YW5pbWF0aW9uOnNsaWRlSW4gLjNzIGVhc2V9Ci5jYXJwZXQtY2FyZDpob3Zlcntib3JkZXItY29sb3I6dmFyKC0tZ29sZC1kaW0pfQpAa2V5ZnJhbWVzIHNsaWRlSW57ZnJvbXtvcGFjaXR5OjA7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoMTBweCl9dG97b3BhY2l0eToxO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDApfX0KLmNhcnBldC1jYXJkLWhlYWRlcntkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47YWxpZ24taXRlbXM6Y2VudGVyO21hcmdpbi1ib3R0b206MThweH0KLmNhcnBldC1udW17Zm9udC1zaXplOjExcHg7Zm9udC13ZWlnaHQ6NzAwO2NvbG9yOnZhcigtLWdvbGQpO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtsZXR0ZXItc3BhY2luZzoxLjVweH0KLnJlbW92ZS1idG57d2lkdGg6MjhweDtoZWlnaHQ6MjhweDtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7YmFja2dyb3VuZDp0cmFuc3BhcmVudDtjb2xvcjp2YXIoLS10ZXh0LW11dGVkKTtib3JkZXItcmFkaXVzOjUwJTtjdXJzb3I6cG9pbnRlcjtmb250LXNpemU6MTVweDtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7dHJhbnNpdGlvbjphbGwgLjJzfQoucmVtb3ZlLWJ0bjpob3Zlcntib3JkZXItY29sb3I6I2MwMzkyYjtjb2xvcjojYzAzOTJiO2JhY2tncm91bmQ6cmdiYSgxOTIsNTcsNDMsLjEpfQouZGltcy1wcmV2aWV3LXJvd3tkaXNwbGF5OmdyaWQ7Z3JpZC10ZW1wbGF0ZS1jb2x1bW5zOjFmciAxMTBweDtnYXA6MTRweDttYXJnaW4tYm90dG9tOjE4cHg7YWxpZ24taXRlbXM6c3RhcnR9Ci5kaW1zLWlucHV0c3tkaXNwbGF5OmdyaWQ7Z3JpZC10ZW1wbGF0ZS1jb2x1bW5zOjFmciAxZnI7Z2FwOjEwcHh9Ci5maWVsZCBsYWJlbHtkaXNwbGF5OmJsb2NrO2ZvbnQtc2l6ZToxMXB4O2ZvbnQtd2VpZ2h0OjcwMDtjb2xvcjp2YXIoLS10ZXh0LW11dGVkKTttYXJnaW4tYm90dG9tOjVweDtsZXR0ZXItc3BhY2luZzouNXB4fQouZmllbGQgaW5wdXRbdHlwZT0ibnVtYmVyIl17d2lkdGg6MTAwJTtiYWNrZ3JvdW5kOnZhcigtLXN1cmZhY2UyKTtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7Ym9yZGVyLXJhZGl1czp2YXIoLS1yYWRpdXMtc20pO2NvbG9yOnZhcigtLXRleHQpO2ZvbnQtZmFtaWx5OidIZWVibycsc2Fucy1zZXJpZjtmb250LXNpemU6MTZweDtmb250LXdlaWdodDo3MDA7cGFkZGluZzoxMHB4IDEycHg7b3V0bGluZTpub25lO3RyYW5zaXRpb246Ym9yZGVyLWNvbG9yIC4ycyxib3gtc2hhZG93IC4yc30KLmZpZWxkIGlucHV0OmZvY3Vze2JvcmRlci1jb2xvcjp2YXIoLS1nb2xkLWRpbSk7Ym94LXNoYWRvdzowIDAgMCAzcHggcmdiYSgyMDEsMTY4LDc2LC4xMil9Ci5hcmVhLWluZm97Z3JpZC1jb2x1bW46MS8tMTtiYWNrZ3JvdW5kOnZhcigtLXN1cmZhY2UyKTtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7Ym9yZGVyLXJhZGl1czp2YXIoLS1yYWRpdXMtc20pO3BhZGRpbmc6OHB4IDEycHg7dGV4dC1hbGlnbjpjZW50ZXI7bWFyZ2luLXRvcDo4cHh9Ci5hcmVhLXZhbHtmb250LXNpemU6MThweDtmb250LXdlaWdodDo4MDA7Y29sb3I6dmFyKC0tZ29sZCl9LmFyZWEtbGJse2ZvbnQtc2l6ZToxMHB4O2NvbG9yOnZhcigtLXRleHQtbXV0ZWQpO2Rpc3BsYXk6YmxvY2s7bGV0dGVyLXNwYWNpbmc6LjVweH0KLmNhcnBldC1wcmV2aWV3e2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47YWxpZ24taXRlbXM6Y2VudGVyO2dhcDo1cHh9Ci5wcmV2aWV3LWJveHt3aWR0aDoxMDAlO2JhY2tncm91bmQ6dmFyKC0tc3VyZmFjZTIpO2JvcmRlcjoxcHggc29saWQgdmFyKC0tYm9yZGVyKTtib3JkZXItcmFkaXVzOjEwcHg7cGFkZGluZzo4cHg7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO21pbi1oZWlnaHQ6ODZweH0KLnByZXZpZXctbGFiZWx7Zm9udC1zaXplOjEwcHg7Y29sb3I6dmFyKC0tdGV4dC1kaW0pO3RleHQtYWxpZ246Y2VudGVyfQoudHlwZS1ncmlke2Rpc3BsYXk6Z3JpZDtncmlkLXRlbXBsYXRlLWNvbHVtbnM6cmVwZWF0KDMsMWZyKTtnYXA6OHB4O21hcmdpbi1ib3R0b206MTZweH0KLnR5cGUtb3B0e3Bvc2l0aW9uOnJlbGF0aXZlfS50eXBlLW9wdCBpbnB1dHtwb3NpdGlvbjphYnNvbHV0ZTtvcGFjaXR5OjA7d2lkdGg6MDtoZWlnaHQ6MH0KLnR5cGUtb3B0IGxhYmVse2Rpc3BsYXk6YmxvY2s7cGFkZGluZzoxMHB4IDhweDtiYWNrZ3JvdW5kOnZhcigtLXN1cmZhY2UyKTtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7Ym9yZGVyLXJhZGl1czp2YXIoLS1yYWRpdXMtc20pO2N1cnNvcjpwb2ludGVyO3RleHQtYWxpZ246Y2VudGVyO3RyYW5zaXRpb246YWxsIC4yc30KLnR5cGUtbmFtZXtmb250LXNpemU6MTJweDtmb250LXdlaWdodDo2MDA7Y29sb3I6dmFyKC0tdGV4dC1tdXRlZCk7ZGlzcGxheTpibG9ja30KLnR5cGUtcHJpY2V7Zm9udC1zaXplOjExcHg7Y29sb3I6dmFyKC0tdGV4dC1kaW0pO2Rpc3BsYXk6YmxvY2s7bWFyZ2luLXRvcDoycHh9Ci50eXBlLW9wdCBpbnB1dDpjaGVja2VkK2xhYmVse2JvcmRlci1jb2xvcjp2YXIoLS1nb2xkKTtiYWNrZ3JvdW5kOnJnYmEoMjAxLDE2OCw3NiwuMSl9Ci50eXBlLW9wdCBpbnB1dDpjaGVja2VkK2xhYmVsIC50eXBlLW5hbWV7Y29sb3I6dmFyKC0tZ29sZC1saWdodCl9Ci50eXBlLW9wdCBpbnB1dDpjaGVja2VkK2xhYmVsIC50eXBlLXByaWNle2NvbG9yOnZhcigtLWdvbGQpfQouc2VydmljZXMtdGl0bGV7Zm9udC1zaXplOjExcHg7Zm9udC13ZWlnaHQ6NzAwO2NvbG9yOnZhcigtLXRleHQtbXV0ZWQpO2xldHRlci1zcGFjaW5nOi41cHg7bWFyZ2luLWJvdHRvbTo4cHh9Ci5zZXJ2aWNlcy1ncmlke2Rpc3BsYXk6Z3JpZDtncmlkLXRlbXBsYXRlLWNvbHVtbnM6MWZyIDFmcjtnYXA6N3B4O21hcmdpbi1ib3R0b206MTRweH0KLnN2Yy1vcHR7cG9zaXRpb246cmVsYXRpdmV9LnN2Yy1vcHQgaW5wdXR7cG9zaXRpb246YWJzb2x1dGU7b3BhY2l0eTowO3dpZHRoOjA7aGVpZ2h0OjB9Ci5zdmMtb3B0IGxhYmVse2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjhweDtwYWRkaW5nOjlweCAxMXB4O2JhY2tncm91bmQ6dmFyKC0tc3VyZmFjZTIpO2JvcmRlcjoxcHggc29saWQgdmFyKC0tYm9yZGVyKTtib3JkZXItcmFkaXVzOnZhcigtLXJhZGl1cy1zbSk7Y3Vyc29yOnBvaW50ZXI7dHJhbnNpdGlvbjphbGwgLjJzfQouc3ZjLW9wdCBpbnB1dDpjaGVja2VkK2xhYmVse2JvcmRlci1jb2xvcjp2YXIoLS1nb2xkLWRpbSk7YmFja2dyb3VuZDpyZ2JhKDIwMSwxNjgsNzYsLjA3KX0KLmNoa3t3aWR0aDoxN3B4O2hlaWdodDoxN3B4O2JvcmRlcjoxLjVweCBzb2xpZCB2YXIoLS1ib3JkZXIpO2JvcmRlci1yYWRpdXM6NHB4O2ZsZXgtc2hyaW5rOjA7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2ZvbnQtc2l6ZToxMHB4O2NvbG9yOnRyYW5zcGFyZW50O3RyYW5zaXRpb246YWxsIC4yc30KLnN2Yy1vcHQgaW5wdXQ6Y2hlY2tlZCtsYWJlbCAuY2hre2JhY2tncm91bmQ6dmFyKC0tZ29sZCk7Ym9yZGVyLWNvbG9yOnZhcigtLWdvbGQpO2NvbG9yOiMwMDB9Ci5zdmMtbmFtZXtmb250LXNpemU6MTJweDtmb250LXdlaWdodDo1MDA7Y29sb3I6dmFyKC0tdGV4dCk7ZGlzcGxheTpibG9ja30KLnN2Yy1wcmljZS1sYmx7Zm9udC1zaXplOjEwcHg7Y29sb3I6dmFyKC0tdGV4dC1tdXRlZCk7ZGlzcGxheTpibG9ja30KLmNhcmQtc3VidG90YWx7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLHJnYmEoMjAxLDE2OCw3NiwuMDgpLHJnYmEoMjEyLDExOCw1OSwuMDUpKTtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWdvbGQtZGltKTtib3JkZXItcmFkaXVzOnZhcigtLXJhZGl1cy1zbSk7cGFkZGluZzoxMXB4IDE0cHg7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2FsaWduLWl0ZW1zOmNlbnRlcjttYXJnaW4tdG9wOjE0cHh9Ci5jYXJkLXN1YnRvdGFsLWxhYmVse2ZvbnQtc2l6ZToxMnB4O2NvbG9yOnZhcigtLXRleHQtbXV0ZWQpfS5jYXJkLXN1YnRvdGFsLWFtb3VudHtmb250LXNpemU6MjBweDtmb250LXdlaWdodDo4MDA7Y29sb3I6dmFyKC0tZ29sZC1saWdodCl9Ci5hZGQtYnRue2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjtnYXA6OHB4O3dpZHRoOjEwMCU7cGFkZGluZzoxM3B4O2JhY2tncm91bmQ6dHJhbnNwYXJlbnQ7Ym9yZGVyOjEuNXB4IGRhc2hlZCB2YXIoLS1ib3JkZXIpO2JvcmRlci1yYWRpdXM6dmFyKC0tcmFkaXVzKTtjb2xvcjp2YXIoLS10ZXh0LW11dGVkKTtmb250LWZhbWlseTonSGVlYm8nLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEzcHg7Zm9udC13ZWlnaHQ6NjAwO2N1cnNvcjpwb2ludGVyO3RyYW5zaXRpb246YWxsIC4yczttYXJnaW4tdG9wOjRweH0KLmFkZC1idG46aG92ZXJ7Ym9yZGVyLWNvbG9yOnZhcigtLWdvbGQtZGltKTtjb2xvcjp2YXIoLS1nb2xkKX0KLmRlbGl2ZXJ5LXNlY3Rpb257YmFja2dyb3VuZDp2YXIoLS1zdXJmYWNlKTtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7Ym9yZGVyLXJhZGl1czp2YXIoLS1yYWRpdXMpO3BhZGRpbmc6MjJweDttYXJnaW4tdG9wOjE4cHh9Ci5kZWxpdmVyeS1zZWN0aW9uIGgze2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjcwMDtjb2xvcjp2YXIoLS10ZXh0LW11dGVkKTtsZXR0ZXItc3BhY2luZzouNXB4O21hcmdpbi1ib3R0b206MTRweH0KLmRlbGl2ZXJ5LWdyaWR7ZGlzcGxheTpncmlkO2dyaWQtdGVtcGxhdGUtY29sdW1uczoxZnIgMWZyO2dhcDoxMHB4O21hcmdpbi1ib3R0b206MTRweH0KLmRlbGl2ZXJ5LW9wdHtwb3NpdGlvbjpyZWxhdGl2ZX0uZGVsaXZlcnktb3B0IGlucHV0e3Bvc2l0aW9uOmFic29sdXRlO29wYWNpdHk6MH0KLmRlbGl2ZXJ5LW9wdCBsYWJlbHtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2dhcDoxMHB4O3BhZGRpbmc6MTNweCAxNHB4O2JhY2tncm91bmQ6dmFyKC0tc3VyZmFjZTIpO2JvcmRlcjoxcHggc29saWQgdmFyKC0tYm9yZGVyKTtib3JkZXItcmFkaXVzOnZhcigtLXJhZGl1cy1zbSk7Y3Vyc29yOnBvaW50ZXI7dHJhbnNpdGlvbjphbGwgLjJzfQouZGVsaXZlcnktb3B0IGlucHV0OmNoZWNrZWQrbGFiZWx7Ym9yZGVyLWNvbG9yOnZhcigtLWdvbGQpO2JhY2tncm91bmQ6cmdiYSgyMDEsMTY4LDc2LC4xKX0KLmRlbGl2ZXJ5LWljb257Zm9udC1zaXplOjIwcHh9LmRlbGl2ZXJ5LW5hbWV7Zm9udC1zaXplOjEzcHg7Zm9udC13ZWlnaHQ6NjAwO2NvbG9yOnZhcigtLXRleHQpO2Rpc3BsYXk6YmxvY2t9LmRlbGl2ZXJ5LWRlc2N7Zm9udC1zaXplOjExcHg7Y29sb3I6dmFyKC0tdGV4dC1tdXRlZCk7ZGlzcGxheTpibG9ja30KLmJyYW5jaC1yb3d7ZGlzcGxheTpub25lO21hcmdpbi10b3A6MTBweH0uYnJhbmNoLXJvdy52aXNpYmxle2Rpc3BsYXk6YmxvY2t9Ci5icmFuY2gtcm93PmxhYmVse2ZvbnQtc2l6ZToxMXB4O2NvbG9yOnZhcigtLXRleHQtbXV0ZWQpO2ZvbnQtd2VpZ2h0OjcwMDtkaXNwbGF5OmJsb2NrO21hcmdpbi1ib3R0b206NnB4O2xldHRlci1zcGFjaW5nOi41cHh9Ci5icmFuY2gtcm93IHNlbGVjdHt3aWR0aDoxMDAlO2JhY2tncm91bmQ6dmFyKC0tc3VyZmFjZTIpO2JvcmRlcjoxcHggc29saWQgdmFyKC0tYm9yZGVyKTtib3JkZXItcmFkaXVzOnZhcigtLXJhZGl1cy1zbSk7Y29sb3I6dmFyKC0tdGV4dCk7Zm9udC1mYW1pbHk6J0hlZWJvJyxzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjYwMDtwYWRkaW5nOjEwcHggMTJweDtvdXRsaW5lOm5vbmU7YXBwZWFyYW5jZTpub25lO2N1cnNvcjpwb2ludGVyO3RyYW5zaXRpb246Ym9yZGVyLWNvbG9yIC4yc30KLmJyYW5jaC1yb3cgc2VsZWN0OmZvY3Vze2JvcmRlci1jb2xvcjp2YXIoLS1nb2xkLWRpbSl9Ci5icmFuY2gtZGV0YWlse21hcmdpbi10b3A6MTBweDtwYWRkaW5nOjEycHggMTRweDtiYWNrZ3JvdW5kOnZhcigtLXN1cmZhY2UyKTtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7Ym9yZGVyLXJhZGl1czp2YXIoLS1yYWRpdXMtc20pO2ZvbnQtc2l6ZToxMnB4O2NvbG9yOnZhcigtLXRleHQtbXV0ZWQpO2xpbmUtaGVpZ2h0OjEuNztkaXNwbGF5Om5vbmV9Ci5icmFuY2gtZGV0YWlsLnZpc2libGV7ZGlzcGxheTpibG9ja30uYnJhbmNoLWRldGFpbCBzdHJvbmd7Y29sb3I6dmFyKC0tdGV4dCk7ZGlzcGxheTpibG9jazttYXJnaW4tYm90dG9tOjJweH0KLnRvdGFsLXBhbmVse21hcmdpbi10b3A6MjBweDtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxMzVkZWcsIzBlMGUxMCwjMDgwODA5KTtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWdvbGQtZGltKTtib3JkZXItcmFkaXVzOnZhcigtLXJhZGl1cyk7cGFkZGluZzoyNHB4O2JveC1zaGFkb3c6MCAxMnB4IDQ4cHggcmdiYSgwLDAsMCwuNCksaW5zZXQgMCAxcHggMCByZ2JhKDIwMSwxNjgsNzYsLjIpfQoudG90YWwtcm93c3tkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2dhcDoxMHB4O21hcmdpbi1ib3R0b206MTZweH0KLnRvdGFsLXJvd3tkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47YWxpZ24taXRlbXM6Y2VudGVyO2ZvbnQtc2l6ZToxM3B4fQoudG90YWwtcm93IC50ci1sYWJlbHtjb2xvcjp2YXIoLS10ZXh0LW11dGVkKX0udG90YWwtcm93IC50ci12YWx7Y29sb3I6dmFyKC0tdGV4dCk7Zm9udC13ZWlnaHQ6NjAwfQoudG90YWwtcm93LmRpc2Mtcm93IC50ci12YWx7Y29sb3I6dmFyKC0tZ3JlZW4pfS50b3RhbC1yb3cuZGVsLXJvdyAudHItdmFse2NvbG9yOnZhcigtLWFjY2VudCl9Ci50b3RhbC1kaXZpZGVye2hlaWdodDoxcHg7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoOTBkZWcsdHJhbnNwYXJlbnQsdmFyKC0tZ29sZC1kaW0pLHRyYW5zcGFyZW50KTttYXJnaW46NHB4IDB9Ci50b3RhbC1tYWlue2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjthbGlnbi1pdGVtczpiYXNlbGluZX0KLnRvdGFsLW1haW4tbGFiZWx7Zm9udC1zaXplOjE1cHg7Zm9udC13ZWlnaHQ6NzAwO2NvbG9yOnZhcigtLXRleHQpfQoudG90YWwtbWFpbi1hbW91bnR7Zm9udC1zaXplOjM2cHg7Zm9udC13ZWlnaHQ6ODAwO2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDEzNWRlZyx2YXIoLS1nb2xkLWxpZ2h0KSx2YXIoLS1nb2xkKSk7LXdlYmtpdC1iYWNrZ3JvdW5kLWNsaXA6dGV4dDstd2Via2l0LXRleHQtZmlsbC1jb2xvcjp0cmFuc3BhcmVudDtiYWNrZ3JvdW5kLWNsaXA6dGV4dDtsZXR0ZXItc3BhY2luZzotMXB4fQoudG90YWwtdmF0e2ZvbnQtc2l6ZToxMXB4O2NvbG9yOnZhcigtLXRleHQtZGltKTt0ZXh0LWFsaWduOmxlZnQ7bWFyZ2luLXRvcDozcHh9Ci5taW4tbm90aWNle2Rpc3BsYXk6bm9uZTttYXJnaW4tdG9wOjEwcHg7cGFkZGluZzoxMHB4IDE0cHg7YmFja2dyb3VuZDpyZ2JhKDIxMiwxMTgsNTksLjEpO2JvcmRlcjoxcHggc29saWQgcmdiYSgyMTIsMTE4LDU5LC4zNSk7Ym9yZGVyLXJhZGl1czp2YXIoLS1yYWRpdXMtc20pO2ZvbnQtc2l6ZToxMnB4O2NvbG9yOnZhcigtLWFjY2VudCl9Ci5taW4tbm90aWNlLnZpc2libGV7ZGlzcGxheTpibG9ja30KLmFjdGlvbi1yb3d7ZGlzcGxheTpncmlkO2dyaWQtdGVtcGxhdGUtY29sdW1uczoxZnI7Z2FwOjEwcHg7bWFyZ2luLXRvcDoxNnB4fQoucHJpbnQtYnRue3BhZGRpbmc6MTJweDtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7Ym9yZGVyLXJhZGl1czp2YXIoLS1yYWRpdXMpO2JhY2tncm91bmQ6dHJhbnNwYXJlbnQ7Y29sb3I6dmFyKC0tdGV4dC1tdXRlZCk7Zm9udC1mYW1pbHk6J0hlZWJvJyxzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxM3B4O2ZvbnQtd2VpZ2h0OjYwMDtjdXJzb3I6cG9pbnRlcjt0cmFuc2l0aW9uOmFsbCAuMnM7d2lkdGg6MTAwJX0KLnByaW50LWJ0bjpob3Zlcntib3JkZXItY29sb3I6dmFyKC0tdGV4dC1kaW0pO2NvbG9yOnZhcigtLXRleHQpfQouc3VtbWFyeS1ub3Rle2ZvbnQtc2l6ZToxMXB4O2NvbG9yOnZhcigtLXRleHQtZGltKTt0ZXh0LWFsaWduOmNlbnRlcjttYXJnaW4tdG9wOjEwcHh9Ci5yZXBhaXItbGlzdHtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2dhcDoxNnB4fQoucmVwYWlyLWNhcmR7YmFja2dyb3VuZDp2YXIoLS1zdXJmYWNlKTtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7Ym9yZGVyLXJhZGl1czp2YXIoLS1yYWRpdXMpO3BhZGRpbmc6MjBweDthbmltYXRpb246c2xpZGVJbiAuM3MgZWFzZX0KLnJlcGFpci1zZXJ2aWNlc3tkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2dhcDo3cHh9Ci5yc3ZjLWNhdGVnb3J5e2ZvbnQtc2l6ZToxMHB4O2ZvbnQtd2VpZ2h0OjcwMDtjb2xvcjp2YXIoLS10ZXh0LWRpbSk7bGV0dGVyLXNwYWNpbmc6MS41cHg7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO3BhZGRpbmc6MTBweCAwIDVweDtib3JkZXItdG9wOjFweCBzb2xpZCB2YXIoLS1ib3JkZXIpfQoucnN2Yy1jYXRlZ29yeTpmaXJzdC1jaGlsZHtib3JkZXItdG9wOm5vbmU7cGFkZGluZy10b3A6MH0KLnJzdmMtb3B0e3Bvc2l0aW9uOnJlbGF0aXZlfS5yc3ZjLW9wdCBpbnB1dHtwb3NpdGlvbjphYnNvbHV0ZTtvcGFjaXR5OjB9Ci5yc3ZjLW9wdCBsYWJlbHtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO3BhZGRpbmc6OXB4IDEycHg7YmFja2dyb3VuZDp2YXIoLS1zdXJmYWNlMik7Ym9yZGVyOjFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO2JvcmRlci1yYWRpdXM6dmFyKC0tcmFkaXVzLXNtKTtjdXJzb3I6cG9pbnRlcjt0cmFuc2l0aW9uOmFsbCAuMnM7Z2FwOjEwcHh9Ci5yc3ZjLW9wdCBpbnB1dDpjaGVja2VkK2xhYmVse2JvcmRlci1jb2xvcjp2YXIoLS1hY2NlbnQpO2JhY2tncm91bmQ6cmdiYSgyMTIsMTE4LDU5LC4wOCl9Ci5yc3ZjLWxlZnR7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtnYXA6OHB4fQoucnN2Yy1jaGVja3t3aWR0aDoxN3B4O2hlaWdodDoxN3B4O2JvcmRlcjoxLjVweCBzb2xpZCB2YXIoLS1ib3JkZXIpO2JvcmRlci1yYWRpdXM6NHB4O2ZsZXgtc2hyaW5rOjA7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2ZvbnQtc2l6ZToxMHB4O2NvbG9yOnRyYW5zcGFyZW50O3RyYW5zaXRpb246YWxsIC4yc30KLnJzdmMtb3B0IGlucHV0OmNoZWNrZWQrbGFiZWwgLnJzdmMtY2hlY2t7YmFja2dyb3VuZDp2YXIoLS1hY2NlbnQpO2JvcmRlci1jb2xvcjp2YXIoLS1hY2NlbnQpO2NvbG9yOiNmZmZ9Ci5yc3ZjLW5hbWV7Zm9udC1zaXplOjEycHg7Y29sb3I6dmFyKC0tdGV4dCk7Zm9udC13ZWlnaHQ6NTAwfQoucnN2Yy1wcmljZS1iYWRnZXtmb250LXNpemU6MTFweDtjb2xvcjp2YXIoLS10ZXh0LW11dGVkKTtiYWNrZ3JvdW5kOnZhcigtLWJnKTtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7Ym9yZGVyLXJhZGl1czo0cHg7cGFkZGluZzoycHggN3B4O3doaXRlLXNwYWNlOm5vd3JhcDtmbGV4LXNocmluazowfQoucnN2Yy1vcHQgaW5wdXQ6Y2hlY2tlZCtsYWJlbCAucnN2Yy1wcmljZS1iYWRnZXtjb2xvcjp2YXIoLS1hY2NlbnQpO2JvcmRlci1jb2xvcjp2YXIoLS1hY2NlbnQpfQouc2lkZS1zZWxlY3RvcnttYXJnaW46NnB4IDAgNHB4O3BhZGRpbmc6MTBweCAxMnB4O2JhY2tncm91bmQ6dmFyKC0tc3VyZmFjZTIpO2JvcmRlcjoxcHggc29saWQgdmFyKC0tYm9yZGVyKTtib3JkZXItcmFkaXVzOnZhcigtLXJhZGl1cy1zbSk7ZGlzcGxheTpub25lfQouc2lkZS1zZWxlY3Rvci52aXNpYmxle2Rpc3BsYXk6YmxvY2t9Ci5zaWRlLXNlbC10aXRsZXtmb250LXNpemU6MTBweDtmb250LXdlaWdodDo3MDA7Y29sb3I6dmFyKC0tdGV4dC1tdXRlZCk7bGV0dGVyLXNwYWNpbmc6LjVweDttYXJnaW4tYm90dG9tOjhweDtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47YWxpZ24taXRlbXM6Y2VudGVyfQouc2lkZS1zZWwtdGl0bGUgc3Bhbntjb2xvcjp2YXIoLS1nb2xkKTtmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjEycHh9Ci5zaWRlcy1ncmlke2Rpc3BsYXk6Z3JpZDtnYXA6NXB4fQouc2lkZXMtZ3JpZC5mb3Vye2dyaWQtdGVtcGxhdGUtY29sdW1uczoxZnIgMWZyIDFmciAxZnJ9Ci5zaWRlcy1ncmlkLnR3b3tncmlkLXRlbXBsYXRlLWNvbHVtbnM6MWZyIDFmcn0KLnNpZGUtYnRue3BhZGRpbmc6NnB4IDRweDtiYWNrZ3JvdW5kOnZhcigtLXN1cmZhY2UpO2JvcmRlcjoxcHggc29saWQgdmFyKC0tYm9yZGVyKTtib3JkZXItcmFkaXVzOjZweDtjdXJzb3I6cG9pbnRlcjt0ZXh0LWFsaWduOmNlbnRlcjt0cmFuc2l0aW9uOmFsbCAuMnM7Zm9udC1zaXplOjExcHg7Zm9udC13ZWlnaHQ6NjAwO2NvbG9yOnZhcigtLXRleHQtbXV0ZWQpfQouc2lkZS1idG4uYWN0aXZle2JvcmRlci1jb2xvcjp2YXIoLS1hY2NlbnQpO2JhY2tncm91bmQ6cmdiYSgyMTIsMTE4LDU5LC4xMik7Y29sb3I6dmFyKC0tYWNjZW50KX0KLnNpZGUtYnRuIC5zYi1sZW57Zm9udC1zaXplOjEwcHg7Y29sb3I6dmFyKC0tdGV4dC1kaW0pO2Rpc3BsYXk6YmxvY2s7Zm9udC13ZWlnaHQ6NDAwO21hcmdpbi10b3A6MXB4fQouc2lkZS10b3RhbC1ub3Rle2ZvbnQtc2l6ZToxMHB4O2NvbG9yOnZhcigtLXRleHQtZGltKTttYXJnaW4tdG9wOjZweDt0ZXh0LWFsaWduOmxlZnR9Ci5yZXBhaXItY2FyZC1zdWJ0b3RhbHtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxMzVkZWcscmdiYSgyMTIsMTE4LDU5LC4wOCkscmdiYSgyMTIsMTE4LDU5LC4wNCkpO2JvcmRlcjoxcHggc29saWQgcmdiYSgyMTIsMTE4LDU5LC4zNSk7Ym9yZGVyLXJhZGl1czp2YXIoLS1yYWRpdXMtc20pO3BhZGRpbmc6MTFweCAxNHB4O2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjthbGlnbi1pdGVtczpjZW50ZXI7bWFyZ2luLXRvcDoxNHB4fQouY3MtbGFiZWx7Zm9udC1zaXplOjEycHg7Y29sb3I6dmFyKC0tdGV4dC1tdXRlZCl9LmNzLWFtdHtmb250LXNpemU6MjBweDtmb250LXdlaWdodDo4MDA7Y29sb3I6dmFyKC0tYWNjZW50KX0KQG1lZGlhIHByaW50ewogICp7LXdlYmtpdC1wcmludC1jb2xvci1hZGp1c3Q6ZXhhY3QhaW1wb3J0YW50O3ByaW50LWNvbG9yLWFkanVzdDpleGFjdCFpbXBvcnRhbnR9CiAgYm9keXtiYWNrZ3JvdW5kOiNmZmYhaW1wb3J0YW50O2NvbG9yOiMwMDAhaW1wb3J0YW50O2RpcmVjdGlvbjpydGx9CiAgYm9keTo6YmVmb3Jle2Rpc3BsYXk6bm9uZX0KICAudGFicywuYWRkLWJ0biwuYWN0aW9uLXJvdywuc3VtbWFyeS1ub3RlLC5kZWxpdmVyeS1zZWN0aW9uLC5yZW1vdmUtYnRuLC5jYXJwZXQtcHJldmlldywuc2lkZS1zZWxlY3RvcntkaXNwbGF5Om5vbmUhaW1wb3J0YW50fQogIC5jYXJwZXQtY2FyZCwucmVwYWlyLWNhcmR7Ym9yZGVyOjFweCBzb2xpZCAjY2NjIWltcG9ydGFudDtiYWNrZ3JvdW5kOiNmZmYhaW1wb3J0YW50O2JveC1zaGFkb3c6bm9uZSFpbXBvcnRhbnQ7YnJlYWstaW5zaWRlOmF2b2lkO2NvbG9yOiMwMDAhaW1wb3J0YW50fQogIC5zZWN0aW9ue2Rpc3BsYXk6YmxvY2shaW1wb3J0YW50fQogIC50b3RhbC1tYWluLWFtb3VudHstd2Via2l0LXRleHQtZmlsbC1jb2xvcjojMDAwIWltcG9ydGFudDtmb250LXNpemU6MjhweCFpbXBvcnRhbnR9CiAgLmNhcmQtc3VidG90YWwsLnJlcGFpci1jYXJkLXN1YnRvdGFse2JhY2tncm91bmQ6I2Y1ZjVmNSFpbXBvcnRhbnR9CiAgLmFyZWEtdmFsLC5jYXJkLXN1YnRvdGFsLWFtb3VudHtjb2xvcjojZTg4MTJhIWltcG9ydGFudH0KICAudG90YWwtcGFuZWx7YmFja2dyb3VuZDojZmZmIWltcG9ydGFudDtib3JkZXI6MXB4IHNvbGlkICNjY2MhaW1wb3J0YW50O2JveC1zaGFkb3c6bm9uZSFpbXBvcnRhbnR9Cn0KQG1lZGlhKG1heC13aWR0aDo2MDBweCl7CiAgLnR5cGUtZ3JpZHtncmlkLXRlbXBsYXRlLWNvbHVtbnM6MWZyIDFmcn0uc2VydmljZXMtZ3JpZHtncmlkLXRlbXBsYXRlLWNvbHVtbnM6MWZyfQogIC5kaW1zLXByZXZpZXctcm93e2dyaWQtdGVtcGxhdGUtY29sdW1uczoxZnJ9LmNhcnBldC1wcmV2aWV3e2Rpc3BsYXk6bm9uZX0KICAuZGVsaXZlcnktZ3JpZHtncmlkLXRlbXBsYXRlLWNvbHVtbnM6MWZyfQogIC5zaWRlcy1ncmlkLmZvdXJ7Z3JpZC10ZW1wbGF0ZS1jb2x1bW5zOjFmciAxZnJ9Cn0KCi8qIGhpZGUgaW52b2ljZSBvbiBzY3JlZW4gKi8KI3ByaW50LWludm9pY2UgeyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IH0KCkBtZWRpYSBwcmludCB7CiAgKiB7IC13ZWJraXQtcHJpbnQtY29sb3ItYWRqdXN0OiBleGFjdCAhaW1wb3J0YW50OyBwcmludC1jb2xvci1hZGp1c3Q6IGV4YWN0ICFpbXBvcnRhbnQ7IH0KICBodG1sLCBib2R5IHsgYmFja2dyb3VuZDogI2ZmZiAhaW1wb3J0YW50OyBtYXJnaW46IDAgIWltcG9ydGFudDsgcGFkZGluZzogMCAhaW1wb3J0YW50OyB9CiAgYm9keTo6YmVmb3JlIHsgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OyB9CiAgLyogaGlkZSBldmVyeXRoaW5nICovCiAgLndyYXBwZXIgeyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IH0KICAvKiBzaG93IG9ubHkgaW52b2ljZSAqLwogICNwcmludC1pbnZvaWNlIHsgZGlzcGxheTogYmxvY2sgIWltcG9ydGFudDsgcG9zaXRpb246IHN0YXRpYyAhaW1wb3J0YW50OyB9Cn0KCi8qIGVuc3VyZSBjYWxjIHNlY3Rpb24gaGFzIGNvcnJlY3QgZGFyayBiYWNrZ3JvdW5kICovCiNjYWxjdWxhdG9yIHsgYmFja2dyb3VuZDogIzBmMGUwZCAhaW1wb3J0YW50OyB9CiNjYWxjdWxhdG9yIC53cmFwcGVyIHsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IH0KLyogZml4IGFueSByZW1haW5pbmcgLS1iZyByZWZlcmVuY2VzIGluc2lkZSBjYWxjICovCiNjYWxjdWxhdG9yIHsgLS1iZzojMGYwZTBkOyAtLXN1cmZhY2U6IzFhMTgxNTsgLS1zdXJmYWNlMjojMjMyMDE4OyAtLWJvcmRlcjojMmUyYTIyOwogIC0tZ29sZDojZTg4MTJhOyAtLWdvbGQtbGlnaHQ6I2Y1YTA1YTsgLS1nb2xkLWRpbTpyZ2JhKDIzMiwxMjksNDIsLjM1KTsKICAtLXRleHQ6I2YwZjBmMjsgLS10ZXh0LW11dGVkOiM2MDYwNmE7IC0tdGV4dC1kaW06IzQwNDA0ODsKICAtLWFjY2VudDojZTg4MTJhOyAtLWdyZWVuOiM0Y2FmNzQ7IC0tcmFkaXVzOjE0cHg7IC0tcmFkaXVzLXNtOjhweDsgfQoKQG1lZGlhKG1heC13aWR0aDo3MDBweCl7CiAgLm9yYjF7d2lkdGg6MzAwcHghaW1wb3J0YW50O2hlaWdodDozMDBweCFpbXBvcnRhbnQ7dG9wOi04MHB4IWltcG9ydGFudDtyaWdodDotODBweCFpbXBvcnRhbnR9CiAgLm9yYjJ7d2lkdGg6MjUwcHghaW1wb3J0YW50O2hlaWdodDoyNTBweCFpbXBvcnRhbnQ7Ym90dG9tOi02MHB4IWltcG9ydGFudDtsZWZ0Oi02MHB4IWltcG9ydGFudH0KICAub3JiM3t3aWR0aDoyMDBweCFpbXBvcnRhbnQ7aGVpZ2h0OjIwMHB4IWltcG9ydGFudH0KICAuaGVyb3twYWRkaW5nOjEwMHB4IDIwcHggNDBweCFpbXBvcnRhbnR9CiAgLmhlcm8tdGl0bGV7Zm9udC1zaXplOmNsYW1wKDQ0cHgsMTV2dyw4MHB4KSFpbXBvcnRhbnQ7bGV0dGVyLXNwYWNpbmc6LTJweCFpbXBvcnRhbnR9CiAgLm1vY2t1cC13cmFwe21heC13aWR0aDoxMDAlIWltcG9ydGFudDtwYWRkaW5nOjAgNHB4fQogIC5mZWF0LWdyaWR7Z3JpZC10ZW1wbGF0ZS1jb2x1bW5zOjFmciFpbXBvcnRhbnR9CiAgLm5hdntwYWRkaW5nOjE0cHggMjBweCFpbXBvcnRhbnQ7cGFkZGluZy1yaWdodDo2NHB4IWltcG9ydGFudH0KICAuc3RhdC1ncmlke2dyaWQtdGVtcGxhdGUtY29sdW1uczpyZXBlYXQoMiwxZnIpIWltcG9ydGFudH0KfQo8L3N0eWxlPgo8L2hlYWQ+Cjxib2R5PgoKPCEtLSBFWEFDVCBmcm9tIG9yaWdpbmFsIHByb21vLTMgLS0+CjxkaXYgY2xhc3M9Im9yYiBvcmIxIj48L2Rpdj4KPGRpdiBjbGFzcz0ib3JiIG9yYjIiPjwvZGl2Pgo8ZGl2IGNsYXNzPSJvcmIgb3JiMyI+PC9kaXY+Cgo8bmF2IGNsYXNzPSJuYXYiPgogIDxhIGhyZWY9Imh0dHBzOi8vdHplbWVyLmNvLmlsIiB0YXJnZXQ9Il9ibGFuayIgY2xhc3M9Im5hdi1sb2dvIiBzdHlsZT0idGV4dC1kZWNvcmF0aW9uOm5vbmUiPgogICAgPGltZyBzcmM9ImRhdGE6aW1hZ2Uvd2VicDtiYXNlNjQsVWtsR1JsQVJBQUJYUlVKUVZsQTRXQW9BQUFBUUFBQUFLd0VBaHdBQVFVeFFTTDhPQUFBQnQ4ZWdiU1JINS9DSGZlMExnSWpJNGUwZ2E1N21MckxKbkRmeUYzakR0dTJRWG12YjFyZ3pacExoa1pFZXRtM2J0bTNidG0zYnRtM2JIajNzTVRvNS80L1IzVlYxbmxXcGEvNk02TDlFU1pMcnR0a1NFd2gremE1STRBNmZBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUF6TEhiUlA5SGFmZHc1dzZUMVU0V2d5c2N4TlJybDB2OVlBamhuenQzckplSjlUKzVxcnFXWGdoSGxBazlNb1FRUWdqdHU3ZWFwQzVHYXo0ZndxdEorTTU0dkl4RjYrZ1F3dDNEeTB0ayt4QkN6OFNmZDJ4UkJ6Kys5dE5kR1V5VkFIRFdFSDdZSkxtcGxiczhmYlpnYVpuY0gwTG9tZWdzQWpkdE8rbFlQbnE4SjRBVTZYL1F3YnR1WkZwWHpURTlybll1S1pSSmVyQXpmL3phTFNZWWEwZXJQNVRoL3ZSNHhtTzYrWDdZTUttdk56TnNYVlRpKy95SlgyN2VkS3lzWDFaNk9OUDZlL0VWVmdiaFZST21NM1p4cHE5WFppb2ptTTRkVkd6aTk1dldHeis5aDM2VE5wdk5aclBaYkRhYnpXYXoyV3cybTgxbXM5bHNOcHZOWnJQWmJJN3FId0c5N0NONXhpZVA5ZmhPaDdCbmN2MVVzV3plN2F0M0QxMHpmYXdUaHhCQzRZbGZyMTQvOVNMUStLcmRicmZiN1hhNzNXNjMyKzEydTkxdXQ5dnRkcnZkYnJmYjdYYjc5NUhGUi9mbHU0NE4vc2djeHN2UzNFNno1RHM3TnJsMkNDSEVUVnl6OGJDaytpdUVFR3VrNklhMTNOMFpoS2xXc3RseUliL2RJRUVvL2I4cVlPMkJDUlByaVFTcGZuL1ora1BUNmR0NEUzOFYrMmZ4TzRvaHZoUG44UDBDbUplTUd4MUtNWE5mTDFxRjkvbDN5OVZyanFpT0NvMEtNMGFWbU1jV3kzdXR5RXdPS21wdWo1VGFNNFNRYU9Lbnk5WWRWazB0Y1VjRVk4empQRmRSMEV2SHk0aWt5SjFRM04zVmc5THBzUkJDejBTS1JlREN0WVpVVGd2ZkVNVjRTb1Mvand1VGZoT3hwWTc0TGNMZVc3T2t1cVlJSVlUaUU4V2VyNHZYSEZJbExYQlRKT09iRVhNeHJCZityeWpxczFIK1JtK2M3QmdvaE9JVHhlK1p5MWNhVUJITmZWTTg1S2pDMVc4YzY1ZXJGVU05TGRiZ3FXbjBhQWloaklrdkxseHBTUG1hNTVvVS90WXUzSC9HMGw0d1RnSFM5ZUlkUHB5aTk1NG9oQkJLbXZqcW5OVUhscXA1cjBoajdyeUNZUjBmaGR0OWVwRS9PV1dTUFdDWmVPMFdRaWh4NHZQVFZpeEZuUnRuenF4K01Qa1hPdEJKZ00vS0swVGZTMk55M3lRL1hlN0VSK2NzMXlpa3VQV2JXUzlKWjJ2TUpJV3kraVFOOFNlclpwSmVuY3JsRFpIRnhXUWhoRkQ2eE9WNVNsQk56M3Q2VWxPYkZzbnFoR1RJWjJlVWF6dW5jL25CVW9XVVFWK0dpclJ5cWZWYllsUG5GUG1OQ1prL1hLR2JkTDZVTmwrUDB0T1YwTTBScW9TcDF3cEU5VkdIT3QxazUyRWU1OGM0enJ6RG9lbGpybWFvcEtyMm1qcC9MdlV5dmp3UHBNUmNLZTZuNjFDYmRDV1ZWVGFuNTk1dnY1U014OFo5NXd0MXFEUHlrdm8waEJCQ0NDR0VFQ3BuOGFGL3I3ajNkYWozY3BJNnVkTFhqMFBqdEc4MVZiM29wc2c1QWFxMDV1a3BnQXUzL1BXb0RiT3IzMHBmdTBWZWs0YUtxc0pmNkg5clNWZXlYaUcycjlxN0p2VlNsaTR2NFVwWkwwZjNvRjlXVkJXTWI3SXNWNnQ5VVYxTkc2MWxqbnFySHJWQnBxMWhGMVQxV284RXgyYnpIL042RGVyVW5LUlcvK3pmcTZyV2trd3NjTkpiZGFlMzhuSWFlbG1vNkZLY2JHS3hFOTZxa3FwNHR6VnpZMXIzNjZyNSttTkNwSjA0OXYwYTA5cjVJWTEzYWNWOExRNnBKNVkrOGNPNjBybEZNdHJ3aHlyWk9oREttRmo4OUhkcVNXOFdTbWlpcTZ2ajZuWW9hMktwc3o0c1c1WGNIaWNwRnRCbVAxYkUwN2Y5VWViRUNxZDlWRGZhdEdBOEk2K3ZocWM1VWZLZzM3S25mMWtyT3J0d1BGdjhYZ0ZMMjBENUU0TlhQUGVMK3RBcnhjT1p2UHd1L2hLb3hzVEFGYzcvWkt6UlQ3OUdZazBka2MxV0pVKytEcjBURlZnRVZyOTc3TkNKRXo0WnliVkpUREpUM2xWMmRWMnR3U0xsS3RuaU1TZlhSSktkRVpmTURuK1ZkNjJ2ZE9VM011bFZRaE80Y29kM3owaTIxeUtqbWVydThyYXF5bW05cXV2N1hidDU1NHVrR3hQZEtlNHl1cFRyRFRXZzFJY3c0L2J3RG9pdGFEZU1UbWY2ZTh2UVpEV3JtK2JJQW40MGt2Q3NCUG5zbnY1YVRSMG9aYlcyZWpid2NaR01MNllJYU5aSEVsK25xMU8xZHMzenQwb3M1dVJKSXRvcjc0cmVwZXBVcDQzSUwvMWpPVGY0TjZNa2swOG4xS2dhMVcyRk91WFlZNVZUVXFWMFFMSnJMVFdoSkg5azFXSUdMNHBrZlN0WlRITStsZXFiNmxLajl5bHFjS2ZLUEt5SEpTbTcxYWIrTEd4dzRWamN0Uk1tTmZ1VmY4ZGErSHB3ZmVxdmtZVVBuMzZLeEQwdlpWUkwvaEM5OWRlcUNqdThKeEwzelhSQmJmUndpdE95UGtBbnhQS09USlBTT0x1OG5xaXRxbit0RTh1N2FZcU1KajdrbTFTLzYvTDZWTVNOK1d2Wkp6ZXpuUEpieW42OTlyWDlMNUc4cjhibXM5aVZhYnZRcTJwZVc3d1JEenhKVGpxNVhlenR5VTgzcHF4enJmRkNpbGpYaU1obTgyZExPRFM3dHI2MTFLTnBZajJyYURERGR1bDBzQ1c4bWpXdGhaSTl0NjhYaTJXS0k3OExvUnhkV2N1YTQrcDBxWTZacUVpSGZtNDdoTkR6U3YvbCt0VlVGeWROZGFQOExmZldFRUtKdXE1dU5mTEVmOUttZW1iZU52UlFDS0hjMTlTMXFza1AvejA3MU1SSE9JTjJlQzJFMG5WanJXcVQzbFJMcVBJbjJPK1RFRUlGWHRQVW9ucTd4aEwyZ3cyN2VTLzY3OVFvaVZJRVZxdlRqNlVQOWRUdWNRaWhLcThaNmxRbnBjLzByVzdlNWF1ajIrcFFHVHRvZVVYKzQ5VjVMVktqR3ZGMytrelg3Z2FldVRvNnJnYVZBZmxDK2t3ZjZnRyt2Q0tqdTFjWVVxYzZOWG1vUCs3ZkF6emVtQ3FNYmxxb1p2dUZWUk9IK3MwaDQyVVFIMXIrNk5LNTZyUm43NjdRa29iNjdZSERNdTBOS0xtMCsvT1VHZFh3dWRrckNVZDdEOHVMWS9NeVI3OGNNWW82MW9tcFV2MXF2MkVGOG5pM3ROSG5CMHhJblNyVFZKcFVQOTJuVVNpUFJidEdKVlRSdXd5aXJ0Vk1rZW9YK3haTzlmNHlSaTl1Zy9wVndzcnVzOTBieFFPWk92M29pWFdwZDUwWmlmamx6bkZQNnJtSlIvY3RSOTFyNHlqQWozYUxMZWYvbDlXYXBjaG1VZXBmVTBYZ2ZiQnp2L2hJOWtrM3VuaHVhbHZabkI4VmhmdHd0MzVKTXZrdXpjem9zMmVpeHBWZ3NYdHZ1LzdaYkE4K3RFTGhURktNZmo1bXFtelM2ZDQ1ZGZvYTF4WkZ3TjdNclNobUNTRzhzbk5tNVpyWmJ5UW9lTWZQQXowbWhIRExpcld0bVFxTXRzdDNmbEYzUjNUU0hJTUxoREpmaHNPQ2o4V2VYYVRaN2VzUFhVQXZiemVxZjIwcXg5ZDdPVkN2RjZsU1IvelZDN1ZNa1ZSdUsraXYrNFBZdWdqbXBobVY5YUI2MWlXWlNHOXNWc2o0bnIxVWY0d29BalZwUk1HN1RyRVFYK3ZGdWxJOWE4ZXMwUllGamIvZnkzVklNYXBUaWhhOEt4ZTBNRzhHMkZRMXJXbDdlOFJOaS9wZU93TjQvR0pZUXdvVndqY3VYampEdTN2SjdxM1JiOGt6OWtuWG9yWjVCc2RjQjArWmpYVjdGMjluMnl5YXl4NzV2cTZZSnd0cXF4MnpFU2ZLWUZ1NkdpcTBEQ2ZRQTltWVE4Y2s0QnlWWit6cUVKN2ZOR2ZoSEgxaFppYzB4UzR2ZGVNdVZEaVlMN0k5dGMrWUxSTnBZQWp2SGRUTXV2Y1hPT1hIN2w2a3NyOW9qVmFyMVdxMVdxMVdxOVZxdFZxdFZxdlZhclZhclZhcjFXcTFXcTNXWmY5aFp1WHdkanptbHhQbjdoa2ZyWmVOTWZ5dnJpMWhpOHgrWWJrYk82dG84V0JXeVJyOWZ2Ui9qMEorbC92MzVRdGtrWXk3NHhzaGhGMnFvL3hTcU5Gb05CcU5ScVBSYURRYWpVYWowV2cwR28xR285Rm9OQnFOUnFQeGIvR1U4ellCWjI3WE5DeXZ4TnF0SisrUEQ4NkVtZldrSDdhUFNPYTVIdEt2RHhsWnFFVHUrc1N6Rjg2Vkh2aDVHQUFBQUFBQUFBQUFBQUFBWU96cDVUN3J2VG12NlR5OGpZemJmRUFFNmV4ZG1PL3VPVFJtdTEzeXYzc2g2NE1adithdnpPYzhJOWZ4c08zWFIwK2RndlhLRUY3WnFoRFBqUm1sUzRmaW9heGFxTS9RWGIyNTN0cjdXRisyUkR6ck5QZG43TjU1MjIxR285R3BpVHA3eWFGVDlDblhJaG01TG9qWnVoR2UzbXF5Y2p4Y2wzR3cxS0U0b3d0aDlKV0xqK2c3Tk1kVlBWM24yeDJLeTNwVHZydWtLdXZ4SHVyZE1TaWpWbDZ2THhtT091aWRUcEpiZHZhUjBaMWN1eWhLZXpvdTZId3lmM1kycGgweVN2RHgrNWdmV09lZUVEcmI3ZjRacHhFbFdwaHN2dys3Ky9PUGVqMGNwVy80OWRtMTF6cWQvNy92emZYQVVpMzAyNnJUUWF5ZXNmNTJ0dzk5ejdjdTJ4dnJtQ3BzQStkbk5jMTlpSExhdEhrdi9MMDZoMXpqYmZ4d3R6cEhIMzNWeE1qOTNnb2h6RjRSRHd1ZDgyY0k3MEpmTmRGWjRaNTVwa0piKzk2Zi90dXQ5M0d2ZFRlcjBtcXkyMXdBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFEMGNWMGRBRlpRT0NCcUFnQUFNQjRBblFFcUxBR0lBRDZSUnB4SkphUWpJU3MvS0FDd0VnbGpidC93TDBDOEFmcUJBZ1B3QS9BRHlBUG9BNXdEOEFQd0F0Zi9LQXZ3RDhBTGtkMFQ1enFYL0x1RU02NCtYNUozL04yZ1AwQXhRSDhBL2dIN0FlLy9UZjQxSFlENnRhMXJWUlk4MkRvd0YrMkFVcUh1ZnhqMDUzUDR4NUxxTllCS1kzdDF4TVpBTHlKamdFNHpUSTV0UVlNZmdlaERDS3pvWGtUSEFKeG1tUnphdk41a3gvUWZ6ak5Nam0xZWNBbkdhWkhOb1huWEFJaVhzMHlPYlY1d0NjWnBrYzJydjA5NGdGcXc4WkhOcTg0Qk9NMHlPYlY1dlZ2T2k4ZnJGdkVEaDZhU2tGeWpxdS9yQys4a2VmQW5GeVM4NEJPTGlLcFZzdmNEU3RqK0FBRCsvUFJlZ3pHbW52dDQzdzA4YTE3MTlJdUE1YXRkN0EyTmoxbWZweHM3OVkzc3d4blczWmxTdXdqUXNoeERNYWFlKzNqZkRUeHJYdlgwaTRuN0s4bnFnNThIWVBRV3I0ZXpPWHpDaFhkait5VkpjVDFNR2NJcmpXV0lUblBRc0JtTk5QZmJ4dmhwNDFyM3I2UmNUOWxlVDFRYytFS2VNU01hcWt5SmZxWUhKUU4vVFljQmJTYkE4bkdjWXBXQkRxMnVLa1FUalA2ZUpZVmFFRzBIVENMUzlqQVYzbXc3bW85enNOTFRVZW9vdFl5b3kxM3pTRjdoMG15Z1dsTUIxNVpCMFBvMmdJdEhzZ2p0Y0MwTWlyVEpQWmZiNEd1VUFabXljRGlweVI3RTAyR3JIb0gvL2llbWlkTUZQb2RLREREcDNhcC9LMmFtOWQ1SlhtdHNqdkNDcmZabC9lSjdzKzRWRXFqYyt1T3dnZDZBMTFnMmY4cGYvL1F4VVFoaFpvcjlCVmNjdUtXYUM3R3RpVkhOU2hZNU9sWllmdTRvTnMvTExXZWRadjFQenNMRWZid2VSejQzWjdjSllaQTIzSXF0N21mSEhIVHFBRklhOWFVRitaZldoUjhlOU1YRzBxRXk2SjNOR29BQSIgYWx0PSLXptee16giPgogICAgPHNwYW4gY2xhc3M9Im5hdi1uYW1lIj7Xptee16gg16nXmNeZ15fXmdedINeZ16TXmdedPC9zcGFuPgogIDwvYT4KICA8ZGl2IGNsYXNzPSJuYXYtY3RhIiBvbmNsaWNrPSJzY3JvbGxUb0NhbGMoKSI+15fXqdeRINee15fXmdeoPC9kaXY+CjwvbmF2PgoKPGRpdiBjbGFzcz0iaGVybyI+CiAgPGRpdiBjbGFzcz0iaGVyby1iYWRnZSI+157Xl9ep15HXldefINee15fXmdeoINeX15vXnTwvZGl2PgogIDxoMSBjbGFzcz0iaGVyby10aXRsZSI+CiAgICA8c3BhbiBjbGFzcz0id29yZC1jYXJwZXQiPtep15jXmdeX15nXnTwvc3Bhbj4KICAgIDxzcGFuIGNsYXNzPSJ3b3JkLWNsZWFuIj7XoNeZ16fXldeZPC9zcGFuPgogICAgPHNwYW4gY2xhc3M9IndvcmQtZml4Ij7XqteZ16fXldefPC9zcGFuPgogIDwvaDE+CiAgPHAgY2xhc3M9Imhlcm8tc3ViIj7Xp9eR15wg15TXptei16og157Xl9eZ16gg157XmdeZ15PXmdeqINeV157Xk9eV15nXp9eqLiDXlNeW158g157XmdeT15XXqiDigJQg16fXkdecINee15fXmdeoLiDXpNep15XXmCDXm9eaLjwvcD4KCiAgPCEtLSBFWEFDVCBtb2NrdXAgZnJvbSBvcmlnaW5hbCAtLT4KICA8ZGl2IGNsYXNzPSJtb2NrdXAtd3JhcCI+CiAgICA8ZGl2IGNsYXNzPSJtb2NrdXAiPgogICAgICA8ZGl2IGNsYXNzPSJtb2NrLWhlYWRlciI+CiAgICAgICAgPHNwYW4gY2xhc3M9Im1vY2stdGl0bGUiPtee15fXqdeR15XXnyDXnteX15nXqDwvc3Bhbj4KICAgICAgICA8ZGl2IGNsYXNzPSJtb2NrLXRhYnMiPgogICAgICAgICAgPGRpdiBjbGFzcz0ibW9jay10YWIgb24iPvCfp7wg16DXmden15XXmTwvZGl2PgogICAgICAgICAgPGRpdiBjbGFzcz0ibW9jay10YWIiPvCflKcg16rXmden15XXnzwvZGl2PgogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0ibW9jay1yb3ciPgogICAgICAgIDxkaXYgY2xhc3M9Im1vY2stZmllbGQiPjxkaXYgY2xhc3M9Im1vY2stZmllbGQtbGFiZWwiPteQ15XXqNeaICjXoSLXnik8L2Rpdj48ZGl2IGNsYXNzPSJtb2NrLWZpZWxkLXZhbCI+MzAwPC9kaXY+PC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0ibW9jay1maWVsZCI+PGRpdiBjbGFzcz0ibW9jay1maWVsZC1sYWJlbCI+16jXldeX15EgKNehIteeKTwvZGl2PjxkaXYgY2xhc3M9Im1vY2stZmllbGQtdmFsIj4yMDA8L2Rpdj48L2Rpdj4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9Im1vY2stdHlwZXMiPgogICAgICAgIDxkaXYgY2xhc3M9Im1vY2stdHlwZSI+157Xm9eV16DXlDxicj48c3BhbiBzdHlsZT0iY29sb3I6IzQwNDA0ODtmb250LXdlaWdodDo0MDAiPuKCqjk1PC9zcGFuPjwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9Im1vY2stdHlwZSBvbiI+16LXkdeV15PXqiDXmdeTPGJyPjxzcGFuPuKCqjEzNTwvc3Bhbj48L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJtb2NrLXR5cGUiPtee16nXmTxicj48c3BhbiBzdHlsZT0iY29sb3I6IzQwNDA0ODtmb250LXdlaWdodDo0MDAiPuKCqjE5MDwvc3Bhbj48L2Rpdj4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9Im1vY2stdG90YWwiPgogICAgICAgIDxzcGFuIGNsYXNzPSJtb2NrLXRvdGFsLWxhYmVsIj7XodeUItebINec16rXqdec15XXnTwvc3Bhbj4KICAgICAgICA8c3BhbiBjbGFzcz0ibW9jay10b3RhbC1hbXQiPuKCqjgxMDwvc3Bhbj4KICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KICA8L2Rpdj4KCiAgPCEtLSBTQ1JPTEwgQVJST1cgLS0+CiAgPGRpdiBjbGFzcz0ic2Nyb2xsLWN0YSIgb25jbGljaz0ic2Nyb2xsVG9DYWxjKCkiPgogICAgPHNwYW4gY2xhc3M9InNjcm9sbC1sYmwiPtec15fXqdeRINee15fXmdeoPC9zcGFuPgogICAgPGRpdiBjbGFzcz0ic2Nyb2xsLWFyciI+4oaTPC9kaXY+CiAgPC9kaXY+CjwvZGl2PgoKPCEtLSBFWEFDVCBmZWF0LWdyaWQgZnJvbSBvcmlnaW5hbCAtLT4KPGRpdiBjbGFzcz0iZmVhdC1ncmlkIj4KICA8ZGl2IGNsYXNzPSJmZWF0LWNlbGwiPgogICAgPGRpdiBjbGFzcz0iZmVhdC1pY29uMiBvcmFuZ2UiPvCfp7w8L2Rpdj4KICAgIDxkaXYgY2xhc3M9ImZlYXQtdGl0bGUyIj7XoNeZ16fXldeZINep15jXmdeX15nXnTwvZGl2PgogICAgPGRpdiBjbGFzcz0iZmVhdC1kZXNjMiI+157Xm9eV16DXlCwg16LXkdeV15PXqiDXmdeTINeV157XqdeZLjwvZGl2PgogIDwvZGl2PgogIDxkaXYgY2xhc3M9ImZlYXQtY2VsbCI+CiAgICA8ZGl2IGNsYXNzPSJmZWF0LWljb24yIGJsdWUiPvCflKc8L2Rpdj4KICAgIDxkaXYgY2xhc3M9ImZlYXQtdGl0bGUyIj7XqteZ16fXldefINep15jXmdeX15nXnTwvZGl2PgogICAgPGRpdiBjbGFzcz0iZmVhdC1kZXNjMiI+16HXqNeYLCDXqNeh15jXldeo16bXmdeULCDXl9eZ16rXldeaLCDXpNeo16DXlteZ150g15XXkteZ15bXldeWLiDXkdeX16gg16bXnNei15XXqiDXnNeX15nXqdeV15Eg157Xk9eV15nXpy48L2Rpdj4KICA8L2Rpdj4KICA8ZGl2IGNsYXNzPSJmZWF0LWNlbGwiPgogICAgPGRpdiBjbGFzcz0iZmVhdC1pY29uMiB0ZWFsIj7wn5qaPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJmZWF0LXRpdGxlMiI+16nXmdeo15XXqiDXoteTINeU15HXmdeqPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJmZWF0LWRlc2MyIj7XkNeZ16HXldejINeV15TXl9eW16jXlCDXnNeb15wg15TXkNeo16UuIDgg16HXoNeZ16TXmdedINec15DXmdeh15XXoyDXotem157XmS48L2Rpdj4KICA8L2Rpdj4KPC9kaXY+Cgo8IS0tIFRSQU5TSVRJT04gLS0+CjxkaXYgY2xhc3M9ImNhbGMtaW50cm8iIGlkPSJjYWxjLWludHJvIj4KICA8ZGl2IGNsYXNzPSJjaS1sYWJlbCIgaWQ9ImNpLWxhYmVsIj7XlNee15fXqdeR15XXnyDXqdec16DXlTwvZGl2PgogIDxkaXYgY2xhc3M9ImNpLXRpdGxlIiBpZD0iY2ktdGl0bGUiPteX16nXkSDXnteX15nXqCDXoteb16nXmdeVPC9kaXY+CiAgPGRpdiBjbGFzcz0iY2ktZGVzYyIgaWQ9ImNpLWRlc2MiPteU16bXoteqINee15fXmdeoINee15nXmdeT15nXqiDigJQg16DXmden15XXmSDXldeq15nXp9eV158g16nXmNeZ15fXmdedPC9kaXY+CiAgPGRpdiBjbGFzcz0iY2ktbGluZSIgaWQ9ImNpLWxpbmUiPjwvZGl2Pgo8L2Rpdj4KCjwhLS0gUkVBTCBDQUxDVUxBVE9SIC0tPgo8c2VjdGlvbiBpZD0iY2FsY3VsYXRvciIgc3R5bGU9InBvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbiI+CiAgPGRpdiBzdHlsZT0icG9zaXRpb246YWJzb2x1dGU7d2lkdGg6NTAwcHg7aGVpZ2h0OjUwMHB4O2JvcmRlci1yYWRpdXM6NTAlO2ZpbHRlcjpibHVyKDgwcHgpO3BvaW50ZXItZXZlbnRzOm5vbmU7YmFja2dyb3VuZDpyZ2JhKDI1NSwxMDAsMjAsLjI2KTt0b3A6LTE1MHB4O3JpZ2h0Oi0xNTBweDthbmltYXRpb246ZHJpZnQgMTRzIGVhc2UgaW5maW5pdGU7ei1pbmRleDowIj48L2Rpdj4KICA8ZGl2IHN0eWxlPSJwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDo0MDBweDtoZWlnaHQ6NDAwcHg7Ym9yZGVyLXJhZGl1czo1MCU7ZmlsdGVyOmJsdXIoODBweCk7cG9pbnRlci1ldmVudHM6bm9uZTtiYWNrZ3JvdW5kOnJnYmEoNTgsMTExLDIxNiwuMTQpO2JvdHRvbTotMTAwcHg7bGVmdDotMTAwcHg7YW5pbWF0aW9uOmRyaWZ0IDE0cyBlYXNlIC01cyBpbmZpbml0ZTt6LWluZGV4OjAiPjwvZGl2PgogIDxkaXYgc3R5bGU9InBvc2l0aW9uOmFic29sdXRlO3dpZHRoOjMwMHB4O2hlaWdodDozMDBweDtib3JkZXItcmFkaXVzOjUwJTtmaWx0ZXI6Ymx1cig4MHB4KTtwb2ludGVyLWV2ZW50czpub25lO2JhY2tncm91bmQ6cmdiYSg0MiwxMzgsMTI4LC4xMik7dG9wOjQwJTtsZWZ0OjQwJTthbmltYXRpb246ZHJpZnQgMTRzIGVhc2UgLTlzIGluZmluaXRlO3otaW5kZXg6MCI+PC9kaXY+CiAgPGRpdiBjbGFzcz0iY2FsYy1yZXZlYWwiIGlkPSJjYWxjLXJldmVhbCI+CiAgICA8ZGl2IGNsYXNzPSJ3cmFwcGVyIj4KCgo8ZGl2IGNsYXNzPSJ0YWJzIj4KICA8YnV0dG9uIGNsYXNzPSJ0YWItYnRuIGFjdGl2ZSIgb25jbGljaz0ic3dpdGNoVGFiKCdjbGVhbmluZycpIj7wn6e8INeg15nXp9eV15kg16nXmNeZ15fXmdedPC9idXR0b24+CiAgPGJ1dHRvbiBjbGFzcz0idGFiLWJ0biIgb25jbGljaz0ic3dpdGNoVGFiKCdyZXBhaXInKSI+8J+UpyDXqteZ16fXldefINep15jXmdeX15nXnTwvYnV0dG9uPgo8L2Rpdj4KCjwhLS0gQ0xFQU5JTkcgLS0+CjxkaXYgaWQ9ImNsZWFuaW5nIiBjbGFzcz0ic2VjdGlvbiBhY3RpdmUiPgogIDxkaXYgY2xhc3M9ImNhcnBldC1saXN0IiBpZD0iY2xlYW5pbmctbGlzdCI+PC9kaXY+CiAgPGJ1dHRvbiBjbGFzcz0iYWRkLWJ0biIgb25jbGljaz0iYWRkQ2FycGV0KCdjJykiPjxzcGFuIHN0eWxlPSJmb250LXNpemU6MThweDtmb250LXdlaWdodDozMDAiPis8L3NwYW4+INeU15XXodejINep15jXmdeXPC9idXR0b24+CiAgPGRpdiBjbGFzcz0iZGVsaXZlcnktc2VjdGlvbiI+CiAgICA8aDM+16HXldeSINep15nXqNeV16o8L2gzPgogICAgPGRpdiBjbGFzcz0iZGVsaXZlcnktZ3JpZCI+CiAgICAgIDxkaXYgY2xhc3M9ImRlbGl2ZXJ5LW9wdCI+PGlucHV0IHR5cGU9InJhZGlvIiBuYW1lPSJjLWRlbCIgaWQ9ImMtc2VsZiIgY2hlY2tlZCBvbmNoYW5nZT0idXBkYXRlRGVsaXZlcnkoJ2MnKSI+PGxhYmVsIGZvcj0iYy1zZWxmIj48c3BhbiBjbGFzcz0iZGVsaXZlcnktaWNvbiI+8J+Pqjwvc3Bhbj48c3Bhbj48c3BhbiBjbGFzcz0iZGVsaXZlcnktbmFtZSI+15DXmdeh15XXoyDXotem157XmTwvc3Bhbj48c3BhbiBjbGFzcz0iZGVsaXZlcnktZGVzYyI+157XlNeh16DXmdejINep15zXoNeVPC9zcGFuPjwvc3Bhbj48L2xhYmVsPjwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJkZWxpdmVyeS1vcHQiPjxpbnB1dCB0eXBlPSJyYWRpbyIgbmFtZT0iYy1kZWwiIGlkPSJjLWhvbWUiIG9uY2hhbmdlPSJ1cGRhdGVEZWxpdmVyeSgnYycpIj48bGFiZWwgZm9yPSJjLWhvbWUiPjxzcGFuIGNsYXNzPSJkZWxpdmVyeS1pY29uIj7wn5qaPC9zcGFuPjxzcGFuPjxzcGFuIGNsYXNzPSJkZWxpdmVyeS1uYW1lIj7XqdeZ16jXldeqINei15Mg15TXkdeZ16o8L3NwYW4+PHNwYW4gY2xhc3M9ImRlbGl2ZXJ5LWRlc2MiPteQ15nXodeV16MgKyDXlNeX15bXqNeUPC9zcGFuPjwvc3Bhbj48L2xhYmVsPjwvZGl2PgogICAgPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJicmFuY2gtcm93IHZpc2libGUiIGlkPSJjLWJyYW5jaC1yb3ciPgogICAgICA8bGFiZWw+15HXl9eoINeh16DXmdejINec15DXmdeh15XXozwvbGFiZWw+CiAgICAgIDxzZWxlY3QgaWQ9ImMtYnJhbmNoIiBvbmNoYW5nZT0ic2hvd0JyYW5jaCgnYycpO2NhbGNDbGVhbmluZygpIj48b3B0aW9uIHZhbHVlPSIiPi0tINeR15fXqCDXodeg15nXoyAtLTwvb3B0aW9uPgogICAgICAgIDxvcHRpb24gdmFsdWU9ImplcnVzYWxlbSI+15nXqNeV16nXnNeZ1508L29wdGlvbj4KICAgICAgICA8b3B0aW9uIHZhbHVlPSJyaXNob24iPteo15DXqdeV158g15zXpteZ15XXnzwvb3B0aW9uPgogICAgICAgIDxvcHRpb24gdmFsdWU9InJpc2hvbjIiPteo15DXqdeV158g15zXpteZ15XXnyDXkdeV15jXmdenPC9vcHRpb24+CiAgICAgICAgPG9wdGlvbiB2YWx1ZT0iaGVyemxpeWEiPteU16jXptec15nXlDwvb3B0aW9uPgogICAgICAgIDxvcHRpb24gdmFsdWU9ImhlcnpsaXlhMiI+15TXqNem15zXmdeUINeR15XXmNeZ16c8L29wdGlvbj4KICAgICAgICA8b3B0aW9uIHZhbHVlPSJuZXRhbnlhIj7XoNeq16DXmdeUPC9vcHRpb24+CiAgICAgICAgPG9wdGlvbiB2YWx1ZT0idGVsYXZpdiI+16rXnCDXkNeR15nXkSAtIE91dGxldDwvb3B0aW9uPgogICAgICAgIDxvcHRpb24gdmFsdWU9Im1hYWxlIj7Xntei15zXlCDXkNeT15XXnteZ150gRGNpdHk8L29wdGlvbj48L3NlbGVjdD4KICAgICAgPGRpdiBjbGFzcz0iYnJhbmNoLWRldGFpbCIgaWQ9ImMtYnJhbmNoLWRldGFpbCI+PC9kaXY+CiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9ImJyYW5jaC1yb3ciIGlkPSJjLWNpdHktcm93Ij4KICAgICAgPGxhYmVsPteR15fXqCDXoteZ16gg15zXl9eZ16nXldeRINei15zXldeqINee16nXnNeV15c8L2xhYmVsPgogICAgICA8c2VsZWN0IGlkPSJjLWNpdHkiIG9uY2hhbmdlPSJjYWxjQ2xlYW5pbmcoKSI+PG9wdGlvbiB2YWx1ZT0iMCI+LS0g15HXl9eoINei15nXqCAtLTwvb3B0aW9uPgogICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iOTAiPteS15XXqSDXqdeo15XXnyAvINee16jXm9eWPC9vcHRpb24+CiAgICAgICAgICA8b3B0aW9uIHZhbHVlPSIxMDAiPteq15wg15DXkdeZ15E8L29wdGlvbj4KICAgICAgICAgIDxvcHRpb24gdmFsdWU9IjExMCI+16TXqteXINeq16fXldeV15QgLyDXqNee15zXlCAvINec15XXkzwvb3B0aW9uPgogICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iMTIwIj7XqNee16og15LXnyAvINeS15HXoteq15nXmdedIC8g15HXoNeZINeR16jXpzwvb3B0aW9uPgogICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iMTIwIj7XqNeQ16nXldefINec16bXmdeV158gLyDXl9eV15zXldefIC8g15HXqiDXmdedPC9vcHRpb24+CiAgICAgICAgICA8b3B0aW9uIHZhbHVlPSIxMzAiPteU16jXptec15nXlCAvINeo16LXoNeg15QgLyDXm9ek16gg16HXkdeQPC9vcHRpb24+CiAgICAgICAgICA8b3B0aW9uIHZhbHVlPSIxMzAiPteg16rXoNeZ15QgLyDXl9eT16jXlDwvb3B0aW9uPgogICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iMTUwIj7Xmdeo15XXqdec15nXnTwvb3B0aW9uPgogICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iMTYwIj7Xl9eZ16TXlCAvINen16jXmdeV16o8L29wdGlvbj4KICAgICAgICAgIDxvcHRpb24gdmFsdWU9IjE4MCI+15HXkNeoINep15HXoiAvINeT16jXldedPC9vcHRpb24+CiAgICAgICAgICA8b3B0aW9uIHZhbHVlPSIyMDAiPtem16TXldefICjXoNem16jXqiDXldee16LXnNeUKTwvb3B0aW9uPjwvc2VsZWN0PgogICAgPC9kaXY+CiAgPC9kaXY+CiAgPGRpdiBjbGFzcz0idG90YWwtcGFuZWwiIGlkPSJjLXRvdGFsLXBhbmVsIiBzdHlsZT0iZGlzcGxheTpub25lIj4KICAgIDxkaXYgY2xhc3M9InRvdGFsLXJvd3MiIGlkPSJjLXRvdGFsLXJvd3MiPjwvZGl2PgogICAgPGRpdiBjbGFzcz0idG90YWwtZGl2aWRlciI+PC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJ0b3RhbC1tYWluIj48c3BhbiBjbGFzcz0idG90YWwtbWFpbi1sYWJlbCI+16HXlNe015sg15zXqtep15zXldedPC9zcGFuPjxzcGFuIGNsYXNzPSJ0b3RhbC1tYWluLWFtb3VudCIgaWQ9ImMtdG90YWwtYW1vdW50Ij7igqowPC9zcGFuPjwvZGl2PgogICAgPGRpdiBjbGFzcz0idG90YWwtdmF0Ij4qINeU157Xl9eZ16gg15vXldec15wg157Xote0154gfCDXnteZ16DXmdee15XXnSDXlNeW157XoNeUIOKCqjI1MDwvZGl2PgogIDwvZGl2PgogIDxkaXYgY2xhc3M9Im1pbi1ub3RpY2UiIGlkPSJjLW1pbiI+4pqg77iPINee15nXoNeZ157XldedINeU15bXnteg15Qg4oKqMjUwIOKAlCDXlNee15fXmdeoINeZ16LXldeT15vXnyDXkdeU16rXkNedPC9kaXY+CiAgPGRpdiBjbGFzcz0iYWN0aW9uLXJvdyI+PGJ1dHRvbiBjbGFzcz0icHJpbnQtYnRuIiBvbmNsaWNrPSJkb1ByaW50KCkiPvCflqjvuI8g15TXk9ek16EgLyDXqdee15XXqCBQREY8L2J1dHRvbj48L2Rpdj4KICA8cCBjbGFzcz0ic3VtbWFyeS1ub3RlIj7XlNee15fXmdeoINeU15nXoNeVINeQ15XXnteT158g4oCUINeU16bXldeV16og16nXnNeg15Ug15nXqdee15cg15zXkNep16gg16LXnSDXlNeS16LXqiDXlNep15jXmdeXPC9wPgo8L2Rpdj4KCjwhLS0gUkVQQUlSIC0tPgo8ZGl2IGlkPSJyZXBhaXIiIGNsYXNzPSJzZWN0aW9uIj4KICA8ZGl2IGNsYXNzPSJyZXBhaXItbGlzdCIgaWQ9InJlcGFpci1saXN0Ij48L2Rpdj4KICA8YnV0dG9uIGNsYXNzPSJhZGQtYnRuIiBvbmNsaWNrPSJhZGRDYXJwZXQoJ3InKSI+PHNwYW4gc3R5bGU9ImZvbnQtc2l6ZToxOHB4O2ZvbnQtd2VpZ2h0OjMwMCI+Kzwvc3Bhbj4g15TXldeh16Mg16nXmNeZ15cg15zXqteZ16fXldefPC9idXR0b24+CiAgPGRpdiBjbGFzcz0iZGVsaXZlcnktc2VjdGlvbiI+CiAgICA8aDM+16HXldeSINep15nXqNeV16o8L2gzPgogICAgPGRpdiBjbGFzcz0iZGVsaXZlcnktZ3JpZCI+CiAgICAgIDxkaXYgY2xhc3M9ImRlbGl2ZXJ5LW9wdCI+PGlucHV0IHR5cGU9InJhZGlvIiBuYW1lPSJyLWRlbCIgaWQ9InItc2VsZiIgY2hlY2tlZCBvbmNoYW5nZT0idXBkYXRlRGVsaXZlcnkoJ3InKSI+PGxhYmVsIGZvcj0ici1zZWxmIj48c3BhbiBjbGFzcz0iZGVsaXZlcnktaWNvbiI+8J+Pqjwvc3Bhbj48c3Bhbj48c3BhbiBjbGFzcz0iZGVsaXZlcnktbmFtZSI+15DXmdeh15XXoyDXotem157XmTwvc3Bhbj48c3BhbiBjbGFzcz0iZGVsaXZlcnktZGVzYyI+157XlNeh16DXmdejINep15zXoNeVPC9zcGFuPjwvc3Bhbj48L2xhYmVsPjwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJkZWxpdmVyeS1vcHQiPjxpbnB1dCB0eXBlPSJyYWRpbyIgbmFtZT0ici1kZWwiIGlkPSJyLWhvbWUiIG9uY2hhbmdlPSJ1cGRhdGVEZWxpdmVyeSgncicpIj48bGFiZWwgZm9yPSJyLWhvbWUiPjxzcGFuIGNsYXNzPSJkZWxpdmVyeS1pY29uIj7wn5qaPC9zcGFuPjxzcGFuPjxzcGFuIGNsYXNzPSJkZWxpdmVyeS1uYW1lIj7XqdeZ16jXldeqINei15Mg15TXkdeZ16o8L3NwYW4+PHNwYW4gY2xhc3M9ImRlbGl2ZXJ5LWRlc2MiPteQ15nXodeV16MgKyDXlNeX15bXqNeUPC9zcGFuPjwvc3Bhbj48L2xhYmVsPjwvZGl2PgogICAgPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJicmFuY2gtcm93IHZpc2libGUiIGlkPSJyLWJyYW5jaC1yb3ciPgogICAgICA8bGFiZWw+15HXl9eoINeh16DXmdejINec15DXmdeh15XXozwvbGFiZWw+CiAgICAgIDxzZWxlY3QgaWQ9InItYnJhbmNoIiBvbmNoYW5nZT0ic2hvd0JyYW5jaCgncicpO2NhbGNSZXBhaXIoKSI+PG9wdGlvbiB2YWx1ZT0iIj4tLSDXkdeX16gg16HXoNeZ16MgLS08L29wdGlvbj4KICAgICAgICA8b3B0aW9uIHZhbHVlPSJqZXJ1c2FsZW0iPteZ16jXldep15zXmdedPC9vcHRpb24+CiAgICAgICAgPG9wdGlvbiB2YWx1ZT0icmlzaG9uIj7XqNeQ16nXldefINec16bXmdeV1588L29wdGlvbj4KICAgICAgICA8b3B0aW9uIHZhbHVlPSJyaXNob24yIj7XqNeQ16nXldefINec16bXmdeV158g15HXldeY15nXpzwvb3B0aW9uPgogICAgICAgIDxvcHRpb24gdmFsdWU9ImhlcnpsaXlhIj7XlNeo16bXnNeZ15Q8L29wdGlvbj4KICAgICAgICA8b3B0aW9uIHZhbHVlPSJoZXJ6bGl5YTIiPteU16jXptec15nXlCDXkdeV15jXmdenPC9vcHRpb24+CiAgICAgICAgPG9wdGlvbiB2YWx1ZT0ibmV0YW55YSI+16DXqteg15nXlDwvb3B0aW9uPgogICAgICAgIDxvcHRpb24gdmFsdWU9InRlbGF2aXYiPteq15wg15DXkdeZ15EgLSBPdXRsZXQ8L29wdGlvbj4KICAgICAgICA8b3B0aW9uIHZhbHVlPSJtYWFsZSI+157Xotec15Qg15DXk9eV157XmdedIERjaXR5PC9vcHRpb24+PC9zZWxlY3Q+CiAgICAgIDxkaXYgY2xhc3M9ImJyYW5jaC1kZXRhaWwiIGlkPSJyLWJyYW5jaC1kZXRhaWwiPjwvZGl2PgogICAgPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJicmFuY2gtcm93IiBpZD0ici1jaXR5LXJvdyI+CiAgICAgIDxsYWJlbD7XkdeX16gg16LXmdeoINec15fXmdep15XXkSDXotec15XXqiDXntep15zXldeXPC9sYWJlbD4KICAgICAgPHNlbGVjdCBpZD0ici1jaXR5IiBvbmNoYW5nZT0iY2FsY1JlcGFpcigpIj48b3B0aW9uIHZhbHVlPSIwIj4tLSDXkdeX16gg16LXmdeoIC0tPC9vcHRpb24+CiAgICAgICAgICA8b3B0aW9uIHZhbHVlPSI5MCI+15LXldepINep16jXldefIC8g157XqNeb15Y8L29wdGlvbj4KICAgICAgICAgIDxvcHRpb24gdmFsdWU9IjEwMCI+16rXnCDXkNeR15nXkTwvb3B0aW9uPgogICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iMTEwIj7XpNeq15cg16rXp9eV15XXlCAvINeo157XnNeUIC8g15zXldeTPC9vcHRpb24+CiAgICAgICAgICA8b3B0aW9uIHZhbHVlPSIxMjAiPteo157XqiDXktefIC8g15LXkdei16rXmdeZ150gLyDXkdeg15kg15HXqNenPC9vcHRpb24+CiAgICAgICAgICA8b3B0aW9uIHZhbHVlPSIxMjAiPteo15DXqdeV158g15zXpteZ15XXnyAvINeX15XXnNeV158gLyDXkdeqINeZ1508L29wdGlvbj4KICAgICAgICAgIDxvcHRpb24gdmFsdWU9IjEzMCI+15TXqNem15zXmdeUIC8g16jXoteg16DXlCAvINeb16TXqCDXodeR15A8L29wdGlvbj4KICAgICAgICAgIDxvcHRpb24gdmFsdWU9IjEzMCI+16DXqteg15nXlCAvINeX15PXqNeUPC9vcHRpb24+CiAgICAgICAgICA8b3B0aW9uIHZhbHVlPSIxNTAiPteZ16jXldep15zXmdedPC9vcHRpb24+CiAgICAgICAgICA8b3B0aW9uIHZhbHVlPSIxNjAiPteX15nXpNeUIC8g16fXqNeZ15XXqjwvb3B0aW9uPgogICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iMTgwIj7XkdeQ16gg16nXkdeiIC8g15PXqNeV1508L29wdGlvbj4KICAgICAgICAgIDxvcHRpb24gdmFsdWU9IjIwMCI+16bXpNeV158gKNeg16bXqNeqINeV157Xotec15QpPC9vcHRpb24+PC9zZWxlY3Q+CiAgICA8L2Rpdj4KICA8L2Rpdj4KICA8ZGl2IGNsYXNzPSJ0b3RhbC1wYW5lbCIgaWQ9InItdG90YWwtcGFuZWwiIHN0eWxlPSJkaXNwbGF5Om5vbmUiPgogICAgPGRpdiBjbGFzcz0idG90YWwtcm93cyIgaWQ9InItdG90YWwtcm93cyI+PC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJ0b3RhbC1kaXZpZGVyIj48L2Rpdj4KICAgIDxkaXYgY2xhc3M9InRvdGFsLW1haW4iPjxzcGFuIGNsYXNzPSJ0b3RhbC1tYWluLWxhYmVsIj7XodeU17TXmyDXnNeq16nXnNeV1508L3NwYW4+PHNwYW4gY2xhc3M9InRvdGFsLW1haW4tYW1vdW50IiBpZD0ici10b3RhbC1hbW91bnQiPuKCqjA8L3NwYW4+PC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJ0b3RhbC12YXQiPiog15TXnteX15nXqCDXlNeZ16DXlSDXkNeV157Xk9efPC9kaXY+CiAgPC9kaXY+CiAgPGRpdiBjbGFzcz0ibWluLW5vdGljZSIgaWQ9InItbWluIj7imqDvuI8g157Xmdeg15nXnteV150g15TXltee16DXlCDigqoyNTA8L2Rpdj4KICA8ZGl2IGNsYXNzPSJhY3Rpb24tcm93Ij48YnV0dG9uIGNsYXNzPSJwcmludC1idG4iIG9uY2xpY2s9ImRvUHJpbnQoKSI+8J+WqO+4jyDXlNeT16TXoSAvINep157XldeoIFBERjwvYnV0dG9uPjwvZGl2PgogIDxwIGNsYXNzPSJzdW1tYXJ5LW5vdGUiPteU157Xl9eZ16gg15TXmdeg15Ug15DXldee15PXnyDigJQg15TXpteV15XXqiDXqdec16DXlSDXmdep157XlyDXnNeQ16nXqCDXotedINeU15LXoteqINeU16nXmNeZ15c8L3A+CjwvZGl2PgoKCiAgPC9kaXY+Cjwvc2VjdGlvbj4KCjwhLS0gRVhBQ1QgYm90dG9tLWJhciBmcm9tIG9yaWdpbmFsIC0tPgo8ZGl2IGNsYXNzPSJib3R0b20tYmFyIj4KICA8ZGl2IGNsYXNzPSJib3R0b20tYnJhbmQiPgogICAgPGltZyBzcmM9ImRhdGE6aW1hZ2Uvd2VicDtiYXNlNjQsVWtsR1JsQVJBQUJYUlVKUVZsQTRXQW9BQUFBUUFBQUFLd0VBaHdBQVFVeFFTTDhPQUFBQnQ4ZWdiU1JINS9DSGZlMExnSWpJNGUwZ2E1N21MckxKbkRmeUYzakR0dTJRWG12YjFyZ3pacExoa1pFZXRtM2J0bTNidG0zYnRtM2JIajNzTVRvNS80L1IzVlYxbmxXcGEvNk02TDlFU1pMcnR0a1NFd2gremE1STRBNmZBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUF6TEhiUlA5SGFmZHc1dzZUMVU0V2d5c2N4TlJybDB2OVlBamhuenQzckplSjlUKzVxcnFXWGdoSGxBazlNb1FRUWdqdHU3ZWFwQzVHYXo0ZndxdEorTTU0dkl4RjYrZ1F3dDNEeTB0ayt4QkN6OFNmZDJ4UkJ6Kys5dE5kR1V5VkFIRFdFSDdZSkxtcGxiczhmYlpnYVpuY0gwTG9tZWdzQWpkdE8rbFlQbnE4SjRBVTZYL1F3YnR1WkZwWHpURTlybll1S1pSSmVyQXpmL3phTFNZWWEwZXJQNVRoL3ZSNHhtTzYrWDdZTUttdk56TnNYVlRpKy95SlgyN2VkS3lzWDFaNk9OUDZlL0VWVmdiaFZST21NM1p4cHE5WFppb2ptTTRkVkd6aTk1dldHeis5aDM2VE5wdk5aclBaYkRhYnpXYXoyV3cybTgxbXM5bHNOcHZOWnJQWmJJN3FId0c5N0NONXhpZVA5ZmhPaDdCbmN2MVVzV3plN2F0M0QxMHpmYXdUaHhCQzRZbGZyMTQvOVNMUStLcmRicmZiN1hhNzNXNjMyKzEydTkxdXQ5dnRkcnZkYnJmYjdYYjc5NUhGUi9mbHU0NE4vc2djeHN2UzNFNno1RHM3TnJsMkNDSEVUVnl6OGJDaytpdUVFR3VrNklhMTNOMFpoS2xXc3RseUliL2RJRUVvL2I4cVlPMkJDUlByaVFTcGZuL1ora1BUNmR0NEUzOFYrMmZ4TzRvaHZoUG44UDBDbUplTUd4MUtNWE5mTDFxRjkvbDN5OVZyanFpT0NvMEtNMGFWbU1jV3kzdXR5RXdPS21wdWo1VGFNNFNRYU9Lbnk5WWRWazB0Y1VjRVk4empQRmRSMEV2SHk0aWt5SjFRM04zVmc5THBzUkJDejBTS1JlREN0WVpVVGd2ZkVNVjRTb1Mvand1VGZoT3hwWTc0TGNMZVc3T2t1cVlJSVlUaUU4V2VyNHZYSEZJbExYQlRKT09iRVhNeHJCZityeWpxczFIK1JtK2M3QmdvaE9JVHhlK1p5MWNhVUJITmZWTTg1S2pDMVc4YzY1ZXJGVU05TGRiZ3FXbjBhQWloaklrdkxseHBTUG1hNTVvVS90WXUzSC9HMGw0d1RnSFM5ZUlkUHB5aTk1NG9oQkJLbXZqcW5OVUhscXA1cjBoajdyeUNZUjBmaGR0OWVwRS9PV1dTUFdDWmVPMFdRaWh4NHZQVFZpeEZuUnRuenF4K01Qa1hPdEJKZ00vS0swVGZTMk55M3lRL1hlN0VSK2NzMXlpa3VQV2JXUzlKWjJ2TUpJV3kraVFOOFNlclpwSmVuY3JsRFpIRnhXUWhoRkQ2eE9WNVNsQk56M3Q2VWxPYkZzbnFoR1RJWjJlVWF6dW5jL25CVW9XVVFWK0dpclJ5cWZWYllsUG5GUG1OQ1prL1hLR2JkTDZVTmwrUDB0T1YwTTBScW9TcDF3cEU5VkdIT3QxazUyRWU1OGM0enJ6RG9lbGpybWFvcEtyMm1qcC9MdlV5dmp3UHBNUmNLZTZuNjFDYmRDV1ZWVGFuNTk1dnY1U014OFo5NXd0MXFEUHlrdm8waEJCQ0NDR0VFQ3BuOGFGL3I3ajNkYWozY3BJNnVkTFhqMFBqdEc4MVZiM29wc2c1QWFxMDV1a3BnQXUzL1BXb0RiT3IzMHBmdTBWZWs0YUtxc0pmNkg5clNWZXlYaUcycjlxN0p2VlNsaTR2NFVwWkwwZjNvRjlXVkJXTWI3SXNWNnQ5VVYxTkc2MWxqbnFySHJWQnBxMWhGMVQxV284RXgyYnpIL042RGVyVW5LUlcvK3pmcTZyV2trd3NjTkpiZGFlMzhuSWFlbG1vNkZLY2JHS3hFOTZxa3FwNHR6VnpZMXIzNjZyNSttTkNwSjA0OXYwYTA5cjVJWTEzYWNWOExRNnBKNVkrOGNPNjBybEZNdHJ3aHlyWk9oREttRmo4OUhkcVNXOFdTbWlpcTZ2ajZuWW9hMktwc3o0c1c1WGNIaWNwRnRCbVAxYkUwN2Y5VWViRUNxZDlWRGZhdEdBOEk2K3ZocWM1VWZLZzM3S25mMWtyT3J0d1BGdjhYZ0ZMMjBENUU0TlhQUGVMK3RBcnhjT1p2UHd1L2hLb3hzVEFGYzcvWkt6UlQ3OUdZazBka2MxV0pVKytEcjBURlZnRVZyOTc3TkNKRXo0WnliVkpUREpUM2xWMmRWMnR3U0xsS3RuaU1TZlhSSktkRVpmTURuK1ZkNjJ2ZE9VM011bFZRaE80Y29kM3owaTIxeUtqbWVydThyYXF5bW05cXV2N1hidDU1NHVrR3hQZEtlNHl1cFRyRFRXZzFJY3c0L2J3RG9pdGFEZU1UbWY2ZTh2UVpEV3JtK2JJQW40MGt2Q3NCUG5zbnY1YVRSMG9aYlcyZWpid2NaR01MNllJYU5aSEVsK25xMU8xZHMzenQwb3M1dVJKSXRvcjc0cmVwZXBVcDQzSUwvMWpPVGY0TjZNa2swOG4xS2dhMVcyRk91WFlZNVZUVXFWMFFMSnJMVFdoSkg5azFXSUdMNHBrZlN0WlRITStsZXFiNmxLajl5bHFjS2ZLUEt5SEpTbTcxYWIrTEd4dzRWamN0Uk1tTmZ1VmY4ZGErSHB3ZmVxdmtZVVBuMzZLeEQwdlpWUkwvaEM5OWRlcUNqdThKeEwzelhSQmJmUndpdE95UGtBbnhQS09USlBTT0x1OG5xaXRxbit0RTh1N2FZcU1KajdrbTFTLzYvTDZWTVNOK1d2Wkp6ZXpuUEpieW42OTlyWDlMNUc4cjhibXM5aVZhYnZRcTJwZVc3d1JEenhKVGpxNVhlenR5VTgzcHF4enJmRkNpbGpYaU1obTgyZExPRFM3dHI2MTFLTnBZajJyYURERGR1bDBzQ1c4bWpXdGhaSTl0NjhYaTJXS0k3OExvUnhkV2N1YTQrcDBxWTZacUVpSGZtNDdoTkR6U3YvbCt0VlVGeWROZGFQOExmZldFRUtKdXE1dU5mTEVmOUttZW1iZU52UlFDS0hjMTlTMXFza1AvejA3MU1SSE9JTjJlQzJFMG5WanJXcVQzbFJMcVBJbjJPK1RFRUlGWHRQVW9ucTd4aEwyZ3cyN2VTLzY3OVFvaVZJRVZxdlRqNlVQOWRUdWNRaWhLcThaNmxRbnBjLzByVzdlNWF1ajIrcFFHVHRvZVVYKzQ5VjVMVktqR3ZGMytrelg3Z2FldVRvNnJnYVZBZmxDK2t3ZjZnRyt2Q0tqdTFjWVVxYzZOWG1vUCs3ZkF6emVtQ3FNYmxxb1p2dUZWUk9IK3MwaDQyVVFIMXIrNk5LNTZyUm43NjdRa29iNjdZSERNdTBOS0xtMCsvT1VHZFh3dWRrckNVZDdEOHVMWS9NeVI3OGNNWW82MW9tcFV2MXF2MkVGOG5pM3ROSG5CMHhJblNyVFZKcFVQOTJuVVNpUFJidEdKVlRSdXd5aXJ0Vk1rZW9YK3haTzlmNHlSaTl1Zy9wVndzcnVzOTBieFFPWk92M29pWFdwZDUwWmlmamx6bkZQNnJtSlIvY3RSOTFyNHlqQWozYUxMZWYvbDlXYXBjaG1VZXBmVTBYZ2ZiQnp2L2hJOWtrM3VuaHVhbHZabkI4VmhmdHd0MzVKTXZrdXpjem9zMmVpeHBWZ3NYdHZ1LzdaYkE4K3RFTGhURktNZmo1bXFtelM2ZDQ1ZGZvYTF4WkZ3TjdNclNobUNTRzhzbk5tNVpyWmJ5UW9lTWZQQXowbWhIRExpcld0bVFxTXRzdDNmbEYzUjNUU0hJTUxoREpmaHNPQ2o4V2VYYVRaN2VzUFhVQXZiemVxZjIwcXg5ZDdPVkN2RjZsU1IvelZDN1ZNa1ZSdUsraXYrNFBZdWdqbXBobVY5YUI2MWlXWlNHOXNWc2o0bnIxVWY0d29BalZwUk1HN1RyRVFYK3ZGdWxJOWE4ZXMwUllGamIvZnkzVklNYXBUaWhhOEt4ZTBNRzhHMkZRMXJXbDdlOFJOaS9wZU93TjQvR0pZUXdvVndqY3VYampEdTN2SjdxM1JiOGt6OWtuWG9yWjVCc2RjQjArWmpYVjdGMjluMnl5YXl4NzV2cTZZSnd0cXF4MnpFU2ZLWUZ1NkdpcTBEQ2ZRQTltWVE4Y2s0QnlWWit6cUVKN2ZOR2ZoSEgxaFppYzB4UzR2ZGVNdVZEaVlMN0k5dGMrWUxSTnBZQWp2SGRUTXV2Y1hPT1hIN2w2a3NyOW9qVmFyMVdxMVdxMVdxOVZxdFZxdFZxdlZhclZhclZhcjFXcTFXcTNXWmY5aFp1WHdkanptbHhQbjdoa2ZyWmVOTWZ5dnJpMWhpOHgrWWJrYk82dG84V0JXeVJyOWZ2Ui9qMEorbC92MzVRdGtrWXk3NHhzaGhGMnFvL3hTcU5Gb05CcU5ScVBSYURRYWpVYWowV2cwR28xR285Rm9OQnFOUnFQeGIvR1U4ellCWjI3WE5DeXZ4TnF0SisrUEQ4NkVtZldrSDdhUFNPYTVIdEt2RHhsWnFFVHUrc1N6Rjg2Vkh2aDVHQUFBQUFBQUFBQUFBQUFBWU96cDVUN3J2VG12NlR5OGpZemJmRUFFNmV4ZG1PL3VPVFJtdTEzeXYzc2g2NE1adithdnpPYzhJOWZ4c08zWFIwK2RndlhLRUY3WnFoRFBqUm1sUzRmaW9heGFxTS9RWGIyNTN0cjdXRisyUkR6ck5QZG43TjU1MjIxR285R3BpVHA3eWFGVDlDblhJaG01TG9qWnVoR2UzbXF5Y2p4Y2wzR3cxS0U0b3d0aDlKV0xqK2c3Tk1kVlBWM24yeDJLeTNwVHZydWtLdXZ4SHVyZE1TaWpWbDZ2THhtT091aWRUcEpiZHZhUjBaMWN1eWhLZXpvdTZId3lmM1kycGgweVN2RHgrNWdmV09lZUVEcmI3ZjRacHhFbFdwaHN2dys3Ky9PUGVqMGNwVy80OWRtMTF6cWQvNy92emZYQVVpMzAyNnJUUWF5ZXNmNTJ0dzk5ejdjdTJ4dnJtQ3BzQStkbk5jMTlpSExhdEhrdi9MMDZoMXpqYmZ4d3R6cEhIMzNWeE1qOTNnb2h6RjRSRHd1ZDgyY0k3MEpmTmRGWjRaNTVwa0piKzk2Zi90dXQ5M0d2ZFRlcjBtcXkyMXdBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFEMGNWMGRBRlpRT0NCcUFnQUFNQjRBblFFcUxBR0lBRDZSUnB4SkphUWpJU3MvS0FDd0VnbGpidC93TDBDOEFmcUJBZ1B3QS9BRHlBUG9BNXdEOEFQd0F0Zi9LQXZ3RDhBTGtkMFQ1enFYL0x1RU02NCtYNUozL04yZ1AwQXhRSDhBL2dIN0FlLy9UZjQxSFlENnRhMXJWUlk4MkRvd0YrMkFVcUh1ZnhqMDUzUDR4NUxxTllCS1kzdDF4TVpBTHlKamdFNHpUSTV0UVlNZmdlaERDS3pvWGtUSEFKeG1tUnphdk41a3gvUWZ6ak5Nam0xZWNBbkdhWkhOb1huWEFJaVhzMHlPYlY1d0NjWnBrYzJydjA5NGdGcXc4WkhOcTg0Qk9NMHlPYlY1dlZ2T2k4ZnJGdkVEaDZhU2tGeWpxdS9yQys4a2VmQW5GeVM4NEJPTGlLcFZzdmNEU3RqK0FBRCsvUFJlZ3pHbW52dDQzdzA4YTE3MTlJdUE1YXRkN0EyTmoxbWZweHM3OVkzc3d4blczWmxTdXdqUXNoeERNYWFlKzNqZkRUeHJYdlgwaTRuN0s4bnFnNThIWVBRV3I0ZXpPWHpDaFhkait5VkpjVDFNR2NJcmpXV0lUblBRc0JtTk5QZmJ4dmhwNDFyM3I2UmNUOWxlVDFRYytFS2VNU01hcWt5SmZxWUhKUU4vVFljQmJTYkE4bkdjWXBXQkRxMnVLa1FUalA2ZUpZVmFFRzBIVENMUzlqQVYzbXc3bW85enNOTFRVZW9vdFl5b3kxM3pTRjdoMG15Z1dsTUIxNVpCMFBvMmdJdEhzZ2p0Y0MwTWlyVEpQWmZiNEd1VUFabXljRGlweVI3RTAyR3JIb0gvL2llbWlkTUZQb2RLREREcDNhcC9LMmFtOWQ1SlhtdHNqdkNDcmZabC9lSjdzKzRWRXFqYyt1T3dnZDZBMTFnMmY4cGYvL1F4VVFoaFpvcjlCVmNjdUtXYUM3R3RpVkhOU2hZNU9sWllmdTRvTnMvTExXZWRadjFQenNMRWZid2VSejQzWjdjSllaQTIzSXF0N21mSEhIVHFBRklhOWFVRitaZldoUjhlOU1YRzBxRXk2SjNOR29BQSIgYWx0PSLXptee16giPgogICAgPHNwYW4gY2xhc3M9ImJvdHRvbS10ZXh0Ij7CqSAyMDI1INep15DXpNeV16gg16nXmNeZ15fXmdedINeQLtebLiDXkdeiIteePC9zcGFuPgogIDwvZGl2PgogIDxkaXYgY2xhc3M9ImJvdHRvbS11cmwiPlRaRU1FUi5DTy5JTDwvZGl2Pgo8L2Rpdj4KCjxzY3JpcHQ+CgovLyDilIDilIDilIAgTE9BRCBDT05GSUcgRlJPTSBBRE1JTiDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAKZnVuY3Rpb24gbG9hZEFkbWluQ2ZnKCl7CiAgdHJ5eyByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndHplbWVyX2FkbWluX2NmZycpKXx8bnVsbDsgfWNhdGNoKGUpeyByZXR1cm4gbnVsbDsgfQp9CmNvbnN0IF9BRE1JTiA9IGxvYWRBZG1pbkNmZygpOwpjb25zdCBfRyAgPSAoX0FETUlOICYmIF9BRE1JTi5nZW5lcmFsKSAgICAgICAgfHwge307CmNvbnN0IF9WICA9IChfQURNSU4gJiYgX0FETUlOLnZpc2liaWxpdHkpICAgICB8fCB7fTsKY29uc3QgX0NQID0gKF9BRE1JTiAmJiBfQURNSU4uY2xlYW5pbmdQcmljZXMpIHx8IHt9Owpjb25zdCBfUlAgPSAoX0FETUlOICYmIF9BRE1JTi5yZXBhaXJQcmljZXMpICAgfHwge307CmNvbnN0IF9EUCA9IChfQURNSU4gJiYgX0FETUlOLmRlbGl2ZXJ5UHJpY2VzKSB8fCBudWxsOwpjb25zdCBfREMgPSAoX0FETUlOICYmIF9BRE1JTi5kaXNjb3VudHMpICAgICAgfHwgbnVsbDsKCmNvbnN0IE1JTiAgICAgPSBfRy5taW5PcmRlciAgfHwgMjUwOwpjb25zdCBNSU5fU0lERT0gX0cubWluU2lkZSAgIHx8IDEwMDsKY29uc3QgRElTQyAgICA9IChfREN8fFt7bjozLHA6NSxsYWJlbDon15TXoNeX16ogMysg16nXmNeZ15fXmdedICgtNSUpJ30se246NSxwOjEwLGxhYmVsOifXlNeg15fXqiA1KyDXqdeY15nXl9eZ150gKC0xMCUpJ31dKQogICAgICAgICAgICAgICAgLm1hcChkPT4oe246ZC5uLHA6ZC5wLGw6ZC5sYWJlbH0pKTsKCmNvbnN0IEJSQU5DSEVTPXsKICBqZXJ1c2FsZW06e25hbWU6J9eZ16jXldep15zXmdedJyxhZGRyOifXpNeZ15nXqCDXp9eg15nXkiAzOSwg16rXnNek15nXldeqJyxwaG9uZTonMDczLTc3ODQ1NjQnLGhvdXJzOifXkC3XlCA5OjMwLTE4OjMwIHwg15UgOTowMC0xMzozMCB8INeX16DXmdeUINeX15nXoNedJ30sCiAgcmlzaG9uOntuYW1lOifXqNeQ16nXldefINec16bXmdeV158nLGFkZHI6J9eQ15zXmdeU15Ug15DXmdeq158gMywg15HXmdeqINeS15nXqNeV158nLHBob25lOicwNzMtNzgyMTE3OCcsaG91cnM6J9eQLdeUIDk6MDAtMTg6MzAgfCDXlSA5OjAwLTEzOjMwIHwg15fXoNeZ15Qg15fXmdeg150nfSwKICByaXNob24yOntuYW1lOifXqNeQ16nXldefINec16bXmdeV158g15HXldeY15nXpycsYWRkcjon15zXmdep16DXoden15kgNCwg16nXkdei16og15TXm9eV15vXkdeZ150nLHBob25lOicwNzMtNzU4NzQ5NycsaG91cnM6J9eQLdeUIDEwOjAwLTE5OjAwIHwg15UgOTowMC0xMzozMCB8INep16LXqteZ15nXnSDXqNeQ16nXldeg15XXqiDXl9eZ16DXnSd9LAogIGhlcnpsaXlhOntuYW1lOifXlNeo16bXnNeZ15QnLGFkZHI6J9ee15PXmdeg16og15TXmdeU15XXk9eZ150gNjAnLHBob25lOicwNzMtNzgyOTExMycsaG91cnM6J9eQLdeUIDEwOjAwLTE4OjMwIHwg15UgOTozMC0xNDowMCB8INeX16DXmdeUINeR16rXqdec15XXnSd9LAogIGhlcnpsaXlhMjp7bmFtZTon15TXqNem15zXmdeUINeR15XXmNeZ16cnLGFkZHI6J9ee15PXmdeg16og15TXmdeU15XXk9eZ150gNjAnLHBob25lOicwNzMtNzc4ODA1MicsaG91cnM6J9eQLdeUIDEwOjAwLTE4OjMwIHwg15UgOTozMC0xNDowMCB8INeX16DXmdeUINeR16rXqdec15XXnSd9LAogIG5ldGFueWE6e25hbWU6J9eg16rXoNeZ15QnLGFkZHI6J9ee16Qi15kgNSwg16fXldee15QgMiwg157XqteX150g15TXodeV15TXlScscGhvbmU6JzA3My03NTc5MTE0Jyxob3Vyczon15At15QgMTA6MDAtMTk6MDAgfCDXlSA5OjAwLTE0OjAwIHwg16nXoteUINeo15DXqdeV16DXlCDXl9eZ16DXnSd9LAogIHRlbGF2aXY6e25hbWU6J9eq15wg15DXkdeZ15EgLSBPdXRsZXQnLGFkZHI6J9en15nXkdeV16Ug15LXnNeV15nXldeqIDM0LCDXqtecINeQ15HXmdeRJyxwaG9uZTonMDczLTc4MjQyMDInLGhvdXJzOifXkC3XlCA5OjAwLTE4OjMwIHwg15UgOTowMC0xMzozMCB8INeX16DXmdeUINeR16rXqdec15XXnSd9LAogIG1hYWxlOntuYW1lOifXntei15zXlCDXkNeT15XXnteZ150gRGNpdHknLGFkZHI6J9eT16jXmiDXmdee15nXqiAxMCwg157Xotec15Qg15DXk9eV157XmdedJyxwaG9uZTonMDczLTc1ODE3MjMnLGhvdXJzOifXkC3XlCAxMDowMC0xODozMCB8INeVIDk6MzAtMTM6MzAgfCDXl9eg15nXlCDXl9eZ16DXnSd9LAp9OwoKY29uc3QgQ19UWVBFUz1bCiAge2lkOidtYWNoaW5lJyxuYW1lOifXoteR15XXk9eqINee15vXldeg15QnLHByaWNlOl9DUC5tYWNoaW5lfHw5NX0sCiAge2lkOidoYW5kJywgICBuYW1lOifXoteR15XXk9eqINeZ15MnLCAgIHByaWNlOl9DUC5oYW5kICAgfHwxMzV9LAogIHtpZDonc2lsaycsICAgbmFtZTon157XqdeZJywgICAgICAgICBwcmljZTpfQ1Auc2lsayAgIHx8MTkwfSwKXTsKY29uc3QgQ19TVkNTPVsKICB7aWQ6J3VyaW5lJyxuYW1lOifXl9eZ15jXldeZINeo15nXlyDXqdeq158nLHBwbTpfQ1AudXJpbmV8fDYwLCBmaXhlZDpmYWxzZSwgIHNob3c6X1Yuc3ZjVXJpbmUhPT1mYWxzZX0sCiAge2lkOidzdGFpbicsbmFtZTon15jXmdek15XXnCDXkdeb16rXnScsICAgcHBtOjAsICAgICAgICAgICAgIGZpeGVkOnRydWUsZnA6X0NQLnN0YWlufHw3NTAsIHNob3c6X1Yuc3ZjU3RhaW4hPT1mYWxzZX0sCiAge2lkOidmbG9vZCcsbmFtZTon16rXldeh16TXqiDXnNeU16bXpNeUJywgIHBwbTpfQ1AuZmxvb2R8fDUwLCBmaXhlZDpmYWxzZSwgIHNob3c6X1Yuc3ZjRmxvb2QhPT1mYWxzZX0sCiAge2lkOidoYXJkc3RhaW4nLG5hbWU6J9eY15nXpNeV15wg15HXm9eq150g16fXqdeUJywgcHBtOjAsIGZpeGVkOnRydWUsIGZwOihfQ1AuaGFyZHN0YWlufHwxMDAwKSwgc2hvdzpfVi5zdmNIYXJkc3RhaW4hPT1mYWxzZX0sCl07CmNvbnN0IF9STiA9IChfQURNSU4gJiYgX0FETUlOLnJlcGFpck5hbWVzKSB8fCB7fTsKZnVuY3Rpb24gX3JuKGlkLCBkZWYpeyByZXR1cm4gX1JOW2lkXSE9PXVuZGVmaW5lZCA/IF9STltpZF0gOiBkZWY7IH0KLy8gYmlsbGluZzogJ3NxbSc9YXJlYSwgJ3NpZGVzNCc9dXAgdG8gNCBzaWRlcyAobGluZWFyIG0pLCAnc2lkZXMyJz11cCB0byAyIHNpZGVzLCAnZml4ZWQnPWZsYXQgcHJpY2UKY29uc3QgUl9DQVRTPVsKICB7Y2F0OifXoteR15XXk9eV16og16HXqNeYJywgYmlsbGluZzonc2lkZXM0Jywgc3ZjczpbCiAgICB7aWQ6J3QxJyxuYW1lOl9ybigndDEnLCfXlNeT15HXp9eqINeh16jXmCAvINeh16jXmCDXl9edINec16fXoNeYJykscHBtOl9SUC50MXx8NjB9LAogICAge2lkOid0MicsbmFtZTpfcm4oJ3QyJywn16HXqNeYIFAuVi5DINeq16TXldeoICjXoteR15XXk9eqINeZ15MpJykscHBtOl9SUC50Mnx8MTAwfSwKICAgIHtpZDondDMnLG5hbWU6X3JuKCd0MycsJ9eh16jXmCDXl9eZ15HXldeoINeh16jXmCDXl9edJykscHBtOl9SUC50M3x8NzV9LAogICAge2lkOid0NCcsbmFtZTpfcm4oJ3Q0Jywn16HXqNeYINec16nXmNeZ15cg157Xm9eV16DXlCcpLHBwbTpfUlAudDR8fDEwMH0sCiAgICB7aWQ6J3Q1JyxuYW1lOl9ybigndDUnLCfXodeo15gg15nXldeY15QnKSxwcG06X1JQLnQ1fHwxMDB9LAogIF19LAogIHtjYXQ6J9eq15nXp9eV158g15XXqNeh15jXldeo16bXmdeUJywgYmlsbGluZzonc3FtJywgc3ZjczpbCiAgICB7aWQ6J3IxJyxuYW1lOl9ybigncjEnLCfXnteq15nXl9eUJykscHBtOl9SUC5yMXx8MzYwfSwKICAgIHtpZDoncjInLG5hbWU6X3JuKCdyMicsJ9eo16HXmNeV16jXpteZ15Qg16bXnteoJykscHBtOl9SUC5yMnx8OTUwfSwKICAgIHtpZDoncjMnLG5hbWU6X3JuKCdyMycsJ9eo16HXmNeV16jXpteZ15Qg157XqdeZJykscHBtOl9SUC5yM3x8MTE1MH0sCiAgICB7aWQ6J3I0JyxuYW1lOl9ybigncjQnLCfXmNeZ16TXldecINeR16jXp9eiINem15TXldeRJykscHBtOl9SUC5yNHx8MjgwfSwKICAgIHtpZDoncjUnLG5hbWU6X3JuKCdyNScsJ9eX15nXlteV16cg16jXkNepJykscHBtOl9SUC5yNXx8MzUwLGJpbGxpbmc6J3NpZGVzMmxvbmcnfSwKICBdfSwKICB7Y2F0OifXl9eZ16rXldeaINeV16rXpNeZ16jXlCcsIGJpbGxpbmc6J3NpZGVzNCcsIHN2Y3M6WwogICAge2lkOidjMScsbmFtZTpfcm4oJ2MxJywn15fXmdeq15XXmiDXpNeo16LXldep15nXnSAvINei16knKSxwcG06X1JQLmMxfHw3NX0sCiAgICB7aWQ6J2MyJyxuYW1lOl9ybignYzInLCfXl9eZ16rXldeaINep15jXmdeXINep15DXkteZIC8g16JcdTA1RjTXmScpLHBwbTpfUlAuYzJ8fDE2MH0sCiAgICB7aWQ6J2MzJyxuYW1lOl9ybignYzMnLCfXl9eZ16rXldeaINep15jXmdeXINeo15LXmdecJykscHBtOl9SUC5jM3x8MzV9LAogIF19LAogIHtjYXQ6J9ei15HXldeT15XXqiDXpNeo16DXlteZ150nLCBiaWxsaW5nOidzaWRlczQnLCBzdmNzOlsKICAgIHtpZDonZjEnLG5hbWU6X3JuKCdmMScsJ9eU15zXkdeg16og16TXqNeg15bXmdedJykscHBtOl9SUC5mMXx8NjB9LAogICAge2lkOidmMicsbmFtZTpfcm4oJ2YyJywn16TXqNeg15Yg15nXkyAvINem157XqCAvINeb15XXqteg15QnKSxwcG06X1JQLmYyfHw1ODB9LAogICAge2lkOidmMycsbmFtZTpfcm4oJ2YzJywn16TXqNeg15Yg157Xp9eV16jXmScpLHBwbTpfUlAuZjN8fDc4MH0sCiAgXX0sCiAge2NhdDon16rXpNeZ16jXqiDXpNeZ16DXldeqJywgYmlsbGluZzonZml4ZWQnLCBzdmNzOlsKICAgIHtpZDoncDEnLG5hbWU6X3JuKCdwMScsJ9eq16TXmdeo16ogNCDXpNeZ16DXldeqINei15XXqCcpLHBwbTowLGZpeGVkOnRydWUsZnA6X1JQLnAxfHwyODB9LAogIF19LAogIHtjYXQ6J9ei15HXldeT15XXqiDXkteZ15bXldeWJywgYmlsbGluZzonc3FtJywgc3ZjczpbCiAgICB7aWQ6J2cxJyxuYW1lOl9ybignZzEnLCfXkteZ15bXldeWINeX15XXmNeZ150g15HXldec15jXmdedJykscHBtOjAsZml4ZWQ6dHJ1ZSxmcDpfUlAuZzF8fDIwMH0sCiAgXX0sCl07CgovLyBBcHBseSB2aXNpYmlsaXR5IGZyb20gYWRtaW4KZnVuY3Rpb24gYXBwbHlWaXNpYmlsaXR5KCl7CiAgLy8gdGFicwogIGNvbnN0IGNsZWFuVGFiPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YWItYnRuOm50aC1jaGlsZCgxKScpOwogIGNvbnN0IHJlcGFpclRhYj1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFiLWJ0bjpudGgtY2hpbGQoMiknKTsKICBpZihjbGVhblRhYiYmX1YuY2xlYW5pbmc9PT1mYWxzZSl7Y2xlYW5UYWIuc3R5bGUuZGlzcGxheT0nbm9uZSc7fQogIGlmKHJlcGFpclRhYiYmX1YucmVwYWlyPT09ZmFsc2Upe3JlcGFpclRhYi5zdHlsZS5kaXNwbGF5PSdub25lJzsgc3dpdGNoVGFiKCdjbGVhbmluZycpO30KICAvLyBkZWxpdmVyeSBvcHRpb24KICBpZihfVi5kZWxpdmVyeT09PWZhbHNlKSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGVsaXZlcnktb3B0Om50aC1jaGlsZCgyKScpLmZvckVhY2goZT0+ZS5zdHlsZS5kaXNwbGF5PSdub25lJyk7CiAgLy8gYnJhbmNoZXMKICBpZihfVi5icmFuY2hlcz09PWZhbHNlKSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnJhbmNoLXJvdycpLmZvckVhY2goZT0+ZS5zdHlsZS5kaXNwbGF5PSdub25lJyk7CiAgLy8gcHJpbnQgYnRuCiAgaWYoX1YucHJpbnQ9PT1mYWxzZSkgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByaW50LWJ0bicpLmZvckVhY2goZT0+ZS5zdHlsZS5kaXNwbGF5PSdub25lJyk7CiAgLy8gcHJldmlldwogIGlmKF9WLnByZXZpZXc9PT1mYWxzZSkgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcnBldC1wcmV2aWV3JykuZm9yRWFjaChlPT5lLnN0eWxlLmRpc3BsYXk9J25vbmUnKTsKICAvLyBmb290bm90ZQogIGlmKF9HLmZvb3Rub3RlKSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3VtbWFyeS1ub3RlJykuZm9yRWFjaChlPT5lLnRleHRDb250ZW50PV9HLmZvb3Rub3RlKTsKICAvLyBkZWxpdmVyeSBjaXR5IG9wdGlvbnMg4oCUIHJlYnVpbGQgZnJvbSBhZG1pbiBwcmljZXMKICBpZihfRFApewogICAgWydjLWNpdHknLCdyLWNpdHknXS5mb3JFYWNoKHNlbElkPT57CiAgICAgIGNvbnN0IHNlbD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxJZCk7CiAgICAgIGlmKCFzZWwpcmV0dXJuOwogICAgICBzZWwuaW5uZXJIVE1MPSc8b3B0aW9uIHZhbHVlPSIwIj4tLSDXkdeX16gg16LXmdeoIC0tPC9vcHRpb24+JzsKICAgICAgX0RQLmZvckVhY2goYz0+c2VsLmlubmVySFRNTCs9YDxvcHRpb24gdmFsdWU9IiR7Yy5wcmljZX0iPiR7Yy5uYW1lfTwvb3B0aW9uPmApOwogICAgfSk7CiAgfQp9CgpsZXQgY0lkPTAsIHJJZD0wOwoKZnVuY3Rpb24gc3dpdGNoVGFiKHQpewogIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWItYnRuJykuZm9yRWFjaCgoYixpKT0+Yi5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnLChpPT09MCYmdD09PSdjbGVhbmluZycpfHwoaT09PTEmJnQ9PT0ncmVwYWlyJykpKTsKICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VjdGlvbicpLmZvckVhY2gocz0+cy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7CiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodCkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7Cn0KCmZ1bmN0aW9uIHVwUHJldihpZCxwKXsKICBjb25zdCBsPXBhcnNlRmxvYXQoKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3B9LWxlbi0ke2lkfWApICYmIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3B9LWxlbi0ke2lkfWApLnZhbHVlKSl8fDA7CiAgY29uc3Qgdz1wYXJzZUZsb2F0KChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtwfS13aWQtJHtpZH1gKSAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtwfS13aWQtJHtpZH1gKS52YWx1ZSkpfHwwOwogIGNvbnN0IHN2Zz1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcHN2Zy0ke3B9LSR7aWR9YCk7CiAgY29uc3QgbGJsPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBwbGJsLSR7cH0tJHtpZH1gKTsKICBpZighc3ZnKXJldHVybjsKICBjb25zdCBNPTc2OwogIGxldCBydyxyaDsKICBpZihsPT09MCYmdz09PTApe3J3PU07cmg9TWF0aC5yb3VuZChNKi43NSk7fQogIGVsc2UgaWYobD49dyl7cnc9TTtyaD1NYXRoLm1heCg4LE1hdGgucm91bmQoTSoody9sKSkpO30KICBlbHNle3JoPU07cnc9TWF0aC5tYXgoOCxNYXRoLnJvdW5kKE0qKGwvdykpKTt9CiAgc3ZnLnNldEF0dHJpYnV0ZSgndmlld0JveCcsYDAgMCAke3J3fSAke3JofWApOwogIHN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJyxydyk7c3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JyxyaCk7CiAgc3ZnLnF1ZXJ5U2VsZWN0b3IoJ3JlY3QnKS5zZXRBdHRyaWJ1dGUoJ3dpZHRoJyxydyk7CiAgc3ZnLnF1ZXJ5U2VsZWN0b3IoJ3JlY3QnKS5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcscmgpOwogIGlmKGxibClsYmwudGV4dENvbnRlbnQ9KGw+MCYmdz4wKT9gJHtsfcOXJHt3fSDXoVx1MDVGNNeeYDon15TXltefINee15nXk9eV16onOwp9CgpmdW5jdGlvbiBta1ByZXYoaWQscCl7CiAgY29uc3QgY29sPXA9PT0nYyc/J2U4ODEyYSc6J2U4ODEyYSc7CiAgcmV0dXJuIGA8ZGl2IGNsYXNzPSJjYXJwZXQtcHJldmlldyI+CiAgICA8ZGl2IGNsYXNzPSJwcmV2aWV3LWJveCI+CiAgICAgIDxzdmcgaWQ9InBzdmctJHtwfS0ke2lkfSIgd2lkdGg9Ijc2IiBoZWlnaHQ9IjU3IiB2aWV3Qm94PSIwIDAgNzYgNTciPgogICAgICAgIDxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZyR7cH0ke2lkfSIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPgogICAgICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIyR7Y29sfSIgc3RvcC1vcGFjaXR5PSIuNjUiLz4KICAgICAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIyR7cD09PSdjJz8nYzk2YTE4JzonYzk2YTE4J30iIHN0b3Atb3BhY2l0eT0iLjQiLz4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KICAgICAgICA8cmVjdCB3aWR0aD0iNzYiIGhlaWdodD0iNTciIHJ4PSI1IiBmaWxsPSJ1cmwoI2cke3B9JHtpZH0pIiBzdHJva2U9IiMke2NvbH0iIHN0cm9rZS13aWR0aD0iMS41Ii8+CiAgICAgIDwvc3ZnPgogICAgPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJwcmV2aWV3LWxhYmVsIiBpZD0icGxibC0ke3B9LSR7aWR9Ij7XlNeW158g157XmdeT15XXqjwvZGl2PgogIDwvZGl2PmA7Cn0KCmZ1bmN0aW9uIGFkZENhcnBldChwKXsKICBpZihwPT09J2MnKXsKICAgIGNvbnN0IGlkPSsrY0lkOwogICAgY29uc3QgdE9wdHM9Q19UWVBFUy5tYXAodD0+YDxkaXYgY2xhc3M9InR5cGUtb3B0Ij48aW5wdXQgdHlwZT0icmFkaW8iIG5hbWU9ImN0LSR7aWR9IiBpZD0iY3Qke2lkfS0ke3QuaWR9IiB2YWx1ZT0iJHt0LnByaWNlfSIgJHt0LmlkPT09J21hY2hpbmUnPydjaGVja2VkJzonJ30gb25jaGFuZ2U9ImNhbGNDbGVhbmluZygpIj48bGFiZWwgZm9yPSJjdCR7aWR9LSR7dC5pZH0iPjxzcGFuIGNsYXNzPSJ0eXBlLW5hbWUiPiR7dC5uYW1lfTwvc3Bhbj48c3BhbiBjbGFzcz0idHlwZS1wcmljZSI+4oKqJHt0LnByaWNlfS/Xnlx1MDVGNNeoPC9zcGFuPjwvbGFiZWw+PC9kaXY+YCkuam9pbignJyk7CiAgICBjb25zdCBzT3B0cz1DX1NWQ1MuZmlsdGVyKHM9PnMuc2hvdyE9PWZhbHNlKS5tYXAocz0+YDxkaXYgY2xhc3M9InN2Yy1vcHQiPjxpbnB1dCB0eXBlPSJjaGVja2JveCIgaWQ9ImNzJHtpZH0tJHtzLmlkfSIgb25jaGFuZ2U9ImNhbGNDbGVhbmluZygpIj48bGFiZWwgZm9yPSJjcyR7aWR9LSR7cy5pZH0iPjxzcGFuIGNsYXNzPSJjaGsiPuKckzwvc3Bhbj48c3Bhbj48c3BhbiBjbGFzcz0ic3ZjLW5hbWUiPiR7cy5uYW1lfTwvc3Bhbj48c3BhbiBjbGFzcz0ic3ZjLXByaWNlLWxibCI+JHtzLmZpeGVkPyfigqonK3MuZnArJyDXodeUXHUwNUY015snOifigqonK3MucHBtKycv155cdTA1RjTXqCd9PC9zcGFuPjwvc3Bhbj48L2xhYmVsPjwvZGl2PmApLmpvaW4oJycpOwogICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsZWFuaW5nLWxpc3QnKS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsYAogICAgICA8ZGl2IGNsYXNzPSJjYXJwZXQtY2FyZCIgaWQ9ImMtY2FyZC0ke2lkfSI+CiAgICAgICAgPGRpdiBjbGFzcz0iY2FycGV0LWNhcmQtaGVhZGVyIj48c3BhbiBjbGFzcz0iY2FycGV0LW51bSI+16nXmNeZ15cg157XoVx1MDVGMyAke2lkfTwvc3Bhbj4ke2lkPjE/YDxidXR0b24gY2xhc3M9InJlbW92ZS1idG4iIG9uY2xpY2s9InJtQygnYycsJHtpZH0pIj7inJU8L2J1dHRvbj5gOicnfTwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImRpbXMtcHJldmlldy1yb3ciPgogICAgICAgICAgPGRpdj4KICAgICAgICAgICAgPGRpdiBjbGFzcz0iZGltcy1pbnB1dHMiPgogICAgICAgICAgICAgIDxkaXYgY2xhc3M9ImZpZWxkIj48bGFiZWw+15DXldeo15ogKNehXHUwNUY0154pPC9sYWJlbD48aW5wdXQgdHlwZT0ibnVtYmVyIiBpZD0iYy1sZW4tJHtpZH0iIHBsYWNlaG9sZGVyPSIyMDAiIG1pbj0iMCIgaW5wdXRtb2RlPSJudW1lcmljIiBwYXR0ZXJuPSJbMC05XSoiIG9uaW5wdXQ9InVwUHJldigke2lkfSwnYycpO2NhbGNDbGVhbmluZygpIj48L2Rpdj4KICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJmaWVsZCI+PGxhYmVsPteo15XXl9eRICjXoVx1MDVGNNeeKTwvbGFiZWw+PGlucHV0IHR5cGU9Im51bWJlciIgaWQ9ImMtd2lkLSR7aWR9IiBwbGFjZWhvbGRlcj0iMTUwIiBtaW49IjAiIGlucHV0bW9kZT0ibnVtZXJpYyIgcGF0dGVybj0iWzAtOV0qIiBvbmlucHV0PSJ1cFByZXYoJHtpZH0sJ2MnKTtjYWxjQ2xlYW5pbmcoKSI+PC9kaXY+CiAgICAgICAgICAgICAgPGRpdiBjbGFzcz0iYXJlYS1pbmZvIj48c3BhbiBjbGFzcz0iYXJlYS1sYmwiPtep15jXlyDXkdek15XXotecPC9zcGFuPjxzcGFuIGNsYXNzPSJhcmVhLXZhbCIgaWQ9ImMtYXJlYS0ke2lkfSI+MC4wMCDXnlx1MDVGNNeoPC9zcGFuPjwvZGl2PgogICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgIDwvZGl2PgogICAgICAgICAgJHtta1ByZXYoaWQsJ2MnKX0KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJ0eXBlLWdyaWQiPiR7dE9wdHN9PC9kaXY+CiAgICAgICAgPHAgY2xhc3M9InNlcnZpY2VzLXRpdGxlIj7XqdeZ16jXldeq15nXnSDXoNeV16HXpNeZ150g15zXoNeZ16fXldeZPC9wPgogICAgICAgIDxkaXYgY2xhc3M9InNlcnZpY2VzLWdyaWQiPiR7c09wdHN9PC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iY2FyZC1zdWJ0b3RhbCIgaWQ9ImMtc3VidG90YWwtY2FyZC0ke2lkfSIgc3R5bGU9ImRpc3BsYXk6bm9uZSI+PHNwYW4gY2xhc3M9ImNhcmQtc3VidG90YWwtbGFiZWwiPtei15zXldeqINep15jXmdeXINeW15Q8L3NwYW4+PHNwYW4gY2xhc3M9ImNhcmQtc3VidG90YWwtYW1vdW50IiBpZD0iYy1zdWItJHtpZH0iPjwvc3Bhbj48L2Rpdj4KICAgICAgPC9kaXY+YCk7CiAgfSBlbHNlIHsKICAgIGNvbnN0IGlkPSsrcklkOwogICAgbGV0IHNoPScnOwogICAgUl9DQVRTLmZvckVhY2goY2F0PT57CiAgICAgIGNvbnN0IGJpbGxpbmc9Y2F0LmJpbGxpbmd8fCdzcW0nOwogICAgICBjb25zdCB1bml0TGFiZWwgPSBiaWxsaW5nPT09J3NxbScgPyAnL9eeXHUwNUY016gnIDogYmlsbGluZz09PSdmaXhlZCcgPyAnJyA6ICcv155cdTA1RjMgKNec16TXmSDXptec16LXldeqKSc7CiAgICAgIHNoKz1gPGRpdiBjbGFzcz0icnN2Yy1jYXRlZ29yeSI+JHtjYXQuY2F0fTwvZGl2PmA7CiAgICAgIGNhdC5zdmNzLmZvckVhY2gocz0+ewogICAgICAgIGNvbnN0IHNCaWxsaW5nPXMuYmlsbGluZ3x8YmlsbGluZzsKICAgICAgICBjb25zdCBzVW5pdExhYmVsPXNCaWxsaW5nPT09J3NxbSc/Jy/Xnlx1MDVGNNeoJzpzQmlsbGluZz09PSdmaXhlZCc/Jyc6Jy/Xnlx1MDVGNCAo15zXpNeZINem15zXoteV16opJzsKICAgICAgICBjb25zdCBwbD1zLmZpeGVkP2Digqoke3MuZnB9INec15DXmdeX15XXk2A6YOKCqiR7cy5wcG19JHtzVW5pdExhYmVsfWA7CiAgICAgICAgc2grPWA8ZGl2IGNsYXNzPSJyc3ZjLW9wdCI+CiAgICAgICAgICA8aW5wdXQgdHlwZT0iY2hlY2tib3giIGlkPSJycyR7aWR9LSR7cy5pZH0iIG9uY2hhbmdlPSJ0b2dnbGVTaWRlU2VsZWN0b3IoJHtpZH0sJyR7cy5pZH0nLCcke3NCaWxsaW5nfScpO2NhbGNSZXBhaXIoKSI+CiAgICAgICAgICA8bGFiZWwgZm9yPSJycyR7aWR9LSR7cy5pZH0iPgogICAgICAgICAgICA8c3BhbiBjbGFzcz0icnN2Yy1sZWZ0Ij48c3BhbiBjbGFzcz0icnN2Yy1jaGVjayI+4pyTPC9zcGFuPjxzcGFuIGNsYXNzPSJyc3ZjLW5hbWUiPiR7cy5uYW1lfTwvc3Bhbj48L3NwYW4+CiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSJyc3ZjLXByaWNlLWJhZGdlIj4ke3BsfTwvc3Bhbj4KICAgICAgICAgIDwvbGFiZWw+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0ic2lkZS1zZWxlY3RvciIgaWQ9InNzJHtpZH0tJHtzLmlkfSIgZGF0YS1iaWxsaW5nPSIke3NCaWxsaW5nfSIgZGF0YS1wcG09IiR7cy5wcG18fDB9IiBkYXRhLWZwPSIke3MuZnB8fDB9IiBkYXRhLWZpeGVkPSIke3MuZml4ZWR8fGZhbHNlfSI+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJzaWRlLXNlbC10aXRsZSI+15HXl9eoINem15zXoteV16og15zXoteZ15HXldeTIDxzcGFuIGlkPSJzcy10b3RhbCR7aWR9LSR7cy5pZH0iPjwvc3Bhbj48L2Rpdj4KICAgICAgICAgIDxkaXYgY2xhc3M9InNpZGVzLWdyaWQgZm91ciIgaWQ9InNnJHtpZH0tJHtzLmlkfSI+PC9kaXY+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJzaWRlLXRvdGFsLW5vdGUiIGlkPSJzbiR7aWR9LSR7cy5pZH0iPjwvZGl2PgogICAgICAgIDwvZGl2PmA7CiAgICAgIH0pOwogICAgfSk7CiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVwYWlyLWxpc3QnKS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsYAogICAgICA8ZGl2IGNsYXNzPSJyZXBhaXItY2FyZCIgaWQ9InItY2FyZC0ke2lkfSI+CiAgICAgICAgPGRpdiBjbGFzcz0iY2FycGV0LWNhcmQtaGVhZGVyIj48c3BhbiBjbGFzcz0iY2FycGV0LW51bSI+16nXmNeZ15cg16rXmden15XXnyDXntehXHUwNUYzICR7aWR9PC9zcGFuPiR7aWQ+MT9gPGJ1dHRvbiBjbGFzcz0icmVtb3ZlLWJ0biIgb25jbGljaz0icm1DKCdyJywke2lkfSkiPuKclTwvYnV0dG9uPmA6Jyd9PC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iZGltcy1wcmV2aWV3LXJvdyI+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJkaW1zLWlucHV0cyI+CiAgICAgICAgICAgIDxkaXYgY2xhc3M9ImZpZWxkIj48bGFiZWw+15DXldeo15ogKNehXHUwNUY0154pPC9sYWJlbD48aW5wdXQgdHlwZT0ibnVtYmVyIiBpZD0ici1sZW4tJHtpZH0iIHBsYWNlaG9sZGVyPSIyMDAiIG1pbj0iMCIgaW5wdXRtb2RlPSJudW1lcmljIiBwYXR0ZXJuPSJbMC05XSoiIG9uaW5wdXQ9InVwUHJldigke2lkfSwncicpO3JlZnJlc2hTaWRlTGFiZWxzKCR7aWR9KTtjYWxjUmVwYWlyKCkiPjwvZGl2PgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJmaWVsZCI+PGxhYmVsPteo15XXl9eRICjXoVx1MDVGNNeeKTwvbGFiZWw+PGlucHV0IHR5cGU9Im51bWJlciIgaWQ9InItd2lkLSR7aWR9IiBwbGFjZWhvbGRlcj0iMTUwIiBtaW49IjAiIGlucHV0bW9kZT0ibnVtZXJpYyIgcGF0dGVybj0iWzAtOV0qIiBvbmlucHV0PSJ1cFByZXYoJHtpZH0sJ3InKTtyZWZyZXNoU2lkZUxhYmVscygke2lkfSk7Y2FsY1JlcGFpcigpIj48L2Rpdj4KICAgICAgICAgIDwvZGl2PgogICAgICAgICAgJHtta1ByZXYoaWQsJ3InKX0KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJyZXBhaXItc2VydmljZXMiPiR7c2h9PC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0icmVwYWlyLWNhcmQtc3VidG90YWwiIGlkPSJyLXN1YnRvdGFsLWNhcmQtJHtpZH0iIHN0eWxlPSJkaXNwbGF5Om5vbmUiPjxzcGFuIGNsYXNzPSJjcy1sYWJlbCI+16LXnNeV16og16nXmNeZ15cg15bXlDwvc3Bhbj48c3BhbiBjbGFzcz0iY3MtYW10IiBpZD0ici1zdWItJHtpZH0iPjwvc3Bhbj48L2Rpdj4KICAgICAgPC9kaXY+YCk7CiAgfQp9CgpmdW5jdGlvbiBybUMocCxpZCl7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cH0tY2FyZC0ke2lkfWApLnJlbW92ZSgpO3A9PT0nYyc/Y2FsY0NsZWFuaW5nKCk6Y2FsY1JlcGFpcigpO30KCmZ1bmN0aW9uIGNhbGNDbGVhbmluZygpewogIGNvbnN0IGlkcz1bLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2lkXj0iYy1jYXJkLSJdJyldLm1hcChlPT4rZS5pZC5yZXBsYWNlKCdjLWNhcmQtJywnJykpOwogIGxldCBncmFuZD0wO2NvbnN0IHJvd3M9W107CiAgaWRzLmZvckVhY2goaWQ9PnsKICAgIGNvbnN0IGw9cGFyc2VGbG9hdCgoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGMtbGVuLSR7aWR9YCkgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGMtbGVuLSR7aWR9YCkudmFsdWUpKXx8MDsKICAgIGNvbnN0IHc9cGFyc2VGbG9hdCgoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGMtd2lkLSR7aWR9YCkgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGMtd2lkLSR7aWR9YCkudmFsdWUpKXx8MDsKICAgIC8vIHJlYWwgYXJlYSBzaG93biB0byB1c2VyCiAgICBjb25zdCBzcW1SZWFsPShsKncpLzEwMDAwOwogICAgY29uc3QgYUVsPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjLWFyZWEtJHtpZH1gKTtpZihhRWwpYUVsLnRleHRDb250ZW50PXNxbVJlYWwudG9GaXhlZCgyKSsnINeeXHUwNUY016gnOwoKICAgIC8vIGJpbGxpbmcgYXJlYTogZWFjaCBzaWRlIG1pbmltdW0gMTAwY20KICAgIGNvbnN0IGxCaWxsPU1hdGgubWF4KGwsMTAwKTsKICAgIGNvbnN0IHdCaWxsPU1hdGgubWF4KHcsMTAwKTsKICAgIGNvbnN0IHNxbT0obEJpbGwqd0JpbGwpLzEwMDAwOwogICAgLy8gc2hvdyBiaWxsaW5nIG5vdGljZSBpZiByb3VuZGVkIHVwCgogICAgY29uc3QgdHA9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT0iY3QtJHtpZH0iXTpjaGVja2VkYCk7CiAgICBsZXQgc3ViPXNxbSoodHA/K3RwLnZhbHVlOjk1KTsKICAgIENfU1ZDUy5mb3JFYWNoKHM9Pntjb25zdCBjYj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChgY3Mke2lkfS0ke3MuaWR9YCk7aWYoY2ImJmNiLmNoZWNrZWQpc3ViKz1zLmZpeGVkP3MuZnA6c3FtKnMucHBtO30pOwogICAgY29uc3Qgc2U9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGMtc3ViLSR7aWR9YCk7CiAgICBpZihzZSkgc2UudGV4dENvbnRlbnQgPSAoc3FtUmVhbD4wKSA/ICfigqonK01hdGgucm91bmQoc3ViKS50b0xvY2FsZVN0cmluZygnaGUtSUwnKSA6ICcnOwogICAgY29uc3Qgc3ViQ2FyZD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChgYy1zdWJ0b3RhbC1jYXJkLSR7aWR9YCk7CiAgICBpZihzdWJDYXJkKSBzdWJDYXJkLnN0eWxlLmRpc3BsYXkgPSBzcW1SZWFsPjAgPyAnZmxleCcgOiAnbm9uZSc7CiAgICBpZihzcW1SZWFsPjApcm93cy5wdXNoKHtsOmDXqdeY15nXlyDXntehXHUwNUYzICR7aWR9ICgke3NxbVJlYWwudG9GaXhlZCgyKX0g155cdTA1RjTXqClgLHY6c3VifSk7CiAgICBncmFuZCs9c3ViOwogIH0pOwogIGxldCBkaXNjPTAsZGlzY0w9Jyc7CiAgRElTQy5zbGljZSgpLnJldmVyc2UoKS5mb3JFYWNoKGQ9PntpZihpZHMubGVuZ3RoPj1kLm4mJiFkaXNjKXtkaXNjPU1hdGgucm91bmQoZ3JhbmQqZC5wLzEwMCk7ZGlzY0w9ZC5sO319KTsKICBjb25zdCBhZnRlcj1ncmFuZC1kaXNjOwogIGNvbnN0IGlzSD0oZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2MtaG9tZScpICYmIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjLWhvbWUnKS5jaGVja2VkKTsKICBjb25zdCBkZWw9aXNIPygrKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjLWNpdHknKSAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYy1jaXR5JykudmFsdWUpfHwwKTowOwogIGNvbnN0IGZpbmFsPU1hdGgubWF4KGFmdGVyLGFmdGVyPjA/TUlOOjApK2RlbDsKICBjb25zdCByZT1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYy10b3RhbC1yb3dzJyk7CiAgcmUuaW5uZXJIVE1MPXJvd3MubWFwKHI9PmA8ZGl2IGNsYXNzPSJ0b3RhbC1yb3ciPjxzcGFuIGNsYXNzPSJ0ci1sYWJlbCI+JHtyLmx9PC9zcGFuPjxzcGFuIGNsYXNzPSJ0ci12YWwiPuKCqiR7TWF0aC5yb3VuZChyLnYpLnRvTG9jYWxlU3RyaW5nKCdoZS1JTCcpfTwvc3Bhbj48L2Rpdj5gKS5qb2luKCcnKQogICAgKyhkaXNjP2A8ZGl2IGNsYXNzPSJ0b3RhbC1yb3cgZGlzYy1yb3ciPjxzcGFuIGNsYXNzPSJ0ci1sYWJlbCI+8J+OiSAke2Rpc2NMfTwvc3Bhbj48c3BhbiBjbGFzcz0idHItdmFsIj4t4oKqJHtkaXNjLnRvTG9jYWxlU3RyaW5nKCdoZS1JTCcpfTwvc3Bhbj48L2Rpdj5gOicnKQogICAgKyhkZWw/YDxkaXYgY2xhc3M9InRvdGFsLXJvdyBkZWwtcm93Ij48c3BhbiBjbGFzcz0idHItbGFiZWwiPvCfmpog157Xqdec15XXlzwvc3Bhbj48c3BhbiBjbGFzcz0idHItdmFsIj7igqoke2RlbH08L3NwYW4+PC9kaXY+YDonJyk7CiAgLy8gT25seSBzaG93IHRvdGFsIGlmIGF0IGxlYXN0IG9uZSBjYXJwZXQgaGFzIHJlYWwgZGltZW5zaW9ucyBlbnRlcmVkCiAgY29uc3QgYW55Q2xlYW5EaW1zID0gaWRzLnNvbWUoaWQgPT4gewogICAgY29uc3QgbD1wYXJzZUZsb2F0KChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgYy1sZW4tJHtpZH1gKSAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgYy1sZW4tJHtpZH1gKS52YWx1ZSkpfHwwOwogICAgY29uc3Qgdz1wYXJzZUZsb2F0KChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgYy13aWQtJHtpZH1gKSAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgYy13aWQtJHtpZH1gKS52YWx1ZSkpfHwwOwogICAgcmV0dXJuIGw+MCAmJiB3PjA7CiAgfSk7CiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2MtdG90YWwtYW1vdW50JykudGV4dENvbnRlbnQ9J+KCqicrTWF0aC5yb3VuZChmaW5hbCkudG9Mb2NhbGVTdHJpbmcoJ2hlLUlMJyk7CiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2MtdG90YWwtcGFuZWwnKS5zdHlsZS5kaXNwbGF5PWFueUNsZWFuRGltcz8nYmxvY2snOidub25lJzsKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYy1taW4nKS5jbGFzc0xpc3QudG9nZ2xlKCd2aXNpYmxlJywgYW55Q2xlYW5EaW1zICYmIGFmdGVyPjAgJiYgYWZ0ZXI8TUlOKTsKfQoKLy8gR2V0IHNlbGVjdGVkIHNpZGVzIHRvdGFsIGxlbmd0aCAobSkgZm9yIGEgc2VydmljZQpmdW5jdGlvbiBnZXRTaWRlc01ldGVycyhjYXJkSWQsIHN2Y0lkLCBiaWxsaW5nLCBsLCB3KXsKICBpZihiaWxsaW5nPT09J3NxbSd8fGJpbGxpbmc9PT0nZml4ZWQnKSByZXR1cm4gMDsgLy8gbm90IHVzZWQgZm9yIHRoZXNlCiAgY29uc3QgbE09bC8xMDAsIHdNPXcvMTAwOwogIC8vIHNpZGVzOiBMMT1sb25nMSwgTDI9bG9uZzIsIFMxPXNob3J0MSwgUzI9c2hvcnQyCiAgLy8gbG9uZyBzaWRlcyBoYXZlIGxlbmd0aCA9IG1heChsLHcpLCBzaG9ydCA9IG1pbihsLHcpCiAgY29uc3QgbG9uZ00gPSBNYXRoLm1heChsTSx3TSksIHNob3J0TSA9IE1hdGgubWluKGxNLHdNKTsKICBjb25zdCBzaWRlTWFwID0gKGJpbGxpbmc9PT0nc2lkZXMybG9uZycpCiAgICA/IFt7a2V5OidBJyxtOmxvbmdNfSx7a2V5OidCJyxtOmxvbmdNfV0KICAgIDogW3trZXk6J0EnLG06bG9uZ019LHtrZXk6J0InLG06bG9uZ019LHtrZXk6J0MnLG06c2hvcnRNfSx7a2V5OidEJyxtOnNob3J0TX1dOwogIGxldCB0b3RhbD0wOwogIHNpZGVNYXAuZm9yRWFjaChzPT57CiAgICBjb25zdCBidG49ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHNiLSR7Y2FyZElkfS0ke3N2Y0lkfS0ke3Mua2V5fWApOwogICAgaWYoYnRuJiZidG4uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkgdG90YWwrPXMubTsKICB9KTsKICByZXR1cm4gdG90YWw7Cn0KCmZ1bmN0aW9uIHRvZ2dsZVNpZGVTZWxlY3RvcihjYXJkSWQsIHN2Y0lkLCBiaWxsaW5nKXsKICBjb25zdCBjYj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcnMke2NhcmRJZH0tJHtzdmNJZH1gKTsKICBjb25zdCBzcz1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChgc3Mke2NhcmRJZH0tJHtzdmNJZH1gKTsKICBpZighc3MpcmV0dXJuOwogIGlmKCFjYi5jaGVja2VkKXsgc3MuY2xhc3NMaXN0LnJlbW92ZSgndmlzaWJsZScpOyByZXR1cm47IH0KICBpZihiaWxsaW5nPT09J3NxbSd8fGJpbGxpbmc9PT0nZml4ZWQnKXsgc3MuY2xhc3NMaXN0LnJlbW92ZSgndmlzaWJsZScpOyByZXR1cm47IH0KICAvLyBzaWRlczJsb25nIHRyZWF0ZWQgbGlrZSBzaWRlczQgZm9yIGRpc3BsYXkKICBzcy5jbGFzc0xpc3QuYWRkKCd2aXNpYmxlJyk7CiAgLy8gYnVpbGQgYnV0dG9ucyBmb3IgdGhpcyBzcGVjaWZpYyBzZXJ2aWNlIGltbWVkaWF0ZWx5CiAgYnVpbGRTaWRlQnV0dG9ucyhjYXJkSWQsIHN2Y0lkLCBiaWxsaW5nKTsKICBjYWxjUmVwYWlyKCk7Cn0KCmZ1bmN0aW9uIGJ1aWxkU2lkZUJ1dHRvbnMoY2FyZElkLCBzdmNJZCwgYmlsbGluZyl7CiAgY29uc3QgbD1wYXJzZUZsb2F0KChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgci1sZW4tJHtjYXJkSWR9YCkgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHItbGVuLSR7Y2FyZElkfWApLnZhbHVlKSl8fDA7CiAgY29uc3Qgdz1wYXJzZUZsb2F0KChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgci13aWQtJHtjYXJkSWR9YCkgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHItd2lkLSR7Y2FyZElkfWApLnZhbHVlKSl8fDA7CiAgY29uc3QgbG9uZ0NtPU1hdGgubWF4KGwsdyksIHNob3J0Q209TWF0aC5taW4obCx3KTsKICBjb25zdCBsb25nTT0obG9uZ0NtLzEwMCkudG9GaXhlZCgyKSwgc2hvcnRNPShzaG9ydENtLzEwMCkudG9GaXhlZCgyKTsKICBjb25zdCBzZz1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChgc2cke2NhcmRJZH0tJHtzdmNJZH1gKTsKICBpZighc2cpIHJldHVybjsKICAvLyBzaWRlczJsb25nID0gb25seSAyIGxvbmcgc2lkZXMKICBjb25zdCBzaWRlcyA9IGJpbGxpbmc9PT0nc2lkZXMybG9uZycKICAgID8gW3trZXk6J0EnLGxhYmVsOifXptec16Ig15DXqNeV15vXlCAxJyxtOmxvbmdNfSx7a2V5OidCJyxsYWJlbDon16bXnNeiINeQ16jXldeb15QgMicsbTpsb25nTX1dCiAgICA6IFt7a2V5OidBJyxsYWJlbDon16bXnNeiINeQ16jXldeb15QgMScsbTpsb25nTX0se2tleTonQicsbGFiZWw6J9em15zXoiDXkNeo15XXm9eUIDInLG06bG9uZ019LAogICAgICAge2tleTonQycsbGFiZWw6J9em15zXoiDXp9em16jXlCAxJyxtOnNob3J0TX0se2tleTonRCcsbGFiZWw6J9em15zXoiDXp9em16jXlCAyJyxtOnNob3J0TX1dOwogIC8vIHVwZGF0ZSBncmlkIGNsYXNzCiAgc2cuY2xhc3NOYW1lID0gJ3NpZGVzLWdyaWQgJyArIChiaWxsaW5nPT09J3NpZGVzMmxvbmcnID8gJ3R3bycgOiAnZm91cicpOwogIC8vIHByZXNlcnZlIGV4aXN0aW5nIGFjdGl2ZSBzdGF0ZQogIGNvbnN0IGFjdGl2ZT17fTsKICBzaWRlcy5mb3JFYWNoKHNkPT57IGNvbnN0IGI9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHNiLSR7Y2FyZElkfS0ke3N2Y0lkfS0ke3NkLmtleX1gKTsgYWN0aXZlW3NkLmtleV09Yj9iLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJyk6bnVsbDsgfSk7CiAgY29uc3Qgbm9uZUNob3Nlbj1PYmplY3QudmFsdWVzKGFjdGl2ZSkuZXZlcnkodj0+dj09PW51bGx8fHY9PT1mYWxzZSk7CiAgc2cuaW5uZXJIVE1MPXNpZGVzLm1hcChzZD0+ewogICAgY29uc3QgaXNBY3RpdmUgPSBub25lQ2hvc2VuID8gKHNkLmtleT09PSdBJ3x8c2Qua2V5PT09J0InKSA6IChhY3RpdmVbc2Qua2V5XXx8ZmFsc2UpOwogICAgcmV0dXJuIGA8ZGl2IGNsYXNzPSJzaWRlLWJ0biR7aXNBY3RpdmU/JyBhY3RpdmUnOicnfSIgaWQ9InNiLSR7Y2FyZElkfS0ke3N2Y0lkfS0ke3NkLmtleX0iCiAgICAgIG9uY2xpY2s9InRvZ2dsZVNpZGUoJyR7Y2FyZElkfScsJyR7c3ZjSWR9JywnJHtzZC5rZXl9JykiPiR7c2QubGFiZWx9PHNwYW4gY2xhc3M9InNiLWxlbiI+JHtzZC5tfSDXnlx1MDVGMzwvc3Bhbj48L2Rpdj5gOwogIH0pLmpvaW4oJycpOwogIGNvbnN0IHNzPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBzcyR7Y2FyZElkfS0ke3N2Y0lkfWApOwogIGNvbnN0IHBwbT1wYXJzZUZsb2F0KChzcyAmJiBzcy5kYXRhc2V0ICYmIHNzLmRhdGFzZXQucHBtKXx8MCk7CiAgdXBkYXRlU2lkZU5vdGUoY2FyZElkLCBzdmNJZCwgYmlsbGluZywgcHBtKTsKfQoKZnVuY3Rpb24gcmVmcmVzaFNpZGVMYWJlbHMoY2FyZElkKXsKICAvLyByZWJ1aWxkIGFsbCB2aXNpYmxlIHNpZGUtc2VsZWN0b3JzIGZvciB0aGlzIGNhcmQgdXNpbmcgYnVpbGRTaWRlQnV0dG9ucwogIFJfQ0FUUy5mb3JFYWNoKGNhdD0+ewogICAgY29uc3QgY2F0QmlsbGluZz1jYXQuYmlsbGluZ3x8J3NxbSc7CiAgICBjYXQuc3Zjcy5mb3JFYWNoKHM9PnsKICAgICAgY29uc3Qgc0JpbGxpbmc9cy5iaWxsaW5nfHxjYXRCaWxsaW5nOwogICAgICBpZihzQmlsbGluZz09PSdzcW0nfHxzQmlsbGluZz09PSdmaXhlZCcpIHJldHVybjsKICAgICAgLy8gc2lkZXMybG9uZywgc2lkZXM0IGFsbCBoYW5kbGVkIGJ5IGJ1aWxkU2lkZUJ1dHRvbnMKICAgICAgY29uc3Qgc3M9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHNzJHtjYXJkSWR9LSR7cy5pZH1gKTsKICAgICAgaWYoIXNzfHwhc3MuY2xhc3NMaXN0LmNvbnRhaW5zKCd2aXNpYmxlJykpIHJldHVybjsKICAgICAgYnVpbGRTaWRlQnV0dG9ucyhjYXJkSWQsIHMuaWQsIHNCaWxsaW5nKTsKICAgIH0pOwogIH0pOwogIGNhbGNSZXBhaXIoKTsKfQoKZnVuY3Rpb24gdG9nZ2xlU2lkZShjYXJkSWQsIHN2Y0lkLCBrZXkpewogIGNvbnN0IGJ0bj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChgc2ItJHtjYXJkSWR9LSR7c3ZjSWR9LSR7a2V5fWApOwogIGlmKGJ0bikgYnRuLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpOwogIGNvbnN0IHNzPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBzcyR7Y2FyZElkfS0ke3N2Y0lkfWApOwogIGNvbnN0IGJpbGxpbmc9KHNzICYmIHNzLmRhdGFzZXQgJiYgc3MuZGF0YXNldC5iaWxsaW5nKXx8J3NxbSc7CiAgY29uc3QgcHBtPXBhcnNlRmxvYXQoKHNzICYmIHNzLmRhdGFzZXQgJiYgc3MuZGF0YXNldC5wcG0pfHwwKTsKICB1cGRhdGVTaWRlTm90ZShjYXJkSWQsIHN2Y0lkLCBiaWxsaW5nLCBwcG0pOwogIGNhbGNSZXBhaXIoKTsKfQoKZnVuY3Rpb24gdXBkYXRlU2lkZU5vdGUoY2FyZElkLCBzdmNJZCwgYmlsbGluZywgcHBtKXsKICBjb25zdCBsPXBhcnNlRmxvYXQoKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGByLWxlbi0ke2NhcmRJZH1gKSAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgci1sZW4tJHtjYXJkSWR9YCkudmFsdWUpKXx8MDsKICBjb25zdCB3PXBhcnNlRmxvYXQoKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGByLXdpZC0ke2NhcmRJZH1gKSAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgci13aWQtJHtjYXJkSWR9YCkudmFsdWUpKXx8MDsKICBjb25zdCBtZXRlcnM9Z2V0U2lkZXNNZXRlcnMoY2FyZElkLCBzdmNJZCwgYmlsbGluZywgbCwgdyk7CiAgY29uc3QgY29zdD1NYXRoLnJvdW5kKG1ldGVycypwcG0pOwogIGNvbnN0IG5vdGVFbD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChgc24ke2NhcmRJZH0tJHtzdmNJZH1gKTsKICBjb25zdCB0b3RhbEVsPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBzcy10b3RhbCR7Y2FyZElkfS0ke3N2Y0lkfWApOwogIGlmKG1ldGVycz4wKXsKICAgIGlmKG5vdGVFbCkgbm90ZUVsLnRleHRDb250ZW50PWDXodeUXHUwNUY015s6ICR7bWV0ZXJzLnRvRml4ZWQoMil9INeeXHUwNUYzIMOXIOKCqiR7cHBtfSA9IOKCqiR7Y29zdC50b0xvY2FsZVN0cmluZygnaGUtSUwnKX1gOwogICAgaWYodG90YWxFbCkgdG90YWxFbC50ZXh0Q29udGVudD1g4oKqJHtjb3N0LnRvTG9jYWxlU3RyaW5nKCdoZS1JTCcpfWA7CiAgfSBlbHNlIHsKICAgIGlmKG5vdGVFbCkgbm90ZUVsLnRleHRDb250ZW50PScnOwogICAgaWYodG90YWxFbCkgdG90YWxFbC50ZXh0Q29udGVudD0nJzsKICB9Cn0KCmZ1bmN0aW9uIGNhbGNSZXBhaXIoKXsKICBjb25zdCBpZHM9Wy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tpZF49InItY2FyZC0iXScpXS5tYXAoZT0+K2UuaWQucmVwbGFjZSgnci1jYXJkLScsJycpKTsKICBsZXQgZ3JhbmQ9MDtjb25zdCByb3dzPVtdOwogIGlkcy5mb3JFYWNoKGlkPT57CiAgICBjb25zdCBsPXBhcnNlRmxvYXQoKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGByLWxlbi0ke2lkfWApICYmIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGByLWxlbi0ke2lkfWApLnZhbHVlKSl8fDA7CiAgICBjb25zdCB3PXBhcnNlRmxvYXQoKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGByLXdpZC0ke2lkfWApICYmIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGByLXdpZC0ke2lkfWApLnZhbHVlKSl8fDA7CiAgICBjb25zdCBzcW1SZWFsPShsKncpLzEwMDAwOwogICAgY29uc3QgbEJpbGw9TWF0aC5tYXgobCxNSU5fU0lERSksIHdCaWxsPU1hdGgubWF4KHcsTUlOX1NJREUpOwogICAgY29uc3Qgc3FtPShsQmlsbCp3QmlsbCkvMTAwMDA7CiAgICBsZXQgc3ViPTA7CiAgICBSX0NBVFMuZm9yRWFjaChjYXQ9PnsKICAgICAgY29uc3QgY2F0QmlsbGluZz1jYXQuYmlsbGluZ3x8J3NxbSc7CiAgICAgIGNhdC5zdmNzLmZvckVhY2gocz0+ewogICAgICAgIGNvbnN0IGJpbGxpbmc9cy5iaWxsaW5nfHxjYXRCaWxsaW5nOwogICAgICAgIGNvbnN0IGNiPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBycyR7aWR9LSR7cy5pZH1gKTsKICAgICAgICBpZighY2J8fCFjYi5jaGVja2VkKSByZXR1cm47CiAgICAgICAgaWYocy5maXhlZCl7IHN1Yis9cy5mcDsgcmV0dXJuOyB9CiAgICAgICAgaWYoYmlsbGluZz09PSdzcW0nKXsgc3ViKz1zcW0qcy5wcG07IHJldHVybjsgfQogICAgICAgIC8vIHNpZGVzIGJpbGxpbmcg4oCUIHN1bSBzZWxlY3RlZCBzaWRlcwogICAgICAgIGNvbnN0IG1ldGVycz1nZXRTaWRlc01ldGVycyhpZCwgcy5pZCwgYmlsbGluZywgbCwgdyk7CiAgICAgICAgc3ViKz1tZXRlcnMqcy5wcG07CiAgICAgIH0pOwogICAgfSk7CiAgICBjb25zdCBzZT1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChgci1zdWItJHtpZH1gKTsKICAgIGlmKHNlKSBzZS50ZXh0Q29udGVudCA9IChzcW1SZWFsPjApID8gJ+KCqicrTWF0aC5yb3VuZChzdWIpLnRvTG9jYWxlU3RyaW5nKCdoZS1JTCcpIDogJyc7CiAgICBjb25zdCBzdWJDYXJkUj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChgci1zdWJ0b3RhbC1jYXJkLSR7aWR9YCk7CiAgICBpZihzdWJDYXJkUikgc3ViQ2FyZFIuc3R5bGUuZGlzcGxheSA9IHNxbVJlYWw+MCA/ICdmbGV4JyA6ICdub25lJzsKICAgIGlmKHN1Yj4wKXJvd3MucHVzaCh7bDpg16nXmNeZ15cg157XoVx1MDVGMyAke2lkfSAoJHtzcW1SZWFsLnRvRml4ZWQoMil9INeeXHUwNUY016gpYCx2OnN1Yn0pOwogICAgZ3JhbmQrPXN1YjsKICB9KTsKICBjb25zdCBpc0g9KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyLWhvbWUnKSAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnci1ob21lJykuY2hlY2tlZCk7CiAgY29uc3QgZGVsPWlzSD8oKyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnci1jaXR5JykgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ItY2l0eScpLnZhbHVlKXx8MCk6MDsKICBjb25zdCByZT1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnci10b3RhbC1yb3dzJyk7CiAgcmUuaW5uZXJIVE1MPXJvd3MubWFwKHI9PmA8ZGl2IGNsYXNzPSJ0b3RhbC1yb3ciPjxzcGFuIGNsYXNzPSJ0ci1sYWJlbCI+JHtyLmx9PC9zcGFuPjxzcGFuIGNsYXNzPSJ0ci12YWwiPuKCqiR7TWF0aC5yb3VuZChyLnYpLnRvTG9jYWxlU3RyaW5nKCdoZS1JTCcpfTwvc3Bhbj48L2Rpdj5gKS5qb2luKCcnKQogICAgKyhkZWw/YDxkaXYgY2xhc3M9InRvdGFsLXJvdyBkZWwtcm93Ij48c3BhbiBjbGFzcz0idHItbGFiZWwiPvCfmpog157Xqdec15XXlzwvc3Bhbj48c3BhbiBjbGFzcz0idHItdmFsIj7igqoke2RlbH08L3NwYW4+PC9kaXY+YDonJyk7CiAgY29uc3QgYW55UmVwYWlyRGltcyA9IGlkcy5zb21lKGlkID0+IHsKICAgIGNvbnN0IGw9cGFyc2VGbG9hdCgoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHItbGVuLSR7aWR9YCkgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHItbGVuLSR7aWR9YCkudmFsdWUpKXx8MDsKICAgIGNvbnN0IHc9cGFyc2VGbG9hdCgoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHItd2lkLSR7aWR9YCkgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHItd2lkLSR7aWR9YCkudmFsdWUpKXx8MDsKICAgIHJldHVybiBsPjAgJiYgdz4wOwogIH0pOwogIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyLXRvdGFsLWFtb3VudCcpLnRleHRDb250ZW50PSfigqonK01hdGgucm91bmQoZ3JhbmQrZGVsKS50b0xvY2FsZVN0cmluZygnaGUtSUwnKTsKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnci10b3RhbC1wYW5lbCcpLnN0eWxlLmRpc3BsYXk9YW55UmVwYWlyRGltcz8nYmxvY2snOidub25lJzsKfQoKZnVuY3Rpb24gdXBkYXRlRGVsaXZlcnkocCl7CiAgY29uc3QgaXNIPShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtwfS1ob21lYCkgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cH0taG9tZWApLmNoZWNrZWQpOwogIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3B9LWJyYW5jaC1yb3dgKS5jbGFzc0xpc3QudG9nZ2xlKCd2aXNpYmxlJywhaXNIKTsKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtwfS1jaXR5LXJvd2ApLmNsYXNzTGlzdC50b2dnbGUoJ3Zpc2libGUnLGlzSCk7CiAgcD09PSdjJz9jYWxjQ2xlYW5pbmcoKTpjYWxjUmVwYWlyKCk7Cn0KCmZ1bmN0aW9uIHNob3dCcmFuY2gocCl7CiAgY29uc3Qgdj0oZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cH0tYnJhbmNoYCkgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cH0tYnJhbmNoYCkudmFsdWUpOwogIGNvbnN0IGRldD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtwfS1icmFuY2gtZGV0YWlsYCk7CiAgaWYoIWRldClyZXR1cm47CiAgaWYodiYmQlJBTkNIRVNbdl0pe2NvbnN0IGI9QlJBTkNIRVNbdl07ZGV0LmlubmVySFRNTD1gPHN0cm9uZz7wn5ONICR7Yi5hZGRyfTwvc3Ryb25nPvCfk54gJHtiLnBob25lfSAmbmJzcDt8Jm5ic3A7IPCflZAgJHtiLmhvdXJzfWA7ZGV0LmNsYXNzTGlzdC5hZGQoJ3Zpc2libGUnKTt9CiAgZWxzZSBkZXQuY2xhc3NMaXN0LnJlbW92ZSgndmlzaWJsZScpOwp9CgpmdW5jdGlvbiBzZW5kV0EocCl7CiAgY29uc3QgaXNDPXA9PT0nYyc7CiAgY29uc3QgdG90YWw9KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlzQz8nYy10b3RhbC1hbW91bnQnOidyLXRvdGFsLWFtb3VudCcpICYmIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlzQz8nYy10b3RhbC1hbW91bnQnOidyLXRvdGFsLWFtb3VudCcpLnRleHRDb250ZW50KXx8J+KAlCc7CiAgY29uc3QgaWRzPVsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbaWRePSIke3B9LWNhcmQtIl1gKV0ubWFwKGU9PitlLmlkLnJlcGxhY2UoYCR7cH0tY2FyZC1gLCcnKSk7CiAgY29uc3QgbGluZXM9aWRzLm1hcChpZD0+ewogICAgY29uc3QgbD0oZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cH0tbGVuLSR7aWR9YCkgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cH0tbGVuLSR7aWR9YCkudmFsdWUpfHwnPyc7CiAgICBjb25zdCB3PShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtwfS13aWQtJHtpZH1gKSAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtwfS13aWQtJHtpZH1gKS52YWx1ZSl8fCc/JzsKICAgIHJldHVybiBg4oCiINep15jXmdeXICR7aWR9OiAke2x9w5cke3d9INehXHUwNUY0155gOwogIH0pOwogIGNvbnN0IG1zZz1g16nXnNeV150hINeQ16DXmSDXntei15XXoNeZ15nXny/XqiDXkdep15nXqNeV16ogJHtpc0M/J9eg15nXp9eV15knOifXqteZ16fXldefJ30g16nXmNeZ15fXmdedLlxuXG4ke2xpbmVzLmpvaW4oJ1xuJyl9XG5cbteh15RcdTA1RjTXmyDXkNeV157Xk9efOiAke3RvdGFsfVxuXG7XkNeg15Ag16bXqNeVINeQ15nXqteZINen16nXqC4g16rXldeT15QhYDsKICB3aW5kb3cub3BlbignaHR0cHM6Ly93YS5tZS85NzIxODAwNzAwMDgwP3RleHQ9JytlbmNvZGVVUklDb21wb25lbnQobXNnKSwnX2JsYW5rJyk7Cn0KCmZ1bmN0aW9uIGRvUHJpbnQoKXsKICBidWlsZFByaW50SW52b2ljZSgpOwogIHZhciBpbnYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJpbnQtaW52b2ljZScpOwogIGlmKCFpbnYpIHJldHVybjsKICBpbnYuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7CiAgc2V0VGltZW91dChmdW5jdGlvbigpewogICAgd2luZG93LnByaW50KCk7CiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7IGludi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyB9LCAxNTAwKTsKICB9LCA0MDApOwp9CgpmdW5jdGlvbiBidWlsZFByaW50SW52b2ljZSgpewogIHZhciB0b2RheSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCdoZS1JTCcpOwogIHZhciBkYXRlRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGktZGF0ZScpOwogIGlmKGRhdGVFbCkgZGF0ZUVsLnRleHRDb250ZW50ID0gdG9kYXk7CgogIHZhciBpc0NsZWFuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsZWFuaW5nJykuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKTsKICB2YXIgdGl0bGVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwaS10aXRsZScpOwogIGlmKHRpdGxlRWwpIHRpdGxlRWwudGV4dENvbnRlbnQgPSBpc0NsZWFuID8gCiAgICAn15TXptei16og157Xl9eZ16ggLSDXoNeZ16fXldeZINep15jXmdeX15nXnScgOiAKICAgICfXlNem16LXqiDXnteX15nXqCAtINeq15nXp9eV158g16nXmNeZ15fXmdedJzsKCiAgdmFyIHRib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BpLWl0ZW1zJyk7CiAgaWYoIXRib2R5KSByZXR1cm47CiAgdGJvZHkuaW5uZXJIVE1MID0gJyc7CiAgdmFyIGdyYW5kVG90YWwgPSAwOwogIHZhciByb3dOdW0gPSAxOwoKICBmdW5jdGlvbiB0ZChjb250ZW50LCBhbGlnbikgewogICAgdmFyIHMgPSBhbGlnbiA/ICd0ZXh0LWFsaWduOicgKyBhbGlnbiArICc7JyA6ICcnOwogICAgcmV0dXJuICc8dGQgc3R5bGU9InBhZGRpbmc6NnB4IDhweDsnICsgcyArICciPicgKyBjb250ZW50ICsgJzwvdGQ+JzsKICB9CiAgZnVuY3Rpb24gYWRkUm93KG4sIGRlc2MsIHF0eSwgdW5pdCwgYW10LCBjb2xvcikgewogICAgdmFyIGJnID0gY29sb3IgPyAnYmFja2dyb3VuZDonICsgY29sb3IgKyAnOycgOiAnJzsKICAgIHZhciBzaGVrZWwgPSAn4oKqJzsKICAgIHRib2R5LmlubmVySFRNTCArPSAnPHRyIHN0eWxlPSJib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZWVlOycgKyBiZyArICciPicgKwogICAgICB0ZChuKSArIHRkKGRlc2MpICsgdGQocXR5LCAnY2VudGVyJykgKyB0ZCh1bml0LCAnY2VudGVyJykgKwogICAgICB0ZChzaGVrZWwgKyBOdW1iZXIoYW10KS50b0xvY2FsZVN0cmluZygnaGUtSUwnKSwgJ2xlZnQnKSArICc8L3RyPic7CiAgfQoKICB2YXIgY1ByZWZpeCA9ICdjJzsKICB2YXIgclByZWZpeCA9ICdyJzsKCiAgaWYoaXNDbGVhbikgewogICAgdmFyIGNDYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tpZF49ImMtY2FyZC0iXScpOwogICAgZm9yKHZhciBjaSA9IDA7IGNpIDwgY0NhcmRzLmxlbmd0aDsgY2krKykgewogICAgICB2YXIgY2lkID0gY0NhcmRzW2NpXS5pZC5yZXBsYWNlKCdjLWNhcmQtJywgJycpOwogICAgICB2YXIgbEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2MtbGVuLScgKyBjaWQpOwogICAgICB2YXIgd0VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Mtd2lkLScgKyBjaWQpOwogICAgICB2YXIgbCA9IGxFbCA/IChwYXJzZUZsb2F0KGxFbC52YWx1ZSkgfHwgMCkgOiAwOwogICAgICB2YXIgdyA9IHdFbCA/IChwYXJzZUZsb2F0KHdFbC52YWx1ZSkgfHwgMCkgOiAwOwogICAgICBpZighbCB8fCAhdykgY29udGludWU7CiAgICAgIHZhciBzcW0gPSAoTWF0aC5tYXgobCwgTUlOX1NJREUpICogTWF0aC5tYXgodywgTUlOX1NJREUpKSAvIDEwMDAwOwogICAgICB2YXIgc3FtUmVhbCA9ICgobCAqIHcpIC8gMTAwMDApLnRvRml4ZWQoMik7CiAgICAgIHZhciB0cEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT0iY3QtJyArIGNpZCArICciXTpjaGVja2VkJyk7CiAgICAgIHZhciB0UHJpY2UgPSB0cEVsID8gK3RwRWwudmFsdWUgOiA5NTsKICAgICAgdmFyIHROYW1lRWwgPSB0cEVsID8gdHBFbC5jbG9zZXN0KCcudHlwZS1vcHQnKSA6IG51bGw7CiAgICAgIHZhciB0TmFtZSA9IHROYW1lRWwgPyAodE5hbWVFbC5xdWVyeVNlbGVjdG9yKCcudHlwZS1uYW1lJykudGV4dENvbnRlbnQpIDogJ9ei15HXldeT16og157Xm9eV16DXlCc7CiAgICAgIHZhciBiYXNlID0gTWF0aC5yb3VuZChzcW0gKiB0UHJpY2UpOwogICAgICBncmFuZFRvdGFsICs9IGJhc2U7CiAgICAgIGFkZFJvdyhyb3dOdW0rKywKICAgICAgICAn16DXmden15XXmSAtICcgKyB0TmFtZSArICcgKCcgKyBzcW1SZWFsICsgJyDXnte016gpJywKICAgICAgICBzcW0udG9GaXhlZCgyKSArICcg157XtNeoJywKICAgICAgICAn4oKqJyArIHRQcmljZSArICcv157XtNeoJywKICAgICAgICBiYXNlKTsKICAgICAgZm9yKHZhciBzaSA9IDA7IHNpIDwgQ19TVkNTLmxlbmd0aDsgc2krKykgewogICAgICAgIHZhciBzID0gQ19TVkNTW3NpXTsKICAgICAgICB2YXIgY2IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3MnICsgY2lkICsgJy0nICsgcy5pZCk7CiAgICAgICAgaWYoIWNiIHx8ICFjYi5jaGVja2VkKSBjb250aW51ZTsKICAgICAgICB2YXIgYSA9IHMuZml4ZWQgPyBzLmZwIDogTWF0aC5yb3VuZChzcW0gKiBzLnBwbSk7CiAgICAgICAgZ3JhbmRUb3RhbCArPSBhOwogICAgICAgIGFkZFJvdyhyb3dOdW0rKywgcy5uYW1lLAogICAgICAgICAgcy5maXhlZCA/ICcxJyA6IHNxbS50b0ZpeGVkKDIpICsgJyDXnte016gnLAogICAgICAgICAgcy5maXhlZCA/ICfigqonICsgcy5mcCA6ICfigqonICsgcy5wcG0gKyAnL9ee17TXqCcsCiAgICAgICAgICBhLCAnI2ZhZmFmYScpOwogICAgICB9CiAgICB9CiAgICB2YXIgbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tpZF49ImMtY2FyZC0iXScpLmxlbmd0aDsKICAgIHZhciBkaXNjID0gbnVsbDsKICAgIGZvcih2YXIgZGkgPSBESVNDLmxlbmd0aCAtIDE7IGRpID49IDA7IGRpLS0pIHsKICAgICAgaWYobiA+PSBESVNDW2RpXS5uKSB7IGRpc2MgPSBESVNDW2RpXTsgYnJlYWs7IH0KICAgIH0KICAgIGlmKGRpc2MpIHsKICAgICAgdmFyIGRhID0gTWF0aC5yb3VuZChncmFuZFRvdGFsICogZGlzYy5wIC8gMTAwKTsKICAgICAgZ3JhbmRUb3RhbCAtPSBkYTsKICAgICAgdGJvZHkuaW5uZXJIVE1MICs9ICc8dHIgc3R5bGU9ImJvcmRlci1ib3R0b206MXB4IHNvbGlkICNlZWU7Y29sb3I6IzJkOGE1MCI+JyArCiAgICAgICAgdGQocm93TnVtKyspICsgdGQoZGlzYy5sKSArIHRkKCctJyArIGRpc2MucCArICclJywgJ2NlbnRlcicpICsgdGQoJycpICsKICAgICAgICB0ZCgnLeKCqicgKyBkYS50b0xvY2FsZVN0cmluZygnaGUtSUwnKSwgJ2xlZnQnKSArICc8L3RyPic7CiAgICB9CiAgICB2YXIgaG9tZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2MtaG9tZScpOwogICAgaWYoaG9tZUVsICYmIGhvbWVFbC5jaGVja2VkKSB7CiAgICAgIHZhciBjaXR5RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYy1jaXR5Jyk7CiAgICAgIHZhciBkYTIgPSBjaXR5RWwgPyAoK2NpdHlFbC52YWx1ZSB8fCAwKSA6IDA7CiAgICAgIGlmKGRhMiA+IDApIHsKICAgICAgICB2YXIgY24gPSBjaXR5RWwub3B0aW9uc1tjaXR5RWwuc2VsZWN0ZWRJbmRleF0udGV4dDsKICAgICAgICBncmFuZFRvdGFsICs9IGRhMjsKICAgICAgICBhZGRSb3cocm93TnVtKyssICfXntep15zXldeXIC0gJyArIGNuLCAnMScsICfigqonICsgZGEyLCBkYTIpOwogICAgICB9CiAgICB9CiAgICBncmFuZFRvdGFsID0gTWF0aC5tYXgoZ3JhbmRUb3RhbCwgTUlOKTsKICB9IGVsc2UgewogICAgdmFyIHJDYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tpZF49InItY2FyZC0iXScpOwogICAgZm9yKHZhciByaSA9IDA7IHJpIDwgckNhcmRzLmxlbmd0aDsgcmkrKykgewogICAgICB2YXIgcmlkID0gckNhcmRzW3JpXS5pZC5yZXBsYWNlKCdyLWNhcmQtJywgJycpOwogICAgICB2YXIgcmxFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyLWxlbi0nICsgcmlkKTsKICAgICAgdmFyIHJ3RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnci13aWQtJyArIHJpZCk7CiAgICAgIHZhciBybCA9IHJsRWwgPyAocGFyc2VGbG9hdChybEVsLnZhbHVlKSB8fCAwKSA6IDA7CiAgICAgIHZhciBydyA9IHJ3RWwgPyAocGFyc2VGbG9hdChyd0VsLnZhbHVlKSB8fCAwKSA6IDA7CiAgICAgIGlmKCFybCB8fCAhcncpIGNvbnRpbnVlOwogICAgICB2YXIgcnNxbSA9IChNYXRoLm1heChybCwgTUlOX1NJREUpICogTWF0aC5tYXgocncsIE1JTl9TSURFKSkgLyAxMDAwMDsKICAgICAgdmFyIHJzcW1SZWFsID0gKChybCAqIHJ3KSAvIDEwMDAwKS50b0ZpeGVkKDIpOwogICAgICBmb3IodmFyIHJjaSA9IDA7IHJjaSA8IFJfQ0FUUy5sZW5ndGg7IHJjaSsrKSB7CiAgICAgICAgdmFyIGNhdCA9IFJfQ0FUU1tyY2ldOwogICAgICAgIHZhciBjYXRCaWxsaW5nID0gY2F0LmJpbGxpbmcgfHwgJ3NxbSc7CiAgICAgICAgZm9yKHZhciByc2kgPSAwOyByc2kgPCBjYXQuc3Zjcy5sZW5ndGg7IHJzaSsrKSB7CiAgICAgICAgICB2YXIgcnMgPSBjYXQuc3Zjc1tyc2ldOwogICAgICAgICAgdmFyIGJpbGxpbmcgPSBycy5iaWxsaW5nIHx8IGNhdEJpbGxpbmc7CiAgICAgICAgICB2YXIgcmNiID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JzJyArIHJpZCArICctJyArIHJzLmlkKTsKICAgICAgICAgIGlmKCFyY2IgfHwgIXJjYi5jaGVja2VkKSBjb250aW51ZTsKICAgICAgICAgIHZhciByYSA9IDA7IHZhciBycSA9ICcnOyB2YXIgcnUgPSAnJzsKICAgICAgICAgIGlmKHJzLmZpeGVkKSB7IHJhID0gcnMuZnA7IHJxID0gJzEnOyBydSA9ICfigqonICsgcnMuZnA7IH0KICAgICAgICAgIGVsc2UgaWYoYmlsbGluZyA9PT0gJ3NxbScpIHsgcmEgPSBNYXRoLnJvdW5kKHJzcW0gKiBycy5wcG0pOyBycSA9IHJzcW0udG9GaXhlZCgyKSArICcg157XtNeoJzsgcnUgPSAn4oKqJyArIHJzLnBwbSArICcv157XtNeoJzsgfQogICAgICAgICAgZWxzZSB7IHZhciBybSA9IGdldFNpZGVzTWV0ZXJzKHJpZCwgcnMuaWQsIGJpbGxpbmcsIHJsLCBydyk7IHJhID0gTWF0aC5yb3VuZChybSAqIHJzLnBwbSk7IHJxID0gcm0udG9GaXhlZCgyKSArICcg154nOyBydSA9ICfigqonICsgcnMucHBtICsgJy/Xnic7IH0KICAgICAgICAgIGdyYW5kVG90YWwgKz0gcmE7CiAgICAgICAgICBhZGRSb3cocm93TnVtKyssIHJzLm5hbWUgKyAnIC0g16nXmNeZ15cgJyArIHJpZCArICcgKCcgKyByc3FtUmVhbCArICcg157XtNeoKScsIHJxLCBydSwgcmEpOwogICAgICAgIH0KICAgICAgfQogICAgfQogICAgdmFyIHJob21lRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnci1ob21lJyk7CiAgICBpZihyaG9tZUVsICYmIHJob21lRWwuY2hlY2tlZCkgewogICAgICB2YXIgcmNpdHlFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyLWNpdHknKTsKICAgICAgdmFyIHJkYSA9IHJjaXR5RWwgPyAoK3JjaXR5RWwudmFsdWUgfHwgMCkgOiAwOwogICAgICBpZihyZGEgPiAwKSB7CiAgICAgICAgdmFyIHJjbiA9IHJjaXR5RWwub3B0aW9uc1tyY2l0eUVsLnNlbGVjdGVkSW5kZXhdLnRleHQ7CiAgICAgICAgZ3JhbmRUb3RhbCArPSByZGE7CiAgICAgICAgYWRkUm93KHJvd051bSsrLCAn157Xqdec15XXlyAtICcgKyByY24sICcxJywgJ+KCqicgKyByZGEsIHJkYSk7CiAgICAgIH0KICAgIH0KICB9CgogIHZhciBidiA9IE1hdGgucm91bmQoZ3JhbmRUb3RhbCAvIDEuMTgpOwogIHZhciB2dCA9IGdyYW5kVG90YWwgLSBidjsKICB2YXIgYnZFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwaS1iZWZvcmUtdmF0Jyk7CiAgdmFyIHZ0RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGktdmF0Jyk7CiAgdmFyIHRvdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BpLXRvdGFsJyk7CiAgdmFyIGZuRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGktZm9vdG5vdGUnKTsKICBpZihidkVsKSBidkVsLnRleHRDb250ZW50ID0gJ+KCqicgKyBidi50b0xvY2FsZVN0cmluZygnaGUtSUwnKTsKICBpZih2dEVsKSB2dEVsLnRleHRDb250ZW50ID0gJ+KCqicgKyB2dC50b0xvY2FsZVN0cmluZygnaGUtSUwnKTsKICBpZih0b3RFbCkgdG90RWwudGV4dENvbnRlbnQgPSAn4oKqJyArIGdyYW5kVG90YWwudG9Mb2NhbGVTdHJpbmcoJ2hlLUlMJykgKyAnINepIteXJzsKICBpZihmbkVsKSBmbkVsLnRleHRDb250ZW50ID0gJyogJyArICgoX0FETUlOICYmIF9BRE1JTi5nZW5lcmFsICYmIF9BRE1JTi5nZW5lcmFsLmZvb3Rub3RlKSB8fCAn15TXnteX15nXqCDXlNeZ16DXlSDXkNeV157Xk9efJyk7Cn0KCgovLyBJbml0CmFkZENhcnBldCgnYycpOyBhZGRDYXJwZXQoJ3InKTsKYXBwbHlWaXNpYmlsaXR5KCk7Cgo8L3NjcmlwdD4KPHNjcmlwdD4KZnVuY3Rpb24gc2Nyb2xsVG9DYWxjKCl7CiAgdmFyIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbGMtaW50cm8nKTsKICBpZighZWwpeyBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYWxjdWxhdG9yJyk7IH0KICBpZighZWwpIHJldHVybjsKICB2YXIgdG9wID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0IC0gNjA7CiAgdHJ5IHsKICAgIHdpbmRvdy5zY3JvbGxUbyh7dG9wOiB0b3AsIGJlaGF2aW9yOiAnc21vb3RoJ30pOwogIH0gY2F0Y2goZSkgewogICAgd2luZG93LnNjcm9sbFRvKDAsIHRvcCk7CiAgfQp9Cgp3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCl7CiAgc2V0VGltZW91dChzY3JvbGxUb0NhbGMsIDIwMDApOwp9KTsKdmFyIGlvPW5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihmdW5jdGlvbihlbnRyaWVzKXsKICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZSl7aWYoZS5pc0ludGVyc2VjdGluZyllLnRhcmdldC5jbGFzc0xpc3QuYWRkKCd2aXMnKTt9KTsKfSx7dGhyZXNob2xkOjAuMn0pOwpbJ2NpLWxhYmVsJywnY2ktdGl0bGUnLCdjaS1kZXNjJywnY2ktbGluZScsJ2NhbGMtcmV2ZWFsJ10uZm9yRWFjaChmdW5jdGlvbihpZCl7CiAgdmFyIGVsPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtpZihlbClpby5vYnNlcnZlKGVsKTsKfSk7Cjwvc2NyaXB0PgoKPCEtLSBQUklOVCBJTlZPSUNFIC0tPgo8ZGl2IGlkPSJwcmludC1pbnZvaWNlIiBzdHlsZT0iZGlzcGxheTpub25lO2RpcmVjdGlvbjpydGw7Zm9udC1mYW1pbHk6J0hlZWJvJyxzYW5zLXNlcmlmO3BhZGRpbmc6MjRweCAyOHB4O2NvbG9yOiMwMDA7YmFja2dyb3VuZDojZmZmO3Bvc2l0aW9uOmZpeGVkO3RvcDowO2xlZnQ6MDt3aWR0aDoxMDAlO3otaW5kZXg6OTk5OSI+CiAgPHRhYmxlIHdpZHRoPSIxMDAlIiBjZWxscGFkZGluZz0iMCIgY2VsbHNwYWNpbmc9IjAiIHN0eWxlPSJtYXJnaW4tYm90dG9tOjE2cHg7Ym9yZGVyLWJvdHRvbToycHggc29saWQgI2U4ODEyYTtwYWRkaW5nLWJvdHRvbToxNHB4Ij4KICAgIDx0cj4KICAgICAgPHRkIHN0eWxlPSJ2ZXJ0aWNhbC1hbGlnbjp0b3AiPgogICAgICAgIDxkaXYgc3R5bGU9ImZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjgwMCI+16nXkNek15XXqCDXqdeY15nXl9eZ150g15Au15suINeR16Ii1548L2Rpdj4KICAgICAgICA8ZGl2IHN0eWxlPSJmb250LXNpemU6MTFweDtjb2xvcjojNTU1O2xpbmUtaGVpZ2h0OjEuNzttYXJnaW4tdG9wOjRweCI+16HXoNeZ16M6INeQ15XXoNec15nXmdefINem157XqDxicj53d3cudHplbWVyLmNvLmlsPGJyPteY15zXpNeV1586IDAzLTk2MTIxOTE8YnI+16LXldeh16cg157Xldeo16nXlDogNTEzMjIwNDc1PC9kaXY+CiAgICAgIDwvdGQ+CiAgICAgIDx0ZCBzdHlsZT0idGV4dC1hbGlnbjpsZWZ0O3ZlcnRpY2FsLWFsaWduOnRvcDt3aWR0aDoxNjBweCI+CiAgICAgICAgPGltZyBzcmM9ImRhdGE6aW1hZ2Uvd2VicDtiYXNlNjQsVWtsR1JsQVJBQUJYUlVKUVZsQTRXQW9BQUFBUUFBQUFLd0VBaHdBQVFVeFFTTDhPQUFBQnQ4ZWdiU1JINS9DSGZlMExnSWpJNGUwZ2E1N21MckxKbkRmeUYzakR0dTJRWG12YjFyZ3pacExoa1pFZXRtM2J0bTNidG0zYnRtM2JIajNzTVRvNS80L1IzVlYxbmxXcGEvNk02TDlFU1pMcnR0a1NFd2gremE1STRBNmZBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUF6TEhiUlA5SGFmZHc1dzZUMVU0V2d5c2N4TlJybDB2OVlBamhuenQzckplSjlUKzVxcnFXWGdoSGxBazlNb1FRUWdqdHU3ZWFwQzVHYXo0ZndxdEorTTU0dkl4RjYrZ1F3dDNEeTB0ayt4QkN6OFNmZDJ4UkJ6Kys5dE5kR1V5VkFIRFdFSDdZSkxtcGxiczhmYlpnYVpuY0gwTG9tZWdzQWpkdE8rbFlQbnE4SjRBVTZYL1F3YnR1WkZwWHpURTlybll1S1pSSmVyQXpmL3phTFNZWWEwZXJQNVRoL3ZSNHhtTzYrWDdZTUttdk56TnNYVlRpKy95SlgyN2VkS3lzWDFaNk9OUDZlL0VWVmdiaFZST21NM1p4cHE5WFppb2ptTTRkVkd6aTk1dldHeis5aDM2VE5wdk5aclBaYkRhYnpXYXoyV3cybTgxbXM5bHNOcHZOWnJQWmJJN3FId0c5N0NONXhpZVA5ZmhPaDdCbmN2MVVzV3plN2F0M0QxMHpmYXdUaHhCQzRZbGZyMTQvOVNMUStLcmRicmZiN1hhNzNXNjMyKzEydTkxdXQ5dnRkcnZkYnJmYjdYYjc5NUhGUi9mbHU0NE4vc2djeHN2UzNFNno1RHM3TnJsMkNDSEVUVnl6OGJDaytpdUVFR3VrNklhMTNOMFpoS2xXc3RseUliL2RJRUVvL2I4cVlPMkJDUlByaVFTcGZuL1ora1BUNmR0NEUzOFYrMmZ4TzRvaHZoUG44UDBDbUplTUd4MUtNWE5mTDFxRjkvbDN5OVZyanFpT0NvMEtNMGFWbU1jV3kzdXR5RXdPS21wdWo1VGFNNFNRYU9Lbnk5WWRWazB0Y1VjRVk4empQRmRSMEV2SHk0aWt5SjFRM04zVmc5THBzUkJDejBTS1JlREN0WVpVVGd2ZkVNVjRTb1Mvand1VGZoT3hwWTc0TGNMZVc3T2t1cVlJSVlUaUU4V2VyNHZYSEZJbExYQlRKT09iRVhNeHJCZityeWpxczFIK1JtK2M3QmdvaE9JVHhlK1p5MWNhVUJITmZWTTg1S2pDMVc4YzY1ZXJGVU05TGRiZ3FXbjBhQWloaklrdkxseHBTUG1hNTVvVS90WXUzSC9HMGw0d1RnSFM5ZUlkUHB5aTk1NG9oQkJLbXZqcW5OVUhscXA1cjBoajdyeUNZUjBmaGR0OWVwRS9PV1dTUFdDWmVPMFdRaWh4NHZQVFZpeEZuUnRuenF4K01Qa1hPdEJKZ00vS0swVGZTMk55M3lRL1hlN0VSK2NzMXlpa3VQV2JXUzlKWjJ2TUpJV3kraVFOOFNlclpwSmVuY3JsRFpIRnhXUWhoRkQ2eE9WNVNsQk56M3Q2VWxPYkZzbnFoR1RJWjJlVWF6dW5jL25CVW9XVVFWK0dpclJ5cWZWYllsUG5GUG1OQ1prL1hLR2JkTDZVTmwrUDB0T1YwTTBScW9TcDF3cEU5VkdIT3QxazUyRWU1OGM0enJ6RG9lbGpybWFvcEtyMm1qcC9MdlV5dmp3UHBNUmNLZTZuNjFDYmRDV1ZWVGFuNTk1dnY1U014OFo5NXd0MXFEUHlrdm8waEJCQ0NDR0VFQ3BuOGFGL3I3ajNkYWozY3BJNnVkTFhqMFBqdEc4MVZiM29wc2c1QWFxMDV1a3BnQXUzL1BXb0RiT3IzMHBmdTBWZWs0YUtxc0pmNkg5clNWZXlYaUcycjlxN0p2VlNsaTR2NFVwWkwwZjNvRjlXVkJXTWI3SXNWNnQ5VVYxTkc2MWxqbnFySHJWQnBxMWhGMVQxV284RXgyYnpIL042RGVyVW5LUlcvK3pmcTZyV2trd3NjTkpiZGFlMzhuSWFlbG1vNkZLY2JHS3hFOTZxa3FwNHR6VnpZMXIzNjZyNSttTkNwSjA0OXYwYTA5cjVJWTEzYWNWOExRNnBKNVkrOGNPNjBybEZNdHJ3aHlyWk9oREttRmo4OUhkcVNXOFdTbWlpcTZ2ajZuWW9hMktwc3o0c1c1WGNIaWNwRnRCbVAxYkUwN2Y5VWViRUNxZDlWRGZhdEdBOEk2K3ZocWM1VWZLZzM3S25mMWtyT3J0d1BGdjhYZ0ZMMjBENUU0TlhQUGVMK3RBcnhjT1p2UHd1L2hLb3hzVEFGYzcvWkt6UlQ3OUdZazBka2MxV0pVKytEcjBURlZnRVZyOTc3TkNKRXo0WnliVkpUREpUM2xWMmRWMnR3U0xsS3RuaU1TZlhSSktkRVpmTURuK1ZkNjJ2ZE9VM011bFZRaE80Y29kM3owaTIxeUtqbWVydThyYXF5bW05cXV2N1hidDU1NHVrR3hQZEtlNHl1cFRyRFRXZzFJY3c0L2J3RG9pdGFEZU1UbWY2ZTh2UVpEV3JtK2JJQW40MGt2Q3NCUG5zbnY1YVRSMG9aYlcyZWpid2NaR01MNllJYU5aSEVsK25xMU8xZHMzenQwb3M1dVJKSXRvcjc0cmVwZXBVcDQzSUwvMWpPVGY0TjZNa2swOG4xS2dhMVcyRk91WFlZNVZUVXFWMFFMSnJMVFdoSkg5azFXSUdMNHBrZlN0WlRITStsZXFiNmxLajl5bHFjS2ZLUEt5SEpTbTcxYWIrTEd4dzRWamN0Uk1tTmZ1VmY4ZGErSHB3ZmVxdmtZVVBuMzZLeEQwdlpWUkwvaEM5OWRlcUNqdThKeEwzelhSQmJmUndpdE95UGtBbnhQS09USlBTT0x1OG5xaXRxbit0RTh1N2FZcU1KajdrbTFTLzYvTDZWTVNOK1d2Wkp6ZXpuUEpieW42OTlyWDlMNUc4cjhibXM5aVZhYnZRcTJwZVc3d1JEenhKVGpxNVhlenR5VTgzcHF4enJmRkNpbGpYaU1obTgyZExPRFM3dHI2MTFLTnBZajJyYURERGR1bDBzQ1c4bWpXdGhaSTl0NjhYaTJXS0k3OExvUnhkV2N1YTQrcDBxWTZacUVpSGZtNDdoTkR6U3YvbCt0VlVGeWROZGFQOExmZldFRUtKdXE1dU5mTEVmOUttZW1iZU52UlFDS0hjMTlTMXFza1AvejA3MU1SSE9JTjJlQzJFMG5WanJXcVQzbFJMcVBJbjJPK1RFRUlGWHRQVW9ucTd4aEwyZ3cyN2VTLzY3OVFvaVZJRVZxdlRqNlVQOWRUdWNRaWhLcThaNmxRbnBjLzByVzdlNWF1ajIrcFFHVHRvZVVYKzQ5VjVMVktqR3ZGMytrelg3Z2FldVRvNnJnYVZBZmxDK2t3ZjZnRyt2Q0tqdTFjWVVxYzZOWG1vUCs3ZkF6emVtQ3FNYmxxb1p2dUZWUk9IK3MwaDQyVVFIMXIrNk5LNTZyUm43NjdRa29iNjdZSERNdTBOS0xtMCsvT1VHZFh3dWRrckNVZDdEOHVMWS9NeVI3OGNNWW82MW9tcFV2MXF2MkVGOG5pM3ROSG5CMHhJblNyVFZKcFVQOTJuVVNpUFJidEdKVlRSdXd5aXJ0Vk1rZW9YK3haTzlmNHlSaTl1Zy9wVndzcnVzOTBieFFPWk92M29pWFdwZDUwWmlmamx6bkZQNnJtSlIvY3RSOTFyNHlqQWozYUxMZWYvbDlXYXBjaG1VZXBmVTBYZ2ZiQnp2L2hJOWtrM3VuaHVhbHZabkI4VmhmdHd0MzVKTXZrdXpjem9zMmVpeHBWZ3NYdHZ1LzdaYkE4K3RFTGhURktNZmo1bXFtelM2ZDQ1ZGZvYTF4WkZ3TjdNclNobUNTRzhzbk5tNVpyWmJ5UW9lTWZQQXowbWhIRExpcld0bVFxTXRzdDNmbEYzUjNUU0hJTUxoREpmaHNPQ2o4V2VYYVRaN2VzUFhVQXZiemVxZjIwcXg5ZDdPVkN2RjZsU1IvelZDN1ZNa1ZSdUsraXYrNFBZdWdqbXBobVY5YUI2MWlXWlNHOXNWc2o0bnIxVWY0d29BalZwUk1HN1RyRVFYK3ZGdWxJOWE4ZXMwUllGamIvZnkzVklNYXBUaWhhOEt4ZTBNRzhHMkZRMXJXbDdlOFJOaS9wZU93TjQvR0pZUXdvVndqY3VYampEdTN2SjdxM1JiOGt6OWtuWG9yWjVCc2RjQjArWmpYVjdGMjluMnl5YXl4NzV2cTZZSnd0cXF4MnpFU2ZLWUZ1NkdpcTBEQ2ZRQTltWVE4Y2s0QnlWWit6cUVKN2ZOR2ZoSEgxaFppYzB4UzR2ZGVNdVZEaVlMN0k5dGMrWUxSTnBZQWp2SGRUTXV2Y1hPT1hIN2w2a3NyOW9qVmFyMVdxMVdxMVdxOVZxdFZxdFZxdlZhclZhclZhcjFXcTFXcTNXWmY5aFp1WHdkanptbHhQbjdoa2ZyWmVOTWZ5dnJpMWhpOHgrWWJrYk82dG84V0JXeVJyOWZ2Ui9qMEorbC92MzVRdGtrWXk3NHhzaGhGMnFvL3hTcU5Gb05CcU5ScVBSYURRYWpVYWowV2cwR28xR285Rm9OQnFOUnFQeGIvR1U4ellCWjI3WE5DeXZ4TnF0SisrUEQ4NkVtZldrSDdhUFNPYTVIdEt2RHhsWnFFVHUrc1N6Rjg2Vkh2aDVHQUFBQUFBQUFBQUFBQUFBWU96cDVUN3J2VG12NlR5OGpZemJmRUFFNmV4ZG1PL3VPVFJtdTEzeXYzc2g2NE1adithdnpPYzhJOWZ4c08zWFIwK2RndlhLRUY3WnFoRFBqUm1sUzRmaW9heGFxTS9RWGIyNTN0cjdXRisyUkR6ck5QZG43TjU1MjIxR285R3BpVHA3eWFGVDlDblhJaG01TG9qWnVoR2UzbXF5Y2p4Y2wzR3cxS0U0b3d0aDlKV0xqK2c3Tk1kVlBWM24yeDJLeTNwVHZydWtLdXZ4SHVyZE1TaWpWbDZ2THhtT091aWRUcEpiZHZhUjBaMWN1eWhLZXpvdTZId3lmM1kycGgweVN2RHgrNWdmV09lZUVEcmI3ZjRacHhFbFdwaHN2dys3Ky9PUGVqMGNwVy80OWRtMTF6cWQvNy92emZYQVVpMzAyNnJUUWF5ZXNmNTJ0dzk5ejdjdTJ4dnJtQ3BzQStkbk5jMTlpSExhdEhrdi9MMDZoMXpqYmZ4d3R6cEhIMzNWeE1qOTNnb2h6RjRSRHd1ZDgyY0k3MEpmTmRGWjRaNTVwa0piKzk2Zi90dXQ5M0d2ZFRlcjBtcXkyMXdBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFEMGNWMGRBRlpRT0NCcUFnQUFNQjRBblFFcUxBR0lBRDZSUnB4SkphUWpJU3MvS0FDd0VnbGpidC93TDBDOEFmcUJBZ1B3QS9BRHlBUG9BNXdEOEFQd0F0Zi9LQXZ3RDhBTGtkMFQ1enFYL0x1RU02NCtYNUozL04yZ1AwQXhRSDhBL2dIN0FlLy9UZjQxSFlENnRhMXJWUlk4MkRvd0YrMkFVcUh1ZnhqMDUzUDR4NUxxTllCS1kzdDF4TVpBTHlKamdFNHpUSTV0UVlNZmdlaERDS3pvWGtUSEFKeG1tUnphdk41a3gvUWZ6ak5Nam0xZWNBbkdhWkhOb1huWEFJaVhzMHlPYlY1d0NjWnBrYzJydjA5NGdGcXc4WkhOcTg0Qk9NMHlPYlY1dlZ2T2k4ZnJGdkVEaDZhU2tGeWpxdS9yQys4a2VmQW5GeVM4NEJPTGlLcFZzdmNEU3RqK0FBRCsvUFJlZ3pHbW52dDQzdzA4YTE3MTlJdUE1YXRkN0EyTmoxbWZweHM3OVkzc3d4blczWmxTdXdqUXNoeERNYWFlKzNqZkRUeHJYdlgwaTRuN0s4bnFnNThIWVBRV3I0ZXpPWHpDaFhkait5VkpjVDFNR2NJcmpXV0lUblBRc0JtTk5QZmJ4dmhwNDFyM3I2UmNUOWxlVDFRYytFS2VNU01hcWt5SmZxWUhKUU4vVFljQmJTYkE4bkdjWXBXQkRxMnVLa1FUalA2ZUpZVmFFRzBIVENMUzlqQVYzbXc3bW85enNOTFRVZW9vdFl5b3kxM3pTRjdoMG15Z1dsTUIxNVpCMFBvMmdJdEhzZ2p0Y0MwTWlyVEpQWmZiNEd1VUFabXljRGlweVI3RTAyR3JIb0gvL2llbWlkTUZQb2RLREREcDNhcC9LMmFtOWQ1SlhtdHNqdkNDcmZabC9lSjdzKzRWRXFqYyt1T3dnZDZBMTFnMmY4cGYvL1F4VVFoaFpvcjlCVmNjdUtXYUM3R3RpVkhOU2hZNU9sWllmdTRvTnMvTExXZWRadjFQenNMRWZid2VSejQzWjdjSllaQTIzSXF0N21mSEhIVHFBRklhOWFVRitaZldoUjhlOU1YRzBxRXk2SjNOR29BQSIgc3R5bGU9ImhlaWdodDo1MHB4O3dpZHRoOmF1dG8iPgogICAgICAgIDxkaXYgc3R5bGU9ImZvbnQtc2l6ZToxMHB4O2NvbG9yOiM1NTU7bWFyZ2luLXRvcDo2cHg7dGV4dC1hbGlnbjpsZWZ0O2xpbmUtaGVpZ2h0OjEuNSI+16nXmNeZ15fXmdedINeZ16TXmdedPGJyPlNIQVBPT1IgY2FycGV0czxicj5TaW5jZSAxOTY5PC9kaXY+CiAgICAgIDwvdGQ+CiAgICA8L3RyPgogIDwvdGFibGU+CiAgPHRhYmxlIHdpZHRoPSIxMDAlIiBjZWxscGFkZGluZz0iMCIgY2VsbHNwYWNpbmc9IjAiIHN0eWxlPSJtYXJnaW4tYm90dG9tOjE2cHgiPgogICAgPHRyPgogICAgICA8dGQ+PGRpdiBpZD0icGktdGl0bGUiIHN0eWxlPSJmb250LXNpemU6MTZweDtmb250LXdlaWdodDo4MDA7dGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZSI+15TXptei16og157Xl9eZ16g8L2Rpdj48L3RkPgogICAgICA8dGQgc3R5bGU9InRleHQtYWxpZ246bGVmdDtmb250LXNpemU6MTJweDtjb2xvcjojMzMzIj7XqteQ16jXmdeaOiA8c3BhbiBpZD0icGktZGF0ZSI+PC9zcGFuPjwvdGQ+CiAgICA8L3RyPgogIDwvdGFibGU+CiAgPHRhYmxlIHdpZHRoPSIxMDAlIiBjZWxscGFkZGluZz0iMCIgY2VsbHNwYWNpbmc9IjAiIHN0eWxlPSJib3JkZXItY29sbGFwc2U6Y29sbGFwc2U7bWFyZ2luLWJvdHRvbToyMHB4O2ZvbnQtc2l6ZToxMnB4Ij4KICAgIDx0aGVhZD4KICAgICAgPHRyIHN0eWxlPSJiYWNrZ3JvdW5kOiNmNWYwZTAiPgogICAgICAgIDx0aCBzdHlsZT0icGFkZGluZzo3cHggOHB4O3RleHQtYWxpZ246cmlnaHQ7Ym9yZGVyLWJvdHRvbToxLjVweCBzb2xpZCAjZTg4MTJhIj4jPC90aD4KICAgICAgICA8dGggc3R5bGU9InBhZGRpbmc6N3B4IDhweDt0ZXh0LWFsaWduOnJpZ2h0O2JvcmRlci1ib3R0b206MS41cHggc29saWQgI2U4ODEyYSI+16rXmdeQ15XXqCDXqdeZ16jXldeqPC90aD4KICAgICAgICA8dGggc3R5bGU9InBhZGRpbmc6N3B4IDhweDt0ZXh0LWFsaWduOmNlbnRlcjtib3JkZXItYm90dG9tOjEuNXB4IHNvbGlkICNlODgxMmEiPteb157XldeqPC90aD4KICAgICAgICA8dGggc3R5bGU9InBhZGRpbmc6N3B4IDhweDt0ZXh0LWFsaWduOmNlbnRlcjtib3JkZXItYm90dG9tOjEuNXB4IHNvbGlkICNlODgxMmEiPtee15fXmdeoINeZ15fXmdeT15Q8L3RoPgogICAgICAgIDx0aCBzdHlsZT0icGFkZGluZzo3cHggOHB4O3RleHQtYWxpZ246bGVmdDtib3JkZXItYm90dG9tOjEuNXB4IHNvbGlkICNlODgxMmEiPteh15Qi15s8L3RoPgogICAgICA8L3RyPgogICAgPC90aGVhZD4KICAgIDx0Ym9keSBpZD0icGktaXRlbXMiPjwvdGJvZHk+CiAgPC90YWJsZT4KICA8dGFibGUgY2VsbHBhZGRpbmc9IjAiIGNlbGxzcGFjaW5nPSIwIiBzdHlsZT0iZm9udC1zaXplOjEycHg7Ym9yZGVyLWNvbGxhcHNlOmNvbGxhcHNlO21pbi13aWR0aDoyNjBweCI+CiAgICA8dHI+PHRkIHN0eWxlPSJwYWRkaW5nOjVweCAxMnB4O2NvbG9yOiM1NTU7dGV4dC1hbGlnbjpyaWdodCI+157Xl9eZ16gg15zXpNeg15kg157XoiLXnjo8L3RkPjx0ZCBzdHlsZT0icGFkZGluZzo1cHggMTJweDt0ZXh0LWFsaWduOmxlZnQ7Zm9udC13ZWlnaHQ6NjAwIiBpZD0icGktYmVmb3JlLXZhdCI+PC90ZD48L3RyPgogICAgPHRyPjx0ZCBzdHlsZT0icGFkZGluZzo1cHggMTJweDtjb2xvcjojNTU1O3RleHQtYWxpZ246cmlnaHQiPtee16Ii154gKDE4JSk6PC90ZD48dGQgc3R5bGU9InBhZGRpbmc6NXB4IDEycHg7dGV4dC1hbGlnbjpsZWZ0O2ZvbnQtd2VpZ2h0OjYwMCIgaWQ9InBpLXZhdCI+PC90ZD48L3RyPgogICAgPHRyIHN0eWxlPSJiYWNrZ3JvdW5kOiNmNWYwZTA7Ym9yZGVyLXRvcDoxLjVweCBzb2xpZCAjZTg4MTJhIj4KICAgICAgPHRkIHN0eWxlPSJwYWRkaW5nOjhweCAxMnB4O2ZvbnQtd2VpZ2h0OjgwMDtmb250LXNpemU6MTRweDt0ZXh0LWFsaWduOnJpZ2h0Ij7XodeUItebINeb15XXnNecINee16Ii1546PC90ZD4KICAgICAgPHRkIHN0eWxlPSJwYWRkaW5nOjhweCAxMnB4O3RleHQtYWxpZ246bGVmdDtmb250LXdlaWdodDo5MDA7Zm9udC1zaXplOjE2cHg7Y29sb3I6I2U4ODEyYSIgaWQ9InBpLXRvdGFsIj48L3RkPgogICAgPC90cj4KICA8L3RhYmxlPgogIDxkaXYgaWQ9InBpLWZvb3Rub3RlIiBzdHlsZT0ibWFyZ2luLXRvcDoyNHB4O2ZvbnQtc2l6ZToxMHB4O2NvbG9yOiM4ODg7Ym9yZGVyLXRvcDoxcHggc29saWQgI2UwZTBlMDtwYWRkaW5nLXRvcDoxMHB4Ij48L2Rpdj4KPC9kaXY+CjxzcGFuIGlkPSJwcmludC1kYXRlIiBzdHlsZT0iZGlzcGxheTpub25lIj48L3NwYW4+CjxzdHlsZT4KQG1lZGlhIHByaW50IHsKICAqIHsgLXdlYmtpdC1wcmludC1jb2xvci1hZGp1c3Q6IGV4YWN0ICFpbXBvcnRhbnQ7IHByaW50LWNvbG9yLWFkanVzdDogZXhhY3QgIWltcG9ydGFudDsgfQogIGJvZHkgPiAqOm5vdCgjcHJpbnQtaW52b2ljZSkgeyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IH0KICAjcHJpbnQtaW52b2ljZSB7IGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7IHBvc2l0aW9uOiBzdGF0aWMgIWltcG9ydGFudDsgfQp9Cjwvc3R5bGU+CjwvYm9keT4KPC9odG1sPg==";

function CalculatorTab({ config }) {
  const [html, setHtml] = useState(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    try {
      const binary = atob(CALCULATOR_HTML_B64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const decoded = new TextDecoder("utf-8").decode(bytes);
      setHtml(decoded);
    } catch (e) {
      console.error(e);
      setErr(true);
    }
  }, []);

  return (
    <div className="calc-iframe-wrap">
      {err && <div className="error-box"><AlertCircle size={15}/> שגיאה בטעינת המחשבון. נסו לרענן.</div>}
      {html && (
        <iframe
          srcDoc={html}
          className="calc-real-iframe"
          title="מחשבון מחיר – צמר שטיחים יפים"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
        />
      )}
    </div>
  );
}

/* ============================= העברות בין סניפים ============================= */

function TransfersTab({ transfers, setTransfers, account }) {
  const [draftRows, setDraftRows] = useState([{ id: uid(), sku: "", name: "", size: "", notes: "" }]);
  const [branch, setBranch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const isAdmin = account?.role === "admin";

  const persist = (next) => { saveTransfers(next, transfers); setTransfers(next); };

  const updateDraftRow = (id, patch) => setDraftRows(draftRows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const addDraftRow = () => setDraftRows([...draftRows, { id: uid(), sku: "", name: "", size: "", notes: "" }]);
  const removeDraftRow = (id) => setDraftRows(draftRows.length > 1 ? draftRows.filter((r) => r.id !== id) : draftRows);

  const handlePasteFromExcel = (e) => {
    const text = e.clipboardData.getData("text");
    if (!text.includes("\t") && !text.includes("\n")) return; // הדבקה של תא בודד — תתנהג כרגיל
    e.preventDefault();
    const rows = text.split(/\r?\n/).filter((r) => r.trim());
    const parsed = rows.map((r) => {
      const cols = r.split("\t");
      return { id: uid(), sku: (cols[0] || "").trim(), name: (cols[1] || "").trim(), size: (cols[2] || "").trim(), notes: (cols[3] || "").trim() };
    });
    setDraftRows(parsed.length ? parsed : [{ id: uid(), sku: "", name: "", size: "", notes: "" }]);
  };

  const validRows = draftRows.filter((r) => r.sku.trim() || r.name.trim());

  const handleAdd = () => {
    if (validRows.length === 0) return;
    const items = validRows.map((r) => ({
      id: uid(), catalogNumber: r.sku.trim(), name: r.name.trim(), size: r.size.trim(), notes: r.notes.trim(),
      toLocation: branch, status: "ממתין", pending: !isAdmin, submittedBy: account?.name || "", createdAt: new Date().toISOString(),
    }));
    persist([...items, ...transfers]);
    setDraftRows([{ id: uid(), sku: "", name: "", size: "", notes: "" }]);
  };
  const updateItem = (id, patch) => persist(transfers.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  const removeItem = (id) => persist(transfers.filter((t) => t.id !== id));

  const visible = transfers.filter((t) => (!t.pending && !t.rejected) || isAdmin || t.submittedBy === account?.name);
  const filtered = visible.filter((t) => (filterStatus === "all" || t.status === filterStatus) && t.toLocation === branch).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div>
      {!isAdmin && <p className="muted small">פריטים חדשים יישלחו לאישור מחסן לפני שיופיעו ברשימה הכללית.</p>}
      <div className="filter-label">סניף</div>
      <PillGroup options={BRANCHES} value={branch} onChange={setBranch} />

      {!branch ? (
        <div className="empty-state"><Building2 size={28} className="muted" /><p>בחרו סניף למעלה כדי להתחיל להוסיף או לצפות בפריטים.</p></div>
      ) : (
        <>
          <div className="filter-label" style={{ marginTop: 20 }}>פריטים לבקשה — {branchLabel(branch)}</div>
          <p className="muted small" style={{ marginBottom: 8 }}>מלאו שורה לכל פריט, או הדביקו טבלה שלמה מאקסל (עמודות מק״ט / שם / מידה / הערות) ישירות לתוך שדה ה"מק״ט" של השורה הראשונה.</p>

          <div className="transfer-table-wrap draft-table-wrap">
            <table className="transfer-table">
              <thead>
                <tr>
                  <th className="tt-num">מק״ט</th>
                  <th className="tt-name">שם</th>
                  <th className="tt-size">מידה</th>
                  <th className="tt-notes">הערות</th>
                  <th className="tt-del"/>
                </tr>
              </thead>
              <tbody>
                {draftRows.map((row, i) => (
                  <tr key={row.id}>
                    <td className="tt-num"><input value={row.sku} inputMode="numeric" pattern="[0-9]*" onChange={(e) => updateDraftRow(row.id, { sku: e.target.value })} onPaste={i === 0 ? handlePasteFromExcel : undefined} placeholder="10234" /></td>
                    <td className="tt-name"><input value={row.name} onChange={(e) => updateDraftRow(row.id, { name: e.target.value })} placeholder="שטיח פרסי כחול" /></td>
                    <td className="tt-size"><input value={row.size} onChange={(e) => updateDraftRow(row.id, { size: e.target.value })} placeholder="200×300" /></td>
                    <td className="tt-notes"><input value={row.notes} onChange={(e) => updateDraftRow(row.id, { notes: e.target.value })} placeholder="הערה (לא חובה)" /></td>
                    <td className="tt-del"><button className="icon-btn danger" onClick={() => removeDraftRow(row.id)}><Trash2 size={14}/></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn-ghost small" onClick={addDraftRow}><Plus size={14}/> הוסף שורה</button>

          <div><button className="btn-primary" style={{ marginTop: 10 }} onClick={handleAdd} disabled={validRows.length === 0}><Plus size={16}/> הוסף {validRows.length > 0 ? `${validRows.length} פריטים` : ""} לרשימה</button></div>

          <div className="filter-label" style={{ marginTop: 24 }}>סטטוס</div>
          <PillGroup options={[{ id: "all", label: "הכל" }, ...TRANSFER_STATUS]} value={filterStatus} onChange={setFilterStatus} size="sm" />

          <div className="toolbar">
            <span />
            <button className="btn-ghost small" onClick={() => window.print()}><Printer size={14}/> הדפס</button>
          </div>

          {filtered.length === 0 && <div className="empty-state"><ArrowLeftRight size={28} className="muted" /><p>אין פריטים להעברה כרגע.</p></div>}

          {filtered.length > 0 && (
            <div className="transfer-table-wrap">
              <table className="transfer-table">
                <thead>
                  <tr>
                    <th className="tt-num">מק״ט</th>
                    <th className="tt-name">שם</th>
                    <th className="tt-size">מידה</th>
                    <th className="tt-notes">הערות</th>
                    <th className="tt-status">סטטוס</th>
                    <th className="tt-del"/>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((t) => (
                    <tr key={t.id} className={t.pending ? "row-pending" : t.rejected ? "row-rejected" : ""}>
                      <td className="tt-num"><input inputMode="numeric" pattern="[0-9]*" value={t.catalogNumber} onChange={(e) => updateItem(t.id, { catalogNumber: e.target.value })} placeholder="מק״ט" /></td>
                      <td className="tt-name">
                        <input value={t.name} onChange={(e) => updateItem(t.id, { name: e.target.value })} placeholder="שם / תיאור השטיח" />
                        {t.pending && <Chip color="#B8862F">ממתין לאישור</Chip>}
                        {t.rejected && <Chip color="#B23B3B">נדחה: {t.rejectionReason || "—"}</Chip>}
                      </td>
                      <td className="tt-size"><input value={t.size || ""} onChange={(e) => updateItem(t.id, { size: e.target.value })} placeholder="מידה" /></td>
                      <td className="tt-notes"><input value={t.notes || ""} onChange={(e) => updateItem(t.id, { notes: e.target.value })} placeholder="הערות" /></td>
                      <td className="tt-status">
                        <select value={t.status} onChange={(e) => updateItem(t.id, { status: e.target.value })} style={{ color: TRANSFER_STATUS.find(s=>s.id===t.status)?.color }}>{TRANSFER_STATUS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}</select>
                      </td>
                      <td className="tt-del"><button className="icon-btn danger" onClick={() => removeItem(t.id)}><Trash2 size={14}/></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="print-transfers">
            <h2>העברה לסניף — {branchLabel(branch)}</h2>
            <div className="print-transfers-meta">{new Date().toLocaleDateString("he-IL", { day: "2-digit", month: "2-digit", year: "numeric" })} · {filtered.length} פריטים</div>
            <table className="print-tr-table">
              <thead><tr><th>#</th><th>מק״ט</th><th>שם / תיאור</th><th>מידה</th><th>הערות</th><th>סטטוס</th></tr></thead>
              <tbody>
                {filtered.map((t, i) => (
                  <tr key={t.id}>
                    <td>{i + 1}</td>
                    <td>{t.catalogNumber || "—"}</td>
                    <td>{t.name || "—"}{t.pending ? " (ממתין לאישור)" : ""}{t.rejected ? ` (נדחה: ${t.rejectionReason || "—"})` : ""}</td>
                    <td>{t.size || "—"}</td>
                    <td>{t.notes || "—"}</td>
                    <td>{TRANSFER_STATUS.find((s) => s.id === t.status)?.label || t.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

/* ============================= לוח שנה — סגנון iOS ============================= */

function TaskPickerModal({ tasks, date, onClose, onConfirm }) {
  const [selected, setSelected] = useState([]);
  const candidates = tasks.filter((t) => t.scheduledDate !== date).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  const toggle = (id) => setSelected((s) => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-head"><h2>הוספת משימות ל-{date}</h2><button className="icon-btn" onClick={onClose}><X size={18} /></button></div>
        <div className="modal-body">
          {candidates.length === 0 && <div className="empty-state"><p>אין משימות פנויות להוספה.</p></div>}
          <div className="task-list">
            {candidates.map((t) => (
              <label key={t.id} className={"pick-row" + (selected.includes(t.id) ? " active" : "")}>
                <input type="checkbox" checked={selected.includes(t.id)} onChange={() => toggle(t.id)} />
                <div><div className="pick-row-title">{t.type === "general" ? t.title : t.client.name}</div><div className="muted small">{typeMeta(t.type).label} · {t.zone} · {t.scheduledDate ? `מתוזמן ל-${fmtDateOnly(t.scheduledDate)}` : "לא מתוזמן"}</div></div>
              </label>
            ))}
          </div>
        </div>
        <div className="modal-foot"><button className="btn-ghost" onClick={onClose}>ביטול</button><button className="btn-primary" disabled={selected.length === 0} onClick={() => onConfirm(selected)}><Plus size={16}/> הוסף {selected.length > 0 ? selected.length : ""} ליום זה</button></div>
      </div>
    </div>
  );
}

function CalendarTab({ tasks, updateTasks, selectedDate, onSelectDate, onStartAssign, config, account, driverNames, getNextNumber }) {
  const [openTaskId, setOpenTaskId] = useState(null);
  const [printDriver, setPrintDriver] = useState("all");
  const [showBranchPicker, setShowBranchPicker] = useState(false);
  const [dragState, setDragState] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const openTask = tasks.find((t) => t.id === openTaskId) || null;
  const warehouseAddress = config?.general?.warehouseAddress || WAREHOUSE_ADDRESS;

  // כשיש נהג יחיד בכל המערכת — אין שום צורך בבחירה ידנית, המשימות משויכות אליו אוטומטית.
  const singleDriverMode = !!(driverNames && driverNames.length === 1);
  const onlyDriverName = singleDriverMode ? driverNames[0] : null;

  const tasksByDate = useMemo(() => {
    const map = {};
    tasks.forEach((t) => { if (!t.scheduledDate || !canSeeTask(t, account)) return; (map[t.scheduledDate] = map[t.scheduledDate] || []).push(t); });
    return map;
  }, [tasks, account]);

  const allDayTasks = tasksByDate[selectedDate] || [];
  const unassignedIdsKey = allDayTasks.filter((t) => !t.driver).map((t) => t.id).join(",");

  // מצב נהג יחיד: כל משימה בלי נהג משויכת אוטומטית ברגע שהיא נקבעת ליום — בלי לבחור כלום.
  useEffect(() => {
    if (!singleDriverMode || !unassignedIdsKey) return;
    const ids = unassignedIdsKey.split(",");
    updateTasks(tasks.map((t) => ids.includes(t.id) ? { ...t, driver: onlyDriverName, log: [...t.log, { ts: new Date().toISOString(), action: "נהג שויך אוטומטית", note: onlyDriverName }] } : t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleDriverMode, unassignedIdsKey, onlyDriverName]);

  const dayDrivers = [...new Set(allDayTasks.map((t) => t.driver).filter(Boolean))];
  const dayTasks = printDriver === "all" ? allDayTasks : allDayTasks.filter((t) => t.driver === printDriver);

  // סדר בסיס לפני קיבוץ — לפי אזור ואז לפי סדר מסלול/יצירה, כדי שהתצוגה תהיה יציבה.
  const orderedDayTasks = [...dayTasks].sort((a, b) => {
    const za = ZONES.findIndex((z) => z.id === a.zone);
    const zb = ZONES.findIndex((z) => z.id === b.zone);
    if (za !== zb) return za - zb;
    return (a.routeOrder ?? 9999) - (b.routeOrder ?? 9999) || new Date(a.createdAt) - new Date(b.createdAt);
  });

  // קיבוץ אוטומטי לפי נהג: כל המשימות של אותו נהג נצמדות יחד לקבוצה אחת — לא משנה איפה הן ברשימה או באיזה אזור.
  // אזורים שונים בתוך אותה קבוצת נהג לא מפוצלים, כי כל כרטיס משימה כבר מציג את האזור שלו.
  const driverGroups = [];
  {
    const idxByKey = {};
    orderedDayTasks.forEach((t) => {
      const key = t.driver || "";
      if (idxByKey[key] === undefined) {
        idxByKey[key] = driverGroups.length;
        driverGroups.push({ key, driver: t.driver || "", tasks: [] });
      }
      driverGroups[idxByKey[key]].tasks.push(t);
    });
    driverGroups.sort((a, b) => (a.key === "" ? 1 : 0) - (b.key === "" ? 1 : 0));
  }

  const shiftDay = (delta) => { const d = new Date(selectedDate); d.setDate(d.getDate() + delta); onSelectDate(isoDate(d)); };
  const handleSave = (task) => {
    const exists = tasks.some((t) => t.id === task.id);
    updateTasks(exists ? tasks.map((t) => (t.id === task.id ? task : t)) : [...tasks, task]);
    setShowForm(false); setEditing(null);
  };
  const handleDelete = (id) => { updateTasks(tasks.filter((t) => t.id !== id)); setOpenTaskId(null); };
  const assignDriverToGroup = (groupKey, name) => {
    if (!name) return;
    const ids = (driverGroups.find((g) => g.key === groupKey)?.tasks || []).map((t) => t.id);
    updateTasks(tasks.map((t) => ids.includes(t.id) ? { ...t, driver: name, log: [...t.log, { ts: new Date().toISOString(), action: "נהג שויך לקבוצה", note: name }] } : t));
  };
  const assignDriverToTask = (taskId, name) => {
    updateTasks(tasks.map((t) => t.id === taskId ? { ...t, driver: name, log: [...t.log, { ts: new Date().toISOString(), action: "נהג שויך", note: name || "בוטל שיוך" }] } : t));
  };
  const removeFromDay = (taskId) => {
    updateTasks(tasks.map((t) => t.id === taskId ? { ...t, scheduledDate: "", log: [...t.log, { ts: new Date().toISOString(), action: "הוסר מהיום", note: "" }] } : t));
  };
  const handleDrop = (groupKey, groupTasksArr, toIndex) => {
    if (!dragState || dragState.groupKey !== groupKey) return;
    const arr = [...groupTasksArr];
    const [moved] = arr.splice(dragState.fromIndex, 1);
    arr.splice(toIndex, 0, moved);
    updateTasks(tasks.map((t) => {
      const idx = arr.findIndex((x) => x.id === t.id);
      return idx >= 0 ? { ...t, routeOrder: idx } : t;
    }));
    setDragState(null);
  };
  const createBranchTask = (branchId) => {
    const task = {
      id: uid(), type: "branch",
      title: `ביקור בסניף ${branchLabel(branchId)}`,
      description: "",
      client: { name: branchLabel(branchId), phone: "", address: BRANCH_ADDRESSES[branchId] || "", contact2Name: "", contact2Phone: "", branchId },
      assignedBy: account?.name || "", driver: "", zone: "מרכז", scheduledDate: selectedDate,
      carpets: [], status: "התקבל", pending: false, createdAt: new Date().toISOString(),
      log: [{ ts: new Date().toISOString(), action: "נוצרה משימה", note: "" }],
    };
    updateTasks([...tasks, task]);
    setShowBranchPicker(false);
  };

  return (
    <div>
      <div className="ios-cal-agenda">
        <div className="ios-cal-agenda-head">
          <div className="day-nav">
            <button className="icon-btn" onClick={() => shiftDay(-1)}><ChevronRight size={18}/></button>
            <span className="ios-cal-agenda-date">{new Date(selectedDate).toLocaleDateString("he-IL", { weekday: "long", day: "numeric", month: "long" })}</span>
            <button className="icon-btn" onClick={() => shiftDay(1)}><ChevronLeft size={18}/></button>
          </div>
          <div className="cal-head-actions">
            {dayDrivers.length > 1 && (
              <PillGroup options={[{ id: "all", label: "כל הנהגים" }, ...dayDrivers.map((d) => ({ id: d, label: d }))]} value={printDriver} onChange={setPrintDriver} size="sm" />
            )}
            <button className="btn-ghost small" onClick={() => window.print()}><Printer size={14}/> הדפס</button>
          </div>
        </div>

        {singleDriverMode && allDayTasks.length > 0 && (
          <div className="driver-today-box">
            <Car size={14} className="muted"/>
            <span className="muted small">כל המשימות של היום משויכות אוטומטית ל<b>{onlyDriverName}</b> — הוא הנהג היחיד במערכת.</span>
          </div>
        )}

        <div className="add-type-row">
          <PillGroup options={TASK_TYPES} value={null} onChange={(t) => t === "branch" ? setShowBranchPicker(true) : onStartAssign(t)} />
        </div>

        {dayTasks.length === 0 && <div className="empty-state"><p>אין משימות ליום זה.</p></div>}

        {driverGroups.map((group) => {
          if (group.tasks.length === 0) return null;
          const gTasks = group.tasks;
          const addresses = gTasks.map((t) => t.client?.address).filter(Boolean);
          const routes = buildGoogleMapsRoutes(addresses, true, warehouseAddress);
          const zonesInGroup = [...new Set(gTasks.map((t) => t.zone))].map((zid) => ZONES.find((z) => z.id === zid)).filter(Boolean);
          const isUnassigned = group.key === "";
          return (
            <div key={group.key || "__unassigned__"} className="zone-block">
              <div className="zone-block-head">
                {isUnassigned ? (
                  <Chip color="#9B9890">ללא שיוך</Chip>
                ) : (
                  <Chip color="#15161A"><Car size={11} style={{ display: "inline", verticalAlign: "-2px" }}/> {group.driver}</Chip>
                )}
                {!singleDriverMode && driverNames && driverNames.length > 0 && (
                  <select className="group-reassign-select" value="" onChange={(e) => { if (e.target.value) assignDriverToGroup(group.key, e.target.value); }}>
                    <option value="">{isUnassigned ? "שייך הכל ל…" : "העבר הכל ל…"}</option>
                    {driverNames.filter((n) => n !== group.driver).map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                )}
                <span className="muted small">{gTasks.length} עצירות</span>
                {zonesInGroup.length > 0 && (
                  <span className="zone-dots">
                    {zonesInGroup.map((z) => <span key={z.id} className="zone-dot" style={{ background: z.color }} title={z.label} />)}
                  </span>
                )}
                {routes.map((r, ri) => <a key={ri} className="gmaps-btn" href={r} target="_blank" rel="noreferrer"><Route size={13}/> {routes.length > 1 ? `מסלול חלק ${ri + 1}` : "פתח מסלול ב-Google Maps"}</a>)}
                {routes.length === 0 && !isUnassigned && <span className="muted small">אין כתובות במשימות של הקבוצה הזו — אי אפשר לבנות מסלול ניווט</span>}
              </div>
              {routes.length > 1 && <p className="muted small" style={{ marginTop: -6, marginBottom: 8 }}>גוגל מאפשר עד 9 עצירות בקישור אחד — לכן פוצל ל-{routes.length} חלקים. פתחו לפי הסדר, כל חלק ממשיך מאיפה שהקודם נגמר.</p>}
              {gTasks.length > 1 && <p className="muted small" style={{ marginTop: -4, marginBottom: 8 }}>גררו את הידית כדי לשנות את סדר העצירות במסלול.</p>}
              <div className="task-list route-thread">
                {gTasks.map((t, i) => (
                  <div key={t.id} className="drag-row" draggable onDragStart={() => setDragState({ groupKey: group.key, fromIndex: i })} onDragOver={(e) => e.preventDefault()} onDrop={() => handleDrop(group.key, gTasks, i)}>
                    <div className="drag-handle"><GripVertical size={16} className="muted"/></div>
                    <div style={{ flex: 1 }}>
                      <TaskCard
                        task={t}
                        onOpen={() => setOpenTaskId(t.id)}
                        showDriverControls
                        driverNames={!singleDriverMode ? driverNames : null}
                        onAssignDriver={!singleDriverMode ? (name) => assignDriverToTask(t.id, name) : null}
                        onRemoveFromDay={() => removeFromDay(t.id)}
                      />
                      {!singleDriverMode && (
                        <div className="task-driver-inline mobile-only">
                          <select value={t.driver || ""} onChange={(e) => assignDriverToTask(t.id, e.target.value)}>
                            <option value="">— ללא שיוך —</option>
                            {driverNames && driverNames.map((n) => <option key={n} value={n}>{n}</option>)}
                          </select>
                          <button className="remove-day-btn" onClick={() => removeFromDay(t.id)} aria-label="הסר מהיום" title="הסר מהיום"><X size={13}/></button>
                        </div>
                      )}
                      {singleDriverMode && (
                        <div className="task-driver-inline mobile-only">
                          <button className="remove-day-btn" onClick={() => removeFromDay(t.id)} aria-label="הסר מהיום" title="הסר מהיום"><X size={13}/></button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="print-manifest">
        <div className="print-header">
          <h2>לו״ז עבודה — {new Date(selectedDate).toLocaleDateString("he-IL", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}{printDriver !== "all" ? ` — נהג: ${printDriver}` : ""}</h2>
          <div className="print-header-meta">מחסן יציאה/חזרה: {warehouseAddress} · סה״כ {driverGroups.reduce((n, g) => n + g.tasks.length, 0)} עצירות ב-{driverGroups.filter((g) => g.tasks.length > 0).length} קבוצות</div>
        </div>
        {driverGroups.filter((g) => g.tasks.length > 0).map((group) => (
          <div key={group.key || "__unassigned__"} className="print-zone">
            <h3>{group.key === "" ? "ללא שיוך" : `נהג: ${group.driver}`} <span className="print-zone-count">({group.tasks.length} עצירות)</span></h3>
            {group.tasks.map((t, i) => {
              const isG = t.type === "general", isB = t.type === "branch", isC = !isG && !isB;
              const st = statusMeta(t.status);
              return (
                <div key={t.id} className="print-stop">
                  <div className="print-stop-head">
                    <span className="print-stop-num">{i + 1}</span>
                    <span className="print-stop-name">{isG && t.number ? `#${t.number} · ` : ""}{isG || isB ? t.title : t.client.name}</span>
                    <span className="print-type">{typeMeta(t.type).label}</span>
                    {!isB && <span className="print-status">{st.label}</span>}
                    {t.pending && <span className="print-pending">ממתין לאישור</span>}
                  </div>
                  <div className="print-stop-facts">
                    <span><b>אזור:</b> {t.zone}</span>
                    {t.client?.phone && <span><b>טלפון:</b> {t.client.phone}</span>}
                    {t.client?.contact2Name && <span><b>{t.client.contact2Name}:</b> {t.client.contact2Phone || ""}</span>}
                    {t.assignedBy && <span><b>סוכן:</b> {t.assignedBy}</span>}
                    {!isG && !isB && t.performedBy && <span><b>לביצוע אצל:</b> {t.performedBy === "אחר" ? (t.performedByOther || "אחר") : t.performedBy}</span>}
                    {t.receivedDate && <span><b>התקבל:</b> {fmtDateOnly(t.receivedDate)}</span>}
                    {!isG && !isB && t.inProgressDate && <span><b>בטיפול מ:</b> {fmtDateOnly(t.inProgressDate)}</span>}
                  </div>
                  {t.client?.address && <div className="print-addr">📍 {t.client.address}</div>}
                  {(t.timeWindow || (t.callAhead && t.callAhead !== "none")) && (
                    <div className="print-time-alert">
                      ⏰ {t.timeWindow || ""}{t.timeWindow && t.callAhead && t.callAhead !== "none" ? " · " : ""}{t.callAhead && t.callAhead !== "none" ? CALL_AHEAD_OPTIONS.find(o=>o.id===t.callAhead)?.label : ""}
                    </div>
                  )}
                  {isC && t.carpets.map((c) => (
                    <div key={c.id} className="print-carpet">🧵 {c.number ? `#${c.number} ` : ""}{c.name || "שטיח"}{carpetSizeLabel(c) ? ` — ${carpetSizeLabel(c)}` : ""}{c.notes ? ` (${c.notes})` : ""}</div>
                  ))}
                  {t.description && <div className="print-desc">הערה: {t.description}</div>}
                  {t.rejected && <div className="print-rejected">נדחה ע״י מחסן: {t.rejectionReason || "—"}</div>}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {showBranchPicker && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-head"><h2>הוסף ביקור בסניף</h2><button className="icon-btn" onClick={() => setShowBranchPicker(false)}><X size={18}/></button></div>
            <div className="modal-body"><PillGroup options={BRANCHES} value={null} onChange={createBranchTask} /></div>
          </div>
        </div>
      )}

      {showForm && <TaskForm initial={editing} allowedTypes={editing ? [editing.type] : ["general", "cleaning", "repair"]} defaultType={editing?.type || "general"} defaultScheduledDate={selectedDate} getNextNumber={getNextNumber} account={account} driverNames={driverNames} onSave={handleSave} onCancel={() => { setShowForm(false); setEditing(null); }} />}

      {openTask && (
        <>
          <TaskDetail task={openTask} onClose={() => setOpenTaskId(null)} onUpdate={(t) => updateTasks(tasks.map((x) => x.id === t.id ? t : x))} driverNames={driverNames} />
          <div className="detail-actions-float">
            <button className="btn-ghost small" onClick={() => { setEditing(openTask); setShowForm(true); setOpenTaskId(null); }}><Edit2 size={14}/> עריכה</button>
            <button className="btn-ghost small danger" onClick={() => handleDelete(openTask.id)}><Trash2 size={14}/> מחיקה</button>
          </div>
        </>
      )}
    </div>
  );
}

/* ============================= חיפוש כללי ============================= */

function SearchModal({ tasks, transfers, onClose, onOpenTask, onOpenTransfers }) {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();

  const matchTask = (t) => {
    if (!query) return false;
    const hay = [
      t.title, t.client?.name, t.client?.phone, t.client?.address, t.client?.contact2Name, t.client?.contact2Phone,
      t.driver, t.assignedBy, t.description, t.number,
      ...(t.carpets || []).flatMap((c) => [c.number, c.name]),
    ].filter(Boolean).join(" ").toLowerCase();
    return hay.includes(query);
  };
  const matchTransfer = (tr) => {
    if (!query) return false;
    const hay = [tr.catalogNumber, tr.name, branchLabel(tr.toLocation)].filter(Boolean).join(" ").toLowerCase();
    return hay.includes(query);
  };

  const taskResults = query ? tasks.filter(matchTask).slice(0, 20) : [];
  const transferResults = query ? transfers.filter(matchTransfer).slice(0, 20) : [];

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-head"><h2>חיפוש</h2><button className="icon-btn" onClick={onClose}><X size={18} /></button></div>
        <div className="modal-body">
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="חפש לפי שם, טלפון, כתובת, מספר..." style={{ marginBottom: 16 }} />

          {query && taskResults.length === 0 && transferResults.length === 0 && <div className="empty-state"><Search size={26} className="muted" /><p>לא נמצאו תוצאות.</p></div>}

          {taskResults.length > 0 && (
            <>
              <div className="filter-label">משימות</div>
              <div className="task-list" style={{ marginBottom: 18 }}>
                {taskResults.map((t) => <TaskCard key={t.id} task={t} onOpen={() => onOpenTask(t)} />)}
              </div>
            </>
          )}

          {transferResults.length > 0 && (
            <>
              <div className="filter-label">פריטים בהעברה</div>
              <div className="transfer-list">
                {transferResults.map((tr) => (
                  <div key={tr.id} className="transfer-row" style={{ cursor: "pointer" }} onClick={onOpenTransfers}>
                    <span className="transfer-catalog-input" style={{ border: "none" }}>{tr.catalogNumber}</span>
                    <span style={{ flex: 1 }}>{tr.name}</span>
                    <span className="muted small transfer-route">אל: {branchLabel(tr.toLocation)}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================= ניהול מחירים (אדמין) ============================= */

function PricingPanel({ config, setConfig }) {
  const [draft, setDraft] = useState(config);
  useEffect(() => setDraft(config), [config]);

  const setNum = (section, key, value) => setDraft({ ...draft, [section]: { ...draft[section], [key]: value === "" ? 0 : Number(value) } });
  const setText = (section, key, value) => setDraft({ ...draft, [section]: { ...draft[section], [key]: value } });
  const setDiscount = (idx, key, value) => { const next = [...draft.discounts]; next[idx] = { ...next[idx], [key]: Number(value) }; setDraft({ ...draft, discounts: next }); };
  const setDeliveryPrice = (idx, value) => { const next = [...draft.deliveryPrices]; next[idx] = { ...next[idx], price: Number(value) }; setDraft({ ...draft, deliveryPrices: next }); };
  const handleSave = () => { setConfig(draft); saveCalcConfig(draft); };

  return (
    <div>
      <div className="section-title">כללי</div>
      <div className="form-grid">
        <Field label="מינימום הזמנה (₪)"><input type="number" value={draft.general.minOrder} onChange={(e) => setNum("general", "minOrder", e.target.value)} /></Field>
        <Field label="מינימום ס״מ לצלע"><input type="number" value={draft.general.minSide} onChange={(e) => setNum("general", "minSide", e.target.value)} /></Field>
      </div>
      <Field label="כתובת המחסן (נקודת התחלה/סיום למסלולים)"><input value={draft.general.warehouseAddress} onChange={(e) => setText("general", "warehouseAddress", e.target.value)} /></Field>
      <p className="muted small" style={{ marginTop: -6, marginBottom: 14 }}>אם Google Maps מציג כתובת שגויה במסלול — כנראה שהכתובת כאן לא מזוהה במדויק. נסו לעדכן אותה.</p>

      <div className="section-title">מחירי ניקוי</div>
      <div className="form-grid three">
        {C_TYPES.map((t) => <Field key={t.id} label={`${t.name} (₪/מ״ר)`}><input type="number" value={draft.cleaningPrices[t.id]} onChange={(e) => setNum("cleaningPrices", t.id, e.target.value)} /></Field>)}
        {C_SVCS.map((s) => <Field key={s.id} label={`${s.name} (${s.fixed ? "₪ סה״כ" : "₪/מ״ר"})`}><input type="number" value={draft.cleaningPrices[s.id]} onChange={(e) => setNum("cleaningPrices", s.id, e.target.value)} /></Field>)}
      </div>

      <div className="section-title">מחירי תיקון</div>
      {R_CATS.map((cat) => (
        <div key={cat.cat}>
          <div className="admin-repair-cat">{cat.cat}</div>
          <div className="form-grid three">
            {cat.svcs.map((s) => <Field key={s.id} label={s.name}><input type="number" value={draft.repairPrices[s.id]} onChange={(e) => setNum("repairPrices", s.id, e.target.value)} /></Field>)}
          </div>
        </div>
      ))}

      <div className="section-title">הנחות כמות</div>
      <div className="form-grid">
        {draft.discounts.map((d, i) => (
          <Field key={i} label={`מ-${d.n} שטיחים (%)`}><input type="number" value={d.p} onChange={(e) => setDiscount(i, "p", e.target.value)} /></Field>
        ))}
      </div>

      <div className="section-title">מחירי משלוח לפי אזור</div>
      <div className="form-grid three">
        {draft.deliveryPrices.map((d, i) => <Field key={d.name} label={d.name}><input type="number" value={d.price} onChange={(e) => setDeliveryPrice(i, e.target.value)} /></Field>)}
      </div>

      <button className="btn-primary" onClick={handleSave}><Save size={16}/> שמור מחירון</button>
    </div>
  );
}

/* ============================= ניהול חשבונות ============================= */

const TAB_PERMISSION_OPTIONS = [
  { id: "calendar", label: "לו״ז עבודה" },
  { id: "tasks", label: "משימות" },
  { id: "ops", label: "ניקוי ותיקון" },
  { id: "intake", label: "קליטת שטיחים" },
  { id: "transfers", label: "סניפים" },
  { id: "calc", label: "מחשבון" },
];

function AccountsAdmin({ accounts, setAccounts }) {
  const [editing, setEditing] = useState(null);

  const persist = (next) => { saveAccounts(next, accounts); setAccounts(next); };
  const startNew = () => setEditing({ id: uid(), name: "", password: "", role: "branch", canViewAllTasks: false, permissions: { tabs: {}, opsTypes: {} } });
  const save = () => {
    if (!editing.name.trim() || !editing.password.trim()) return;
    const exists = accounts.some((a) => a.id === editing.id);
    persist(exists ? accounts.map((a) => (a.id === editing.id ? editing : a)) : [...accounts, editing]);
    setEditing(null);
  };
  const remove = (id) => { if (id === "warehouse") return; persist(accounts.filter((a) => a.id !== id)); };
  const roleLabel = (r) => r === "admin" ? "מנהל (מחסן)" : r === "manager" ? "הנהלה" : r === "driver" ? "נהג" : "סניף";
  const roleColor = (r) => r === "admin" ? "#2B4A5E" : r === "manager" ? "#7B4FA0" : r === "driver" ? "#0E7A6B" : "#B8862F";

  const setTabPerm = (tabId, val) => setEditing({ ...editing, permissions: { ...editing.permissions, tabs: { ...editing.permissions?.tabs, [tabId]: val } } });
  const setOpsPerm = (typeId, val) => setEditing({ ...editing, permissions: { ...editing.permissions, opsTypes: { ...editing.permissions?.opsTypes, [typeId]: val } } });
  const tabChecked = (tabId) => editing.permissions?.tabs?.[tabId] !== false;
  const opsChecked = (typeId) => editing.permissions?.opsTypes?.[typeId] !== false;

  return (
    <div>
      <div className="section-title">חשבונות</div>
      <div className="accounts-list">
        {accounts.map((a) => (
          <div key={a.id} className="account-row">
            <div className="driver-avatar">{a.name.slice(0, 2)}</div>
            <div style={{ flex: 1 }}>
              <div className="driver-name">{a.name} <Chip color={roleColor(a.role)}>{roleLabel(a.role)}</Chip></div>
              <div className="driver-meta">{a.role === "admin" ? "גישה מלאה" : a.role === "manager" ? "רואה הכל, אך תוספותיו ממתינות לאישור" : a.role === "driver" ? "רואה רק את המשימות המשויכות אליו" : a.canViewAllTasks ? "רואה את כל המשימות" : "רואה רק את מה שהוא שלח"}</div>
            </div>
            <button className="btn-ghost small" onClick={() => setEditing(a)}><Edit2 size={13}/> עריכה</button>
            {a.id !== "warehouse" && <button className="icon-btn danger" onClick={() => remove(a.id)}><Trash2 size={14}/></button>}
          </div>
        ))}
      </div>
      <button className="btn-ghost" onClick={startNew}><Plus size={16}/> חשבון חדש</button>

      {editing && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-head"><h2>{accounts.some(a=>a.id===editing.id) ? "עריכת חשבון" : "חשבון חדש"}</h2><button className="icon-btn" onClick={() => setEditing(null)}><X size={18}/></button></div>
            <div className="modal-body">
              {editing.id !== "warehouse" && (
                <Field label="סוג חשבון"><PillGroup options={[{ id: "branch", label: "סניף" }, { id: "manager", label: "הנהלה" }, { id: "driver", label: "נהג" }]} value={editing.role} onChange={(role) => setEditing({ ...editing, role })} /></Field>
              )}
              <div className="form-grid">
                <Field label="שם החשבון"><input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} placeholder={editing.role === "driver" ? "לדוגמה: משה" : "לדוגמה: סניף הרצליה"} /></Field>
                <Field label="סיסמה"><input value={editing.password} onChange={(e) => setEditing({ ...editing, password: e.target.value })} placeholder="סיסמה" /></Field>
              </div>
              {editing.role === "driver" && <p className="muted small">חשוב: השם כאן חייב להיות זהה לשם שמשייכים לו במשימות (שדה "נהג") — כדי שהוא יראה את המשימות שלו.</p>}
              {editing.role === "manager" && <p className="muted small">חשבון הנהלה רואה הכל ויש לו גישה לכל ההגדרות, בדיוק כמו מחסן — ההבדל היחיד: כל מה שהוא מוסיף עובר לאישור מחסן, בדיוק כמו סניף.</p>}

              {editing.role === "branch" && (
                <>
                  <label className="extra-pill" style={{ marginTop: 6, marginBottom: 14 }}>
                    <input type="checkbox" checked={editing.canViewAllTasks} onChange={(e) => setEditing({ ...editing, canViewAllTasks: e.target.checked })} />
                    <span>מאפשר צפייה בכל המשימות (לא רק מה שהחשבון הזה שלח)</span>
                  </label>

                  <div className="section-title">הרשאות תצוגה — אילו טאבים מוצגים</div>
                  <div className="pill-row-perm">
                    {TAB_PERMISSION_OPTIONS.map((t) => (
                      <label key={t.id} className={"extra-pill" + (tabChecked(t.id) ? " active" : "")}>
                        <input type="checkbox" checked={tabChecked(t.id)} onChange={(e) => setTabPerm(t.id, e.target.checked)} />
                        <span>{t.label}</span>
                      </label>
                    ))}
                  </div>

                  {tabChecked("ops") && (
                    <>
                      <div className="section-title">הרשאות בתוך "ניקוי ותיקון"</div>
                      <div className="pill-row-perm">
                        <label className={"extra-pill" + (opsChecked("cleaning") ? " active" : "")}><input type="checkbox" checked={opsChecked("cleaning")} onChange={(e) => setOpsPerm("cleaning", e.target.checked)} /><span>ניקוי</span></label>
                        <label className={"extra-pill" + (opsChecked("repair") ? " active" : "")}><input type="checkbox" checked={opsChecked("repair")} onChange={(e) => setOpsPerm("repair", e.target.checked)} /><span>תיקון</span></label>
                      </div>
                    </>
                  )}
                  {tabChecked("calc") && <p className="muted small">שימו לב: המחשבון מוטמע כקובץ שלם (עם ניקוי ותיקון יחד בפנים) — אי אפשר להסתיר רק את "תיקון" בתוכו, רק את הטאב כולו.</p>}
                </>
              )}

              <p className="muted small" style={{ marginTop: 10 }}>שימו לב: זו הגנה בסיסית לחלוקת עבודה בין הצוות, לא אבטחת מידע מלאה — כל מי שניגש לקוד יכול לראות את הסיסמאות.</p>
            </div>
            <div className="modal-foot"><button className="btn-ghost" onClick={() => setEditing(null)}>ביטול</button><button className="btn-primary" onClick={save}><Save size={16}/> שמירה</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================= אישורים ============================= */

function Approvals({ tasks, updateTasks, transfers, setTransfers, getNextNumber }) {
  const pendingTasks = tasks.filter((t) => t.pending);
  const pendingTransfers = transfers.filter((t) => t.pending);
  const [rejectingTaskId, setRejectingTaskId] = useState(null);
  const [rejectingTransferId, setRejectingTransferId] = useState(null);
  const [reason, setReason] = useState("");

  const approveTask = (task) => {
    const isCarpetType = task.type === "cleaning" || task.type === "repair";
    const carpets = isCarpetType ? task.carpets.map((c) => c.number ? c : { ...c, number: getNextNumber() }) : task.carpets;
    updateTasks(tasks.map((t) => t.id === task.id ? { ...t, pending: false, carpets, log: [...t.log, { ts: new Date().toISOString(), action: "אושר", note: "" }] } : t));
  };
  const confirmRejectTask = (task) => {
    if (!reason.trim()) return;
    updateTasks(tasks.map((t) => t.id === task.id ? { ...t, pending: false, rejected: true, rejectionReason: reason, log: [...t.log, { ts: new Date().toISOString(), action: "נדחה", note: reason }] } : t));
    setRejectingTaskId(null); setReason("");
  };
  const approveTransfer = (tr) => setTransfers(transfers.map((t) => t.id === tr.id ? { ...t, pending: false } : t));
  const confirmRejectTransfer = (tr) => {
    if (!reason.trim()) return;
    setTransfers(transfers.map((t) => t.id === tr.id ? { ...t, pending: false, rejected: true, rejectionReason: reason } : t));
    setRejectingTransferId(null); setReason("");
  };

  return (
    <div>
      <div className="section-title">משימות ממתינות ({pendingTasks.length})</div>
      {pendingTasks.length === 0 && <p className="muted small">אין משימות הממתינות לאישור.</p>}
      <div className="task-list">
        {pendingTasks.map((t) => (
          <div key={t.id} className="approval-row">
            <TaskCard task={t} onOpen={() => {}} />
            <div className="muted small" style={{ margin: "4px 0 8px" }}>נשלח ע״י: {t.submittedBy}</div>
            {rejectingTaskId === t.id ? (
              <div className="reject-form">
                <input autoFocus value={reason} onChange={(e) => setReason(e.target.value)} placeholder="נא לפרט מדוע נדחה — חובה" />
                <div className="approval-btns">
                  <button className="btn-ghost small danger" disabled={!reason.trim()} onClick={() => confirmRejectTask(t)}><X size={14}/> אשר דחייה</button>
                  <button className="btn-ghost small" onClick={() => { setRejectingTaskId(null); setReason(""); }}>ביטול</button>
                </div>
              </div>
            ) : (
              <div className="approval-btns">
                <button className="btn-primary small" onClick={() => approveTask(t)}><Save size={14}/> אשר</button>
                <button className="btn-ghost small danger" onClick={() => { setRejectingTaskId(t.id); setReason(""); }}><X size={14}/> דחה</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="section-title" style={{ marginTop: 26 }}>פריטי העברה ממתינים ({pendingTransfers.length})</div>
      {pendingTransfers.length === 0 && <p className="muted small">אין פריטים הממתינים לאישור.</p>}
      <div className="transfer-list">
        {pendingTransfers.map((tr) => (
          <div key={tr.id}>
            <div className="transfer-row">
              <span className="transfer-catalog-input" style={{ border: "none" }}>{tr.catalogNumber}</span>
              <span style={{ flex: 1 }}>{tr.name}</span>
              <span className="muted small transfer-route">אל: {branchLabel(tr.toLocation)}</span>
              {rejectingTransferId !== tr.id && <button className="btn-primary small" onClick={() => approveTransfer(tr)}>אשר</button>}
              <button className="icon-btn danger" onClick={() => { setRejectingTransferId(rejectingTransferId === tr.id ? null : tr.id); setReason(""); }}><X size={14}/></button>
            </div>
            {rejectingTransferId === tr.id && (
              <div className="reject-form">
                <input autoFocus value={reason} onChange={(e) => setReason(e.target.value)} placeholder="נא לפרט מדוע נדחה — חובה" />
                <button className="btn-ghost small danger" disabled={!reason.trim()} onClick={() => confirmRejectTransfer(tr)}>אשר דחייה</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================= אזור ניהול ============================= */

function ManagementArea({ config, setConfig, accounts, setAccounts }) {
  const [sub, setSub] = useState("pricing");
  const subTabs = [
    { id: "pricing", label: "מחירים" },
    { id: "accounts", label: "חשבונות" },
  ];
  return (
    <div>
      <PillGroup options={subTabs} value={sub} onChange={setSub} />
      {sub === "pricing" ? <PricingPanel config={config} setConfig={setConfig} /> :
       <AccountsAdmin accounts={accounts} setAccounts={setAccounts} />}
    </div>
  );
}

/* ============================= כניסה לחשבון ============================= */

/* ============================= אפליקציית נהג ============================= */

function DriverTaskCard({ task, stopNumber, onUpdate }) {
  const [photos, setPhotos] = useState({ before: [], after: [] });
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [note, setNote] = useState("");
  const isBranch = task.type === "branch";
  const isGeneral = task.type === "general";

  useEffect(() => { let alive = true; loadPhotos(task.id).then((p) => { if (alive) { setPhotos(p); setLoadingPhotos(false); } }); return () => { alive = false; }; }, [task.id]);

  const wazeLink = task.client?.address ? `https://waze.com/ul?q=${encodeURIComponent(task.client.address)}&navigate=yes` : null;
  const telLink = task.client?.phone ? `tel:${task.client.phone}` : null;

  const advanceStatus = (statusId) => {
    onUpdate({ ...task, status: statusId, log: [...task.log, { ts: new Date().toISOString(), action: `סטטוס עודכן ל-${statusMeta(statusId).label}`, note: "" }] });
  };
  const toggleVisited = () => {
    onUpdate({ ...task, visited: !task.visited, log: [...task.log, { ts: new Date().toISOString(), action: !task.visited ? "בוצע ביקור" : "בוטל סימון ביקור", note: "" }] });
  };
  const saveNote = () => {
    if (!note.trim()) return;
    onUpdate({ ...task, log: [...task.log, { ts: new Date().toISOString(), action: "הערת נהג", note }] });
    setNote("");
  };
  const handleUpload = async (side, files) => {
    const arr = Array.from(files).slice(0, 6 - photos[side].length);
    const compressed = await Promise.all(arr.map((f) => compressImage(f)));
    const next = { ...photos, [side]: [...photos[side], ...compressed] };
    setPhotos(next); savePhotos(task.id, next);
  };
  const removePhoto = (side, idx) => { const next = { ...photos, [side]: photos[side].filter((_, i) => i !== idx) }; setPhotos(next); savePhotos(task.id, next); };

  return (
    <div className={"driver-card" + (isTaskDone(task) ? " done" : "")}>
      <div className="driver-card-top">
        <span className="driver-card-title"><span className="driver-stop-num">{stopNumber}</span> {(isGeneral || isBranch) ? task.title : task.client.name}</span>
        <Chip color={typeMeta(task.type).color}>{typeMeta(task.type).label}</Chip>
      </div>
      {task.client?.address && <div className="driver-card-addr"><MapPin size={13}/> {task.client.address}</div>}
      {(task.timeWindow || (task.callAhead && task.callAhead !== "none")) && (
        <div className="driver-time-alert">
          {task.timeWindow && <span><Clock size={13}/> {task.timeWindow}</span>}
          {task.callAhead && task.callAhead !== "none" && <span>📞 {CALL_AHEAD_OPTIONS.find(o=>o.id===task.callAhead)?.label}</span>}
        </div>
      )}
      {!isBranch && task.carpets?.length > 0 && (
        <div className="muted small">{task.carpets.map((c) => `${c.number ? "#" + c.number + " " : ""}${c.name || "שטיח"}${carpetSizeLabel(c) ? " · " + carpetSizeLabel(c) : ""}`).join(" · ")}</div>
      )}
      {isGeneral && task.description && <div className="task-card-desc">{task.description}</div>}

      <div className="driver-card-actions">
        {wazeLink && <a className="driver-action-btn waze" href={wazeLink} target="_blank" rel="noreferrer"><Truck size={15}/> נווט ב-Waze</a>}
        {telLink && <a className="driver-action-btn call" href={telLink}><Phone size={15}/> התקשר</a>}
      </div>

      {isBranch ? (
        <button className={"driver-done-btn" + (task.visited ? " done" : "")} onClick={toggleVisited}>{task.visited ? "✓ בוצע ביקור" : "סמן ביקור כבוצע"}</button>
      ) : (
        <div className="status-buttons">
          {getStatusFlow(task.type).filter((s) => !["ממשיך לתיקון", "ממשיך לניקוי"].includes(s.id)).map((s) => (
            <button key={s.id} className={"status-btn" + (task.status === s.id ? " active" : "")}
              style={{ borderColor: s.color, color: task.status === s.id ? "#fff" : s.color, background: task.status === s.id ? s.color : "transparent" }}
              onClick={() => advanceStatus(s.id)}>{s.label}</button>
          ))}
        </div>
      )}

      <div className="driver-note-row">
        <input placeholder="הערה למשימה..." value={note} onChange={(e) => setNote(e.target.value)} />
        <button className="btn-ghost small" onClick={saveNote}>שמור</button>
      </div>

      <div className="driver-photo-row single">
        <PhotoGrid photos={photos.before} onUpload={(f) => handleUpload("before", f)} onRemove={(i) => removePhoto("before", i)} loading={loadingPhotos} />
      </div>
    </div>
  );
}

function isTaskDone(task) {
  return task.type === "branch" ? !!task.visited : task.status === "הסתיים";
}

function DriverApp({ account, tasks, updateTasks, onLogout }) {
  const [date, setDate] = useState(isoDate(new Date()));
  const [hideDone, setHideDone] = useState(false);

  const allMyTasks = tasks.filter((t) => t.driver === account.name && t.scheduledDate === date && !t.pending)
    .sort((a, b) => (a.routeOrder ?? 9999) - (b.routeOrder ?? 9999));
  const doneCount = allMyTasks.filter(isTaskDone).length;
  const myTasks = hideDone ? allMyTasks.filter((t) => !isTaskDone(t)) : allMyTasks;
  const byZone = ZONES.map((z) => ({ zone: z, tasks: myTasks.filter((t) => t.zone === z.id) }));
  const shiftDay = (delta) => { const d = new Date(date); d.setDate(d.getDate() + delta); setDate(isoDate(d)); };
  const handleUpdate = (t) => updateTasks(tasks.map((x) => (x.id === t.id ? t : x)));

  return (
    <div className="driver-app">
      <style>{CSS}</style>
      <div className="driver-header">
        <div><div className="brand-name" style={{ fontSize: 18 }}>שלום, {account.name}</div><div className="muted small">לו״ז היום שלך</div></div>
        <button className="icon-btn" onClick={onLogout}><X size={20}/></button>
      </div>
      <div className="driver-daynav">
        <button className="icon-btn" onClick={() => shiftDay(-1)}><ChevronRight size={18}/></button>
        <span>{new Date(date).toLocaleDateString("he-IL", { weekday: "long", day: "numeric", month: "long" })}</span>
        <button className="icon-btn" onClick={() => shiftDay(1)}><ChevronLeft size={18}/></button>
      </div>

      {allMyTasks.length > 0 && (
        <div className="driver-progress">
          <div className="driver-progress-top">
            <span>{doneCount} מתוך {allMyTasks.length} הושלמו</span>
            <button className="btn-ghost small" onClick={() => setHideDone(!hideDone)}>{hideDone ? "הצג הכל" : "הסתר שהושלמו"}</button>
          </div>
          <div className="driver-progress-bar"><div className="driver-progress-fill" style={{ width: `${allMyTasks.length ? (doneCount / allMyTasks.length) * 100 : 0}%` }} /></div>
        </div>
      )}

      {myTasks.length === 0 && <div className="empty-state"><p>{allMyTasks.length === 0 ? "אין לך משימות ליום זה." : "כל המשימות הוסתרו (הושלמו)."}</p></div>}

      {byZone.map(({ zone, tasks: zTasks }) => zTasks.length > 0 && (
        <div key={zone.id} className="driver-zone-block">
          <div className="driver-zone-head"><Chip color={zone.color}>{zone.label}</Chip><span className="muted small">{zTasks.length} עצירות</span></div>
          {zTasks.map((t, i) => <DriverTaskCard key={t.id} task={t} stopNumber={i + 1} onUpdate={handleUpdate} />)}
        </div>
      ))}
    </div>
  );
}

function LoginScreen({ accounts, onLogin }) {
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const acc = accounts.find((a) => a.name.trim() === accountName.trim());
    if (!acc || acc.password !== password) { setError("שם חשבון או סיסמה שגויים"); return; }
    onLogin(acc);
  };

  return (
    <div className="login-screen">
      <style>{CSS}</style>
      <div className="login-card">
        <div className="brand-name" style={{ fontSize: 22, marginBottom: 4 }}>צמר שטיחים יפים</div>
        <div className="muted" style={{ marginBottom: 22 }}>כניסה למערכת התפעול</div>
        <Field label="שם חשבון"><input value={accountName} onChange={(e) => setAccountName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSubmit()} placeholder="לדוגמה: מחסן" /></Field>
        <Field label="סיסמה"><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSubmit()} placeholder="סיסמה" /></Field>
        {error && <div className="error-box"><AlertCircle size={15}/> {error}</div>}
        <button className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={handleSubmit}>כניסה</button>
      </div>
    </div>
  );
}

/* ============================= אפליקציה ראשית ============================= */

const TABS = [
  { id: "calendar", label: "לו״ז עבודה", icon: CalIcon },
  { id: "tasks", label: "משימות", icon: ClipboardList },
  { id: "ops", label: "ניקוי ותיקון", icon: Wrench },
  { id: "intake", label: "קליטת שטיחים", icon: ClipboardPaste },
  { id: "transfers", label: "סניפים", icon: ArrowLeftRight },
  { id: "approvals", label: "אישורים", icon: CheckCircle2, adminOnly: true },
  { id: "calc", label: "מחשבון", icon: CalcIcon },
];
const PAGE_META = {
  calendar: { title: "לו״ז עבודה", sub: "תכנון, שיוך נהגים ומשימות לפי יום" },
  tasks: { title: "משימות", sub: "הוספת משימות כלליות" },
  ops: { title: "ניקוי ותיקון", sub: "כל עבודות הניקוי והתיקון" },
  intake: { title: "קליטת שטיחים", sub: "סמנו שטיחים שחזרו לפי מספר הזמנה" },
  transfers: { title: "סניפים", sub: "העברות שטיחים בין סניפים" },
  approvals: { title: "אישורים", sub: "משימות ופריטים הממתינים לאישור" },
  calc: { title: "מחשבון", sub: "" },
  admin: { title: "ניהול", sub: "מחירים וחשבונות" },
};

function MiniCalendarRail({ tasks, onPick, selectedDate, account }) {
  const today = new Date();
  const [monthDate, setMonthDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const weeks = buildMonthGrid(monthDate);
  const tasksByDate = {};
  tasks.filter((t) => canSeeTask(t, account)).forEach((t) => { if (t.scheduledDate) (tasksByDate[t.scheduledDate] = tasksByDate[t.scheduledDate] || []).push(t); });
  return (
    <>
      <div className="rail-title rail-cal-nav">
        <button className="icon-btn" onClick={() => setMonthDate(new Date(monthDate.getFullYear(), monthDate.getMonth() - 1, 1))}><ChevronRight size={15}/></button>
        <span>{MONTHS_HE[monthDate.getMonth()]} {monthDate.getFullYear()}</span>
        <button className="icon-btn" onClick={() => setMonthDate(new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1))}><ChevronLeft size={15}/></button>
      </div>
      <div className="mini-cal">
        <div className="mini-cal-grid">
          {WEEKDAYS_HE.map((d) => <span key={d} className="dow">{d}</span>)}
          {weeks.map((week, wi) => week.map((day, di) => {
            if (!day) return <span key={`${wi}-${di}`} />;
            const iso = isoDate(day);
            const dTasks = tasksByDate[iso] || [];
            const isToday = iso === isoDate(today);
            const isSelected = iso === selectedDate;
            const zoneColors = [...new Set(dTasks.map((t) => ZONES.find(z=>z.id===t.zone)?.color))].slice(0, 3);
            return (
              <span key={iso} className={"day" + (isToday ? " today" : "") + (isSelected ? " selected" : "")} onClick={() => onPick(iso)} role="button" tabIndex={0}>
                {day.getDate()}
                {zoneColors.map((c, i) => <span key={i} className="d" style={{ background: c }} />)}
              </span>
            );
          }))}
        </div>
      </div>
    </>
  );
}

function DriversRail({ tasks, account }) {
  const todayISO = isoDate(new Date());
  const todayTasks = tasks.filter((t) => canSeeTask(t, account) && t.scheduledDate === todayISO && t.driver);
  const byDriver = {};
  todayTasks.forEach((t) => {
    if (!byDriver[t.driver]) byDriver[t.driver] = { count: 0, zones: new Set() };
    byDriver[t.driver].count++; byDriver[t.driver].zones.add(t.zone);
  });
  const drivers = Object.entries(byDriver);
  return (
    <>
      <div className="rail-title">נהגים היום</div>
      {drivers.length === 0 ? <p className="muted small">אין נהגים משויכים להיום.</p> : (
        <div className="driver-list">
          {drivers.map(([name, d]) => (
            <div key={name} className="driver-row">
              <div className="driver-avatar">{name.slice(0, 2)}</div>
              <div><div className="driver-name">{name}</div><div className="driver-meta">{d.count} משימות · {[...d.zones].join(", ")}</div></div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default function App() {
  const [tab, setTab] = useState("calendar");
  const [tasks, setTasks] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [config, setConfig] = useState(DEFAULT_CALC_CONFIG);
  const [accounts, setAccounts] = useState(DEFAULT_ACCOUNTS);
  const [account, setAccount] = useState(null);
  const [ready, setReady] = useState(false);
  const [scheduleDate, setScheduleDate] = useState(isoDate(new Date()));
  const [assignMode, setAssignMode] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTaskDetail, setSearchTaskDetail] = useState(null);
  const nextNumberRef = useRef(4137);

  useEffect(() => {
    Promise.all([loadTasks(), loadTransfers(), loadCalcConfig(), loadNextNumber(), loadAccounts(), loadSession()]).then(([t, tr, c, n, ac, sessionId]) => {
      setTasks(t); setTransfers(tr); setConfig(c); nextNumberRef.current = n; setAccounts(ac);
      if (sessionId) { const acc = ac.find((a) => a.id === sessionId); if (acc) setAccount(acc); }
      setReady(true);
    });
  }, []);

  useEffect(() => {
    document.title = "צמר שטיחים יפים";
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.type = "image/png";
    link.href = FAVICON_DATA_URI;
  }, []);
  const updateTasks = (next) => { saveTasks(next, tasks); setTasks(next); };
  const getNextNumber = () => { const n = nextNumberRef.current; nextNumberRef.current = n + 1; saveNextNumber(n + 1); return n; };
  const pickCalendarDate = (iso) => { setScheduleDate(iso); setTab("calendar"); };
  const startAssign = (type) => { setAssignMode({ date: scheduleDate }); setTab((type === "general" || type === "branch") ? "tasks" : "ops"); };
  const cancelAssign = () => setAssignMode(null);
  const assignPick = (taskId) => {
    updateTasks(tasks.map((t) => t.id === taskId ? { ...t, scheduledDate: assignMode.date, log: [...t.log, { ts: new Date().toISOString(), action: "תוזמן ליום", note: assignMode.date }] } : t));
    setAssignMode(null); setTab("calendar");
  };
  const quickAssignToSchedule = (taskId) => {
    updateTasks(tasks.map((t) => t.id === taskId ? { ...t, scheduledDate: scheduleDate, log: [...t.log, { ts: new Date().toISOString(), action: "נוסף ללו״ז עבודה", note: scheduleDate }] } : t));
  };
  const openFromSearch = (task) => { setSearchTaskDetail(task); setSearchOpen(false); };
  const openTransfersFromSearch = () => { setTab("transfers"); setSearchOpen(false); };
  const logout = () => { setAccount(null); setTab("calendar"); clearSession(); };
  const handleLogin = (acc) => { setAccount(acc); saveSession(acc.id); };

  const meta = PAGE_META[tab];
  const visibleTasks = account ? tasks.filter((t) => canSeeTask(t, account)) : [];
  const pendingCount = tasks.filter((t) => t.pending).length + transfers.filter((t) => t.pending).length;
  const isAdmin = account?.role === "admin" || account?.role === "manager";
  const driverNames = accounts.filter((a) => a.role === "driver").map((a) => a.name);
  const counts = {
    tasks: visibleTasks.filter((t) => t.type === "general").length,
    ops: visibleTasks.filter((t) => t.type === "cleaning" || t.type === "repair").length,
    transfers: transfers.filter((t) => !t.pending || isAdmin || t.submittedBy === account?.name).length,
    approvals: pendingCount,
  };
  const visibleTabs = TABS.filter((t) => tabAllowed(account, t.id) && (t.id !== "calendar" || isAdmin || account?.canViewAllTasks) && (!t.adminOnly || isAdmin));

  if (!ready) return <div className="app-root"><style>{CSS}</style><div className="empty-state"><span className="muted">טוען נתונים...</span></div></div>;
  if (!account) return <LoginScreen accounts={accounts} onLogin={handleLogin} />;
  if (account.role === "driver") return <DriverApp account={account} tasks={tasks} updateTasks={updateTasks} onLogout={logout} />;

  return (
    <div dir="rtl" className="app-root">
      <style>{CSS}</style>
      <div className={"shell" + (tab === "calc" ? " no-rail" : "")}>
        {tab === "calc" ? (
          <button className="mobile-hamburger-float" onClick={() => setMobileMenuOpen(true)}><Menu size={20}/></button>
        ) : (
          <div className="mobile-topbar">
            <button className="icon-btn" onClick={() => setMobileMenuOpen(true)}><Menu size={22}/></button>
            <img src={LOGO_DATA_URI} alt="צמר שטיחים יפים" className="brand-logo-img" style={{ height: 22 }} />
            <span className="brand-name" style={{ fontSize: 16 }}>צמר שטיחים יפים</span>
          </div>
        )}
        {mobileMenuOpen && <div className="mobile-backdrop" onClick={() => setMobileMenuOpen(false)} />}

        <aside className={"sidebar" + (mobileMenuOpen ? " open" : "")}>
          <div className="sb-brand-row">
            <div className="sb-brand">
              <img src={LOGO_DATA_URI} alt="צמר שטיחים יפים" className="sb-brand-logo" />
              <span className="brand-name">צמר שטיחים יפים</span>
              <span className="brand-sub">תפעול · {account.name}</span>
            </div>
            <button className="icon-btn sidebar-close" onClick={() => setMobileMenuOpen(false)}><X size={20}/></button>
          </div>
          <div className="sb-item search-item" onClick={() => { setSearchOpen(true); setMobileMenuOpen(false); }}><Search className="ic" size={18}/>חיפוש</div>
          <nav className="sb-nav">
            {visibleTabs.map((t) => { const Icon = t.icon; const c = counts[t.id]; return (
              <div key={t.id} className={"sb-item" + (tab === t.id ? " active" : "")} onClick={() => { setTab(t.id); setMobileMenuOpen(false); }}>
                <Icon className="ic" size={18}/>{t.label}{c > 0 && <span className="count">{c}</span>}
              </div>
            ); })}
          </nav>
          <div className="sb-spacer" />
          {isAdmin && <div className={"sb-item settings" + (tab === "admin" ? " active" : "")} onClick={() => { setTab("admin"); setMobileMenuOpen(false); }}><Settings className="ic" size={18}/>ניהול</div>}
          <div className="sb-item logout-item" onClick={logout}><X className="ic" size={18}/>התנתקות</div>
        </aside>

        <main className="main">
          {tab !== "calc" && (
            <div className="main-top">
              <div><div className="page-title">{meta.title}</div><div className="page-sub">{meta.sub}</div></div>
            </div>
          )}

          {tab === "tasks" ? <TasksTab key="tasks" tasks={tasks} updateTasks={updateTasks} scope="general" assignMode={assignMode} onAssignPick={assignPick} onCancelAssign={cancelAssign} account={account} driverNames={driverNames} quickAssignDate={scheduleDate} onQuickAssign={quickAssignToSchedule} /> :
           tab === "ops" ? <TasksTab key="ops" tasks={tasks} updateTasks={updateTasks} scope="ops" getNextNumber={getNextNumber} assignMode={assignMode} onAssignPick={assignPick} onCancelAssign={cancelAssign} account={account} driverNames={driverNames} quickAssignDate={scheduleDate} onQuickAssign={quickAssignToSchedule} /> :
           tab === "calc" ? <CalculatorTab config={config} /> :
           tab === "intake" ? <CarpetIntakeTab tasks={tasks} updateTasks={updateTasks} /> :
           tab === "transfers" ? <TransfersTab transfers={transfers} setTransfers={setTransfers} account={account} /> :
           tab === "approvals" ? (isAdmin ? <Approvals tasks={tasks} updateTasks={updateTasks} transfers={transfers} setTransfers={setTransfers} getNextNumber={getNextNumber} /> : null) :
           tab === "calendar" ? <CalendarTab tasks={tasks} updateTasks={updateTasks} selectedDate={scheduleDate} onSelectDate={setScheduleDate} onStartAssign={startAssign} config={config} account={account} driverNames={driverNames} getNextNumber={getNextNumber} /> :
           isAdmin ? <ManagementArea config={config} setConfig={setConfig} accounts={accounts} setAccounts={setAccounts} /> : null}
        </main>

        {tab !== "calc" && (
          <aside className="rail">
            <MiniCalendarRail tasks={tasks} onPick={pickCalendarDate} selectedDate={scheduleDate} account={account} />
            <DriversRail tasks={tasks} account={account} />
          </aside>
        )}
      </div>

      {searchOpen && <SearchModal tasks={visibleTasks} transfers={transfers.filter((t) => !t.pending || isAdmin || t.submittedBy === account.name)} onClose={() => setSearchOpen(false)} onOpenTask={openFromSearch} onOpenTransfers={openTransfersFromSearch} />}
      {searchTaskDetail && <TaskDetail task={searchTaskDetail} onClose={() => setSearchTaskDetail(null)} onUpdate={(t) => { updateTasks(tasks.map((x) => x.id === t.id ? t : x)); setSearchTaskDetail(t); }} driverNames={driverNames} />}
    </div>
  );
}

/* ============================= CSS ============================= */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@500;600;700;800&family=Assistant:wght@400;500;600;700&family=Heebo:wght@400;500;600;700;800&family=JetBrains+Mono:wght@600;700&display=swap');

* { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
.app-root { font-family: 'Assistant', sans-serif; background: #F0ECDE; color: #15161A; min-height: 100vh; }
.muted { color: #8A8677; }
.small { font-size: 12px; }

/* פוקוס גלוי לכל אלמנט הניתן למיקוד — חשוב לניווט במקלדת חיצונית באייפד/מקלדת Bluetooth */
button:focus-visible, a:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible, [tabindex]:focus-visible {
  outline: 2px solid #2B4A5E; outline-offset: 2px;
}
button, .sb-item, .chip, a { touch-action: manipulation; }

.shell { display:grid; grid-template-columns: 220px 1fr 270px; min-height: 100vh; }
.shell.no-rail { grid-template-columns: 220px 1fr; }

/* sidebar */
.sidebar { background:#fff; border-left:1px solid #DED5BF; padding:20px 12px; display:flex; flex-direction:column; position:sticky; top:0; height:100vh; overflow-y:auto; }
.sb-brand { padding:8px 10px 22px; }
.sb-brand-logo { display:block; height:26px; width:auto; margin-bottom:9px; }
.brand-logo-img { width:auto; display:block; }
.sb-brand-row { display:flex; align-items:center; justify-content:space-between; }
.sidebar-close { display:none; }
.mobile-topbar { display:none; }
.mobile-hamburger-float { display:none; }
.mobile-backdrop { display:none; }
.sb-brand .brand-name { font-family:'Rubik',sans-serif; font-weight:800; font-size:15.5px; display:block; }
.sb-brand .brand-sub { font-size:11px; color:#8A8677; font-weight:500; }
.sb-nav { display:flex; flex-direction:column; gap:1px; }
.sb-item { display:flex; align-items:center; gap:10px; padding:10px 11px; border-radius:9px; color:#8A8677; font-size:13px; font-weight:600; cursor:pointer; }
.sb-item .ic { flex-shrink:0; }
.sb-item:hover:not(.disabled) { background:#F0ECDE; }
.sb-item.active { background:#15161A; color:#fff; }
.sb-item .count { margin-right:auto; font-size:10px; font-weight:700; color:#AEB0B5; background:#F0ECDE; padding:1px 7px; border-radius:20px; }
.sb-item.active .count { color:#fff; background:#ffffff26; }
.sb-item.disabled { opacity:.4; cursor:not-allowed; }
.sb-spacer { flex:1; }
.sb-item.settings { border-top:1px solid #DED5BF; margin-top:8px; padding-top:14px; }
.sb-item.search-item { border:1px solid #DED5BF; margin-bottom:14px; background:#fff; }
.sb-item.logout-item { color:#B23B3B; margin-top:4px; }

.login-screen { min-height:100vh; display:flex; align-items:center; justify-content:center; background:#F0ECDE; font-family:'Assistant',sans-serif; }

.driver-app { min-height:100vh; background:#F0ECDE; font-family:'Assistant',sans-serif; padding:16px; padding-bottom:60px; max-width:560px; margin:0 auto; }
.driver-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; }
.driver-daynav { display:flex; align-items:center; justify-content:center; gap:14px; background:#fff; border:1px solid #DED5BF; border-radius:12px; padding:10px; margin-bottom:16px; font-weight:700; font-family:'Rubik',sans-serif; font-size:14px; }
.driver-progress { background:#fff; border:1px solid #DED5BF; border-radius:12px; padding:12px 14px; margin-bottom:18px; }
.driver-progress-top { display:flex; justify-content:space-between; align-items:center; font-size:13px; font-weight:700; margin-bottom:8px; }
.driver-progress-bar { height:7px; background:#F0ECDE; border-radius:99px; overflow:hidden; }
.driver-progress-fill { height:100%; background:#2E8B57; border-radius:99px; transition:width .25s ease; }
.driver-stop-num { display:inline-flex; align-items:center; justify-content:center; width:20px; height:20px; border-radius:50%; background:#15161A; color:#fff; font-size:11px; font-weight:800; margin-left:6px; }
.driver-card.done { opacity:.55; }
.driver-zone-block { margin-bottom:20px; }
.driver-zone-head { display:flex; align-items:center; gap:10px; margin-bottom:10px; }
.driver-card { background:#fff; border:1px solid #DED5BF; border-radius:14px; padding:14px 16px; margin-bottom:12px; }
.driver-card-top { display:flex; justify-content:space-between; align-items:flex-start; gap:8px; margin-bottom:6px; }
.driver-card-title { font-family:'Rubik',sans-serif; font-weight:800; font-size:15.5px; }
.driver-card-addr { display:flex; align-items:center; gap:5px; font-size:13px; color:#8A8677; margin-bottom:8px; }
.driver-time-alert { display:flex; gap:14px; flex-wrap:wrap; margin-bottom:9px; font-weight:700; font-size:12.5px; color:#B8862F; }
.driver-time-alert span { display:flex; align-items:center; gap:5px; }
.driver-card-actions { display:flex; gap:8px; margin:10px 0; }
.driver-action-btn { flex:1; display:flex; align-items:center; justify-content:center; gap:6px; padding:11px; border-radius:11px; font-weight:700; font-size:13px; text-decoration:none; }
.driver-action-btn.waze { background:#2B4A5E; color:#fff; }
.driver-action-btn.call { background:#F0ECDE; color:#15161A; border:1px solid #DED5BF; }
.driver-done-btn { width:100%; padding:12px; border-radius:11px; border:1.5px solid #2E8B57; color:#2E8B57; background:#fff; font-weight:700; font-size:13.5px; margin-top:6px; cursor:pointer; }
.driver-done-btn.done { background:#2E8B57; color:#fff; }
.driver-note-row { display:flex; gap:8px; margin-top:10px; }
.driver-photo-row { margin-top:12px; }
.driver-photo-row.single { display:block; }
.login-card { background:#fff; border:1px solid #DED5BF; border-radius:16px; padding:32px 28px; width:100%; max-width:340px; }

.accounts-list { display:flex; flex-direction:column; gap:8px; margin-bottom:14px; }
.pill-row-perm { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:14px; }
.account-row { display:flex; align-items:center; gap:10px; background:#fff; border:1px solid #DED5BF; border-radius:11px; padding:10px 12px; }
.approval-row { background:#fff; border:1px solid #DED5BF; border-radius:14px; padding:12px; }
.approval-btns { display:flex; gap:8px; }

/* main */
.main { padding:24px 28px; overflow-x:hidden; }
.main-top { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:18px; }
.page-title { font-family:'Rubik',sans-serif; font-weight:800; font-size:22px; letter-spacing:-.01em; }
.page-sub { font-size:12.5px; color:#8A8677; margin-top:3px; }

.stats-row { display:flex; gap:10px; margin-bottom:20px; }
.stat-card { flex:1; background:#fff; border:1px solid #DED5BF; border-radius:11px; padding:13px 15px; }
.stat-num { font-family:'Rubik',sans-serif; font-weight:800; font-size:22px; letter-spacing:-.02em; }
.stat-lbl { font-size:11px; color:#8A8677; font-weight:600; margin-top:2px; }
.stat-card.accent { background:#2B4A5E; color:#fff; }
.stat-card.accent .stat-lbl { color:#ffffffb0; }

/* right rail */
.rail { border-right:1px solid #DED5BF; padding:24px 20px; background:#fff; position:sticky; top:0; height:100vh; overflow-y:auto; }
.rail-title { font-family:'Rubik',sans-serif; font-weight:700; font-size:13px; margin-bottom:12px; text-transform:uppercase; letter-spacing:.03em; color:#8A8677; }
.mini-cal { background:#F0ECDE; border-radius:14px; padding:13px; margin-bottom:24px; }
.mini-cal-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:4px; text-align:center; }
.mini-cal-grid .dow { font-size:9.5px; color:#AEB0B5; font-weight:700; padding-bottom:4px; }
.mini-cal-grid .day { font-size:11.5px; font-weight:600; padding:5px 0; border-radius:7px; position:relative; color:#15161A; cursor:pointer; }
.mini-cal-grid .day:hover { background:#DED5BF; }
.mini-cal-grid .day.today { background:#2B4A5E; color:#fff; }
.mini-cal-grid .day.selected:not(.today) { box-shadow: inset 0 0 0 1.5px #2B4A5E; }
.rail-cal-nav { display:flex; align-items:center; justify-content:space-between; }
.rail-cal-nav .icon-btn { padding:3px; }
.mini-cal-grid .day .d { position:absolute; bottom:2px; left:50%; transform:translateX(-50%); width:3px; height:3px; border-radius:50%; }
.driver-list { display:flex; flex-direction:column; gap:8px; }
.driver-row { display:flex; align-items:center; gap:10px; padding:10px 12px; border:1px solid #DED5BF; border-radius:11px; }
.driver-avatar { width:30px; height:30px; border-radius:9px; background:#2B4A5E14; color:#2B4A5E; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px; font-family:'Rubik',sans-serif; }
.driver-name { font-size:12.5px; font-weight:700; }
.driver-meta { font-size:10.5px; color:#8A8677; }

@media (max-width: 900px) {
  .shell { grid-template-columns: 1fr; }
  .mobile-topbar { display:flex; align-items:center; gap:12px; position:sticky; top:0; z-index:25; background:#fff; padding:14px 16px; border-bottom:1px solid #DED5BF; }
  .mobile-hamburger-float { display:flex; align-items:center; justify-content:center; position:fixed; top:14px; right:16px; z-index:30; width:36px; height:36px; border-radius:50%; background:rgba(255,255,255,.14); backdrop-filter:blur(6px); border:1px solid rgba(255,255,255,.3); color:#fff; }
  .sidebar {
    position:fixed; top:0; right:0; height:100vh; width:270px; max-width:82vw;
    transform:translateX(100%); transition:transform .25s ease; z-index:45;
    flex-direction:column; overflow-y:auto; border-left:1px solid #DED5BF; border-bottom:none;
    box-shadow: -12px 0 30px rgba(21,22,26,.18);
  }
  .sidebar.open { transform:translateX(0); }
  .sidebar-close { display:flex; }
  .sb-nav { flex-direction:column; gap:1px; }
  .sb-item { white-space:normal; padding:10px 11px; }
  .sb-item .count { display:inline-block; }
  .sb-spacer { display:block; }
  .sb-item.settings { border-top:1px solid #DED5BF; margin-top:8px; padding-top:14px; }
  .mobile-backdrop { display:block; position:fixed; inset:0; background:rgba(15,16,20,.45); z-index:40; }
  .rail { display:none; }
  .main { padding:16px; }
  .calc-iframe-wrap { margin:-16px; }
}

.pill-group { display:flex; flex-wrap:wrap; gap:8px; margin-bottom: 12px; }
.pill-group.sm .pill { padding: 6px 12px; font-size: 12.5px; }
.pill { display:flex; align-items:center; gap:6px; background:#fff; border:1.5px solid #DED5BF; color:#8A8677; padding:9px 15px; border-radius:10px; font-weight:700; cursor:pointer; font-family:'Assistant',sans-serif; font-size: 13.5px; }
.pill-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }
.pill.active .pill-dot { box-shadow: 0 0 0 2px #ffffff40; }
.pill.active { border-color:#15161A; color:#fff; background:#15161A; }

.toolbar { display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:16px; flex-wrap:wrap; }
.filter-pair { display:grid; grid-template-columns: 1fr 1fr; gap:6px 20px; align-items:start; }
@media (max-width: 900px) {
  .filter-pair { grid-template-columns: 1fr; gap:0; }
}
.assign-banner { display:flex; align-items:center; justify-content:space-between; gap:10px; background:#2B4A5E; color:#fff; border-radius:11px; padding:11px 16px; margin-bottom:16px; font-size:13px; font-weight:600; }
.filters { display:flex; align-items:center; gap:8px; flex-wrap: wrap; }
.filters select { background:#fff; border:1px solid #DED5BF; color:#15161A; border-radius:8px; padding:7px 10px; font-family:'Assistant',sans-serif; font-size:13px; }

.btn-primary { display:flex; align-items:center; gap:6px; background:#2B4A5E; color:#fff; border:none; padding: 10px 16px; border-radius: 10px; font-weight:700; font-size: 14px; cursor:pointer; font-family:'Assistant',sans-serif; }
.btn-primary.small { padding: 7px 12px; font-size: 12.5px; }
.btn-primary:hover { background:#1D3446; }
.btn-primary:disabled { opacity:.4; cursor:not-allowed; }
.btn-ghost { display:flex; align-items:center; gap:6px; background:#fff; color:#2B4A5E; border:1px solid #2B4A5E55; padding: 9px 14px; border-radius: 10px; font-weight:600; font-size: 13.5px; cursor:pointer; font-family:'Assistant',sans-serif; margin-top:10px; text-decoration:none; }
.btn-ghost:hover { background:#2B4A5E0f; }
.btn-ghost.small { padding:6px 10px; font-size:12.5px; margin-top:0; }
.btn-ghost.danger { color:#B23B3B; border-color:#B23B3B55; }

.empty-state { display:flex; flex-direction:column; align-items:center; gap:10px; padding: 60px 0; text-align:center; }

.task-list { display:flex; flex-direction:column; gap:10px; }
.task-list.route-thread { position:relative; padding-left:18px; }
.task-list.route-thread::before { content:''; position:absolute; left:9px; top:10px; bottom:10px; width:0; border-left:2px dashed #B08968; }
.drag-row { position:relative; }
.drag-row::after { content:''; position:absolute; left:-18px; top:22px; width:12px; height:12px; border-radius:50%; background:#F0ECDE; border:2px solid #B08968; box-shadow: inset 0 0 0 2px #FAF7EE; }
.task-card { position:relative; display:flex; align-items:stretch; gap:14px; background:#fff; border:1px solid #DED5BF; border-radius: 13px; padding: 14px 16px; cursor:pointer; transition: border-color .15s ease, box-shadow .15s ease, transform .15s ease; overflow:hidden; }
.task-card::before { content:''; position:absolute; top:0; right:0; bottom:0; width:4px; background:var(--zone-color, transparent); }
.task-card:hover { transform:translateY(-1px); box-shadow: 0 8px 20px rgba(21,22,26,.08); }
.task-card.static { cursor:default; }

.time-col { flex-shrink:0; width:58px; display:flex; flex-direction:column; align-items:center; justify-content:center; border-left:1px solid #EFEDE6; padding-left:14px; }
.time-col .time { font-family:'JetBrains Mono',monospace; font-size:14px; font-weight:700; color:#15161A; font-variant-numeric:tabular-nums; line-height:1.1; text-align:center; }
.time-col .time.empty { color:#C9C6BC; font-size:12px; font-weight:600; }
.time-col .time.range { display:flex; flex-direction:column; align-items:center; font-size:11px; font-weight:700; line-height:1.2; }
.time-col .time.range i { display:block; width:1px; height:6px; background:#C9C6BC; margin:1px 0; font-style:normal; }
.time-col .type-icon { margin-top:6px; width:24px; height:24px; border-radius:7px; display:flex; align-items:center; justify-content:center; }

.body-col { flex:1; min-width:0; }
.body-top { display:flex; justify-content:space-between; align-items:flex-start; gap:8px; margin-bottom:6px; }
.body-top .name { font-family:'Heebo',sans-serif; font-size:14.5px; font-weight:700; }
.badge-group { display:flex; align-items:center; gap:5px; flex-shrink:0; flex-wrap:wrap; justify-content:flex-end; }
.zone-badge { flex-shrink:0; font-size:10.5px; font-weight:700; padding:3px 9px; border-radius:6px; white-space:nowrap; }
.status-badge { flex-shrink:0; font-size:10.5px; font-weight:700; padding:3px 9px; border-radius:6px; white-space:nowrap; }

.addr { font-size:12px; color:#8A8677; margin-bottom:4px; display:flex; align-items:center; gap:4px; }

.facts { display:flex; flex-wrap:wrap; gap:5px 14px; margin-top:6px; }
.fact { font-size:11px; color:#8A8677; }
.fact b { color:#15161A; font-weight:700; font-family:'JetBrains Mono',monospace; font-variant-numeric:tabular-nums; font-size:11px; }
.fact .lbl { color:#AFAB9E; margin-left:3px; }

.desc { margin-top:8px; font-size:12.5px; color:#3F3D38; background:#F7F6F2; border-radius:7px; padding:7px 10px; line-height:1.5; }

.task-card-top { display:flex; justify-content:space-between; align-items:center; font-weight:700; margin-bottom:6px; gap: 8px; }
.task-client { display:flex; align-items:center; gap:6px; font-family:'Rubik',sans-serif; }
.task-card-mid { display:flex; align-items:center; gap:5px; font-size:13px; margin-bottom:8px; }
.task-card-bottom { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }

.chip { border:1px solid; border-radius:999px; padding:3px 10px; font-size:12px; font-weight:700; white-space: nowrap; display:inline-flex; align-items:center; gap:3px; }

.modal-backdrop { position:fixed; inset:0; background:#15161A99; display:flex; align-items:center; justify-content:center; z-index: 50; padding: 16px; }
.modal { background:#FFFFFF; border:1px solid #DED5BF; border-radius:16px; width:100%; max-width:640px; max-height: 90vh; display:flex; flex-direction:column; overflow:hidden; }
.modal-head { display:flex; justify-content:space-between; align-items:center; padding:16px 18px; border-bottom:1px solid #DED5BF; background:#fff; }
.modal-head h2 { font-family:'Rubik',sans-serif; font-size:18px; margin:0; }
.modal-body { padding: 16px 18px; overflow-y:auto; }
.modal-foot { display:flex; justify-content:flex-end; gap:10px; padding: 14px 18px; border-top:1px solid #DED5BF; background:#fff; }

.icon-btn { background:transparent; border:none; color:#8A8677; cursor:pointer; padding:6px; border-radius:8px; }
.icon-btn:hover { background:#DED5BF; color:#15161A; }
.icon-btn.danger:hover { color:#B23B3B; }

.section-title { font-family:'Rubik',sans-serif; font-weight:700; font-size:14px; color:#2B4A5E; margin: 18px 0 10px; }
.form-grid { display:grid; grid-template-columns: 1fr 1fr; gap:10px 12px; }
.form-grid.three { grid-template-columns: repeat(3, 1fr); }
.field { display:flex; flex-direction:column; gap:5px; margin-bottom: 10px; }
.field-label { font-size:12px; color:#8A8677; }
.field input, .field select, .field textarea, select, input[type=text], input[type=number], input[type=date], input[type=password], textarea {
  background:#fff; border:1px solid #DED5BF; color:#15161A; border-radius:8px; padding:9px 10px; font-family:'Assistant',sans-serif; font-size:16px; width:100%; resize: vertical;
}
.field input:focus, .field select:focus, .field textarea:focus { outline:2px solid #2B4A5E55; border-color:#2B4A5E; }
.task-description { font-size:13.5px; line-height:1.5; color:#33343A; background:#fff; border:1px solid #DED5BF; border-radius:8px; padding:10px 12px; }

.carpet-row { background:#fff; border:1px solid #DED5BF; border-radius:12px; padding:12px; margin-bottom:10px; }
.carpet-row-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
.carpet-index { font-weight:700; font-size:13px; color:#8A8677; display:flex; align-items:center; gap:6px; }
.carpet-num-badge { background:#2B4A5E14; color:#2B4A5E; font-family:'Rubik',sans-serif; font-weight:700; font-size:11.5px; padding:2px 8px; border-radius:6px; }
.task-card-desc { font-size:13.5px; font-weight:600; color:#15161A; line-height:1.5; margin-bottom:9px; padding:8px 10px; background:#F0ECDE; border-right:3px solid #2B4A5E; border-radius:6px; display:-webkit-box; -webkit-line-clamp:4; -webkit-box-orient:vertical; overflow:hidden; }
.quick-assign-btn { display:flex; align-items:center; gap:3px; background:#F0ECDE; border:1px solid #DED5BF; color:#2B4A5E; border-radius:999px; padding:4px 10px; font-size:11px; font-weight:700; cursor:pointer; }
.quick-assign-btn.already { background:#E8F5EC; border-color:#2E8B5755; color:#2E8B57; }
.driver-today-box { display:flex; align-items:center; gap:10px; flex-wrap:wrap; background:#fff; border:1px solid #DED5BF; border-radius:11px; padding:10px 12px; margin-bottom:14px; }
.stepper { display:flex; align-items:center; gap:8px; font-family:'Rubik',sans-serif; font-weight:800; }
.stepper .icon-btn { border:1px solid #DED5BF; border-radius:7px; width:26px; height:26px; }
.reject-note { font-size:12px; font-weight:600; color:#B23B3B; background:#FBEAEA; border-radius:7px; padding:7px 10px; margin-bottom:9px; }
.reject-form { display:flex; gap:8px; align-items:center; margin-top:6px; flex-wrap:wrap; }
.reject-form input { flex:1; min-width:160px; }
.carpet-grid { display:grid; grid-template-columns: repeat(2, 1fr); gap:8px 10px; margin-bottom:10px; }
.extras-row { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:10px; }
.extra-pill { display:flex; align-items:center; gap:6px; background:#FAFAF9; border:1px solid #DED5BF; border-radius:999px; padding:6px 12px; font-size:12.5px; cursor:pointer; }
.extra-pill.active { background:#2B4A5E1a; border-color:#2B4A5E; }
.repair-cat { margin-bottom: 8px; }
.repair-cat-title { font-size: 11.5px; font-weight:700; color:#8A8677; margin: 8px 0 4px; text-transform: uppercase; letter-spacing: .04em; }

.carpet-summary-block { background:#fff; border:1px solid #DED5BF; border-radius:10px; padding:10px 12px; margin-bottom:8px; }
.carpet-summary-head { font-weight:700; font-family:'Rubik',sans-serif; font-size: 13.5px; margin-bottom: 3px; }

.error-box { display:flex; align-items:center; gap:6px; color:#B23B3B; background:#B23B3B12; border:1px solid #B23B3B40; border-radius:8px; padding:8px 12px; margin-top:10px; font-size:13px; }

.intake-box { background:#fff; border:1px solid #DED5BF; border-radius:14px; padding:18px; }
.intake-input { width:100%; border:1px solid #DED5BF; border-radius:10px; padding:11px 13px; font-size:16px; font-family:'Rubik',sans-serif; }
.intake-count { font-size:11px; font-weight:700; color:#8A8677; margin:14px 0 8px; }
.intake-chips { display:flex; flex-wrap:wrap; gap:8px; }
.intake-chip { display:inline-flex; align-items:center; gap:5px; padding:6px 12px; border-radius:999px; font-size:12.5px; font-weight:700; font-family:'Rubik',sans-serif; cursor:pointer; }
.intake-chip.matched { background:#2E8B5715; color:#2E8B57; }
.intake-chip.unmatched { background:#B23B3B15; color:#B23B3B; }
.intake-stats { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; margin-top:18px; }
.intake-stat { border-radius:12px; padding:14px; }
.intake-stat.success { background:#2E8B5712; }
.intake-stat.danger { background:#B23B3B12; }
.intake-stat-num { font-size:22px; font-weight:800; }
.intake-stat.success .intake-stat-num { color:#2E8B57; }
.intake-stat.danger .intake-stat-num { color:#B23B3B; }
.intake-stat-lbl { font-size:11.5px; color:#3F3D38; }

.detail-top { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:12px; }
.detail-info { display:flex; flex-direction:column; gap:6px; font-size:13.5px; margin-bottom:6px; }
.detail-info > div { display:flex; align-items:center; gap:7px; }
.detail-date-row input { width:auto; padding:5px 8px; font-size:12.5px; }
.waze-link { display:flex; align-items:center; gap:7px; color:#3B6FA0; font-weight:700; text-decoration:none; margin-top:4px; }

.status-buttons { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:8px; }
.status-btn { border:1.5px solid; border-radius:999px; padding:7px 13px; font-size:12.5px; font-weight:700; cursor:pointer; background:transparent; font-family:'Assistant',sans-serif; }
.note-input { margin-top:6px; }
.driver-row input { max-width: 260px; }

.photo-grid { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:6px; }
.photo-thumb { position:relative; width:64px; height:64px; border-radius:8px; overflow:hidden; border:1px solid #DED5BF; }
.photo-thumb img { width:100%; height:100%; object-fit:cover; }
.photo-remove { position:absolute; top:2px; left:2px; background:#15161Aaa; border:none; color:#fff; border-radius:6px; padding:2px; cursor:pointer; }
.photo-add { width:64px; height:64px; border:1.5px dashed #D0D2D6; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#8A8677; cursor:pointer; background:#fff; }
.photo-add:hover { border-color:#2B4A5E; color:#2B4A5E; }

.log-list { display:flex; flex-direction:column; gap:10px; }
.log-item { display:flex; gap:8px; align-items:flex-start; font-size:13px; }
.log-action { font-weight:600; }
.log-note { color:#8A8677; font-size:12.5px; }
.log-ts { font-size:11px; margin-top:2px; }

.detail-actions-float { position:fixed; bottom:18px; left:50%; transform:translateX(-50%); display:flex; gap:8px; z-index:60; background:#fff; border:1px solid #DED5BF; padding:8px; border-radius:12px; box-shadow: 0 4px 16px #15161A20; }

.paste-preview { display:flex; align-items:center; gap:6px; font-size:12.5px; color:#8A8677; background:#fff; border:1px solid #DED5BF; border-radius:8px; padding:8px 10px; margin-top:4px; }
.draft-table-wrap { margin-bottom:10px; }

.transfer-table-wrap { background:#fff; border:1px solid #DED5BF; border-radius:10px; overflow:hidden; overflow-x:auto; }
.transfer-table { width:100%; border-collapse:collapse; font-size:12.5px; }
.transfer-table thead tr { background:#15161A; }
.transfer-table th { color:#fff; text-align:right; font-weight:700; font-size:11.5px; padding:9px 12px; white-space:nowrap; }
.transfer-table tbody tr { border-bottom:1px solid #DED5BF; }
.transfer-table tbody tr:last-child { border-bottom:none; }
.transfer-table tbody tr:nth-child(even) { background:#F7F6F2; }
.transfer-table tbody tr.row-pending { background:#B8862F0D; }
.transfer-table tbody tr.row-rejected { background:#B23B3B0D; }
.transfer-table td { padding:4px 8px; vertical-align:middle; }
.transfer-table td.tt-num input { width:78px; font-family:'Rubik',sans-serif; font-weight:700; }
.transfer-table td.tt-name { min-width:180px; }
.transfer-table td.tt-name .chip { margin-inline-start:6px; }
.transfer-table td.tt-size input { width:90px; }
.transfer-table td.tt-notes input { min-width:120px; }
.transfer-table td.tt-status select { width:auto; padding:5px 8px; font-size:12px; }
.transfer-table td.tt-del { width:32px; padding:4px 6px; }
.transfer-table td input, .transfer-table td select {
  background:transparent; border:1px solid transparent; border-radius:6px; padding:6px 7px; font-size:12.5px; width:100%;
}
.transfer-table td input:hover, .transfer-table td select:hover { border-color:#DED5BF; }
.transfer-table td input:focus, .transfer-table td select:focus { outline:none; border-color:#2B4A5E; background:#fff; }

.group-reassign-select { font-size:11px; padding:3px 8px; border-radius:999px; border:1px dashed #DED5BF; background:transparent; color:#8A8677; max-width:130px; cursor:pointer; }
.group-reassign-select:hover { border-color:#2B4A5E; color:#2B4A5E; }
.task-driver-inline { display:flex; align-items:center; justify-content:flex-end; gap:6px; margin-top:5px; }
.task-driver-inline select { border:1px solid #DED5BF; border-radius:999px; padding:3px 8px; font-size:11.5px; background:#FAFAF9; color:#3F3D38; max-width:130px; }
.remove-day-btn { display:flex; align-items:center; justify-content:center; background:transparent; border:1px solid #DED5BF; color:#8A8677; border-radius:50%; width:26px; height:26px; flex-shrink:0; cursor:pointer; }
.remove-day-btn:hover { border-color:#B23B3B; color:#B23B3B; }

.inline-driver-controls { display:inline-flex; align-items:center; gap:5px; }
.inline-driver-controls select { border:1px solid #DED5BF; border-radius:999px; padding:2px 7px; font-size:10.5px; background:#FAFAF9; color:#3F3D38; max-width:100px; }
.inline-driver-controls .remove-day-btn { width:22px; height:22px; }

/* מתחת ל-900px (סרגל צד קורס לתפריט המבורגר) — הבקרות עוברות לשורה קומפקטית מתחת לכרטיס במקום להצטופף ליד התגים */
.desktop-only { display:inline-flex; }
.mobile-only { display:none; }
@media (max-width: 900px) {
  .desktop-only { display:none !important; }
  .mobile-only { display:flex !important; }
}
.drag-row { display:flex; align-items:flex-start; gap:6px; }
.drag-handle { cursor:grab; padding:14px 2px 0; flex-shrink:0; touch-action:none; }
.drag-row:active .drag-handle { cursor:grabbing; }
.gmaps-btn { display:flex; align-items:center; gap:6px; background:#fff; border:1.5px solid #4285F4; color:#4285F4; padding:7px 14px; border-radius:999px; font-weight:700; font-size:12.5px; text-decoration:none; }
.gmaps-btn:hover { background:#4285F41a; }

.zone-block { margin-bottom: 22px; }
.zone-block-head { display:flex; align-items:center; gap:10px; margin-bottom:10px; flex-wrap: wrap; }
.zone-dots { display:inline-flex; align-items:center; gap:4px; }
.zone-dot { width:9px; height:9px; border-radius:50%; display:inline-block; box-shadow:0 0 0 2px #fff; }

.pick-row { display:flex; align-items:center; gap:10px; background:#fff; border:1px solid #DED5BF; border-radius:10px; padding:10px 12px; margin-bottom:8px; cursor:pointer; }
.pick-row.active { border-color:#2B4A5E; background:#2B4A5E0d; }
.pick-row-title { font-weight:700; font-family:'Rubik',sans-serif; }

.admin-lock { display:flex; flex-direction:column; align-items:center; gap:10px; padding: 60px 20px; text-align:center; }
.admin-lock-row { display:flex; gap:8px; }
.admin-lock-row input { width: 160px; }
.admin-repair-cat { font-size:12px; font-weight:700; color:#8A8677; margin: 10px 0 4px; text-transform: uppercase; letter-spacing:.04em; }

/* ─── iOS-style calendar ─── */
.ios-cal-header { display:flex; align-items:center; justify-content:space-between; margin-bottom: 10px; }
.ios-cal-title { font-family:'Rubik',sans-serif; font-weight:700; font-size: 17px; }
.ios-cal-weekdays { display:grid; grid-template-columns: repeat(7, 1fr); text-align:center; font-size:11.5px; color:#8A8677; font-weight:700; margin-bottom: 4px; }
.ios-cal-grid { display:grid; grid-template-columns: repeat(7, 1fr); gap: 2px; margin-bottom: 14px; }
.ios-cal-cell { height: 40px; border: none; background: #fff; border-radius: 8px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; cursor:pointer; font-family:'Assistant',sans-serif; }
.ios-cal-cell.empty { background: transparent; cursor: default; }
.ios-cal-cell.today .ios-cal-daynum { color: #2B4A5E; font-weight: 800; }
.ios-cal-cell.selected { background: #2B4A5E; }
.ios-cal-cell.selected .ios-cal-daynum { color: #fff; }
.ios-cal-daynum { font-size: 14px; font-weight: 600; }
.ios-cal-dots { display:flex; gap: 2px; height: 5px; }
.ios-cal-dot { width: 5px; height: 5px; border-radius: 50%; }
.ios-cal-agenda-head { display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom: 14px; flex-wrap:wrap; }
.cal-head-actions { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
.cal-head-actions .pill-group { margin-bottom:0; align-items:center; }
.cal-head-actions .btn-ghost.small { margin-top:0; }
.day-nav { display:flex; align-items:center; gap:10px; }
.add-type-row { display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:12px; }
.branch-quick-row { display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:18px; }
.print-controls { display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:14px; background:#fff; border:1px solid #DED5BF; border-radius:11px; padding:10px 12px; }
.ios-cal-agenda-date { font-family:'Rubik',sans-serif; font-weight:700; font-size: 16px; }

/* ─── Real calculator, own dark/gold design (ported) ─── */
.calc-iframe-wrap { margin: -24px -28px; }
.calc-real-iframe { width: 100%; height: 100vh; border: none; display: block; background: #030304; }
.calc-scope { font-family: 'Heebo', sans-serif; background: #0f0e0d; color: #f0ead8; border-radius: 16px; padding: 4px; margin: -18px -18px 0; }
.calc-wrapper { max-width: 640px; margin: 0 auto; padding: 28px 16px 40px; }
.calc-header { text-align:center; margin-bottom: 24px; }
.calc-logo-text h1 { font-size: 22px; font-weight: 800; background: linear-gradient(135deg,#e8c870,#c9a84c); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.calc-logo-text p { font-size: 12.5px; color: #8a7f6a; margin-top: 2px; }
.calc-header-divider { height:1px; background: linear-gradient(90deg,transparent,#7a6330,transparent); max-width: 400px; margin: 14px auto 0; }
.calc-tabs { display:flex; background:#1a1815; border:1px solid #2e2a22; border-radius:50px; padding:4px; margin-bottom:22px; gap:4px; }
.calc-tab-btn { flex:1; padding:10px; border:none; background:transparent; color:#8a7f6a; font-family:'Heebo',sans-serif; font-size:14px; font-weight:600; border-radius:46px; cursor:pointer; }
.calc-tab-btn.active { background: linear-gradient(135deg,#c9a84c,#a8782a); color:#0f0e0d; }
.calc-list { display:flex; flex-direction:column; gap:16px; }
.calc-card { background:#1a1815; border:1px solid #2e2a22; border-radius:14px; padding:20px; }
.calc-card-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; }
.calc-num { font-size:11px; font-weight:700; color:#c9a84c; text-transform:uppercase; letter-spacing:1.5px; }
.remove-btn { width:26px; height:26px; border:1px solid #2e2a22; background:transparent; color:#8a7f6a; border-radius:50%; cursor:pointer; }
.calc-dims-inputs, .calc-dims-row .calc-dims-inputs { display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom: 12px; }
.calc-field label { display:block; font-size:10.5px; font-weight:700; color:#8a7f6a; margin-bottom:5px; }
.calc-field input { width:100%; background:#232018; border:1px solid #2e2a22; border-radius:8px; color:#f0ead8; font-family:'Heebo',sans-serif; font-size:15px; font-weight:700; padding:9px 11px; }
.calc-area-info { grid-column: 1/-1; background:#232018; border:1px solid #2e2a22; border-radius:8px; padding:7px 10px; text-align:center; }
.calc-area-lbl { font-size:9.5px; color:#8a7f6a; display:block; }
.calc-area-val { font-size:15px; font-weight:800; color:#c9a84c; }
.calc-bill-note { font-size:11px; color:#d4763b; margin: -4px 0 10px; padding:6px 10px; background: rgba(212,118,59,.08); border-radius:6px; border:1px solid rgba(212,118,59,.25); }
.calc-type-grid { display:grid; grid-template-columns: repeat(3,1fr); gap:8px; margin-bottom:14px; }
.calc-type-opt { position:relative; padding:10px 6px; background:#232018; border:1px solid #2e2a22; border-radius:8px; cursor:pointer; text-align:center; }
.calc-type-opt input { position:absolute; opacity:0; }
.calc-type-opt.checked { border-color:#c9a84c; background: rgba(201,168,76,.1); }
.calc-type-name { font-size:11.5px; font-weight:600; color:#8a7f6a; display:block; }
.calc-type-opt.checked .calc-type-name { color:#e8c870; }
.calc-type-price { font-size:10.5px; color:#554e3e; display:block; margin-top:2px; }
.calc-type-opt.checked .calc-type-price { color:#c9a84c; }
.calc-services-title { font-size:10.5px; font-weight:700; color:#8a7f6a; letter-spacing:.5px; margin-bottom:8px; }
.calc-services-grid { display:grid; grid-template-columns: 1fr 1fr; gap:7px; margin-bottom:14px; }
.calc-svc-opt { position:relative; display:flex; align-items:center; gap:8px; padding:9px 11px; background:#232018; border:1px solid #2e2a22; border-radius:8px; cursor:pointer; }
.calc-svc-opt input { position:absolute; opacity:0; }
.calc-svc-opt.checked { border-color:#7a6330; background: rgba(201,168,76,.07); }
.calc-chk { width:16px; height:16px; border:1.5px solid #2e2a22; border-radius:4px; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:10px; color:transparent; }
.calc-svc-opt.checked .calc-chk { background:#c9a84c; border-color:#c9a84c; color:#000; }
.calc-svc-name { font-size:11.5px; font-weight:500; color:#f0ead8; display:block; }
.calc-svc-price { font-size:9.5px; color:#8a7f6a; display:block; }
.calc-subtotal { background: linear-gradient(135deg, rgba(201,168,76,.08), rgba(212,118,59,.05)); border:1px solid #7a6330; border-radius:8px; padding:10px 14px; display:flex; justify-content:space-between; align-items:center; margin-top: 12px; }
.calc-subtotal-amt { font-size:19px; font-weight:800; color:#e8c870; }
.calc-add-btn { display:flex; align-items:center; justify-content:center; width:100%; padding:12px; background:transparent; border:1.5px dashed #2e2a22; border-radius:14px; color:#8a7f6a; font-family:'Heebo',sans-serif; font-size:13px; font-weight:600; cursor:pointer; margin-top: 12px; }
.calc-add-btn:hover { border-color:#7a6330; color:#c9a84c; }
.calc-delivery-section { background:#1a1815; border:1px solid #2e2a22; border-radius:14px; padding:20px; margin-top:16px; }
.calc-delivery-section h3 { font-size:11.5px; font-weight:700; color:#8a7f6a; letter-spacing:.5px; margin-bottom:12px; }
.calc-delivery-grid { display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:12px; }
.calc-delivery-opt { position:relative; display:flex; align-items:center; gap:10px; padding:12px 13px; background:#232018; border:1px solid #2e2a22; border-radius:8px; cursor:pointer; }
.calc-delivery-opt input { position:absolute; opacity:0; }
.calc-delivery-opt.checked { border-color:#c9a84c; background: rgba(201,168,76,.1); }
.calc-delivery-icon { font-size:18px; }
.calc-delivery-name { font-size:12.5px; font-weight:600; color:#f0ead8; display:block; }
.calc-delivery-desc { font-size:10.5px; color:#8a7f6a; display:block; }
.calc-branch-row label { font-size:10.5px; color:#8a7f6a; font-weight:700; display:block; margin-bottom:6px; }
.calc-branch-row select { width:100%; background:#232018; border:1px solid #2e2a22; border-radius:8px; color:#f0ead8; font-family:'Heebo',sans-serif; font-size:13px; padding:9px 11px; }
.calc-total-panel { margin-top:18px; background: linear-gradient(135deg,#1f1c14,#181510); border:1px solid #7a6330; border-radius:14px; padding:22px; }
.calc-total-rows { display:flex; flex-direction:column; gap:9px; margin-bottom:14px; }
.calc-total-row { display:flex; justify-content:space-between; font-size:12.5px; color:#8a7f6a; }
.calc-total-row span:last-child { color:#f0ead8; font-weight:600; }
.calc-total-row.disc span:last-child { color:#4caf74; }
.calc-total-row.del span:last-child { color:#d4763b; }
.calc-total-divider { height:1px; background: linear-gradient(90deg,transparent,#7a6330,transparent); margin:4px 0 12px; }
.calc-total-main { display:flex; justify-content:space-between; align-items:baseline; }
.calc-total-main span:first-child { font-size:14px; font-weight:700; color:#f0ead8; }
.calc-total-amount { font-size:32px; font-weight:800; background: linear-gradient(135deg,#e8c870,#c9a84c); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.calc-total-vat { font-size:10.5px; color:#554e3e; text-align:left; margin-top:4px; }
.calc-min-notice { margin-top:10px; padding:9px 13px; background: rgba(212,118,59,.1); border:1px solid rgba(212,118,59,.35); border-radius:8px; font-size:11.5px; color:#d4763b; }
.calc-action-row { display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-top:16px; }
.calc-print-btn, .calc-wa-btn { display:flex; align-items:center; justify-content:center; gap:6px; padding:11px; border:1px solid #2e2a22; border-radius:12px; background:transparent; color:#8a7f6a; font-family:'Heebo',sans-serif; font-size:12.5px; font-weight:600; cursor:pointer; }
.calc-print-btn:hover, .calc-wa-btn:hover { border-color:#554e3e; color:#f0ead8; }
.calc-summary-note { font-size:10.5px; color:#554e3e; text-align:center; margin-top:12px; }
.calc-rsvc-category { font-size:9.5px; font-weight:700; color:#554e3e; letter-spacing:1.5px; text-transform:uppercase; padding:10px 0 5px; border-top:1px solid #2e2a22; }
.calc-rsvc-category:first-child { border-top:none; padding-top:0; }
.calc-rsvc-opt { display:flex; align-items:center; justify-content:space-between; padding:8px 11px; background:#232018; border:1px solid #2e2a22; border-radius:8px; cursor:pointer; margin-bottom: 7px; gap:10px; }
.calc-rsvc-opt.checked { border-color:#d4763b; background: rgba(212,118,59,.08); }
.calc-rsvc-left { display:flex; align-items:center; gap:8px; font-size:11.5px; color:#f0ead8; }
.calc-rsvc-left input { position:absolute; opacity:0; }
.calc-rsvc-check { width:16px; height:16px; border:1.5px solid #2e2a22; border-radius:4px; display:flex; align-items:center; justify-content:center; font-size:10px; color:transparent; flex-shrink:0; }
.calc-rsvc-opt.checked .calc-rsvc-check { background:#d4763b; border-color:#d4763b; color:#fff; }
.calc-rsvc-badge { font-size:10px; color:#8a7f6a; background:#0f0e0d; border:1px solid #2e2a22; border-radius:4px; padding:2px 7px; white-space:nowrap; }
.calc-rsvc-opt.checked .calc-rsvc-badge { color:#d4763b; border-color:#d4763b; }
.calc-side-selector { margin: 4px 0 10px; padding:10px 12px; background:#232018; border:1px solid #2e2a22; border-radius:8px; }
.calc-side-title { font-size:9.5px; font-weight:700; color:#8a7f6a; letter-spacing:.5px; margin-bottom:8px; }
.calc-sides-grid { display:grid; grid-template-columns: repeat(4,1fr); gap:5px; }
.calc-sides-grid.two { grid-template-columns: repeat(2,1fr); }
.calc-side-btn { padding:6px 4px; background:#1a1815; border:1px solid #2e2a22; border-radius:6px; cursor:pointer; text-align:center; font-size:10.5px; font-weight:600; color:#8a7f6a; }
.calc-side-btn.active { border-color:#d4763b; background: rgba(212,118,59,.12); color:#d4763b; }
.calc-side-m { font-size:9.5px; color:#554e3e; display:block; font-weight:400; }

.print-manifest { display:none; }
.print-header { margin-bottom:16px; padding-bottom:10px; border-bottom:2px solid #15161A; }
.print-manifest h2 { font-family:'Rubik',sans-serif; font-size:19px; margin-bottom:4px; }
.print-header-meta { font-size:12px; color:#8A8677; }
.print-zone { break-inside: avoid; margin-bottom: 20px; }
.print-zone h3 { font-family:'Rubik',sans-serif; font-weight:800; font-size:14px; background:#15161A; color:#fff; padding:6px 10px; border-radius:7px; margin-bottom:10px; display:flex; align-items:center; gap:6px; }
.print-zone-count { font-weight:500; opacity:.75; font-size:12px; }
.print-stop { break-inside: avoid; padding:9px 10px; border:1px solid #D8D5CC; border-radius:8px; font-size:12.5px; line-height:1.55; margin-bottom:8px; }
.print-stop-head { display:flex; align-items:center; gap:8px; flex-wrap:wrap; font-weight:700; font-size:13.5px; margin-bottom:5px; }
.print-stop-num { flex-shrink:0; width:20px; height:20px; border-radius:50%; background:#15161A; color:#fff; font-size:11px; font-weight:800; display:inline-flex; align-items:center; justify-content:center; }
.print-stop-name { font-family:'Rubik',sans-serif; }
.print-type { font-weight:600; color:#8A8677; font-size:11px; border:1px solid #D8D5CC; border-radius:5px; padding:1px 6px; }
.print-status { font-weight:600; font-size:11px; color:#15161A; background:#F0ECDE; border-radius:5px; padding:1px 6px; }
.print-pending { font-weight:700; font-size:11px; color:#B8862F; }
.print-stop-facts { display:flex; flex-wrap:wrap; gap:4px 14px; color:#3F3D38; margin-bottom:4px; }
.print-addr { margin-bottom:3px; }
.print-time-alert { font-weight:700; margin-bottom:3px; }
.print-carpet, .print-desc { margin-top:3px; }
.print-desc { background:#F7F6F2; border-radius:5px; padding:5px 8px; }
.print-rejected { color:#B23B3B; font-weight:600; margin-top:3px; }

.print-transfers { display:none; }
.print-transfers h2 { font-family:'Rubik',sans-serif; font-size:19px; margin-bottom:4px; }
.print-transfers-meta { font-size:12px; color:#8A8677; margin-bottom:16px; padding-bottom:10px; border-bottom:2px solid #15161A; }
.print-tr-table { width:100%; border-collapse:collapse; font-size:12px; }
.print-tr-table th { text-align:right; font-family:'Rubik',sans-serif; font-size:11px; text-transform:uppercase; letter-spacing:.03em; color:#8A8677; border-bottom:2px solid #15161A; padding:6px 8px; }
.print-tr-table td { border-bottom:1px solid #DED5BF; padding:7px 8px; vertical-align:top; }

@media (max-width: 560px) {
  .form-grid, .form-grid.three, .carpet-grid, .calc-type-grid, .calc-services-grid, .calc-delivery-grid, .calc-action-row { grid-template-columns: 1fr; }
  .transfer-table th, .transfer-table td { padding:6px; }
  .calc-sides-grid { grid-template-columns: 1fr 1fr; }
  .modal { max-height: 95vh; }
  .icon-btn, .remove-day-btn { min-width:44px; min-height:44px; display:inline-flex; align-items:center; justify-content:center; }
}
@media print {
  .sidebar, .rail, .main-top, .btn-ghost, .btn-primary, .calc-tabs, .calc-add-btn, .calc-action-row, .ios-cal-agenda, .filter-label, .pill-group, .draft-table-wrap, .transfer-table-wrap, .toolbar, .pill-group, .empty-state { display: none !important; }
  .print-manifest, .print-transfers { display:block !important; }
  .shell { display:block !important; }
  .main { padding:0 !important; }
}
`;

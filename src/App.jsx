import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Plus, X, Camera, MapPin, Phone, Calendar as CalIcon, ChevronLeft, ChevronRight,
  Edit2, Trash2, Filter, Clock, Truck, Save, AlertCircle,
  ClipboardList, Calculator as CalcIcon, User, ArrowLeftRight,
  ClipboardPaste, Route, FileText, Lock, Unlock, Settings, Printer, Car,
  Wrench, Sparkles, MessageCircle, Building2, GripVertical, Search, ChevronUp, ChevronDown, CheckCircle2, Menu
} from "lucide-react";

/* ============================= קבועים כלליים ============================= */

const ZONES = [
  { id: "צפון", label: "צפון", color: "#3B6FA0" },
  { id: "מרכז", label: "מרכז", color: "#33397A" },
  { id: "דרום", label: "דרום", color: "#1F6F63" },
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

const STATUS_FLOW = [
  { id: "התקבל", label: "התקבל", color: "#6B6E76" },
  { id: "נאסף", label: "נאסף מהלקוח", color: "#3B6FA0" },
  { id: "בטיפול", label: "בטיפול", color: "#B8862F" },
  { id: "מוכן", label: "מוכן", color: "#2E8B57" },
  { id: "ממתין_להעברה", label: "ממתין להעברה", color: "#7B4FA0" },
  { id: "נמסר", label: "נמסר ללקוח", color: "#33343A" },
];
const statusMeta = (id) => STATUS_FLOW.find((s) => s.id === id) || STATUS_FLOW[0];

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
  if (task.pending) return fullAccess || task.submittedBy === account.name;
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
function PillGroup({ options, value, onChange, size }) {
  return (
    <div className={"pill-group" + (size === "sm" ? " sm" : "")}>
      {options.map((o) => {
        const Icon = o.icon;
        return (
          <button key={o.id} type="button" className={"pill" + (value === o.id ? " active" : "")} onClick={() => onChange(o.id)}>
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
        <Field label="מספר"><input type="text" className="carpet-number-input" value={carpet.number ?? ""} onChange={(e) => set({ number: e.target.value })} placeholder="יוקצה אוטומטית בשמירה" /></Field>
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

function TaskForm({ initial, onSave, onCancel, allowedTypes, defaultType, defaultScheduledDate, getNextNumber, account }) {
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
      status: initial?.status || "התקבל",
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
            <Field label="נהג משויך (לא חובה)"><input value={driver} onChange={(e) => setDriver(e.target.value)} placeholder="שם הנהג" /></Field>
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

function TaskDetail({ task, onClose, onUpdate }) {
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
    const log = [...task.log, { ts: new Date().toISOString(), action: `סטטוס עודכן ל-${statusMeta(statusId).label}`, note: noteDraft }];
    const autoInProgress = (statusId === "בטיפול" && !task.inProgressDate) ? isoDate(new Date()) : task.inProgressDate;
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
  const convertToRepair = () => {
    const repairs = {}; ALL_REPAIR_SVCS.forEach((s) => (repairs[s.id] = false));
    const carpets = task.carpets.map((c) => ({ ...c, repairs: c.repairs || repairs }));
    onUpdate({ ...task, type: "repair", carpets, log: [...task.log, { ts: new Date().toISOString(), action: "הועבר מניקוי לתיקון", note: "" }] });
  };

  const wazeLink = task.client?.address ? `https://waze.com/ul?q=${encodeURIComponent(task.client.address)}&navigate=yes` : null;
  const isGeneral = task.type === "general";
  const isBranch = task.type === "branch";
  const isCleaning = task.type === "cleaning";
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
            {isCleaning && <button className="btn-ghost small" onClick={convertToRepair}><Wrench size={13}/> ממשיך לתיקון</button>}
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
                {STATUS_FLOW.map((s) => (
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
            <Field label="נהג משויך"><input value={driverDraft} onChange={(e) => setDriverDraft(e.target.value)} onBlur={saveDriver} placeholder="שם הנהג" /></Field>
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

function TaskCard({ task, onOpen }) {
  const zoneColor = ZONES.find((z) => z.id === task.zone)?.color;
  const status = statusMeta(task.status);
  const isGeneral = task.type === "general";
  const isBranch = task.type === "branch";
  const tMeta = typeMeta(task.type);
  const TIcon = tMeta.icon;
  const firstCarpet = (!isGeneral && !isBranch) ? task.carpets[0] : null;
  const firstSize = firstCarpet ? carpetSizeLabel(firstCarpet) : null;

  return (
    <div className="task-card" style={{ "--zone-color": zoneColor }} onClick={onOpen}>
      <div className="task-card-top">
        <span className="task-client"><User size={14}/> {isGeneral && task.number ? `#${task.number} · ` : ""}{(isGeneral || isBranch) ? task.title : task.client.name}</span>
        <Chip color={tMeta.color}><TIcon size={11} style={{ display: "inline", verticalAlign: "-2px" }} /> {tMeta.label}</Chip>
      </div>
      {isGeneral && task.client?.name && task.client.name !== task.title && <div className="task-card-mid muted"><User size={13}/> {task.client.name}</div>}
      {task.client?.address && <div className="task-card-mid muted"><MapPin size={13}/> {task.client.address}</div>}
      {task.client?.phone && <div className="task-card-mid muted"><Phone size={13}/> {task.client.phone}{task.client.contact2Name ? ` · ${task.client.contact2Name}${task.client.contact2Phone ? " " + task.client.contact2Phone : ""}` : ""}</div>}
      {(isGeneral || isBranch) && task.description && <div className="task-card-desc">{task.description}</div>}

      {(task.timeWindow || (task.callAhead && task.callAhead !== "none")) && (
        <div className="driver-time-alert" style={{ marginTop: 0 }}>
          {task.timeWindow && <span><Clock size={13}/> {task.timeWindow}</span>}
          {task.callAhead && task.callAhead !== "none" && <span>📞 {CALL_AHEAD_OPTIONS.find(o=>o.id===task.callAhead)?.label}</span>}
        </div>
      )}

      <div className="task-card-bottom">
        <Chip color={zoneColor}>{task.zone}</Chip>
        {!isBranch && <Chip color={status.color}>{status.label}</Chip>}
        {task.pending && <Chip color="#B8862F">ממתין לאישור</Chip>}
        {task.driver && <span className="muted small"><Car size={12}/> {task.driver}</span>}
        {firstCarpet && <span className="muted small">{firstCarpet.number ? `#${firstCarpet.number} ` : "(ללא מספר — ימתין לאישור) "}{firstCarpet.name || ""}{firstSize ? ` · ${firstSize}` : ""}{task.carpets.length > 1 ? ` +${task.carpets.length - 1}` : ""}</span>}
        {!isGeneral && !isBranch && task.performedBy && <span className="muted small">🔧 {task.performedBy === "אחר" ? (task.performedByOther || "אחר") : task.performedBy}</span>}
        {task.receivedDate && <span className="muted small">התקבל: {task.receivedDate}</span>}
        {!isGeneral && !isBranch && task.inProgressDate && <span className="muted small">בטיפול מ-{task.inProgressDate}</span>}
        {task.scheduledDate && <span className="muted small"><CalIcon size={12}/> {task.scheduledDate}</span>}
      </div>
    </div>
  );
}

function TasksTab({ tasks, updateTasks, scope, getNextNumber, assignMode, onAssignPick, onCancelAssign, account }) {
  const scopeTypes = scope === "general" ? ["general"] : ["cleaning", "repair"].filter((t) => opsTypeAllowed(account, t));
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [openTaskId, setOpenTaskId] = useState(null);
  const [filterZone, setFilterZone] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState(scopeTypes[0] || "cleaning");

  const visible = tasks.filter((t) => canSeeTask(t, account));
  const scoped = visible.filter((t) => scopeTypes.includes(t.type) && (scopeTypes.length <= 1 || t.type === filterType));
  const filtered = scoped.filter((t) =>
    (filterZone === "all" || t.zone === filterZone) && (filterStatus === "all" || t.status === filterStatus) &&
    (!assignMode || t.scheduledDate !== assignMode.date)
  ).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  const openCount = scoped.filter((t) => (filterZone === "all" || t.zone === filterZone) && t.status !== "נמסר" && !t.pending).length;
  const createTypes = scope === "general" ? ["general"] : scopeTypes;

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
        <div className="stat-card accent"><div className="stat-num">{openCount}</div><div className="stat-lbl">משימות פתוחות (לא הושלמו)</div></div>
      </div>

      <div className="filter-label">אזור</div>
      <PillGroup options={[{ id: "all", label: "הכל" }, ...ZONES]} value={filterZone} onChange={setFilterZone} size="sm" />

      <div className="filter-label">סטטוס</div>
      <PillGroup options={[{ id: "all", label: "הכל" }, ...STATUS_FLOW]} value={filterStatus} onChange={setFilterStatus} size="sm" />

      <div className="toolbar" style={{ marginTop: 4 }}>
        <span />
        {!assignMode && <button className="btn-primary" onClick={() => { setEditing(null); setShowForm(true); }}><Plus size={16} /> משימה חדשה</button>}
      </div>

      {filtered.length === 0 && <div className="empty-state"><ClipboardList size={28} className="muted" /><p>אין משימות להצגה. לחצו על "משימה חדשה" כדי להתחיל.</p></div>}

      <div className="task-list">{filtered.map((t) => <TaskCard key={t.id} task={t} onOpen={() => assignMode ? onAssignPick(t.id) : setOpenTaskId(t.id)} />)}</div>

      {showForm && <TaskForm initial={editing} allowedTypes={createTypes} defaultType={createTypes[0]} getNextNumber={getNextNumber} account={account} onSave={handleSave} onCancel={() => { setShowForm(false); setEditing(null); }} />}

      {openTask && !assignMode && (
        <>
          <TaskDetail task={openTask} onClose={() => setOpenTaskId(null)} onUpdate={handleUpdate} />
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

const CALCULATOR_HTML_B64 = "PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImhlIiBkaXI9InJ0bCI+CjxoZWFkPgo8bWV0YSBjaGFyc2V0PSJVVEYtOCI+CjxsaW5rIHJlbD0iaWNvbiIgdHlwZT0iaW1hZ2Uvd2VicCIgaHJlZj0iZGF0YTppbWFnZS93ZWJwO2Jhc2U2NCxVa2xHUmxBUkFBQlhSVUpRVmxBNFdBb0FBQUFRQUFBQUt3RUFod0FBUVV4UVNMOE9BQUFCdDhlZ2JTUkg1L0NIZmUwTGdJakk0ZTBnYTU3bUxyTEpuRGZ5RjNqRHR1MlFYbXZiMXJnelpwTGhrWkVldG0zYnRtM2J0bTNidG0zYkhqM3NNVG81LzQvUjNWVjFubFdwYS82TTZMOUVTWkxydHRrU0V3aCt6YTVJNEE2ZkFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQXpMSGJSUDlIYWZkdzV3NlQxVTRXZ3lzY3hOUnJsMHY5WUFqaG56dDNySmVKOVQrNXFycVdYZ2hIbEFrOU1vUVFRZ2p0dTdlYXBDNUdhejRmd3F0SitNNTR2SXhGNitnUXd0M0R5MHRrK3hCQ3o4U2ZkMnhSQnorKzl0TmRHVXlWQUhEV0VIN1lKTG1wbGJzOGZiWmdhWm5jSDBMb21lZ3NBamR0TytsWVBucThKNEFVNlgvUXdidHVaRnBYelRFOXJuWXVLWlJKZXJBemYvemFMU1lZYTBlclA1VGgvdlI0eG1PNitYN1lNS212TnpOc1hWVGkrL3lKWDI3ZWRLeXNYMVo2T05QNmUvRVZWZ2JoVlJPbU0zWnhwcTlYWmlvam1NNGRWR3ppOTV2V0d6KzloMzZUTnB2TlpyUFpiRGFieldhejJXdzJtODFtczlsc05wdk5aclBaYkk3cUh3Rzk3Q041eGllUDlmaE9oN0JuY3YxVXNXemU3YXQzRDEwemZhd1RoeEJDNFlsZnIxNC85U0xRK0tyZGJyZmI3WGE3M1c2MzIrMTJ1OTF1dDl2dGRydmRicmZiN1hiNzk1SEZSL2ZsdTQ0Ti9zZ2N4c3ZTM0U2ejVEczdOcmwyQ0NIRVRWeXo4YkNrK2l1RUVHdWs2SWExM04wWmhLbFdzdGx5SWIvZElFRW8vYjhxWU8yQkNSUHJpUVNwZm4vWitrUFQ2ZHQ0RTM4VisyZnhPNG9odmhQbjhQMENtSmVNR3gxS01YTmZMMXFGOS9sM3k5VnJqcWlPQ28wS00wYVZtTWNXeTN1dHlFd09LbXB1ajVUYU00U1FhT0tueTlZZFZrMHRjVWNFWTh6alBGZFIwRXZIeTRpa3lKMVEzTjNWZzlMcHNSQkN6MFNLUmVEQ3RZWlVUZ3ZmRU1WNFNvUy9qd3VUZmhPeHBZNzRMY0xlVzdPa3VxWUlJWVRpRThXZXI0dlhIRklsTFhCVEpPT2JFWE14ckJmK3J5anFzMUgrUm0rYzdCZ29oT0lUeGUrWnkxY2FVQkhOZlZNODVLakMxVzhjNjVlckZVTTlMZGJncVduMGFBaWhqSWt2TGx4cFNQbWE1NW9VL3RZdTNIL0cwbDR3VGdIUzllSWRQcHlpOTU0b2hCQkttdmpxbk5VSGxxcDVyMGhqN3J5Q1lSMGZoZHQ5ZXBFL09XV1NQV0NaZU8wV1FpaHg0dlBUVml4Rm5SdG56cXgrTVBrWE90QkpnTS9LSzBUZlMyTnkzeVEvWGU3RVIrY3MxeWlrdVBXYldTOUpaMnZNSklXeStpUU44U2VyWnBKZW5jcmxEWkhGeFdRaGhGRDZ4T1Y1U2xCTnozdDZVbE9iRnNucWhHVElaMmVVYXp1bmMvbkJVb1dVUVYrR2lyUnlxZlZiWWxQbkZQbU5DWmsvWEtHYmRMNlVObCtQMHRPVjBNMFJxb1NwMXdwRTlWR0hPdDFrNTJFZTU4YzR6cnpEb2VsanJtYW9wS3IybWpwL0x2VXl2andQcE1SY0tlNm42MUNiZENXVlZUYW41OTV2djVTTXg4Wjk1d3QxcURQeWt2bzBoQkJDQ0NHRUVDcG44YUYvcjdqM2RhajNjcEk2dWRMWGowUGp0RzgxVmIzb3BzZzVBYXEwNXVrcGdBdTMvUFdvRGJPcjMwcGZ1MFZlazRhS3FzSmY2SDlyU1ZleVhpRzJyOXE3SnZWU2xpNHY0VXBaTDBmM29GOVdWQldNYjdJc1Y2dDlVVjFORzYxbGpucXJIclZCcHExaEYxVDFXbzhFeDJiekgvTjZEZXJVbktSVy8remZxNnJXa2t3c2NOSmJkYWUzOG5JYWVsbW82RktjYkdLeEU5NnFrcXA0dHpWelkxcjM2NnI1K21OQ3BKMDQ5djBhMDlyNUlZMTNhY1Y4TFE2cEo1WSs4Y082MHJsRk10cndoeXJaT2hES21Gajg5SGRxU1c4V1NtaWlxNnZqNm5Zb2EyS3BzejRzVzVYY0hpY3BGdEJtUDFiRTA3ZjlVZWJFQ3FkOVZEZmF0R0E4STYrdmhxYzVVZktnMzdLbmYxa3JPcnR3UEZ2OFhnRkwyMEQ1RTROWFBQZUwrdEFyeGNPWnZQd3UvaEtveHNUQUZjNy9aS3pSVDc5R1lrMGRrYzFXSlUrK0RyMFRGVmdFVnI5NzdOQ0pFejRaeWJWSlRESlQzbFYyZFYydHdTTGxLdG5pTVNmWFJKS2RFWmZNRG4rVmQ2MnZkT1UzTXVsVlFoTzRjb2QzejBpMjF5S2ptZXJ1OHJhcXltbTlxdXY3WGJ0NTU0dWtHeFBkS2U0eXVwVHJEVFdnMUljdzQvYndEb2l0YURlTVRtZjZlOHZRWkRXcm0rYklBbjQwa3ZDc0JQbnNudjVhVFIwb1piVzJlamJ3Y1pHTUw2WUlhTlpIRWwrbnExTzFkczN6dDBvczV1UkpJdG9yNzRyZXBlcFVwNDNJTC8xak9UZjRONk1razA4bjFLZ2ExVzJGT3VYWVk1VlRVcVYwUUxKckxUV2hKSDlrMVdJR0w0cGtmU3RaVEhNK2xlcWI2bEtqOXlscWNLZktQS3lISlNtNzFhYitMR3h3NFZqY3RSTW1OZnVWZjhkYStIcHdmZXF2a1lVUG4zNkt4RDB2WlZSTC9oQzk5ZGVxQ2p1OEp4TDN6WFJCYmZSd2l0T3lQa0FueFBLT1RKUFNPTHU4bnFpdHFuK3RFOHU3YVlxTUpqN2ttMVMvNi9MNlZNU04rV3ZaSnplem5QSmJ5bjY5OXJYOUw1RzhyOGJtczlpVmFidlFxMnBlVzd3UkR6eEpUanE1WGV6dHlVODNwcXh6cmZGQ2lsalhpTWhtODJkTE9EUzd0cjYxMUtOcFlqMnJhREREZHVsMHNDVzhtald0aFpJOXQ2OFhpMldLSTc4TG9SeGRXY3VhNCtwMHFZNlpxRWlIZm00N2hORHpTdi9sK3RWVUZ5ZE5kYVA4TGZmV0VFS0p1cTV1TmZMRWY5S21lbWJlTnZSUUNLSGMxOVMxcXNrUC96MDcxTVJIT0lOMmVDMkUwblZqcldxVDNsUkxxUEluMk8rVEVFSUZYdFBVb25xN3hoTDJndzI3ZVMvNjc5UW9pVklFVnF2VGo2VVA5ZFR1Y1FpaEtxOFo2bFFucGMvMHJXN2U1YXVqMitwUUdUdG9lVVgrNDlWNUxWS2pHdkYzK2t6WDdnYWV1VG82cmdhVkFmbEMra3dmNmdHK3ZDS2p1MWNZVXFjNk5YbW9QKzdmQXp6ZW1DcU1ibHFvWnZ1RlZST0grczBoNDJVUUgxcis2Tks1NnJSbjc2N1Frb2I2N1lIRE11ME5LTG0wKy9PVUdkWHd1ZGtyQ1VkN0Q4dUxZL015Ujc4Y01ZbzYxb21wVXYxcXYyRUY4bmkzdE5IbkIweEluU3JUVkpwVVA5Mm5VU2lQUmJ0R0pWVFJ1d3lpcnRWTWtlb1greFpPOWY0eVJpOXVnL3BWd3NydXM5MGJ4UU9aT3Yzb2lYV3BkNTBaaWZqbHpuRlA2cm1KUi9jdFI5MXI0eWpBajNhTExlZi9sOVdhcGNobVVlcGZVMFhnZmJCenYvaEk5a2szdW5odWFsdlpuQjhWaGZ0d3QzNUpNdmt1emN6b3MyZWl4cFZnc1h0dnUvN1piQTgrdEVMaFRGS01majVtcW16UzZkNDVkZm9hMXhaRndON01yU2htQ1NHOHNuTm01WnJaYnlRb2VNZlBBejBtaEhETGlyV3RtUXFNdHN0M2ZsRjNSM1RTSElNTGhESmZoc09DajhXZVhhVFo3ZXNQWFVBdmJ6ZXFmMjBxeDlkN09WQ3ZGNmxTUi96VkM3Vk1rVlJ1Sytpdis0UFl1Z2ptcGhtVjlhQjYxaVdaU0c5c1ZzajRucjFVZjR3b0FqVnBSTUc3VHJFUVgrdkZ1bEk5YThlczBSWUZqYi9meTNWSU1hcFRpaGE4S3hlME1HOEcyRlExcldsN2U4Uk5pL3BlT3dONC9HSllRd29Wd2pjdVhqakR1M3ZKN3EzUmI4a3o5a25Yb3JaNUJzZGNCMCtaalhWN0YyOW4yeXlheXg3NXZxNllKd3RxcXgyekVTZktZRnU2R2lxMERDZlFBOW1ZUThjazRCeVZaK3pxRUo3Zk5HZmhISDFoWmljMHhTNHZkZU11VkRpWUw3STl0YytZTFJOcFlBanZIZFRNdXZjWE9PWEg3bDZrc3I5b2pWYXIxV3ExV3ExV3E5VnF0VnF0VnF2VmFyVmFyVmFyMVdxMVdxM1daZjloWnVYd2Rqem1seFBuN2hrZnJaZU5NZnl2cmkxaGk4eCtZYmtiTzZ0bzhXQld5UnI5ZnZSL2owSitsL3YzNVF0a2tZeTc0eHNoaEYycW8veFNxTkZvTkJxTlJxUFJhRFFhalVhajBXZzBHbzFHbzlGb05CcU5ScVB4Yi9HVTh6WUJaMjdYTkN5dnhOcXRKKytQRDg2RW1mV2tIN2FQU09hNUh0S3ZEeGxacUVUdStzU3pGODZWSHZoNUdBQUFBQUFBQUFBQUFBQUFZT3pwNVQ3cnZUbXY2VHk4all6YmZFQUU2ZXhkbU8vdU9UUm11MTN5djNzaDY0TVp2K2F2ek9jOEk5ZnhzTzNYUjArZGd2WEtFRjdacWhEUGpSbWxTNGZpb2F4YXFNL1FYYjI1M3RyN1dGKzJSRHpyTlBkbjdONTUyMjFHbzlHcGlUcDd5YUZUOUNuWElobTVMb2padWhHZTNtcXljanhjbDNHdzFLRTRvd3RoOUpXTGorZzdOTWRWUFYzbjJ4Mkt5M3BUdnJ1a0t1dnhIdXJkTVNpalZsNnZMeG1PT3VpZFRwSmJkdmFSMFoxY3V5aEtlem91Nkh3eWYzWTJwaDB5U3ZEeCs1Z2ZXT2VlRURyYjdmNFpweEVsV3Boc3Z3KzcrL09QZWowY3BXLzQ5ZG0xMXpxZC83L3Z6ZlhBVWkzMDI2clRRYXllc2Y1MnR3OTl6N2N1Mnh2cm1DcHNBK2RuTmMxOWlITGF0SGt2L0wwNmgxempiZnh3dHpwSEgzM1Z4TWo5M2dvaHpGNFJEd3VkODJjSTcwSmZOZEZaNFo1NXBrSmIrOTZmL3R1dDkzR3ZkVGVyMG1xeTIxd0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUQwY1YwZEFGWlFPQ0JxQWdBQU1CNEFuUUVxTEFHSUFENlJScHhKSmFRaklTcy9LQUN3RWdsamJ0L3dMMEM4QWZxQkFnUHdBL0FEeUFQb0E1d0Q4QVB3QXRmL0tBdndEOEFMa2QwVDV6cVgvTHVFTTY0K1g1SjMvTjJnUDBBeFFIOEEvZ0g3QWUvL1RmNDFIWUQ2dGExclZSWTgyRG93RisyQVVxSHVmeGowNTNQNHg1THFOWUJLWTN0MXhNWkFMeUpqZ0U0elRJNXRRWU1mZ2VoRENLem9Ya1RIQUp4bW1SemF2TjVreC9RZnpqTk1qbTFlY0FuR2FaSE5vWG5YQUlpWHMweU9iVjV3Q2NacGtjMnJ2MDk0Z0ZxdzhaSE5xODRCT00weU9iVjV2VnZPaThmckZ2RURoNmFTa0Z5anF1L3JDKzhrZWZBbkZ5Uzg0Qk9MaUtwVnN2Y0RTdGorQUFEKy9QUmVnekdtbnZ0NDN3MDhhMTcxOUl1QTVhdGQ3QTJOajFtZnB4czc5WTNzd3huVzNabFN1d2pRc2h4RE1hYWUrM2pmRFR4clh2WDBpNG43SzhucWc1OEhZUFFXcjRlek9YekNoWGRqK3lWSmNUMU1HY0lyaldXSVRuUFFzQm1OTlBmYnh2aHA0MXIzcjZSY1Q5bGVUMVFjK0VLZU1TTWFxa3lKZnFZSEpRTi9UWWNCYlNiQThuR2NZcFdCRHEydUtrUVRqUDZlSllWYUVHMEhUQ0xTOWpBVjNtdzdtbzl6c05MVFVlb290WXlveTEzelNGN2gwbXlnV2xNQjE1WkIwUG8yZ0l0SHNnanRjQzBNaXJUSlBaZmI0R3VVQVpteWNEaXB5UjdFMDJHckhvSC8vaWVtaWRNRlBvZEtERERwM2FwL0syYW05ZDVKWG10c2p2Q0NyZlpsL2VKN3MrNFZFcWpjK3VPd2dkNkExMWcyZjhwZi8vUXhVUWhoWm9yOUJWY2N1S1dhQzdHdGlWSE5TaFk1T2xaWWZ1NG9Ocy9MTFdlZFp2MVB6c0xFZmJ3ZVJ6NDNaN2NKWVpBMjNJcXQ3bWZISEhUcUFGSWE5YVVGK1pmV2hSOGU5TVhHMHFFeTZKM05Hb0FBIj4KPG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAiPgo8dGl0bGU+16bXnteoINep15jXmdeX15nXnSDXmdek15nXnSDigJQg157Xl9ep15HXldefINee15fXmdeoPC90aXRsZT4KPGxpbmsgaHJlZj0iaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1IZWVibzp3Z2h0QDIwMDszMDA7NDAwOzcwMDs5MDAmZmFtaWx5PVNwYWNlK0dyb3Rlc2s6d2dodEAzMDA7NDAwOzcwMCZkaXNwbGF5PXN3YXAiIHJlbD0ic3R5bGVzaGVldCI+CjxzdHlsZT4KCip7bWFyZ2luOjA7cGFkZGluZzowO2JveC1zaXppbmc6Ym9yZGVyLWJveH0KaHRtbCxib2R5e2JhY2tncm91bmQ6IzAzMDMwNCFpbXBvcnRhbnQ7bWluLWhlaWdodDoxMDAlfQo6cm9vdHsKICAtLWJnOiMwMzAzMDQ7LS1zMTojMDgwODA5Oy0tczI6IzBmMGYxMTsKICAtLW9yYW5nZTojZTg4MTJhOy0tb3JhbmdlMjojZjVhMDVhOwogIC0tYmx1ZTojM2E2ZmQ4Oy0tdGVhbDojMmE4YTgwOwogIC0tdGV4dDojZjBmMGYyOy0tbXV0ZWQ6IzYwNjA2YTsKICAtLWJvcmRlcjpyZ2JhKDI1NSwyNTUsMjU1LC4wNikKfQpib2R5e2JhY2tncm91bmQ6dmFyKC0tYmcpO2NvbG9yOnZhcigtLXRleHQpO2ZvbnQtZmFtaWx5OidIZWVibycsc2Fucy1zZXJpZjtkaXJlY3Rpb246cnRsO292ZXJmbG93LXg6aGlkZGVufQoKLyogYW5pbWF0ZWQgZ3JhZGllbnQgb3JicyAqLwoub3Jie3Bvc2l0aW9uOmZpeGVkO2JvcmRlci1yYWRpdXM6NTAlO2ZpbHRlcjpibHVyKDgwcHgpO3BvaW50ZXItZXZlbnRzOm5vbmU7YW5pbWF0aW9uOmRyaWZ0IDEycyBlYXNlIGluZmluaXRlO3dpbGwtY2hhbmdlOnRyYW5zZm9ybX0KLm9yYjF7d2lkdGg6NTAwcHg7aGVpZ2h0OjUwMHB4O2JhY2tncm91bmQ6cmdiYSgyNTUsMTAwLDIwLC4xOCk7dG9wOi0xMDBweDtyaWdodDotMTAwcHg7YW5pbWF0aW9uLWRlbGF5OjBzfQoub3JiMnt3aWR0aDo0MDBweDtoZWlnaHQ6NDAwcHg7YmFja2dyb3VuZDpyZ2JhKDU4LDExMSwyMTYsLjA4KTtib3R0b206LTEwMHB4O2xlZnQ6LTEwMHB4O2FuaW1hdGlvbi1kZWxheTotNHN9Ci5vcmIze3dpZHRoOjMwMHB4O2hlaWdodDozMDBweDtiYWNrZ3JvdW5kOnJnYmEoNDIsMTM4LDEyOCwuMDYpO3RvcDo1MCU7bGVmdDo1MCU7YW5pbWF0aW9uLWRlbGF5Oi04c30KQGtleWZyYW1lcyBkcmlmdHswJSwxMDAle3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwwKSBzY2FsZSgxKX0zMyV7dHJhbnNmb3JtOnRyYW5zbGF0ZSgzMHB4LC0yMHB4KSBzY2FsZSgxLjA1KX02NiV7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtMjBweCwzMHB4KSBzY2FsZSguOTUpfX0KCi8qIOKUgOKUgCBOQVYg4pSA4pSAICovCmJvZHl7YmFja2dyb3VuZDojMDMwMzA0fS5uYXZ7CiAgcG9zaXRpb246Zml4ZWQ7dG9wOjA7bGVmdDowO3JpZ2h0OjA7ei1pbmRleDo1MDsKICBwYWRkaW5nOjE4cHggNDBweDtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47YWxpZ24taXRlbXM6Y2VudGVyOwogIGJhY2tncm91bmQ6cmdiYSgzLDMsNCwuODUpO2JhY2tkcm9wLWZpbHRlcjpibHVyKDIwcHgpOwogIGJvcmRlci1ib3R0b206MXB4IHNvbGlkIHZhcigtLWJvcmRlcikKfQoubmF2LWxvZ297ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtnYXA6MTJweH0KLm5hdi1sb2dvIGltZ3toZWlnaHQ6MzBweDtmaWx0ZXI6YnJpZ2h0bmVzcygwKSBpbnZlcnQoMSl9Ci5uYXYtbmFtZXtmb250LXNpemU6MTNweDtmb250LXdlaWdodDo2MDA7Y29sb3I6dmFyKC0tdGV4dCl9Ci5uYXYtY3RhewogIGJhY2tncm91bmQ6dmFyKC0tb3JhbmdlKTtjb2xvcjojMDcwNzA4OwogIGZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjcwMDtwYWRkaW5nOjlweCAyMHB4O2JvcmRlci1yYWRpdXM6NHB4OwogIGxldHRlci1zcGFjaW5nOi41cHg7Y3Vyc29yOnBvaW50ZXIKfQoKLyog4pSA4pSAIEhFUk8g4pSA4pSAICovCi5oZXJvewogIG1pbi1oZWlnaHQ6MTAwdmg7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjsKICBqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjt0ZXh0LWFsaWduOmNlbnRlcjsKICBwYWRkaW5nOjEyMHB4IDMycHggODBweDtwb3NpdGlvbjpyZWxhdGl2ZTt6LWluZGV4OjEKfQoKLmhlcm8tYmFkZ2V7CiAgZGlzcGxheTppbmxpbmUtZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjhweDsKICBiYWNrZ3JvdW5kOnJnYmEoMjMyLDEyOSw0MiwuMSk7Ym9yZGVyOjFweCBzb2xpZCByZ2JhKDIzMiwxMjksNDIsLjI1KTsKICBjb2xvcjp2YXIoLS1vcmFuZ2UyKTtmb250LXNpemU6MTFweDtmb250LXdlaWdodDo2MDA7bGV0dGVyLXNwYWNpbmc6MnB4O3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTsKICBwYWRkaW5nOjdweCAxNnB4O2JvcmRlci1yYWRpdXM6MjBweDttYXJnaW4tYm90dG9tOjMycHg7CiAgYW5pbWF0aW9uOmJhZGdlUG9wIC42cyBlYXNlIGJvdGgKfQouaGVyby1iYWRnZTo6YmVmb3Jle2NvbnRlbnQ6J+KXjyc7Zm9udC1zaXplOjdweDthbmltYXRpb246YmxpbmsgMnMgZWFzZSBpbmZpbml0ZX0KQGtleWZyYW1lcyBibGlua3swJSwxMDAle29wYWNpdHk6MX01MCV7b3BhY2l0eTouM319CkBrZXlmcmFtZXMgYmFkZ2VQb3B7ZnJvbXtvcGFjaXR5OjA7dHJhbnNmb3JtOnNjYWxlKC45KX10b3tvcGFjaXR5OjE7dHJhbnNmb3JtOnNjYWxlKDEpfX0KCi5oZXJvLXRpdGxlewogIGZvbnQtc2l6ZTpjbGFtcCg0OHB4LDl2dywxMTBweCk7Zm9udC13ZWlnaHQ6OTAwOwogIGxpbmUtaGVpZ2h0Oi45O2xldHRlci1zcGFjaW5nOi0zcHg7bWFyZ2luLWJvdHRvbToyOHB4OwogIGFuaW1hdGlvbjp0aXRsZVJldmVhbCAuOHMgZWFzZSAuMnMgYm90aAp9CkBrZXlmcmFtZXMgdGl0bGVSZXZlYWx7ZnJvbXtvcGFjaXR5OjA7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoMzBweCl9dG97b3BhY2l0eToxO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDApfX0KCi53b3JkLWNhcnBldHsKICBkaXNwbGF5OmJsb2NrOwogIGJhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDEzNWRlZywjZmY3YTJhLCNmZjQ1MDApOwogIC13ZWJraXQtYmFja2dyb3VuZC1jbGlwOnRleHQ7LXdlYmtpdC10ZXh0LWZpbGwtY29sb3I6dHJhbnNwYXJlbnQ7YmFja2dyb3VuZC1jbGlwOnRleHQKfQoud29yZC1jbGVhbntkaXNwbGF5OmJsb2NrO2NvbG9yOnZhcigtLXRleHQpfQoud29yZC1maXh7ZGlzcGxheTpibG9jaztjb2xvcjpyZ2JhKDI0MCwyNDAsMjQyLC4yKTtmb250LXdlaWdodDoyMDA7Zm9udC1zdHlsZTppdGFsaWN9CgouaGVyby1zdWJ7CiAgZm9udC1zaXplOjE2cHg7Y29sb3I6dmFyKC0tbXV0ZWQpO21heC13aWR0aDo1MjBweDtsaW5lLWhlaWdodDoxLjc7bWFyZ2luLWJvdHRvbTo0OHB4OwogIGFuaW1hdGlvbjpmYWRlSW4gLjhzIGVhc2UgLjRzIGJvdGg7Zm9udC13ZWlnaHQ6MzAwCn0KQGtleWZyYW1lcyBmYWRlSW57ZnJvbXtvcGFjaXR5OjB9dG97b3BhY2l0eToxfX0KCi5oZXJvLWJ0bnN7CiAgZGlzcGxheTpmbGV4O2dhcDoxNHB4O2p1c3RpZnktY29udGVudDpjZW50ZXI7ZmxleC13cmFwOndyYXA7CiAgYW5pbWF0aW9uOmZhZGVJbiAuOHMgZWFzZSAuNnMgYm90aAp9Ci5idG4tb3JhbmdlewogIGJhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDEzNWRlZyx2YXIoLS1vcmFuZ2UpLCNjOTZhMTgpOwogIGNvbG9yOiNmZmY7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NzAwOwogIHBhZGRpbmc6MTVweCAzNnB4O2JvcmRlci1yYWRpdXM6NHB4O2N1cnNvcjpwb2ludGVyOwogIGJveC1zaGFkb3c6MCA0cHggMjRweCByZ2JhKDIzMiwxMjksNDIsLjMpOwogIHRyYW5zaXRpb246dHJhbnNmb3JtIC4ycyxib3gtc2hhZG93IC4ycwp9Ci5idG4tb3JhbmdlOmhvdmVye3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0ycHgpO2JveC1zaGFkb3c6MCA4cHggMzJweCByZ2JhKDIzMiwxMjksNDIsLjQpfQouYnRuLW91dGxpbmV7CiAgYmFja2dyb3VuZDp0cmFuc3BhcmVudDtjb2xvcjp2YXIoLS10ZXh0KTtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo2MDA7CiAgcGFkZGluZzoxNXB4IDMycHg7Ym9yZGVyLXJhZGl1czo0cHg7Y3Vyc29yOnBvaW50ZXI7CiAgYm9yZGVyOjFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO3RyYW5zaXRpb246YWxsIC4ycwp9Ci5idG4tb3V0bGluZTpob3Zlcntib3JkZXItY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuMik7YmFja2dyb3VuZDpyZ2JhKDI1NSwyNTUsMjU1LC4wNCl9CgovKiDilIDilIAgQ0FMQ1VMQVRPUiBNT0NLVVAg4pSA4pSAICovCi5tb2NrdXAtd3JhcHsKICBtYXJnaW46MjhweCBhdXRvIDA7bWF4LXdpZHRoOjM4MHB4O3dpZHRoOjEwMCU7CiAgYW5pbWF0aW9uOmZsb2F0VXAgMXMgZWFzZSAuOHMgYm90aAp9CkBrZXlmcmFtZXMgZmxvYXRVcHtmcm9te29wYWNpdHk6MDt0cmFuc2Zvcm06dHJhbnNsYXRlWSg0MHB4KX10b3tvcGFjaXR5OjE7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoMCl9fQoubW9ja3VwewogIGJhY2tncm91bmQ6dmFyKC0tczEpO2JvcmRlcjoxcHggc29saWQgdmFyKC0tYm9yZGVyKTtib3JkZXItcmFkaXVzOjIwcHg7CiAgcGFkZGluZzoyNHB4O2JveC1zaGFkb3c6MCA0MHB4IDgwcHggcmdiYSgwLDAsMCwuNiksMCAwIDAgMXB4IHJnYmEoMjU1LDI1NSwyNTUsLjA0KSxpbnNldCAwIDFweCAwIHJnYmEoMjU1LDI1NSwyNTUsLjA2KQp9Ci5tb2NrLWhlYWRlcntkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47YWxpZ24taXRlbXM6Y2VudGVyO21hcmdpbi1ib3R0b206MjBweH0KLm1vY2stdGl0bGV7Zm9udC1zaXplOjEycHg7Y29sb3I6dmFyKC0tbXV0ZWQpO2xldHRlci1zcGFjaW5nOjFweH0KLm1vY2stdGFic3tkaXNwbGF5OmZsZXg7YmFja2dyb3VuZDp2YXIoLS1zMik7Ym9yZGVyLXJhZGl1czozMHB4O3BhZGRpbmc6M3B4O2dhcDozcHh9Ci5tb2NrLXRhYntmb250LXNpemU6MTFweDtmb250LXdlaWdodDo2MDA7cGFkZGluZzo2cHggMTJweDtib3JkZXItcmFkaXVzOjI2cHg7Y29sb3I6dmFyKC0tbXV0ZWQpfQoubW9jay10YWIub257YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLHZhcigtLW9yYW5nZSksI2M5NmExOCk7Y29sb3I6I2ZmZn0KLm1vY2stZmllbGR7YmFja2dyb3VuZDp2YXIoLS1zMik7Ym9yZGVyOjFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO2JvcmRlci1yYWRpdXM6OHB4O3BhZGRpbmc6MTJweCAxNHB4O21hcmdpbi1ib3R0b206MTBweH0KLm1vY2stZmllbGQtbGFiZWx7Zm9udC1zaXplOjlweDtjb2xvcjp2YXIoLS1tdXRlZCk7bGV0dGVyLXNwYWNpbmc6LjhweDt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7bWFyZ2luLWJvdHRvbTo0cHh9Ci5tb2NrLWZpZWxkLXZhbHtmb250LXNpemU6MjBweDtmb250LXdlaWdodDo4MDA7Y29sb3I6dmFyKC0tdGV4dCl9Ci5tb2NrLXJvd3tkaXNwbGF5OmdyaWQ7Z3JpZC10ZW1wbGF0ZS1jb2x1bW5zOjFmciAxZnI7Z2FwOjEwcHg7bWFyZ2luLWJvdHRvbToxNHB4fQoubW9jay10eXBlc3tkaXNwbGF5OmdyaWQ7Z3JpZC10ZW1wbGF0ZS1jb2x1bW5zOjFmciAxZnIgMWZyO2dhcDo2cHg7bWFyZ2luLWJvdHRvbToxNHB4fQoubW9jay10eXBlewogIGJhY2tncm91bmQ6dmFyKC0tczIpO2JvcmRlcjoxcHggc29saWQgdmFyKC0tYm9yZGVyKTtib3JkZXItcmFkaXVzOjZweDsKICBwYWRkaW5nOjhweCA0cHg7dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC1zaXplOjEwcHg7Y29sb3I6dmFyKC0tbXV0ZWQpO2ZvbnQtd2VpZ2h0OjYwMAp9Ci5tb2NrLXR5cGUub257Ym9yZGVyLWNvbG9yOnZhcigtLW9yYW5nZSk7YmFja2dyb3VuZDpyZ2JhKDIzMiwxMjksNDIsLjEpO2NvbG9yOnZhcigtLW9yYW5nZTIpfQoubW9jay10b3RhbHsKICBiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxMzVkZWcscmdiYSgyMzIsMTI5LDQyLC4xMikscmdiYSgyMzIsMTI5LDQyLC4wNikpOwogIGJvcmRlcjoxcHggc29saWQgcmdiYSgyMzIsMTI5LDQyLC4yKTtib3JkZXItcmFkaXVzOjEwcHg7CiAgcGFkZGluZzoxNnB4O2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjthbGlnbi1pdGVtczpjZW50ZXIKfQoubW9jay10b3RhbC1sYWJlbHtmb250LXNpemU6MTJweDtjb2xvcjp2YXIoLS1tdXRlZCl9Ci5tb2NrLXRvdGFsLWFtdHtmb250LXNpemU6MjhweDtmb250LXdlaWdodDo5MDA7Y29sb3I6dmFyKC0tb3JhbmdlMil9CgovKiB0eXBpbmcgYW5pbWF0aW9uICovCi50eXBpbmd7b3ZlcmZsb3c6aGlkZGVuO3doaXRlLXNwYWNlOm5vd3JhcDthbmltYXRpb246dHlwaW5nIDJzIHN0ZXBzKDMsZW5kKSBpbmZpbml0ZX0KQGtleWZyYW1lcyB0eXBpbmd7MCUsMTAwJXt3aWR0aDowfTUwJXt3aWR0aDoxMDAlfX0KCi8qIOKUgOKUgCBGRUFUVVJFUyBHUklEIOKUgOKUgCAqLwouZmVhdC1ncmlkewogIGRpc3BsYXk6Z3JpZDtncmlkLXRlbXBsYXRlLWNvbHVtbnM6cmVwZWF0KDMsMWZyKTtnYXA6MXB4OwogIGJhY2tncm91bmQ6dmFyKC0tYm9yZGVyKTttYXJnaW46MDtwb3NpdGlvbjpyZWxhdGl2ZTt6LWluZGV4OjEKfQouZmVhdC1jZWxsewogIGJhY2tncm91bmQ6dmFyKC0tYmcpO3BhZGRpbmc6NDhweCAzNnB4OwogIGJvcmRlci1ib3R0b206MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7CiAgdHJhbnNpdGlvbjpiYWNrZ3JvdW5kIC4zcwp9Ci5mZWF0LWNlbGw6aG92ZXJ7YmFja2dyb3VuZDp2YXIoLS1zMSl9Ci5mZWF0LWljb24yewogIHdpZHRoOjQ0cHg7aGVpZ2h0OjQ0cHg7Ym9yZGVyLXJhZGl1czoxMHB4OwogIGRpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjtmb250LXNpemU6MjBweDsKICBtYXJnaW4tYm90dG9tOjIwcHg7Cn0KLmZlYXQtaWNvbjIub3Jhbmdle2JhY2tncm91bmQ6cmdiYSgyMzIsMTI5LDQyLC4xMik7Ym9yZGVyOjFweCBzb2xpZCByZ2JhKDIzMiwxMjksNDIsLjIpfQouZmVhdC1pY29uMi5ibHVle2JhY2tncm91bmQ6cmdiYSg1OCwxMTEsMjE2LC4wOCk7Ym9yZGVyOjFweCBzb2xpZCByZ2JhKDU4LDExMSwyMTYsLjIpfQouZmVhdC1pY29uMi50ZWFse2JhY2tncm91bmQ6cmdiYSg0MiwxMzgsMTI4LC4xMik7Ym9yZGVyOjFweCBzb2xpZCByZ2JhKDQyLDEzOCwxMjgsLjIpfQouZmVhdC10aXRsZTJ7Zm9udC1zaXplOjE2cHg7Zm9udC13ZWlnaHQ6NzAwO21hcmdpbi1ib3R0b206OHB4fQouZmVhdC1kZXNjMntmb250LXNpemU6MTNweDtjb2xvcjp2YXIoLS1tdXRlZCk7bGluZS1oZWlnaHQ6MS43O2ZvbnQtd2VpZ2h0OjMwMH0KCi8qIOKUgOKUgCBCT1RUT00gQkFSIOKUgOKUgCAqLwouYm90dG9tLWJhcnsKICBiYWNrZ3JvdW5kOnZhcigtLXMxKTtib3JkZXItdG9wOjFweCBzb2xpZCB2YXIoLS1ib3JkZXIpOwogIHBhZGRpbmc6MjhweCA0MHB4O2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjthbGlnbi1pdGVtczpjZW50ZXI7CiAgZmxleC13cmFwOndyYXA7Z2FwOjE2cHg7cG9zaXRpb246cmVsYXRpdmU7ei1pbmRleDoxCn0KLmJvdHRvbS1icmFuZHsKICBkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2dhcDoxMHB4Owp9Ci5ib3R0b20tYnJhbmQgaW1ne2hlaWdodDoyNHB4O2ZpbHRlcjpicmlnaHRuZXNzKDApIGludmVydCgxKX0KLmJvdHRvbS10ZXh0e2ZvbnQtc2l6ZToxMnB4O2NvbG9yOnZhcigtLW11dGVkKX0KLmJvdHRvbS11cmx7Zm9udC1zaXplOjExcHg7Y29sb3I6dmFyKC0tb3JhbmdlKTtsZXR0ZXItc3BhY2luZzoxcHh9CgpAbWVkaWEobWF4LXdpZHRoOjY0MHB4KXsKICAuZmVhdC1ncmlke2dyaWQtdGVtcGxhdGUtY29sdW1uczoxZnJ9CiAgLmhlcm8tdGl0bGV7bGV0dGVyLXNwYWNpbmc6LTJweH0KICAubmF2LWN0YXtkaXNwbGF5Om5vbmV9Cn0KCgovKiDilIDilIAgU1RBVCBHUklEIChyZXBsYWNlcyBoZXJvLWJ0bnMpIOKUgOKUgCAqLwouc3RhdC1ncmlkewogIGRpc3BsYXk6Z3JpZDtncmlkLXRlbXBsYXRlLWNvbHVtbnM6cmVwZWF0KDQsMWZyKTsKICBnYXA6MXB4O2JhY2tncm91bmQ6dmFyKC0tYm9yZGVyKTsKICBtYXJnaW4tYm90dG9tOjQ4cHg7d2lkdGg6MTAwJTttYXgtd2lkdGg6NTIwcHg7CiAgYW5pbWF0aW9uOmZhZGVJbiAuOHMgZWFzZSAuNXMgYm90aDsKfQouc3RhdC1jZWxsewogIGJhY2tncm91bmQ6dmFyKC0tczEpO3BhZGRpbmc6MThweCAxMHB4O3RleHQtYWxpZ246Y2VudGVyOwogIHRyYW5zaXRpb246YmFja2dyb3VuZCAuMjVzOwp9Ci5zdGF0LWNlbGw6aG92ZXJ7YmFja2dyb3VuZDp2YXIoLS1zMil9Ci5zdGF0LW51bXsKICBmb250LXNpemU6MjRweDtmb250LXdlaWdodDo5MDA7bGV0dGVyLXNwYWNpbmc6LTFweDtsaW5lLWhlaWdodDoxOwogIGJhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDEzNWRlZywjZmY3YTJhLCNmZjQ1MDApOwogIC13ZWJraXQtYmFja2dyb3VuZC1jbGlwOnRleHQ7LXdlYmtpdC10ZXh0LWZpbGwtY29sb3I6dHJhbnNwYXJlbnQ7YmFja2dyb3VuZC1jbGlwOnRleHQ7Cn0KLnN0YXQtbGJse2ZvbnQtc2l6ZTo5cHg7Y29sb3I6dmFyKC0tbXV0ZWQpO2xldHRlci1zcGFjaW5nOjEuNXB4O3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTttYXJnaW4tdG9wOjVweH0KCi8qIOKUgOKUgCBTQ1JPTEwgQVJST1cg4pSA4pSAICovCi5zY3JvbGwtY3RhewogIGRpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47YWxpZ24taXRlbXM6Y2VudGVyO2dhcDoxMHB4OwogIGFuaW1hdGlvbjpmYWRlSW4gLjhzIGVhc2UgLjdzIGJvdGg7Y3Vyc29yOnBvaW50ZXI7bWFyZ2luLWJvdHRvbTowOwp9Ci5zY3JvbGwtbGJse2ZvbnQtc2l6ZToxMHB4O2NvbG9yOnJnYmEoMjU1LDI1NSwyNTUsLjIpO2xldHRlci1zcGFjaW5nOjNweDt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2V9Ci5zY3JvbGwtYXJyewogIHdpZHRoOjQycHg7aGVpZ2h0OjQycHg7CiAgYm9yZGVyOjFweCBzb2xpZCByZ2JhKDIzMiwxMjksNDIsLjMpO2JvcmRlci1yYWRpdXM6NTAlOwogIGRpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjsKICBjb2xvcjp2YXIoLS1vcmFuZ2UpO2ZvbnQtc2l6ZToxOHB4OwogIGFuaW1hdGlvbjpib3VuY2UgMnMgZWFzZSBpbmZpbml0ZTt0cmFuc2l0aW9uOmFsbCAuM3M7Cn0KLnNjcm9sbC1jdGE6aG92ZXIgLnNjcm9sbC1hcnJ7YmFja2dyb3VuZDpyZ2JhKDIzMiwxMjksNDIsLjEpO2JvcmRlci1jb2xvcjp2YXIoLS1vcmFuZ2UpfQpAa2V5ZnJhbWVzIGJvdW5jZXswJSwxMDAle3RyYW5zZm9ybTp0cmFuc2xhdGVZKDApfTUwJXt0cmFuc2Zvcm06dHJhbnNsYXRlWSg4cHgpfX0KCi8qIOKUgOKUgCBDQUxDIFRSQU5TSVRJT04g4pSA4pSAICovCi5jYWxjLWludHJvewogIHRleHQtYWxpZ246Y2VudGVyO3BhZGRpbmc6NjBweCAyNHB4IDA7CiAgYmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCMwMzAzMDQgMCUsIzA4MDgwOCAxMDAlKTsKICBwb3NpdGlvbjpyZWxhdGl2ZTt6LWluZGV4OjE7Cn0KLmNpLWxhYmVse2ZvbnQtc2l6ZToxMHB4O2NvbG9yOnZhcigtLW9yYW5nZSk7bGV0dGVyLXNwYWNpbmc6NHB4O3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTttYXJnaW4tYm90dG9tOjEycHg7CiAgb3BhY2l0eTowO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDEwcHgpO3RyYW5zaXRpb246b3BhY2l0eSAuN3MsdHJhbnNmb3JtIC43czt9Ci5jaS10aXRsZXtmb250LXNpemU6Y2xhbXAoMjhweCw1dncsNDhweCk7Zm9udC13ZWlnaHQ6OTAwO2NvbG9yOnZhcigtLXRleHQpO2xldHRlci1zcGFjaW5nOi0xcHg7bWFyZ2luLWJvdHRvbTo4cHg7CiAgb3BhY2l0eTowO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDEwcHgpO3RyYW5zaXRpb246b3BhY2l0eSAuN3MgLjFzLHRyYW5zZm9ybSAuN3MgLjFzO30KLmNpLWRlc2N7Zm9udC1zaXplOjE0cHg7Y29sb3I6dmFyKC0tbXV0ZWQpO2ZvbnQtd2VpZ2h0OjMwMDsKICBvcGFjaXR5OjA7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoMTBweCk7dHJhbnNpdGlvbjpvcGFjaXR5IC43cyAuMnMsdHJhbnNmb3JtIC43cyAuMnM7fQouY2ktbGluZXt3aWR0aDowO2hlaWdodDoycHg7bWFyZ2luOjI4cHggYXV0byAwOwogIGJhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDkwZGVnLHRyYW5zcGFyZW50LHZhcigtLW9yYW5nZSksdHJhbnNwYXJlbnQpOwogIHRyYW5zaXRpb246d2lkdGggMXMgLjNzO30KLmNpLWxhYmVsLnZpc3tvcGFjaXR5OjE7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoMCl9Ci5jaS10aXRsZS52aXN7b3BhY2l0eToxO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDApfQouY2ktZGVzYy52aXN7b3BhY2l0eToxO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDApfQouY2ktbGluZS52aXN7d2lkdGg6MjgwcHh9CgovKiDilIDilIAgQ0FMQyBTRUNUSU9OIOKUgOKUgCAqLwojY2FsY3VsYXRvcntiYWNrZ3JvdW5kOiMwNTA1MDY7cG9zaXRpb246cmVsYXRpdmU7ei1pbmRleDoxO30KLmNhbGMtcmV2ZWFse29wYWNpdHk6MDt0cmFuc2Zvcm06dHJhbnNsYXRlWSgzMnB4KTt0cmFuc2l0aW9uOm9wYWNpdHkgLjhzIC4ycyx0cmFuc2Zvcm0gLjhzIC4yczt9Ci5jYWxjLXJldmVhbC52aXN7b3BhY2l0eToxO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDApfQojY2FsY3VsYXRvciAud3JhcHBlcntwYWRkaW5nLXRvcDoxMnB4IWltcG9ydGFudDttYXgtd2lkdGg6NzIwcHghaW1wb3J0YW50O21hcmdpbjowIGF1dG8haW1wb3J0YW50O30KI2NhbGN1bGF0b3IgaGVhZGVyLmhlYWRlcntkaXNwbGF5Om5vbmUhaW1wb3J0YW50fQoKLyog4pSA4pSAIFBST1RFQ1QgSEVSTyBGT05UUyBmcm9tIGNhbGMgQ1NTIG92ZXJyaWRlIOKUgOKUgCAqLwouaGVybyAuaGVyby10aXRsZXsKICBmb250LXNpemU6Y2xhbXAoNDhweCw5dncsMTEwcHgpIWltcG9ydGFudDsKICBmb250LXdlaWdodDo5MDAhaW1wb3J0YW50OwogIGxpbmUtaGVpZ2h0Oi45IWltcG9ydGFudDsKICBsZXR0ZXItc3BhY2luZzotM3B4IWltcG9ydGFudDsKICBmb250LWZhbWlseTonSGVlYm8nLHNhbnMtc2VyaWYhaW1wb3J0YW50Owp9Ci5oZXJvIC53b3JkLWNhcnBldHsKICBmb250LXNpemU6aW5oZXJpdCFpbXBvcnRhbnQ7CiAgZm9udC13ZWlnaHQ6aW5oZXJpdCFpbXBvcnRhbnQ7CiAgbGV0dGVyLXNwYWNpbmc6aW5oZXJpdCFpbXBvcnRhbnQ7CiAgYmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCNmZjdhMmEsI2ZmNDUwMCkhaW1wb3J0YW50OwogIC13ZWJraXQtYmFja2dyb3VuZC1jbGlwOnRleHQhaW1wb3J0YW50OwogIC13ZWJraXQtdGV4dC1maWxsLWNvbG9yOnRyYW5zcGFyZW50IWltcG9ydGFudDsKICBiYWNrZ3JvdW5kLWNsaXA6dGV4dCFpbXBvcnRhbnQ7Cn0KLmhlcm8gLndvcmQtY2xlYW57CiAgZm9udC1zaXplOmluaGVyaXQhaW1wb3J0YW50O2ZvbnQtd2VpZ2h0OmluaGVyaXQhaW1wb3J0YW50O2xldHRlci1zcGFjaW5nOmluaGVyaXQhaW1wb3J0YW50Owp9Ci5oZXJvIC53b3JkLWZpeHsKICBmb250LXNpemU6aW5oZXJpdCFpbXBvcnRhbnQ7Zm9udC13ZWlnaHQ6MjAwIWltcG9ydGFudDtsZXR0ZXItc3BhY2luZzppbmhlcml0IWltcG9ydGFudDsKfQouaGVybyAuaGVyby1zdWJ7CiAgZm9udC1zaXplOjE2cHghaW1wb3J0YW50O2ZvbnQtd2VpZ2h0OjMwMCFpbXBvcnRhbnQ7Zm9udC1mYW1pbHk6J0hlZWJvJyxzYW5zLXNlcmlmIWltcG9ydGFudDsKfQovKiDilIDilIAgQ0FMQyBPUklHSU5BTCBDU1Mg4pSA4pSAICovCi8qIE92ZXJyaWRlIGNhbGMgdmFyaWFibGVzIHRvIG1hdGNoIG1vY2t1cCBleGFjdGx5ICovCiNjYWxjdWxhdG9yIHsKICAtLWJnOiAjMDMwMzA0OwogIC0tc3VyZmFjZTogIzBlMGUxMDsKICAtLXN1cmZhY2UyOiAjMTYxNjE4OwogIC0tYm9yZGVyOiByZ2JhKDI1NSwyNTUsMjU1LC4wNik7CiAgLS1nb2xkOiAjZTg4MTJhOwogIC0tZ29sZC1saWdodDogI2Y1YTA1YTsKICAtLWdvbGQtZGltOiByZ2JhKDIzMiwxMjksNDIsLjM1KTsKICAtLXRleHQ6ICNmMGYwZjI7CiAgLS10ZXh0LW11dGVkOiAjNjA2MDZhOwogIC0tdGV4dC1kaW06ICM0MDQwNDg7CiAgLS1hY2NlbnQ6ICNlODgxMmE7CiAgLS1ncmVlbjogIzRjYWY3NDsKfQojY2FsY3VsYXRvciAud3JhcHBlciB7CiAgYmFja2dyb3VuZDogIzAzMDMwNCAhaW1wb3J0YW50Owp9Ci8qIHRhYnMg4oCUIG1hdGNoIG1vY2t1cCB0YWJzIGV4YWN0bHkgKi8KI2NhbGN1bGF0b3IgLnRhYnMgewogIGJhY2tncm91bmQ6ICMwZTBlMTAgIWltcG9ydGFudDsKICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LC4wNikgIWltcG9ydGFudDsKfQojY2FsY3VsYXRvciAudGFiLWJ0bi5hY3RpdmUgewogIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNlODgxMmEsICNjOTZhMTgpICFpbXBvcnRhbnQ7CiAgY29sb3I6ICMwMzAzMDQgIWltcG9ydGFudDsKICBib3gtc2hhZG93OiAwIDRweCAyMHB4IHJnYmEoMjMyLDEyOSw0MiwuMykgIWltcG9ydGFudDsKfQovKiBjYXJkcyAqLwojY2FsY3VsYXRvciAuY2FycGV0LWNhcmQsCiNjYWxjdWxhdG9yIC5yZXBhaXItY2FyZCB7CiAgYmFja2dyb3VuZDogIzBlMGUxMCAhaW1wb3J0YW50OwogIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsLjA2KSAhaW1wb3J0YW50Owp9Ci8qIGlucHV0cyAqLwojY2FsY3VsYXRvciAuZmllbGQgaW5wdXRbdHlwZT0ibnVtYmVyIl0gewogIGJhY2tncm91bmQ6ICMxNjE2MTggIWltcG9ydGFudDsKICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LC4wNikgIWltcG9ydGFudDsKICBjb2xvcjogI2YwZjBmMiAhaW1wb3J0YW50Owp9CiNjYWxjdWxhdG9yIC5maWVsZCBpbnB1dDpmb2N1cyB7CiAgYm9yZGVyLWNvbG9yOiByZ2JhKDIzMiwxMjksNDIsLjUpICFpbXBvcnRhbnQ7CiAgYm94LXNoYWRvdzogMCAwIDAgM3B4IHJnYmEoMjMyLDEyOSw0MiwuMSkgIWltcG9ydGFudDsKfQovKiB0eXBlIGJ1dHRvbnMgKi8KI2NhbGN1bGF0b3IgLnR5cGUtb3B0IGxhYmVsIHsKICBiYWNrZ3JvdW5kOiAjMTYxNjE4ICFpbXBvcnRhbnQ7CiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwuMDYpICFpbXBvcnRhbnQ7Cn0KI2NhbGN1bGF0b3IgLnR5cGUtb3B0IGlucHV0OmNoZWNrZWQgKyBsYWJlbCB7CiAgYm9yZGVyLWNvbG9yOiAjZTg4MTJhICFpbXBvcnRhbnQ7CiAgYmFja2dyb3VuZDogcmdiYSgyMzIsMTI5LDQyLC4xKSAhaW1wb3J0YW50Owp9CiNjYWxjdWxhdG9yIC50eXBlLW9wdCBpbnB1dDpjaGVja2VkICsgbGFiZWwgLnR5cGUtbmFtZSB7IGNvbG9yOiAjZjVhMDVhICFpbXBvcnRhbnQ7IH0KI2NhbGN1bGF0b3IgLnR5cGUtb3B0IGlucHV0OmNoZWNrZWQgKyBsYWJlbCAudHlwZS1wcmljZSB7IGNvbG9yOiAjZTg4MTJhICFpbXBvcnRhbnQ7IH0KLyogc2VydmljZXMgKi8KI2NhbGN1bGF0b3IgLnN2Yy1vcHQgbGFiZWwsCiNjYWxjdWxhdG9yIC5yc3ZjLW9wdCBsYWJlbCB7CiAgYmFja2dyb3VuZDogIzE2MTYxOCAhaW1wb3J0YW50OwogIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsLjA2KSAhaW1wb3J0YW50Owp9CiNjYWxjdWxhdG9yIC5zdmMtb3B0IGlucHV0OmNoZWNrZWQgKyBsYWJlbCB7CiAgYm9yZGVyLWNvbG9yOiByZ2JhKDIzMiwxMjksNDIsLjQpICFpbXBvcnRhbnQ7CiAgYmFja2dyb3VuZDogcmdiYSgyMzIsMTI5LDQyLC4wOCkgIWltcG9ydGFudDsKfQojY2FsY3VsYXRvciAuc3ZjLW9wdCBpbnB1dDpjaGVja2VkICsgbGFiZWwgLmNoayB7CiAgYmFja2dyb3VuZDogI2U4ODEyYSAhaW1wb3J0YW50OwogIGJvcmRlci1jb2xvcjogI2U4ODEyYSAhaW1wb3J0YW50Owp9CiNjYWxjdWxhdG9yIC5yc3ZjLW9wdCBpbnB1dDpjaGVja2VkICsgbGFiZWwgewogIGJvcmRlci1jb2xvcjogI2U4ODEyYSAhaW1wb3J0YW50OwogIGJhY2tncm91bmQ6IHJnYmEoMjMyLDEyOSw0MiwuMDgpICFpbXBvcnRhbnQ7Cn0KI2NhbGN1bGF0b3IgLnJzdmMtb3B0IGlucHV0OmNoZWNrZWQgKyBsYWJlbCAucnN2Yy1jaGVjayB7CiAgYmFja2dyb3VuZDogI2U4ODEyYSAhaW1wb3J0YW50OwogIGJvcmRlci1jb2xvcjogI2U4ODEyYSAhaW1wb3J0YW50Owp9CiNjYWxjdWxhdG9yIC5yc3ZjLW9wdCBpbnB1dDpjaGVja2VkICsgbGFiZWwgLnJzdmMtcHJpY2UtYmFkZ2UgewogIGNvbG9yOiAjZTg4MTJhICFpbXBvcnRhbnQ7CiAgYm9yZGVyLWNvbG9yOiAjZTg4MTJhICFpbXBvcnRhbnQ7Cn0KLyogYXJlYSBpbmZvICovCiNjYWxjdWxhdG9yIC5hcmVhLWluZm8gewogIGJhY2tncm91bmQ6IHJnYmEoMjMyLDEyOSw0MiwuMDgpICFpbXBvcnRhbnQ7CiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyMzIsMTI5LDQyLC4yKSAhaW1wb3J0YW50Owp9Ci8qIHN1YnRvdGFscyAqLwojY2FsY3VsYXRvciAuY2FyZC1zdWJ0b3RhbCB7CiAgYmFja2dyb3VuZDogcmdiYSgyMzIsMTI5LDQyLC4wOCkgIWltcG9ydGFudDsKICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDIzMiwxMjksNDIsLjI1KSAhaW1wb3J0YW50Owp9CiNjYWxjdWxhdG9yIC5yZXBhaXItY2FyZC1zdWJ0b3RhbCB7CiAgYmFja2dyb3VuZDogcmdiYSgyMzIsMTI5LDQyLC4wNikgIWltcG9ydGFudDsKICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDIzMiwxMjksNDIsLjI1KSAhaW1wb3J0YW50Owp9Ci8qIHRvdGFsIHBhbmVsICovCiNjYWxjdWxhdG9yIC50b3RhbC1wYW5lbCB7CiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzBlMGUxMCwgIzA4MDgwOSkgIWltcG9ydGFudDsKICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDIzMiwxMjksNDIsLjI1KSAhaW1wb3J0YW50Owp9Ci8qIGRlbGl2ZXJ5ICovCiNjYWxjdWxhdG9yIC5kZWxpdmVyeS1zZWN0aW9uIHsKICBiYWNrZ3JvdW5kOiAjMGUwZTEwICFpbXBvcnRhbnQ7CiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwuMDYpICFpbXBvcnRhbnQ7Cn0KI2NhbGN1bGF0b3IgLmRlbGl2ZXJ5LW9wdCBsYWJlbCB7CiAgYmFja2dyb3VuZDogIzE2MTYxOCAhaW1wb3J0YW50OwogIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsLjA2KSAhaW1wb3J0YW50Owp9CiNjYWxjdWxhdG9yIC5kZWxpdmVyeS1vcHQgaW5wdXQ6Y2hlY2tlZCArIGxhYmVsIHsKICBib3JkZXItY29sb3I6ICNlODgxMmEgIWltcG9ydGFudDsKICBiYWNrZ3JvdW5kOiByZ2JhKDIzMiwxMjksNDIsLjEpICFpbXBvcnRhbnQ7Cn0KI2NhbGN1bGF0b3IgLmJyYW5jaC1yb3cgc2VsZWN0IHsKICBiYWNrZ3JvdW5kOiAjMTYxNjE4ICFpbXBvcnRhbnQ7CiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwuMDYpICFpbXBvcnRhbnQ7CiAgY29sb3I6ICNmMGYwZjIgIWltcG9ydGFudDsKfQojY2FsY3VsYXRvciAuYnJhbmNoLWRldGFpbCB7CiAgYmFja2dyb3VuZDogIzE2MTYxOCAhaW1wb3J0YW50OwogIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsLjA2KSAhaW1wb3J0YW50Owp9Ci8qIHNpZGUgc2VsZWN0b3IgKi8KI2NhbGN1bGF0b3IgLnNpZGUtc2VsZWN0b3IgewogIGJhY2tncm91bmQ6ICMxNjE2MTggIWltcG9ydGFudDsKICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDIzMiwxMjksNDIsLjIpICFpbXBvcnRhbnQ7Cn0KI2NhbGN1bGF0b3IgLnNpZGUtYnRuIHsKICBiYWNrZ3JvdW5kOiAjMGUwZTEwICFpbXBvcnRhbnQ7CiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwuMDYpICFpbXBvcnRhbnQ7CiAgY29sb3I6ICM2MDYwNmEgIWltcG9ydGFudDsKfQojY2FsY3VsYXRvciAuc2lkZS1idG4uYWN0aXZlIHsKICBib3JkZXItY29sb3I6ICNlODgxMmEgIWltcG9ydGFudDsKICBiYWNrZ3JvdW5kOiByZ2JhKDIzMiwxMjksNDIsLjEyKSAhaW1wb3J0YW50OwogIGNvbG9yOiAjZjVhMDVhICFpbXBvcnRhbnQ7Cn0KLyogYWRkIGJ0biAqLwojY2FsY3VsYXRvciAuYWRkLWJ0biB7CiAgYm9yZGVyLWNvbG9yOiByZ2JhKDI1NSwyNTUsMjU1LC4wOCkgIWltcG9ydGFudDsKICBjb2xvcjogIzYwNjA2YSAhaW1wb3J0YW50Owp9CiNjYWxjdWxhdG9yIC5hZGQtYnRuOmhvdmVyIHsKICBib3JkZXItY29sb3I6IHJnYmEoMjMyLDEyOSw0MiwuNCkgIWltcG9ydGFudDsKICBjb2xvcjogI2U4ODEyYSAhaW1wb3J0YW50Owp9Ci8qIHByaW50IGJ0biAqLwojY2FsY3VsYXRvciAucHJpbnQtYnRuIHsKICBib3JkZXItY29sb3I6IHJnYmEoMjU1LDI1NSwyNTUsLjA4KSAhaW1wb3J0YW50OwogIGNvbG9yOiAjNjA2MDZhICFpbXBvcnRhbnQ7Cn0KLyogbWluIG5vdGljZSAqLwojY2FsY3VsYXRvciAubWluLW5vdGljZSB7CiAgYmFja2dyb3VuZDogcmdiYSgyMzIsMTI5LDQyLC4wOCkgIWltcG9ydGFudDsKICBib3JkZXItY29sb3I6IHJnYmEoMjMyLDEyOSw0MiwuMykgIWltcG9ydGFudDsKfQojY2FsY3VsYXRvcnsKICAtLWJnOiMwMzAzMDQ7LS1zdXJmYWNlOiMwZTBlMTA7LS1zdXJmYWNlMjojMTYxNjE4Oy0tYm9yZGVyOnJnYmEoMjU1LDI1NSwyNTUsLjA2KTsKICAtLWdvbGQ6I2U4ODEyYTstLWdvbGQtbGlnaHQ6I2Y1YTA1YTstLWdvbGQtZGltOnJnYmEoMjMyLDEyOSw0MiwuMzUpOwogIC0tdGV4dDojZjBmMGYyOy0tdGV4dC1tdXRlZDojNjA2MDZhOy0tdGV4dC1kaW06IzQwNDA0ODsKICAtLWFjY2VudDojZTg4MTJhOy0tZ3JlZW46IzRjYWY3NDstLXJhZGl1czoxNHB4Oy0tcmFkaXVzLXNtOjhweDsKfQoqe2JveC1zaXppbmc6Ym9yZGVyLWJveDttYXJnaW46MDtwYWRkaW5nOjB9Ci8qIGJvZHkgb3ZlcnJpZGUgcmVtb3ZlZCAtIHByb21vIGhhbmRsZXMgdGhpcyAqLwovKiBib2R5OjpiZWZvcmUgcmVtb3ZlZCAtIHByb21vIGhhbmRsZXMgYmFja2dyb3VuZCAqLwojY2FsY3VsYXRvciAud3JhcHBlcntwb3NpdGlvbjpyZWxhdGl2ZTt6LWluZGV4OjE7bWF4LXdpZHRoOjkyMHB4O21hcmdpbjowIGF1dG87cGFkZGluZzozMnB4IDE2cHggODBweH0KLmhlYWRlcnt0ZXh0LWFsaWduOmNlbnRlcjttYXJnaW4tYm90dG9tOjM2cHh9Ci5sb2dvLXdyYXB7ZGlzcGxheTppbmxpbmUtZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjE0cHg7bWFyZ2luLWJvdHRvbToxNnB4O2N1cnNvcjpwb2ludGVyO3RleHQtZGVjb3JhdGlvbjpub25lfQoubG9nby1pbWd7aGVpZ2h0OjU2cHg7d2lkdGg6YXV0bztmaWx0ZXI6ZHJvcC1zaGFkb3coMCA0cHggMTZweCByZ2JhKDIwMSwxNjgsNzYsLjMpKX0KLmxvZ28tdGV4dCBoMXtmb250LXNpemU6MjRweDtmb250LXdlaWdodDo4MDA7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLHZhcigtLWdvbGQtbGlnaHQpLHZhcigtLWdvbGQpKTstd2Via2l0LWJhY2tncm91bmQtY2xpcDp0ZXh0Oy13ZWJraXQtdGV4dC1maWxsLWNvbG9yOnRyYW5zcGFyZW50O2JhY2tncm91bmQtY2xpcDp0ZXh0O3RleHQtYWxpZ246cmlnaHR9Ci5sb2dvLXRleHQgcHtmb250LXNpemU6MTNweDtjb2xvcjp2YXIoLS10ZXh0LW11dGVkKTt0ZXh0LWFsaWduOnJpZ2h0fQouaGVhZGVyLWRpdmlkZXJ7aGVpZ2h0OjFweDtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCg5MGRlZyx0cmFuc3BhcmVudCx2YXIoLS1nb2xkLWRpbSksdHJhbnNwYXJlbnQpO21heC13aWR0aDo0NDBweDttYXJnaW46MCBhdXRvfQoudGFic3tkaXNwbGF5OmZsZXg7YmFja2dyb3VuZDp2YXIoLS1zdXJmYWNlKTtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7Ym9yZGVyLXJhZGl1czo1MHB4O3BhZGRpbmc6NHB4O21hcmdpbi1ib3R0b206MjhweDtnYXA6NHB4fQoudGFiLWJ0bntmbGV4OjE7cGFkZGluZzoxMXB4O2JvcmRlcjpub25lO2JhY2tncm91bmQ6dHJhbnNwYXJlbnQ7Y29sb3I6dmFyKC0tdGV4dC1tdXRlZCk7Zm9udC1mYW1pbHk6J0hlZWJvJyxzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNXB4O2ZvbnQtd2VpZ2h0OjYwMDtib3JkZXItcmFkaXVzOjQ2cHg7Y3Vyc29yOnBvaW50ZXI7dHJhbnNpdGlvbjphbGwgLjI1c30KLnRhYi1idG4uYWN0aXZle2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDEzNWRlZyx2YXIoLS1nb2xkKSwjYTg3ODJhKTtjb2xvcjojMGYwZTBkO2JveC1zaGFkb3c6MCA0cHggMjBweCByZ2JhKDIwMSwxNjgsNzYsLjM1KX0KLnRhYi1idG46bm90KC5hY3RpdmUpOmhvdmVye2NvbG9yOnZhcigtLXRleHQpO2JhY2tncm91bmQ6dmFyKC0tc3VyZmFjZTIpfQouc2VjdGlvbntkaXNwbGF5Om5vbmV9LnNlY3Rpb24uYWN0aXZle2Rpc3BsYXk6YmxvY2t9Ci5jYXJwZXQtbGlzdHtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2dhcDoxOHB4fQouY2FycGV0LWNhcmR7YmFja2dyb3VuZDp2YXIoLS1zdXJmYWNlKTtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7Ym9yZGVyLXJhZGl1czp2YXIoLS1yYWRpdXMpO3BhZGRpbmc6MjJweDtwb3NpdGlvbjpyZWxhdGl2ZTt0cmFuc2l0aW9uOmJvcmRlci1jb2xvciAuMnM7YW5pbWF0aW9uOnNsaWRlSW4gLjNzIGVhc2V9Ci5jYXJwZXQtY2FyZDpob3Zlcntib3JkZXItY29sb3I6dmFyKC0tZ29sZC1kaW0pfQpAa2V5ZnJhbWVzIHNsaWRlSW57ZnJvbXtvcGFjaXR5OjA7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoMTBweCl9dG97b3BhY2l0eToxO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDApfX0KLmNhcnBldC1jYXJkLWhlYWRlcntkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47YWxpZ24taXRlbXM6Y2VudGVyO21hcmdpbi1ib3R0b206MThweH0KLmNhcnBldC1udW17Zm9udC1zaXplOjExcHg7Zm9udC13ZWlnaHQ6NzAwO2NvbG9yOnZhcigtLWdvbGQpO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtsZXR0ZXItc3BhY2luZzoxLjVweH0KLnJlbW92ZS1idG57d2lkdGg6MjhweDtoZWlnaHQ6MjhweDtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7YmFja2dyb3VuZDp0cmFuc3BhcmVudDtjb2xvcjp2YXIoLS10ZXh0LW11dGVkKTtib3JkZXItcmFkaXVzOjUwJTtjdXJzb3I6cG9pbnRlcjtmb250LXNpemU6MTVweDtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7dHJhbnNpdGlvbjphbGwgLjJzfQoucmVtb3ZlLWJ0bjpob3Zlcntib3JkZXItY29sb3I6I2MwMzkyYjtjb2xvcjojYzAzOTJiO2JhY2tncm91bmQ6cmdiYSgxOTIsNTcsNDMsLjEpfQouZGltcy1wcmV2aWV3LXJvd3tkaXNwbGF5OmdyaWQ7Z3JpZC10ZW1wbGF0ZS1jb2x1bW5zOjFmciAxMTBweDtnYXA6MTRweDttYXJnaW4tYm90dG9tOjE4cHg7YWxpZ24taXRlbXM6c3RhcnR9Ci5kaW1zLWlucHV0c3tkaXNwbGF5OmdyaWQ7Z3JpZC10ZW1wbGF0ZS1jb2x1bW5zOjFmciAxZnI7Z2FwOjEwcHh9Ci5maWVsZCBsYWJlbHtkaXNwbGF5OmJsb2NrO2ZvbnQtc2l6ZToxMXB4O2ZvbnQtd2VpZ2h0OjcwMDtjb2xvcjp2YXIoLS10ZXh0LW11dGVkKTttYXJnaW4tYm90dG9tOjVweDtsZXR0ZXItc3BhY2luZzouNXB4fQouZmllbGQgaW5wdXRbdHlwZT0ibnVtYmVyIl17d2lkdGg6MTAwJTtiYWNrZ3JvdW5kOnZhcigtLXN1cmZhY2UyKTtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7Ym9yZGVyLXJhZGl1czp2YXIoLS1yYWRpdXMtc20pO2NvbG9yOnZhcigtLXRleHQpO2ZvbnQtZmFtaWx5OidIZWVibycsc2Fucy1zZXJpZjtmb250LXNpemU6MTZweDtmb250LXdlaWdodDo3MDA7cGFkZGluZzoxMHB4IDEycHg7b3V0bGluZTpub25lO3RyYW5zaXRpb246Ym9yZGVyLWNvbG9yIC4ycyxib3gtc2hhZG93IC4yc30KLmZpZWxkIGlucHV0OmZvY3Vze2JvcmRlci1jb2xvcjp2YXIoLS1nb2xkLWRpbSk7Ym94LXNoYWRvdzowIDAgMCAzcHggcmdiYSgyMDEsMTY4LDc2LC4xMil9Ci5hcmVhLWluZm97Z3JpZC1jb2x1bW46MS8tMTtiYWNrZ3JvdW5kOnZhcigtLXN1cmZhY2UyKTtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7Ym9yZGVyLXJhZGl1czp2YXIoLS1yYWRpdXMtc20pO3BhZGRpbmc6OHB4IDEycHg7dGV4dC1hbGlnbjpjZW50ZXI7bWFyZ2luLXRvcDo4cHh9Ci5hcmVhLXZhbHtmb250LXNpemU6MThweDtmb250LXdlaWdodDo4MDA7Y29sb3I6dmFyKC0tZ29sZCl9LmFyZWEtbGJse2ZvbnQtc2l6ZToxMHB4O2NvbG9yOnZhcigtLXRleHQtbXV0ZWQpO2Rpc3BsYXk6YmxvY2s7bGV0dGVyLXNwYWNpbmc6LjVweH0KLmNhcnBldC1wcmV2aWV3e2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47YWxpZ24taXRlbXM6Y2VudGVyO2dhcDo1cHh9Ci5wcmV2aWV3LWJveHt3aWR0aDoxMDAlO2JhY2tncm91bmQ6dmFyKC0tc3VyZmFjZTIpO2JvcmRlcjoxcHggc29saWQgdmFyKC0tYm9yZGVyKTtib3JkZXItcmFkaXVzOjEwcHg7cGFkZGluZzo4cHg7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO21pbi1oZWlnaHQ6ODZweH0KLnByZXZpZXctbGFiZWx7Zm9udC1zaXplOjEwcHg7Y29sb3I6dmFyKC0tdGV4dC1kaW0pO3RleHQtYWxpZ246Y2VudGVyfQoudHlwZS1ncmlke2Rpc3BsYXk6Z3JpZDtncmlkLXRlbXBsYXRlLWNvbHVtbnM6cmVwZWF0KDMsMWZyKTtnYXA6OHB4O21hcmdpbi1ib3R0b206MTZweH0KLnR5cGUtb3B0e3Bvc2l0aW9uOnJlbGF0aXZlfS50eXBlLW9wdCBpbnB1dHtwb3NpdGlvbjphYnNvbHV0ZTtvcGFjaXR5OjA7d2lkdGg6MDtoZWlnaHQ6MH0KLnR5cGUtb3B0IGxhYmVse2Rpc3BsYXk6YmxvY2s7cGFkZGluZzoxMHB4IDhweDtiYWNrZ3JvdW5kOnZhcigtLXN1cmZhY2UyKTtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7Ym9yZGVyLXJhZGl1czp2YXIoLS1yYWRpdXMtc20pO2N1cnNvcjpwb2ludGVyO3RleHQtYWxpZ246Y2VudGVyO3RyYW5zaXRpb246YWxsIC4yc30KLnR5cGUtbmFtZXtmb250LXNpemU6MTJweDtmb250LXdlaWdodDo2MDA7Y29sb3I6dmFyKC0tdGV4dC1tdXRlZCk7ZGlzcGxheTpibG9ja30KLnR5cGUtcHJpY2V7Zm9udC1zaXplOjExcHg7Y29sb3I6dmFyKC0tdGV4dC1kaW0pO2Rpc3BsYXk6YmxvY2s7bWFyZ2luLXRvcDoycHh9Ci50eXBlLW9wdCBpbnB1dDpjaGVja2VkK2xhYmVse2JvcmRlci1jb2xvcjp2YXIoLS1nb2xkKTtiYWNrZ3JvdW5kOnJnYmEoMjAxLDE2OCw3NiwuMSl9Ci50eXBlLW9wdCBpbnB1dDpjaGVja2VkK2xhYmVsIC50eXBlLW5hbWV7Y29sb3I6dmFyKC0tZ29sZC1saWdodCl9Ci50eXBlLW9wdCBpbnB1dDpjaGVja2VkK2xhYmVsIC50eXBlLXByaWNle2NvbG9yOnZhcigtLWdvbGQpfQouc2VydmljZXMtdGl0bGV7Zm9udC1zaXplOjExcHg7Zm9udC13ZWlnaHQ6NzAwO2NvbG9yOnZhcigtLXRleHQtbXV0ZWQpO2xldHRlci1zcGFjaW5nOi41cHg7bWFyZ2luLWJvdHRvbTo4cHh9Ci5zZXJ2aWNlcy1ncmlke2Rpc3BsYXk6Z3JpZDtncmlkLXRlbXBsYXRlLWNvbHVtbnM6MWZyIDFmcjtnYXA6N3B4O21hcmdpbi1ib3R0b206MTRweH0KLnN2Yy1vcHR7cG9zaXRpb246cmVsYXRpdmV9LnN2Yy1vcHQgaW5wdXR7cG9zaXRpb246YWJzb2x1dGU7b3BhY2l0eTowO3dpZHRoOjA7aGVpZ2h0OjB9Ci5zdmMtb3B0IGxhYmVse2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjhweDtwYWRkaW5nOjlweCAxMXB4O2JhY2tncm91bmQ6dmFyKC0tc3VyZmFjZTIpO2JvcmRlcjoxcHggc29saWQgdmFyKC0tYm9yZGVyKTtib3JkZXItcmFkaXVzOnZhcigtLXJhZGl1cy1zbSk7Y3Vyc29yOnBvaW50ZXI7dHJhbnNpdGlvbjphbGwgLjJzfQouc3ZjLW9wdCBpbnB1dDpjaGVja2VkK2xhYmVse2JvcmRlci1jb2xvcjp2YXIoLS1nb2xkLWRpbSk7YmFja2dyb3VuZDpyZ2JhKDIwMSwxNjgsNzYsLjA3KX0KLmNoa3t3aWR0aDoxN3B4O2hlaWdodDoxN3B4O2JvcmRlcjoxLjVweCBzb2xpZCB2YXIoLS1ib3JkZXIpO2JvcmRlci1yYWRpdXM6NHB4O2ZsZXgtc2hyaW5rOjA7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2ZvbnQtc2l6ZToxMHB4O2NvbG9yOnRyYW5zcGFyZW50O3RyYW5zaXRpb246YWxsIC4yc30KLnN2Yy1vcHQgaW5wdXQ6Y2hlY2tlZCtsYWJlbCAuY2hre2JhY2tncm91bmQ6dmFyKC0tZ29sZCk7Ym9yZGVyLWNvbG9yOnZhcigtLWdvbGQpO2NvbG9yOiMwMDB9Ci5zdmMtbmFtZXtmb250LXNpemU6MTJweDtmb250LXdlaWdodDo1MDA7Y29sb3I6dmFyKC0tdGV4dCk7ZGlzcGxheTpibG9ja30KLnN2Yy1wcmljZS1sYmx7Zm9udC1zaXplOjEwcHg7Y29sb3I6dmFyKC0tdGV4dC1tdXRlZCk7ZGlzcGxheTpibG9ja30KLmNhcmQtc3VidG90YWx7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLHJnYmEoMjAxLDE2OCw3NiwuMDgpLHJnYmEoMjEyLDExOCw1OSwuMDUpKTtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWdvbGQtZGltKTtib3JkZXItcmFkaXVzOnZhcigtLXJhZGl1cy1zbSk7cGFkZGluZzoxMXB4IDE0cHg7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2FsaWduLWl0ZW1zOmNlbnRlcjttYXJnaW4tdG9wOjE0cHh9Ci5jYXJkLXN1YnRvdGFsLWxhYmVse2ZvbnQtc2l6ZToxMnB4O2NvbG9yOnZhcigtLXRleHQtbXV0ZWQpfS5jYXJkLXN1YnRvdGFsLWFtb3VudHtmb250LXNpemU6MjBweDtmb250LXdlaWdodDo4MDA7Y29sb3I6dmFyKC0tZ29sZC1saWdodCl9Ci5hZGQtYnRue2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjtnYXA6OHB4O3dpZHRoOjEwMCU7cGFkZGluZzoxM3B4O2JhY2tncm91bmQ6dHJhbnNwYXJlbnQ7Ym9yZGVyOjEuNXB4IGRhc2hlZCB2YXIoLS1ib3JkZXIpO2JvcmRlci1yYWRpdXM6dmFyKC0tcmFkaXVzKTtjb2xvcjp2YXIoLS10ZXh0LW11dGVkKTtmb250LWZhbWlseTonSGVlYm8nLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEzcHg7Zm9udC13ZWlnaHQ6NjAwO2N1cnNvcjpwb2ludGVyO3RyYW5zaXRpb246YWxsIC4yczttYXJnaW4tdG9wOjRweH0KLmFkZC1idG46aG92ZXJ7Ym9yZGVyLWNvbG9yOnZhcigtLWdvbGQtZGltKTtjb2xvcjp2YXIoLS1nb2xkKX0KLmRlbGl2ZXJ5LXNlY3Rpb257YmFja2dyb3VuZDp2YXIoLS1zdXJmYWNlKTtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7Ym9yZGVyLXJhZGl1czp2YXIoLS1yYWRpdXMpO3BhZGRpbmc6MjJweDttYXJnaW4tdG9wOjE4cHh9Ci5kZWxpdmVyeS1zZWN0aW9uIGgze2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjcwMDtjb2xvcjp2YXIoLS10ZXh0LW11dGVkKTtsZXR0ZXItc3BhY2luZzouNXB4O21hcmdpbi1ib3R0b206MTRweH0KLmRlbGl2ZXJ5LWdyaWR7ZGlzcGxheTpncmlkO2dyaWQtdGVtcGxhdGUtY29sdW1uczoxZnIgMWZyO2dhcDoxMHB4O21hcmdpbi1ib3R0b206MTRweH0KLmRlbGl2ZXJ5LW9wdHtwb3NpdGlvbjpyZWxhdGl2ZX0uZGVsaXZlcnktb3B0IGlucHV0e3Bvc2l0aW9uOmFic29sdXRlO29wYWNpdHk6MH0KLmRlbGl2ZXJ5LW9wdCBsYWJlbHtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2dhcDoxMHB4O3BhZGRpbmc6MTNweCAxNHB4O2JhY2tncm91bmQ6dmFyKC0tc3VyZmFjZTIpO2JvcmRlcjoxcHggc29saWQgdmFyKC0tYm9yZGVyKTtib3JkZXItcmFkaXVzOnZhcigtLXJhZGl1cy1zbSk7Y3Vyc29yOnBvaW50ZXI7dHJhbnNpdGlvbjphbGwgLjJzfQouZGVsaXZlcnktb3B0IGlucHV0OmNoZWNrZWQrbGFiZWx7Ym9yZGVyLWNvbG9yOnZhcigtLWdvbGQpO2JhY2tncm91bmQ6cmdiYSgyMDEsMTY4LDc2LC4xKX0KLmRlbGl2ZXJ5LWljb257Zm9udC1zaXplOjIwcHh9LmRlbGl2ZXJ5LW5hbWV7Zm9udC1zaXplOjEzcHg7Zm9udC13ZWlnaHQ6NjAwO2NvbG9yOnZhcigtLXRleHQpO2Rpc3BsYXk6YmxvY2t9LmRlbGl2ZXJ5LWRlc2N7Zm9udC1zaXplOjExcHg7Y29sb3I6dmFyKC0tdGV4dC1tdXRlZCk7ZGlzcGxheTpibG9ja30KLmJyYW5jaC1yb3d7ZGlzcGxheTpub25lO21hcmdpbi10b3A6MTBweH0uYnJhbmNoLXJvdy52aXNpYmxle2Rpc3BsYXk6YmxvY2t9Ci5icmFuY2gtcm93PmxhYmVse2ZvbnQtc2l6ZToxMXB4O2NvbG9yOnZhcigtLXRleHQtbXV0ZWQpO2ZvbnQtd2VpZ2h0OjcwMDtkaXNwbGF5OmJsb2NrO21hcmdpbi1ib3R0b206NnB4O2xldHRlci1zcGFjaW5nOi41cHh9Ci5icmFuY2gtcm93IHNlbGVjdHt3aWR0aDoxMDAlO2JhY2tncm91bmQ6dmFyKC0tc3VyZmFjZTIpO2JvcmRlcjoxcHggc29saWQgdmFyKC0tYm9yZGVyKTtib3JkZXItcmFkaXVzOnZhcigtLXJhZGl1cy1zbSk7Y29sb3I6dmFyKC0tdGV4dCk7Zm9udC1mYW1pbHk6J0hlZWJvJyxzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjYwMDtwYWRkaW5nOjEwcHggMTJweDtvdXRsaW5lOm5vbmU7YXBwZWFyYW5jZTpub25lO2N1cnNvcjpwb2ludGVyO3RyYW5zaXRpb246Ym9yZGVyLWNvbG9yIC4yc30KLmJyYW5jaC1yb3cgc2VsZWN0OmZvY3Vze2JvcmRlci1jb2xvcjp2YXIoLS1nb2xkLWRpbSl9Ci5icmFuY2gtZGV0YWlse21hcmdpbi10b3A6MTBweDtwYWRkaW5nOjEycHggMTRweDtiYWNrZ3JvdW5kOnZhcigtLXN1cmZhY2UyKTtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7Ym9yZGVyLXJhZGl1czp2YXIoLS1yYWRpdXMtc20pO2ZvbnQtc2l6ZToxMnB4O2NvbG9yOnZhcigtLXRleHQtbXV0ZWQpO2xpbmUtaGVpZ2h0OjEuNztkaXNwbGF5Om5vbmV9Ci5icmFuY2gtZGV0YWlsLnZpc2libGV7ZGlzcGxheTpibG9ja30uYnJhbmNoLWRldGFpbCBzdHJvbmd7Y29sb3I6dmFyKC0tdGV4dCk7ZGlzcGxheTpibG9jazttYXJnaW4tYm90dG9tOjJweH0KLnRvdGFsLXBhbmVse21hcmdpbi10b3A6MjBweDtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxMzVkZWcsIzBlMGUxMCwjMDgwODA5KTtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWdvbGQtZGltKTtib3JkZXItcmFkaXVzOnZhcigtLXJhZGl1cyk7cGFkZGluZzoyNHB4O2JveC1zaGFkb3c6MCAxMnB4IDQ4cHggcmdiYSgwLDAsMCwuNCksaW5zZXQgMCAxcHggMCByZ2JhKDIwMSwxNjgsNzYsLjIpfQoudG90YWwtcm93c3tkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2dhcDoxMHB4O21hcmdpbi1ib3R0b206MTZweH0KLnRvdGFsLXJvd3tkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47YWxpZ24taXRlbXM6Y2VudGVyO2ZvbnQtc2l6ZToxM3B4fQoudG90YWwtcm93IC50ci1sYWJlbHtjb2xvcjp2YXIoLS10ZXh0LW11dGVkKX0udG90YWwtcm93IC50ci12YWx7Y29sb3I6dmFyKC0tdGV4dCk7Zm9udC13ZWlnaHQ6NjAwfQoudG90YWwtcm93LmRpc2Mtcm93IC50ci12YWx7Y29sb3I6dmFyKC0tZ3JlZW4pfS50b3RhbC1yb3cuZGVsLXJvdyAudHItdmFse2NvbG9yOnZhcigtLWFjY2VudCl9Ci50b3RhbC1kaXZpZGVye2hlaWdodDoxcHg7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoOTBkZWcsdHJhbnNwYXJlbnQsdmFyKC0tZ29sZC1kaW0pLHRyYW5zcGFyZW50KTttYXJnaW46NHB4IDB9Ci50b3RhbC1tYWlue2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjthbGlnbi1pdGVtczpiYXNlbGluZX0KLnRvdGFsLW1haW4tbGFiZWx7Zm9udC1zaXplOjE1cHg7Zm9udC13ZWlnaHQ6NzAwO2NvbG9yOnZhcigtLXRleHQpfQoudG90YWwtbWFpbi1hbW91bnR7Zm9udC1zaXplOjM2cHg7Zm9udC13ZWlnaHQ6ODAwO2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDEzNWRlZyx2YXIoLS1nb2xkLWxpZ2h0KSx2YXIoLS1nb2xkKSk7LXdlYmtpdC1iYWNrZ3JvdW5kLWNsaXA6dGV4dDstd2Via2l0LXRleHQtZmlsbC1jb2xvcjp0cmFuc3BhcmVudDtiYWNrZ3JvdW5kLWNsaXA6dGV4dDtsZXR0ZXItc3BhY2luZzotMXB4fQoudG90YWwtdmF0e2ZvbnQtc2l6ZToxMXB4O2NvbG9yOnZhcigtLXRleHQtZGltKTt0ZXh0LWFsaWduOmxlZnQ7bWFyZ2luLXRvcDozcHh9Ci5taW4tbm90aWNle2Rpc3BsYXk6bm9uZTttYXJnaW4tdG9wOjEwcHg7cGFkZGluZzoxMHB4IDE0cHg7YmFja2dyb3VuZDpyZ2JhKDIxMiwxMTgsNTksLjEpO2JvcmRlcjoxcHggc29saWQgcmdiYSgyMTIsMTE4LDU5LC4zNSk7Ym9yZGVyLXJhZGl1czp2YXIoLS1yYWRpdXMtc20pO2ZvbnQtc2l6ZToxMnB4O2NvbG9yOnZhcigtLWFjY2VudCl9Ci5taW4tbm90aWNlLnZpc2libGV7ZGlzcGxheTpibG9ja30KLmFjdGlvbi1yb3d7ZGlzcGxheTpncmlkO2dyaWQtdGVtcGxhdGUtY29sdW1uczoxZnI7Z2FwOjEwcHg7bWFyZ2luLXRvcDoxNnB4fQoucHJpbnQtYnRue3BhZGRpbmc6MTJweDtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7Ym9yZGVyLXJhZGl1czp2YXIoLS1yYWRpdXMpO2JhY2tncm91bmQ6dHJhbnNwYXJlbnQ7Y29sb3I6dmFyKC0tdGV4dC1tdXRlZCk7Zm9udC1mYW1pbHk6J0hlZWJvJyxzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxM3B4O2ZvbnQtd2VpZ2h0OjYwMDtjdXJzb3I6cG9pbnRlcjt0cmFuc2l0aW9uOmFsbCAuMnM7d2lkdGg6MTAwJX0KLnByaW50LWJ0bjpob3Zlcntib3JkZXItY29sb3I6dmFyKC0tdGV4dC1kaW0pO2NvbG9yOnZhcigtLXRleHQpfQouc3VtbWFyeS1ub3Rle2ZvbnQtc2l6ZToxMXB4O2NvbG9yOnZhcigtLXRleHQtZGltKTt0ZXh0LWFsaWduOmNlbnRlcjttYXJnaW4tdG9wOjEwcHh9Ci5yZXBhaXItbGlzdHtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2dhcDoxNnB4fQoucmVwYWlyLWNhcmR7YmFja2dyb3VuZDp2YXIoLS1zdXJmYWNlKTtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7Ym9yZGVyLXJhZGl1czp2YXIoLS1yYWRpdXMpO3BhZGRpbmc6MjBweDthbmltYXRpb246c2xpZGVJbiAuM3MgZWFzZX0KLnJlcGFpci1zZXJ2aWNlc3tkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2dhcDo3cHh9Ci5yc3ZjLWNhdGVnb3J5e2ZvbnQtc2l6ZToxMHB4O2ZvbnQtd2VpZ2h0OjcwMDtjb2xvcjp2YXIoLS10ZXh0LWRpbSk7bGV0dGVyLXNwYWNpbmc6MS41cHg7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO3BhZGRpbmc6MTBweCAwIDVweDtib3JkZXItdG9wOjFweCBzb2xpZCB2YXIoLS1ib3JkZXIpfQoucnN2Yy1jYXRlZ29yeTpmaXJzdC1jaGlsZHtib3JkZXItdG9wOm5vbmU7cGFkZGluZy10b3A6MH0KLnJzdmMtb3B0e3Bvc2l0aW9uOnJlbGF0aXZlfS5yc3ZjLW9wdCBpbnB1dHtwb3NpdGlvbjphYnNvbHV0ZTtvcGFjaXR5OjB9Ci5yc3ZjLW9wdCBsYWJlbHtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO3BhZGRpbmc6OXB4IDEycHg7YmFja2dyb3VuZDp2YXIoLS1zdXJmYWNlMik7Ym9yZGVyOjFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO2JvcmRlci1yYWRpdXM6dmFyKC0tcmFkaXVzLXNtKTtjdXJzb3I6cG9pbnRlcjt0cmFuc2l0aW9uOmFsbCAuMnM7Z2FwOjEwcHh9Ci5yc3ZjLW9wdCBpbnB1dDpjaGVja2VkK2xhYmVse2JvcmRlci1jb2xvcjp2YXIoLS1hY2NlbnQpO2JhY2tncm91bmQ6cmdiYSgyMTIsMTE4LDU5LC4wOCl9Ci5yc3ZjLWxlZnR7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtnYXA6OHB4fQoucnN2Yy1jaGVja3t3aWR0aDoxN3B4O2hlaWdodDoxN3B4O2JvcmRlcjoxLjVweCBzb2xpZCB2YXIoLS1ib3JkZXIpO2JvcmRlci1yYWRpdXM6NHB4O2ZsZXgtc2hyaW5rOjA7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2ZvbnQtc2l6ZToxMHB4O2NvbG9yOnRyYW5zcGFyZW50O3RyYW5zaXRpb246YWxsIC4yc30KLnJzdmMtb3B0IGlucHV0OmNoZWNrZWQrbGFiZWwgLnJzdmMtY2hlY2t7YmFja2dyb3VuZDp2YXIoLS1hY2NlbnQpO2JvcmRlci1jb2xvcjp2YXIoLS1hY2NlbnQpO2NvbG9yOiNmZmZ9Ci5yc3ZjLW5hbWV7Zm9udC1zaXplOjEycHg7Y29sb3I6dmFyKC0tdGV4dCk7Zm9udC13ZWlnaHQ6NTAwfQoucnN2Yy1wcmljZS1iYWRnZXtmb250LXNpemU6MTFweDtjb2xvcjp2YXIoLS10ZXh0LW11dGVkKTtiYWNrZ3JvdW5kOnZhcigtLWJnKTtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7Ym9yZGVyLXJhZGl1czo0cHg7cGFkZGluZzoycHggN3B4O3doaXRlLXNwYWNlOm5vd3JhcDtmbGV4LXNocmluazowfQoucnN2Yy1vcHQgaW5wdXQ6Y2hlY2tlZCtsYWJlbCAucnN2Yy1wcmljZS1iYWRnZXtjb2xvcjp2YXIoLS1hY2NlbnQpO2JvcmRlci1jb2xvcjp2YXIoLS1hY2NlbnQpfQouc2lkZS1zZWxlY3RvcnttYXJnaW46NnB4IDAgNHB4O3BhZGRpbmc6MTBweCAxMnB4O2JhY2tncm91bmQ6dmFyKC0tc3VyZmFjZTIpO2JvcmRlcjoxcHggc29saWQgdmFyKC0tYm9yZGVyKTtib3JkZXItcmFkaXVzOnZhcigtLXJhZGl1cy1zbSk7ZGlzcGxheTpub25lfQouc2lkZS1zZWxlY3Rvci52aXNpYmxle2Rpc3BsYXk6YmxvY2t9Ci5zaWRlLXNlbC10aXRsZXtmb250LXNpemU6MTBweDtmb250LXdlaWdodDo3MDA7Y29sb3I6dmFyKC0tdGV4dC1tdXRlZCk7bGV0dGVyLXNwYWNpbmc6LjVweDttYXJnaW4tYm90dG9tOjhweDtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47YWxpZ24taXRlbXM6Y2VudGVyfQouc2lkZS1zZWwtdGl0bGUgc3Bhbntjb2xvcjp2YXIoLS1nb2xkKTtmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjEycHh9Ci5zaWRlcy1ncmlke2Rpc3BsYXk6Z3JpZDtnYXA6NXB4fQouc2lkZXMtZ3JpZC5mb3Vye2dyaWQtdGVtcGxhdGUtY29sdW1uczoxZnIgMWZyIDFmciAxZnJ9Ci5zaWRlcy1ncmlkLnR3b3tncmlkLXRlbXBsYXRlLWNvbHVtbnM6MWZyIDFmcn0KLnNpZGUtYnRue3BhZGRpbmc6NnB4IDRweDtiYWNrZ3JvdW5kOnZhcigtLXN1cmZhY2UpO2JvcmRlcjoxcHggc29saWQgdmFyKC0tYm9yZGVyKTtib3JkZXItcmFkaXVzOjZweDtjdXJzb3I6cG9pbnRlcjt0ZXh0LWFsaWduOmNlbnRlcjt0cmFuc2l0aW9uOmFsbCAuMnM7Zm9udC1zaXplOjExcHg7Zm9udC13ZWlnaHQ6NjAwO2NvbG9yOnZhcigtLXRleHQtbXV0ZWQpfQouc2lkZS1idG4uYWN0aXZle2JvcmRlci1jb2xvcjp2YXIoLS1hY2NlbnQpO2JhY2tncm91bmQ6cmdiYSgyMTIsMTE4LDU5LC4xMik7Y29sb3I6dmFyKC0tYWNjZW50KX0KLnNpZGUtYnRuIC5zYi1sZW57Zm9udC1zaXplOjEwcHg7Y29sb3I6dmFyKC0tdGV4dC1kaW0pO2Rpc3BsYXk6YmxvY2s7Zm9udC13ZWlnaHQ6NDAwO21hcmdpbi10b3A6MXB4fQouc2lkZS10b3RhbC1ub3Rle2ZvbnQtc2l6ZToxMHB4O2NvbG9yOnZhcigtLXRleHQtZGltKTttYXJnaW4tdG9wOjZweDt0ZXh0LWFsaWduOmxlZnR9Ci5yZXBhaXItY2FyZC1zdWJ0b3RhbHtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxMzVkZWcscmdiYSgyMTIsMTE4LDU5LC4wOCkscmdiYSgyMTIsMTE4LDU5LC4wNCkpO2JvcmRlcjoxcHggc29saWQgcmdiYSgyMTIsMTE4LDU5LC4zNSk7Ym9yZGVyLXJhZGl1czp2YXIoLS1yYWRpdXMtc20pO3BhZGRpbmc6MTFweCAxNHB4O2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjthbGlnbi1pdGVtczpjZW50ZXI7bWFyZ2luLXRvcDoxNHB4fQouY3MtbGFiZWx7Zm9udC1zaXplOjEycHg7Y29sb3I6dmFyKC0tdGV4dC1tdXRlZCl9LmNzLWFtdHtmb250LXNpemU6MjBweDtmb250LXdlaWdodDo4MDA7Y29sb3I6dmFyKC0tYWNjZW50KX0KQG1lZGlhIHByaW50ewogICp7LXdlYmtpdC1wcmludC1jb2xvci1hZGp1c3Q6ZXhhY3QhaW1wb3J0YW50O3ByaW50LWNvbG9yLWFkanVzdDpleGFjdCFpbXBvcnRhbnR9CiAgYm9keXtiYWNrZ3JvdW5kOiNmZmYhaW1wb3J0YW50O2NvbG9yOiMwMDAhaW1wb3J0YW50O2RpcmVjdGlvbjpydGx9CiAgYm9keTo6YmVmb3Jle2Rpc3BsYXk6bm9uZX0KICAudGFicywuYWRkLWJ0biwuYWN0aW9uLXJvdywuc3VtbWFyeS1ub3RlLC5kZWxpdmVyeS1zZWN0aW9uLC5yZW1vdmUtYnRuLC5jYXJwZXQtcHJldmlldywuc2lkZS1zZWxlY3RvcntkaXNwbGF5Om5vbmUhaW1wb3J0YW50fQogIC5jYXJwZXQtY2FyZCwucmVwYWlyLWNhcmR7Ym9yZGVyOjFweCBzb2xpZCAjY2NjIWltcG9ydGFudDtiYWNrZ3JvdW5kOiNmZmYhaW1wb3J0YW50O2JveC1zaGFkb3c6bm9uZSFpbXBvcnRhbnQ7YnJlYWstaW5zaWRlOmF2b2lkO2NvbG9yOiMwMDAhaW1wb3J0YW50fQogIC5zZWN0aW9ue2Rpc3BsYXk6YmxvY2shaW1wb3J0YW50fQogIC50b3RhbC1tYWluLWFtb3VudHstd2Via2l0LXRleHQtZmlsbC1jb2xvcjojMDAwIWltcG9ydGFudDtmb250LXNpemU6MjhweCFpbXBvcnRhbnR9CiAgLmNhcmQtc3VidG90YWwsLnJlcGFpci1jYXJkLXN1YnRvdGFse2JhY2tncm91bmQ6I2Y1ZjVmNSFpbXBvcnRhbnR9CiAgLmFyZWEtdmFsLC5jYXJkLXN1YnRvdGFsLWFtb3VudHtjb2xvcjojZTg4MTJhIWltcG9ydGFudH0KICAudG90YWwtcGFuZWx7YmFja2dyb3VuZDojZmZmIWltcG9ydGFudDtib3JkZXI6MXB4IHNvbGlkICNjY2MhaW1wb3J0YW50O2JveC1zaGFkb3c6bm9uZSFpbXBvcnRhbnR9Cn0KQG1lZGlhKG1heC13aWR0aDo2MDBweCl7CiAgLnR5cGUtZ3JpZHtncmlkLXRlbXBsYXRlLWNvbHVtbnM6MWZyIDFmcn0uc2VydmljZXMtZ3JpZHtncmlkLXRlbXBsYXRlLWNvbHVtbnM6MWZyfQogIC5kaW1zLXByZXZpZXctcm93e2dyaWQtdGVtcGxhdGUtY29sdW1uczoxZnJ9LmNhcnBldC1wcmV2aWV3e2Rpc3BsYXk6bm9uZX0KICAuZGVsaXZlcnktZ3JpZHtncmlkLXRlbXBsYXRlLWNvbHVtbnM6MWZyfQogIC5zaWRlcy1ncmlkLmZvdXJ7Z3JpZC10ZW1wbGF0ZS1jb2x1bW5zOjFmciAxZnJ9Cn0KCi8qIGhpZGUgaW52b2ljZSBvbiBzY3JlZW4gKi8KI3ByaW50LWludm9pY2UgeyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IH0KCkBtZWRpYSBwcmludCB7CiAgKiB7IC13ZWJraXQtcHJpbnQtY29sb3ItYWRqdXN0OiBleGFjdCAhaW1wb3J0YW50OyBwcmludC1jb2xvci1hZGp1c3Q6IGV4YWN0ICFpbXBvcnRhbnQ7IH0KICBodG1sLCBib2R5IHsgYmFja2dyb3VuZDogI2ZmZiAhaW1wb3J0YW50OyBtYXJnaW46IDAgIWltcG9ydGFudDsgcGFkZGluZzogMCAhaW1wb3J0YW50OyB9CiAgYm9keTo6YmVmb3JlIHsgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OyB9CiAgLyogaGlkZSBldmVyeXRoaW5nICovCiAgLndyYXBwZXIgeyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IH0KICAvKiBzaG93IG9ubHkgaW52b2ljZSAqLwogICNwcmludC1pbnZvaWNlIHsgZGlzcGxheTogYmxvY2sgIWltcG9ydGFudDsgcG9zaXRpb246IHN0YXRpYyAhaW1wb3J0YW50OyB9Cn0KCi8qIGVuc3VyZSBjYWxjIHNlY3Rpb24gaGFzIGNvcnJlY3QgZGFyayBiYWNrZ3JvdW5kICovCiNjYWxjdWxhdG9yIHsgYmFja2dyb3VuZDogIzBmMGUwZCAhaW1wb3J0YW50OyB9CiNjYWxjdWxhdG9yIC53cmFwcGVyIHsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IH0KLyogZml4IGFueSByZW1haW5pbmcgLS1iZyByZWZlcmVuY2VzIGluc2lkZSBjYWxjICovCiNjYWxjdWxhdG9yIHsgLS1iZzojMGYwZTBkOyAtLXN1cmZhY2U6IzFhMTgxNTsgLS1zdXJmYWNlMjojMjMyMDE4OyAtLWJvcmRlcjojMmUyYTIyOwogIC0tZ29sZDojZTg4MTJhOyAtLWdvbGQtbGlnaHQ6I2Y1YTA1YTsgLS1nb2xkLWRpbTpyZ2JhKDIzMiwxMjksNDIsLjM1KTsKICAtLXRleHQ6I2YwZjBmMjsgLS10ZXh0LW11dGVkOiM2MDYwNmE7IC0tdGV4dC1kaW06IzQwNDA0ODsKICAtLWFjY2VudDojZTg4MTJhOyAtLWdyZWVuOiM0Y2FmNzQ7IC0tcmFkaXVzOjE0cHg7IC0tcmFkaXVzLXNtOjhweDsgfQoKQG1lZGlhKG1heC13aWR0aDo3MDBweCl7CiAgLm9yYjF7d2lkdGg6MzAwcHghaW1wb3J0YW50O2hlaWdodDozMDBweCFpbXBvcnRhbnQ7dG9wOi04MHB4IWltcG9ydGFudDtyaWdodDotODBweCFpbXBvcnRhbnR9CiAgLm9yYjJ7d2lkdGg6MjUwcHghaW1wb3J0YW50O2hlaWdodDoyNTBweCFpbXBvcnRhbnQ7Ym90dG9tOi02MHB4IWltcG9ydGFudDtsZWZ0Oi02MHB4IWltcG9ydGFudH0KICAub3JiM3t3aWR0aDoyMDBweCFpbXBvcnRhbnQ7aGVpZ2h0OjIwMHB4IWltcG9ydGFudH0KICAuaGVyb3twYWRkaW5nOjEwMHB4IDIwcHggNDBweCFpbXBvcnRhbnR9CiAgLmhlcm8tdGl0bGV7Zm9udC1zaXplOmNsYW1wKDQ0cHgsMTV2dyw4MHB4KSFpbXBvcnRhbnQ7bGV0dGVyLXNwYWNpbmc6LTJweCFpbXBvcnRhbnR9CiAgLm1vY2t1cC13cmFwe21heC13aWR0aDoxMDAlIWltcG9ydGFudDtwYWRkaW5nOjAgNHB4fQogIC5mZWF0LWdyaWR7Z3JpZC10ZW1wbGF0ZS1jb2x1bW5zOjFmciFpbXBvcnRhbnR9CiAgLm5hdntwYWRkaW5nOjE0cHggMjBweCFpbXBvcnRhbnR9CiAgLnN0YXQtZ3JpZHtncmlkLXRlbXBsYXRlLWNvbHVtbnM6cmVwZWF0KDIsMWZyKSFpbXBvcnRhbnR9Cn0KPC9zdHlsZT4KPC9oZWFkPgo8Ym9keT4KCjwhLS0gRVhBQ1QgZnJvbSBvcmlnaW5hbCBwcm9tby0zIC0tPgo8ZGl2IGNsYXNzPSJvcmIgb3JiMSI+PC9kaXY+CjxkaXYgY2xhc3M9Im9yYiBvcmIyIj48L2Rpdj4KPGRpdiBjbGFzcz0ib3JiIG9yYjMiPjwvZGl2PgoKPG5hdiBjbGFzcz0ibmF2Ij4KICA8YSBocmVmPSJodHRwczovL3R6ZW1lci5jby5pbCIgdGFyZ2V0PSJfYmxhbmsiIGNsYXNzPSJuYXYtbG9nbyIgc3R5bGU9InRleHQtZGVjb3JhdGlvbjpub25lIj4KICAgIDxpbWcgc3JjPSJkYXRhOmltYWdlL3dlYnA7YmFzZTY0LFVrbEdSbEFSQUFCWFJVSlFWbEE0V0FvQUFBQVFBQUFBS3dFQWh3QUFRVXhRU0w4T0FBQUJ0OGVnYlNSSDUvQ0hmZTBMZ0lqSTRlMGdhNTdtTHJMSm5EZnlGM2pEdHUyUVhtdmIxcmd6WnBMaGtaRWV0bTNidG0zYnRtM2J0bTNiSGozc01UbzUvNC9SM1ZWMW5sV3BhLzZNNkw5RVNaTHJ0dGtTRXdoK3phNUk0QTZmQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBekxIYlJQOUhhZmR3NXc2VDFVNFdneXNjeE5ScmwwdjlZQWpobnp0M3JKZUo5VCs1cXJxV1hnaEhsQWs5TW9RUVFnanR1N2VhcEM1R2F6NGZ3cXRKK001NHZJeEY2K2dRd3QzRHkwdGsreEJDejhTZmQyeFJCeisrOXROZEdVeVZBSERXRUg3WUpMbXBsYnM4ZmJaZ2FabmNIMExvbWVnc0FqZHRPK2xZUG5xOEo0QVU2WC9Rd2J0dVpGcFh6VEU5cm5ZdUtaUkplckF6Zi96YUxTWVlhMGVyUDVUaC92UjR4bU82K1g3WU1LbXZOek5zWFZUaSsveUpYMjdlZEt5c1gxWjZPTlA2ZS9FVlZnYmhWUk9tTTNaeHBxOVhaaW9qbU00ZFZHemk5NXZXR3orOWgzNlROcHZOWnJQWmJEYWJ6V2F6Mld3Mm04MW1zOWxzTnB2TlpyUFpiSTdxSHdHOTdDTjV4aWVQOWZoT2g3Qm5jdjFVc1d6ZTdhdDNEMTB6ZmF3VGh4QkM0WWxmcjE0LzlTTFErS3JkYnJmYjdYYTczVzYzMisxMnU5MXV0OXZ0ZHJ2ZGJyZmI3WGI3OTVIRlIvZmx1NDROL3NnY3hzdlMzRTZ6NURzN05ybDJDQ0hFVFZ5ejhiQ2sraXVFRUd1azZJYTEzTjBaaEtsV3N0bHlJYi9kSUVFby9iOHFZTzJCQ1JQcmlRU3Bmbi9aK2tQVDZkdDRFMzhWKzJmeE80b2h2aFBuOFAwQ21KZU1HeDFLTVhOZkwxcUY5L2wzeTlWcmpxaU9DbzBLTTBhVm1NY1d5M3V0eUV3T0ttcHVqNVRhTTRTUWFPS255OVlkVmswdGNVY0VZOHpqUEZkUjBFdkh5NGlreUoxUTNOM1ZnOUxwc1JCQ3owU0tSZURDdFlaVVRndmZFTVY0U29TL2p3dVRmaE94cFk3NExjTGVXN09rdXFZSUlZVGlFOFdlcjR2WEhGSWxMWEJUSk9PYkVYTXhyQmYrcnlqcXMxSCtSbStjN0Jnb2hPSVR4ZStaeTFjYVVCSE5mVk04NUtqQzFXOGM2NWVyRlVNOUxkYmdxV24wYUFpaGpJa3ZMbHhwU1BtYTU1b1UvdFl1M0gvRzBsNHdUZ0hTOWVJZFBweWk5NTRvaEJCS212anFuTlVIbHFwNXIwaGo3cnlDWVIwZmhkdDllcEUvT1dXU1BXQ1plTzBXUWloeDR2UFRWaXhGblJ0bnpxeCtNUGtYT3RCSmdNL0tLMFRmUzJOeTN5US9YZTdFUitjczF5aWt1UFdiV1M5Sloydk1KSVd5K2lRTjhTZXJacEplbmNybERaSEZ4V1FoaEZENnhPVjVTbEJOejN0NlVsT2JGc25xaEdUSVoyZVVhenVuYy9uQlVvV1VRVitHaXJSeXFmVmJZbFBuRlBtTkNaay9YS0diZEw2VU5sK1AwdE9WME0wUnFvU3Axd3BFOVZHSE90MWs1MkVlNThjNHpyekRvZWxqcm1hb3BLcjJtanAvTHZVeXZqd1BwTVJjS2U2bjYxQ2JkQ1dWVlRhbjU5NXZ2NVNNeDhaOTV3dDFxRFB5a3ZvMGhCQkNDQ0dFRUNwbjhhRi9yN2ozZGFqM2NwSTZ1ZExYajBQanRHODFWYjNvcHNnNUFhcTA1dWtwZ0F1My9QV29EYk9yMzBwZnUwVmVrNGFLcXNKZjZIOXJTVmV5WGlHMnI5cTdKdlZTbGk0djRVcFpMMGYzb0Y5V1ZCV01iN0lzVjZ0OVVWMU5HNjFsam5xckhyVkJwcTFoRjFUMVdvOEV4MmJ6SC9ONkRlclVuS1JXLyt6ZnE2cldra3dzY05KYmRhZTM4bklhZWxtbzZGS2NiR0t4RTk2cWtxcDR0elZ6WTFyMzY2cjUrbU5DcEowNDl2MGEwOXI1SVkxM2FjVjhMUTZwSjVZKzhjTzYwcmxGTXRyd2h5clpPaERLbUZqODlIZHFTVzhXU21paXE2dmo2bllvYTJLcHN6NHNXNVhjSGljcEZ0Qm1QMWJFMDdmOVVlYkVDcWQ5VkRmYXRHQThJNit2aHFjNVVmS2czN0tuZjFrck9ydHdQRnY4WGdGTDIwRDVFNE5YUFBlTCt0QXJ4Y09adlB3dS9oS294c1RBRmM3L1pLelJUNzlHWWswZGtjMVdKVSsrRHIwVEZWZ0VWcjk3N05DSkV6NFp5YlZKVERKVDNsVjJkVjJ0d1NMbEt0bmlNU2ZYUkpLZEVaZk1EbitWZDYydmRPVTNNdWxWUWhPNGNvZDN6MGkyMXlLam1lcnU4cmFxeW1tOXF1djdYYnQ1NTR1a0d4UGRLZTR5dXBUckRUV2cxSWN3NC9id0RvaXRhRGVNVG1mNmU4dlFaRFdybStiSUFuNDBrdkNzQlBuc252NWFUUjBvWmJXMmVqYndjWkdNTDZZSWFOWkhFbCtucTFPMWRzM3p0MG9zNXVSSkl0b3I3NHJlcGVwVXA0M0lMLzFqT1RmNE42TWtrMDhuMUtnYTFXMkZPdVhZWTVWVFVxVjBRTEpyTFRXaEpIOWsxV0lHTDRwa2ZTdFpUSE0rbGVxYjZsS2o5eWxxY0tmS1BLeUhKU203MWFiK0xHeHc0VmpjdFJNbU5mdVZmOGRhK0hwd2ZlcXZrWVVQbjM2S3hEMHZaVlJML2hDOTlkZXFDanU4SnhMM3pYUkJiZlJ3aXRPeVBrQW54UEtPVEpQU09MdThucWl0cW4rdEU4dTdhWXFNSmo3a20xUy82L0w2Vk1TTitXdlpKemV6blBKYnluNjk5clg5TDVHOHI4Ym1zOWlWYWJ2UXEycGVXN3dSRHp4SlRqcTVYZXp0eVU4M3BxeHpyZkZDaWxqWGlNaG04MmRMT0RTN3RyNjExS05wWWoycmFERERkdWwwc0NXOG1qV3RoWkk5dDY4WGkyV0tJNzhMb1J4ZFdjdWE0K3AwcVk2WnFFaUhmbTQ3aE5EelN2L2wrdFZVRnlkTmRhUDhMZmZXRUVLSnVxNXVOZkxFZjlLbWVtYmVOdlJRQ0tIYzE5UzFxc2tQL3owNzFNUkhPSU4yZUMyRTBuVmpyV3FUM2xSTHFQSW4yTytURUVJRlh0UFVvbnE3eGhMMmd3MjdlUy82NzlRb2lWSUVWcXZUajZVUDlkVHVjUWloS3E4WjZsUW5wYy8wclc3ZTVhdWoyK3BRR1R0b2VVWCs0OVY1TFZLakd2RjMra3pYN2dhZXVUbzZyZ2FWQWZsQytrd2Y2Z0crdkNLanUxY1lVcWM2Tlhtb1ArN2ZBenplbUNxTWJscW9adnVGVlJPSCtzMGg0MlVRSDFyKzZOSzU2clJuNzY3UWtvYjY3WUhETXUwTktMbTArL09VR2RYd3Vka3JDVWQ3RDh1TFkvTXlSNzhjTVlvNjFvbXBVdjFxdjJFRjhuaTN0TkhuQjB4SW5TclRWSnBVUDkyblVTaVBSYnRHSlZUUnV3eWlydFZNa2VvWCt4Wk85ZjR5Umk5dWcvcFZ3c3J1czkwYnhRT1pPdjNvaVhXcGQ1MFppZmpsem5GUDZybUpSL2N0UjkxcjR5akFqM2FMTGVmL2w5V2FwY2htVWVwZlUwWGdmYkJ6di9oSTlrazN1bmh1YWx2Wm5COFZoZnR3dDM1Sk12a3V6Y3pvczJlaXhwVmdzWHR2dS83WmJBOCt0RUxoVEZLTWZqNW1xbXpTNmQ0NWRmb2ExeFpGd043TXJTaG1DU0c4c25ObTVaclpieVFvZU1mUEF6MG1oSERMaXJXdG1RcU10c3QzZmxGM1IzVFNISU1MaERKZmhzT0NqOFdlWGFUWjdlc1BYVUF2YnplcWYyMHF4OWQ3T1ZDdkY2bFNSL3pWQzdWTWtWUnVLK2l2KzRQWXVnam1waG1WOWFCNjFpV1pTRzlzVnNqNG5yMVVmNHdvQWpWcFJNRzdUckVRWCt2RnVsSTlhOGVzMFJZRmpiL2Z5M1ZJTWFwVGloYThLeGUwTUc4RzJGUTFyV2w3ZThSTmkvcGVPd040L0dKWVF3b1Z3amN1WGpqRHUzdko3cTNSYjhrejlrblhvclo1QnNkY0IwK1pqWFY3RjI5bjJ5eWF5eDc1dnE2WUp3dHFxeDJ6RVNmS1lGdTZHaXEwRENmUUE5bVlROGNrNEJ5VlorenFFSjdmTkdmaEhIMWhaaWMweFM0dmRlTXVWRGlZTDdJOXRjK1lMUk5wWUFqdkhkVE11dmNYT09YSDdsNmtzcjlvalZhcjFXcTFXcTFXcTlWcXRWcXRWcXZWYXJWYXJWYXIxV3ExV3EzV1pmOWhadVh3ZGp6bWx4UG43aGtmclplTk1meXZyaTFoaTh4K1lia2JPNnRvOFdCV3lScjlmdlIvajBKK2wvdjM1UXRra1l5NzR4c2hoRjJxby94U3FORm9OQnFOUnFQUmFEUWFqVWFqMFdnMEdvMUdvOUZvTkJxTlJxUHhiL0dVOHpZQloyN1hOQ3l2eE5xdEorK1BEODZFbWZXa0g3YVBTT2E1SHRLdkR4bFpxRVR1K3NTekY4NlZIdmg1R0FBQUFBQUFBQUFBQUFBQVlPenA1VDdydlRtdjZUeThqWXpiZkVBRTZleGRtTy91T1RSbXUxM3l2M3NoNjRNWnYrYXZ6T2M4STlmeHNPM1hSMCtkZ3ZYS0VGN1pxaERQalJtbFM0ZmlvYXhhcU0vUVhiMjUzdHI3V0YrMlJEenJOUGRuN041NTIyMUdvOUdwaVRwN3lhRlQ5Q25YSWhtNUxvalp1aEdlM21xeWNqeGNsM0d3MUtFNG93dGg5SldMaitnN05NZFZQVjNuMngyS3kzcFR2cnVrS3V2eEh1cmRNU2lqVmw2dkx4bU9PdWlkVHBKYmR2YVIwWjFjdXloS2V6b3U2SHd5ZjNZMnBoMHlTdkR4KzVnZldPZWVFRHJiN2Y0WnB4RWxXcGhzdncrNysvT1BlajBjcFcvNDlkbTExenFkLzcvdnpmWEFVaTMwMjZyVFFheWVzZjUydHc5OXo3Y3UyeHZybUNwc0ErZG5OYzE5aUhMYXRIa3YvTDA2aDF6amJmeHd0enBISDMzVnhNajkzZ29oekY0UkR3dWQ4MmNJNzBKZk5kRlo0WjU1cGtKYis5NmYvdHV0OTNHdmRUZXIwbXF5MjF3QUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBRDBjVjBkQUZaUU9DQnFBZ0FBTUI0QW5RRXFMQUdJQUQ2UlJweEpKYVFqSVNzL0tBQ3dFZ2xqYnQvd0wwQzhBZnFCQWdQd0EvQUR5QVBvQTV3RDhBUHdBdGYvS0F2d0Q4QUxrZDBUNXpxWC9MdUVNNjQrWDVKMy9OMmdQMEF4UUg4QS9nSDdBZS8vVGY0MUhZRDZ0YTFyVlJZODJEb3dGKzJBVXFIdWZ4ajA1M1A0eDVMcU5ZQktZM3QxeE1aQUx5SmpnRTR6VEk1dFFZTWZnZWhEQ0t6b1hrVEhBSnhtbVJ6YXZONWt4L1FmempOTWptMWVjQW5HYVpITm9YblhBSWlYczB5T2JWNXdDY1pwa2MycnYwOTRnRnF3OFpITnE4NEJPTTB5T2JWNXZWdk9pOGZyRnZFRGg2YVNrRnlqcXUvckMrOGtlZkFuRnlTODRCT0xpS3BWc3ZjRFN0aitBQUQrL1BSZWd6R21udnQ0M3cwOGExNzE5SXVBNWF0ZDdBMk5qMW1mcHhzNzlZM3N3eG5XM1psU3V3alFzaHhETWFhZSszamZEVHhyWHZYMGk0bjdLOG5xZzU4SFlQUVdyNGV6T1h6Q2hYZGoreVZKY1QxTUdjSXJqV1dJVG5QUXNCbU5OUGZieHZocDQxcjNyNlJjVDlsZVQxUWMrRUtlTVNNYXFreUpmcVlISlFOL1RZY0JiU2JBOG5HY1lwV0JEcTJ1S2tRVGpQNmVKWVZhRUcwSFRDTFM5akFWM213N21vOXpzTkxUVWVvb3RZeW95MTN6U0Y3aDBteWdXbE1CMTVaQjBQbzJnSXRIc2dqdGNDME1pclRKUFpmYjRHdVVBWm15Y0RpcHlSN0UwMkdySG9ILy9pZW1pZE1GUG9kS0RERHAzYXAvSzJhbTlkNUpYbXRzanZDQ3JmWmwvZUo3cys0VkVxamMrdU93Z2Q2QTExZzJmOHBmLy9ReFVRaGhab3I5QlZjY3VLV2FDN0d0aVZITlNoWTVPbFpZZnU0b05zL0xMV2VkWnYxUHpzTEVmYndlUno0M1o3Y0pZWkEyM0lxdDdtZkhISFRxQUZJYTlhVUYrWmZXaFI4ZTlNWEcwcUV5NkozTkdvQUEiIGFsdD0i16bXnteoIj4KICAgIDxzcGFuIGNsYXNzPSJuYXYtbmFtZSI+16bXnteoINep15jXmdeX15nXnSDXmdek15nXnTwvc3Bhbj4KICA8L2E+CiAgPGRpdiBjbGFzcz0ibmF2LWN0YSIgb25jbGljaz0ic2Nyb2xsVG9DYWxjKCkiPteX16nXkSDXnteX15nXqDwvZGl2Pgo8L25hdj4KCjxkaXYgY2xhc3M9Imhlcm8iPgogIDxkaXYgY2xhc3M9Imhlcm8tYmFkZ2UiPtee15fXqdeR15XXnyDXnteX15nXqCDXl9eb1508L2Rpdj4KICA8aDEgY2xhc3M9Imhlcm8tdGl0bGUiPgogICAgPHNwYW4gY2xhc3M9IndvcmQtY2FycGV0Ij7XqdeY15nXl9eZ1508L3NwYW4+CiAgICA8c3BhbiBjbGFzcz0id29yZC1jbGVhbiI+16DXmden15XXmTwvc3Bhbj4KICAgIDxzcGFuIGNsYXNzPSJ3b3JkLWZpeCI+16rXmden15XXnzwvc3Bhbj4KICA8L2gxPgogIDxwIGNsYXNzPSJoZXJvLXN1YiI+16fXkdecINeU16bXoteqINee15fXmdeoINee15nXmdeT15nXqiDXldee15PXldeZ16fXqi4g15TXltefINee15nXk9eV16og4oCUINen15HXnCDXnteX15nXqC4g16TXqdeV15gg15vXmi48L3A+CgogIDwhLS0gRVhBQ1QgbW9ja3VwIGZyb20gb3JpZ2luYWwgLS0+CiAgPGRpdiBjbGFzcz0ibW9ja3VwLXdyYXAiPgogICAgPGRpdiBjbGFzcz0ibW9ja3VwIj4KICAgICAgPGRpdiBjbGFzcz0ibW9jay1oZWFkZXIiPgogICAgICAgIDxzcGFuIGNsYXNzPSJtb2NrLXRpdGxlIj7XnteX16nXkdeV158g157Xl9eZ16g8L3NwYW4+CiAgICAgICAgPGRpdiBjbGFzcz0ibW9jay10YWJzIj4KICAgICAgICAgIDxkaXYgY2xhc3M9Im1vY2stdGFiIG9uIj7wn6e8INeg15nXp9eV15k8L2Rpdj4KICAgICAgICAgIDxkaXYgY2xhc3M9Im1vY2stdGFiIj7wn5SnINeq15nXp9eV1588L2Rpdj4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9Im1vY2stcm93Ij4KICAgICAgICA8ZGl2IGNsYXNzPSJtb2NrLWZpZWxkIj48ZGl2IGNsYXNzPSJtb2NrLWZpZWxkLWxhYmVsIj7XkNeV16jXmiAo16Ei154pPC9kaXY+PGRpdiBjbGFzcz0ibW9jay1maWVsZC12YWwiPjMwMDwvZGl2PjwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9Im1vY2stZmllbGQiPjxkaXYgY2xhc3M9Im1vY2stZmllbGQtbGFiZWwiPteo15XXl9eRICjXoSLXnik8L2Rpdj48ZGl2IGNsYXNzPSJtb2NrLWZpZWxkLXZhbCI+MjAwPC9kaXY+PC9kaXY+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJtb2NrLXR5cGVzIj4KICAgICAgICA8ZGl2IGNsYXNzPSJtb2NrLXR5cGUiPtee15vXldeg15Q8YnI+PHNwYW4gc3R5bGU9ImNvbG9yOiM0MDQwNDg7Zm9udC13ZWlnaHQ6NDAwIj7igqo5NTwvc3Bhbj48L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJtb2NrLXR5cGUgb24iPtei15HXldeT16og15nXkzxicj48c3Bhbj7igqoxMzU8L3NwYW4+PC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0ibW9jay10eXBlIj7Xntep15k8YnI+PHNwYW4gc3R5bGU9ImNvbG9yOiM0MDQwNDg7Zm9udC13ZWlnaHQ6NDAwIj7igqoxOTA8L3NwYW4+PC9kaXY+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJtb2NrLXRvdGFsIj4KICAgICAgICA8c3BhbiBjbGFzcz0ibW9jay10b3RhbC1sYWJlbCI+16HXlCLXmyDXnNeq16nXnNeV1508L3NwYW4+CiAgICAgICAgPHNwYW4gY2xhc3M9Im1vY2stdG90YWwtYW10Ij7igqo4MTA8L3NwYW4+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CiAgPC9kaXY+CgogIDwhLS0gU0NST0xMIEFSUk9XIC0tPgogIDxkaXYgY2xhc3M9InNjcm9sbC1jdGEiIG9uY2xpY2s9InNjcm9sbFRvQ2FsYygpIj4KICAgIDxzcGFuIGNsYXNzPSJzY3JvbGwtbGJsIj7XnNeX16nXkSDXnteX15nXqDwvc3Bhbj4KICAgIDxkaXYgY2xhc3M9InNjcm9sbC1hcnIiPuKGkzwvZGl2PgogIDwvZGl2Pgo8L2Rpdj4KCjwhLS0gRVhBQ1QgZmVhdC1ncmlkIGZyb20gb3JpZ2luYWwgLS0+CjxkaXYgY2xhc3M9ImZlYXQtZ3JpZCI+CiAgPGRpdiBjbGFzcz0iZmVhdC1jZWxsIj4KICAgIDxkaXYgY2xhc3M9ImZlYXQtaWNvbjIgb3JhbmdlIj7wn6e8PC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJmZWF0LXRpdGxlMiI+16DXmden15XXmSDXqdeY15nXl9eZ1508L2Rpdj4KICAgIDxkaXYgY2xhc3M9ImZlYXQtZGVzYzIiPtee15vXldeg15QsINei15HXldeT16og15nXkyDXldee16nXmS48L2Rpdj4KICA8L2Rpdj4KICA8ZGl2IGNsYXNzPSJmZWF0LWNlbGwiPgogICAgPGRpdiBjbGFzcz0iZmVhdC1pY29uMiBibHVlIj7wn5SnPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJmZWF0LXRpdGxlMiI+16rXmden15XXnyDXqdeY15nXl9eZ1508L2Rpdj4KICAgIDxkaXYgY2xhc3M9ImZlYXQtZGVzYzIiPteh16jXmCwg16jXodeY15XXqNem15nXlCwg15fXmdeq15XXmiwg16TXqNeg15bXmdedINeV15LXmdeW15XXli4g15HXl9eoINem15zXoteV16og15zXl9eZ16nXldeRINee15PXldeZ16cuPC9kaXY+CiAgPC9kaXY+CiAgPGRpdiBjbGFzcz0iZmVhdC1jZWxsIj4KICAgIDxkaXYgY2xhc3M9ImZlYXQtaWNvbjIgdGVhbCI+8J+amjwvZGl2PgogICAgPGRpdiBjbGFzcz0iZmVhdC10aXRsZTIiPtep15nXqNeV16og16LXkyDXlNeR15nXqjwvZGl2PgogICAgPGRpdiBjbGFzcz0iZmVhdC1kZXNjMiI+15DXmdeh15XXoyDXldeU15fXlteo15Qg15zXm9ecINeU15DXqNelLiA4INeh16DXmdek15nXnSDXnNeQ15nXodeV16Mg16LXptee15kuPC9kaXY+CiAgPC9kaXY+CjwvZGl2PgoKPCEtLSBUUkFOU0lUSU9OIC0tPgo8ZGl2IGNsYXNzPSJjYWxjLWludHJvIiBpZD0iY2FsYy1pbnRybyI+CiAgPGRpdiBjbGFzcz0iY2ktbGFiZWwiIGlkPSJjaS1sYWJlbCI+15TXnteX16nXkdeV158g16nXnNeg15U8L2Rpdj4KICA8ZGl2IGNsYXNzPSJjaS10aXRsZSIgaWQ9ImNpLXRpdGxlIj7Xl9ep15Eg157Xl9eZ16gg16LXm9ep15nXlTwvZGl2PgogIDxkaXYgY2xhc3M9ImNpLWRlc2MiIGlkPSJjaS1kZXNjIj7XlNem16LXqiDXnteX15nXqCDXnteZ15nXk9eZ16og4oCUINeg15nXp9eV15kg15XXqteZ16fXldefINep15jXmdeX15nXnTwvZGl2PgogIDxkaXYgY2xhc3M9ImNpLWxpbmUiIGlkPSJjaS1saW5lIj48L2Rpdj4KPC9kaXY+Cgo8IS0tIFJFQUwgQ0FMQ1VMQVRPUiAtLT4KPHNlY3Rpb24gaWQ9ImNhbGN1bGF0b3IiIHN0eWxlPSJwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW4iPgogIDxkaXYgc3R5bGU9InBvc2l0aW9uOmFic29sdXRlO3dpZHRoOjUwMHB4O2hlaWdodDo1MDBweDtib3JkZXItcmFkaXVzOjUwJTtmaWx0ZXI6Ymx1cig4MHB4KTtwb2ludGVyLWV2ZW50czpub25lO2JhY2tncm91bmQ6cmdiYSgyNTUsMTAwLDIwLC4yNik7dG9wOi0xNTBweDtyaWdodDotMTUwcHg7YW5pbWF0aW9uOmRyaWZ0IDE0cyBlYXNlIGluZmluaXRlO3otaW5kZXg6MCI+PC9kaXY+CiAgPGRpdiBzdHlsZT0icG9zaXRpb246YWJzb2x1dGU7d2lkdGg6NDAwcHg7aGVpZ2h0OjQwMHB4O2JvcmRlci1yYWRpdXM6NTAlO2ZpbHRlcjpibHVyKDgwcHgpO3BvaW50ZXItZXZlbnRzOm5vbmU7YmFja2dyb3VuZDpyZ2JhKDU4LDExMSwyMTYsLjE0KTtib3R0b206LTEwMHB4O2xlZnQ6LTEwMHB4O2FuaW1hdGlvbjpkcmlmdCAxNHMgZWFzZSAtNXMgaW5maW5pdGU7ei1pbmRleDowIj48L2Rpdj4KICA8ZGl2IHN0eWxlPSJwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDozMDBweDtoZWlnaHQ6MzAwcHg7Ym9yZGVyLXJhZGl1czo1MCU7ZmlsdGVyOmJsdXIoODBweCk7cG9pbnRlci1ldmVudHM6bm9uZTtiYWNrZ3JvdW5kOnJnYmEoNDIsMTM4LDEyOCwuMTIpO3RvcDo0MCU7bGVmdDo0MCU7YW5pbWF0aW9uOmRyaWZ0IDE0cyBlYXNlIC05cyBpbmZpbml0ZTt6LWluZGV4OjAiPjwvZGl2PgogIDxkaXYgY2xhc3M9ImNhbGMtcmV2ZWFsIiBpZD0iY2FsYy1yZXZlYWwiPgogICAgPGRpdiBjbGFzcz0id3JhcHBlciI+CgoKPGRpdiBjbGFzcz0idGFicyI+CiAgPGJ1dHRvbiBjbGFzcz0idGFiLWJ0biBhY3RpdmUiIG9uY2xpY2s9InN3aXRjaFRhYignY2xlYW5pbmcnKSI+8J+nvCDXoNeZ16fXldeZINep15jXmdeX15nXnTwvYnV0dG9uPgogIDxidXR0b24gY2xhc3M9InRhYi1idG4iIG9uY2xpY2s9InN3aXRjaFRhYigncmVwYWlyJykiPvCflKcg16rXmden15XXnyDXqdeY15nXl9eZ1508L2J1dHRvbj4KPC9kaXY+Cgo8IS0tIENMRUFOSU5HIC0tPgo8ZGl2IGlkPSJjbGVhbmluZyIgY2xhc3M9InNlY3Rpb24gYWN0aXZlIj4KICA8ZGl2IGNsYXNzPSJjYXJwZXQtbGlzdCIgaWQ9ImNsZWFuaW5nLWxpc3QiPjwvZGl2PgogIDxidXR0b24gY2xhc3M9ImFkZC1idG4iIG9uY2xpY2s9ImFkZENhcnBldCgnYycpIj48c3BhbiBzdHlsZT0iZm9udC1zaXplOjE4cHg7Zm9udC13ZWlnaHQ6MzAwIj4rPC9zcGFuPiDXlNeV16HXoyDXqdeY15nXlzwvYnV0dG9uPgogIDxkaXYgY2xhc3M9ImRlbGl2ZXJ5LXNlY3Rpb24iPgogICAgPGgzPteh15XXkiDXqdeZ16jXldeqPC9oMz4KICAgIDxkaXYgY2xhc3M9ImRlbGl2ZXJ5LWdyaWQiPgogICAgICA8ZGl2IGNsYXNzPSJkZWxpdmVyeS1vcHQiPjxpbnB1dCB0eXBlPSJyYWRpbyIgbmFtZT0iYy1kZWwiIGlkPSJjLXNlbGYiIGNoZWNrZWQgb25jaGFuZ2U9InVwZGF0ZURlbGl2ZXJ5KCdjJykiPjxsYWJlbCBmb3I9ImMtc2VsZiI+PHNwYW4gY2xhc3M9ImRlbGl2ZXJ5LWljb24iPvCfj6o8L3NwYW4+PHNwYW4+PHNwYW4gY2xhc3M9ImRlbGl2ZXJ5LW5hbWUiPteQ15nXodeV16Mg16LXptee15k8L3NwYW4+PHNwYW4gY2xhc3M9ImRlbGl2ZXJ5LWRlc2MiPtee15TXodeg15nXoyDXqdec16DXlTwvc3Bhbj48L3NwYW4+PC9sYWJlbD48L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iZGVsaXZlcnktb3B0Ij48aW5wdXQgdHlwZT0icmFkaW8iIG5hbWU9ImMtZGVsIiBpZD0iYy1ob21lIiBvbmNoYW5nZT0idXBkYXRlRGVsaXZlcnkoJ2MnKSI+PGxhYmVsIGZvcj0iYy1ob21lIj48c3BhbiBjbGFzcz0iZGVsaXZlcnktaWNvbiI+8J+amjwvc3Bhbj48c3Bhbj48c3BhbiBjbGFzcz0iZGVsaXZlcnktbmFtZSI+16nXmdeo15XXqiDXoteTINeU15HXmdeqPC9zcGFuPjxzcGFuIGNsYXNzPSJkZWxpdmVyeS1kZXNjIj7XkNeZ16HXldejICsg15TXl9eW16jXlDwvc3Bhbj48L3NwYW4+PC9sYWJlbD48L2Rpdj4KICAgIDwvZGl2PgogICAgPGRpdiBjbGFzcz0iYnJhbmNoLXJvdyB2aXNpYmxlIiBpZD0iYy1icmFuY2gtcm93Ij4KICAgICAgPGxhYmVsPteR15fXqCDXodeg15nXoyDXnNeQ15nXodeV16M8L2xhYmVsPgogICAgICA8c2VsZWN0IGlkPSJjLWJyYW5jaCIgb25jaGFuZ2U9InNob3dCcmFuY2goJ2MnKTtjYWxjQ2xlYW5pbmcoKSI+PG9wdGlvbiB2YWx1ZT0iIj4tLSDXkdeX16gg16HXoNeZ16MgLS08L29wdGlvbj4KICAgICAgICA8b3B0aW9uIHZhbHVlPSJqZXJ1c2FsZW0iPteZ16jXldep15zXmdedPC9vcHRpb24+CiAgICAgICAgPG9wdGlvbiB2YWx1ZT0icmlzaG9uIj7XqNeQ16nXldefINec16bXmdeV1588L29wdGlvbj4KICAgICAgICA8b3B0aW9uIHZhbHVlPSJyaXNob24yIj7XqNeQ16nXldefINec16bXmdeV158g15HXldeY15nXpzwvb3B0aW9uPgogICAgICAgIDxvcHRpb24gdmFsdWU9ImhlcnpsaXlhIj7XlNeo16bXnNeZ15Q8L29wdGlvbj4KICAgICAgICA8b3B0aW9uIHZhbHVlPSJoZXJ6bGl5YTIiPteU16jXptec15nXlCDXkdeV15jXmdenPC9vcHRpb24+CiAgICAgICAgPG9wdGlvbiB2YWx1ZT0ibmV0YW55YSI+16DXqteg15nXlDwvb3B0aW9uPgogICAgICAgIDxvcHRpb24gdmFsdWU9InRlbGF2aXYiPteq15wg15DXkdeZ15EgLSBPdXRsZXQ8L29wdGlvbj4KICAgICAgICA8b3B0aW9uIHZhbHVlPSJtYWFsZSI+157Xotec15Qg15DXk9eV157XmdedIERjaXR5PC9vcHRpb24+PC9zZWxlY3Q+CiAgICAgIDxkaXYgY2xhc3M9ImJyYW5jaC1kZXRhaWwiIGlkPSJjLWJyYW5jaC1kZXRhaWwiPjwvZGl2PgogICAgPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJicmFuY2gtcm93IiBpZD0iYy1jaXR5LXJvdyI+CiAgICAgIDxsYWJlbD7XkdeX16gg16LXmdeoINec15fXmdep15XXkSDXotec15XXqiDXntep15zXldeXPC9sYWJlbD4KICAgICAgPHNlbGVjdCBpZD0iYy1jaXR5IiBvbmNoYW5nZT0iY2FsY0NsZWFuaW5nKCkiPjxvcHRpb24gdmFsdWU9IjAiPi0tINeR15fXqCDXoteZ16ggLS08L29wdGlvbj4KICAgICAgICAgIDxvcHRpb24gdmFsdWU9IjkwIj7XkteV16kg16nXqNeV158gLyDXnteo15vXljwvb3B0aW9uPgogICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iMTAwIj7XqtecINeQ15HXmdeRPC9vcHRpb24+CiAgICAgICAgICA8b3B0aW9uIHZhbHVlPSIxMTAiPtek16rXlyDXqten15XXldeUIC8g16jXntec15QgLyDXnNeV15M8L29wdGlvbj4KICAgICAgICAgIDxvcHRpb24gdmFsdWU9IjEyMCI+16jXnteqINeS158gLyDXkteR16LXqteZ15nXnSAvINeR16DXmSDXkdeo16c8L29wdGlvbj4KICAgICAgICAgIDxvcHRpb24gdmFsdWU9IjEyMCI+16jXkNep15XXnyDXnNem15nXldefIC8g15fXldec15XXnyAvINeR16og15nXnTwvb3B0aW9uPgogICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iMTMwIj7XlNeo16bXnNeZ15QgLyDXqNei16DXoNeUIC8g15vXpNeoINeh15HXkDwvb3B0aW9uPgogICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iMTMwIj7XoNeq16DXmdeUIC8g15fXk9eo15Q8L29wdGlvbj4KICAgICAgICAgIDxvcHRpb24gdmFsdWU9IjE1MCI+15nXqNeV16nXnNeZ1508L29wdGlvbj4KICAgICAgICAgIDxvcHRpb24gdmFsdWU9IjE2MCI+15fXmdek15QgLyDXp9eo15nXldeqPC9vcHRpb24+CiAgICAgICAgICA8b3B0aW9uIHZhbHVlPSIxODAiPteR15DXqCDXqdeR16IgLyDXk9eo15XXnTwvb3B0aW9uPgogICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iMjAwIj7Xptek15XXnyAo16DXpteo16og15XXntei15zXlCk8L29wdGlvbj48L3NlbGVjdD4KICAgIDwvZGl2PgogIDwvZGl2PgogIDxkaXYgY2xhc3M9InRvdGFsLXBhbmVsIiBpZD0iYy10b3RhbC1wYW5lbCIgc3R5bGU9ImRpc3BsYXk6bm9uZSI+CiAgICA8ZGl2IGNsYXNzPSJ0b3RhbC1yb3dzIiBpZD0iYy10b3RhbC1yb3dzIj48L2Rpdj4KICAgIDxkaXYgY2xhc3M9InRvdGFsLWRpdmlkZXIiPjwvZGl2PgogICAgPGRpdiBjbGFzcz0idG90YWwtbWFpbiI+PHNwYW4gY2xhc3M9InRvdGFsLW1haW4tbGFiZWwiPteh15TXtNebINec16rXqdec15XXnTwvc3Bhbj48c3BhbiBjbGFzcz0idG90YWwtbWFpbi1hbW91bnQiIGlkPSJjLXRvdGFsLWFtb3VudCI+4oKqMDwvc3Bhbj48L2Rpdj4KICAgIDxkaXYgY2xhc3M9InRvdGFsLXZhdCI+KiDXlNee15fXmdeoINeb15XXnNecINee16LXtNeeIHwg157Xmdeg15nXnteV150g15TXltee16DXlCDigqoyNTA8L2Rpdj4KICA8L2Rpdj4KICA8ZGl2IGNsYXNzPSJtaW4tbm90aWNlIiBpZD0iYy1taW4iPuKaoO+4jyDXnteZ16DXmdee15XXnSDXlNeW157XoNeUIOKCqjI1MCDigJQg15TXnteX15nXqCDXmdei15XXk9eb158g15HXlNeq15DXnTwvZGl2PgogIDxkaXYgY2xhc3M9ImFjdGlvbi1yb3ciPjxidXR0b24gY2xhc3M9InByaW50LWJ0biIgb25jbGljaz0iZG9QcmludCgpIj7wn5ao77iPINeU15PXpNehIC8g16nXnteV16ggUERGPC9idXR0b24+PC9kaXY+CiAgPHAgY2xhc3M9InN1bW1hcnktbm90ZSI+15TXnteX15nXqCDXlNeZ16DXlSDXkNeV157Xk9efIOKAlCDXlNem15XXldeqINep15zXoNeVINeZ16nXnteXINec15DXqdeoINei150g15TXktei16og15TXqdeY15nXlzwvcD4KPC9kaXY+Cgo8IS0tIFJFUEFJUiAtLT4KPGRpdiBpZD0icmVwYWlyIiBjbGFzcz0ic2VjdGlvbiI+CiAgPGRpdiBjbGFzcz0icmVwYWlyLWxpc3QiIGlkPSJyZXBhaXItbGlzdCI+PC9kaXY+CiAgPGJ1dHRvbiBjbGFzcz0iYWRkLWJ0biIgb25jbGljaz0iYWRkQ2FycGV0KCdyJykiPjxzcGFuIHN0eWxlPSJmb250LXNpemU6MThweDtmb250LXdlaWdodDozMDAiPis8L3NwYW4+INeU15XXodejINep15jXmdeXINec16rXmden15XXnzwvYnV0dG9uPgogIDxkaXYgY2xhc3M9ImRlbGl2ZXJ5LXNlY3Rpb24iPgogICAgPGgzPteh15XXkiDXqdeZ16jXldeqPC9oMz4KICAgIDxkaXYgY2xhc3M9ImRlbGl2ZXJ5LWdyaWQiPgogICAgICA8ZGl2IGNsYXNzPSJkZWxpdmVyeS1vcHQiPjxpbnB1dCB0eXBlPSJyYWRpbyIgbmFtZT0ici1kZWwiIGlkPSJyLXNlbGYiIGNoZWNrZWQgb25jaGFuZ2U9InVwZGF0ZURlbGl2ZXJ5KCdyJykiPjxsYWJlbCBmb3I9InItc2VsZiI+PHNwYW4gY2xhc3M9ImRlbGl2ZXJ5LWljb24iPvCfj6o8L3NwYW4+PHNwYW4+PHNwYW4gY2xhc3M9ImRlbGl2ZXJ5LW5hbWUiPteQ15nXodeV16Mg16LXptee15k8L3NwYW4+PHNwYW4gY2xhc3M9ImRlbGl2ZXJ5LWRlc2MiPtee15TXodeg15nXoyDXqdec16DXlTwvc3Bhbj48L3NwYW4+PC9sYWJlbD48L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iZGVsaXZlcnktb3B0Ij48aW5wdXQgdHlwZT0icmFkaW8iIG5hbWU9InItZGVsIiBpZD0ici1ob21lIiBvbmNoYW5nZT0idXBkYXRlRGVsaXZlcnkoJ3InKSI+PGxhYmVsIGZvcj0ici1ob21lIj48c3BhbiBjbGFzcz0iZGVsaXZlcnktaWNvbiI+8J+amjwvc3Bhbj48c3Bhbj48c3BhbiBjbGFzcz0iZGVsaXZlcnktbmFtZSI+16nXmdeo15XXqiDXoteTINeU15HXmdeqPC9zcGFuPjxzcGFuIGNsYXNzPSJkZWxpdmVyeS1kZXNjIj7XkNeZ16HXldejICsg15TXl9eW16jXlDwvc3Bhbj48L3NwYW4+PC9sYWJlbD48L2Rpdj4KICAgIDwvZGl2PgogICAgPGRpdiBjbGFzcz0iYnJhbmNoLXJvdyB2aXNpYmxlIiBpZD0ici1icmFuY2gtcm93Ij4KICAgICAgPGxhYmVsPteR15fXqCDXodeg15nXoyDXnNeQ15nXodeV16M8L2xhYmVsPgogICAgICA8c2VsZWN0IGlkPSJyLWJyYW5jaCIgb25jaGFuZ2U9InNob3dCcmFuY2goJ3InKTtjYWxjUmVwYWlyKCkiPjxvcHRpb24gdmFsdWU9IiI+LS0g15HXl9eoINeh16DXmdejIC0tPC9vcHRpb24+CiAgICAgICAgPG9wdGlvbiB2YWx1ZT0iamVydXNhbGVtIj7Xmdeo15XXqdec15nXnTwvb3B0aW9uPgogICAgICAgIDxvcHRpb24gdmFsdWU9InJpc2hvbiI+16jXkNep15XXnyDXnNem15nXldefPC9vcHRpb24+CiAgICAgICAgPG9wdGlvbiB2YWx1ZT0icmlzaG9uMiI+16jXkNep15XXnyDXnNem15nXldefINeR15XXmNeZ16c8L29wdGlvbj4KICAgICAgICA8b3B0aW9uIHZhbHVlPSJoZXJ6bGl5YSI+15TXqNem15zXmdeUPC9vcHRpb24+CiAgICAgICAgPG9wdGlvbiB2YWx1ZT0iaGVyemxpeWEyIj7XlNeo16bXnNeZ15Qg15HXldeY15nXpzwvb3B0aW9uPgogICAgICAgIDxvcHRpb24gdmFsdWU9Im5ldGFueWEiPteg16rXoNeZ15Q8L29wdGlvbj4KICAgICAgICA8b3B0aW9uIHZhbHVlPSJ0ZWxhdml2Ij7XqtecINeQ15HXmdeRIC0gT3V0bGV0PC9vcHRpb24+CiAgICAgICAgPG9wdGlvbiB2YWx1ZT0ibWFhbGUiPtee16LXnNeUINeQ15PXldee15nXnSBEY2l0eTwvb3B0aW9uPjwvc2VsZWN0PgogICAgICA8ZGl2IGNsYXNzPSJicmFuY2gtZGV0YWlsIiBpZD0ici1icmFuY2gtZGV0YWlsIj48L2Rpdj4KICAgIDwvZGl2PgogICAgPGRpdiBjbGFzcz0iYnJhbmNoLXJvdyIgaWQ9InItY2l0eS1yb3ciPgogICAgICA8bGFiZWw+15HXl9eoINei15nXqCDXnNeX15nXqdeV15Eg16LXnNeV16og157Xqdec15XXlzwvbGFiZWw+CiAgICAgIDxzZWxlY3QgaWQ9InItY2l0eSIgb25jaGFuZ2U9ImNhbGNSZXBhaXIoKSI+PG9wdGlvbiB2YWx1ZT0iMCI+LS0g15HXl9eoINei15nXqCAtLTwvb3B0aW9uPgogICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iOTAiPteS15XXqSDXqdeo15XXnyAvINee16jXm9eWPC9vcHRpb24+CiAgICAgICAgICA8b3B0aW9uIHZhbHVlPSIxMDAiPteq15wg15DXkdeZ15E8L29wdGlvbj4KICAgICAgICAgIDxvcHRpb24gdmFsdWU9IjExMCI+16TXqteXINeq16fXldeV15QgLyDXqNee15zXlCAvINec15XXkzwvb3B0aW9uPgogICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iMTIwIj7XqNee16og15LXnyAvINeS15HXoteq15nXmdedIC8g15HXoNeZINeR16jXpzwvb3B0aW9uPgogICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iMTIwIj7XqNeQ16nXldefINec16bXmdeV158gLyDXl9eV15zXldefIC8g15HXqiDXmdedPC9vcHRpb24+CiAgICAgICAgICA8b3B0aW9uIHZhbHVlPSIxMzAiPteU16jXptec15nXlCAvINeo16LXoNeg15QgLyDXm9ek16gg16HXkdeQPC9vcHRpb24+CiAgICAgICAgICA8b3B0aW9uIHZhbHVlPSIxMzAiPteg16rXoNeZ15QgLyDXl9eT16jXlDwvb3B0aW9uPgogICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iMTUwIj7Xmdeo15XXqdec15nXnTwvb3B0aW9uPgogICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iMTYwIj7Xl9eZ16TXlCAvINen16jXmdeV16o8L29wdGlvbj4KICAgICAgICAgIDxvcHRpb24gdmFsdWU9IjE4MCI+15HXkNeoINep15HXoiAvINeT16jXldedPC9vcHRpb24+CiAgICAgICAgICA8b3B0aW9uIHZhbHVlPSIyMDAiPtem16TXldefICjXoNem16jXqiDXldee16LXnNeUKTwvb3B0aW9uPjwvc2VsZWN0PgogICAgPC9kaXY+CiAgPC9kaXY+CiAgPGRpdiBjbGFzcz0idG90YWwtcGFuZWwiIGlkPSJyLXRvdGFsLXBhbmVsIiBzdHlsZT0iZGlzcGxheTpub25lIj4KICAgIDxkaXYgY2xhc3M9InRvdGFsLXJvd3MiIGlkPSJyLXRvdGFsLXJvd3MiPjwvZGl2PgogICAgPGRpdiBjbGFzcz0idG90YWwtZGl2aWRlciI+PC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJ0b3RhbC1tYWluIj48c3BhbiBjbGFzcz0idG90YWwtbWFpbi1sYWJlbCI+16HXlNe015sg15zXqtep15zXldedPC9zcGFuPjxzcGFuIGNsYXNzPSJ0b3RhbC1tYWluLWFtb3VudCIgaWQ9InItdG90YWwtYW1vdW50Ij7igqowPC9zcGFuPjwvZGl2PgogICAgPGRpdiBjbGFzcz0idG90YWwtdmF0Ij4qINeU157Xl9eZ16gg15TXmdeg15Ug15DXldee15PXnzwvZGl2PgogIDwvZGl2PgogIDxkaXYgY2xhc3M9Im1pbi1ub3RpY2UiIGlkPSJyLW1pbiI+4pqg77iPINee15nXoNeZ157XldedINeU15bXnteg15Qg4oKqMjUwPC9kaXY+CiAgPGRpdiBjbGFzcz0iYWN0aW9uLXJvdyI+PGJ1dHRvbiBjbGFzcz0icHJpbnQtYnRuIiBvbmNsaWNrPSJkb1ByaW50KCkiPvCflqjvuI8g15TXk9ek16EgLyDXqdee15XXqCBQREY8L2J1dHRvbj48L2Rpdj4KICA8cCBjbGFzcz0ic3VtbWFyeS1ub3RlIj7XlNee15fXmdeoINeU15nXoNeVINeQ15XXnteT158g4oCUINeU16bXldeV16og16nXnNeg15Ug15nXqdee15cg15zXkNep16gg16LXnSDXlNeS16LXqiDXlNep15jXmdeXPC9wPgo8L2Rpdj4KCgogIDwvZGl2Pgo8L3NlY3Rpb24+Cgo8IS0tIEVYQUNUIGJvdHRvbS1iYXIgZnJvbSBvcmlnaW5hbCAtLT4KPGRpdiBjbGFzcz0iYm90dG9tLWJhciI+CiAgPGRpdiBjbGFzcz0iYm90dG9tLWJyYW5kIj4KICAgIDxpbWcgc3JjPSJkYXRhOmltYWdlL3dlYnA7YmFzZTY0LFVrbEdSbEFSQUFCWFJVSlFWbEE0V0FvQUFBQVFBQUFBS3dFQWh3QUFRVXhRU0w4T0FBQUJ0OGVnYlNSSDUvQ0hmZTBMZ0lqSTRlMGdhNTdtTHJMSm5EZnlGM2pEdHUyUVhtdmIxcmd6WnBMaGtaRWV0bTNidG0zYnRtM2J0bTNiSGozc01UbzUvNC9SM1ZWMW5sV3BhLzZNNkw5RVNaTHJ0dGtTRXdoK3phNUk0QTZmQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBekxIYlJQOUhhZmR3NXc2VDFVNFdneXNjeE5ScmwwdjlZQWpobnp0M3JKZUo5VCs1cXJxV1hnaEhsQWs5TW9RUVFnanR1N2VhcEM1R2F6NGZ3cXRKK001NHZJeEY2K2dRd3QzRHkwdGsreEJDejhTZmQyeFJCeisrOXROZEdVeVZBSERXRUg3WUpMbXBsYnM4ZmJaZ2FabmNIMExvbWVnc0FqZHRPK2xZUG5xOEo0QVU2WC9Rd2J0dVpGcFh6VEU5cm5ZdUtaUkplckF6Zi96YUxTWVlhMGVyUDVUaC92UjR4bU82K1g3WU1LbXZOek5zWFZUaSsveUpYMjdlZEt5c1gxWjZPTlA2ZS9FVlZnYmhWUk9tTTNaeHBxOVhaaW9qbU00ZFZHemk5NXZXR3orOWgzNlROcHZOWnJQWmJEYWJ6V2F6Mld3Mm04MW1zOWxzTnB2TlpyUFpiSTdxSHdHOTdDTjV4aWVQOWZoT2g3Qm5jdjFVc1d6ZTdhdDNEMTB6ZmF3VGh4QkM0WWxmcjE0LzlTTFErS3JkYnJmYjdYYTczVzYzMisxMnU5MXV0OXZ0ZHJ2ZGJyZmI3WGI3OTVIRlIvZmx1NDROL3NnY3hzdlMzRTZ6NURzN05ybDJDQ0hFVFZ5ejhiQ2sraXVFRUd1azZJYTEzTjBaaEtsV3N0bHlJYi9kSUVFby9iOHFZTzJCQ1JQcmlRU3Bmbi9aK2tQVDZkdDRFMzhWKzJmeE80b2h2aFBuOFAwQ21KZU1HeDFLTVhOZkwxcUY5L2wzeTlWcmpxaU9DbzBLTTBhVm1NY1d5M3V0eUV3T0ttcHVqNVRhTTRTUWFPS255OVlkVmswdGNVY0VZOHpqUEZkUjBFdkh5NGlreUoxUTNOM1ZnOUxwc1JCQ3owU0tSZURDdFlaVVRndmZFTVY0U29TL2p3dVRmaE94cFk3NExjTGVXN09rdXFZSUlZVGlFOFdlcjR2WEhGSWxMWEJUSk9PYkVYTXhyQmYrcnlqcXMxSCtSbStjN0Jnb2hPSVR4ZStaeTFjYVVCSE5mVk04NUtqQzFXOGM2NWVyRlVNOUxkYmdxV24wYUFpaGpJa3ZMbHhwU1BtYTU1b1UvdFl1M0gvRzBsNHdUZ0hTOWVJZFBweWk5NTRvaEJCS212anFuTlVIbHFwNXIwaGo3cnlDWVIwZmhkdDllcEUvT1dXU1BXQ1plTzBXUWloeDR2UFRWaXhGblJ0bnpxeCtNUGtYT3RCSmdNL0tLMFRmUzJOeTN5US9YZTdFUitjczF5aWt1UFdiV1M5Sloydk1KSVd5K2lRTjhTZXJacEplbmNybERaSEZ4V1FoaEZENnhPVjVTbEJOejN0NlVsT2JGc25xaEdUSVoyZVVhenVuYy9uQlVvV1VRVitHaXJSeXFmVmJZbFBuRlBtTkNaay9YS0diZEw2VU5sK1AwdE9WME0wUnFvU3Axd3BFOVZHSE90MWs1MkVlNThjNHpyekRvZWxqcm1hb3BLcjJtanAvTHZVeXZqd1BwTVJjS2U2bjYxQ2JkQ1dWVlRhbjU5NXZ2NVNNeDhaOTV3dDFxRFB5a3ZvMGhCQkNDQ0dFRUNwbjhhRi9yN2ozZGFqM2NwSTZ1ZExYajBQanRHODFWYjNvcHNnNUFhcTA1dWtwZ0F1My9QV29EYk9yMzBwZnUwVmVrNGFLcXNKZjZIOXJTVmV5WGlHMnI5cTdKdlZTbGk0djRVcFpMMGYzb0Y5V1ZCV01iN0lzVjZ0OVVWMU5HNjFsam5xckhyVkJwcTFoRjFUMVdvOEV4MmJ6SC9ONkRlclVuS1JXLyt6ZnE2cldra3dzY05KYmRhZTM4bklhZWxtbzZGS2NiR0t4RTk2cWtxcDR0elZ6WTFyMzY2cjUrbU5DcEowNDl2MGEwOXI1SVkxM2FjVjhMUTZwSjVZKzhjTzYwcmxGTXRyd2h5clpPaERLbUZqODlIZHFTVzhXU21paXE2dmo2bllvYTJLcHN6NHNXNVhjSGljcEZ0Qm1QMWJFMDdmOVVlYkVDcWQ5VkRmYXRHQThJNit2aHFjNVVmS2czN0tuZjFrck9ydHdQRnY4WGdGTDIwRDVFNE5YUFBlTCt0QXJ4Y09adlB3dS9oS294c1RBRmM3L1pLelJUNzlHWWswZGtjMVdKVSsrRHIwVEZWZ0VWcjk3N05DSkV6NFp5YlZKVERKVDNsVjJkVjJ0d1NMbEt0bmlNU2ZYUkpLZEVaZk1EbitWZDYydmRPVTNNdWxWUWhPNGNvZDN6MGkyMXlLam1lcnU4cmFxeW1tOXF1djdYYnQ1NTR1a0d4UGRLZTR5dXBUckRUV2cxSWN3NC9id0RvaXRhRGVNVG1mNmU4dlFaRFdybStiSUFuNDBrdkNzQlBuc252NWFUUjBvWmJXMmVqYndjWkdNTDZZSWFOWkhFbCtucTFPMWRzM3p0MG9zNXVSSkl0b3I3NHJlcGVwVXA0M0lMLzFqT1RmNE42TWtrMDhuMUtnYTFXMkZPdVhZWTVWVFVxVjBRTEpyTFRXaEpIOWsxV0lHTDRwa2ZTdFpUSE0rbGVxYjZsS2o5eWxxY0tmS1BLeUhKU203MWFiK0xHeHc0VmpjdFJNbU5mdVZmOGRhK0hwd2ZlcXZrWVVQbjM2S3hEMHZaVlJML2hDOTlkZXFDanU4SnhMM3pYUkJiZlJ3aXRPeVBrQW54UEtPVEpQU09MdThucWl0cW4rdEU4dTdhWXFNSmo3a20xUy82L0w2Vk1TTitXdlpKemV6blBKYnluNjk5clg5TDVHOHI4Ym1zOWlWYWJ2UXEycGVXN3dSRHp4SlRqcTVYZXp0eVU4M3BxeHpyZkZDaWxqWGlNaG04MmRMT0RTN3RyNjExS05wWWoycmFERERkdWwwc0NXOG1qV3RoWkk5dDY4WGkyV0tJNzhMb1J4ZFdjdWE0K3AwcVk2WnFFaUhmbTQ3aE5EelN2L2wrdFZVRnlkTmRhUDhMZmZXRUVLSnVxNXVOZkxFZjlLbWVtYmVOdlJRQ0tIYzE5UzFxc2tQL3owNzFNUkhPSU4yZUMyRTBuVmpyV3FUM2xSTHFQSW4yTytURUVJRlh0UFVvbnE3eGhMMmd3MjdlUy82NzlRb2lWSUVWcXZUajZVUDlkVHVjUWloS3E4WjZsUW5wYy8wclc3ZTVhdWoyK3BRR1R0b2VVWCs0OVY1TFZLakd2RjMra3pYN2dhZXVUbzZyZ2FWQWZsQytrd2Y2Z0crdkNLanUxY1lVcWM2Tlhtb1ArN2ZBenplbUNxTWJscW9adnVGVlJPSCtzMGg0MlVRSDFyKzZOSzU2clJuNzY3UWtvYjY3WUhETXUwTktMbTArL09VR2RYd3Vka3JDVWQ3RDh1TFkvTXlSNzhjTVlvNjFvbXBVdjFxdjJFRjhuaTN0TkhuQjB4SW5TclRWSnBVUDkyblVTaVBSYnRHSlZUUnV3eWlydFZNa2VvWCt4Wk85ZjR5Umk5dWcvcFZ3c3J1czkwYnhRT1pPdjNvaVhXcGQ1MFppZmpsem5GUDZybUpSL2N0UjkxcjR5akFqM2FMTGVmL2w5V2FwY2htVWVwZlUwWGdmYkJ6di9oSTlrazN1bmh1YWx2Wm5COFZoZnR3dDM1Sk12a3V6Y3pvczJlaXhwVmdzWHR2dS83WmJBOCt0RUxoVEZLTWZqNW1xbXpTNmQ0NWRmb2ExeFpGd043TXJTaG1DU0c4c25ObTVaclpieVFvZU1mUEF6MG1oSERMaXJXdG1RcU10c3QzZmxGM1IzVFNISU1MaERKZmhzT0NqOFdlWGFUWjdlc1BYVUF2YnplcWYyMHF4OWQ3T1ZDdkY2bFNSL3pWQzdWTWtWUnVLK2l2KzRQWXVnam1waG1WOWFCNjFpV1pTRzlzVnNqNG5yMVVmNHdvQWpWcFJNRzdUckVRWCt2RnVsSTlhOGVzMFJZRmpiL2Z5M1ZJTWFwVGloYThLeGUwTUc4RzJGUTFyV2w3ZThSTmkvcGVPd040L0dKWVF3b1Z3amN1WGpqRHUzdko3cTNSYjhrejlrblhvclo1QnNkY0IwK1pqWFY3RjI5bjJ5eWF5eDc1dnE2WUp3dHFxeDJ6RVNmS1lGdTZHaXEwRENmUUE5bVlROGNrNEJ5VlorenFFSjdmTkdmaEhIMWhaaWMweFM0dmRlTXVWRGlZTDdJOXRjK1lMUk5wWUFqdkhkVE11dmNYT09YSDdsNmtzcjlvalZhcjFXcTFXcTFXcTlWcXRWcXRWcXZWYXJWYXJWYXIxV3ExV3EzV1pmOWhadVh3ZGp6bWx4UG43aGtmclplTk1meXZyaTFoaTh4K1lia2JPNnRvOFdCV3lScjlmdlIvajBKK2wvdjM1UXRra1l5NzR4c2hoRjJxby94U3FORm9OQnFOUnFQUmFEUWFqVWFqMFdnMEdvMUdvOUZvTkJxTlJxUHhiL0dVOHpZQloyN1hOQ3l2eE5xdEorK1BEODZFbWZXa0g3YVBTT2E1SHRLdkR4bFpxRVR1K3NTekY4NlZIdmg1R0FBQUFBQUFBQUFBQUFBQVlPenA1VDdydlRtdjZUeThqWXpiZkVBRTZleGRtTy91T1RSbXUxM3l2M3NoNjRNWnYrYXZ6T2M4STlmeHNPM1hSMCtkZ3ZYS0VGN1pxaERQalJtbFM0ZmlvYXhhcU0vUVhiMjUzdHI3V0YrMlJEenJOUGRuN041NTIyMUdvOUdwaVRwN3lhRlQ5Q25YSWhtNUxvalp1aEdlM21xeWNqeGNsM0d3MUtFNG93dGg5SldMaitnN05NZFZQVjNuMngyS3kzcFR2cnVrS3V2eEh1cmRNU2lqVmw2dkx4bU9PdWlkVHBKYmR2YVIwWjFjdXloS2V6b3U2SHd5ZjNZMnBoMHlTdkR4KzVnZldPZWVFRHJiN2Y0WnB4RWxXcGhzdncrNysvT1BlajBjcFcvNDlkbTExenFkLzcvdnpmWEFVaTMwMjZyVFFheWVzZjUydHc5OXo3Y3UyeHZybUNwc0ErZG5OYzE5aUhMYXRIa3YvTDA2aDF6amJmeHd0enBISDMzVnhNajkzZ29oekY0UkR3dWQ4MmNJNzBKZk5kRlo0WjU1cGtKYis5NmYvdHV0OTNHdmRUZXIwbXF5MjF3QUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBRDBjVjBkQUZaUU9DQnFBZ0FBTUI0QW5RRXFMQUdJQUQ2UlJweEpKYVFqSVNzL0tBQ3dFZ2xqYnQvd0wwQzhBZnFCQWdQd0EvQUR5QVBvQTV3RDhBUHdBdGYvS0F2d0Q4QUxrZDBUNXpxWC9MdUVNNjQrWDVKMy9OMmdQMEF4UUg4QS9nSDdBZS8vVGY0MUhZRDZ0YTFyVlJZODJEb3dGKzJBVXFIdWZ4ajA1M1A0eDVMcU5ZQktZM3QxeE1aQUx5SmpnRTR6VEk1dFFZTWZnZWhEQ0t6b1hrVEhBSnhtbVJ6YXZONWt4L1FmempOTWptMWVjQW5HYVpITm9YblhBSWlYczB5T2JWNXdDY1pwa2MycnYwOTRnRnF3OFpITnE4NEJPTTB5T2JWNXZWdk9pOGZyRnZFRGg2YVNrRnlqcXUvckMrOGtlZkFuRnlTODRCT0xpS3BWc3ZjRFN0aitBQUQrL1BSZWd6R21udnQ0M3cwOGExNzE5SXVBNWF0ZDdBMk5qMW1mcHhzNzlZM3N3eG5XM1psU3V3alFzaHhETWFhZSszamZEVHhyWHZYMGk0bjdLOG5xZzU4SFlQUVdyNGV6T1h6Q2hYZGoreVZKY1QxTUdjSXJqV1dJVG5QUXNCbU5OUGZieHZocDQxcjNyNlJjVDlsZVQxUWMrRUtlTVNNYXFreUpmcVlISlFOL1RZY0JiU2JBOG5HY1lwV0JEcTJ1S2tRVGpQNmVKWVZhRUcwSFRDTFM5akFWM213N21vOXpzTkxUVWVvb3RZeW95MTN6U0Y3aDBteWdXbE1CMTVaQjBQbzJnSXRIc2dqdGNDME1pclRKUFpmYjRHdVVBWm15Y0RpcHlSN0UwMkdySG9ILy9pZW1pZE1GUG9kS0RERHAzYXAvSzJhbTlkNUpYbXRzanZDQ3JmWmwvZUo3cys0VkVxamMrdU93Z2Q2QTExZzJmOHBmLy9ReFVRaGhab3I5QlZjY3VLV2FDN0d0aVZITlNoWTVPbFpZZnU0b05zL0xMV2VkWnYxUHpzTEVmYndlUno0M1o3Y0pZWkEyM0lxdDdtZkhISFRxQUZJYTlhVUYrWmZXaFI4ZTlNWEcwcUV5NkozTkdvQUEiIGFsdD0i16bXnteoIj4KICAgIDxzcGFuIGNsYXNzPSJib3R0b20tdGV4dCI+wqkgMjAyNSDXqdeQ16TXldeoINep15jXmdeX15nXnSDXkC7Xmy4g15HXoiLXnjwvc3Bhbj4KICA8L2Rpdj4KICA8ZGl2IGNsYXNzPSJib3R0b20tdXJsIj5UWkVNRVIuQ08uSUw8L2Rpdj4KPC9kaXY+Cgo8c2NyaXB0PgoKLy8g4pSA4pSA4pSAIExPQUQgQ09ORklHIEZST00gQURNSU4g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSACmZ1bmN0aW9uIGxvYWRBZG1pbkNmZygpewogIHRyeXsgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3R6ZW1lcl9hZG1pbl9jZmcnKSl8fG51bGw7IH1jYXRjaChlKXsgcmV0dXJuIG51bGw7IH0KfQpjb25zdCBfQURNSU4gPSBsb2FkQWRtaW5DZmcoKTsKY29uc3QgX0cgID0gKF9BRE1JTiAmJiBfQURNSU4uZ2VuZXJhbCkgICAgICAgIHx8IHt9Owpjb25zdCBfViAgPSAoX0FETUlOICYmIF9BRE1JTi52aXNpYmlsaXR5KSAgICAgfHwge307CmNvbnN0IF9DUCA9IChfQURNSU4gJiYgX0FETUlOLmNsZWFuaW5nUHJpY2VzKSB8fCB7fTsKY29uc3QgX1JQID0gKF9BRE1JTiAmJiBfQURNSU4ucmVwYWlyUHJpY2VzKSAgIHx8IHt9Owpjb25zdCBfRFAgPSAoX0FETUlOICYmIF9BRE1JTi5kZWxpdmVyeVByaWNlcykgfHwgbnVsbDsKY29uc3QgX0RDID0gKF9BRE1JTiAmJiBfQURNSU4uZGlzY291bnRzKSAgICAgIHx8IG51bGw7Cgpjb25zdCBNSU4gICAgID0gX0cubWluT3JkZXIgIHx8IDI1MDsKY29uc3QgTUlOX1NJREU9IF9HLm1pblNpZGUgICB8fCAxMDA7CmNvbnN0IERJU0MgICAgPSAoX0RDfHxbe246MyxwOjUsbGFiZWw6J9eU16DXl9eqIDMrINep15jXmdeX15nXnSAoLTUlKSd9LHtuOjUscDoxMCxsYWJlbDon15TXoNeX16ogNSsg16nXmNeZ15fXmdedICgtMTAlKSd9XSkKICAgICAgICAgICAgICAgIC5tYXAoZD0+KHtuOmQubixwOmQucCxsOmQubGFiZWx9KSk7Cgpjb25zdCBCUkFOQ0hFUz17CiAgamVydXNhbGVtOntuYW1lOifXmdeo15XXqdec15nXnScsYWRkcjon16TXmdeZ16gg16fXoNeZ15IgMzksINeq15zXpNeZ15XXqicscGhvbmU6JzA3My03Nzg0NTY0Jyxob3Vyczon15At15QgOTozMC0xODozMCB8INeVIDk6MDAtMTM6MzAgfCDXl9eg15nXlCDXl9eZ16DXnSd9LAogIHJpc2hvbjp7bmFtZTon16jXkNep15XXnyDXnNem15nXldefJyxhZGRyOifXkNec15nXlNeVINeQ15nXqtefIDMsINeR15nXqiDXkteZ16jXldefJyxwaG9uZTonMDczLTc4MjExNzgnLGhvdXJzOifXkC3XlCA5OjAwLTE4OjMwIHwg15UgOTowMC0xMzozMCB8INeX16DXmdeUINeX15nXoNedJ30sCiAgcmlzaG9uMjp7bmFtZTon16jXkNep15XXnyDXnNem15nXldefINeR15XXmNeZ16cnLGFkZHI6J9ec15nXqdeg16HXp9eZIDQsINep15HXoteqINeU15vXldeb15HXmdedJyxwaG9uZTonMDczLTc1ODc0OTcnLGhvdXJzOifXkC3XlCAxMDowMC0xOTowMCB8INeVIDk6MDAtMTM6MzAgfCDXqdei16rXmdeZ150g16jXkNep15XXoNeV16og15fXmdeg150nfSwKICBoZXJ6bGl5YTp7bmFtZTon15TXqNem15zXmdeUJyxhZGRyOifXnteT15nXoNeqINeU15nXlNeV15PXmdedIDYwJyxwaG9uZTonMDczLTc4MjkxMTMnLGhvdXJzOifXkC3XlCAxMDowMC0xODozMCB8INeVIDk6MzAtMTQ6MDAgfCDXl9eg15nXlCDXkdeq16nXnNeV150nfSwKICBoZXJ6bGl5YTI6e25hbWU6J9eU16jXptec15nXlCDXkdeV15jXmdenJyxhZGRyOifXnteT15nXoNeqINeU15nXlNeV15PXmdedIDYwJyxwaG9uZTonMDczLTc3ODgwNTInLGhvdXJzOifXkC3XlCAxMDowMC0xODozMCB8INeVIDk6MzAtMTQ6MDAgfCDXl9eg15nXlCDXkdeq16nXnNeV150nfSwKICBuZXRhbnlhOntuYW1lOifXoNeq16DXmdeUJyxhZGRyOifXntekIteZIDUsINen15XXnteUIDIsINee16rXl9edINeU16HXldeU15UnLHBob25lOicwNzMtNzU3OTExNCcsaG91cnM6J9eQLdeUIDEwOjAwLTE5OjAwIHwg15UgOTowMC0xNDowMCB8INep16LXlCDXqNeQ16nXldeg15Qg15fXmdeg150nfSwKICB0ZWxhdml2OntuYW1lOifXqtecINeQ15HXmdeRIC0gT3V0bGV0JyxhZGRyOifXp9eZ15HXldelINeS15zXldeZ15XXqiAzNCwg16rXnCDXkNeR15nXkScscGhvbmU6JzA3My03ODI0MjAyJyxob3Vyczon15At15QgOTowMC0xODozMCB8INeVIDk6MDAtMTM6MzAgfCDXl9eg15nXlCDXkdeq16nXnNeV150nfSwKICBtYWFsZTp7bmFtZTon157Xotec15Qg15DXk9eV157XmdedIERjaXR5JyxhZGRyOifXk9eo15og15nXnteZ16ogMTAsINee16LXnNeUINeQ15PXldee15nXnScscGhvbmU6JzA3My03NTgxNzIzJyxob3Vyczon15At15QgMTA6MDAtMTg6MzAgfCDXlSA5OjMwLTEzOjMwIHwg15fXoNeZ15Qg15fXmdeg150nfSwKfTsKCmNvbnN0IENfVFlQRVM9WwogIHtpZDonbWFjaGluZScsbmFtZTon16LXkdeV15PXqiDXnteb15XXoNeUJyxwcmljZTpfQ1AubWFjaGluZXx8OTV9LAogIHtpZDonaGFuZCcsICAgbmFtZTon16LXkdeV15PXqiDXmdeTJywgICBwcmljZTpfQ1AuaGFuZCAgIHx8MTM1fSwKICB7aWQ6J3NpbGsnLCAgIG5hbWU6J9ee16nXmScsICAgICAgICAgcHJpY2U6X0NQLnNpbGsgICB8fDE5MH0sCl07CmNvbnN0IENfU1ZDUz1bCiAge2lkOid1cmluZScsbmFtZTon15fXmdeY15XXmSDXqNeZ15cg16nXqtefJyxwcG06X0NQLnVyaW5lfHw2MCwgZml4ZWQ6ZmFsc2UsICBzaG93Ol9WLnN2Y1VyaW5lIT09ZmFsc2V9LAogIHtpZDonc3RhaW4nLG5hbWU6J9eY15nXpNeV15wg15HXm9eq150nLCAgIHBwbTowLCAgICAgICAgICAgICBmaXhlZDp0cnVlLGZwOl9DUC5zdGFpbnx8NzUwLCBzaG93Ol9WLnN2Y1N0YWluIT09ZmFsc2V9LAogIHtpZDonZmxvb2QnLG5hbWU6J9eq15XXodek16og15zXlNem16TXlCcsICBwcG06X0NQLmZsb29kfHw1MCwgZml4ZWQ6ZmFsc2UsICBzaG93Ol9WLnN2Y0Zsb29kIT09ZmFsc2V9LAogIHtpZDonaGFyZHN0YWluJyxuYW1lOifXmNeZ16TXldecINeR15vXqtedINen16nXlCcsIHBwbTowLCBmaXhlZDp0cnVlLCBmcDooX0NQLmhhcmRzdGFpbnx8MTAwMCksIHNob3c6X1Yuc3ZjSGFyZHN0YWluIT09ZmFsc2V9LApdOwpjb25zdCBfUk4gPSAoX0FETUlOICYmIF9BRE1JTi5yZXBhaXJOYW1lcykgfHwge307CmZ1bmN0aW9uIF9ybihpZCwgZGVmKXsgcmV0dXJuIF9STltpZF0hPT11bmRlZmluZWQgPyBfUk5baWRdIDogZGVmOyB9Ci8vIGJpbGxpbmc6ICdzcW0nPWFyZWEsICdzaWRlczQnPXVwIHRvIDQgc2lkZXMgKGxpbmVhciBtKSwgJ3NpZGVzMic9dXAgdG8gMiBzaWRlcywgJ2ZpeGVkJz1mbGF0IHByaWNlCmNvbnN0IFJfQ0FUUz1bCiAge2NhdDon16LXkdeV15PXldeqINeh16jXmCcsIGJpbGxpbmc6J3NpZGVzNCcsIHN2Y3M6WwogICAge2lkOid0MScsbmFtZTpfcm4oJ3QxJywn15TXk9eR16fXqiDXodeo15ggLyDXodeo15gg15fXnSDXnNen16DXmCcpLHBwbTpfUlAudDF8fDYwfSwKICAgIHtpZDondDInLG5hbWU6X3JuKCd0MicsJ9eh16jXmCBQLlYuQyDXqtek15XXqCAo16LXkdeV15PXqiDXmdeTKScpLHBwbTpfUlAudDJ8fDEwMH0sCiAgICB7aWQ6J3QzJyxuYW1lOl9ybigndDMnLCfXodeo15gg15fXmdeR15XXqCDXodeo15gg15fXnScpLHBwbTpfUlAudDN8fDc1fSwKICAgIHtpZDondDQnLG5hbWU6X3JuKCd0NCcsJ9eh16jXmCDXnNep15jXmdeXINee15vXldeg15QnKSxwcG06X1JQLnQ0fHwxMDB9LAogICAge2lkOid0NScsbmFtZTpfcm4oJ3Q1Jywn16HXqNeYINeZ15XXmNeUJykscHBtOl9SUC50NXx8MTAwfSwKICBdfSwKICB7Y2F0OifXqteZ16fXldefINeV16jXodeY15XXqNem15nXlCcsIGJpbGxpbmc6J3NxbScsIHN2Y3M6WwogICAge2lkOidyMScsbmFtZTpfcm4oJ3IxJywn157XqteZ15fXlCcpLHBwbTpfUlAucjF8fDM2MH0sCiAgICB7aWQ6J3IyJyxuYW1lOl9ybigncjInLCfXqNeh15jXldeo16bXmdeUINem157XqCcpLHBwbTpfUlAucjJ8fDk1MH0sCiAgICB7aWQ6J3IzJyxuYW1lOl9ybigncjMnLCfXqNeh15jXldeo16bXmdeUINee16nXmScpLHBwbTpfUlAucjN8fDExNTB9LAogICAge2lkOidyNCcsbmFtZTpfcm4oJ3I0Jywn15jXmdek15XXnCDXkdeo16fXoiDXpteU15XXkScpLHBwbTpfUlAucjR8fDI4MH0sCiAgICB7aWQ6J3I1JyxuYW1lOl9ybigncjUnLCfXl9eZ15bXldenINeo15DXqScpLHBwbTpfUlAucjV8fDM1MCxiaWxsaW5nOidzaWRlczJsb25nJ30sCiAgXX0sCiAge2NhdDon15fXmdeq15XXmiDXldeq16TXmdeo15QnLCBiaWxsaW5nOidzaWRlczQnLCBzdmNzOlsKICAgIHtpZDonYzEnLG5hbWU6X3JuKCdjMScsJ9eX15nXqteV15og16TXqNei15XXqdeZ150gLyDXotepJykscHBtOl9SUC5jMXx8NzV9LAogICAge2lkOidjMicsbmFtZTpfcm4oJ2MyJywn15fXmdeq15XXmiDXqdeY15nXlyDXqdeQ15LXmSAvINeiXHUwNUY015knKSxwcG06X1JQLmMyfHwxNjB9LAogICAge2lkOidjMycsbmFtZTpfcm4oJ2MzJywn15fXmdeq15XXmiDXqdeY15nXlyDXqNeS15nXnCcpLHBwbTpfUlAuYzN8fDM1fSwKICBdfSwKICB7Y2F0OifXoteR15XXk9eV16og16TXqNeg15bXmdedJywgYmlsbGluZzonc2lkZXM0Jywgc3ZjczpbCiAgICB7aWQ6J2YxJyxuYW1lOl9ybignZjEnLCfXlNec15HXoNeqINek16jXoNeW15nXnScpLHBwbTpfUlAuZjF8fDYwfSwKICAgIHtpZDonZjInLG5hbWU6X3JuKCdmMicsJ9ek16jXoNeWINeZ15MgLyDXptee16ggLyDXm9eV16rXoNeUJykscHBtOl9SUC5mMnx8NTgwfSwKICAgIHtpZDonZjMnLG5hbWU6X3JuKCdmMycsJ9ek16jXoNeWINee16fXldeo15knKSxwcG06X1JQLmYzfHw3ODB9LAogIF19LAogIHtjYXQ6J9eq16TXmdeo16og16TXmdeg15XXqicsIGJpbGxpbmc6J2ZpeGVkJywgc3ZjczpbCiAgICB7aWQ6J3AxJyxuYW1lOl9ybigncDEnLCfXqtek15nXqNeqIDQg16TXmdeg15XXqiDXoteV16gnKSxwcG06MCxmaXhlZDp0cnVlLGZwOl9SUC5wMXx8MjgwfSwKICBdfSwKICB7Y2F0OifXoteR15XXk9eV16og15LXmdeW15XXlicsIGJpbGxpbmc6J3NxbScsIHN2Y3M6WwogICAge2lkOidnMScsbmFtZTpfcm4oJ2cxJywn15LXmdeW15XXliDXl9eV15jXmdedINeR15XXnNeY15nXnScpLHBwbTowLGZpeGVkOnRydWUsZnA6X1JQLmcxfHwyMDB9LAogIF19LApdOwoKLy8gQXBwbHkgdmlzaWJpbGl0eSBmcm9tIGFkbWluCmZ1bmN0aW9uIGFwcGx5VmlzaWJpbGl0eSgpewogIC8vIHRhYnMKICBjb25zdCBjbGVhblRhYj1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFiLWJ0bjpudGgtY2hpbGQoMSknKTsKICBjb25zdCByZXBhaXJUYWI9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhYi1idG46bnRoLWNoaWxkKDIpJyk7CiAgaWYoY2xlYW5UYWImJl9WLmNsZWFuaW5nPT09ZmFsc2Upe2NsZWFuVGFiLnN0eWxlLmRpc3BsYXk9J25vbmUnO30KICBpZihyZXBhaXJUYWImJl9WLnJlcGFpcj09PWZhbHNlKXtyZXBhaXJUYWIuc3R5bGUuZGlzcGxheT0nbm9uZSc7IHN3aXRjaFRhYignY2xlYW5pbmcnKTt9CiAgLy8gZGVsaXZlcnkgb3B0aW9uCiAgaWYoX1YuZGVsaXZlcnk9PT1mYWxzZSkgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRlbGl2ZXJ5LW9wdDpudGgtY2hpbGQoMiknKS5mb3JFYWNoKGU9PmUuc3R5bGUuZGlzcGxheT0nbm9uZScpOwogIC8vIGJyYW5jaGVzCiAgaWYoX1YuYnJhbmNoZXM9PT1mYWxzZSkgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJyYW5jaC1yb3cnKS5mb3JFYWNoKGU9PmUuc3R5bGUuZGlzcGxheT0nbm9uZScpOwogIC8vIHByaW50IGJ0bgogIGlmKF9WLnByaW50PT09ZmFsc2UpIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmludC1idG4nKS5mb3JFYWNoKGU9PmUuc3R5bGUuZGlzcGxheT0nbm9uZScpOwogIC8vIHByZXZpZXcKICBpZihfVi5wcmV2aWV3PT09ZmFsc2UpIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJwZXQtcHJldmlldycpLmZvckVhY2goZT0+ZS5zdHlsZS5kaXNwbGF5PSdub25lJyk7CiAgLy8gZm9vdG5vdGUKICBpZihfRy5mb290bm90ZSkgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN1bW1hcnktbm90ZScpLmZvckVhY2goZT0+ZS50ZXh0Q29udGVudD1fRy5mb290bm90ZSk7CiAgLy8gZGVsaXZlcnkgY2l0eSBvcHRpb25zIOKAlCByZWJ1aWxkIGZyb20gYWRtaW4gcHJpY2VzCiAgaWYoX0RQKXsKICAgIFsnYy1jaXR5Jywnci1jaXR5J10uZm9yRWFjaChzZWxJZD0+ewogICAgICBjb25zdCBzZWw9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsSWQpOwogICAgICBpZighc2VsKXJldHVybjsKICAgICAgc2VsLmlubmVySFRNTD0nPG9wdGlvbiB2YWx1ZT0iMCI+LS0g15HXl9eoINei15nXqCAtLTwvb3B0aW9uPic7CiAgICAgIF9EUC5mb3JFYWNoKGM9PnNlbC5pbm5lckhUTUwrPWA8b3B0aW9uIHZhbHVlPSIke2MucHJpY2V9Ij4ke2MubmFtZX08L29wdGlvbj5gKTsKICAgIH0pOwogIH0KfQoKbGV0IGNJZD0wLCBySWQ9MDsKCmZ1bmN0aW9uIHN3aXRjaFRhYih0KXsKICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiLWJ0bicpLmZvckVhY2goKGIsaSk9PmIuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJywoaT09PTAmJnQ9PT0nY2xlYW5pbmcnKXx8KGk9PT0xJiZ0PT09J3JlcGFpcicpKSk7CiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNlY3Rpb24nKS5mb3JFYWNoKHM9PnMuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpOwogIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHQpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpOwp9CgpmdW5jdGlvbiB1cFByZXYoaWQscCl7CiAgY29uc3QgbD1wYXJzZUZsb2F0KChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtwfS1sZW4tJHtpZH1gKSAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtwfS1sZW4tJHtpZH1gKS52YWx1ZSkpfHwwOwogIGNvbnN0IHc9cGFyc2VGbG9hdCgoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cH0td2lkLSR7aWR9YCkgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cH0td2lkLSR7aWR9YCkudmFsdWUpKXx8MDsKICBjb25zdCBzdmc9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHBzdmctJHtwfS0ke2lkfWApOwogIGNvbnN0IGxibD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcGxibC0ke3B9LSR7aWR9YCk7CiAgaWYoIXN2ZylyZXR1cm47CiAgY29uc3QgTT03NjsKICBsZXQgcncscmg7CiAgaWYobD09PTAmJnc9PT0wKXtydz1NO3JoPU1hdGgucm91bmQoTSouNzUpO30KICBlbHNlIGlmKGw+PXcpe3J3PU07cmg9TWF0aC5tYXgoOCxNYXRoLnJvdW5kKE0qKHcvbCkpKTt9CiAgZWxzZXtyaD1NO3J3PU1hdGgubWF4KDgsTWF0aC5yb3VuZChNKihsL3cpKSk7fQogIHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLGAwIDAgJHtyd30gJHtyaH1gKTsKICBzdmcuc2V0QXR0cmlidXRlKCd3aWR0aCcscncpO3N2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcscmgpOwogIHN2Zy5xdWVyeVNlbGVjdG9yKCdyZWN0Jykuc2V0QXR0cmlidXRlKCd3aWR0aCcscncpOwogIHN2Zy5xdWVyeVNlbGVjdG9yKCdyZWN0Jykuc2V0QXR0cmlidXRlKCdoZWlnaHQnLHJoKTsKICBpZihsYmwpbGJsLnRleHRDb250ZW50PShsPjAmJnc+MCk/YCR7bH3DlyR7d30g16FcdTA1RjTXnmA6J9eU15bXnyDXnteZ15PXldeqJzsKfQoKZnVuY3Rpb24gbWtQcmV2KGlkLHApewogIGNvbnN0IGNvbD1wPT09J2MnPydlODgxMmEnOidlODgxMmEnOwogIHJldHVybiBgPGRpdiBjbGFzcz0iY2FycGV0LXByZXZpZXciPgogICAgPGRpdiBjbGFzcz0icHJldmlldy1ib3giPgogICAgICA8c3ZnIGlkPSJwc3ZnLSR7cH0tJHtpZH0iIHdpZHRoPSI3NiIgaGVpZ2h0PSI1NyIgdmlld0JveD0iMCAwIDc2IDU3Ij4KICAgICAgICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9Imcke3B9JHtpZH0iIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMke2NvbH0iIHN0b3Atb3BhY2l0eT0iLjY1Ii8+CiAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMke3A9PT0nYyc/J2M5NmExOCc6J2M5NmExOCd9IiBzdG9wLW9wYWNpdHk9Ii40Ii8+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD48L2RlZnM+CiAgICAgICAgPHJlY3Qgd2lkdGg9Ijc2IiBoZWlnaHQ9IjU3IiByeD0iNSIgZmlsbD0idXJsKCNnJHtwfSR7aWR9KSIgc3Ryb2tlPSIjJHtjb2x9IiBzdHJva2Utd2lkdGg9IjEuNSIvPgogICAgICA8L3N2Zz4KICAgIDwvZGl2PgogICAgPGRpdiBjbGFzcz0icHJldmlldy1sYWJlbCIgaWQ9InBsYmwtJHtwfS0ke2lkfSI+15TXltefINee15nXk9eV16o8L2Rpdj4KICA8L2Rpdj5gOwp9CgpmdW5jdGlvbiBhZGRDYXJwZXQocCl7CiAgaWYocD09PSdjJyl7CiAgICBjb25zdCBpZD0rK2NJZDsKICAgIGNvbnN0IHRPcHRzPUNfVFlQRVMubWFwKHQ9PmA8ZGl2IGNsYXNzPSJ0eXBlLW9wdCI+PGlucHV0IHR5cGU9InJhZGlvIiBuYW1lPSJjdC0ke2lkfSIgaWQ9ImN0JHtpZH0tJHt0LmlkfSIgdmFsdWU9IiR7dC5wcmljZX0iICR7dC5pZD09PSdtYWNoaW5lJz8nY2hlY2tlZCc6Jyd9IG9uY2hhbmdlPSJjYWxjQ2xlYW5pbmcoKSI+PGxhYmVsIGZvcj0iY3Qke2lkfS0ke3QuaWR9Ij48c3BhbiBjbGFzcz0idHlwZS1uYW1lIj4ke3QubmFtZX08L3NwYW4+PHNwYW4gY2xhc3M9InR5cGUtcHJpY2UiPuKCqiR7dC5wcmljZX0v155cdTA1RjTXqDwvc3Bhbj48L2xhYmVsPjwvZGl2PmApLmpvaW4oJycpOwogICAgY29uc3Qgc09wdHM9Q19TVkNTLmZpbHRlcihzPT5zLnNob3chPT1mYWxzZSkubWFwKHM9PmA8ZGl2IGNsYXNzPSJzdmMtb3B0Ij48aW5wdXQgdHlwZT0iY2hlY2tib3giIGlkPSJjcyR7aWR9LSR7cy5pZH0iIG9uY2hhbmdlPSJjYWxjQ2xlYW5pbmcoKSI+PGxhYmVsIGZvcj0iY3Mke2lkfS0ke3MuaWR9Ij48c3BhbiBjbGFzcz0iY2hrIj7inJM8L3NwYW4+PHNwYW4+PHNwYW4gY2xhc3M9InN2Yy1uYW1lIj4ke3MubmFtZX08L3NwYW4+PHNwYW4gY2xhc3M9InN2Yy1wcmljZS1sYmwiPiR7cy5maXhlZD8n4oKqJytzLmZwKycg16HXlFx1MDVGNNebJzon4oKqJytzLnBwbSsnL9eeXHUwNUY016gnfTwvc3Bhbj48L3NwYW4+PC9sYWJlbD48L2Rpdj5gKS5qb2luKCcnKTsKICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbGVhbmluZy1saXN0JykuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLGAKICAgICAgPGRpdiBjbGFzcz0iY2FycGV0LWNhcmQiIGlkPSJjLWNhcmQtJHtpZH0iPgogICAgICAgIDxkaXYgY2xhc3M9ImNhcnBldC1jYXJkLWhlYWRlciI+PHNwYW4gY2xhc3M9ImNhcnBldC1udW0iPtep15jXmdeXINee16FcdTA1RjMgJHtpZH08L3NwYW4+JHtpZD4xP2A8YnV0dG9uIGNsYXNzPSJyZW1vdmUtYnRuIiBvbmNsaWNrPSJybUMoJ2MnLCR7aWR9KSI+4pyVPC9idXR0b24+YDonJ308L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJkaW1zLXByZXZpZXctcm93Ij4KICAgICAgICAgIDxkaXY+CiAgICAgICAgICAgIDxkaXYgY2xhc3M9ImRpbXMtaW5wdXRzIj4KICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJmaWVsZCI+PGxhYmVsPteQ15XXqNeaICjXoVx1MDVGNNeeKTwvbGFiZWw+PGlucHV0IHR5cGU9Im51bWJlciIgaWQ9ImMtbGVuLSR7aWR9IiBwbGFjZWhvbGRlcj0iMjAwIiBtaW49IjAiIGlucHV0bW9kZT0ibnVtZXJpYyIgcGF0dGVybj0iWzAtOV0qIiBvbmlucHV0PSJ1cFByZXYoJHtpZH0sJ2MnKTtjYWxjQ2xlYW5pbmcoKSI+PC9kaXY+CiAgICAgICAgICAgICAgPGRpdiBjbGFzcz0iZmllbGQiPjxsYWJlbD7XqNeV15fXkSAo16FcdTA1RjTXnik8L2xhYmVsPjxpbnB1dCB0eXBlPSJudW1iZXIiIGlkPSJjLXdpZC0ke2lkfSIgcGxhY2Vob2xkZXI9IjE1MCIgbWluPSIwIiBpbnB1dG1vZGU9Im51bWVyaWMiIHBhdHRlcm49IlswLTldKiIgb25pbnB1dD0idXBQcmV2KCR7aWR9LCdjJyk7Y2FsY0NsZWFuaW5nKCkiPjwvZGl2PgogICAgICAgICAgICAgIDxkaXYgY2xhc3M9ImFyZWEtaW5mbyI+PHNwYW4gY2xhc3M9ImFyZWEtbGJsIj7XqdeY15cg15HXpNeV16LXnDwvc3Bhbj48c3BhbiBjbGFzcz0iYXJlYS12YWwiIGlkPSJjLWFyZWEtJHtpZH0iPjAuMDAg155cdTA1RjTXqDwvc3Bhbj48L2Rpdj4KICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICR7bWtQcmV2KGlkLCdjJyl9CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0idHlwZS1ncmlkIj4ke3RPcHRzfTwvZGl2PgogICAgICAgIDxwIGNsYXNzPSJzZXJ2aWNlcy10aXRsZSI+16nXmdeo15XXqteZ150g16DXldeh16TXmdedINec16DXmden15XXmTwvcD4KICAgICAgICA8ZGl2IGNsYXNzPSJzZXJ2aWNlcy1ncmlkIj4ke3NPcHRzfTwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImNhcmQtc3VidG90YWwiIGlkPSJjLXN1YnRvdGFsLWNhcmQtJHtpZH0iIHN0eWxlPSJkaXNwbGF5Om5vbmUiPjxzcGFuIGNsYXNzPSJjYXJkLXN1YnRvdGFsLWxhYmVsIj7Xotec15XXqiDXqdeY15nXlyDXlteUPC9zcGFuPjxzcGFuIGNsYXNzPSJjYXJkLXN1YnRvdGFsLWFtb3VudCIgaWQ9ImMtc3ViLSR7aWR9Ij48L3NwYW4+PC9kaXY+CiAgICAgIDwvZGl2PmApOwogIH0gZWxzZSB7CiAgICBjb25zdCBpZD0rK3JJZDsKICAgIGxldCBzaD0nJzsKICAgIFJfQ0FUUy5mb3JFYWNoKGNhdD0+ewogICAgICBjb25zdCBiaWxsaW5nPWNhdC5iaWxsaW5nfHwnc3FtJzsKICAgICAgY29uc3QgdW5pdExhYmVsID0gYmlsbGluZz09PSdzcW0nID8gJy/Xnlx1MDVGNNeoJyA6IGJpbGxpbmc9PT0nZml4ZWQnID8gJycgOiAnL9eeXHUwNUYzICjXnNek15kg16bXnNei15XXqiknOwogICAgICBzaCs9YDxkaXYgY2xhc3M9InJzdmMtY2F0ZWdvcnkiPiR7Y2F0LmNhdH08L2Rpdj5gOwogICAgICBjYXQuc3Zjcy5mb3JFYWNoKHM9PnsKICAgICAgICBjb25zdCBzQmlsbGluZz1zLmJpbGxpbmd8fGJpbGxpbmc7CiAgICAgICAgY29uc3Qgc1VuaXRMYWJlbD1zQmlsbGluZz09PSdzcW0nPycv155cdTA1RjTXqCc6c0JpbGxpbmc9PT0nZml4ZWQnPycnOicv155cdTA1RjQgKNec16TXmSDXptec16LXldeqKSc7CiAgICAgICAgY29uc3QgcGw9cy5maXhlZD9g4oKqJHtzLmZwfSDXnNeQ15nXl9eV15NgOmDigqoke3MucHBtfSR7c1VuaXRMYWJlbH1gOwogICAgICAgIHNoKz1gPGRpdiBjbGFzcz0icnN2Yy1vcHQiPgogICAgICAgICAgPGlucHV0IHR5cGU9ImNoZWNrYm94IiBpZD0icnMke2lkfS0ke3MuaWR9IiBvbmNoYW5nZT0idG9nZ2xlU2lkZVNlbGVjdG9yKCR7aWR9LCcke3MuaWR9JywnJHtzQmlsbGluZ30nKTtjYWxjUmVwYWlyKCkiPgogICAgICAgICAgPGxhYmVsIGZvcj0icnMke2lkfS0ke3MuaWR9Ij4KICAgICAgICAgICAgPHNwYW4gY2xhc3M9InJzdmMtbGVmdCI+PHNwYW4gY2xhc3M9InJzdmMtY2hlY2siPuKckzwvc3Bhbj48c3BhbiBjbGFzcz0icnN2Yy1uYW1lIj4ke3MubmFtZX08L3NwYW4+PC9zcGFuPgogICAgICAgICAgICA8c3BhbiBjbGFzcz0icnN2Yy1wcmljZS1iYWRnZSI+JHtwbH08L3NwYW4+CiAgICAgICAgICA8L2xhYmVsPgogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9InNpZGUtc2VsZWN0b3IiIGlkPSJzcyR7aWR9LSR7cy5pZH0iIGRhdGEtYmlsbGluZz0iJHtzQmlsbGluZ30iIGRhdGEtcHBtPSIke3MucHBtfHwwfSIgZGF0YS1mcD0iJHtzLmZwfHwwfSIgZGF0YS1maXhlZD0iJHtzLmZpeGVkfHxmYWxzZX0iPgogICAgICAgICAgPGRpdiBjbGFzcz0ic2lkZS1zZWwtdGl0bGUiPteR15fXqCDXptec16LXldeqINec16LXmdeR15XXkyA8c3BhbiBpZD0ic3MtdG90YWwke2lkfS0ke3MuaWR9Ij48L3NwYW4+PC9kaXY+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJzaWRlcy1ncmlkIGZvdXIiIGlkPSJzZyR7aWR9LSR7cy5pZH0iPjwvZGl2PgogICAgICAgICAgPGRpdiBjbGFzcz0ic2lkZS10b3RhbC1ub3RlIiBpZD0ic24ke2lkfS0ke3MuaWR9Ij48L2Rpdj4KICAgICAgICA8L2Rpdj5gOwogICAgICB9KTsKICAgIH0pOwogICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlcGFpci1saXN0JykuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLGAKICAgICAgPGRpdiBjbGFzcz0icmVwYWlyLWNhcmQiIGlkPSJyLWNhcmQtJHtpZH0iPgogICAgICAgIDxkaXYgY2xhc3M9ImNhcnBldC1jYXJkLWhlYWRlciI+PHNwYW4gY2xhc3M9ImNhcnBldC1udW0iPtep15jXmdeXINeq15nXp9eV158g157XoVx1MDVGMyAke2lkfTwvc3Bhbj4ke2lkPjE/YDxidXR0b24gY2xhc3M9InJlbW92ZS1idG4iIG9uY2xpY2s9InJtQygncicsJHtpZH0pIj7inJU8L2J1dHRvbj5gOicnfTwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImRpbXMtcHJldmlldy1yb3ciPgogICAgICAgICAgPGRpdiBjbGFzcz0iZGltcy1pbnB1dHMiPgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJmaWVsZCI+PGxhYmVsPteQ15XXqNeaICjXoVx1MDVGNNeeKTwvbGFiZWw+PGlucHV0IHR5cGU9Im51bWJlciIgaWQ9InItbGVuLSR7aWR9IiBwbGFjZWhvbGRlcj0iMjAwIiBtaW49IjAiIGlucHV0bW9kZT0ibnVtZXJpYyIgcGF0dGVybj0iWzAtOV0qIiBvbmlucHV0PSJ1cFByZXYoJHtpZH0sJ3InKTtyZWZyZXNoU2lkZUxhYmVscygke2lkfSk7Y2FsY1JlcGFpcigpIj48L2Rpdj4KICAgICAgICAgICAgPGRpdiBjbGFzcz0iZmllbGQiPjxsYWJlbD7XqNeV15fXkSAo16FcdTA1RjTXnik8L2xhYmVsPjxpbnB1dCB0eXBlPSJudW1iZXIiIGlkPSJyLXdpZC0ke2lkfSIgcGxhY2Vob2xkZXI9IjE1MCIgbWluPSIwIiBpbnB1dG1vZGU9Im51bWVyaWMiIHBhdHRlcm49IlswLTldKiIgb25pbnB1dD0idXBQcmV2KCR7aWR9LCdyJyk7cmVmcmVzaFNpZGVMYWJlbHMoJHtpZH0pO2NhbGNSZXBhaXIoKSI+PC9kaXY+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICR7bWtQcmV2KGlkLCdyJyl9CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0icmVwYWlyLXNlcnZpY2VzIj4ke3NofTwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9InJlcGFpci1jYXJkLXN1YnRvdGFsIiBpZD0ici1zdWJ0b3RhbC1jYXJkLSR7aWR9IiBzdHlsZT0iZGlzcGxheTpub25lIj48c3BhbiBjbGFzcz0iY3MtbGFiZWwiPtei15zXldeqINep15jXmdeXINeW15Q8L3NwYW4+PHNwYW4gY2xhc3M9ImNzLWFtdCIgaWQ9InItc3ViLSR7aWR9Ij48L3NwYW4+PC9kaXY+CiAgICAgIDwvZGl2PmApOwogIH0KfQoKZnVuY3Rpb24gcm1DKHAsaWQpe2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3B9LWNhcmQtJHtpZH1gKS5yZW1vdmUoKTtwPT09J2MnP2NhbGNDbGVhbmluZygpOmNhbGNSZXBhaXIoKTt9CgpmdW5jdGlvbiBjYWxjQ2xlYW5pbmcoKXsKICBjb25zdCBpZHM9Wy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tpZF49ImMtY2FyZC0iXScpXS5tYXAoZT0+K2UuaWQucmVwbGFjZSgnYy1jYXJkLScsJycpKTsKICBsZXQgZ3JhbmQ9MDtjb25zdCByb3dzPVtdOwogIGlkcy5mb3JFYWNoKGlkPT57CiAgICBjb25zdCBsPXBhcnNlRmxvYXQoKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjLWxlbi0ke2lkfWApICYmIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjLWxlbi0ke2lkfWApLnZhbHVlKSl8fDA7CiAgICBjb25zdCB3PXBhcnNlRmxvYXQoKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjLXdpZC0ke2lkfWApICYmIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjLXdpZC0ke2lkfWApLnZhbHVlKSl8fDA7CiAgICAvLyByZWFsIGFyZWEgc2hvd24gdG8gdXNlcgogICAgY29uc3Qgc3FtUmVhbD0obCp3KS8xMDAwMDsKICAgIGNvbnN0IGFFbD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChgYy1hcmVhLSR7aWR9YCk7aWYoYUVsKWFFbC50ZXh0Q29udGVudD1zcW1SZWFsLnRvRml4ZWQoMikrJyDXnlx1MDVGNNeoJzsKCiAgICAvLyBiaWxsaW5nIGFyZWE6IGVhY2ggc2lkZSBtaW5pbXVtIDEwMGNtCiAgICBjb25zdCBsQmlsbD1NYXRoLm1heChsLDEwMCk7CiAgICBjb25zdCB3QmlsbD1NYXRoLm1heCh3LDEwMCk7CiAgICBjb25zdCBzcW09KGxCaWxsKndCaWxsKS8xMDAwMDsKICAgIC8vIHNob3cgYmlsbGluZyBub3RpY2UgaWYgcm91bmRlZCB1cAoKICAgIGNvbnN0IHRwPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9ImN0LSR7aWR9Il06Y2hlY2tlZGApOwogICAgbGV0IHN1Yj1zcW0qKHRwPyt0cC52YWx1ZTo5NSk7CiAgICBDX1NWQ1MuZm9yRWFjaChzPT57Y29uc3QgY2I9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGNzJHtpZH0tJHtzLmlkfWApO2lmKGNiJiZjYi5jaGVja2VkKXN1Yis9cy5maXhlZD9zLmZwOnNxbSpzLnBwbTt9KTsKICAgIGNvbnN0IHNlPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjLXN1Yi0ke2lkfWApOwogICAgaWYoc2UpIHNlLnRleHRDb250ZW50ID0gKHNxbVJlYWw+MCkgPyAn4oKqJytNYXRoLnJvdW5kKHN1YikudG9Mb2NhbGVTdHJpbmcoJ2hlLUlMJykgOiAnJzsKICAgIGNvbnN0IHN1YkNhcmQ9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGMtc3VidG90YWwtY2FyZC0ke2lkfWApOwogICAgaWYoc3ViQ2FyZCkgc3ViQ2FyZC5zdHlsZS5kaXNwbGF5ID0gc3FtUmVhbD4wID8gJ2ZsZXgnIDogJ25vbmUnOwogICAgaWYoc3FtUmVhbD4wKXJvd3MucHVzaCh7bDpg16nXmNeZ15cg157XoVx1MDVGMyAke2lkfSAoJHtzcW1SZWFsLnRvRml4ZWQoMil9INeeXHUwNUY016gpYCx2OnN1Yn0pOwogICAgZ3JhbmQrPXN1YjsKICB9KTsKICBsZXQgZGlzYz0wLGRpc2NMPScnOwogIERJU0Muc2xpY2UoKS5yZXZlcnNlKCkuZm9yRWFjaChkPT57aWYoaWRzLmxlbmd0aD49ZC5uJiYhZGlzYyl7ZGlzYz1NYXRoLnJvdW5kKGdyYW5kKmQucC8xMDApO2Rpc2NMPWQubDt9fSk7CiAgY29uc3QgYWZ0ZXI9Z3JhbmQtZGlzYzsKICBjb25zdCBpc0g9KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjLWhvbWUnKSAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYy1ob21lJykuY2hlY2tlZCk7CiAgY29uc3QgZGVsPWlzSD8oKyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYy1jaXR5JykgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2MtY2l0eScpLnZhbHVlKXx8MCk6MDsKICBjb25zdCBmaW5hbD1NYXRoLm1heChhZnRlcixhZnRlcj4wP01JTjowKStkZWw7CiAgY29uc3QgcmU9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2MtdG90YWwtcm93cycpOwogIHJlLmlubmVySFRNTD1yb3dzLm1hcChyPT5gPGRpdiBjbGFzcz0idG90YWwtcm93Ij48c3BhbiBjbGFzcz0idHItbGFiZWwiPiR7ci5sfTwvc3Bhbj48c3BhbiBjbGFzcz0idHItdmFsIj7igqoke01hdGgucm91bmQoci52KS50b0xvY2FsZVN0cmluZygnaGUtSUwnKX08L3NwYW4+PC9kaXY+YCkuam9pbignJykKICAgICsoZGlzYz9gPGRpdiBjbGFzcz0idG90YWwtcm93IGRpc2Mtcm93Ij48c3BhbiBjbGFzcz0idHItbGFiZWwiPvCfjokgJHtkaXNjTH08L3NwYW4+PHNwYW4gY2xhc3M9InRyLXZhbCI+LeKCqiR7ZGlzYy50b0xvY2FsZVN0cmluZygnaGUtSUwnKX08L3NwYW4+PC9kaXY+YDonJykKICAgICsoZGVsP2A8ZGl2IGNsYXNzPSJ0b3RhbC1yb3cgZGVsLXJvdyI+PHNwYW4gY2xhc3M9InRyLWxhYmVsIj7wn5qaINee16nXnNeV15c8L3NwYW4+PHNwYW4gY2xhc3M9InRyLXZhbCI+4oKqJHtkZWx9PC9zcGFuPjwvZGl2PmA6JycpOwogIC8vIE9ubHkgc2hvdyB0b3RhbCBpZiBhdCBsZWFzdCBvbmUgY2FycGV0IGhhcyByZWFsIGRpbWVuc2lvbnMgZW50ZXJlZAogIGNvbnN0IGFueUNsZWFuRGltcyA9IGlkcy5zb21lKGlkID0+IHsKICAgIGNvbnN0IGw9cGFyc2VGbG9hdCgoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGMtbGVuLSR7aWR9YCkgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGMtbGVuLSR7aWR9YCkudmFsdWUpKXx8MDsKICAgIGNvbnN0IHc9cGFyc2VGbG9hdCgoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGMtd2lkLSR7aWR9YCkgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGMtd2lkLSR7aWR9YCkudmFsdWUpKXx8MDsKICAgIHJldHVybiBsPjAgJiYgdz4wOwogIH0pOwogIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjLXRvdGFsLWFtb3VudCcpLnRleHRDb250ZW50PSfigqonK01hdGgucm91bmQoZmluYWwpLnRvTG9jYWxlU3RyaW5nKCdoZS1JTCcpOwogIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjLXRvdGFsLXBhbmVsJykuc3R5bGUuZGlzcGxheT1hbnlDbGVhbkRpbXM/J2Jsb2NrJzonbm9uZSc7CiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2MtbWluJykuY2xhc3NMaXN0LnRvZ2dsZSgndmlzaWJsZScsIGFueUNsZWFuRGltcyAmJiBhZnRlcj4wICYmIGFmdGVyPE1JTik7Cn0KCi8vIEdldCBzZWxlY3RlZCBzaWRlcyB0b3RhbCBsZW5ndGggKG0pIGZvciBhIHNlcnZpY2UKZnVuY3Rpb24gZ2V0U2lkZXNNZXRlcnMoY2FyZElkLCBzdmNJZCwgYmlsbGluZywgbCwgdyl7CiAgaWYoYmlsbGluZz09PSdzcW0nfHxiaWxsaW5nPT09J2ZpeGVkJykgcmV0dXJuIDA7IC8vIG5vdCB1c2VkIGZvciB0aGVzZQogIGNvbnN0IGxNPWwvMTAwLCB3TT13LzEwMDsKICAvLyBzaWRlczogTDE9bG9uZzEsIEwyPWxvbmcyLCBTMT1zaG9ydDEsIFMyPXNob3J0MgogIC8vIGxvbmcgc2lkZXMgaGF2ZSBsZW5ndGggPSBtYXgobCx3KSwgc2hvcnQgPSBtaW4obCx3KQogIGNvbnN0IGxvbmdNID0gTWF0aC5tYXgobE0sd00pLCBzaG9ydE0gPSBNYXRoLm1pbihsTSx3TSk7CiAgY29uc3Qgc2lkZU1hcCA9IChiaWxsaW5nPT09J3NpZGVzMmxvbmcnKQogICAgPyBbe2tleTonQScsbTpsb25nTX0se2tleTonQicsbTpsb25nTX1dCiAgICA6IFt7a2V5OidBJyxtOmxvbmdNfSx7a2V5OidCJyxtOmxvbmdNfSx7a2V5OidDJyxtOnNob3J0TX0se2tleTonRCcsbTpzaG9ydE19XTsKICBsZXQgdG90YWw9MDsKICBzaWRlTWFwLmZvckVhY2gocz0+ewogICAgY29uc3QgYnRuPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBzYi0ke2NhcmRJZH0tJHtzdmNJZH0tJHtzLmtleX1gKTsKICAgIGlmKGJ0biYmYnRuLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHRvdGFsKz1zLm07CiAgfSk7CiAgcmV0dXJuIHRvdGFsOwp9CgpmdW5jdGlvbiB0b2dnbGVTaWRlU2VsZWN0b3IoY2FyZElkLCBzdmNJZCwgYmlsbGluZyl7CiAgY29uc3QgY2I9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHJzJHtjYXJkSWR9LSR7c3ZjSWR9YCk7CiAgY29uc3Qgc3M9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHNzJHtjYXJkSWR9LSR7c3ZjSWR9YCk7CiAgaWYoIXNzKXJldHVybjsKICBpZighY2IuY2hlY2tlZCl7IHNzLmNsYXNzTGlzdC5yZW1vdmUoJ3Zpc2libGUnKTsgcmV0dXJuOyB9CiAgaWYoYmlsbGluZz09PSdzcW0nfHxiaWxsaW5nPT09J2ZpeGVkJyl7IHNzLmNsYXNzTGlzdC5yZW1vdmUoJ3Zpc2libGUnKTsgcmV0dXJuOyB9CiAgLy8gc2lkZXMybG9uZyB0cmVhdGVkIGxpa2Ugc2lkZXM0IGZvciBkaXNwbGF5CiAgc3MuY2xhc3NMaXN0LmFkZCgndmlzaWJsZScpOwogIC8vIGJ1aWxkIGJ1dHRvbnMgZm9yIHRoaXMgc3BlY2lmaWMgc2VydmljZSBpbW1lZGlhdGVseQogIGJ1aWxkU2lkZUJ1dHRvbnMoY2FyZElkLCBzdmNJZCwgYmlsbGluZyk7CiAgY2FsY1JlcGFpcigpOwp9CgpmdW5jdGlvbiBidWlsZFNpZGVCdXR0b25zKGNhcmRJZCwgc3ZjSWQsIGJpbGxpbmcpewogIGNvbnN0IGw9cGFyc2VGbG9hdCgoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHItbGVuLSR7Y2FyZElkfWApICYmIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGByLWxlbi0ke2NhcmRJZH1gKS52YWx1ZSkpfHwwOwogIGNvbnN0IHc9cGFyc2VGbG9hdCgoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHItd2lkLSR7Y2FyZElkfWApICYmIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGByLXdpZC0ke2NhcmRJZH1gKS52YWx1ZSkpfHwwOwogIGNvbnN0IGxvbmdDbT1NYXRoLm1heChsLHcpLCBzaG9ydENtPU1hdGgubWluKGwsdyk7CiAgY29uc3QgbG9uZ009KGxvbmdDbS8xMDApLnRvRml4ZWQoMiksIHNob3J0TT0oc2hvcnRDbS8xMDApLnRvRml4ZWQoMik7CiAgY29uc3Qgc2c9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHNnJHtjYXJkSWR9LSR7c3ZjSWR9YCk7CiAgaWYoIXNnKSByZXR1cm47CiAgLy8gc2lkZXMybG9uZyA9IG9ubHkgMiBsb25nIHNpZGVzCiAgY29uc3Qgc2lkZXMgPSBiaWxsaW5nPT09J3NpZGVzMmxvbmcnCiAgICA/IFt7a2V5OidBJyxsYWJlbDon16bXnNeiINeQ16jXldeb15QgMScsbTpsb25nTX0se2tleTonQicsbGFiZWw6J9em15zXoiDXkNeo15XXm9eUIDInLG06bG9uZ019XQogICAgOiBbe2tleTonQScsbGFiZWw6J9em15zXoiDXkNeo15XXm9eUIDEnLG06bG9uZ019LHtrZXk6J0InLGxhYmVsOifXptec16Ig15DXqNeV15vXlCAyJyxtOmxvbmdNfSwKICAgICAgIHtrZXk6J0MnLGxhYmVsOifXptec16Ig16fXpteo15QgMScsbTpzaG9ydE19LHtrZXk6J0QnLGxhYmVsOifXptec16Ig16fXpteo15QgMicsbTpzaG9ydE19XTsKICAvLyB1cGRhdGUgZ3JpZCBjbGFzcwogIHNnLmNsYXNzTmFtZSA9ICdzaWRlcy1ncmlkICcgKyAoYmlsbGluZz09PSdzaWRlczJsb25nJyA/ICd0d28nIDogJ2ZvdXInKTsKICAvLyBwcmVzZXJ2ZSBleGlzdGluZyBhY3RpdmUgc3RhdGUKICBjb25zdCBhY3RpdmU9e307CiAgc2lkZXMuZm9yRWFjaChzZD0+eyBjb25zdCBiPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBzYi0ke2NhcmRJZH0tJHtzdmNJZH0tJHtzZC5rZXl9YCk7IGFjdGl2ZVtzZC5rZXldPWI/Yi5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpOm51bGw7IH0pOwogIGNvbnN0IG5vbmVDaG9zZW49T2JqZWN0LnZhbHVlcyhhY3RpdmUpLmV2ZXJ5KHY9PnY9PT1udWxsfHx2PT09ZmFsc2UpOwogIHNnLmlubmVySFRNTD1zaWRlcy5tYXAoc2Q9PnsKICAgIGNvbnN0IGlzQWN0aXZlID0gbm9uZUNob3NlbiA/IChzZC5rZXk9PT0nQSd8fHNkLmtleT09PSdCJykgOiAoYWN0aXZlW3NkLmtleV18fGZhbHNlKTsKICAgIHJldHVybiBgPGRpdiBjbGFzcz0ic2lkZS1idG4ke2lzQWN0aXZlPycgYWN0aXZlJzonJ30iIGlkPSJzYi0ke2NhcmRJZH0tJHtzdmNJZH0tJHtzZC5rZXl9IgogICAgICBvbmNsaWNrPSJ0b2dnbGVTaWRlKCcke2NhcmRJZH0nLCcke3N2Y0lkfScsJyR7c2Qua2V5fScpIj4ke3NkLmxhYmVsfTxzcGFuIGNsYXNzPSJzYi1sZW4iPiR7c2QubX0g155cdTA1RjM8L3NwYW4+PC9kaXY+YDsKICB9KS5qb2luKCcnKTsKICBjb25zdCBzcz1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChgc3Mke2NhcmRJZH0tJHtzdmNJZH1gKTsKICBjb25zdCBwcG09cGFyc2VGbG9hdCgoc3MgJiYgc3MuZGF0YXNldCAmJiBzcy5kYXRhc2V0LnBwbSl8fDApOwogIHVwZGF0ZVNpZGVOb3RlKGNhcmRJZCwgc3ZjSWQsIGJpbGxpbmcsIHBwbSk7Cn0KCmZ1bmN0aW9uIHJlZnJlc2hTaWRlTGFiZWxzKGNhcmRJZCl7CiAgLy8gcmVidWlsZCBhbGwgdmlzaWJsZSBzaWRlLXNlbGVjdG9ycyBmb3IgdGhpcyBjYXJkIHVzaW5nIGJ1aWxkU2lkZUJ1dHRvbnMKICBSX0NBVFMuZm9yRWFjaChjYXQ9PnsKICAgIGNvbnN0IGNhdEJpbGxpbmc9Y2F0LmJpbGxpbmd8fCdzcW0nOwogICAgY2F0LnN2Y3MuZm9yRWFjaChzPT57CiAgICAgIGNvbnN0IHNCaWxsaW5nPXMuYmlsbGluZ3x8Y2F0QmlsbGluZzsKICAgICAgaWYoc0JpbGxpbmc9PT0nc3FtJ3x8c0JpbGxpbmc9PT0nZml4ZWQnKSByZXR1cm47CiAgICAgIC8vIHNpZGVzMmxvbmcsIHNpZGVzNCBhbGwgaGFuZGxlZCBieSBidWlsZFNpZGVCdXR0b25zCiAgICAgIGNvbnN0IHNzPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBzcyR7Y2FyZElkfS0ke3MuaWR9YCk7CiAgICAgIGlmKCFzc3x8IXNzLmNsYXNzTGlzdC5jb250YWlucygndmlzaWJsZScpKSByZXR1cm47CiAgICAgIGJ1aWxkU2lkZUJ1dHRvbnMoY2FyZElkLCBzLmlkLCBzQmlsbGluZyk7CiAgICB9KTsKICB9KTsKICBjYWxjUmVwYWlyKCk7Cn0KCmZ1bmN0aW9uIHRvZ2dsZVNpZGUoY2FyZElkLCBzdmNJZCwga2V5KXsKICBjb25zdCBidG49ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHNiLSR7Y2FyZElkfS0ke3N2Y0lkfS0ke2tleX1gKTsKICBpZihidG4pIGJ0bi5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTsKICBjb25zdCBzcz1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChgc3Mke2NhcmRJZH0tJHtzdmNJZH1gKTsKICBjb25zdCBiaWxsaW5nPShzcyAmJiBzcy5kYXRhc2V0ICYmIHNzLmRhdGFzZXQuYmlsbGluZyl8fCdzcW0nOwogIGNvbnN0IHBwbT1wYXJzZUZsb2F0KChzcyAmJiBzcy5kYXRhc2V0ICYmIHNzLmRhdGFzZXQucHBtKXx8MCk7CiAgdXBkYXRlU2lkZU5vdGUoY2FyZElkLCBzdmNJZCwgYmlsbGluZywgcHBtKTsKICBjYWxjUmVwYWlyKCk7Cn0KCmZ1bmN0aW9uIHVwZGF0ZVNpZGVOb3RlKGNhcmRJZCwgc3ZjSWQsIGJpbGxpbmcsIHBwbSl7CiAgY29uc3QgbD1wYXJzZUZsb2F0KChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgci1sZW4tJHtjYXJkSWR9YCkgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHItbGVuLSR7Y2FyZElkfWApLnZhbHVlKSl8fDA7CiAgY29uc3Qgdz1wYXJzZUZsb2F0KChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgci13aWQtJHtjYXJkSWR9YCkgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHItd2lkLSR7Y2FyZElkfWApLnZhbHVlKSl8fDA7CiAgY29uc3QgbWV0ZXJzPWdldFNpZGVzTWV0ZXJzKGNhcmRJZCwgc3ZjSWQsIGJpbGxpbmcsIGwsIHcpOwogIGNvbnN0IGNvc3Q9TWF0aC5yb3VuZChtZXRlcnMqcHBtKTsKICBjb25zdCBub3RlRWw9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHNuJHtjYXJkSWR9LSR7c3ZjSWR9YCk7CiAgY29uc3QgdG90YWxFbD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChgc3MtdG90YWwke2NhcmRJZH0tJHtzdmNJZH1gKTsKICBpZihtZXRlcnM+MCl7CiAgICBpZihub3RlRWwpIG5vdGVFbC50ZXh0Q29udGVudD1g16HXlFx1MDVGNNebOiAke21ldGVycy50b0ZpeGVkKDIpfSDXnlx1MDVGMyDDlyDigqoke3BwbX0gPSDigqoke2Nvc3QudG9Mb2NhbGVTdHJpbmcoJ2hlLUlMJyl9YDsKICAgIGlmKHRvdGFsRWwpIHRvdGFsRWwudGV4dENvbnRlbnQ9YOKCqiR7Y29zdC50b0xvY2FsZVN0cmluZygnaGUtSUwnKX1gOwogIH0gZWxzZSB7CiAgICBpZihub3RlRWwpIG5vdGVFbC50ZXh0Q29udGVudD0nJzsKICAgIGlmKHRvdGFsRWwpIHRvdGFsRWwudGV4dENvbnRlbnQ9Jyc7CiAgfQp9CgpmdW5jdGlvbiBjYWxjUmVwYWlyKCl7CiAgY29uc3QgaWRzPVsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbaWRePSJyLWNhcmQtIl0nKV0ubWFwKGU9PitlLmlkLnJlcGxhY2UoJ3ItY2FyZC0nLCcnKSk7CiAgbGV0IGdyYW5kPTA7Y29uc3Qgcm93cz1bXTsKICBpZHMuZm9yRWFjaChpZD0+ewogICAgY29uc3QgbD1wYXJzZUZsb2F0KChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgci1sZW4tJHtpZH1gKSAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgci1sZW4tJHtpZH1gKS52YWx1ZSkpfHwwOwogICAgY29uc3Qgdz1wYXJzZUZsb2F0KChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgci13aWQtJHtpZH1gKSAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgci13aWQtJHtpZH1gKS52YWx1ZSkpfHwwOwogICAgY29uc3Qgc3FtUmVhbD0obCp3KS8xMDAwMDsKICAgIGNvbnN0IGxCaWxsPU1hdGgubWF4KGwsTUlOX1NJREUpLCB3QmlsbD1NYXRoLm1heCh3LE1JTl9TSURFKTsKICAgIGNvbnN0IHNxbT0obEJpbGwqd0JpbGwpLzEwMDAwOwogICAgbGV0IHN1Yj0wOwogICAgUl9DQVRTLmZvckVhY2goY2F0PT57CiAgICAgIGNvbnN0IGNhdEJpbGxpbmc9Y2F0LmJpbGxpbmd8fCdzcW0nOwogICAgICBjYXQuc3Zjcy5mb3JFYWNoKHM9PnsKICAgICAgICBjb25zdCBiaWxsaW5nPXMuYmlsbGluZ3x8Y2F0QmlsbGluZzsKICAgICAgICBjb25zdCBjYj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcnMke2lkfS0ke3MuaWR9YCk7CiAgICAgICAgaWYoIWNifHwhY2IuY2hlY2tlZCkgcmV0dXJuOwogICAgICAgIGlmKHMuZml4ZWQpeyBzdWIrPXMuZnA7IHJldHVybjsgfQogICAgICAgIGlmKGJpbGxpbmc9PT0nc3FtJyl7IHN1Yis9c3FtKnMucHBtOyByZXR1cm47IH0KICAgICAgICAvLyBzaWRlcyBiaWxsaW5nIOKAlCBzdW0gc2VsZWN0ZWQgc2lkZXMKICAgICAgICBjb25zdCBtZXRlcnM9Z2V0U2lkZXNNZXRlcnMoaWQsIHMuaWQsIGJpbGxpbmcsIGwsIHcpOwogICAgICAgIHN1Yis9bWV0ZXJzKnMucHBtOwogICAgICB9KTsKICAgIH0pOwogICAgY29uc3Qgc2U9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHItc3ViLSR7aWR9YCk7CiAgICBpZihzZSkgc2UudGV4dENvbnRlbnQgPSAoc3FtUmVhbD4wKSA/ICfigqonK01hdGgucm91bmQoc3ViKS50b0xvY2FsZVN0cmluZygnaGUtSUwnKSA6ICcnOwogICAgY29uc3Qgc3ViQ2FyZFI9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHItc3VidG90YWwtY2FyZC0ke2lkfWApOwogICAgaWYoc3ViQ2FyZFIpIHN1YkNhcmRSLnN0eWxlLmRpc3BsYXkgPSBzcW1SZWFsPjAgPyAnZmxleCcgOiAnbm9uZSc7CiAgICBpZihzdWI+MClyb3dzLnB1c2goe2w6YNep15jXmdeXINee16FcdTA1RjMgJHtpZH0gKCR7c3FtUmVhbC50b0ZpeGVkKDIpfSDXnlx1MDVGNNeoKWAsdjpzdWJ9KTsKICAgIGdyYW5kKz1zdWI7CiAgfSk7CiAgY29uc3QgaXNIPShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnci1ob21lJykgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ItaG9tZScpLmNoZWNrZWQpOwogIGNvbnN0IGRlbD1pc0g/KCsoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ItY2l0eScpICYmIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyLWNpdHknKS52YWx1ZSl8fDApOjA7CiAgY29uc3QgcmU9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ItdG90YWwtcm93cycpOwogIHJlLmlubmVySFRNTD1yb3dzLm1hcChyPT5gPGRpdiBjbGFzcz0idG90YWwtcm93Ij48c3BhbiBjbGFzcz0idHItbGFiZWwiPiR7ci5sfTwvc3Bhbj48c3BhbiBjbGFzcz0idHItdmFsIj7igqoke01hdGgucm91bmQoci52KS50b0xvY2FsZVN0cmluZygnaGUtSUwnKX08L3NwYW4+PC9kaXY+YCkuam9pbignJykKICAgICsoZGVsP2A8ZGl2IGNsYXNzPSJ0b3RhbC1yb3cgZGVsLXJvdyI+PHNwYW4gY2xhc3M9InRyLWxhYmVsIj7wn5qaINee16nXnNeV15c8L3NwYW4+PHNwYW4gY2xhc3M9InRyLXZhbCI+4oKqJHtkZWx9PC9zcGFuPjwvZGl2PmA6JycpOwogIGNvbnN0IGFueVJlcGFpckRpbXMgPSBpZHMuc29tZShpZCA9PiB7CiAgICBjb25zdCBsPXBhcnNlRmxvYXQoKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGByLWxlbi0ke2lkfWApICYmIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGByLWxlbi0ke2lkfWApLnZhbHVlKSl8fDA7CiAgICBjb25zdCB3PXBhcnNlRmxvYXQoKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGByLXdpZC0ke2lkfWApICYmIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGByLXdpZC0ke2lkfWApLnZhbHVlKSl8fDA7CiAgICByZXR1cm4gbD4wICYmIHc+MDsKICB9KTsKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnci10b3RhbC1hbW91bnQnKS50ZXh0Q29udGVudD0n4oKqJytNYXRoLnJvdW5kKGdyYW5kK2RlbCkudG9Mb2NhbGVTdHJpbmcoJ2hlLUlMJyk7CiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ItdG90YWwtcGFuZWwnKS5zdHlsZS5kaXNwbGF5PWFueVJlcGFpckRpbXM/J2Jsb2NrJzonbm9uZSc7Cn0KCmZ1bmN0aW9uIHVwZGF0ZURlbGl2ZXJ5KHApewogIGNvbnN0IGlzSD0oZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cH0taG9tZWApICYmIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3B9LWhvbWVgKS5jaGVja2VkKTsKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtwfS1icmFuY2gtcm93YCkuY2xhc3NMaXN0LnRvZ2dsZSgndmlzaWJsZScsIWlzSCk7CiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cH0tY2l0eS1yb3dgKS5jbGFzc0xpc3QudG9nZ2xlKCd2aXNpYmxlJyxpc0gpOwogIHA9PT0nYyc/Y2FsY0NsZWFuaW5nKCk6Y2FsY1JlcGFpcigpOwp9CgpmdW5jdGlvbiBzaG93QnJhbmNoKHApewogIGNvbnN0IHY9KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3B9LWJyYW5jaGApICYmIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3B9LWJyYW5jaGApLnZhbHVlKTsKICBjb25zdCBkZXQ9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cH0tYnJhbmNoLWRldGFpbGApOwogIGlmKCFkZXQpcmV0dXJuOwogIGlmKHYmJkJSQU5DSEVTW3ZdKXtjb25zdCBiPUJSQU5DSEVTW3ZdO2RldC5pbm5lckhUTUw9YDxzdHJvbmc+8J+TjSAke2IuYWRkcn08L3N0cm9uZz7wn5OeICR7Yi5waG9uZX0gJm5ic3A7fCZuYnNwOyDwn5WQICR7Yi5ob3Vyc31gO2RldC5jbGFzc0xpc3QuYWRkKCd2aXNpYmxlJyk7fQogIGVsc2UgZGV0LmNsYXNzTGlzdC5yZW1vdmUoJ3Zpc2libGUnKTsKfQoKZnVuY3Rpb24gc2VuZFdBKHApewogIGNvbnN0IGlzQz1wPT09J2MnOwogIGNvbnN0IHRvdGFsPShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpc0M/J2MtdG90YWwtYW1vdW50Jzonci10b3RhbC1hbW91bnQnKSAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpc0M/J2MtdG90YWwtYW1vdW50Jzonci10b3RhbC1hbW91bnQnKS50ZXh0Q29udGVudCl8fCfigJQnOwogIGNvbnN0IGlkcz1bLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2lkXj0iJHtwfS1jYXJkLSJdYCldLm1hcChlPT4rZS5pZC5yZXBsYWNlKGAke3B9LWNhcmQtYCwnJykpOwogIGNvbnN0IGxpbmVzPWlkcy5tYXAoaWQ9PnsKICAgIGNvbnN0IGw9KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3B9LWxlbi0ke2lkfWApICYmIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3B9LWxlbi0ke2lkfWApLnZhbHVlKXx8Jz8nOwogICAgY29uc3Qgdz0oZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cH0td2lkLSR7aWR9YCkgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cH0td2lkLSR7aWR9YCkudmFsdWUpfHwnPyc7CiAgICByZXR1cm4gYOKAoiDXqdeY15nXlyAke2lkfTogJHtsfcOXJHt3fSDXoVx1MDVGNNeeYDsKICB9KTsKICBjb25zdCBtc2c9YNep15zXldedISDXkNeg15kg157XoteV16DXmdeZ158v16og15HXqdeZ16jXldeqICR7aXNDPyfXoNeZ16fXldeZJzon16rXmden15XXnyd9INep15jXmdeX15nXnS5cblxuJHtsaW5lcy5qb2luKCdcbicpfVxuXG7XodeUXHUwNUY015sg15DXldee15PXnzogJHt0b3RhbH1cblxu15DXoNeQINem16jXlSDXkNeZ16rXmSDXp9ep16guINeq15XXk9eUIWA7CiAgd2luZG93Lm9wZW4oJ2h0dHBzOi8vd2EubWUvOTcyMTgwMDcwMDA4MD90ZXh0PScrZW5jb2RlVVJJQ29tcG9uZW50KG1zZyksJ19ibGFuaycpOwp9CgpmdW5jdGlvbiBkb1ByaW50KCl7CiAgYnVpbGRQcmludEludm9pY2UoKTsKICB2YXIgaW52ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByaW50LWludm9pY2UnKTsKICBpZighaW52KSByZXR1cm47CiAgaW52LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snOwogIHNldFRpbWVvdXQoZnVuY3Rpb24oKXsKICAgIHdpbmRvdy5wcmludCgpOwogICAgc2V0VGltZW91dChmdW5jdGlvbigpeyBpbnYuc3R5bGUuZGlzcGxheSA9ICdub25lJzsgfSwgMTUwMCk7CiAgfSwgNDAwKTsKfQoKZnVuY3Rpb24gYnVpbGRQcmludEludm9pY2UoKXsKICB2YXIgdG9kYXkgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygnaGUtSUwnKTsKICB2YXIgZGF0ZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BpLWRhdGUnKTsKICBpZihkYXRlRWwpIGRhdGVFbC50ZXh0Q29udGVudCA9IHRvZGF5OwoKICB2YXIgaXNDbGVhbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbGVhbmluZycpLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJyk7CiAgdmFyIHRpdGxlRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGktdGl0bGUnKTsKICBpZih0aXRsZUVsKSB0aXRsZUVsLnRleHRDb250ZW50ID0gaXNDbGVhbiA/IAogICAgJ9eU16bXoteqINee15fXmdeoIC0g16DXmden15XXmSDXqdeY15nXl9eZ150nIDogCiAgICAn15TXptei16og157Xl9eZ16ggLSDXqteZ16fXldefINep15jXmdeX15nXnSc7CgogIHZhciB0Ym9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwaS1pdGVtcycpOwogIGlmKCF0Ym9keSkgcmV0dXJuOwogIHRib2R5LmlubmVySFRNTCA9ICcnOwogIHZhciBncmFuZFRvdGFsID0gMDsKICB2YXIgcm93TnVtID0gMTsKCiAgZnVuY3Rpb24gdGQoY29udGVudCwgYWxpZ24pIHsKICAgIHZhciBzID0gYWxpZ24gPyAndGV4dC1hbGlnbjonICsgYWxpZ24gKyAnOycgOiAnJzsKICAgIHJldHVybiAnPHRkIHN0eWxlPSJwYWRkaW5nOjZweCA4cHg7JyArIHMgKyAnIj4nICsgY29udGVudCArICc8L3RkPic7CiAgfQogIGZ1bmN0aW9uIGFkZFJvdyhuLCBkZXNjLCBxdHksIHVuaXQsIGFtdCwgY29sb3IpIHsKICAgIHZhciBiZyA9IGNvbG9yID8gJ2JhY2tncm91bmQ6JyArIGNvbG9yICsgJzsnIDogJyc7CiAgICB2YXIgc2hla2VsID0gJ+KCqic7CiAgICB0Ym9keS5pbm5lckhUTUwgKz0gJzx0ciBzdHlsZT0iYm9yZGVyLWJvdHRvbToxcHggc29saWQgI2VlZTsnICsgYmcgKyAnIj4nICsKICAgICAgdGQobikgKyB0ZChkZXNjKSArIHRkKHF0eSwgJ2NlbnRlcicpICsgdGQodW5pdCwgJ2NlbnRlcicpICsKICAgICAgdGQoc2hla2VsICsgTnVtYmVyKGFtdCkudG9Mb2NhbGVTdHJpbmcoJ2hlLUlMJyksICdsZWZ0JykgKyAnPC90cj4nOwogIH0KCiAgdmFyIGNQcmVmaXggPSAnYyc7CiAgdmFyIHJQcmVmaXggPSAncic7CgogIGlmKGlzQ2xlYW4pIHsKICAgIHZhciBjQ2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbaWRePSJjLWNhcmQtIl0nKTsKICAgIGZvcih2YXIgY2kgPSAwOyBjaSA8IGNDYXJkcy5sZW5ndGg7IGNpKyspIHsKICAgICAgdmFyIGNpZCA9IGNDYXJkc1tjaV0uaWQucmVwbGFjZSgnYy1jYXJkLScsICcnKTsKICAgICAgdmFyIGxFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjLWxlbi0nICsgY2lkKTsKICAgICAgdmFyIHdFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjLXdpZC0nICsgY2lkKTsKICAgICAgdmFyIGwgPSBsRWwgPyAocGFyc2VGbG9hdChsRWwudmFsdWUpIHx8IDApIDogMDsKICAgICAgdmFyIHcgPSB3RWwgPyAocGFyc2VGbG9hdCh3RWwudmFsdWUpIHx8IDApIDogMDsKICAgICAgaWYoIWwgfHwgIXcpIGNvbnRpbnVlOwogICAgICB2YXIgc3FtID0gKE1hdGgubWF4KGwsIE1JTl9TSURFKSAqIE1hdGgubWF4KHcsIE1JTl9TSURFKSkgLyAxMDAwMDsKICAgICAgdmFyIHNxbVJlYWwgPSAoKGwgKiB3KSAvIDEwMDAwKS50b0ZpeGVkKDIpOwogICAgICB2YXIgdHBFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9ImN0LScgKyBjaWQgKyAnIl06Y2hlY2tlZCcpOwogICAgICB2YXIgdFByaWNlID0gdHBFbCA/ICt0cEVsLnZhbHVlIDogOTU7CiAgICAgIHZhciB0TmFtZUVsID0gdHBFbCA/IHRwRWwuY2xvc2VzdCgnLnR5cGUtb3B0JykgOiBudWxsOwogICAgICB2YXIgdE5hbWUgPSB0TmFtZUVsID8gKHROYW1lRWwucXVlcnlTZWxlY3RvcignLnR5cGUtbmFtZScpLnRleHRDb250ZW50KSA6ICfXoteR15XXk9eqINee15vXldeg15QnOwogICAgICB2YXIgYmFzZSA9IE1hdGgucm91bmQoc3FtICogdFByaWNlKTsKICAgICAgZ3JhbmRUb3RhbCArPSBiYXNlOwogICAgICBhZGRSb3cocm93TnVtKyssCiAgICAgICAgJ9eg15nXp9eV15kgLSAnICsgdE5hbWUgKyAnICgnICsgc3FtUmVhbCArICcg157XtNeoKScsCiAgICAgICAgc3FtLnRvRml4ZWQoMikgKyAnINee17TXqCcsCiAgICAgICAgJ+KCqicgKyB0UHJpY2UgKyAnL9ee17TXqCcsCiAgICAgICAgYmFzZSk7CiAgICAgIGZvcih2YXIgc2kgPSAwOyBzaSA8IENfU1ZDUy5sZW5ndGg7IHNpKyspIHsKICAgICAgICB2YXIgcyA9IENfU1ZDU1tzaV07CiAgICAgICAgdmFyIGNiID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NzJyArIGNpZCArICctJyArIHMuaWQpOwogICAgICAgIGlmKCFjYiB8fCAhY2IuY2hlY2tlZCkgY29udGludWU7CiAgICAgICAgdmFyIGEgPSBzLmZpeGVkID8gcy5mcCA6IE1hdGgucm91bmQoc3FtICogcy5wcG0pOwogICAgICAgIGdyYW5kVG90YWwgKz0gYTsKICAgICAgICBhZGRSb3cocm93TnVtKyssIHMubmFtZSwKICAgICAgICAgIHMuZml4ZWQgPyAnMScgOiBzcW0udG9GaXhlZCgyKSArICcg157XtNeoJywKICAgICAgICAgIHMuZml4ZWQgPyAn4oKqJyArIHMuZnAgOiAn4oKqJyArIHMucHBtICsgJy/Xnte016gnLAogICAgICAgICAgYSwgJyNmYWZhZmEnKTsKICAgICAgfQogICAgfQogICAgdmFyIG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbaWRePSJjLWNhcmQtIl0nKS5sZW5ndGg7CiAgICB2YXIgZGlzYyA9IG51bGw7CiAgICBmb3IodmFyIGRpID0gRElTQy5sZW5ndGggLSAxOyBkaSA+PSAwOyBkaS0tKSB7CiAgICAgIGlmKG4gPj0gRElTQ1tkaV0ubikgeyBkaXNjID0gRElTQ1tkaV07IGJyZWFrOyB9CiAgICB9CiAgICBpZihkaXNjKSB7CiAgICAgIHZhciBkYSA9IE1hdGgucm91bmQoZ3JhbmRUb3RhbCAqIGRpc2MucCAvIDEwMCk7CiAgICAgIGdyYW5kVG90YWwgLT0gZGE7CiAgICAgIHRib2R5LmlubmVySFRNTCArPSAnPHRyIHN0eWxlPSJib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZWVlO2NvbG9yOiMyZDhhNTAiPicgKwogICAgICAgIHRkKHJvd051bSsrKSArIHRkKGRpc2MubCkgKyB0ZCgnLScgKyBkaXNjLnAgKyAnJScsICdjZW50ZXInKSArIHRkKCcnKSArCiAgICAgICAgdGQoJy3igqonICsgZGEudG9Mb2NhbGVTdHJpbmcoJ2hlLUlMJyksICdsZWZ0JykgKyAnPC90cj4nOwogICAgfQogICAgdmFyIGhvbWVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjLWhvbWUnKTsKICAgIGlmKGhvbWVFbCAmJiBob21lRWwuY2hlY2tlZCkgewogICAgICB2YXIgY2l0eUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2MtY2l0eScpOwogICAgICB2YXIgZGEyID0gY2l0eUVsID8gKCtjaXR5RWwudmFsdWUgfHwgMCkgOiAwOwogICAgICBpZihkYTIgPiAwKSB7CiAgICAgICAgdmFyIGNuID0gY2l0eUVsLm9wdGlvbnNbY2l0eUVsLnNlbGVjdGVkSW5kZXhdLnRleHQ7CiAgICAgICAgZ3JhbmRUb3RhbCArPSBkYTI7CiAgICAgICAgYWRkUm93KHJvd051bSsrLCAn157Xqdec15XXlyAtICcgKyBjbiwgJzEnLCAn4oKqJyArIGRhMiwgZGEyKTsKICAgICAgfQogICAgfQogICAgZ3JhbmRUb3RhbCA9IE1hdGgubWF4KGdyYW5kVG90YWwsIE1JTik7CiAgfSBlbHNlIHsKICAgIHZhciByQ2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbaWRePSJyLWNhcmQtIl0nKTsKICAgIGZvcih2YXIgcmkgPSAwOyByaSA8IHJDYXJkcy5sZW5ndGg7IHJpKyspIHsKICAgICAgdmFyIHJpZCA9IHJDYXJkc1tyaV0uaWQucmVwbGFjZSgnci1jYXJkLScsICcnKTsKICAgICAgdmFyIHJsRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnci1sZW4tJyArIHJpZCk7CiAgICAgIHZhciByd0VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Itd2lkLScgKyByaWQpOwogICAgICB2YXIgcmwgPSBybEVsID8gKHBhcnNlRmxvYXQocmxFbC52YWx1ZSkgfHwgMCkgOiAwOwogICAgICB2YXIgcncgPSByd0VsID8gKHBhcnNlRmxvYXQocndFbC52YWx1ZSkgfHwgMCkgOiAwOwogICAgICBpZighcmwgfHwgIXJ3KSBjb250aW51ZTsKICAgICAgdmFyIHJzcW0gPSAoTWF0aC5tYXgocmwsIE1JTl9TSURFKSAqIE1hdGgubWF4KHJ3LCBNSU5fU0lERSkpIC8gMTAwMDA7CiAgICAgIHZhciByc3FtUmVhbCA9ICgocmwgKiBydykgLyAxMDAwMCkudG9GaXhlZCgyKTsKICAgICAgZm9yKHZhciByY2kgPSAwOyByY2kgPCBSX0NBVFMubGVuZ3RoOyByY2krKykgewogICAgICAgIHZhciBjYXQgPSBSX0NBVFNbcmNpXTsKICAgICAgICB2YXIgY2F0QmlsbGluZyA9IGNhdC5iaWxsaW5nIHx8ICdzcW0nOwogICAgICAgIGZvcih2YXIgcnNpID0gMDsgcnNpIDwgY2F0LnN2Y3MubGVuZ3RoOyByc2krKykgewogICAgICAgICAgdmFyIHJzID0gY2F0LnN2Y3NbcnNpXTsKICAgICAgICAgIHZhciBiaWxsaW5nID0gcnMuYmlsbGluZyB8fCBjYXRCaWxsaW5nOwogICAgICAgICAgdmFyIHJjYiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdycycgKyByaWQgKyAnLScgKyBycy5pZCk7CiAgICAgICAgICBpZighcmNiIHx8ICFyY2IuY2hlY2tlZCkgY29udGludWU7CiAgICAgICAgICB2YXIgcmEgPSAwOyB2YXIgcnEgPSAnJzsgdmFyIHJ1ID0gJyc7CiAgICAgICAgICBpZihycy5maXhlZCkgeyByYSA9IHJzLmZwOyBycSA9ICcxJzsgcnUgPSAn4oKqJyArIHJzLmZwOyB9CiAgICAgICAgICBlbHNlIGlmKGJpbGxpbmcgPT09ICdzcW0nKSB7IHJhID0gTWF0aC5yb3VuZChyc3FtICogcnMucHBtKTsgcnEgPSByc3FtLnRvRml4ZWQoMikgKyAnINee17TXqCc7IHJ1ID0gJ+KCqicgKyBycy5wcG0gKyAnL9ee17TXqCc7IH0KICAgICAgICAgIGVsc2UgeyB2YXIgcm0gPSBnZXRTaWRlc01ldGVycyhyaWQsIHJzLmlkLCBiaWxsaW5nLCBybCwgcncpOyByYSA9IE1hdGgucm91bmQocm0gKiBycy5wcG0pOyBycSA9IHJtLnRvRml4ZWQoMikgKyAnINeeJzsgcnUgPSAn4oKqJyArIHJzLnBwbSArICcv154nOyB9CiAgICAgICAgICBncmFuZFRvdGFsICs9IHJhOwogICAgICAgICAgYWRkUm93KHJvd051bSsrLCBycy5uYW1lICsgJyAtINep15jXmdeXICcgKyByaWQgKyAnICgnICsgcnNxbVJlYWwgKyAnINee17TXqCknLCBycSwgcnUsIHJhKTsKICAgICAgICB9CiAgICAgIH0KICAgIH0KICAgIHZhciByaG9tZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ItaG9tZScpOwogICAgaWYocmhvbWVFbCAmJiByaG9tZUVsLmNoZWNrZWQpIHsKICAgICAgdmFyIHJjaXR5RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnci1jaXR5Jyk7CiAgICAgIHZhciByZGEgPSByY2l0eUVsID8gKCtyY2l0eUVsLnZhbHVlIHx8IDApIDogMDsKICAgICAgaWYocmRhID4gMCkgewogICAgICAgIHZhciByY24gPSByY2l0eUVsLm9wdGlvbnNbcmNpdHlFbC5zZWxlY3RlZEluZGV4XS50ZXh0OwogICAgICAgIGdyYW5kVG90YWwgKz0gcmRhOwogICAgICAgIGFkZFJvdyhyb3dOdW0rKywgJ9ee16nXnNeV15cgLSAnICsgcmNuLCAnMScsICfigqonICsgcmRhLCByZGEpOwogICAgICB9CiAgICB9CiAgfQoKICB2YXIgYnYgPSBNYXRoLnJvdW5kKGdyYW5kVG90YWwgLyAxLjE4KTsKICB2YXIgdnQgPSBncmFuZFRvdGFsIC0gYnY7CiAgdmFyIGJ2RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGktYmVmb3JlLXZhdCcpOwogIHZhciB2dEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BpLXZhdCcpOwogIHZhciB0b3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwaS10b3RhbCcpOwogIHZhciBmbkVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BpLWZvb3Rub3RlJyk7CiAgaWYoYnZFbCkgYnZFbC50ZXh0Q29udGVudCA9ICfigqonICsgYnYudG9Mb2NhbGVTdHJpbmcoJ2hlLUlMJyk7CiAgaWYodnRFbCkgdnRFbC50ZXh0Q29udGVudCA9ICfigqonICsgdnQudG9Mb2NhbGVTdHJpbmcoJ2hlLUlMJyk7CiAgaWYodG90RWwpIHRvdEVsLnRleHRDb250ZW50ID0gJ+KCqicgKyBncmFuZFRvdGFsLnRvTG9jYWxlU3RyaW5nKCdoZS1JTCcpICsgJyDXqSLXlyc7CiAgaWYoZm5FbCkgZm5FbC50ZXh0Q29udGVudCA9ICcqICcgKyAoKF9BRE1JTiAmJiBfQURNSU4uZ2VuZXJhbCAmJiBfQURNSU4uZ2VuZXJhbC5mb290bm90ZSkgfHwgJ9eU157Xl9eZ16gg15TXmdeg15Ug15DXldee15PXnycpOwp9CgoKLy8gSW5pdAphZGRDYXJwZXQoJ2MnKTsgYWRkQ2FycGV0KCdyJyk7CmFwcGx5VmlzaWJpbGl0eSgpOwoKPC9zY3JpcHQ+CjxzY3JpcHQ+CmZ1bmN0aW9uIHNjcm9sbFRvQ2FsYygpewogIHZhciBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYWxjLWludHJvJyk7CiAgaWYoIWVsKXsgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FsY3VsYXRvcicpOyB9CiAgaWYoIWVsKSByZXR1cm47CiAgdmFyIHRvcCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldCAtIDYwOwogIHRyeSB7CiAgICB3aW5kb3cuc2Nyb2xsVG8oe3RvcDogdG9wLCBiZWhhdmlvcjogJ3Ntb290aCd9KTsKICB9IGNhdGNoKGUpIHsKICAgIHdpbmRvdy5zY3JvbGxUbygwLCB0b3ApOwogIH0KfQoKd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpewogIHNldFRpbWVvdXQoc2Nyb2xsVG9DYWxjLCAyMDAwKTsKfSk7CnZhciBpbz1uZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24oZW50cmllcyl7CiAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGUpe2lmKGUuaXNJbnRlcnNlY3RpbmcpZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgndmlzJyk7fSk7Cn0se3RocmVzaG9sZDowLjJ9KTsKWydjaS1sYWJlbCcsJ2NpLXRpdGxlJywnY2ktZGVzYycsJ2NpLWxpbmUnLCdjYWxjLXJldmVhbCddLmZvckVhY2goZnVuY3Rpb24oaWQpewogIHZhciBlbD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7aWYoZWwpaW8ub2JzZXJ2ZShlbCk7Cn0pOwo8L3NjcmlwdD4KCjwhLS0gUFJJTlQgSU5WT0lDRSAtLT4KPGRpdiBpZD0icHJpbnQtaW52b2ljZSIgc3R5bGU9ImRpc3BsYXk6bm9uZTtkaXJlY3Rpb246cnRsO2ZvbnQtZmFtaWx5OidIZWVibycsc2Fucy1zZXJpZjtwYWRkaW5nOjI0cHggMjhweDtjb2xvcjojMDAwO2JhY2tncm91bmQ6I2ZmZjtwb3NpdGlvbjpmaXhlZDt0b3A6MDtsZWZ0OjA7d2lkdGg6MTAwJTt6LWluZGV4Ojk5OTkiPgogIDx0YWJsZSB3aWR0aD0iMTAwJSIgY2VsbHBhZGRpbmc9IjAiIGNlbGxzcGFjaW5nPSIwIiBzdHlsZT0ibWFyZ2luLWJvdHRvbToxNnB4O2JvcmRlci1ib3R0b206MnB4IHNvbGlkICNlODgxMmE7cGFkZGluZy1ib3R0b206MTRweCI+CiAgICA8dHI+CiAgICAgIDx0ZCBzdHlsZT0idmVydGljYWwtYWxpZ246dG9wIj4KICAgICAgICA8ZGl2IHN0eWxlPSJmb250LXNpemU6MTRweDtmb250LXdlaWdodDo4MDAiPtep15DXpNeV16gg16nXmNeZ15fXmdedINeQLtebLiDXkdeiIteePC9kaXY+CiAgICAgICAgPGRpdiBzdHlsZT0iZm9udC1zaXplOjExcHg7Y29sb3I6IzU1NTtsaW5lLWhlaWdodDoxLjc7bWFyZ2luLXRvcDo0cHgiPteh16DXmdejOiDXkNeV16DXnNeZ15nXnyDXptee16g8YnI+d3d3LnR6ZW1lci5jby5pbDxicj7XmNec16TXldefOiAwMy05NjEyMTkxPGJyPtei15XXodenINee15XXqNep15Q6IDUxMzIyMDQ3NTwvZGl2PgogICAgICA8L3RkPgogICAgICA8dGQgc3R5bGU9InRleHQtYWxpZ246bGVmdDt2ZXJ0aWNhbC1hbGlnbjp0b3A7d2lkdGg6MTYwcHgiPgogICAgICAgIDxpbWcgc3JjPSJkYXRhOmltYWdlL3dlYnA7YmFzZTY0LFVrbEdSbEFSQUFCWFJVSlFWbEE0V0FvQUFBQVFBQUFBS3dFQWh3QUFRVXhRU0w4T0FBQUJ0OGVnYlNSSDUvQ0hmZTBMZ0lqSTRlMGdhNTdtTHJMSm5EZnlGM2pEdHUyUVhtdmIxcmd6WnBMaGtaRWV0bTNidG0zYnRtM2J0bTNiSGozc01UbzUvNC9SM1ZWMW5sV3BhLzZNNkw5RVNaTHJ0dGtTRXdoK3phNUk0QTZmQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBekxIYlJQOUhhZmR3NXc2VDFVNFdneXNjeE5ScmwwdjlZQWpobnp0M3JKZUo5VCs1cXJxV1hnaEhsQWs5TW9RUVFnanR1N2VhcEM1R2F6NGZ3cXRKK001NHZJeEY2K2dRd3QzRHkwdGsreEJDejhTZmQyeFJCeisrOXROZEdVeVZBSERXRUg3WUpMbXBsYnM4ZmJaZ2FabmNIMExvbWVnc0FqZHRPK2xZUG5xOEo0QVU2WC9Rd2J0dVpGcFh6VEU5cm5ZdUtaUkplckF6Zi96YUxTWVlhMGVyUDVUaC92UjR4bU82K1g3WU1LbXZOek5zWFZUaSsveUpYMjdlZEt5c1gxWjZPTlA2ZS9FVlZnYmhWUk9tTTNaeHBxOVhaaW9qbU00ZFZHemk5NXZXR3orOWgzNlROcHZOWnJQWmJEYWJ6V2F6Mld3Mm04MW1zOWxzTnB2TlpyUFpiSTdxSHdHOTdDTjV4aWVQOWZoT2g3Qm5jdjFVc1d6ZTdhdDNEMTB6ZmF3VGh4QkM0WWxmcjE0LzlTTFErS3JkYnJmYjdYYTczVzYzMisxMnU5MXV0OXZ0ZHJ2ZGJyZmI3WGI3OTVIRlIvZmx1NDROL3NnY3hzdlMzRTZ6NURzN05ybDJDQ0hFVFZ5ejhiQ2sraXVFRUd1azZJYTEzTjBaaEtsV3N0bHlJYi9kSUVFby9iOHFZTzJCQ1JQcmlRU3Bmbi9aK2tQVDZkdDRFMzhWKzJmeE80b2h2aFBuOFAwQ21KZU1HeDFLTVhOZkwxcUY5L2wzeTlWcmpxaU9DbzBLTTBhVm1NY1d5M3V0eUV3T0ttcHVqNVRhTTRTUWFPS255OVlkVmswdGNVY0VZOHpqUEZkUjBFdkh5NGlreUoxUTNOM1ZnOUxwc1JCQ3owU0tSZURDdFlaVVRndmZFTVY0U29TL2p3dVRmaE94cFk3NExjTGVXN09rdXFZSUlZVGlFOFdlcjR2WEhGSWxMWEJUSk9PYkVYTXhyQmYrcnlqcXMxSCtSbStjN0Jnb2hPSVR4ZStaeTFjYVVCSE5mVk04NUtqQzFXOGM2NWVyRlVNOUxkYmdxV24wYUFpaGpJa3ZMbHhwU1BtYTU1b1UvdFl1M0gvRzBsNHdUZ0hTOWVJZFBweWk5NTRvaEJCS212anFuTlVIbHFwNXIwaGo3cnlDWVIwZmhkdDllcEUvT1dXU1BXQ1plTzBXUWloeDR2UFRWaXhGblJ0bnpxeCtNUGtYT3RCSmdNL0tLMFRmUzJOeTN5US9YZTdFUitjczF5aWt1UFdiV1M5Sloydk1KSVd5K2lRTjhTZXJacEplbmNybERaSEZ4V1FoaEZENnhPVjVTbEJOejN0NlVsT2JGc25xaEdUSVoyZVVhenVuYy9uQlVvV1VRVitHaXJSeXFmVmJZbFBuRlBtTkNaay9YS0diZEw2VU5sK1AwdE9WME0wUnFvU3Axd3BFOVZHSE90MWs1MkVlNThjNHpyekRvZWxqcm1hb3BLcjJtanAvTHZVeXZqd1BwTVJjS2U2bjYxQ2JkQ1dWVlRhbjU5NXZ2NVNNeDhaOTV3dDFxRFB5a3ZvMGhCQkNDQ0dFRUNwbjhhRi9yN2ozZGFqM2NwSTZ1ZExYajBQanRHODFWYjNvcHNnNUFhcTA1dWtwZ0F1My9QV29EYk9yMzBwZnUwVmVrNGFLcXNKZjZIOXJTVmV5WGlHMnI5cTdKdlZTbGk0djRVcFpMMGYzb0Y5V1ZCV01iN0lzVjZ0OVVWMU5HNjFsam5xckhyVkJwcTFoRjFUMVdvOEV4MmJ6SC9ONkRlclVuS1JXLyt6ZnE2cldra3dzY05KYmRhZTM4bklhZWxtbzZGS2NiR0t4RTk2cWtxcDR0elZ6WTFyMzY2cjUrbU5DcEowNDl2MGEwOXI1SVkxM2FjVjhMUTZwSjVZKzhjTzYwcmxGTXRyd2h5clpPaERLbUZqODlIZHFTVzhXU21paXE2dmo2bllvYTJLcHN6NHNXNVhjSGljcEZ0Qm1QMWJFMDdmOVVlYkVDcWQ5VkRmYXRHQThJNit2aHFjNVVmS2czN0tuZjFrck9ydHdQRnY4WGdGTDIwRDVFNE5YUFBlTCt0QXJ4Y09adlB3dS9oS294c1RBRmM3L1pLelJUNzlHWWswZGtjMVdKVSsrRHIwVEZWZ0VWcjk3N05DSkV6NFp5YlZKVERKVDNsVjJkVjJ0d1NMbEt0bmlNU2ZYUkpLZEVaZk1EbitWZDYydmRPVTNNdWxWUWhPNGNvZDN6MGkyMXlLam1lcnU4cmFxeW1tOXF1djdYYnQ1NTR1a0d4UGRLZTR5dXBUckRUV2cxSWN3NC9id0RvaXRhRGVNVG1mNmU4dlFaRFdybStiSUFuNDBrdkNzQlBuc252NWFUUjBvWmJXMmVqYndjWkdNTDZZSWFOWkhFbCtucTFPMWRzM3p0MG9zNXVSSkl0b3I3NHJlcGVwVXA0M0lMLzFqT1RmNE42TWtrMDhuMUtnYTFXMkZPdVhZWTVWVFVxVjBRTEpyTFRXaEpIOWsxV0lHTDRwa2ZTdFpUSE0rbGVxYjZsS2o5eWxxY0tmS1BLeUhKU203MWFiK0xHeHc0VmpjdFJNbU5mdVZmOGRhK0hwd2ZlcXZrWVVQbjM2S3hEMHZaVlJML2hDOTlkZXFDanU4SnhMM3pYUkJiZlJ3aXRPeVBrQW54UEtPVEpQU09MdThucWl0cW4rdEU4dTdhWXFNSmo3a20xUy82L0w2Vk1TTitXdlpKemV6blBKYnluNjk5clg5TDVHOHI4Ym1zOWlWYWJ2UXEycGVXN3dSRHp4SlRqcTVYZXp0eVU4M3BxeHpyZkZDaWxqWGlNaG04MmRMT0RTN3RyNjExS05wWWoycmFERERkdWwwc0NXOG1qV3RoWkk5dDY4WGkyV0tJNzhMb1J4ZFdjdWE0K3AwcVk2WnFFaUhmbTQ3aE5EelN2L2wrdFZVRnlkTmRhUDhMZmZXRUVLSnVxNXVOZkxFZjlLbWVtYmVOdlJRQ0tIYzE5UzFxc2tQL3owNzFNUkhPSU4yZUMyRTBuVmpyV3FUM2xSTHFQSW4yTytURUVJRlh0UFVvbnE3eGhMMmd3MjdlUy82NzlRb2lWSUVWcXZUajZVUDlkVHVjUWloS3E4WjZsUW5wYy8wclc3ZTVhdWoyK3BRR1R0b2VVWCs0OVY1TFZLakd2RjMra3pYN2dhZXVUbzZyZ2FWQWZsQytrd2Y2Z0crdkNLanUxY1lVcWM2Tlhtb1ArN2ZBenplbUNxTWJscW9adnVGVlJPSCtzMGg0MlVRSDFyKzZOSzU2clJuNzY3UWtvYjY3WUhETXUwTktMbTArL09VR2RYd3Vka3JDVWQ3RDh1TFkvTXlSNzhjTVlvNjFvbXBVdjFxdjJFRjhuaTN0TkhuQjB4SW5TclRWSnBVUDkyblVTaVBSYnRHSlZUUnV3eWlydFZNa2VvWCt4Wk85ZjR5Umk5dWcvcFZ3c3J1czkwYnhRT1pPdjNvaVhXcGQ1MFppZmpsem5GUDZybUpSL2N0UjkxcjR5akFqM2FMTGVmL2w5V2FwY2htVWVwZlUwWGdmYkJ6di9oSTlrazN1bmh1YWx2Wm5COFZoZnR3dDM1Sk12a3V6Y3pvczJlaXhwVmdzWHR2dS83WmJBOCt0RUxoVEZLTWZqNW1xbXpTNmQ0NWRmb2ExeFpGd043TXJTaG1DU0c4c25ObTVaclpieVFvZU1mUEF6MG1oSERMaXJXdG1RcU10c3QzZmxGM1IzVFNISU1MaERKZmhzT0NqOFdlWGFUWjdlc1BYVUF2YnplcWYyMHF4OWQ3T1ZDdkY2bFNSL3pWQzdWTWtWUnVLK2l2KzRQWXVnam1waG1WOWFCNjFpV1pTRzlzVnNqNG5yMVVmNHdvQWpWcFJNRzdUckVRWCt2RnVsSTlhOGVzMFJZRmpiL2Z5M1ZJTWFwVGloYThLeGUwTUc4RzJGUTFyV2w3ZThSTmkvcGVPd040L0dKWVF3b1Z3amN1WGpqRHUzdko3cTNSYjhrejlrblhvclo1QnNkY0IwK1pqWFY3RjI5bjJ5eWF5eDc1dnE2WUp3dHFxeDJ6RVNmS1lGdTZHaXEwRENmUUE5bVlROGNrNEJ5VlorenFFSjdmTkdmaEhIMWhaaWMweFM0dmRlTXVWRGlZTDdJOXRjK1lMUk5wWUFqdkhkVE11dmNYT09YSDdsNmtzcjlvalZhcjFXcTFXcTFXcTlWcXRWcXRWcXZWYXJWYXJWYXIxV3ExV3EzV1pmOWhadVh3ZGp6bWx4UG43aGtmclplTk1meXZyaTFoaTh4K1lia2JPNnRvOFdCV3lScjlmdlIvajBKK2wvdjM1UXRra1l5NzR4c2hoRjJxby94U3FORm9OQnFOUnFQUmFEUWFqVWFqMFdnMEdvMUdvOUZvTkJxTlJxUHhiL0dVOHpZQloyN1hOQ3l2eE5xdEorK1BEODZFbWZXa0g3YVBTT2E1SHRLdkR4bFpxRVR1K3NTekY4NlZIdmg1R0FBQUFBQUFBQUFBQUFBQVlPenA1VDdydlRtdjZUeThqWXpiZkVBRTZleGRtTy91T1RSbXUxM3l2M3NoNjRNWnYrYXZ6T2M4STlmeHNPM1hSMCtkZ3ZYS0VGN1pxaERQalJtbFM0ZmlvYXhhcU0vUVhiMjUzdHI3V0YrMlJEenJOUGRuN041NTIyMUdvOUdwaVRwN3lhRlQ5Q25YSWhtNUxvalp1aEdlM21xeWNqeGNsM0d3MUtFNG93dGg5SldMaitnN05NZFZQVjNuMngyS3kzcFR2cnVrS3V2eEh1cmRNU2lqVmw2dkx4bU9PdWlkVHBKYmR2YVIwWjFjdXloS2V6b3U2SHd5ZjNZMnBoMHlTdkR4KzVnZldPZWVFRHJiN2Y0WnB4RWxXcGhzdncrNysvT1BlajBjcFcvNDlkbTExenFkLzcvdnpmWEFVaTMwMjZyVFFheWVzZjUydHc5OXo3Y3UyeHZybUNwc0ErZG5OYzE5aUhMYXRIa3YvTDA2aDF6amJmeHd0enBISDMzVnhNajkzZ29oekY0UkR3dWQ4MmNJNzBKZk5kRlo0WjU1cGtKYis5NmYvdHV0OTNHdmRUZXIwbXF5MjF3QUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBRDBjVjBkQUZaUU9DQnFBZ0FBTUI0QW5RRXFMQUdJQUQ2UlJweEpKYVFqSVNzL0tBQ3dFZ2xqYnQvd0wwQzhBZnFCQWdQd0EvQUR5QVBvQTV3RDhBUHdBdGYvS0F2d0Q4QUxrZDBUNXpxWC9MdUVNNjQrWDVKMy9OMmdQMEF4UUg4QS9nSDdBZS8vVGY0MUhZRDZ0YTFyVlJZODJEb3dGKzJBVXFIdWZ4ajA1M1A0eDVMcU5ZQktZM3QxeE1aQUx5SmpnRTR6VEk1dFFZTWZnZWhEQ0t6b1hrVEhBSnhtbVJ6YXZONWt4L1FmempOTWptMWVjQW5HYVpITm9YblhBSWlYczB5T2JWNXdDY1pwa2MycnYwOTRnRnF3OFpITnE4NEJPTTB5T2JWNXZWdk9pOGZyRnZFRGg2YVNrRnlqcXUvckMrOGtlZkFuRnlTODRCT0xpS3BWc3ZjRFN0aitBQUQrL1BSZWd6R21udnQ0M3cwOGExNzE5SXVBNWF0ZDdBMk5qMW1mcHhzNzlZM3N3eG5XM1psU3V3alFzaHhETWFhZSszamZEVHhyWHZYMGk0bjdLOG5xZzU4SFlQUVdyNGV6T1h6Q2hYZGoreVZKY1QxTUdjSXJqV1dJVG5QUXNCbU5OUGZieHZocDQxcjNyNlJjVDlsZVQxUWMrRUtlTVNNYXFreUpmcVlISlFOL1RZY0JiU2JBOG5HY1lwV0JEcTJ1S2tRVGpQNmVKWVZhRUcwSFRDTFM5akFWM213N21vOXpzTkxUVWVvb3RZeW95MTN6U0Y3aDBteWdXbE1CMTVaQjBQbzJnSXRIc2dqdGNDME1pclRKUFpmYjRHdVVBWm15Y0RpcHlSN0UwMkdySG9ILy9pZW1pZE1GUG9kS0RERHAzYXAvSzJhbTlkNUpYbXRzanZDQ3JmWmwvZUo3cys0VkVxamMrdU93Z2Q2QTExZzJmOHBmLy9ReFVRaGhab3I5QlZjY3VLV2FDN0d0aVZITlNoWTVPbFpZZnU0b05zL0xMV2VkWnYxUHpzTEVmYndlUno0M1o3Y0pZWkEyM0lxdDdtZkhISFRxQUZJYTlhVUYrWmZXaFI4ZTlNWEcwcUV5NkozTkdvQUEiIHN0eWxlPSJoZWlnaHQ6NTBweDt3aWR0aDphdXRvIj4KICAgICAgICA8ZGl2IHN0eWxlPSJmb250LXNpemU6MTBweDtjb2xvcjojNTU1O21hcmdpbi10b3A6NnB4O3RleHQtYWxpZ246bGVmdDtsaW5lLWhlaWdodDoxLjUiPtep15jXmdeX15nXnSDXmdek15nXnTxicj5TSEFQT09SIGNhcnBldHM8YnI+U2luY2UgMTk2OTwvZGl2PgogICAgICA8L3RkPgogICAgPC90cj4KICA8L3RhYmxlPgogIDx0YWJsZSB3aWR0aD0iMTAwJSIgY2VsbHBhZGRpbmc9IjAiIGNlbGxzcGFjaW5nPSIwIiBzdHlsZT0ibWFyZ2luLWJvdHRvbToxNnB4Ij4KICAgIDx0cj4KICAgICAgPHRkPjxkaXYgaWQ9InBpLXRpdGxlIiBzdHlsZT0iZm9udC1zaXplOjE2cHg7Zm9udC13ZWlnaHQ6ODAwO3RleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmUiPteU16bXoteqINee15fXmdeoPC9kaXY+PC90ZD4KICAgICAgPHRkIHN0eWxlPSJ0ZXh0LWFsaWduOmxlZnQ7Zm9udC1zaXplOjEycHg7Y29sb3I6IzMzMyI+16rXkNeo15nXmjogPHNwYW4gaWQ9InBpLWRhdGUiPjwvc3Bhbj48L3RkPgogICAgPC90cj4KICA8L3RhYmxlPgogIDx0YWJsZSB3aWR0aD0iMTAwJSIgY2VsbHBhZGRpbmc9IjAiIGNlbGxzcGFjaW5nPSIwIiBzdHlsZT0iYm9yZGVyLWNvbGxhcHNlOmNvbGxhcHNlO21hcmdpbi1ib3R0b206MjBweDtmb250LXNpemU6MTJweCI+CiAgICA8dGhlYWQ+CiAgICAgIDx0ciBzdHlsZT0iYmFja2dyb3VuZDojZjVmMGUwIj4KICAgICAgICA8dGggc3R5bGU9InBhZGRpbmc6N3B4IDhweDt0ZXh0LWFsaWduOnJpZ2h0O2JvcmRlci1ib3R0b206MS41cHggc29saWQgI2U4ODEyYSI+IzwvdGg+CiAgICAgICAgPHRoIHN0eWxlPSJwYWRkaW5nOjdweCA4cHg7dGV4dC1hbGlnbjpyaWdodDtib3JkZXItYm90dG9tOjEuNXB4IHNvbGlkICNlODgxMmEiPteq15nXkNeV16gg16nXmdeo15XXqjwvdGg+CiAgICAgICAgPHRoIHN0eWxlPSJwYWRkaW5nOjdweCA4cHg7dGV4dC1hbGlnbjpjZW50ZXI7Ym9yZGVyLWJvdHRvbToxLjVweCBzb2xpZCAjZTg4MTJhIj7Xm9ee15XXqjwvdGg+CiAgICAgICAgPHRoIHN0eWxlPSJwYWRkaW5nOjdweCA4cHg7dGV4dC1hbGlnbjpjZW50ZXI7Ym9yZGVyLWJvdHRvbToxLjVweCBzb2xpZCAjZTg4MTJhIj7XnteX15nXqCDXmdeX15nXk9eUPC90aD4KICAgICAgICA8dGggc3R5bGU9InBhZGRpbmc6N3B4IDhweDt0ZXh0LWFsaWduOmxlZnQ7Ym9yZGVyLWJvdHRvbToxLjVweCBzb2xpZCAjZTg4MTJhIj7XodeUItebPC90aD4KICAgICAgPC90cj4KICAgIDwvdGhlYWQ+CiAgICA8dGJvZHkgaWQ9InBpLWl0ZW1zIj48L3Rib2R5PgogIDwvdGFibGU+CiAgPHRhYmxlIGNlbGxwYWRkaW5nPSIwIiBjZWxsc3BhY2luZz0iMCIgc3R5bGU9ImZvbnQtc2l6ZToxMnB4O2JvcmRlci1jb2xsYXBzZTpjb2xsYXBzZTttaW4td2lkdGg6MjYwcHgiPgogICAgPHRyPjx0ZCBzdHlsZT0icGFkZGluZzo1cHggMTJweDtjb2xvcjojNTU1O3RleHQtYWxpZ246cmlnaHQiPtee15fXmdeoINec16TXoNeZINee16Ii1546PC90ZD48dGQgc3R5bGU9InBhZGRpbmc6NXB4IDEycHg7dGV4dC1hbGlnbjpsZWZ0O2ZvbnQtd2VpZ2h0OjYwMCIgaWQ9InBpLWJlZm9yZS12YXQiPjwvdGQ+PC90cj4KICAgIDx0cj48dGQgc3R5bGU9InBhZGRpbmc6NXB4IDEycHg7Y29sb3I6IzU1NTt0ZXh0LWFsaWduOnJpZ2h0Ij7XnteiIteeICgxOCUpOjwvdGQ+PHRkIHN0eWxlPSJwYWRkaW5nOjVweCAxMnB4O3RleHQtYWxpZ246bGVmdDtmb250LXdlaWdodDo2MDAiIGlkPSJwaS12YXQiPjwvdGQ+PC90cj4KICAgIDx0ciBzdHlsZT0iYmFja2dyb3VuZDojZjVmMGUwO2JvcmRlci10b3A6MS41cHggc29saWQgI2U4ODEyYSI+CiAgICAgIDx0ZCBzdHlsZT0icGFkZGluZzo4cHggMTJweDtmb250LXdlaWdodDo4MDA7Zm9udC1zaXplOjE0cHg7dGV4dC1hbGlnbjpyaWdodCI+16HXlCLXmyDXm9eV15zXnCDXnteiIteeOjwvdGQ+CiAgICAgIDx0ZCBzdHlsZT0icGFkZGluZzo4cHggMTJweDt0ZXh0LWFsaWduOmxlZnQ7Zm9udC13ZWlnaHQ6OTAwO2ZvbnQtc2l6ZToxNnB4O2NvbG9yOiNlODgxMmEiIGlkPSJwaS10b3RhbCI+PC90ZD4KICAgIDwvdHI+CiAgPC90YWJsZT4KICA8ZGl2IGlkPSJwaS1mb290bm90ZSIgc3R5bGU9Im1hcmdpbi10b3A6MjRweDtmb250LXNpemU6MTBweDtjb2xvcjojODg4O2JvcmRlci10b3A6MXB4IHNvbGlkICNlMGUwZTA7cGFkZGluZy10b3A6MTBweCI+PC9kaXY+CjwvZGl2Pgo8c3BhbiBpZD0icHJpbnQtZGF0ZSIgc3R5bGU9ImRpc3BsYXk6bm9uZSI+PC9zcGFuPgo8c3R5bGU+CkBtZWRpYSBwcmludCB7CiAgKiB7IC13ZWJraXQtcHJpbnQtY29sb3ItYWRqdXN0OiBleGFjdCAhaW1wb3J0YW50OyBwcmludC1jb2xvci1hZGp1c3Q6IGV4YWN0ICFpbXBvcnRhbnQ7IH0KICBib2R5ID4gKjpub3QoI3ByaW50LWludm9pY2UpIHsgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OyB9CiAgI3ByaW50LWludm9pY2UgeyBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50OyBwb3NpdGlvbjogc3RhdGljICFpbXBvcnRhbnQ7IH0KfQo8L3N0eWxlPgo8L2JvZHk+CjwvaHRtbD4=";

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
  const [numbersText, setNumbersText] = useState("");
  const [namesText, setNamesText] = useState("");
  const [branch, setBranch] = useState("rishon");
  const [filterStatus, setFilterStatus] = useState("all");
  const isAdmin = account?.role === "admin";

  const persist = (next) => { saveTransfers(next, transfers); setTransfers(next); };
  const numberLines = useMemo(() => numbersText.split(/\r?\n/), [numbersText]);
  const nameLines = useMemo(() => namesText.split(/\r?\n/), [namesText]);
  const rowCount = Math.max(numberLines.filter((l) => l.trim()).length, nameLines.filter((l) => l.trim()).length);

  const handleAdd = () => {
    const rows = Math.max(numberLines.length, nameLines.length);
    const items = [];
    for (let i = 0; i < rows; i++) {
      const catalogNumber = (numberLines[i] || "").trim();
      const name = (nameLines[i] || "").trim();
      if (!catalogNumber && !name) continue;
      items.push({ id: uid(), catalogNumber, name, toLocation: branch, status: "ממתין", pending: !isAdmin, submittedBy: account?.name || "", createdAt: new Date().toISOString() });
    }
    if (items.length === 0) return;
    persist([...items, ...transfers]);
    setNumbersText(""); setNamesText("");
  };
  const updateItem = (id, patch) => persist(transfers.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  const removeItem = (id) => persist(transfers.filter((t) => t.id !== id));

  const visible = transfers.filter((t) => !t.pending || isAdmin || t.submittedBy === account?.name);
  const filtered = visible.filter((t) => (filterStatus === "all" || t.status === filterStatus) && t.toLocation === branch).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div>
      {!isAdmin && <p className="muted small">פריטים חדשים יישלחו לאישור מחסן לפני שיופיעו ברשימה הכללית.</p>}
      <div className="filter-label">סניף</div>
      <PillGroup options={BRANCHES} value={branch} onChange={setBranch} />

      <div className="filter-label">פריטים</div>
      <div className="excel-cols">
        <textarea rows={6} value={numbersText} onChange={(e) => setNumbersText(e.target.value)} placeholder={"מספר קטלוג\n10234\n10235"} />
        <textarea rows={6} value={namesText} onChange={(e) => setNamesText(e.target.value)} placeholder={"תיאור\nשטיח פרסי כחול\nשטיח וינטג׳"} />
      </div>

      <button className="btn-primary" style={{ marginTop: 10 }} onClick={handleAdd} disabled={rowCount === 0}><Plus size={16}/> הוסף {rowCount > 0 ? `${rowCount} פריטים` : ""} לרשימה</button>

      <div className="filter-label" style={{ marginTop: 24 }}>סטטוס</div>
      <PillGroup options={[{ id: "all", label: "הכל" }, ...TRANSFER_STATUS]} value={filterStatus} onChange={setFilterStatus} size="sm" />

      <div className="toolbar">
        <span />
        <button className="btn-ghost small" onClick={() => window.print()}><Printer size={14}/> הדפס</button>
      </div>

      {filtered.length === 0 && <div className="empty-state"><ArrowLeftRight size={28} className="muted" /><p>אין פריטים להעברה כרגע.</p></div>}

      <div className="transfer-list">
        {filtered.map((t) => (
          <div key={t.id} className="transfer-row">
            <input className="transfer-catalog-input" value={t.catalogNumber} onChange={(e) => updateItem(t.id, { catalogNumber: e.target.value })} placeholder="מס׳ קטלוג" />
            <input className="transfer-name-input" value={t.name} onChange={(e) => updateItem(t.id, { name: e.target.value })} placeholder="שם / תיאור השטיח" />
            {t.pending && <Chip color="#B8862F">ממתין לאישור</Chip>}
            <span className="muted small transfer-route">אל: {branchLabel(t.toLocation)}</span>
            <select value={t.status} onChange={(e) => updateItem(t.id, { status: e.target.value })} style={{ color: TRANSFER_STATUS.find(s=>s.id===t.status)?.color }}>{TRANSFER_STATUS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}</select>
            <button className="icon-btn danger" onClick={() => removeItem(t.id)}><Trash2 size={14}/></button>
          </div>
        ))}
      </div>
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
                <div><div className="pick-row-title">{t.type === "general" ? t.title : t.client.name}</div><div className="muted small">{typeMeta(t.type).label} · {t.zone} · {t.scheduledDate ? `מתוזמן ל-${t.scheduledDate}` : "לא מתוזמן"}</div></div>
              </label>
            ))}
          </div>
        </div>
        <div className="modal-foot"><button className="btn-ghost" onClick={onClose}>ביטול</button><button className="btn-primary" disabled={selected.length === 0} onClick={() => onConfirm(selected)}><Plus size={16}/> הוסף {selected.length > 0 ? selected.length : ""} ליום זה</button></div>
      </div>
    </div>
  );
}

function CalendarTab({ tasks, updateTasks, selectedDate, onSelectDate, onStartAssign, config, account }) {
  const [driverDrafts, setDriverDrafts] = useState({});
  const [openTaskId, setOpenTaskId] = useState(null);
  const [printDriver, setPrintDriver] = useState("all");
  const [showBranchPicker, setShowBranchPicker] = useState(false);
  const [dragState, setDragState] = useState(null);
  const openTask = tasks.find((t) => t.id === openTaskId) || null;
  const warehouseAddress = config?.general?.warehouseAddress || WAREHOUSE_ADDRESS;

  const tasksByDate = useMemo(() => {
    const map = {};
    tasks.forEach((t) => { if (!t.scheduledDate || !canSeeTask(t, account)) return; (map[t.scheduledDate] = map[t.scheduledDate] || []).push(t); });
    return map;
  }, [tasks, account]);

  const allDayTasks = tasksByDate[selectedDate] || [];
  const dayDrivers = [...new Set(allDayTasks.map((t) => t.driver).filter(Boolean))];
  const dayTasks = printDriver === "all" ? allDayTasks : allDayTasks.filter((t) => t.driver === printDriver);
  const byZone = ZONES.map((z) => ({
    zone: z,
    tasks: dayTasks.filter((t) => t.zone === z.id).sort((a, b) => (a.routeOrder ?? 9999) - (b.routeOrder ?? 9999) || new Date(a.createdAt) - new Date(b.createdAt)),
  }));

  const shiftDay = (delta) => { const d = new Date(selectedDate); d.setDate(d.getDate() + delta); onSelectDate(isoDate(d)); };
  const assignDriverToZone = (zoneId) => {
    const name = driverDrafts[zoneId]; if (!name) return;
    const ids = dayTasks.filter(t => t.zone === zoneId).map(t => t.id);
    updateTasks(tasks.map((t) => ids.includes(t.id) ? { ...t, driver: name, log: [...t.log, { ts: new Date().toISOString(), action: "נהג שויך לאזור", note: name }] } : t));
  };
  const assignDriverToTask = (taskId, name) => {
    updateTasks(tasks.map((t) => t.id === taskId ? { ...t, driver: name, log: [...t.log, { ts: new Date().toISOString(), action: "נהג שויך", note: name || "בוטל שיוך" }] } : t));
  };
  const removeFromDay = (taskId) => {
    updateTasks(tasks.map((t) => t.id === taskId ? { ...t, scheduledDate: "", log: [...t.log, { ts: new Date().toISOString(), action: "הוסר מהיום", note: "" }] } : t));
  };
  const handleDrop = (zoneId, zTasksArr, toIndex) => {
    if (!dragState || dragState.zoneId !== zoneId) return;
    const arr = [...zTasksArr];
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
          <button className="btn-ghost small" onClick={() => window.print()}><Printer size={14}/> הדפס</button>
        </div>

        {dayDrivers.length > 1 && (
          <div className="print-controls">
            <span className="muted small">הצג/הדפס עבור:</span>
            <PillGroup options={[{ id: "all", label: "כל הנהגים" }, ...dayDrivers.map((d) => ({ id: d, label: d }))]} value={printDriver} onChange={setPrintDriver} size="sm" />
          </div>
        )}

        <div className="add-type-row">
          <PillGroup options={TASK_TYPES} value={null} onChange={(t) => t === "branch" ? setShowBranchPicker(true) : onStartAssign(t)} />
        </div>

        {dayTasks.length === 0 && <div className="empty-state"><p>אין משימות ליום זה.</p></div>}

        {byZone.map(({ zone, tasks: zTasks }) => {
          if (zTasks.length === 0) return null;
          const addresses = zTasks.map((t) => t.client?.address).filter(Boolean);
          const routes = buildGoogleMapsRoutes(addresses, true, warehouseAddress);
          return (
            <div key={zone.id} className="zone-block">
              <div className="zone-block-head">
                <Chip color={zone.color}>{zone.label}</Chip><span className="muted small">{zTasks.length} משימות</span>
                {routes.map((r, ri) => <a key={ri} className="gmaps-btn" href={r} target="_blank" rel="noreferrer"><Route size={13}/> {routes.length > 1 ? `מסלול חלק ${ri + 1}` : "פתח מסלול ב-Google Maps"}</a>)}
              </div>
              {routes.length > 1 && <p className="muted small" style={{ marginTop: -6, marginBottom: 8 }}>גוגל מאפשר עד 9 עצירות בקישור אחד — לכן פוצל ל-{routes.length} חלקים. פתחו לפי הסדר, כל חלק ממשיך מאיפה שהקודם נגמר.</p>}
              <div className="driver-assign-row"><input placeholder="שיוך נהג אחד לכל האזור..." value={driverDrafts[zone.id] || ""} onChange={(e) => setDriverDrafts({ ...driverDrafts, [zone.id]: e.target.value })} /><button className="btn-ghost small" onClick={() => assignDriverToZone(zone.id)}><Car size={13}/> שייך לכולם</button></div>
              {zTasks.length > 1 && <p className="muted small" style={{ marginTop: -4, marginBottom: 8 }}>גררו את הידית כדי לשנות את סדר העצירות במסלול.</p>}
              <div className="task-list">
                {zTasks.map((t, i) => (
                  <div key={t.id} className="drag-row" draggable onDragStart={() => setDragState({ zoneId: zone.id, fromIndex: i })} onDragOver={(e) => e.preventDefault()} onDrop={() => handleDrop(zone.id, zTasks, i)}>
                    <div className="drag-handle"><GripVertical size={16} className="muted"/></div>
                    <div style={{ flex: 1 }}>
                      <TaskCard task={t} onOpen={() => setOpenTaskId(t.id)} />
                      <div className="task-driver-inline">
                        <Car size={12} className="muted"/><input defaultValue={t.driver || ""} placeholder="שיוך נהג לתפקיד זה..." onBlur={(e) => e.target.value !== (t.driver || "") && assignDriverToTask(t.id, e.target.value)} />
                        <button className="remove-day-btn" onClick={() => removeFromDay(t.id)}><X size={12}/> הסר מהיום</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="print-manifest">
        <h2>לו״ז עבודה — {new Date(selectedDate).toLocaleDateString("he-IL", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}{printDriver !== "all" ? ` — נהג: ${printDriver}` : ""}</h2>
        {byZone.filter(({ tasks: zt }) => zt.length > 0).map(({ zone, tasks: zTasks }) => (
          <div key={zone.id} className="print-zone">
            <h3>אזור {zone.label} ({zTasks.length} עצירות)</h3>
            {zTasks.map((t, i) => {
              const isG = t.type === "general", isB = t.type === "branch", isC = !isG && !isB;
              return (
                <div key={t.id} className="print-stop">
                  <div className="print-stop-head">{i + 1}. {isG || isB ? t.title : t.client.name} <span className="print-type">· {typeMeta(t.type).label}</span></div>
                  {t.client?.address && <div>📍 {t.client.address}</div>}
                  {t.client?.phone && <div>📞 {t.client.phone}{t.client.contact2Name ? ` | ${t.client.contact2Name}: ${t.client.contact2Phone || ""}` : ""}</div>}
                  {(t.timeWindow || (t.callAhead && t.callAhead !== "none")) && (
                    <div><b>⏰ {t.timeWindow || ""}{t.timeWindow && t.callAhead && t.callAhead !== "none" ? " · " : ""}{t.callAhead && t.callAhead !== "none" ? CALL_AHEAD_OPTIONS.find(o=>o.id===t.callAhead)?.label : ""}</b></div>
                  )}
                  {isC && t.carpets.map((c) => (
                    <div key={c.id}>🧵 {c.number ? `#${c.number} ` : ""}{c.name || "שטיח"}{carpetSizeLabel(c) ? ` — ${carpetSizeLabel(c)}` : ""}{c.notes ? ` (${c.notes})` : ""}</div>
                  ))}
                  {t.description && <div>הערה: {t.description}</div>}
                  {t.driver && <div>🚗 נהג: {t.driver}</div>}
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

      {openTask && <TaskDetail task={openTask} onClose={() => setOpenTaskId(null)} onUpdate={(t) => updateTasks(tasks.map((x) => x.id === t.id ? t : x))} />}
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
  const roleColor = (r) => r === "admin" ? "#33397A" : r === "manager" ? "#7B4FA0" : r === "driver" ? "#0E7A6B" : "#B8862F";

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

  const approveTask = (task) => {
    const isCarpetType = task.type === "cleaning" || task.type === "repair";
    const carpets = isCarpetType ? task.carpets.map((c) => c.number ? c : { ...c, number: getNextNumber() }) : task.carpets;
    updateTasks(tasks.map((t) => t.id === task.id ? { ...t, pending: false, carpets, log: [...t.log, { ts: new Date().toISOString(), action: "אושר", note: "" }] } : t));
  };
  const rejectTask = (task) => updateTasks(tasks.filter((t) => t.id !== task.id));
  const approveTransfer = (tr) => setTransfers(transfers.map((t) => t.id === tr.id ? { ...t, pending: false } : t));
  const rejectTransfer = (tr) => setTransfers(transfers.filter((t) => t.id !== tr.id));

  return (
    <div>
      <div className="section-title">משימות ממתינות ({pendingTasks.length})</div>
      {pendingTasks.length === 0 && <p className="muted small">אין משימות הממתינות לאישור.</p>}
      <div className="task-list">
        {pendingTasks.map((t) => (
          <div key={t.id} className="approval-row">
            <TaskCard task={t} onOpen={() => {}} />
            <div className="muted small" style={{ margin: "4px 0 8px" }}>נשלח ע״י: {t.submittedBy}</div>
            <div className="approval-btns">
              <button className="btn-primary small" onClick={() => approveTask(t)}><Save size={14}/> אשר</button>
              <button className="btn-ghost small danger" onClick={() => rejectTask(t)}><X size={14}/> דחה</button>
            </div>
          </div>
        ))}
      </div>

      <div className="section-title" style={{ marginTop: 26 }}>פריטי העברה ממתינים ({pendingTransfers.length})</div>
      {pendingTransfers.length === 0 && <p className="muted small">אין פריטים הממתינים לאישור.</p>}
      <div className="transfer-list">
        {pendingTransfers.map((tr) => (
          <div key={tr.id} className="transfer-row">
            <span className="transfer-catalog-input" style={{ border: "none" }}>{tr.catalogNumber}</span>
            <span style={{ flex: 1 }}>{tr.name}</span>
            <span className="muted small transfer-route">אל: {branchLabel(tr.toLocation)}</span>
            <button className="btn-primary small" onClick={() => approveTransfer(tr)}>אשר</button>
            <button className="icon-btn danger" onClick={() => rejectTransfer(tr)}><X size={14}/></button>
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
          {STATUS_FLOW.map((s) => (
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
  return task.type === "branch" ? !!task.visited : task.status === "נמסר";
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
  { id: "transfers", label: "סניפים", icon: ArrowLeftRight },
  { id: "approvals", label: "אישורים", icon: CheckCircle2, adminOnly: true },
  { id: "calc", label: "מחשבון", icon: CalcIcon },
];
const PAGE_META = {
  calendar: { title: "לו״ז עבודה", sub: "תכנון, שיוך נהגים ומשימות לפי יום" },
  tasks: { title: "משימות", sub: "הוספת משימות כלליות" },
  ops: { title: "ניקוי ותיקון", sub: "כל עבודות הניקוי והתיקון" },
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
  const updateTasks = (next) => { saveTasks(next, tasks); setTasks(next); };
  const getNextNumber = () => { const n = nextNumberRef.current; nextNumberRef.current = n + 1; saveNextNumber(n + 1); return n; };
  const pickCalendarDate = (iso) => { setScheduleDate(iso); setTab("calendar"); };
  const startAssign = (type) => { setAssignMode({ date: scheduleDate }); setTab((type === "general" || type === "branch") ? "tasks" : "ops"); };
  const cancelAssign = () => setAssignMode(null);
  const assignPick = (taskId) => {
    updateTasks(tasks.map((t) => t.id === taskId ? { ...t, scheduledDate: assignMode.date, log: [...t.log, { ts: new Date().toISOString(), action: "תוזמן ליום", note: assignMode.date }] } : t));
    setAssignMode(null); setTab("calendar");
  };
  const openFromSearch = (task) => { setSearchTaskDetail(task); setSearchOpen(false); };
  const openTransfersFromSearch = () => { setTab("transfers"); setSearchOpen(false); };
  const logout = () => { setAccount(null); setTab("calendar"); clearSession(); };
  const handleLogin = (acc) => { setAccount(acc); saveSession(acc.id); };

  const meta = PAGE_META[tab];
  const visibleTasks = account ? tasks.filter((t) => canSeeTask(t, account)) : [];
  const pendingCount = tasks.filter((t) => t.pending).length + transfers.filter((t) => t.pending).length;
  const isAdmin = account?.role === "admin" || account?.role === "manager";
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
      <div className="shell">
        <div className="mobile-topbar">
          <button className="icon-btn" onClick={() => setMobileMenuOpen(true)}><Menu size={22}/></button>
          <span className="brand-name" style={{ fontSize: 16 }}>צמר שטיחים יפים</span>
        </div>
        {mobileMenuOpen && <div className="mobile-backdrop" onClick={() => setMobileMenuOpen(false)} />}

        <aside className={"sidebar" + (mobileMenuOpen ? " open" : "")}>
          <div className="sb-brand-row">
            <div className="sb-brand"><span className="brand-name">צמר שטיחים יפים</span><span className="brand-sub">תפעול · {account.name}</span></div>
            <button className="icon-btn sidebar-close" onClick={() => setMobileMenuOpen(false)}><X size={20}/></button>
          </div>
          <div className="sb-item search-item" onClick={() => { setSearchOpen(true); setMobileMenuOpen(false); }}><Search className="ic" size={18}/>חיפוש</div>
          <nav className="sb-nav">
            {visibleTabs.map((t) => { const Icon = t.icon; const c = counts[t.id]; return (
              <div key={t.id} className={"sb-item" + (tab === t.id ? " active" : "")} onClick={() => { setTab(t.id); setMobileMenuOpen(false); }}>
                <Icon className="ic" size={18}/>{t.label}{c > 0 && <span className="count">{c}</span>}
              </div>
            ); })}
            <div className="sb-item disabled"><Car className="ic" size={18}/>נהגים נכנסים עם חשבון נהג נפרד</div>
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

          {tab === "tasks" ? <TasksTab tasks={tasks} updateTasks={updateTasks} scope="general" assignMode={assignMode} onAssignPick={assignPick} onCancelAssign={cancelAssign} account={account} /> :
           tab === "ops" ? <TasksTab tasks={tasks} updateTasks={updateTasks} scope="ops" getNextNumber={getNextNumber} assignMode={assignMode} onAssignPick={assignPick} onCancelAssign={cancelAssign} account={account} /> :
           tab === "calc" ? <CalculatorTab config={config} /> :
           tab === "transfers" ? <TransfersTab transfers={transfers} setTransfers={setTransfers} account={account} /> :
           tab === "approvals" ? (isAdmin ? <Approvals tasks={tasks} updateTasks={updateTasks} transfers={transfers} setTransfers={setTransfers} getNextNumber={getNextNumber} /> : null) :
           tab === "calendar" ? <CalendarTab tasks={tasks} updateTasks={updateTasks} selectedDate={scheduleDate} onSelectDate={setScheduleDate} onStartAssign={startAssign} config={config} account={account} /> :
           isAdmin ? <ManagementArea config={config} setConfig={setConfig} accounts={accounts} setAccounts={setAccounts} /> : null}
        </main>

        <aside className="rail">
          <MiniCalendarRail tasks={tasks} onPick={pickCalendarDate} selectedDate={scheduleDate} account={account} />
          <DriversRail tasks={tasks} account={account} />
        </aside>
      </div>

      {searchOpen && <SearchModal tasks={visibleTasks} transfers={transfers.filter((t) => !t.pending || isAdmin || t.submittedBy === account.name)} onClose={() => setSearchOpen(false)} onOpenTask={openFromSearch} onOpenTransfers={openTransfersFromSearch} />}
      {searchTaskDetail && <TaskDetail task={searchTaskDetail} onClose={() => setSearchTaskDetail(null)} onUpdate={(t) => { updateTasks(tasks.map((x) => x.id === t.id ? t : x)); setSearchTaskDetail(t); }} />}
    </div>
  );
}

/* ============================= CSS ============================= */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@500;600;700;800&family=Assistant:wght@400;500;600;700&family=Heebo:wght@400;500;600;700;800&display=swap');

* { box-sizing: border-box; }
.app-root { font-family: 'Assistant', sans-serif; background: #F2F1EE; color: #15161A; min-height: 100vh; }
.muted { color: #6B6E76; }
.small { font-size: 12px; }

.shell { display:grid; grid-template-columns: 220px 1fr 270px; min-height: 100vh; }

/* sidebar */
.sidebar { background:#fff; border-left:1px solid #E7E5E1; padding:20px 12px; display:flex; flex-direction:column; position:sticky; top:0; height:100vh; overflow-y:auto; }
.sb-brand { padding:2px 10px 22px; }
.sb-brand-row { display:flex; align-items:center; justify-content:space-between; }
.sidebar-close { display:none; }
.mobile-topbar { display:none; }
.mobile-backdrop { display:none; }
.sb-brand .brand-name { font-family:'Rubik',sans-serif; font-weight:800; font-size:15.5px; display:block; }
.sb-brand .brand-sub { font-size:11px; color:#6B6E76; font-weight:500; }
.sb-nav { display:flex; flex-direction:column; gap:1px; }
.sb-item { display:flex; align-items:center; gap:10px; padding:10px 11px; border-radius:9px; color:#6B6E76; font-size:13px; font-weight:600; cursor:pointer; }
.sb-item .ic { flex-shrink:0; }
.sb-item:hover:not(.disabled) { background:#F2F1EE; }
.sb-item.active { background:#15161A; color:#fff; }
.sb-item .count { margin-right:auto; font-size:10px; font-weight:700; color:#AEB0B5; background:#F2F1EE; padding:1px 7px; border-radius:20px; }
.sb-item.active .count { color:#fff; background:#ffffff26; }
.sb-item.disabled { opacity:.4; cursor:not-allowed; }
.sb-spacer { flex:1; }
.sb-item.settings { border-top:1px solid #E7E5E1; margin-top:8px; padding-top:14px; }
.sb-item.search-item { border:1px solid #E7E5E1; margin-bottom:14px; background:#fff; }
.sb-item.logout-item { color:#B23B3B; margin-top:4px; }

.login-screen { min-height:100vh; display:flex; align-items:center; justify-content:center; background:#F2F1EE; font-family:'Assistant',sans-serif; }

.driver-app { min-height:100vh; background:#F2F1EE; font-family:'Assistant',sans-serif; padding:16px; padding-bottom:60px; max-width:560px; margin:0 auto; }
.driver-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; }
.driver-daynav { display:flex; align-items:center; justify-content:center; gap:14px; background:#fff; border:1px solid #E7E5E1; border-radius:12px; padding:10px; margin-bottom:16px; font-weight:700; font-family:'Rubik',sans-serif; font-size:14px; }
.driver-progress { background:#fff; border:1px solid #E7E5E1; border-radius:12px; padding:12px 14px; margin-bottom:18px; }
.driver-progress-top { display:flex; justify-content:space-between; align-items:center; font-size:13px; font-weight:700; margin-bottom:8px; }
.driver-progress-bar { height:7px; background:#F2F1EE; border-radius:99px; overflow:hidden; }
.driver-progress-fill { height:100%; background:#2E8B57; border-radius:99px; transition:width .25s ease; }
.driver-stop-num { display:inline-flex; align-items:center; justify-content:center; width:20px; height:20px; border-radius:50%; background:#15161A; color:#fff; font-size:11px; font-weight:800; margin-left:6px; }
.driver-card.done { opacity:.55; }
.driver-zone-block { margin-bottom:20px; }
.driver-zone-head { display:flex; align-items:center; gap:10px; margin-bottom:10px; }
.driver-card { background:#fff; border:1px solid #E7E5E1; border-radius:14px; padding:14px 16px; margin-bottom:12px; }
.driver-card-top { display:flex; justify-content:space-between; align-items:flex-start; gap:8px; margin-bottom:6px; }
.driver-card-title { font-family:'Rubik',sans-serif; font-weight:800; font-size:15.5px; }
.driver-card-addr { display:flex; align-items:center; gap:5px; font-size:13px; color:#6B6E76; margin-bottom:8px; }
.driver-time-alert { display:flex; gap:14px; flex-wrap:wrap; margin-bottom:9px; font-weight:700; font-size:12.5px; color:#B8862F; }
.driver-time-alert span { display:flex; align-items:center; gap:5px; }
.driver-card-actions { display:flex; gap:8px; margin:10px 0; }
.driver-action-btn { flex:1; display:flex; align-items:center; justify-content:center; gap:6px; padding:11px; border-radius:11px; font-weight:700; font-size:13px; text-decoration:none; }
.driver-action-btn.waze { background:#33397A; color:#fff; }
.driver-action-btn.call { background:#F2F1EE; color:#15161A; border:1px solid #E7E5E1; }
.driver-done-btn { width:100%; padding:12px; border-radius:11px; border:1.5px solid #2E8B57; color:#2E8B57; background:#fff; font-weight:700; font-size:13.5px; margin-top:6px; cursor:pointer; }
.driver-done-btn.done { background:#2E8B57; color:#fff; }
.driver-note-row { display:flex; gap:8px; margin-top:10px; }
.driver-photo-row { margin-top:12px; }
.driver-photo-row.single { display:block; }
.login-card { background:#fff; border:1px solid #E7E5E1; border-radius:16px; padding:32px 28px; width:100%; max-width:340px; }

.accounts-list { display:flex; flex-direction:column; gap:8px; margin-bottom:14px; }
.pill-row-perm { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:14px; }
.account-row { display:flex; align-items:center; gap:10px; background:#fff; border:1px solid #E7E5E1; border-radius:11px; padding:10px 12px; }
.approval-row { background:#fff; border:1px solid #E7E5E1; border-radius:14px; padding:12px; }
.approval-btns { display:flex; gap:8px; }

/* main */
.main { padding:24px 28px; overflow-x:hidden; }
.main-top { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:18px; }
.page-title { font-family:'Rubik',sans-serif; font-weight:800; font-size:22px; letter-spacing:-.01em; }
.page-sub { font-size:12.5px; color:#6B6E76; margin-top:3px; }

.stats-row { display:flex; gap:10px; margin-bottom:20px; }
.stat-card { flex:1; background:#fff; border:1px solid #E7E5E1; border-radius:11px; padding:13px 15px; }
.stat-num { font-family:'Rubik',sans-serif; font-weight:800; font-size:22px; letter-spacing:-.02em; }
.stat-lbl { font-size:11px; color:#6B6E76; font-weight:600; margin-top:2px; }
.stat-card.accent { background:#33397A; color:#fff; }
.stat-card.accent .stat-lbl { color:#ffffffb0; }

/* right rail */
.rail { border-right:1px solid #E7E5E1; padding:24px 20px; background:#fff; position:sticky; top:0; height:100vh; overflow-y:auto; }
.rail-title { font-family:'Rubik',sans-serif; font-weight:700; font-size:13px; margin-bottom:12px; text-transform:uppercase; letter-spacing:.03em; color:#6B6E76; }
.mini-cal { background:#F2F1EE; border-radius:14px; padding:13px; margin-bottom:24px; }
.mini-cal-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:4px; text-align:center; }
.mini-cal-grid .dow { font-size:9.5px; color:#AEB0B5; font-weight:700; padding-bottom:4px; }
.mini-cal-grid .day { font-size:11.5px; font-weight:600; padding:5px 0; border-radius:7px; position:relative; color:#15161A; cursor:pointer; }
.mini-cal-grid .day:hover { background:#E7E5E1; }
.mini-cal-grid .day.today { background:#33397A; color:#fff; }
.mini-cal-grid .day.selected:not(.today) { box-shadow: inset 0 0 0 1.5px #33397A; }
.rail-cal-nav { display:flex; align-items:center; justify-content:space-between; }
.rail-cal-nav .icon-btn { padding:3px; }
.mini-cal-grid .day .d { position:absolute; bottom:2px; left:50%; transform:translateX(-50%); width:3px; height:3px; border-radius:50%; }
.driver-list { display:flex; flex-direction:column; gap:8px; }
.driver-row { display:flex; align-items:center; gap:10px; padding:10px 12px; border:1px solid #E7E5E1; border-radius:11px; }
.driver-avatar { width:30px; height:30px; border-radius:9px; background:#33397A14; color:#33397A; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px; font-family:'Rubik',sans-serif; }
.driver-name { font-size:12.5px; font-weight:700; }
.driver-meta { font-size:10.5px; color:#6B6E76; }

@media (max-width: 900px) {
  .shell { grid-template-columns: 1fr; }
  .mobile-topbar { display:flex; align-items:center; gap:12px; position:sticky; top:0; z-index:25; background:#fff; padding:14px 16px; border-bottom:1px solid #E7E5E1; }
  .sidebar {
    position:fixed; top:0; right:0; height:100vh; width:270px; max-width:82vw;
    transform:translateX(100%); transition:transform .25s ease; z-index:45;
    flex-direction:column; overflow-y:auto; border-left:1px solid #E7E5E1; border-bottom:none;
    box-shadow: -12px 0 30px rgba(21,22,26,.18);
  }
  .sidebar.open { transform:translateX(0); }
  .sidebar-close { display:flex; }
  .sb-nav { flex-direction:column; gap:1px; }
  .sb-item { white-space:normal; padding:10px 11px; }
  .sb-item .count { display:inline-block; }
  .sb-spacer { display:block; }
  .sb-item.settings { border-top:1px solid #E7E5E1; margin-top:8px; padding-top:14px; }
  .mobile-backdrop { display:block; position:fixed; inset:0; background:rgba(15,16,20,.45); z-index:40; }
  .rail { display:none; }
  .main { padding:16px; }
  .calc-iframe-wrap { margin:-16px; }
}

.pill-group { display:flex; flex-wrap:wrap; gap:8px; margin-bottom: 12px; }
.pill-group.sm .pill { padding: 6px 12px; font-size: 12.5px; }
.pill { display:flex; align-items:center; gap:6px; background:#fff; border:1.5px solid #E7E5E1; color:#6B6E76; padding:9px 15px; border-radius:10px; font-weight:700; cursor:pointer; font-family:'Assistant',sans-serif; font-size: 13.5px; }
.pill-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }
.pill.active .pill-dot { box-shadow: 0 0 0 2px #ffffff40; }
.pill.active { border-color:#15161A; color:#fff; background:#15161A; }

.toolbar { display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:16px; flex-wrap:wrap; }
.assign-banner { display:flex; align-items:center; justify-content:space-between; gap:10px; background:#33397A; color:#fff; border-radius:11px; padding:11px 16px; margin-bottom:16px; font-size:13px; font-weight:600; }
.filters { display:flex; align-items:center; gap:8px; flex-wrap: wrap; }
.filters select { background:#fff; border:1px solid #E7E5E1; color:#15161A; border-radius:8px; padding:7px 10px; font-family:'Assistant',sans-serif; font-size:13px; }

.btn-primary { display:flex; align-items:center; gap:6px; background:#33397A; color:#fff; border:none; padding: 10px 16px; border-radius: 10px; font-weight:700; font-size: 14px; cursor:pointer; font-family:'Assistant',sans-serif; }
.btn-primary.small { padding: 7px 12px; font-size: 12.5px; }
.btn-primary:hover { background:#262C63; }
.btn-primary:disabled { opacity:.4; cursor:not-allowed; }
.btn-ghost { display:flex; align-items:center; gap:6px; background:#fff; color:#33397A; border:1px solid #33397A55; padding: 9px 14px; border-radius: 10px; font-weight:600; font-size: 13.5px; cursor:pointer; font-family:'Assistant',sans-serif; margin-top:10px; text-decoration:none; }
.btn-ghost:hover { background:#33397A0f; }
.btn-ghost.small { padding:6px 10px; font-size:12.5px; margin-top:0; }
.btn-ghost.danger { color:#B23B3B; border-color:#B23B3B55; }

.empty-state { display:flex; flex-direction:column; align-items:center; gap:10px; padding: 60px 0; text-align:center; }

.task-list { display:flex; flex-direction:column; gap:10px; }
.task-card { position:relative; background:#fff; border:1px solid #E7E5E1; border-radius: 14px; padding: 14px 20px 14px 16px; cursor:pointer; transition: border-color .15s ease, box-shadow .15s ease, transform .15s ease; overflow:hidden; }
.task-card::before { content:''; position:absolute; top:0; right:0; bottom:0; width:4px; background:var(--zone-color, transparent); }
.task-card:hover { transform:translateY(-1px); box-shadow: 0 8px 20px rgba(21,22,26,.08); }
.task-card.static { cursor:default; }
.task-card-top { display:flex; justify-content:space-between; align-items:center; font-weight:700; margin-bottom:6px; gap: 8px; }
.task-client { display:flex; align-items:center; gap:6px; font-family:'Rubik',sans-serif; }
.task-card-mid { display:flex; align-items:center; gap:5px; font-size:13px; margin-bottom:8px; }
.task-card-bottom { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }

.chip { border:1px solid; border-radius:999px; padding:3px 10px; font-size:12px; font-weight:700; white-space: nowrap; display:inline-flex; align-items:center; gap:3px; }

.modal-backdrop { position:fixed; inset:0; background:#15161A99; display:flex; align-items:center; justify-content:center; z-index: 50; padding: 16px; }
.modal { background:#FFFFFF; border:1px solid #E7E5E1; border-radius:16px; width:100%; max-width:640px; max-height: 90vh; display:flex; flex-direction:column; overflow:hidden; }
.modal-head { display:flex; justify-content:space-between; align-items:center; padding:16px 18px; border-bottom:1px solid #E7E5E1; background:#fff; }
.modal-head h2 { font-family:'Rubik',sans-serif; font-size:18px; margin:0; }
.modal-body { padding: 16px 18px; overflow-y:auto; }
.modal-foot { display:flex; justify-content:flex-end; gap:10px; padding: 14px 18px; border-top:1px solid #E7E5E1; background:#fff; }

.icon-btn { background:transparent; border:none; color:#6B6E76; cursor:pointer; padding:6px; border-radius:8px; }
.icon-btn:hover { background:#E7E5E1; color:#15161A; }
.icon-btn.danger:hover { color:#B23B3B; }

.section-title { font-family:'Rubik',sans-serif; font-weight:700; font-size:14px; color:#33397A; margin: 18px 0 10px; }
.form-grid { display:grid; grid-template-columns: 1fr 1fr; gap:10px 12px; }
.form-grid.three { grid-template-columns: repeat(3, 1fr); }
.field { display:flex; flex-direction:column; gap:5px; margin-bottom: 10px; }
.field-label { font-size:12px; color:#6B6E76; }
.field input, .field select, .field textarea, select, input[type=text], input[type=number], input[type=date], input[type=password], textarea {
  background:#fff; border:1px solid #E7E5E1; color:#15161A; border-radius:8px; padding:9px 10px; font-family:'Assistant',sans-serif; font-size:14px; width:100%; resize: vertical;
}
.field input:focus, .field select:focus, .field textarea:focus { outline:2px solid #33397A55; border-color:#33397A; }
.task-description { font-size:13.5px; line-height:1.5; color:#33343A; background:#fff; border:1px solid #E7E5E1; border-radius:8px; padding:10px 12px; }

.carpet-row { background:#fff; border:1px solid #E7E5E1; border-radius:12px; padding:12px; margin-bottom:10px; }
.carpet-row-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
.carpet-index { font-weight:700; font-size:13px; color:#6B6E76; display:flex; align-items:center; gap:6px; }
.carpet-num-badge { background:#33397A14; color:#33397A; font-family:'Rubik',sans-serif; font-weight:700; font-size:11.5px; padding:2px 8px; border-radius:6px; }
.task-card-desc { font-size:13.5px; font-weight:600; color:#15161A; line-height:1.5; margin-bottom:9px; padding:8px 10px; background:#F2F1EE; border-right:3px solid #33397A; border-radius:6px; display:-webkit-box; -webkit-line-clamp:4; -webkit-box-orient:vertical; overflow:hidden; }
.carpet-grid { display:grid; grid-template-columns: repeat(2, 1fr); gap:8px 10px; margin-bottom:10px; }
.extras-row { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:10px; }
.extra-pill { display:flex; align-items:center; gap:6px; background:#FAFAF9; border:1px solid #E7E5E1; border-radius:999px; padding:6px 12px; font-size:12.5px; cursor:pointer; }
.extra-pill.active { background:#33397A1a; border-color:#33397A; }
.repair-cat { margin-bottom: 8px; }
.repair-cat-title { font-size: 11.5px; font-weight:700; color:#6B6E76; margin: 8px 0 4px; text-transform: uppercase; letter-spacing: .04em; }

.carpet-summary-block { background:#fff; border:1px solid #E7E5E1; border-radius:10px; padding:10px 12px; margin-bottom:8px; }
.carpet-summary-head { font-weight:700; font-family:'Rubik',sans-serif; font-size: 13.5px; margin-bottom: 3px; }

.error-box { display:flex; align-items:center; gap:6px; color:#B23B3B; background:#B23B3B12; border:1px solid #B23B3B40; border-radius:8px; padding:8px 12px; margin-top:10px; font-size:13px; }

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
.photo-thumb { position:relative; width:64px; height:64px; border-radius:8px; overflow:hidden; border:1px solid #E7E5E1; }
.photo-thumb img { width:100%; height:100%; object-fit:cover; }
.photo-remove { position:absolute; top:2px; left:2px; background:#15161Aaa; border:none; color:#fff; border-radius:6px; padding:2px; cursor:pointer; }
.photo-add { width:64px; height:64px; border:1.5px dashed #D0D2D6; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#6B6E76; cursor:pointer; background:#fff; }
.photo-add:hover { border-color:#33397A; color:#33397A; }

.log-list { display:flex; flex-direction:column; gap:10px; }
.log-item { display:flex; gap:8px; align-items:flex-start; font-size:13px; }
.log-action { font-weight:600; }
.log-note { color:#6B6E76; font-size:12.5px; }
.log-ts { font-size:11px; margin-top:2px; }

.detail-actions-float { position:fixed; bottom:18px; left:50%; transform:translateX(-50%); display:flex; gap:8px; z-index:60; background:#fff; border:1px solid #E7E5E1; padding:8px; border-radius:12px; box-shadow: 0 4px 16px #15161A20; }

.paste-preview { display:flex; align-items:center; gap:6px; font-size:12.5px; color:#6B6E76; background:#fff; border:1px solid #E7E5E1; border-radius:8px; padding:8px 10px; margin-top:4px; }
.excel-cols { display:grid; grid-template-columns: 1fr 1fr; gap:10px; }
.excel-cols textarea { font-family:'Rubik',sans-serif; font-size:13px; }

.transfer-list { display:flex; flex-direction:column; gap:8px; }
.transfer-row { display:flex; align-items:center; gap:10px; background:#fff; border:1px solid #E7E5E1; border-radius:10px; padding:10px 14px; flex-wrap:wrap; }
.transfer-catalog-input { width: 110px !important; font-family:'Rubik',sans-serif; font-weight:700; }
.transfer-name-input { flex: 1; min-width: 140px; }
.transfer-route { white-space: nowrap; }
.transfer-row select { width:auto; padding:5px 8px; font-size:12.5px; }

.driver-assign-row { display:flex; gap:8px; margin-bottom: 4px; }
.driver-assign-row input { max-width: 220px; }
.task-driver-inline { display:flex; align-items:center; gap:6px; margin-top:6px; flex-wrap:wrap; }
.task-driver-inline input { border:1px solid #E7E5E1; border-radius:6px; padding:4px 8px; font-size:12.5px; background:#FAFAF9; }
.remove-day-btn { display:flex; align-items:center; gap:3px; background:transparent; border:1px solid #E7E5E1; color:#6B6E76; border-radius:6px; padding:4px 8px; font-size:11.5px; font-weight:600; cursor:pointer; }
.remove-day-btn:hover { border-color:#B23B3B; color:#B23B3B; }
.drag-row { display:flex; align-items:flex-start; gap:6px; }
.drag-handle { cursor:grab; padding:14px 2px 0; flex-shrink:0; touch-action:none; }
.drag-row:active .drag-handle { cursor:grabbing; }
.gmaps-btn { display:flex; align-items:center; gap:6px; background:#fff; border:1.5px solid #4285F4; color:#4285F4; padding:7px 14px; border-radius:999px; font-weight:700; font-size:12.5px; text-decoration:none; }
.gmaps-btn:hover { background:#4285F41a; }

.zone-block { margin-bottom: 22px; }
.zone-block-head { display:flex; align-items:center; gap:10px; margin-bottom:10px; flex-wrap: wrap; }

.pick-row { display:flex; align-items:center; gap:10px; background:#fff; border:1px solid #E7E5E1; border-radius:10px; padding:10px 12px; margin-bottom:8px; cursor:pointer; }
.pick-row.active { border-color:#33397A; background:#33397A0d; }
.pick-row-title { font-weight:700; font-family:'Rubik',sans-serif; }

.admin-lock { display:flex; flex-direction:column; align-items:center; gap:10px; padding: 60px 20px; text-align:center; }
.admin-lock-row { display:flex; gap:8px; }
.admin-lock-row input { width: 160px; }
.admin-repair-cat { font-size:12px; font-weight:700; color:#6B6E76; margin: 10px 0 4px; text-transform: uppercase; letter-spacing:.04em; }

/* ─── iOS-style calendar ─── */
.ios-cal-header { display:flex; align-items:center; justify-content:space-between; margin-bottom: 10px; }
.ios-cal-title { font-family:'Rubik',sans-serif; font-weight:700; font-size: 17px; }
.ios-cal-weekdays { display:grid; grid-template-columns: repeat(7, 1fr); text-align:center; font-size:11.5px; color:#6B6E76; font-weight:700; margin-bottom: 4px; }
.ios-cal-grid { display:grid; grid-template-columns: repeat(7, 1fr); gap: 2px; margin-bottom: 14px; }
.ios-cal-cell { height: 40px; border: none; background: #fff; border-radius: 8px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; cursor:pointer; font-family:'Assistant',sans-serif; }
.ios-cal-cell.empty { background: transparent; cursor: default; }
.ios-cal-cell.today .ios-cal-daynum { color: #33397A; font-weight: 800; }
.ios-cal-cell.selected { background: #33397A; }
.ios-cal-cell.selected .ios-cal-daynum { color: #fff; }
.ios-cal-daynum { font-size: 14px; font-weight: 600; }
.ios-cal-dots { display:flex; gap: 2px; height: 5px; }
.ios-cal-dot { width: 5px; height: 5px; border-radius: 50%; }
.ios-cal-agenda-head { display:flex; justify-content:space-between; align-items:center; margin-bottom: 14px; }
.day-nav { display:flex; align-items:center; gap:10px; }
.add-type-row { display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:12px; }
.branch-quick-row { display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:18px; }
.print-controls { display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:14px; background:#fff; border:1px solid #E7E5E1; border-radius:11px; padding:10px 12px; }
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
.print-manifest h2 { font-family:'Rubik',sans-serif; margin-bottom:14px; }
.print-zone { break-inside: avoid; margin-bottom: 18px; }
.print-zone h3 { font-family:'Rubik',sans-serif; font-size:15px; border-bottom:2px solid #15161A; padding-bottom:4px; margin-bottom:8px; }
.print-stop { break-inside: avoid; padding:8px 0; border-bottom:1px dashed #ccc; font-size:13px; line-height:1.6; }
.print-stop-head { font-weight:700; font-size:14px; }
.print-type { font-weight:400; color:#6B6E76; font-size:12px; }

@media (max-width: 560px) {
  .form-grid, .form-grid.three, .carpet-grid, .calc-type-grid, .calc-services-grid, .calc-delivery-grid, .calc-action-row, .excel-cols { grid-template-columns: 1fr; }
  .calc-sides-grid { grid-template-columns: 1fr 1fr; }
  .modal { max-height: 95vh; }
}
@media print {
  .sidebar, .rail, .main-top, .btn-ghost, .btn-primary, .calc-tabs, .calc-add-btn, .calc-action-row, .ios-cal-agenda, .filter-label, .pill-group { display: none !important; }
  .print-manifest { display:block !important; }
  .shell { display:block !important; }
  .main { padding:0 !important; }
}
`;

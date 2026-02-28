/* ===========================
   Shooting Star (20–40s random)
   =========================== */
function ensureShootingLayer(){
  if (document.querySelector(".shooting-layer")) return;
  const layer = document.createElement("div");
  layer.className = "shooting-layer";
  document.body.appendChild(layer);
}

function spawnShootingStar(){
  const layer = document.querySelector(".shooting-layer");
  if(!layer) return;

  const s = document.createElement("div");
  s.className = "shooting-star";

  const top = Math.floor(Math.random() * 45) + 5;    // 5% - 50%
  const left = Math.floor(Math.random() * 40) - 20;  // -20% to 20%

  s.style.top = `${top}%`;
  s.style.left = `${left}%`;

  layer.appendChild(s);
  setTimeout(()=> s.remove(), 1500);
}

function startShootingStars(){
  ensureShootingLayer();

  const loop = () => {
    spawnShootingStar();
    const next = 20000 + Math.random() * 20000; // 20–40s
    setTimeout(loop, next);
  };

  setTimeout(loop, 2500);
}

/* ===========================
   Dynamic Background (Dhaka)
   =========================== */
function applyTimeBackground(){
  const now = new Date(new Date().toLocaleString("en-US",{ timeZone:"Asia/Dhaka" }));
  const h = now.getHours();

  const body = document.body;
  body.classList.remove("bg-sehri","bg-day","bg-iftar","bg-night");

  if (h >= 3 && h < 6) body.classList.add("bg-sehri");
  else if (h >= 6 && h < 17) body.classList.add("bg-day");
  else if (h >= 17 && h < 20) body.classList.add("bg-iftar");
  else body.classList.add("bg-night");
}

function startTimeBackground(){
  applyTimeBackground();
  setInterval(applyTimeBackground, 60_000);
}

/* ===========================
   Mascot Mood Aura
   =========================== */
function setMascotAura(mood){
  document.body.classList.remove("mood-sad","mood-anxious","mood-happy","mood-grateful","mood-stressed","mood-study");

  const map = {
    "Sad": "mood-sad",
    "Anxious": "mood-anxious",
    "Happy": "mood-happy",
    "Grateful": "mood-grateful",
    "Stressed": "mood-stressed",
    "Study[EMB]": "mood-study",
  };
  document.body.classList.add(map[mood] || "mood-sad");

  const halo = document.querySelector(".mascot-halo");
  if(!halo) return;

  const gradients = {
    "Sad":        "conic-gradient(from 0deg, rgba(127,212,248,.45), rgba(232,184,75,.25), rgba(244,160,192,.18), rgba(127,212,248,.45))",
    "Anxious":    "conic-gradient(from 0deg, rgba(232,184,75,.45), rgba(127,212,248,.22), rgba(255,255,255,.16), rgba(232,184,75,.45))",
    "Happy":      "conic-gradient(from 0deg, rgba(232,184,75,.55), rgba(244,160,192,.35), rgba(127,212,248,.22), rgba(232,184,75,.55))",
    "Grateful":   "conic-gradient(from 0deg, rgba(232,184,75,.55), rgba(255,255,255,.14), rgba(127,212,248,.24), rgba(232,184,75,.55))",
    "Stressed":   "conic-gradient(from 0deg, rgba(244,160,192,.35), rgba(232,184,75,.35), rgba(127,212,248,.20), rgba(244,160,192,.35))",
    "Study[EMB]": "conic-gradient(from 0deg, rgba(127,212,248,.50), rgba(255,255,255,.14), rgba(232,184,75,.18), rgba(127,212,248,.50))",
  };

  halo.style.background = gradients[mood] || gradients["Sad"];
}

/* ===========================
   DHAKA TIME helpers
   =========================== */
function dhakaNowBD() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));
}
function dateOnly(d){ return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }

function parseTime12h(str){
  const [hm, ap] = str.trim().split(" ");
  let [h,m] = hm.split(":").map(Number);
  const isPM = ap.toUpperCase() === "PM";
  if (isPM && h !== 12) h += 12;
  if (!isPM && h === 12) h = 0;
  return {h, m};
}
function atTime(baseDate, timeStr){
  const t = parseTime12h(timeStr);
  const d = new Date(baseDate);
  d.setHours(t.h, t.m, 0, 0);
  return d;
}
function msToHHMMSS(ms){
  ms = Math.max(0, ms);
  const total = Math.floor(ms / 1000);
  const hh = String(Math.floor(total / 3600)).padStart(2,"0");
  const mm = String(Math.floor((total % 3600) / 60)).padStart(2,"0");
  const ss = String(total % 60).padStart(2,"0");
  return `${hh}:${mm}:${ss}`;
}
function formatClock(d){
  return d.toLocaleTimeString("en-US", { hour:"2-digit", minute:"2-digit" });
}

/* ===========================
   RAMADAN SCHEDULE
   =========================== */
const RAMADAN_SCHEDULE = [
  { day: 1,  md:"02-19", suhur:"5:11 AM", iftar:"5:57 PM" },
  { day: 2,  md:"02-20", suhur:"5:11 AM", iftar:"5:58 PM" },
  { day: 3,  md:"02-21", suhur:"5:10 AM", iftar:"5:58 PM" },
  { day: 4,  md:"02-22", suhur:"5:09 AM", iftar:"5:59 PM" },
  { day: 5,  md:"02-23", suhur:"5:09 AM", iftar:"5:59 PM" },
  { day: 6,  md:"02-24", suhur:"5:08 AM", iftar:"6:00 PM" },
  { day: 7,  md:"02-25", suhur:"5:07 AM", iftar:"6:00 PM" },
  { day: 8,  md:"02-26", suhur:"5:06 AM", iftar:"6:01 PM" },
  { day: 9,  md:"02-27", suhur:"5:05 AM", iftar:"6:01 PM" },
  { day:10,  md:"02-28", suhur:"5:05 AM", iftar:"6:02 PM" },
  { day:11,  md:"03-01", suhur:"5:04 AM", iftar:"6:02 PM" },
  { day:12,  md:"03-02", suhur:"5:03 AM", iftar:"6:03 PM" },
  { day:13,  md:"03-03", suhur:"5:02 AM", iftar:"6:03 PM" },
  { day:14,  md:"03-04", suhur:"5:01 AM", iftar:"6:04 PM" },
  { day:15,  md:"03-05", suhur:"5:00 AM", iftar:"6:04 PM" },
  { day:16,  md:"03-06", suhur:"4:59 AM", iftar:"6:05 PM" },
  { day:17,  md:"03-07", suhur:"4:58 AM", iftar:"6:05 PM" },
  { day:18,  md:"03-08", suhur:"4:58 AM", iftar:"6:06 PM" },
  { day:19,  md:"03-09", suhur:"4:57 AM", iftar:"6:06 PM" },
  { day:20,  md:"03-10", suhur:"4:56 AM", iftar:"6:06 PM" },
  { day:21,  md:"03-11", suhur:"4:55 AM", iftar:"6:07 PM" },
  { day:22,  md:"03-12", suhur:"4:54 AM", iftar:"6:07 PM" },
  { day:23,  md:"03-13", suhur:"4:53 AM", iftar:"6:08 PM" },
  { day:24,  md:"03-14", suhur:"4:52 AM", iftar:"6:08 PM" },
  { day:25,  md:"03-15", suhur:"4:51 AM", iftar:"6:09 PM" },
  { day:26,  md:"03-16", suhur:"4:50 AM", iftar:"6:09 PM" },
  { day:27,  md:"03-17", suhur:"4:49 AM", iftar:"6:09 PM" },
  { day:28,  md:"03-18", suhur:"4:48 AM", iftar:"6:10 PM" },
  { day:29,  md:"03-19", suhur:"4:47 AM", iftar:"6:10 PM" },
  { day:30,  md:"03-20", suhur:"4:46 AM", iftar:"6:11 PM" },
];

function mdKey(d){
  const mm = String(d.getMonth()+1).padStart(2,"0");
  const dd = String(d.getDate()).padStart(2,"0");
  return `${mm}-${dd}`;
}
function entryForDate(d){
  const key = mdKey(d);
  return RAMADAN_SCHEDULE.find(x => x.md === key) || null;
}

/* ACTIVE RAMADAN ENTRY (rollover after Suhur Ends) */
function getActiveEntry(now){
  const today = dateOnly(now);
  const todayEntry = entryForDate(today);
  if(!todayEntry) return null;

  const suhurEndToday = atTime(today, todayEntry.suhur);

  if(now < suhurEndToday){
    const y = new Date(today); y.setDate(y.getDate()-1);
    return entryForDate(y) || todayEntry;
  }
  return todayEntry;
}

/* RAMADAN PILL */
function renderRamadanPill(){
  const now = dhakaNowBD();
  const niceDate = now.toLocaleDateString("en-US",{ month:"short", day:"numeric", year:"numeric" });

  const e = getActiveEntry(now);
  const t1 = document.getElementById("ramadanDayText");
  const t2 = document.getElementById("ramadanDateText");

  if (t1) t1.textContent = e ? `Ramadan Day ${e.day}` : `Ramadan Day —`;
  if (t2) t2.textContent = niceDate;
}

/* SEHRI + IFTAR PILLS */
function updateRamadanTimes(){
  const now = dhakaNowBD();
  const today = dateOnly(now);

  const todayEntry = entryForDate(today);
  if(!todayEntry) return;

  const suhurEndToday = atTime(today, todayEntry.suhur);
  const iftarToday    = atTime(today, todayEntry.iftar);

  const sehriEl = document.getElementById("sehriTime");
  if(sehriEl){
    if(now < suhurEndToday) sehriEl.textContent = msToHHMMSS(suhurEndToday - now);
    else sehriEl.textContent = `Last: ${formatClock(suhurEndToday)}`;
  }

  const iftarEl = document.getElementById("iftarTime");
  if(iftarEl){
    let nextIftar = iftarToday;
    if(now > iftarToday){
      const tmr = new Date(today); tmr.setDate(tmr.getDate()+1);
      const tmrEntry = entryForDate(tmr);
      if(tmrEntry) nextIftar = atTime(tmr, tmrEntry.iftar);
      else nextIftar = new Date(iftarToday.getTime() + 86400000);
    }
    iftarEl.textContent = msToHHMMSS(nextIftar - now);
  }
}

/* ===========================
   TARC DAYS TRACKER
   =========================== */
const TARC_START_DATE = "2026-01-30"; // change this

function dhakaNowDateOnly(){
  const now = new Date(new Date().toLocaleString("en-US",{ timeZone:"Asia/Dhaka" }));
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function daysSince(dateStr){
  const start = new Date(dateStr + "T00:00:00");
  const today = dhakaNowDateOnly();
  const startLocal = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const diff = today - startLocal;
  return Math.max(0, Math.floor(diff / 86400000));
}

function renderTarcDays(){
  const days = daysSince(TARC_START_DATE);
  const v2 = document.getElementById("tarcDaysValue2");
  if (v2) v2.textContent = `${days}`;
  const top = document.querySelector(".tarcBadgeTop");
  if(top) top.textContent = "Days at TARC";
}

/* ===========================
   Mascot Blink
   =========================== */
function startMascotBlink(){
  const img = document.querySelector(".mascot-img");
  if(!img) return;

  const loop = () => {
    img.classList.add("mascot-blink");
    setTimeout(()=> img.classList.remove("mascot-blink"), 180);
    const next = 6000 + Math.random()*3000; // 6–9s
    setTimeout(loop, next);
  };

  setTimeout(loop, 4000);
}

/* ===========================
   SPOTIFY CARD
   =========================== */
const SPOTIFY_URL = "https://open.spotify.com/playlist/34dbPO6dFk4vrt20Lg0UNB?si=1391b5dee7884173";

function isLocked() {
  const now = dhakaNowBD();
  const today = dateOnly(now);
  const e = entryForDate(today);
  if(!e) return false;

  const suhurEnd = atTime(today, e.suhur);
  const iftar    = atTime(today, e.iftar);

  return now >= suhurEnd && now < iftar;
}

function msUntilIftar(){
  const now = dhakaNowBD();
  const today = dateOnly(now);
  const e = entryForDate(today);
  if(!e) return 0;

  const iftar = atTime(today, e.iftar);
  return Math.max(0, iftar - now);
}

function openSpotify() {
  if (isLocked()) return;
  window.open(SPOTIFY_URL, "_blank", "noopener,noreferrer");
}

function buildSpBars() {
  const el = document.getElementById("spBars");
  if (!el) return;
  const hs = [40,70,55,90,65,80,50,75,60,85,45,70];
  el.innerHTML = hs.map((h) => {
    const dl = (Math.random() * .6).toFixed(2);
    const dr = (.35 + Math.random() * .55).toFixed(2);
    return `<div class="sp-bar" style="height:${h}%;--d:${dr}s;--dl:${dl}s;"></div>`;
  }).join('');
}

function buildSpWaveBg() {
  const el = document.getElementById("spWaveBg");
  if (!el) return;
  el.innerHTML = Array.from({length:48}, (_,i) => {
    const h = 20 + Math.sin(i * .35) * 30 + Math.random() * 30;
    const dl = (Math.random() * 1.2).toFixed(2);
    const dr = (.4 + Math.random() * .8).toFixed(2);
    return `<div class="sp-wbar" style="height:${h.toFixed(0)}%;--d:${dr}s;--dl:${dl}s;"></div>`;
  }).join('');
}

function updateLockUI() {
  const overlay = document.getElementById("spLockOverlay");
  const cta     = document.getElementById("spCta");
  const card    = document.getElementById("spCard");
  const cdEl    = document.getElementById("spLockCountdown");

  if (!overlay || !card) return;

  if (isLocked()) {
    overlay.classList.remove("hidden");
    card.style.cursor = "not-allowed";
    if (cta) { cta.style.opacity = ".35"; cta.style.pointerEvents = "none"; }

    const ms = msUntilIftar();
    const s  = Math.floor(ms / 1000);
    const hh = String(Math.floor(s / 3600)).padStart(2,"0");
    const mm = String(Math.floor((s % 3600) / 60)).padStart(2,"0");
    const ss = String(s % 60).padStart(2,"0");
    if (cdEl) cdEl.textContent = `${hh}:${mm}:${ss}`;
  } else {
    overlay.classList.add("hidden");
    card.style.cursor = "pointer";
    if (cta) { cta.style.opacity = ""; cta.style.pointerEvents = ""; }
  }
}

/* ===========================
   AYAT JAR APP
   =========================== */
(() => {
  const MOOD_META = {
    Sad:        { emoji: "😢" },
    Anxious:    { emoji: "😰" },
    Happy:      { emoji: "😊" },
    Grateful:   { emoji: "🤲" },
    Stressed:   { emoji: "😤" },
    "Study[EMB]": { emoji: "📖" },
  };

  const MOODS = {
    Sad: [
      "94:5","94:6","39:53","2:286","12:86","3:139","2:153","65:7",
      "9:40","13:28","57:23","93:3","93:4","93:5","21:83","21:84",
      "2:214","29:69","8:66","41:30","46:13","39:10","10:62","10:63",
      "16:127","18:6","26:62","2:155","2:156","2:157"
    ],
    Anxious: [
      "3:173","9:51","20:46","5:23","33:3","2:250","8:2","48:4",
      "14:12","2:214","8:46","4:81","65:3","3:160","64:11","12:87",
      "20:25","20:26","20:27","20:28","7:89","3:200","2:45"
    ],
    Happy: [
      "10:58","16:97","13:29","93:5","93:11","76:8","87:14","9:71",
      "41:30","16:32","30:15","52:17","76:11","76:12","3:170",
      "39:73","2:25","4:57","18:107","83:22"
    ],
    Grateful: [
      "14:7","2:152","16:114","31:12","55:13","27:19","2:172",
      "7:10","17:66","34:13","76:9","39:66","28:73","30:46",
      "2:243","16:18","4:147","14:34"
    ],
    Stressed: [
      "2:45","2:155","29:2","65:2","65:3","3:159","8:11",
      "16:97","9:40","94:7","94:8","73:20","73:8","20:130",
      "2:286","2:153","13:28","3:200"
    ],
    "Study[EMB]": [
      "20:114","58:11","96:1","96:2","96:3","96:4","96:5",
      "39:9","2:269","35:28","3:7","17:36","16:43","21:7",
      "29:43","12:2","55:1","55:2","55:3","55:4"
    ],
  };

  const arabicEl  = document.getElementById("arabic");
  const transEl   = document.getElementById("trans");
  const refChip   = document.getElementById("refChip");
  const cacheChip = document.getElementById("cacheChip");
  const pillMood  = document.getElementById("pillMood");
  const pillIdx   = document.getElementById("pillIdx");
  const pillRef   = document.getElementById("pillRef");
  const pillMode  = document.getElementById("pillMode");
  const dot       = document.getElementById("dot");
  const hint      = document.getElementById("hint");
  const moodGrid  = document.getElementById("moodGrid");
  const sw        = document.getElementById("sw");
  const swLabel   = document.getElementById("swLabel");
  const toast     = document.getElementById("toast");

  const LS_KEY = "ramadan_ayat_jar_v2";
  const defaults = { mood:"Sad", shuffleOn:false, orderByMood:{}, idxByMood:{} };
  let state = loadState();
  const cache = new Map();

  function loadState(){
    try {
      const r = localStorage.getItem(LS_KEY);
      return r ? {...structuredClone(defaults),...JSON.parse(r)} : structuredClone(defaults);
    } catch {
      return structuredClone(defaults);
    }
  }
  function save(){ localStorage.setItem(LS_KEY, JSON.stringify(state)); }

  function shuffle(arr){
    const a=[...arr];
    for(let i=a.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [a[i],a[j]]=[a[j],a[i]];
    }
    return a;
  }

  function ensure(m){
    if(!state.orderByMood[m]) state.orderByMood[m] = MOODS[m].slice();
    if(state.idxByMood[m]==null) state.idxByMood[m] = 0;
  }
  function curOrder(){ ensure(state.mood); return state.orderByMood[state.mood]; }
  function curIdx()  { ensure(state.mood); return state.idxByMood[state.mood]; }

  function toast_(msg){
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(()=>toast.classList.remove("show"),1300);
  }

  function setLoading(yes, msg){
    dot.className="dot "+(yes?"wait":"ok");
    hint.textContent = msg || (yes?"Fetching ayah…":"Ready");
  }
  function setErr(msg){
    dot.className="dot bad";
    hint.textContent = msg || "Error";
  }

  function animVerse(){
    arabicEl.classList.remove("fadeIn"); transEl.classList.remove("fadeIn");
    void arabicEl.offsetWidth;
    arabicEl.classList.add("fadeIn"); transEl.classList.add("fadeIn");
  }

  async function fetchAyah(ref){
    const url = `https://api.alquran.cloud/v1/ayah/${encodeURIComponent(ref)}/editions/quran-uthmani,en.sahih`;
    const res = await fetch(url,{cache:"force-cache"});
    if(!res.ok) throw new Error("Network error");
    const j = await res.json();
    if(j.status!=="OK") throw new Error("Bad response");
    const [ar,en] = j.data;
    return { ref, arabic:ar.text, english:en.text, surahName:en.surah?.englishName||ar.surah?.englishName||"", ayahNum:en.numberInSurah??ar.numberInSurah??"" };
  }
  async function getAyah(ref){
    if(cache.has(ref)) return {...cache.get(ref), fromCache:true};
    const d = await fetchAyah(ref); cache.set(ref,d);
    return {...d, fromCache:false};
  }

  function renderMoods(){
    moodGrid.innerHTML="";
    Object.keys(MOODS).forEach(m=>{
      const b = document.createElement("button");
      b.className="mood-btn"+(m===state.mood?" active":"");
      const meta = MOOD_META[m]||{emoji:"✦"};
      b.innerHTML=`<span class="mood-emoji">${meta.emoji}</span><span class="mood-name">${m}</span><span class="mood-count">${MOODS[m].length} ayat</span>`;
      b.addEventListener("click",()=>setMood(m));
      moodGrid.appendChild(b);
    });
  }

  function renderHeader(){
    const ord=curOrder(), idx=curIdx(), ref=ord[idx];
    pillMood.textContent=`Mood: ${state.mood}`;
    pillIdx.textContent =`Ayah ${idx+1} / ${ord.length}`;
    pillRef.textContent  = ref ? `Ref: ${ref.replace(":"," • ")}` : "Ref: —";
    pillMode.textContent =`Mode: ${state.shuffleOn?"Shuffled":"Ordered"}`;
  }

  async function loadCurrent(){
    renderHeader();
    const ord=curOrder(), idx=curIdx(), ref=ord[idx];
    if(!ref){ arabicEl.textContent="—"; transEl.textContent="No ayah found."; return; }
    setLoading(true,"Fetching ayah…");
    refChip.textContent=`Ref: ${ref}`; cacheChip.textContent="Cache: —";
    arabicEl.textContent="…"; transEl.textContent="…";
    try{
      const d = await getAyah(ref);
      arabicEl.textContent=d.arabic; transEl.textContent=d.english;
      refChip.textContent=`Surah ${d.surahName} • Ayah ${d.ayahNum} • (${ref})`;
      cacheChip.textContent=`Cache: ${d.fromCache?"Hit":"Miss"}`;
      setLoading(false,d.fromCache?"Loaded from cache":"Loaded fresh");
      animVerse();
    }catch{
      setErr("Couldn't fetch — check internet & retry.");
      arabicEl.textContent="⚠️ Offline / Fetch failed";
      transEl.textContent="Reconnect and press Next.";
    }
  }

  function setMood(m){
    setMascotAura(m);
    state.mood=m; ensure(m);
    if(!state.shuffleOn){ state.orderByMood[m]=MOODS[m].slice(); state.idxByMood[m]=0; }
    save(); renderMoods(); renderHeader(); loadCurrent();
  }

  function setShuffle(on){
    state.shuffleOn=on; save();
    sw.classList.toggle("on",on);
    sw.setAttribute("aria-checked",String(on));
    swLabel.textContent=`Shuffle: ${on?"ON":"OFF"}`;
    pillMode.textContent=`Mode: ${on?"Shuffled":"Ordered"}`;

    const m=state.mood; const oldRef=curOrder()[curIdx()];
    if(!on){
      state.orderByMood[m]=MOODS[m].slice();
      state.idxByMood[m]=Math.max(0,state.orderByMood[m].indexOf(oldRef));
    } else {
      const sh=shuffle(MOODS[m]); const idx=state.idxByMood[m]??0; const ref=MOODS[m][idx]||MOODS[m][0];
      const without=sh.filter(x=>x!==ref); without.splice(idx,0,ref);
      state.orderByMood[m]=without;
    }
    save(); renderHeader(); loadCurrent();
  }

  function manualShuffle(){
    const m=state.mood; state.orderByMood[m]=shuffle(MOODS[m]); state.idxByMood[m]=0;
    save(); renderHeader(); loadCurrent(); toast_("Shuffled! ✨");
  }

  function nextAyah(){
    const m=state.mood; ensure(m);
    state.idxByMood[m]=(curIdx()+1)%curOrder().length;
    save(); loadCurrent();
  }

  async function copyAyah(){
    const ref=curOrder()[curIdx()]||"";
    const ar=arabicEl.textContent?.trim()||"";
    const en=transEl.textContent?.trim()||"";
    const text=`${ref}\n\n${ar}\n\n${en}\n\n— Ramadan Ayat Jar`;
    try{ await navigator.clipboard.writeText(text); }
    catch{
      const ta=document.createElement("textarea");
      ta.value=text; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
    }
    toast_("Copied to clipboard ✦");
  }

  document.getElementById("btnNext").addEventListener("click",nextAyah);
  document.getElementById("btnShuffle").addEventListener("click",manualShuffle);
  document.getElementById("btnCopy").addEventListener("click",copyAyah);

  function toggleSh(){ setShuffle(!state.shuffleOn); }
  sw.addEventListener("click",toggleSh);
  sw.addEventListener("keydown",e=>{ if(e.key==="Enter"||e.key===" "){e.preventDefault();toggleSh();} });

  // Mascot move/tilt
  (() => {
    const shell = document.querySelector(".mascot-shell");
    const frame = document.querySelector(".mascot-frame");
    if(!shell || !frame) return;

    const MAX = 10;
    function apply(x,y){
      frame.style.transform = `perspective(320px) rotateX(${(-y*MAX).toFixed(2)}deg) rotateY(${(x*MAX).toFixed(2)}deg) scale(1.03)`;
    }
    function reset(){ frame.style.transform = ""; }

    shell.addEventListener("pointermove", e => {
      const r = shell.getBoundingClientRect();
      const nx = ((e.clientX-r.left)/r.width - .5) * 2;
      const ny = ((e.clientY-r.top)/r.height - .5) * 2;
      apply(Math.max(-1,Math.min(1,nx)), Math.max(-1,Math.min(1,ny)));
    });
    shell.addEventListener("pointerleave", reset);
    shell.addEventListener("pointerup", reset);
  })();

  Object.keys(MOODS).forEach(m=>ensure(m));
  if(!MOODS[state.mood]) state.mood = "Sad";
  setShuffle(!!state.shuffleOn);
  renderMoods(); renderHeader(); loadCurrent();
  setMascotAura(state.mood);
})();

/* ===========================
   INIT
   =========================== */
window.addEventListener("DOMContentLoaded", () => {
  renderTarcDays();
  setInterval(renderTarcDays, 60_000);

  renderRamadanPill();
  updateRamadanTimes();
  setInterval(renderRamadanPill, 60_000);
  setInterval(updateRamadanTimes, 1000);

  buildSpBars();
  buildSpWaveBg();
  updateLockUI();
  setInterval(updateLockUI, 1000);

  startShootingStars();
  startTimeBackground();

  // NOTE: These were in your original init, but I didn't see their function bodies in the pasted code:
  // startTasbeeh();
  // If you have them elsewhere, keep them here.
  startMascotBlink();
});

/* =====================================================================
   Under Djurgårdsbron – gemensam telefonmotor för alla telefoner i dju/.
   Innehållet (sms, samtal, appar) ligger i respektive telefons index.html
   i objektet PHONE. Den här filen ritar bara upp det.
   ===================================================================== */
(function () {
const P = window.PHONE;

/* ---------- Ikoner (egna, ritade för spelet) ---------- */
const ICONS = {
  social: `<svg viewBox="0 0 60 60"><defs><linearGradient id="gs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4f8df5"/><stop offset="1" stop-color="#2459c9"/></linearGradient></defs><rect width="60" height="60" fill="url(#gs)"/><circle cx="23" cy="23" r="7" fill="#fff"/><path d="M9 45c0-8 6-12 14-12s14 4 14 12z" fill="#fff"/><circle cx="41" cy="25" r="5.5" fill="#fff" opacity=".75"/><path d="M38 34.5c7-1 14 2.5 14 10.500H40c0-4-.5-7.500-2-10.500z" fill="#fff" opacity=".75"/></svg>`,
  flow: `<svg viewBox="0 0 60 60"><defs><linearGradient id="gf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b05ad8"/><stop offset="1" stop-color="#e2557f"/></linearGradient></defs><rect width="60" height="60" fill="url(#gf)"/><rect x="12" y="14" width="28" height="28" rx="4" fill="#fff" opacity=".55" transform="rotate(-8 26 28)"/><rect x="20" y="18" width="28" height="28" rx="4" fill="#fff"/><path d="M23 42l8-10 6 6 4-4 5 8z" fill="#b05ad8"/><circle cx="41" cy="26" r="3" fill="#e2557f"/></svg>`,
  calendar: `<svg viewBox="0 0 60 60"><rect width="60" height="60" fill="#fff"/><rect width="60" height="17" fill="#e5372b"/><text x="30" y="12.5" text-anchor="middle" font-family="-apple-system,Helvetica,Arial,sans-serif" font-size="10" font-weight="700" fill="#fff" letter-spacing=".6">${P.month}</text><text x="30" y="47" text-anchor="middle" font-family="-apple-system,Helvetica,Arial,sans-serif" font-size="30" font-weight="300" fill="#1c1c1e">${P.day}</text></svg>`,
  notes: `<svg viewBox="0 0 60 60"><rect width="60" height="60" fill="#f6e7b4"/><g stroke="#c9b371" stroke-width="2" stroke-linecap="round"><path d="M13 20h24M13 29h20M13 38h14"/></g><path d="M44 14l6 6-17 17-8 2 2-8z" fill="#e8963a"/><path d="M27 31l6 6-8 2z" fill="#4a3a2a"/></svg>`,
  photos: `<svg viewBox="0 0 60 60"><defs><linearGradient id="gp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd3f4"/><stop offset="1" stop-color="#d6f0fb"/></linearGradient></defs><rect width="60" height="60" fill="url(#gp)"/><circle cx="43" cy="17" r="6.5" fill="#ffd34d"/><path d="M0 46l17-19 13 14 9-8 21 19v8H0z" fill="#3fa46a"/><path d="M0 52l17-13 13 9 9-5 21 11v6H0z" fill="#2c7d50"/></svg>`,
  mail: `<svg viewBox="0 0 60 60"><rect width="60" height="60" fill="#fff"/><rect x="11" y="17" width="38" height="27" rx="4" fill="none" stroke="#d8402f" stroke-width="3.4"/><path d="M12.5 20l17.500 13 17.500-13" fill="none" stroke="#d8402f" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  weather: `<svg viewBox="0 0 60 60"><defs><linearGradient id="gw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f7fe0"/><stop offset="1" stop-color="#7fc1f5"/></linearGradient></defs><rect width="60" height="60" fill="url(#gw)"/><circle cx="24" cy="23" r="9" fill="#ffd34d"/><path d="M22 44a8 8 0 01.8-16 10.500 10.500 0 0120 2.500A7 7 0 0142 44z" fill="#fff"/></svg>`,
  maps: `<svg viewBox="0 0 60 60"><rect width="60" height="60" fill="#e9efdc"/><path d="M0 40l60-22v10L0 50z" fill="#fff"/><path d="M18 0h9l14 60h-9z" fill="#fff"/><path d="M0 0h14l-6 22H0z" fill="#bfe3b0"/><path d="M46 38h14v22H50z" fill="#a9d4f2"/><path d="M38 9a9 9 0 019 9c0 7-9 16-9 16s-9-9-9-16a9 9 0 019-9z" fill="#e5372b"/><circle cx="38" cy="18" r="3.4" fill="#fff"/></svg>`,
  music: `<svg viewBox="0 0 60 60"><defs><linearGradient id="gu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff6a7f"/><stop offset="1" stop-color="#e02a4f"/></linearGradient></defs><rect width="60" height="60" fill="url(#gu)"/><path d="M25 16l20-4v25a6 6 0 11-4-5.600V20l-12 2.400V41a6 6 0 11-4-5.600z" fill="#fff"/></svg>`,
  camera: `<svg viewBox="0 0 60 60"><rect width="60" height="60" fill="#d9d9de"/><path d="M14 21h8l3-4h10l3 4h8a3 3 0 013 3v17a3 3 0 01-3 3H14a3 3 0 01-3-3V24a3 3 0 013-3z" fill="#3a3a40"/><circle cx="30" cy="32" r="8" fill="#d9d9de"/><circle cx="30" cy="32" r="5" fill="#3a3a40"/></svg>`,
  clock: `<svg viewBox="0 0 60 60"><rect width="60" height="60" fill="#111113"/><circle cx="30" cy="30" r="20" fill="#fff"/><path d="M30 16v14l9 6" fill="none" stroke="#111113" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="30" cy="30" r="2.2" fill="#e5372b"/></svg>`,
  settings: `<svg viewBox="0 0 60 60"><rect width="60" height="60" fill="#8e8e96"/><circle cx="30" cy="30" r="16" fill="none" stroke="#e9e9ee" stroke-width="7" stroke-dasharray="6.300 6.270"/><circle cx="30" cy="30" r="12" fill="none" stroke="#e9e9ee" stroke-width="5"/><circle cx="30" cy="30" r="4" fill="#e9e9ee"/></svg>`,
  reminders: `<svg viewBox="0 0 60 60"><rect width="60" height="60" fill="#fff"/><circle cx="16" cy="18" r="4.500" fill="#0a7cff"/><circle cx="16" cy="30" r="4.500" fill="#e5372b"/><circle cx="16" cy="42" r="4.500" fill="#f0972b"/><g stroke="#c4c4ca" stroke-width="2.600" stroke-linecap="round"><path d="M26 18h22M26 30h22M26 42h22"/></g></svg>`,
  transit: `<svg viewBox="0 0 60 60"><rect width="60" height="60" fill="#1466b8"/><rect x="15" y="11" width="30" height="34" rx="6" fill="#fff"/><rect x="19" y="16" width="22" height="13" rx="2" fill="#1466b8"/><circle cx="21.500" cy="37" r="2.600" fill="#1466b8"/><circle cx="38.500" cy="37" r="2.600" fill="#1466b8"/><rect x="18" y="45" width="6" height="5" rx="1.500" fill="#fff"/><rect x="36" y="45" width="6" height="5" rx="1.500" fill="#fff"/></svg>`,
  memos: `<svg viewBox="0 0 60 60"><defs><linearGradient id="gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3a42"/><stop offset="1" stop-color="#17171b"/></linearGradient></defs><rect width="60" height="60" fill="url(#gr)"/><rect x="24" y="11" width="12" height="23" rx="6" fill="#fff"/><path d="M18 28a12 12 0 0024 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M30 40v7M23 48h14" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="46" cy="14" r="4" fill="#ef4136"/></svg>`,
  phone: `<svg viewBox="0 0 60 60"><defs><linearGradient id="gt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5fd66f"/><stop offset="1" stop-color="#27ad45"/></linearGradient></defs><rect width="60" height="60" fill="url(#gt)"/><g transform="translate(12 12) scale(1.5)"><path fill="#fff" d="M6.620 10.790c1.440 2.830 3.760 5.140 6.590 6.590l2.200-2.200c.27-.27.67-.36 1.020-.24 1.120.37 2.330.57 3.570.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.390 0-17-7.610-17-17 0-.55.45-1 1-1h3.500c.55 0 1 .45 1 1 0 1.250.2 2.450.57 3.570.11.35.03.74-.25 1.020l-2.200 2.200z"/></g></svg>`,
  messages: `<svg viewBox="0 0 60 60"><defs><linearGradient id="gm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#59cfa0"/><stop offset="1" stop-color="#1f9d7a"/></linearGradient></defs><rect width="60" height="60" fill="url(#gm)"/><path d="M14 15h32a5 5 0 015 5v17a5 5 0 01-5 5H28l-10 8v-8h-4a5 5 0 01-5-5V20a5 5 0 015-5z" fill="#fff"/><g fill="#1f9d7a"><circle cx="21" cy="28.500" r="2.600"/><circle cx="30" cy="28.500" r="2.600"/><circle cx="39" cy="28.500" r="2.600"/></g></svg>`
};

const BACK = `<svg viewBox="0 0 12 20"><path d="M10 2L2 10l8 8" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/* ---------- Stomme ---------- */
document.body.innerHTML = `
<div id="stage"><div id="phone"><div id="screen">
  <div class="statusbar">
    <span id="clock"></span>
    <span class="right">
      <svg width="18" height="12" viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx=".8"/><rect x="5" y="5.500" width="3" height="6.500" rx=".8"/><rect x="10" y="3" width="3" height="9" rx=".8"/><rect x="15" y="0" width="3" height="12" rx=".8"/></svg>
      <svg width="27" height="13" viewBox="0 0 27 13"><rect x=".5" y=".5" width="22" height="12" rx="3.500" fill="none" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="12.500" height="9" rx="2"/><path d="M24 4.300v4.400c.9-.3 1.500-1.200 1.500-2.200s-.6-1.900-1.500-2.200z" opacity=".45"/></svg>
    </span>
  </div>

  <div id="home"><div class="grid" id="grid"></div><div class="dock" id="dock"></div></div>

  <div class="app" id="app-messages">
    <div class="view"><div class="top"><h1 class="large">Meddelanden</h1></div><div class="scroll" id="threads"></div></div>
    <div class="view sub" id="chatview">
      <div class="chat-head"><button class="back" data-back aria-label="Tillbaka">${BACK}</button><div class="avatar" id="chat-avatar"></div><div class="who" id="chat-name"></div></div>
      <div class="scroll"><div class="chat" id="chat"></div></div>
      <div class="composer"><span class="plus">+</span><span class="field">Sms</span></div>
    </div>
  </div>

  <div class="app" id="app-phone">
    <div class="view"><div class="top"><h1 class="large">Senaste</h1></div><div class="scroll" id="calls"></div></div>
  </div>

  <div class="app" id="app-memos">
    <div class="view"><div class="top"><h1 class="large">Röstmemon</h1></div><div class="scroll" id="memos"></div></div>
  </div>

  <div class="app" id="app-reminders">
    <div class="view"><div class="top"><h1 class="large rem-title">Påminnelser</h1></div><div class="scroll" id="reminders"></div></div>
  </div>

  <div class="app" id="app-ticket">
    <div class="view tick-bg"><div class="top"><h1 class="large">Biljetter</h1></div><div class="scroll" id="tickets"></div></div>
  </div>
</div>
<div id="chin"><button id="homebtn" aria-label="Hem"><i></i></button></div>
</div></div>`;

/* ---------- Logik ---------- */
const $ = (s, r = document) => r.querySelector(s);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const esc = s => String(s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
const phone = $("#phone");

$("#clock").textContent = P.time;

function fit() {
  if (window.innerWidth >= 520) {
    const s = Math.min(1, (window.innerHeight - 48) / 844, (window.innerWidth - 48) / 390);
    phone.style.transform = `scale(${s})`;
  } else phone.style.transform = "";
}
addEventListener("resize", fit); fit();

// ---- Hemskärm ----
function addApps(target, list) {
  (list || []).forEach(a => {
    const b = el("button", "app-btn", `<span class="icon">${ICONS[a.icon]}</span><span class="label">${esc(a.label)}</span>`);
    b.setAttribute("aria-label", a.label);
    b.addEventListener("click", () => {
      if (a.open) return openApp(a.open);
      b.classList.remove("shake"); void b.offsetWidth; b.classList.add("shake");
    });
    target.appendChild(b);
  });
}
addApps($("#grid"), P.home);
addApps($("#dock"), P.dock);

function closeAll() {
  stopMemo();
  document.querySelectorAll(".app").forEach(a => a.classList.remove("open"));
  document.querySelectorAll(".view.sub").forEach(v => v.classList.remove("show"));
}
function openApp(id) { closeAll(); $("#app-" + id).classList.add("open"); phone.classList.add("in-app", "light"); }
function goHome() { closeAll(); phone.classList.remove("in-app", "light"); }
$("#homebtn").addEventListener("click", goHome);
document.querySelectorAll("[data-back]").forEach(b => b.addEventListener("click", () => b.closest(".view").classList.remove("show")));

// ---- Meddelanden ----
const initial = n => n.trim()[0].toUpperCase();
(P.threads || []).forEach(t => {
  const msgs = t.days.flatMap(d => d.msgs), last = msgs[msgs.length - 1];
  const b = el("button", "thread",
    `<span class="avatar">${initial(t.name)}</span>
     <span class="body"><span class="row"><span class="name">${esc(t.name)}</span><span class="when">${t.listWhen ? esc(t.listWhen) + " " : ""}›</span></span>
     <span class="preview">${esc(last.text)}</span></span>`);
  b.addEventListener("click", () => openThread(t));
  $("#threads").appendChild(b);
});
function openThread(t) {
  $("#chat-avatar").textContent = initial(t.name);
  $("#chat-name").textContent = t.name;
  const chat = $("#chat"); chat.innerHTML = "";
  t.days.forEach(d => {
    if (d.date) chat.appendChild(el("div", "day", esc(d.date)));
    d.msgs.forEach(m => {
      chat.appendChild(el("div", "msg " + (m.from === P.me ? "out" : "in"),
        `<div class="bubble">${esc(m.text)}</div>` + (m.time ? `<div class="time">${esc(m.time)}</div>` : "")));
    });
  });
  $("#chatview").classList.add("show");
  const sc = chat.parentElement; requestAnimationFrame(() => sc.scrollTop = sc.scrollHeight);
}

// ---- Telefon ----
const calls = P.calls || [];
if (!calls.length) $("#calls").appendChild(el("div", "empty", "Inga senaste samtal"));
calls.forEach(c => {
  const missed = !c.length;
  const sub = missed ? "Missat samtal" + (c.count > 1 ? " ×" + c.count : "") : "Samtalslängd " + esc(c.length);
  const when = [c.date, c.time ? "kl. " + c.time : ""].filter(Boolean).map(esc).join("<br>");
  $("#calls").appendChild(el("div", "call" + (missed ? " missed" : ""),
    `<div class="inner"><div><div class="name">${esc(c.name)}</div><div class="sub">${sub}</div></div><div class="when">${when}</div></div>`));
});

// ---- Röstmemon ----
// memos: [{ title, date, time, length: "0:13", file: "ljud/inspelning-1.mp3" }]
const PLAY = `<svg viewBox="0 0 24 24"><path d="M7 4.500v15l13-7.500z" fill="currentColor"/></svg>`;
const PAUSE = `<svg viewBox="0 0 24 24"><rect x="6" y="4.500" width="4.500" height="15" rx="1" fill="currentColor"/><rect x="13.500" y="4.500" width="4.500" height="15" rx="1" fill="currentColor"/></svg>`;
const mmss = s => { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };
let memoAudio = null, memoRow = null;
function stopMemo() {
  if (memoAudio) { memoAudio.pause(); memoAudio.currentTime = 0; }
  if (memoRow) { memoRow.classList.remove("playing"); $(".m-play", memoRow).innerHTML = PLAY; }
}
(P.memos || []).forEach(m => {
  const row = el("div", "memo",
    `<button class="m-head"><span><span class="m-title">${esc(m.title)}</span><span class="m-sub">${esc([m.date, m.time].filter(Boolean).join("  "))}</span></span><span class="m-len">${esc(m.length || "")}</span></button>
     <div class="m-player"><div class="m-bar"><i></i></div><div class="m-times"><span class="m-cur">0:00</span><span class="m-rem"></span></div><button class="m-play" aria-label="Spela upp">${PLAY}</button></div>`);
  const fill = $(".m-bar i", row), cur = $(".m-cur", row), rem = $(".m-rem", row), btn = $(".m-play", row);
  let audio = null;
  const paint = () => {
    const d = audio && isFinite(audio.duration) ? audio.duration : 0, t = audio ? audio.currentTime : 0;
    fill.style.width = d ? (100 * t / d) + "%" : "0";
    cur.textContent = mmss(t); rem.textContent = d ? "-" + mmss(d - t) : (m.length ? "-" + m.length : "");
  };
  const load = () => {
    if (audio) return;
    audio = new Audio(m.file); audio.preload = "auto";
    audio.addEventListener("timeupdate", paint);
    audio.addEventListener("loadedmetadata", paint);
    audio.addEventListener("ended", () => { audio.currentTime = 0; row.classList.remove("playing"); btn.innerHTML = PLAY; paint(); });
  };
  $(".m-head", row).addEventListener("click", () => {
    const open = row.classList.contains("open");
    stopMemo();
    document.querySelectorAll(".memo.open").forEach(r => r.classList.remove("open"));
    if (!open) { row.classList.add("open"); load(); paint(); }
  });
  btn.addEventListener("click", () => {
    load();
    if (row.classList.contains("playing")) { audio.pause(); row.classList.remove("playing"); btn.innerHTML = PLAY; return; }
    if (memoRow && memoRow !== row) stopMemo();
    memoAudio = audio; memoRow = row;
    audio.play(); row.classList.add("playing"); btn.innerHTML = PAUSE;
  });
  $(".m-bar", row).addEventListener("click", e => {
    if (!audio || !isFinite(audio.duration)) return;
    const r = e.currentTarget.getBoundingClientRect();
    audio.currentTime = audio.duration * Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)); paint();
  });
  paint();
  $("#memos").appendChild(row);
});

// ---- Påminnelser ----
(P.reminders || []).forEach(r => {
  $("#reminders").appendChild(el("div", "rem",
    `<span class="ring"></span><div class="inner"><div class="what">${esc(r.text)}</div>${r.note ? `<div class="sub">${esc(r.note)}</div>` : ""}</div>`));
});

// ---- Biljetter ----
(P.tickets || []).forEach(t => {
  $("#tickets").appendChild(el("div", "ticket" + (t.expired ? " expired" : ""),
    `<div class="t-top"><span class="t-kind">${esc(t.kind)}</span><span class="t-badge">${esc(t.status)}</span></div>
     <div class="t-sub">${esc(t.detail)}</div>
     <div class="t-valid"><span>${t.expired ? "Gick ut" : "Giltig till"}</span><b>${esc(t.validTo)}</b></div>`));
});
})();

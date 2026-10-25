/* main.js — ส่วนทำงานของเว็บ (ปกติไม่ต้องแก้ไฟล์นี้ แก้ content.js แทน) */
(function () {
  "use strict";

  /* ---------- ข้อความบนเว็บ 2 ภาษา ---------- */
  var UI = {
    th: {
      "nav.works": "ผลงาน", "nav.archive": "คลังผลงาน", "nav.photos": "ภาพถ่าย", "nav.about": "เกี่ยวกับ", "nav.contact": "ติดต่อ",
      "hero.cta1": "ดูผลงาน", "hero.cta2": "จ้างงาน", "hero.down": "เลื่อนลง ↓",
      "works.eyebrow": "Selected work", "works.title": "ผลงาน", "works.all": "ทั้งหมด", "works.empty": "หมวดนี้กำลังจะมาเร็วๆ นี้", "works.featured": "ผลงานเด่น", "works.playlist": "ดูทั้งซีรีส์ Behind History", "works.playlistSub": "เปิดเพลย์ลิสต์บน YouTube", "archive.sub": "กดเพื่อดูได้เลย", "nav.freelance": "ฟรีแลนซ์",
      "archive.eyebrow": "Archive", "archive.title": "คลังผลงานทั้งหมด", "archive.more": "ดูเพิ่ม", "archive.empty": "หมวดนี้กำลังจะมาเร็วๆ นี้",
      "photos.eyebrow": "Photo", "photos.title": "Photo", "photos.sub": "แสงบนเวที เสียงกรี๊ด และวินาทีที่เกิดขึ้นครั้งเดียว",
      "photos.ph": "วางรูปที่", "photos.fav": "ภาพโปรด",
      "about.eyebrow": "About", "about.hi": "สวัสดี ผม", "about.tools": "เครื่องมือ", "about.exp": "ประสบการณ์",
      "contact.eyebrow": "Contact", "contact.title": "มีคลิปอยากให้ตัด?<br>คุยกันได้เลย", "contact.copy": "กดเพื่อคัดลอกอีเมล",
      "form.name": "ชื่อ", "form.email": "อีเมล", "form.msg": "รายละเอียดงาน", "form.send": "ส่งข้อความ",
      "form.sending": "กำลังส่ง…", "form.ok": "ส่งแล้ว ขอบคุณครับ จะติดต่อกลับเร็วที่สุด", "form.err": "ส่งไม่สำเร็จ ลองติดต่อช่องทางอื่นแทนนะครับ",
      "form.invalid": "กรุณากรอกข้อมูลให้ครบ และใส่อีเมลให้ถูกต้อง", "form.mailto": "กำลังเปิดแอปอีเมลของคุณ…",
      "copied": "คัดลอกอีเมลแล้ว", "toy.hint": "ลากเล่นได้", "footer.top": "กลับขึ้นบน ↑",
      "marquee": ["YouTube Content", "Reels", "Storytelling"],
      "error": "ไฟล์ content.js มีจุดพิมพ์ผิด ลองเปิดใน VS Code แล้วดูบรรทัดที่ขึ้นสีแดง (มักเป็นลืมเครื่องหมาย \" หรือ ,)"
    },
    en: {
      "nav.works": "Work", "nav.archive": "Archive", "nav.photos": "Photos", "nav.about": "About", "nav.contact": "Contact",
      "hero.cta1": "See my work", "hero.cta2": "Hire me", "hero.down": "Scroll ↓",
      "works.eyebrow": "Selected work", "works.title": "Work", "works.all": "All", "works.empty": "Coming soon", "works.featured": "Featured", "works.playlist": "Watch the full Behind History series", "works.playlistSub": "Open the playlist on YouTube", "archive.sub": "Tap to watch", "nav.freelance": "Freelance",
      "archive.eyebrow": "Archive", "archive.title": "Full archive", "archive.more": "Load more", "archive.empty": "Coming soon",
      "photos.eyebrow": "Photo", "photos.title": "Photo", "photos.sub": "Stage light, a roaring crowd, and moments that happen once.",
      "photos.ph": "Place photo at", "photos.fav": "Favorite shot",
      "about.eyebrow": "About", "about.hi": "Hi, I'm", "about.tools": "Tools", "about.exp": "Experience",
      "contact.eyebrow": "Contact", "contact.title": "Got footage to cut?<br>Let's talk.", "contact.copy": "Click to copy my email",
      "form.name": "Name", "form.email": "Email", "form.msg": "Project details", "form.send": "Send message",
      "form.sending": "Sending…", "form.ok": "Sent — thank you! I'll get back to you soon.", "form.err": "Couldn't send. Please use the links instead.",
      "form.invalid": "Please fill in every field with a valid email.", "form.mailto": "Opening your email app…",
      "copied": "Email copied", "toy.hint": "Drag me", "footer.top": "Back to top ↑",
      "marquee": ["YouTube Content", "Reels", "Storytelling"],
      "error": "content.js has a typo. Open it in VS Code and look for the line marked red (usually a missing \" or ,)."
    }
  };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  var SITE = window.SITE;
  var lang = store.get("lang") === "en" ? "en" : "th";
  if (!SITE || typeof SITE !== "object") {
    $("#errorBanner").textContent = UI[lang].error; $("#errorBanner").hidden = false; SITE = {};
  }
  var P = SITE.profile || {}, C = SITE.contact || {};

  function t(v) { if (v == null) return ""; if (typeof v === "string" || typeof v === "number") return String(v); return v[lang] || v.th || v.en || ""; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function arr(x) { return Array.isArray(x) ? x : []; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function parseVideo(link) {
    if (typeof link !== "string" || !link.trim()) return null;
    var m;
    if ((m = link.match(/(?:youtu\.be\/|v=|shorts\/|embed\/|live\/)([\w-]{11})/))) return { kind: "yt", id: m[1] };
    if ((m = link.match(/tiktok\.com\/.*?\/video\/(\d+)/))) return { kind: "tt", id: m[1] };
    return { kind: "link", url: link };
  }
  function epOf(s) { return ((s || "").match(/EP\.?\s*\d+/i) || [""])[0].replace(/\s+/g, ""); }
  var PLAY = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>';

  /* ---------- toast ---------- */
  var toastTimer;
  function toast(msg) {
    var el = $("#toast"); el.textContent = msg; el.classList.add("is-on");
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { el.classList.remove("is-on"); }, 1800);
  }

  /* ---------- คำที่สลับไปเรื่อยๆ ---------- */
  var roles = arr(P.roles).filter(Boolean);
  if (!roles.length) roles = [P.nickname || "VIDEO EDITOR"];
  var roleIdx = 0;
  $$("[data-rotator]").forEach(function (el) { el.textContent = roles[0]; });
  if (roles.length > 1 && !reduced) {
    setInterval(function () {
      roleIdx = (roleIdx + 1) % roles.length;
      $$("[data-rotator]").forEach(function (el) {
        el.classList.remove("is-in"); el.classList.add("is-out");
        setTimeout(function () { el.textContent = roles[roleIdx]; el.classList.remove("is-out"); el.classList.add("is-in"); }, 330);
      });
    }, 3800);  // สลับคำทุก 3.8 วิ (เดิม 2.6)
  }

  /* ---------- วิดีโอพื้นหลัง (ถ้าใส่ไว้ใน content.js) ---------- */
  if (SITE.heroVideo && !reduced) {
    var hv = $("#heroVideo"); hv.src = SITE.heroVideo; hv.hidden = false;
    hv.addEventListener("error", function () { hv.hidden = true; });
    var pp = hv.play && hv.play(); if (pp && pp.catch) pp.catch(function () {});
  }

  /* ---------- ตัวเลขนับขึ้น ---------- */
  /* ตัวเลขนับอัตโนมัติ: auto: "all" = ทุกหมวด, หรือระบุ id เช่น ["real","freelance"] (รวมผลงานเด่นด้วย) */
  /* ยอดวิวรวม (auto: "views") ดึงจาก YouTube API ทุกคลิปในเว็บ */
  var totalViews = null;
  try { var tv = JSON.parse(sessionStorage.getItem("ytTotal") || "null"); if (tv && tv.n) totalViews = tv.n; } catch (e) {}
  function compact(n) {
    var u = [[1e9, "B"], [1e6, "M"], [1e3, "K"]];
    for (var i = 0; i < u.length; i++) if (n >= u[i][0]) {
      var v = n / u[i][0], d = v < 10 ? 1 : 0;
      return { num: Math.floor(v * Math.pow(10, d)) / Math.pow(10, d), dec: d, unit: u[i][1] };
    }
    return { num: n, dec: 0, unit: "" };
  }
  function statValue(s) {
    if (s.auto === "views") return totalViews;
    if (!s.auto) return +s.value;
    var list = typeof groups !== "undefined" && groups ? groups : [], n = 0;
    list.forEach(function (g, k) {
      var want = [].concat(s.auto);
      if (want.indexOf("all") < 0 && want.indexOf(g.src.id) < 0) return;
      n += g.total + (k === 0 ? works.length : 0);
    });
    return n + (+s.add || 0);
  }
  function renderStats() {
    var stats = arr(SITE.stats).filter(function (s) {
      if (!s) return false;
      if (s.auto === "views") return totalViews != null || !isNaN(+s.value);
      return s.auto || !isNaN(+s.value);
    });
    var box = $("#stats");
    if (!stats.length) { box.hidden = true; return; }
    box.style.setProperty("--n", stats.length);
    var wasIn = !!$(".stat.is-in", box);
    box.innerHTML = stats.map(function (s) {
      var val = statValue(s), dec = 0, unit = "";
      if (s.auto === "views") { if (val == null) val = +s.value; var c = compact(val); val = c.num; dec = c.dec; unit = c.unit; }
      var shown = box.dataset.done && !(s.auto === "views" && !box.dataset.views) ? val.toFixed(dec) : 0;
      return '<div class="stat glass reveal"><span class="stat__num">' + (s.prefix ? "<small>" + esc(s.prefix) + "</small>" : "") +
        '<span data-count="' + val + '" data-dec="' + dec + '"' + (s.auto === "views" ? " data-views" : "") + ">" + shown + "</span>" +
        ((unit || s.suffix) ? "<small>" + esc(unit + (s.suffix || "")) + "</small>" : "") +
        '</span><span class="stat__label">' + esc(t(s.label)) + "</span></div>";
    }).join("");
    if (wasIn) $$(".stat", box).forEach(function (el) { el.classList.add("is-in"); });
    if (box.dataset.done && !box.dataset.views && $("[data-views]", box)) { box.dataset.views = "1"; animateCount($("[data-views]", box)); }
    if (!wasIn) observe($$(".reveal", box));
  }
  function animateCount(el) {
    var end = +el.dataset.count, dec = +el.dataset.dec || 0, start = performance.now(), dur = reduced ? 1 : 1600;
    (function step(now) {
      var p = clamp((now - start) / dur, 0, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = p < 1 ? (end * e).toFixed(dec) : end.toFixed(dec);
      if (p < 1) requestAnimationFrame(step);
    })(start);
  }
  function countUp() {
    var box = $("#stats"); if (box.dataset.done) return; box.dataset.done = "1";
    if ($("[data-views]", box)) box.dataset.views = "1";
    $$("[data-count]", box).forEach(animateCount);
  }
  /* รวมยอดวิว: ส่งทีละ 50 คลิป (ใช้โควตาน้อยมาก) เก็บไว้ในแท็บนี้ไม่ต้องดึงซ้ำ */
  var totalTimer = null;
  function loadTotalViews() {
    var key = SITE.youtubeApiKey;
    if (!key || !arr(SITE.stats).some(function (s) { return s && s.auto === "views"; })) return;
    clearTimeout(totalTimer);
    totalTimer = setTimeout(function () {
      var seen = {}, ids = [];
      works.forEach(function (x) { if (x.v.kind === "yt" && !seen[x.v.id]) { seen[x.v.id] = 1; ids.push(x.v.id); } });
      groups.forEach(function (g) { g.subs.forEach(function (sb) { sb.ids.forEach(function (it) { if (it.kind === "yt" && !seen[it.id]) { seen[it.id] = 1; ids.push(it.id); } }); }); });
      try { var c = JSON.parse(sessionStorage.getItem("ytTotal") || "null"); if (c && c.ids === ids.length) return; } catch (e) {}
      var batches = [];
      for (var i = 0; i < ids.length; i += 50) batches.push(ids.slice(i, i + 50));
      Promise.all(batches.map(function (b) {
        return fetch("https://www.googleapis.com/youtube/v3/videos?part=statistics&id=" + b.join(",") + "&key=" + encodeURIComponent(key))
          .then(function (r) { return r.json(); })
          .then(function (j) { return arr(j.items).reduce(function (n, it) { return n + (+(it.statistics || {}).viewCount || 0); }, 0); })
          .catch(function () { return 0; });
      })).then(function (parts) {
        var n = parts.reduce(function (a, b) { return a + b; }, 0);
        if (!n) return;
        totalViews = n;
        try { sessionStorage.setItem("ytTotal", JSON.stringify({ n: n, ids: ids.length })); } catch (e) {}
        renderStats();
      });
    }, 400);
  }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es, io) {
      es.forEach(function (en) { if (en.isIntersecting) { countUp(); io.disconnect(); } });
    }, { threshold: 0.4 }).observe($("#stats"));
  } else countUp();

  /* ---------- ผลงาน (การ์ดใหญ่ 1 + ตาราง) ---------- */
  var works = [];
  arr(SITE.works).forEach(function (w) {
    try { if (!w || typeof w !== "object") return; var v = parseVideo(w.link); if (v) works.push({ w: w, v: v, type: w.type === "reel" ? "reel" : "youtube" }); } catch (e) {}
  });
  var fIdx = works.findIndex(function (x) { return x.w.featured; });
  if (fIdx > 0) works.unshift(works.splice(fIdx, 1)[0]);
  var EYE = '<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>';
  function viewsHTML(v) {
    if (v == null || v === "") return "";
    var n = typeof v === "number" ? v : +String(v).replace(/[, ]/g, "");
    var txt = isNaN(n) ? String(v) : new Intl.NumberFormat(lang === "th" ? "th-TH" : "en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);
    return '<span class="views" aria-label="' + esc(txt) + ' views">' + EYE + esc(txt) + (lang === "en" ? " views" : " วิว") + "</span>";
  }
  /* ยอดวิวเรียลไทม์: ใช้ YouTube API ถ้าใส่รหัสไว้ ไม่งั้นใช้บริการฟรี (Return YouTube Dislike) · ดึงไม่ได้ = ใช้ตัวเลขใน content.js */
  var live = {};
  try { live = JSON.parse(sessionStorage.getItem("ytViews") || "{}") || {}; } catch (e) {}
  function viewsOf(x) { return x.v.kind === "yt" && live[x.v.id] != null ? live[x.v.id] : x.w.views; }
  function updateViews() {
    $$("#worksGrid .work").forEach(function (el) {
      var x = works[+el.dataset.i], meta = $(".work__meta", el); if (!x || !meta) return;
      var old = $(".views", meta); if (old) old.remove();
      meta.insertAdjacentHTML("beforeend", viewsHTML(viewsOf(x)));
    });
  }
  function loadLiveViews() {
    if (SITE.liveViews === false) return;
    var ids = works.filter(function (x) { return x.v.kind === "yt" && live[x.v.id] == null; }).map(function (x) { return x.v.id; });
    if (!ids.length) return;
    var save = function () { try { sessionStorage.setItem("ytViews", JSON.stringify(live)); } catch (e) {} updateViews(); };
    if (SITE.youtubeApiKey) {
      fetch("https://www.googleapis.com/youtube/v3/videos?part=statistics&id=" + ids.slice(0, 50).join(",") + "&key=" + encodeURIComponent(SITE.youtubeApiKey))
        .then(function (r) { return r.json(); })
        .then(function (j) { arr(j.items).forEach(function (it) { if (it.statistics) live[it.id] = +it.statistics.viewCount; }); save(); })
        .catch(function () {});
      return;
    }
    Promise.all(ids.map(function (id) {
      return fetch("https://returnyoutubedislikeapi.com/votes?videoId=" + id)
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) { if (j && j.viewCount != null) live[id] = +j.viewCount; })
        .catch(function () {});
    })).then(save);
  }
  var filter = "all";
  function renderWorks() {
    $("#worksGrid").innerHTML = works.map(function (x, i) {
      var feat = i === 0 && x.type === "youtube";
      var thumb = x.w.cover || (x.v.kind === "yt" ? "https://i.ytimg.com/vi/" + x.v.id + "/" + (feat ? "maxresdefault" : "hqdefault") + ".jpg" : "");
      return '<button type="button" class="work reveal' + (feat ? " work--featured" : "") + (x.type === "reel" ? " work--reel" : "") + '" data-i="' + i + '" data-type="' + x.type + '" aria-label="' + esc(t(x.w.title)) + '">' +
        (thumb ? '<img class="work__img" src="' + esc(thumb) + '" alt="" loading="lazy" data-yt="' + (x.v.kind === "yt" ? x.v.id : "") + '">' : "") +
        (feat ? '<span class="work__badge">' + esc(UI[lang]["works.featured"]) + "</span>" : "") +
        '<span class="work__info"><span class="work__text"><span class="work__title">' + esc(t(x.w.title)) + "</span>" +
        '<span class="work__meta"><span>' + esc([x.w.client, x.w.year].filter(Boolean).join(" · ")) + "</span>" + viewsHTML(viewsOf(x)) + "</span></span>" +
        '<span class="play">' + PLAY + "</span></span></button>";
    }).join("");
    $$("#worksGrid img[data-yt]").forEach(function (img) {
      var fb = "https://i.ytimg.com/vi/" + img.dataset.yt + "/hqdefault.jpg";
      img.addEventListener("load", function () { if (img.naturalWidth <= 120 && !img.dataset.fb) { img.dataset.fb = 1; img.src = fb; } });
      img.addEventListener("error", function () { if (!img.dataset.fb) { img.dataset.fb = 1; img.src = fb; } else img.style.visibility = "hidden"; });
    });
    $("#worksEmpty").hidden = works.length > 0;
    observe($$("#worksGrid .reveal"));
  }
  $("#worksGrid").addEventListener("click", function (e) {
    var c = e.target.closest(".work"); if (!c) return;
    var x = works[+c.dataset.i]; openPlayer(x.w.link, t(x.w.title), x.type === "reel");
  });

  /* ---------- ชื่อใหญ่หดไปเกาะแถบข้าง ---------- */
  var heroTitle = $("#heroTitle");
  var hasSide = SITE.sidebar === true;
  document.body.classList.toggle("has-side", hasSide);
  function updateDock() {
    var h = window.innerHeight, p = clamp(window.scrollY / (h * 0.75), 0, 1);
    var wide = hasSide && window.innerWidth >= 1200;
    document.body.classList.toggle("is-scrolled", window.scrollY > 40);
    if (!reduced) {
      if (wide) {
        var dx = window.innerWidth * 0.36, dy = -h * 0.42, s = 1 - 0.72 * p;
        heroTitle.style.transform = "translate3d(" + (dx * p) + "px," + (dy * p) + "px,0) scale(" + s + ")";
        heroTitle.style.opacity = String(p < 0.7 ? 1 : clamp(1 - (p - 0.7) / 0.3, 0, 1));
      } else {
        heroTitle.style.transform = "translate3d(0," + (-60 * p) + "px,0) scale(" + (1 - 0.12 * p) + ")";
        heroTitle.style.opacity = String(1 - 0.6 * p);
      }
    }
    document.body.classList.toggle("is-docked", wide && window.scrollY > h * 0.72);
  }

  /* ---------- คลังผลงาน ----------
     หมวดแรก = คลังใต้ส่วนผลงาน · หมวดถัดไป = แยกเป็นส่วนของตัวเอง (เช่น ฟรีแลนซ์) */
  var STEP = 12, cache = {};
  try { cache = JSON.parse(sessionStorage.getItem("ytMeta") || "{}") || {}; } catch (e) {}
  var featuredIds = {};
  works.forEach(function (x) { if (x.v.kind === "yt") featuredIds[x.v.id] = 1; });
  function parseLinks(list) {
    var seen = {}, ids = [];
    arr(list).forEach(function (l) {
      var link = typeof l === "string" ? l : (l && l.link), obj = l && typeof l === "object" ? l : {};
      var v = parseVideo(link); if (!v || v.kind === "link") return;
      var key = v.kind + ":" + v.id;
      if (seen[key] || (v.kind === "yt" && featuredIds[v.id])) return;
      seen[key] = 1; ids.push({ key: key, kind: v.kind, id: v.id, url: link, cover: obj.cover || "", note: obj.note || "" });
    });
    return ids;
  }
  /* แต่ละหมวดมีได้หลาย "ลูกค้า/ช่อง" (clients) หรือรายการเดียว (links) */
  var groups = arr(SITE.archive).filter(function (g) { return g && typeof g === "object"; }).map(function (g, gi) {
    var subs = Array.isArray(g.clients) && g.clients.length
      ? g.clients.filter(Boolean).map(function (c) { return { label: c.name, sub: c.sub, ids: parseLinks(c.links), shown: 0 }; })
      : [{ label: null, ids: parseLinks(g.links), shown: 0 }];
    var big = gi > 0, many = subs.length > 1;
    subs.forEach(function (sb) { sb.step = gi === 0 ? STEP : many ? 6 : 9; });
    return { src: g, subs: subs, big: big, vertical: !!g.vertical, total: subs.reduce(function (n, sb) { return n + sb.ids.length; }, 0) };
  });

  function fetchMeta(it) {
    if (cache[it.key]) return Promise.resolve(cache[it.key]);
    var page = it.kind === "yt" ? "https://www.youtube.com/watch?v=" + it.id : it.url;
    var get = function (u) { return fetch(u).then(function (r) { return r.json(); }).then(function (j) { if (!j || !j.title) throw 0; return j; }); };
    var p = it.kind === "tt"
      ? get("https://www.tiktok.com/oembed?url=" + encodeURIComponent(page)).catch(function () { return get("https://noembed.com/embed?url=" + encodeURIComponent(page)); })
      : get("https://noembed.com/embed?url=" + encodeURIComponent(page));
    return p.then(function (j) {
      cache[it.key] = { title: j.title, author: j.author_name || "", thumb: j.thumbnail_url || "" };
      try { sessionStorage.setItem("ytMeta", JSON.stringify(cache)); } catch (e) {}
      return cache[it.key];
    });
  }
  function thumbFor(it, g, m) {
    if (it.cover) return it.cover;
    if (it.kind === "yt") return "https://i.ytimg.com/vi/" + it.id + "/" + (g.vertical ? "oar2" : g.big ? "hqdefault" : "mqdefault") + ".jpg";
    return m && m.thumb ? m.thumb : "";
  }
  function splitTitle(raw) { return { name: raw.split("|")[0].replace(/^["“]|["”]$/g, "").trim() || raw, ep: epOf(raw) }; }

  /* ส่วนแยกของหมวดที่ 2 เป็นต้นไป */
  function subsHTML(g, k) {
    var gridCls = g.vertical ? "archive__grid--v" : g.big ? "archive__grid--lg" : "";
    return g.subs.map(function (sb, j) {
      var key = k + "." + j;
      return '<div class="client">' +
        (sb.label && !(k === 0 && j === 0) ? '<div class="client__head reveal"><h3 class="client__name" data-sub-name="' + key + '">' + esc(t(sb.label)) + '</h3><span class="client__count mono">' + sb.ids.length + ' <span data-clips></span></span>' +
          (sb.sub ? '<p class="client__sub" data-sub-sub="' + key + '">' + esc(t(sb.sub)) + "</p>" : "") + "</div>" : "") +
        '<div class="archive__grid ' + gridCls + '" data-grid="' + key + '"></div>' +
        '<p class="empty" data-empty="' + key + '" hidden></p>' +
        '<button type="button" class="btn btn--glass glass archive__more" data-more="' + key + '"></button></div>';
    }).join("");
  }
  function buildGroupSections() {
    if (groups[0]) { $("#archiveSubs").innerHTML = subsHTML(groups[0], 0); observe($$("#archiveSubs .reveal")); }
    var host = $("#extraSections");
    host.innerHTML = groups.slice(1).map(function (g, i) {
      var k = i + 1;
      return '<section class="section group" id="' + esc(g.src.id || "group" + k) + '">' +
        '<div class="section__head reveal"><div><p class="eyebrow mono"><span data-num></span> — <span data-g-eyebrow="' + k + '"></span></p>' +
        '<h2 data-g-title="' + k + '"></h2></div><p class="section__sub" data-g-sub="' + k + '"></p></div>' +
        subsHTML(g, k) + "</section>";
    }).join("");
    observe($$(".reveal", host));
  }
  function renderGroupText() {
    $$("[data-note]").forEach(function (el) { try { el.textContent = t(JSON.parse(el.dataset.note)); } catch (e) {} });
    groups.forEach(function (g, k) {
      var set = function (sel, v) { var el = $(sel); if (el) el.textContent = v; };
      g.subs.forEach(function (sb, j) {
        set('[data-empty="' + k + "." + j + '"]', UI[lang]["archive.empty"]);
        set('[data-more="' + k + "." + j + '"]', UI[lang]["archive.more"]);
        if (sb.label) set('[data-sub-name="' + k + "." + j + '"]', t(sb.label));
        if (sb.sub) set('[data-sub-sub="' + k + "." + j + '"]', t(sb.sub));
      });
      if (k === 0) {
        $("#archive").hidden = !g.total;
        var first = g.subs[0];
        if (first && first.label) {
          $("#mainHead").hidden = false;
          $("#mainName").textContent = t(first.label);
          $("#mainCount").textContent = first.ids.length + works.length;
          $("#mainSub").textContent = t(g.src.label);
        }
        return;
      }
      set('[data-g-eyebrow="' + k + '"]', t(g.src.eyebrow) || "Freelance");
      set('[data-g-title="' + k + '"]', t(g.src.title) || t(g.src.label));
      set('[data-g-sub="' + k + '"]', t(g.src.sub));
      g.subs.forEach(function (sb, j) {
        set('[data-empty="' + k + "." + j + '"]', UI[lang]["archive.empty"]);
        set('[data-more="' + k + "." + j + '"]', UI[lang]["archive.more"]);
      });
    });
    $$("[data-clips]").forEach(function (el) { el.textContent = lang === "th" ? "คลิป" : "videos"; });
  }

  function showMore(k, j) {
    var g = groups[k]; if (!g) return; j = j || 0;
    var sb = g.subs[j]; if (!sb) return;
    var key = k + "." + j;
    var grid = $('[data-grid="' + key + '"]'), more = $('[data-more="' + key + '"]'), empty = $('[data-empty="' + key + '"]');
    var next = sb.ids.slice(sb.shown, sb.shown + sb.step), from = sb.shown;
    grid.insertAdjacentHTML("beforeend", next.map(function (it, n) {
      var m = cache[it.key], c = m ? splitTitle(m.title) : null, th = thumbFor(it, g, m);
      return '<button type="button" class="clip reveal' + (g.vertical ? " clip--v" : "") + '" data-g="' + k + '" data-s="' + j + '" data-n="' + (from + n) + '">' +
        '<span class="clip__thumb">' + (th ? '<img src="' + esc(th) + '" alt="" loading="lazy"' + (it.cover && m && m.thumb ? ' data-fb="' + esc(m.thumb) + '"' : "") + ' onerror="if(this.dataset.fb){this.src=this.dataset.fb;this.removeAttribute(\'data-fb\')}else{this.style.visibility=\'hidden\'}">' : "") +
        (it.kind === "tt" ? '<span class="clip__src mono">TikTok</span>' : g.vertical ? '<span class="clip__src mono">Shorts</span>' : "") +
        (it.note ? '<span class="clip__note mono" data-note="' + esc(JSON.stringify(it.note)) + '">' + esc(t(it.note)) + "</span>" : "") +
        '<span class="clip__ep">' + (c ? esc(c.ep) : "") + "</span></span>" +
        '<span class="clip__title' + (c ? "" : " is-loading") + '">' + (c ? esc(c.name) : "&nbsp;") + "</span>" +
        (g.big && !sb.label ? '<span class="clip__meta mono">' + (m ? esc(m.author) : "") + "</span>" : "") + "</button>";
    }).join(""));
    sb.shown += next.length;
    more.hidden = sb.shown >= sb.ids.length;
    empty.hidden = sb.ids.length > 0;
    var cards = $$(".clip", grid).slice(from);
    observe(cards);
    cards.forEach(function (card) {
      var it = sb.ids[+card.dataset.n];
      if (cache[it.key]) { card.dataset.title = splitTitle(cache[it.key].title).name; return; }
      var tEl = $(".clip__title", card);
      fetchMeta(it).then(function (m) {
        var sp = splitTitle(m.title);
        var im = $(".clip__thumb img", card);
        if (it.kind === "tt" && m.thumb && (!im || im.style.visibility === "hidden")) {
          if (im) im.remove();
          $(".clip__thumb", card).insertAdjacentHTML("afterbegin", '<img src="' + esc(m.thumb) + '" alt="" loading="lazy">');
        }
        tEl.textContent = sp.name; $(".clip__ep", card).textContent = sp.ep; card.dataset.title = sp.name;
        var meta = $(".clip__meta", card); if (meta) meta.textContent = m.author;
      }).catch(function () {
        var acc = (it.url.match(/tiktok\.com\/(@[\w.\-]+)/) || [])[1];
        tEl.textContent = it.kind === "tt" ? (acc || "TikTok") : (sb.label ? t(sb.label) : "YouTube");
        if (it.kind === "tt") $(".clip__thumb", card).classList.add("clip__thumb--tt");
      })
        .then(function () { tEl.classList.remove("is-loading"); });
    });
  }
  document.addEventListener("click", function (e) {
    var mb = e.target.closest("[data-more]");
    if (mb) { var p = mb.dataset.more.split("."); showMore(+p[0], +p[1]); return; }
    var c = e.target.closest(".clip"); if (!c) return;
    var g = groups[+c.dataset.g], sb = g && g.subs[+c.dataset.s || 0], it = sb && sb.ids[+c.dataset.n]; if (!it) return;
    openPlayer(it.kind === "yt" ? "https://youtu.be/" + it.id : it.url, c.dataset.title || $(".clip__title", c).textContent, g.vertical);
  });
  /* ---------- ดึงตอนใหม่จากเพลย์ลิสต์อัตโนมัติ (ต้องใส่ youtubeApiKey) ---------- */
  function syncPlaylists() {
    var key = SITE.youtubeApiKey; if (!key) return;
    groups.forEach(function (g, k) {
      g.subs.forEach(function (sb, j) {
        var src = arr(g.src.clients)[j] || g.src, pl = src && src.playlist;
        if (!pl) return;
        var found = [];
        (function page(token) {
          var url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=" +
            encodeURIComponent(pl) + "&key=" + encodeURIComponent(key) + (token ? "&pageToken=" + token : "");
          fetch(url).then(function (r) { return r.json(); }).then(function (j2) {
            arr(j2.items).forEach(function (it) {
              var id = it.contentDetails && it.contentDetails.videoId, sn = it.snippet || {};
              if (!id || sn.title === "Private video" || sn.title === "Deleted video") return;
              found.push({ id: id, title: sn.title, date: (it.contentDetails.videoPublishedAt || sn.publishedAt || "") });
            });
            if (j2.nextPageToken && found.length < 1000) page(j2.nextPageToken); else merge();
          }).catch(function () {});
        })();
        function merge() {
          var have = {};
          sb.ids.forEach(function (it) { have[it.key] = 1; });
          var fresh = found.filter(function (f) { return !have["yt:" + f.id] && !featuredIds[f.id]; })
            .sort(function (a, b) { return a.date < b.date ? 1 : -1; });
          if (!fresh.length) return;
          var week = Date.now() - 8 * 864e5;
          fresh.forEach(function (f) {
            cache["yt:" + f.id] = cache["yt:" + f.id] || { title: f.title, author: "", thumb: "" };
          });
          sb.ids = fresh.map(function (f) {
            return { key: "yt:" + f.id, kind: "yt", id: f.id, url: "https://youtu.be/" + f.id, cover: "",
              note: Date.parse(f.date) > week ? { th: "ใหม่", en: "New" } : "" };
          }).concat(sb.ids);
          g.total += fresh.length;
          var grid = $('[data-grid="' + k + "." + j + '"]'); if (grid) grid.innerHTML = "";
          var shownBefore = sb.shown; sb.shown = 0;
          showMore(k, j);
          while (sb.shown < Math.min(shownBefore, sb.ids.length)) showMore(k, j);
          renderGroupText(); renderStats(); loadTotalViews();
        }
      });
    });
  }

  function numberSections() {
    $$("[data-num]").forEach(function (el, i) { el.textContent = String(i + 1).padStart(2, "0"); });
  }

  /* ---------- ภาพถ่ายคอนเสิร์ต ---------- */
  var photos = arr(SITE.photos).filter(function (p) { return p && p.src; });
  var fp = photos.findIndex(function (p) { return p.featured; });
  if (fp > 0) photos.unshift(photos.splice(fp, 1)[0]);
  var CAM = '<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="12" cy="13" r="3.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
  function ratioOf(p) { return p.w && p.h ? p.w / p.h : (p._r || 1.5); }
  function renderPhotos() {
    var grid = $("#photoGrid");
    if (!photos.length) { $("#photos").hidden = true; return; }
    grid.innerHTML = photos.map(function (p, i) {
      var cap = [t(p.caption), p.year].filter(Boolean).join(" · ");
      var hero = i === 0 && p.featured;
      return '<button type="button" class="shot' + (hero ? " shot--hero reveal" : "") + '" data-i="' + i + '" aria-label="' + esc(cap || "Photo " + (i + 1)) + '"' +
        (hero ? ' style="aspect-ratio:' + ratioOf(p) + '"' : "") + ">" +
        '<img src="' + esc(hero ? p.src : (p.thumb || p.src)) + '" alt="' + esc(cap || photoAlt()) + '"' + (hero ? "" : ' loading="lazy"') + ">" +
        (cap ? '<span class="shot__cap">' + esc(cap) + "</span>" : "") + "</button>";
    }).join("");
    $$(".shot", grid).forEach(function (el) {
      var i = +el.dataset.i, p = photos[i], img = $("img", el);
      img.addEventListener("load", function () {
        el.dataset.ok = "1";
        if (!(p.w && p.h) && img.naturalWidth) { p._r = img.naturalWidth / img.naturalHeight; layoutPhotos(); }
      });
      img.addEventListener("error", function () {
        if (p.thumb && img.getAttribute("src") === p.thumb) { img.src = p.src; return; }
        el.classList.add("shot--ph"); el.disabled = true;
        el.innerHTML = CAM + "<span>" + esc(UI[lang]["photos.ph"]) + "</span><span>" + esc(p.src) + "</span>";
      });
    });
    layoutPhotos();
    observe($$(".reveal", grid));
  }
  /* จัดรูปเต็มแถว: ทุกแถวกว้างเท่ากัน รูปคงสัดส่วนจริง ไม่ครอป */
  function layoutPhotos() {
    var grid = $("#photoGrid"); if (!grid) return;
    var W = grid.clientWidth; if (!W) return;
    var gap = W < 720 ? 6 : 10, target = W < 520 ? 140 : W < 900 ? 200 : 270;
    var items = $$(".shot:not(.shot--hero)", grid), row = [], sum = 0;
    function flush(last) {
      var gaps = gap * (row.length - 1), h = (W - gaps) / sum;
      if (last && h > target * 1.25) h = target;
      row.forEach(function (el, k) {
        var r = ratioOf(photos[+el.dataset.i]);
        el.style.width = Math.floor(r * h) + "px"; el.style.height = Math.floor(h) + "px";
        el.style.marginRight = k < row.length - 1 ? gap + "px" : "0";
        el.style.marginBottom = gap + "px";
      });
      row = []; sum = 0;
    }
    items.forEach(function (el) {
      row.push(el); sum += ratioOf(photos[+el.dataset.i]);
      if (sum * target + gap * (row.length - 1) >= W) flush(false);
    });
    if (row.length) flush(true);
    var hero = $(".shot--hero", grid); if (hero) hero.style.marginBottom = gap + "px";
  }
  var photosReady = false;
  var lb = { list: [], i: 0 };
  function openLightbox(i) {
    lb.list = $$("#photoGrid .shot:not(.shot--ph)").map(function (el) { return +el.dataset.i; });
    lb.i = Math.max(0, lb.list.indexOf(i));
    showLB();
    var d = $("#lightbox"); if (typeof d.showModal === "function") d.showModal();
  }
  function photoAlt() { return (lang === "th" ? "ภาพคอนเสิร์ต โดย " : "Concert photo by ") + t(P.name); }
  function showLB() {
    var p = photos[lb.list[lb.i]]; if (!p) return;
    $("#lbImg").src = p.src; $("#lbImg").alt = t(p.caption) || photoAlt();
    $("#lbCap").textContent = [t(p.caption), p.year, (lb.i + 1) + " / " + lb.list.length].filter(Boolean).join("  ·  ");
  }
  function stepLB(d) { if (!lb.list.length) return; lb.i = (lb.i + d + lb.list.length) % lb.list.length; showLB(); }
  $("#photoGrid").addEventListener("click", function (e) { var s = e.target.closest(".shot:not(.shot--ph)"); if (s) openLightbox(+s.dataset.i); });
  $("#lbPrev").addEventListener("click", function () { stepLB(-1); });
  $("#lbNext").addEventListener("click", function () { stepLB(1); });
  $("#lbClose").addEventListener("click", function () { $("#lightbox").close(); });
  $("#lightbox").addEventListener("keydown", function (e) { if (e.key === "ArrowLeft") stepLB(-1); if (e.key === "ArrowRight") stepLB(1); });
  $("#lightbox").addEventListener("click", function (e) { if (e.target === this) this.close(); });

  /* ---------- ตัวเล่นวิดีโอ ---------- */
  var player = $("#player");
  function openPlayer(link, title, reel) {
    var v = parseVideo(link); if (!v) return;
    /* หมายเหตุ: เปิดไฟล์ตรงๆ (file://) YouTube จะขึ้น Error 153 — ขึ้นเว็บจริง/Live Server แล้วเล่นในหน้าได้ปกติ */
    if (v.kind === "link" || typeof player.showModal !== "function") { window.open(link, "_blank", "noopener"); return; }
    var src = v.kind === "yt" ? "https://www.youtube-nocookie.com/embed/" + v.id + "?autoplay=1&rel=0" : "https://www.tiktok.com/embed/v2/" + v.id;
    $("#playerFrame").innerHTML = '<iframe src="' + src + '" title="' + esc(title) + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
    $("#playerTitle").textContent = title;
    $(".player__box").classList.toggle("is-reel", !!reel);
    player.showModal();
  }
  player.addEventListener("close", function () { $("#playerFrame").innerHTML = ""; });
  player.addEventListener("click", function (e) { if (e.target === player) player.close(); });
  $("#playerClose").addEventListener("click", function () { player.close(); });

  /* ---------- โปรไฟล์ / ไทม์ไลน์ / ติดต่อ ---------- */
  function renderProfile() {
    $$("[data-bind]").forEach(function (el) {
      var k = el.dataset.bind, v = k === "nickname" ? (P.nickname || t(P.name)) : k === "nameEn" ? ((P.name && P.name.en) || t(P.name)) : t(P[k]);
      if (v) el.textContent = v;
    });
    document.title = (P.nickname || t(P.name) || "Portfolio") + " — Video Editor & Photographer";
    $("#toolList").innerHTML = arr(SITE.tools).filter(Boolean).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("");
    $("#timeline").innerHTML = arr(SITE.experience).filter(Boolean).map(function (x) {
      var yrs = x.from ? esc(t(x.from)) + " → " + esc(t(x.to)) : "";
      return '<li>' + (yrs ? '<span class="tl__years">' + yrs + "</span>" : "") + '<span class="tl__title">' + esc(t(x.title)) +
        '</span><span class="tl__place">' + esc(t(x.place)) + "</span>" + (x.desc ? '<span class="tl__desc">' + esc(t(x.desc)) + "</span>" : "") + "</li>";
    }).join("");
  }
  function renderPhoto() {
    $$("[data-photo]").forEach(function (img) {
      if (!P.photo) { img.hidden = true; return; }
      img.addEventListener("error", function () { img.hidden = true; });
      img.addEventListener("load", function () { var ph = img.nextElementSibling; if (ph) ph.hidden = true; });
      img.alt = t(P.name); img.src = P.photo;
    });
  }
  function renderSocials() {
    $$("[data-email]").forEach(function (el) { el.textContent = C.email || ""; });
    $$("[data-copy-email]").forEach(function (b) { b.hidden = !C.email; });
    var lineUrl = C.line ? (/^https?:/.test(C.line) ? C.line : "https://line.me/ti/p/~" + encodeURIComponent(String(C.line).replace(/^@/, ""))) : "";
    var igName = C.instagram ? "@" + (String(C.instagram).match(/instagram\.com\/([^/?#]+)/) || [, C.instagram])[1].replace(/^@/, "") : "";
    var phoneDisp = C.phone ? String(C.phone).replace(/\D/g, "").replace(/^(\d{3})(\d{3})(\d{4})$/, "$1-$2-$3") : "";
    var items = [
      [lang === "th" ? "โทร" : "Phone", C.phone ? "tel:+66" + String(C.phone).replace(/\D/g, "").replace(/^0/, "") : "", phoneDisp],
      ["Email", C.email ? "mailto:" + C.email : "", C.email],
      ["LINE", lineUrl, C.line ? (lang === "th" ? "แอดเพื่อน" : "Add friend") : ""],
      ["Instagram", C.instagram, igName],
      ["TikTok", C.tiktok, (String(C.tiktok || "").match(/@[\w.]+/) || ["TikTok"])[0]],
      ["YouTube", C.youtube, /playlist/.test(C.youtube || "") ? "Playlist" : "Channel"]
    ].filter(function (x) { return x[1]; });
    $("#socials").innerHTML = items.map(function (x) {
      return '<li><a href="' + esc(x[1]) + '"' + (/^(mailto|tel):/.test(x[1]) ? "" : ' target="_blank" rel="noopener"') + "><span>" + x[0] + "</span><small>" + esc(x[2]) + " ↗</small></a></li>";
    }).join("");
  }
  function copyEmail() {
    if (!C.email) return;
    var done = function () { toast(UI[lang].copied); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(C.email).then(done, fallback); else fallback();
    function fallback() {
      var ta = document.createElement("textarea"); ta.value = C.email; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); done(); } catch (e) { location.href = "mailto:" + C.email; }
      ta.remove();
    }
  }
  $$("[data-copy-email]").forEach(function (b) { b.addEventListener("click", copyEmail); });

  function renderMarquee() {
    var one = UI[lang].marquee.map(function (w) { return '<span class="marquee__item">' + esc(w) + '<span class="marquee__dot"></span></span>'; }).join("");
    // คำน้อย → วนซ้ำให้ยาวพอเต็มจอกว้าง แล้วค่อยต่อ 2 ชุดให้เลื่อนวนไม่สะดุด
    var set = one; while (set.split("marquee__item").length - 1 < 8) set += one;
    $("#marquee").innerHTML = set + set;
  }

  /* ---------- สลับภาษา ---------- */
  function setLang(l) {
    lang = l; store.set("lang", l); document.documentElement.lang = l;
    $$("[data-lang]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.lang === l)); });
    $$("[data-i18n]").forEach(function (el) { var s = UI[l][el.dataset.i18n]; if (s != null) el.textContent = s; });
    $$("[data-i18n-html]").forEach(function (el) { var s = UI[l][el.dataset.i18nHtml]; if (s != null) el.innerHTML = s; });
    renderProfile(); renderStats(); renderWorks(); renderGroupText(); renderMarquee(); renderSocials(); if (photosReady) renderPhotos();
    $$(".shot--ph span:nth-of-type(1)").forEach(function (s) { s.textContent = UI[l]["photos.ph"]; });
      }
  $$("[data-lang]").forEach(function (b) { b.addEventListener("click", function () { setLang(b.dataset.lang); }); });

  /* ---------- ฟอร์มติดต่อ ---------- */
  $("#contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target, st = $("#formStatus");
    var d = { name: f.name.value.trim(), email: f.email.value.trim(), message: f.message.value.trim() };
    if (!d.name || !d.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) { st.textContent = UI[lang]["form.invalid"]; return; }
    if (C.formspree) {
      st.textContent = UI[lang]["form.sending"];
      fetch("https://formspree.io/f/" + C.formspree, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(d) })
        .then(function (r) { st.textContent = UI[lang][r.ok ? "form.ok" : "form.err"]; if (r.ok) f.reset(); })
        .catch(function () { st.textContent = UI[lang]["form.err"]; });
    } else if (C.email) {
      st.textContent = UI[lang]["form.mailto"];
      location.href = "mailto:" + C.email + "?subject=" + encodeURIComponent("Portfolio — " + d.name) + "&body=" + encodeURIComponent(d.message + "\n\n— " + d.name + " (" + d.email + ")");
    }
  });

  /* ---------- ของเล่นลากได้ (ม้วนฟิล์ม) ---------- */
  (function toy() {
    var el = $("#toy"), box = $("#contactBox");
    var s = { x: 0, y: 0, vx: 0, vy: 0, rot: 0, drag: false, px: 0, py: 0, lt: 0, raf: 0 };
    function bounds() { return { w: box.clientWidth - el.offsetWidth, h: box.clientHeight - el.offsetHeight }; }
    function place() { el.style.transform = "translate3d(" + s.x + "px," + s.y + "px,0) rotate(" + s.rot + "deg)"; }
    function init() {
      var b = bounds();
      s.x = clamp(el.offsetLeft, 0, b.w); s.y = clamp(el.offsetTop, 0, b.h);
      el.style.left = "0"; el.style.top = "0"; el.style.right = "auto"; place();
    }
    function tick() {
      if (s.drag) return;
      var b = bounds();
      s.vx *= 0.94; s.vy *= 0.94; s.x += s.vx; s.y += s.vy; s.rot += s.vx * 1.2;
      if (s.x < 0) { s.x = 0; s.vx *= -0.7; } if (s.x > b.w) { s.x = b.w; s.vx *= -0.7; }
      if (s.y < 0) { s.y = 0; s.vy *= -0.7; } if (s.y > b.h) { s.y = b.h; s.vy *= -0.7; }
      place();
      if (Math.abs(s.vx) + Math.abs(s.vy) > 0.2) s.raf = requestAnimationFrame(tick);
    }
    el.addEventListener("pointerdown", function (e) {
      if (!s.inited) { init(); s.inited = true; }
      s.drag = true; s.px = e.clientX; s.py = e.clientY; s.lt = performance.now(); s.vx = s.vy = 0;
      cancelAnimationFrame(s.raf); el.setPointerCapture(e.pointerId); el.classList.add("is-touched");
    });
    el.addEventListener("pointermove", function (e) {
      if (!s.drag) return;
      var now = performance.now(), dt = Math.max(16, now - s.lt), b = bounds();
      var dx = e.clientX - s.px, dy = e.clientY - s.py;
      s.x = clamp(s.x + dx, 0, b.w); s.y = clamp(s.y + dy, 0, b.h); s.rot += dx * 1.2;
      s.vx = dx * 16 / dt; s.vy = dy * 16 / dt; s.px = e.clientX; s.py = e.clientY; s.lt = now; place();
    });
    function up() { if (!s.drag) return; s.drag = false; s.raf = requestAnimationFrame(tick); }
    el.addEventListener("pointerup", up); el.addEventListener("pointercancel", up);
    window.addEventListener("resize", function () { if (!s.inited) return; var b = bounds(); s.x = clamp(s.x, 0, b.w); s.y = clamp(s.y, 0, b.h); place(); });
  })();

  /* ---------- เมนู ---------- */
  var nav = $("#nav"), menuBtn = $("#menuBtn");
  menuBtn.addEventListener("click", function () { var o = nav.classList.toggle("is-open"); menuBtn.setAttribute("aria-expanded", String(o)); });
  $$("#navLinks a").forEach(function (a) { a.addEventListener("click", function () { nav.classList.remove("is-open"); menuBtn.setAttribute("aria-expanded", "false"); }); });
  if ("IntersectionObserver" in window) {
    var secIO = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id;
        $$(".nav__links a, .side__nav a").forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["works", "archive", "freelance", "reels", "photos", "about", "contact"].forEach(function (id) { var s = document.getElementById(id); if (s) secIO.observe(s); });
  }

  /* ---------- ค่อยๆ ปรากฏ ---------- */
  var revealIO = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); revealIO.unobserve(en.target); } });
  }, { threshold: 0.12 }) : null;
  function observe(els) {
    els.forEach(function (el, i) {
      el.style.transitionDelay = (i % 6) * 60 + "ms";
      if (revealIO) revealIO.observe(el); else el.classList.add("is-in");
    });
  }

  /* ---------- timecode ---------- */
  var tc = $("#timecode"), t0 = performance.now();
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  (function tick() {
    var f = Math.floor((performance.now() - t0) / 40);
    tc.textContent = pad(Math.floor(f / 90000) % 24) + ":" + pad(Math.floor(f / 1500) % 60) + ":" + pad(Math.floor(f / 25) % 60) + ":" + pad(f % 25);
    requestAnimationFrame(tick);
  })();

  /* ---------- scroll / resize ---------- */
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () { ticking = false; updateDock(); });
  }, { passive: true });
  var rz; window.addEventListener("resize", function () { clearTimeout(rz); rz = setTimeout(function () { updateDock(); layoutPhotos(); }, 120); });

  /* ---------- เริ่ม ---------- */
  var y = String(new Date().getFullYear());
  $("#footYear").textContent = y;
  renderPhoto(); renderSocials(); renderPhotos(); photosReady = true;
  buildGroupSections();
  numberSections();
  setLang(lang);
  groups.forEach(function (g, k) { g.subs.forEach(function (sb, j) { showMore(k, j); }); });
  syncPlaylists();
  loadLiveViews();
  loadTotalViews();
  updateDock();
  observe($$(".hero .reveal, .section > .reveal, .section__head.reveal, .about .reveal, #contactBox"));
})();

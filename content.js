/* =====================================================================
   content.js — ไฟล์เนื้อหาของเว็บ (แก้ไฟล์นี้ไฟล์เดียวพอ)
   ---------------------------------------------------------------------
   กฎ 3 ข้อ กันเว็บพัง
   1) ข้อความต้องอยู่ใน "เครื่องหมายคำพูด" เสมอ
   2) จบแต่ละบรรทัด/แต่ละบล็อกด้วยเครื่องหมายจุลภาค ,
   3) เพิ่มรายการ = ก๊อปบล็อก { ... }, ทั้งบล็อก แล้วแก้ข้อความข้างใน
   ถ้ารายการไหนกรอกไม่ครบ เว็บจะข้ามรายการนั้นไป ส่วนอื่นยังแสดงปกติ
   ===================================================================== */

window.SITE = {

  /* ---------- ข้อมูลตัวคุณ ---------- */
  profile: {
    name:     { th: "รุ่งวิทย์ ชูแสง",       en: "Rungwit Chusang" },
    nickname: "MMLEK",                      // ชื่อย่อ โชว์บนเมนูและแถบข้าง
    roles:    ["MMLEK", "VIDEO EDITOR", "PHOTOGRAPHER"],   // คำที่สลับไปเรื่อยๆ
    city:     { th: "กรุงเทพฯ", en: "Bangkok" },
    photo:    "images/profile.jpg",         // วางรูปชื่อ profile.jpg ในโฟลเดอร์ images
    intro: {
      th: "ตัดต่อ YouTube content และคลิปสั้น ให้เรื่องเล่ายาวๆ ดูสนุกจนจบ",
      en: "I edit YouTube content and short-form video that keeps long stories watchable to the end."
    },
    bio: {
      th: "ผมรุ่งวิทย์ หรือ เล็ก เป็น video editor ประจำช่อง REAL ดูแลรายการ Behind History มากว่า 3 ปี ถนัดเปลี่ยนเรื่องเล่ายาวๆ ให้ดูสนุก ด้วยจังหวะตัด ภาพประกอบ และเสียง ที่ทำให้คนดูอยู่จนจบ นอกจากงานประจำ ผมรับตัดต่อฟรีแลนซ์ทั้ง YouTube และคลิปสั้น และเวลาว่างจะถือกล้องไปถ่ายคอนเสิร์ต งานที่ผมรักไม่แพ้กัน",
      en: "I'm Rungwit — Lek — a staff video editor at REAL, where I've cut Behind History for over three years. I turn long stories into something people watch to the end, through pacing, visuals and sound. Outside the day job I take freelance edits for YouTube and short-form, and whenever I can, I bring a camera to concerts — a craft I love just as much."
    }
  },

  /* ---------- แถบข้าง (ปิดไว้ก่อน) ----------
     true = เปิดแถบข้างแบบชื่อหดไปเกาะด้านขวา (จอคอม), false = ปิด */
  sidebar: false,

  /* ---------- ยอดวิวเรียลไทม์ (ผลงานเด่น) ----------
     liveViews: true = ดึงยอดวิวล่าสุดเองทุกครั้งที่เปิดเว็บ (ฟรี ไม่ต้องสมัคร)
     ถ้าดึงไม่ได้ จะใช้ตัวเลขใน views ของแต่ละผลงานแทน
     youtubeApiKey: ใส่รหัส YouTube API ตอนเอาเว็บขึ้นจริง ได้ 2 อย่าง:
       1) ยอดวิวแม่นขึ้น  2) ตอนใหม่ของ Behind History ขึ้นเว็บเองทุกสัปดาห์ (ดู playlist ใน archive)
     เว้นว่าง "" ไว้ก่อนได้ */
  liveViews: true,
  youtubeApiKey: "AIzaSyDJIbugSXcxkzHWLDzdGqaWvMfjokY3FqU",

  /* ---------- วิดีโอพื้นหลังหน้าแรก (ไม่บังคับ) ----------
     อยากได้เมื่อไหร่: วางไฟล์ .mp4 สั้นๆ (ไม่เกิน ~10 วิ ไม่มีเสียง) ในโฟลเดอร์ images
     แล้วใส่ชื่อไฟล์ เช่น "images/hero.mp4"  เว้นว่าง "" = ไม่มีวิดีโอ */
  heroVideo: "",

  /* ---------- ตัวเลขนับขึ้น ---------- */
  stats: [
    { value: 3,   suffix: "+", label: { th: "ปีประสบการณ์",          en: "Years editing" } },
    // auto: "all" = นับคลิปทุกหมวดในเว็บให้เอง (เพิ่มเองเมื่อใส่ลิงก์ใหม่ / มีตอนใหม่เข้าเพลย์ลิสต์)
    // นับเฉพาะบางหมวด: auto: ["real", "freelance"]   ·   บวกคลิปที่ไม่ได้ลงเว็บ: add: 20
    // อยากกลับไปใช้เลขเอง: เปลี่ยนเป็น value: 200, prefix: "~"
    { auto: "all", label: { th: "จำนวนคลิปที่ตัด",       en: "Videos edited" } },
    // auto: "views" = รวมยอดวิวทุกคลิป YouTube ในเว็บแบบเรียลไทม์ (ต้องมี youtubeApiKey · ถ้าดึงไม่ได้กล่องนี้จะซ่อน)
    { auto: "views", suffix: "+", label: { th: "ยอดวิวรวม",            en: "Total views" } }
  ],

  /* ---------- ช่องทางติดต่อ (เว้นว่าง "" ช่องไหน ปุ่มนั้นจะไม่แสดง) ---------- */
  contact: {
    email:     "rungwit.27390@gmail.com",
    phone:     "0909579915",
    line:      "lekyesss",      // ใส่ LINE ID เช่น "mmlek" (กดแล้วเด้งหน้าแอดเพื่อน) หรือลิงก์ https://line.me/ti/p/... ก็ได้
    instagram: "https://www.instagram.com/mmlek_/",
    tiktok:    "",
    youtube:   "",      // เว้นว่าง = ไม่โชว์ปุ่ม YouTube ในส่วนติดต่อ
    formspree: ""    // รหัสจาก formspree.io ถ้าอยากให้ฟอร์มส่งเข้าอีเมล
  },

  /* ---------- ไทม์ไลน์ประสบการณ์ (ใหม่สุดอยู่บน) ---------- */
  experience: [
    { from: "2023", to: { th: "ปัจจุบัน", en: "Now" }, title: { th: "Video Editor", en: "Video Editor" },
      place: "REAL", desc: { th: "ตัดต่อรายการ Behind History และคอนเทนต์ของช่อง", en: "Editing Behind History and other channel content" } },
    { title: { th: "Freelance Video Editor", en: "Freelance Video Editor" },
      place: { th: "ลูกค้าประจำ 5 เจ้า", en: "5 regular clients" }, desc: { th: "YouTube content และคลิปสั้น", en: "YouTube content and short-form" } }
  ],

  /* ---------- โปรแกรมที่ใช้ ---------- */
  tools: ["Premiere Pro", "After Effects", "Photoshop", "Lightroom", "DaVinci Resolve", "CapCut"],

  /* ---------- ผลงานเด่น ----------
     featured: true = การ์ดใหญ่ชิ้นแรก (ใส่ชิ้นเดียว)
     views: ยอดวิวสำรอง (ใช้เมื่อดึงยอดเรียลไทม์ไม่ได้) ใส่ตัวเลขเต็ม เช่น 1250000 · เว้นว่าง "" ได้
     type: "youtube" (แนวนอน) หรือ "reel" (แนวตั้ง) · link: ลิงก์ YouTube/TikTok */
  works: [
    { type: "youtube", featured: true, link: "https://youtu.be/YIvVrAsrvrQ", title: { th: "The 9/11 Attacks โศกนาฏกรรมสะเทือนโลก", en: "The 9/11 Attacks" }, client: "REAL · Behind History EP.156", views: "" },
    { type: "youtube", link: "https://youtu.be/6Ca4t6tiB6U", title: { th: "ประวัติศาสตร์กษัตริย์โหด", en: "History's Most Brutal Kings" }, client: "REAL · Behind History EP.56", views: "" },
    { type: "youtube", link: "https://youtu.be/kNYonYsL-yo", title: { th: "แม่หยัวศรีสุดาจันทร์ หนึ่งสตรีเหนือบัลลังก์อยุธยา", en: "Queen Si Sudachan: A Woman Above Ayutthaya's Throne" }, client: "REAL · Behind History EP.28", views: "" },
    { type: "youtube", link: "https://youtu.be/EAMVgVr7O8I", title: { th: "เปิดตำนาน 4 เสือโรบินฮู้ดเมืองไทย", en: "The Legend of Thailand's Four Robin Hood Bandits" }, client: "REAL · Behind History EP.112", views: "" },
    { type: "youtube", link: "https://youtu.be/loCLK_WUKaQ", title: { th: "ไสยศาสตร์อิสลาม", en: "Islamic Sorcery" }, client: "REAL · Behind History EP.27", views: "" },
    { type: "youtube", link: "https://youtu.be/rkHhV6IgfOc", title: { th: "ประวัติศาสตร์ไสยศาสตร์", en: "A History of Black Magic" }, client: "REAL · Behind History EP.05", views: "" },
    { type: "youtube", link: "https://youtu.be/qQ7QZIBHucg", title: { th: "แฉ! เอเลี่ยนตีเนียนในประวัติศาสตร์", en: "Aliens Hiding in Plain Sight in History" }, client: "REAL · Behind History EP.02", views: "" },
  ],

  /* ---------- คลังผลงาน (แบ่งตามประเภท) ----------
     หมวดแรก (REAL) = คลังผลงานใต้ส่วนผลงาน
     หมวดถัดไป (เช่น ฟรีแลนซ์) = ได้ส่วนของตัวเองบนหน้าเว็บ มีเลขลำดับให้อัตโนมัติ
     เพิ่มหมวดใหม่ = ก๊อปบล็อกฟรีแลนซ์ทั้งบล็อก แล้วเปลี่ยน id, ชื่อ, ลิงก์
     ชื่อคลิปและรูปปกดึงมาเอง · คลิปที่อยู่ในผลงานเด่นแล้วจะไม่แสดงซ้ำ */
  archive: [
    {
      id: "real",
      label: { th: "งานประจำ · ช่อง REAL", en: "Staff · REAL" },
      // แยกตามรายการ: เพิ่มรายการใหม่ = ก๊อปบล็อก { name: ..., links: [ ] }, ทั้งบล็อก
      clients: [
        // playlist = ดึงตอนใหม่จากเพลย์ลิสต์นี้ขึ้นเว็บเองอัตโนมัติ (ทำงานเมื่อใส่ youtubeApiKey แล้ว)
        { name: "Behind History", playlist: "PL77kE1lQRR9wjLvF1F9j4HOWpW7cPtDpy", links: [
        "https://youtu.be/6Ca4t6tiB6U",
        "https://youtu.be/qQ7QZIBHucg",
        "https://youtu.be/YIvVrAsrvrQ",
        "https://youtu.be/rkHhV6IgfOc",
        "https://youtu.be/loCLK_WUKaQ",
        "https://youtu.be/kNYonYsL-yo",
        "https://youtu.be/YQvBUoxhoI8",
        "https://youtu.be/EAMVgVr7O8I",
        "https://youtu.be/uZ2DPp-FLOs",
        "https://youtu.be/w-g5uYIVg1U",
        "https://youtu.be/UjZR0IBxumU",
        "https://youtu.be/D31SNym9OOI",
        "https://youtu.be/WsBjcSIB1Z0",
        "https://youtu.be/kpR_-apx7cQ",
        "https://youtu.be/H9n4ngYIhZo",
        "https://youtu.be/_-9tNg7frns",
        "https://youtu.be/CZUX6zPOK1s",
        "https://youtu.be/yGWSZjFwZvE",
        "https://youtu.be/JjXWi9CQ_IA",
        "https://youtu.be/TSVzefLVXJc",
        "https://youtu.be/uUi_wNDPJSU",
        "https://youtu.be/Av1wac8Uh44",
        "https://youtu.be/NlGxg1nkpvQ",
        "https://youtu.be/8GY0litoM5Y",
        "https://youtu.be/8_PQvntcBgo",
        "https://youtu.be/CXGp3B2N5hs",
        "https://youtu.be/2TY7CttdkWE",
        "https://youtu.be/U1GhQG4_-hU",
        "https://youtu.be/9jrwk7JDgFI",
        "https://youtu.be/l9QyrB7F_Qg",
        "https://youtu.be/wRAKwgoBMJY",
        "https://youtu.be/d9FvUZO0o3w",
        "https://youtu.be/lRi2WlwXH9E",
        "https://youtu.be/ljZ2MC9n31I",
        "https://youtu.be/JYNO5CTZ5QE",
        "https://youtu.be/pntTDCOczGM",
        "https://youtu.be/9gD-ciwrzfs",
        "https://youtu.be/BFvGg8cnrpQ",
        "https://youtu.be/fbD_zr4d--4",
        "https://youtu.be/DvQdORV3RS8",
        "https://youtu.be/KKdWkwaIFXo",
        "https://youtu.be/Fm98tKbxKTE",
        "https://youtu.be/dJt4j7PplAU",
        "https://youtu.be/yeIhqFPd0QQ",
        "https://youtu.be/5oxTUD7wWk0",
        "https://youtu.be/962DiMVuQ_I",
        "https://youtu.be/gi3E8n_69e0",
        "https://youtu.be/Z4p0tMLjLIc",
        "https://youtu.be/u38oDjuNsbI",
        "https://youtu.be/neFT2mcuhns",
        "https://youtu.be/Jt-T3Di3P78",
        "https://youtu.be/v-wwnyEcUlU",
        "https://youtu.be/FWEE-4jQhu8",
        "https://youtu.be/ddS8O_OkWgI",
        "https://youtu.be/KIS4FfGxvpY",
        "https://youtu.be/ma-YlLhdW-s",
        "https://youtu.be/xHKbWjkHMWo",
        "https://youtu.be/O28-0z_uNhc",
        "https://youtu.be/ch7QmhuKUm4",
        "https://youtu.be/FmJ0Zthiq6M",
        "https://youtu.be/epTT1FipAkc",
        "https://youtu.be/rxMHFW4-YDI",
        "https://youtu.be/uvJwymbI05g",
        "https://youtu.be/Tj2sFceEV4w",
        "https://youtu.be/tR7X8ZKWK2Q",
        "https://youtu.be/qB5QLr8kbSY",
        "https://youtu.be/FzhKzEKu0O8",
        "https://youtu.be/KSxP-fLAH-s",
        "https://youtu.be/nfhnj9DRR5c",
        "https://youtu.be/e3uZM1x-VHA",
        "https://youtu.be/kDR1JupA3L0",
        "https://youtu.be/LjQ82mESKSo",
        "https://youtu.be/ZnIXIpE4Xok",
        "https://youtu.be/nPmTrUfxvhI",
        "https://youtu.be/O_rTLGDmdEs",
        "https://youtu.be/E5WASWofp7A",
        "https://youtu.be/3GSoZFP7UVc",
        "https://youtu.be/9BCRWAJLbSk",
        "https://youtu.be/3-4pi-tfL3o",
        "https://youtu.be/3KKpxaUPdVs",
        "https://youtu.be/cGVzcZhRcuQ",
        "https://youtu.be/usYEWAjomiQ",
        "https://youtu.be/yvuhAxJ8t3E",
        "https://youtu.be/JDAL2-2_Yvo",
        "https://youtu.be/eeqLeIA-CZc",
        "https://youtu.be/z9s-fiSzJeg",
        "https://youtu.be/goc-lZmv4fw",
        "https://youtu.be/dOVyRVzOH_Y",
        "https://youtu.be/ytjVaJK9Hds",
        "https://youtu.be/960M5yp2-yE",
        "https://youtu.be/CzbCcff1PeM",
        "https://youtu.be/0X0f_wCfcgs",
        "https://youtu.be/LnnuBtF4Bpc",
        "https://youtu.be/a-fOctYFLZE",
        "https://youtu.be/R34XqH--lsQ",
        "https://youtu.be/SQZvsON-bfw",
        "https://youtu.be/z1j2-RArFsk",
        "https://youtu.be/32bLndXSDV8",
        "https://youtu.be/gsUk1fAjgEM",
        "https://youtu.be/hihBxKshJVY",
        "https://youtu.be/e04ymJfffes",
        "https://youtu.be/4nNxwYhph7I",
        "https://youtu.be/SxS9Lo4hsvw",
        "https://youtu.be/-n7lKbgPIUE",
        "https://youtu.be/fYgPOOvw6K0",
        "https://youtu.be/chP7Be2G4QM",
        "https://youtu.be/61ebOjcnfz0",
        "https://youtu.be/xM2vC8sSu58",
        "https://youtu.be/p7pLXdzx4MY",
        "https://youtu.be/3nJdFH6-6cg",
        "https://youtu.be/IVhXYDzcH7M",
        "https://youtu.be/6JV8KH9Z5tE",
        "https://youtu.be/bCygvIt3PAs",
        "https://youtu.be/o7x3GQL0qFU",
        "https://youtu.be/jjjsSq78wO4",
        "https://youtu.be/H5LaEomQkfk",
        "https://youtu.be/H_yW27e0MSw",
        "https://youtu.be/a0Ivio2tw_4",
        "https://youtu.be/hCuRrXV-irU",
        "https://youtu.be/VfbZojQTCw4",
        "https://youtu.be/B5cVd5rTPJQ",
        "https://youtu.be/7d-guMEUv7A",
        "https://youtu.be/mUvZn9jEFHk",
        "https://youtu.be/ifQ1sGKIidc",
        "https://youtu.be/nxLlJyIt-Mc",
        "https://youtu.be/zbJmmpfrkJQ",
        "https://youtu.be/5k6T4sR7v_E",
        "https://youtu.be/ikAnoXPGxmw",
        "https://youtu.be/gpfa5qys6yM",
        "https://youtu.be/IEl2CdMOdbk",
        "https://youtu.be/CK4HOEAkJsg",
        "https://youtu.be/VZNcLh6iK7M",
        "https://youtu.be/XpmDOrkrQ0A",
        "https://youtu.be/9L3EH_2hAuI",
        "https://youtu.be/pofKufSpE5Y",
        "https://youtu.be/bsG0780byfo",
        "https://youtu.be/ZQeQMYglhAw",
        "https://youtu.be/Sop4VBIcTs8",
        "https://youtu.be/gvab0uv_vcs",
        "https://youtu.be/hxNlp2SUEmQ",
        "https://youtu.be/1H7fLk8yVmg",
        "https://youtu.be/UriU_ThUNZQ",
        "https://youtu.be/hXrs2JDA8WQ",
        "https://youtu.be/IgWqrNOoL-k",
        "https://youtu.be/DF6Pc3TOMm0",
        "https://youtu.be/iI8Ehpbkbe8",
        "https://youtu.be/U8cyuMod_44",
        "https://youtu.be/YlvluvH4mF8",
        "https://youtu.be/smW505Ed0tA",
        "https://youtu.be/PmkYUz0lCes",
        "https://youtu.be/8J1xcsB3DXA",
        "https://youtu.be/AWFIS99W4ho",
        "https://youtu.be/S3DyoxRp0Qc",
        "https://youtu.be/eutJdr2Mpoc",
        "https://youtu.be/bP_gpcKCRDw",
        "https://youtu.be/uDI_1uUNTQs",
        "https://youtu.be/sMDzkUzBwAs",
        "https://youtu.be/c2jInmzPBy8",
        "https://youtu.be/P8Q33q56Eqs",
        "https://youtu.be/Hj-w7wsX8F4",
        "https://youtu.be/Tq88Ka9Frhw",
        "https://youtu.be/SnF-6Xm_Nvg",
        ] },
        { name: "Crime Junction คน คลั่ง คดี", links: [
            "https://youtu.be/LgBmNfQtuC4",
            "https://youtu.be/vUEZwfztFH8",
            "https://youtu.be/jPOSNGhtP0Y",
            "https://youtu.be/YpzCcI9mRmo",
            "https://youtu.be/XiBKfBrJ82o",
            "https://youtu.be/5Gqxblo_qrY",
        ] },
        { name: "Netflix", links: [
            "https://youtu.be/zvMW5Fs8cgw",
            "https://youtu.be/e1Dk6o2unmI",
            "https://youtu.be/G10Bt_yf8io",
        ] },
      ]
    },
    {
      id: "freelance",
      eyebrow: { th: "Freelance", en: "Freelance" },
      title:   { th: "งานฟรีแลนซ์", en: "Freelance work" },
      sub:     { th: "คลิปที่ตัดให้ลูกค้าและช่องอื่นๆ", en: "Edits for clients and other channels" },
      // แยกตามช่อง/ลูกค้า: เพิ่มช่องใหม่ = ก๊อปบล็อก { name: ..., links: [ ] }, ทั้งบล็อก
      clients: [
        { name: "The Common Thread", links: [
            "https://youtu.be/dsxddMrRY0o",
            "https://youtu.be/gl4E0knljqI",
            "https://youtu.be/DybFA_Wgsms",
            "https://youtu.be/SJHgLLGkGic",
            "https://youtu.be/YDPZmM0-phE",
            "https://youtu.be/D3hn-mvPRec",
            "https://youtu.be/dtwtI6H4f6Y",
            "https://youtu.be/qJht9p5oHNk",
            "https://youtu.be/Muy_1YMWpTM",
            "https://youtu.be/cSfkPcqBIIQ",
            "https://youtu.be/xC6BU5VE4Ko",
            "https://youtu.be/24ZZwzdNaaI",
            "https://youtu.be/HX4kVtBrxMM",
            "https://youtu.be/TceRI-rh9J4",
            "https://youtu.be/K1VER0ZFo7Q",
            "https://youtu.be/Kp3kh2uPsPg",
            "https://youtu.be/UK7v_hn0Wxk",
            "https://youtu.be/Wcm2ZYFAOYw",
            "https://youtu.be/2faorTvqXM4",
            "https://youtu.be/K9qWILvtPPM",
        ] },
        { name: "Duck Alert", links: [
            "https://youtu.be/L7jYASmmihg",
            "https://youtu.be/BN9JaKV1U2M",
            "https://youtu.be/dWHauYmwxeA",
        ] },
        { name: "Mind Talk", links: [
            "https://youtu.be/FK8aUTOXPyg",
            "https://youtu.be/gmE3jXTzRvY",
            "https://youtu.be/MHGNE-5r4NQ",
            "https://youtu.be/4EUHOJx3xd4",
            "https://youtu.be/4BstH8fuR10",
            "https://youtu.be/dZabRfSZdKI",
        ] },
        { name: "Born To Dev", sub: { th: "ไฮไลต์ไลฟ์", en: "Live highlights" }, links: [
            "https://youtu.be/qMdi7RpESyY",
            "https://youtu.be/tpBDzllJ3qY",
            "https://youtu.be/lnfJyzj6VEs",
            "https://youtu.be/MHKFzkuZSmk",
            "https://youtu.be/_127QgkSta8",
            "https://youtu.be/b-WBBnN4I6Y",
            "https://youtu.be/rMS1-ykTQ4Y",
            "https://youtu.be/dLlepKTL6PQ",
            "https://youtu.be/qWthmDRIQas",
            "https://youtu.be/WXGPc53AUpU",
            "https://youtu.be/84TLhkYh7Jk",
            "https://youtu.be/Wg8C9vGr_Dg",
            "https://youtu.be/YXS-vEpdneA",
            "https://youtu.be/qPmPnbsv57k",
        ] },
        { name: { th: "ช่องอื่นๆ", en: "Other channels" }, links: [
            "https://youtu.be/MiB1CGf2ikE",
        ] },
      ]
    },
    {
      id: "reels",
      vertical: true,      // true = การ์ดแนวตั้ง 9:16
      eyebrow: { th: "TikTok / Reels", en: "TikTok / Reels" },
      title:   { th: "คลิปสั้น", en: "Short-form" },
      sub:     { th: "TikTok, Reels และ YouTube Shorts", en: "TikTok, Reels and YouTube Shorts" },
      links: [
        { link: "https://www.tiktok.com/@netflixth/video/7624485741120228622",   cover: "images/reels/01.jpg" },
        { link: "https://www.tiktok.com/@laopaireuay/video/7639094742835301640", cover: "images/reels/02.jpg" },
        // เพิ่มคลิป: ก๊อปบรรทัดบนแล้วแก้ลิงก์ · cover = รูปปกที่แคปมาวางใน images/reels (ไม่มีก็ลบ cover ออกได้)
      ]
    },
    {
      id: "internship",
      eyebrow: { th: "Internship", en: "Internship" },
      title:   { th: "ผลงานช่วงฝึกงาน", en: "Internship work" },
      sub:     { th: "จุดเริ่มต้นก่อนเป็น editor เต็มตัว", en: "Where it started" },
      links: [
        "https://youtu.be/Cyq_YOyt-iE",
        "https://youtu.be/a0DGoBeR2s8",
        { link: "https://youtu.be/VuFtabGBNdY", note: { th: "ไม่ได้ออนแอร์", en: "Unreleased" } },
        "https://youtu.be/y_oiTftvLwY",
        "https://youtu.be/nuZ-tS3gIco",
        "https://youtu.be/cEsLGhOzKRc",
      ]
    },
  ],

  /* ---------- ภาพถ่ายคอนเสิร์ต ----------
     จัดเรียงเต็มแถวให้เอง ตามสัดส่วนจริงของแต่ละรูป (ไม่ครอป)
     featured: true = ภาพเด่น ขึ้นเต็มความกว้างด้านบน (ใส่รูปเดียว)
     เพิ่มรูป: วางไฟล์ใน images/concert แล้วก๊อปบรรทัดล่างสุดมาแก้ชื่อไฟล์
     (thumb, w, h ไม่ใส่ก็ได้ · caption = ชื่องาน/ศิลปิน เว้นว่างได้) */
  photos: [
    { src: "images/concert/URI06498.jpg", thumb: "images/concert/thumb/URI06498.jpg", w: 2000, h: 1125, featured: true, caption: { th: "", en: "" } },
    { src: "images/concert/URI06393.jpg", thumb: "images/concert/thumb/URI06393.jpg", w: 1620, h: 1080, caption: { th: "", en: "" } },
    { src: "images/concert/URI06403.jpg", thumb: "images/concert/thumb/URI06403.jpg", w: 1919, h: 1080, caption: { th: "", en: "" } },
    { src: "images/concert/URI06404.jpg", thumb: "images/concert/thumb/URI06404.jpg", w: 1919, h: 1080, caption: { th: "", en: "" } },
    { src: "images/concert/URI06464.jpg", thumb: "images/concert/thumb/URI06464.jpg", w: 2000, h: 1125, caption: { th: "", en: "" } },
    { src: "images/concert/URI06467.jpg", thumb: "images/concert/thumb/URI06467.jpg", w: 2000, h: 1333, caption: { th: "", en: "" } },
    { src: "images/concert/URI06469.jpg", thumb: "images/concert/thumb/URI06469.jpg", w: 2000, h: 1333, caption: { th: "", en: "" } },
    { src: "images/concert/URI06472.jpg", thumb: "images/concert/thumb/URI06472.jpg", w: 2000, h: 1125, caption: { th: "", en: "" } },
    { src: "images/concert/URI06474.jpg", thumb: "images/concert/thumb/URI06474.jpg", w: 2000, h: 1125, caption: { th: "", en: "" } },
    { src: "images/concert/URI06475.jpg", thumb: "images/concert/thumb/URI06475.jpg", w: 2000, h: 1125, caption: { th: "", en: "" } },
    { src: "images/concert/URI06476.jpg", thumb: "images/concert/thumb/URI06476.jpg", w: 2000, h: 1088, caption: { th: "", en: "" } },
    { src: "images/concert/URI06478.jpg", thumb: "images/concert/thumb/URI06478.jpg", w: 2000, h: 1125, caption: { th: "", en: "" } },
    { src: "images/concert/URI06480.jpg", thumb: "images/concert/thumb/URI06480.jpg", w: 2000, h: 1333, caption: { th: "", en: "" } },
    { src: "images/concert/URI06481.jpg", thumb: "images/concert/thumb/URI06481.jpg", w: 2000, h: 1125, caption: { th: "", en: "" } },
    { src: "images/concert/URI06484.jpg", thumb: "images/concert/thumb/URI06484.jpg", w: 1125, h: 2000, caption: { th: "", en: "" } },
    { src: "images/concert/URI06489.jpg", thumb: "images/concert/thumb/URI06489.jpg", w: 2000, h: 1125, caption: { th: "", en: "" } },
    { src: "images/concert/URI06490.jpg", thumb: "images/concert/thumb/URI06490.jpg", w: 2000, h: 1507, caption: { th: "", en: "" } },
    { src: "images/concert/URI06599.jpg", thumb: "images/concert/thumb/URI06599.jpg", w: 1080, h: 720, caption: { th: "", en: "" } },
    { src: "images/concert/URI06647.jpg", thumb: "images/concert/thumb/URI06647.jpg", w: 1080, h: 608, caption: { th: "", en: "" } },
    { src: "images/concert/URI06650.jpg", thumb: "images/concert/thumb/URI06650.jpg", w: 1080, h: 608, caption: { th: "", en: "" } },
    { src: "images/concert/URI06929.jpg", thumb: "images/concert/thumb/URI06929.jpg", w: 1125, h: 2000, caption: { th: "", en: "" } },
    { src: "images/concert/URI06953.jpg", thumb: "images/concert/thumb/URI06953.jpg", w: 1919, h: 1080, caption: { th: "", en: "" } },
    { src: "images/concert/_MG_4856-2.jpg", thumb: "images/concert/thumb/_MG_4856-2.jpg", w: 1749, h: 1080, caption: { th: "", en: "" } },
    { src: "images/concert/_MG_4882.jpg", thumb: "images/concert/thumb/_MG_4882.jpg", w: 1350, h: 1080, caption: { th: "", en: "" } },
    { src: "images/concert/_MG_4917.jpg", thumb: "images/concert/thumb/_MG_4917.jpg", w: 1924, h: 1080, caption: { th: "", en: "" } },
    { src: "images/concert/_MG_4925.jpg", thumb: "images/concert/thumb/_MG_4925.jpg", w: 1924, h: 1080, caption: { th: "", en: "" } },
    { src: "images/concert/_MG_4966.jpg", thumb: "images/concert/thumb/_MG_4966.jpg", w: 1350, h: 1080, caption: { th: "", en: "" } },
    { src: "images/concert/_MG_5059.jpg", thumb: "images/concert/thumb/_MG_5059.jpg", w: 1620, h: 1080, caption: { th: "", en: "" } },
    { src: "images/concert/_MG_5095.jpg", thumb: "images/concert/thumb/_MG_5095.jpg", w: 1620, h: 1080, caption: { th: "", en: "" } },
    { src: "images/concert/_MG_5100.jpg", thumb: "images/concert/thumb/_MG_5100.jpg", w: 1919, h: 1080, caption: { th: "", en: "" } },
    { src: "images/concert/_MG_5116.jpg", thumb: "images/concert/thumb/_MG_5116.jpg", w: 1919, h: 1080, caption: { th: "", en: "" } },
    { src: "images/concert/_MG_5130.jpg", thumb: "images/concert/thumb/_MG_5130.jpg", w: 1919, h: 1080, caption: { th: "", en: "" } },
    { src: "images/concert/_MG_5150.jpg", thumb: "images/concert/thumb/_MG_5150.jpg", w: 1080, h: 1919, caption: { th: "", en: "" } },
  ]
};

// =====================================================
//  EDIT THIS PART ONLY
// =====================================================

// Categories. "id" links videos to a category. "tint" is the card
// colour shown until the category has at least one video.
const CATEGORIES = [
  { id: "food",        name: "Food Vloggers & Reviewers", note: "Mouth-watering reels and review edits.",          tint: "#7a5c2e" },
  { id: "vlog",        name: "Vlogs",                     note: "Daily dose on of you.",                           tint: "#8a5a3a" },
  { id: "ai",          name: "AI Videos",                 note: "AI-generated and AI-assisted edits.",             tint: "#3d4a63" },
  { id: "comedy",      name: "Edits for Comedians",       note: "Fast, punchy cuts for stand-up and sketches.",    tint: "#7a3f55" },
  { id: "interviews",  name: "Interviews",                note: "Conversations that people listen",                tint: "#8a7a2a" },
  { id: "ads",         name: "Performance Ads",           note: "Ads built to convert.",                           tint: "#3f6b55" },
  { id: "informative", name: "Informative Creators",      note: "Clear, engaging edits for explainer content.",    tint: "#3f6a7a" }
];

// VIDEO SLOTS. Paste the full YouTube link between the quotes of "link".
// Works with any of these:
//   https://www.youtube.com/watch?v=XXXXXXXXXXX
//   https://www.youtube.com/shorts/XXXXXXXXXXX
//   https://youtu.be/XXXXXXXXXXX
// "title" is optional. "vertical" is optional too: shorts links are detected
// automatically; for a vertical reel with a normal link, set vertical: true.
// Empty slots are ignored. To add more, copy a line and paste it below.
const VIDEOS = [
  // ---- FOOD VLOGGERS & REVIEWERS ----
  { cat: "food", title: "", link: "https://youtube.com/shorts/g1xUEkjIVAg?feature=share" },
  { cat: "food", title: "", link: "https://youtube.com/shorts/3khH6w1YBUQ?feature=share" },
  { cat: "food", title: "", link: "https://youtube.com/shorts/w8RgmXDuAY0?feature=share" },

  // ---- VLOGS ----
  { cat: "vlog", title: "", link: "https://youtu.be/kbQt_sXKvb0?si=G1FFmu001TQYQMVw" },
  { cat: "vlog", title: "", link: "https://youtu.be/o3iDAbqjOIU?si=a_q4NcyeGamjE9co" },
  { cat: "vlog", title: "", link: "https://youtu.be/rvdbOV-jZaU?si=w6ygDNrdbcJOcVQ-" },
  { cat: "vlog", title: "", link: "https://youtu.be/8TZOPMOrjJU?si=j2srVnDwGLVL8Wpj" },


  // ---- AI VIDEOS ----
  { cat: "ai", title: "", link: "https://youtube.com/shorts/yF4yMOFuV64?feature=share" },
  { cat: "ai", title: "", link: "" },
  { cat: "ai", title: "", link: "" },

  // ---- EDITS FOR COMEDIANS ----
  { cat: "comedy", title: "", link: "https://youtube.com/shorts/90FYGk2qtRY?feature=share" },
  { cat: "comedy", title: "", link: "" },
  { cat: "comedy", title: "", link: "" },

  // ---- INTERVIEWS ----
  { cat: "interviews", title: "", link: "https://youtube.com/shorts/yc2T-l00Ks0?feature=share" },
  { cat: "interviews", title: "", link: "" },
  { cat: "interviews", title: "", link: "" },

  // ---- PERFORMANCE ADS ----
  { cat: "ads", title: "", link: "" },
  { cat: "ads", title: "", link: "" },
  { cat: "ads", title: "", link: "" },

  // ---- EDITS FOR INFORMATIVE CREATORS ----
  { cat: "informative", title: "", link: "https://youtube.com/shorts/jzxqxcW5Utg?feature=share" },
  { cat: "informative", title: "", link: "https://youtube.com/shorts/ef1PcznYZiY?feature=share" },
  { cat: "informative", title: "", link: "https://youtube.com/shorts/g1xUEkjIVAg?feature=share" }
];

// =====================================================
//  DON'T NEED TO TOUCH BELOW
// =====================================================

const cardsEl = document.getElementById("cards");
const modal = document.getElementById("modal");
const grid = document.getElementById("grid");
const mTitle = document.getElementById("modal-title");
const mNote = document.getElementById("modal-note");

function ytId(s) {
  s = (s || "").trim();
  if (!s) return "";
  const m = s.match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([A-Za-z0-9_-]{11})/);
  if (m) return m[1];
  return /^[A-Za-z0-9_-]{11}$/.test(s) ? s : "";
}

const thumb = id => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

function videosOf(catId) {
  return VIDEOS
    .filter(v => v.cat === catId && ytId(v.link))
    .map(v => ({
      id: ytId(v.link),
      title: v.title || "",
      vertical: typeof v.vertical === "boolean" ? v.vertical : /\/shorts\//.test(v.link)
    }));
}

// category cards
CATEGORIES.forEach(c => {
  const list = videosOf(c.id);
  const btn = document.createElement("button");
  btn.className = "card";
  btn.style.backgroundColor = c.tint;
  if (list[0]) btn.style.backgroundImage = `url(${thumb(list[0].id)})`;
  const count = list.length ? `${list.length} video${list.length === 1 ? "" : "s"}` : "coming soon";
  btn.innerHTML = `<div class="card-info"><h3>${c.name}</h3><span>${count}</span></div>`;
  btn.addEventListener("click", () => openCategory(c));
  cardsEl.appendChild(btn);
});

function openCategory(c) {
  mTitle.textContent = c.name;
  mNote.textContent = c.note || "";
  grid.innerHTML = "";
  const list = videosOf(c.id);

  if (!list.length) grid.innerHTML = '<p class="empty">Videos coming soon.</p>';

  list.forEach(v => {
    const wrap = document.createElement("div");
    const box = document.createElement("div");
    box.className = "vid" + (v.vertical ? " vertical" : "");
    box.innerHTML = `<img src="${thumb(v.id)}" alt="${v.title || c.name}" loading="lazy"><span class="play"></span>`;
    box.addEventListener("click", () => {
      box.innerHTML = `<iframe src="https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    }, { once: true });
    wrap.appendChild(box);
    if (v.title) {
      const t = document.createElement("p");
      t.className = "vid-title";
      t.textContent = v.title;
      wrap.appendChild(t);
    }
    grid.appendChild(wrap);
  });

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("lock");
  modal.scrollTop = 0;
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lock");
  grid.innerHTML = ""; // also stops any playing video
}

document.getElementById("close").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

// polaroid pic swap (only if data-hover is set on the img)
const me = document.querySelector(".polaroid img");
if (me && me.dataset.hover) {
  const a = me.getAttribute("src"), b = me.dataset.hover;
  new Image().src = b;
  const show = x => () => { me.src = x; };
  me.addEventListener("mouseenter", show(b));
  me.addEventListener("mouseleave", show(a));
  me.addEventListener("click", () => { me.src = me.getAttribute("src") === a ? b : a; });
}

// scroll reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();
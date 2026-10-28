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

// VIDEO SLOTS. Paste a YouTube OR Instagram reel link between the quotes of "link".
// Works with any of these:
//   https://www.youtube.com/watch?v=XXXXXXXXXXX
//   https://www.youtube.com/shorts/XXXXXXXXXXX
//   https://youtu.be/XXXXXXXXXXX
//   https://www.instagram.com/reel/XXXXXXXXXXX/
// "title" is optional. "vertical" is optional too: shorts and Instagram reels
// are detected automatically; for a vertical YouTube video with a normal link,
// set vertical: true.
// "thumb" is optional: a cover image for Instagram reels, like thumb: "thumbs/food1.jpg"
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

// CREATORS I'VE WORKED WITH
// followers: type it yourself, like "125K" (leave "" to hide it)
// img: path to a saved profile pic, like "creators/madhavrox.jpg"
//      (leave "" to show a letter circle instead)
const CREATORS = [
  { handle: "naughtythenani",              followers: "", img: "" },
  { handle: "madhavrox",                   followers: "", img: "" },
  { handle: "seriesmaddy",                 followers: "", img: "" },
  { handle: "hellodeeep",                  followers: "", img: "" },
  { handle: "tasty_table_tales",           followers: "", img: "" },
  { handle: "avenoyasjournal",             followers: "", img: "" },
  { handle: "mediummasala",                followers: "", img: "" },
  { handle: "swaritkapoor_",               followers: "", img: "" },
  { handle: "whaaatislife",                followers: "", img: "" },
  { handle: "vidhiidiariess",              followers: "", img: "" },
  { handle: "theskygupta",                 followers: "", img: "" },
  { handle: "biswakalyanrath",             followers: "", img: "" },
  { handle: "marketsbyaryan",              followers: "", img: "" },
  { handle: "sakshilalwani_nutritionist",  followers: "", img: "" },
  { handle: "jhakaasflavoursofmumbai",     followers: "", img: "" }
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

function igId(s) {
  const m = (s || "").match(/instagram\.com\/(?:[\w.]+\/)?(?:reel|reels|p|tv)\/([A-Za-z0-9_-]+)/);
  return m ? m[1] : "";
}

const ytThumb = id => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

function videosOf(catId) {
  return VIDEOS
    .filter(v => v.cat === catId && (igId(v.link) || ytId(v.link)))
    .map(v => {
      const ig = igId(v.link);
      return {
        type: ig ? "ig" : "yt",
        id: ig || ytId(v.link),
        title: v.title || "",
        thumb: v.thumb || (ig ? "" : ytThumb(ytId(v.link))),
        vertical: ig ? true : (typeof v.vertical === "boolean" ? v.vertical : /\/shorts\//.test(v.link))
      };
    });
}

// category cards
CATEGORIES.forEach(c => {
  const list = videosOf(c.id);
  const btn = document.createElement("button");
  btn.className = "card";
  btn.style.backgroundColor = c.tint;
  const cover = list.find(v => v.thumb);
  if (cover) btn.style.backgroundImage = `url(${cover.thumb})`;
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
    box.className = "vid" + (v.vertical ? " vertical" : "") + (v.type === "ig" ? " ig" : "");
    box.innerHTML =
      (v.thumb ? `<img src="${v.thumb}" alt="${v.title || c.name}" loading="lazy">` : "") +
      (v.type === "ig" && !v.thumb ? '<span class="ig-label">Instagram reel</span>' : "") +
      '<span class="play"></span>';
    box.addEventListener("click", () => {
      const src = v.type === "ig"
        ? `https://www.instagram.com/p/${v.id}/embed`
        : `https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
      box.innerHTML = `<iframe src="${src}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
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

// ---------- creators slider ----------
function creatorAvatar(c) {
  const fallback = () => {
    const d = document.createElement("div");
    d.className = "avatar";
    d.textContent = c.handle.replace(/[^a-z0-9]/gi, "")[0].toUpperCase();
    return d;
  };
  if (!c.img) return fallback();
  const i = new Image();
  i.className = "avatar";
  i.alt = "";
  i.loading = "lazy";
  i.src = c.img;
  i.onerror = () => i.replaceWith(fallback());
  return i;
}

const track = document.getElementById("track");

// the list is shown 3 times so the loop never runs out
[...CREATORS, ...CREATORS, ...CREATORS].forEach((c, n) => {
  const a = document.createElement("a");
  a.className = "creator";
  a.href = `https://www.instagram.com/${c.handle}/`;
  a.target = "_blank";
  a.rel = "noopener";
  if (n >= CREATORS.length) { a.setAttribute("aria-hidden", "true"); a.tabIndex = -1; }
  a.appendChild(creatorAvatar(c));
  const t = document.createElement("div");
  t.innerHTML = `<b>@${c.handle}</b>` + (c.followers ? `<span>${c.followers} followers</span>` : "");
  a.appendChild(t);
  track.appendChild(a);
});
track.querySelectorAll("a,img").forEach(x => x.draggable = false);

// auto-scroll + manual scroll
const marquee = document.querySelector(".marquee");
const SPEED = 40; // pixels per second, raise it to go faster
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
let pos = 0, last = 0, holdUntil = 0;
let hovering = false, touching = false, dragging = false;
let startX = 0, startScroll = 0, moved = 0;

const oneSet = () => track.scrollWidth / 3;
const pauseFor = ms => { holdUntil = performance.now() + ms; };

marquee.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") hovering = true; });
marquee.addEventListener("pointerleave", () => { hovering = false; });
marquee.addEventListener("wheel", () => pauseFor(2500), { passive: true });
marquee.addEventListener("touchstart", () => { touching = true; }, { passive: true });
marquee.addEventListener("touchend", () => { touching = false; pauseFor(2000); });

// click and drag with a mouse
marquee.addEventListener("pointerdown", e => {
  if (e.pointerType !== "mouse") return;
  dragging = true; moved = 0; startX = e.clientX; startScroll = marquee.scrollLeft;
  marquee.classList.add("drag");
});
addEventListener("pointermove", e => {
  if (!dragging) return;
  const d = e.clientX - startX;
  moved = Math.max(moved, Math.abs(d));
  marquee.scrollLeft = startScroll - d;
});
const endDrag = () => {
  if (!dragging) return;
  dragging = false;
  marquee.classList.remove("drag");
  pauseFor(2000);
};
addEventListener("pointerup", endDrag);
addEventListener("pointercancel", endDrag);

// a drag should not count as a click on a card
marquee.addEventListener("click", e => {
  if (moved > 5) { e.preventDefault(); e.stopPropagation(); moved = 0; }
}, true);

// endless loop in both directions
marquee.addEventListener("scroll", () => {
  const w = oneSet();
  if (marquee.scrollLeft >= 2 * w) marquee.scrollLeft -= w;
  else if (marquee.scrollLeft <= 0) marquee.scrollLeft += w;
});

function tick(t) {
  const dt = Math.min(t - last, 50) / 1000;
  last = t;
  if (hovering || touching || dragging || performance.now() < holdUntil) {
    pos = marquee.scrollLeft;
  } else {
    pos += SPEED * dt;
    if (pos >= 2 * oneSet()) pos -= oneSet();
    marquee.scrollLeft = pos;
  }
  requestAnimationFrame(tick);
}
requestAnimationFrame(t => {
  pos = oneSet();
  marquee.scrollLeft = pos;
  last = t;
  if (!reduceMotion) tick(t);
});

// ---------- scroll reveal ----------
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();
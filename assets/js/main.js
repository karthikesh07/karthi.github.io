document.documentElement.classList.add("js");

/* ---------- Data ---------- */
const experiences = [
  {
    company: "Rakuten Symphony Deutschland",
    role: "AI Automation Engineer",
    dates: "Nov 2025 – present",
    location: "Düsseldorf, Germany",
    tags: ["LangChain", "LangGraph", "FastAPI", "OpenAI", "Gemini", "React", "YugabyteDB"],
    bullets: [
      "Designed a two-phase LLM streaming agent with mid-stream tool interception (LangChain + FastAPI), letting the model call tools safely while a response is still streaming to the user.",
      "Integrated OpenAI and Gemini behind one orchestration layer — composable nodes, prompt chaining and dynamic model selection — surfaced in a visual drag-and-drop workflow canvas.",
      "Built a natural-language → SQL/CQL agent pipeline with live schema injection as LLM context, unifying PostgreSQL, MySQL, SQLite and YugabyteDB behind a single queried interface.",
      "Owned the product end to end — agent orchestration, tool use and the React SPA — shipping a production AI automation system solo.",
    ],
  },
  {
    company: "Rakuten Symphony Deutschland",
    role: "Software Engineer",
    dates: "Dec 2022 – Oct 2025",
    location: "Düsseldorf, Germany",
    tags: ["Python", "Ansible", "YugabyteDB", "ETL", "Kubernetes", "Apache Airflow", "Robin (private cloud)"],
    bullets: [
      "Built and optimized ETL processes — API-sourced, Python-based KPI extraction — loading structured datasets into YugabyteDB for downstream analytical workloads.",
      "Orchestrated end-to-end automation of multi-node Kubernetes cluster upgrades with Python and Ansible, cutting manual intervention by over 90% and removing a whole class of human error.",
      "Automated recurring data preparation and reporting workflows, raising throughput and consistency of analytical outputs.",
      "Worked across the full SDLC — analysis, design and development of a custom automation product on the Robin private cloud platform.",
    ],
  },
  {
    company: "WeDance",
    role: "Intern — Frontend Developer",
    dates: "Jun 2022 – Nov 2022",
    location: "Remote, Germany",
    tags: ["Vue.js", "User research", "Usability testing"],
    bullets: [
      "Designed and implemented reusable Vue.js components to enhance application functionality.",
      "Ran user research and usability testing to ground landing page design decisions in real user feedback.",
    ],
  },
];

const works = [
  {
    type: "LLM Agents",
    year: "2025 – present",
    title: "Streaming Agent Platform",
    role: "AI Automation Engineer · Rakuten Symphony",
    desc: "Two-phase streaming agent with mid-stream tool interception, prompt chaining and a drag-and-drop canvas where OpenAI and Gemini are swappable, composable nodes.",
    highlights: [
      "Two-phase streaming: the model plans and streams a response while deciding when to invoke tools mid-stream, then continues with the tool result woven in.",
      "Mid-stream tool interception with LangChain + FastAPI, so tool calls are executed and validated while the response is still being generated.",
      "OpenAI and Gemini integrated behind one orchestration layer — composable nodes, prompt chaining, dynamic model selection — on a visual drag-and-drop canvas.",
      "Owned end to end: agent orchestration, tool use and the React SPA shipped solo.",
    ],
    tags: ["LangChain", "FastAPI", "React", "Streaming"],
  },
  {
    type: "SQL AI",
    year: "2025",
    title: "NL→SQL Across Four Databases",
    role: "AI Automation Engineer · Rakuten Symphony",
    desc: "Natural-language querying with live schema injection as LLM context — one grounded interface over PostgreSQL, MySQL, SQLite and YugabyteDB.",
    highlights: [
      "Live schema injection: tables, columns and types are injected as LLM context at query time, so generated SQL is grounded in the actual database shape — not hallucinated.",
      "One natural-language interface across PostgreSQL, MySQL, SQLite and YugabyteDB, with dialect-aware SQL and CQL generation.",
      "Schema changes propagate automatically into prompts — no prompt rewrites when the database evolves.",
      "Built for both analysts and engineers: ask in plain language, get auditable queries and results back.",
    ],
    tags: ["Python", "FastAPI", "SQL", "CQL", "YugabyteDB"],
  },
  {
    type: "Thesis · Data Viz",
    year: "2024 – 2025",
    title: "Supply Chain Simulation Visualizer",
    role: "M.Sc. Thesis · Otto von Guericke University",
    desc: "Master thesis: dynamic geospatial visualization for macroscopic supply chain simulation models — Flask APIs stream simulation data with real-time front-end updates.",
    highlights: [
      "Dynamic web-based geospatial visualization of macroscopic supply chain simulation models.",
      "Flask APIs load and serve simulation data on demand, enabling real-time front-end updates.",
      "Efficient handling of large simulation datasets without freezing the browser.",
      "Folium and Dash chosen for map rendering and interactive dashboards over heavyweight alternatives.",
    ],
    tags: ["Python", "Flask", "Folium", "Dash"],
  },
  {
    type: "ML Research",
    year: "2023",
    title: "Vessel Segmentation with Deep Learning",
    role: "Research Project · OVGU",
    desc: "MRI vessel segmentation improved via maximum intensity projection, comparing U-Net and U-Net MSS architectures across vessel sizes.",
    highlights: [
      "Manual segmentation of MRI images with Ilastik and 3D-Slicer to build ground truth.",
      "Maximum intensity projection (MIP) preprocessing to sharpen thin-vessel visibility before training.",
      "Compared U-Net and U-Net MSS architectures across different vessel size classes.",
      "Python + PyTorch training and evaluation pipeline from scratch.",
    ],
    tags: ["Python", "PyTorch", "Ilastik", "3D-Slicer"],
  },
];

/* ---------- Experience: numbered timeline ---------- */
const expList = document.getElementById("expList");
experiences.forEach((exp, i) => {
  const id = `exp-details-${i}`;
  const item = document.createElement("article");
  item.className = "exp-item reveal";

  item.innerHTML = `
    <div class="exp-index" aria-hidden="true">${String(i + 1).padStart(2, "0")}</div>
    <div class="exp-body">
      <div class="exp-topline">${exp.dates} · ${exp.location}</div>
      <button class="exp-head" type="button" aria-expanded="false" aria-controls="${id}">
        <span class="exp-main">
          <span class="exp-role">${exp.role}</span>
          <span class="exp-company">${exp.company}</span>
        </span>
        <span class="exp-arrow" aria-hidden="true">▾</span>
      </button>
      <div class="exp-details" id="${id}" role="region" aria-label="${exp.role} details">
        <div class="exp-details-inner">
          <ul>${exp.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
          <div class="exp-tags">${exp.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
        </div>
      </div>
      <button class="exp-show" type="button" aria-expanded="false" aria-controls="${id}">Show details</button>
    </div>
  `;

  const head = item.querySelector(".exp-head");
  const show = item.querySelector(".exp-show");
  const details = item.querySelector(".exp-details");
  const arrow = item.querySelector(".exp-arrow");

  let open = false;
  const setOpen = (state) => {
    open = state;
    details.classList.toggle("open", open);
    head.setAttribute("aria-expanded", open);
    show.setAttribute("aria-expanded", open);
    show.textContent = open ? "Hide details" : "Show details";
    arrow.style.transform = open ? "rotate(180deg)" : "";
  };
  const toggle = () => setOpen(!open);

  head.addEventListener("click", toggle);
  show.addEventListener("click", toggle);
  expList.appendChild(item);
});

/* ---------- Work: typographic cards + case write-up ---------- */
const workGrid = document.getElementById("workGrid");
works.forEach((w, i) => {
  const card = document.createElement("article");
  card.className = "work-card reveal";
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `Open case study: ${w.title}`);
  card.innerHTML = `
    <div class="work-cover" aria-hidden="true">
      <span class="cover-num">${String(i + 1).padStart(2, "0")}</span>
      <span class="cover-type">${w.type}</span>
    </div>
    <div class="card-body">
      <div class="work-topline">${w.year}</div>
      <h3 class="work-title">${w.title}</h3>
      <p class="work-desc">${w.desc}</p>
      <div class="work-tags">${w.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
      <span class="work-hint" aria-hidden="true">View write-up →</span>
    </div>
  `;

  const openFn = () => openCase(w, card);
  card.addEventListener("click", openFn);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openFn();
    }
  });
  workGrid.appendChild(card);
});

/* ---------- Case write-up overlay ---------- */
function buildCaseModal() {
  const modal = document.createElement("div");
  modal.className = "case-modal";
  modal.id = "caseModal";
  modal.hidden = true;
  modal.innerHTML = `
    <div class="case-backdrop" data-close></div>
    <div class="case-panel" role="dialog" aria-modal="true" aria-labelledby="caseTitle">
      <button class="case-close" type="button" data-close aria-label="Close case study">✕</button>
      <div class="case-body" id="caseBody"></div>
    </div>
  `;
  document.body.appendChild(modal);
  return modal;
}
const caseModal = buildCaseModal();
const caseBody = document.getElementById("caseBody");
let lastFocused = null;

function openCase(w, card) {
  lastFocused = card || document.activeElement;
  caseBody.innerHTML = `
    <div class="case-topline">
      <span class="case-type">${w.type}</span>
      <span class="case-year">${w.year}</span>
    </div>
    <h2 class="case-title" id="caseTitle">${w.title}</h2>
    <p class="case-role">${w.role}</p>
    <p class="case-desc">${w.desc}</p>
    <h3 class="case-heading">Highlights</h3>
    <ul class="case-points">${w.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>
    <h3 class="case-heading">Stack</h3>
    <div class="exp-tags">${w.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
  `;
  caseModal.hidden = false;
  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => caseModal.classList.add("open"));
  caseModal.querySelector(".case-close").focus();
}

function closeCase() {
  caseModal.classList.remove("open");
  document.body.style.overflow = "";
  setTimeout(() => { caseModal.hidden = true; }, 250);
  if (lastFocused) lastFocused.focus();
}

caseModal.addEventListener("click", (e) => {
  if (e.target.closest("[data-close]")) closeCase();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !caseModal.hidden) closeCase();
});

/* ---------- Theme ---------- */
const themeBtn = document.getElementById("themeToggle");
const root = document.documentElement;
const stored = localStorage.getItem("theme");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
if (stored) root.setAttribute("data-theme", stored);
else root.setAttribute("data-theme", systemDark ? "dark" : "light");

const setIcon = () => { themeBtn.textContent = root.getAttribute("data-theme") === "dark" ? "☀" : "☾"; };
setIcon();
themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  setIcon();
});

/* ---------- Copy email ---------- */
document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const text = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    const original = btn.textContent;
    btn.textContent = "Copied ✓";
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
    }, 1800);
  });
});

/* ---------- Header scroll state ---------- */
const header = document.getElementById("siteHeader");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* ---------- Active nav link ---------- */
const navLinks = [...document.querySelectorAll("#navLinks a")];
const byHash = Object.fromEntries(navLinks.map((a) => [a.getAttribute("href").slice(1), a]));
const sectionSpy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const link = byHash[entry.target.id];
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach((a) => a.removeAttribute("data-active"));
        link.setAttribute("data-active", "");
      }
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);
["about", "skills", "experience", "work", "contact"].forEach((id) => {
  const el = document.getElementById(id);
  if (el) sectionSpy.observe(el);
});

/* ---------- Reveal on scroll (no JS => everything visible) ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.setProperty("--reveal-delay", `${(i % 6) * 70}ms`);
  revealObserver.observe(el);
});

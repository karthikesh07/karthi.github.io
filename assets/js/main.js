document.documentElement.classList.add("js");

const experiences = [
  {
    company: "Rakuten Symphony Deutschland",
    role: "AI Automation Engineer",
    dates: "Nov 2025 – present",
    location: "Düsseldorf, Germany",
    tags: "LangChain · FastAPI · OpenAI · Gemini · React · YugabyteDB · SQL/CQL",
    bullets: [
      "Built a two-phase LLM streaming agent with mid-stream tool interception using LangChain and FastAPI — replicating core production agentic patterns.",
      "Integrated OpenAI and Google Gemini as configurable, composable nodes with prompt chaining and dynamic model selection in a visual drag-and-drop workflow canvas.",
      "Implemented a natural language to SQL/CQL pipeline with live schema injection as LLM context, querying across PostgreSQL, MySQL, SQLite, and YugabyteDB.",
      "Owned the full stack — LLM orchestration, tool use, and React SPA — delivering an end-to-end AI-powered product independently.",
    ],
  },
  {
    company: "Rakuten Symphony Deutschland",
    role: "Software Engineer",
    dates: "Dec 2022 – Oct 2025",
    location: "Düsseldorf, Germany",
    tags: "Python · Ansible · YugabyteDB · ETL · Kubernetes · Robin (private cloud)",
    bullets: [
      "Developed and optimized ETL processes to extract data from APIs, leveraging Python for KPI extraction and loading structured datasets into YugabyteDB.",
      "Orchestrated end-to-end automation of multi-node cluster upgrades using Python and Ansible, reducing manual intervention by over 90% and minimizing human error.",
      "Automated recurring data preparation and reporting workflows, improving processing efficiency and increasing consistency of analytical outputs.",
      "Involved in various phases of SDLC — analysis, design and development of a Custom Automation product using private cloud (Robin).",
    ],
  },
  {
    company: "WeDance",
    role: "Intern – Frontend Developer",
    dates: "Jun 2022 – Nov 2022",
    location: "Remote, Germany",
    tags: "Vue.js · User research · Usability testing",
    bullets: [
      "Designed and implemented reusable Vue.js components to enhance application functionality.",
      "Participated in user research and usability testing to inform design decisions for the landing page.",
    ],
  },
];

const works = [
  {
    num: "01",
    type: "AI System",
    year: "2025",
    title: "LLM Streaming Agent Platform",
    desc: "A two-phase LLM streaming agent with mid-stream tool interception and a visual drag-and-drop workflow canvas, with OpenAI and Gemini as switchable nodes.",
    tags: "LangChain · FastAPI · React · YugabyteDB",
  },
  {
    num: "02",
    type: "Data",
    year: "2025",
    title: "ETL & KPI Pipeline",
    desc: "API-sourced KPI extraction pipeline loading structured datasets into YugabyteDB, with orchestrated scheduling and reporting automation.",
    tags: "Python · YugabyteDB · Ansible · Airflow",
  },
  {
    num: "03",
    type: "Tool",
    year: "2024",
    title: "Supply Chain Simulation Visualizer",
    desc: "Master thesis: a dynamic web-based geospatial visualization tool for macroscopic supply chain simulation models, with real-time updates over Flask APIs.",
    tags: "Python · Flask · Folium · Dash",
  },
  {
    num: "04",
    type: "ML Research",
    year: "2023",
    title: "Vessel Segmentation with Deep Learning",
    desc: "MRI vessel segmentation improved via maximum intensity projection, comparing U-Net and U-Net MSS architectures across vessel sizes.",
    tags: "Python · PyTorch · Ilastik · 3D-Slicer",
  },
];

// ---- Experience: numbered timeline with Show details ----
const expList = document.getElementById("expList");
experiences.forEach((exp, i) => {
  const item = document.createElement("article");
  item.className = "exp-item reveal";
  item.innerHTML = `
    <div class="exp-index">${String(i + 1).padStart(2, "0")}</div>
    <div class="exp-body">
      <div class="exp-topline">${exp.dates} · ${exp.location}</div>
      <div class="exp-head" aria-expanded="false">
        <div class="exp-main">
          <h3>${exp.role}</h3>
          <div class="exp-company">${exp.company}</div>
        </div>
        <span class="exp-arrow">▾</span>
      </div>
      <div class="exp-details">
        <ul>${exp.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
        <div class="exp-tags">${exp.tags.split(" · ").map((t) => `<span class="tag">${t}</span>`).join("")}</div>
      </div>
      <button class="exp-show" type="button">Show details</button>
    </div>
  `;
  const head = item.querySelector(".exp-head");
  const details = item.querySelector(".exp-details");
  const show = item.querySelector(".exp-show");
  const arrow = item.querySelector(".exp-arrow");
  let open = false;
  const setOpen = () => {
    open = !open;
    details.classList.toggle("open", open);
    head.setAttribute("aria-expanded", open);
    show.textContent = open ? "Hide details" : "Show details";
    arrow.style.transform = open ? "rotate(180deg)" : "rotate(0)";
  };
  head.addEventListener("click", setOpen);
  show.addEventListener("click", setOpen);
  expList.appendChild(item);
});

// ---- Work: typographic cards ----
const workGrid = document.getElementById("workGrid");
works.forEach((w) => {
  const card = document.createElement("article");
  card.className = "work-card reveal";
  card.innerHTML = `
    <div class="work-topline">
      <span class="work-num">${w.num} / ${w.year}</span>
      <span class="work-type">${w.type}</span>
    </div>
    <h3>${w.title}</h3>
    <p>${w.desc}</p>
    <div class="work-tags">${w.tags.split(" · ").map((t) => `<span class="tag">${t}</span>`).join("")}</div>
  `;
  workGrid.appendChild(card);
});

// ---- Theme toggle ----
const themeBtn = document.getElementById("themeToggle");
const html = document.documentElement;
const saved = localStorage.getItem("theme");
if (saved) html.setAttribute("data-theme", saved);
const setIcon = () => { themeBtn.textContent = html.getAttribute("data-theme") === "dark" ? "☀" : "☾"; };
setIcon();
themeBtn.addEventListener("click", () => {
  const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
  html.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  setIcon();
});

// ---- Reveal on scroll (no JS => everything stays visible) ----
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

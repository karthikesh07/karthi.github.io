const experiences = [
  {
    company: "Rakuten Symphony Deutschland",
    role: "AI Automation Engineer",
    dates: "Nov 2025 – Present",
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
      "Developed and optimized ETL processes to extract data from APIs, leveraging Python for KPI extraction and successfully loading structured datasets into YugabyteDB.",
      "Orchestrated the end-to-end automation of multi-node cluster upgrades using Python and Ansible, reducing manual intervention by over 90% and minimizing human error.",
      "Automated recurring data preparation and reporting workflows, improving processing efficiency, reducing manual effort, and increasing consistency of analytical outputs.",
      "Involved in various phases of SDLC — analysis, design and development of a Custom Automation product using private cloud (Robin).",
    ],
  },
  {
    company: "WeDance",
    role: "Intern – Frontend Developer",
    dates: "June 2022 – Nov 2022",
    location: "Remote, Germany",
    tags: "Vue.js · User research · Usability testing",
    bullets: [
      "Designed and implemented reusable Vue.js components to enhance application functionality.",
      "Participated in user research and usability testing to inform design decisions for landing page.",
    ],
  },
];

const works = [
  {
    badge: "2026 · AI",
    title: "LLM Streaming Agent Platform",
    desc: "Two-phase LLM streaming agent with tool interception, visual drag-and-drop workflow canvas, dynamic model selection across OpenAI and Gemini.",
    tags: "LangChain · FastAPI · React · YugabyteDB",
  },
  {
    badge: "2025 · Data",
    title: "ETL & KPI Pipeline",
    desc: "API data extraction and KPI pipeline loading structured datasets into YugabyteDB, built with Python and orchestrated with Ansible.",
    tags: "Python · YugabyteDB · Ansible · ETL",
  },
  {
    badge: "2025 · Cloud",
    title: "Multi-node Cluster Upgrade Automation",
    desc: "End-to-end automation of multi-node cluster upgrades using Python and Ansible, cutting manual intervention by over 90%.",
    tags: "Python · Ansible · Kubernetes",
  },
  {
    badge: "2022 · Frontend",
    title: "WeDance Landing Page",
    desc: "Reusable Vue.js components and landing page informed by user research and usability testing.",
    tags: "Vue.js · Frontend",
  },
];

const expList = document.getElementById("expList");
experiences.forEach((exp) => {
  const item = document.createElement("article");
  item.className = "exp-item";
  item.innerHTML = `
    <div class="exp-head" aria-expanded="false">
      <div>
        <h3>${exp.role}</h3>
        <div class="exp-company">${exp.company}</div>
      </div>
      <div class="exp-dates">${exp.dates}</div>
    </div>
    <div class="exp-meta">${exp.location}</div>
    <div class="exp-details">
      <ul>
        ${exp.bullets.map((b) => `<li>${b}</li>`).join("")}
      </ul>
      <div class="exp-tags">${exp.tags.split(" · ").map((t) => `<span class="tag">${t}</span>`).join("")}</div>
    </div>
    <a href="#" class="exp-show">Show details</a>
  `;
  const head = item.querySelector(".exp-head");
  const details = item.querySelector(".exp-details");
  const show = item.querySelector(".exp-show");
  let open = false;
  function toggle() {
    open = !open;
    details.classList.toggle("open", open);
    head.setAttribute("aria-expanded", open);
    show.textContent = open ? "Hide details" : "Show details";
  }
  head.addEventListener("click", (e) => { if (e.target !== show) toggle(); });
  show.addEventListener("click", (e) => { e.preventDefault(); toggle(); });
  expList.appendChild(item);
});

const workGrid = document.getElementById("workGrid");
works.forEach((w) => {
  const card = document.createElement("article");
  card.className = "work-card";
  card.innerHTML = `
    <div class="work-thumb">
      <img src="https://picsum.photos/seed/k${Math.random()}/700/400" alt="${w.title}" loading="lazy" />
    </div>
    <div class="work-body">
      <div class="work-badge">${w.badge}</div>
      <h3>${w.title}</h3>
      <p>${w.desc}</p>
      <div class="work-tags">${w.tags.split(" · ").map((t) => `<span class="tag">${t}</span>`).join("")}</div>
    </div>
  `;
  workGrid.appendChild(card);
});

// Theme toggle
const toggle = document.getElementById("themeToggle");
const html = document.documentElement;
const saved = localStorage.getItem("theme");
if (saved) html.setAttribute("data-theme", saved);
toggle.addEventListener("click", () => {
  const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
  html.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

// GSAP reveal
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray(".exp-item, .work-card, .section-title").forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
    opacity: 0, y: 24, duration: 0.6, delay: i * 0.08,
  });
});

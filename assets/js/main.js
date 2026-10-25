document.documentElement.classList.add("js");

const experiences = [
  {
    type: "Job",
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
    type: "Job",
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
    type: "Internship",
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
  {
    type: "Project",
    company: "Master Thesis · OVGU",
    role: "Supply Chain Simulation Visualizer",
    dates: "2025 · Tool",
    location: "Magdeburg, Germany",
    tags: "Python · Flask · Folium · Dash",
    bullets: [
      "Built a dynamic web-based geospatial visualization tool for macroscopic supply chain simulation models.",
      "Flask APIs serve simulation data to the front-end with real-time updates and efficient handling of large datasets.",
    ],
  },
  {
    type: "Project",
    company: "Research Project",
    role: "Vessel Segmentation with Deep Learning",
    dates: "Research · ML",
    location: "",
    tags: "Python · PyTorch · Ilastik · 3D-Slicer",
    bullets: [
      "Manual segmentation of MRI images using Ilastik and 3D-Slicer, improved with maximum intensity projection.",
      "Segmented blood vessels of varying sizes across architectures including U-Net and U-Net MSS.",
    ],
  },
];

const expList = document.getElementById("expList");
experiences.forEach((exp, idx) => {
  const item = document.createElement("article");
  item.className = "exp-item reveal";
  item.innerHTML = `
    <div class="exp-head" aria-expanded="false">
      <span class="exp-num">${String(idx + 1).padStart(2, "0")}</span>
      <div class="exp-main">
        <h3>${exp.role}</h3>
        <div class="exp-company">${exp.company}</div>
      </div>
      <div class="exp-dates">${exp.dates}</div>
      <span class="exp-arrow">▾</span>
    </div>
    <div class="exp-meta"><span class="exp-type">${exp.type}</span>${exp.location ? " · " + exp.location : ""}</div>
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
  const arrow = item.querySelector(".exp-arrow");
  let open = false;
  function setOpen() {
    open = !open;
    details.classList.toggle("open", open);
    head.setAttribute("aria-expanded", open);
    show.textContent = open ? "Hide details" : "Show details";
    arrow.style.transform = open ? "rotate(180deg)" : "rotate(0)";
  }
  head.addEventListener("click", setOpen);
  show.addEventListener("click", (e) => { e.preventDefault(); setOpen(); });
  expList.appendChild(item);
});

// Theme toggle
const themeBtn = document.getElementById("themeToggle");
const html = document.documentElement;
const saved = localStorage.getItem("theme");
if (saved) html.setAttribute("data-theme", saved);
themeBtn.addEventListener("click", () => {
  const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
  html.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

// Reveal on scroll (progressive enhancement: no JS means nothing is hidden)
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

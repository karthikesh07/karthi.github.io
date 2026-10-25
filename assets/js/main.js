const works = [
  {
    title: "inDrive · Ride Media Platform",
    subtitle: "Global · 2026 · Brand Strategy & Positioning",
    desc: "Repositioned inDrive's in-app ad offering into a distinct media proposition, reframing the ride as a high-attention media environment. Positioning, messaging architecture, and sales narrative.",
  },
  {
    title: "Frank & Co. · A Timeless Love",
    subtitle: "Indonesia · 2026 · Creative & Strategy",
    desc: "360° diamond campaign celebrating timeless love beyond engagements and weddings, in partnership with MarsX Jakarta and Frank & Co. Jewellery.",
  },
  {
    title: "Shanghai Diamond Exchange · A Moment Worth a Carat",
    subtitle: "China · 2025 · Strategic Consulting",
    desc: "Campaign with Huang Bo centered on emotional moments, produced by Ogilvy Shanghai and Havas Shanghai.",
  },
  {
    title: "Sberbank Neighborhoods",
    subtitle: "Russia · 2017-2018 · Interactive Media",
    desc: "Turned vacant storefronts into smart, interactive media spaces using data from 80M customers. Cannes Lion Gold, D&AD, The One Show Gold, Red Dot Best of the Best.",
  },
  {
    title: "BBDO · IKEA & Nike Campaigns",
    subtitle: "Global · Integrated Campaigns",
    desc: "National campaigns for IKEA, Nike, and more. Recognized at Webby, Lovies, Clio, Epica, Eurobest, ADCR, D&AD, Red Dot.",
  },
  {
    title: "Yandex Market · Head of Brand Strategy",
    subtitle: "2021-2023 · E-commerce Growth",
    desc: "Drove 180% YoY GMV growth, launched four DTC private labels, and brought BNPL and 30-minute express delivery to market.",
  },
];

const grid = document.getElementById("workGrid");
const detail = document.getElementById("caseDetail");
const content = document.getElementById("caseContent");
const closeBtn = document.getElementById("closeCase");

works.forEach((w, i) => {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <div class="card-thumb">
      <img src="https://picsum.photos/seed/w${i}/600/400" alt="${w.title}" loading="lazy" />
    </div>
    <div class="card-body">
      <p style="font-size:0.8rem;color:var(--accent);font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">${w.subtitle.split("·")[0].trim()}</p>
      <h3>${w.title}</h3>
      <p style="font-size:0.9rem;color:var(--muted);margin-top:8px;">${w.desc}</p>
    </div>
  `;
  card.addEventListener("click", () => openCase(w));
  grid.appendChild(card);
});

function openCase(w) {
  content.innerHTML = `
    <h2>${w.title}</h2>
    <p style="font-size:0.9rem;color:var(--accent);font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:16px;">${w.subtitle}</p>
    <p>${w.desc}</p>
    <p>Role: Strategy, creative direction, and go-to-market development.</p>
  `;
  detail.classList.add("open");
  document.body.style.overflow = "hidden";
  gsap.fromTo(content, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
}

closeBtn.addEventListener("click", () => {
  detail.classList.remove("open");
  document.body.style.overflow = "";
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

// GSAP reveal on scroll
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray(".card").forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" },
    opacity: 0, y: 30, duration: 0.6, delay: i * 0.1,
  });
});

// Year
document.getElementById("year").textContent = new Date().getFullYear();

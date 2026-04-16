// ─── AUTO-CALCULATION HELPERS ───────────────────────────────────────────────

/**
 * Calculate total years of experience from an ISO date string.
 * Rounds to nearest 0.5 year.
 */
function calcYears(startDate) {
  const start = new Date(startDate);
  const now = new Date();
  const years = (now - start) / (1000 * 60 * 60 * 24 * 365.25);
  return Math.round(years * 2) / 2;
}

// ─── EXPERIENCE DATA ─────────────────────────────────────────────────────────

export const experience = [
  {
    id: 1,
    startDate: '2021-05-01',   // ← change these dates → stats auto-update
    endDate: 'Present',
    title: 'Senior Technical Trainer / AI Developer',
    company: 'Freelance',
    bullets: [
      'Architected 5 production AI + full-stack platforms from design to deployment',
      'Engineered RAG pipelines, MCP agents, and the WAT agentic orchestration framework',
      'Trained 15,000+ learners across 40+ colleges — 50% avg improvement in assessment outcomes',
      '95%+ data accuracy across LMS systems; 30% improvement in program completion rates',
    ],
  },
  {
    id: 2,
    startDate: '2023-05-01',
    endDate: '2024-12-01',
    title: 'Technical Project Manager',
    company: 'Xplore.co.in',
    bullets: [
      'Led concurrent training programs as Lead Trainer — 100% on-time delivery',
      'Built Power BI dashboards for executive-level KPI reporting',
      'Owned training calendars, batch planning, and stakeholder coordination',
    ],
  },
  {
    id: 3,
    startDate: '2018-06-01',   // ← earliest date → drives totalYearsExperience
    endDate: '2021-05-01',
    title: 'Associate Trainer',
    company: 'FACE',
    bullets: [
      'Delivered Java, Python, and SQL instruction to 80+ learners per batch',
      'Managed full session lifecycle: onboarding, attendance, feedback analysis',
    ],
  },
];

// ─── PROJECTS DATA ────────────────────────────────────────────────────────────

export const projects = [
  {
    id: 1,
    color: 'blue',
    filter: ['ai', 'fintech'],
    badge: '🏦 FinTech AI · PropIQ',
    status: 'dev',
    statusLabel: 'In Development',
    title: 'PropIQ — CRE Loan Intelligence',
    stack: 'React · Node.js · MySQL · LangChain · OpenAI API · FAISS · MCP',
    impact: 'AI platform for CRE loan servicing — RAG + MCP + risk scoring',
    bullets: [
      'RAG Pipeline: PDFs → embeddings → FAISS → LLM grounded answers',
      'MCP Tool Calling: 4 AI tools wired to live backend APIs',
      'AI Copilot with intent-routing (MCP vs RAG)',
      'Risk Engine: XGBoost default probability & revenue prediction',
    ],
    link: '#',
  },
  {
    id: 2,
    color: 'purple',
    filter: ['ai', 'edtech'],
    badge: '🎓 EdTech SaaS · Multi-tenant',
    status: 'deployed',
    statusLabel: 'Deployed',
    title: 'SkillForge — Campus Coding Ecosystem',
    stack: 'React 19 · TypeScript · FastAPI · PostgreSQL · Redis · Celery · Docker · NVIDIA AI',
    impact: 'Multi-tenant platform with 8-role RBAC and AI mentorship',
    bullets: [
      'NVIDIA AI: Socratic hints, Big-O code review, AI question generation',
      'Docker-isolated code judge for multi-language execution',
      'Celery + Redis: async sync from LeetCode, HackerRank, GFG',
      'Institution Command Center with dual-sidebar architecture',
    ],
    link: 'https://letskill.vercel.app/',
  },
  {
    id: 3,
    color: 'orange',
    filter: ['ai'],
    badge: '🤖 Agentic AI · Framework',
    status: 'internal',
    statusLabel: 'Internal',
    title: 'WAT Framework — Agentic Architecture',
    stack: 'Python · Claude API · MCP · Markdown Workflows',
    impact: 'Reliability-first agentic framework solving AI error-compounding',
    bullets: [
      'Workflows → Agent → Tools: AI decides, tools execute deterministically',
      'Solves 59% pipeline failure (5-step AI chains) → near-100% reliability',
      'Self-healing: failure → trace → fix tool → retest → update workflow',
    ],
    link: '#',
  },
  {
    id: 4,
    color: 'green',
    filter: ['edtech'],
    badge: '📈 Academic Analytics',
    status: 'deployed',
    statusLabel: 'Deployed',
    title: 'Vimysun — CP Tracker Platform',
    stack: 'React · FastAPI · PostgreSQL · Supabase · Google Sheets API · JWT/RBAC',
    impact: 'Academic intelligence with proctor-grade assessment engine',
    bullets: [
      'Auto-sync from LeetCode and HackerRank with velocity analytics',
      'Full-screen proctoring: tab-blur detection, violation logging',
      'Per-question analytics, pass rates, CSV + Sheets API exports',
    ],
    link: 'https://vimysun.vercel.app/',
  },
  {
    id: 5,
    color: 'teal',
    filter: ['saas'],
    badge: '🛠️ SaaS Platform · 63 Tools',
    status: 'dev',
    statusLabel: 'In Development',
    title: 'UtilKit — Digital Utility Platform',
    stack: 'Next.js · FastAPI · PostgreSQL · Supabase · Framer Motion · TailwindCSS',
    impact: 'Self-hosted SaaS with 63+ free productivity tools across 8 categories',
    bullets: [
      'PDF converters, image processors, grammar/writing tools, developer utilities',
      'Async task pipeline: FastAPI + APScheduler with auto file cleanup (1hr TTL)',
      'NVIDIA/OpenAI API integration for AI writing, code gen, and MCQ tools',
      '3-tier subscription system (Free/Pro/Premium) + JWT-based admin dashboard',
    ],
    link: '#',
  },
  {
    id: 6,
    color: 'purple',
    filter: ['saas'],
    badge: '🎨 Developer Portfolio',
    status: 'deployed',
    statusLabel: 'Deployed',
    title: 'Personal Portfolio — vijaysundar.dev',
    stack: 'React 18 · Vite · Vanilla CSS · Vercel',
    impact: 'Responsive developer portfolio with scroll animations & dynamic data',
    bullets: [
      'Component-driven architecture with data-driven rendering',
      'Auto-calculated stats: years of experience, project counts',
      'Typewriter effect, intersection observer animations, animated counters',
      'SEO-optimized, mobile-first, Vercel-deployed',
    ],
    link: '#',
  },
];

// ─── SKILLS DATA ──────────────────────────────────────────────────────────────

export const skills = [
  {
    icon: '🤖',
    title: 'AI / ML',
    pills: ['RAG Pipelines', 'MCP', 'LangChain', 'OpenAI API', 'Claude API', 'FAISS', 'XGBoost', 'NVIDIA AI'],
  },
  {
    icon: '⚛️',
    title: 'Frontend',
    pills: ['React 19', 'Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'TanStack Query'],
  },
  {
    icon: '⚙️',
    title: 'Backend',
    pills: ['FastAPI', 'Node.js', 'REST APIs', 'JWT', 'RBAC', 'APScheduler'],
  },
  {
    icon: '🗄️',
    title: 'Databases',
    pills: ['PostgreSQL', 'MySQL', 'Redis', 'Supabase'],
  },
  {
    icon: '🐳',
    title: 'DevOps',
    pills: ['Docker', 'Celery', 'Nginx', 'Vercel', 'Render'],
  },
  {
    icon: '📊',
    title: 'Training & Ops',
    pills: ['Technical Training', 'Power BI', 'Google Sheets API', 'MS Excel', 'LMS'],
  },
];

// ─── PROFILE ──────────────────────────────────────────────────────────────────

export const profile = {
  name: 'Vijay Sundar Nagamalla',
  email: 'vijaysundarn@gmail.com',
  phone: '+91 9391122607',
  linkedin: 'https://www.linkedin.com/in/vijaysundarn/',
  calLink: 'https://cal.com/vijay-sundar-nagumalla',
  resumePdf: '/Vijay_Sundar_Nagamalla_Resume.pdf',
  heroImage: '/images/ai_trainer_hero_isometric-Photoroom.png',
  typedPhrases: [
    'Technical Trainer — 15K+ Learners',
    'Self-Taught AI Developer',
    'RAG & Agentic AI Architect',
    'Full-Stack Engineer',
  ],
  availabilityBadge: 'Open to AI & Training Roles',
  headline1: "Hi, I'm",
  headlineGrad: 'Vijay Sundar Nagamalla',
  headline2: 'Educator & Self-Taught AI Developer',
  description:
    'From classroom to codebase — I trained 15,000+ learners in programming fundamentals, then taught myself to build production AI systems. Now I architect RAG pipelines, MCP tool-calling agents, and agentic frameworks across FinTech, EdTech, and enterprise SaaS.',
  tags: ['Technical Training', 'RAG Pipelines', 'MCP Tool Calling', 'LangChain', 'React 19', 'FastAPI', 'Agentic AI', 'Docker', 'PostgreSQL'],
  navbarCta: 'Book a Call',
  contactCta: "Let's Build Something Together",
  contactDesc:
    'Open to AI Developer, Full-Stack, Technical Training, and Applied AI roles — especially in FinTech, EdTech, and SaaS domains.',
};

// ─── AUTO-CALCULATED STATS ────────────────────────────────────────────────────
// These values derive from your data above — no manual updates needed.

const earliestStart = experience.reduce((earliest, job) => {
  const d = new Date(job.startDate);
  return d < earliest ? d : earliest;
}, new Date());

const totalYears = calcYears(earliestStart.toISOString().split('T')[0]);
const productionCount = projects.length;
const toolsCount = 63; // explicit count from UtilKit project

export const stats = [
  { value: totalYears,      suffix: '+', label: 'Years Experience',       isFloat: true },
  { value: 15000,           suffix: '+', label: 'Learners Trained',       isFloat: false },
  { value: 40,              suffix: '+', label: 'Colleges',               isFloat: false },
  { value: productionCount, suffix: '',  label: 'Production Platforms',   isFloat: false },
  { value: 50,              suffix: '%', label: 'Avg Learner Improvement', isFloat: false },
  { value: toolsCount,      suffix: '+', label: 'Tools Built (UtilKit)',   isFloat: false },
];

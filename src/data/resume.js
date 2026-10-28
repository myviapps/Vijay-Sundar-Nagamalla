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
    startDate: '2020-05-01',
    endDate: 'Present',
    title: 'Senior Technical Trainer & Learning Operations / AI Developer',
    company: 'Freelance',
    bullets: [
      'Architected and deployed 7+ end-to-end AI and full-stack platforms, including EdTech analytics (Almaanac, Vukti), Salesforce tracking, and an AI-powered stealth desktop assistant (Forward)',
      'Delivered high-impact technical training in Java, Python, SQL, and DSA to 25,000+ learners, achieving ~50% average assessment improvement',
      'Managed end-to-end learning operations: from multi-track session scheduling and batch planning to learner enrollment and attendance tracking',
      'Partnered with instructional designers and stakeholders to ensure seamless program execution and on-time delivery of learning modules',
      'Leveraged MS Excel and Power BI to track real-time KPIs, monitor learner completion rates, and maintain operational data with 95%+ accuracy',
    ],
  },
  {
    id: 2,
    startDate: '2023-05-01',
    endDate: '2024-12-01',
    title: 'Technical Project Manager',
    company: 'Xplore.co.in',
    bullets: [
      'Spearheaded large-scale upskilling programs as Lead Trainer and Project Owner, ensuring 100% on-time delivery of technical training and labs',
      'Built and maintained interactive Power BI dashboards for leadership to monitor KPIs, learner engagement, and program health in real-time',
      'Orchestrated end-to-end program operations, including batch planning, stakeholder coordination, and multi-track logistics',
      'Streamlined training workflows and collaborated with instructional designers to optimize content delivery and assessment results',
    ],
  },
  {
    id: 3,
    startDate: '2018-06-19',
    endDate: '2020-05-01',
    title: 'Associate Trainer',
    company: 'FACE',
    bullets: [
      'Facilitated high-impact technical training in Aptitude, C, Java, Python, and SQL for batches of 80+ learners',
      'Developed comprehensive lesson plans, presentations, and hands-on assessments to drive technical proficiency and student outcomes',
      'Managed end-to-end classroom operations, from attendance tracking to performance evaluation and progress reporting',
      'Provided structured feedback and personalized learning support to enhance student technical skills and interview readiness',
    ],
  },
];

// ─── PROJECTS DATA ────────────────────────────────────────────────────────────

export const projects = [
  {
    id: 1,
    color: 'green',
    filter: ['edtech'],
    badge: '📊 Classroom Analytics · LeetCode Tracker',
    status: 'deployed',
    statusLabel: 'Deployed',
    title: 'Almaanac — Classroom Coding Analytics Platform',
    stack: 'TanStack Start (React 19) · TanStack Router · TanStack Query v5 · Supabase · Tailwind CSS v4 · Recharts · TypeScript 5.8 · Vercel',
    impact: 'Data-driven LeetCode analytics for educators — track, analyze, and motivate student coding activity across classrooms',
    bullets: [
      'LeetCode GraphQL integration: scrapes solved counts, submission calendars, contest ratings, badges, and language stats',
      'Classroom management with bulk CSV/Excel import, role-based access (Admin, Placement Officer, Faculty), and cohort analytics',
      'Dashboards: leaderboards, behavioral buckets ("Active Today", "At Risk"), heatmaps, 30-day trends, difficulty-split charts',
      'Automated refresh pipeline: daily Vercel cron + GitHub Actions pump with lease-based concurrency and rate limiting',
    ],
    link: 'https://almaanac.vercel.app/',
  },
  {
    id: 2,
    color: 'purple',
    filter: ['ai', 'edtech'],
    badge: '🎓 Student OS · 9-Module Platform',
    status: 'dev',
    statusLabel: 'In Development',
    title: 'Vukti — Unified Academic Intelligence Platform',
    stack: 'React 19 · Vite 7 · TailwindCSS 4 · FastAPI · PostgreSQL 16 · Redis 7 · Docker · Judge0 · NVIDIA AI',
    impact: 'End-to-end student operating system for technical education — 9 modules, 4+ roles, 10K-user scale target',
    bullets: [
      'Multi-platform sync from 6 coding platforms (LeetCode, HackerRank, CodeChef, Codeforces, GFG, HackerEarth) with async scraper orchestrator',
      'Assessment engine: MCQ + Coding + SQL with Docker-isolated Judge0 execution, full-screen proctoring, and tab-blur detection',
      'VIMY gamified practice: 1,000+ problems, streaks, coins, XP levels, badges, leagues, and GitHub-style activity heatmaps',
      'Attendance, institutional tasks, semester engine, and placement pipeline — expanding to 9 roles with ABAC permissions',
    ],
    link: '#',
  },
  {
    id: 3,
    color: 'blue',
    filter: ['saas'],
    badge: '☁️ Salesforce · Trailhead Analytics',
    status: 'deployed',
    statusLabel: 'Deployed',
    title: 'Salesforce Tracker — Trailhead Profile Scraper',
    stack: 'TanStack Start (React 19) · TanStack Router · Supabase · Tailwind CSS v4 · shadcn/ui · XLSX · TypeScript',
    impact: 'Bulk-scrape and analyze Salesforce Trailhead profiles for institutional tracking and certification monitoring',
    bullets: [
      'Bulk URL/Excel upload: auto-detect Trailhead profile columns and batch-scrape with progress tracking',
      'Data merge: combines scraped Trailhead data (badges, points, ranks) with uploaded Excel metadata',
      'History management: persistent session storage with export to Excel, settings configuration',
      'Server-side scraping via TanStack Start API routes with error handling and retry logic',
    ],
    link: 'https://myviapps.github.io/Salesforce-CMRTC/',
  },
  {
    id: 4,
    color: 'orange',
    filter: ['edtech'],
    badge: '🗺️ Interactive Learning · FDE Curriculum',
    status: 'deployed',
    statusLabel: 'Deployed',
    title: 'FDE Flow Atlas — Forward Deployed Engineer Learning Platform',
    stack: 'Vanilla HTML/CSS/JS · SVG Animations · LocalStorage Progress · GitHub Pages',
    impact: '133-topic interactive curriculum for Forward Deployed Engineering — animations, flowcharts, case studies, and hands-on projects',
    bullets: [
      'Animated flow diagrams with step-by-step SVG narration, code highlighting, and playback controls',
      'Covers RAG pipelines, tool calling, agentic loops, case decomposition, and 11 hands-on projects',
      'Interactive quizzes, fill-in templates, glossary, and interview Q&A per topic — all progress saved locally',
      'Syllabus tracker with checkbox-based progress, dark/light theme, and responsive mobile layout',
    ],
    link: 'https://myviapps.github.io/fde-flow-atlas',
  },
  {
    id: 5,
    color: 'teal',
    filter: ['ai'],
    badge: '🔬 AI Research · In Development',
    status: 'dev',
    statusLabel: 'In Development',
    title: 'ILFU — AI Research Project',
    stack: 'Python · AI/ML Stack',
    impact: 'Experimental AI project currently in active development',
    bullets: [
      'Novel AI research and experimentation platform',
      'Architecture and implementation currently under active development',
    ],
    link: 'https://github.com/myviapps/I-L-F-U',
  },
  {
    id: 6,
    color: 'indigo',
    filter: ['ai'],
    badge: '🖥️ Desktop AI · Stealth Assistant',
    status: 'internal',
    statusLabel: 'Local Install',
    title: 'Forward — AI Class Assistant',
    stack: 'C# WPF · .NET 8 · Claude API · DeepSeek · NVIDIA NIM · NAudio WASAPI · Whisper ONNX · AMD XDNA NPU',
    impact: 'Invisible-to-screen-capture AI desktop assistant with multi-provider LLM fallback and on-device STT',
    bullets: [
      'Stealth overlay: WDA_EXCLUDEFROMCAPTURE P/Invoke makes the window invisible to all screen recording and sharing software',
      'AI provider chain: Claude → DeepSeek → NVIDIA NIM → Groq → Ollama with automatic failover',
      'Hardware-optimized: Whisper STT on AMD XDNA NPU, embeddings on Radeon DirectML, VAD on CPU',
      'Hotkey-driven UX: Alt+Space (toggle), Ctrl+Space (explain last 30s), Alt+A (focus input)',
    ],
    link: '#',
  },
  {
    id: 7,
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
    title: 'Languages & Core',
    pills: ['C', 'C#', 'Java', 'Python', 'DSA', 'SQL'],
  },
  {
    title: 'Web Technologies',
    pills: ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'TypeScript', 'React 19', 'TanStack Start', 'TailwindCSS'],
  },
  {
    title: 'AI / ML',
    pills: ['RAG Pipelines', 'MCP', 'Claude API', 'OpenAI API', 'NVIDIA NIM', 'Whisper ONNX', 'DeepSeek'],
  },
  {
    title: 'Backend & Data',
    pills: ['FastAPI', 'Node.js', 'PostgreSQL', 'Redis', 'Supabase', 'JWT', 'Judge0'],
  },
  {
    title: 'DevOps & Tools',
    pills: ['Docker', 'Nginx', 'Vercel', 'GitHub Pages', 'GitHub Actions', 'Git', '.NET 8 / WPF'],
  },
  {
    title: 'Management & Analytics',
    pills: ['Technical Training', 'Power BI', 'Google Sheets API', 'MS Excel', 'Program Operations'],
  },
];

// ─── PROFILE ──────────────────────────────────────────────────────────────────

export const profile = {
  name: 'Vijay Sundar Nagamalla',
  email: 'vijaysundarn@gmail.com',
  phone: '+91 9391122607',
  linkedin: 'https://www.linkedin.com/in/vijaysundarn/',
  github: 'https://github.com/myviapps',
  calLink: 'https://cal.com/vijay-sundar-nagumalla',
  resumePdf: '/Vijay_Sundar_Nagamalla_Resume.pdf',
  heroImage: '/images/ai_trainer_hero_isometric-Photoroom.png',
  typedPhrases: [
    'Senior Technical Trainer & Learning Operations',
    'AI Developer',
    'Full-Stack Engineer',
    'EdTech Platform Architect',
  ],
  availabilityBadge: 'Open to AI & Training Roles',
  headline1: "Hi, I'm",
  headlineGrad: 'Vijay Sundar Nagamalla',
  headline2: 'Educator & AI Developer',
  description:
    'Veteran L&D professional with 8+ years of experience delivering and operating high-scale technical training programs. I have mentored 50,000+ learners in core programming (C, Java, Python, SQL, DSA) while simultaneously evolving as an AI Developer, architecting production-grade EdTech platforms and AI-powered desktop tools.',
  tags: ['Technical Training', 'EdTech Platforms', 'AI Assistants', 'React 19', 'FastAPI', 'TanStack Start', 'Docker', 'PostgreSQL', 'C# / WPF'],
  navbarCta: 'Book a Call',
  contactCta: "Let's Build Something Together",
  contactDesc:
    'Open to AI Developer, Full-Stack, Technical Training, and Applied AI roles — especially in EdTech, SaaS, and enterprise AI domains.',
};

// ─── AUTO-CALCULATED STATS ────────────────────────────────────────────────────
// These values derive from your data above — no manual updates needed.

const earliestStart = experience.reduce((earliest, job) => {
  const d = new Date(job.startDate);
  return d < earliest ? d : earliest;
}, new Date());

const totalYears = calcYears(earliestStart.toISOString().split('T')[0]);
const productionCount = projects.length;

export const stats = [
  { value: totalYears, suffix: '+', label: 'Years Experience', isFloat: true },
  { value: 50000, suffix: '+', label: 'Learners Trained', isFloat: false },
  { value: 40, suffix: '+', label: 'Colleges', isFloat: false },
  { value: productionCount, suffix: '', label: 'Production Platforms', isFloat: false },
  { value: 50, suffix: '%', label: 'Avg Learner Improvement', isFloat: false },
  { value: 133, suffix: '+', label: 'Topics (FDE Atlas)', isFloat: false },
];

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
    badge: '📊 Classroom Analytics · 8 Platforms',
    status: 'deployed',
    statusLabel: 'Deployed',
    title: 'Almaanac — Multi-Platform Classroom Coding Intelligence',
    stack: 'TanStack Start (React 19) · TanStack Router · TanStack Query v5 · Supabase (PostgreSQL/RLS) · Tailwind CSS v4 · Recharts · TypeScript 5.8 · Vercel',
    impact: 'Unified competitive programming analytics for educators across 8 platforms — tracking, analyzing, and motivating student practice',
    bullets: [
      'Multi-platform adapter catalog supporting 8 platforms: LeetCode, Codeforces, AtCoder, GeeksforGeeks, HackerRank, CodeChef, HackerEarth, and Code360',
      'Asynchronous refresh pipeline: each platform syncs independently with rate-limiting, lease-based concurrency locking, and failure isolation',
      'Classroom management with bulk CSV/Excel import, role-based access (Admin, Placement Officer, Faculty), and cohort analytics',
      'Dashboards: difficulty-weighted scoring, leaderboards, behavioral cohorts ("Active Today", "At Risk"), 365-day heatmaps, and term-end PDF rollups',
      'Privacy-by-design: masked public student lookup (exact roll matching with PII redaction)',
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
    title: 'Vukti — Unified Academic Intelligence Platform & Student OS',
    stack: 'React 19.2 · Vite 7 · TailwindCSS 4 · FastAPI · SQLAlchemy 2 · PostgreSQL 16 · Redis 7 · Docker · Judge0 1.13.1 · Monaco Editor',
    impact: 'End-to-end student operating system across Academics, Placements, and Growth — 9 modules targeting 10,000 concurrent users',
    bullets: [
      'Multi-platform sync: aggregates coding from 6 external platforms (LeetCode, HackerRank, CodeChef, Codeforces, GeeksforGeeks, HackerEarth) with async worker pool and snapshots',
      'Assessment engine: MCQ, Coding, and SQL testing with self-hosted Docker Judge0 1.13.1 (25+ languages, custom JVM patch), OneCompiler fallback, SQL judge, and proctoring/tab-blur detection',
      'VIMY gamified competitive coding: 1,000+ problems, split-pane Monaco IDE, streaks, coins, 30 XP levels, badges, leagues, heatmaps, and 12-domain visual Skill DNA',
      'Integrated academic ops: Learn Now structured paths (Java/Python/SQL/DSA), attendance tracking (QR/self-mark/manual), institutional tasks, and semester lifecycle engine',
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
      'Covers RAG pipelines, tool calling, autonomous workflows, case decomposition, and 11 hands-on projects',
      'Interactive quizzes, fill-in templates, glossary, and interview Q&A per topic — all progress saved locally',
      'Syllabus tracker with checkbox-based progress, dark/light theme, and responsive mobile layout',
    ],
    link: 'https://myviapps.github.io/fde-flow-atlas',
  },
  {
    id: 5,
    color: 'teal',
    filter: ['ai'],
    badge: '🎙️ Local AI · Meeting Transcriber · AGPL-3.0',
    status: 'dev',
    statusLabel: 'In Development',
    title: 'ILFU (I Listen For U) — Open-Source Local Video Call Transcriber',
    stack: 'Python 3.11+ · faster-whisper · PyAudioWPatch (WASAPI) · whisper.cpp · Pytest · AGPL-3.0',
    impact: 'Free, open-source meeting transcriber running 100% locally on device with zero API keys, no external accounts, and NO bot joining calls',
    bullets: [
      '100% local privacy: audio captured, transcribed, and summarized directly on-device without cloud API dependencies or external data leaks',
      'Zero-bot audio capture: uses passive system audio loopback capture (Windows WASAPI / PyAudioWPatch) to record both speaker and mic seamlessly without meeting bot invitations',
      'On-device speech-to-text: powered by faster-whisper and whisper.cpp for high-accuracy local transcription with capped CPU/memory footprint',
      'Speaker diarization & local summaries: integrates open diarization models for speaker labeling and local small LLMs for automated action items and meeting summaries',
      'Open-source ecosystem: modular Python engine (ilfu CLI / GUI), automated WER/DER benchmark harness, and AGPL-3.0 open license',
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
    'Forward Deployed Engineer (FDE)',
    'AI Application Developer',
    'Full-Stack Solutions Engineer',
    'Technical Trainer & Operations Leader',
  ],
  availabilityBadge: 'Open to FDE & Applied AI Roles',
  headline1: "Hi, I'm",
  headlineGrad: 'Vijay Sundar Nagamalla',
  headline2: 'Forward Deployed Engineer & AI Developer',
  description:
    'Technical builder and L&D professional with 8+ years of experience delivering high-scale technical training programs and operating LMS ecosystems. Having mentored 50,000+ learners and architected 7+ production platforms (React 19, FastAPI, Docker, on-device AI), I combine software engineering with client enablement, targeting Forward Deployed Engineering (FDE) and applied AI roles.',
  tags: ['Forward Deployed Engineering', 'Applied AI Solutions', 'EdTech Platforms', 'React 19', 'FastAPI', 'TanStack Start', 'Docker', 'PostgreSQL', 'C# / WPF'],
  navbarCta: 'Book a Call',
  contactCta: "Let's Build Something Together",
  contactDesc:
    'Open to Forward Deployed Engineer (FDE), Applied AI Solutions Engineer, Full-Stack Developer, and Technical Enablement roles — especially in enterprise AI, SaaS, and EdTech domains.',
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

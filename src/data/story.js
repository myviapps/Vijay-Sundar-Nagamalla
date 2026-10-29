// ─── PORTFOLIO STORY CONTENT ─────────────────────────────────────────────────
// Copy for the scroll-story page (src/components/Story.jsx). Kept apart from
// resume.js `projects` because the story shows short names, taglines and live
// embeds rather than the long resume titles.
//
// A project gets `embed` if its site allows framing, otherwise `shots` — a list
// of stills that pan vertically inside the frame as you scroll past, and stack
// into a gallery in the overlay. `slot` is the hatched-placeholder fallback for
// a project that has neither yet.
//
// vukti-vimy.webp is a real capture of the running app. The forward-* and ilfu-*
// files are hand-built SVG mockups: Forward is a WPF desktop app (its layout and
// labels come from TopBarWindow.xaml / ResponsePanel.xaml / SettingsWindow.xaml)
// and ILFU is not built yet. Swap in real captures whenever they exist.

export const storyProjects = {
  almaanac: {
    name: 'Almaanac',
    tag: 'Multi-platform classroom coding intelligence',
    status: 'Deployed',
    title: 'Almaanac',
    impact:
      'Unified competitive programming analytics for educators across 8 platforms: tracking, analyzing, and motivating student practice.',
    stack:
      'TanStack Start (React 19) · TanStack Router · TanStack Query v5 · Supabase (PostgreSQL/RLS) · Tailwind CSS v4 · Recharts · TypeScript 5.8 · Vercel',
    bullets: [
      'Multi-platform adapter catalog supporting 8 platforms: LeetCode, Codeforces, AtCoder, GeeksforGeeks, HackerRank, CodeChef, HackerEarth, and Code360',
      'Asynchronous refresh pipeline: each platform syncs independently with rate-limiting, lease-based concurrency locking, and failure isolation',
      'Classroom management with bulk CSV/Excel import, role-based access (Admin, Placement Officer, Faculty), and cohort analytics',
      'Dashboards: difficulty-weighted scoring, leaderboards, behavioral cohorts, 365-day heatmaps, and term-end PDF rollups',
    ],
    link: 'https://almaanac.vercel.app/',
    embed: 'https://almaanac.vercel.app/',
  },

  vukti: {
    name: 'Vukti',
    tag: 'Unified academic intelligence platform and Student OS',
    status: 'In development',
    title: 'Vukti',
    impact:
      'End-to-end student operating system across Academics, Placements, and Growth: 9 modules targeting 10,000 concurrent users.',
    stack:
      'React 19.2 · Vite 7 · TailwindCSS 4 · FastAPI · SQLAlchemy 2 · PostgreSQL 16 · Redis 7 · Docker · Judge0 1.13.1 · Monaco Editor',
    bullets: [
      'Multi-platform sync: aggregates coding from 6 external platforms with async worker pool and snapshots',
      'Assessment engine: MCQ, Coding, and SQL testing with self-hosted Docker Judge0 1.13.1 (25+ languages), SQL judge, and proctoring/tab-blur detection',
      'VIMY gamified competitive coding: 1,000+ problems, split-pane Monaco IDE, streaks, coins, 30 XP levels, badges, leagues, and 12-domain Skill DNA',
      'Integrated academic ops: Learn Now structured paths, attendance tracking (QR/self-mark/manual), institutional tasks, and semester lifecycle engine',
    ],
    shots: ['/images/shots/vukti-home.webp', '/images/shots/vukti-vimy.webp'],
  },

  forward: {
    name: 'Forward',
    tag: 'Non-intrusive presenter and live-instruction copilot',
    status: 'Local install',
    title: 'Forward',
    impact:
      'Live-instruction copilot enabling educators to view real-time AI prompts and transcription during screen-sharing without audience clutter.',
    stack:
      'C# WPF · .NET 8 · Claude API · DeepSeek · NVIDIA NIM · NAudio WASAPI · Whisper ONNX · AMD XDNA NPU',
    bullets: [
      'Overlay isolation: WDA_EXCLUDEFROMCAPTURE P/Invoke keeps speaker notes private and invisible to meeting screenshares',
      'AI provider chain: Claude → DeepSeek → NVIDIA NIM → Groq → Ollama with automatic failover',
      'Hardware-optimized: Whisper STT on AMD XDNA NPU, embeddings on Radeon DirectML, VAD on CPU',
      'Hotkey-driven UX: Alt+Space (toggle), Ctrl+Space (explain last 30s), Alt+A (focus input)',
    ],
    shots: ['/images/shots/forward-overlay.svg', '/images/shots/forward-settings.svg'],
  },

  salesforce: {
    name: 'Salesforce Tracker',
    tag: 'Trailhead profile scraper',
    status: 'Deployed',
    title: 'Salesforce Tracker',
    impact:
      'Bulk-scrape and analyze Salesforce Trailhead profiles for institutional tracking and certification monitoring.',
    stack:
      'TanStack Start (React 19) · TanStack Router · Supabase · Tailwind CSS v4 · shadcn/ui · XLSX · TypeScript',
    bullets: [
      'Bulk URL/Excel upload: auto-detect Trailhead profile columns and batch-scrape with progress tracking',
      'Data merge: combines scraped Trailhead data (badges, points, ranks) with uploaded Excel metadata',
      'History management: persistent session storage with export to Excel, settings configuration',
      'Server-side scraping via TanStack Start API routes with error handling and retry logic',
    ],
    link: 'https://myviapps.github.io/Salesforce-CMRTC/',
    embed: 'https://myviapps.github.io/Salesforce-CMRTC/',
  },

  fde: {
    name: 'FDE Flow Atlas',
    tag: 'Forward Deployed Engineer learning platform',
    status: 'Deployed',
    title: 'FDE Flow Atlas',
    impact:
      '133-topic interactive curriculum for Forward Deployed Engineering: animations, flowcharts, case studies, and hands-on projects.',
    stack: 'Vanilla HTML/CSS/JS · SVG Animations · LocalStorage Progress · GitHub Pages',
    bullets: [
      'Animated flow diagrams with step-by-step SVG narration, code highlighting, and playback controls',
      'Covers RAG pipelines, tool calling, autonomous workflows, case decomposition, and 11 hands-on projects',
      'Interactive quizzes, fill-in templates, glossary, and interview Q&A per topic',
      'Syllabus tracker with checkbox-based progress, dark/light theme, and responsive mobile layout',
    ],
    link: 'https://myviapps.github.io/fde-flow-atlas',
    embed: 'https://myviapps.github.io/fde-flow-atlas',
  },

  ilfu: {
    name: 'ILFU',
    tag: 'Open-source local video call transcriber',
    status: 'In development',
    title: 'ILFU (I Listen For U)',
    impact:
      'Free, open-source meeting transcriber running 100% locally on device with zero API keys and no bot joining calls.',
    stack: 'Python 3.11+ · faster-whisper · PyAudioWPatch (WASAPI) · whisper.cpp · Pytest · AGPL-3.0',
    bullets: [
      '100% local privacy: audio captured, transcribed, and summarized directly on-device',
      'Zero-bot audio capture: passive system audio loopback (Windows WASAPI / PyAudioWPatch)',
      'On-device speech-to-text: faster-whisper and whisper.cpp with capped CPU/memory footprint',
      'Speaker diarization and local summaries: open diarization models and local small LLMs for action items',
    ],
    link: 'https://github.com/myviapps/I-L-F-U',
    shots: ['/images/shots/ilfu-listen.svg', '/images/shots/ilfu-summary.svg'],
  },
};

// Chapter 02 stacks these three; chapter 03 scrolls horizontally through these four.
export const storyBuilds = ['almaanac', 'vukti', 'forward'];
export const storyDeploys = ['almaanac', 'salesforce', 'fde', 'ilfu'];

export const milestones = [
  {
    year: '2018',
    org: 'FACE',
    role: 'Associate Trainer',
    text: 'Aptitude, C, Java, Python and SQL for batches of 80+ learners.',
  },
  {
    year: '2020',
    org: 'Freelance',
    role: 'Senior Technical Trainer',
    text: 'Java, Python, SQL and DSA for 25,000+ learners, with ~50% average assessment improvement.',
  },
  {
    year: '2023',
    org: 'Xplore.co.in',
    role: 'Technical Project Manager',
    text: 'Lead Trainer and Project Owner. 100% on-time delivery, plus Power BI dashboards for leadership.',
  },
  {
    year: 'Today',
    org: '40+ colleges',
    role: 'Trainer and builder',
    text: '50,000+ learners trained, and 7+ platforms built for the classrooms I teach.',
  },
];

export const manifesto = {
  teaching: ['Java', 'Python', 'SQL', 'DSA'],
  learners: '50,000',
  colleges: '40+',
};

export const marquee = {
  row1: 'React 19 · TanStack · TypeScript · FastAPI · PostgreSQL · Supabase · Redis · Docker · ',
  row2: 'Claude API · RAG Pipelines · MCP · Whisper ONNX · NVIDIA NIM · .NET 8 · Power BI · Judge0 · ',
};

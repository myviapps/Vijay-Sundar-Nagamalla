"""
Resume v3 — Times New Roman, clean alignment, minimalized skills
Outputs: Vijay_Sundar_Nagamalla_Resume.pdf
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.enums import TA_CENTER
from reportlab.lib import colors

OUTPUT = r"c:\Resume Upgrade\Vijay_Sundar_Nagamalla_Resume.pdf"
PAGE_W = A4[0]

DARK   = colors.HexColor("#1a1a2e")
ACCENT = colors.HexColor("#0f3460")
MID    = colors.HexColor("#2d3748")
LIGHT  = colors.HexColor("#718096")

doc = SimpleDocTemplate(
    OUTPUT, pagesize=A4,
    leftMargin=0.75*inch, rightMargin=0.75*inch,
    topMargin=0.55*inch, bottomMargin=0.55*inch,
)

# ── Styles (Times-Roman family) ───────────────────────────────────────────────
def S(name, font, size, **kw):
    return ParagraphStyle(name, fontName=font, fontSize=size, **kw)

name_s    = S("N",  "Times-Bold",        20, alignment=TA_CENTER, spaceAfter=4,  leading=24, textColor=DARK)
contact_s = S("C",  "Times-Roman",       10, alignment=TA_CENTER, spaceAfter=2,  leading=14, textColor=MID)
link_s    = S("LK", "Times-Italic",       9.5, alignment=TA_CENTER, spaceAfter=4, leading=13, textColor=ACCENT)
tag_s     = S("TG", "Times-BoldItalic",  10, alignment=TA_CENTER, spaceAfter=8,  leading=14, textColor=ACCENT)
sec_s     = S("S",  "Times-Bold",        11, spaceBefore=7,  spaceAfter=2, leading=14, textColor=ACCENT)
jtitle_s  = S("JT", "Times-Bold",        10, spaceBefore=5,  spaceAfter=0, leading=13, textColor=DARK)
jdate_s   = S("JD", "Times-Italic",       9.5, spaceAfter=2, leading=13, textColor=LIGHT)
ptitle_s  = S("PT", "Times-Bold",        10, spaceBefore=5,  spaceAfter=0, leading=13, textColor=DARK)
pstack_s  = S("PS", "Times-Italic",       9,  spaceAfter=1,  leading=12, textColor=LIGHT)
impact_s  = S("IM", "Times-BoldItalic",   9.5, spaceAfter=1, leading=13, textColor=ACCENT)
body_s    = S("B",  "Times-Roman",        9.8, leading=13,   spaceAfter=1, textColor=MID)
bullet_s  = S("BU", "Times-Roman",        9.8, leading=13,   leftIndent=14, firstLineIndent=-10, spaceAfter=1, textColor=MID)
subh_s    = S("SH", "Times-Bold",         9.8, spaceBefore=3, spaceAfter=1, leading=13, textColor=DARK)
skill_s   = S("SK", "Times-Roman",        9.8, leading=14,   spaceAfter=2, textColor=MID)
comp_s    = S("CO", "Times-Roman",        9.8, leading=13,   leftIndent=14, firstLineIndent=-10, spaceAfter=1, textColor=MID)

def sec(title):
    return [
        Spacer(1, 2),
        Paragraph(title.upper(), sec_s),
        HRFlowable(width="100%", thickness=0.75, color=ACCENT, spaceAfter=3),
    ]

def b(text):
    return Paragraph(f"\u2022  {text}", bullet_s)

def imp(text):
    return Paragraph(f"\u27a4  {text}", impact_s)

story = []

# ── HEADER ────────────────────────────────────────────────────────────────────
story.append(Paragraph("Vijay Sundar Nagamalla", name_s))
story.append(Paragraph(
    '+91 9391122607  \u00b7  <link href="mailto:vijaysundarn@gmail.com" color="#0f3460">vijaysundarn@gmail.com</link>'
    '  \u00b7  <link href="https://linkedin.com/in/vijaysundarn" color="#0f3460">LinkedIn</link>', contact_s))
story.append(Paragraph(
    '<link href="https://vijaysundarnagamalla.vercel.app" color="#0f3460">vijaysundarnagamalla.vercel.app</link>'
    '  \u00b7  Portfolio &amp; Profile', link_s))
story.append(Paragraph(
    "AI Application Developer  \u00b7  Full Stack Engineer  \u00b7  Agentic Systems Architect", tag_s))
story.append(HRFlowable(width="100%", thickness=1.2, color=ACCENT, spaceAfter=8))

# ── SUMMARY ───────────────────────────────────────────────────────────────────
story += sec("Professional Summary")
story.append(body_s and Paragraph(
    "Full-stack AI engineer and veteran technical trainer with 7.5+ years of experience building production AI systems. "
    "Currently developing 5 platforms: PropIQ (CRE Loan Intelligence with RAG + MCP + XGBoost), SkillForge (multi-tenant EdTech SaaS), "
    "UtilKit (63-tool digital utility platform), WAT Framework (agentic architecture), and Vimysun (academic analytics) \u2014 "
    "while simultaneously training 3,000+ developers on Python, Java, SQL, and DSA. "
    "Brings rare depth: AI engineering (RAG, MCP, agentic orchestration, vector databases, LLM integration) "
    "paired with 7.5 years of delivery excellence and stakeholder communication.",
    body_s))

# ── SKILLS (minimalized) ──────────────────────────────────────────────────────
story += sec("Technical Skills")
skills = [
    ("AI / ML",        "RAG Pipelines  \u00b7  MCP (Model Context Protocol)  \u00b7  LangChain  \u00b7  OpenAI API  \u00b7  Claude API  \u00b7  FAISS  \u00b7  XGBoost"),
    ("Frontend",       "React 19  \u00b7  Next.js  \u00b7  TypeScript  \u00b7  TailwindCSS  \u00b7  Framer Motion  \u00b7  TanStack Query"),
    ("Backend",        "FastAPI (Python)  \u00b7  Node.js / Express  \u00b7  REST APIs  \u00b7  JWT  \u00b7  RBAC"),
    ("Databases",      "PostgreSQL  \u00b7  MySQL  \u00b7  Redis  \u00b7  Supabase"),
    ("DevOps",         "Docker  \u00b7  Celery  \u00b7  Nginx  \u00b7  Vercel  \u00b7  Render"),
    ("Languages",      "Python  \u00b7  JavaScript  \u00b7  TypeScript  \u00b7  Java  \u00b7  SQL"),
    ("Reporting",      "Power BI  \u00b7  Google Sheets API  \u00b7  MS Excel  \u00b7  LMS  \u00b7  Learning KPIs"),
]
for label, val in skills:
    story.append(Paragraph(f"<b>{label}:</b>  {val}", skill_s))

# ── PROJECTS ──────────────────────────────────────────────────────────────────
story += sec("AI Projects")

# Project 1
story.append(Paragraph("PropIQ  \u2014  AI-Powered CRE Loan Intelligence Platform", ptitle_s))
story.append(Paragraph("React  \u00b7  Node.js / Express  \u00b7  MySQL  \u00b7  LangChain  \u00b7  OpenAI API  \u00b7  FAISS  \u00b7  MCP", pstack_s))
story.append(imp("Architected a domain-specific AI platform for commercial real estate loan servicing and risk intelligence."))
for t in [
    "RAG Pipeline: Loan PDFs \u2192 chunked \u2192 embedded (OpenAI) \u2192 stored in FAISS/Pinecone \u2192 top-k retrieval \u2192 LLM generates grounded, cited answers on loan terms",
    "MCP Tool Calling: 4 structured AI tools (getLoanDetails, getRiskScore, getPaymentHistory, getAllRiskyLoans) \u2014 agent selects and calls dynamically, returns structured JSON",
    "AI Copilot Chat: Intent-classified routing \u2014 simple queries \u2192 MCP tools; complex queries \u2192 RAG; response streaming with real-time risk narrative",
    "Risk Scoring Engine: Weighted rule engine (payment delay 40% \u00b7 income decline 30% \u00b7 occupancy 30%) producing HIGH / MEDIUM / LOW classifications",
    "Predictive Analytics: XGBoost model predicting loan default probability and 6-month revenue trends",
]:
    story.append(b(t))

# Project 2
story.append(Paragraph('SkillForge  \u2014  AI-Powered Campus Coding Ecosystem  \u00b7  <link href="https://letskill.vercel.app/" color="#0f3460">letskill.vercel.app</link>', ptitle_s))
story.append(Paragraph("React 19  \u00b7  TypeScript  \u00b7  FastAPI  \u00b7  PostgreSQL  \u00b7  Redis  \u00b7  Celery  \u00b7  Docker  \u00b7  NVIDIA AI", pstack_s))
story.append(imp("Engineered a production multi-tenant SaaS platform \u2014 8-role RBAC, AI mentorship, Docker-sandboxed code judge."))
for t in [
    "AI Intelligence Hub: NVIDIA-powered code hints (Socratic method), automated Big-O code review, 24/7 AI tutor, AI-generated question banks",
    "8-Level RBAC: super_admin \u2192 institution_admin \u2192 department_admin \u2192 faculty \u2192 coordinator \u2192 content roles \u2192 student \u2014 fully scoped per role",
    "Docker-Isolated Code Judge: Containerized multi-language execution, timeout enforcement, leaderboards",
    "Async Platform Sync: Celery + Redis scraping LeetCode, HackerRank, GeeksForGeeks, HackerEarth, CodeChef into unified student profiles",
]:
    story.append(b(t))

# Project 3
story.append(Paragraph("WAT Framework  \u2014  Agentic AI Architecture", ptitle_s))
story.append(Paragraph("Python  \u00b7  Claude API  \u00b7  MCP  \u00b7  Markdown Workflows", pstack_s))
story.append(imp("Designed a reliability-first agentic framework solving the AI error-compounding problem."))
for t in [
    "Three-layer separation: Workflows (Markdown SOPs) \u2192 Agent (orchestration) \u2192 Tools (deterministic Python) \u2014 AI never executes directly",
    "Reliability math: 5 unchecked AI steps = 59% success rate; WAT enforces tool execution achieving near-100% determinism",
]:
    story.append(b(t))

# Project 4
story.append(Paragraph('Vimysun  \u2014  Academic Intelligence Platform  (CP Tracker)  \u00b7  <link href="https://vimysun.vercel.app/" color="#0f3460">vimysun.vercel.app</link>', ptitle_s))
story.append(Paragraph("React  \u00b7  FastAPI  \u00b7  PostgreSQL  \u00b7  Supabase  \u00b7  Google Sheets API  \u00b7  JWT / RBAC", pstack_s))
story.append(imp("Built an academic tracker with proctor-grade assessment engine and deep analytics."))
for t in [
    "Multi-platform sync: Automated daily aggregation from LeetCode and HackerRank with velocity analytics",
    "Proctored Assessment Engine: Full-screen enforcement, tab-blur detection, violation logging, offline-resilient state caching",
    "Deep Analytics: Per-question correct/incorrect mapping, pass rates, CSV exports, Google Sheets API push reporting",
]:
    story.append(b(t))

# Project 5
story.append(Paragraph("UtilKit  \u2014  Digital Utility Platform", ptitle_s))
story.append(Paragraph("Next.js  \u00b7  FastAPI  \u00b7  PostgreSQL  \u00b7  Supabase  \u00b7  TailwindCSS  \u00b7  Framer Motion", pstack_s))
story.append(imp("Built a self-hosted SaaS platform with 63+ free productivity tools across 8 categories."))
for t in [
    "Modular architecture: each tool is an independent Next.js + FastAPI module \u2014 new tools add without touching existing code",
    "Async pipeline: FastAPI + APScheduler with auto file cleanup (1-hr TTL), 100 MB upload, 50 concurrent jobs",
    "AI tools: NVIDIA/OpenAI APIs for AI writing, code generation, resume analysis, and MCQ generation",
    "Subscription system: JWT auth, Free / Pro / Premium tiers, role-based admin dashboard with usage analytics",
]:
    story.append(b(t))

# ── EXPERIENCE ────────────────────────────────────────────────────────────────
story += sec("Professional Experience")

story.append(Paragraph("Senior Technical Trainer / AI Developer  \u2014  Freelance", jtitle_s))
story.append(Paragraph("May 2021 \u2013 Present", jdate_s))
story.append(Paragraph("AI Engineering", subh_s))
for t in [
    "Architected and shipped 5 production-grade AI + full-stack platforms from design to deployment",
    "Engineered RAG pipelines, MCP tool-calling agents, and the WAT agentic orchestration framework",
    "Built AI Copilot interfaces, vector store integrations, risk scoring engines, and XGBoost predictive models",
]:
    story.append(b(t))
story.append(Paragraph("Technical Training", subh_s))
for t in [
    "Deliver daily instructor-led sessions on Java, Python, SQL, and DSA to engineering college and professional cohorts",
    "Trained 3,000+ learners \u2014 30% average improvement in assessment outcomes",
    "Designed project-based coding labs, evaluation rubrics, and mock interview bootcamps",
]:
    story.append(b(t))
story.append(Paragraph("Learning Operations", subh_s))
for t in [
    "Own end-to-end learning ops: scheduling, enrollment, attendance, completion tracking \u2014 95%+ data accuracy",
    "Drove 30% improvement in program completion rates through structured follow-up systems",
    "Generate weekly/monthly KPI reports; coordinate with instructional designers on content publishing",
]:
    story.append(b(t))

story.append(Paragraph("Technical Project Manager  \u2014  Xplore", jtitle_s))
story.append(Paragraph("May 2023 \u2013 December 2024", jdate_s))
for t in [
    "Led multiple concurrent learning programs as Lead Trainer \u2014 achieved 100% on-time delivery",
    "Built Power BI executive dashboards tracking attendance, assessment scores, completion rates, and learner satisfaction",
    "Owned training calendars, batch planning, facilitator coordination, and stakeholder reporting",
]:
    story.append(b(t))

story.append(Paragraph("Associate Trainer  \u2014  FACE", jtitle_s))
story.append(Paragraph("June 2018 \u2013 May 2021", jdate_s))
for t in [
    "Delivered Java, Python, and SQL instruction to 80+ learners per batch across concurrent programs",
    "Managed full session lifecycle: onboarding, attendance, logistics, issue resolution, and feedback",
]:
    story.append(b(t))

# ── CORE COMPETENCIES ─────────────────────────────────────────────────────────
story += sec("Core Competencies")
for t in [
    "AI System Architecture  \u2014  RAG  \u00b7  MCP  \u00b7  Agentic Orchestration  \u00b7  LLM Integration",
    "Full Stack Engineering  \u2014  React  \u00b7  FastAPI  \u00b7  Node.js  \u00b7  PostgreSQL  \u00b7  Docker",
    "Technical Training  \u2014  Java  \u00b7  Python  \u00b7  SQL  \u00b7  DSA  \u00b7  3,000+ learners trained",
    "Learning Operations  \u2014  LMS  \u00b7  KPIs  \u00b7  Reporting  \u00b7  Stakeholder Management",
    "Systems Thinking  \u2014  Translates AI architecture into operational workflows and business outcomes",
]:
    story.append(Paragraph(f"\u2022  {t}", comp_s))

doc.build(story)
print(f"PDF created: {OUTPUT}")

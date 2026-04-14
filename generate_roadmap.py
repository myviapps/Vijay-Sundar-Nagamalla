import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
import numpy as np

fig, ax = plt.subplots(figsize=(20, 14))
ax.set_xlim(0, 20)
ax.set_ylim(0, 14)
ax.axis('off')
fig.patch.set_facecolor('#0f172a')
ax.set_facecolor('#0f172a')

# ── Color palette ─────────────────────────────────────────────────────────────
COL = {
    'phase0': '#1e3a5f',  # foundation
    'phase1': '#1a4731',  # fullstack
    'phase2': '#4a1942',  # AI layer
    'phase3': '#3d2400',  # devops
    'phase4': '#1a1a4e',  # advanced
    'border0': '#3b82f6',
    'border1': '#22c55e',
    'border2': '#a855f7',
    'border3': '#f97316',
    'border4': '#06b6d4',
    'text':    '#f8fafc',
    'sub':     '#94a3b8',
    'title':   '#ffffff',
    'arrow':   '#475569',
    'project': '#fbbf24',
}

def box(ax, x, y, w, h, label, skills, bg, border, proj=None):
    rect = FancyBboxPatch((x, y), w, h,
        boxstyle="round,pad=0.08", linewidth=2,
        edgecolor=border, facecolor=bg, zorder=2)
    ax.add_patch(rect)
    # Phase label
    ax.text(x + w/2, y + h - 0.28, label,
        ha='center', va='center', fontsize=10, fontweight='bold',
        color=border, zorder=3)
    # Skills
    for i, sk in enumerate(skills):
        ax.text(x + 0.18, y + h - 0.62 - i*0.38, f"• {sk}",
            ha='left', va='center', fontsize=7.5,
            color=COL['text'], zorder=3)
    # Project tag
    if proj:
        ax.text(x + w/2, y + 0.22, f"→ {proj}",
            ha='center', va='center', fontsize=7,
            color=COL['project'], style='italic', zorder=3)

def arrow(ax, x1, y1, x2, y2):
    ax.annotate('', xy=(x2, y2), xytext=(x1, y1),
        arrowprops=dict(arrowstyle='->', color=COL['arrow'],
                        lw=1.8, connectionstyle='arc3,rad=0.0'),
        zorder=1)

# ── Title ─────────────────────────────────────────────────────────────────────
ax.text(10, 13.5, 'Vijay Sundar Nagamalla — AI Engineering Learning Roadmap',
    ha='center', va='center', fontsize=15, fontweight='bold',
    color=COL['title'])
ax.text(10, 13.05, 'Every skill mapped to project usage · Principal Architect Interview Ready',
    ha='center', va='center', fontsize=9.5, color=COL['sub'])

# ── Phase definitions ─────────────────────────────────────────────────────────
# Phase 0: Foundation (top-left)
box(ax, 0.3, 9.5, 4.5, 3.2,
    'PHASE 0 — FOUNDATION  ✓ DONE',
    ['Python  (all 4 projects)',
     'JavaScript / TypeScript',
     'Java  (Training delivery)',
     'SQL  (MySQL, PostgreSQL)',
     'HTML / CSS  (Frontend base)'],
    COL['phase0'], COL['border0'],
    proj='Already mastered — skip to Phase 1')

# Phase 1: Full Stack Core
box(ax, 5.2, 9.5, 4.5, 3.2,
    'PHASE 1 — FULL STACK CORE  ✓ BUILDING',
    ['React 19 + TypeScript + Vite',
     'TailwindCSS + shadcn/ui',
     'TanStack Query + React Router',
     'FastAPI + SQLAlchemy (Async)',
     'Node.js / Express + JWT/RBAC'],
    COL['phase1'], COL['border1'],
    proj='SkillForge · Trimont · Vimysun')

# Phase 2: AI Stack (center, prominent)
box(ax, 0.3, 5.5, 9.4, 3.6,
    'PHASE 2 — AI / AGENTIC STACK  ← KEY DIFFERENTIATOR',
    ['OpenAI API + Claude API  (Trimont Copilot, WAT Framework)',
     'LangChain + LlamaIndex  (RAG orchestration)',
     'FAISS + Pinecone  (Vector database for loan docs)',
     'MCP — Model Context Protocol  (Tool calling in Trimont)',
     'Agentic Orchestration — WAT Framework  (WAT project)',
     'RAG Pipeline  (PDF → Embed → Retrieve → Generate)',
     'XGBoost  (Default prediction in Trimont)'],
    COL['phase2'], COL['border2'],
    proj='ALL 4 PROJECTS — this is your superpower')

# Phase 3: DevOps / Infrastructure
box(ax, 10.1, 9.5, 4.5, 3.2,
    'PHASE 3 — DEVOPS & INFRA',
    ['Docker + Docker Compose',
     'Redis + Celery (Async tasks)',
     'Nginx (Reverse proxy)',
     'Vercel + Render (Deployment)',
     'PostgreSQL + Supabase (Cloud DB)'],
    COL['phase3'], COL['border3'],
    proj='SkillForge · Vimysun')

# Phase 4: Advanced AI
box(ax, 15.0, 9.5, 4.7, 3.2,
    'PHASE 4 — ADVANCED AI',
    ['Multi-agent systems (LangGraph)',
     'Fine-tuning vs RAG trade-offs',
     'AI observability + eval frameworks',
     'Streaming + WebSocket AI responses',
     'AI safety in FinTech (hallucination)'],
    COL['phase4'], COL['border4'],
    proj='Trimont production-readiness')

# Phase 5: Reporting / Ops (bottom)
box(ax, 5.2, 1.0, 9.4, 3.2,
    'PHASE 5 — REPORTING & OPS (CURRENT STRENGTH)',
    ['Power BI  (KPI dashboards at Xplore)',
     'MS Excel  (Learner data management)',
     'Google Sheets API  (Vimysun export)',
     'LMS Administration  (Freelance ops)',
     'Learning Metrics & KPIs  (All roles)'],
    '#1f2937', '#64748b',
    proj='7.5 years experience — already strong')

# ── Arrows ────────────────────────────────────────────────────────────────────
arrow(ax, 4.8, 11.1, 5.2, 11.1)       # Phase 0 → Phase 1
arrow(ax, 7.45, 9.5, 7.45, 9.1)       # Phase 1 → Phase 2
arrow(ax, 4.75, 7.3, 5.2, 4.2)        # Phase 2 → Phase 5
arrow(ax, 12.35, 9.5, 9.7, 9.1)       # Phase 3 → Phase 2 overlap
arrow(ax, 17.35, 9.5, 15.0, 8.0)      # Phase 4 note

# ── Project legend ────────────────────────────────────────────────────────────
legend_items = [
    mpatches.Patch(color=COL['border2'], label='Trimont CRE Platform'),
    mpatches.Patch(color=COL['border1'], label='SkillForge EdTech'),
    mpatches.Patch(color='#94a3b8',      label='WAT Framework'),
    mpatches.Patch(color=COL['border4'], label='Vimysun CP Tracker'),
]
ax.legend(handles=legend_items, loc='lower left', bbox_to_anchor=(0.01, 0.01),
    ncol=4, framealpha=0.2, facecolor='#1e293b',
    labelcolor='white', fontsize=8.5, edgecolor='#475569')

# ── Interview callout ─────────────────────────────────────────────────────────
callout = FancyBboxPatch((15.0, 1.0), 4.7, 7.5,
    boxstyle="round,pad=0.1", linewidth=1.5,
    edgecolor='#fbbf24', facecolor='#1c1400', zorder=2)
ax.add_patch(callout)
ax.text(17.35, 8.2, '🎯 INTERVIEW FOCUS', ha='center', va='center',
    fontsize=9, fontweight='bold', color='#fbbf24', zorder=3)
interview_qs = [
    'Q1: Design RAG for 10M docs',
    'Q2: RAG vs Fine-tuning vs MCP?',
    'Q3: Handle hallucination in FinTech',
    'Q4: Design real-time risk scoring',
    'Q5: Multi-tenant data isolation',
    'Q6: Agentic reliability patterns',
    'Q7: Vector DB selection criteria',
    'Q8: AI observability strategy',
    'Q9: CRE domain knowledge check',
    'Q10: System design end-to-end',
]
for i, q in enumerate(interview_qs):
    ax.text(15.15, 7.7 - i*0.65, q,
        ha='left', va='center', fontsize=7.5,
        color='#e2e8f0', zorder=3)

plt.tight_layout(pad=0.5)
plt.savefig(r'c:\Resume Upgrade\Learning_Roadmap.png',
    dpi=150, bbox_inches='tight', facecolor='#0f172a')
print("Roadmap image saved.")

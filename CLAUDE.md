## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- After modifying code files in this session, run `python3 -c "from graphify.watch import _rebuild_code; from pathlib import Path; _rebuild_code(Path('.'))"` to keep the graph current


# WAT Framework (Workflows, Agents, Tools)

## 📌 Overview
The **WAT framework** separates responsibilities between:
- **Probabilistic AI → Reasoning**
- **Deterministic Code → Execution**

This separation ensures:
- ✅ High reliability  
- ✅ Better scalability  
- ✅ Easier debugging  

---

# 🧱 Architecture Layers

## 🔹 Layer 1: Workflows (The Instructions)
**Location:** `workflows/`  
**Format:** Markdown (`.md`)

### Purpose
Workflows define:
- Objective
- Required inputs
- Tools to use
- Expected outputs
- Edge case handling

### Key Principle
Write workflows in **plain language**, like giving instructions to a team member.

---

## 🔹 Layer 2: Agents (The Decision-Maker)

### Role
The **Agent** is responsible for intelligent coordination.

### Responsibilities
- Read the workflow
- Decide execution steps
- Call tools in the correct order
- Handle failures gracefully
- Ask clarifying questions when needed

### Important Rule
> ❌ Do NOT execute tasks directly if a tool exists  
> ✅ Always delegate execution to tools  

### Example Flow
1. Read: `workflows/scrape_website.md`  
2. Identify inputs  
3. Execute: `tools/scrape_single_site.py`  

---

## 🔹 Layer 3: Tools (The Execution Layer)
**Location:** `tools/`  
**Format:** Python scripts  

### Responsibilities
- API calls  
- Data processing  
- File operations  
- Database queries  

### Properties
- Deterministic  
- Testable  
- Fast  

### Security
- Store secrets in `.env`  
- Never expose credentials in code  

---

# ⚠️ Why This Architecture Matters

If AI handles everything:
- Each step ≈ 90% accurate  
- After 5 steps → **~59% success rate**

### Solution
- AI handles **decision-making**
- Tools handle **execution**

### Result
- ✅ Reliable workflows  
- ✅ Reduced error propagation  
- ✅ Scalable systems  

---

# ⚙️ Operating Principles

## 1️⃣ Check Existing Tools First
Before building anything new:
- Search in `tools/`
- Reuse existing scripts  

> Create new tools only if absolutely necessary  

---

## 2️⃣ Learn and Adapt from Failures

### When an error occurs:
1. Read the full error message  
2. Trace the issue  
3. Fix the tool  
4. Retest  

⚠️ If using paid APIs:
- Confirm before re-running  

### Example
- API rate limit hit  
- Discover batch endpoint  
- Refactor tool  
- Retest successfully  
- Update workflow  

---

## 3️⃣ Keep Workflows Updated

### Update workflows when:
- Better methods are found  
- Constraints are discovered  
- Issues repeat  

### Rule
> ❗ Do NOT modify workflows without permission unless explicitly instructed  

---

# 🔁 Self-Improvement Loop

Every failure strengthens the system:

1. Identify the issue  
2. Fix the tool  
3. Verify the fix  
4. Update the workflow  
5. Continue execution  

---

# 📁 File Structure
project/
│
├── workflows/ # Markdown SOPs (instructions)
├── tools/ # Python scripts (execution)
├── .tmp/ # Temporary/intermediate files
├── .env # API keys & environment variables
├── credentials.json # OAuth (gitignored)
├── token.json # OAuth tokens (gitignored)


---

# 📂 File Responsibilities

## Workflows (`workflows/`)
- Define *what to do*
- High-level instructions  

## Tools (`tools/`)
- Define *how to do it*
- Execute tasks deterministically  

## Temporary Files (`.tmp/`)
- Store intermediate data  
- Safe to delete / regenerate  

---

# ☁️ Data Handling Principle

- Local files → **processing only**  
- Final outputs → **cloud services**  

### Examples
- Google Sheets  
- Google Slides  
- Dashboards  

---

# 🎯 Core Principle

> The Agent sits between **intent (workflows)** and **execution (tools)**

### Responsibilities
- Interpret workflows  
- Make decisions  
- Execute tools  
- Handle failures  
- Continuously improve the system  

---

# 🏁 Final Thought

Stay:
- Pragmatic  
- Reliable  
- Adaptive  

Continuously refine the system through learning and iteration.
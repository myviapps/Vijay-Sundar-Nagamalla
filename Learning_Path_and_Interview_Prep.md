# Vijay Sundar Nagamalla — Complete Learning Path & Principal Architect Interview Prep
**Target: AI Developer Role at Trimont**
**Format: Interviewer (Principal Architect) asks → You answer**

---

> **How to use this document:**
> Read the CONCEPT first. Then read the INTERVIEWER question. Write your answer. Then compare with the MODEL ANSWER.
> Do this every day for 2 weeks. By end of week 2 you will own every topic.

---

# SKILL MAP — Where Each Technology Is Used

| Skill | Trimont Project | SkillForge | WAT Framework | Vimysun |
|---|---|---|---|---|
| Python | ✅ Backend, scripts | ✅ FastAPI | ✅ All tools | ✅ FastAPI |
| JavaScript/TS | ✅ React frontend | ✅ React 19 | — | ✅ React |
| SQL | ✅ MySQL queries | ✅ PostgreSQL | — | ✅ PostgreSQL |
| React 19 | ✅ Dashboard UI | ✅ Full SPA | — | ✅ Frontend |
| FastAPI | — | ✅ API layer | — | ✅ API layer |
| Node.js/Express | ✅ Backend APIs | — | — | — |
| PostgreSQL | — | ✅ Primary DB | — | ✅ Supabase |
| MySQL | ✅ Loan data | — | — | — |
| Redis | — | ✅ Celery broker | — | — |
| Celery | — | ✅ Async scraping | — | — |
| Docker | — | ✅ All services | — | — |
| JWT/RBAC | ✅ Auth | ✅ 8-role system | — | ✅ 3-role |
| OpenAI API | ✅ RAG + Copilot | — | — | — |
| Claude API | — | — | ✅ Agent brain | — |
| LangChain | ✅ RAG pipeline | — | — | — |
| FAISS/Pinecone | ✅ Vector store | — | — | — |
| MCP | ✅ Tool calling | — | ✅ Tool interface | — |
| RAG Pipeline | ✅ Core AI | — | — | — |
| XGBoost | ✅ Default predict | — | — | — |
| NVIDIA AI | — | ✅ AI Hub | — | — |
| Google Sheets API | — | — | — | ✅ Reporting |
| Power BI | Reporting | Reporting | — | — |
| Supabase | — | — | — | ✅ Cloud DB |

---

# PHASE 0 — FOUNDATION (You already know this)

## Python

**Where used:** FastAPI backends (SkillForge, Vimysun), all WAT tools, LangChain scripts, ML models (XGBoost), Celery tasks.

---

**🎓 INTERVIEWER (Principal Architect):** Walk me through how Python is used differently across your projects.

**✅ MODEL ANSWER:**
"Python plays three different roles across my stack. In SkillForge and Vimysun it's the API layer via FastAPI — async endpoints, SQLAlchemy ORM, Pydantic validation. In the WAT framework it's the execution layer — deterministic tools that do file operations, API calls, database queries. And in the Trimont project it's the AI layer — LangChain chains, embedding generation, XGBoost training. Three separate mental models for the same language."

---

**🎓 INTERVIEWER:** What's the difference between `async def` and `def` in FastAPI and when does it matter?

**✅ MODEL ANSWER:**
"FastAPI runs on an ASGI server (Uvicorn). `async def` endpoints don't block the event loop — so while waiting for DB or external API, FastAPI can handle other requests. `def` routes run in a threadpool. Use `async def` when you're doing I/O (DB queries, HTTP calls, file reads). Use `def` only for CPU-heavy work, though even then a background task or Celery worker is better. In SkillForge every route is async because we're constantly hitting PostgreSQL and the NVIDIA AI API."

---

## SQL — MySQL + PostgreSQL

**Where used:** Trimont (MySQL — loan/payment/property tables), SkillForge (PostgreSQL — users/institutions/assessments), Vimysun (Supabase/PostgreSQL — students/classrooms/scores).

---

**🎓 INTERVIEWER:** In the Trimont loan platform, how would you design the database schema for loan servicing?

**✅ MODEL ANSWER:**
"Three core tables: `loans` (loan_id PK, borrower_id FK, principal, interest_rate, tenure, status), `payments` (payment_id PK, loan_id FK, amount_paid, due_date, paid_date, status — ENUM: pending/paid/missed), `properties` (property_id PK, loan_id FK, name, location, monthly_income, occupancy_rate). Key indexes: `loan_id` on payments for O(log n) history lookups, `status` on loans for risk queries. For risk scoring I'd add a `risk_scores` table with a timestamp so we can track score changes over time, not just current state."

---

**🎓 INTERVIEWER:** SkillForge has 8 roles and multi-tenant data. How do you prevent data leakage between institutions in SQL?

**✅ MODEL ANSWER:**
"Two layers. First, every table that is institution-scoped has an `institution_id` column with a NOT NULL constraint and a FK to the institutions table. Second, all API queries include `WHERE institution_id = :active_institution_id` — never without it. In SQLAlchemy I enforce this at the service layer with a base query factory that always appends the institution filter. We also use PostgreSQL Row-Level Security as a defense-in-depth measure for super-sensitive tables. The CollegeManagementContext in the frontend stores `active_institution_id` in localStorage and passes it to every API call."

---

# PHASE 1 — FULL STACK CORE

## React 19 + TypeScript + TanStack Query

**Where used:** All 3 frontend projects — Trimont dashboard, SkillForge SPA, Vimysun tracker.

---

**🎓 INTERVIEWER:** Explain TanStack Query and why you chose it over Redux for these projects.

**✅ MODEL ANSWER:**
"TanStack Query is a server-state manager — it handles caching, background refetching, loading/error states, and stale-while-revalidate for API data. Redux is client-state — great for UI state that doesn't come from the server. In all three projects, 90% of state is server data: loan details, student scores, risk assessments. TanStack Query gives us automatic cache invalidation on mutations, background sync, and optimistic updates without the boilerplate of Redux actions/reducers/selectors. We only use local state (useState) for UI-only things like modal open/close."

---

**🎓 INTERVIEWER:** The SkillForge admin has a dual-sidebar layout. Walk me through the architecture decision.

**✅ MODEL ANSWER:**
"The challenge was: super_admin needs global navigation AND institution-specific navigation simultaneously. Putting everything in one sidebar would be cluttered and context-mixing. So we built two separate sidebars: the global sidebar is always visible with super_admin links (Institutions, Courses, Users, Settings). The secondary sidebar, InstitutionCommandSidebar, appears only when inside /admin/colleges/:collegeId/* routes — it's mounted by CollegeManagementLayout which is the nested route parent. To prevent double-rendering, DashboardLayout uses a React context — if it detects it's already inside another DashboardLayout, it returns children directly. CollegeManagementContext provides institution_id to all child components so every API call is automatically scoped."

---

## FastAPI + SQLAlchemy + Pydantic

**Where used:** SkillForge backend, Vimysun backend.

---

**🎓 INTERVIEWER:** How does Pydantic v2 help you in a multi-role system like SkillForge?

**✅ MODEL ANSWER:**
"Pydantic models act as the contract between HTTP and your domain. For SkillForge with 8 roles, each role has different data it should see. We have base schemas and role-specific response schemas — for example UserBase has common fields, StudentResponse extends it with coding_stats, FacultyResponse extends it with classroom_access. Pydantic v2's model_validator and field_validator let us enforce business rules at the schema level — a student can't have an institution_admin permission level, that's caught before it hits the DB. The performance improvement in v2 (Rust core) matters when you're serializing 200-student leaderboards."

---

## Node.js / Express

**Where used:** Trimont backend (loan APIs, payment tracking, risk engine).

---

**🎓 INTERVIEWER:** Why Node.js for Trimont backend instead of FastAPI?

**✅ MODEL ANSWER:**
"For the Trimont project, the primary backend jobs are CRUD operations on loan/payment/property data and serving the AI Copilot. Node.js excels at I/O-heavy operations with its event loop — it handles multiple concurrent Copilot chat sessions efficiently without spawning threads. Express gives us fast route setup. The AI heavy-lifting (LangChain, embeddings, XGBoost) runs as a separate Python service — this is actually the WAT framework principle applied to system architecture: deterministic data operations in Node.js, probabilistic AI in Python."

---

# PHASE 2 — AI / AGENTIC STACK ← YOUR CORE DIFFERENTIATOR

## OpenAI API + Claude API

**Where used:** Trimont RAG Copilot (OpenAI), WAT Framework agent brain (Claude).

---

**🎓 INTERVIEWER:** What's the difference between OpenAI API and Claude API from an engineering standpoint?

**✅ MODEL ANSWER:**
"Both are REST APIs with similar patterns — messages array, system prompt, model selection. Key differences: Claude has a larger context window (200K tokens) which matters for the Trimont use case where loan agreements can be long documents. OpenAI has a broader ecosystem — LangChain has deeper OpenAI integrations, embeddings API is tightly integrated. For the WAT framework I chose Claude because its instruction-following is stronger for agentic tasks — it reliably uses the tools I define rather than trying to answer from training data. For Trimont RAG I use OpenAI embeddings (text-embedding-3-small) for consistency between the embedding and generation models."

---

**🎓 INTERVIEWER:** How do you handle API rate limits in a production system with multiple users hitting the AI Copilot?

**✅ MODEL ANSWER:**
"Three strategies. First, request queuing — use Redis as a queue, Celery workers process AI requests with rate-limit awareness. Second, caching — for repeated questions (What is loan #123's risk score? will be asked many times), cache the LLM response in Redis with a TTL. Third, exponential backoff with jitter — if we hit a 429, retry with 2^n + random(0,1) seconds. In SkillForge's AI hints, I also implemented semantic deduplication — if two students ask similar questions (cosine similarity > 0.92 on embeddings), serve the cached answer rather than calling the LLM again."

---

## LangChain + LlamaIndex

**Where used:** Trimont RAG pipeline (LangChain orchestration).

---

**🎓 INTERVIEWER:** Explain the full RAG pipeline you built for the Trimont platform step by step.

**✅ MODEL ANSWER:**
"Five stages. Stage 1 — Document Ingestion: PDF loan agreements are uploaded, PyPDF2 extracts text, we chunk by 512 tokens with 50-token overlap (overlap preserves context at chunk boundaries). Stage 2 — Embedding: Each chunk is sent to OpenAI text-embedding-3-small, which returns a 1536-dimension vector. Stage 3 — Vector Storage: Vectors + metadata (loan_id, doc_type, page_number) are stored in FAISS locally or Pinecone for production. Stage 4 — Retrieval: User query is embedded with the same model. We do top-k=5 cosine similarity search to get the most relevant chunks. Stage 5 — Generation: We build a prompt: System context + retrieved chunks + user query → sent to GPT-4o. The response cites which document sections it used. LangChain orchestrates stages 4 and 5 with RetrievalQA chain."

---

**🎓 INTERVIEWER:** RAG vs Fine-tuning vs MCP Tool Calling — when do you use each?

**✅ MODEL ANSWER:**
"This is the core architectural decision in AI systems. Fine-tuning: use when you need the model to learn a new style, domain vocabulary, or reasoning pattern that can't be injected at runtime. It's expensive, slow to update, and the training data needs to be high quality. I'd use it if Trimont's underwriters write in a very specific jargon that the base model doesn't know. RAG: use when knowledge is too large for context window, frequently updated, or you need source citations. Loan agreements change — you don't retrain the model every time a document is added. RAG handles this. MCP Tool Calling: use when the answer requires live data or computation that the model can't know from documents. 'What's the current risk score for loan 447?' — that's a DB query, not a retrieval problem. The AI should call the getRiskScore tool, get live data, and explain it. In the Trimont Copilot I route: simple live-data queries → MCP, document-grounded questions → RAG, and the classifier itself is a small LLM call."

---

## FAISS + Pinecone (Vector Databases)

**Where used:** Trimont — storing embeddings of loan documents for semantic search.

---

**🎓 INTERVIEWER:** When would you use FAISS vs Pinecone?

**✅ MODEL ANSWER:**
"FAISS is a library, Pinecone is a managed service. FAISS runs in-memory on your server — it's fast, free, and great for development or when your vector count is under ~1 million. The downside: you manage persistence yourself (serialize to disk), no built-in metadata filtering, and scaling is manual. Pinecone is managed — automatic scaling, built-in metadata filtering (filter by loan_id, doc_type before the ANN search), high-availability, and a proper upsert API. For the Trimont production system I'd use Pinecone: we need to filter by loan_id so we only search within a specific loan's documents, not across all customers' documents. That metadata filter is critical for both performance and data isolation in a financial system."

---

**🎓 INTERVIEWER:** Explain cosine similarity and why it's used for semantic search.

**✅ MODEL ANSWER:**
"An embedding model converts text into a high-dimensional vector where semantically similar texts have vectors that point in similar directions. Cosine similarity measures the angle between two vectors — not their magnitude, just their direction. Score of 1.0 means identical direction (semantically identical), 0 means perpendicular (unrelated), -1 means opposite. We use cosine instead of Euclidean distance because we care about semantic meaning (direction), not the magnitude of the vectors. In practice: 'What is the interest rate on this loan?' and 'What's the loan's annual rate?' will have cosine similarity of ~0.94 and return the same relevant chunks from the loan document."

---

## MCP — Model Context Protocol

**Where used:** Trimont AI tool calling, WAT Framework tool interface.

---

**🎓 INTERVIEWER:** Explain MCP to me as if you're presenting to Trimont's engineering team.

**✅ MODEL ANSWER:**
"MCP is a standard protocol for giving AI models access to tools — think of it as a USB standard for AI integrations. Before MCP, every AI integration was bespoke — you'd define tools in OpenAI's format, different format for Claude, different for Gemini. MCP standardizes the tool definition: a JSON schema specifying tool name, description, input parameters, and output format. The AI model sees the tool catalog, decides which tool to call based on the user's query, sends a structured call, your backend executes it, returns structured JSON, the AI incorporates the result and responds. In the Trimont platform, I defined 4 tools: getLoanDetails(loanId), getRiskScore(propertyId), getPaymentHistory(loanId), getAllRiskyLoans(). When a user asks 'Is loan 221 at risk?' the AI calls getRiskScore(221), receives {risk_level: 'HIGH', score: 78, reasons: [...]}, and generates a natural language explanation. The AI never directly queries the DB — it goes through the tool layer."

---

## Agentic Orchestration — WAT Framework

**Where used:** WAT Framework project — the architecture itself. Applied as a principle in all other projects.

---

**🎓 INTERVIEWER:** The WAT framework separates AI reasoning from execution. Why does this matter in practice?

**✅ MODEL ANSWER:**
"It's a reliability engineering problem. An LLM is probabilistic — each output has a probability of being correct, not a guarantee. If you chain 5 LLM operations where each is 90% reliable, your end-to-end success rate is 0.9^5 = 59%. That's unacceptable for a financial system. The WAT solution: AI does only one thing — decision making and reasoning. Every actual operation — a database write, an API call, a file operation — is delegated to a deterministic Python tool. The tool either succeeds or throws an exception with a traceable error. Now your pipeline is: AI (probabilistic, 90%) → Tool (deterministic, near-100%) → AI (90%) → Tool (near-100%). The probabilistic part is isolated to the reasoning steps, the execution is deterministic. This is also why the WAT framework has a self-improvement loop — when a tool fails, we fix the tool, not retrain the AI."

---

## XGBoost

**Where used:** Trimont — predicting loan default probability.

---

**🎓 INTERVIEWER:** Why XGBoost for default prediction instead of a neural network?

**✅ MODEL ANSWER:**
"Three reasons for the Trimont use case. First, interpretability — in a financial context, regulators and credit teams need to know WHY a loan was flagged as high default risk. XGBoost gives feature importance scores: payment delay history is 35% of the prediction, income decline is 28%, occupancy is 22%. A neural network is a black box that Trimont's compliance team can't audit. Second, tabular data — XGBoost is superior to neural networks on structured/tabular data (loan amounts, payment dates, income figures). Neural nets need large datasets to outperform gradient boosting on tabular data. Third, speed — XGBoost inference is microseconds, real-time scoring on every loan update is feasible. A deep learning model would need GPU inference for the same latency."

---

# PHASE 3 — DEVOPS & INFRASTRUCTURE

## Docker + Docker Compose

**Where used:** SkillForge — containerizes frontend, backend, PostgreSQL, Redis, code judge.

---

**🎓 INTERVIEWER:** Walk me through the SkillForge docker-compose architecture.

**✅ MODEL ANSWER:**
"Five services in the compose file: `db` (PostgreSQL 15 — named volume for persistence), `redis` (Redis 7 — Celery message broker), `backend` (FastAPI app — depends_on db and redis, environment variables from .env), `worker` (Celery worker — same image as backend, runs `celery -A app.worker worker`), `frontend` (Nginx serving the Vite build — depends_on backend). The code judge runs as a separate container per submission, spawned dynamically — isolated network, resource limits (CPU, memory, no internet), auto-destroyed after 10 seconds. This prevents malicious code from affecting the host. Health checks on db and redis ensure the backend doesn't start before dependencies are ready."

---

## Redis + Celery

**Where used:** SkillForge — async platform scraping (LeetCode, HackerRank aggregation).

---

**🎓 INTERVIEWER:** Why use Celery + Redis for the competitive platform scraping instead of just doing it in the API request?

**✅ MODEL ANSWER:**
"Scraping LeetCode and HackerRank for a student takes 3-8 seconds per platform — multiply by 5 platforms and you have a 15-40 second API response, which is completely unacceptable. Celery moves this to a background queue. The API immediately returns 'sync started' with a task_id. The Celery worker picks up the task from Redis queue, does all the scraping, and writes results to PostgreSQL. The frontend polls a `/sync/status/{task_id}` endpoint until complete, then refreshes the dashboard. Redis serves as both the message broker (task queue) and result backend (task status/output). We also use Redis for rate-limiting — track how many times we've hit LeetCode's API per minute and enforce delays to avoid getting blocked."

---

## Nginx

**Where used:** SkillForge — reverse proxy, static file serving.

---

**🎓 INTERVIEWER:** What does Nginx do in the SkillForge deployment?

**✅ MODEL ANSWER:**
"Nginx serves two roles. First, static file server — the Vite build outputs a `/dist` folder with JS/CSS bundles. Nginx serves these directly with aggressive caching headers (immutable cache for hashed filenames). Much faster than Node.js serving static files. Second, reverse proxy — all `/api/*` requests are proxied to the FastAPI backend container. This means the browser only ever talks to one origin (Nginx on port 80/443), solving CORS entirely. Nginx also handles TLS termination — SSL certificate lives at Nginx, backend gets plain HTTP internally. And it handles connection timeouts, keeps the backend from being directly exposed, and allows us to do blue-green deploys by switching the upstream."

---

# PHASE 4 — ADVANCED AI (Interview differentiation tier)

## Hallucination Prevention in Financial AI

**🎓 INTERVIEWER:** This is critical for Trimont. How do you prevent the AI Copilot from hallucinating loan details?

**✅ MODEL ANSWER:**
"Four layers of defense. Layer 1 — Grounding: The AI never answers from training data about specific loans. Every response must be grounded in either retrieved RAG chunks or MCP tool output. The system prompt explicitly states: 'You must only cite facts from the provided context. If the context does not contain the answer, say so.' Layer 2 — Source citation: The response must include which document and page it sourced from. If no source exists, no fact. Layer 3 — Tool-first routing: Simple factual queries ('What is the interest rate on loan 221?') always go to the MCP getLoanDetails tool — live DB data, zero hallucination risk. RAG is only for document-grounded questions. Layer 4 — Confidence scoring: We use the LLM's own uncertainty — if it hedges with language like 'I think' or 'approximately', we flag the response for human review before showing it in a financial context."

---

## Multi-Agent Systems

**🎓 INTERVIEWER:** How would you extend the WAT framework to handle multiple specialized agents?

**✅ MODEL ANSWER:**
"The natural evolution is a supervisor-worker pattern. A supervisor agent receives the high-level task and decomposes it. Specialized worker agents handle sub-domains: a RiskAgent that only processes risk-related tools, a PaymentAgent for payment history, a DocumentAgent for RAG retrieval. The supervisor routes sub-tasks to workers and synthesizes responses. This is what LangGraph implements — a directed graph of agents with typed state. The WAT framework principle still applies: workers execute tools, never raw LLM operations. The added complexity is state management — worker outputs need to be shared. LangGraph uses a state schema that each node can read from and write to, preventing workers from interfering with each other's context."

---

## AI Observability

**🎓 INTERVIEWER:** How would you monitor the Trimont AI Copilot in production?

**✅ MODEL ANSWER:**
"Three monitoring dimensions. First, operational: track latency per request (P50, P95, P99), error rates (LLM API failures, tool call failures), and cost (tokens used per session). Alert on P95 > 5 seconds or error rate > 1%. Second, quality: log every query-response pair with the retrieved context. Use an LLM-as-judge pattern — periodically send sampled Q&A pairs to a cheap model asking 'Is this response grounded? Is it accurate? Is it helpful?' Score 1-5. Track quality score over time — model updates or RAG changes that degrade quality appear immediately. Third, business: track which tools are called most, which loans are queried most, where users abandon the conversation. This is product analytics on top of AI analytics. I'd use LangSmith or Langfuse for the LLM tracing layer."

---

# PHASE 5 — REPORTING & OPS (Your existing strength)

## Power BI

**Where used:** Xplore — KPI dashboards for program leaders, Trimont — executive reporting layer.

---

**🎓 INTERVIEWER:** How would Power BI integrate with the Trimont platform?

**✅ MODEL ANSWER:**
"Power BI connects to the MySQL database via the MySQL connector. I'd build three report pages: Portfolio Overview (total loan value, average risk score, delinquency rate, monthly revenue trend), Risk Distribution (bar chart of loans by risk tier, heatmap of risk by property location, month-over-month risk score changes), and Operational Metrics (payment collection rate, overdue loan count, average days to resolution). The reports refresh daily via scheduled refresh in Power BI Service. For executives who can't use the full platform, they get a Power BI embedded view. The key is keeping Power BI as a read-only reporting layer — it never writes to the DB, it never runs ML models. That's the production system's job."

---

## Google Sheets API

**Where used:** Vimysun — institutional reporting export.

---

**🎓 INTERVIEWER:** Why Google Sheets API instead of just CSV export?

**✅ MODEL ANSWER:**
"CSV export is pull — faculty downloads it manually when they want data. Google Sheets API is push — the system writes to a designated sheet automatically on a schedule. For Vimysun's institutional use case, the Head of Department has a Google Sheet that automatically gets the latest student performance data every morning. They can build their own formulas, charts, and pivot tables on live data without needing to log into the platform. The API uses a service account for auth — no OAuth popup for the system, just write access scoped to specific sheets. We use `gspread` Python library: `sheet.update('A2', data_rows)` writes the entire student dataset. The sheet ID is stored in environment config, so different institutions get their own dedicated sheet."

---

# SYSTEM DESIGN — The Full Interview

## End-to-End: Design the Trimont AI Platform from Scratch

**🎓 INTERVIEWER:** You have 45 minutes. Design a production AI system for Trimont that handles 500 concurrent users, 10 million loan documents, and sub-3-second Copilot responses. Walk me through it.

**✅ MODEL ANSWER:**

**"I'll go layer by layer.**

**Data Layer:** PostgreSQL (primary — loan/payment/property/user data) + Redis (caching + Celery broker) + Pinecone (vector DB — 10M documents at 1536 dims = ~15GB, Pinecone handles this at production scale). MySQL was fine for the prototype but PostgreSQL's advanced indexing and better concurrency handles 500 users better.

**Ingestion Pipeline:** Document upload → FastAPI endpoint → Celery task queue → Worker reads PDF, extracts text, chunks at 512 tokens, sends batch to OpenAI embeddings API, upserts to Pinecone with metadata {loan_id, doc_type, page, timestamp}. Async — user uploads and gets immediate confirmation, embedding happens in background. 10M documents processed in ~48 hours with 10 workers at OpenAI's batch API rate.

**AI Copilot Flow:** User query → Intent classifier (small LLM call, ~100ms) → Route to: [MCP tools for live data] or [RAG for document questions] or [Both for complex queries]. RAG: embed query → Pinecone similarity search filtered by loan_id → top-5 chunks → build prompt → GPT-4o streaming response. Target: <3 seconds total. Pinecone query: ~100ms. Embedding: ~100ms. LLM: ~1.5-2s streaming start.

**Risk Engine:** Runs as a separate service. On every payment event, recalculates risk score (weighted formula), writes to risk_scores table with timestamp, publishes event to Redis pub/sub. Frontend subscribes via WebSocket — risk badges update in real time without page refresh.

**Scaling:** Kubernetes for orchestration. FastAPI pods auto-scale on CPU. Celery workers auto-scale on queue depth. Pinecone handles vector scale internally. PostgreSQL with read replicas for reporting queries. CDN for static assets.

**Observability:** LangSmith for LLM traces. Prometheus + Grafana for infra metrics. Sentry for error tracking. Custom dashboard tracking AI quality score (LLM-as-judge, sampled 5% of responses daily).**

**The hardest part isn't the architecture — it's the data isolation. Each Trimont client's loan documents must never contaminate another client's RAG results. Pinecone's metadata filter (namespace per client) solves this at the vector layer. PostgreSQL RLS solves it at the data layer. JWT claims carry the tenant_id, and every query includes it."**

---

# 14-DAY INTERVIEW PREPARATION SCHEDULE

| Day | Focus | What to Do |
|---|---|---|
| **Day 1** | Python + SQL deep dive | Re-read your FastAPI code. Write 5 SQL queries on the Trimont schema. |
| **Day 2** | React + TanStack Query | Open SkillForge frontend. Trace one data flow from UI → API → DB → UI. |
| **Day 3** | RAG Pipeline hands-on | Run the Trimont RAG pipeline end-to-end. Ask it 10 different questions. |
| **Day 4** | MCP Tool Calling | Add a new tool to the Trimont Copilot. Test it. |
| **Day 5** | WAT Framework | Run a WAT workflow end-to-end. Introduce a deliberate error. Watch it recover. |
| **Day 6** | Docker deep dive | Take down SkillForge. Bring it back up. Read every line of docker-compose.yml. |
| **Day 7** | SYSTEM DESIGN practice | Whiteboard the Trimont system design from memory. Time yourself: 30 minutes. |
| **Day 8** | XGBoost + ML | Retrain the default prediction model. Check feature importance. |
| **Day 9** | Redis + Celery | Inspect the Celery task queue in Redis. Monitor a scraping task live. |
| **Day 10** | Security deep dive | JWT flow, RBAC enforcement, SQL injection prevention, rate limiting. |
| **Day 11** | AI Architecture theory | RAG vs Fine-tuning vs MCP — write a 1-page decision framework. |
| **Day 12** | Full mock interview | Answer every Q in this document out loud. Record yourself. |
| **Day 13** | Domain knowledge | Read about CRE loan servicing. Learn: LTV ratio, DSCR, NOI, cap rate. |
| **Day 14** | Final review | Read this whole document. Then close it and write the key points from memory. |

---

# DOMAIN KNOWLEDGE — CRE Terms Trimont Will Expect You to Know

| Term | Definition | Why it matters for AI |
|---|---|---|
| **LTV** | Loan-to-Value ratio | Key risk input — high LTV = higher default risk |
| **DSCR** | Debt Service Coverage Ratio | Net Operating Income / Debt Payment — below 1.0 is danger zone |
| **NOI** | Net Operating Income | Property revenue minus expenses — drives risk scoring |
| **Cap Rate** | NOI / Property Value | Measures property yield — declining cap rate = increasing risk |
| **Occupancy Rate** | % of rentable space occupied | Used in Trimont risk engine (< 60% = MEDIUM RISK) |
| **Delinquency** | Missed or late loan payments | Core risk signal — 2+ missed payments = HIGH RISK |
| **Maturity Date** | When the full loan is due | Upcoming maturities need proactive risk review |
| **Forbearance** | Temporary payment pause | AI should flag these differently from defaults |

---

> **Final Note from your Principal Architect interviewer:**
> You have built systems that are directly in Trimont's domain. Most candidates can talk about RAG theoretically. You have actually built a RAG pipeline on loan documents, an MCP tool-calling system for loan data, and a risk scoring engine with the same weighted factors Trimont uses. Walk in knowing that. Own every project on your resume. The resume is just the door — this document is what gets you through it.

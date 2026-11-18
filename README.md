# AI Tutor Workspace

An adaptive, open-domain Software Engineering & Computer Science tutor built on the open **`AGENTS.md`** and **Agent Skills (`.agents/skills/`)** standards—working seamlessly across **Antigravity, Claude Code, Cursor, OpenAI Codex, GitHub Copilot, Gemini CLI, Windsurf, Cline, and Roo Code**.

It tracks your verified competence across **two layers**—**Core Concepts** (paradigms, algorithms, design principles, system architecture) and **Technology Bindings** (language-specific syntax, runtime mechanics, and gotchas)—adapting roadmaps, lessons, and hands-on labs to what you already know.

---

## Quick Start

Open the chat panel and run:

```text
/ait-config
```

On first run, `/ait-config` launches a short onboarding flow to set your preferred **Response Language**, **Default Coding Language**, prior background, and initial learning goal.

---

## Slash Commands

All commands are grouped under the `/ait-` prefix (type `/ait` in chat to filter all tutor commands) and support **zero-argument** execution where applicable:

| Command | Usage | Description |
| :--- | :--- | :--- |
| **`/ait-config`** | `/ait-config [preferences]` | Run first-time onboarding, view active settings, or update preferences (e.g., `/ait-config language <lang>`, `/ait-config coding-lang TypeScript`). |
| **`/ait-status`** | `/ait-status` | View your 2-layer competence dashboard, active roadmap/exercise state, due reviews, and recurring blind spots. |
| **`/ait-check`** | `/ait-check [topic]` | **Verify prior knowledge:** Takes a top-down diagnostic challenge; records verified mastery to memory so you skip redundant lessons. |
| **`/ait-roadmap`** | `/ait-roadmap [goal]` | **No args:** Display current roadmap progress in chat.<br>**With goal:** Build a personalized roadmap that skips mastered basics and marks cross-language bridges. |
| **`/ait-learn`** | `/ait-learn [topic]` | Learn a new concept anchored to what you already know—or run a fast **Syntax & Quirks Bridge** when you already know the core concept from another language. *(No args = next item in active roadmap).* |
| **`/ait-practice`** | `/ait-practice [topic]` | Generate a hands-on lab inside `exercises/` tailored to the topic's nature (`implementation`, `refactoring`, `debugging`, or `design`). *(No args = current studied concept).* |
| **`/ait-hint`** | `/ait-hint` | Get progressive 3-tier Socratic guidance on your active exercise without spoiling the solution. |
| **`/ait-submit`** | `/ait-submit` | Execute automated tests, review complexity/design/trade-offs, and immediately persist results to your knowledge graph. |
| **`/ait-review`** | `/ait-review` | Run a 2–3 minute spaced-repetition check on concepts due for review. |

---

## Workspace Layout

```text
.
├── .agents/          # Portable Agent Skills (.agents/skills/), assessment modalities, and optional SessionStart hook
├── .gemini/          # Maps Gemini CLI context file directly to AGENTS.md
├── .tutor/           # Internal persistent memory (profile, session state, 2-layer knowledge graph, roadmaps)
├── AGENTS.md         # Universal always-on pedagogical constitution (read natively across AI coding tools)
├── README.md         # Quick reference guide
└── exercises/        # Your hands-on workspace (each /ait-practice creates a dedicated lab folder here)
```

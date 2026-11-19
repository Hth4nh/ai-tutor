# AI Tutor Workspace

An adaptive, open-domain Software Engineering & Computer Science tutor built on the open **`AGENTS.md`** and **Agent Skills (`.agents/skills/`)** standards—working seamlessly across **Antigravity, Claude Code, Cursor, OpenAI Codex, GitHub Copilot, Gemini CLI, Windsurf, Cline, and Roo Code**.

It tracks your verified competence across **two layers**—**Core Concepts** (paradigms, algorithms, design principles, system architecture) and **Technology Bindings** (language-specific syntax, runtime mechanics, and gotchas)—adapting roadmaps, lessons, and hands-on labs to what you already know.

---

## Installation & Quick Start

### 1. Prerequisites
- Any supported AI coding tool (**Antigravity**, **Claude Code**, **Cursor**, **OpenAI Codex**, **GitHub Copilot**, **Gemini CLI**, **Windsurf**, **Cline**, or **Roo Code**).
- **Node.js 18+** *(optional — powers automatic `SessionStart` context injection in **Antigravity**, **Claude Code**, **Gemini CLI**, and **Cursor**; other tools fall back automatically via `AGENTS.md`)*.
- The language runtime or toolchain for whatever subject you choose to practice (e.g., Python, Node.js, JDK, Go, Rust).

### 2. Get the Workspace
- **Recommended (Track your own progress privately):** Click **Use this template** on GitHub to create a private repository, then clone your copy.
- **Or clone directly:**
  ```bash
  git clone https://github.com/Hth4nh/ai-tutor.git
  cd ai-tutor
  ```

### 3. Open in Your AI Tool & Initialize
- **AI IDEs** *(Antigravity IDE, Cursor, Windsurf, VS Code + Copilot/Cline/Roo)*: Open the `ai-tutor` folder as your workspace.
- **CLI Agents**: Run your agent directly from the `ai-tutor` directory (`agy`, `claude`, `codex`, or `gemini`).

Then run your first command in chat:

```text
/ait-config
```

On first run, `/ait-config` launches a short onboarding flow to set your preferred **Response Language**, **Default Coding Language**, prior background, and initial learning goal.

### 4. Typical Learning Flow
1. **Verify what you already know:** `/ait-check <topic>` — pass a quick top-down diagnostic to record prior mastery.
2. **Plan a new subject:** `/ait-roadmap <goal>` — generates a tailored path skipping mastered basics.
3. **Learn & build:** `/ait-learn` -> `/ait-practice` -> `/ait-hint` *(if stuck)* -> `/ait-submit`.
4. **Retain long-term:** `/ait-review` for spaced repetition and `/ait-status` to inspect your knowledge graph.

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
├── .agents/          # Portable Agent Skills (.agents/skills/), assessment modalities, SessionStart script & Antigravity hook
├── .claude/          # Claude Code SessionStart hook config
├── .cursor/          # Cursor sessionStart hook config
├── .gemini/          # Gemini CLI AGENTS.md mapping & SessionStart hook config
├── .tutor/           # Internal persistent memory (profile, session state, 2-layer knowledge graph, roadmaps)
├── AGENTS.md         # Universal always-on pedagogical constitution (read natively across AI coding tools)
├── README.md         # Quick reference guide
└── exercises/        # Your hands-on workspace (each /ait-practice creates a dedicated lab folder here)
```

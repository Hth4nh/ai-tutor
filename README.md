# AI Tutor Workspace

An adaptive, open-domain Software Engineering & Computer Science tutor powered by Google Antigravity rules, skills, and lifecycle hooks.

It tracks your verified competence across **two layers**—**Core Concepts** (paradigms, algorithms, design principles, system architecture) and **Technology Bindings** (language-specific syntax, runtime mechanics, and gotchas)—adapting roadmaps, lessons, and hands-on labs to what you already know.

---

## Quick Start

Open the chat panel in Antigravity and run:

```text
/profile
```

On first run, `/profile` launches a short onboarding flow to set your preferred **Response Language**, **Default Coding Language**, prior background, and initial learning goal.

---

## Slash Commands

All commands work both **with arguments** and **with zero arguments** (automatically resolving context from your active session state):

| Command | Usage | Description |
| :--- | :--- | :--- |
| **`/profile`** | `/profile [preferences]` | View your competence summary & settings, run first-time onboarding, or update preferences (e.g., `/profile language <lang>`, `/profile coding-lang TypeScript`). |
| **`/check`** | `/check [topic]` | **Verify prior knowledge:** Takes a top-down diagnostic challenge; records verified mastery to memory so you skip redundant lessons. |
| **`/roadmap`** | `/roadmap [goal]` | **No args:** Display current roadmap progress in chat.<br>**With goal:** Build a personalized roadmap that skips mastered basics and marks cross-language bridges. |
| **`/study`** | `/study [topic]` | Teach a new concept anchored to what you already know—or run a fast **Syntax & Quirks Bridge** when you already know the core concept from another language. *(No args = next item in active roadmap).* |
| **`/practice`** | `/practice [topic]` | Generate a hands-on lab inside `exercises/` tailored to the topic's nature (`implementation`, `refactoring`, `debugging`, or `design`). *(No args = current studied concept).* |
| **`/hint`** | `/hint` | Get progressive 3-tier Socratic guidance on your active exercise without spoiling the solution. |
| **`/submit`** | `/submit` | Execute automated tests, review complexity/design/trade-offs, and immediately persist results to your knowledge graph. |
| **`/review`** | `/review` | Run a 2–3 minute spaced-repetition check on concepts due for review. |

---

## Workspace Layout

```text
.
├── .agents/          # Internal agent skills, assessment modalities, and SessionStart hook
├── .tutor/           # Internal persistent memory (profile, session state, 2-layer knowledge graph, roadmaps)
├── GEMINI.md         # Always-on pedagogical constitution
├── README.md         # Quick reference guide
└── exercises/        # Your hands-on workspace (each /practice creates a dedicated lab folder here)
```

---
name: ait-help
description: >-
  Display a localized guide and quick-reference cheat sheet for all /ait-*
  commands (or detailed examples for a specific command), tailored to the
  learner's current session state. Activate when the user invokes /ait-help
  or asks what tutor commands exist or how to use the AI Tutor.
---

# `/ait-help` — Localized Command Guide & Workflow Reference

Read `.tutor/state.json` and `.tutor/profile.md` (if present) to determine `Response Language` (if `Auto`, mirror the user's message language) and current learning state.

---

## Mode 1: Specific Command Help (`/ait-help <command>`)
If the user asks about a specific command (e.g., `/ait-help check`, `/ait-help practice`, `/ait-help update`):
1. Read `.agents/skills/ait-<name>/SKILL.md` if needed for exact behavior details.
2. Explain in `Response Language`:
   - Purpose & when to use it.
   - Zero-argument behavior vs. passing an explicit argument.
   - 2–3 concrete usage examples.
3. End with the Quick-Action Footer.

---

## Mode 2: Full Cheat Sheet (No Arguments — `/ait-help`)
Render a clean, scannable command guide **in `Response Language`**, grouped by workflow stage:

1. **Setup & Overview**
   - `/ait-config [prefs]` — First-time onboarding, view settings, or change language/difficulty.
   - `/ait-status` — View your 2-layer knowledge graph, active progress, due reviews, and blind spots.
   - `/ait-help [cmd]` — Show this command reference (or details on a single command).
2. **Assessment & Planning**
   - `/ait-check [topic]` — Prove what you already know via a short top-down diagnostic.
   - `/ait-roadmap [goal]` — View active roadmap (no args) or generate a tailored path skipping mastered basics.
3. **Core Learning Loop** *(all support zero arguments to continue your current step!)*
   - `/ait-learn [topic]` — Concise bridged lesson (or fast Syntax & Quirks Bridge for a 2nd language).
   - `/ait-practice [topic]` — Hands-on lab inside `exercises/` (`implementation`, `refactoring`, `debugging`, or `design`).
   - `/ait-hint` — Progressive 3-tier Socratic guidance without spoiling the solution.
   - `/ait-submit` — Run tests, review design/complexity, and persist verified mastery.
4. **Retention & Maintenance**
   - `/ait-review` — 2–3 minute spaced-repetition recall check on due concepts.
   - `/ait-update` — Pull the latest core skills & rules from upstream without touching `.tutor/` or `exercises/`.

**State-Aware Pointer:** Add 1 short line at the bottom telling the learner their exact current state (e.g., not onboarded yet -> start with `/ait-config`; open exercise -> continue in `exercises/...` with `/ait-hint` or `/ait-submit`; active roadmap -> `/ait-learn`), followed by the Quick-Action Footer.

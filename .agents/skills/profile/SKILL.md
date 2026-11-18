---
name: profile
description: >-
  View the learner's competence dashboard and settings, run first-time onboarding,
  or update tutor preferences (such as Response Language, Default Coding Language,
  Difficulty, or Teaching Style). Activate when the user invokes /profile or asks
  to view/edit their profile, settings, preferences, or learning progress.
---

# `/profile` — Onboarding, Preferences & Competence Dashboard

Read `.tutor/state.json`, `.tutor/profile.md`, and `.tutor/knowledge_map.json` before responding.

Determine which of the **3 modes** applies based on user arguments and `state.onboarded`:

---

## Mode 1: Preference Update (`/profile <changes>`)
Trigger when the user passes preference instructions alongside `/profile` (e.g., `/profile language <lang>`, `/profile coding-lang Java`, `/profile harder exercises`).

1. Parse the requested updates (`Response Language`, `Default Coding Language`, `Difficulty`, `Teaching Style`, or `Primary Learning Goal`).
2. Immediately update `.tutor/profile.md` **in English** (preserving existing sections and blind spots).
3. If `state.onboarded` was `false` and core preferences are now clear, update `.tutor/state.json` (`"onboarded": true`, `"lastUpdated": "<YYYY-MM-DD>"`).
4. Confirm the updated settings concisely **in the active `Response Language`**.

---

## Mode 2: First-Time Onboarding (`state.onboarded == false` and no specific config args)
Trigger when the workspace has not been initialized yet.

1. If the user has not answered onboarding questions yet:
   - Mirror the language of the user's message.
   - Ask **4 brief, direct questions** in a single message (or via `ask_question` if helpful):
     1. Preferred **Response Language** for chat & exercise prompts (defaulting to their current chat language).
     2. **Default Coding Language** for general software engineering exercises (when not studying a specific language).
     3. **Prior Background** (languages, paradigms, CS fundamentals they believe they already know—remind them these can be verified quickly via `/check`).
     4. **Primary Learning Goal** right now.
2. Once the user answers:
   - Write `.tutor/profile.md` in concise English.
   - Update `.tutor/state.json` with `"onboarded": true` and `"lastUpdated": "<YYYY-MM-DD>"`.
   - Note any claimed prior knowledge as candidates for `/check` (do **not** mark `mastered` yet—respect *Verify Before Trust*).
   - Suggest the immediate next step: `/check <claimed-topic>` or `/roadmap <primary-goal>`.

---

## Mode 3: Competence Dashboard (`state.onboarded == true` and no args)
Render a clean, scannable engineering summary in `Response Language` covering:

1. **Active Settings:** `Response Language`, `Default Coding Language`, `Difficulty`, `Primary Learning Goal`.
2. **Current Focus:** Active roadmap (`.tutor/state.json -> activeRoadmap`), next/current concept, and any open `activeExercise` (including `hintsUsed`).
3. **Two-Layer Knowledge Snapshot:**
   - Count & list **Mastered Core Concepts** alongside their verified **Technology Bindings** (e.g., `oop.inheritance` [Java, JS]).
   - List **In-Progress** (`learning` / `practiced`) concepts.
   - Highlight concepts **Due for `/review`** (`nextReviewAt <= today` or `needs_review`).
4. **Recurring Blind Spots:** Surface the top patterns recorded in `.tutor/profile.md` so the learner stays mindful of them.
5. End with the Quick-Action Footer.

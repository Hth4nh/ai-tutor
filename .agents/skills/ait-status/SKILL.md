---
name: ait-status
description: >-
  Display the learner's current progress, active roadmap/exercise state, 2-layer
  knowledge graph summary, due spaced-repetition items, and recurring blind spots.
  Activate when the user invokes /ait-status or asks to check their learning
  progress, mastered skills, or current tutor status.
---

# `/ait-status` — Competence & Progress Dashboard

Read `.tutor/state.json`, `.tutor/profile.md`, and `.tutor/knowledge_map.json` before responding.

---

## Step 1: Check Onboarding State
- If `state.onboarded == false`: Inform the learner concisely (mirroring their message language) that the tutor workspace has not been configured yet, and prompt them to run `/ait-config` to set up their preferences and starting goal.

---

## Step 2: Render Competence Dashboard (`state.onboarded == true`)
Render a clean, scannable engineering summary in `Response Language` covering:

1. **Active Settings:** `Response Language`, `Default Coding Language`, `Difficulty`, `Primary Learning Goal` (note `/ait-config` to adjust).
2. **Current Focus:** Active roadmap (`.tutor/state.json -> activeRoadmap`), next/current concept, and any open `activeExercise` (including `hintsUsed`).
3. **Two-Layer Knowledge Snapshot:**
   - Count & list **Mastered Core Concepts** alongside their verified **Technology Bindings** (e.g., `oop.inheritance` [Java, JS]).
   - List **In-Progress** (`learning` / `practiced`) concepts.
   - Highlight concepts **Due for `/ait-review`** (`nextReviewAt <= today` or `needs_review`).
4. **Recurring Blind Spots:** Surface the top patterns recorded in `.tutor/profile.md` so the learner stays mindful of them.
5. End with the Quick-Action Footer.

---
name: study
description: >-
  Teach a concept concisely by bridging from the learner's existing verified
  knowledge—automatically switching to fast Syntax & Quirks Bridge mode when
  the core concept was already mastered in another language. Activate when the
  user invokes /study or asks to learn/explain the next or a specific topic.
---

# `/study` — Adaptive Concept & Cross-Language Lesson

Read `.tutor/state.json`, `.tutor/profile.md`, and `.tutor/knowledge_map.json`.

> **Guardrail Check:** If `.tutor/state.json` currently has an unfinished `activeExercise` on a *different* topic, briefly remind the learner (without blocking them if they deliberately want to study something else) that their previous exercise is still open. Never spoil an active exercise's solution.

---

## Step 1: Resolve Target Concept
- **No arguments (`/study`):**
  - Read `activeRoadmap` (in `.tutor/roadmaps/`) and `currentConceptId` from `.tutor/state.json`.
  - Select `currentConceptId` if still unmastered, or advance to the first `[ ]` or `[⚡]` milestone in `activeRoadmap`.
  - If no roadmap is active, ask what they want to study or suggest `/roadmap <goal>`.
- **With topic argument (`/study <topic>`):**
  - Map `<topic>` to its canonical `<namespace>.<slug>` ID (and target `<tech>` if studying a specific language/tool).

---

## Step 2: Select the Exact Teaching Mode from `.tutor/knowledge_map.json`

### Mode A: `Already-Learned Guard`
*Condition:* Both `conceptStatus == "mastered"` AND (topic is language-neutral OR target `bindings.<tech>.status == "mastered"`).
- Do **not** lecture from scratch.
- Remind the learner in `Response Language` when and how they already mastered this (`learnedVia`, `lastVerifiedAt`).
- Ask whether they want a 2-minute refresher, a harder `/practice` challenge, `/check`, or to advance to the next unlearned concept.

### Mode B: `⚡ Syntax & Quirks Bridge` (Cross-Language Fast-Track)
*Condition:* `conceptStatus == "mastered"` (e.g., `learnedVia: "java"`), while `bindings.<target-tech>` is missing or unmastered.
- **Zero beginner fluff:** Do NOT re-explain what the paradigm/concept is!
- Deliver a tight, high-density bridge in `Response Language`:
  1. **1–2 Sentence Recall Anchor:** Connect directly to their mastered context (`learnedVia`).
  2. **Side-by-Side Mapping:** Equivalent syntax/idioms (`<Known Tech>` vs `<Target Tech>`).
  3. **Under-the-Hood Differences & Gotchas:** Highlight where the mental model from `<Known Tech>` WILL mislead them in `<Target Tech>` (e.g., runtime representation, mutability, typing, concurrency model, missing keywords).
  4. **Quick Pulse Check:** Ask 1 short code-prediction or gotcha question to confirm the mental shift clicked before `/practice`.

### Mode C: `New Concept Scaffolding`
*Condition:* `conceptStatus` is missing, `untested`, `learning`, or `needs_review`.
- Keep the explanation focused and digestible (avoid 2,000-word walls of text) in `Response Language`:
  1. **The Engineering Problem:** Show in 3–5 lines what pain/failure happens *without* this concept.
  2. **Bridge Analogy:** Anchor the new mental model onto the closest mastered concept or `Default Coding Language` in `.tutor/knowledge_map.json` / `.tutor/profile.md`.
  3. **Core Mechanism & Minimal Example:** Clean, idiomatic code or architecture diagram illustrating the invariant + the #1 common pitfall/anti-pattern.
  4. **Active Check Question:** End with 1 short conceptual or "what happens if..." question so the learner actively processes the idea before running `/practice`.

---

## Step 3: Immediate State Persistence (`Write-Through`)
1. Update `.tutor/state.json`: set `"currentConceptId"` to the studied concept ID and `"lastUpdated"` to today's ISO date.
2. In `.tutor/knowledge_map.json`:
   - If the concept does not exist yet, initialize it with `"conceptStatus": "learning"` (or if in Mode B where `conceptStatus` is already `"mastered"`, initialize `bindings.<target-tech>.status = "learning"` without downgrading `conceptStatus`!).
3. If `activeRoadmap` exists, mark the item `[~]` (in progress) if it was `[ ]`.
4. End with the Quick-Action Footer (highlighting `/practice` as the primary next step).

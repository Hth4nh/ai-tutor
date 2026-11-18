---
name: ait-practice
description: >-
  Generate a hands-on engineering lab inside exercises/ tailored to the target
  concept's assessment modality (implementation, refactoring, debugging, or design),
  complete with automated tests or design templates. Activate when the user invokes
  /ait-practice or asks for a coding exercise, lab, refactoring task, or design challenge.
---

# `/ait-practice` — Hands-On Exercise Lab Generator

Read `.tutor/state.json`, `.tutor/profile.md`, `.tutor/knowledge_map.json`, and [assessment-modalities.md](../../references/assessment-modalities.md).

---

## Step 1: Resolve Target Concept & Language
1. **Check Existing Active Exercise:**
   - If `.tutor/state.json` already has a non-null `activeExercise`, ask whether the learner wants to continue that exercise (`exercises/...`), submit it (`/ait-submit`), or replace/archive it with a new one.
2. **Determine Concept:**
   - **No arguments (`/ait-practice`):** Use `currentConceptId` from `.tutor/state.json` (or the next item in `activeRoadmap`).
   - **With arguments (`/ait-practice <topic>`):** Map `<topic>` to its canonical `<namespace>.<slug>` ID.
3. **Determine Implementation Language / Tool:**
   - If the topic targets a specific technology (e.g., Java, SQL, Docker, JavaScript), use that technology.
   - If the topic is language-neutral (e.g., DSA, OOP, Clean Code, Concurrency), use `Default Coding Language` from `.tutor/profile.md` (verify the corresponding runtime/compiler is available on the machine before creating tests!).
   - If the modality is purely architectural (`design`, e.g., System Design), no programming language runtime is required.
4. **Tailor Scope & Blind Spots:**
   - If `conceptStatus == "mastered"` in another language (`⚡ Syntax & Quirks Bridge`), design a **compact lab targeting syntax & runtime gotchas** of the new language rather than basic logic.
   - Whenever relevant, weave in 1 scenario touching a pattern from `Recurring Blind Spots` in `.tutor/profile.md`.

---

## Step 2: Select Modality & Scaffold `exercises/<YYYY-MM-DD>-<slug>/`
Choose the best-fitting modality from [assessment-modalities.md](../../references/assessment-modalities.md): `implementation`, `refactoring`, `debugging`, or `design`.

Create directory `exercises/<YYYY-MM-DD>-<kebab-slug>/` containing:

1. **`README.md` (Written in `Response Language`):**
   - Problem context & objective.
   - Explicit constraints & **Acceptance Criteria** (what `/ait-submit` will evaluate: edge cases, target complexity, coupling/smells to eliminate, root-cause question, or architectural trade-offs).
   - File guide & exact terminal command to run tests locally (if applicable).
2. **Starter Artifact(s) & Automated Tests (100% English identifiers, comments & test names):**
   - **NEVER include the solution.**
   - **`implementation`:** Minimal function/class skeleton (`TODO` prompt comments in `Response Language` if helpful) + comprehensive test file covering standard, boundary, and constraint cases.
   - **`refactoring`:** Working, realistic code containing 4–6 deliberate flaws/smells + an already-passing regression test suite.
   - **`debugging`:** Reproducible buggy code + failing test or reproduction harness.
   - **`design`:** Structured `DESIGN.md` workspace file (or interface/schema skeleton) prompting for components, data model, failure handling, and trade-offs.

---

## Step 3: Pre-Handoff Verification (Mandatory!)
Before handing the lab to the learner, verify your generated test harness via terminal (`run_command`):
- For **`refactoring`:** Confirm `testCommand` runs and **passes (`GREEN`)** on the starter code right now.
- For **`implementation` / `debugging`:** Confirm `testCommand` runs without syntax/import crashes and **fails cleanly** on the starter/buggy code (never hand over a broken test runner!).
- Prefer zero-install standard-library test runners where possible (`node --test`, `python -m unittest` / `pytest`, `go test`, etc.) so labs start instantaneously.

---

## Step 4: Persist Active Exercise State
Update `.tutor/state.json` immediately:
```json
{
  "currentConceptId": "<conceptId>",
  "activeExercise": {
    "conceptId": "<conceptId>",
    "targetTech": "<lang-or-null>",
    "modality": "implementation | refactoring | debugging | design",
    "directory": "exercises/<YYYY-MM-DD>-<slug>",
    "testCommand": "<exact command or null>",
    "hintsUsed": 0,
    "startedAt": "<YYYY-MM-DD>"
  },
  "lastUpdated": "<YYYY-MM-DD>"
}
```
Present a concise overview in chat (in `Response Language`) with clickable links to `README.md` and the starter file(s), and end with the Quick-Action Footer (`/ait-hint` · `/ait-submit` · `/ait-status`).

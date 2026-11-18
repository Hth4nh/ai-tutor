---
name: ait-submit
description: >-
  Run automated tests and conduct a rigorous engineering review of the learner's
  active exercise against its modality rubric, then persist verified 2-layer
  mastery and spaced-repetition schedule to .tutor/. Activate when the user
  invokes /ait-submit or asks to check, grade, or review their completed exercise.
---

# `/ait-submit` — Automated Verification, Code/Design Review & Dual-Save

Read `.tutor/state.json`, `.tutor/profile.md`, `.tutor/knowledge_map.json`, [assessment-modalities.md](../../references/assessment-modalities.md), and all files inside `activeExercise.directory`.

---

## Step 1: Validate & Execute Verification
1. Check `activeExercise` in `.tutor/state.json`. If `null`, inform the learner (in `Response Language`) that there is no active exercise to submit and suggest `/ait-practice`.
2. If `activeExercise.testCommand` is non-null:
   - Execute `testCommand` inside `activeExercise.directory` using `run_command`.
   - Capture pass/fail counts and any error/assertion output.
3. Read the learner's submitted source files (or `DESIGN.md`) and compare against `README.md` Acceptance Criteria and the modality rules in [assessment-modalities.md](../../references/assessment-modalities.md):
   - **`implementation`:** Check test pass rate + algorithmic/resource constraints + edge-case handling + idiomatic style.
   - **`refactoring`:** Check that tests remain 100% green + planted smells/flaws are truly resolved + no over-engineering.
   - **`debugging`:** Check that the bug is fixed + verify the learner understands the **root cause** (if they haven't explained *why* the bug occurred yet, ask 1 crisp root-cause check question before finalizing `mastered`!).
   - **`design`:** Conduct a candid Tech Lead Design Review (requirements, bottlenecks, failure modes, trade-offs). If a critical flaw or unaddressed trade-off exists, challenge them with 1 stress-test scenario before passing.

---

## Step 2A: If Submission Does NOT Meet Passing Standards Yet
- **Keep `activeExercise` open** in `.tutor/state.json` so the learner can iterate and `/ait-submit` again.
- Respect the **Anti-Spoiler Lock**: Do **not** rewrite their code or dump the solution.
- Provide specific, actionable Engineering Code Review feedback in `Response Language`:
  1. Test results summary (which case failed and what input/symptom triggered it).
  2. Structural, complexity, or design issues spotted.
  3. Focus area to fix next.
- If the mistake reflects a recurring pattern, record/update a concise English bullet under `Recurring Blind Spots` in `.tutor/profile.md` (max 7 items).
- End with the Quick-Action Footer (`/ait-hint` · `/ait-submit`).

---

## Step 2B: If Submission Passes! (`Write-Through` + `Dual-Save`)
1. **Determine Mastery Level** per [assessment-modalities.md](../../references/assessment-modalities.md):
   - **`mastered`** (`confidence: 0.9`, `reviewIntervalDays: 7`): All tests & rubric criteria met cleanly with `hintsUsed <= 1`.
   - **`practiced`** (`confidence: 0.7`, `reviewIntervalDays: 3`): Passed tests, but required `hintsUsed >= 2` or had minor non-blocking optimality/design compromises.
2. **Update `.tutor/knowledge_map.json` (100% English — `Dual-Save`):**
   - Update the core concept entry (`<conceptId>`):
     - Set `conceptStatus` (never downgrade an already-`mastered` core concept if practicing a new language binding!).
     - Set `verifiedVia` to `activeExercise.modality`, `lastVerifiedAt` to today, `reviewIntervalDays`, `nextReviewAt`, and concise English `notes`.
     - Set `learnedVia` if unset (e.g., `activeExercise.targetTech || "standalone"`).
   - If `activeExercise.targetTech` is set, update `bindings.<targetTech>`:
     - `"status"`: earned status (`mastered` or `practiced`)
     - `"evidence"`: `activeExercise.directory`
     - `"notes"`: concise English note on language-specific fluency.
3. **Update `.tutor/profile.md` (if applicable):**
   - Add any newly observed blind spot or remove one the learner has consistently overcome.
4. **Advance Roadmap & Clear `activeExercise` in `.tutor/state.json`:**
   - If `activeRoadmap` exists in `.tutor/roadmaps/`, mark the completed milestone `[x]` (if `mastered`) and identify the next uncompleted concept ID.
   - Set `"activeExercise": null`, update `"currentConceptId"` to the next roadmap concept (or `null` if roadmap is finished), and set `"lastUpdated"` to today.
5. **Deliver Review in `Response Language`:**
   - State the verdict (`mastered` vs `practiced`), what was well-engineered in their code/design, and 1 concise polish tip (after passing, showing a brief idiomatic comparison snippet is allowed and encouraged!).
   - End with the Quick-Action Footer (`/ait-learn` · `/ait-roadmap` · `/ait-status`).

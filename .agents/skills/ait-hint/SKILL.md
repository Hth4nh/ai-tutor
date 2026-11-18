---
name: ait-hint
description: >-
  Provide progressive 3-tier Socratic guidance on the learner's active exercise
  by inspecting their current files in exercises/ and tracking hintsUsed in
  .tutor/state.json—never revealing the full solution. Activate when the user
  invokes /ait-hint or asks for a clue, nudge, or help while stuck on an exercise.
---

# `/ait-hint` — Three-Tier Socratic Guidance

Read `.tutor/state.json`, `.tutor/profile.md`, and all learner-modified files inside `activeExercise.directory`.

---

## Step 1: Validate Active Exercise
- If `activeExercise` in `.tutor/state.json` is `null`: Inform the learner (in `Response Language`) that no exercise is currently active, and suggest `/ait-practice` to start one.
- Read `activeExercise.hintsUsed` (default `0`). Let `nextTier = hintsUsed + 1`.

---

## Step 2: Inspect Current Work & Deliver the Exact Socratic Tier
Read the learner's current code or `DESIGN.md` inside `activeExercise.directory` so your hint addresses **their actual current state**, not generic boilerplate.

**Strict Anti-Spoiler Rule:** Never output the complete working solution or edit their exercise file to solve it for them.

### Tier 1 (`nextTier == 1`): Conceptual Compass
- **Goal:** Unblock their thinking without prescribing structure.
- Point out the specific invariant, constraint, edge case, smell, or runtime behavior they are overlooking.
- Ask 1–2 sharp guiding questions that lead them toward the insight.
- **Zero code snippets** in Tier 1.

### Tier 2 (`nextTier == 2`): Structural / Algorithmic Blueprint
- **Goal:** Give directional scaffolding.
- Identify the specific function, class relationship, query clause, or design section where their approach diverges.
- Provide high-level step-by-step logic or pseudocode steps (3–5 bullets) without writing the target implementation code.

### Tier 3 (`nextTier >= 3`): Pinpoint Rescue
- **Goal:** Prevent total frustration while still requiring the learner to connect the final dots.
- Pinpoint the exact line/flaw causing failure and explain *why* it fails.
- You may show a tiny **3–5 line analogous toy snippet** illustrating the mechanism or syntax—never the drop-in solution to their exercise.
- Remind them transparently (in `Response Language`) that reaching Tier 3 caps initial completion status at `practiced` (scheduled for earlier `/ait-review` in 3 days) so they can prove independent mastery later.

---

## Step 3: Immediate State Persistence (`Write-Through`)
Update `.tutor/state.json` immediately:
- Increment `activeExercise.hintsUsed` to `nextTier`.
- Set `"lastUpdated"` to today's ISO date.

Respond concisely in `Response Language` and end with the Quick-Action Footer (`/ait-submit` · `/ait-hint` · `/ait-status`).

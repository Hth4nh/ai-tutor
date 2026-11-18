---
name: review
description: >-
  Run a concise 2-3 minute spaced-repetition active-recall session on concepts
  due for review (or marked practiced / needs_review) in .tutor/knowledge_map.json,
  then update review intervals immediately. Activate when the user invokes /review
  or asks to review, refresh, or test retention of previously learned material.
---

# `/review` — Spaced-Repetition Active Recall

Read `.tutor/state.json`, `.tutor/profile.md`, `.tutor/knowledge_map.json`, and [assessment-modalities.md](../../references/assessment-modalities.md).

---

## Step 1: Select Concepts for Review
Scan `.tutor/knowledge_map.json`:
1. **Priority 1:** Concepts with `conceptStatus == "needs_review"` or any `bindings.<tech>.status == "needs_review"`.
2. **Priority 2:** Concepts where `nextReviewAt <= <today YYYY-MM-DD>` (and status is not `untested`).
3. **Priority 3 (Early Voluntary Review):** If no concepts are strictly due today and the user explicitly ran `/review`:
   - Pick 1–2 `practiced` concepts (opportunity to upgrade to `mastered`), OR the 1–2 concepts with the oldest `lastVerifiedAt`.
   - If `.tutor/knowledge_map.json` has zero learned concepts yet, inform the learner in `Response Language` and suggest `/check` or `/roadmap`.

Cap each `/review` session at **1 to 3 concepts max** so reviews stay sharp (2–4 minutes total).

---

## Step 2: Deliver High-Signal Active Recall Prompt(s)
Never ask *"Do you still remember X?"* or ask for textbook definitions. Test active retrieval in `Response Language`:
- **Spot-the-Flaw Snippet (8–15 lines):** Ask what breaks at runtime/compile-time or violates the principle.
- **Constraint Twist:** *"In your previous lab you solved X under constraint A; what changes if constraint B happens?"*
- **Cross-Context Transfer:** If they learned a concept in Language A and also know Language B, occasionally ask how that invariant manifests in B.

Wait for the learner's response before updating intervals.

---

## Step 3: Evaluate & Update Spaced-Repetition Schedule (`Write-Through`)
Update `.tutor/knowledge_map.json` immediately (in English) for each reviewed concept:

1. ** crisp, accurate recall:**
   - Upgrade `practiced` or `needs_review` -> `mastered` (if conceptual & practical grasp is solid).
   - Multiply `reviewIntervalDays` by ~2x (`3 -> 7 -> 14 -> 30 -> 60`, capped at `90`).
   - Update `lastVerifiedAt` = today, `nextReviewAt` = today + new `reviewIntervalDays`.
2. **Hesitant / partial recall:**
   - Keep current status, set `reviewIntervalDays: 4`, `nextReviewAt` = today + 4 days.
   - Give a 2–3 line surgical clarification of the fuzzy part.
3. **Forgotten / incorrect recall:**
   - Set status to `"needs_review"`, `confidence: 0.4`, `reviewIntervalDays: 2`, `nextReviewAt` = today + 2 days.
   - Give a concise 3–5 line refresher and suggest `/study <concept>` or `/practice <concept>` if they want deeper re-practice.

Summarize the updated review schedule in `Response Language` and end with the Quick-Action Footer.

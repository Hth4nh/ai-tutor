---
name: ait-check
description: >-
  Assess and verify concepts or technologies the learner claims to already know
  using top-down diagnostic challenges, then persist verified competence to
  .tutor/knowledge_map.json. Activate when the user invokes /ait-check or states
  they already know a topic and want to test/record it.
---

# `/ait-check` — Top-Down Diagnostic Verification

Read `.tutor/profile.md`, `.tutor/state.json`, `.tutor/knowledge_map.json`, and [assessment-modalities.md](../../references/assessment-modalities.md).

Never grant `mastered` status on self-reporting alone. Verify efficiently without causing assessment fatigue.

---

## Step 1: Resolve Target Topic
- **With topic argument** (e.g., `/ait-check closures`, `/ait-check java oop`, `/ait-check sql indexing`): Target that topic directly.
- **Without arguments** (`/ait-check` alone): Check recent conversation context, `Primary Learning Goal`, or unverified prerequisites in `activeRoadmap`, and propose 2–3 relevant topics to verify (or start immediately if the context unambiguously points to one topic).

---

## Step 2: Issue a Top-Down Diagnostic Challenge
Design **one compact, high-signal diagnostic** (answerable in 2–5 minutes in chat) rather than a tedious list of trivia definitions:

- **Top-Down Inference Principle:** Test near the top of the concept hierarchy. If the learner accurately diagnoses a subtle bug, edge case, or architectural trade-off, infer mastery of its elementary prerequisites without asking basic definitions.
- Choose the sharpest format for the topic:
  1. **Code Critique / Bug Spotter (15–25 lines):** Present realistic code containing 1–2 subtle conceptual or runtime flaws (e.g., broken encapsulation/LSP, `O(n^2)` hidden inside a loop, async race condition, prototype/`this` trap) and ask what breaks and why.
  2. **Scenario & Trade-Off Defense:** Present concrete engineering constraints and ask how they would structure the solution and what fails if constraints change.
  3. **Cross-Language Check:** If `.tutor/knowledge_map.json` shows `conceptStatus == "mastered"` in another language and they are checking a new language, test **only** the target language's syntax and runtime quirks.

Wait for the learner's response before grading.

---

## Step 3: Strictly Evaluate & Persist (`Write-Through` + `Dual-Save`)
Evaluate the learner's explanation candidly in `Response Language`:

1. **Demonstrated Solid Mastery:**
   - Update `.tutor/knowledge_map.json` immediately (in English):
     - Set `conceptStatus: "mastered"`, `confidence: 0.85–0.95`, `verifiedVia: "diagnostic_check"`, `lastVerifiedAt: "<YYYY-MM-DD>"`, `reviewIntervalDays: 7`, `nextReviewAt: "<+7 days>"`.
     - **Dual-Save:** If demonstrated in a specific language/technology, also record `bindings.<tech>: { "status": "mastered", "evidence": "diagnostic_check", "notes": "..." }` and set `learnedVia` if not already set.
     - Also mark direct prerequisite sub-concepts `mastered` if unmistakably proven by their answer.
   - If the concept belongs to `activeRoadmap`, check it off (`[x]`) in `.tutor/roadmaps/<slug>.md`.
2. **Partial Grasp / Specific Misconceptions:**
   - Record any sub-concepts they clearly nailed as `mastered` or `practiced`, and mark the flawed/missing concept as `learning`.
   - If a notable misconception surfaced, append a concise English bullet under `Recurring Blind Spots` in `.tutor/profile.md` (keep max 7 items).
   - Explain the exact gap concisely and recommend `/ait-learn <gap-topic>` or `/ait-practice <gap-topic>`.
3. End with the Quick-Action Footer.

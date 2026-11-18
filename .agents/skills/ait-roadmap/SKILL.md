---
name: ait-roadmap
description: >-
  Display progress on the current learning roadmap (when invoked without arguments)
  or design a personalized, bridged learning roadmap in .tutor/roadmaps/ based on
  the learner's 2-layer knowledge graph. Activate when the user invokes /ait-roadmap
  or asks for a study plan or learning path for a new topic.
---

# `/ait-roadmap` — Adaptive Roadmap Viewer & Architect

Read `.tutor/state.json`, `.tutor/profile.md`, and `.tutor/knowledge_map.json`.

---

## Mode 1: View Active Roadmap (No Arguments — `/ait-roadmap`)
1. Check `activeRoadmap` in `.tutor/state.json`.
   - If `null`: Inform the learner (in `Response Language`) that no roadmap is active yet, and suggest `/ait-roadmap <goal>` based on their `Primary Learning Goal` in `.tutor/profile.md`.
   - If set: Read `.tutor/roadmaps/<activeRoadmap>` and render a clean, localized progress overview in chat (`[x]` Mastered, `[⚡]` Syntax/Quirks Bridge, `[~]` In Progress, `[ ]` Upcoming), highlighting the current step ready for `/ait-learn` or `/ait-practice`.
2. End with the Quick-Action Footer.

---

## Mode 2: Architect a New Roadmap (`/ait-roadmap <goal>`)

### Step 1: Run the `Already-Learned Guard`
Inspect `.tutor/knowledge_map.json` against the core concepts of `<goal>`:
- **If most or all foundational concepts are already `mastered`** (even if `learnedVia` was another language, e.g., user requests `/ait-roadmap oop` after mastering OOP inside Java):
  - **Pause before generating a redundant beginner roadmap.**
  - Explicitly list what they already mastered (and via which context/date).
  - Offer 3 clear options in `Response Language`:
    1. Build an **Advanced Continuation Roadmap** skipping mastered basics (e.g., jumping straight to SOLID, Composition over Inheritance, Design Patterns).
    2. Run `/ait-check` to verify retention first.
    3. Build a full refresher roadmap from scratch anyway.

### Step 2: Construct a Bridged, Deduplicated Curriculum
When generating the roadmap:
1. Break `<goal>` into logical, bite-sized engineering milestones (typically 5–12 concepts; avoid bloated 40-item textbook tables of contents).
2. Classify every item against `.tutor/knowledge_map.json`:
   - **`[x] Skipped (Mastered)`:** Both `conceptStatus` and target `bindings.<tech>` (if applicable) are already `mastered`. Include briefly for completeness, marked `[x]`.
   - **`[⚡ Bridge from <source-tech>]`:** `conceptStatus == "mastered"` in another language/tool, but `bindings.<target-tech>` is missing. Consolidate related items into compact **Syntax & Runtime Quirks Bridge** milestones rather than separate beginner lessons!
   - **`[ ] New`:** Unlearned concept. Whenever possible, note an **Anchor** referencing an existing mastered concept in `.tutor/knowledge_map.json` that `/ait-learn` will use as a mental bridge.

### Step 3: Persist in English & Present in `Response Language`
1. Save the roadmap **in English** to `.tutor/roadmaps/<kebab-slug>.md` with canonical concept IDs for each milestone, e.g.:
   ```markdown
   # Roadmap: <Title>
   - Target Goal: ...
   - Created: YYYY-MM-DD

   ## Milestones
   1. [x] `oop.encapsulation` — Encapsulation Basics (Already mastered via java)
   2. [⚡ Bridge from java] `oop.inheritance` & `oop.polymorphism` — JS Prototype Chain, `class`/`extends`, and Dynamic `this` Gotchas
   3. [ ] `concurrency.event-loop` — JS Event Loop, Microtasks vs Macrotasks (Anchor: synchronous call stack)
   ```
2. Immediately update `.tutor/state.json`:
   - `"activeRoadmap": "<kebab-slug>.md"`
   - `"currentConceptId": "<first non-mastered concept ID>"`
   - `"lastUpdated": "<YYYY-MM-DD>"`
3. Present the tailored roadmap clearly in chat using `Response Language`, highlighting what was skipped or fast-tracked thanks to prior knowledge, and end with the Quick-Action Footer.

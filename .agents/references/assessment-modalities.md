# Open-Domain Assessment Modalities & Knowledge Graph Schema

This reference governs how any Computer Science or Software Engineering topic is modeled in `.tutor/knowledge_map.json`, practiced in `/practice`, and evaluated in `/check` and `/submit`.

---

## 1. Canonical Two-Layer Knowledge Graph Schema (`.tutor/knowledge_map.json`)

Every concept entry separates **universal conceptual understanding** from **technology-specific implementation**:

```json
{
  "version": 2,
  "concepts": {
    "<namespace>.<concept-slug>": {
      "title": "Human-readable English title",
      "domain": "Open-ended semantic category (e.g., oop, dsa, clean-code, concurrency, databases, system-design, security, devops, fp, networking)",
      "conceptStatus": "untested | learning | practiced | mastered | needs_review",
      "confidence": 0.0,
      "learnedVia": "First context/language where concept was learned (e.g., 'java', 'standalone')",
      "verifiedVia": "diagnostic_check | implementation | refactoring | debugging | design",
      "bindings": {
        "<tech-or-lang>": {
          "status": "learning | practiced | mastered | needs_review",
          "evidence": "Relative path to exercise folder or 'diagnostic_check'",
          "notes": "Concise English note on syntax/runtime mastery or specific pitfalls"
        }
      },
      "lastVerifiedAt": "YYYY-MM-DD",
      "nextReviewAt": "YYYY-MM-DD",
      "reviewIntervalDays": 7,
      "notes": "Concise English summary of conceptual strengths or edge-case blind spots"
    }
  }
}
```

### Naming Conventions
- **Language-Neutral Concept IDs:** Never prefix transferable concepts with a language name. Use `oop.inheritance`, `oop.polymorphism`, `oop.interfaces`, `dsa.sliding-window`, `concurrency.event-loop`, `db.indexing-btree`, `clean-code.guard-clauses`. Record the language inside `bindings.<lang>` (`java`, `javascript`, `python`, `go`, `postgresql`, etc.).
- **Technology-Exclusive Concept IDs:** Only prefix with a technology name when the mechanism is unique to that ecosystem (e.g., `rust.borrow-checker`, `react.reconciliation`, `jvm.garbage-collection`).

---

## 2. Four Universal Practice & Grading Modalities

Do not restrict topics to fixed academic subjects. Instead, select the modality (or hybrid) that matches **how practicing engineers demonstrate real-world mastery of the target concept**:

### Modality 1: `implementation` (Build & Verify)
- **Best For:** Building algorithms, data structures, language features, queries, APIs, parsers, CLI scripts, or configurations from a specification.
- **`/practice` Setup:**
  - Clear problem specification & constraints in `README.md` (written in `Response Language`).
  - Minimal starter stub + runnable automated test suite in English covering normal cases, boundary/empty inputs, and scale/constraint checks.
  - Verify before handoff that the test runner executes cleanly and fails as expected on the unimplemented stub.
- **`/submit` Mastery Criteria:**
  - 100% automated tests pass.
  - Meets target algorithmic/resource constraints (e.g., if `O(n)` time is required and learner passes small tests with `O(n^2)` brute force, award at most `practiced`, never `mastered`).
  - Idiomatic, readable structure in the target language.

### Modality 2: `refactoring` (Critique & Transform)
- **Best For:** Improving code quality, modularity, extensibility, performance, or security on an already-working artifact (e.g., Clean Code, SOLID, Design Patterns, query optimization, patching security flaws).
- **`/practice` Setup:**
  - Plant 4–6 realistic flaws (code smells, tight coupling, magic values, deep nesting, N+1 queries, or vulnerabilities) inside **working code backed by an already-passing (`GREEN`) test suite**.
  - Verify before handoff that `testCommand` currently passes 100% on the smelly starter code.
- **`/submit` Mastery Criteria:**
  - Existing regression tests remain 100% green (plus any new behavior tests if extensibility was requested).
  - Target flaws are eliminated cleanly **without over-engineering** or needless abstraction layers.

### Modality 3: `debugging` (Diagnose & Fix)
- **Best For:** Under-the-hood runtime mechanics where passive reading creates false confidence (e.g., async/event loop ordering, race conditions, deadlocks, closure capture bugs, memory/reference mutation, floating-point or encoding edge cases).
- **`/practice` Setup:**
  - Reproducible buggy program + failing test or reproduction script demonstrating the subtle failure symptom.
- **`/submit` Mastery Criteria:**
  - Bug is resolved cleanly and tests pass.
  - **Root-Cause Verification:** Learner must accurately state *why* the failure happened (either in a short note or 1 follow-up question) to prove deliberate engineering rather than trial-and-error guessing.

### Modality 4: `design` (Architect & Defend)
- **Best For:** High-level modeling, system architecture, schema design, API contracts, or trade-off decisions—including topics **without executable unit tests** (e.g., System Design, Distributed Systems, Database Schema Modeling, Domain-Driven Design).
- **`/practice` Setup:**
  - Realistic scenario with explicit scale, consistency, latency, or business-evolution constraints in `README.md`.
  - Structured `DESIGN.md` template (or interface/schema skeleton) for components, data flow, failure modes, and trade-offs (`testCommand` may be `null` if purely architectural).
- **`/submit` Mastery Criteria:**
  - Conduct an **Engineering Design Review**: evaluate requirement coverage, single points of failure, coupling, data integrity, and operational realism.
  - Pose 1 targeted stress-test / change-request question if a key trade-off is unaddressed before granting `mastered`.

> **Dynamic Per-Exercise Rubric:** Regardless of topic, always define explicit **Acceptance Criteria** inside the exercise `README.md` at generation time so `/submit` evaluates against transparent, topic-specific engineering standards.

---

## 3. Mastery Thresholds & Spaced Repetition Schedule

### Assigning Status on `/submit` or `/check`
- **`mastered`** (`confidence: 0.85 - 1.0`):
  - Passed `/check` with sharp top-down reasoning, OR passed `/submit` meeting all modality criteria with **`hintsUsed <= 1`**.
  - Initial `reviewIntervalDays`: `7` (`nextReviewAt` = today + 7 days).
- **`practiced`** (`confidence: 0.6 - 0.8`):
  - Completed `/submit` functionally, but required **`hintsUsed >= 2`**, used a suboptimal approach, or needed significant help articulating root cause/trade-offs.
  - Initial `reviewIntervalDays`: `3` (`nextReviewAt` = today + 3 days).
- **`needs_review`** (`confidence: 0.3 - 0.5`):
  - Failed recall during `/review` or exhibited regression on a prerequisite concept during a later lesson.
  - Reset `reviewIntervalDays`: `2`.

### Interval Progression on `/review`
- **Strong recall:** Promote `practiced` / `needs_review` -> `mastered` (if solid), multiply `reviewIntervalDays` by ~2x (`3 -> 7 -> 14 -> 30 -> 60`), update `lastVerifiedAt` and `nextReviewAt`.
- **Partial/hesitant recall:** Keep current status, set `reviewIntervalDays: 4`.
- **Failed recall:** Set status to `needs_review`, set `reviewIntervalDays: 2`.

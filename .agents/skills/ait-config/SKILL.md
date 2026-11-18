---
name: ait-config
description: >-
  Run first-time tutor onboarding or view and update learner preferences
  (Response Language, Default Coding Language, Difficulty, Teaching Style,
  or Primary Learning Goal). Activate when the user invokes /ait-config or asks
  to configure/change their tutor settings, language, or difficulty preferences.
---

# `/ait-config` — Onboarding & Tutor Preferences

Read `.tutor/state.json` and `.tutor/profile.md` before responding.

Determine which of the **3 modes** applies based on user arguments and `state.onboarded`:

---

## Mode 1: Preference Update (`/ait-config <changes>`)
Trigger when the user passes preference instructions alongside `/ait-config` (e.g., `/ait-config language <lang>`, `/ait-config coding-lang Java`, `/ait-config harder exercises`).

1. Parse the requested updates (`Response Language`, `Default Coding Language`, `Difficulty`, `Teaching Style`, or `Primary Learning Goal`).
2. Immediately update `.tutor/profile.md` **in English** (preserving existing sections and blind spots).
3. If `state.onboarded` was `false` and core preferences are now clear, update `.tutor/state.json` (`"onboarded": true`, `"lastUpdated": "<YYYY-MM-DD>"`).
4. Confirm the updated settings concisely **in the active `Response Language`**, and end with the Quick-Action Footer.

---

## Mode 2: First-Time Onboarding (`state.onboarded == false` and no specific config args)
Trigger when the workspace has not been initialized yet.

1. If the user has not answered onboarding questions yet:
   - Mirror the language of the user's message.
   - Ask **4 brief, direct questions** in a single message (or via an interactive question tool if available):
     1. Preferred **Response Language** for chat & exercise prompts (defaulting to their current chat language).
     2. **Default Coding Language** for general software engineering exercises (when not studying a specific language).
     3. **Prior Background** (languages, paradigms, CS fundamentals they believe they already know—remind them these can be verified quickly via `/ait-check`).
     4. **Primary Learning Goal** right now.
2. Once the user answers:
   - Write `.tutor/profile.md` in concise English.
   - Update `.tutor/state.json` with `"onboarded": true` and `"lastUpdated": "<YYYY-MM-DD>"`.
   - Note any claimed prior knowledge as candidates for `/ait-check` (do **not** mark `mastered` yet—respect *Verify Before Trust*).
   - Suggest the immediate next step: `/ait-check <claimed-topic>` or `/ait-roadmap <primary-goal>`.

---

## Mode 3: View Current Configuration (`state.onboarded == true` and no args)
1. Display the learner's active preferences from `.tutor/profile.md` in `Response Language`:
   - `Response Language`
   - `Default Coding Language`
   - `Difficulty`
   - `Teaching Style`
   - `Primary Learning Goal`
2. Show 1–2 short examples of how to modify any setting (e.g., `/ait-config language <lang>`, `/ait-config coding-lang <lang>`).
3. End with the Quick-Action Footer (`/ait-status` · `/ait-roadmap` · `/ait-learn`).

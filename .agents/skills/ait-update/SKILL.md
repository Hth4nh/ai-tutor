---
name: ait-update
description: >-
  Safely update the AI Tutor core framework (AGENTS.md, skills, references, and
  hook configs) from the upstream Hth4nh/ai-tutor repository into a dedicated
  commit without touching the learner's personal .tutor/ progress or exercises/.
  Activate when the user invokes /ait-update or asks to update/upgrade the tutor
  skills and rules.
---

# `/ait-update` — Safe Upstream Core Updater

Read `.tutor/profile.md` (if present) to determine `Response Language`.

This workflow syncs **only** the core AI Tutor framework files from `https://github.com/Hth4nh/ai-tutor.git` (`main`) and records them in a dedicated commit—**strictly isolating `.tutor/**` and `exercises/**`** even when the learner created their workspace via GitHub's *Use this template* button (unrelated git histories) and periodically commits personal progress.

**Core Framework Paths (`<CORE_PATHS>`):**
`.agents .claude/settings.json .cursor/hooks.json .gemini/settings.json AGENTS.md README.md .gitattributes .gitignore LICENSE`

---

## Step 1: Guard Uncommitted Local Edits to Core Files
Run in the terminal:
```bash
git status --porcelain -- .agents .claude/settings.json .cursor/hooks.json .gemini/settings.json AGENTS.md README.md .gitattributes .gitignore LICENSE
```
- Ignore any staged or unstaged changes in `.tutor/` or `exercises/`—those are personal learning files and remain untouched.
- If any `<CORE_PATHS>` above have uncommitted local edits, list them in `Response Language` and ask the learner to confirm before overwriting those core files.

---

## Step 2: Fetch Latest Upstream & Compare Core Files
1. Fetch the latest `main` branch directly from the canonical template repository and get its short SHA:
   ```bash
   git fetch https://github.com/Hth4nh/ai-tutor.git main
   git rev-parse --short FETCH_HEAD
   ```
2. Check which core files differ between the local `HEAD` and `FETCH_HEAD`:
   ```bash
   git diff --name-status HEAD FETCH_HEAD -- .agents .claude/settings.json .cursor/hooks.json .gemini/settings.json AGENTS.md README.md .gitattributes .gitignore LICENSE
   ```
   - **If the diff output is empty:** Inform the learner concisely in `Response Language` that their AI Tutor framework is **already up to date** with upstream (`<short-sha>`), and stop here.

---

## Step 3: Sync & Commit Core Files in Isolation
1. **Remove obsolete `.agents/` files (if any):** If Step 2 showed any deleted (`D`) or renamed-away (`R...`) files inside `.agents/`, run `git rm -f --ignore-unmatch "<old-path>"` for each so deprecated skills do not linger. Never delete untracked local tool files inside `.claude/`, `.cursor/`, or `.gemini/` (such as `settings.local.json`).
2. **Checkout updated core paths from `FETCH_HEAD`:**
   ```bash
   git checkout FETCH_HEAD -- .agents .claude/settings.json .cursor/hooks.json .gemini/settings.json AGENTS.md README.md .gitattributes .gitignore LICENSE
   ```
3. **Create an isolated commit for `<CORE_PATHS>` only** (passing `-- <CORE_PATHS>` ensures any staged or unstaged personal changes in `.tutor/` or `exercises/` are **never** swept into this commit):
   ```bash
   git commit -m "chore(ait-update): sync core framework (<short-sha>)" -- .agents .claude/settings.json .cursor/hooks.json .gemini/settings.json AGENTS.md README.md .gitattributes .gitignore LICENSE
   ```
4. **Remote Push Handling:**
   - If the user explicitly asked to push (e.g., `/ait-update push`) and `origin` is configured, run `git push`.
   - Otherwise, if `origin` exists, mention the new local commit and ask if they want to `git push` now (or let them push alongside their next learning commit).

---

## Step 4: Report Summary in `Response Language`
1. Summarize what was added or updated in commit `chore(ait-update): sync core framework (<short-sha>)`.
2. Confirm explicitly that `.tutor/` and `exercises/` (both staged and unstaged) were **not touched**.
3. End with the Quick-Action Footer (`/ait-status` · `/ait-roadmap` · `/ait-learn`).

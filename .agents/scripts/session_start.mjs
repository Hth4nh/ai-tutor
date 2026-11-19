import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function readJsonSafe(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return fallback;
  }
}

function readTextSafe(filePath, fallback = '') {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return fallback;
  }
}

function extractField(markdown, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = markdown.match(new RegExp(`-\\s*\\*\\*${escaped}:\\*\\*\\s*(.+)`, 'i'));
  return match ? match[1].trim() : null;
}

function getLocalISODate() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function drainStdinWithTimeout(timeoutMs = 150) {
  if (process.stdin.isTTY) return Promise.resolve('');
  return new Promise((resolve) => {
    let buf = '';
    const timer = setTimeout(() => {
      process.stdin.removeAllListeners();
      process.stdin.pause();
      resolve(buf);
    }, timeoutMs);

    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => {
      buf += chunk;
    });
    process.stdin.on('end', () => {
      clearTimeout(timer);
      resolve(buf);
    });
    process.stdin.on('error', () => {
      clearTimeout(timer);
      resolve(buf);
    });
  });
}

function parseFormatArg(argv) {
  for (const arg of argv) {
    if (arg.startsWith('--format=')) {
      return arg.slice('--format='.length).trim();
    }
  }
  return 'antigravity';
}

function buildSessionMessage(tutorDir) {
  const state = readJsonSafe(path.join(tutorDir, 'state.json'), { onboarded: false });
  const profileMd = readTextSafe(path.join(tutorDir, 'profile.md'), '');
  const knowledgeMap = readJsonSafe(path.join(tutorDir, 'knowledge_map.json'), { concepts: {} });

  const responseLang = extractField(profileMd, 'Response Language') || 'Auto';

  if (!state.onboarded) {
    return [
      '[AI Tutor Session Context]',
      'Status: Learner is NOT onboarded yet (.tutor/state.json -> onboarded: false).',
      `Response Language: ${responseLang} (if Auto, mirror the language of the learner's message).`,
      'Action: If the learner greets you or asks where to start, welcome them concisely and suggest running `/ait-config` to configure preferences and goals. If they already invoked a specific command, honor it directly.'
    ].join('\n');
  }

  const defaultCodingLang = extractField(profileMd, 'Default Coding Language') || 'Unset';
  const difficulty = extractField(profileMd, 'Difficulty') || 'Standard Engineering';
  const goal = extractField(profileMd, 'Primary Learning Goal') || 'Unset';

  const concepts = Object.entries(knowledgeMap.concepts || {});
  const today = getLocalISODate();

  let masteredCount = 0;
  let learningCount = 0;
  const dueReviews = [];

  for (const [id, entry] of concepts) {
    const status = entry?.conceptStatus || 'untested';
    if (status === 'mastered') masteredCount += 1;
    if (status === 'learning' || status === 'practiced') learningCount += 1;
    if (
      status === 'needs_review' ||
      (entry?.nextReviewAt && entry.nextReviewAt <= today && status !== 'untested')
    ) {
      dueReviews.push(id);
    }
  }

  const lines = [
    '[AI Tutor Session Context]',
    `Response Language: ${responseLang} | Default Coding Language: ${defaultCodingLang} | Difficulty: ${difficulty}`,
    `Primary Goal: ${goal}`,
    `Active Roadmap: ${state.activeRoadmap || 'None'} | Current Concept: ${state.currentConceptId || 'None'}`,
    `Knowledge Summary: ${masteredCount} mastered, ${learningCount} in-progress, ${dueReviews.length} due for /ait-review${dueReviews.length > 0 ? ` (${dueReviews.slice(0, 4).join(', ')})` : ''}.`
  ];

  if (state.activeExercise && state.activeExercise.directory) {
    const ex = state.activeExercise;
    lines.push(
      `Active Exercise (Anti-Spoiler Lock ON): ${ex.conceptId} [${ex.modality || 'implementation'}] in ${ex.directory} (hintsUsed: ${ex.hintsUsed ?? 0}).`
    );
  }

  return lines.join('\n');
}

function formatPayload(format, message) {
  switch (format) {
    case 'hookSpecificOutput':
      return {
        hookSpecificOutput: {
          hookEventName: 'SessionStart',
          additionalContext: message
        }
      };
    case 'cursor':
      return {
        additional_context: message
      };
    case 'antigravity':
    default:
      return {
        injectSteps: [
          {
            systemMessage: {
              systemMessage: message
            }
          }
        ]
      };
  }
}

async function main() {
  try {
    await drainStdinWithTimeout();
    const format = parseFormatArg(process.argv.slice(2));
    const workspaceRoot = fileURLToPath(new URL('../..', import.meta.url));
    const tutorDir = path.join(workspaceRoot, '.tutor');
    const message = buildSessionMessage(tutorDir);
    process.stdout.write(JSON.stringify(formatPayload(format, message)));
    process.exit(0);
  } catch {
    process.stdout.write('{}');
    process.exit(0);
  }
}

main();

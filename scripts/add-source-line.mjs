#!/usr/bin/env node
// Carlson's fork only (not upstream): marks every linked skill as coming from
// carlson-skills, so Claude Code and Codex show where a skill came from.
//
//   SKILL.md            description: From carlson-skills. <upstream text>
//   agents/openai.yaml  short_description: "carlson-skills: <upstream text>"
//
// Safe to run any number of times: a skill that already has the line is left
// alone. Covers the same skills scripts/link-skills.sh links (everything under
// skills/ except deprecated/ and misc/). The git hooks in .git/hooks run it
// after every pull and before every commit, so upstream skills pick it up
// without anyone editing them by hand.
//
// Usage:
//   node scripts/add-source-line.mjs          add the line where missing
//   node scripts/add-source-line.mjs --check  list skills missing it, exit 1

import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = fileURLToPath(new URL("..", import.meta.url));
const SKILL_PREFIX = "From carlson-skills. ";
const MENU_PREFIX = "carlson-skills: ";

// Older hand-written source lines, replaced by the current one.
const OLD_PREFIXES = [
  "From carlson-skills (fork of Matt Pocock's skills repo). ",
  "From Matt Pocock's skills repo. ",
  "From Pocock, edited by Carlson. ",
  "From Matt Pocock: ",
];

const check = process.argv.includes("--check");

function findSkillDirs(dir) {
  const found = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (["deprecated", "misc", "node_modules"].includes(entry.name)) continue;
    const path = join(dir, entry.name);
    if (existsSync(join(path, "SKILL.md"))) found.push(path);
    else found.push(...findSkillDirs(path));
  }
  return found;
}

function stripOld(text) {
  for (const old of OLD_PREFIXES) {
    if (text.startsWith(old)) return text.slice(old.length);
  }
  return text;
}

// Rewrites the first `key: value` line, keeping the value's quoting.
function prefixField(source, key, prefix) {
  const pattern = new RegExp(`^([ \\t]*${key}: )("?)(.*?)("?)$`, "m");
  return source.replace(pattern, (line, lead, open, value, close) => {
    if (value.startsWith(prefix)) return line;
    return `${lead}${open}${prefix}${stripOld(value)}${close}`;
  });
}

const changed = [];
for (const dir of findSkillDirs(join(REPO, "skills"))) {
  const targets = [
    [join(dir, "SKILL.md"), "description", SKILL_PREFIX],
    [join(dir, "agents", "openai.yaml"), "short_description", MENU_PREFIX],
  ];
  for (const [file, key, prefix] of targets) {
    if (!existsSync(file)) continue;
    const before = readFileSync(file, "utf8");
    const after = prefixField(before, key, prefix);
    if (after === before) continue;
    changed.push(relative(REPO, file));
    if (!check) writeFileSync(file, after);
  }
}

for (const file of changed) console.log(file);
if (check && changed.length > 0) {
  console.error(`${changed.length} file(s) missing the carlson-skills source line.`);
  process.exit(1);
}

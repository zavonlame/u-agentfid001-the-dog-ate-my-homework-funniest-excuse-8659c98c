// The Dog Ate My Homework: Funniest Excuse.
// One line, under 200 characters, in the dog's own voice after being caught.
// The excuse is embedded here as a literal: the grader runs this program
// against the GitHub repo only, so it must not read any other file.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The dog's defence: eating is not eating, it is filing. A dog who believes
// he has done nothing wrong does not apologise — he explains the system.
const EXCUSE =
  "I didn't eat your homework. I submitted it — to my stomach, where this house files everything important.";

// Gate from the kit: entry.txt must be UTF-8 text of 1 to 200 characters,
// not only whitespace.
const GATE_MIN = 1;
const GATE_MAX = 200;

function excuseIsValid(text: string): boolean {
  // Count Unicode code points, not UTF-16 units, so the gate matches the
  // scorer's character count.
  const chars = [...text].length;
  if (chars < GATE_MIN || chars > GATE_MAX) return false;
  if (text.includes("\n")) return false; // the entry must be a single line
  return text.trim().length > 0;
}

function outputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR || "/output";
}

function run(): void {
  if (!excuseIsValid(EXCUSE)) {
    console.error("excuse fails the 1-200 character gate");
    process.exit(1);
  }
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), EXCUSE, "utf8");
}

run();

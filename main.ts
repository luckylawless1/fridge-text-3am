// The 3AM Fridge Text — u-deysumbrella-the-3am-fridge-text-4c3e721d
// Writes the one line a smart fridge would text its owner at 3am.
// Gate: /output/entry.txt must be UTF-8 text of 1 to 140 characters,
// a single line, not only white space.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "3am. This is the fourth time tonight you've opened me, stared, and taken nothing. Either eat something or let me sleep.";

function gate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 140) {
    throw new Error(`entry is ${chars} chars, must be 1-140`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only white space");
  }
  if (text !== text.trim()) {
    throw new Error("entry has leading or trailing white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (Buffer.byteLength(text, "utf8") > 140) {
    throw new Error("entry exceeds 140 bytes");
  }
}

function main(): void {
  gate(ENTRY);
  const outDir = "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY + "\n", "utf8");
  // Read back and verify the written bytes match the entry exactly.
  const back = readFileSync(outPath, "utf8");
  if (back !== ENTRY + "\n") {
    throw new Error("read-back mismatch");
  }
  console.log(
    `wrote ${[...ENTRY].length} chars (${Buffer.byteLength(ENTRY, "utf8")} bytes) to ${outPath}`,
  );
}

main();

import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const forbiddenPublicPhrases = [
  "mcp for agent memory",
  "agent memory mcp",
  "memory mcp starter",
  "mirai memory mcp server",
  "working memory mcp starter",
  "open-source mirai memory engine"
];

const checks = [
  ["README.md", "MIRAI Memory is the private memory engine"],
  ["README.md", "not a working memory MCP"],
  ["LICENSE-SCOPE.md", "The MIT License applies only to files under these paths:"],
  ["LICENSE-SCOPE.md", "The paid/ directory is not MIT-licensed."],
  ["free/LICENSE", "files under the free/ path"],
  ["mcp/LICENSE", "files under the mcp/ path"],
  ["package.json", "\"license\": \"SEE LICENSE IN LICENSE-SCOPE.md\""]
];

for (const [file, expected] of checks) {
  assertFileContains(file, expected);
}

for (const file of ["LICENSE", "LICENSE.md", "LICENSE.txt", "COPYING"]) {
  assertMissing(file);
}
assertNoForbiddenPublicPositioning(".");

function assertFileContains(file, expected) {
  if (!existsSync(file)) {
    throw new Error(`Missing required file: ${file}`);
  }
  const content = readFileSync(file, "utf8");
  if (!content.includes(expected)) {
    throw new Error(`Expected ${file} to include: ${expected}`);
  }
}

function assertMissing(file) {
  if (existsSync(file)) {
    throw new Error(`Unexpected file exists: ${file}`);
  }
}

function assertNoForbiddenPublicPositioning(directory) {
  for (const file of listTextFiles(directory)) {
    const content = readFileSync(file, "utf8").toLowerCase();
    for (const phrase of forbiddenPublicPhrases) {
      if (content.includes(phrase)) {
        throw new Error("Forbidden public positioning phrase in " + file + ": " + phrase);
      }
    }
  }
}

function listTextFiles(directory) {
  const files = [];
  for (const name of readdirSync(directory)) {
    if (name === ".git" || name === "node_modules") {
      continue;
    }

    const path = join(directory, name);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      files.push(...listTextFiles(path));
      continue;
    }

    if (/\.(md|json|mjs|yml|yaml|txt)$/.test(path)) {
      files.push(path);
    }
  }
  return files.filter((file) => file !== "scripts/check-repository.mjs");
}

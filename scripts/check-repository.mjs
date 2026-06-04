import { readFileSync, existsSync } from "node:fs";

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

assertMissing("LICENSE");

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

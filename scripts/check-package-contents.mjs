import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

const result = spawnSync("npm", ["pack", "--dry-run", "--json", "--ignore-scripts"], {
  encoding: "utf8",
  stdio: ["ignore", "pipe", "pipe"]
});

if (result.error) {
  throw result.error;
}

if (result.status !== 0) {
  throw new Error(`npm pack --dry-run failed: ${result.stderr.trim()}`);
}

let packReport;
try {
  packReport = JSON.parse(result.stdout);
} catch (error) {
  throw new Error(`npm pack --dry-run returned invalid JSON: ${error.message}`);
}

const files = packReport[0]?.files;
if (!Array.isArray(files)) {
  throw new Error("npm pack --dry-run did not return a package file list.");
}

const packagePaths = new Set(files.map((entry) => entry.path));
const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const requiredPaths = [
  "package.json",
  "README.md",
  "LICENSE-SCOPE.md",
  "free/LICENSE",
  "mcp/LICENSE",
  "mcp/ai-ops-template-server/README.md",
  "mcp/ai-ops-template-server/server.mjs"
];

for (const path of requiredPaths) {
  if (!packagePaths.has(path)) {
    throw new Error(`npm package is missing required public file: ${path}`);
  }
}

const binEntries = Object.entries(packageJson.bin ?? {});
if (binEntries.length !== 1) {
  throw new Error("package.json must declare exactly one public bin entry.");
}

const [binName, binPath] = binEntries[0];
if (typeof binPath !== "string" || !packagePaths.has(binPath)) {
  throw new Error(`npm package is missing the bin target for ${binName}: ${binPath}`);
}

for (const path of packagePaths) {
  if (path === "paid" || path.startsWith("paid/")) {
    throw new Error(`npm package must not include the paid/ boundary: ${path}`);
  }
}

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const skippedDirectories = new Set([
  ".git",
  "node_modules",
  "dist",
  "coverage",
  ".next",
  ".cache"
]);

const skippedExtensions = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".pdf",
  ".zip",
  ".tgz",
  ".tar",
  ".gz"
]);

const secretPatterns = [
  ["private key block", /-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----/],
  ["GitHub token", /\b(?:ghp|gho|ghs|ghu)_[A-Za-z0-9_]{36,}\b/],
  ["GitHub fine-grained token", /\bgithub_pat_[A-Za-z0-9_]{22,}\b/],
  ["OpenAI API key", /\bsk-(?:proj-|ant-|or-v1-)?[A-Za-z0-9_-]{20,}\b/],
  ["Stripe live key", /\b(?:sk_live|pk_live)_[A-Za-z0-9]{16,}\b/],
  ["Stripe webhook secret", /\bwhsec_[A-Za-z0-9]{16,}\b/],
  ["npm token", /\bnpm_[A-Za-z0-9]{30,}\b/],
  ["Slack token", /\bxox[bpoas]-[A-Za-z0-9-]{20,}\b/],
  ["Discord bot token", /\b(?:mfa\.[A-Za-z0-9_-]{20,}|MTQ[0-9A-Za-z]{20,}\.[\w-]+\.[\w-]+|[MN][A-Za-z\d]{23}\.[\w-]{6}\.[\w-]{27,})\b/],
  ["AWS access key", /\bAKIA[0-9A-Z]{16}\b/],
  ["Google API key", /\bAIza[0-9A-Za-z_-]{35}\b/]
];

const findings = [];

scanDirectory(".");

if (findings.length > 0) {
  console.error("Potential secrets found. Remove them before committing:");
  for (const finding of findings) {
    console.error("- " + finding.file + ": " + finding.label);
  }
  process.exit(1);
}

function scanDirectory(directory) {
  for (const name of readdirSync(directory)) {
    if (skippedDirectories.has(name)) {
      continue;
    }

    const path = join(directory, name);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      scanDirectory(path);
      continue;
    }

    if (!stat.isFile() || shouldSkipFile(path, stat.size)) {
      continue;
    }

    scanFile(path);
  }
}

function shouldSkipFile(path, size) {
  if (size > 1024 * 1024) {
    return true;
  }

  const lower = path.toLowerCase();
  for (const extension of skippedExtensions) {
    if (lower.endsWith(extension)) {
      return true;
    }
  }

  return false;
}

function scanFile(path) {
  const content = readFileSync(path, "utf8");
  for (const [label, pattern] of secretPatterns) {
    if (pattern.test(content)) {
      findings.push({ file: path, label });
    }
  }
}

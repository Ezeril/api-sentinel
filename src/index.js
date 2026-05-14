#!/usr/bin/env node

/**
 * api-sentinel - CLI entry point
 * Reads endpoints from a JSON file, tests each one, and generates reports.
 */

import { readFileSync, mkdirSync } from "fs";
import { resolve } from "path";
import { testEndpoint } from "./testEndpoint.js";
import { generateJsonReport } from "./reporters/jsonReporter.js";
import { generateMarkdownReport } from "./reporters/markdownReporter.js";
import { log, printSummary } from "./utils/logger.js";

const DEFAULT_TIMEOUT_MS = 10_000;

// --- Argument parsing ---
function getArg(flag) {
  const args = process.argv.slice(2);
  const i = args.indexOf(flag);
  return i !== -1 && args[i + 1] ? args[i + 1] : null;
}

const endpointsFile = getArg("--file") ?? "endpoints.json";

// --timeout
const timeoutArg = getArg("--timeout");
const timeoutMs = timeoutArg ? parseInt(timeoutArg, 10) : DEFAULT_TIMEOUT_MS;
if (timeoutArg && (isNaN(timeoutMs) || timeoutMs <= 0)) {
  log.error("--timeout must be a positive number of milliseconds (e.g. --timeout 3000)");
  process.exit(1);
}

// --output
const outputArg = getArg("--output");
const outputDir = resolve(process.cwd(), outputArg ?? ".");
if (outputArg) {
  try {
    mkdirSync(outputDir, { recursive: true });
  } catch (err) {
    log.error(`Could not create output directory "${outputDir}": ${err.message}`);
    process.exit(1);
  }
}

// --- Load endpoints file ---
let endpoints;
try {
  const filePath = resolve(process.cwd(), endpointsFile);
  const raw = readFileSync(filePath, "utf-8");
  endpoints = JSON.parse(raw);

  if (!Array.isArray(endpoints) || endpoints.length === 0) {
    log.error(`"${endpointsFile}" must be a non-empty JSON array.`);
    process.exit(1);
  }
} catch (err) {
  if (err.code === "ENOENT") {
    log.error(`File not found: "${endpointsFile}"`);
    log.info("Tip: use --file <path> to specify a custom endpoints file.");
  } else if (err instanceof SyntaxError) {
    log.error(`Invalid JSON in "${endpointsFile}": ${err.message}`);
  } else {
    log.error(`Could not read file: ${err.message}`);
  }
  process.exit(1);
}

// --- Run tests ---
log.header(`api-sentinel — Testing ${endpoints.length} endpoint(s)  [timeout: ${timeoutMs}ms]`);
console.log("");

const results = [];
for (const endpoint of endpoints) {
  const result = await testEndpoint(endpoint, timeoutMs);
  results.push(result);
}

// --- Summary ---
console.log("");
printSummary(results);

// --- Generate reports ---
await generateJsonReport(results, outputDir);
await generateMarkdownReport(results, outputDir);

const locationNote = outputArg ? ` → ${outputDir}` : "";
console.log("");
log.success(`Reports saved: report.json  |  REPORT.md${locationNote}`);

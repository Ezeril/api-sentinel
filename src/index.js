#!/usr/bin/env node

/**
 * api-sentinel - CLI entry point
 * Reads endpoints from a JSON file, tests each one, and generates reports.
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import { testEndpoint } from "./testEndpoint.js";
import { generateJsonReport } from "./reporters/jsonReporter.js";
import { generateMarkdownReport } from "./reporters/markdownReporter.js";
import { log, printSummary } from "./utils/logger.js";

const TIMEOUT_MS = 10_000;

// --- Argument parsing ---
const args = process.argv.slice(2);
const fileArgIndex = args.indexOf("--file");
const endpointsFile =
  fileArgIndex !== -1 && args[fileArgIndex + 1]
    ? args[fileArgIndex + 1]
    : "endpoints.json";

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
    log.info('Tip: use --file <path> to specify a custom endpoints file.');
  } else if (err instanceof SyntaxError) {
    log.error(`Invalid JSON in "${endpointsFile}": ${err.message}`);
  } else {
    log.error(`Could not read file: ${err.message}`);
  }
  process.exit(1);
}

// --- Run tests ---
log.header(`api-sentinel — Testing ${endpoints.length} endpoint(s)`);
console.log("");

const results = [];

for (const endpoint of endpoints) {
  const result = await testEndpoint(endpoint, TIMEOUT_MS);
  results.push(result);
}

// --- Summary ---
console.log("");
printSummary(results);

// --- Generate reports ---
await generateJsonReport(results);
await generateMarkdownReport(results);

console.log("");
log.success("Reports saved: report.json  |  REPORT.md");

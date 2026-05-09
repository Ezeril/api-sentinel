/**
 * logger.js
 * Minimal terminal output utilities with color support.
 * No external dependencies — uses ANSI escape codes.
 */

const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
};

// Detect if terminal supports colors
const useColor = process.stdout.isTTY !== false;
const paint = (str, ...codes) =>
  useColor ? `${codes.join("")}${str}${c.reset}` : str;

export const log = {
  /** Section header */
  header: (msg) =>
    console.log(paint(`\n  ${msg}`, c.bold, c.cyan)),

  /** Passed test */
  pass: (msg) =>
    console.log(`  ${paint("✔", c.green, c.bold)}  ${msg}`),

  /** Failed test (wrong status) */
  warn: (msg) =>
    console.log(`  ${paint("✘", c.yellow, c.bold)}  ${paint(msg, c.yellow)}`),

  /** Failed test (network/error) */
  fail: (msg) =>
    console.log(`  ${paint("✘", c.red, c.bold)}  ${paint(msg, c.red)}`),

  /** Info message */
  info: (msg) =>
    console.log(`  ${paint("ℹ", c.cyan)}  ${paint(msg, c.dim)}`),

  /** Error message */
  error: (msg) =>
    console.error(`  ${paint("ERROR:", c.red, c.bold)} ${msg}`),

  /** Success message */
  success: (msg) =>
    console.log(`  ${paint("✔", c.green, c.bold)}  ${paint(msg, c.green)}`),
};

/**
 * Prints the final summary block in the terminal.
 * @param {import('../testEndpoint.js').EndpointResult[]} results
 */
export function printSummary(results) {
  const total = results.length;
  const passed = results.filter((r) => r.passed).length;
  const failed = total - passed;
  const successRate = total > 0 ? Math.round((passed / total) * 100) : 0;
  const avgTime =
    total > 0
      ? Math.round(results.reduce((sum, r) => sum + r.responseTime, 0) / total)
      : 0;

  const rateLabel =
    successRate === 100
      ? paint(`${successRate}%`, c.green, c.bold)
      : successRate >= 50
      ? paint(`${successRate}%`, c.yellow, c.bold)
      : paint(`${successRate}%`, c.red, c.bold);

  console.log(paint("  ─────────────────────────────────────", c.dim));
  console.log(`  ${paint("Summary", c.bold, c.white)}`);
  console.log(paint("  ─────────────────────────────────────", c.dim));
  console.log(`  Total:         ${total}`);
  console.log(`  ${paint("Passed:", c.green)}        ${passed}`);
  console.log(`  ${paint("Failed:", failed > 0 ? c.red : c.dim)}        ${failed}`);
  console.log(`  Success rate:  ${rateLabel}`);
  console.log(`  Avg response:  ${paint(`${avgTime}ms`, c.dim)}`);
  console.log(paint("  ─────────────────────────────────────", c.dim));
}

/**
 * jsonReporter.js
 * Writes a structured report.json file from test results.
 */

import { writeFileSync } from "fs";
import { resolve } from "path";

/**
 * Generates report.json in the current working directory.
 * @param {import('../testEndpoint.js').EndpointResult[]} results
 */
export async function generateJsonReport(results) {
  const total = results.length;
  const passed = results.filter((r) => r.passed).length;
  const failed = total - passed;
  const avgResponseTime =
    total > 0
      ? Math.round(results.reduce((sum, r) => sum + r.responseTime, 0) / total)
      : 0;

  const report = {
    generatedAt: new Date().toISOString(),
    summary: {
      total,
      passed,
      failed,
      successRate: total > 0 ? `${Math.round((passed / total) * 100)}%` : "N/A",
      avgResponseTimeMs: avgResponseTime,
    },
    results,
  };

  const outputPath = resolve(process.cwd(), "report.json");
  writeFileSync(outputPath, JSON.stringify(report, null, 2), "utf-8");
}

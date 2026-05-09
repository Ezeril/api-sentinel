/**
 * testEndpoint.js
 * Performs an HTTP request for a given endpoint config and returns a result object.
 */

import { log } from "./utils/logger.js";

/**
 * @typedef {Object} EndpointConfig
 * @property {string} name            - Human-readable label
 * @property {string} url             - Full URL to test
 * @property {string} [method]        - HTTP method (default: GET)
 * @property {number} expectedStatus  - Expected HTTP status code
 */

/**
 * @typedef {Object} EndpointResult
 * @property {string}  name
 * @property {string}  url
 * @property {string}  method
 * @property {number}  expectedStatus
 * @property {number|null} status       - Actual HTTP status received (null on network error)
 * @property {number}  responseTime     - Response time in milliseconds
 * @property {boolean} passed           - Whether status matches expectedStatus
 * @property {string|null} error        - Error message if request failed
 */

/**
 * Tests a single endpoint.
 * @param {EndpointConfig} endpoint
 * @param {number} timeoutMs
 * @returns {Promise<EndpointResult>}
 */
export async function testEndpoint(endpoint, timeoutMs = 10_000) {
  const { name, url, method = "GET", expectedStatus } = endpoint;

  // Validate required fields
  if (!url || !expectedStatus) {
    const error = "Missing required fields: url and expectedStatus.";
    log.fail(`${name ?? "Unnamed"} — ${error}`);
    return buildResult(endpoint, null, 0, false, error);
  }

  // Validate URL format
  try {
    new URL(url);
  } catch {
    const error = `Invalid URL: "${url}"`;
    log.fail(`${name} — ${error}`);
    return buildResult(endpoint, null, 0, false, error);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const start = Date.now();

  try {
    const response = await fetch(url, {
      method: method.toUpperCase(),
      signal: controller.signal,
      redirect: "follow",
    });

    clearTimeout(timer);

    const responseTime = Date.now() - start;
    const status = response.status;
    const passed = status === expectedStatus;

    if (passed) {
      log.pass(`${name} — ${method.toUpperCase()} ${url} — ${status} (${responseTime}ms)`);
    } else {
      log.warn(`${name} — ${method.toUpperCase()} ${url} — got ${status}, expected ${expectedStatus} (${responseTime}ms)`);
    }

    return buildResult(endpoint, status, responseTime, passed, null);
  } catch (err) {
    clearTimeout(timer);
    const responseTime = Date.now() - start;

    let errorMessage;
    if (err.name === "AbortError") {
      errorMessage = `Request timed out after ${timeoutMs}ms`;
    } else if (err.cause?.code === "ENOTFOUND" || err.cause?.code === "ECONNREFUSED") {
      errorMessage = `Network error: ${err.cause.code} — ${url}`;
    } else {
      errorMessage = err.message;
    }

    log.fail(`${name} — ${method.toUpperCase()} ${url} — ${errorMessage}`);
    return buildResult(endpoint, null, responseTime, false, errorMessage);
  }
}

/**
 * Builds a normalized result object.
 */
function buildResult(endpoint, status, responseTime, passed, error) {
  return {
    name: endpoint.name ?? "Unnamed",
    url: endpoint.url,
    method: (endpoint.method ?? "GET").toUpperCase(),
    expectedStatus: endpoint.expectedStatus,
    status,
    responseTime,
    passed,
    error,
  };
}

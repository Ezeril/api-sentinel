# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

_Nothing yet._

---

## [1.1.0] — 2026-05-14

### Added
- `--timeout <ms>` CLI flag — override the default 10s request timeout per run
- `--output <path>` CLI flag — specify a custom directory for generated reports (created automatically if missing)
- `headers` field per endpoint — attach any HTTP headers to a request (e.g. `Authorization`, `User-Agent`)
- `body` field per endpoint — attach a request body (auto-serialized to JSON if an object; `Content-Type: application/json` set automatically)
- Header displayed in terminal now shows the active timeout value

### Changed
- Switched from manual `AbortController` + `setTimeout` to native `AbortSignal.timeout()` (Node.js 20+)
- `jsonReporter` and `markdownReporter` now accept an `outputDir` parameter instead of always writing to `process.cwd()`

---

## [1.0.0] — 2026-05-09

### Added
- Initial release of `api-sentinel`
- Read endpoints from a configurable `endpoints.json` file
- Support for any HTTP method (`GET`, `POST`, `PUT`, `DELETE`, etc.)
- Response time measurement for each endpoint
- Expected vs actual HTTP status code validation
- Color-coded terminal output with pass / warn / fail indicators
- Final summary block in terminal (total, passed, failed, success rate, avg time)
- `report.json` generation with full structured results
- `REPORT.md` generation with a human-readable Markdown table
- Graceful handling of: timeouts, network errors, invalid URLs, malformed JSON, missing files
- `--file <path>` CLI flag to specify a custom endpoints file
- Zero external dependencies
- Compatible with Windows, macOS, and Linux (Node.js 20+)

[Unreleased]: https://github.com/Ezeril/api-sentinel/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/Ezeril/api-sentinel/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/Ezeril/api-sentinel/releases/tag/v1.0.0

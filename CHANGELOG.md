# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

_Nothing yet._

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
- Graceful handling of: timeouts, network errors (`ENOTFOUND`, `ECONNREFUSED`), invalid URLs, malformed JSON, missing files
- `--file <path>` CLI flag to specify a custom endpoints file
- Zero external dependencies
- Compatible with Windows, macOS, and Linux (Node.js 20+)

[Unreleased]: https://github.com/Ezeril/api-sentinel/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/Ezeril/api-sentinel/releases/tag/v1.0.0

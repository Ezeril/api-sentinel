# 🛡️ api-sentinel

**Test your API endpoints and get instant reports — from your terminal.**

![Node.js](https://img.shields.io/badge/Node.js-20%2B-green?logo=node.js)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-1.0.0-informational)
![Zero dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen)

---

## What is api-sentinel?

`api-sentinel` is a lightweight Node.js CLI tool that reads a list of API endpoints from a JSON file, fires HTTP requests against each one, checks whether the response status matches what you expect, and generates a clean report in both JSON and Markdown formats.

No bloated test frameworks. No config hell. Just a JSON file and one command.

---

## Features

- ✅ Supports any HTTP method (`GET`, `POST`, `PUT`, `DELETE`, etc.)
- ⏱️ Measures response time for each endpoint
- 🎯 Validates actual HTTP status against expected status
- 🌈 Color-coded terminal output
- 📄 Generates `report.json` (machine-readable)
- 📝 Generates `REPORT.md` (human-readable)
- 🛡️ Handles timeouts, network errors, and invalid URLs gracefully
- 💻 Compatible with Windows, macOS, and Linux
- 📦 Zero external dependencies

---

## Installation

### Option 1 — Run directly with `npx` (no install needed)

```bash
npx api-sentinel
```

### Option 2 — Install globally

```bash
npm install -g api-sentinel
```

### Option 3 — Clone and run locally

```bash
git clone https://github.com/Ezeril/api-sentinel.git
cd api-sentinel
node src/index.js
```

---

## Usage

### 1. Create your `endpoints.json`

```json
[
  {
    "name": "My API — Health check",
    "url": "https://api.example.com/health",
    "method": "GET",
    "expectedStatus": 200
  },
  {
    "name": "My API — Create resource",
    "url": "https://api.example.com/items",
    "method": "POST",
    "expectedStatus": 201
  }
]
```

**Fields:**

| Field            | Type     | Required | Description                          |
|------------------|----------|----------|--------------------------------------|
| `name`           | `string` | ✅       | Human-readable label for the endpoint |
| `url`            | `string` | ✅       | Full URL to test                     |
| `method`         | `string` | ✅       | HTTP method (`GET`, `POST`, etc.)    |
| `expectedStatus` | `number` | ✅       | Expected HTTP status code            |

### 2. Run the tool

```bash
# Uses endpoints.json by default
node src/index.js

# Or specify a custom file
node src/index.js --file my-endpoints.json
```

---

## Example output

```
  api-sentinel — Testing 5 endpoint(s)

  ✔  JSONPlaceholder — Posts — GET https://... — 200 (142ms)
  ✔  JSONPlaceholder — Single Post — GET https://... — 200 (89ms)
  ✔  JSONPlaceholder — Not Found — GET https://... — 404 (91ms)
  ✔  GitHub API — Public — GET https://... — 200 (203ms)
  ✘  Intentional failure — GET https://... — got 200, expected 201 (95ms)

  ─────────────────────────────────────
  Summary
  ─────────────────────────────────────
  Total:         5
  Passed:        4
  Failed:        1
  Success rate:  80%
  Avg response:  124ms
  ─────────────────────────────────────

  ✔  Reports saved: report.json  |  REPORT.md
```

---

## Generated reports

### `report.json`

```json
{
  "generatedAt": "2026-01-15T10:30:00.000Z",
  "summary": {
    "total": 5,
    "passed": 4,
    "failed": 1,
    "successRate": "80%",
    "avgResponseTimeMs": 124
  },
  "results": [
    {
      "name": "JSONPlaceholder — Posts",
      "url": "https://jsonplaceholder.typicode.com/posts",
      "method": "GET",
      "expectedStatus": 200,
      "status": 200,
      "responseTime": 142,
      "passed": true,
      "error": null
    }
  ]
}
```

### `REPORT.md`

A clean Markdown table with all results, generated and ready to paste into a GitHub issue, Notion page, or Slack message.

---

## Project structure

```
api-sentinel/
├── src/
│   ├── index.js                   # CLI entry point
│   ├── testEndpoint.js            # HTTP request logic & result builder
│   ├── reporters/
│   │   ├── jsonReporter.js        # Generates report.json
│   │   └── markdownReporter.js    # Generates REPORT.md
│   └── utils/
│       └── logger.js              # Terminal output & color helpers
├── endpoints.example.json         # Example endpoints file
├── package.json
├── .gitignore
├── CONTRIBUTING.md
├── CHANGELOG.md
└── README.md
```

---

## Roadmap

### v1.0 (current)
- [x] Read endpoints from JSON
- [x] Test with any HTTP method
- [x] Measure response time
- [x] Validate expected status
- [x] Color terminal output
- [x] Generate report.json
- [x] Generate REPORT.md
- [x] Graceful error handling (timeout, invalid URL, network error)

---

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) first.

---

## License

MIT © 2026 Ezeril — See [LICENSE](./LICENSE)

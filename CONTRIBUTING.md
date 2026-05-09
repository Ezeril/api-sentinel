# Contributing to api-sentinel

First off, thank you for taking the time to contribute! 🎉

This document explains how to get started and what guidelines to follow.

---

## Getting started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/api-sentinel.git
   cd api-sentinel
   ```
3. **Create a branch** for your change:
   ```bash
   git checkout -b feat/my-feature
   # or
   git checkout -b fix/my-bugfix
   ```
4. Make your changes
5. **Test** your changes:
   ```bash
   node src/index.js --file endpoints.example.json
   ```
6. **Commit** with a clear message (see below)
7. **Push** and open a Pull Request

---

## Commit conventions

We use a simple subset of [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix      | Use for                                  |
|-------------|------------------------------------------|
| `feat:`     | A new feature                            |
| `fix:`      | A bug fix                                |
| `docs:`     | Documentation changes only               |
| `refactor:` | Code refactor without behavior change    |
| `chore:`    | Maintenance (deps, config, tooling)      |
| `test:`     | Adding or updating tests                 |

**Examples:**
```
feat: add --timeout CLI flag
fix: handle ECONNREFUSED errors on Windows
docs: update installation instructions
```

---

## Code style

- Pure ESM (`import`/`export`), Node.js 20+
- No external dependencies (keep it lean)
- Descriptive variable names
- JSDoc for exported functions
- Error handling for every network operation

---

## Reporting issues

Please use the [GitHub Issues](https://github.com/Ezeril/api-sentinel/issues) page.

Include:
- Node.js version (`node --version`)
- OS and version
- The `endpoints.json` you used (redact sensitive URLs if needed)
- The error message or unexpected behavior

---

## Pull Request checklist

Before submitting:
- [ ] My code follows the project style
- [ ] I tested manually with `endpoints.example.json`
- [ ] I updated `README.md` if needed
- [ ] I updated `CHANGELOG.md` under `[Unreleased]`
- [ ] My commits follow the convention above

---

Thank you! 🛡️

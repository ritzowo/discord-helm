# Contributing

Thanks for your interest in contributing! This document describes how to work on this project.

## Development Setup

```bash
npm install
cp .env.example .env
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d db
# Set DATABASE_URL=postgresql://postgres:postgres@localhost:5432/discord_helm
# and fill in the other required values in .env.
npm run dev
```

Requires Node.js >= 22, Docker with the Compose plugin, and an OpenAI-compatible LLM endpoint. See the [README](./README.md) for environment variables.

## Pull Requests

- Branch from `main`
- Branch name: `feat/description`, `fix/description`, `docs/description`, etc.
- Keep PRs focused — one feature or fix per PR
- Make sure the following all pass before submitting:

  ```bash
  npm run typecheck
  npm run build
  npm run lint
  npm test
  ```

- Add or update tests (`node:test`, under `test/*.test.ts`) when changing behavior
- Direct pushes to `main` are blocked; all changes go through PRs

## Releases

Publish a GitHub Release with a semantic version tag such as `v0.2.0`. The release workflow builds `linux/amd64` and `linux/arm64` images, pushes them to GHCR, and attaches the Compose setup bundles to the release.

After the first publish, set the `ghcr.io/ritzowo/discord-helm` package visibility to **Public** in its GitHub package settings so self-hosters can pull it without authentication. This is a one-time repository-owner action.

## Commit Messages

```
prefix(scope): content
```

### Prefix

- `feat` — New feature
- `fix` — Bug fix
- `refactor` — Code restructuring without behavior change
- `docs` — Documentation
- `chore` — Build, config, and other maintenance

### Scope

Optional. The area of the codebase the change touches, e.g. `llm`, `context`, `db`, `events`.
Omit it when the change spans multiple areas.

### Examples

```
feat(llm): add a react tool so the model can add emoji reactions
fix(events): keep the typing indicator alive after each sent message
refactor(context): split context building from the chat-message mapping
docs: add CONTRIBUTING.md
```

## Code Style

- Formatting is handled by Prettier (`npm run format`) and linting by ESLint (`npm run lint`).
- Prefer clear, self-explanatory code over comments.

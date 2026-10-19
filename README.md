# Discord Helm

<a href="./README.md"><img src="https://img.shields.io/badge/English-blue?style=for-the-badge" alt="English"></a>
<a href="./README.ja.md"><img src="https://img.shields.io/badge/日本語-lightgrey?style=for-the-badge" alt="日本語"></a>

An interface for an LLM to operate Discord as a bot: actions on Discord are exposed to the LLM as tools.
Works with any OpenAI-compatible API.

> [!NOTE]
> This project is in the early stages of development. The interfaces and specifications are subject to change.

## Design

Available Discord actions are offered to the LLM as tool choices, so it can actively operate on Discord from within the loop.
Every action it takes on Discord is routed through a tool.

## Setup

### Docker Compose (recommended)

Requirements:

- Docker with the Compose plugin
- A Discord application with the Message Content Intent enabled
- An OpenAI-compatible LLM endpoint

Download the setup bundle from the latest release:

```bash
curl -fsSLO https://github.com/ritzowo/discord-helm/releases/latest/download/discord-helm-compose.tar.gz
tar -xzf discord-helm-compose.tar.gz
cd discord-helm
cp .env.example .env
# Fill in DISCORD_TOKEN, DISCORD_CLIENT_ID, and LLM_MODEL in .env.
docker compose up -d
docker compose logs -f bot
```

The release bundle pins `DISCORD_HELM_VERSION` to that release. To update, change it to a newer release version and run:

```bash
docker compose pull
docker compose up -d
```

### Build from source

```bash
git clone https://github.com/ritzowo/discord-helm.git
cd discord-helm
cp .env.example .env
# Fill in the required values in .env.
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

## Environment Variables

Set these in `.env` (copy it from `.env.example`).

| Variable               | Required           | Description                                                                             |
| ---------------------- | ------------------ | --------------------------------------------------------------------------------------- |
| `DISCORD_HELM_IMAGE`   |                    | Container image (default: `ghcr.io/ritzowo/discord-helm`)                               |
| `DISCORD_HELM_VERSION` |                    | Container image version (release bundles pin this to their release)                     |
| `DISCORD_TOKEN`        | ✅                 | Discord bot token                                                                       |
| `DISCORD_CLIENT_ID`    | ✅                 | Discord application (client) ID                                                         |
| `DISCORD_GUILD_ID`     |                    | If set, registers slash commands only to that guild (handy for development)             |
| `LLM_MODEL`            | ✅                 | Model ID to use (e.g. `openai.gpt-oss-120b-1:0`)                                        |
| `LLM_BASE_URL`         |                    | Base URL of the OpenAI-compatible endpoint (Compose defaults to port 11434 on the host) |
| `LLM_API_KEY`          |                    | API key (if the backend requires one)                                                   |
| `LLM_TEMPERATURE`      |                    | Sent only when set (otherwise the server default applies)                               |
| `LLM_TIMEOUT_MS`       |                    | LLM request timeout in milliseconds (default: `120000`)                                 |
| `DATABASE_URL`         | ✅ outside Compose | PostgreSQL connection URL; Compose supplies this automatically                          |

## Scripts

| Command               | Description                                          |
| --------------------- | ---------------------------------------------------- |
| `npm run dev`         | Start in development mode (watches for file changes) |
| `npm run build`       | Build TypeScript                                     |
| `npm start`           | Start the built bot                                  |
| `npm run typecheck`   | Type-check                                           |
| `npm test`            | Run tests (node:test)                                |
| `npm run lint`        | ESLint                                               |
| `npm run format`      | Format with Prettier                                 |
| `npm run db:generate` | Generate migrations from the schema (Drizzle)        |
| `npm run db:studio`   | Launch Drizzle Studio                                |

## Contribution

See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to contribute.

## LICENSE

[MIT](./LICENSE)

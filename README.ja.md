# Discord Helm

<a href="./README.md"><img src="https://img.shields.io/badge/English-lightgrey?style=for-the-badge" alt="English"></a>
<a href="./README.ja.md"><img src="https://img.shields.io/badge/日本語-blue?style=for-the-badge" alt="日本語"></a>

LLMがBotとしてDiscordを操作するためのインターフェースで、Discordへの作用をツールとして提供しています。
OpenAI互換APIに対応。

> [!NOTE]
> このプロジェクトは開発初期段階です。インターフェースや仕様は変更される可能性があります。

## Design

利用可能なDiscordの操作はツールの選択肢としてLLMに提示され、LLMはループの中から能動的にDiscordを操作できます。
LLMが行うDiscordへの操作は、すべてツールを経由します。

## Setup

### Docker Compose（推奨）

必要なもの:

- Composeプラグインを含むDocker
- Message Content Intentを有効にしたDiscord Application
- OpenAI互換のLLMエンドポイント

最新Releaseからセットアップbundleをダウンロードします。

```bash
curl -fsSLO https://github.com/ritzowo/discord-helm/releases/latest/download/discord-helm-compose.tar.gz
tar -xzf discord-helm-compose.tar.gz
cd discord-helm
cp .env.example .env
# .env の DISCORD_TOKEN、DISCORD_CLIENT_ID、LLM_MODEL を設定
docker compose up -d
docker compose logs -f bot
```

Release bundleでは `DISCORD_HELM_VERSION` がそのReleaseに固定されています。更新時は新しいReleaseバージョンへ変更してから実行します。

```bash
docker compose pull
docker compose up -d
```

### ソースからbuild

```bash
git clone https://github.com/ritzowo/discord-helm.git
cd discord-helm
cp .env.example .env
# .env の必須項目を設定
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

## Environment Variables

`.env`（`.env.example` をコピーして作成）に設定します。

| 変数                   | 必須            | 説明                                                                                    |
| ---------------------- | --------------- | --------------------------------------------------------------------------------------- |
| `DISCORD_HELM_IMAGE`   |                 | コンテナimage（既定: `ghcr.io/ritzowo/discord-helm`）                                   |
| `DISCORD_HELM_VERSION` |                 | コンテナimageのバージョン（Release bundleではReleaseごとに固定）                        |
| `DISCORD_TOKEN`        | ✅              | Discord Bot のトークン                                                                  |
| `DISCORD_CLIENT_ID`    | ✅              | Discord アプリケーション（クライアント）ID                                              |
| `DISCORD_GUILD_ID`     |                 | 指定するとそのギルドにのみスラッシュコマンドを登録（開発時に便利）                      |
| `LLM_MODEL`            | ✅              | 使用するモデル ID（例: `openai.gpt-oss-120b-1:0`）                                      |
| `LLM_BASE_URL`         |                 | OpenAI互換エンドポイントのベースURL（Composeではデフォルトでホストの11434番portを参照） |
| `LLM_API_KEY`          |                 | API キー（必要なバックエンドの場合）                                                    |
| `LLM_TEMPERATURE`      |                 | 指定時のみリクエストに付与（未指定ならサーバー既定に委ねる）                            |
| `LLM_TIMEOUT_MS`       |                 | LLM リクエストのタイムアウト（ミリ秒、既定: `120000`）                                  |
| `DATABASE_URL`         | Compose外では✅ | PostgreSQL接続URL。Composeでは自動設定                                                  |

## Scripts

| コマンド              | 説明                                          |
| --------------------- | --------------------------------------------- |
| `npm run dev`         | 開発モードで起動（ファイル変更を監視）        |
| `npm run build`       | TypeScript をビルド                           |
| `npm start`           | ビルド済みの Bot を起動                       |
| `npm run typecheck`   | 型チェック                                    |
| `npm test`            | テスト実行（node:test）                       |
| `npm run lint`        | ESLint                                        |
| `npm run format`      | Prettier で整形                               |
| `npm run db:generate` | スキーマからマイグレーションを生成（Drizzle） |
| `npm run db:studio`   | Drizzle Studio を起動                         |

## Contribution

コントリビュート方法は [CONTRIBUTING.md](./CONTRIBUTING.md) を参照してください。

## LICENSE

[MIT](./LICENSE)

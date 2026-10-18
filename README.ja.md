# Discord Helm

<a href="./README.md"><img src="https://img.shields.io/badge/English-lightgrey?style=for-the-badge" alt="English"></a>
<a href="./README.ja.md"><img src="https://img.shields.io/badge/日本語-blue?style=for-the-badge" alt="日本語"></a>

LLMがBotとしてDiscordを操作するためのインターフェースで、Discordへの作用をツールとして提供しています。
OpenAI互換APIに対応。

> This project is in the early stages of development. The interfaces and specifications are subject to change.

## Design

利用可能なDiscordの操作はツールの選択肢としてLLMに提示され、LLMはループの中から能動的にDiscordを操作できます。
LLMが行うDiscordへの操作は、すべてツールを経由します。

## Setup

```bash
git clone https://github.com/ritzowo/discord-helm.git
cd discord-helm
npm install
cp .env.example .env   # 各値を設定
npm run dev
```

## Environment Variables

`.env`（`.env.example` をコピーして作成）に設定します。

| 変数 | 必須 | 説明 |
| --- | --- | --- |
| `DISCORD_TOKEN` | ✅ | Discord Bot のトークン |
| `DISCORD_CLIENT_ID` | ✅ | Discord アプリケーション（クライアント）ID |
| `DISCORD_GUILD_ID` | | 指定するとそのギルドにのみスラッシュコマンドを登録（開発時に便利） |
| `LLM_MODEL` | ✅ | 使用するモデル ID（例: `openai.gpt-oss-120b-1:0`） |
| `LLM_BASE_URL` | | OpenAI 互換エンドポイントのベース URL（既定: `http://localhost:11434/v1`） |
| `LLM_API_KEY` | | API キー（必要なバックエンドの場合） |
| `LLM_TEMPERATURE` | | 指定時のみリクエストに付与（未指定ならサーバー既定に委ねる） |
| `LLM_TIMEOUT_MS` | | LLM リクエストのタイムアウト（ミリ秒、既定: `120000`） |
| `DB_PATH` | | SQLite ファイルのパス（既定: `./data/discord-helm.sqlite`） |

## Scripts

| コマンド | 説明 |
| --- | --- |
| `npm run dev` | 開発モードで起動（ファイル変更を監視） |
| `npm run build` | TypeScript をビルド |
| `npm start` | ビルド済みの Bot を起動 |
| `npm run typecheck` | 型チェック |
| `npm test` | テスト実行（node:test） |
| `npm run lint` | ESLint |
| `npm run format` | Prettier で整形 |
| `npm run db:generate` | スキーマからマイグレーションを生成（Drizzle） |
| `npm run db:studio` | Drizzle Studio を起動 |

## Contribution

コントリビュート方法は [CONTRIBUTING.md](./CONTRIBUTING.md) を参照してください。

## LICENSE

[MIT](./LICENSE)

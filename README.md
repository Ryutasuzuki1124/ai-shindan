# AI業務診断アプリ

中小企業向けAI顧問サービスの営業ツール。10問の診断でAI化スコアを算出し、最適なプランを提案します。

## ローカルで起動する

```bash
npm install
npm start
```

ブラウザで http://localhost:3000 を開きます。

## Vercelにデプロイする

### 方法1: Vercel CLI（推奨）

```bash
npm install -g vercel
vercel
```

初回は対話式でプロジェクト設定を行います。以降は `vercel --prod` で本番デプロイできます。

### 方法2: GitHubと連携

1. このリポジトリをGitHubにpushする
2. https://vercel.com にログイン
3. 「New Project」→ GitHubリポジトリを選択
4. フレームワークは **Create React App** が自動検出されます
5. 「Deploy」をクリック

設定は `vercel.json` に記載済みのため、追加設定は不要です。

## ビルド

```bash
npm run build
```

`build/` フォルダに静的ファイルが生成されます。

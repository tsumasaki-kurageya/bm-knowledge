# Markdownレビューサイトの運用

Issue #20でMkDocsからAstro＋Starlightへ移行。Markdownが正本で、mainへのマージ後にGitHub Actionsで閲覧サイトを更新する。

## 公開対象と原稿

`docs/00-business`、`docs/01-domains`、`docs/02-processes`のMarkdownと、`pages/index.md`を掲載する。Evidence・Insight・添付資料・テンプレートは生成対象に含めない。公開対象のディレクトリへ現場固有の機密情報を置かない。

`scripts/prepare-pages.mjs`が生成用コピーを`src/content/docs`へ作成する。タイトル・表示用メタデータを補い、重複するH1だけを生成コピーから除く。原稿のFrontmatter・永続ID・本文は変更しない。文書追加時はID順でメニューに自動反映される。

文書間のMarkdownリンクは描画時にサイトURLへ変換する。公開対象外へのリンクや不正な日本語アンカーはビルド後の検証で検出する。

## ローカルで確認

Node.js 24とnpmを使用する。依存バージョンはpackage-lock.jsonで固定する。

```sh
npm ci
npm run dev
```

表示URL：<http://localhost:4321/bm-knowledge/>

原稿編集後は`npm run prepare:docs`を再実行すると、生成コピーの更新を開発サーバーが検出する。生成先の`src/content/docs`、`.generated`、`.astro`、`dist`は直接編集・コミットしない。

本番ビルドと検索を確認する場合：

```sh
npm run build
npm run preview
```

Pagefind検索は本番ビルドで生成されるため、検索操作はpreviewで確認する。ビルド開始時に以前のdistを削除し、古いページが残らないようにする。

ブラウザの検証：

```sh
npx playwright install chromium
npx playwright test
```

CIではLinux向けのブラウザ依存もインストールする。旧URLの転送・日本語アンカー・原文リンク・Mermaid・日本語検索・モバイルナビゲーションを確認する。

## 公開と更新

サイト：<https://tsumasaki-kurageya.github.io/bm-knowledge/>

GitHub PagesのSourceは **GitHub Actions** を継続使用する。ホスティング設定の変更は不要。PRではビルド・リンク・ブラウザ検証を行い、mainへのマージ後にdistを公開する。未マージの原稿はローカルで確認する。

初回設定や再設定が必要な場合は、Settings → Pages → Build and deployment → SourceでGitHub Actionsを選び、Actions → Markdown review site → Run workflowでmainを実行する。

リポジトリのprivate設定とPagesサイトの閲覧範囲は別。現在の公開対象は一般知識のみとし、Evidence等の公開範囲をこの移行では拡張しない。

## URLと表示の互換性

新しい文書URLは`/bm-knowledge/02-processes/annual-plan/`の形式。以前の`.html` URLには転送ページを生成し、クエリと見出しへのフラグメントを保持する。ホームの`index.html`も引き続き使用できる。元のタイトルの見出しアンカーも残す。

Starlight標準の目次・サイドバー・日本語検索・テーマ切替を使用する。文書ID・状態・信頼度・確認日はページ上部に表示し、Markdown原文と修正提案Issueへ移動できる。privateリポジトリ上の操作にはGitHubのアクセス権が必要。

Mermaidはnpm依存としてバンドルし、図のあるページで遅延読み込みする。外部CDNには依存しない。図の生成に失敗した場合は定義を残す。表・大きな図は領域内で横スクロールできる。

## 主な構成

- `astro.config.mjs`：Starlight、公開先、目次、Markdown変換
- `scripts/site-config.mjs`：公開対象・ベースパス・リポジトリ
- `src/content.config.ts`：文書情報のスキーマ
- `src/components/ReviewTitle.astro`：文書情報・原文・修正提案
- `scripts/check-pages.mjs`：生成ページ・ファイル・アンカーの検証
- `tests/review.spec.ts`：ブラウザでのレビュー操作の検証

## 参照

確認日：2026-09-15。

- [Starlightのセットアップ](https://starlight.astro.build/manual-setup/)
- [コンポーネントの差し替え](https://starlight.astro.build/guides/overriding-components/)
- [AstroのGitHub Pages公開](https://docs.astro.build/en/guides/deploy/github/)

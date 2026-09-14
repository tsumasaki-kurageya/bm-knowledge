# Markdownレビューサイトの運用

Issue #18。既存MarkdownからMkDocsで閲覧用HTMLを生成する。一般知識の内容を二重管理せず、mainへのマージ後にGitHub Actionsで更新する。

## 公開対象

`scripts/prepare_pages.py`が`docs/00-business`、`docs/01-domains`、`docs/02-processes`のMarkdownだけを生成用ディレクトリへコピーする。サイト用ホームとCSS・JavaScriptを加え、それ以外の原稿・添付ファイル・Evidence・Insight・テンプレートはコピーしない。検索索引も生成対象のページだけを収録する。

対象ディレクトリ内への新規Markdown追加は自動でメニューへ反映される。ここへ現場固有の機密情報を置かない。対象外文書へリンクを追加するとビルド時のリンク検証で検出されるため、公開範囲を検討してから扱いを決める。

## 初回のGitHub設定

1. 公開対象の一般知識文書を確認し、この実装PRをmainへマージする。
2. リポジトリの **Settings → Pages → Build and deployment → Source** で **GitHub Actions** を選ぶ。
3. **Actions → Markdown review site → Run workflow** でmainを実行する。初回マージ時のデプロイが設定前で失敗した場合も、設定後に再実行する。
4. デプロイ成功後、Settings → Pagesの **Visit site** から確認する。

予定URL：<https://tsumasaki-kurageya.github.io/bm-knowledge/>

このリポジトリは作業時点でprivate。privateリポジトリのPages利用には対応プランが必要で、サイトの閲覧範囲はリポジトリのprivate設定とは別。通常のPagesサイトはインターネットに公開される。リポジトリ自体をpublicへ変更する必要はない。公開できない内容を含む場合は、Pagesを有効にする前に閲覧制限のある配信方式を別途検討する。

## ローカルで確認

Python 3.12を使用する。

```sh
python -m venv .venv
. .venv/bin/activate
python -m pip install -r requirements-pages.txt
python scripts/prepare_pages.py
python -m mkdocs build --strict -f mkdocs.generated.yml
python scripts/check_pages.py
python -m mkdocs serve -f mkdocs.generated.yml
```

原稿を編集した後は`prepare_pages.py`を再実行する。生成先の`.pages-docs`や`site`を直接編集・コミットしない。

## レビューと表示

PRでは生成・リンク検証だけを実行し、公開サイトを更新しない。mainへ取り込んだ文書だけが公開される。未マージの原稿はローカル起動で確認する。サイトの「Markdown原文」「修正を提案」はGitHubを開くため、privateリポジトリのアクセス権が必要。

日本語見出しをアンカーに残し、表と大きな図は領域内で横スクロールできる。Mermaid 11.12.0はjsDelivrからブラウザで読み込む。読み込みに失敗しても図の定義は残す。検索はMkDocsのブラウザ内検索を利用する。

## 参照

確認日：2026-09-14。

- [MkDocs設定](https://www.mkdocs.org/user-guide/configuration/)
- [GitHub Pagesのカスタムワークフロー](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Pagesサイトの作成・公開範囲と対応プラン](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

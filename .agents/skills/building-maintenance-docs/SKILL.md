---
name: building-maintenance-docs
description: bm-knowledge の建物維持保全ガイドを新規作成・編集・再構成する。業務知識の正確さ、初学者向けの平易さ、Starlight のナビゲーションを一体で扱うときに使用する。
---

# 建物維持保全ガイドの編集

`bm-knowledge` を、建物維持保全を知らない開発者でも目的の業務を見つけ、前後関係まで理解できるガイドとして編集する。

## 最初に確認するもの

1. 対象 Issue と完了条件を読む。
2. ルートの `AGENTS.md` を読む。
3. 新規文書では `schemas/frontmatter.md` と該当する `templates/` を読む。
4. 対象文書、同じ種類の代表的な文書、リンク先を `rg` で確認する。
5. サイドメニューを変更する場合は `scripts/site-config.mjs` も読む。

## 作業に応じて読むルール

リポジトリ全体の必須ルールは `AGENTS.md`、文章と情報設計のルールはこのスキルの `references/` を正本とする。同じルールを別のガイドへ複製しない。

文章を新規作成・書き換えするときは [references/writing-guide.md](references/writing-guide.md) を読む。

ページの分割、移動、見出し、リンク、サイドメニューを変更するときは [references/information-architecture.md](references/information-architecture.md) を読む。

## 作業の進め方

1. 変更対象を Business、Domain、Process、Evidence、Insight のどれかに位置付ける。
2. 関連する既存文書を検索し、重複、用語の揺れ、矛盾、前後リンクを確認する。
3. 読者が知りたい順に、目的、開始条件、関わる役割、活動、判断、成果、前後業務を整理する。文書種別に不要な項目は無理に追加しない。
4. 根拠が支える範囲と、編集上の整理・解釈を区別する。
5. 変更後のページを、単独のMarkdownではなくサイト内の導線として読み直す。

## 完了確認

- 冒頭だけで、そのページの対象と分かることが判断できる。
- 専門用語を知らない読者が、前の段落へ戻らず読み進められる。
- 同じ説明や注意書きがページ内で繰り返されていない。
- 見出し階層とサイドメニューの分類が、同じ情報構造を表している。
- 業務フローが大量にフラット表示されず、Domain など意味のあるまとまりから探せる。
- 変更後のリポジトリ内リンクが有効で、永続 ID、Frontmatter、情報源、未確認事項が維持されている。
- `npm run build` が成功する。
- `git diff --check` と `git diff` で、意図しない変更がない。

# bm-knowledge

`bm-knowledge` は、**建物維持保全における業務**を継続的に探索・整理・分析するための Markdown 知識ベースです。

## 対象範囲

対象は、建物を安全かつ適切な状態に維持し、必要な機能を継続して提供するための業務です。特定のビルメンテナンス会社の業務体系には限定しません。

オーナー、PM / FM、ビルメンテナンス会社、専門工事会社・点検会社、テナント、メーカー、行政・法定検査機関などは、業務を分類する主軸ではなく、各業務に関与する主体・役割として記録します。

現時点では次をスコープ外とします。

- 業務領域の網羅的な調査
- 個別業務フローの詳細化
- 現場 Evidence の本格的な投入
- 業務エクスプローラーなどの UI 実装

## 読み始める入口

- [BUSINESS-001：建物維持保全の全体像](docs/00-business/overview.md)
- [DOMAIN-000：業務領域一覧](docs/01-domains/overview.md)
- [PROCESS-001：業務カタログ](docs/02-processes/overview.md)
- [Evidenceの登録と初期投入](docs/03-evidence/README.md)

## Source of Truth

このリポジトリの Markdown を正本（Source of Truth）とします。口頭や Issue、Pull Request だけで確定した知識を残さず、レビュー済みの内容を Markdown に反映します。

## 知識の構造

知識は次の関係で整理します。

```text
Business → Domain → Process ← Evidence → Insight
```

| 要素 | 内容 | 保存先 |
| --- | --- | --- |
| Business | 建物維持保全が解決する問題、提供する価値、全体像 | `docs/00-business/` |
| Domain | 業務領域と領域間の関係 | `docs/01-domains/` |
| Process | 業務の開始条件、流れ、分岐、入出力、役割 | `docs/02-processes/` |
| Evidence | 現場訪問、ヒアリング、問い合わせ、文書から得た事実 | `docs/03-evidence/` |
| Insight | Evidence と標準知識の比較から得た差分、課題、仮説、機会 | `docs/04-insights/` |

Evidence は Process や Domain の根拠となり、Insight は Evidence を参照します。標準的な知識、特定現場の事実、そこからの解釈を同じ記述として混ぜません。

## ディレクトリ

```text
docs/
├─ 00-business/          # 建物維持保全の目的と全体像
├─ 01-domains/           # 業務領域
├─ 02-processes/         # 個別の業務プロセス
├─ 03-evidence/          # 観察・発言・問い合わせ・参照文書
│  ├─ site-visits/
│  ├─ interviews/
│  ├─ support-tickets/
│  └─ documents/
├─ 04-insights/          # Evidence から得た分析結果
│  ├─ gaps/
│  ├─ issues/
│  ├─ hypotheses/
│  └─ opportunities/
└─ 90-glossary/          # 用語

templates/               # 各知識要素の Markdown テンプレート
schemas/                 # Frontmatter と ID の規約
```

## 更新方法

基本フローは **Issue → Markdown 更新 → Pull Request → Review** です。

1. 1テーマにつき1件の Issue を作成し、目的、対象、根拠、完了条件を書く。
2. `main` から Issue 単位のブランチを作る。
3. `templates/` の対応するテンプレートを複製し、Markdown を更新する。
4. 既存文書との重複・矛盾、参照リンク、Frontmatter を確認する。
5. Pull Request に対象 Issue を `Closes #<番号>` で記載する。
6. Review の指摘を Markdown に反映し、承認後にマージする。

### スマートフォンから進める場合

1. GitHub アプリまたはブラウザで Issue を作成し、Issue テンプレートへ入力する。
2. AI エージェントへ Issue URL または番号を渡して更新を依頼する。
3. 作成された Pull Request の **Files changed** で差分を確認する。
4. 修正点は行コメントまたは **Conversation** のコメントで伝える。
5. 反映後に再確認し、問題がなければ承認・マージする。

事実か解釈か判断できない記述や、根拠が不足している記述は、推測で確定せず「未確認事項」に残します。

## Frontmatter と ID

知識文書には `schemas/frontmatter.md` に従って Frontmatter を付けます。ID はファイル名や配置を変えても変更しない永続識別子です。

## 情報管理

Evidence を追加する前に [`docs/03-evidence/information-management.md`](docs/03-evidence/information-management.md) を確認してください。顧客、物件、個人を特定する情報は必要最小限とし、保存可否を判断できない機密情報はリポジトリへ保存しません。

AI エージェントによる編集ルールは [`AGENTS.md`](AGENTS.md) に定義しています。

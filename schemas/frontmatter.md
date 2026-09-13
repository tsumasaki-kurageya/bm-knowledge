# Frontmatter / ID 規約

知識文書の先頭には YAML Frontmatter を記載します。

```yaml
---
id: PROCESS-001
type: process
status: exploring
confidence: medium
last_reviewed: 2026-09-13
---
```

## 必須属性

| 属性 | 内容 | 規則 |
| --- | --- | --- |
| `id` | 永続識別子 | リポジトリ内で一意。作成後は変更・再利用しない |
| `type` | 知識要素の種類 | 下記の利用可能値から選ぶ |
| `status` | 確認・整理の状態 | 下記の利用可能値から選ぶ |
| `confidence` | 内容全体の確からしさ | 下記の利用可能値から選ぶ |
| `last_reviewed` | 最終確認日 | `YYYY-MM-DD`。内容を確認した日を記載する |

ファイル名やディレクトリを変更しても `id` は維持します。文書を廃止しても ID は再利用しません。

## ID

形式は `<PREFIX>-<3桁以上の連番>` とします。

| 種類 | Prefix | 例 |
| --- | --- | --- |
| 建物維持保全の全体像 | `BUSINESS` | `BUSINESS-001` |
| 業務領域 | `DOMAIN` | `DOMAIN-001` |
| 業務プロセス | `PROCESS` | `PROCESS-001` |
| 根拠・観察事実 | `EVIDENCE` | `EVIDENCE-001` |
| 差分・課題 | `ISSUE` | `ISSUE-001` |
| 仮説 | `HYPOTHESIS` | `HYPOTHESIS-001` |
| 改善・製品化の機会 | `OPPORTUNITY` | `OPPORTUNITY-001` |

- GitHub Issue 番号と知識文書の `ISSUE-*` は別の識別子です。
- 新しい ID は同じ Prefix の既存 ID を検索し、最大値の次を採番します。
- 桁数が3桁を超えた場合は、そのまま4桁以上を使用します。
- 分類変更が必要になっても既存 ID は維持し、`type` と配置を更新します。

## `type`

| 値 | 用途 |
| --- | --- |
| `business` | 建物維持保全の目的、価値、全体像 |
| `domain` | 業務領域 |
| `process` | 業務プロセス |
| `evidence` | 観察・発言・問い合わせ・参照文書 |
| `issue` | 標準と実態の差分、または確認された課題 |
| `hypothesis` | 検証前の説明や見立て |
| `opportunity` | 改善または製品化の機会 |

## `status`

| 値 | 意味 |
| --- | --- |
| `exploring` | 情報を収集中で、構造や内容が大きく変わり得る |
| `draft` | 必要項目を記述したが、レビュー前またはレビュー中 |
| `reviewed` | 情報源と内容をレビュー済み |
| `verified` | 複数の十分な根拠、または権威ある原典で確認済み |
| `deprecated` | 現在は使用しない。廃止理由と後継 ID を本文に記載する |

`status` は文書の作業状態です。内容の確からしさは `confidence` で表します。

## `confidence`

| 値 | 目安 |
| --- | --- |
| `low` | 根拠が限定的、未確認、単一の発言・事例に依存する |
| `medium` | 信頼できる根拠があるが、範囲・例外・最新性の確認が残る |
| `high` | 原典または複数の独立した根拠で確認され、適用範囲も明確 |

確からしさが項目ごとに異なる場合は、Frontmatter には文書全体として控えめな値を設定し、本文で個別に補足します。

## 任意属性

必要な場合に限り、次を追加できます。

```yaml
related_ids:
  - DOMAIN-001
source_date: 2026-09-01
```

新しい共通属性を追加するときは、先にこの規約を更新します。

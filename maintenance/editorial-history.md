# ガイドの編集経緯

読者向け本文から分離した、分類の検討・詳細化の選定記録です。業務の根拠や未確認事項は各本文に残しています。

元文書：`docs/01-domains/overview.md`

## 分類案の比較と採用理由

| 分類の軸・参照体系 | 捉えやすいこと | そのまま主軸にした場合の不足 | 今回の扱い |
| --- | --- | --- | --- |
| 委託作業・対象の区分：国交省の共通仕様書（[D3](https://github.com/tsumasaki-kurageya/bm-knowledge/blob/2c89063a1d7c973054fc81b2450f1f53695d6979/docs/01-domains/overview.md#d3)） | 日常・定期の実務と対象物 | 所有者側の要求・資金計画や更新判断を十分に表せない。作業の種類と対象も混在する | 作業の抜けを確認する補助軸に採用 |
| 衛生対象の区分：厚労省の管理基準（[D4](https://github.com/tsumasaki-kurageya/bm-knowledge/blob/2c89063a1d7c973054fc81b2450f1f53695d6979/docs/01-domains/overview.md#d4)） | 空気・水・清掃・防除のまとまり | 衛生以外の保全を覆わず、測定・手入れ・改修が同じ対象に入る | 衛生分野の対象確認に採用 |
| 経営・管理の循環：JFMA（[D1](https://github.com/tsumasaki-kurageya/bm-knowledge/blob/2c89063a1d7c973054fc81b2450f1f53695d6979/docs/01-domains/overview.md#d1)）、ISO公開概要（[D2](https://github.com/tsumasaki-kurageya/bm-knowledge/blob/2c89063a1d7c973054fc81b2450f1f53695d6979/docs/01-domains/overview.md#d2)） | 要求から計画、実行、評価へのつながり | FMの範囲は維持保全より広く、公開概要だけでは作業粒度を決められない | 機能をつなぐ主軸として採用。既存建物の維持保全へ範囲を限定 |
| 維持保全計画の構成：告示の掲載資料（[D5](https://github.com/tsumasaki-kurageya/bm-knowledge/blob/2c89063a1d7c973054fc81b2450f1f53695d6979/docs/01-domains/overview.md#d5)）、官庁施設資料（[D6](https://github.com/tsumasaki-kurageya/bm-knowledge/blob/2c89063a1d7c973054fc81b2450f1f53695d6979/docs/01-domains/overview.md#d6)） | 体制、点検、修繕、資金、図書等の関係 | 計画の記載項目と、実行する業務領域は同一ではない | 計画・調整・記録の取りこぼし確認に採用 |
| 安全・衛生等の目的別：[BUSINESS-001](https://github.com/tsumasaki-kurageya/bm-knowledge/blob/2c89063a1d7c973054fc81b2450f1f53695d6979/docs/00-business/overview.md) | 必要性と提供価値 | 点検や修繕が複数目的に寄与するため区分が重なる | 領域との多対多の対応に採用 |
| 所有者・PM・FM・BM・専門業者等の主体別 | 依頼・実施・承認の関与 | 自営・委託や契約変更で分類が変わり、業務の抜け・重なりを隠す | 領域の属性にする。主分類には採用しない |

結論として「何のために、どの判断・状態を成立させる機能か」で領域を分ける。機能ごとに実施主体・対象・周期・法定性を重ねる。PM・FM・BM等の呼称だけで、法的責任や契約上の担当を決めない。


元文書：`docs/02-processes/overview.md`

## 初回の詳細化対象

Issue #6では、次の3件を詳細化する。選定基準は、複数の業務・Domainへの接続、実施前後の判断を理解する価値、公開一次資料の本文で確認できる具体性。実測の頻度・過去問い合わせ・訪問Evidenceは未収集であり、優先順位の根拠に使わない。SaaSの機能検討への有用性は期待であり、製品優先度が検証されたわけではない。

| 優先対象 | 選定理由 | 今回具体化する範囲 |
| --- | --- | --- |
| [PROCESS-007：作業条件・停止・利用者調整](https://github.com/tsumasaki-kurageya/bm-knowledge/blob/2c89063a1d7c973054fc81b2450f1f53695d6979/docs/02-processes/work-coordination.md#標準フロー) | 計画・体制・発注と複数の実施業務を接続し、作業開始前の条件を理解できる | 計画、別契約との調整、立会い、承諾・変更の扱い |
| [PROCESS-013：建築・設備の点検と状態評価](https://github.com/tsumasaki-kurageya/bm-knowledge/blob/2c89063a1d7c973054fc81b2450f1f53695d6979/docs/02-processes/inspection.md#標準フロー) | 保守・異常対応・修繕・中長期計画へつながる代表的な状態把握業務 | 定期・臨時点検の一般事項、対象、既知の状態、実施、異常時、判定、報告 |
| [PROCESS-008：依頼・契約に対する履行確認](https://github.com/tsumasaki-kurageya/bm-knowledge/blob/2c89063a1d7c973054fc81b2450f1f53695d6979/docs/02-processes/completion-check.md#標準フロー) | 実施した作業と約束した範囲の照合を、技術的な状態確認から区別できる | 必要資料、確認者、条件との照合、結果と未確認の扱い |

国交省の共通仕様書の本文を標準例とし、適用範囲を各文書に明記した。終了条件・判断・例外・情報／帳票を既存テンプレートの構成に追加し、各段階に根拠または未確認事項を付けた。すべての建物に共通する確定手順ではなく、文書は引き続きdraft / confidence: mediumとする。

異常受付・応急復旧（PROCESS-015・016）、年度・中長期計画（PROCESS-003・004）は、下記の追加対象として詳細化した。緊急度・権限や予算・合意形成の未確定条件は各文書に残している。衛生対策・工事引渡し・非常時の備え（PROCESS-012・018・020）は既存のexploringを維持し、対象別の分割・根拠を先に確認する。今回、Processの分割・統合や新規採番は行わない。


元文書：`docs/02-processes/overview.md`

## 追加の詳細化対象

[Issue #16](https://github.com/tsumasaki-kurageya/bm-knowledge/issues/16)で、初回に続く4業務を具体化した。異常対応から恒久対策へ、日常実績から予算・将来計画へ接続する判断を理解するための選定であり、実測頻度や未収集のEvidenceによる順位付けではない。

| 対象 | 今回の詳細範囲 | 残る主な確認 |
| --- | --- | --- |
| [PROCESS-015：異常受付・影響判断](https://github.com/tsumasaki-kurageya/bm-knowledge/blob/2c89063a1d7c973054fc81b2450f1f53695d6979/docs/02-processes/incident-triage.md#標準フロー) | 情報の受付、既定の連絡、対応判断への引渡し、経過記録 | 緊急度の閾値、応答時間、代替連絡先 |
| [PROCESS-016：応急・復旧調整](https://github.com/tsumasaki-kurageya/bm-knowledge/blob/2c89063a1d7c973054fc81b2450f1f53695d6979/docs/02-processes/incident-restoration.md#標準フロー) | 事前条件、応急支援、復旧調整、再開・残課題の区別 | 操作権限、再開基準、仮復旧、費用条件 |
| [PROCESS-003：年度・日常計画](https://github.com/tsumasaki-kurageya/bm-knowledge/blob/2c89063a1d7c973054fc81b2450f1f53695d6979/docs/02-processes/annual-plan.md#標準フロー) | 対象・実績、年度作業、時期・費用、判断事項、実施との接続 | 予算査定、承認単位、停止調整、繰越 |
| [PROCESS-004：中長期・資金計画](https://github.com/tsumasaki-kurageya/bm-knowledge/blob/2c89063a1d7c973054fc81b2450f1f53695d6979/docs/02-processes/long-term-plan.md#標準フロー) | 図書・状態、工事候補、数量・単価、資金前提、合意・見直し | 所有形態別の合意、概算精度、財源選択 |

国交省の保全委託仕様・官庁施設の計画様式・マンション向け計画の記載例を使い、適用範囲を各文書で限定した。資料にないSLA、復旧保証、共通の決裁・金融判断は追加していない。既存のID・関係を維持し、文書はdraft / confidence: mediumのままとする。実Evidence投入や差分分析はIssue #7・#8で別に扱う。


元文書：`docs/02-processes/overview.md`

## Domainの主要業務との照合

| Domain | 登録した機能のまとまり | 境界・残る論点 |
| --- | --- | --- |
| [DOMAIN-001：要求・適用条件の管理](https://github.com/tsumasaki-kurageya/bm-knowledge/blob/2c89063a1d7c973054fc81b2450f1f53695d6979/docs/01-domains/requirements.md) | 適用条件・要求・変更の整理：PROCESS-002 | 法的要求と任意の利用目標を一つの要求一覧で区別する。個別法令は追加確認 |
| [DOMAIN-002：保全計画・資金計画](https://github.com/tsumasaki-kurageya/bm-knowledge/blob/2c89063a1d7c973054fc81b2450f1f53695d6979/docs/01-domains/planning.md) | 年度・日常計画：PROCESS-003、中長期・資金：PROCESS-004 | 詳細な日程・停止調整はPROCESS-007へ渡す |
| [DOMAIN-003：業務実施体制・発注調整](https://github.com/tsumasaki-kurageya/bm-knowledge/blob/2c89063a1d7c973054fc81b2450f1f53695d6979/docs/01-domains/delivery-coordination.md) | 体制：PROCESS-005、委託：PROCESS-006、作業調整：PROCESS-007、履行確認：PROCESS-008 | 自営のみなら委託発注は不要。資金の方針と実行条件を分ける |
| [DOMAIN-004：運用・維持作業](https://github.com/tsumasaki-kurageya/bm-knowledge/blob/2c89063a1d7c973054fc81b2450f1f53695d6979/docs/01-domains/operations.md) | 運転：PROCESS-009、保守：PROCESS-010、清掃：PROCESS-011、衛生対策：PROCESS-012 | 衛生対策は対象別の分割を検討中 |
| [DOMAIN-005：点検・測定・状態評価](https://github.com/tsumasaki-kurageya/bm-knowledge/blob/2c89063a1d7c973054fc81b2450f1f53695d6979/docs/01-domains/inspection-assessment.md) | 建築・設備の点検：PROCESS-013、環境・衛生の測定：PROCESS-014 | 日常・法定ごとに同じプロセスを重複登録しない |
| [DOMAIN-006：異常・障害対応](https://github.com/tsumasaki-kurageya/bm-knowledge/blob/2c89063a1d7c973054fc81b2450f1f53695d6979/docs/01-domains/incident-response.md) | 受付・影響判断：PROCESS-015、応急・復旧調整：PROCESS-016 | 実際の修理工事はPROCESS-018へ接続 |
| [DOMAIN-007：修繕・更新](https://github.com/tsumasaki-kurageya/bm-knowledge/blob/2c89063a1d7c973054fc81b2450f1f53695d6979/docs/01-domains/repair-renewal.md) | 案の具体化：PROCESS-017、実施・技術的引渡し：PROCESS-018 | 設計・施工・試運転の分割と対象固有要件を追加確認 |
| [DOMAIN-008：危険予防・非常時の備え](https://github.com/tsumasaki-kurageya/bm-knowledge/blob/2c89063a1d7c973054fc81b2450f1f53695d6979/docs/01-domains/risk-preparedness.md) | 予防：PROCESS-019、非常時の計画・訓練：PROCESS-020 | 実際の対応はPROCESS-016。計画と訓練の分割を検討中 |
| [DOMAIN-009：記録・報告・保全評価](https://github.com/tsumasaki-kurageya/bm-knowledge/blob/2c89063a1d7c973054fc81b2450f1f53695d6979/docs/01-domains/records-evaluation.md) | 台帳・引継ぎ：PROCESS-021、報告・追跡：PROCESS-022、全体評価：PROCESS-023 | 各業務の原記録と、情報の集約・引継ぎを区別する |

この照合により全9領域に主要業務が登録された。一方、対象別の網羅性・現場適合は未検証であり、9領域の分類を最終確定したものではない。


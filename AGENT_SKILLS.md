# AI 에이전트 스킬 (Claude Code · Codex 공용)

이 폴더 구조는 Claude Code(`.claude/`)와 Codex(`.agents/`)가 프로젝트를 열 때 자동으로 읽는 스킬입니다.
코드·빌드·테스트에는 영향이 없습니다. 지우려면 아래 폴더를 삭제하면 됩니다.

| 스킬 | 위치 | 출처 |
|---|---|---|
| security-audit (보안 점검) | `.claude/skills/security-audit`, `.agents/skills/security-audit` | cloudflare/security-audit-skill (MIT) |
| impeccable (디자인 점검) | `.claude/skills/impeccable`, `.agents/skills/impeccable`, `.claude/agents/impeccable-*.md`, `.impeccable/config.json` | pbakaus/impeccable (Apache-2.0) |
| ponytail (최소 변경·리뷰) | `.claude/skills/ponytail*` (Codex는 PC 전역 플러그인 사용), 규칙은 `AGENTS.md` | DietrichGebert/ponytail (MIT) |

## 사용법

**보안 점검** (Claude Code 또는 Codex를 이 폴더에서 실행 후)
> security audit this codebase. API 키·시크릿 노출, 카카오 지도 키 사용, 외부 데이터 요청, 사용자 입력·업로드 처리 위주로

- 결과는 저장소 밖 `~/security-audit-skill/<저장소이름>/run-N/REPORT.md`에 저장됩니다(저장소에 쓰지 않음).
- 샌드박스가 없으면 코드를 실행하지 않고 의심 항목은 `needs_validation`으로 남깁니다.

**디자인 점검** (impeccable — 한눈에 웹·모바일 화면용)
```
/impeccable init                         # 처음 1회: PRODUCT.md 작성
/impeccable critique HNE_ACADEMY_PUBLIC_R17_4_MOBILE_DRAG_SHEET.html 모바일 화면
/impeccable audit academy-work/index.html
/impeccable polish <화면 이름>            # 지적 사항 확인 후 수정
```
- 텔레메트리는 `.impeccable/config.json`에서 꺼 두었습니다.
- `scripts/impeccable` 엔진은 처음 실행할 때 GitHub 릴리스에서 내려받고 체크섬을 검증합니다.
- live 모드(Apply)는 승인 없이 CLI를 실행할 수 있으니 쓰지 마세요.

## 안전 메모
- 훅(hook)·settings.json·MCP 설정은 추가하지 않았습니다. 스킬은 직접 호출할 때만 동작합니다.
- ponytail: Codex는 PC 전역 플러그인을 쓰고, Claude Code용 스킬만 저장소에 넣었습니다. 작업 규칙은 `AGENTS.md`(Claude Code는 `CLAUDE.md`가 이를 불러옴)에 있습니다.
- 이 저장소는 공개(GitHub Pages)라서 `AGENTS.md`, `CLAUDE.md`, `AGENT_SKILLS.md`도 사이트에 공개됩니다(키나 비밀 정보는 없음). 점(.)으로 시작하는 `.claude/`, `.agents/`, `.impeccable/` 폴더는 Pages에 올라가지 않습니다.

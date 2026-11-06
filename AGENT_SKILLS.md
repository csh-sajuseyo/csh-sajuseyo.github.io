# AI 에이전트 스킬 (Claude Code · Codex 공용)

이 폴더 구조는 Claude Code(`.claude/`)와 Codex(`.agents/`)가 프로젝트를 열 때 자동으로 읽는 스킬입니다.
코드·빌드·테스트에는 영향이 없습니다. 지우려면 아래 폴더를 삭제하면 됩니다.

| 스킬 | 위치 | 출처 |
|---|---|---|
| impeccable (디자인 점검) | `.claude/skills/impeccable`, `.agents/skills/impeccable`, `.claude/agents/impeccable-*.md`, `.impeccable/config.json` | pbakaus/impeccable (Apache-2.0) |
| ponytail (최소 변경·리뷰) | Codex: PC 전역 플러그인(ponytail@ponytail 5.3.3), Claude Code: `.claude/skills/ponytail*`, 규칙은 `AGENTS.md` | DietrichGebert/ponytail (MIT) |

## 사용법


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
- ponytail: Codex는 PC에 설치한 공식 플러그인(훅 3개 승인됨)으로, Claude Code는 저장소의 `.claude/skills/ponytail*`로 동작합니다. 작업 규칙은 `AGENTS.md`(Claude Code는 `CLAUDE.md`가 이를 불러옴)에 있습니다.
- 이 저장소는 공개(GitHub Pages)라서 `AGENTS.md`, `CLAUDE.md`, `AGENT_SKILLS.md`도 사이트에 공개됩니다(키나 비밀 정보는 없음). 점(.)으로 시작하는 `.claude/`, `.agents/`, `.impeccable/` 폴더는 Pages에 올라가지 않습니다.

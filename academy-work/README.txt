한눈에 학원업무 웹 WORK R14.4 상세시트 부드러운 드래그 보정

GitHub 저장소의 academy-work 폴더에 이 폴더의 파일을 모두 덮어쓰세요.
확인 주소: https://csh-sajuseyo.github.io/academy-work/?app=1440&v=1440
화면 제목 옆 WORK R14.4 표시를 확인하세요.

핵심 변경
- 대국민 R17.4의 부드러운 하단시트 동작을 기준으로 내부업무 상세시트 보정
- 클러스터 목록/학원 상세 드래그 중 MutationObserver가 시트 위치를 다시 스냅하던 충돌 제거
- hne-sheet-dragging 클래스 변화에는 상세 동기화를 실행하지 않고 실제 open/close 변화만 감지
- 상세시트 이동값은 requestAnimationFrame 단위로 합쳐 화면 프레임에 맞춰 transform 적용
- 드래그 종료 직전 마지막 위치를 반영한 뒤 full/half/peek 스냅
- 기본 학원 찾기 검색·필터 시트의 기존 부드러운 드래그는 유지
- 상세 X/Android 뒤로가기는 상세 → 클러스터 목록 → 지도/검색 단계 복귀 유지
- 지도 relayout/invalidateSize를 드래그 도중 반복 호출하지 않음

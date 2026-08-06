# 한눈에 학원업무 Android R2.13

서울특별시남부교육지원청 학원 점검·출장 웹앱을 Android WebView로 실행하는 래퍼 앱입니다.

## R2.13 주요 기능
- 지도 중심 모바일 하단시트 UX
- 검색 → 클러스터 목록 → 학원 상세 단일 활성화 흐름
- Android 뒤로가기 상태 복귀
- 남부 3구 중심 초기 지도와 최소 줌 제한
- 카카오 JavaScript 키 자동 주입
- 위치 권한 위임
- XLSX/XLS/CSV 파일 선택
- 카카오맵·네이버지도·전화 링크 외부 앱 실행
- R2.13 이후 반복 설치용 고정 시험서명

## 빌드
저장소 루트의 GitHub Actions 워크플로를 사용합니다.

```text
.github/workflows/build-hne-android.yml
```

직접 빌드할 때는 Java 17, Android SDK 36, Build Tools 35.0.0, Gradle 8.13이 필요합니다.

## 서명 주의
`app/hne-academy-test-update.keystore`는 내부 설치시험을 위한 고정 시험키입니다. Play Console 배포용으로 사용하지 않습니다.

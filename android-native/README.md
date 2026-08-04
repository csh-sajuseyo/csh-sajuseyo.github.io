# 한눈에 학원업무 Android R2.12

서울특별시남부교육지원청 학원 점검·출장 웹앱을 Android WebView로 실행하는 래퍼 앱입니다.

## 주요 기능
- 카카오 JavaScript 키 자동 주입
- GitHub Pages 운영주소 실행
- 위치 권한 위임
- XLSX/XLS/CSV 파일 선택
- 카카오맵·네이버지도·전화 링크 외부 앱 실행
- Android 뒤로가기 지원

## 빌드
저장소 루트의 GitHub Actions 워크플로를 사용합니다.

```text
.github/workflows/build-hne-android.yml
```

직접 빌드할 때는 Java 17, Android SDK 36, Build Tools 35.0.0, Gradle 8.13이 필요합니다.

## 배포 서명
현재 자동 빌드는 설치 시험용 debug APK/AAB를 만듭니다. Play Console 배포 전에는 별도의 업로드 키를 만들고 release signingConfig를 추가해야 합니다.

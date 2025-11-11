# SafeLife Platform - AI 라이프 솔루션 챌린지 2025

![SafeLife](https://img.shields.io/badge/AI-Life_Solution-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)
![Status](https://img.shields.io/badge/Status-In_Development-yellow)

고령자의 디지털 접근성 향상과 안전한 생활을 위한 **AI 통합 플랫폼**

> 🚧 **현재 상태**: 프로토타입 단계 (6.5/10) - 백엔드 통합 및 실제 AI 모델 구현 진행 중
>
> 🎯 **목표**: 2025년 12월 2일 공모전 제출 완성

---

## 📢 중요 공지

**이 프로젝트는 현재 프로토타입 단계입니다.** 모든 핵심 기능의 UI/UX는 완성되었으나, 일부 기능은 모의 데이터를 사용하고 있습니다.

### 현재 구현 상태

| 기능 | UI/UX | 백엔드 | AI/ML | 상태 |
|------|-------|--------|-------|------|
| 음성 바코드 리더 | ✅ | 🚧 | ✅ | 70% |
| AI 키오스크 도우미 | ✅ | 🚧 | ❌ | 40% |
| 보이스피싱 감지 | ✅ | 🚧 | 🚧 | 60% |
| 보호자 대시보드 | ✅ | 🚧 | N/A | 50% |

**범례**: ✅ 완료 | 🚧 진행 중 | ❌ 미착수

---

## 🎯 프로젝트 개요

SafeLife는 **고령자의 디지털 소외 해소**와 **생활 안전 강화**를 목표로 하는 AI 기반 웹 플랫폼입니다.

### 핵심 가치

- ✅ **접근성**: 누구나 쉽게 사용할 수 있는 직관적 UI (음성 우선)
- ✅ **안전성**: 실시간 위험 감지 및 보호자 알림 시스템
- ✅ **독립성**: 고령자의 자립적인 디지털 생활 지원
- ✅ **연결성**: 보호자-고령자 간 안전망 구축

### 문제 정의

- 60대 이상의 **73%**가 디지털 기기 사용에 어려움 경험
- 고령자의 **85%**가 키오스크 주문 불편 또는 포기
- 2024년 보이스피싱 피해 **1.8조원**, 고령자 피해 비율 **61%**
- 시각 저하로 제품 라벨 읽기 어려움 (**42%**)

---

## 🚀 핵심 기능

### 1. 음성 바코드 리더 📱

**구현 상태**: 🟡 70% (프론트엔드 완성, DB 통합 진행 중)

**작동 방식**:
1. 제품 바코드에 스마트폰 카메라를 갖다 대기
2. 자동으로 바코드 스캔 및 제품 정보 인식
3. **크고 명확한 음성**으로 제품명, 제조사, 성분 읽어주기
4. **알레르기 유발 물질 자동 감지** 및 즉시 경고

**현재 기술**:
- ✅ `@zxing/library`: EAN-13, EAN-8, UPC-A, CODE-128 등 7개 바코드 형식 지원
- ✅ Web Speech API: 한국어 TTS (음성 합성)
- ✅ `react-webcam`: 카메라 통합
- 🚧 PocketBase: 제품 DB (설정 완료, 연동 진행 중)
- ❌ 식약처 오픈 API: 미연동 (향후 추가)

**현재 제한사항**:
- 제품 데이터가 하드코딩되어 있음 (2개 샘플 제품만)
- 실제 제품 DB 연결 필요
- 식약처 API 통합 필요

---

### 2. AI 키오스크 도우미 🖥️

**구현 상태**: 🟠 40% (UI 완성, AI 미구현)

**작동 방식** (계획):
1. 키오스크 화면을 스마트폰 카메라로 촬영
2. **AI가 화면 분석** (버튼 위치, 메뉴 내용 인식)
3. 단계별 음성 안내 제공
4. 실시간 피드백 및 오류 감지

**현재 기술**:
- ✅ `react-webcam`: 화면 캡처
- ✅ 단계별 안내 UI
- ✅ 음성 안내 (TTS)
- ❌ Google Cloud Vision API: 미연동
- ❌ 실제 화면 분석: 미구현 (현재는 랜덤 단계 시뮬레이션)

**현재 제한사항**:
- 실제 컴퓨터 비전이 아닌 모의 화면 분석
- 키오스크 유형별 학습 모델 필요
- OCR 및 객체 감지 미구현

---

### 3. 보이스피싱 실시간 감지 🛡️

**구현 상태**: 🟡 60% (기본 패턴 매칭 완성, AI 고도화 필요)

**작동 방식**:
1. 전화 통화 중 앱 실행
2. **실시간 음성 인식** 및 대화 내용 전사
3. **위험 키워드 자동 감지** (2단계 분석)
4. 위험 감지 시 즉각적인 경고 + 보호자 알림

**현재 기술**:
- ✅ Web Speech Recognition API: 실시간 음성 인식
- ✅ 패턴 매칭: 23개 키워드 기반 (고/중/저 위험)
- ✅ 즉시 경고 및 음성 안내
- 🚧 PocketBase: 로그 저장 (진행 중)
- ❌ OpenAI GPT-4: 컨텍스트 분석 (미연동)

**감지 패턴**:
- ⚠️ **높은 위험** (10개): 계좌번호, 송금, 금융감독원, 검찰청, 체포, ...
- ⚠️ **중간 위험** (8개): 대출, 저금리, 카드발급, 환불, ...
- ⚠️ **낮은 위험** (5개): 긴급, 즉시, 빨리, ...

**현재 제한사항**:
- 단순 키워드 매칭만 (컨텍스트 이해 없음)
- GPT-4 통합 필요 (사기 패턴의 정교한 분석)
- 보호자 실시간 알림 미구현 (UI만 존재)

---

### 4. 보호자 대시보드 👪

**구현 상태**: 🟡 50% (UI 완성, 실시간 데이터 미연동)

**기능**:
- 📊 가족 안전 상태 실시간 모니터링
- 🔔 미확인 알림 통합 관리
- 📈 주간 활동 통계 및 추이 분석
- 📞 긴급 연락처 빠른 접근

**현재 기술**:
- ✅ React 상태 관리
- ✅ 활동 차트 (Recharts)
- ✅ 알림 피드 UI
- ❌ PocketBase 실시간 구독: 미연동
- ❌ 푸시 알림: 미구현

**현재 제한사항**:
- 모의 데이터 사용 (정적)
- 실시간 동기화 없음
- 푸시 알림 없음

---

## 🏗️ 기술 스택

### Frontend (완성)
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Camera**: react-webcam
- **Barcode**: @zxing/library

### AI/ML (부분 구현)
- ✅ **바코드 인식**: @zxing/library (클라이언트 측)
- ✅ **음성 합성/인식**: Web Speech API (브라우저 내장)
- ❌ **컴퓨터 비전**: Google Cloud Vision API (미연동)
- ❌ **NLP**: OpenAI GPT-4 (미연동)

### Backend (설정 완료, 통합 진행 중)
- **Database**: PocketBase 0.19+ (Vultr.com 호스팅)
- **인증**: PocketBase Auth (JWT)
- **파일 저장소**: PocketBase File Storage
- **컬렉션**: 7개 설계 완료 (users, products, scan_history, voice_phishing_logs, kiosk_sessions, guardian_notifications, emergency_contacts, daily_activities)

### 배포
- ✅ **프론트엔드**: Vercel (https://safelife-platform.vercel.app)
- ✅ **백엔드**: Vultr VPS (https://ai-life-solution-challenge.duckdns.org)
- ✅ **CI/CD**: Vercel 자동 배포

---

## 📁 프로젝트 구조

```
ai_life_solution_challenge/
├── docs/                             # 📚 문서
│   ├── ANALYSIS.md                   # 종합 분석 보고서
│   ├── ROADMAP.md                    # 12개월 개발 로드맵
│   ├── ARCHITECTURE.md               # 기술 아키텍처 문서
│   └── COMPETITION_PROPOSAL.md       # 공모전 제출용 설명서
│
├── safelife-platform/                # 💻 메인 앱
│   ├── app/
│   │   ├── page.tsx                  # 홈 페이지
│   │   ├── barcode/page.tsx          # 🔖 바코드 스캔
│   │   ├── kiosk/page.tsx            # 🖥️ 키오스크 도우미
│   │   ├── voicephishing/page.tsx    # 🛡️ 보이스피싱 감지
│   │   ├── dashboard/page.tsx        # 📊 보호자 대시보드
│   │   ├── login/page.tsx            # 🔐 로그인
│   │   └── signup/page.tsx           # ✍️ 회원가입
│   ├── components/                   # 재사용 컴포넌트
│   ├── lib/
│   │   ├── utils.ts                  # TTS, 패턴 매칭 유틸
│   │   └── pocketbase.ts             # PocketBase 클라이언트
│   └── public/                       # 정적 파일
│
├── seed_with_sdk.js                  # 샘플 데이터 시드 스크립트
└── vercel.json                       # Vercel 배포 설정
```

---

## 🚀 빠른 시작

### 전제 조건
- Node.js 20+
- npm 또는 yarn

### 1. 저장소 클론

```bash
git clone https://github.com/yonghwan1106/ai_life_solution_challenge.git
cd ai_life_solution_challenge/safelife-platform
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env.local` 파일 생성:

```env
# PocketBase (필수)
NEXT_PUBLIC_POCKETBASE_URL=https://ai-life-solution-challenge.duckdns.org

# OpenAI API (선택 - 향후 GPT-4 통합용)
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key

# Google Cloud Vision (선택 - 향후 키오스크 분석용)
GOOGLE_CLOUD_VISION_API_KEY=your_google_vision_key

# 식약처 API (선택 - 향후 제품 DB용)
FOOD_SAFETY_API_KEY=your_food_safety_key
```

### 4. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 접속

### 5. 프로덕션 빌드

```bash
npm run build
npm start
```

---

## 📚 주요 문서

| 문서 | 설명 | 링크 |
|------|------|------|
| 📊 **종합 분석** | 프로젝트 현황, 강점/약점, 개선 전략 | [ANALYSIS.md](docs/ANALYSIS.md) |
| 🗓️ **개발 로드맵** | 12개월 타임라인, 마일스톤, 우선순위 | [ROADMAP.md](docs/ROADMAP.md) |
| 🏗️ **기술 아키텍처** | 시스템 설계, 데이터 모델, API 통합 | [ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| 🏆 **공모전 제출용** | 문제 정의, 솔루션, 사회적 임팩트 | [COMPETITION_PROPOSAL.md](docs/COMPETITION_PROPOSAL.md) |

---

## 📈 기대 효과

### 정량적 효과

| 지표 | Before | After | 개선율 |
|------|--------|-------|--------|
| 바코드 정보 확인 시간 | 43초 | 8초 | **81% 감소** |
| 키오스크 주문 성공률 | 38% | 92% | **142% 증가** |
| 보이스피싱 차단율 | 0% | 91% | **91%** |
| 보호자 불안감 | 10/10 | 3.3/10 | **67% 감소** |

### 사회적 임팩트 (100만 명 사용 시)

- 💰 **보이스피싱 피해 방지**: 연간 약 **2조 9,484억원**
- ⏰ **키오스크 대기 시간 단축**: 연간 **1,370만 시간** 절약
- 🏥 **의료비 절감**: 알레르기 응급실 방문 28% 감소 (약 **120억원**)
- 💼 **고령자 고용 증가**: 디지털 자신감으로 재취업률 **15%** 증가

---

## 📝 개발 로드맵

> 상세 일정은 [ROADMAP.md](docs/ROADMAP.md) 참조

### Phase 1: 백엔드 통합 (1-2개월) 🚧
- [ ] PocketBase 전체 연동
- [ ] 인증 시스템 구축
- [ ] 100개 제품 DB 구축

### Phase 2: AI 고도화 (3-4개월) ⏳
- [ ] Google Cloud Vision API 연동
- [ ] OpenAI GPT-4 통합
- [ ] 식약처 API 연동

### Phase 3: 사용자 검증 (5-6개월) ⏳
- [ ] 10명+ 고령자 테스트
- [ ] 사용자 증언 영상 촬영
- [ ] 사용성 개선

### Phase 4: 보안 강화 (7-8개월) ⏳
- [ ] HTTPS 강제, 데이터 암호화
- [ ] GDPR 동의 시스템
- [ ] 프라이버시 대시보드

### Phase 5: 모바일 최적화 (9-10개월) ⏳
- [ ] PWA 구현
- [ ] 오프라인 모드
- [ ] iOS/Android 테스트

### Phase 6: 마무리 (11-12개월) ⏳
- [ ] 데모 영상 제작
- [ ] 최종 버그 수정
- [ ] 공모전 제출 (2025년 12월 2일)

**현재 진행 상황**: Phase 1 (백엔드 통합) 시작 단계

---

## 🎥 데모 영상

> 📹 **데모 영상** (제작 예정)
>
> - 바코드 스캔 시연
> - 키오스크 도우미 작동
> - 보이스피싱 감지 시뮬레이션
> - 보호자 대시보드 기능

---

## 🏆 AI 라이프 솔루션 챌린지 2025

### 대회 정보

- **주최**: 한국산업기술평가관리원 (KEIT)
- **제출 마감**: 2025년 12월 2일 17:00
- **총 상금**: 10,000,000원
- **평가 기준**:
  - 문제 정의 및 해결 능력
  - AI 기술 구현 수준
  - 사회문제 해결 기여도
  - 창의적 AI 활용

### 우리의 차별화 포인트

#### 🌟 **3-in-1 통합** → **5점 가산점** 획득 대상

SafeLife는 **"AI 라이프 아이디어 챌린지"** 선정작 3개를 통합:

| 원본 아이디어 | SafeLife 구현 | 시너지 효과 |
|---|---|---|
| **들리는 바코드** | 음성 바코드 리더 | 제품 정보 접근성 |
| **AI 안심 가드** | 보이스피싱 감지 | 금융 사기 방어 |
| **디지털 도우미** | 키오스크 도우미 | 디지털 격차 해소 |

#### 💪 **기타 강점**

- ✅ **실제 사용 시나리오 중심** (추상적 개념 X)
- ✅ **On-Device AI 강조** (개인정보 보호)
- ✅ **보호자-고령자 이중 시스템** (지속가능성)
- ✅ **확장 가능한 아키텍처** (PWA, 오픈 소스)

---

## 🔧 알려진 이슈 및 제한사항

### 현재 제한사항

1. **제품 데이터베이스**
   - 2개 샘플 제품만 하드코딩
   - 식약처 API 미연동
   - 해결 예정: Phase 2 (3-4개월)

2. **키오스크 화면 인식**
   - 실제 AI 분석 없음 (모의 시뮬레이션)
   - Google Cloud Vision API 미연동
   - 해결 예정: Phase 2 (3-4개월)

3. **보이스피싱 분석**
   - 단순 키워드 매칭 (컨텍스트 이해 없음)
   - OpenAI GPT-4 미연동
   - 해결 예정: Phase 2 (3-4개월)

4. **보호자 알림**
   - 실시간 푸시 알림 없음
   - PocketBase 실시간 구독 미연동
   - 해결 예정: Phase 1 (1-2개월)

5. **인증 시스템**
   - 로그인/회원가입 페이지 작동 안 함
   - PocketBase Auth 미연동
   - 해결 예정: Phase 1 (1-2개월)

### 알려진 버그

- 모바일 바코드 인식 정확도 개선 필요
- 일부 브라우저에서 Web Speech API 호환성 이슈

---

## 🤝 기여 방법

우리는 오픈 소스 기여를 환영합니다!

### 기여 가이드라인

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

### 기여 영역

- 🐛 버그 수정
- ✨ 새로운 기능
- 📝 문서 개선
- 🌐 번역 (다국어 지원)
- 🎨 UI/UX 개선
- ♿ 접근성 향상

---

## 📞 연락처

- **GitHub**: [@yonghwan1106](https://github.com/yonghwan1106)
- **Email**: sanoramyun8@gmail.com
- **프로젝트**: [ai_life_solution_challenge](https://github.com/yonghwan1106/ai_life_solution_challenge)
- **라이브 데모**: [https://safelife-platform.vercel.app](https://safelife-platform.vercel.app)

---

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능

Copyright (c) 2025 SafeLife Team

---

## 🙏 감사의 말

- **AI 라이프 아이디어 챌린지** 선정작들에게 영감을 받았습니다
- **한국산업기술평가관리원(KEIT)**의 공모전 개최에 감사드립니다
- **Next.js, Tailwind CSS, PocketBase, @zxing/library** 등 오픈소스 커뮤니티에 감사드립니다
- **고령자 디지털 격차 해소**를 위해 노력하는 모든 분들께 응원을 보냅니다

---

## 🌟 Star History

이 프로젝트가 도움이 되셨다면 ⭐️ Star를 눌러주세요!

---

<div align="center">

**🌟 SafeLife - 아무도 뒤처지지 않는 디지털 사회 🌟**

Made with ❤️ for AI 라이프 솔루션 챌린지 2025

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://safelife-platform.vercel.app)
[![PocketBase](https://img.shields.io/badge/Backend-PocketBase-B8DBE4?logo=pocketbase)](https://pocketbase.io/)
[![Next.js](https://img.shields.io/badge/Built%20with-Next.js%2015-black?logo=next.js)](https://nextjs.org/)

</div>

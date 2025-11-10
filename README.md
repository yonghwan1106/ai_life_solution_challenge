# SafeLife Platform - AI 라이프 솔루션 챌린지 2025

![SafeLife](https://img.shields.io/badge/AI-Life_Solution-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)

고령자의 디지털 접근성 향상과 안전한 생활을 위한 **AI 통합 플랫폼**

---

## 🎯 프로젝트 개요

SafeLife는 **고령자의 디지털 소외 해소**와 **생활 안전 강화**를 목표로 하는 AI 기반 웹 플랫폼입니다.

### 핵심 가치

- ✅ **접근성**: 누구나 쉽게 사용할 수 있는 직관적 UI
- ✅ **안전성**: 실시간 위험 감지 및 보호자 알림
- ✅ **독립성**: 고령자의 자립적인 디지털 생활 지원
- ✅ **연결성**: 보호자-고령자 간 안전망 구축

---

## 🚀 핵심 기능

### 1. 음성 바코드 리더 📱

**문제**: 시각장애인과 고령자가 식품 정보를 확인하기 어려움

**해결책**:
- 📷 바코드 스캔 (html5-qrcode)
- 🔊 제품 정보 음성 안내 (Web Speech API TTS)
- ⚠️ 알레르기 성분 자동 경고
- 🗣️ "다시 듣기" 기능

**기술 스택**:
- `html5-qrcode`: 바코드/QR코드 인식
- Web Speech API: 음성 합성
- 식약처 공공 DB 연동 (계획)

---

### 2. AI 키오스크 도우미 🖥️

**문제**: 고령자의 85%가 키오스크 사용에 어려움을 겪음

**해결책**:
- 📸 실시간 화면 인식 (Webcam)
- 🎯 단계별 음성 안내
- 📊 진행 상황 시각화
- 🔄 분석 기록 저장

**기술 스택**:
- `react-webcam`: 화면 캡처
- Computer Vision API (계획): 키오스크 UI 분석
- 단계별 안내 알고리즘

---

### 3. 보이스피싱 실시간 감지 🛡️

**문제**: 2024년 보이스피싱 피해액 1.8조원, 고령자 집중 피해

**해결책**:
- 🎤 통화 내용 실시간 분석 (Web Speech API STT)
- 🚨 위험 키워드 자동 감지
- 📢 즉시 경고 알림
- 👨‍👩‍👧 높은 위험 시 보호자 자동 통지

**기술 스택**:
- Web Speech Recognition API: 음성 인식
- 패턴 매칭 알고리즘: 위험 키워드 탐지
- NLP (계획): OpenAI GPT-4 기반 문맥 분석

**감지 패턴**:
- ⚠️ **높은 위험**: 계좌번호, 송금, 금융감독원, 검찰청, 체포
- ⚠️ **중간 위험**: 대출, 저금리, 카드발급, 환불
- ⚠️ **낮은 위험**: 긴급, 즉시, 빨리

---

### 4. 보호자 대시보드 👪

**문제**: 떨어져 사는 부모님의 안전 상태 파악 어려움

**해결책**:
- 📊 가족 안전 상태 실시간 모니터링
- 🔔 미확인 알림 통합 관리
- 📈 주간 활동 통계 및 추이 분석
- 📞 긴급 연락처 빠른 접근

**주요 지표**:
- 마지막 활동 시간
- 위험 수준 (안전/주의/위험)
- 기능별 사용 빈도
- 이상 행동 패턴 감지

---

## 🏗️ 기술 스택

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React

### AI/ML
- **Barcode Scanner**: html5-qrcode, @zxing/library
- **Camera**: react-webcam
- **Speech**: Web Speech API (TTS/STT)
- **Vision** (계획): Google Cloud Vision API
- **NLP** (계획): OpenAI GPT-4

### Backend (계획)
- **Database**: PocketBase or Supabase
- **APIs**: 식약처 공공 DB, 금융감독원 사기 DB

---

## 📁 프로젝트 구조

```
safelife-platform/
├── app/
│   ├── page.tsx                 # 메인 페이지
│   ├── barcode/page.tsx         # 바코드 스캔 페이지
│   ├── kiosk/page.tsx           # 키오스크 도우미 페이지
│   ├── voicephishing/page.tsx   # 보이스피싱 감지 페이지
│   └── dashboard/page.tsx       # 보호자 대시보드 페이지
├── components/                  # 재사용 컴포넌트
├── lib/
│   ├── utils.ts                 # 유틸리티 함수 (TTS, 패턴 감지)
│   └── pocketbase.ts            # DB 클라이언트
├── types/
│   └── index.ts                 # TypeScript 타입 정의
└── public/                      # 정적 파일
```

---

## 🚀 빠른 시작

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
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090
GOOGLE_CLOUD_VISION_API_KEY=your_google_vision_key
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

## 📊 기대 효과

### 사회적 영향

| 지표 | 기대 효과 |
|------|-----------|
| 디지털 접근성 | 30% 향상 |
| 보이스피싱 피해 | 50% 감소 |
| 키오스크 사용 불편 | 70% 해소 |
| 고령자 독립성 | 40% 증가 |

### 경제적 가치

- 보이스피싱 피해 예방: 연간 약 **9,000억원** 절감 가능
- 디지털 소외 해소: GDP **0.3%** 기여 예상
- 돌봄 비용 절감: 가구당 연간 **300만원** 절약

---

## 🎥 데모 영상

> 📹 **[데모 영상 보기](링크 추가 예정)**
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
- **총 상금**: 1,000만원
- **평가 기준**:
  - 문제 정의 및 해결 능력
  - AI 기술 구현 수준
  - 사회문제 해결 기여도
  - 창의적 AI 활용

### 차별화 포인트

✅ **3개 수상 아이디어 통합** → **5점 가점** 획득
- 들리는 바코드 (시각장애인)
- AI 안심 가드 (보이스피싱 방지)
- 고령자 키오스크 도우미

✅ **실제 사용 시나리오 중심** (추상적 개념 X)
✅ **On-Device AI 강조** (개인정보 보호)
✅ **보호자-고령자 이중 시스템** (지속가능성)
✅ **공공 DB 연계** (식약처, 금감원)

---

## 📝 개발 로드맵

### Phase 1: MVP (완료) ✅
- [x] 4가지 핵심 기능 구현
- [x] 반응형 UI/UX
- [x] Web Speech API 통합
- [x] 바코드/QR 스캔

### Phase 2: AI 고도화 (진행 중) 🔄
- [ ] Google Cloud Vision API 연동
- [ ] OpenAI GPT-4 문맥 분석
- [ ] On-Device AI 모델 (TensorFlow Lite)
- [ ] 실제 식약처 DB 연동

### Phase 3: 프로덕션 (계획) 📅
- [ ] PocketBase/Supabase 데이터베이스
- [ ] 사용자 인증 시스템
- [ ] 푸시 알림 (보호자)
- [ ] 사용 데이터 분석

### Phase 4: 확장 (계획) 🚀
- [ ] 모바일 앱 (React Native)
- [ ] 지자체/복지센터 연계
- [ ] B2B2C 비즈니스 모델
- [ ] 다국어 지원

---

## 🤝 기여 방법

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능

---

## 📞 문의

- **GitHub**: [yonghwan1106](https://github.com/yonghwan1106)
- **Email**: yonghwan1106@example.com
- **프로젝트 링크**: [https://github.com/yonghwan1106/ai_life_solution_challenge](https://github.com/yonghwan1106/ai_life_solution_challenge)

---

## 🙏 감사의 말

- AI 라이프 아이디어 챌린지 선정작들에게 영감을 받았습니다
- Next.js, Tailwind CSS, html5-qrcode 등 오픈소스 커뮤니티에 감사드립니다
- 고령자 디지털 격차 해소를 위해 노력하는 모든 분들께 응원을 보냅니다

---

<div align="center">

**🌟 SafeLife - 모두를 위한 안전하고 편리한 디지털 세상 🌟**

Made with ❤️ for AI 라이프 솔루션 챌린지 2025

</div>

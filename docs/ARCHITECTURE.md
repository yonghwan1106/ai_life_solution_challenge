# SafeLife 플랫폼 기술 아키텍처

> 고령자를 위한 AI 기반 디지털 접근성 플랫폼의 기술 설계
>
> 버전: 1.0
> 작성일: 2025년 11월 11일

---

## 목차

1. [시스템 개요](#1-시스템-개요)
2. [프론트엔드 아키텍처](#2-프론트엔드-아키텍처)
3. [백엔드 아키텍처](#3-백엔드-아키텍처)
4. [데이터 모델](#4-데이터-모델)
5. [AI/ML 파이프라인](#5-aiml-파이프라인)
6. [API 통합](#6-api-통합)
7. [보안 아키텍처](#7-보안-아키텍처)
8. [배포 전략](#8-배포-전략)
9. [확장성 고려사항](#9-확장성-고려사항)
10. [모니터링 및 로깅](#10-모니터링-및-로깅)

---

## 1. 시스템 개요

### 1.1 아키텍처 다이어그램

```
┌─────────────────────────────────────────────────────────┐
│                     사용자 계층                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  고령자 앱   │  │  보호자 앱   │  │   관리자     │  │
│  │  (PWA/Web)   │  │  (PWA/Web)   │  │   대시보드   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                           │
                           │ HTTPS
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   API 게이트웨이 (Next.js)               │
│                    App Router + RSC                      │
└─────────────────────────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  PocketBase  │  │    AI 서비스   │  │  외부 API    │
│  (백엔드 DB)  │  │  (GPT-4,      │  │  (식약처,    │
│              │  │   Vision API)  │  │   금감원)    │
└──────────────┘  └──────────────┘  └──────────────┘
```

### 1.2 기술 스택

#### 프론트엔드
- **프레임워크**: Next.js 15.0.0 (App Router)
- **언어**: TypeScript 5.x
- **스타일링**: Tailwind CSS 3.4
- **상태 관리**: React Server Components + Client Components
- **UI 컴포넌트**: 커스텀 컴포넌트 (Shadcn/ui 기반)
- **브라우저 API**: Web Speech API, MediaDevices API, Web Audio API

#### 백엔드
- **BaaS**: PocketBase 0.19+
- **데이터베이스**: SQLite (PocketBase 내장)
- **인증**: PocketBase Auth (JWT 기반)
- **파일 스토리지**: PocketBase File Storage

#### AI/ML
- **NLP**: OpenAI GPT-4 (보이스피싱 컨텍스트 분석)
- **컴퓨터 비전**: Google Cloud Vision API (키오스크 화면 인식)
- **바코드 인식**: @zxing/library (클라이언트 측)
- **음성 처리**: Web Speech API (브라우저 내장)

#### 배포 및 인프라
- **호스팅**: Vercel (프론트엔드)
- **데이터베이스 호스팅**: Vultr.com (PocketBase)
- **CDN**: Vercel Edge Network
- **도메인**: DuckDNS (ai-life-solution-challenge.duckdns.org)

---

## 2. 프론트엔드 아키텍처

### 2.1 Next.js App Router 구조

```
app/
├── (auth)/
│   ├── login/
│   │   └── page.tsx          # 로그인 페이지
│   └── signup/
│       └── page.tsx          # 회원가입 페이지
│
├── (features)/
│   ├── barcode/
│   │   └── page.tsx          # 음성 바코드 리더
│   ├── kiosk/
│   │   └── page.tsx          # AI 키오스크 도우미
│   ├── voicephishing/
│   │   └── page.tsx          # 보이스피싱 감지
│   └── dashboard/
│       └── page.tsx          # 보호자 대시보드
│
├── layout.tsx                # 루트 레이아웃
├── page.tsx                  # 홈 페이지
└── about/
    └── page.tsx              # 소개 페이지
```

### 2.2 컴포넌트 구조

```
components/
├── features/
│   ├── barcode/
│   │   ├── BarcodeScanner.tsx
│   │   ├── ProductInfo.tsx
│   │   └── AllergenWarning.tsx
│   ├── kiosk/
│   │   ├── ScreenCapture.tsx
│   │   ├── StepGuide.tsx
│   │   └── VoiceInstructions.tsx
│   ├── voicephishing/
│   │   ├── VoiceRecorder.tsx
│   │   ├── RiskIndicator.tsx
│   │   └── PatternMatcher.tsx
│   └── dashboard/
│       ├── StatusCard.tsx
│       ├── AlertFeed.tsx
│       └── ActivityChart.tsx
│
└── ui/
    ├── Button.tsx
    ├── Card.tsx
    ├── Badge.tsx
    └── Alert.tsx
```

### 2.3 상태 관리 전략

#### 클라이언트 컴포넌트 (useState/useEffect)
```typescript
// 로컬 UI 상태
const [isScanning, setIsScanning] = useState(false)
const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('low')
```

#### 서버 컴포넌트 (RSC)
```typescript
// 서버에서 데이터 페칭
async function DashboardPage() {
  const user = await getCurrentUser()
  const activities = await getDailyActivities(user.id)

  return <ActivityChart data={activities} />
}
```

#### PocketBase 실시간 구독
```typescript
pb.collection('guardian_notifications').subscribe('*', (e) => {
  if (e.record.guardian === guardianId) {
    showNotification(e.record)
  }
})
```

### 2.4 성능 최적화

#### 코드 분할
```typescript
// 동적 import로 번들 크기 최소화
const BarcodeScanner = dynamic(() => import('@/components/features/barcode/BarcodeScanner'), {
  ssr: false,
  loading: () => <p>스캐너 로딩 중...</p>
})
```

#### 이미지 최적화
```typescript
import Image from 'next/image'

<Image
  src="/product.jpg"
  alt="제품"
  width={300}
  height={300}
  priority
  placeholder="blur"
/>
```

#### 폰트 최적화
```typescript
import { Geist } from 'next/font/google'

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
})
```

---

## 3. 백엔드 아키텍처

### 3.1 PocketBase 구조

```
PocketBase Instance (https://ai-life-solution-challenge.duckdns.org)
│
├── Collections/
│   ├── users (auth)
│   ├── products
│   ├── scan_history
│   ├── voice_phishing_logs
│   ├── kiosk_sessions
│   ├── guardian_notifications
│   ├── emergency_contacts
│   └── daily_activities
│
├── Files/
│   ├── product_images/
│   ├── kiosk_screenshots/
│   └── user_avatars/
│
└── Auth/
    ├── Email/Password
    ├── OAuth (선택)
    └── JWT Tokens
```

### 3.2 API 엔드포인트

#### 인증
```http
POST   /api/collections/users/records              # 회원가입
POST   /api/collections/users/auth-with-password   # 로그인
POST   /api/collections/users/auth-refresh         # 토큰 갱신
POST   /api/collections/users/request-verification # 이메일 인증
```

#### 제품
```http
GET    /api/collections/products/records           # 제품 목록
GET    /api/collections/products/records/:id       # 제품 상세
POST   /api/collections/products/records           # 제품 생성 (관리자)
PATCH  /api/collections/products/records/:id       # 제품 수정
DELETE /api/collections/products/records/:id       # 제품 삭제
```

#### 스캔 이력
```http
GET    /api/collections/scan_history/records       # 스캔 이력 목록
POST   /api/collections/scan_history/records       # 스캔 기록 저장
GET    /api/collections/scan_history/records/:id   # 스캔 상세
```

#### 보이스피싱 로그
```http
GET    /api/collections/voice_phishing_logs/records    # 로그 목록
POST   /api/collections/voice_phishing_logs/records    # 로그 생성
PATCH  /api/collections/voice_phishing_logs/records/:id # 로그 업데이트
```

#### 보호자 알림
```http
GET    /api/collections/guardian_notifications/records # 알림 목록
POST   /api/collections/guardian_notifications/records # 알림 생성
PATCH  /api/collections/guardian_notifications/records/:id # 읽음 처리
```

### 3.3 실시간 기능

```typescript
// WebSocket 구독 (PocketBase Realtime)
pb.collection('guardian_notifications').subscribe('*', (data) => {
  console.log('New notification:', data.action, data.record)
})

// 특정 사용자의 알림만 필터링
pb.collection('guardian_notifications').subscribe('*', (data) => {
  if (data.record.guardian === currentUser.id) {
    // 알림 표시
  }
}, {
  filter: `guardian="${currentUser.id}"`
})
```

---

## 4. 데이터 모델

### 4.1 Users (인증 컬렉션)

```typescript
interface User {
  id: string                    // auto
  email: string                 // unique
  emailVisibility: boolean
  verified: boolean
  name: string
  avatar?: string               // file
  role: 'elderly' | 'guardian'
  phone?: string
  birthdate?: string
  address?: string
  guardians?: string[]          // relation (users)
  created: string               // auto
  updated: string               // auto
}
```

**규칙 (Rules)**:
- Create: 누구나 가능
- Read: 본인 + 연결된 보호자
- Update: 본인만
- Delete: 본인 + 관리자

### 4.2 Products

```typescript
interface Product {
  id: string
  barcode: string               // unique, indexed
  name: string
  brand?: string
  category: 'food' | 'medicine' | 'cosmetic' | 'other'
  description?: string          // rich text
  ingredients?: any             // JSON
  allergens?: string[]          // multi-select
  expiry_date?: string
  warnings?: string             // rich text
  image?: string                // file
  created: string
  updated: string
}
```

**인덱스**:
- barcode (unique)
- category

### 4.3 Scan History

```typescript
interface ScanHistory {
  id: string
  user: string                  // relation (users)
  product: string               // relation (products)
  barcode: string
  scan_type: 'barcode' | 'ocr' | 'manual'
  location?: string
  tts_played: boolean
  created: string
  updated: string
}
```

**인덱스**:
- user
- created (desc)

### 4.4 Voice Phishing Logs

```typescript
interface VoicePhishingLog {
  id: string
  user: string                  // relation (users)
  transcript: string            // rich text
  risk_level: 'low' | 'medium' | 'high'
  detected_patterns: string[]   // JSON
  caller_info?: any             // JSON
  duration?: number             // seconds
  guardian_notified: boolean
  is_blocked: boolean
  user_action: 'none' | 'reported' | 'blocked' | 'ignored'
  created: string
  updated: string
}
```

**인덱스**:
- user
- risk_level
- created (desc)

### 4.5 Kiosk Sessions

```typescript
interface KioskSession {
  id: string
  user: string                  // relation (users)
  kiosk_type: 'fastfood' | 'cafe' | 'ticket' | 'payment' | 'other'
  location?: string
  screenshot?: string[]         // files (multiple)
  steps_completed?: any         // JSON
  duration?: number             // seconds
  success: boolean
  help_requested: boolean
  created: string
  updated: string
}
```

### 4.6 Guardian Notifications

```typescript
interface GuardianNotification {
  id: string
  guardian: string              // relation (users)
  elderly_user: string          // relation (users)
  notification_type: 'voice_phishing' | 'unusual_activity' | 'emergency' | 'daily_summary'
  title: string
  message: string               // rich text
  priority: 'low' | 'medium' | 'high' | 'urgent'
  related_log?: string          // relation (voice_phishing_logs)
  is_read: boolean
  read_at?: string
  created: string
  updated: string
}
```

**인덱스**:
- guardian
- is_read
- priority
- created (desc)

### 4.7 Emergency Contacts

```typescript
interface EmergencyContact {
  id: string
  user: string                  // relation (users)
  name: string
  relationship?: string
  phone: string
  email?: string
  priority?: number             // 1 = highest
  is_primary: boolean
  created: string
  updated: string
}
```

**인덱스**:
- user
- priority

### 4.8 Daily Activities

```typescript
interface DailyActivity {
  id: string
  user: string                  // relation (users)
  date: string                  // YYYY-MM-DD, unique per user
  barcode_scans: number
  kiosk_uses: number
  voice_phishing_detections: number
  active_time: number           // seconds
  health_score: number          // 0-100
  summary?: string              // rich text
  created: string
  updated: string
}
```

**인덱스**:
- user + date (unique)
- date (desc)

---

## 5. AI/ML 파이프라인

### 5.1 바코드 인식 파이프라인

```
┌─────────────┐
│  카메라 입력  │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  react-webcam   │
│  (실시간 스트림)  │
└──────┬──────────┘
       │
       ▼
┌─────────────────────┐
│  @zxing/library     │
│  (BrowserMultiFormat│
│   Reader)           │
└──────┬──────────────┘
       │
       ▼ (바코드 번호)
┌─────────────────────┐
│  PocketBase Query   │
│  products 컬렉션     │
└──────┬──────────────┘
       │
       ├─ 있음 ──────► 제품 정보 + 알레르기 경고
       │
       └─ 없음 ──────► 식약처 API 호출
                       │
                       ├─ 성공 ► DB 저장 + 정보 표시
                       └─ 실패 ► 수동 입력 안내
```

**구현**:
```typescript
const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null)

// 바코드 포맷 힌트 설정
const hints = new Map()
hints.set(DecodeHintType.POSSIBLE_FORMATS, [
  BarcodeFormat.EAN_13,
  BarcodeFormat.EAN_8,
  BarcodeFormat.UPC_A,
  BarcodeFormat.CODE_128
])
hints.set(DecodeHintType.TRY_HARDER, true)

codeReaderRef.current = new BrowserMultiFormatReader(hints)

// 스캔 루프
const scanBarcode = async () => {
  const result = await codeReaderRef.current.decodeFromVideoDevice(
    undefined,
    videoElement,
    (result, error) => {
      if (result) {
        handleBarcodeDetected(result.getText())
      }
    }
  )
}
```

### 5.2 키오스크 화면 인식 파이프라인

```
┌─────────────┐
│  카메라 입력  │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  react-webcam   │
│  screenshot()   │
└──────┬──────────┘
       │
       ▼ (base64 이미지)
┌───────────────────────┐
│  Google Cloud Vision  │
│  OCR + Object Detection│
└──────┬────────────────┘
       │
       ▼ (텍스트 + 위치 정보)
┌──────────────────┐
│  분석 엔진        │
│  - 버튼 식별      │
│  - 텍스트 이해    │
│  - 다음 단계 결정 │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  음성 안내        │
│  (Web Speech TTS) │
└──────────────────┘
```

**구현 (예정)**:
```typescript
// 화면 캡처
const captureScreen = async () => {
  const imageSrc = webcamRef.current?.getScreenshot()

  // Google Cloud Vision API 호출
  const response = await fetch('/api/analyze-kiosk', {
    method: 'POST',
    body: JSON.stringify({ image: imageSrc })
  })

  const analysis = await response.json()

  // 다음 단계 결정
  const nextStep = determineNextStep(analysis, currentState)

  // 음성 안내
  speak(nextStep.instruction)
}
```

### 5.3 보이스피싱 감지 파이프라인

```
┌─────────────┐
│  마이크 입력  │
└──────┬──────┘
       │
       ▼
┌──────────────────────┐
│  Web Speech API      │
│  (continuous=true)   │
└──────┬───────────────┘
       │
       ▼ (실시간 전사)
┌──────────────────────┐
│  키워드 매칭 (Stage 1)│
│  - 고위험 패턴 10개   │
│  - 중위험 패턴 8개    │
│  - 저위험 패턴 5개    │
└──────┬───────────────┘
       │
       ├─ 위험 감지 ────► 즉시 경고
       │
       └─ 의심 케이스 ──► GPT-4 컨텍스트 분석
                          │
                          ▼
                    ┌──────────────┐
                    │  OpenAI GPT-4│
                    │  프롬프트:    │
                    │  "이 대화는   │
                    │  사기인가?"   │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  위험도 판정  │
                    │  + 설명      │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  보호자 알림  │
                    │  + DB 저장   │
                    └──────────────┘
```

**구현**:
```typescript
// 키워드 매칭 (빠른 스크리닝)
const analyzeTranscript = (transcript: string): RiskLevel => {
  const highRiskKeywords = ['계좌번호', '송금', '금융감독원', ...]
  const mediumRiskKeywords = ['대출', '저금리', '카드발급', ...]

  let score = 0
  for (const keyword of highRiskKeywords) {
    if (transcript.includes(keyword)) score += 3
  }
  for (const keyword of mediumRiskKeywords) {
    if (transcript.includes(keyword)) score += 2
  }

  if (score >= 6) return 'high'
  if (score >= 3) return 'medium'
  return 'low'
}

// GPT-4 컨텍스트 분석 (의심 케이스만)
const analyzeWithGPT4 = async (transcript: string) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "당신은 보이스피싱 감지 전문가입니다. 대화 내용을 분석하여 사기 가능성을 판단하세요."
      },
      {
        role: "user",
        content: `다음 통화 내용이 사기인지 분석해주세요:\n\n${transcript}`
      }
    ],
    temperature: 0.3
  })

  return response.choices[0].message.content
}
```

---

## 6. API 통합

### 6.1 식약처 오픈 API

**엔드포인트**: `http://openapi.foodsafetykorea.go.kr/api/{인증키}/C005/json/1/100`

**사용 목적**: 제품 바코드로 식품 안전 정보 조회

**요청**:
```http
GET /api/{KEY}/C005/json/1/100?BAR_CD=8801234567890
```

**응답**:
```json
{
  "C005": {
    "total_count": "1",
    "row": [{
      "PRDLST_NM": "우유 1L",
      "BSSH_NM": "서울우유",
      "BAR_CD": "8801234567890",
      "ALLERGY": "우유",
      "RAWMTRL_NM": "원유 100%",
      ...
    }]
  }
}
```

**구현**:
```typescript
// lib/foodsafety-api.ts
export const searchProductByBarcode = async (barcode: string) => {
  const API_KEY = process.env.FOOD_SAFETY_API_KEY
  const url = `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/C005/json/1/100?BAR_CD=${barcode}`

  const response = await fetch(url)
  const data = await response.json()

  if (data.C005.total_count === "0") {
    return null
  }

  return data.C005.row[0]
}
```

### 6.2 Google Cloud Vision API

**엔드포인트**: `https://vision.googleapis.com/v1/images:annotate`

**사용 목적**: 키오스크 화면 OCR 및 객체 감지

**요청**:
```json
{
  "requests": [{
    "image": {
      "content": "base64_encoded_image"
    },
    "features": [
      { "type": "TEXT_DETECTION" },
      { "type": "OBJECT_LOCALIZATION" }
    ]
  }]
}
```

**응답**:
```json
{
  "responses": [{
    "textAnnotations": [
      {
        "description": "주문하기",
        "boundingPoly": {
          "vertices": [
            {"x": 100, "y": 200},
            {"x": 300, "y": 200},
            ...
          ]
        }
      }
    ],
    "localizedObjectAnnotations": [
      {
        "name": "Button",
        "score": 0.95,
        "boundingPoly": {...}
      }
    ]
  }]
}
```

### 6.3 OpenAI GPT-4 API

**엔드포인트**: `https://api.openai.com/v1/chat/completions`

**사용 목적**: 보이스피싱 컨텍스트 분석

**요청**:
```json
{
  "model": "gpt-4",
  "messages": [
    {
      "role": "system",
      "content": "보이스피싱 감지 전문가로서 대화를 분석하세요."
    },
    {
      "role": "user",
      "content": "통화 내용: ..."
    }
  ],
  "temperature": 0.3,
  "max_tokens": 500
}
```

**응답**:
```json
{
  "choices": [{
    "message": {
      "role": "assistant",
      "content": "이 대화는 전형적인 기관 사칭형 보이스피싱입니다..."
    }
  }]
}
```

---

## 7. 보안 아키텍처

### 7.1 인증 및 권한 부여

```
┌─────────────┐
│   사용자    │
└──────┬──────┘
       │
       ▼ (email + password)
┌──────────────────┐
│  PocketBase Auth │
└──────┬───────────┘
       │
       ▼ (JWT Token)
┌──────────────────┐
│  Authorization:  │
│  Bearer {token}  │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  API 요청        │
│  (Role 체크)     │
└──────────────────┘
```

**JWT 토큰 구조**:
```json
{
  "id": "user_id",
  "email": "user@example.com",
  "role": "elderly",
  "exp": 1234567890
}
```

### 7.2 데이터 암호화

#### 전송 중 암호화
- **프로토콜**: HTTPS (TLS 1.3)
- **인증서**: Let's Encrypt
- **강제**: HTTP → HTTPS 리다이렉트

#### 저장 시 암호화
```typescript
// 민감한 필드 암호화 (예: 전화번호)
import CryptoJS from 'crypto-js'

const encryptPhone = (phone: string): string => {
  const key = process.env.ENCRYPTION_KEY!
  return CryptoJS.AES.encrypt(phone, key).toString()
}

const decryptPhone = (encrypted: string): string => {
  const key = process.env.ENCRYPTION_KEY!
  const bytes = CryptoJS.AES.decrypt(encrypted, key)
  return bytes.toString(CryptoJS.enc.Utf8)
}
```

### 7.3 입력 유효성 검사

```typescript
// XSS 방지
import DOMPurify from 'isomorphic-dompurify'

const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p'],
    ALLOWED_ATTR: []
  })
}

// SQL 인젝션 방지 (PocketBase는 자동으로 방지)
// Prepared statements 사용
```

### 7.4 CSRF 보호

```typescript
// PocketBase는 자동으로 CSRF 토큰 처리
// SameSite 쿠키 설정
pb.authStore.save(token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict'
})
```

### 7.5 속도 제한 (Rate Limiting)

```typescript
// Vercel Edge Functions에서 IP 기반 제한
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"), // 10초에 10회
})

export async function middleware(request: Request) {
  const ip = request.headers.get("x-forwarded-for")
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return new Response("Too many requests", { status: 429 })
  }

  return NextResponse.next()
}
```

---

## 8. 배포 전략

### 8.1 Vercel 배포 (프론트엔드)

```yaml
# vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "env": {
    "NEXT_PUBLIC_POCKETBASE_URL": "@pocketbase-url",
    "NEXT_PUBLIC_OPENAI_API_KEY": "@openai-api-key",
    "GOOGLE_CLOUD_VISION_API_KEY": "@vision-api-key"
  }
}
```

**배포 프로세스**:
1. GitHub에 push
2. Vercel 자동 빌드 트리거
3. Preview 배포 (PR용)
4. Production 배포 (main 브랜치)

### 8.2 PocketBase 배포 (백엔드)

**Vultr.com VPS 설정**:
```bash
# PocketBase 다운로드
wget https://github.com/pocketbase/pocketbase/releases/download/v0.19.0/pocketbase_0.19.0_linux_amd64.zip
unzip pocketbase_0.19.0_linux_amd64.zip

# 실행 권한
chmod +x pocketbase

# systemd 서비스 설정
sudo nano /etc/systemd/system/pocketbase.service
```

**systemd 서비스**:
```ini
[Unit]
Description=PocketBase
After=network.target

[Service]
Type=simple
User=pocketbase
WorkingDirectory=/opt/pocketbase
ExecStart=/opt/pocketbase/pocketbase serve --http="0.0.0.0:8090"
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

**Nginx 리버스 프록시**:
```nginx
server {
    listen 80;
    server_name ai-life-solution-challenge.duckdns.org;

    location / {
        proxy_pass http://localhost:8090;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 8.3 CI/CD 파이프라인

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 9. 확장성 고려사항

### 9.1 데이터베이스 확장

**현재 (SQLite)**:
- 단일 파일 기반
- 동시 연결 제한
- 수직 확장만 가능

**향후 (PostgreSQL)**:
- PocketBase는 SQLite만 지원
- 높은 부하 시 PostgreSQL + Prisma로 마이그레이션
- 읽기 복제본 (Read Replicas) 추가

### 9.2 캐싱 전략

#### 클라이언트 캐싱
```typescript
// SWR (Stale-While-Revalidate)
import useSWR from 'swr'

const { data, error } = useSWR('/api/products', fetcher, {
  revalidateOnFocus: false,
  dedupingInterval: 60000, // 1분
})
```

#### 서버 캐싱
```typescript
// Redis (선택)
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

// 제품 정보 캐싱 (24시간)
await redis.setex(`product:${barcode}`, 86400, JSON.stringify(product))
```

### 9.3 CDN 전략

**Vercel Edge Network**:
- 전 세계 300+ PoP
- 자동 이미지 최적화
- 정적 자산 캐싱

**커스텀 CDN** (필요시):
- Cloudflare
- 이미지 전용 CDN (Cloudinary)

---

## 10. 모니터링 및 로깅

### 10.1 애플리케이션 모니터링

**Vercel Analytics**:
- Core Web Vitals
- 페이지 로딩 시간
- 사용자 플로우

**Sentry** (오류 추적):
```typescript
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
})
```

### 10.2 로깅 전략

```typescript
// 구조화된 로깅
import pino from 'pino'

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
  },
})

logger.info({ userId, action: 'barcode_scan' }, 'Barcode scanned')
logger.error({ error }, 'API request failed')
```

### 10.3 성능 메트릭

**추적할 지표**:
- **TTFB** (Time to First Byte): < 200ms
- **FCP** (First Contentful Paint): < 1.8s
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

---

## 부록

### A. 환경 변수

```env
# PocketBase
NEXT_PUBLIC_POCKETBASE_URL=https://ai-life-solution-challenge.duckdns.org

# AI APIs
NEXT_PUBLIC_OPENAI_API_KEY=sk-xxx
GOOGLE_CLOUD_VISION_API_KEY=xxx

# External APIs
FOOD_SAFETY_API_KEY=xxx

# Monitoring
NEXT_PUBLIC_SENTRY_DSN=xxx

# Encryption
ENCRYPTION_KEY=xxx
```

### B. 참고 문서

- [Next.js Documentation](https://nextjs.org/docs)
- [PocketBase Documentation](https://pocketbase.io/docs/)
- [Google Cloud Vision API](https://cloud.google.com/vision/docs)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [Vercel Platform](https://vercel.com/docs)

---

**문서 버전**: 1.0
**마지막 업데이트**: 2025년 11월 11일
**작성자**: Claude Code (AI Assistant)

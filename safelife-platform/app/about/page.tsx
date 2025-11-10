import Link from 'next/link'
import { ArrowLeft, Target, Lightbulb, Users, TrendingUp, Award, CheckCircle, Code, Cpu, Shield } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span>홈으로</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">프로젝트 소개</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            AI 라이프 솔루션 챌린지 2025
          </div>
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
            SafeLife Platform
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
            고령자의 디지털 접근성 향상과 안전한 생활을 위한 AI 통합 플랫폼
          </p>
        </div>

        {/* Problem Statement */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex items-center mb-6">
            <Target className="w-8 h-8 text-red-600 mr-3" />
            <h3 className="text-3xl font-bold text-gray-900">해결하고자 하는 문제</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
              <div className="text-4xl font-bold text-red-600 mb-2">73%</div>
              <p className="text-gray-700">고령자가 디지털 기기 사용에 어려움을 겪고 있습니다</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-500">
              <div className="text-4xl font-bold text-orange-600 mb-2">1.8조원</div>
              <p className="text-gray-700">2024년 보이스피싱 피해액, 고령자 집중 피해</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-500">
              <div className="text-4xl font-bold text-yellow-600 mb-2">85%</div>
              <p className="text-gray-700">60세 이상이 키오스크 이용에 불편을 느낍니다</p>
            </div>
          </div>
        </div>

        {/* Solution Overview */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white mb-12">
          <div className="flex items-center mb-6">
            <Lightbulb className="w-8 h-8 mr-3" />
            <h3 className="text-3xl font-bold">우리의 솔루션</h3>
          </div>
          <p className="text-xl mb-6 leading-relaxed">
            SafeLife는 고령자의 디지털 소외를 해소하고 일상 생활의 안전을 강화하기 위해
            <strong className="text-yellow-300"> 4가지 핵심 AI 기능</strong>을 하나의 통합 플랫폼에 구현했습니다.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h4 className="font-bold text-lg mb-2">🔊 음성 바코드 리더</h4>
              <p className="text-sm opacity-90">바코드를 스캔하면 제품 정보를 음성으로 안내</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h4 className="font-bold text-lg mb-2">🖥️ AI 키오스크 도우미</h4>
              <p className="text-sm opacity-90">화면을 인식하여 주문 과정을 단계별 안내</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h4 className="font-bold text-lg mb-2">🛡️ 보이스피싱 실시간 감지</h4>
              <p className="text-sm opacity-90">통화 내용을 분석하여 위험을 즉시 차단</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h4 className="font-bold text-lg mb-2">👪 보호자 대시보드</h4>
              <p className="text-sm opacity-90">가족의 안전 상태를 실시간 모니터링</p>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex items-center mb-8">
            <Award className="w-8 h-8 text-indigo-600 mr-3" />
            <h3 className="text-3xl font-bold text-gray-900">핵심 차별화 요소</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">3개 수상 아이디어 통합</h4>
                <p className="text-gray-600">
                  AI 라이프 아이디어 챌린지 선정작 3개를 통합하여 <strong className="text-indigo-600">5점 가점</strong> 획득
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">실제 사용 가능한 프로토타입</h4>
                <p className="text-gray-600">
                  추상적 개념이 아닌 즉시 체험 가능한 웹 애플리케이션
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">On-Device AI 강조</h4>
                <p className="text-gray-600">
                  개인정보 보호를 위한 로컬 AI 처리 및 Web Speech API 활용
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">보호자-고령자 이중 시스템</h4>
                <p className="text-gray-600">
                  독립적 사용과 동시에 안전망 제공으로 지속가능성 확보
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex items-center mb-8">
            <Code className="w-8 h-8 text-purple-600 mr-3" />
            <h3 className="text-3xl font-bold text-gray-900">기술 스택</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-indigo-500 transition-colors">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-indigo-600" />
              </div>
              <h4 className="font-bold text-lg text-gray-900 mb-3">Frontend</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Next.js 15 (App Router)</li>
                <li>• TypeScript 5</li>
                <li>• Tailwind CSS 3</li>
                <li>• Lucide React Icons</li>
              </ul>
            </div>
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-500 transition-colors">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Cpu className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-bold text-lg text-gray-900 mb-3">AI/ML</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• html5-qrcode (바코드)</li>
                <li>• react-webcam (화면 캡처)</li>
                <li>• Web Speech API (TTS/STT)</li>
                <li>• 패턴 매칭 알고리즘</li>
              </ul>
            </div>
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-green-500 transition-colors">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-bold text-lg text-gray-900 mb-3">향후 계획</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Google Cloud Vision API</li>
                <li>• OpenAI GPT-4</li>
                <li>• TensorFlow Lite</li>
                <li>• PocketBase/Supabase</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Expected Impact */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-8 text-white mb-12">
          <div className="flex items-center mb-6">
            <TrendingUp className="w-8 h-8 mr-3" />
            <h3 className="text-3xl font-bold">기대 효과</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">사회적 영향</h4>
              <div className="space-y-3">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold">디지털 접근성</span>
                    <span className="text-2xl font-bold text-yellow-300">+30%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-yellow-300 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold">보이스피싱 피해 감소</span>
                    <span className="text-2xl font-bold text-yellow-300">-50%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-yellow-300 h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold">키오스크 불편 해소</span>
                    <span className="text-2xl font-bold text-yellow-300">-70%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-yellow-300 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">경제적 가치</h4>
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-3xl font-bold text-yellow-300 mb-2">9,000억원</div>
                  <p>보이스피싱 피해 예방으로 연간 절감 가능</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-3xl font-bold text-yellow-300 mb-2">GDP 0.3%</div>
                  <p>디지털 소외 해소를 통한 경제 기여</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-3xl font-bold text-yellow-300 mb-2">300만원/년</div>
                  <p>가구당 돌봄 비용 절감</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team/Contact */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex items-center mb-6">
            <Users className="w-8 h-8 text-indigo-600 mr-3" />
            <h3 className="text-3xl font-bold text-gray-900">프로젝트 정보</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-lg text-gray-900 mb-4">대회 정보</h4>
              <div className="space-y-3 text-gray-600">
                <p><strong>대회명:</strong> AI 라이프 솔루션 챌린지 2025</p>
                <p><strong>주최:</strong> 한국산업기술평가관리원 (KEIT)</p>
                <p><strong>제출 마감:</strong> 2025년 12월 2일 17:00</p>
                <p><strong>총 상금:</strong> 1,000만원</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg text-gray-900 mb-4">프로젝트 링크</h4>
              <div className="space-y-3">
                <a
                  href="https://github.com/yonghwan1106/ai_life_solution_challenge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors text-center font-semibold"
                >
                  GitHub 저장소 방문
                </a>
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors text-center font-semibold"
                >
                  라이브 데모 보기
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">지금 바로 체험해보세요</h3>
          <p className="text-xl mb-8 opacity-90">
            SafeLife의 4가지 핵심 기능을 직접 사용해보고 AI 기술의 가능성을 경험하세요
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/barcode"
              className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              바코드 스캔 시작
            </Link>
            <Link
              href="/"
              className="bg-indigo-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-800 transition-colors border-2 border-white shadow-lg"
            >
              메인으로 돌아가기
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-4">
            <h4 className="text-2xl font-bold mb-2">SafeLife Platform</h4>
            <p className="text-gray-400">
              모두를 위한 안전하고 편리한 디지털 세상
            </p>
          </div>
          <div className="border-t border-gray-700 pt-6 mt-6">
            <p className="text-sm text-gray-400">
              AI 라이프 솔루션 챌린지 2025 | Made with ❤️ by SafeLife Team
            </p>
            <p className="text-xs text-gray-500 mt-2">
              고령자의 디지털 접근성 향상과 안전한 생활을 위한 AI 통합 플랫폼
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

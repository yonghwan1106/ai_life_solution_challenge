import Link from 'next/link'
import { Shield, Smartphone, ScanBarcode, Eye } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-10 h-10 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-900">SafeLife</h1>
            </div>
            <p className="text-sm text-gray-600">고령자를 위한 AI 생활 안전 플랫폼</p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            누구나 안전하고 편리한 디지털 생활
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI 기술로 고령자의 일상을 보호하고, 디지털 세상과의 격차를 줄입니다
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link href="/barcode" className="group">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <ScanBarcode className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">음성 바코드</h3>
              <p className="text-gray-600 text-sm">
                바코드를 스캔하면 제품 정보를 음성으로 안내해드립니다
              </p>
            </div>
          </Link>

          <Link href="/kiosk" className="group">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <Smartphone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">키오스크 도우미</h3>
              <p className="text-gray-600 text-sm">
                키오스크 화면을 인식하여 주문 과정을 음성으로 안내합니다
              </p>
            </div>
          </Link>

          <Link href="/voicephishing" className="group">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">보이스피싱 감지</h3>
              <p className="text-gray-600 text-sm">
                통화 내용을 실시간 분석하여 보이스피싱을 차단합니다
              </p>
            </div>
          </Link>

          <Link href="/dashboard" className="group">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <Eye className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">보호자 대시보드</h3>
              <p className="text-gray-600 text-sm">
                가족의 안전 상태를 실시간으로 모니터링합니다
              </p>
            </div>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">왜 SafeLife인가?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">73%</div>
              <p className="text-gray-600">고령자 디지털 기기 사용 어려움</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">1.8조원</div>
              <p className="text-gray-600">2024년 보이스피싱 피해액</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">85%</div>
              <p className="text-gray-600">60세 이상 키오스크 이용 불편</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-indigo-600 rounded-xl shadow-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">지금 바로 시작하세요</h3>
          <p className="text-lg mb-6 opacity-90">
            SafeLife와 함께 더 안전하고 편리한 디지털 생활을 경험하세요
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/barcode"
              className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              바코드 스캔 시작
            </Link>
            <Link
              href="/dashboard"
              className="bg-indigo-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-800 transition-colors border-2 border-white"
            >
              보호자 모드
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            AI 라이프 솔루션 챌린지 2025 | SafeLife Platform
          </p>
          <p className="text-xs text-gray-400 mt-2">
            고령자의 디지털 접근성 향상과 안전한 생활을 위한 AI 통합 플랫폼
          </p>
        </div>
      </footer>
    </div>
  )
}

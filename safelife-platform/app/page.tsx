'use client'

import Link from 'next/link'
import { Shield, Smartphone, ScanBarcode, Eye, Info, Sparkles, Heart, Zap, LogIn, UserCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import pb from '@/lib/pocketbase'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(pb.authStore.isValid)
      if (pb.authStore.model) {
        setUserName(pb.authStore.model.email || '')
      }
    }

    checkAuth()
    pb.authStore.onChange(checkAuth)
  }, [])
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 gradient-mesh"></div>
        <div className="absolute inset-0 pattern-dots opacity-30"></div>
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-20 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header */}
      <header className="relative glass-effect border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <Shield className="w-10 h-10 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
                <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse-soft" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  SafeLife
                </h1>
                <p className="text-xs text-gray-500">AI Life Solution</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-600 hidden md:block">
                <Heart className="w-4 h-4 inline text-red-500 mr-1" />
                고령자를 위한 AI 생활 안전 플랫폼
              </p>

              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full">
                    <UserCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700">{userName}</span>
                  </div>
                  <button
                    onClick={() => {
                      pb.authStore.clear()
                      setIsLoggedIn(false)
                      setUserName('')
                    }}
                    className="text-sm text-gray-600 hover:text-gray-900 font-medium"
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-5 py-2.5 rounded-full hover:shadow-lg transition-all duration-300 font-medium text-sm group"
                >
                  <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>로그인</span>
                </Link>
              )}

              <Link
                href="/about"
                className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-full hover:shadow-lg transition-all duration-300 font-medium text-sm group"
              >
                <Info className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>소개</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-20 animate-slide-up">
          <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-200 px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-700">AI 라이프 솔루션 챌린지 2025</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              누구나 안전하고
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 bg-clip-text text-transparent">
              편리한 디지털 생활
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            AI 기술로 고령자의 일상을 보호하고,<br className="hidden sm:block" />
            디지털 세상과의 격차를 줄입니다
          </p>
        </div>

        {/* Feature Cards - New Design */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <Link href="/barcode" className="group">
            <div className="relative h-full bg-white/80 backdrop-blur rounded-3xl p-8 card-shadow hover:card-shadow-hover transition-all duration-500 overflow-hidden border border-green-100">
              {/* Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>

              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <ScanBarcode className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-green-600">1</span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                음성 바코드
              </h3>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                바코드를 스캔하면 제품 정보를 음성으로 안내해드립니다
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium">OCR</span>
                <span className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium">TTS</span>
              </div>

              {/* Hover Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          </Link>

          <Link href="/kiosk" className="group">
            <div className="relative h-full bg-white/80 backdrop-blur rounded-3xl p-8 card-shadow hover:card-shadow-hover transition-all duration-500 overflow-hidden border border-blue-100">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-500"></div>

              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <Smartphone className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">2</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                키오스크 도우미
              </h3>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                화면을 인식하여 주문 과정을 단계별로 안내합니다
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">Vision AI</span>
                <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">음성</span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          </Link>

          <Link href="/voicephishing" className="group">
            <div className="relative h-full bg-white/80 backdrop-blur rounded-3xl p-8 card-shadow hover:card-shadow-hover transition-all duration-500 overflow-hidden border border-red-100">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-pink-500"></div>

              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-red-600">3</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                보이스피싱 감지
              </h3>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                통화 내용을 실시간 분석하여 보이스피싱을 차단합니다
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-red-50 text-red-700 px-3 py-1 rounded-full font-medium">STT</span>
                <span className="text-xs bg-red-50 text-red-700 px-3 py-1 rounded-full font-medium">NLP</span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          </Link>

          <Link href="/dashboard" className="group">
            <div className="relative h-full bg-white/80 backdrop-blur rounded-3xl p-8 card-shadow hover:card-shadow-hover transition-all duration-500 overflow-hidden border border-purple-100">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-indigo-500"></div>

              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <Eye className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-purple-600">4</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                보호자 대시보드
              </h3>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                가족의 안전 상태를 실시간으로 모니터링합니다
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-purple-50 text-purple-700 px-3 py-1 rounded-full font-medium">실시간</span>
                <span className="text-xs bg-purple-50 text-purple-700 px-3 py-1 rounded-full font-medium">알림</span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          </Link>
        </div>

        {/* Stats Section - New Design */}
        <div className="relative bg-white/80 backdrop-blur rounded-3xl card-shadow p-10 mb-20 overflow-hidden border border-indigo-100">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full filter blur-3xl opacity-30 -mr-32 -mt-32"></div>

          <h3 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            왜 SafeLife인가?
          </h3>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            <div className="text-center group cursor-pointer">
              <div className="inline-block mb-4">
                <div className="text-6xl font-bold bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  73%
                </div>
                <div className="h-1 w-20 mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mt-2"></div>
              </div>
              <p className="text-gray-700 font-medium">고령자 디지털 기기<br />사용 어려움</p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="inline-block mb-4">
                <div className="text-6xl font-bold bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  1.8조원
                </div>
                <div className="h-1 w-20 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mt-2"></div>
              </div>
              <p className="text-gray-700 font-medium">2024년<br />보이스피싱 피해액</p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="inline-block mb-4">
                <div className="text-6xl font-bold bg-gradient-to-br from-pink-600 to-red-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  85%
                </div>
                <div className="h-1 w-20 mx-auto bg-gradient-to-r from-pink-600 to-red-600 rounded-full mt-2"></div>
              </div>
              <p className="text-gray-700 font-medium">60세 이상<br />키오스크 이용 불편</p>
            </div>
          </div>
        </div>

        {/* CTA Section - New Design */}
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"></div>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}></div>

          <div className="relative p-12 text-center text-white">
            <h3 className="text-4xl font-bold mb-4">지금 바로 시작하세요</h3>
            <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
              SafeLife와 함께 더 안전하고 편리한 디지털 생활을 경험하세요
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/barcode"
                className="bg-white text-indigo-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-xl hover:scale-105 btn-large"
              >
                바코드 스캔 시작
              </Link>
              <Link
                href="/dashboard"
                className="bg-white/10 backdrop-blur text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300 border-2 border-white shadow-2xl hover:shadow-xl hover:scale-105 btn-large"
              >
                보호자 모드
              </Link>
              <Link
                href="/about"
                className="bg-purple-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-purple-700 transition-all duration-300 shadow-2xl hover:shadow-xl hover:scale-105 flex items-center space-x-2 btn-large"
              >
                <Info className="w-5 h-5" />
                <span>프로젝트 소개</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative mt-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="w-6 h-6 text-indigo-400" />
              <h4 className="text-2xl font-bold">SafeLife Platform</h4>
            </div>
            <p className="text-gray-400 mb-6">
              AI 라이프 솔루션 챌린지 2025
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <span>고령자의 디지털 접근성 향상</span>
              <span>•</span>
              <span>안전한 생활 지원</span>
              <span>•</span>
              <span>AI 통합 플랫폼</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Mic, MicOff, AlertTriangle, Shield, Phone, Info, Bell, Brain } from 'lucide-react'
import { speak } from '@/lib/utils'
import { analyzeVoicePhishingWithGPT4 } from '@/lib/openai-service'
import PageHeader from '@/components/PageHeader'

interface CallAnalysis {
  timestamp: Date
  transcription: string
  riskLevel: 'low' | 'medium' | 'high'
  confidence: number
  detectedPatterns: string[]
  recommendation: string
  reasoning: string
  suspiciousKeywords: string[]
  isAIAnalyzed: boolean
}

export default function VoicePhishingPage() {
  const [isListening, setIsListening] = useState(false)
  const [currentTranscript, setCurrentTranscript] = useState('')
  const [currentAnalysis, setCurrentAnalysis] = useState<CallAnalysis | null>(null)
  const [callHistory, setCallHistory] = useState<CallAnalysis[]>([])
  const [guardianNotified, setGuardianNotified] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [conversationHistory, setConversationHistory] = useState<string[]>([])
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // Check if browser supports Speech Recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = 'ko-KR'

        recognitionRef.current.onresult = (event: any) => {
          let interim = ''
          let final = ''

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              final += transcript + ' '
            } else {
              interim += transcript
            }
          }

          if (final) {
            setCurrentTranscript(prev => prev + final)
            analyzeTranscript(final)
          }
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
        }
      }
    }

    return () => {
      stopListening()
    }
  }, [])

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start()
        setIsListening(true)
        setCurrentTranscript('')
        setCurrentAnalysis(null)
        setGuardianNotified(false)
        speak('통화 모니터링을 시작합니다. 안전하게 대화하세요.')
      } catch (error) {
        console.error('Failed to start recognition:', error)
      }
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop()
        setIsListening(false)
      } catch (error) {
        console.error('Failed to stop recognition:', error)
      }
    }
  }

  const analyzeTranscript = async (text: string) => {
    // 대화 히스토리에 추가
    setConversationHistory(prev => [...prev, text])
    setIsAnalyzing(true)

    try {
      // GPT-4로 고급 분석
      const analysis = await analyzeVoicePhishingWithGPT4(text, {
        previousTranscripts: conversationHistory
      })

      if (analysis.isRisky) {
        const callAnalysis: CallAnalysis = {
          timestamp: new Date(),
          transcription: text,
          riskLevel: analysis.riskLevel,
          confidence: analysis.confidence,
          detectedPatterns: analysis.detectedPatterns,
          recommendation: analysis.recommendation,
          reasoning: analysis.reasoning,
          suspiciousKeywords: analysis.suspiciousKeywords,
          isAIAnalyzed: true
        }

        setCurrentAnalysis(callAnalysis)
        setCallHistory(prev => [callAnalysis, ...prev].slice(0, 10))

        // Alert user based on risk level and confidence
        if (analysis.riskLevel === 'high' && analysis.confidence > 70) {
          speak('위험! AI가 보이스피싱을 감지했습니다. 절대 개인정보를 제공하지 마세요. 전화를 끊으세요.')
          notifyGuardian(callAnalysis)
        } else if (analysis.riskLevel === 'high') {
          speak('보이스피싱 가능성이 높습니다. 매우 주의하세요.')
          notifyGuardian(callAnalysis)
        } else if (analysis.riskLevel === 'medium') {
          speak('주의하세요. AI가 의심스러운 내용을 감지했습니다.')
        } else if (analysis.riskLevel === 'low') {
          speak('주의가 필요한 단어가 감지되었습니다.')
        }
      }
    } catch (error) {
      console.error('Analysis error:', error)
      speak('분석 중 오류가 발생했습니다. 계속 주의하세요.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const notifyGuardian = (analysis: CallAnalysis) => {
    setGuardianNotified(true)
    // In production, this would send actual notification via SMS/push
    console.log('Guardian notified:', analysis)
  }

  const simulatePhishingCall = () => {
    const samples = [
      {
        text: '저는 금융감독원입니다. 귀하의 계좌에서 이상 거래가 감지되어 계좌번호 확인이 필요합니다.',
        risk: 'high' as const
      },
      {
        text: '대출 상담 도와드립니다. 저금리로 빠른 대출 가능합니다.',
        risk: 'medium' as const
      },
      {
        text: '긴급하게 현금이 필요하신가요? 지금 바로 도와드리겠습니다.',
        risk: 'low' as const
      }
    ]

    const sample = samples[Math.floor(Math.random() * samples.length)]
    setCurrentTranscript(sample.text)
    analyzeTranscript(sample.text)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-pink-50 to-orange-50"></div>
        <div className="absolute inset-0 pattern-dots opacity-30"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-20 left-40 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <PageHeader
        title="보이스피싱 실시간 감지"
        description="AI가 통화 내용을 실시간 분석하여 보이스피싱을 차단합니다"
        icon={Shield}
        gradientFrom="from-red-400"
        gradientTo="to-pink-500"
      />

      <main className="max-w-6xl mx-auto px-4 pb-8">
        {/* Instructions */}
        <div className="relative bg-white/80 backdrop-blur rounded-3xl card-shadow p-6 mb-6 overflow-hidden border border-red-100">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-pink-500"></div>
          <div className="flex items-start">
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 mr-4">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-3">사용 방법</h3>
              <ol className="list-decimal list-inside text-red-800 space-y-1">
                <li className="text-base">통화 중 모니터링 시작 버튼을 눌러주세요</li>
                <li className="text-base">AI가 실시간으로 통화 내용을 분석합니다</li>
                <li className="text-base">위험 감지 시 즉시 경고 알림을 받습니다</li>
                <li className="text-base">높은 위험도 감지 시 보호자에게 자동 알림</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Monitoring Panel */}
          <div className="relative bg-white/80 backdrop-blur rounded-3xl card-shadow p-8 overflow-hidden border border-red-100">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-pink-500"></div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">통화 모니터링</h2>
              {isListening && (
                <div className="flex items-center space-x-2 bg-red-100 text-red-700 px-3 py-1 rounded-full animate-pulse">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span className="text-sm font-medium">감지 중</span>
                </div>
              )}
            </div>

            {/* Microphone Status */}
            <div className="bg-gray-900 rounded-lg p-8 mb-6 flex flex-col items-center justify-center">
              {isListening ? (
                <>
                  <div className="relative mb-4">
                    <div className="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                      <Mic className="w-16 h-16 text-white" />
                    </div>
                    <div className="absolute inset-0 w-32 h-32 bg-red-500 rounded-full animate-ping opacity-20"></div>
                  </div>
                  <p className="text-white text-lg font-medium">통화 내용 실시간 분석 중...</p>
                  {isAnalyzing && (
                    <div className="mt-3 flex items-center space-x-2 text-yellow-300">
                      <Brain className="w-5 h-5 animate-pulse" />
                      <span className="text-sm">GPT-4 AI 분석 중...</span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <MicOff className="w-16 h-16 text-gray-400" />
                  </div>
                  <p className="text-gray-400 text-lg font-medium">대기 중</p>
                </>
              )}
            </div>

            {/* Controls */}
            <div className="flex flex-col space-y-3">
              {!isListening ? (
                <>
                  <button
                    onClick={startListening}
                    className="bg-red-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors text-lg shadow-lg flex items-center justify-center space-x-2"
                  >
                    <Shield className="w-6 h-6" />
                    <span>모니터링 시작</span>
                  </button>
                  <button
                    onClick={simulatePhishingCall}
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Phone className="w-5 h-5" />
                    <span>시뮬레이션 (데모)</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={stopListening}
                  className="bg-gray-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors text-lg shadow-lg flex items-center justify-center space-x-2"
                >
                  <MicOff className="w-6 h-6" />
                  <span>모니터링 중지</span>
                </button>
              )}
            </div>

            {/* Current Transcript */}
            {currentTranscript && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">인식된 음성</h3>
                <p className="text-gray-900">{currentTranscript}</p>
              </div>
            )}
          </div>

          {/* Analysis Result */}
          <div className="relative bg-white/80 backdrop-blur rounded-3xl card-shadow p-8 overflow-hidden border border-red-100">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-pink-500"></div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">분석 결과</h2>

            {currentAnalysis ? (
              <div className="space-y-4">
                {/* Risk Level Alert */}
                <div
                  className={`rounded-lg p-6 ${
                    currentAnalysis.riskLevel === 'high'
                      ? 'bg-red-100 border-2 border-red-500'
                      : currentAnalysis.riskLevel === 'medium'
                      ? 'bg-yellow-100 border-2 border-yellow-500'
                      : 'bg-blue-100 border-2 border-blue-500'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <AlertTriangle
                      className={`w-8 h-8 flex-shrink-0 ${
                        currentAnalysis.riskLevel === 'high'
                          ? 'text-red-600'
                          : currentAnalysis.riskLevel === 'medium'
                          ? 'text-yellow-600'
                          : 'text-blue-600'
                      }`}
                    />
                    <div className="flex-1">
                      <h3
                        className={`text-xl font-bold mb-2 ${
                          currentAnalysis.riskLevel === 'high'
                            ? 'text-red-900'
                            : currentAnalysis.riskLevel === 'medium'
                            ? 'text-yellow-900'
                            : 'text-blue-900'
                        }`}
                      >
                        {currentAnalysis.riskLevel === 'high'
                          ? '🚨 높은 위험 - 즉시 조치 필요'
                          : currentAnalysis.riskLevel === 'medium'
                          ? '⚠️ 중간 위험 - 주의 필요'
                          : 'ℹ️ 낮은 위험 - 주의 권고'}
                      </h3>
                      <p
                        className={`text-base leading-relaxed ${
                          currentAnalysis.riskLevel === 'high'
                            ? 'text-red-800'
                            : currentAnalysis.riskLevel === 'medium'
                            ? 'text-yellow-800'
                            : 'text-blue-800'
                        }`}
                      >
                        {currentAnalysis.recommendation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* AI Analysis Info */}
                {currentAnalysis.isAIAnalyzed && (
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Brain className="w-5 h-5 text-purple-600" />
                        <h4 className="font-semibold text-purple-900">GPT-4 AI 분석</h4>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-purple-700">신뢰도:</span>
                        <span className="font-bold text-purple-900">{currentAnalysis.confidence}%</span>
                      </div>
                    </div>
                    <p className="text-sm text-purple-800 leading-relaxed">{currentAnalysis.reasoning}</p>
                  </div>
                )}

                {/* Detected Patterns */}
                {currentAnalysis.detectedPatterns.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">감지된 위험 패턴</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentAnalysis.detectedPatterns.map((pattern, idx) => (
                        <span
                          key={idx}
                          className="bg-red-200 text-red-900 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {pattern}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suspicious Keywords */}
                {currentAnalysis.suspiciousKeywords && currentAnalysis.suspiciousKeywords.length > 0 && (
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-900 mb-3">의심 키워드</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentAnalysis.suspiciousKeywords.map((keyword, idx) => (
                        <span
                          key={idx}
                          className="bg-orange-200 text-orange-900 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Guardian Notification */}
                {guardianNotified && (
                  <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                    <div className="flex items-center space-x-3">
                      <Bell className="w-6 h-6 text-purple-600" />
                      <div>
                        <h4 className="font-semibold text-purple-900">보호자 알림 발송됨</h4>
                        <p className="text-sm text-purple-800">
                          등록된 보호자에게 긴급 알림이 전송되었습니다
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Emergency Actions */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">긴급 조치</h4>
                  <div className="space-y-2">
                    <a
                      href="tel:112"
                      className="block w-full bg-red-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors text-center"
                    >
                      112 신고하기
                    </a>
                    <a
                      href="tel:1332"
                      className="block w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                    >
                      금융감독원 (1332)
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <Shield className="w-16 h-16 mx-auto mb-4" />
                <p className="text-lg">모니터링을 시작하면 분석 결과가 표시됩니다</p>
              </div>
            )}
          </div>
        </div>

        {/* Call History */}
        {callHistory.length > 0 && (
          <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">감지 기록</h2>
            <div className="space-y-3">
              {callHistory.map((call, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border-l-4 ${
                    call.riskLevel === 'high'
                      ? 'border-red-500 bg-red-50'
                      : call.riskLevel === 'medium'
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-blue-500 bg-blue-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-500">
                        {call.timestamp.toLocaleTimeString('ko-KR')}
                      </span>
                      <span
                        className={`text-sm font-bold ${
                          call.riskLevel === 'high'
                            ? 'text-red-700'
                            : call.riskLevel === 'medium'
                            ? 'text-yellow-700'
                            : 'text-blue-700'
                        }`}
                      >
                        {call.riskLevel === 'high'
                          ? '높은 위험'
                          : call.riskLevel === 'medium'
                          ? '중간 위험'
                          : '낮은 위험'}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{call.transcription}</p>
                  <div className="flex flex-wrap gap-1">
                    {call.detectedPatterns.map((pattern, pidx) => (
                      <span
                        key={pidx}
                        className="bg-white px-2 py-0.5 rounded text-xs font-medium text-gray-700"
                      >
                        {pattern}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <div className="flex items-start">
            <Info className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">보이스피싱 예방 수칙</h3>
              <ul className="list-disc list-inside text-blue-800 space-y-1 text-sm">
                <li>공공기관이 전화로 계좌번호나 비밀번호를 요구하지 않습니다</li>
                <li>의심스러운 전화는 즉시 끊고 공식 번호로 재확인하세요</li>
                <li>금융거래는 반드시 공식 앱이나 홈페이지를 이용하세요</li>
                <li>개인정보와 금융정보는 절대 전화로 알려주지 마세요</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Webcam from 'react-webcam'
import { Smartphone, Camera, Volume2, Info, Zap, StopCircle } from 'lucide-react'
import { speak, stopSpeaking } from '@/lib/utils'
import PageHeader from '@/components/PageHeader'

interface DetectedStep {
  step: number
  action: string
  instruction: string
  confidence: number
}

export default function KioskPage() {
  const [isCapturing, setIsCapturing] = useState(false)
  const [currentStep, setCurrentStep] = useState<DetectedStep | null>(null)
  const [analysisHistory, setAnalysisHistory] = useState<DetectedStep[]>([])
  const [isSpeaking, setIsSpeaking] = useState(false)
  const webcamRef = useRef<Webcam>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      stopCapture()
      stopSpeaking()
    }
  }, [])

  const startCapture = () => {
    setIsCapturing(true)
    setAnalysisHistory([])
    speak('키오스크 화면 분석을 시작합니다. 키오스크 화면을 카메라에 비춰주세요.')

    // Analyze screen every 3 seconds
    intervalRef.current = setInterval(() => {
      analyzeScreen()
    }, 3000)
  }

  const stopCapture = () => {
    setIsCapturing(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const analyzeScreen = async () => {
    if (!webcamRef.current) return

    const imageSrc = webcamRef.current.getScreenshot()
    if (!imageSrc) return

    // Mock AI analysis - In production, this would call Google Vision API or custom model
    const step = await mockScreenAnalysis(imageSrc)

    if (step) {
      setCurrentStep(step)
      setAnalysisHistory(prev => [step, ...prev].slice(0, 5))
      speakInstruction(step)
    }
  }

  const mockScreenAnalysis = async (imageData: string): Promise<DetectedStep | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Mock kiosk flow steps
    const kioskFlows = [
      {
        step: 1,
        action: '메인 메뉴',
        instruction: '화면 중앙의 주문하기 버튼을 눌러주세요',
        confidence: 0.95
      },
      {
        step: 2,
        action: '카테고리 선택',
        instruction: '원하시는 메뉴 카테고리를 선택해주세요. 버거, 사이드, 음료 중 선택하실 수 있습니다',
        confidence: 0.92
      },
      {
        step: 3,
        action: '메뉴 선택',
        instruction: '원하시는 메뉴를 화면에서 터치해주세요',
        confidence: 0.88
      },
      {
        step: 4,
        action: '옵션 선택',
        instruction: '세트로 변경하시겠습니까? 단품 또는 세트를 선택해주세요',
        confidence: 0.90
      },
      {
        step: 5,
        action: '장바구니 확인',
        instruction: '주문하신 내용을 확인해주세요. 추가 주문하시려면 더 담기, 주문 완료하시려면 결제하기를 눌러주세요',
        confidence: 0.93
      },
      {
        step: 6,
        action: '결제 방법',
        instruction: '결제 방법을 선택해주세요. 카드 또는 현금 결제가 가능합니다',
        confidence: 0.91
      },
      {
        step: 7,
        action: '결제 완료',
        instruction: '주문이 완료되었습니다. 영수증을 받아가시고 번호표를 확인해주세요',
        confidence: 0.94
      }
    ]

    // Randomly select a step for demo (in production, actual screen would be analyzed)
    const randomStep = kioskFlows[Math.floor(Math.random() * kioskFlows.length)]
    return randomStep
  }

  const speakInstruction = (step: DetectedStep) => {
    setIsSpeaking(true)
    const message = `단계 ${step.step}, ${step.action}. ${step.instruction}`
    speak(message)
    setTimeout(() => setIsSpeaking(false), message.length * 100)
  }

  const repeatInstruction = () => {
    if (currentStep) {
      speakInstruction(currentStep)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50"></div>
        <div className="absolute inset-0 pattern-dots opacity-30"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-20 left-40 w-72 h-72 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <PageHeader
        title="AI 키오스크 도우미"
        description="화면을 인식하여 주문 과정을 단계별로 안내합니다"
        icon={Smartphone}
        gradientFrom="from-blue-400"
        gradientTo="to-cyan-500"
      />

      <main className="max-w-6xl mx-auto px-4 pb-8">
        {/* Instructions */}
        <div className="relative bg-white/80 backdrop-blur rounded-3xl card-shadow p-6 mb-6 overflow-hidden border border-blue-100">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-500"></div>
          <div className="flex items-start">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 mr-4">
              <Info className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-3">사용 방법</h3>
              <ol className="list-decimal list-inside text-blue-800 space-y-1">
                <li className="text-base">화면 분석 시작 버튼을 눌러주세요</li>
                <li className="text-base">키오스크 화면을 카메라에 비춰주세요</li>
                <li className="text-base">AI가 화면을 분석하고 음성으로 안내해드립니다</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Camera Feed */}
          <div className="relative bg-white/80 backdrop-blur rounded-3xl card-shadow p-8 overflow-hidden border border-blue-100">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-500"></div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">카메라</h2>

            <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ aspectRatio: '4/3' }}>
              {isCapturing ? (
                <>
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    className="w-full h-full object-cover"
                    videoConstraints={{
                      facingMode: 'environment'
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full flex items-center space-x-2 animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-sm font-medium">분석 중</span>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                  <Camera className="w-24 h-24 mb-4" />
                  <p className="text-lg">카메라 대기 중</p>
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-center space-x-4">
              {!isCapturing ? (
                <button
                  onClick={startCapture}
                  className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors text-lg shadow-lg flex items-center space-x-2"
                >
                  <Zap className="w-5 h-5" />
                  <span>화면 분석 시작</span>
                </button>
              ) : (
                <button
                  onClick={stopCapture}
                  className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors text-lg shadow-lg flex items-center space-x-2"
                >
                  <StopCircle className="w-5 h-5" />
                  <span>분석 중지</span>
                </button>
              )}
            </div>
          </div>

          {/* Current Instruction */}
          <div className="relative bg-white/80 backdrop-blur rounded-3xl card-shadow p-8 overflow-hidden border border-blue-100">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-500"></div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">현재 안내</h2>
              {currentStep && (
                <button
                  onClick={repeatInstruction}
                  disabled={isSpeaking}
                  className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>다시 듣기</span>
                </button>
              )}
            </div>

            {currentStep ? (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium opacity-90">단계 {currentStep.step}</span>
                    <span className="text-sm font-medium opacity-90">
                      정확도: {(currentStep.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{currentStep.action}</h3>
                  <p className="text-lg leading-relaxed">{currentStep.instruction}</p>
                </div>

                {/* Visual Guide */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">시각적 가이드</h4>
                  <div className="flex items-center justify-center bg-white rounded border-2 border-blue-300 p-8">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-blue-200 rounded-lg flex items-center justify-center mb-3 mx-auto">
                        <span className="text-4xl">👆</span>
                      </div>
                      <p className="text-sm text-gray-600">화면의 해당 영역을 터치하세요</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <Info className="w-16 h-16 mx-auto mb-4" />
                <p className="text-lg">화면 분석을 시작하면 안내가 표시됩니다</p>
              </div>
            )}
          </div>
        </div>

        {/* Analysis History */}
        {analysisHistory.length > 0 && (
          <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">분석 기록</h2>
            <div className="space-y-3">
              {analysisHistory.map((step, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border-l-4 ${
                    idx === 0
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <span className="text-sm font-medium text-gray-500">단계 {step.step}</span>
                        <span className="text-sm font-bold text-gray-900">{step.action}</span>
                        <span className="text-xs text-gray-500">
                          정확도 {(step.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{step.instruction}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <h3 className="font-semibold text-yellow-900 mb-2">💡 사용 팁</h3>
          <ul className="list-disc list-inside text-yellow-800 space-y-1 text-sm">
            <li>키오스크 화면 전체가 카메라에 잘 보이도록 조절해주세요</li>
            <li>조명이 화면에 반사되지 않도록 각도를 조절해주세요</li>
            <li>화면이 흔들리지 않도록 카메라를 안정적으로 유지해주세요</li>
            <li>음성 안내가 끝날 때까지 기다린 후 다음 단계로 진행해주세요</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

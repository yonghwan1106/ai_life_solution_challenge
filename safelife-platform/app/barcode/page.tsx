'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Html5Qrcode } from 'html5-qrcode'
import { ArrowLeft, Camera, Volume2, AlertTriangle, Info } from 'lucide-react'
import { speak, stopSpeaking } from '@/lib/utils'

interface ProductInfo {
  code: string
  name: string
  manufacturer: string
  ingredients: string[]
  allergens: string[]
  warnings: string[]
}

export default function BarcodePage() {
  const [scanning, setScanning] = useState(false)
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const readerDivId = 'barcode-reader'

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      stopScanning()
      stopSpeaking()
    }
  }, [])

  const startScanning = async () => {
    try {
      setError(null)

      // Check if running on HTTPS or localhost
      if (typeof window !== 'undefined' && window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
        setError('보안을 위해 HTTPS 연결이 필요합니다.')
        speak('보안을 위해 안전한 연결이 필요합니다.')
        return
      }

      // Request camera permission first
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        })
        // Stop the stream immediately, we just wanted to get permission
        stream.getTracks().forEach(track => track.stop())
      } catch (permErr: any) {
        console.error('Camera permission error:', permErr)
        let errorMessage = '카메라 권한이 필요합니다. '

        if (permErr.name === 'NotAllowedError') {
          errorMessage += '브라우저 설정에서 카메라 권한을 허용해주세요.'
        } else if (permErr.name === 'NotFoundError') {
          errorMessage += '카메라를 찾을 수 없습니다.'
        } else if (permErr.name === 'NotReadableError') {
          errorMessage += '카메라가 다른 앱에서 사용 중입니다.'
        } else {
          errorMessage += '카메라에 접근할 수 없습니다.'
        }

        setError(errorMessage)
        speak(errorMessage)
        return
      }

      const html5QrCode = new Html5Qrcode(readerDivId)
      scannerRef.current = html5QrCode

      await html5QrCode.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        onScanSuccess,
        onScanFailure
      )

      setScanning(true)
      speak('바코드 스캔을 시작합니다. 제품의 바코드를 카메라에 비춰주세요.')
    } catch (err: any) {
      console.error('Error starting scanner:', err)
      let errorMessage = '카메라를 시작할 수 없습니다. '

      if (err.name === 'NotAllowedError') {
        errorMessage = '카메라 권한이 거부되었습니다. 브라우저 설정에서 카메라 권한을 허용해주세요.'
      } else if (err.name === 'NotFoundError') {
        errorMessage = '카메라를 찾을 수 없습니다. 기기에 카메라가 있는지 확인해주세요.'
      } else if (err.name === 'NotReadableError') {
        errorMessage = '카메라가 다른 앱에서 사용 중입니다. 다른 앱을 종료하고 다시 시도해주세요.'
      }

      setError(errorMessage)
      speak(errorMessage)
    }
  }

  const stopScanning = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop()
        scannerRef.current.clear()
        scannerRef.current = null
      } catch (err) {
        console.error('Error stopping scanner:', err)
      }
    }
    setScanning(false)
  }

  const onScanSuccess = async (decodedText: string) => {
    console.log('Barcode detected:', decodedText)
    await stopScanning()

    // Fetch product info (mock data for demo)
    const info = await fetchProductInfo(decodedText)
    setProductInfo(info)

    // Speak product information
    speakProductInfo(info)
  }

  const onScanFailure = (error: any) => {
    // Ignore scan failures (normal when no barcode in view)
  }

  const fetchProductInfo = async (barcode: string): Promise<ProductInfo> => {
    // Mock data - In production, this would call a real API (식약처 DB)
    await new Promise(resolve => setTimeout(resolve, 500))

    // Sample product database
    const products: Record<string, ProductInfo> = {
      '8801062638406': {
        code: barcode,
        name: '오리온 초코파이',
        manufacturer: '오리온',
        ingredients: ['밀가루', '설탕', '식물성유지', '계란', '코코아', '우유'],
        allergens: ['밀', '계란', '우유', '대두'],
        warnings: ['고열량 식품', '당류 함량 높음']
      },
      '8801043018272': {
        code: barcode,
        name: '농심 신라면',
        manufacturer: '농심',
        ingredients: ['면', '스프', '건더기', '밀가루', '식용유', '전분'],
        allergens: ['밀', '대두', '쇠고기'],
        warnings: ['나트륨 함량 높음', '매운맛']
      }
    }

    return products[barcode] || {
      code: barcode,
      name: '알 수 없는 제품',
      manufacturer: '정보 없음',
      ingredients: ['정보를 찾을 수 없습니다'],
      allergens: [],
      warnings: []
    }
  }

  const speakProductInfo = (info: ProductInfo) => {
    setIsSpeaking(true)

    let message = `제품명: ${info.name}. 제조사: ${info.manufacturer}. `

    if (info.allergens.length > 0) {
      message += `알레르기 유발 성분: ${info.allergens.join(', ')}. `
    }

    if (info.warnings.length > 0) {
      message += `주의사항: ${info.warnings.join(', ')}. `
    }

    message += '자세한 정보는 화면을 확인해주세요.'

    speak(message)

    setTimeout(() => setIsSpeaking(false), message.length * 100)
  }

  const repeatInfo = () => {
    if (productInfo) {
      speakProductInfo(productInfo)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span>홈으로</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">음성 바코드 리더</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Instructions */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
          <div className="flex items-start">
            <Info className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">사용 방법</h3>
              <ol className="list-decimal list-inside text-blue-800 space-y-1">
                <li className="text-base">아래 스캔 시작 버튼을 눌러주세요</li>
                <li className="text-base">카메라 권한 요청이 나타나면 <strong className="text-blue-900">"허용"</strong>을 선택해주세요</li>
                <li className="text-base">제품 바코드를 카메라에 비춰주세요</li>
                <li className="text-base">제품 정보를 음성으로 안내해드립니다</li>
              </ol>
              <div className="mt-3 p-3 bg-blue-100 rounded text-sm text-blue-900">
                <p className="font-semibold mb-1">💡 카메라 권한이 차단된 경우:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>주소창 옆의 자물쇠 아이콘을 클릭하세요</li>
                  <li>카메라 권한을 "허용"으로 변경하세요</li>
                  <li>페이지를 새로고침 하세요</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Scanner Area */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div id={readerDivId} className={`${scanning ? 'block' : 'hidden'} w-full max-w-md mx-auto`}></div>

          {!scanning && !productInfo && (
            <div className="text-center py-12">
              <Camera className="w-24 h-24 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-6 text-lg">바코드 스캔을 시작하려면 버튼을 눌러주세요</p>
              <button
                onClick={startScanning}
                className="bg-green-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-700 transition-colors text-lg shadow-lg"
              >
                <Camera className="w-6 h-6 inline mr-2" />
                스캔 시작하기
              </button>
            </div>
          )}

          {scanning && (
            <div className="text-center mt-4">
              <button
                onClick={stopScanning}
                className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
              >
                스캔 중지
              </button>
            </div>
          )}
        </div>

        {/* Product Information */}
        {productInfo && (
          <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">제품 정보</h2>
              <button
                onClick={repeatInfo}
                disabled={isSpeaking}
                className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                <Volume2 className="w-5 h-5" />
                <span>다시 듣기</span>
              </button>
            </div>

            <div className="space-y-4">
              {/* Product Name */}
              <div className="border-b pb-4">
                <p className="text-sm text-gray-500 mb-1">제품명</p>
                <p className="text-2xl font-bold text-gray-900">{productInfo.name}</p>
              </div>

              {/* Manufacturer */}
              <div className="border-b pb-4">
                <p className="text-sm text-gray-500 mb-1">제조사</p>
                <p className="text-lg text-gray-900">{productInfo.manufacturer}</p>
              </div>

              {/* Barcode */}
              <div className="border-b pb-4">
                <p className="text-sm text-gray-500 mb-1">바코드 번호</p>
                <p className="text-lg font-mono text-gray-700">{productInfo.code}</p>
              </div>

              {/* Allergens */}
              {productInfo.allergens.length > 0 && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <div className="flex items-start">
                    <AlertTriangle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-red-900 mb-2">알레르기 유발 성분</p>
                      <div className="flex flex-wrap gap-2">
                        {productInfo.allergens.map((allergen, idx) => (
                          <span
                            key={idx}
                            className="bg-red-200 text-red-900 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {allergen}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Warnings */}
              {productInfo.warnings.length > 0 && (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                  <p className="font-semibold text-yellow-900 mb-2">주의사항</p>
                  <ul className="list-disc list-inside text-yellow-800 space-y-1">
                    {productInfo.warnings.map((warning, idx) => (
                      <li key={idx}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Ingredients */}
              <div>
                <p className="font-semibold text-gray-900 mb-2">원재료</p>
                <p className="text-gray-700">{productInfo.ingredients.join(', ')}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={() => {
                  setProductInfo(null)
                  startScanning()
                }}
                className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
              >
                다른 제품 스캔
              </button>
              <Link
                href="/"
                className="bg-gray-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition-colors"
              >
                홈으로 돌아가기
              </Link>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-800">{error}</p>
          </div>
        )}
      </main>
    </div>
  )
}

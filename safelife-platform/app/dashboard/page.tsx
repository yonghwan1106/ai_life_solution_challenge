'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Shield,
  Phone,
  ScanBarcode,
  Smartphone,
  Bell,
  Activity,
  LogOut
} from 'lucide-react'
import { auth, guardianNotificationsApi, type User } from '@/lib/pocketbase'

interface ElderlyUser {
  id: string
  name: string
  status: 'safe' | 'warning' | 'danger'
  lastActivity: Date
}

interface Alert {
  id: string
  type: 'voice_phishing' | 'unusual_activity' | 'emergency'
  severity: 'low' | 'medium' | 'high'
  message: string
  elderlyName: string
  timestamp: Date
  acknowledged: boolean
}

interface ActivityStat {
  feature: string
  icon: any
  count: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [elderlyUsers, setElderlyUsers] = useState<ElderlyUser[]>([
    {
      id: '1',
      name: '어머니 (김순자)',
      status: 'safe',
      lastActivity: new Date(Date.now() - 30 * 60000) // 30 minutes ago
    },
    {
      id: '2',
      name: '아버지 (김철수)',
      status: 'warning',
      lastActivity: new Date(Date.now() - 2 * 60 * 60000) // 2 hours ago
    }
  ])

  // 인증 체크
  useEffect(() => {
    const currentUser = auth.getCurrentUser()

    if (!currentUser) {
      router.push('/login?redirect=/dashboard')
      return
    }

    if (currentUser.role !== 'guardian') {
      router.push('/')
      return
    }

    setUser(currentUser)
    setLoading(false)
  }, [])

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'voice_phishing',
      severity: 'high',
      message: '보이스피싱 의심 전화 감지 - "금융감독원" 사칭',
      elderlyName: '어머니',
      timestamp: new Date(Date.now() - 15 * 60000),
      acknowledged: false
    },
    {
      id: '2',
      type: 'unusual_activity',
      severity: 'medium',
      message: '평소와 다른 시간대에 바코드 스캔 활동',
      elderlyName: '아버지',
      timestamp: new Date(Date.now() - 45 * 60000),
      acknowledged: true
    },
    {
      id: '3',
      type: 'voice_phishing',
      severity: 'medium',
      message: '대출 관련 의심 전화 수신',
      elderlyName: '어머니',
      timestamp: new Date(Date.now() - 3 * 60 * 60000),
      acknowledged: true
    }
  ])

  const [activityStats, setActivityStats] = useState<ActivityStat[]>([
    {
      feature: '바코드 스캔',
      icon: ScanBarcode,
      count: 24,
      trend: 'up',
      color: 'green'
    },
    {
      feature: '키오스크 도움',
      icon: Smartphone,
      count: 8,
      trend: 'stable',
      color: 'blue'
    },
    {
      feature: '피싱 차단',
      icon: Shield,
      count: 3,
      trend: 'down',
      color: 'red'
    }
  ])

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    )
  }

  const unacknowledgedCount = alerts.filter(a => !a.acknowledged).length

  const getTimeSince = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

    if (seconds < 60) return `${seconds}초 전`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}분 전`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}시간 전`
    return `${Math.floor(seconds / 86400)}일 전`
  }

  const handleLogout = () => {
    auth.logout()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span>홈으로</span>
            </Link>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">보호자 대시보드</h1>
              <p className="text-sm text-gray-500">{user?.name}님 환영합니다</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
                {unacknowledgedCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {unacknowledgedCount}
                  </span>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-5 h-5 mr-1" />
                <span className="text-sm">로그아웃</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">보호 중인 가족</p>
                <p className="text-3xl font-bold text-gray-900">{elderlyUsers.length}</p>
              </div>
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center">
                <Activity className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">미확인 알림</p>
                <p className="text-3xl font-bold text-red-600">{unacknowledgedCount}</p>
              </div>
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center">
                <Bell className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">이번 주 활동</p>
                <p className="text-3xl font-bold text-green-600">
                  {activityStats.reduce((sum, stat) => sum + stat.count, 0)}
                </p>
              </div>
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Elderly Users Status */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">가족 상태</h2>
          <div className="space-y-4">
            {elderlyUsers.map(user => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      user.status === 'safe'
                        ? 'bg-green-100'
                        : user.status === 'warning'
                        ? 'bg-yellow-100'
                        : 'bg-red-100'
                    }`}
                  >
                    {user.status === 'safe' ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : user.status === 'warning' ? (
                      <AlertTriangle className="w-6 h-6 text-yellow-600" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>마지막 활동: {getTimeSince(user.lastActivity)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.status === 'safe'
                        ? 'bg-green-100 text-green-800'
                        : user.status === 'warning'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {user.status === 'safe' ? '안전' : user.status === 'warning' ? '주의' : '위험'}
                  </span>
                  <a
                    href={`tel:01012345678`}
                    className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Alerts */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">최근 알림</h2>
              <span className="text-sm text-gray-500">{alerts.length}개의 알림</span>
            </div>
            <div className="space-y-3">
              {alerts.map(alert => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.severity === 'high'
                      ? 'border-red-500 bg-red-50'
                      : alert.severity === 'medium'
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-blue-500 bg-blue-50'
                  } ${alert.acknowledged ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {alert.type === 'voice_phishing' ? (
                        <Shield className="w-5 h-5 text-red-600" />
                      ) : alert.type === 'emergency' ? (
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      ) : (
                        <Bell className="w-5 h-5 text-yellow-600" />
                      )}
                      <span className="text-sm font-semibold text-gray-900">
                        {alert.elderlyName}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{getTimeSince(alert.timestamp)}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                  {!alert.acknowledged && (
                    <button
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      확인 완료
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Activity Statistics */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">이번 주 활동 통계</h2>
            <div className="space-y-4">
              {activityStats.map((stat, idx) => {
                const Icon = stat.icon
                return (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center bg-${stat.color}-100`}
                      >
                        <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{stat.feature}</h3>
                        <p className="text-sm text-gray-500">지난 7일간</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                      <div className="flex items-center text-sm">
                        {stat.trend === 'up' ? (
                          <>
                            <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                            <span className="text-green-600">증가</span>
                          </>
                        ) : stat.trend === 'down' ? (
                          <>
                            <TrendingUp className="w-4 h-4 text-red-600 mr-1 transform rotate-180" />
                            <span className="text-red-600">감소</span>
                          </>
                        ) : (
                          <span className="text-gray-500">유지</span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Weekly Chart Placeholder */}
            <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">주간 활동 추이</h3>
              <div className="flex items-end justify-between h-32 space-x-2">
                {[40, 65, 50, 80, 70, 90, 75].map((height, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-indigo-500 rounded-t"
                      style={{ height: `${height}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-1">
                      {['월', '화', '수', '목', '금', '토', '일'][idx]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">긴급 연락처</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="tel:112"
              className="flex items-center justify-between p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
            >
              <div className="flex items-center space-x-3">
                <Phone className="w-6 h-6 text-red-600" />
                <div>
                  <p className="font-semibold text-gray-900">경찰청</p>
                  <p className="text-sm text-gray-600">112</p>
                </div>
              </div>
              <span className="text-red-600">→</span>
            </a>
            <a
              href="tel:119"
              className="flex items-center justify-between p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors border border-orange-200"
            >
              <div className="flex items-center space-x-3">
                <Phone className="w-6 h-6 text-orange-600" />
                <div>
                  <p className="font-semibold text-gray-900">소방서</p>
                  <p className="text-sm text-gray-600">119</p>
                </div>
              </div>
              <span className="text-orange-600">→</span>
            </a>
            <a
              href="tel:1332"
              className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
            >
              <div className="flex items-center space-x-3">
                <Phone className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">금융감독원</p>
                  <p className="text-sm text-gray-600">1332</p>
                </div>
              </div>
              <span className="text-blue-600">→</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
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
  LogOut,
  Eye
} from 'lucide-react'
import { auth, type User } from '@/lib/pocketbase'
import PageHeader from '@/components/PageHeader'

interface ElderlyUser {
  id: string
  name: string
  status: 'safe' | 'warning' | 'danger'
  lastActivity: Date
  photo?: string
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
  const [showNotifications, setShowNotifications] = useState(false)
  const [elderlyUsers, setElderlyUsers] = useState<ElderlyUser[]>([
    {
      id: '1',
      name: '어머니 (김순자)',
      status: 'safe',
      lastActivity: new Date(Date.now() - 30 * 60000), // 30 minutes ago
      photo: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=200&h=200&fit=crop&q=80' // Asian elderly woman smiling
    },
    {
      id: '2',
      name: '아버지 (김철수)',
      status: 'warning',
      lastActivity: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
      photo: 'https://images.unsplash.com/photo-1595481773127-f48a13d5be6a?w=200&h=200&fit=crop&q=80' // Asian elderly man
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

  // 알림 패널 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (showNotifications && !target.closest('.notification-panel')) {
        setShowNotifications(false)
      }
    }

    if (showNotifications) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showNotifications])

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
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-indigo-50 to-violet-50"></div>
        <div className="absolute inset-0 pattern-dots opacity-30"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-20 left-40 w-72 h-72 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header with custom actions */}
      <div className="relative overflow-hidden mb-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-500 opacity-5"></div>
          <div className="absolute inset-0 pattern-dots opacity-20"></div>
        </div>

        <div className="relative glass-effect border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <span className="text-sm font-medium">← 홈으로</span>
              </Link>
              <div className="flex items-center space-x-4">
                <div className="relative notification-panel">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Bell className="w-6 h-6 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors" />
                    {unacknowledgedCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                        {unacknowledgedCount}
                      </span>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden animate-fade-in">
                      <div className="bg-gradient-to-r from-purple-400 to-indigo-500 px-6 py-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-white font-bold text-lg">알림</h3>
                          <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
                            {unacknowledgedCount}개의 새 알림
                          </span>
                        </div>
                      </div>

                      <div className="max-h-96 overflow-y-auto">
                        {alerts.length > 0 ? (
                          alerts.slice(0, 5).map(alert => (
                            <div
                              key={alert.id}
                              className={`px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                                !alert.acknowledged ? 'bg-blue-50' : ''
                              }`}
                            >
                              <div className="flex items-start space-x-3">
                                <div
                                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                                    alert.severity === 'high'
                                      ? 'bg-red-100'
                                      : alert.severity === 'medium'
                                      ? 'bg-yellow-100'
                                      : 'bg-blue-100'
                                  }`}
                                >
                                  {alert.type === 'voice_phishing' ? (
                                    <Shield
                                      className={`w-5 h-5 ${
                                        alert.severity === 'high'
                                          ? 'text-red-600'
                                          : alert.severity === 'medium'
                                          ? 'text-yellow-600'
                                          : 'text-blue-600'
                                      }`}
                                    />
                                  ) : alert.type === 'emergency' ? (
                                    <AlertTriangle className="w-5 h-5 text-red-600" />
                                  ) : (
                                    <Activity className="w-5 h-5 text-blue-600" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-1">
                                    <p className="text-sm font-semibold text-gray-900">
                                      {alert.elderlyName}
                                    </p>
                                    <span className="text-xs text-gray-500">
                                      {getTimeSince(alert.timestamp)}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                                  {!alert.acknowledged && (
                                    <button
                                      onClick={() => acknowledgeAlert(alert.id)}
                                      className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                                    >
                                      확인 완료
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="px-6 py-8 text-center text-gray-500">
                            <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p>새로운 알림이 없습니다</p>
                          </div>
                        )}
                      </div>

                      {alerts.length > 5 && (
                        <div className="px-6 py-3 bg-gray-50 text-center">
                          <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                            모든 알림 보기 ({alerts.length}개)
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium">로그아웃</span>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-5">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop&q=80"
                  alt="보호자 프로필"
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg transform hover:scale-110 hover:rotate-6 transition-all duration-500"
                />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <Eye className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent mb-2">
                  보호자 대시보드
                </h1>
                <p className="text-gray-600 text-base">{user?.name}님, 환영합니다! 가족의 안전 상태를 실시간으로 모니터링합니다</p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-1 bg-gradient-to-r from-purple-400 to-indigo-500"></div>
      </div>

      <main className="max-w-7xl mx-auto px-4 pb-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="relative bg-white/80 backdrop-blur rounded-3xl card-shadow p-6 overflow-hidden border border-purple-100">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-indigo-500"></div>
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

          <div className="relative bg-white/80 backdrop-blur rounded-3xl card-shadow p-6 overflow-hidden border border-red-100">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-pink-500"></div>
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

          <div className="relative bg-white/80 backdrop-blur rounded-3xl card-shadow p-6 overflow-hidden border border-green-100">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>
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
        <div className="relative bg-white/80 backdrop-blur rounded-3xl card-shadow p-8 mb-8 overflow-hidden border border-purple-100">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-indigo-500"></div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">가족 상태</h2>
          <div className="space-y-4">
            {elderlyUsers.map(user => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    {user.photo ? (
                      <img
                        src={user.photo}
                        alt={user.name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center shadow-lg">
                        <span className="text-white text-xl font-bold">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div
                      className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${
                        user.status === 'safe'
                          ? 'bg-green-500'
                          : user.status === 'warning'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    >
                      {user.status === 'safe' ? (
                        <CheckCircle className="w-4 h-4 text-white" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-white" />
                      )}
                    </div>
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
          <div className="relative bg-white/80 backdrop-blur rounded-3xl card-shadow p-8 overflow-hidden border border-red-100">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-pink-500"></div>
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
          <div className="relative bg-white/80 backdrop-blur rounded-3xl card-shadow p-8 overflow-hidden border border-purple-100">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-indigo-500"></div>
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

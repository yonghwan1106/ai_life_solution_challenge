'use client'

import Link from 'next/link'
import { ArrowLeft, LucideIcon, Home } from 'lucide-react'

interface PageHeaderProps {
  title: string
  description?: string
  icon: LucideIcon
  gradientFrom: string
  gradientTo: string
  backLink?: string
}

export default function PageHeader({
  title,
  description,
  icon: Icon,
  gradientFrom,
  gradientTo,
  backLink = '/'
}: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden mb-8">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-5`}></div>
        <div className="absolute inset-0 pattern-dots opacity-20"></div>
      </div>

      {/* Header Content */}
      <div className="relative glass-effect border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          {/* Navigation */}
          <div className="flex items-center space-x-3 mb-6">
            <Link
              href={backLink}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">뒤로가기</span>
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">홈</span>
            </Link>
          </div>

          {/* Title Section */}
          <div className="flex items-center space-x-5">
            {/* Icon */}
            <div className="relative">
              <div className={`w-16 h-16 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 hover:rotate-6 transition-all duration-500`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>

            {/* Text */}
            <div className="flex-1">
              <h1 className={`text-4xl font-bold bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent mb-2`}>
                {title}
              </h1>
              {description && (
                <p className="text-gray-600 text-base">{description}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className={`h-1 bg-gradient-to-r ${gradientFrom} ${gradientTo}`}></div>
    </div>
  )
}

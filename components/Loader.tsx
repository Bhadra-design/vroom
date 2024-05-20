import Image from 'next/image'
import React from 'react'

interface LoaderProps {
  className?: string
}

const Loader = ({ className = '' }: LoaderProps) => {
  return (
    <div
      className={`fixed top-0 z-50 h-screen w-screen bg-gray-100/50 flex items-center justify-center`}
    >
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-50 dark:border-gray-800">
          <div className="h-12 w-12 border-gray-300 dark:border-gray-600 border-t-2 border-b-2 border-r-2 border-l-2"></div>
        </div>
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-50 dark:border-gray-800 ml-6">
          <div className="h-10 w-10 border-gray-300 dark:border-gray-600 border-t-2 border-b-2 border-r-2 border-l-2"></div>
        </div>
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-50 dark:border-gray-800 ml-6">
          <div className="h-8 w-8 border-gray-300 dark:border-gray-600 border-t-2 border-b-2 border-r-2 border-l-2"></div>
        </div>
      </div>
    </div>
  )
}

export default Loader


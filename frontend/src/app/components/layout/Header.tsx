import React from 'react'
import { Sparkles, Zap, Globe } from 'lucide-react';

const Header = () => {
  return (
    <header className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  CodeCompass
                </h1>
                <p className="text-purple-300 text-sm">
                  AI-powered developer tool discovery
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm text-purple-300">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Powered by DeepSeek AI</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>Real-time Web Search</span>
              </div>
            </div>
          </div>
        </header>
  )
}

export default Header
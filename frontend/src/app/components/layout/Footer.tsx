import React from 'react'

const Footer = () => {
  return (
    <footer className="container mx-auto px-6 py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-purple-300 text-sm mb-4 md:mb-0">
              Built with ❤️ for the developer community using LangGraph &
              DeepSeek AI
            </div>
            <div className="flex items-center space-x-6 text-sm text-purple-300">
              <span>MIT License</span>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">
                GitHub
              </a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">
                Documentation
              </a>
            </div>
          </div>
        </footer>
  )
}

export default Footer

'use client'

import HolidayBanner from '@/components/Layout/HolidayBanner'
import TopicCard from '@/components/Common/TopicCard'
import { TOPICS } from '@/utils/topicConfig'

export default function Home() {
  return (
    <div className="min-h-screen pb-20">
      <div className="container mx-auto px-4">
        {/* Holiday Banner */}
        <HolidayBanner />

        {/* Welcome Section */}
        <div className="text-center mb-12">
          <p className="text-xl text-white/90 mb-4">
            Choose a topic below and select your learning style:
          </p>
          <div className="flex justify-center gap-6 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📖</span>
              <span>Read interactive tutorials</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎮</span>
              <span>Play engaging games</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛠️</span>
              <span>Try hands-on sandboxes</span>
            </div>
          </div>
        </div>

        {/* Topic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {TOPICS.map((topic, index) => (
            <TopicCard key={topic.id} topic={topic} index={index} />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-white/60">
          <p className="text-lg mb-2">
            ✨ Made with love this holiday season ✨
          </p>
          <p className="text-sm">
            100% Free • No Sign-up Required • Learn at Your Pace
          </p>
        </div>
      </div>
    </div>
  )
}

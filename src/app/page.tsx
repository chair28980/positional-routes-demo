'use client'

import { MasterPlanOverview } from '@/components/route/MasterPlanOverview'
import { RouteSelector } from '@/components/route/RouteSelector'
import { routes } from '@/lib/data/routes'
import { PositionDefinition } from '@/types'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-foundation-primary">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="text-white font-display text-4xl font-bold mr-4">JV</div>
            <div className="text-left">
              <h1 className="hero-title text-white">
                Master Plan Basics:
                <br />
                <span className="text-white/90">Positional Routes</span>
              </h1>
            </div>
          </div>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Explore fundamental BJJ route progressions designed to build systematic positional understanding and tactical awareness.
          </p>
        </div>

        {/* Master Plan Overview */}
        <div className="mb-16">
          <MasterPlanOverview />
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-16"></div>

        {/* Route Selector */}
        <div className="mb-8">
          <h2 className="route-title text-white text-center mb-8">Individual Routes</h2>
          <RouteSelector routes={routes} />
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Interactive Learning</h3>
              <p className="text-white/60 text-sm">
                Click through position nodes to explore transitions and build systematic understanding.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Progressive Difficulty</h3>
              <p className="text-white/60 text-sm">
                Start with beginner routes and advance to complex branching sequences with multiple endings.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Mobile Optimized</h3>
              <p className="text-white/60 text-sm">
                Responsive design with touch-friendly interactions for learning anywhere, anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
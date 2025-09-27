'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { RouteVisualization } from '@/components/route/RouteVisualization'
import { getRouteById } from '@/lib/data/routes'
import { RouteProgress } from '@/types'

export default function RoutePage() {
  const params = useParams()
  const router = useRouter()
  const routeId = params.id as string

  const [currentPosition, setCurrentPosition] = useState<string | null>(null)
  const [visitedPositions, setVisitedPositions] = useState<Set<string>>(new Set())
  const [routeProgress, setRouteProgress] = useState<RouteProgress | null>(null)

  const route = getRouteById(routeId)

  useEffect(() => {
    if (route) {
      setCurrentPosition(route.startPosition)
      setVisitedPositions(new Set([route.startPosition]))
      setRouteProgress({
        routeId: route.id,
        currentPosition: route.startPosition,
        visitedPositions: new Set([route.startPosition]),
        completedTransitions: [],
        startTime: new Date(),
        lastUpdated: new Date(),
      })
    }
  }, [route])

  const handlePositionClick = (positionId: string) => {
    if (!route) return

    const newVisited = new Set(visitedPositions)
    newVisited.add(positionId)

    setCurrentPosition(positionId)
    setVisitedPositions(newVisited)

    if (routeProgress) {
      setRouteProgress({
        ...routeProgress,
        currentPosition: positionId,
        visitedPositions: newVisited,
        lastUpdated: new Date(),
      })
    }
  }

  if (!route) {
    return (
      <main className="min-h-screen bg-foundation-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Route Not Found</h1>
          <p className="text-white/70 mb-6">The requested route could not be found.</p>
          <Link
            href="/"
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors"
          >
            Return to Routes
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-foundation-primary">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Routes
          </Link>

          <div className="flex items-center gap-4">
            {/* Route completion indicator */}
            {route.endPositions.includes(currentPosition || '') && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-600/20 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-sm font-medium">Route Complete!</span>
              </div>
            )}

            {/* Share button */}
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href)
              }}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-colors"
            >
              Share Route
            </button>
          </div>
        </div>

        {/* Route Visualization */}
        <RouteVisualization
          route={route}
          currentPosition={currentPosition}
          visitedPositions={visitedPositions}
          onPositionClick={handlePositionClick}
          showConnectors={true}
          animateTransitions={true}
          highlightPath={true}
        />

        {/* Position Details Panel */}
        {currentPosition && (
          <div className="mt-12 max-w-4xl mx-auto">
            {(() => {
              const position = route.positions.find(p => p.id === currentPosition)
              if (!position) return null

              return (
                <div className="bg-foundation-secondary/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{position.name}</h3>
                      <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80">
                        {position.type}
                      </span>
                    </div>
                  </div>

                  <p className="text-white/80 mb-6">{position.description}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Key Points */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Key Points</h4>
                      <ul className="space-y-2">
                        {position.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start gap-2 text-white/70">
                            <div className="w-1.5 h-1.5 bg-white/50 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Common Mistakes */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Common Mistakes</h4>
                      <ul className="space-y-2">
                        {position.commonMistakes.map((mistake, index) => (
                          <li key={index} className="flex items-start gap-2 text-red-300/70">
                            <div className="w-1.5 h-1.5 bg-red-400/50 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm">{mistake}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Available Transitions */}
                  {position.transitions.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <h4 className="text-lg font-semibold text-white mb-3">Available Transitions</h4>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {position.transitions.map(transition => (
                          <button
                            key={transition.id}
                            onClick={() => handlePositionClick(transition.target)}
                            className="text-left p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
                          >
                            <div className="text-white text-sm font-medium mb-1">
                              {route.positions.find(p => p.id === transition.target)?.name || transition.target}
                            </div>
                            <div className="text-white/60 text-xs">{transition.method}</div>
                            <div className="flex items-center gap-1 mt-2">
                              {Array.from({ length: 5 }, (_, i) => (
                                <div
                                  key={i}
                                  className={`w-1 h-1 rounded-full ${
                                    i < transition.difficulty ? 'bg-yellow-400' : 'bg-white/20'
                                  }`}
                                />
                              ))}
                              <span className="text-white/40 text-xs ml-1">
                                Difficulty
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })()}
          </div>
        )}
      </div>
    </main>
  )
}
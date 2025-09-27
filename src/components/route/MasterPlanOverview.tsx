'use client'

import React, { useState } from 'react'
import { routes } from '@/lib/data/routes'
import { PositionDefinition } from '@/types'
import { AnimatedPositionNode } from '@/components/ui/AnimatedPositionNode'
import { cn } from '@/lib/utils'

interface MasterPlanOverviewProps {
  onPositionClick?: (position: PositionDefinition, routeId: string) => void
  className?: string
}

// Define the exact layout based on the master plan image - now vertical flow with mobile-friendly spacing
const ROUTE_LAYOUTS = [
  {
    id: 'short-route',
    name: 'Route 1',
    title: 'The Short Route',
    x: { desktop: 100, mobile: 50 },
    positions: [
      { id: 'striking-offense', name: 'Striking Offense', type: 'striking', y: { desktop: 80, mobile: 100 } },
      { id: 'takedown-offense', name: 'Takedown Offense', type: 'takedown', y: { desktop: 160, mobile: 200 } },
      { id: 'turtle-top', name: 'Turtle Top', type: 'turtle', y: { desktop: 240, mobile: 300 } },
      { id: 'back-mount-offense', name: 'Back Mount Offense', type: 'backMount', y: { desktop: 320, mobile: 400 } },
    ],
    connections: [
      { from: 0, to: 1, type: 'straight' },
      { from: 1, to: 2, type: 'straight' },
      { from: 2, to: 3, type: 'straight' },
    ]
  },
  {
    id: 'meat-grinder',
    name: 'Route 2',
    title: 'The Meat Grinder',
    x: { desktop: 280, mobile: 200 },
    positions: [
      { id: 'striking-offense-2', name: 'Striking Offense', type: 'striking', y: { desktop: 80, mobile: 100 } },
      { id: 'takedown-offense-2', name: 'Takedown Offense', type: 'takedown', y: { desktop: 160, mobile: 200 } },
      { id: 'guard-top-2', name: 'Guard Top', type: 'guard', y: { desktop: 240, mobile: 300 } },
      { id: 'side-mount-top-2', name: 'Side Mount Top', type: 'sideMount', y: { desktop: 320, mobile: 400 } },
      { id: 'turtle-top-2', name: 'Turtle Top', type: 'turtle', y: { desktop: 400, mobile: 500 } },
      { id: 'back-mount-offense-2', name: 'Back Mount Offense', type: 'backMount', y: { desktop: 480, mobile: 600 } },
    ],
    connections: [
      { from: 0, to: 1, type: 'straight' },
      { from: 1, to: 2, type: 'straight' },
      { from: 2, to: 3, type: 'straight' },
      { from: 3, to: 4, type: 'straight' },
      { from: 4, to: 5, type: 'straight' },
    ]
  },
  {
    id: 'mount-grinder-a',
    name: 'Route 3',
    title: 'The Mount Grinder A',
    x: { desktop: 460, mobile: 350 },
    positions: [
      { id: 'striking-offense-3', name: 'Striking Offense', type: 'striking', y: { desktop: 80, mobile: 100 } },
      { id: 'takedown-offense-3', name: 'Takedown Offense', type: 'takedown', y: { desktop: 160, mobile: 200 } },
      { id: 'guard-top-3', name: 'Guard Top', type: 'guard', y: { desktop: 240, mobile: 300 } },
      { id: 'side-mount-top-3', name: 'Side Mount Top', type: 'sideMount', y: { desktop: 320, mobile: 400 } },
      { id: 'mount-top-3', name: 'Mount Top', type: 'mount', y: { desktop: 400, mobile: 500 } },
      { id: 'back-mount-offense-3', name: 'Back Mount Offense', type: 'backMount', y: { desktop: 480, mobile: 600 } },
      { id: 'rfc-offense-3', name: 'RFC Offense', type: 'rfc', y: { desktop: 560, mobile: 700 }, x: { desktop: -80, mobile: -60 } },
      { id: 'leglock-offense-3', name: 'Leglock Offense', type: 'leglock', y: { desktop: 560, mobile: 700 }, x: { desktop: 80, mobile: 60 } },
    ],
    connections: [
      { from: 0, to: 1, type: 'straight' },
      { from: 1, to: 2, type: 'straight' },
      { from: 2, to: 3, type: 'straight' },
      { from: 3, to: 4, type: 'straight' },
      { from: 4, to: 5, type: 'straight' },
      { from: 4, to: 6, type: 'curved-left' },
      { from: 4, to: 7, type: 'curved-right' },
    ]
  },
  {
    id: 'mount-grinder-b',
    name: 'Route 4',
    title: 'The Mount Grinder B',
    x: { desktop: 640, mobile: 500 },
    positions: [
      { id: 'striking-offense-4', name: 'Striking Offense', type: 'striking', y: { desktop: 80, mobile: 100 } },
      { id: 'takedown-offense-4', name: 'Takedown Offense', type: 'takedown', y: { desktop: 160, mobile: 200 } },
      { id: 'guard-top-4', name: 'Guard Top', type: 'guard', y: { desktop: 240, mobile: 300 } },
      { id: 'mount-top-4', name: 'Mount Top', type: 'mount', y: { desktop: 320, mobile: 400 } },
      { id: 'back-mount-offense-4', name: 'Back Mount Offense', type: 'backMount', y: { desktop: 400, mobile: 500 } },
      { id: 'rfc-offense-4', name: 'RFC Offense', type: 'rfc', y: { desktop: 480, mobile: 600 }, x: { desktop: -80, mobile: -60 } },
      { id: 'leglock-offense-4', name: 'Leglock Offense', type: 'leglock', y: { desktop: 480, mobile: 600 }, x: { desktop: 80, mobile: 60 } },
    ],
    connections: [
      { from: 0, to: 1, type: 'straight' },
      { from: 1, to: 2, type: 'straight' },
      { from: 2, to: 3, type: 'straight' },
      { from: 3, to: 4, type: 'straight' },
      { from: 3, to: 5, type: 'curved-left' },
      { from: 3, to: 6, type: 'curved-right' },
    ]
  },
  {
    id: 'attacking-legs',
    name: 'Route 5',
    title: 'Attacking the Legs',
    x: { desktop: 820, mobile: 650 },
    positions: [
      { id: 'striking-offense-5', name: 'Striking Offense', type: 'striking', y: { desktop: 80, mobile: 100 } },
      { id: 'takedown-offense-5', name: 'Takedown Offense', type: 'takedown', y: { desktop: 160, mobile: 200 } },
      { id: 'guard-top-5', name: 'Guard Top', type: 'guard', y: { desktop: 240, mobile: 300 } },
      { id: 'leglock-offense-5', name: 'Leglock Offense', type: 'leglock', y: { desktop: 320, mobile: 400 } },
    ],
    connections: [
      { from: 0, to: 1, type: 'straight' },
      { from: 1, to: 2, type: 'straight' },
      { from: 2, to: 3, type: 'straight' },
    ]
  }
]

export function MasterPlanOverview({ onPositionClick, className }: MasterPlanOverviewProps) {
  const [hoveredPosition, setHoveredPosition] = useState<string | null>(null)
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile screen size
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Helper function to get responsive value
  const getResponsiveValue = (value: { desktop: number; mobile: number } | number) => {
    if (typeof value === 'number') return value
    return isMobile ? value.mobile : value.desktop
  }

  const handlePositionClick = (positionId: string) => {
    setSelectedPosition(selectedPosition === positionId ? null : positionId)
    // Don't navigate - just show selection state
  }

  const handlePositionHover = (positionId: string | null) => {
    setHoveredPosition(positionId)
  }

  // Get the actual position data from routes
  const getPositionData = (routeId: string, positionId: string): PositionDefinition | null => {
    const route = routes.find(r => r.id === routeId)
    return route?.positions.find(p => p.id === positionId) || null
  }

  // Create arrow marker definitions
  const renderArrowMarkers = () => (
    <defs>
      <marker
        id="blue-arrow"
        markerWidth="8"
        markerHeight="6"
        refX="7"
        refY="3"
        orient="auto"
      >
        <polygon
          points="0 0, 8 3, 0 6"
          fill="#4A90E2"
        />
      </marker>
      <marker
        id="green-arrow"
        markerWidth="8"
        markerHeight="6"
        refX="7"
        refY="3"
        orient="auto"
      >
        <polygon
          points="0 0, 8 3, 0 6"
          fill="#4CAF50"
        />
      </marker>
      <marker
        id="purple-arrow"
        markerWidth="8"
        markerHeight="6"
        refX="7"
        refY="3"
        orient="auto"
      >
        <polygon
          points="0 0, 8 3, 0 6"
          fill="#9C27B0"
        />
      </marker>
    </defs>
  )

  // Render connection arrows for vertical flow
  const renderConnection = (routeLayout: any, conn: any) => {
    const fromPos = routeLayout.positions[conn.from]
    const toPos = routeLayout.positions[conn.to]

    const routeX = getResponsiveValue(routeLayout.x)
    const buttonWidth = isMobile ? 80 : 64
    const buttonHeight = isMobile ? 36 : 28

    const fromX = routeX + getResponsiveValue(fromPos.x || 0) + buttonWidth / 2
    const fromY = getResponsiveValue(fromPos.y) + buttonHeight
    const toX = routeX + getResponsiveValue(toPos.x || 0) + buttonWidth / 2
    const toY = getResponsiveValue(toPos.y)

    if (conn.type === 'straight') {
      return (
        <line
          key={`${routeLayout.id}-${conn.from}-${conn.to}`}
          x1={fromX}
          y1={fromY}
          x2={toX}
          y2={toY}
          stroke="#4A90E2"
          strokeWidth="2"
          markerEnd="url(#blue-arrow)"
        />
      )
    } else if (conn.type === 'curved-left') {
      const midY = fromY + (toY - fromY) / 2
      const controlX = fromX - 60
      const path = `M ${fromX} ${fromY} Q ${controlX} ${midY} ${toX} ${toY}`

      return (
        <path
          key={`${routeLayout.id}-${conn.from}-${conn.to}`}
          d={path}
          stroke="#4CAF50"
          strokeWidth="2"
          fill="none"
          markerEnd="url(#green-arrow)"
        />
      )
    } else if (conn.type === 'curved-right') {
      const midY = fromY + (toY - fromY) / 2
      const controlX = fromX + 60
      const path = `M ${fromX} ${fromY} Q ${controlX} ${midY} ${toX} ${toY}`

      return (
        <path
          key={`${routeLayout.id}-${conn.from}-${conn.to}`}
          d={path}
          stroke="#9C27B0"
          strokeWidth="2"
          fill="none"
          markerEnd="url(#purple-arrow)"
        />
      )
    }
  }

  return (
    <div className={cn('master-plan-overview w-full', className)}>
      {/* Master Plan SVG */}
      <div className="relative overflow-auto bg-foundation-secondary/20 rounded-xl p-4 md:p-8">
        <svg
          viewBox={isMobile ? "0 0 850 800" : "0 0 1000 650"}
          className="w-full h-auto min-h-[800px] md:min-h-[650px]"
          preserveAspectRatio="xMidYMid meet"
        >
          {renderArrowMarkers()}

          {/* Render each route */}
          {ROUTE_LAYOUTS.map((routeLayout) => (
            <g key={routeLayout.id}>
              {/* Route label */}
              <text
                x={getResponsiveValue(routeLayout.x) + (isMobile ? 60 : 50)}
                y={isMobile ? 50 : 40}
                className="fill-white font-display text-sm"
                style={{ fontSize: isMobile ? '12px' : '14px', fontStyle: 'italic' }}
                textAnchor="middle"
              >
                {routeLayout.name}
              </text>
              <text
                x={getResponsiveValue(routeLayout.x) + (isMobile ? 60 : 50)}
                y={isMobile ? 68 : 58}
                className="fill-white font-display text-sm font-bold"
                style={{ fontSize: isMobile ? '14px' : '16px', fontStyle: 'italic' }}
                textAnchor="middle"
              >
                {routeLayout.title}
              </text>

              {/* Route connections */}
              {routeLayout.connections.map((conn) => renderConnection(routeLayout, conn))}

              {/* Route positions */}
              {routeLayout.positions.map((pos, index) => {
                const positionData = getPositionData(routeLayout.id, pos.id)
                if (!positionData) return null

                const routeX = getResponsiveValue(routeLayout.x)
                const posX = getResponsiveValue(pos.x || 0)
                const posY = getResponsiveValue(pos.y)
                const buttonWidth = isMobile ? 80 : 64
                const buttonHeight = isMobile ? 36 : 28

                return (
                  <foreignObject
                    key={pos.id}
                    x={routeX + posX}
                    y={posY}
                    width={buttonWidth}
                    height={buttonHeight}
                  >
                    <AnimatedPositionNode
                      position={{
                        ...positionData,
                        coordinates: { x: routeX + posX, y: posY }
                      }}
                      isActive={selectedPosition === pos.id}
                      isHovered={hoveredPosition === pos.id}
                      onClick={handlePositionClick}
                      onHover={handlePositionHover}
                      animationDelay={index * 0.1}
                    />
                  </foreignObject>
                )
              })}
            </g>
          ))}
        </svg>
      </div>

      {/* Position Details Panel */}
      {selectedPosition && (
        <div className="mt-8 p-6 bg-foundation-secondary/50 backdrop-blur-sm rounded-xl border border-white/10">
          {(() => {
            // Find the position data
            let positionData: PositionDefinition | null = null
            let routeId = ''

            for (const routeLayout of ROUTE_LAYOUTS) {
              const pos = routeLayout.positions.find(p => p.id === selectedPosition)
              if (pos) {
                positionData = getPositionData(routeLayout.id, pos.id)
                routeId = routeLayout.id
                break
              }
            }

            if (!positionData) return null

            return (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-white text-xl font-semibold">{positionData.name}</h3>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80">
                    {positionData.type}
                  </span>
                </div>
                <p className="text-white/70 mb-4">{positionData.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-2">Key Points</h4>
                    <ul className="space-y-1">
                      {positionData.keyPoints.map((point, index) => (
                        <li key={index} className="text-white/60 text-sm flex items-start gap-2">
                          <span className="w-1 h-1 bg-white/40 rounded-full mt-2 flex-shrink-0"></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-2">Common Mistakes</h4>
                    <ul className="space-y-1">
                      {positionData.commonMistakes.map((mistake, index) => (
                        <li key={index} className="text-white/60 text-sm flex items-start gap-2">
                          <span className="w-1 h-1 bg-red-400/60 rounded-full mt-2 flex-shrink-0"></span>
                          {mistake}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <button
                    onClick={() => window.location.href = `/route/${routeId}`}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-colors"
                  >
                    Explore Full Route
                  </button>
                  <span className="text-white/60 text-sm">
                    Part of {ROUTE_LAYOUTS.find(r => r.id === routeId)?.title}
                  </span>
                </div>
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}
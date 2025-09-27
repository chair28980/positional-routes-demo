'use client'

import { useState } from 'react'
import { routes } from '@/lib/data/routes'
import { PositionDefinition } from '@/types'
import { AnimatedPositionNode } from '@/components/ui/AnimatedPositionNode'
import { cn } from '@/lib/utils'

interface MasterPlanOverviewProps {
  onPositionClick?: (position: PositionDefinition, routeId: string) => void
  className?: string
}

// Define the exact layout based on the master plan image
const ROUTE_LAYOUTS = [
  {
    id: 'short-route',
    name: 'Route 1',
    title: 'The Short Route',
    y: 80,
    positions: [
      { id: 'striking-offense', name: 'Striking Offense', type: 'striking', x: 300 },
      { id: 'takedown-offense', name: 'Takedown Offense', type: 'takedown', x: 480 },
      { id: 'turtle-top', name: 'Turtle Top', type: 'turtle', x: 660 },
      { id: 'back-mount-offense', name: 'Back Mount Offense', type: 'backMount', x: 840 },
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
    y: 160,
    positions: [
      { id: 'striking-offense-2', name: 'Striking Offense', type: 'striking', x: 300 },
      { id: 'takedown-offense-2', name: 'Takedown Offense', type: 'takedown', x: 480 },
      { id: 'guard-top-2', name: 'Guard Top', type: 'guard', x: 660 },
      { id: 'side-mount-top-2', name: 'Side Mount Top', type: 'sideMount', x: 840 },
      { id: 'turtle-top-2', name: 'Turtle Top', type: 'turtle', x: 1020 },
      { id: 'back-mount-offense-2', name: 'Back Mount Offense', type: 'backMount', x: 1200 },
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
    y: 240,
    positions: [
      { id: 'striking-offense-3', name: 'Striking Offense', type: 'striking', x: 300 },
      { id: 'takedown-offense-3', name: 'Takedown Offense', type: 'takedown', x: 480 },
      { id: 'guard-top-3', name: 'Guard Top', type: 'guard', x: 660 },
      { id: 'side-mount-top-3', name: 'Side Mount Top', type: 'sideMount', x: 840 },
      { id: 'mount-top-3', name: 'Mount Top', type: 'mount', x: 1020 },
      { id: 'back-mount-offense-3', name: 'Back Mount Offense', type: 'backMount', x: 1200 },
      { id: 'rfc-offense-3', name: 'RFC Offense', type: 'rfc', x: 1200, y: -40 },
      { id: 'leglock-offense-3', name: 'Leglock Offense', type: 'leglock', x: 1200, y: 40 },
    ],
    connections: [
      { from: 0, to: 1, type: 'straight' },
      { from: 1, to: 2, type: 'straight' },
      { from: 2, to: 3, type: 'straight' },
      { from: 3, to: 4, type: 'straight' },
      { from: 4, to: 5, type: 'straight' },
      { from: 4, to: 6, type: 'curved-up' },
      { from: 4, to: 7, type: 'curved-down' },
    ]
  },
  {
    id: 'mount-grinder-b',
    name: 'Route 4',
    title: 'The Mount Grinder B',
    y: 320,
    positions: [
      { id: 'striking-offense-4', name: 'Striking Offense', type: 'striking', x: 300 },
      { id: 'takedown-offense-4', name: 'Takedown Offense', type: 'takedown', x: 480 },
      { id: 'guard-top-4', name: 'Guard Top', type: 'guard', x: 660 },
      { id: 'mount-top-4', name: 'Mount Top', type: 'mount', x: 840 },
      { id: 'back-mount-offense-4', name: 'Back Mount Offense', type: 'backMount', x: 1020 },
      { id: 'rfc-offense-4', name: 'RFC Offense', type: 'rfc', x: 1020, y: -40 },
      { id: 'leglock-offense-4', name: 'Leglock Offense', type: 'leglock', x: 1020, y: 40 },
    ],
    connections: [
      { from: 0, to: 1, type: 'straight' },
      { from: 1, to: 2, type: 'straight' },
      { from: 2, to: 3, type: 'straight' },
      { from: 3, to: 4, type: 'straight' },
      { from: 3, to: 5, type: 'curved-up' },
      { from: 3, to: 6, type: 'curved-down' },
    ]
  }
]

export function MasterPlanOverview({ onPositionClick, className }: MasterPlanOverviewProps) {
  const [hoveredPosition, setHoveredPosition] = useState<string | null>(null)
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null)

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

  // Render connection arrows
  const renderConnection = (routeLayout: any, conn: any) => {
    const fromPos = routeLayout.positions[conn.from]
    const toPos = routeLayout.positions[conn.to]

    const fromX = fromPos.x + 100 // button width
    const fromY = routeLayout.y + (fromPos.y || 0) + 16 // button height / 2
    const toX = toPos.x
    const toY = routeLayout.y + (toPos.y || 0) + 16

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
    } else if (conn.type === 'curved-up') {
      const midX = fromX + (toX - fromX) / 2
      const controlY = fromY - 40
      const path = `M ${fromX} ${fromY} Q ${midX} ${controlY} ${toX} ${toY}`

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
    } else if (conn.type === 'curved-down') {
      const midX = fromX + (toX - fromX) / 2
      const controlY = fromY + 40
      const path = `M ${fromX} ${fromY} Q ${midX} ${controlY} ${toX} ${toY}`

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
      <div className="relative overflow-x-auto bg-foundation-secondary/20 rounded-xl p-4 md:p-8">
        <svg
          viewBox="0 0 1400 400"
          className="w-full h-auto min-h-[400px] md:min-h-[500px]"
          preserveAspectRatio="xMidYMid meet"
        >
          {renderArrowMarkers()}

          {/* Render each route */}
          {ROUTE_LAYOUTS.map((routeLayout) => (
            <g key={routeLayout.id}>
              {/* Route label */}
              <text
                x="80"
                y={routeLayout.y + 20}
                className="fill-white font-display text-sm"
                style={{ fontSize: '14px', fontStyle: 'italic' }}
              >
                {routeLayout.name}
              </text>
              <text
                x="80"
                y={routeLayout.y + 38}
                className="fill-white font-display text-sm font-bold"
                style={{ fontSize: '16px', fontStyle: 'italic' }}
              >
                {routeLayout.title}
              </text>

              {/* Route connections */}
              {routeLayout.connections.map((conn) => renderConnection(routeLayout, conn))}

              {/* Route positions */}
              {routeLayout.positions.map((pos, index) => {
                const positionData = getPositionData(routeLayout.id, pos.id)
                if (!positionData) return null

                return (
                  <foreignObject
                    key={pos.id}
                    x={pos.x}
                    y={routeLayout.y + (pos.y || 0)}
                    width="140"
                    height="48"
                    className="md:w-[100px] md:h-[32px]"
                  >
                    <AnimatedPositionNode
                      position={{
                        ...positionData,
                        coordinates: { x: pos.x, y: routeLayout.y + (pos.y || 0) }
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
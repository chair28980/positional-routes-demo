'use client'

import { useState } from 'react'
import { RouteDefinition } from '@/types'
import { RouteCard } from './RouteCard'
import { cn } from '@/lib/utils'

interface RouteSelectorProps {
  routes: RouteDefinition[]
  selectedRoute?: string | null
  onRouteSelect?: (routeId: string) => void
  className?: string
}

export function RouteSelector({
  routes,
  selectedRoute = null,
  onRouteSelect,
  className,
}: RouteSelectorProps) {
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null)

  const handleRouteSelect = (routeId: string) => {
    onRouteSelect?.(routeId)
  }

  const handleRouteHover = (routeId: string | null) => {
    setHoveredRoute(routeId)
  }

  return (
    <div className={cn('route-selector', className)}>
      {/* Route Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {routes.map(route => (
          <div
            key={route.id}
            onMouseEnter={() => handleRouteHover(route.id)}
            onMouseLeave={() => handleRouteHover(null)}
          >
            <RouteCard
              route={route}
              isSelected={selectedRoute === route.id}
              onSelect={handleRouteSelect}
              className={cn(
                'transition-transform duration-300',
                hoveredRoute === route.id && 'transform scale-105',
                hoveredRoute && hoveredRoute !== route.id && 'opacity-75'
              )}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
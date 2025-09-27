'use client'

import Link from 'next/link'
import { RouteDefinition } from '@/types'
import { cn } from '@/lib/utils'

interface RouteCardProps {
  route: RouteDefinition
  isSelected?: boolean
  onSelect?: (routeId: string) => void
  className?: string
}

export function RouteCard({
  route,
  isSelected = false,
  onSelect,
  className,
}: RouteCardProps) {
  const handleClick = () => {
    onSelect?.(route.id)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-600 text-white'
      case 'intermediate':
        return 'bg-yellow-600 text-white'
      case 'advanced':
        return 'bg-red-600 text-white'
      default:
        return 'bg-gray-600 text-white'
    }
  }

  const getPositionCount = () => {
    return route.positions.length
  }

  const getEndPositions = () => {
    return route.endPositions.length
  }

  return (
    <Link href={`/route/${route.id}`} passHref>
      <div
        className={cn(
          'group relative overflow-hidden rounded-xl border border-white/10 bg-foundation-secondary/50 backdrop-blur-sm',
          'hover:border-white/20 hover:bg-foundation-secondary/70 transition-all duration-300',
          'focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-2 focus-within:ring-offset-foundation-primary',
          isSelected && 'border-white/30 bg-foundation-secondary/80',
          className
        )}
        onClick={handleClick}
        role="button"
        tabIndex={0}
      >
        {/* Route Header */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="route-title text-white text-xl mb-2 group-hover:text-white/90">
              {route.name}
            </h3>
            <span className={cn(
              'px-3 py-1 rounded-full text-xs font-medium',
              getDifficultyColor(route.difficulty)
            )}>
              {route.difficulty}
            </span>
          </div>

          <p className="text-white/70 text-sm mb-4 line-clamp-2">
            {route.description}
          </p>

          {/* Route Stats */}
          <div className="flex items-center gap-4 text-xs text-white/60">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-white/40 rounded-full"></span>
              <span>{getPositionCount()} positions</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-white/40 rounded-full"></span>
              <span>{getEndPositions()} {getEndPositions() === 1 ? 'ending' : 'endings'}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-white/40 rounded-full"></span>
              <span>{route.metadata.estimatedTime} min</span>
            </div>
          </div>

          {/* Tags */}
          {route.metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {route.metadata.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-white/10 rounded text-xs text-white/80"
                >
                  {tag}
                </span>
              ))}
              {route.metadata.tags.length > 3 && (
                <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/60">
                  +{route.metadata.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Mini route preview */}
        <div className="px-6 pb-6">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {route.positions.slice(0, 5).map((position, index) => (
              <div key={position.id} className="flex items-center gap-2 flex-shrink-0">
                <div className={cn(
                  'w-3 h-3 rounded-full flex-shrink-0',
                  index === 0 && 'bg-green-400',
                  index === route.positions.length - 1 && 'bg-red-400',
                  index > 0 && index < route.positions.length - 1 && 'bg-blue-400'
                )} />
                {index < Math.min(route.positions.length - 1, 4) && (
                  <div className="w-4 h-0.5 bg-white/30 flex-shrink-0" />
                )}
              </div>
            ))}
            {route.positions.length > 5 && (
              <span className="text-white/40 text-xs ml-2 flex-shrink-0">
                +{route.positions.length - 5} more
              </span>
            )}
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </Link>
  )
}
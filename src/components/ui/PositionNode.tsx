'use client'

import { PositionDefinition, PositionType } from '@/types'
import { cn } from '@/lib/utils'

interface PositionNodeProps {
  position: PositionDefinition
  isActive?: boolean
  isHovered?: boolean
  isVisited?: boolean
  onClick?: (positionId: string) => void
  onHover?: (positionId: string | null) => void
  className?: string
}

const getPositionColors = (type: PositionType) => {
  const colorMap = {
    striking: 'bg-striking-primary hover:bg-striking-hover active:bg-striking-active',
    takedown: 'bg-takedown-primary hover:bg-takedown-hover active:bg-takedown-active',
    guard: 'bg-guard-primary hover:bg-guard-hover active:bg-guard-active',
    mount: 'bg-mount-primary hover:bg-mount-hover active:bg-mount-active',
    sideMount: 'bg-sideMount-primary hover:bg-sideMount-hover active:bg-sideMount-active',
    turtle: 'bg-turtle-primary hover:bg-turtle-hover active:bg-turtle-active',
    backMount: 'bg-backMount-primary hover:bg-backMount-hover active:bg-backMount-active',
    leglock: 'bg-leglock-primary hover:bg-leglock-hover active:bg-leglock-active',
    rfc: 'bg-rfc-primary hover:bg-rfc-hover active:bg-rfc-active',
  }
  return colorMap[type]
}

export function PositionNode({
  position,
  isActive = false,
  isHovered = false,
  isVisited = false,
  onClick,
  onHover,
  className,
}: PositionNodeProps) {
  const handleClick = () => {
    onClick?.(position.id)
  }

  const handleMouseEnter = () => {
    onHover?.(position.id)
  }

  const handleMouseLeave = () => {
    onHover?.(null)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick()
    }
  }

  return (
    <button
      className={cn(
        'position-node',
        getPositionColors(position.type),
        isActive && 'ring-2 ring-white ring-offset-2 ring-offset-foundation-primary',
        isHovered && 'scale-105 -translate-y-0.5',
        isVisited && 'opacity-75',
        className
      )}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      aria-label={`${position.name} - ${position.type} position`}
      aria-pressed={isActive}
      role="button"
      tabIndex={0}
    >
      <span className="font-semibold text-white text-center leading-tight">
        {position.name}
      </span>
    </button>
  )
}
'use client'

import { motion } from 'framer-motion'
import { PositionDefinition, PositionType } from '@/types'
import { cn } from '@/lib/utils'

interface AnimatedPositionNodeProps {
  position: PositionDefinition
  isActive?: boolean
  isHovered?: boolean
  isVisited?: boolean
  onClick?: (positionId: string) => void
  onHover?: (positionId: string | null) => void
  className?: string
  animationDelay?: number
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

export function AnimatedPositionNode({
  position,
  isActive = false,
  isHovered = false,
  isVisited = false,
  onClick,
  onHover,
  className,
  animationDelay = 0,
}: AnimatedPositionNodeProps) {
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
    <motion.button
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: animationDelay,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{
        scale: 1.05,
        y: -2,
        transition: { duration: 0.2 },
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1 },
      }}
      className={cn(
        'position-node',
        getPositionColors(position.type),
        isActive && 'ring-2 ring-white ring-offset-2 ring-offset-foundation-primary',
        isVisited && 'opacity-75',
        className
      )}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      aria-label={`${position.name} - ${position.type} position. ${position.description}`}
      aria-pressed={isActive}
      aria-describedby={`position-${position.id}-description`}
      role="button"
      tabIndex={0}
    >
      <span className="font-semibold text-white text-center leading-tight">
        {position.name}
      </span>

      {/* Hidden description for screen readers */}
      <span
        id={`position-${position.id}-description`}
        className="sr-only"
      >
        {position.description}.
        Key points: {position.keyPoints.join(', ')}.
        {position.transitions.length > 0 &&
          ` Available transitions: ${position.transitions.map(t =>
            `${t.method} to ${t.target}`
          ).join(', ')}.`
        }
      </span>
    </motion.button>
  )
}
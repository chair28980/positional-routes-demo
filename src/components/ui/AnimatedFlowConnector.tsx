'use client'

import { motion } from 'framer-motion'
import { ConnectionDefinition, ConnectionType } from '@/types'
import { cn } from '@/lib/utils'

interface AnimatedFlowConnectorProps {
  connection: ConnectionDefinition
  fromPoint: { x: number; y: number }
  toPoint: { x: number; y: number }
  isHighlighted?: boolean
  isAnimated?: boolean
  animationDelay?: number
  className?: string
}

const getConnectionStyle = (type: ConnectionType) => {
  const styleMap = {
    primary: {
      stroke: '#4A90E2',
      strokeWidth: 1.5,
      strokeDasharray: 'none',
    },
    branch: {
      stroke: '#4CAF50',
      strokeWidth: 1.5,
      strokeDasharray: '2 2',
    },
    escape: {
      stroke: '#9C27B0',
      strokeWidth: 1.5,
      strokeDasharray: '1 3',
    },
  }
  return styleMap[type]
}

const generatePath = (
  from: { x: number; y: number },
  to: { x: number; y: number },
  pathType?: string
) => {
  switch (pathType) {
    case 'quadratic-bezier': {
      const controlX = from.x + (to.x - from.x) * 0.7
      const controlY = from.y - 30
      return `M ${from.x} ${from.y} Q ${controlX} ${controlY} ${to.x} ${to.y}`
    }
    case 'cubic-bezier': {
      const controlX1 = from.x + (to.x - from.x) * 0.5
      const controlY1 = from.y - 40
      const controlX2 = from.x + (to.x - from.x) * 0.8
      const controlY2 = to.y - 20
      return `M ${from.x} ${from.y} C ${controlX1} ${controlY1} ${controlX2} ${controlY2} ${to.x} ${to.y}`
    }
    default:
      return `M ${from.x} ${from.y} L ${to.x} ${to.y}`
  }
}

export function AnimatedFlowConnector({
  connection,
  fromPoint,
  toPoint,
  isHighlighted = false,
  isAnimated = false,
  animationDelay = 0,
  className,
}: AnimatedFlowConnectorProps) {
  const style = getConnectionStyle(connection.type)
  const path = generatePath(fromPoint, toPoint, connection.pathType)

  return (
    <motion.g
      className={cn('flow-connector', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: isHighlighted ? 1 : 0.8 }}
      transition={{ duration: 0.3, delay: animationDelay }}
    >
      {/* Arrow marker definitions */}
      <defs>
        <marker
          id={`arrowhead-${connection.id}`}
          markerWidth="6"
          markerHeight="4"
          refX="5.5"
          refY="2"
          orient="auto"
        >
          <polygon
            points="0 0, 6 2, 0 4"
            fill={isHighlighted ? '#FFFFFF' : style.stroke}
          />
        </marker>
      </defs>

      {/* Connection path */}
      <motion.path
        d={path}
        stroke={isHighlighted ? '#FFFFFF' : style.stroke}
        strokeWidth={isHighlighted ? style.strokeWidth + 0.5 : style.strokeWidth}
        strokeDasharray={isAnimated ? '3 3' : style.strokeDasharray}
        fill="none"
        markerEnd={`url(#arrowhead-${connection.id})`}
        filter={isHighlighted ? 'drop-shadow(0 0 2px rgba(255,255,255,0.4))' : undefined}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 1,
          delay: animationDelay,
          ease: 'easeInOut',
        }}
        className="transition-all duration-300"
        aria-label={`Connection from ${connection.from} to ${connection.to} via ${connection.method}`}
      />

      {/* Animated flow effect */}
      {isAnimated && (
        <motion.path
          d={path}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1"
          strokeDasharray="2 4"
          fill="none"
          initial={{ strokeDashoffset: 6 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="pointer-events-none"
        />
      )}

      {/* Connection label for complex paths */}
      {connection.type !== 'primary' && (
        <motion.text
          x={(fromPoint.x + toPoint.x) / 2}
          y={(fromPoint.y + toPoint.y) / 2 - 10}
          textAnchor="middle"
          className="fill-white text-xs font-medium opacity-60"
          fontSize="10"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 0.3, delay: animationDelay + 0.5 }}
        >
          {connection.method}
        </motion.text>
      )}
    </motion.g>
  )
}
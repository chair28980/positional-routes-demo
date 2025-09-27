'use client'

import { ConnectionDefinition, ConnectionType } from '@/types'
import { cn } from '@/lib/utils'

interface FlowConnectorProps {
  connection: ConnectionDefinition
  fromPoint: { x: number; y: number }
  toPoint: { x: number; y: number }
  isHighlighted?: boolean
  isAnimated?: boolean
  className?: string
}

const getConnectionStyle = (type: ConnectionType) => {
  const styleMap = {
    primary: {
      stroke: '#4A90E2',
      strokeWidth: 2,
      strokeDasharray: 'none',
    },
    branch: {
      stroke: '#4CAF50',
      strokeWidth: 2.5,
      strokeDasharray: '3 3',
    },
    escape: {
      stroke: '#9C27B0',
      strokeWidth: 2.5,
      strokeDasharray: '2 4',
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

export function FlowConnector({
  connection,
  fromPoint,
  toPoint,
  isHighlighted = false,
  isAnimated = false,
  className,
}: FlowConnectorProps) {
  const style = getConnectionStyle(connection.type)
  const path = generatePath(fromPoint, toPoint, connection.pathType)

  return (
    <g className={cn('flow-connector', className)}>
      {/* Arrow marker definitions */}
      <defs>
        <marker
          id={`arrowhead-${connection.id}`}
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill={isHighlighted ? '#FFFFFF' : style.stroke}
          />
        </marker>
      </defs>

      {/* Connection path */}
      <path
        d={path}
        stroke={isHighlighted ? '#FFFFFF' : style.stroke}
        strokeWidth={isHighlighted ? style.strokeWidth + 1 : style.strokeWidth}
        strokeDasharray={isAnimated ? '5 5' : style.strokeDasharray}
        fill="none"
        markerEnd={`url(#arrowhead-${connection.id})`}
        opacity={isHighlighted ? 1 : 0.8}
        filter={isHighlighted ? 'drop-shadow(0 0 4px rgba(255,255,255,0.3))' : undefined}
        className={cn(
          'transition-all duration-300',
          isAnimated && 'animate-flow'
        )}
        aria-label={`Connection from ${connection.from} to ${connection.to} via ${connection.method}`}
      />

      {/* Connection label for complex paths */}
      {connection.type !== 'primary' && (
        <text
          x={(fromPoint.x + toPoint.x) / 2}
          y={(fromPoint.y + toPoint.y) / 2 - 10}
          textAnchor="middle"
          className="fill-white text-xs font-medium opacity-60"
          fontSize="10"
        >
          {connection.method}
        </text>
      )}
    </g>
  )
}
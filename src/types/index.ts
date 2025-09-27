export type PositionType =
  | 'striking'
  | 'takedown'
  | 'guard'
  | 'mount'
  | 'sideMount'
  | 'turtle'
  | 'backMount'
  | 'leglock'
  | 'rfc'

export type ConnectionType = 'primary' | 'branch' | 'escape'

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export interface Coordinates {
  x: number
  y: number
}

export interface TransitionDefinition {
  id: string
  target: string
  method: string
  difficulty: number
  description?: string
}

export interface PositionDefinition {
  id: string
  name: string
  type: PositionType
  description: string
  keyPoints: string[]
  commonMistakes: string[]
  coordinates: Coordinates
  transitions: TransitionDefinition[]
}

export interface ConnectionDefinition {
  id: string
  from: string
  to: string
  type: ConnectionType
  method: string
  difficulty: number
  pathType?: 'straight' | 'quadratic-bezier' | 'cubic-bezier'
}

export interface RouteMetadata {
  estimatedTime: number
  prerequisites: string[]
  tags: string[]
}

export interface RouteDefinition {
  id: string
  name: string
  description: string
  difficulty: Difficulty
  positions: PositionDefinition[]
  connections: ConnectionDefinition[]
  startPosition: string
  endPositions: string[]
  metadata: RouteMetadata
}

export interface RouteProgress {
  routeId: string
  currentPosition: string | null
  visitedPositions: Set<string>
  completedTransitions: string[]
  startTime?: Date
  lastUpdated: Date
}

export interface UserPreferences {
  showConnectors: boolean
  animateTransitions: boolean
  highlightPath: boolean
  preferredDifficulty: Difficulty
  completedRoutes: string[]
}

export interface InteractionState {
  hoveredPosition: string | null
  selectedPosition: string | null
  hoveredConnection: string | null
  isNavigating: boolean
}
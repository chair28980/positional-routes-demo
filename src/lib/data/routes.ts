import { RouteDefinition } from '@/types'

export const routes: RouteDefinition[] = [
  {
    id: 'short-route',
    name: 'The Short Route',
    description: 'A fundamental 4-position sequence from striking to back mount',
    difficulty: 'beginner',
    startPosition: 'striking-offense',
    endPositions: ['back-mount-offense'],
    positions: [
      {
        id: 'striking-offense',
        name: 'Striking Offense',
        type: 'striking',
        description: 'Initiate engagement with striking techniques to set up takedown opportunities',
        keyPoints: [
          'Maintain distance and timing',
          'Set up takedown entries',
          'Control range and angles'
        ],
        commonMistakes: [
          'Overcommitting to strikes',
          'Poor takedown setup',
          'Neglecting defensive positioning'
        ],
        coordinates: { x: 100, y: 100 },
        transitions: [
          {
            id: 'striking-to-takedown',
            target: 'takedown-offense',
            method: 'Level change and entry',
            difficulty: 2
          }
        ]
      },
      {
        id: 'takedown-offense',
        name: 'Takedown Offense',
        type: 'takedown',
        description: 'Execute takedown to bring opponent to the ground in dominant position',
        keyPoints: [
          'Secure underhooks or collar ties',
          'Drive through hips',
          'Control opponent landing'
        ],
        commonMistakes: [
          'Poor takedown execution',
          'Failing to follow through',
          'Losing top position'
        ],
        coordinates: { x: 250, y: 100 },
        transitions: [
          {
            id: 'takedown-to-turtle',
            target: 'turtle-top',
            method: 'Opponent turtles after takedown',
            difficulty: 1
          }
        ]
      },
      {
        id: 'turtle-top',
        name: 'Turtle Top',
        type: 'turtle',
        description: 'Control opponent in turtle position and advance to back mount',
        keyPoints: [
          'Control hips and shoulders',
          'Prevent escapes',
          'Set up back take'
        ],
        commonMistakes: [
          'Allowing opponent to turn',
          'Poor weight distribution',
          'Rushing the back take'
        ],
        coordinates: { x: 400, y: 100 },
        transitions: [
          {
            id: 'turtle-to-back-mount',
            target: 'back-mount-offense',
            method: 'Seat belt grip and hooks',
            difficulty: 3
          }
        ]
      },
      {
        id: 'back-mount-offense',
        name: 'Back Mount Offense',
        type: 'backMount',
        description: 'Dominant back control position with submission opportunities',
        keyPoints: [
          'Maintain hooks and seat belt',
          'Control opponent head and arms',
          'Threaten multiple submissions'
        ],
        commonMistakes: [
          'Losing hooks',
          'Poor choking mechanics',
          'Allowing opponent to escape'
        ],
        coordinates: { x: 550, y: 100 },
        transitions: []
      }
    ],
    connections: [
      {
        id: 'conn-striking-takedown',
        from: 'striking-offense',
        to: 'takedown-offense',
        type: 'primary',
        method: 'Level change entry',
        difficulty: 2
      },
      {
        id: 'conn-takedown-turtle',
        from: 'takedown-offense',
        to: 'turtle-top',
        type: 'primary',
        method: 'Follow opponent to turtle',
        difficulty: 1
      },
      {
        id: 'conn-turtle-back',
        from: 'turtle-top',
        to: 'back-mount-offense',
        type: 'primary',
        method: 'Back take sequence',
        difficulty: 3
      }
    ],
    metadata: {
      estimatedTime: 15,
      prerequisites: ['Basic takedown knowledge', 'Turtle position awareness'],
      tags: ['beginner', 'fundamental', 'back-control']
    }
  },
  {
    id: 'meat-grinder',
    name: 'The Meat Grinder',
    description: 'Extended 6-position route including guard and side mount progression',
    difficulty: 'intermediate',
    startPosition: 'striking-offense-2',
    endPositions: ['back-mount-offense-2'],
    positions: [
      {
        id: 'striking-offense-2',
        name: 'Striking Offense',
        type: 'striking',
        description: 'Striking setup for takedown entry',
        keyPoints: ['Range management', 'Takedown setup', 'Timing'],
        commonMistakes: ['Poor distance', 'Telegraphing takedowns'],
        coordinates: { x: 100, y: 250 },
        transitions: [
          {
            id: 'striking-to-takedown-2',
            target: 'takedown-offense-2',
            method: 'Takedown entry',
            difficulty: 2
          }
        ]
      },
      {
        id: 'takedown-offense-2',
        name: 'Takedown Offense',
        type: 'takedown',
        description: 'Takedown execution with guard landing',
        keyPoints: ['Takedown execution', 'Position control'],
        commonMistakes: ['Poor follow-through', 'Landing in guard'],
        coordinates: { x: 250, y: 250 },
        transitions: [
          {
            id: 'takedown-to-guard-2',
            target: 'guard-top-2',
            method: 'Land in guard',
            difficulty: 2
          }
        ]
      },
      {
        id: 'guard-top-2',
        name: 'Guard Top',
        type: 'guard',
        description: 'Top position in guard, working to pass',
        keyPoints: ['Posture', 'Pressure', 'Guard passing'],
        commonMistakes: ['Poor posture', 'Getting swept'],
        coordinates: { x: 400, y: 250 },
        transitions: [
          {
            id: 'guard-to-side-2',
            target: 'side-mount-top-2',
            method: 'Guard pass',
            difficulty: 3
          }
        ]
      },
      {
        id: 'side-mount-top-2',
        name: 'Side Mount Top',
        type: 'sideMount',
        description: 'Dominant side control position',
        keyPoints: ['Hip control', 'Weight distribution', 'Submissions'],
        commonMistakes: ['Allowing escapes', 'Poor pressure'],
        coordinates: { x: 550, y: 250 },
        transitions: [
          {
            id: 'side-to-turtle-2',
            target: 'turtle-top-2',
            method: 'Force turtle position',
            difficulty: 2
          }
        ]
      },
      {
        id: 'turtle-top-2',
        name: 'Turtle Top',
        type: 'turtle',
        description: 'Control in turtle position',
        keyPoints: ['Hip control', 'Back take setup'],
        commonMistakes: ['Allowing escapes', 'Poor timing'],
        coordinates: { x: 700, y: 250 },
        transitions: [
          {
            id: 'turtle-to-back-2',
            target: 'back-mount-offense-2',
            method: 'Back take',
            difficulty: 3
          }
        ]
      },
      {
        id: 'back-mount-offense-2',
        name: 'Back Mount Offense',
        type: 'backMount',
        description: 'Final dominant position',
        keyPoints: ['Hook maintenance', 'Submission threats'],
        commonMistakes: ['Losing position', 'Poor submissions'],
        coordinates: { x: 850, y: 250 },
        transitions: []
      }
    ],
    connections: [
      {
        id: 'conn-striking-takedown-2',
        from: 'striking-offense-2',
        to: 'takedown-offense-2',
        type: 'primary',
        method: 'Takedown entry',
        difficulty: 2
      },
      {
        id: 'conn-takedown-guard-2',
        from: 'takedown-offense-2',
        to: 'guard-top-2',
        type: 'primary',
        method: 'Land in guard',
        difficulty: 2
      },
      {
        id: 'conn-guard-side-2',
        from: 'guard-top-2',
        to: 'side-mount-top-2',
        type: 'primary',
        method: 'Guard pass',
        difficulty: 3
      },
      {
        id: 'conn-side-turtle-2',
        from: 'side-mount-top-2',
        to: 'turtle-top-2',
        type: 'primary',
        method: 'Force turtle',
        difficulty: 2
      },
      {
        id: 'conn-turtle-back-2',
        from: 'turtle-top-2',
        to: 'back-mount-offense-2',
        type: 'primary',
        method: 'Back take',
        difficulty: 3
      }
    ],
    metadata: {
      estimatedTime: 25,
      prerequisites: ['Guard passing', 'Side control', 'Back take'],
      tags: ['intermediate', 'comprehensive', 'positional']
    }
  },
  {
    id: 'mount-grinder-a',
    name: 'The Mount Grinder A',
    description: 'Route with branching paths to RFC and Leglock options',
    difficulty: 'advanced',
    startPosition: 'striking-offense-3',
    endPositions: ['back-mount-offense-3', 'rfc-offense-3', 'leglock-offense-3'],
    positions: [
      {
        id: 'striking-offense-3',
        name: 'Striking Offense',
        type: 'striking',
        description: 'Initial striking position',
        keyPoints: ['Setup takedowns'],
        commonMistakes: ['Poor entries'],
        coordinates: { x: 100, y: 400 },
        transitions: [
          {
            id: 'striking-to-takedown-3',
            target: 'takedown-offense-3',
            method: 'Takedown',
            difficulty: 2
          }
        ]
      },
      {
        id: 'takedown-offense-3',
        name: 'Takedown Offense',
        type: 'takedown',
        description: 'Takedown execution',
        keyPoints: ['Control landing'],
        commonMistakes: ['Poor positioning'],
        coordinates: { x: 250, y: 400 },
        transitions: [
          {
            id: 'takedown-to-guard-3',
            target: 'guard-top-3',
            method: 'Guard position',
            difficulty: 2
          }
        ]
      },
      {
        id: 'guard-top-3',
        name: 'Guard Top',
        type: 'guard',
        description: 'Guard passing position',
        keyPoints: ['Pass guard'],
        commonMistakes: ['Getting swept'],
        coordinates: { x: 400, y: 400 },
        transitions: [
          {
            id: 'guard-to-side-3',
            target: 'side-mount-top-3',
            method: 'Guard pass',
            difficulty: 3
          }
        ]
      },
      {
        id: 'side-mount-top-3',
        name: 'Side Mount Top',
        type: 'sideMount',
        description: 'Side control with multiple transitions',
        keyPoints: ['Control hips', 'Multiple options'],
        commonMistakes: ['Limited transitions'],
        coordinates: { x: 550, y: 400 },
        transitions: [
          {
            id: 'side-to-mount-3',
            target: 'mount-top-3',
            method: 'Mount transition',
            difficulty: 3
          }
        ]
      },
      {
        id: 'mount-top-3',
        name: 'Mount Top',
        type: 'mount',
        description: 'Mount position with branching options',
        keyPoints: ['Maintain mount', 'Multiple paths'],
        commonMistakes: ['Getting reversed'],
        coordinates: { x: 700, y: 400 },
        transitions: [
          {
            id: 'mount-to-back-3',
            target: 'back-mount-offense-3',
            method: 'Back take',
            difficulty: 3
          },
          {
            id: 'mount-to-rfc-3',
            target: 'rfc-offense-3',
            method: 'RFC transition',
            difficulty: 4
          },
          {
            id: 'mount-to-leglock-3',
            target: 'leglock-offense-3',
            method: 'Leglock entry',
            difficulty: 4
          }
        ]
      },
      {
        id: 'back-mount-offense-3',
        name: 'Back Mount Offense',
        type: 'backMount',
        description: 'Back control finish',
        keyPoints: ['Maintain control'],
        commonMistakes: ['Losing hooks'],
        coordinates: { x: 850, y: 350 },
        transitions: []
      },
      {
        id: 'rfc-offense-3',
        name: 'RFC Offense',
        type: 'rfc',
        description: 'Rear facing control position',
        keyPoints: ['Control structure'],
        commonMistakes: ['Poor control'],
        coordinates: { x: 850, y: 300 },
        transitions: []
      },
      {
        id: 'leglock-offense-3',
        name: 'Leglock Offense',
        type: 'leglock',
        description: 'Leg attack position',
        keyPoints: ['Isolate leg'],
        commonMistakes: ['Poor entries'],
        coordinates: { x: 850, y: 450 },
        transitions: []
      }
    ],
    connections: [
      {
        id: 'conn-striking-takedown-3',
        from: 'striking-offense-3',
        to: 'takedown-offense-3',
        type: 'primary',
        method: 'Takedown',
        difficulty: 2
      },
      {
        id: 'conn-takedown-guard-3',
        from: 'takedown-offense-3',
        to: 'guard-top-3',
        type: 'primary',
        method: 'Guard landing',
        difficulty: 2
      },
      {
        id: 'conn-guard-side-3',
        from: 'guard-top-3',
        to: 'side-mount-top-3',
        type: 'primary',
        method: 'Guard pass',
        difficulty: 3
      },
      {
        id: 'conn-side-mount-3',
        from: 'side-mount-top-3',
        to: 'mount-top-3',
        type: 'primary',
        method: 'Mount transition',
        difficulty: 3
      },
      {
        id: 'conn-mount-back-3',
        from: 'mount-top-3',
        to: 'back-mount-offense-3',
        type: 'primary',
        method: 'Back take',
        difficulty: 3
      },
      {
        id: 'conn-mount-rfc-3',
        from: 'mount-top-3',
        to: 'rfc-offense-3',
        type: 'branch',
        method: 'RFC transition',
        difficulty: 4,
        pathType: 'quadratic-bezier'
      },
      {
        id: 'conn-mount-leglock-3',
        from: 'mount-top-3',
        to: 'leglock-offense-3',
        type: 'branch',
        method: 'Leglock entry',
        difficulty: 4,
        pathType: 'quadratic-bezier'
      }
    ],
    metadata: {
      estimatedTime: 30,
      prerequisites: ['Mount control', 'Advanced transitions'],
      tags: ['advanced', 'branching', 'multiple-endings']
    }
  },
  {
    id: 'mount-grinder-b',
    name: 'The Mount Grinder B',
    description: 'Alternative mount route with different leglock variations',
    difficulty: 'advanced',
    startPosition: 'striking-offense-4',
    endPositions: ['back-mount-offense-4', 'rfc-offense-4', 'leglock-offense-4'],
    positions: [
      {
        id: 'striking-offense-4',
        name: 'Striking Offense',
        type: 'striking',
        description: 'Initial engagement',
        keyPoints: ['Setup entries'],
        commonMistakes: ['Poor timing'],
        coordinates: { x: 100, y: 550 },
        transitions: [
          {
            id: 'striking-to-takedown-4',
            target: 'takedown-offense-4',
            method: 'Takedown',
            difficulty: 2
          }
        ]
      },
      {
        id: 'takedown-offense-4',
        name: 'Takedown Offense',
        type: 'takedown',
        description: 'Takedown to guard',
        keyPoints: ['Control fall'],
        commonMistakes: ['Bad positioning'],
        coordinates: { x: 250, y: 550 },
        transitions: [
          {
            id: 'takedown-to-guard-4',
            target: 'guard-top-4',
            method: 'Guard entry',
            difficulty: 2
          }
        ]
      },
      {
        id: 'guard-top-4',
        name: 'Guard Top',
        type: 'guard',
        description: 'Guard work',
        keyPoints: ['Pass efficiently'],
        commonMistakes: ['Stalling'],
        coordinates: { x: 400, y: 550 },
        transitions: [
          {
            id: 'guard-to-mount-4',
            target: 'mount-top-4',
            method: 'Direct mount',
            difficulty: 4
          }
        ]
      },
      {
        id: 'mount-top-4',
        name: 'Mount Top',
        type: 'mount',
        description: 'Mount with branching paths',
        keyPoints: ['Control center', 'Branch options'],
        commonMistakes: ['Limited vision'],
        coordinates: { x: 550, y: 550 },
        transitions: [
          {
            id: 'mount-to-back-4',
            target: 'back-mount-offense-4',
            method: 'Back transition',
            difficulty: 3
          },
          {
            id: 'mount-to-rfc-4',
            target: 'rfc-offense-4',
            method: 'RFC setup',
            difficulty: 4
          },
          {
            id: 'mount-to-leglock-4',
            target: 'leglock-offense-4',
            method: 'Leg attack',
            difficulty: 4
          }
        ]
      },
      {
        id: 'back-mount-offense-4',
        name: 'Back Mount Offense',
        type: 'backMount',
        description: 'Back control',
        keyPoints: ['Secure position'],
        commonMistakes: ['Rushing'],
        coordinates: { x: 700, y: 500 },
        transitions: []
      },
      {
        id: 'rfc-offense-4',
        name: 'RFC Offense',
        type: 'rfc',
        description: 'Rear facing control',
        keyPoints: ['Structure control'],
        commonMistakes: ['Poor angles'],
        coordinates: { x: 700, y: 450 },
        transitions: []
      },
      {
        id: 'leglock-offense-4',
        name: 'Leglock Offense',
        type: 'leglock',
        description: 'Leg submission',
        keyPoints: ['Leg isolation'],
        commonMistakes: ['Poor mechanics'],
        coordinates: { x: 700, y: 600 },
        transitions: []
      }
    ],
    connections: [
      {
        id: 'conn-striking-takedown-4',
        from: 'striking-offense-4',
        to: 'takedown-offense-4',
        type: 'primary',
        method: 'Takedown',
        difficulty: 2
      },
      {
        id: 'conn-takedown-guard-4',
        from: 'takedown-offense-4',
        to: 'guard-top-4',
        type: 'primary',
        method: 'Guard entry',
        difficulty: 2
      },
      {
        id: 'conn-guard-mount-4',
        from: 'guard-top-4',
        to: 'mount-top-4',
        type: 'primary',
        method: 'Direct mount',
        difficulty: 4
      },
      {
        id: 'conn-mount-back-4',
        from: 'mount-top-4',
        to: 'back-mount-offense-4',
        type: 'primary',
        method: 'Back transition',
        difficulty: 3
      },
      {
        id: 'conn-mount-rfc-4',
        from: 'mount-top-4',
        to: 'rfc-offense-4',
        type: 'branch',
        method: 'RFC setup',
        difficulty: 4,
        pathType: 'cubic-bezier'
      },
      {
        id: 'conn-mount-leglock-4',
        from: 'mount-top-4',
        to: 'leglock-offense-4',
        type: 'branch',
        method: 'Leg attack',
        difficulty: 4,
        pathType: 'cubic-bezier'
      }
    ],
    metadata: {
      estimatedTime: 35,
      prerequisites: ['Advanced mount work', 'Leg attacks'],
      tags: ['advanced', 'mount-focused', 'submissions']
    }
  }
]

export const getRouteById = (id: string): RouteDefinition | undefined => {
  return routes.find(route => route.id === id)
}

export const getPositionById = (routeId: string, positionId: string) => {
  const route = getRouteById(routeId)
  return route?.positions.find(position => position.id === positionId)
}
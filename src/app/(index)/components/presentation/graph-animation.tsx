import { cn } from '@/lib/utils'
import { useEffect, useRef } from 'react'

// Types

type Point = { x: number; y: number }
type RGB = { r: number; g: number; b: number }

interface Node {
  id: number
  x: number
  y: number
  size: number
  connections: number[]
  growProgress: number
  destructionProgress: number
  destructionStartTime: number
}

interface Edge {
  from: number
  to: number
  points: Point[]
  width: number
  opacity: number
  growProgress: number
  destructionProgress: number
  destructionStartTime: number
}

interface DataPulse {
  edgeIndex: number
  progress: number
  lastProgress: number
  speed: number
  size: number
  opacity: number
  state: 'traveling' | 'fading'
  fadeProgress: number
  fromNode: number
  toNode: number
  reverse: boolean
}

interface Explosion {
  x: number
  y: number
  progress: number
  size: number
}

interface AnimationState {
  nodes: Node[]
  edges: Edge[]
  pulses: DataPulse[]
  explosions: Explosion[]
  isGrowing: boolean
  isDestroying: boolean
  growthStartTime: number
  destructionFade: number
  centerGlow: number
  color: RGB
  isDark: boolean
}

// Constants

const CONFIG = {
  canvas: { width: 420, height: 420 },
  numNodes: 30,
  edgeFade: 10,
  pulseSpawnInterval: 800,
  maxPulses: 10,
  growthDuration: 3000,
  destructionSpeed: 0.002,
  defaultColor: { r: 228, g: 87, b: 39 },
  minNodeDistance: 80,
  nodeSize: 3.2,
  fadeDuration: 800,
} as const

// Utility Functions

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3)

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value))

const getGlowColor = (base: RGB, amount: number, isDark: boolean): RGB => ({
  r: clamp(isDark ? base.r + amount : base.r - amount, 0, 255),
  g: clamp(isDark ? base.g + amount : base.g - amount, 0, 255),
  b: clamp(isDark ? base.b + amount : base.b - amount, 0, 255),
})

const rgba = (c: RGB, a: number): string => `rgba(${c.r},${c.g},${c.b},${a})`

const getPositionOnPath = (points: Point[], progress: number): Point | null => {
  if (points.length < 2) return null
  const safeProgress = clamp(progress, 0, 1)
  const totalSegments = points.length - 1
  const segmentProgress = safeProgress * totalSegments
  const idx = clamp(Math.floor(segmentProgress), 0, totalSegments - 1)
  const t = segmentProgress - idx
  return {
    x: lerp(points[idx].x, points[idx + 1].x, t),
    y: lerp(points[idx].y, points[idx + 1].y, t),
  }
}

// Graph Generation

const generateBezierCurve = (
  from: Point,
  to: Point,
  segments: number = 20,
  curvatureScale: number = 0.3
): Point[] => {
  const points: Point[] = []
  const dx = to.x - from.x
  const dy = to.y - from.y
  const dist = Math.sqrt(dx * dx + dy * dy)

  // Control point offset perpendicular to the line
  const midX = (from.x + to.x) / 2
  const midY = (from.y + to.y) / 2
  const perpX = -dy / dist
  const perpY = dx / dist
  const curvature = (Math.random() - 0.5) * dist * curvatureScale

  const cp1x = midX + perpX * curvature
  const cp1y = midY + perpY * curvature

  // Generate bezier curve points
  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const t1 = 1 - t
    const t12 = t1 * t1
    const t2 = t * t

    points.push({
      x: t12 * from.x + 2 * t1 * t * cp1x + t2 * to.x,
      y: t12 * from.y + 2 * t1 * t * cp1y + t2 * to.y,
    })
  }

  return points
}

const createGraph = (): { nodes: Node[]; edges: Edge[] } => {
  const nodes: Node[] = []
  const edges: Edge[] = []
  const { numNodes, minNodeDistance, nodeSize, canvas } = CONFIG
  const margin = 10

  const center = { x: canvas.width / 2, y: canvas.height / 2 }
  const ringRadius = Math.min(canvas.width, canvas.height) * 0.32
  const primaryCount = Math.max(8, Math.min(14, Math.round(numNodes * 0.35)))
  const leafCount = Math.max(0, numNodes - 1 - primaryCount)

  const addNode = (x: number, y: number, size: number) => {
    nodes.push({
      id: nodes.length,
      x,
      y,
      size,
      connections: [],
      growProgress: 0,
      destructionProgress: 0,
      destructionStartTime: -1,
    })
    return nodes.length - 1
  }

  const addEdge = (
    from: number,
    to: number,
    width: number,
    opacity: number,
    curvatureScale: number
  ) => {
    const points = generateBezierCurve(
      nodes[from],
      nodes[to],
      20,
      curvatureScale
    )
    edges.push({
      from,
      to,
      points,
      width,
      opacity,
      growProgress: 0,
      destructionProgress: 0,
      destructionStartTime: -1,
    })
    nodes[from].connections.push(to)
    nodes[to].connections.push(from)
  }

  const canPlace = (x: number, y: number, minDist: number) =>
    nodes.every((n) => {
      const dx = n.x - x
      const dy = n.y - y
      return Math.sqrt(dx * dx + dy * dy) >= minDist
    })

  const centerIndex = addNode(
    center.x,
    center.y,
    nodeSize + 1.6 + Math.random() * 0.6
  )

  const primaryMeta: { index: number; angle: number }[] = []
  for (let i = 0; i < primaryCount; i++) {
    let placed = false
    let tries = 0
    let minDist = minNodeDistance * 0.9
    let fallback: Point = { x: center.x, y: center.y }

    while (!placed && minDist > minNodeDistance * 0.5) {
      tries = 0
      while (!placed && tries < 50) {
        tries++
        const angle = Math.random() * Math.PI * 2
        const radius = ringRadius * (0.7 + Math.random() * 0.6)
        const jitterX = (Math.random() - 0.5) * 14
        const jitterY = (Math.random() - 0.5) * 14
        const x = clamp(
          center.x + Math.cos(angle) * radius + jitterX,
          margin,
          canvas.width - margin
        )
        const y = clamp(
          center.y + Math.sin(angle) * radius + jitterY,
          margin,
          canvas.height - margin
        )
        fallback = { x, y }
        if (!canPlace(x, y, minDist)) continue

        const index = addNode(x, y, nodeSize + 0.7 + Math.random() * 1.0)
        const nodeAngle = Math.atan2(y - center.y, x - center.x)
        primaryMeta.push({ index, angle: nodeAngle })
        placed = true
      }
      minDist *= 0.8
    }

    if (!placed) {
      const index = addNode(
        fallback.x,
        fallback.y,
        nodeSize + 0.7 + Math.random() * 1.0
      )
      const nodeAngle = Math.atan2(fallback.y - center.y, fallback.x - center.x)
      primaryMeta.push({ index, angle: nodeAngle })
    }
  }

  const primaryIndices = primaryMeta
    .sort((a, b) => a.angle - b.angle)
    .map((item) => item.index)

  primaryIndices.forEach((idx) => {
    addEdge(centerIndex, idx, 1.2 + Math.random() * 0.8, 0.55, 0.35)
  })

  for (let i = 0; i < primaryIndices.length; i++) {
    const from = primaryIndices[i]
    const to = primaryIndices[(i + 1) % primaryIndices.length]
    addEdge(from, to, 1 + Math.random() * 0.7, 0.5, 0.4)
  }

  for (let i = 0; i < leafCount; i++) {
    const host =
      primaryIndices[Math.floor((i / leafCount) * primaryIndices.length)] ??
      primaryIndices[0]
    const hostNode = nodes[host]

    let placed = false
    let tries = 0
    let minDist = minNodeDistance * 0.75
    while (!placed && minDist > minNodeDistance * 0.4) {
      tries = 0
      while (!placed && tries < 40) {
        tries++
        const angle = Math.random() * Math.PI * 2
        const radius = 18 + Math.random() * 60
        const x = hostNode.x + Math.cos(angle) * radius
        const y = hostNode.y + Math.sin(angle) * radius
        if (
          x < margin ||
          x > canvas.width - margin ||
          y < margin ||
          y > canvas.height - margin
        )
          continue
        if (!canPlace(x, y, minDist)) continue

        const leafIndex = addNode(x, y, nodeSize + Math.random() * 0.6)
        addEdge(host, leafIndex, 0.8 + Math.random() * 0.4, 0.4, 0.25)
        placed = true
      }
      minDist *= 0.8
    }
  }

  return { nodes, edges }
}

// Drawing Functions

const drawPath = (
  ctx: CanvasRenderingContext2D,
  points: Point[],
  startProgress: number,
  endProgress: number,
  color: string,
  width: number
): void => {
  if (points.length < 2) return

  // Clamp progress values to valid range
  const safeStart = clamp(startProgress, 0, 1)
  const safeEnd = clamp(endProgress, 0, 1)
  if (safeStart >= safeEnd) return

  const totalSegments = points.length - 1
  const startFloat = safeStart * totalSegments
  const endFloat = safeEnd * totalSegments
  const startIdx = clamp(Math.floor(startFloat), 0, totalSegments - 1)
  const endIdx = clamp(Math.floor(endFloat), 0, totalSegments - 1)
  const startT = startFloat - startIdx
  const endT = endFloat - endIdx

  ctx.beginPath()
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  // Starting point
  const startPoint =
    startIdx < totalSegments
      ? {
          x: lerp(points[startIdx].x, points[startIdx + 1].x, startT),
          y: lerp(points[startIdx].y, points[startIdx + 1].y, startT),
        }
      : points[totalSegments]

  ctx.moveTo(startPoint.x, startPoint.y)

  // Draw full segments
  const drawStart = startT > 0 ? startIdx + 1 : startIdx
  for (let i = drawStart + 1; i <= endIdx && i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y)
  }

  // Partial end segment
  if (endIdx < totalSegments && endT > 0) {
    ctx.lineTo(
      lerp(points[endIdx].x, points[endIdx + 1].x, endT),
      lerp(points[endIdx].y, points[endIdx + 1].y, endT)
    )
  }

  ctx.stroke()
}

const drawNode = (
  ctx: CanvasRenderingContext2D,
  node: Node,
  color: string
): void => {
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2)
  ctx.fill()
}

const drawRadialGlow = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  colorStops: [number, string][]
): void => {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
  colorStops.forEach(([stop, color]) => gradient.addColorStop(stop, color))
  ctx.beginPath()
  ctx.fillStyle = gradient
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()
}

const drawEdgeFade = (ctx: CanvasRenderingContext2D): void => {
  const { width, height } = CONFIG.canvas
  const size = CONFIG.edgeFade

  ctx.globalCompositeOperation = 'destination-out'

  const edges = [
    { x1: 0, y1: 0, x2: size, y2: 0, rect: [0, 0, size, height] },
    {
      x1: width - size,
      y1: 0,
      x2: width,
      y2: 0,
      rect: [width - size, 0, size, height],
    },
    { x1: 0, y1: 0, x2: 0, y2: size, rect: [0, 0, width, size] },
    {
      x1: 0,
      y1: height - size,
      x2: 0,
      y2: height,
      rect: [0, height - size, width, size],
    },
  ]

  edges.forEach(({ x1, y1, x2, y2, rect }, i) => {
    const gradient = ctx.createLinearGradient(x1, y1, x2, y2)
    gradient.addColorStop(
      i < 2 ? 0 : 0,
      i % 2 === 0 ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0)'
    )
    gradient.addColorStop(1, i % 2 === 0 ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,1)')
    ctx.fillStyle = gradient
    ctx.fillRect(...(rect as [number, number, number, number]))
  })

  ctx.globalCompositeOperation = 'source-over'
}

// Main Component

export default function GraphAnimation({
  className,
  onPulsesStart,
}: {
  className?: string
  onPulsesStart?: () => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef<AnimationState>({
    nodes: [],
    edges: [],
    pulses: [],
    explosions: [],
    isGrowing: true,
    isDestroying: false,
    growthStartTime: 0,
    destructionFade: 0,
    centerGlow: 0,
    color: CONFIG.defaultColor,
    isDark: true,
  })
  const animationRef = useRef<number>(0)
  const hasNotifiedRef = useRef(false)
  const onPulsesStartRef = useRef(onPulsesStart)

  useEffect(() => {
    onPulsesStartRef.current = onPulsesStart
  }, [onPulsesStart])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const state = stateRef.current

    // Theme and color detection
    const updateTheme = () => {
      state.isDark = document.documentElement.classList.contains('dark')
      const primary = getComputedStyle(document.documentElement)
        .getPropertyValue('--primary')
        .trim()
      if (primary) {
        const temp = document.createElement('div')
        temp.style.color = primary
        document.body.appendChild(temp)
        const rgbColor = getComputedStyle(temp).color
        document.body.removeChild(temp)
        const match = rgbColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
        if (match) {
          state.color = {
            r: parseInt(match[1]),
            g: parseInt(match[2]),
            b: parseInt(match[3]),
          }
        }
      }
    }

    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const size = Math.min(
        canvas.getBoundingClientRect().width,
        canvas.getBoundingClientRect().height
      )
      if (size === 0) return
      canvas.width = canvas.height = size * dpr
      ctx.setTransform(
        (size * dpr) / CONFIG.canvas.width,
        0,
        0,
        (size * dpr) / CONFIG.canvas.height,
        0,
        0
      )
    }

    const spawnPulse = () => {
      if (state.edges.length === 0) return
      const edgeIndex = Math.floor(Math.random() * state.edges.length)
      const edge = state.edges[edgeIndex]
      const reverse = Math.random() < 0.5

      state.pulses.push({
        edgeIndex,
        progress: 0,
        lastProgress: 0,
        speed: 0.0015 + Math.random() * 0.002,
        size: 2.8 + Math.random() * 1.8,
        opacity: 0.9,
        state: 'traveling',
        fadeProgress: 0,
        fromNode: reverse ? edge.to : edge.from,
        toNode: reverse ? edge.from : edge.to,
        reverse,
      })
    }

    const triggerDestruction = () => {
      if (state.isGrowing || state.isDestroying || state.nodes.length === 0)
        return
      state.isDestroying = true
      state.destructionFade = 0
      state.centerGlow = 1
      state.explosions = []
      const now = performance.now()

      // Start destruction from the node with highest degree (most connections)
      let startNode = 0
      let maxDegree = state.nodes[0].connections.length
      for (let i = 1; i < state.nodes.length; i++) {
        if (state.nodes[i].connections.length > maxDegree) {
          maxDegree = state.nodes[i].connections.length
          startNode = i
        }
      }
      state.nodes[startNode].destructionStartTime = now
      state.nodes[startNode].destructionProgress = 0
    }

    const update = (dt: number, time: number) => {
      const { nodes, edges, pulses, explosions } = state

      if (state.isDestroying) {
        if (state.centerGlow > 0)
          state.centerGlow = Math.max(0, state.centerGlow - dt * 0.003)

        let allNodesDestroyed = true

        // Update node destruction
        for (const node of nodes) {
          if (node.destructionStartTime < 0) {
            allNodesDestroyed = false
            continue
          }

          const newProgress = Math.min(
            1,
            (time - node.destructionStartTime) * CONFIG.destructionSpeed
          )
          node.destructionProgress = newProgress

          // Propagate destruction to connected nodes
          if (newProgress > 0.5) {
            for (const connectedId of node.connections) {
              const connected = nodes[connectedId]
              if (connected && connected.destructionStartTime < 0) {
                connected.destructionStartTime = time
              }
            }
          }

          if (node.destructionProgress < 1) allNodesDestroyed = false
        }

        // Update edge destruction based on nodes
        for (const edge of edges) {
          const fromNode = nodes[edge.from]
          const toNode = nodes[edge.to]

          if (
            fromNode.destructionStartTime >= 0 ||
            toNode.destructionStartTime >= 0
          ) {
            const maxProgress = Math.max(
              fromNode.destructionProgress,
              toNode.destructionProgress
            )
            edge.destructionProgress = maxProgress

            // Explode pulses on destroyed edges
            for (let i = pulses.length - 1; i >= 0; i--) {
              const pulse = pulses[i]
              const pulseProgress = pulse.reverse
                ? 1 - pulse.progress
                : pulse.progress
              if (
                pulse.edgeIndex === edges.indexOf(edge) &&
                pulseProgress <= maxProgress
              ) {
                const pos = getPositionOnPath(edge.points, pulseProgress)
                if (pos) {
                  explosions.push({
                    x: pos.x,
                    y: pos.y,
                    progress: 0,
                    size: pulse.size * 1.5,
                  })
                }
                pulses.splice(i, 1)
              }
            }
          }
        }

        // Update explosions
        for (let i = explosions.length - 1; i >= 0; i--) {
          explosions[i].progress += dt * 0.004
          if (explosions[i].progress >= 1) explosions.splice(i, 1)
        }

        // Fade out and restart
        if (allNodesDestroyed && explosions.length === 0) {
          state.destructionFade += dt / CONFIG.fadeDuration
          if (state.destructionFade >= 1) {
            state.isDestroying = false
            state.destructionFade = 0
            state.centerGlow = 0
            const graph = createGraph()
            state.nodes = graph.nodes
            state.edges = graph.edges
            state.pulses = []
            state.explosions = []
            state.isGrowing = true
            state.growthStartTime = performance.now()
          }
        }
        return
      }

      if (state.isGrowing) {
        const elapsed = time - state.growthStartTime

        // Grow nodes
        nodes.forEach((node, i) => {
          const start = (i / nodes.length) * 1000
          const duration = 1000
          node.growProgress = easeOutCubic(
            clamp((elapsed - start) / duration, 0, 1)
          )
        })

        // Grow edges
        edges.forEach((edge, i) => {
          const start = (i / edges.length) * 1500
          const duration = 1000
          edge.growProgress = easeOutCubic(
            clamp((elapsed - start) / duration, 0, 1)
          )
        })

        const allNodesGrown = nodes.every((n) => n.growProgress >= 1)
        const allEdgesGrown = edges.every((e) => e.growProgress >= 1)
        if (
          elapsed >= CONFIG.growthDuration ||
          (allNodesGrown && allEdgesGrown)
        ) {
          state.isGrowing = false
          nodes.forEach((n) => (n.growProgress = 1))
          edges.forEach((e) => (e.growProgress = 1))
        }
      }

      // Update pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i]
        const edge = edges[pulse.edgeIndex]
        if (!edge) {
          pulses.splice(i, 1)
          continue
        }

        if (pulse.state === 'traveling') {
          pulse.lastProgress = pulse.progress
          pulse.progress += pulse.speed * dt * 0.1

          if (pulse.progress >= 1) {
            pulse.progress = 1
            pulse.state = 'fading'
            pulse.fadeProgress = 0
          }
        } else {
          pulse.fadeProgress += dt * 0.002
          if (pulse.fadeProgress >= 1) pulses.splice(i, 1)
        }
      }
    }

    const draw = () => {
      const {
        nodes,
        edges,
        pulses,
        explosions,
        color,
        isDark,
        destructionFade,
      } = state
      const { width, height } = CONFIG.canvas

      ctx.clearRect(0, 0, width, height)

      const globalOpacity = 1 - destructionFade
      const grey = isDark ? 80 : 180

      // Draw edges
      for (const edge of edges) {
        if (edge.points.length < 2 || edge.growProgress <= 0) continue

        // Grey (destroyed) portion
        if (edge.destructionProgress > 0) {
          drawPath(
            ctx,
            edge.points,
            0,
            edge.destructionProgress,
            rgba({ r: grey, g: grey, b: grey }, edge.opacity * globalOpacity),
            edge.width
          )
        }

        // Colored portion
        if (edge.destructionProgress < edge.growProgress) {
          drawPath(
            ctx,
            edge.points,
            edge.destructionProgress,
            edge.growProgress,
            rgba(color, edge.opacity * globalOpacity),
            edge.width
          )
        }
      }

      // Draw nodes
      for (const node of nodes) {
        if (node.growProgress <= 0) continue

        const isDestroyed = node.destructionProgress > 0
        const nodeColor = isDestroyed ? { r: grey, g: grey, b: grey } : color
        // Fade in based on growProgress, fade out based on destruction
        const fadeIn = easeOutCubic(node.growProgress)
        const opacity =
          fadeIn * (1 - node.destructionProgress) * globalOpacity * 0.8

        drawNode(ctx, node, rgba(nodeColor, opacity))
      }

      // Explosions
      for (const exp of explosions) {
        const radius = exp.size * (1 + exp.progress * 4)
        const opacity = (1 - exp.progress) * 0.8
        const glowColor = getGlowColor(color, 100, isDark)
        drawRadialGlow(ctx, exp.x, exp.y, radius, [
          [0, `rgba(255,255,255,${opacity})`],
          [0.3, rgba(glowColor, opacity * 0.7)],
          [1, rgba(color, 0)],
        ])
      }

      // Pulses
      for (const pulse of pulses) {
        const edge = edges[pulse.edgeIndex]
        if (!edge?.points.length) continue

        const edgeProgress = Math.min(pulse.progress, edge.growProgress)
        const pathProgress = pulse.reverse ? 1 - edgeProgress : edgeProgress
        const pos = getPositionOnPath(edge.points, pathProgress)
        if (!pos) continue

        const isFading = pulse.state === 'fading'
        const fadeT = pulse.fadeProgress
        const opacity =
          pulse.opacity * (isFading ? 1 - fadeT : 1) * globalOpacity
        const size = pulse.size * (isFading ? 1 + fadeT * 0.5 : 1)

        // Glow
        const glowSize = pulse.size * (isFading ? 2 + fadeT * 3 : 2)
        const glowOpacity = isFading ? (1 - fadeT) * 0.8 : pulse.opacity * 0.4
        const glowColor = getGlowColor(color, isFading ? 60 : 40, isDark)
        drawRadialGlow(ctx, pos.x, pos.y, glowSize, [
          [0, rgba(glowColor, glowOpacity * globalOpacity)],
          [1, rgba(color, 0)],
        ])

        // Core
        ctx.beginPath()
        ctx.fillStyle = rgba(getGlowColor(color, 60, isDark), opacity)
        ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2)
        ctx.fill()

        // Highlight
        ctx.beginPath()
        ctx.fillStyle = isDark
          ? `rgba(255,255,255,${opacity * 0.6})`
          : `rgba(0,0,0,${opacity * 0.4})`
        ctx.arc(pos.x, pos.y, size * 0.4, 0, Math.PI * 2)
        ctx.fill()
      }

      drawEdgeFade(ctx)
    }

    // Initialize
    updateTheme()
    setupCanvas()
    const graph = createGraph()
    state.nodes = graph.nodes
    state.edges = graph.edges
    state.growthStartTime = performance.now()

    let lastTime = performance.now()
    let lastPulse = performance.now()

    const animate = (time: number) => {
      const dt = Math.min(time - lastTime, 50)
      lastTime = time

      if (
        !state.isGrowing &&
        !state.isDestroying &&
        time - lastPulse > CONFIG.pulseSpawnInterval &&
        state.pulses.length < CONFIG.maxPulses
      ) {
        spawnPulse()
        lastPulse = time
        if (!hasNotifiedRef.current) {
          hasNotifiedRef.current = true
          onPulsesStartRef.current?.()
        }
      }

      update(dt, time)
      draw()
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    // Observers
    const parent = canvas.parentElement
    const resizeObserver = new ResizeObserver(setupCanvas)
    if (parent) resizeObserver.observe(parent)

    const themeObserver = new MutationObserver(updateTheme)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    canvas.addEventListener('click', triggerDestruction)

    return () => {
      cancelAnimationFrame(animationRef.current)
      resizeObserver.disconnect()
      themeObserver.disconnect()
      canvas.removeEventListener('click', triggerDestruction)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn('aspect-square cursor-pointer', className)}
    />
  )
}

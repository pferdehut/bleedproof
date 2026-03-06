"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { LogoSvg } from "@/components/logo-svg"

interface Ball {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

export function InteractiveLogoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [orientationType, setOrientationType] = useState<string>("portrait-primary")

  const gameStateRef = useRef<{
    balls: Ball[]
    tiltX: number
    tiltY: number
    animationId: number | null
    collisionPaths: Path2D[]
  }>({
    balls: [],
    tiltX: 0,
    tiltY: 0,
    animationId: null,
    collisionPaths: [],
  })

  const ballColors = ["#BFFF00", "#FF6B6B", "#4ECDC4", "#FFE66D", "#FF00FF", "#00D4FF"]

  // SVG path data from the bleedproof.svg logo - these become collision walls
  const svgPathData = [
    "M15.63,0v80.68c0,3.91-1.47,7.33-4.07,9.78h4.07v18.26c0,7.13-3.75,12.15-10.59,13.28h10.45v103.83c0,7.5-5.38,13.04-13.37,13.04H0v5.38h18.07L18.07,0H15.63z",
    "M2.75,11.9H0.14v74h1.79c0.49,0,0.82-0.49,0.82-1.47V11.9z",
    "M33.25,216.05V133.9h-2.58v83.45h1.94C32.92,217.35,33.25,216.7,33.25,216.05z",
    "M0,226.97h1.96c0.33,0,0.65-0.65,0.65-1.3V133.9H0V226.97z",
    "M124.67,110.18c0.49,0,0.65-0.65,0.65-1.3V11.9h-2.61v98.29H124.67z",
    "M2.75,97.8H0.14v12.39h1.79c0.49,0,0.82-0.65,0.82-1.47V97.8z",
    "M30.67,229.25h2.74v15h-2.74z",
    "M122.75,238.87h15.61v5.38h-15.61z",
    "M125.36,133.9h-2.61v93.07h15.61v-2.61h-13v-90.46z",
    "M109.84,0h-2.61v92.74H94.68V11.9h-2.61v83.45h15.16v11.9H92.07v2.61h15.16V122l0.04,108.72c0,8.15-4.89,13.53-13.69,13.53h16.3l0.01-122L109.84,0z",
    "M127.51,122h10.85v-13.12C138.36,115.49,133.92,120.83,127.51,122z",
    "M63.75,230.72V133.9h-1.63c-0.65,0-0.98,0.82-0.98,1.63v96.66h1.79C63.42,232.18,63.75,231.53,63.75,230.72z",
    "M58.85,122.25h-10.3V0h-17.6v110.18h2.61V15h12.55L46,212.14c0,3.91-1.45,7.33-4.03,9.78h4.2v22.33h2.11V135.53C48.26,128.39,52.01,123.38,58.85,122.25z",
    "M89.49,122.25h-10.3V0h-2.61v92.74H64.04V11.9h-2.61v83.45h15.16v11.9H61.43v2.61h15.16l0.04,120.86c0,8.15-4.89,13.53-13.69,13.53h15.97V135.53C78.91,128.39,82.66,123.38,89.49,122.25z",
    "M94.39,230.72V133.9h-1.63c-0.65,0-0.98,0.82-0.98,1.63v96.66h1.79C94.07,232.18,94.39,231.53,94.39,230.72z",
  ]

  // Initialize collision paths from SVG data
  useEffect(() => {
    const scale = 2 // Scale up for better gameplay
    const paths: Path2D[] = []

    svgPathData.forEach((d) => {
      const path = new Path2D()
      // Scale the path by wrapping in a transform
      const scaledPath = new Path2D(`M${d.substring(1)}`)
      paths.push(scaledPath)
    })

    gameStateRef.current.collisionPaths = paths
  }, [])

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window)
      if (window.screen?.orientation?.type) {
        setOrientationType(window.screen.orientation.type)
      } else if (window.innerHeight > window.innerWidth) {
        setOrientationType("portrait-primary")
      } else {
        setOrientationType("landscape-primary")
      }
    }
    checkDevice()
    window.addEventListener("resize", checkDevice)
    window.addEventListener("orientationchange", checkDevice)
    if (window.screen?.orientation) {
      window.screen.orientation.addEventListener("change", checkDevice)
    }
    return () => {
      window.removeEventListener("resize", checkDevice)
      window.removeEventListener("orientationchange", checkDevice)
      if (window.screen?.orientation) {
        window.screen.orientation.removeEventListener("change", checkDevice)
      }
    }
  }, [])

  useEffect(() => {
    if (!gameStarted) return

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const gamma = event.gamma || 0
      const beta = event.beta || 0

      if (orientationType.startsWith("portrait")) {
        if (orientationType === "portrait-secondary") {
          gameStateRef.current.tiltX = Math.max(-1, Math.min(1, -gamma / 45))
          gameStateRef.current.tiltY = Math.max(-1, Math.min(1, -(beta - 45) / 45))
        } else {
          gameStateRef.current.tiltX = Math.max(-1, Math.min(1, gamma / 45))
          gameStateRef.current.tiltY = Math.max(-1, Math.min(1, (beta - 45) / 45))
        }
      } else {
        if (orientationType === "landscape-primary") {
          gameStateRef.current.tiltX = Math.max(-1, Math.min(1, (beta - 45) / 45))
          gameStateRef.current.tiltY = Math.max(-1, Math.min(1, -gamma / 45))
        } else if (orientationType === "landscape-secondary") {
          gameStateRef.current.tiltX = Math.max(-1, Math.min(1, -(beta - 45) / 45))
          gameStateRef.current.tiltY = Math.max(-1, Math.min(1, gamma / 45))
        } else {
          const angle = window.screen?.orientation?.angle || 0
          if (angle === 90) {
            gameStateRef.current.tiltX = Math.max(-1, Math.min(1, (beta - 45) / 45))
            gameStateRef.current.tiltY = Math.max(-1, Math.min(1, -gamma / 45))
          } else {
            gameStateRef.current.tiltX = Math.max(-1, Math.min(1, -(beta - 45) / 45))
            gameStateRef.current.tiltY = Math.max(-1, Math.min(1, gamma / 45))
          }
        }
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!canvasRef.current) return
      const rect = canvasRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      gameStateRef.current.tiltX = Math.max(-1, Math.min(1, (event.clientX - centerX) / (rect.width / 2)))
      gameStateRef.current.tiltY = Math.max(-1, Math.min(1, (event.clientY - centerY) / (rect.height / 2)))
    }

    if (isMobile) {
      if (typeof DeviceOrientationEvent !== "undefined") {
        if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
          ;(DeviceOrientationEvent as any)
            .requestPermission()
            .then((response: string) => {
              if (response === "granted") {
                window.addEventListener("deviceorientation", handleOrientation)
              }
            })
            .catch(console.error)
        } else {
          window.addEventListener("deviceorientation", handleOrientation)
        }
      }
    } else {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isMobile, gameStarted, orientationType])

  // Game loop with SVG path collision
  useEffect(() => {
    if (!gameStarted || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const WIDTH = 276.72
    const HEIGHT = 488.5
    const SCALE = 4
    const FRICTION = 0.98
    const BOUNCE = 0.6
    const TILT_STRENGTH = 0.3

    // Create scaled collision paths
    const collisionPaths: Path2D[] = svgPathData.map((d) => {
      const path = new Path2D()
      path.addPath(new Path2D(d), { a: SCALE, d: SCALE, e: 0, f: 0 })
      return path
    })

    // Check if point is inside any path (collision detection)
    const checkCollision = (
      x: number,
      y: number,
      radius: number,
    ): { hit: boolean; normalX: number; normalY: number } => {
      // Check multiple points around the ball for collision
      const angles = [
        0,
        Math.PI / 4,
        Math.PI / 2,
        (3 * Math.PI) / 4,
        Math.PI,
        (5 * Math.PI) / 4,
        (3 * Math.PI) / 2,
        (7 * Math.PI) / 4,
      ]

      for (const angle of angles) {
        const checkX = x + Math.cos(angle) * radius
        const checkY = y + Math.sin(angle) * radius

        for (const path of collisionPaths) {
          if (ctx.isPointInPath(path, checkX, checkY)) {
            // Return normal pointing away from collision
            return {
              hit: true,
              normalX: -Math.cos(angle),
              normalY: -Math.sin(angle),
            }
          }
        }
      }
      return { hit: false, normalX: 0, normalY: 0 }
    }

    const gameLoop = () => {
      const state = gameStateRef.current

      // Clear canvas with background
      ctx.fillStyle = "#ff6b6b"
      ctx.fillRect(0, 0, WIDTH * SCALE, HEIGHT * SCALE)

      // Draw SVG paths as walls (the logo shapes)
      ctx.fillStyle = "#fafaf8"
      collisionPaths.forEach((path) => {
        ctx.fill(path)
      })

      // Draw tilt indicator
      const indicatorX = (WIDTH * SCALE) / 2 + state.tiltX * 40
      const indicatorY = 30 + state.tiltY * 15
      ctx.beginPath()
      ctx.arc(indicatorX, indicatorY, 6, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255,255,255,0.4)"
      ctx.fill()

      // Update and draw balls
      state.balls.forEach((ball) => {
        // Apply tilt force
        ball.vx += state.tiltX * TILT_STRENGTH
        ball.vy += state.tiltY * TILT_STRENGTH

        // Apply friction
        ball.vx *= FRICTION
        ball.vy *= FRICTION

        // Limit max speed
        const maxSpeed = 8
        const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy)
        if (speed > maxSpeed) {
          ball.vx = (ball.vx / speed) * maxSpeed
          ball.vy = (ball.vy / speed) * maxSpeed
        }

        // Move ball
        const newX = ball.x + ball.vx
        const newY = ball.y + ball.vy

        // Check collision with SVG paths
        const collision = checkCollision(newX, newY, ball.radius)

        if (collision.hit) {
          // Reflect velocity based on collision normal
          const dot = ball.vx * collision.normalX + ball.vy * collision.normalY
          ball.vx = (ball.vx - 2 * dot * collision.normalX) * BOUNCE
          ball.vy = (ball.vy - 2 * dot * collision.normalY) * BOUNCE

          // Push ball out of collision
          ball.x += collision.normalX * 2
          ball.y += collision.normalY * 2

          // Vibrate on collision (mobile)
          if (isMobile && navigator.vibrate) {
            navigator.vibrate(10)
          }
        } else {
          ball.x = newX
          ball.y = newY
        }

        // Wall boundaries
        if (ball.x - ball.radius < 0) {
          ball.x = ball.radius
          ball.vx *= -BOUNCE
        }
        if (ball.x + ball.radius > WIDTH * SCALE) {
          ball.x = WIDTH * SCALE - ball.radius
          ball.vx *= -BOUNCE
        }
        if (ball.y - ball.radius < 0) {
          ball.y = ball.radius
          ball.vy *= -BOUNCE
        }
        if (ball.y + ball.radius > HEIGHT * SCALE) {
          ball.y = HEIGHT * SCALE - ball.radius
          ball.vy *= -BOUNCE
        }

        // Ball-to-ball collision
        state.balls.forEach((other) => {
          if (other === ball) return
          const dx = other.x - ball.x
          const dy = other.y - ball.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const minDist = ball.radius + other.radius

          if (dist < minDist && dist > 0) {
            const angle = Math.atan2(dy, dx)
            const overlap = minDist - dist

            ball.x -= Math.cos(angle) * overlap * 0.5
            ball.y -= Math.sin(angle) * overlap * 0.5
            other.x += Math.cos(angle) * overlap * 0.5
            other.y += Math.sin(angle) * overlap * 0.5

            const tempVx = ball.vx
            const tempVy = ball.vy
            ball.vx = other.vx * BOUNCE
            ball.vy = other.vy * BOUNCE
            other.vx = tempVx * BOUNCE
            other.vy = tempVy * BOUNCE
          }
        })

        // Draw ball shadow
        ctx.beginPath()
        ctx.arc(ball.x + 3, ball.y + 3, ball.radius, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(0,0,0,0.3)"
        ctx.fill()

        // Draw ball
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
        ctx.fillStyle = ball.color
        ctx.fill()
        ctx.strokeStyle = "#000"
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw highlight
        ctx.beginPath()
        ctx.arc(ball.x - 4, ball.y - 4, ball.radius * 0.3, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255,255,255,0.7)"
        ctx.fill()
      })

      // Draw instructions
      ctx.fillStyle = "#fafaf8"
      ctx.font = "bold 14px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(
        isMobile ? "Tilt device to roll marbles" : "Move mouse to tilt",
        (WIDTH * SCALE) / 2,
        HEIGHT * SCALE - 15,
      )
      ctx.textAlign = "left"

      state.animationId = requestAnimationFrame(gameLoop)
    }

    gameLoop()

    return () => {
      if (gameStateRef.current.animationId) {
        cancelAnimationFrame(gameStateRef.current.animationId)
      }
    }
  }, [gameStarted, isMobile])

  const startGame = useCallback(async () => {
    if (isMobile && typeof DeviceOrientationEvent !== "undefined") {
      if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
        try {
          const response = await (DeviceOrientationEvent as any).requestPermission()
          if (response !== "granted") {
            alert("Please allow motion access to play the marble run!")
            return
          }
        } catch {
          console.error("Could not request motion permission")
        }
      }
    }

    // Spawn 5 marbles in open areas (between the logo letters)
    const spawnPoints = [
      { x: 70, y: 60 },
      { x: 180, y: 200 },
      { x: 240, y: 350 },
      { x: 100, y: 400 },
      { x: 200, y: 100 },
    ]

    const SCALE = 2
    spawnPoints.forEach((point, i) => {
      const color = ballColors[i % ballColors.length]
      gameStateRef.current.balls.push({
        x: point.x * SCALE,
        y: point.y * SCALE,
        vx: 0,
        vy: 0,
        radius: 14,
        color,
      })
    })

    setGameStarted(true)
  }, [isMobile])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full pl-6 min-h-[300px] md:min-h-[400px] flex items-center justify-end box box-coral"
    >
      {!gameStarted ? (
        <div className="absolute inset-0 box flex flex-col items-center justify-end w-full h-full z-10">
          <div className="w-full h-full flex justify-end">
            <LogoSvg />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full">
            <h2 className="text-xl font-display uppercase text-black mb-2">Marble Run</h2>
            <p className="text-sm text-black/70 mb-6 text-center px-4">
              {isMobile
                ? "Tilt your device to roll marbles through the logo"
                : "Move your mouse to tilt and roll marbles"}
            </p>
            <button
              onClick={startGame}
              className="px-8 py-3 bg-lime text-black font-bold uppercase hover:bg-coral transition-colors"
            >
              Start
            </button>
          </div>
        </div>
      ) : null}

      <canvas
        ref={canvasRef}
        width={276.72 * 2}
        height={488.5 * 2}
        className={`${gameStarted ? "opacity-100" : "opacity-0"} max-w-full max-h-full`}
        style={{ imageRendering: "crisp-edges" }}
      />
      <LogoSvg />
    </div>
  )
}

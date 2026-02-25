"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  radius: number
  baseOpacity: number
  twinkleSpeed: number
  phase: number
  drift: number
}

export function NightBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = 0
    let h = 0

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Three layers of stars: distant (tiny, slow), mid, close (brighter, faster)
    const createStars = (count: number, minR: number, maxR: number, minOp: number, maxOp: number, speed: number): Star[] =>
      Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * (maxR - minR) + minR,
        baseOpacity: Math.random() * (maxOp - minOp) + minOp,
        twinkleSpeed: Math.random() * speed + speed * 0.3,
        phase: Math.random() * Math.PI * 2,
        drift: (Math.random() - 0.5) * 0.02,
      }))

    const farStars = createStars(60, 0.3, 0.7, 0.06, 0.18, 0.004)
    const midStars = createStars(30, 0.6, 1.2, 0.12, 0.3, 0.007)
    const nearStars = createStars(12, 1.0, 1.8, 0.2, 0.45, 0.01)

    let animationId: number
    let time = 0

    const drawStar = (star: Star, color: string) => {
      const flicker = Math.sin(time * star.twinkleSpeed + star.phase) * 0.5 + 0.5
      const opacity = star.baseOpacity * (0.4 + flicker * 0.6)

      // Soft outer glow for brighter stars
      if (star.radius > 1) {
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 4)
        gradient.addColorStop(0, `rgba(${color}, ${opacity * 0.3})`)
        gradient.addColorStop(1, `rgba(${color}, 0)`)
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius * 4, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }

      // Core
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${color}, ${opacity})`
      ctx.fill()

      // Drift slowly
      star.y += star.drift
      if (star.y < -5) star.y = h + 5
      if (star.y > h + 5) star.y = -5
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h)

      farStars.forEach((s) => drawStar(s, "160, 160, 200"))
      midStars.forEach((s) => drawStar(s, "180, 175, 220"))
      nearStars.forEach((s) => drawStar(s, "200, 195, 240"))

      time++
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}

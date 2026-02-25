"use client"

import { useEffect, useRef } from "react"

export function NightBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const stars = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1 + 0.2,
      opacity: Math.random() * 0.35 + 0.05,
      twinkleSpeed: Math.random() * 0.008 + 0.002,
      phase: Math.random() * Math.PI * 2,
    }))

    let animationId: number
    let time = 0

    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        const opacity = star.opacity + Math.sin(time * star.twinkleSpeed + star.phase) * 0.1
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180, 175, 220, ${Math.max(0.02, opacity)})`
        ctx.fill()
      })

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
      className="fixed inset-0 pointer-events-none opacity-60"
      aria-hidden="true"
    />
  )
}

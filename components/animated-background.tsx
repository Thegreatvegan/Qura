"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type Particle = {
  id: number
  x: number
  y: number
  size: number
  color: string
  duration: number
  delay: number
}

type SmallDot = {
  id: number
  startX: number
  startY: number
  endX: number
  endY: number
  size: number
  opacity: number
  duration: number
  delay: number
}

export default function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [smallDots, setSmallDots] = useState<SmallDot[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight * 3, // Make it taller than viewport to cover scrolling content
    })

    // Handle window resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight * 3,
      })
    }

    window.addEventListener("resize", handleResize)

    // Generate particles
    const particlesArray: Particle[] = []
    const colors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"]

    for (let i = 0; i < 40; i++) {
      particlesArray.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 80 + 40,
        delay: Math.random() * -20,
      })
    }

    setParticles(particlesArray)

    // Generate small black dots
    const dotsArray: SmallDot[] = []

    for (let i = 0; i < 120; i++) {
      // Create random start and end positions
      const startX = Math.random() * 100
      const startY = Math.random() * 100
      const endX = Math.random() * 100
      const endY = Math.random() * 100

      dotsArray.push({
        id: i,
        startX,
        startY,
        endX,
        endY,
        size: Math.random() * 2 + 0.5, // Smaller dots
        opacity: Math.random() * 0.5 + 0.1, // Varying opacity
        duration: Math.random() * 20 + 10, // Faster movement
        delay: Math.random() * -10,
      })
    }

    setSmallDots(dotsArray)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Larger colored particles */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-full opacity-30"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            filter: `blur(${particle.size > 6 ? 2 : 0}px)`,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            x: [Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
            y: [Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Small black dots */}
      {smallDots.map((dot) => (
        <motion.div
          key={`dot-${dot.id}`}
          className="absolute rounded-full"
          style={{
            width: dot.size,
            height: dot.size,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            left: `${dot.startX}%`,
            top: `${dot.startY}%`,
            opacity: dot.opacity,
          }}
          animate={{
            left: [`${dot.startX}%`, `${(dot.startX + dot.endX) / 2 + (Math.random() * 10 - 5)}%`, `${dot.endX}%`],
            top: [`${dot.startY}%`, `${(dot.startY + dot.endY) / 2 + (Math.random() * 10 - 5)}%`, `${dot.endY}%`],
            opacity: [dot.opacity, dot.opacity * 1.5, dot.opacity],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: dot.duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: dot.delay,
          }}
        />
      ))}

      {/* Additional fast-moving dots */}
      {Array.from({ length: 60 }).map((_, i) => (
        <motion.div
          key={`fast-dot-${i}`}
          className="absolute rounded-full bg-black"
          style={{
            width: Math.random() * 1 + 0.5,
            height: Math.random() * 1 + 0.5,
            opacity: Math.random() * 0.3 + 0.1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            left: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
            top: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
          }}
          transition={{
            duration: Math.random() * 8 + 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "linear",
            delay: Math.random() * -5,
          }}
        />
      ))}

      {/* Data stream lines */}
      {Array.from({ length: 15 }).map((_, i) => {
        const startX = Math.random() * 100
        const startY = Math.random() * 100
        const angle = Math.random() * Math.PI * 2
        const distance = Math.random() * 30 + 10
        const endX = startX + Math.cos(angle) * distance
        const endY = startY + Math.sin(angle) * distance

        return (
          <motion.div
            key={`data-stream-${i}`}
            className="absolute bg-black opacity-10"
            style={{
              height: 1,
              width: 0,
              left: `${startX}%`,
              top: `${startY}%`,
              transformOrigin: "left center",
              transform: `rotate(${angle}rad)`,
            }}
            animate={{
              width: [0, `${distance}px`, 0],
              opacity: [0, 0.1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: Math.random() * 4,
              ease: "easeInOut",
              delay: Math.random() * -5,
            }}
          />
        )
      })}
    </div>
  )
}


"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function SimplifiedMoleculeViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isRotating, setIsRotating] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [lastX, setLastX] = useState(0)
  const [lastY, setLastY] = useState(0)
  const [rotationX, setRotationX] = useState(0)
  const [rotationY, setRotationY] = useState(0)

  // Create a simplified molecular structure
  const createMolecule = () => {
    // Define atoms as spheres with positions
    const atoms = [
      { x: 0, y: 0, z: 0, radius: 10, color: "#3b82f6" },
      { x: 30, y: 0, z: 0, radius: 8, color: "#8b5cf6" },
      { x: -30, y: 0, z: 0, radius: 8, color: "#8b5cf6" },
      { x: 0, y: 30, z: 0, radius: 8, color: "#10b981" },
      { x: 0, y: -30, z: 0, radius: 8, color: "#10b981" },
      { x: 0, y: 0, z: 30, radius: 8, color: "#ef4444" },
      { x: 0, y: 0, z: -30, radius: 8, color: "#ef4444" },
      { x: 20, y: 20, z: 20, radius: 6, color: "#f59e0b" },
      { x: -20, y: -20, z: -20, radius: 6, color: "#f59e0b" },
      { x: 20, y: -20, z: 20, radius: 6, color: "#ec4899" },
      { x: -20, y: 20, z: -20, radius: 6, color: "#ec4899" },
    ]

    // Define bonds between atoms
    const bonds = [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 0, to: 3 },
      { from: 0, to: 4 },
      { from: 0, to: 5 },
      { from: 0, to: 6 },
      { from: 1, to: 7 },
      { from: 2, to: 8 },
      { from: 3, to: 9 },
      { from: 4, to: 10 },
    ]

    return { atoms, bonds }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.clientWidth
        canvas.height = parent.clientHeight
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create molecule
    const molecule = createMolecule()

    // Animation variables
    let animationFrameId: number
    let angle = 0

    // Render function
    const render = () => {
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Center of canvas
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Update rotation angle if auto-rotating
      if (isRotating) {
        angle += 0.01
      }

      // Apply manual rotation
      const totalRotationX = rotationX + (isRotating ? Math.sin(angle) * 0.5 : 0)
      const totalRotationY = rotationY + (isRotating ? angle : 0)

      // Sort atoms by z-index for proper rendering
      const projectedAtoms = molecule.atoms
        .map((atom, index) => {
          // Apply rotation
          const x = atom.x
          const y = atom.y * Math.cos(totalRotationX) - atom.z * Math.sin(totalRotationX)
          const z = atom.y * Math.sin(totalRotationX) + atom.z * Math.cos(totalRotationX)

          const x2 = x * Math.cos(totalRotationY) + z * Math.sin(totalRotationY)
          const z2 = -x * Math.sin(totalRotationY) + z * Math.cos(totalRotationY)

          // Project 3D to 2D
          const scale = 400 / (400 + z2)
          const projectedX = centerX + x2 * scale
          const projectedY = centerY + y * scale

          return {
            index,
            x: projectedX,
            y: projectedY,
            z: z2,
            radius: atom.radius * scale,
            color: atom.color,
          }
        })
        .sort((a, b) => a.z - b.z)

      // Draw bonds
      molecule.bonds.forEach((bond) => {
        const fromAtom = projectedAtoms.find((a) => a.index === bond.from)
        const toAtom = projectedAtoms.find((a) => a.index === bond.to)

        if (fromAtom && toAtom) {
          ctx.beginPath()
          ctx.moveTo(fromAtom.x, fromAtom.y)
          ctx.lineTo(toAtom.x, toAtom.y)
          ctx.strokeStyle = "#64748b"
          ctx.lineWidth = 2
          ctx.stroke()
        }
      })

      // Draw atoms
      projectedAtoms.forEach((atom) => {
        ctx.beginPath()
        ctx.arc(atom.x, atom.y, atom.radius, 0, Math.PI * 2)

        // Create gradient for 3D effect
        const gradient = ctx.createRadialGradient(
          atom.x - atom.radius * 0.3,
          atom.y - atom.radius * 0.3,
          0,
          atom.x,
          atom.y,
          atom.radius,
        )
        gradient.addColorStop(0, "white")
        gradient.addColorStop(1, atom.color)

        ctx.fillStyle = gradient
        ctx.fill()

        // Add highlight
        ctx.beginPath()
        ctx.arc(atom.x - atom.radius * 0.3, atom.y - atom.radius * 0.3, atom.radius * 0.3, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)"
        ctx.fill()
      })

      // Continue animation
      animationFrameId = requestAnimationFrame(render)
    }

    // Start animation
    render()

    // Mouse event handlers
    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true)
      setIsRotating(false)
      setLastX(e.clientX)
      setLastY(e.clientY)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - lastX
        const deltaY = e.clientY - lastY

        setRotationY((prev) => prev + deltaX * 0.01)
        setRotationX((prev) => prev + deltaY * 0.01)

        setLastX(e.clientX)
        setLastY(e.clientY)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    const handleMouseLeave = () => {
      setIsDragging(false)
    }

    // Touch event handlers
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        setIsDragging(true)
        setIsRotating(false)
        setLastX(e.touches[0].clientX)
        setLastY(e.touches[0].clientY)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - lastX
        const deltaY = e.touches[0].clientY - lastY

        setRotationY((prev) => prev + deltaX * 0.01)
        setRotationX((prev) => prev + deltaY * 0.01)

        setLastX(e.touches[0].clientX)
        setLastY(e.touches[0].clientY)
      }
    }

    const handleTouchEnd = () => {
      setIsDragging(false)
    }

    // Add event listeners
    canvas.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    canvas.addEventListener("mouseleave", handleMouseLeave)
    canvas.addEventListener("touchstart", handleTouchStart)
    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("touchend", handleTouchEnd)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      canvas.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isRotating, isDragging, lastX, lastY, rotationX, rotationY])

  return (
    <div className="w-full h-full rounded-lg overflow-hidden relative">
      <canvas ref={canvasRef} className="w-full h-full bg-gradient-to-br from-gray-50 to-white" />
      <div className="absolute bottom-4 left-4 bg-white/70 backdrop-blur-sm px-3 py-2 rounded-md text-sm text-gray-700">
        <p>Interactive 3D Molecule</p>
        <p className="text-xs text-gray-500">Drag to rotate</p>
      </div>
      <motion.button
        className="absolute top-4 right-4 bg-white/70 backdrop-blur-sm p-2 rounded-full text-gray-700 hover:bg-white"
        onClick={() => setIsRotating((prev) => !prev)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isRotating ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        )}
      </motion.button>
    </div>
  )
}


"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-purple-100 opacity-20 blur-3xl"></div>

        {/* DNA helix animation */}
        <div className="absolute left-10 top-1/4 h-96 w-20 opacity-20">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={`dna-left-${i}`}
              className="absolute w-4 h-4 rounded-full bg-blue-500"
              style={{ top: i * 40 }}
              animate={{
                x: [0, 20, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
              }}
            />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={`dna-right-${i}`}
              className="absolute w-4 h-4 rounded-full bg-purple-500"
              style={{ top: i * 40 + 20 }}
              animate={{
                x: [20, 0, 20],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Quantum circuit animation */}
        <div className="absolute right-10 top-1/3 opacity-20">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={`circuit-${i}`} className="relative">
              <div className="h-0.5 w-40 bg-blue-500 my-8"></div>
              <motion.div
                className="absolute top-0 left-0 w-3 h-3 rounded-full bg-blue-500"
                animate={{
                  x: [0, 160, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.8,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 z-10 pt-16">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Revolutionizing Drug Discovery with Quantum Computing
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10">
            Accelerating breakthroughs through quantum-enhanced molecular modeling and simulation.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg px-8 py-6 rounded-md hover:shadow-lg transition-all"
            >
              Join the Revolution
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Abstract molecular structure graphic */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}


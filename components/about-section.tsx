"use client"

import { motion } from "framer-motion"
import dynamic from "next/dynamic"

// Import the SimplifiedMoleculeViewer with dynamic loading (no SSR)
const SimplifiedMoleculeViewer = dynamic(() => import("./simplified-molecule-viewer"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
        <p className="text-gray-500">Loading 3D Molecule Viewer...</p>
      </div>
    </div>
  ),
})

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50 relative">
      {/* Floating molecular structures */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`molecule-${i}`}
            className="absolute rounded-full border-2 border-blue-200"
            style={{
              width: 20 + i * 15,
              height: 20 + i * 15,
              left: `${10 + i * 20}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              rotate: 360,
              y: [-(5 + i * 2), 5 + i * 2, -(5 + i * 2)],
            }}
            transition={{
              rotate: {
                duration: 20 + i * 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
              y: {
                duration: 3 + i,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
          />
        ))}

        {/* Floating data points */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`data-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-purple-400"
            style={{
              left: `${60 + (i % 4) * 8}%`,
              top: `${10 + Math.floor(i / 4) * 70}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2 + (i % 3),
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Our Technology</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Quantum-Enhanced Drug Discovery</h3>
            <p className="text-gray-600 mb-6">
              Qura's quantum computing platform accelerates the drug discovery process by simulating complex molecular
              interactions that traditional computing cannot handle efficiently. Our hybrid quantum-classical approach
              enables us to explore vast chemical spaces and identify promising drug candidates in a fraction of the
              time required by conventional methods.
            </p>
            <p className="text-gray-600">
              By leveraging quantum algorithms for molecular modeling and simulation, we achieve unprecedented accuracy
              in predicting drug-target interactions, pharmacokinetics, and clinical outcomes. Our end-to-end platform
              supports the entire drug development pipeline, from initial discovery through regulatory submission, all
              enhanced by quantum computing power.
            </p>
          </motion.div>

          <motion.div
            className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <SimplifiedMoleculeViewer />
          </motion.div>
        </div>
      </div>
    </section>
  )
}


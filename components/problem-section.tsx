"use client"

import { motion } from "framer-motion"
import { Clock, Ban, DollarSign, AlertTriangle } from "lucide-react"

const problems = [
  {
    icon: <Clock className="w-10 h-10 text-red-500" />,
    title: "Time-Consuming Process",
    description:
      "Traditional drug discovery takes 10-15 years from initial research to market approval, with countless hours spent on trial and error approaches.",
  },
  {
    icon: <Ban className="w-10 h-10 text-red-500" />,
    title: "High Failure Rate",
    description:
      "Over 90% of drug candidates fail in clinical trials due to unforeseen side effects or lack of efficacy that weren't predicted in preclinical studies.",
  },
  {
    icon: <DollarSign className="w-10 h-10 text-red-500" />,
    title: "Enormous Cost",
    description:
      "Developing a single new drug costs an average of $2.6 billion, with much of that expense going toward failed candidates and inefficient processes.",
  },
  {
    icon: <AlertTriangle className="w-10 h-10 text-red-500" />,
    title: "Computational Limitations",
    description:
      "Classical computers cannot accurately simulate complex molecular interactions, leading to approximations that miss critical biological mechanisms.",
  },
]

export default function ProblemSection() {
  return (
    <section id="problem" className="py-20 bg-white relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-red-50 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-red-50 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Problem</h2>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Drug discovery is fundamentally broken. The traditional approach is slow, expensive, and inefficient, with
            diminishing returns on R&D investment.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start">
                <div className="mr-4">{problem.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{problem.title}</h3>
                  <p className="text-gray-600">{problem.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">The Future Demands a Quantum Leap</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Classical computing approaches have reached their limits in drug discovery. Quantum computing offers the
            computational power needed to accurately model complex biological systems and revolutionize how we discover
            life-saving medications.
          </p>
        </motion.div>
      </div>
    </section>
  )
}


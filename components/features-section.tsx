"use client"

import { motion } from "framer-motion"
import { Atom, FlaskRoundIcon as Flask, Users, FileText, Network } from "lucide-react"

const features = [
  {
    icon: <Atom className="w-12 h-12 text-blue-600" />,
    title: "Quantum-AI Drug Discovery Engine",
    description:
      "3D modeling & docking, binding affinity prediction, and quantum-enhanced molecule simulations for unprecedented accuracy.",
    details: ["3D modeling + docking", "Binding affinity prediction", "Quantum-enhanced molecule simulations"],
  },
  {
    icon: <Flask className="w-12 h-12 text-blue-600" />,
    title: "Pharmacokinetics & Toxicity Prediction",
    description: "Advanced screening tools to identify potential issues early in the development process.",
    details: ["ADMET screening", "Off-target analysis", "ML-based risk scores"],
  },
  {
    icon: <Users className="w-12 h-12 text-blue-600" />,
    title: "In-Silico Clinical Trial Simulator",
    description: "Simulate clinical trials across diverse virtual patient populations to optimize treatment protocols.",
    details: ["Virtual patient population", "Predict outcomes across demographics", "Optimize dosage & schedule"],
  },
  {
    icon: <FileText className="w-12 h-12 text-blue-600" />,
    title: "Regulatory Prep Tools",
    description: "Streamline the regulatory submission process with automated documentation and study design.",
    details: ["Auto-generate preclinical study designs", "Create FDA-friendly documentation", "Track milestones"],
  },
  {
    icon: <Network className="w-12 h-12 text-blue-600" />,
    title: "Collaboration + Cloud Lab Integration",
    description: "Seamlessly collaborate with team members and external partners through our secure platform.",
    details: ["Invite your team or institution", "Export data to wet-lab partners", "Connect with CROs/CMOs"],
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Platform Features</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.slice(0, 3).map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.details.map((detail, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></div>
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mt-8 lg:max-w-2xl lg:mx-auto">
          {features.slice(3, 5).map((feature, index) => (
            <motion.div
              key={index + 3}
              className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.details.map((detail, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></div>
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


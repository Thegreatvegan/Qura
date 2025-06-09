import { Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-12 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">Qura</h2>
            <p className="text-gray-400 mt-2">Quantum-Enhanced Drug Discovery</p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                <Instagram className="w-6 h-6" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>

            <a href="mailto:contact@qura.tech" className="text-gray-400 hover:text-white transition-colors">
              contact@qura.tech
            </a>

            <p className="text-gray-500 mt-4">© 2025 Qura Technologies, Inc.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}


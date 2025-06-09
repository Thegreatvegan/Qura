"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import type * as THREE from "three"
import { PDBLoader } from "three/examples/jsm/loaders/PDBLoader.js"

// Sample PDB data (small fragment for demo purposes)
const SAMPLE_PDB = `
HEADER    HYDROLASE                               23-FEB-99   1A2P              
ATOM      1  N   ASP A  25      35.063  14.178  11.479  1.00 23.66           N  
ATOM      2  CA  ASP A  25      35.861  14.699  10.370  1.00 19.44           C  
ATOM      3  C   ASP A  25      35.061  15.670   9.483  1.00 18.93           C  
ATOM      4  O   ASP A  25      35.403  15.888   8.323  1.00 19.59           O  
ATOM      5  CB  ASP A  25      37.140  15.336  10.915  1.00 21.71           C  
ATOM      6  CG  ASP A  25      38.059  14.320  11.582  1.00 26.56           C  
ATOM      7  OD1 ASP A  25      37.915  13.110  11.311  1.00 29.25           O  
ATOM      8  OD2 ASP A  25      38.961  14.739  12.340  1.00 30.97           O  
ATOM      9  N   VAL A  26      33.996  16.223  10.049  1.00 16.92           N  
ATOM     10  CA  VAL A  26      33.143  17.155   9.320  1.00 15.29           C  
ATOM     11  C   VAL A  26      32.171  16.438   8.402  1.00 13.94           C  
ATOM     12  O   VAL A  26      31.623  17.026   7.472  1.00 13.08           O  
ATOM     13  CB  VAL A  26      32.385  18.087  10.287  1.00 16.77           C  
ATOM     14  CG1 VAL A  26      33.377  19.055  10.915  1.00 16.18           C  
ATOM     15  CG2 VAL A  26      31.295  18.841   9.539  1.00 16.44           C  
ATOM     16  N   GLY A  27      31.957  15.151   8.669  1.00 12.12           N  
ATOM     17  CA  GLY A  27      31.058  14.370   7.836  1.00 11.80           C  
ATOM     18  C   GLY A  27      31.739  13.650   6.686  1.00 11.37           C  
ATOM     19  O   GLY A  27      31.079  13.264   5.720  1.00 10.94           O  
ATOM     20  N   THR A  28      33.059  13.496   6.761  1.00 10.99           N  
`

function MoleculeModel() {
  const groupRef = useRef<THREE.Group>(null)
  const [geometryAtoms, setGeometryAtoms] = useState<THREE.BufferGeometry | null>(null)
  const [geometryBonds, setGeometryBonds] = useState<THREE.BufferGeometry | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const loader = new PDBLoader()

    // Load from the sample PDB data
    const pdbData = SAMPLE_PDB
    const pdbStructure = loader.parse(pdbData)

    // Extract atoms and bonds
    const { geometryAtoms: atoms, geometryBonds: bonds } = pdbStructure
    setGeometryAtoms(atoms)
    setGeometryBonds(bonds)
    setLoaded(true)
  }, [])

  useFrame(() => {
    if (groupRef.current && !loaded) {
      groupRef.current.rotation.y += 0.01
    }
  })

  if (!geometryAtoms || !geometryBonds) {
    return null
  }

  return (
    <group ref={groupRef}>
      <mesh geometry={geometryAtoms}>
        <meshPhongMaterial color="#3b82f6" specular={0x555555} shininess={30} vertexColors={true} />
      </mesh>
      <lineSegments geometry={geometryBonds}>
        <lineBasicMaterial color="#8b5cf6" linewidth={1} />
      </lineSegments>
    </group>
  )
}

export default function MoleculeViewer() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="w-full h-full rounded-lg overflow-hidden relative">
      {isClient ? (
        <Canvas className="w-full h-full">
          <PerspectiveCamera makeDefault position={[0, 0, 100]} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 10]} intensity={0.6} />
          <MoleculeModel />
          <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} autoRotate={true} autoRotateSpeed={1} />
        </Canvas>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">Loading molecule viewer...</div>
      )}

      <div className="absolute bottom-4 left-4 bg-white/70 backdrop-blur-sm px-3 py-2 rounded-md text-sm text-gray-700">
        <p>Interactive 3D Molecule</p>
        <p className="text-xs text-gray-500">Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  )
}


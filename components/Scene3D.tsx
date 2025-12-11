"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

/**
 * DaVinciGear - 3D rotating gear mesh
 */
function DaVinciGear({ position, scale = 1, rotationSpeed = 0.5 }: { position: [number, number, number]; scale?: number; rotationSpeed?: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.z += delta * rotationSpeed;
        }
    });

    // Create gear geometry
    const gearShape = new THREE.Shape();
    const teeth = 12;
    const innerRadius = 0.8;
    const outerRadius = 1.2;

    for (let i = 0; i < teeth; i++) {
        const angle1 = (i / teeth) * Math.PI * 2;
        const angle2 = ((i + 0.4) / teeth) * Math.PI * 2;
        const angle3 = ((i + 0.6) / teeth) * Math.PI * 2;
        const angle4 = ((i + 1) / teeth) * Math.PI * 2;

        if (i === 0) {
            gearShape.moveTo(Math.cos(angle1) * outerRadius, Math.sin(angle1) * outerRadius);
        }
        gearShape.lineTo(Math.cos(angle2) * outerRadius, Math.sin(angle2) * outerRadius);
        gearShape.lineTo(Math.cos(angle3) * innerRadius, Math.sin(angle3) * innerRadius);
        gearShape.lineTo(Math.cos(angle4) * innerRadius, Math.sin(angle4) * innerRadius);
    }
    gearShape.closePath();

    const extrudeSettings = {
        depth: 0.2,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelSegments: 3
    };

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            <extrudeGeometry args={[gearShape, extrudeSettings]} />
            <meshStandardMaterial
                color="#2a2a2a"
                metalness={0.3}
                roughness={0.7}
                opacity={0.15}
                transparent
            />
        </mesh>
    );
}

/**
 * Scene3D - Three.js scene with Da Vinci gears
 */
export function Scene3D() {
    return (
        <div className="absolute inset-0 pointer-events-none">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />

                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={0.8} />
                <pointLight position={[-10, -10, -5]} intensity={0.3} />

                {/* Multiple gears at different positions */}
                <DaVinciGear position={[4, 3, 0]} scale={1.5} rotationSpeed={0.3} />
                <DaVinciGear position={[-4, -2, -2]} scale={1.2} rotationSpeed={-0.4} />
                <DaVinciGear position={[3, -3, -1]} scale={0.8} rotationSpeed={0.5} />
                <DaVinciGear position={[-3, 2, -3]} scale={1} rotationSpeed={-0.35} />
            </Canvas>
        </div>
    );
}

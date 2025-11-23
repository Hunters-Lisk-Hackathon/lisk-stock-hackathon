"use client";

import { useEffect, useState, useRef, memo } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";

// Dynamically import Globe to avoid SSR issues
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

function Hero3DComponent() {
    const containerRef = useRef<HTMLDivElement>(null);
    const globeEl = useRef<any>(null);
    const [countries, setCountries] = useState({ features: [] });
    const [arcsData, setArcsData] = useState<any[]>([]);

    useEffect(() => {
        // Load Country Data (GeoJSON)
        fetch("https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson")
            .then((res) => res.json())
            .then((data) => setCountries(data));

        // Generate fewer arcs (reduced from 8 to 5)
        const N = 20;
        const arcs = [...Array(N).keys()].map(() => ({
            startLat: (Math.random() - 0.5) * 180,
            startLng: (Math.random() - 0.5) * 360,
            endLat: (Math.random() - 0.5) * 180,
            endLng: (Math.random() - 0.5) * 360,
            color: "#000000",
        }));

        setArcsData(arcs);
    }, []);

    // Prevent zoom on wheel event
    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <div
            ref={containerRef}
            className="w-full h-[450px] md:h-[550px] relative flex items-center justify-center cursor-move mix-blend-multiply"
            onWheel={handleWheel}
            style={{ touchAction: 'pan-y' }}
        >
            <Globe
                ref={globeEl}
                width={650}
                height={650}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-water.png"
                globeMaterial={
                    new THREE.MeshPhongMaterial({
                        color: "#ffffff",
                        transparent: true,
                        opacity: 0.5,
                    })
                }

                // Polygons (Countries) - simplified
                polygonsData={countries.features}
                polygonCapColor={() => "rgba(200, 200, 200, 0.1)"}
                polygonSideColor={() => "rgba(0, 0, 0, 0)"}
                polygonStrokeColor={() => "#000000"}
                polygonAltitude={0.003}

                // Arcs (minimal count, static animation)
                arcsData={arcsData}
                arcColor="color"
                arcDashLength={0.5}
                arcDashGap={0.2}
                arcDashAnimateTime={4000}
                arcStroke={1}

                // NO RINGS (removed for performance)
                onGlobeReady={() => {
                    if (globeEl.current) {
                        const controls = globeEl.current.controls();
                        controls.autoRotate = true;
                        controls.autoRotateSpeed = 0.5;
                        controls.enableZoom = false;
                        controls.enablePan = false;
                        controls.minDistance = controls.maxDistance = 350;
                        globeEl.current.pointOfView({ altitude: 1.8 });
                    }
                }}
            />
        </div>
    );
}

// Memoize component to prevent unnecessary rerenders
export const Hero3D = memo(Hero3DComponent);

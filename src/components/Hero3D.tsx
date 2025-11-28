"use client";

import { useEffect, useState, useRef, memo, useMemo } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";
import { GLOBE } from "@/lib/constants";
import { debounce } from "@/lib/utils";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

function Hero3DComponent() {
    const containerRef = useRef<HTMLDivElement>(null);
    const globeEl = useRef<any>(null);
    const [countries, setCountries] = useState({ features: [] });
    const [arcsData, setArcsData] = useState<any[]>([]);

    useEffect(() => {
        fetch("https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson")
            .then((res) => res.json())
            .then((data) => setCountries(data));

        const arcs = [...Array(GLOBE.arcCount).keys()].map(() => ({
            startLat: (Math.random() - 0.5) * 180,
            startLng: (Math.random() - 0.5) * 360,
            endLat: (Math.random() - 0.5) * 180,
            endLng: (Math.random() - 0.5) * 360,
            color: "#000000",
        }));

        setArcsData(arcs);
    }, []);

    const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
        width: GLOBE.defaultHeight,
        height: GLOBE.defaultHeight
    });

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const width = containerRef.current.clientWidth;
                const height = Math.min(width, GLOBE.defaultHeight);
                setDimensions({ width, height });
            }
        };

        const debouncedResize = debounce(handleResize, 150);

        handleResize();
        window.addEventListener('resize', debouncedResize);
        return () => window.removeEventListener('resize', debouncedResize);
    }, []);

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <div
            ref={containerRef}
            className="w-full h-[350px] md:h-[550px] relative flex items-center justify-center cursor-move mix-blend-multiply overflow-hidden"
            onWheel={handleWheel}
            style={{ touchAction: 'pan-y' }}
        >
            <Globe
                ref={globeEl}
                width={dimensions.width}
                height={dimensions.height}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-water.png"
                globeMaterial={
                    new THREE.MeshPhongMaterial({
                        color: "#ffffff",
                        transparent: true,
                        opacity: 0.5,
                    })
                }
                polygonsData={countries.features}
                polygonCapColor={() => "rgba(200, 200, 200, 0.1)"}
                polygonSideColor={() => "rgba(0, 0, 0, 0)"}
                polygonStrokeColor={() => "#000000"}
                polygonAltitude={0.003}
                arcsData={arcsData}
                arcColor="color"
                arcDashLength={0.5}
                arcDashGap={0.2}
                arcDashAnimateTime={4000}
                arcStroke={1}
                onGlobeReady={() => {
                    if (globeEl.current) {
                        const controls = globeEl.current.controls();
                        controls.autoRotate = true;
                        controls.autoRotateSpeed = GLOBE.autoRotateSpeed;
                        controls.enableZoom = false;
                        controls.enablePan = false;
                        controls.minDistance = controls.maxDistance = GLOBE.minMaxDistance;
                        globeEl.current.pointOfView({ altitude: GLOBE.altitude });
                    }
                }}
            />
        </div>
    );
}

export const Hero3D = memo(Hero3DComponent);

"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import type { WheelEvent } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

type CountriesGeoJSON = {
  features: any[];
};

const COUNTRIES_URL =
  "https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson";

let countriesCache: CountriesGeoJSON | null = null;
let countriesPromise: Promise<CountriesGeoJSON> | null = null;

async function loadCountries(): Promise<CountriesGeoJSON> {
  if (countriesCache) return countriesCache;
  if (!countriesPromise) {
    countriesPromise = fetch(COUNTRIES_URL)
      .then((res) => res.json())
      .then((data) => {
        countriesCache = data;
        return data;
      })
      .catch((error) => {
        countriesPromise = null;
        throw error;
      });
  }
  return countriesPromise;
}

function Hero3DComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeEl = useRef<any>(null);
  const [countries, setCountries] = useState<CountriesGeoJSON>(
    countriesCache ?? { features: [] },
  );

  useEffect(() => {
    let isMounted = true;

    if (!countriesCache) {
      loadCountries()
        .then((data) => {
          if (isMounted) {
            setCountries(data);
          }
        })
        .catch(() => {
          if (isMounted) {
            setCountries({ features: [] });
          }
        });
    } else {
      setCountries(countriesCache);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const arcsData = useMemo(() => {
    const N = 10;
    return Array.from({ length: N }, () => ({
      startLat: (Math.random() - 0.5) * 180,
      startLng: (Math.random() - 0.5) * 360,
      endLat: (Math.random() - 0.5) * 180,
      endLng: (Math.random() - 0.5) * 360,
      color: "#000000",
    }));
  }, []);

  const globeMaterial = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        color: "#ffffff",
        transparent: true,
        opacity: 0.5,
      }),
    [],
  );

  useEffect(() => {
    return () => {
      globeMaterial.dispose();
    };
  }, [globeMaterial]);

  const [dimensions, setDimensions] = useState({ width: 650, height: 650 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = Math.min(width, 650);
        setDimensions({ width, height });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const toggleRotation = () => {
      if (globeEl.current) {
        const controls = globeEl.current.controls();
        controls.autoRotate = document.visibilityState === "visible";
      }
    };

    document.addEventListener("visibilitychange", toggleRotation);
    return () =>
      document.removeEventListener("visibilitychange", toggleRotation);
  }, []);

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-[350px] md:h-[550px] relative flex items-center justify-center cursor-move mix-blend-multiply overflow-hidden"
      onWheel={handleWheel}
      style={{ touchAction: "pan-y" }}
    >
      <Globe
        ref={globeEl}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-water.png"
        globeMaterial={globeMaterial}
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

export const Hero3D = memo(Hero3DComponent);

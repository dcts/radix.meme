"use client";

import { useEffect, useRef } from "react";
import webGLFluidEnhanced from "webgl-fluid-enhanced";

const FluidCursorAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    webGLFluidEnhanced.simulation(canvasRef.current!, {
      PRESSURE: 0.2,
      SUNRAYS: false,
      SPLAT_AMOUNT: 10,
      DENSITY_DISSIPATION: 3,
      CURL: 10,
      COLOR_PALETTE: ["#0000ff", "#111111", "#1d1d1d", "#eaeaea", "#4dba87"],
    });
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full fixed" />;
};

export default FluidCursorAnimation;

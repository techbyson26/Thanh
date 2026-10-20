"use client";

import React, { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  color: string;
  opacity: number;
}

interface Sparkle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  alphaSpeed: number;
  speedY: number;
  speedX: number;
}

interface PetalCanvasProps {
  intensity?: "low" | "medium" | "high";
  active?: boolean;
}

export default function PetalCanvas({ intensity = "medium", active = true }: PetalCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const petalCount = intensity === "high" ? 65 : intensity === "medium" ? 38 : 18;
    const sparkleCount = 45;

    const petalColors = [
      "rgba(255, 67, 113, ",
      "rgba(255, 117, 151, ",
      "rgba(224, 26, 79, ",
      "rgba(255, 178, 196, ",
      "rgba(244, 63, 94, ",
      "rgba(251, 113, 133, ",
    ];

    const petals: Petal[] = [];
    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 12 + 10,
        speedY: Math.random() * 1.6 + 0.8,
        speedX: Math.random() * 1.5 - 0.75,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        flip: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.03 + 0.01,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        opacity: Math.random() * 0.4 + 0.5,
      });
    }

    const sparkles: Sparkle[] = [];
    for (let i = 0; i < sparkleCount; i++) {
      sparkles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.7 + 0.2,
        alphaSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        speedY: (Math.random() - 0.5) * 0.3,
        speedX: (Math.random() - 0.5) * 0.3,
      });
    }

    const drawPetal = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      flip: number,
      color: string,
      opacity: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.scale(Math.sin(flip), 1);

      context.beginPath();
      context.moveTo(0, 0);
      context.bezierCurveTo(-size / 2, -size / 2, -size, size / 3, 0, size);
      context.bezierCurveTo(size, size / 3, size / 2, -size / 2, 0, 0);

      const gradient = context.createRadialGradient(0, size / 2, 0, 0, size / 2, size);
      gradient.addColorStop(0, color + (opacity + 0.15) + ")");
      gradient.addColorStop(0.8, color + opacity + ")");
      gradient.addColorStop(1, color + "0.2)");

      context.fillStyle = gradient;
      context.shadowColor = "rgba(255, 105, 135, 0.4)";
      context.shadowBlur = 8;
      context.fill();
      context.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render glowing golden dust particles
      sparkles.forEach((s) => {
        s.alpha += s.alphaSpeed;
        if (s.alpha > 0.85 || s.alpha < 0.15) {
          s.alphaSpeed = -s.alphaSpeed;
        }
        s.y += s.speedY;
        s.x += s.speedX;

        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(246, 200, 106, ${Math.max(0, Math.min(1, s.alpha))})`;
        ctx.shadowColor = "rgba(246, 200, 106, 0.7)";
        ctx.shadowBlur = 6;
        ctx.fill();
      });

      // Render fluttering rose petals
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.008) * 1.2 + p.speedX;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        if (p.y > height + 40) {
          p.y = -30;
          p.x = Math.random() * width;
        }
        if (p.x > width + 40) p.x = -30;
        if (p.x < -40) p.x = width + 30;

        drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.flip, p.color, p.opacity);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [intensity, active]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 5,
      }}
    />
  );
}

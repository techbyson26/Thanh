"use client";

import confetti from "canvas-confetti";

export const triggerBlossomExplosion = (x: number = 0.5, y: number = 0.5) => {
  const colors = ["#ff3366", "#ff6b8b", "#ff9ebb", "#ffd1dc", "#f6c86a", "#ffffff", "#e11d48"];

  // 1. Initial High Velocity Blossom Blast
  confetti({
    particleCount: 70,
    spread: 100,
    origin: { x, y },
    colors,
    startVelocity: 45,
    scalar: 1.2,
    ticks: 200,
    gravity: 0.8,
    drift: 0,
    shapes: ["circle"],
  });

  // 2. Secondary wider, soft petal flutter
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 75,
      origin: { x: Math.max(0.1, x - 0.2), y },
      colors,
      startVelocity: 35,
      scalar: 1.4,
      ticks: 250,
      gravity: 0.6,
    });

    confetti({
      particleCount: 50,
      angle: 120,
      spread: 75,
      origin: { x: Math.min(0.9, x + 0.2), y },
      colors,
      startVelocity: 35,
      scalar: 1.4,
      ticks: 250,
      gravity: 0.6,
    });
  }, 200);

  // 3. Golden shimmer shower
  setTimeout(() => {
    confetti({
      particleCount: 40,
      spread: 120,
      origin: { x, y: Math.max(0.2, y - 0.1) },
      colors: ["#ffd700", "#ffeb3b", "#ffc107", "#ffffff"],
      startVelocity: 25,
      scalar: 0.9,
      ticks: 180,
      gravity: 0.5,
    });
  }, 400);
};

export const triggerContinuousFlowerRain = (durationMs: number = 2500) => {
  const end = Date.now() + durationMs;
  const colors = ["#ff4371", "#ff7597", "#ffa8ba", "#f6c86a", "#fff0f3"];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
      scalar: 1.2,
      gravity: 0.7,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
      scalar: 1.2,
      gravity: 0.7,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

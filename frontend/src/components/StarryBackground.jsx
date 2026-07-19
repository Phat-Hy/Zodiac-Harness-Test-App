import React, { useEffect, useRef } from "react";

export default function StarryBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Generate stars
    const stars = [];
    const numStars = 120;
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        twinkleSpeed: 0.005 + Math.random() * 0.015,
        alpha: Math.random(),
        direction: Math.random() > 0.5 ? 1 : -1
      });
    }

    // Generate nebulae
    const nebulae = [
      { x: canvas.width * 0.25, y: canvas.height * 0.3, radius: 150, color: "rgba(100, 30, 200, 0.15)", vx: 0.1, vy: 0.05 },
      { x: canvas.width * 0.75, y: canvas.height * 0.7, radius: 250, color: "rgba(30, 80, 220, 0.12)", vx: -0.05, vy: 0.1 },
      { x: canvas.width * 0.5, y: canvas.height * 0.5, radius: 200, color: "rgba(220, 160, 40, 0.05)", vx: 0.02, vy: -0.05 }
    ];

    const draw = () => {
      ctx.fillStyle = "#03001e"; // Deep space background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw nebulae
      nebulae.forEach(neb => {
        const grad = ctx.createRadialGradient(neb.x, neb.y, 0, neb.x, neb.y, neb.radius);
        grad.addColorStop(0, neb.color);
        grad.addColorStop(1, "rgba(3, 0, 30, 0)");
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(neb.x, neb.y, neb.radius, 0, Math.PI * 2);
        ctx.fill();

        // Move nebulae slowly
        neb.x += neb.vx;
        neb.y += neb.vy;

        // Bounce off bounds
        if (neb.x - neb.radius < 0 || neb.x + neb.radius > canvas.width) neb.vx *= -1;
        if (neb.y - neb.radius < 0 || neb.y + neb.radius > canvas.height) neb.vy *= -1;
      });

      // Draw & Twinkle Stars
      stars.forEach(star => {
        // Wrap coordinates if they exceed current canvas boundaries due to resize
        if (star.x > canvas.width) star.x = Math.random() * canvas.width;
        if (star.y > canvas.height) star.y = Math.random() * canvas.height;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Update alpha for twinkling
        star.alpha += star.twinkleSpeed * star.direction;
        if (star.alpha >= 1) {
          star.alpha = 1;
          star.direction = -1;
        } else if (star.alpha <= 0.1) {
          star.alpha = 0.1;
          star.direction = 1;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none"
      }}
    />
  );
}

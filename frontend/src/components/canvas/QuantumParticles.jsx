import { useEffect, useRef } from 'react';
import styles from './QuantumParticles.module.css';

/**
 * QuantumParticles — Animated canvas background simulating quantum entanglement.
 * Particles represent qubits oscillating between |0⟩ and |1⟩ states.
 * Adapts colors when the theme changes via custom 'themechanged' event.
 */
const QuantumParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationId;
    let theme = document.documentElement.getAttribute('data-theme') || 'dark';
    let particles = [];
    const PARTICLE_COUNT = 45;
    const CONNECTION_DIST = 120;

    const getColors = (t) => ({
      particle: t === 'dark' ? 'rgba(0, 245, 212, 0.4)' : 'rgba(13, 148, 136, 0.3)',
      line: t === 'dark' ? 'rgba(124, 58, 237, 0.08)' : 'rgba(109, 40, 217, 0.05)',
      activeLine: t === 'dark' ? 'rgba(0, 245, 212, 0.15)' : 'rgba(13, 148, 136, 0.1)',
      stateText: t === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
    });

    let colors = getColors(theme);

    const handleThemeChange = (e) => {
      theme = e.detail.theme;
      colors = getColors(theme);
    };
    window.addEventListener('themechanged', handleThemeChange);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
        this.state = Math.random() > 0.5 ? 0 : 1;
        this.timer = Math.random() * 200 + 100;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        if (--this.timer <= 0) {
          this.state ^= 1;
          this.timer = Math.random() * 200 + 100;
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = colors.particle;
        ctx.fill();
        if (this.radius > 2.5) {
          ctx.font = '8px monospace';
          ctx.fillStyle = colors.stateText;
          ctx.fillText(`|${this.state}⟩`, this.x + 5, this.y + 3);
        }
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          if (Math.hypot(dx, dy) < CONNECTION_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = particles[i].state === particles[j].state
              ? colors.activeLine : colors.line;
            ctx.lineWidth = particles[i].state === particles[j].state ? 0.8 : 0.4;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => { p.update(); p.draw(); });
      drawConnections();
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('themechanged', handleThemeChange);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
};

export default QuantumParticles;

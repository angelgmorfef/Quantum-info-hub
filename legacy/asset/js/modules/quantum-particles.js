export function initQuantumParticles() {
  const canvas = document.getElementById('quantum-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let theme = document.documentElement.getAttribute('data-theme') || 'dark';

  // Config based on theme
  let colors = {
    particle: theme === 'dark' ? 'rgba(0, 245, 212, 0.4)' : 'rgba(13, 148, 136, 0.3)',
    line: theme === 'dark' ? 'rgba(124, 58, 237, 0.08)' : 'rgba(109, 40, 217, 0.05)',
    activeLine: theme === 'dark' ? 'rgba(0, 245, 212, 0.15)' : 'rgba(13, 148, 136, 0.1)'
  };

  // Adjust to theme changes
  window.addEventListener('themechanged', (e) => {
    theme = e.detail.theme;
    colors.particle = theme === 'dark' ? 'rgba(0, 245, 212, 0.4)' : 'rgba(13, 148, 136, 0.3)';
    colors.line = theme === 'dark' ? 'rgba(124, 58, 237, 0.08)' : 'rgba(109, 40, 217, 0.05)';
    colors.activeLine = theme === 'dark' ? 'rgba(0, 245, 212, 0.15)' : 'rgba(13, 148, 136, 0.1)';
  });

  let particles = [];
  const particleCount = 45;
  const connectionDistance = 120;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 2 + 1;
      this.state = Math.random() > 0.5 ? 0 : 1; // Quantum state |0> or |1>
      this.stateTimer = Math.random() * 200 + 100;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off walls
      if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
      if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

      // Random state superpositions (changing state representations)
      this.stateTimer--;
      if (this.stateTimer <= 0) {
        this.state = this.state === 0 ? 1 : 0;
        this.stateTimer = Math.random() * 200 + 100;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = colors.particle;
      ctx.fill();

      // Render faint Qubit state text sometimes
      if (this.radius > 2.5) {
        ctx.font = '8px monospace';
        ctx.fillStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)';
        ctx.fillText(`|${this.state}⟩`, this.x + 5, this.y + 3);
      }
    }
  }

  function init() {
    resizeCanvas();
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          
          // Entangled state lines check
          if (particles[i].state === particles[j].state) {
            ctx.strokeStyle = colors.activeLine;
            ctx.lineWidth = 0.8;
          } else {
            ctx.strokeStyle = colors.line;
            ctx.lineWidth = 0.4;
          }
          
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    drawConnections();

    animationFrameId = requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
  });

  init();
  animate();
}

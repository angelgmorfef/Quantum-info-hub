/**
 * Quantum Hub — Main Application Entry Point
 * 
 * Self-contained bundle that works over both file:// and http(s)://
 * Each function is encapsulated in its own IIFE-like init pattern.
 * Modules are kept in /modules/ for reference and future HTTP migration.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Footer Year Setter ────────────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ═══════════════════════════════════════════════════════════════
  // MODULE 1: Theme Toggle
  // ═══════════════════════════════════════════════════════════════
  (function initThemeToggle() {
    const toggleBtn = document.querySelector('.theme-toggle-btn');
    if (!toggleBtn) return;

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', initialTheme);

    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      window.dispatchEvent(new CustomEvent('themechanged', { detail: { theme: newTheme } }));
    });
  })();

  // ═══════════════════════════════════════════════════════════════
  // MODULE 2: Scroll Observer (TOC sync + reveal animations)
  // ═══════════════════════════════════════════════════════════════
  (function initScrollObserver() {
    const articles = document.querySelectorAll('.article-card');
    const tocLinks = document.querySelectorAll('.toc-item');
    const backToTopBtn = document.querySelector('.back-to-top');

    if (articles.length === 0) return;

    // TOC Active Link Highlight
    const activeSections = new Map();
    const tocObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        activeSections.set(entry.target.id, entry.isIntersecting);
      });

      let activeId = null;
      for (const [id, isIntersecting] of activeSections.entries()) {
        if (isIntersecting) {
          activeId = id;
          break;
        }
      }

      if (activeId) {
        tocLinks.forEach(link => {
          const href = link.querySelector('a')?.getAttribute('href')?.substring(1);
          if (href === activeId) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    }, {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    });

    articles.forEach(article => tocObserver.observe(article));

    // Click sidebar links with Flash Highlight
    tocLinks.forEach(link => {
      const anchor = link.querySelector('a');
      if (!anchor) return;
      anchor.addEventListener('click', () => {
        const targetId = anchor.getAttribute('href').substring(1);
        const targetElem = document.getElementById(targetId);
        if (targetElem) {
          targetElem.classList.remove('highlight-flash');
          void targetElem.offsetWidth;
          targetElem.classList.add('highlight-flash');
        }
      });
    });

    // Back to Top
    if (backToTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      }, { passive: true });

      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Scroll-reveal animation for article cards
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.1
    });

    articles.forEach(article => revealObserver.observe(article));
  })();

  // ═══════════════════════════════════════════════════════════════
  // MODULE 3: Reading Progress Bar + Time Estimate
  // ═══════════════════════════════════════════════════════════════
  (function initReadingProgress() {
    const progressBar = document.querySelector('.progress-bar');
    const mainContent = document.querySelector('.content-section') || document.querySelector('main') || document.body;
    const timeEstimateEl = document.querySelector('.reading-time-estimate');

    if (mainContent && timeEstimateEl) {
      requestAnimationFrame(() => {
        const text = mainContent.innerText || mainContent.textContent || '';
        const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
        const wordsPerMinute = 200;
        const readingTime = Math.max(1, Math.ceil(words / wordsPerMinute));
        timeEstimateEl.textContent = `≈ ${readingTime} min de lectura`;
      });
    }

    if (progressBar) {
      const updateProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
          progressBar.style.width = `${(scrollTop / docHeight) * 100}%`;
        } else {
          progressBar.style.width = '0%';
        }
      };

      window.addEventListener('scroll', updateProgress, { passive: true });
      window.addEventListener('resize', updateProgress, { passive: true });
      updateProgress();
    }
  })();

  // ═══════════════════════════════════════════════════════════════
  // MODULE 4: Quantum Particles Canvas
  // ═══════════════════════════════════════════════════════════════
  (function initQuantumParticles() {
    const canvas = document.getElementById('quantum-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let theme = document.documentElement.getAttribute('data-theme') || 'dark';

    let colors = {
      particle: theme === 'dark' ? 'rgba(0, 245, 212, 0.4)' : 'rgba(13, 148, 136, 0.3)',
      line: theme === 'dark' ? 'rgba(124, 58, 237, 0.08)' : 'rgba(109, 40, 217, 0.05)',
      activeLine: theme === 'dark' ? 'rgba(0, 245, 212, 0.15)' : 'rgba(13, 148, 136, 0.1)'
    };

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
        this.state = Math.random() > 0.5 ? 0 : 1;
        this.stateTimer = Math.random() * 200 + 100;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
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
      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);
    init();
    animate();
  })();

});

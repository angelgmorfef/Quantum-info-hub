export function initReadingProgress() {
  const progressBar = document.querySelector('.progress-bar');
  const mainContent = document.querySelector('.content-section') || document.querySelector('main') || document.body;
  const timeEstimateEl = document.querySelector('.reading-time-estimate');

  // Estimate reading time
  if (mainContent && timeEstimateEl) {
    // Wait a tick for DOM text to be ready
    requestAnimationFrame(() => {
      const text = mainContent.innerText || mainContent.textContent || '';
      const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
      const wordsPerMinute = 200;
      const readingTime = Math.max(1, Math.ceil(words / wordsPerMinute));
      timeEstimateEl.textContent = `≈ ${readingTime} min de lectura`;
    });
  }

  // Update progress bar on scroll
  if (progressBar) {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (docHeight > 0) {
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
      } else {
        progressBar.style.width = '0%';
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    // Initial check
    updateProgress();
  }
}

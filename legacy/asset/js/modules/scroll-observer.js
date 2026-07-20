export function initScrollObserver() {
  const articles = document.querySelectorAll('.article-card');
  const tocLinks = document.querySelectorAll('.toc-item');
  const backToTopBtn = document.querySelector('.back-to-top');

  if (articles.length === 0) return;

  // 1. Table of Contents Active Link Highlight
  // We track which article is currently intersecting the viewport
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Trigger when article is in upper-middle of viewport
    threshold: 0
  };

  const activeSections = new Map();

  const tocObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      activeSections.set(entry.target.id, entry.isIntersecting);
    });

    // Find the first section that is active
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
  }, observerOptions);

  articles.forEach(article => tocObserver.observe(article));

  // 2. Click sidebar links with Flash Highlight effect
  tocLinks.forEach(link => {
    const anchor = link.querySelector('a');
    if (!anchor) return;
    
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').substring(1);
      const targetElem = document.getElementById(targetId);
      
      if (targetElem) {
        // Flash animation
        targetElem.classList.remove('highlight-flash');
        // Force reflow
        void targetElem.offsetWidth;
        targetElem.classList.add('highlight-flash');
      }
    });
  });

  // 3. Back to Top Button display observer
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 4. Scroll-reveal animation for article cards
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // Only animate once
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  });

  articles.forEach(article => revealObserver.observe(article));
}

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * IntersectionObserver hook.
 * Tracks which element IDs are currently intersecting the viewport.
 *
 * @param {string[]} ids - Array of element IDs to observe.
 * @param {IntersectionObserverInit} [options] - Observer options.
 * @returns {string|null} activeId - The ID of the currently active element.
 */
const useIntersectionObserver = (ids = [], options = {}) => {
  const [activeId, setActiveId] = useState(null);
  const observerRef = useRef(null);

  const defaultOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0,
    ...options,
  };

  const observe = useCallback(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, defaultOptions);

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });
  }, [ids.join(',')]); // eslint-disable-line

  useEffect(() => {
    observe();
    return () => observerRef.current?.disconnect();
  }, [observe]);

  return activeId;
};

export default useIntersectionObserver;

import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-triggered reveal animations using Intersection Observer.
 * Returns a ref to attach to the element and whether it's visible.
 */
export const useScrollReveal = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Only animate once
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -40px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, isVisible];
};

/**
 * ScrollReveal wrapper component for easy use in JSX.
 * Wraps children with a div that animates in when scrolled into view.
 * 
 * Props:
 * - animation: 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right' | 'scale-in' (default: 'fade-up')
 * - delay: delay in ms (default: 0)
 * - duration: duration in ms (default: 600)
 * - className: additional classes
 * - stagger: stagger index for staggered animations (multiplied by 80ms)
 */
const ScrollReveal = ({ 
  children, 
  animation = 'fade-up', 
  delay = 0, 
  duration = 600, 
  className = '', 
  stagger = 0,
  style = {},
  ...props 
}) => {
  const [ref, isVisible] = useScrollReveal();
  
  const totalDelay = delay + (stagger * 80);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${animation} ${isVisible ? 'revealed' : ''} ${className}`}
      style={{
        transitionDelay: `${totalDelay}ms`,
        transitionDuration: `${duration}ms`,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardSkeleton, ExpensesSkeleton, AddExpenseSkeleton, BudgetSkeleton } from './Skeleton';

/**
 * Shows a page-specific skeleton briefly on route change, then fades in the real content.
 */

const skeletonMap = {
  '/dashboard': DashboardSkeleton,
  '/myExpense': ExpensesSkeleton,
  '/addExpense': AddExpenseSkeleton,
  '/setBudget': BudgetSkeleton,
};

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [phase, setPhase] = useState('content'); // 'skeleton' | 'content'
  const [displayChildren, setDisplayChildren] = useState(children);
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    // Skip for login pages and initial load
    if (location.pathname === '/' || location.pathname === '/login') {
      setDisplayChildren(children);
      setCurrentPath(location.pathname);
      return;
    }

    // Skip if same page
    if (location.pathname === currentPath) {
      setDisplayChildren(children);
      return;
    }

    // Skip animation for users who prefer reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayChildren(children);
      setCurrentPath(location.pathname);
      return;
    }

    // Phase 1: Show skeleton
    setPhase('skeleton');
    setCurrentPath(location.pathname);

    const skeletonTimer = setTimeout(() => {
      // Phase 2: Fade in real content
      setDisplayChildren(children);
      setPhase('content');
    }, 350);

    return () => clearTimeout(skeletonTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Update children when they change (e.g., data loads) but path hasn't changed
  useEffect(() => {
    if (phase === 'content') {
      setDisplayChildren(children);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  const SkeletonComponent = skeletonMap[currentPath];

  if (phase === 'skeleton' && SkeletonComponent) {
    return (
      <div className="page-transition enter">
        <SkeletonComponent />
      </div>
    );
  }

  return (
    <div className={`page-transition ${phase === 'content' ? 'enter' : ''}`}>
      {displayChildren}
    </div>
  );
};

export default PageTransition;

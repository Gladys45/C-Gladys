import { useScrollVisibility } from '@/hook/useScrollToTop';
import { memo } from 'react';
// import { useScrollVisibility } from '@/hooks/useScrollToTop';

const BackToTop = memo(() => {
  const isVisible = useScrollVisibility(500);

  if (!isVisible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white w-12 h-12 rounded-full shadow-lg hover:bg-primary transition-all duration-300 hover:scale-110"
      aria-label="Back to top"
    >
      <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
});

BackToTop.displayName = 'BackToTop';
export default BackToTop;
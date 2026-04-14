import { useCookieConsent } from '@/hook/useCookieConsent';
import { memo } from 'react';
// import { useCookieConsent } from '@/hooks/useCookieConsent';

const CookieConsent = memo(() => {
  const { isOpen, setIsOpen, acceptAll, acceptRequired } = useCookieConsent();

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gray-900 text-white shadow-lg transform transition-transform duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm sm:text-base">
          <p>
            We use cookies to enhance your experience. By continuing to visit this site, you agree to our use of cookies.
            <a href="/privacy" className="underline ml-1 hover:text-primary transition-colors">
              Learn more
            </a>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={acceptRequired}
            className="px-4 py-2 text-sm border border-white rounded-lg hover:bg-white hover:text-gray-900 transition-all"
          >
            Necessary Only
          </button>
          <button
            onClick={acceptAll}
            className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-all"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
});

CookieConsent.displayName = 'CookieConsent';
export default CookieConsent;
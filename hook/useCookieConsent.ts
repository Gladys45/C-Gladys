import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface CookieConsent {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  lastUpdated?: string;
}

export const useCookieConsent = () => {
  const [consent, setConsent] = useLocalStorage<CookieConsent | null>('cookie-consent', null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!consent) {
      const timer = setTimeout(() => setIsOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [consent]);

  const acceptAll = () => {
    setConsent({
      analytics: true,
      marketing: true,
      functional: true,
      lastUpdated: new Date().toISOString(),
    });
    setIsOpen(false);
  };

  const acceptRequired = () => {
    setConsent({
      analytics: false,
      marketing: false,
      functional: true,
      lastUpdated: new Date().toISOString(),
    });
    setIsOpen(false);
  };

  const customize = (customConsent: Partial<CookieConsent>) => {
    setConsent({
      analytics: customConsent.analytics ?? false,
      marketing: customConsent.marketing ?? false,
      functional: true,
      lastUpdated: new Date().toISOString(),
    });
    setIsOpen(false);
  };

  return { consent, isOpen, setIsOpen, acceptAll, acceptRequired, customize };
};
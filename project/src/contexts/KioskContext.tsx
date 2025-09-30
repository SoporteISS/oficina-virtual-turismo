import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { kioskAnalytics } from '../utils/kioskAnalytics';

interface KioskContextType {
  isKioskMode: boolean;
  inactivityTime: number;
  showInactivityWarning: boolean;
  resetInactivityTimer: () => void;
  toggleKioskMode: () => void;
  trackInteraction: (type: string, label: string, elementId?: string) => void;
}

const KioskContext = createContext<KioskContextType | undefined>(undefined);

const INACTIVITY_TIMEOUT = 60000;
const WARNING_THRESHOLD = 10000;

export const KioskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isKioskMode, setIsKioskMode] = useState(() => {
    const savedMode = localStorage.getItem('kioskMode');
    if (savedMode !== null) {
      return savedMode === 'true';
    }
    return true;
  });
  const [inactivityTime, setInactivityTime] = useState(0);
  const [showInactivityWarning, setShowInactivityWarning] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();

  const resetInactivityTimer = useCallback(() => {
    setInactivityTime(0);
    setShowInactivityWarning(false);
  }, []);

  const toggleKioskMode = useCallback(async () => {
    const newMode = !isKioskMode;
    setIsKioskMode(newMode);
    localStorage.setItem('kioskMode', String(newMode));

    if (newMode) {
      const newSessionId = await kioskAnalytics.startSession(i18n.language);
      setSessionId(newSessionId);
      navigate('/');
      resetInactivityTimer();
    } else {
      if (sessionId) {
        await kioskAnalytics.endSession(sessionId, false);
        setSessionId(null);
      }
    }
  }, [isKioskMode, navigate, resetInactivityTimer, i18n.language, sessionId]);

  useEffect(() => {
    if (!isKioskMode) return;

    const interval = setInterval(() => {
      setInactivityTime((prev) => {
        const newTime = prev + 1000;

        if (newTime >= INACTIVITY_TIMEOUT - WARNING_THRESHOLD && newTime < INACTIVITY_TIMEOUT) {
          setShowInactivityWarning(true);
        }

        if (newTime >= INACTIVITY_TIMEOUT) {
          if (sessionId) {
            kioskAnalytics.endSession(sessionId, true).then(async () => {
              const newSessionId = await kioskAnalytics.startSession(i18n.language);
              setSessionId(newSessionId);
            });
          }
          navigate('/');
          setShowInactivityWarning(false);
          return 0;
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isKioskMode, navigate]);

  useEffect(() => {
    if (!isKioskMode) return;

    const events = ['mousedown', 'touchstart', 'keydown', 'scroll', 'mousemove'];

    const handleActivity = () => {
      resetInactivityTimer();
    };

    events.forEach((event) => {
      document.addEventListener(event, handleActivity);
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [isKioskMode, resetInactivityTimer]);

  useEffect(() => {
    if (!isKioskMode) return;

    const initSession = async () => {
      if (!sessionId) {
        const newSessionId = await kioskAnalytics.startSession(i18n.language);
        setSessionId(newSessionId);
      }
    };

    initSession();
  }, [isKioskMode, i18n.language]);

  useEffect(() => {
    if (!isKioskMode || !sessionId) return;

    const pagePath = location.pathname;
    const pageTitle = document.title;
    kioskAnalytics.trackPageView(pagePath, pageTitle);
  }, [location.pathname, isKioskMode, sessionId]);

  const trackInteraction = useCallback((type: string, label: string, elementId?: string) => {
    if (!isKioskMode || !sessionId) return;
    kioskAnalytics.trackInteraction(type, label, location.pathname, elementId);
  }, [isKioskMode, sessionId, location.pathname]);

  const value: KioskContextType = {
    isKioskMode,
    inactivityTime,
    showInactivityWarning,
    resetInactivityTimer,
    toggleKioskMode,
    trackInteraction,
  };

  return <KioskContext.Provider value={value}>{children}</KioskContext.Provider>;
};

export const useKiosk = () => {
  const context = useContext(KioskContext);
  if (context === undefined) {
    throw new Error('useKiosk must be used within a KioskProvider');
  }
  return context;
};
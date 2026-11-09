import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useAuth } from '@/data/auth';

const keyFor = (email: string | undefined) => `yuksalup:saved:${email ?? 'guest'}`;

function read(email: string | undefined): string[] {
  try {
    const raw = window.localStorage.getItem(keyFor(email));
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.filter((v): v is string => typeof v === 'string');
    }
  } catch {
    /* storage unavailable */
  }
  // the demo student starts with two saved programs (screen 06); everyone else with none
  return email === 'dilnoza@example.com' ? ['green-week', 'tech-internship'] : [];
}

interface SavedValue {
  saved: string[];
  isSaved: (id: string) => boolean;
  toggle: (id: string) => void;
}

const SavedContext = createContext<SavedValue | null>(null);

export function SavedProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const email = user?.email;
  const [saved, setSaved] = useState<string[]>(() => read(email));

  useEffect(() => {
    setSaved(read(email));
  }, [email]);

  const toggle = useCallback((id: string) => {
    setSaved((cur) => {
      const next = cur.includes(id) ? cur.filter((v) => v !== id) : [...cur, id];
      try {
        window.localStorage.setItem(keyFor(email), JSON.stringify(next));
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  }, [email]);

  const value = useMemo<SavedValue>(() => ({ saved, isSaved: (id) => saved.includes(id), toggle }), [saved, toggle]);
  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>;
}

export function useSaved(): SavedValue {
  const ctx = useContext(SavedContext);
  if (!ctx) throw new Error('useSaved must be used within SavedProvider');
  return ctx;
}

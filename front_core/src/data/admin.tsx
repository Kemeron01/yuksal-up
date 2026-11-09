import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export interface AdminContent {
  id: string;
  kind: 'opportunity' | 'challenge';
  title: string;
  organizer: string;
  category: string;
  deadline: string;
  published: boolean;
}

interface AdminValue {
  /** opportunities / challenges created or edited in the editor */
  created: AdminContent[];
  saveContent: (item: AdminContent) => void;
  /** ids of catalog items removed by an admin */
  deleted: string[];
  deleteContent: (id: string) => void;
}

const KEY = 'yuksalup:admin-content';

interface Stored {
  created: AdminContent[];
  deleted: string[];
}

function read(): Stored {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Stored;
  } catch {
    /* storage unavailable */
  }
  return { created: [], deleted: [] };
}

const AdminContext = createContext<AdminValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Stored>(read);

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable */
    }
  }, [state]);

  const saveContent = useCallback(
    (item: AdminContent) =>
      setState((cur) => ({
        created: [...cur.created.filter((c) => c.id !== item.id), item],
        deleted: cur.deleted.filter((d) => d !== item.id),
      })),
    [],
  );
  const deleteContent = useCallback(
    (id: string) =>
      setState((cur) => ({ created: cur.created.filter((c) => c.id !== id), deleted: cur.deleted.includes(id) ? cur.deleted : [...cur.deleted, id] })),
    [],
  );

  const value = useMemo(
    () => ({ created: state.created, deleted: state.deleted, saveContent, deleteContent }),
    [state, saveContent, deleteContent],
  );
  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin(): AdminValue {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}

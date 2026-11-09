import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Role = 'student' | 'admin';

export interface Account {
  email: string;
  name: string;
  surname: string;
  password: string;
  role: Role;
  verified: boolean;
  suspended: boolean;
  grade: string;
  region: string;
  interests: string[];
  /** seeded demo accounts are labelled "Namuna" in the admin panel */
  sample: boolean;
  createdAt: string;
}

const ACCOUNTS_KEY = 'yuksalup:accounts';
const SESSION_KEY = 'yuksalup:session';

const today = () => new Date().toISOString().slice(0, 10);

/** Demo data so the app is usable without a backend. */
const SEED: Account[] = [
  {
    email: 'admin@yuksalup.uz',
    name: 'Admin',
    surname: 'YuksalUp',
    password: 'admin1234',
    role: 'admin',
    verified: true,
    suspended: false,
    grade: '',
    region: '',
    interests: [],
    sample: false,
    createdAt: '2026-10-01',
  },
  {
    email: 'dilnoza@example.com',
    name: 'Dilnoza',
    surname: 'Karimova',
    password: 'password123',
    role: 'student',
    verified: true,
    suspended: false,
    grade: '10-sinf',
    region: 'Toshkent',
    interests: ['Texnologiya', 'Jamiyat'],
    sample: false,
    createdAt: '2026-10-20',
  },
  {
    email: 'madina@example.com',
    name: 'Madina',
    surname: 'Karimova',
    password: 'password123',
    role: 'student',
    verified: true,
    suspended: false,
    grade: '11-sinf',
    region: 'Samarqand',
    interests: ['Fan'],
    sample: true,
    createdAt: '2026-10-22',
  },
  {
    email: 'javohir@example.com',
    name: 'Javohir',
    surname: 'Aliyev',
    password: 'password123',
    role: 'student',
    verified: true,
    suspended: false,
    grade: '9-sinf',
    region: 'Toshkent',
    interests: ['Ijod'],
    sample: true,
    createdAt: '2026-10-23',
  },
];

function readAccounts(): Account[] {
  try {
    const raw = window.localStorage.getItem(ACCOUNTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Account[];
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch {
    /* storage unavailable */
  }
  return SEED;
}

function readSession(): string | null {
  try {
    return window.localStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

export type LoginResult =
  | { ok: true; account: Account }
  | { ok: false; reason: 'invalid' | 'unverified' | 'suspended' };

export type RegisterResult = { ok: true } | { ok: false; reason: 'exists' };

interface AuthValue {
  user: Account | null;
  accounts: Account[];
  register: (data: { name: string; surname: string; email: string; password: string }) => RegisterResult;
  /** Marks the e-mail as verified and signs the account in (what clicking the e-mail link would do). */
  verifyEmail: (email: string) => boolean;
  login: (email: string, password: string) => LoginResult;
  logout: () => void;
  updateProfile: (patch: Partial<Pick<Account, 'name' | 'surname' | 'grade' | 'region' | 'interests'>>) => void;
  changePassword: (current: string, next: string) => boolean;
  accountExists: (email: string) => boolean;
  resetPassword: (email: string, password: string) => boolean;
  setSuspended: (email: string, suspended: boolean) => void;
}

const AuthContext = createContext<AuthValue | null>(null);

const norm = (email: string) => email.trim().toLowerCase();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<Account[]>(readAccounts);
  const [session, setSession] = useState<string | null>(readSession);

  useEffect(() => {
    try {
      window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    } catch {
      /* storage unavailable */
    }
  }, [accounts]);

  useEffect(() => {
    try {
      if (session) window.localStorage.setItem(SESSION_KEY, session);
      else window.localStorage.removeItem(SESSION_KEY);
    } catch {
      /* storage unavailable */
    }
  }, [session]);

  const user = useMemo(
    () => accounts.find((a) => a.email === session && !a.suspended) ?? null,
    [accounts, session],
  );

  const accountExists = useCallback((email: string) => accounts.some((a) => a.email === norm(email)), [accounts]);

  const register: AuthValue['register'] = useCallback(
    ({ name, surname, email, password }) => {
      const e = norm(email);
      if (accounts.some((a) => a.email === e)) return { ok: false, reason: 'exists' };
      setAccounts((cur) => [
        ...cur,
        {
          email: e,
          name: name.trim(),
          surname: surname.trim(),
          password,
          role: 'student',
          verified: false,
          suspended: false,
          grade: '',
          region: '',
          interests: [],
          sample: false,
          createdAt: today(),
        },
      ]);
      return { ok: true };
    },
    [accounts],
  );

  const verifyEmail = useCallback(
    (email: string) => {
      const e = norm(email);
      if (!accounts.some((a) => a.email === e)) return false;
      setAccounts((cur) => cur.map((a) => (a.email === e ? { ...a, verified: true } : a)));
      setSession(e);
      return true;
    },
    [accounts],
  );

  const login: AuthValue['login'] = useCallback(
    (email, password) => {
      const account = accounts.find((a) => a.email === norm(email));
      if (!account || account.password !== password) return { ok: false, reason: 'invalid' };
      if (account.suspended) return { ok: false, reason: 'suspended' };
      if (!account.verified) return { ok: false, reason: 'unverified' };
      setSession(account.email);
      return { ok: true, account };
    },
    [accounts],
  );

  const logout = useCallback(() => setSession(null), []);

  const updateProfile: AuthValue['updateProfile'] = useCallback(
    (patch) => {
      if (!session) return;
      setAccounts((cur) => cur.map((a) => (a.email === session ? { ...a, ...patch } : a)));
    },
    [session],
  );

  const changePassword = useCallback(
    (current: string, next: string) => {
      const me = accounts.find((a) => a.email === session);
      if (!me || me.password !== current) return false;
      setAccounts((cur) => cur.map((a) => (a.email === me.email ? { ...a, password: next } : a)));
      return true;
    },
    [accounts, session],
  );

  const resetPassword = useCallback(
    (email: string, password: string) => {
      const e = norm(email);
      if (!accounts.some((a) => a.email === e)) return false;
      setAccounts((cur) => cur.map((a) => (a.email === e ? { ...a, password } : a)));
      return true;
    },
    [accounts],
  );

  const setSuspended = useCallback(
    (email: string, suspended: boolean) =>
      setAccounts((cur) => cur.map((a) => (a.email === email ? { ...a, suspended } : a))),
    [],
  );

  const value = useMemo<AuthValue>(
    () => ({ user, accounts, register, verifyEmail, login, logout, updateProfile, changePassword, accountExists, resetPassword, setSuspended }),
    [user, accounts, register, verifyEmail, login, logout, updateProfile, changePassword, accountExists, resetPassword, setSuspended],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export const initials = (a: Pick<Account, 'name' | 'surname'>) =>
  `${a.name.charAt(0)}${a.surname.charAt(0)}`.toUpperCase();

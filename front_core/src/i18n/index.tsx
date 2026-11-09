import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { en } from './en';
import { ru } from './ru';
import { uz } from './uz';
import { uiEn } from './ui-en';
import { uiRu } from './ui-ru';
import type { Dictionary, Locale } from './types';

export const LOCALES: Locale[] = ['uz', 'en', 'ru'];

const dictionaries: Record<Locale, Dictionary> = { uz, en, ru };
const STORAGE_KEY = 'yuksalup:locale';

function readStoredLocale(): Locale {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (value === 'uz' || value === 'en' || value === 'ru') return value;
  } catch {
    /* storage unavailable */
  }
  return 'uz';
}

export type Translate = (source: string, params?: Record<string, string | number>) => string;

interface I18nValue {
  locale: Locale;
  /** structured copy of the landing page */
  t: Dictionary;
  /**
   * Translates an Uzbek source string (the app's source language) into the active language.
   * `{name}` placeholders are filled from `params`. Unknown strings fall back to the source text.
   */
  tt: Translate;
  setLocale: (locale: Locale) => void;
}

const ui: Record<Locale, Record<string, string>> = { uz: {}, en: uiEn, ru: uiRu };

export function translate(locale: Locale, source: string, params?: Record<string, string | number>): string {
  let text = source;
  if (locale !== 'uz') {
    const found = ui[locale][source];
    if (found !== undefined) text = found;
    else if (import.meta.env.DEV) {
      // dev aid: collect untranslated source strings (user-entered content also lands here)
      const w = window as unknown as { __missingI18n?: Set<string> };
      (w.__missingI18n ??= new Set()).add(`${locale}|${source}`);
    }
  }
  return params ? text.replace(/\{(\w+)\}/g, (_, k: string) => String(params[k] ?? `{${k}}`)) : text;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const tt = useCallback<Translate>((source, params) => translate(locale, source, params), [locale]);
  const value = useMemo<I18nValue>(() => ({ locale, t: dictionaries[locale], tt, setLocale }), [locale, tt, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

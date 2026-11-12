import { useEffect, useRef, useState } from 'react';
import { Button as UiButton } from '@/components/shadcn/button';
import { ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { LOCALES, useI18n } from '@/i18n';
import styles from './LanguageSwitcher.module.css';

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className={styles.root} ref={ref}>
      <Button variant="outline" className={styles.trigger} onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        {locale.toUpperCase()} <ChevronDownIcon size={12} aria-hidden />
      </Button>
      {open && (
        <ul className={styles.menu}>
          {LOCALES.map((code) => (
            <li key={code}>
              <UiButton variant="unstyled"
                className={`${styles.option} ${code === locale ? styles.current : ''}`}
                onClick={() => {
                  setLocale(code);
                  setOpen(false);
                }}
              >
                {code.toUpperCase()}
              </UiButton>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

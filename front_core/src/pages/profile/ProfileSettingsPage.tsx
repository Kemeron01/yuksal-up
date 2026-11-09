import { useState, type FormEvent } from 'react';
import { Notice } from '@/components/auth/AuthParts';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/data/auth';
import { LOCALES, useI18n } from '@/i18n';
import type { Locale } from '@/i18n/types';
import { ProfileCard } from './ProfileCard';
import { ProfileLayout } from './ProfileLayout';
import { Select } from '@/components/ui/Select';
import styles from './ProfilePages.module.css';

const LANGUAGE_NAMES: Record<Locale, string> = { uz: 'O‘zbekcha', ru: 'Русский', en: 'English' };

/** 13 · Profile settings: interface language and password change. */
export function ProfileSettingsPage() {
  const { locale, setLocale, tt } = useI18n();
  const { changePassword } = useAuth();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ current: '', next: '', repeat: '' });
  const [errors, setErrors] = useState<{ current?: string; next?: string; repeat?: string }>({});
  const [done, setDone] = useState(false);
  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors({});
    setDone(false);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (form.next.length < 8) next.next = tt('Parol kamida 8 ta belgidan iborat bo‘lsin.');
    if (form.repeat !== form.next) next.repeat = tt('Parollar mos kelmadi.');
    if (Object.keys(next).length) return setErrors(next);
    if (!changePassword(form.current, form.next)) return setErrors({ current: tt('Joriy parol noto‘g‘ri.') });
    setForm({ current: '', next: '', repeat: '' });
    setOpen(false);
    setDone(true);
  };

  return (
    <ProfileLayout>
      <ProfileCard title={tt('Sozlamalar')}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="interface-language">
            {tt('Interfeys tili')}
          </label>
          <Select
            id="interface-language"
            value={locale}
            options={LOCALES.map((code) => ({ value: code, label: LANGUAGE_NAMES[code] }))}
            onChange={(code) => setLocale(code as Locale)}
          />
          <p className={styles.help}>{tt('O‘zbekcha / Русский / English')}</p>
        </div>
        <hr className={styles.divider} />
        <p className={styles.label}>{tt('Hisob xavfsizligi')}</p>
        {open ? (
          <form className={styles.passwordForm} onSubmit={onSubmit} noValidate>
            <Input label={tt('Joriy parol')} type="password" value={form.current} error={errors.current} onChange={set('current')} autoComplete="current-password" />
            <Input label={tt('Yangi parol')} type="password" value={form.next} error={errors.next} onChange={set('next')} autoComplete="new-password" />
            <Input label={tt('Parolni takrorlang')} type="password" value={form.repeat} error={errors.repeat} onChange={set('repeat')} autoComplete="new-password" />
            <div className={styles.actions}>
              <Button variant="primary" type="submit">
                {tt('Saqlash')}
              </Button>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                {tt('Bekor qilish')}
              </Button>
            </div>
          </form>
        ) : (
          <Button variant="secondary" onClick={() => setOpen(true)} slot={[240, '100%']}>
            {tt('Parolni yangilash')}
          </Button>
        )}
        {done && (
          <p className={styles.help} role="status">
            {tt('Parol yangilandi.')}
          </p>
        )}
      </ProfileCard>
      <div className={styles.notice}>
        <Notice title={tt('Shaxsiy profilingiz')} text={tt('Profilingiz boshqa o‘quvchilarga ko‘rsatilmaydi.')} />
      </div>
    </ProfileLayout>
  );
}

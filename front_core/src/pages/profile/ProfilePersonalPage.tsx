import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/data/auth';
import { ProfileCard } from './ProfileCard';
import { ProfileLayout } from './ProfileLayout';
import styles from './ProfilePages.module.css';
import { useI18n } from '@/i18n';

/** 11 · Profile personal — edits are saved to the signed-in account. */
export function ProfilePersonalPage() {
  const { tt } = useI18n();
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: user?.name ?? '',
    surname: user?.surname ?? '',
    grade: user?.grade ?? '',
    region: user?.region ?? '',
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!user) return null;

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaved(false);
    setError(null);
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.surname.trim()) return setError(tt('Ism va familiyani kiriting.'));
    updateProfile({ name: form.name.trim(), surname: form.surname.trim(), grade: form.grade.trim(), region: form.region.trim() });
    setSaved(true);
  };

  return (
    <ProfileLayout>
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <ProfileCard title={tt('Shaxsiy ma’lumotlar')}>
          <div className={styles.row}>
            <Input label={tt('Ism')} value={form.name} onChange={set('name')} autoComplete="given-name" />
            <Input label={tt('Familiya')} value={form.surname} onChange={set('surname')} autoComplete="family-name" />
          </div>
          <Input label={tt('Elektron pochta')} value={user.email} helperText={tt('Tasdiqlangan email manzili.')} disabled readOnly />
          <div className={styles.row}>
            <Input label={tt('Sinf')} value={form.grade} onChange={set('grade')} placeholder={tt('Masalan, 10-sinf')} />
            <Input label={tt('Hudud')} value={form.region} onChange={set('region')} placeholder={tt('Masalan, Toshkent')} />
          </div>
        </ProfileCard>
        {error && <p className={styles.saved}>{error}</p>}
        <div className={styles.actions}>
          <Button variant="primary" type="submit" slot={[256, '100%']}>
            {tt('O‘zgarishlarni saqlash')}
          </Button>
          {saved && (
            <p className={styles.saved} role="status">
              {tt('Saqlandi.')}
            </p>
          )}
        </div>
      </form>
    </ProfileLayout>
  );
}

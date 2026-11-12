import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { REGIONS } from '@/data/opportunities';
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
    school: user?.school ?? '',
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!user) return null;

  const set = (key: keyof typeof form) => (value: string) => {
    setSaved(false);
    setError(null);
    setForm((f) => ({ ...f, [key]: value }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.surname.trim()) return setError(tt('Ism va familiyani kiriting.'));
    updateProfile({ name: form.name.trim(), surname: form.surname.trim(), grade: form.grade.trim(), region: form.region.trim(), school: form.school.trim() });
    setSaved(true);
  };

  return (
    <ProfileLayout>
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <ProfileCard title={tt('Shaxsiy ma’lumotlar')}>
          <div className={styles.row}>
            <Input label={tt('Ism')} value={form.name} onChange={(e) => set('name')(e.target.value)} autoComplete="given-name" />
            <Input label={tt('Familiya')} value={form.surname} onChange={(e) => set('surname')(e.target.value)} autoComplete="family-name" />
          </div>
          <Input label={tt('Elektron pochta')} value={user.email} helperText={tt('Tasdiqlangan')} disabled readOnly />
          <div className={styles.row}>
            <div className={styles.selectField}>
              <label className={styles.fieldLabel} htmlFor="profile-grade">
                {tt('Sinf')}
              </label>
              <Select
                id="profile-grade"
                value={form.grade}
                options={[5, 6, 7, 8, 9, 10, 11].map((n) => ({ value: `${n}-sinf`, label: String(n) }))}
                onChange={set('grade')}
              />
            </div>
            <div className={styles.selectField}>
              <label className={styles.fieldLabel} htmlFor="profile-region">
                {tt('Hudud')}
              </label>
              <Select
                id="profile-region"
                value={form.region}
                options={REGIONS.map((r) => ({ value: r, label: tt(r) }))}
                onChange={set('region')}
              />
            </div>
          </div>
          <Input label={tt('Maktab')} value={form.school} onChange={(e) => set('school')(e.target.value)} placeholder={tt('Maktab nomi yoki raqami')} />
        </ProfileCard>
        {error && <p className={styles.saved}>{error}</p>}
        <div className={styles.actions}>
          <Button variant="primary" type="submit" slot={[256, 256]}>
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

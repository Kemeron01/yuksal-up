import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { PageIntro } from '@/components/auth/AuthParts';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { INTERESTS } from '@/data/opportunities';
import { useAuth } from '@/data/auth';
import styles from './InterestsPage.module.css';
import { useI18n } from '@/i18n';

/** 08 · Interests onboarding (second step of registration). */
export function InterestsPage() {
  const { tt } = useI18n();
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [selected, setSelected] = useState<string[]>(user?.interests ?? []);

  const toggle = (name: string) =>
    setSelected((cur) => (cur.includes(name) ? cur.filter((n) => n !== name) : [...cur, name]));

  const finish = () => {
    updateProfile({ interests: selected });
    navigate('/opportunities', { replace: true });
  };

  return (
    <AuthLayout>
      <PageIntro
        caption={tt('02 / 02 · Siz uchun imkoniyatlar')}
        title={tt('Sizni nima qiziqtiradi?')}
        text={tt('Kamida bitta yo‘nalishni tanlang. Keyinroq profilingizda o‘zgartirishingiz mumkin.')}
      />
      <div className={styles.choices}>
        {INTERESTS.map((name) => (
          <Chip key={name} label={tt(name)} large selected={selected.includes(name)} onClick={() => toggle(name)} />
        ))}
      </div>
      <p className={styles.count} aria-live="polite">
        {selected.length} ta yo‘nalish tanlandi
      </p>
      <Button variant="primary" block disabled={selected.length === 0} onClick={finish}>
        {tt('Imkoniyatlarni kashf etish')}
      </Button>
    </AuthLayout>
  );
}

import { InterestPicker } from '@/components/InterestPicker';
import { useAuth } from '@/data/auth';
import { ProfileCard } from './ProfileCard';
import { ProfileLayout } from './ProfileLayout';
import styles from './ProfilePages.module.css';
import { useI18n } from '@/i18n';

/** 12 · Profile interests (changes are saved automatically). */
export function ProfileInterestsPage() {
  const { tt } = useI18n();
  const { user, updateProfile } = useAuth();
  if (!user) return null;

  return (
    <ProfileLayout>
      <ProfileCard title={tt('Sizga nimalar qiziq?')}>
        <p className={styles.lead}>{tt('Tanlovlaringizni istalgan vaqtda o‘zgartiring.')}</p>
        <InterestPicker selected={user.interests} onChange={(interests) => updateProfile({ interests })} />
        <p className={styles.caption}>{tt('Tanlovlaringiz avtomatik saqlanadi.')}</p>
      </ProfileCard>
    </ProfileLayout>
  );
}

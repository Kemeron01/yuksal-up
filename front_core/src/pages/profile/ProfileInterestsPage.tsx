import { Chip } from '@/components/ui/Chip';
import { INTERESTS } from '@/data/opportunities';
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

  const toggle = (name: string) =>
    updateProfile({
      interests: user.interests.includes(name) ? user.interests.filter((n) => n !== name) : [...user.interests, name],
    });

  return (
    <ProfileLayout>
      <ProfileCard title={tt('Sizga nimalar qiziq?')}>
        <p className={styles.lead}>{tt('Tanlovlaringizni istalgan vaqtda o‘zgartiring.')}</p>
        <div className={styles.choices}>
          {INTERESTS.map((name) => (
            <Chip key={name} label={tt(name)} large selected={user.interests.includes(name)} onClick={() => toggle(name)} />
          ))}
        </div>
        <p className={styles.caption}>{tt('Tanlovlaringiz avtomatik saqlanadi.')}</p>
      </ProfileCard>
    </ProfileLayout>
  );
}

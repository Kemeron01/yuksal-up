import styles from './Status.module.css';
import { useI18n } from '@/i18n';

export type StatusState = 'open' | 'submitted' | 'accepted' | 'rejected' | 'closed';

const DEFAULT_LABEL: Record<StatusState, string> = {
  open: 'Ochiq',
  submitted: 'Ko‘rib chiqish kutilmoqda',
  accepted: 'Qabul qilindi',
  rejected: 'Rad etildi',
  closed: 'Yopiq',
};

const MARK: Partial<Record<StatusState, string>> = { accepted: '✓', rejected: '×' };

/** The written label always communicates the state; colour and the mark are only supporting. */
export function Status({ state, label, compact = false }: { state: StatusState; label?: string; compact?: boolean }) {
  const { tt } = useI18n();
  return (
    <span className={`${styles.status} ${styles[state]} ${compact ? styles.compact : ''}`}>
      {MARK[state] ? (
        <span className={styles.mark} aria-hidden>
          {MARK[state]}
        </span>
      ) : (
        <span className={styles.dot} aria-hidden />
      )}
      {label ?? tt(DEFAULT_LABEL[state])}
    </span>
  );
}

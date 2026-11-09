import styles from './Status.module.css';
import { useI18n } from '@/i18n';

export type StatusState = 'open' | 'submitted' | 'reviewed' | 'closed';

const DEFAULT_LABEL: Record<StatusState, string> = {
  open: 'Ochiq',
  submitted: 'Yuborilgan',
  reviewed: 'Ko‘rib chiqilgan',
  closed: 'Yopiq',
};

/** The written label always communicates the state; colour is only supporting. */
export function Status({ state, label, compact = false }: { state: StatusState; label?: string; compact?: boolean }) {
  const { tt } = useI18n();
  return (
    <span className={`${styles.status} ${styles[state]} ${compact ? styles.compact : ''}`}>
      <span className={styles.dot} aria-hidden />
      {label ?? tt(DEFAULT_LABEL[state])}
    </span>
  );
}

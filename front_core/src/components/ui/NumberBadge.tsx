import styles from './NumberBadge.module.css';

export function NumberBadge({ children }: { children: string }) {
  return <span className={styles.badge}>{children}</span>;
}

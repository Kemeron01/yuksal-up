import styles from './StatCard.module.css';

export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <li className={styles.card}>
      <p className={styles.value}>{value}</p>
      <p className={styles.label}>{label}</p>
    </li>
  );
}

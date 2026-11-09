import type { ReactNode } from 'react';
import styles from './CategoryItem.module.css';

export function CategoryItem({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <li className={styles.item}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </li>
  );
}

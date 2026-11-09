import type { ReactNode } from 'react';
import styles from './ProfileCard.module.css';

export function ProfileCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </section>
  );
}

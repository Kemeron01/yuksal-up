import type { ReactNode } from 'react';
import styles from './Eyebrow.module.css';

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className={styles.eyebrow}>{children}</p>;
}

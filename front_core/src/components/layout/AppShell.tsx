import type { ReactNode } from 'react';
import { Header } from './Header';
import { SlimFooter } from './SlimFooter';
import styles from './AppShell.module.css';

/** Page frame for app screens: wide header, growing content area, slim footer pinned to the bottom. */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page}>
      <Header wide />
      <main className={styles.content}>{children}</main>
      <SlimFooter />
    </div>
  );
}

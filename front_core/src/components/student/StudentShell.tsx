import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { Header, type HeaderActive } from '@/components/layout/Header';
import styles from './StudentShell.module.css';
import { useI18n } from '@/i18n';

/** Frame of student-app screens: centered header card, content column (1268px) and bordered footer. */
export function StudentShell({ active, children }: { active: HeaderActive; children: ReactNode }) {
  const { tt } = useI18n();
  return (
    <div className={styles.page}>
      <Header centered active={active} />
      <main className={styles.main}>
        <div className={styles.content}>{children}</div>
      </main>
      <footer className={styles.footer}>
        <p className={styles.copyright}>{tt('© 2026 YuksalUp')}</p>
        <Link className={styles.privacy} to="/privacy">
          {tt('Maxfiylik')}
        </Link>
      </footer>
    </div>
  );
}

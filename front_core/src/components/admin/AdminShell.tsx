import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import styles from './AdminShell.module.css';
import { useI18n } from '@/i18n';

export type AdminSection = 'dashboard' | 'users' | 'opportunities' | 'challenges' | 'reviews';

const NAV: { key: AdminSection; label: string; to: string }[] = [
  { key: 'dashboard', label: 'Umumiy ko‘rinish', to: '/admin' },
  { key: 'users', label: 'Foydalanuvchilar', to: '/admin/users' },
  { key: 'opportunities', label: 'Imkoniyatlar', to: '/admin/opportunities' },
  { key: 'challenges', label: 'Topshiriqlar', to: '/admin/challenges' },
  { key: 'reviews', label: 'Tekshiruv navbati', to: '/admin/reviews' },
];

/** Frame of admin screens: shared header, 224px navigation, 912px main column and footer. */
export function AdminShell({ active, children }: { active: AdminSection; children: ReactNode }) {
  const { tt } = useI18n();
  return (
    <div className={styles.page}>
      <Header contained active="none" />
      <div className={styles.workspace}>
        <aside className={styles.nav}>
          <span className={styles.chip}>{tt('Boshqaruv paneli')}</span>
          <h2 className={styles.navTitle}>{tt('Hammasi nazoratda.')}</h2>
          <p className={styles.navText}>{tt('Kontent, akkauntlar va o‘quvchilar ishlarini boshqaring.')}</p>
          <nav className={styles.links} aria-label={tt('Admin')}>
            {NAV.map((item) => (
              <Link
                key={item.key}
                to={item.to}
                className={`${styles.link} ${item.key === active ? styles.linkActive : ''}`}
                aria-current={item.key === active ? 'page' : undefined}
              >
                {tt(item.label)}
              </Link>
            ))}
          </nav>
          <p className={styles.note}>{tt('Namunaviy ma’lumotlar bilan boshqaruv ko‘rinishi.')}</p>
        </aside>
        <main className={styles.main}>{children}</main>
      </div>
      <footer className={styles.footer}>
        <p className={styles.copyright}>{tt('© 2026 YuksalUp')}</p>
        <Link className={styles.privacy} to="/privacy">
          {tt('Maxfiylik siyosati')}
        </Link>
      </footer>
    </div>
  );
}

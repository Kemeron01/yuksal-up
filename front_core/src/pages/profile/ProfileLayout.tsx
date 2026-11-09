import type { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { initials, useAuth } from '@/data/auth';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { Status } from '@/components/ui/Status';
import styles from './ProfileLayout.module.css';
import { useI18n } from '@/i18n';
import { localizeGrade } from '@/data/opportunities';

const SECTIONS = [
  { to: '/profile', label: 'Shaxsiy ma’lumotlar', short: 'Ma’lumotlar' },
  { to: '/profile/interests', label: 'Qiziqishlar', short: 'Qiziqishlar', },
  { to: '/profile/settings', label: 'Sozlamalar', short: 'Sozlamalar', },
];

function SectionNav() {
  const { tt } = useI18n();
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {/* desktop: vertical menu */}
      <nav className={styles.sideNav} aria-label={tt('Profil bo‘limlari')}>
        <p className={styles.navCaption}>{tt('PROFIL BO‘LIMLARI')}</p>
        {SECTIONS.map((s) => (
          <Button key={s.to} to={s.to} variant={pathname === s.to ? 'primary' : 'secondary'} block>
            {tt(s.label)}
          </Button>
        ))}
        <Button
          variant="outline"
          block
          onClick={() => {
            logout();
            navigate('/', { replace: true });
          }}
        >
          {tt('Chiqish')}
        </Button>
      </nav>

      {/* mobile: chip tabs */}
      <nav className={styles.tabs} aria-label={tt('Profil bo‘limlari')}>
        {SECTIONS.map((s) => (
          <Link key={s.to} to={s.to} className={styles.tab} aria-current={pathname === s.to ? 'page' : undefined}>
            <Chip label={tt(s.short)} selected={pathname === s.to} asStatic />
          </Link>
        ))}
      </nav>
    </>
  );
}

function Identity() {
  const { tt } = useI18n();
  const { user } = useAuth();
  if (!user) return null;
  const sub = [user.grade && tt('{grade} o‘quvchisi', { grade: localizeGrade(user.grade, tt) }), tt(user.region)].filter(Boolean).join(' · ');
  return (
    <div className={styles.identity}>
      <span className={styles.initials} aria-hidden>
        {initials(user)}
      </span>
      <div className={styles.who}>
        <h1 className={styles.name}>
          {user.name} {user.surname}
        </h1>
        <p className={styles.grade}>{sub || user.email}</p>
      </div>
      <Status state="open" label={tt('Shaxsiy profil')} compact />
    </div>
  );
}

/** Shared frame of profile screens (11–13): student header, section menu, identity and the section card. */
export function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell>
      <div className={styles.content}>
        <div className={styles.workspace}>
          <SectionNav />
          <div className={styles.main}>
            <Identity />
            {children}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wordmark } from '@/components/brand/Wordmark';
import { Button } from '@/components/ui/Button';
import { MenuIcon } from '@/components/ui/Icons';
import { useAuth } from '@/data/auth';
import { useI18n } from '@/i18n';
import { AccountMenu } from './AccountMenu';
import { LanguageSwitcher } from './LanguageSwitcher';
import styles from './Header.module.css';

export type HeaderActive = 'opportunities' | 'challenges' | 'saved' | 'calendar' | 'none';

interface HeaderProps {
  wide?: boolean;
  /** Admin: no band border, card limited to the 1160px container. */
  contained?: boolean;
  /** Student app header: card hugs its content and is centered (design: Header / <section>). */
  centered?: boolean;
  active?: HeaderActive;
  /** Authentication screens: only the logo, no navigation. */
  minimal?: boolean;
}

/**
 * Site header. The state follows the session: guests get Home / Opportunities / Challenges and a sign-in
 * button, signed-in accounts get the app navigation and an account menu.
 */
export function Header({ wide = false, contained = false, centered = false, active = 'opportunities', minimal = false }: HeaderProps) {
  const { t, tt } = useI18n();
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  const app = Boolean(user);
  const isAdmin = user?.role === 'admin';
  const links = isAdmin
    ? [
        { to: '/admin', label: 'Panel', section: '/admin' },
        { to: '/admin/opportunities', label: t.nav.opportunities, section: '/admin/opportunities' },
        { to: '/admin/challenges', label: 'Topshiriqlar', section: '/admin/challenges' },
        { to: '/admin/reviews', label: 'Tekshiruv', section: '/admin/reviews' },
      ].map((l) => ({
        ...l,
        variant: (l.section === '/admin' ? pathname === '/admin' : pathname.startsWith(l.section)) ? ('active' as const) : ('soft' as const),
      }))
    : app
    ? [
        { to: '/opportunities', label: t.nav.opportunities, key: 'opportunities' },
        { to: '/challenges', label: t.nav.challenges, key: 'challenges' },
        { to: '/saved', label: 'Saqlanganlar', key: 'saved' },
        { to: '/calendar', label: 'Taqvim', key: 'calendar' },
      ].map((l) => ({ ...l, variant: (l.key === active ? 'active' : 'soft') as 'active' | 'soft' }))
    : [
        { to: '/', label: t.nav.home, variant: (pathname === '/' ? 'active' : 'soft') as 'active' | 'soft' },
        { to: '/opportunities', label: t.nav.opportunities, variant: (pathname.startsWith('/opportunities') ? 'active' : 'soft') as 'active' | 'soft' },
        { to: '/challenges', label: t.nav.challenges, variant: (pathname.startsWith('/challenges') ? 'active' : 'soft') as 'active' | 'soft' },
      ];

  // The interface language can be changed on every screen; the choice is global and persisted.
  const language = <LanguageSwitcher />;

  const account = app ? (
    <AccountMenu />
  ) : (
    <Button to="/login" variant="primary" className={styles.signIn}>
      {t.nav.signIn}
    </Button>
  );

  if (minimal) {
    return (
      <header className={styles.minimal}>
        <Wordmark />
      </header>
    );
  }

  return (
    <header
      className={`${styles.band} ${wide || centered || contained ? styles.wide : ''} ${centered ? styles.centered : ''} ${contained ? styles.contained : ''}`}
    >
      <div className={styles.card}>
        <div className={styles.bar}>
          <Wordmark />

          <nav className={styles.desktopNav} aria-label={tt('Main')}>
            {links.map((l) => (
              <Button key={l.to} to={l.to} variant={l.variant}>
                {tt(l.label)}
              </Button>
            ))}
          </nav>

          <div className={styles.account}>
            {language}
            {account}
          </div>

          <button
            type="button"
            className={styles.menuControl}
            aria-label={t.nav.menu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={styles.menuIcon}>
              <MenuIcon />
            </span>
          </button>
        </div>

        {menuOpen && (
          <div className={styles.mobilePanel}>
            <nav className={styles.mobileNav} aria-label={tt('Main')}>
              {links.map((l) => (
                <Button key={l.to} to={l.to} variant={l.variant} onClick={close} className={styles.mobileLink}>
                  {tt(l.label)}
                </Button>
              ))}
            </nav>
            <div className={styles.mobileAccount}>
              {language}
              {account}
              {app && user?.role === 'admin' && (
                <Link to="/admin" className={styles.mobileExtra} onClick={close}>
                  {tt('Admin panel')}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

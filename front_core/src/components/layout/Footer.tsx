import { Link } from 'react-router-dom';
import { LogoMark } from '@/components/brand/LogoMark';
import { useI18n } from '@/i18n';
import styles from './Footer.module.css';

export function Footer() {
  const { t, tt } = useI18n();
  const links = [
    { href: '/', label: t.nav.home },
    { href: '/opportunities', label: t.nav.opportunities },
    { href: '/challenges', label: t.nav.challenges },
  ];

  return (
    <footer className={styles.section}>
      <div className={styles.card}>
        <div className={styles.inner}>
          <div className={styles.navigation}>
            <ul className={styles.links}>
              {links.map((l) => (
                <li key={l.href}>
                  <Link to={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
            <span className={styles.brandDesktop}>
              <LogoMark size="footer" />
            </span>
            <span className={styles.brandMobile}>
              <LogoMark size="footerMobile" />
            </span>
          </div>
          <p className={styles.giant} aria-hidden>
            {tt('yuksalUp')}
          </p>
          <div className={styles.legal}>
            <p>{t.footer.copyright}</p>
            <Link to="/privacy">{t.footer.privacy}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

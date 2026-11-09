import { Link } from 'react-router-dom';
import styles from './SlimFooter.module.css';
import { useI18n } from '@/i18n';

export function SlimFooter() {
  const { tt } = useI18n();
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>{tt('© 2026 YuksalUp')}</p>
      <Link className={styles.privacy} to="/privacy">
        {tt('Maxfiylik')}
      </Link>
    </footer>
  );
}

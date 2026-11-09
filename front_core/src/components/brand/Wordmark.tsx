import { Link } from 'react-router-dom';
import { LogoMark, type Tone } from './LogoMark';
import styles from './Wordmark.module.css';

export function Wordmark({ tone = 'navy', href = '/' }: { tone?: Tone; href?: string }) {
  return (
    <Link className={styles.wordmark} to={href} aria-label="yuksalUp">
      <LogoMark tone={tone} />
      <span className={`${styles.lettering} ${tone === 'inverse' ? styles.inverse : ''}`}>
        yuksal<span className={styles.up}>Up</span>
      </span>
    </Link>
  );
}

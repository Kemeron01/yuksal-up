import { ArrowIcon } from '@/components/ui/Icons';
import styles from './LogoMark.module.css';

type Size = 'header' | 'footer' | 'footerMobile';
export type Tone = 'navy' | 'inverse';

export function LogoMark({ size = 'header', tone = 'navy' }: { size?: Size; tone?: Tone }) {
  return (
    <span className={`${styles.mark} ${styles[size]} ${tone === 'inverse' ? styles.inverse : ''}`} aria-hidden>
      <span className={styles.symbol}>
        <ArrowIcon color={tone === 'inverse' ? 'var(--navy)' : 'var(--yellow)'} />
      </span>
    </span>
  );
}

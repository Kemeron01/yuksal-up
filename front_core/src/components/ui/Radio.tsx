import type { InputHTMLAttributes } from 'react';
import { useI18n } from '@/i18n';
import styles from './Choice.module.css';

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export function Radio({ label: rawLabel, className, ...rest }: RadioProps) {
  const { tt } = useI18n();
  const label = rawLabel ? tt(rawLabel) : rawLabel;
  return (
    <label className={[styles.choice, className ?? ''].join(' ')}>
      <input type="radio" className={`${styles.input} ${styles.radio}`} {...rest} />
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}

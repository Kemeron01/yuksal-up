import type { InputHTMLAttributes } from 'react';
import { useI18n } from '@/i18n';
import styles from './Choice.module.css';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export function Checkbox({ label: rawLabel, className, ...rest }: CheckboxProps) {
  const { tt } = useI18n();
  const label = rawLabel ? tt(rawLabel) : rawLabel;
  return (
    <label className={[styles.choice, className ?? ''].join(' ')}>
      <input type="checkbox" className={`${styles.input} ${styles.checkbox}`} {...rest} />
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}

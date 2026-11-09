import { useId, type InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string;
  helperText?: string;
  /** Error message. Error is always explained in words, never by colour alone. */
  error?: string;
  id?: string;
}

export function Input({ label, helperText, error, id, className, disabled, ...rest }: InputProps) {
  const auto = useId();
  const inputId = id ?? auto;
  const helperId = `${inputId}-helper`;
  const message = error ?? helperText;

  return (
    <div className={[styles.root, className ?? ''].join(' ')}>
      <label className={`${styles.label} ${disabled ? styles.muted : ''}`} htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className={`${styles.field} ${error ? styles.error : ''}`}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? helperId : undefined}
        {...rest}
      />
      {message && (
        <p id={helperId} className={`${styles.helper} ${error ? styles.helperError : ''}`}>
          {message}
        </p>
      )}
    </div>
  );
}

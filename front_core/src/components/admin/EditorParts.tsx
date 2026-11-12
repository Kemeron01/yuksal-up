import { useId, type ReactNode, type TextareaHTMLAttributes } from 'react';
import { Button } from '@/components/ui/Button';
import styles from './EditorParts.module.css';
import { useI18n } from '@/i18n';

export function EditorSteps({ current, steps }: { current: 1 | 2 | 3; steps: string[] }) {
  const { tt } = useI18n();
  return (
    <ol className={styles.steps}>
      {steps.map((label, i) => {
        const n = i + 1;
        const active = n === current;
        return (
          <li key={label} className={styles.step} aria-current={active ? 'step' : undefined}>
            <span className={`${styles.num} ${active ? styles.numActive : ''}`}>{n}</span>
            <span className={`${styles.stepLabel} ${active ? styles.stepLabelActive : ''}`}>{tt(label)}</span>
          </li>
        );
      })}
    </ol>
  );
}

export function EditorCard({ children, onSubmit }: { children: ReactNode; onSubmit?: (e: React.FormEvent) => void }) {
  return (
    <form className={styles.card} onSubmit={onSubmit} noValidate>
      {children}
    </form>
  );
}

export function TwoColumns({ children }: { children: ReactNode }) {
  return <div className={styles.two}>{children}</div>;
}

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
  minHeight?: number;
}

export function TextareaField({ label, hint, minHeight = 150, id, ...rest }: TextareaFieldProps) {
  const auto = useId();
  const fieldId = id ?? auto;
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={fieldId}>
        {label}
      </label>
      <textarea id={fieldId} className={styles.textarea} style={{ minHeight }} {...rest} />
      {hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}

/** Collapsed "translations" box with optional uz / ru inputs. */
export function Translations({ title, hint, children }: { title: string; hint: string; children?: ReactNode }) {
  return (
    <details className={styles.translations}>
      <summary className={styles.summary}>
        <span className={styles.label}>{title}</span>
        <span className={styles.hint}>{hint}</span>
      </summary>
      <div className={styles.translationBody}>{children}</div>
    </details>
  );
}

export function EditorActions({
  onCancel,
  onBack,
  primary,
}: {
  onCancel: () => void;
  onBack?: () => void;
  primary: { label: string; width: number };
}) {
  const { tt } = useI18n();
  return (
    <>
      <hr className={styles.divider} />
      <div className={styles.actions}>
        <Button variant="outline" onClick={onCancel} slot={[140, '100%']}>
          {tt('Bekor qilish')}
        </Button>
        {onBack && (
          <Button variant="secondary" onClick={onBack} slot={[120, '100%']}>
            {tt('← Orqaga')}
          </Button>
        )}
        <Button variant="primary" type="submit" slot={[primary.width, '100%']}>
          {primary.label}
        </Button>
      </div>
    </>
  );
}

export function ContextNote({ children }: { children: ReactNode }) {
  return <div className={styles.note}>{children}</div>;
}

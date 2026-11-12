import { useEffect, useRef, type ReactNode } from 'react';
import { Button as UiButton } from '@/components/shadcn/button';
import { Button } from '@/components/ui/Button';
import styles from './ConfirmDialog.module.css';
import { useI18n } from '@/i18n';

interface ConfirmDialogProps {
  title: string;
  text: string;
  note: ReactNode;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}

/** Modal confirmation (design: "Delete content / confirmation overlay"). Esc and the backdrop cancel. */
export function ConfirmDialog({ title, text, note, confirmLabel, onCancel, onConfirm }: ConfirmDialogProps) {
  const { tt } = useI18n();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', onKey);
    ref.current?.querySelector<HTMLElement>('button')?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [onCancel]);

  return (
    <div className={styles.overlay} onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
      <div ref={ref} className={styles.dialog} role="alertdialog" aria-modal="true" aria-labelledby="dialog-title">
        <UiButton variant="unstyled" className={styles.close} onClick={onCancel} aria-label={tt('Yopish')}>
          ×
        </UiButton>
        <h2 id="dialog-title" className={styles.title}>
          {title}
        </h2>
        <p className={styles.text}>{text}</p>
        <div className={styles.note}>{note}</div>
        <div className={styles.actions}>
          <Button variant="secondary" onClick={onCancel} slot={[140, '100%']}>
            {tt('Bekor qilish')}
          </Button>
          <Button variant="primary" onClick={onConfirm} slot={[120, '100%']}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

import { useI18n } from '@/i18n';
import { Button as UiButton } from '@/components/shadcn/button';
import styles from './Chip.module.css';

interface ChipProps {
  label: string;
  selected?: boolean;
  removable?: boolean;
  large?: boolean;
  /** Prefixes the label with "+" (not selected) or "✓" (selected): toggle-style choice chip. */
  mark?: boolean;
  /** Renders a non-interactive pill (when the chip sits inside a link). */
  asStatic?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
}

export function Chip({ label: rawLabel, selected = false, removable = false, large = false, mark = false, asStatic = false, onClick, onRemove }: ChipProps) {
  const { tt } = useI18n();
  const label = (mark ? (selected ? '✓ ' : '+ ') : '') + tt(rawLabel);
  const cls = [styles.chip, selected ? styles.selected : '', large ? styles.large : ''].join(' ');

  if (asStatic) {
    return <span className={cls}>{label}</span>;
  }

  if (removable) {
    return (
      <span className={cls}>
        <UiButton variant="unstyled" className={styles.label} onClick={onClick} aria-pressed={selected}>
          {label}
        </UiButton>
        <UiButton variant="unstyled" className={styles.remove} onClick={onRemove} aria-label={`× ${label}`}>
          ×
        </UiButton>
      </span>
    );
  }

  return (
    <UiButton variant="unstyled" className={cls} onClick={onClick} aria-pressed={selected}>
      <span className={styles.label}>{label}</span>
    </UiButton>
  );
}

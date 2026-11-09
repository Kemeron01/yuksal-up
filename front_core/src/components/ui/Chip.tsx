import { useI18n } from '@/i18n';
import styles from './Chip.module.css';

interface ChipProps {
  label: string;
  selected?: boolean;
  removable?: boolean;
  large?: boolean;
  /** Renders a non-interactive pill (when the chip sits inside a link). */
  asStatic?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
}

export function Chip({ label: rawLabel, selected = false, removable = false, large = false, asStatic = false, onClick, onRemove }: ChipProps) {
  const { tt } = useI18n();
  const label = tt(rawLabel);
  const cls = [styles.chip, selected ? styles.selected : '', large ? styles.large : ''].join(' ');

  if (asStatic) {
    return <span className={cls}>{label}</span>;
  }

  if (removable) {
    return (
      <span className={cls}>
        <button type="button" className={styles.label} onClick={onClick} aria-pressed={selected}>
          {label}
        </button>
        <button type="button" className={styles.remove} onClick={onRemove} aria-label={`× ${label}`}>
          ×
        </button>
      </span>
    );
  }

  return (
    <button type="button" className={cls} onClick={onClick} aria-pressed={selected}>
      <span className={styles.label}>{label}</span>
    </button>
  );
}

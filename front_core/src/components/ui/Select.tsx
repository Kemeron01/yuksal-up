import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { Button as UiButton } from '@/components/shadcn/button';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id?: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  'aria-label'?: string;
}

/** Custom dropdown (listbox) with keyboard support, replacing the native <select>. */
export function Select({ id, value, options, onChange, 'aria-label': ariaLabel }: SelectProps) {
  const uid = useId();
  const listId = `${id ?? uid}-list`;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedIndex = Math.max(0, options.findIndex((o) => o.value === value));

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  const openMenu = () => {
    setActive(selectedIndex);
    setOpen(true);
  };
  const choose = (i: number) => {
    onChange(options[i].value);
    setOpen(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Escape') return setOpen(false);
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) return openMenu();
      setActive((a) => (e.key === 'ArrowDown' ? Math.min(options.length - 1, a + 1) : Math.max(0, a - 1)));
    } else if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
      setActive(e.key === 'Home' ? 0 : options.length - 1);
    } else if ((e.key === 'Enter' || e.key === ' ') && open) {
      e.preventDefault();
      choose(active);
    }
  };

  return (
    <div className={styles.root} ref={rootRef}>
      <UiButton variant="unstyled"
        id={id}
        className={`${styles.trigger} ${open ? styles.open : ''}`}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={ariaLabel}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
      >
        <span className={styles.value}>{options[selectedIndex]?.label}</span>
        <ChevronDownIcon className={styles.chevron} size={18} aria-hidden />
      </UiButton>
      {open && (
        <ul id={listId} className={styles.menu} role="listbox">
          {options.map((o, i) => (
            <li
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              className={`${styles.option} ${i === active ? styles.active : ''} ${o.value === value ? styles.selected : ''}`}
              onPointerEnter={() => setActive(i)}
              onPointerDown={(e) => e.preventDefault()}
              onClick={() => choose(i)}
            >
              <span>{o.label}</span>
              {o.value === value && <CheckIcon size={16} aria-hidden />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

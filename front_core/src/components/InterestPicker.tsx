import { useState, type FormEvent } from 'react';
import { Button as UiButton } from '@/components/shadcn/button';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { INTERESTS } from '@/data/opportunities';
import { useI18n } from '@/i18n';
import styles from './InterestPicker.module.css';

interface InterestPickerProps {
  selected: string[];
  onChange: (next: string[]) => void;
}

/** Interest chips (+ / ✓) with an "add your own interest" field (onboarding 08–10, profile 14–16). */
export function InterestPicker({ selected, onChange }: InterestPickerProps) {
  const { tt } = useI18n();
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState('');
  const [added, setAdded] = useState<string | null>(null);

  const custom = selected.filter((n) => !INTERESTS.includes(n));
  const all = [...INTERESTS, ...custom];
  const toggle = (name: string) => {
    setAdded(null);
    onChange(selected.includes(name) ? selected.filter((n) => n !== name) : [...selected, name]);
  };

  const add = (e: FormEvent) => {
    e.preventDefault();
    const name = draft.trim();
    if (!name) return;
    const existing = all.find((n) => n.toLowerCase() === name.toLowerCase());
    if (existing) {
      if (!selected.includes(existing)) onChange([...selected, existing]);
    } else {
      onChange([...selected, name]);
    }
    setAdded(existing ?? name);
    setDraft('');
    setAdding(false);
  };

  return (
    <div className={styles.picker}>
      <div className={styles.choices}>
        {all.map((name) => (
          <Chip key={name} label={name} large mark selected={selected.includes(name)} onClick={() => toggle(name)} />
        ))}
      </div>

      <hr className={styles.divider} />

      {adding ? (
        <form className={styles.addForm} onSubmit={add}>
          <label className={styles.addLabel} htmlFor="custom-interest">
            {tt('Qiziqishingizni yozing')}
          </label>
          <div className={styles.addRow}>
            <input
              id="custom-interest"
              className={styles.input}
              value={draft}
              maxLength={40}
              autoFocus
              placeholder={tt('Masalan, Robototexnika')}
              onChange={(e) => setDraft(e.target.value)}
            />
            <Button variant="primary" type="submit" disabled={!draft.trim()}>
              {tt('Qo‘shish')}
            </Button>
          </div>
        </form>
      ) : (
        <UiButton variant="unstyled" className={styles.addToggle} onClick={() => setAdding(true)}>
          <PlusIcon size={12} aria-hidden />
          {tt('Boshqa qiziqish qo‘shish')}
        </UiButton>
      )}

      {added && (
        <p className={styles.added} role="status">
          {tt('“{name}” qiziqishlaringizga qo‘shildi.', { name: tt(added) })}
        </p>
      )}
    </div>
  );
}

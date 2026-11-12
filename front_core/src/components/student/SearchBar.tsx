import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { SearchIcon } from '@/components/ui/Icons';
import styles from './SearchBar.module.css';
import { useI18n } from '@/i18n';

interface SearchBarProps {
  value: string;
  onSearch: (query: string) => void;
  /** Mobile only: toggles the filter panel (design: "Filtrlar" button). */
  onToggleFilters?: () => void;
  filtersOpen?: boolean;
}

export function SearchBar({ value, onSearch, onToggleFilters, filtersOpen }: SearchBarProps) {
  const { tt } = useI18n();
  const [draft, setDraft] = useState(value);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(draft.trim());
  };

  return (
    <form className={styles.form} onSubmit={submit} role="search">
      <label className={styles.field}>
        <span className={styles.icon} aria-hidden>
          <SearchIcon />
        </span>
        <input
          className={styles.input}
          type="search"
          placeholder={tt('Nomi yoki tavsifi bo‘yicha qidirish')}
          aria-label={tt('Imkoniyat qidirish')}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
      </label>
      <div className={styles.actions}>
        <Button variant="primary" type="submit" className={styles.search}>
          {tt('Qidirish')}
        </Button>
        {onToggleFilters && (
          <Button variant="outline" onClick={onToggleFilters} aria-expanded={filtersOpen} className={styles.filters}>
            {tt('Filtrlar')}
          </Button>
        )}
      </div>
    </form>
  );
}

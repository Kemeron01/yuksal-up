import type { OpportunityCategory } from '@/data/opportunities';
import { CATEGORIES } from '@/data/opportunities';
import styles from './CategoryTabs.module.css';
import { useI18n } from '@/i18n';

export type CategoryFilter = 'Barchasi' | OpportunityCategory;

export function CategoryTabs({ value, onChange }: { value: CategoryFilter; onChange: (next: CategoryFilter) => void }) {
  const { tt } = useI18n();
  const items: CategoryFilter[] = ['Barchasi', ...CATEGORIES];
  return (
    <div className={styles.tabs} role="group" aria-label={tt('Imkoniyat turlari')}>
      {items.map((item) => (
        <button
          key={item}
          type="button"
          className={`${styles.tab} ${value === item ? styles.active : ''}`}
          aria-pressed={value === item}
          onClick={() => onChange(item)}
        >
          {tt(item)}
        </button>
      ))}
    </div>
  );
}

import { Checkbox } from '@/components/ui/Checkbox';
import { Radio } from '@/components/ui/Radio';
import { FORMATS, INTERESTS, REGIONS } from '@/data/opportunities';
import { Select } from '@/components/ui/Select';
import styles from './FilterSidebar.module.css';
import { useI18n } from '@/i18n';

export interface Filters {
  interests: string[];
  region: string;
  format: (typeof FORMATS)[number];
}

export const EMPTY_FILTERS: Filters = { interests: [], region: 'Barcha hududlar', format: 'Barchasi' };

interface FilterSidebarProps {
  filters: Filters;
  onChange: (next: Filters) => void;
  className?: string;
}

export function FilterSidebar({ filters, onChange, className }: FilterSidebarProps) {
  const { tt } = useI18n();
  const toggleInterest = (name: string) =>
    onChange({
      ...filters,
      interests: filters.interests.includes(name)
        ? filters.interests.filter((n) => n !== name)
        : [...filters.interests, name],
    });

  return (
    <aside className={[styles.sidebar, className ?? ''].join(' ')} aria-label={tt('Filtr')}>
      <div className={styles.heading}>
        <p className={styles.headingTitle}>{tt('Filtr')}</p>
        <button type="button" className={styles.clear} onClick={() => onChange(EMPTY_FILTERS)}>
          {tt('Tozalash')}
        </button>
      </div>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>{tt('Qiziqishlar')}</legend>
        {INTERESTS.map((name) => (
          <Checkbox key={name} label={tt(name)} checked={filters.interests.includes(name)} onChange={() => toggleInterest(name)} />
        ))}
      </fieldset>

      <div className={styles.field}>
        <label className={styles.legend} htmlFor="filter-region">
          {tt('Hudud')}
        </label>
        <Select
          id="filter-region"
          value={filters.region}
          options={REGIONS.map((r) => ({ value: r, label: tt(r) }))}
          onChange={(region) => onChange({ ...filters, region })}
        />
      </div>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>{tt('Ishtirok formati')}</legend>
        {FORMATS.map((f) => (
          <Radio key={f} name="filter-format" label={tt(f)} checked={filters.format === f} onChange={() => onChange({ ...filters, format: f })} />
        ))}
      </fieldset>
    </aside>
  );
}

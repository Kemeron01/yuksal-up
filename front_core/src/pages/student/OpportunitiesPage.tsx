import { useMemo, useState } from 'react';
import { SearchIcon } from '@/components/ui/Icons';
import { Chip } from '@/components/ui/Chip';
import { StudentShell } from '@/components/student/StudentShell';
import { PageHeading } from '@/components/student/PageHeading';
import { OpportunityCard } from '@/components/student/OpportunityCard';
import { FilterDrawer, EMPTY_FILTERS, type Filters } from '@/components/student/FilterDrawer';
import { SearchBar } from '@/components/student/SearchBar';
import { OPPORTUNITIES, type Opportunity } from '@/data/opportunities';
import { Button } from '@/components/ui/Button';
import styles from './OpportunitiesPage.module.css';
import { useI18n } from '@/i18n';

function matches(o: Opportunity, query: string, f: Filters): boolean {
  if (f.types.length && !f.types.includes(o.category)) return false;
  if (f.interests.length && !f.interests.includes(o.interest)) return false;
  if (f.region && o.region !== f.region) return false;
  if (f.format !== 'Barchasi' && o.format !== f.format) return false;
  if (f.freeOnly && o.price !== 'Bepul') return false;
  const q = query.trim().toLowerCase();
  if (q) {
    const hay = `${o.title} ${o.organization} ${o.category} ${o.interest} ${o.region}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

/** 01 · Catalog, 02–04 · Filter drawer, 05 · Filtered results, 06 · No search results. */
export function OpportunitiesPage() {
  const { tt } = useI18n();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // the search box and the drawer's "Kalit so'z" field edit the same keyword
  const keyword = query || filters.keyword;
  const results = useMemo(
    () => OPPORTUNITIES.filter((o) => matches(o, keyword, filters)).sort((a, b) => a.deadline.localeCompare(b.deadline)),
    [keyword, filters],
  );

  const set = <K extends keyof Filters>(key: K, value: Filters[K]) => setFilters((f) => ({ ...f, [key]: value }));

  // active filters shown as removable chips
  const selected: { key: string; label: string; remove: () => void }[] = [
    ...filters.types.map((c) => ({ key: `t-${c}`, label: tt(c), remove: () => set('types', filters.types.filter((n) => n !== c)) })),
    ...(filters.region ? [{ key: 'region', label: tt(filters.region), remove: () => set('region', '') }] : []),
    ...(filters.format !== 'Barchasi' ? [{ key: 'format', label: tt(filters.format), remove: () => set('format', 'Barchasi') }] : []),
    ...filters.interests.map((n) => ({ key: `i-${n}`, label: tt(n), remove: () => set('interests', filters.interests.filter((x) => x !== n)) })),
    ...(filters.freeOnly ? [{ key: 'free', label: tt('Faqat bepul'), remove: () => set('freeOnly', false) }] : []),
  ];

  const reset = () => {
    setQuery('');
    setFilters(EMPTY_FILTERS);
  };

  return (
    <StudentShell active="opportunities">
      <div className={styles.column}>
        <PageHeading title={tt('Imkoniyatlar')} text={tt('Qiziqishingizga mos keyingi qadamni toping.')} />

        <SearchBar
          key={query}
          value={query}
          onSearch={(q) => {
            setQuery(q);
            set('keyword', '');
          }}
          onToggleFilters={() => setFiltersOpen(true)}
          filtersOpen={filtersOpen}
        />

        {selected.length > 0 && (
          <div className={styles.selected}>
            {selected.map((s) => (
              <Chip key={s.key} label={s.label} removable onRemove={s.remove} />
            ))}
          </div>
        )}

        <div className={styles.summary}>
          <p>{tt('{count} ta imkoniyat topildi', { count: results.length })}</p>
          <p className={styles.sort}>{tt('Saralash: Muddat bo‘yicha')} ⌄</p>
        </div>

        {results.length > 0 ? (
          results.map((o) => <OpportunityCard key={o.id} item={o} />)
        ) : (
          <section className={styles.empty}>
            <span className={styles.emptyIcon} aria-hidden>
              <SearchIcon />
            </span>
            <h2 className={styles.emptyTitle}>{tt('Hozircha mos natija yo‘q')}</h2>
            <p className={styles.emptyText}>{tt('Filtrlarni kamaytiring yoki boshqa yo‘nalishni sinab ko‘ring.')}</p>
            <div className={styles.emptyActions}>
              <Button flush onClick={reset}>
                {tt('Barcha imkoniyatlar')}
              </Button>
              <Button flush variant="secondary" to="/challenges">
                {tt('Keyslarni ko‘rish')}
              </Button>
            </div>
          </section>
        )}
      </div>

      <FilterDrawer
        open={filtersOpen}
        filters={filters}
        count={results.length}
        onChange={(next) => {
          if (next.keyword !== filters.keyword) setQuery('');
          setFilters(next);
        }}
        onClose={() => setFiltersOpen(false)}
      />
    </StudentShell>
  );
}

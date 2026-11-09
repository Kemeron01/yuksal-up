import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Chip } from '@/components/ui/Chip';
import { SearchIcon } from '@/components/ui/Icons';
import { StudentShell } from '@/components/student/StudentShell';
import { PageHeading } from '@/components/student/PageHeading';
import { OpportunityCard } from '@/components/student/OpportunityCard';
import { FilterSidebar, EMPTY_FILTERS, type Filters } from '@/components/student/FilterSidebar';
import { SearchBar } from '@/components/student/SearchBar';
import { CategoryTabs, type CategoryFilter } from '@/components/student/CategoryTabs';
import { INTERESTS, OPPORTUNITIES, type Opportunity } from '@/data/opportunities';
import styles from './OpportunitiesPage.module.css';
import { useI18n } from '@/i18n';

function matches(o: Opportunity, query: string, category: CategoryFilter, f: Filters): boolean {
  if (category !== 'Barchasi' && o.category !== category) return false;
  if (f.interests.length && !f.interests.includes(o.interest)) return false;
  if (f.region !== 'Barcha hududlar' && o.region !== f.region) return false;
  if (f.format !== 'Barchasi' && o.format !== f.format) return false;
  if (query) {
    const hay = `${o.title} ${o.organization} ${o.category} ${o.interest} ${o.region}`.toLowerCase();
    if (!hay.includes(query.toLowerCase())) return false;
  }
  return true;
}

/** 01 · Catalog, 02 · Filtered results, 03 · No search results — one screen, three states. */
export function OpportunitiesPage() {
  const { tt } = useI18n();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('Barchasi');
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(
    () =>
      OPPORTUNITIES.filter((o) => matches(o, query, category, filters)).sort((a, b) => a.deadline.localeCompare(b.deadline)),
    [query, category, filters],
  );

  // active filters shown as removable chips (design: "Selected filters")
  const selected: { key: string; label: string; remove: () => void }[] = [
    ...filters.interests.map((name) => ({
      key: `i-${name}`,
      label: tt(name),
      remove: () => setFilters((f) => ({ ...f, interests: f.interests.filter((n) => n !== name) })),
    })),
    ...(filters.region !== 'Barcha hududlar'
      ? [{ key: 'region', label: tt(filters.region), remove: () => setFilters((f) => ({ ...f, region: 'Barcha hududlar' })) }]
      : []),
    ...(filters.format !== 'Barchasi'
      ? [{ key: 'format', label: tt(filters.format), remove: () => setFilters((f) => ({ ...f, format: 'Barchasi' })) }]
      : []),
  ];

  const reset = () => {
    setQuery('');
    setCategory('Barchasi');
    setFilters(EMPTY_FILTERS);
  };

  return (
    <StudentShell active="opportunities">
      <PageHeading title={tt('Imkoniyatlar')} text={tt('Qiziqishingizga mos keyingi qadamni toping.')} />

      <div className={styles.workspace}>
        <FilterSidebar
          filters={filters}
          onChange={setFilters}
          className={`${styles.sidebar} ${filtersOpen ? styles.sidebarOpen : ''}`}
        />

        <div className={styles.results}>
          <SearchBar
            key={query}
            value={query}
            onSearch={setQuery}
            onToggleFilters={() => setFiltersOpen((v) => !v)}
            filtersOpen={filtersOpen}
          />
          <CategoryTabs value={category} onChange={setCategory} />

          <div className={styles.summary}>
            <p>{tt('{count} ta imkoniyat topildi', { count: results.length })}</p>
            <p className={styles.sort}>{tt('Saralash: Muddat bo‘yicha')}</p>
          </div>

          {selected.length > 0 && (
            <div className={styles.selected}>
              {selected.map((s) => (
                <Chip key={s.key} label={s.label} removable onRemove={s.remove} />
              ))}
            </div>
          )}

          {results.length > 0 ? (
            results.map((o) => <OpportunityCard key={o.id} item={o} />)
          ) : (
            <>
              <section className={styles.empty}>
                <span className={styles.emptyIcon} aria-hidden>
                  <SearchIcon />
                </span>
                <h2 className={styles.emptyTitle}>{tt('Hozircha mos natija yo‘q')}</h2>
                <p className={styles.emptyText}>{tt('Filtrlarni kamaytiring yoki boshqa yo‘nalishni sinab ko‘ring.')}</p>
                <div className={styles.emptyActions}>
                  <button type="button" className={styles.primaryPill} onClick={reset}>
                    {tt('Barcha imkoniyatlar')}
                  </button>
                  <Link to="/challenges" className={styles.secondaryPill}>
                    {tt('Keyslarni ko‘rish')}
                  </Link>
                </div>
              </section>
              <section className={styles.suggestions}>
                <h2 className={styles.emptyTitle}>{tt('Boshqa yo‘nalishlarni sinab ko‘ring')}</h2>
                <p className={styles.suggestionsText}>{tt('Yangi qiziqish sizni kutilmagan imkoniyatga olib borishi mumkin.')}</p>
                <div className={styles.suggestionChips}>
                  {['Volontyorlik', 'Debatlar', 'Fan', 'Ijod'].map((name) => (
                    <Chip
                      key={name}
                      label={name}
                      onClick={() => {
                        setQuery('');
                        setFilters(INTERESTS.includes(name) ? { ...EMPTY_FILTERS, interests: [name] } : EMPTY_FILTERS);
                        setCategory(INTERESTS.includes(name) ? 'Barchasi' : (name as CategoryFilter));
                      }}
                    />
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </StudentShell>
  );
}


import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { StudentShell } from '@/components/student/StudentShell';
import { PageHeading } from '@/components/student/PageHeading';
import { OpportunityCard } from '@/components/student/OpportunityCard';
import { OPPORTUNITIES } from '@/data/opportunities';
import { useSaved } from '@/data/saved';
import styles from './SavedPage.module.css';
import { useI18n } from '@/i18n';

/** 06 · Saved programs, 07 · Saved empty. */
export function SavedPage() {
  const { tt } = useI18n();
  const { saved } = useSaved();
  const items = OPPORTUNITIES.filter((o) => saved.includes(o.id)).sort((a, b) => a.deadline.localeCompare(b.deadline));

  return (
    <StudentShell active="saved">
      <PageHeading title={tt('Saqlangan imkoniyatlar')} text={tt('Yaxshi imkoniyatni yo‘qotib qo‘ymang.')} status={tt('{count} ta saqlangan', { count: items.length })} />
      <div className={styles.list}>
        {items.length > 0 ? (
          items.map((o) => <OpportunityCard key={o.id} item={o} />)
        ) : (
          <section className={styles.empty}>
            <span className={styles.icon} aria-hidden>
              <Bookmark size="100%" color="var(--navy)" strokeWidth={1.7} />
            </span>
            <h2 className={styles.title}>{tt('Hali hech narsa saqlanmagan')}</h2>
            <p className={styles.text}>{tt('Imkoniyat kartasidagi belgi orqali saqlang.')}</p>
            <Link to="/opportunities" className={styles.pill}>
              {tt('Imkoniyatlarni topish')}
            </Link>
          </section>
        )}
      </div>
    </StudentShell>
  );
}

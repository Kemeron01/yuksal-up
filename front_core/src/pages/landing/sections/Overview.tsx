import { ArrowIcon } from '@/components/ui/Icons';
import { StatCard } from '@/components/cards/StatCard';
import { useI18n } from '@/i18n';
import shared from './sections.module.css';
import styles from './Overview.module.css';

const VALUES = ['4', '3', '1'];

export function Overview() {
  const { t } = useI18n();

  return (
    <section className={`${shared.section} ${styles.overview}`}>
      <div className={styles.mark} aria-hidden>
        <span className={styles.arrow}>
          <ArrowIcon color="var(--yellow)" />
        </span>
      </div>
      <h2 className={styles.title}>{t.overview.title}</h2>
      <ul className={styles.facts}>
        {t.overview.facts.map((label, i) => (
          <StatCard key={VALUES[i]} value={VALUES[i]} label={label} />
        ))}
      </ul>
    </section>
  );
}

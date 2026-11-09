import { Button } from '@/components/ui/Button';
import { ArrowIcon, CalendarIcon, GlobeIcon } from '@/components/ui/Icons';
import { NumberBadge } from '@/components/ui/NumberBadge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useI18n } from '@/i18n';
import shared from './sections.module.css';
import styles from './Benefits.module.css';

export function Benefits() {
  const { t } = useI18n();
  const b = t.benefits;

  return (
    <section className={`${shared.section} ${styles.benefits}`} id="opportunities">
      <SectionHeading eyebrow={b.eyebrow} title={b.title} />

      <div className={styles.grid}>
        <article className={`${styles.card} ${styles.discover}`}>
          <NumberBadge>01</NumberBadge>
          <h3 className={styles.discoverTitle}>{b.discover.title}</h3>
          <p className={styles.discoverText}>{b.discover.text}</p>
          <div className={styles.growth} aria-hidden>
            <span className={styles.growthArrow}>
              <ArrowIcon />
            </span>
          </div>
          <Button to="/opportunities" variant="outline" wide slot={[270, 270]}>
            {b.discover.cta}
          </Button>
        </article>

        <div className={styles.more}>
          <article className={`${styles.card} ${styles.interests}`}>
            <div className={styles.interestsCopy}>
              <NumberBadge>02</NumberBadge>
              <h3 className={styles.interestsTitle}>{b.interests.title}</h3>
              <p className={styles.text}>{b.interests.text}</p>
            </div>
            <span className={styles.globe} aria-hidden>
              <span className={styles.globeIcon}>
                <GlobeIcon />
              </span>
            </span>
          </article>

          <div className={styles.pair}>
            <article className={`${styles.card} ${styles.small}`}>
              <NumberBadge>03</NumberBadge>
              <h3 className={styles.smallTitle}>{b.dates.title}</h3>
              <p className={styles.text}>{b.dates.text}</p>
              <span className={styles.calendar} aria-hidden>
                <CalendarIcon />
              </span>
            </article>

            <article className={`${styles.card} ${styles.small}`} id="challenges">
              <NumberBadge>04</NumberBadge>
              <h3 className={styles.smallTitle}>{b.practice.title}</h3>
              <p className={styles.text}>{b.practice.text}</p>
              <Button to="/challenges" variant="outline" wide slot={[276, 298]}>
                {b.practice.cta}
              </Button>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Button } from '@/components/ui/Button';
import { AwardIcon, BriefcaseIcon, DebateIcon, HeartIcon } from '@/components/ui/Icons';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TopicCard } from '@/components/cards/TopicCard';
import { useI18n } from '@/i18n';
import shared from './sections.module.css';
import styles from './Directions.module.css';

export function Directions() {
  const { t } = useI18n();
  const d = t.directions;
  const icons = [<BriefcaseIcon />, <HeartIcon />, <DebateIcon />, <AwardIcon />];

  return (
    <section className={`${shared.section} ${styles.directions}`}>
      <SectionHeading title={d.title} />
      <p className={styles.subtitle}>{d.subtitle}</p>
      <ul className={styles.grid}>
        {d.items.map((item, i) => (
          <TopicCard key={i} icon={icons[i]} title={item.title} text={item.text} cta={d.explore} href="/opportunities" />
        ))}
      </ul>
      <div className={styles.all}>
        <Button to="/opportunities" variant="outline" wide>
          {d.all}
        </Button>
      </div>
    </section>
  );
}

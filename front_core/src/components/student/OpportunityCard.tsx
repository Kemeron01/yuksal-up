import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { ArrowIcon, BookmarkFilledIcon, BookmarkIcon, BuildingIcon, CalendarSmallIcon } from '@/components/ui/Icons';
import { formatDeadline, type Opportunity } from '@/data/opportunities';
import { useRequireLogin } from '@/components/useRequireLogin';
import { useSaved } from '@/data/saved';
import styles from './OpportunityCard.module.css';
import { useI18n } from '@/i18n';

/** Rounded opportunity card: applications are made on the organizer's site, not inside YuksalUp. */
export function OpportunityCard({ item }: { item: Opportunity }) {
  const { tt } = useI18n();
  const { isSaved, toggle } = useSaved();
  const saved = isSaved(item.id);
  const requireLogin = useRequireLogin();

  return (
    <article className={styles.card}>
      <div className={styles.heading}>
        <span className={styles.badge} aria-hidden>
          <span className={styles.icon}>
            <BuildingIcon />
          </span>
        </span>
        <div className={styles.titles}>
          <h2 className={styles.title}>
            <Link to={`/opportunities/${item.id}`}>{tt(item.title)}</Link>
          </h2>
          <p className={styles.org}>{item.organization}</p>
        </div>
        <button
          type="button"
          className={styles.bookmark}
          onClick={() => requireLogin(() => toggle(item.id))}
          aria-pressed={saved}
          aria-label={saved ? tt('Saqlanganlardan olib tashlash') : tt('Saqlash')}
        >
          <span className={styles.icon}>{saved ? <BookmarkFilledIcon /> : <BookmarkIcon />}</span>
        </button>
      </div>

      <p className={styles.facts}>
        <span>{tt(item.region)}</span>
        <span>{tt(item.category)}</span>
        <span>{tt(item.format)}</span>
        <span className={styles.price}>{tt(item.price)}</span>
      </p>

      <div className={styles.tags}>
        <Chip label={tt(item.interest)} asStatic />
        <Chip label={tt(item.grades)} asStatic />
      </div>

      <div className={styles.deadline}>
        <span className={styles.icon} aria-hidden>
          <CalendarSmallIcon />
        </span>
        <p>{tt('Ariza muddati')}: {formatDeadline(item.deadline, tt)}</p>
      </div>

      <div className={styles.actions}>
        <Button to={`/opportunities/${item.id}`} variant="primary" slot={[192, 192]}>
          {tt('Batafsil tanishish')}
        </Button>
      </div>

      <div className={styles.external}>
        <span className={styles.icon} aria-hidden>
          <ArrowIcon color="var(--muted)" />
        </span>
        <p>{tt('Ariza tashkilotchi saytida topshiriladi.')}</p>
      </div>
    </article>
  );
}

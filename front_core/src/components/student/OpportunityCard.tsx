import { Link } from 'react-router-dom';
import { Button as UiButton } from '@/components/shadcn/button';
import { Button } from '@/components/ui/Button';
import { ArrowIcon, BookmarkFilledIcon, BookmarkIcon, BuildingIcon, CalendarSmallIcon } from '@/components/ui/Icons';
import { formatShortDate, type Opportunity } from '@/data/opportunities';
import { useRequireLogin } from '@/components/useRequireLogin';
import { useSaved } from '@/data/saved';
import styles from './OpportunityCard.module.css';
import { useI18n } from '@/i18n';

/** Opportunity card: applications are made on the organizer's site, not inside YuksalUp. */
export function OpportunityCard({ item }: { item: Opportunity }) {
  const { tt } = useI18n();
  const { isSaved, toggle } = useSaved();
  const saved = isSaved(item.id);
  const requireLogin = useRequireLogin();
  const free = item.price === 'Bepul';

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
        <UiButton variant="unstyled"
          className={styles.bookmark}
          onClick={() => requireLogin(() => toggle(item.id))}
          aria-pressed={saved}
          aria-label={saved ? tt('Saqlanganlardan olib tashlash') : tt('Saqlash')}
        >
          <span className={styles.icon}>{saved ? <BookmarkFilledIcon /> : <BookmarkIcon />}</span>
        </UiButton>
      </div>

      <ul className={styles.meta}>
        <li>{tt(item.region)}</li>
        <li>{tt(item.category)}</li>
        <li>{tt(item.format)}</li>
        <li>{free ? tt('Bepul ishtirok') : tt(item.price)}</li>
      </ul>

      <ul className={styles.tags}>
        <li>{tt(item.interest)}</li>
        <li>{tt(item.grades)}</li>
      </ul>

      <div className={styles.footer}>
        <Button to={`/opportunities/${item.id}`} variant="primary" className={styles.cta}>
          {tt('Batafsil ma’lumot')}
        </Button>
        <div className={styles.deadline}>
          <span className={styles.icon} aria-hidden>
            <CalendarSmallIcon />
          </span>
          <p>
            <span className={styles.deadlineLabel}>{tt('Ariza topshirish muddati')}</span>
            <span className={styles.deadlineDate}>{formatShortDate(item.deadline, tt)}</span>
          </p>
        </div>
      </div>

      <div className={styles.external}>
        <span className={styles.iconSmall} aria-hidden>
          <ArrowIcon color="var(--muted)" />
        </span>
        <p>{tt('Ariza tashkilotchi saytida topshiriladi.')}</p>
      </div>
    </article>
  );
}

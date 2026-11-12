import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import styles from './ChallengeParts.module.css';
import { useI18n } from '@/i18n';
import { localizeDate } from '@/data/opportunities';

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  const { tt } = useI18n();
  return (
    <nav className={styles.crumbs} aria-label={tt('Breadcrumbs')}>
      {items.map((item, i) => (
        <span key={item.label} className={styles.crumb}>
          {i > 0 && <span aria-hidden>›{'\u00a0'}</span>}
          {item.to ? <Link to={item.to}>{tt(item.label)}</Link> : tt(item.label)}
        </span>
      ))}
    </nav>
  );
}

/** Left sidebar with three numbered steps; `current` is highlighted in yellow. */
export function ChallengeSteps({ current, title, footer }: { current: 1 | 2 | 3; title: string; footer: ReactNode }) {
  const { tt } = useI18n();
  const steps = ['Vazifani o‘qing', 'Yechim yuboring', 'Fikr-mulohaza oling'];
  return (
    <aside className={styles.steps}>
      <p className={styles.stepsTitle}>{title.toUpperCase()}</p>
      <ol className={styles.stepList}>
        {steps.map((label, i) => {
          const n = i + 1;
          const active = n === current;
          return (
            <li key={label} className={styles.step} aria-current={active ? 'step' : undefined}>
              <span className={`${styles.number} ${active ? styles.numberActive : ''} ${n < current ? styles.numberDone : ''}`}>
                {n < current ? '✓' : n}
              </span>
              <span className={styles.stepText}>
                <span className={`${styles.stepLabel} ${active ? styles.stepLabelActive : ''}`}>{tt(label)}</span>
                <span className={styles.stepState}>{n < current ? tt('Bajarildi') : active ? tt('Hozirgi bosqich') : tt('Keyingi bosqich')}</span>
              </span>
            </li>
          );
        })}
      </ol>
      <div className={styles.stepsFooter}>{footer}</div>
    </aside>
  );
}

/** "Keys haqida" panel with deadline, duration and format; children render extra rows or actions. */
export function ChallengeFacts({
  deadline,
  duration,
  format,
  children,
}: {
  deadline: [string, string];
  duration: string;
  format: string;
  children?: ReactNode;
}) {
  const { tt } = useI18n();
  return (
    <aside className={styles.facts}>
      <h2 className={styles.factsTitle}>{tt('Keys haqida')}</h2>
      <dl className={styles.factList}>
        <div>
          <dt>{tt('Oxirgi muddat')}</dt>
          <dd>
            {localizeDate(deadline[0], tt)}
            <br />
            {deadline[1]}
          </dd>
        </div>
        <div>
          <dt>{tt('Taxminiy vaqt')}</dt>
          <dd>{tt(duration)}</dd>
        </div>
        <div>
          <dt>{tt('Format')}</dt>
          <dd>{tt(format)}</dd>
        </div>
      </dl>
      {children}
    </aside>
  );
}

export function PillLink({ to, variant = 'secondary', children }: { to: string; variant?: 'primary' | 'secondary'; children: ReactNode }) {
  return (
    <Button flush to={to} variant={variant}>
      {children}
    </Button>
  );
}

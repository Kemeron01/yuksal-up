import { Link, useParams } from 'react-router-dom';
import { Chip } from '@/components/ui/Chip';
import { StudentShell } from '@/components/student/StudentShell';
import { Breadcrumbs, ChallengeFacts, PillLink } from '@/components/student/ChallengeParts';
import { findChallenge } from '@/data/challenges';
import styles from './ChallengeBriefPage.module.css';
import { useI18n } from '@/i18n';

/** 09 · Challenge brief. */
export function ChallengeBriefPage() {
  const { tt } = useI18n();
  const { id } = useParams();
  const challenge = findChallenge(id);

  if (!challenge) {
    return (
      <StudentShell active="challenges">
        <Breadcrumbs items={[{ label: tt('Keyslar'), to: '/challenges' }]} />
        <h1 className={styles.title}>{tt('Keys topilmadi')}</h1>
        <Link to="/challenges">{tt('Barcha keyslar')}</Link>
      </StudentShell>
    );
  }

  return (
    <StudentShell active="challenges">
      <Breadcrumbs items={[{ label: tt('Keyslar'), to: '/challenges' }, { label: tt('Vazifa') }]} />

      <div className={styles.brief}>
        <article className={styles.article}>
          <div className={styles.heading}>
            <h1 className={styles.title}>{tt(challenge.title)}</h1>
            <p className={styles.lead}>{tt('YuksalUp amaliy keysi')}</p>
          </div>

          <section className={styles.section}>
            <h2 className={styles.h2}>{tt('Vaziyat')}</h2>
            <p className={styles.text}>{tt(challenge.situation)}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>{tt('Sizning vazifangiz')}</h2>
            <ol className={styles.tasks}>
              {challenge.tasks.map((t, i) => (
                <li key={t}>
                  {i + 1}. {tt(t)}
                </li>
              ))}
            </ol>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>{tt('Baholash mezonlari')}</h2>
            <div className={styles.chips}>
              {challenge.criteria.map((c) => (
                <Chip key={c} label={tt(c)} asStatic />
              ))}
            </div>
            <p className={styles.text}>{tt('Yechimingizni admin o‘qiydi va yozma fikr-mulohaza qoldiradi.')}</p>
          </section>
        </article>

        <ChallengeFacts deadline={challenge.deadline} duration={challenge.duration} format={challenge.format}>
          <PillLink to={`/challenges/${challenge.id}/submit`} variant="primary">
            {tt('Yechim yuborish')}
          </PillLink>
        </ChallengeFacts>
      </div>
    </StudentShell>
  );
}

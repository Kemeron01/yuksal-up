import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/data/auth';
import { Chip } from '@/components/ui/Chip';
import { BookOpenIcon } from '@/components/ui/Icons';
import { Status } from '@/components/ui/Status';
import { StudentShell } from '@/components/student/StudentShell';
import { PageHeading } from '@/components/student/PageHeading';
import { ChallengeSteps } from '@/components/student/ChallengeParts';
import { CHALLENGES, useSubmissions, type Challenge } from '@/data/challenges';
import styles from './ChallengesPage.module.css';
import { useI18n } from '@/i18n';
import { localizeDate } from '@/data/opportunities';

function ChallengeCard({ item, status }: { item: Challenge; status?: 'submitted' | 'reviewed' }) {
  const { tt } = useI18n();
  return (
    <article className={styles.card}>
      <div className={styles.heading}>
        <span className={styles.badge} aria-hidden>
          <span className={styles.icon}>
            <BookOpenIcon />
          </span>
        </span>
        <div className={styles.titles}>
          <h2 className={styles.title}>{tt(item.title)}</h2>
          <p className={styles.author}>{tt(item.author)}</p>
        </div>
      </div>

      <div>
        {status === 'reviewed' ? (
          <Status state="reviewed" label={tt('Ko‘rib chiqilgan')} compact />
        ) : status === 'submitted' ? (
          <Status state="submitted" label={tt('Ko‘rib chiqish kutilmoqda')} compact />
        ) : (
          <Status state="open" label={tt('Qabul ochiq')} compact />
        )}
      </div>

      <p className={styles.summary}>{tt(item.summary)}</p>

      <div className={styles.tags}>
        {item.subjects.map((s) => (
          <Chip key={s} label={s} asStatic />
        ))}
      </div>

      <p className={styles.timing}>
        <span>{tt(item.duration)}</span>
        <span>{localizeDate(item.deadlineLine, tt)}</span>
      </p>

      <div className={styles.actions}>
        <Link className={styles.open} to={status ? `/challenges/${item.id}/solution` : `/challenges/${item.id}`}>
          {status ? tt('Yechimni ko‘rish') : tt('Keysni ochish')}
        </Link>
      </div>

      <p className={styles.note}>{tt('Yechimingiz YuksalUp ichida yuboriladi va admin tomonidan ko‘rib chiqiladi.')}</p>
    </article>
  );
}

/** 08 · Challenge catalog (tabs: all challenges / my solutions). */
export function ChallengesPage() {
  const { tt } = useI18n();
  const [tab, setTab] = useState<'all' | 'mine'>('all');
  const { user } = useAuth();
  const { mine: mineOf } = useSubmissions();
  const mine = CHALLENGES.filter((c) => mineOf(c.id));

  return (
    <StudentShell active="challenges">
      <PageHeading
        title={tt('Keyslar')}
        text={tt('Real vaziyatlar. Sizning g‘oyalaringiz. Yangi tajriba.')}
        status={tt('Yeching va rivojlaning')}
      />

      <div className={styles.tabs} role="tablist" aria-label={tt('Keyslar')}>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'all'}
          className={`${styles.tab} ${tab === 'all' ? styles.tabActive : ''}`}
          onClick={() => setTab('all')}
        >
          {tt('Barcha keyslar')}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'mine'}
          className={`${styles.tab} ${tab === 'mine' ? styles.tabActive : ''}`}
          onClick={() => setTab('mine')}
        >
          {tt('Mening yechimlarim')}
        </button>
      </div>

      <div className={styles.catalog}>
        <ChallengeSteps
          current={1}
          title={tt('Qanday ishlaydi?')}
          footer={tt("Yechimlar YuksalUp ichida yuboriladi va admin tomonidan ko‘rib chiqiladi.")}
        />
        <div className={styles.list}>
          {tab === 'all' &&
            CHALLENGES.map((c) => <ChallengeCard key={c.id} item={c} status={mineOf(c.id)?.status} />)}
          {tab === 'mine' &&
            (mine.length > 0 ? (
              mine.map((c) => <ChallengeCard key={c.id} item={c} status={mineOf(c.id)?.status} />)
            ) : (
              <section className={styles.empty}>
                <h2 className={styles.title}>{user ? tt('Hali yechim yuborilmagan') : tt('Yechimlaringizni ko‘rish uchun kiring')}</h2>
                <p className={styles.summary}>
                  {user ? tt('Keysni oching, yechimingizni yozing va yuboring.') : tt('Yechim yuborish va admin fikrini olish uchun akkauntingizga kiring.')}
                </p>
                {!user && (
                  <Link to="/login" state={{ from: '/challenges' }} className={styles.open}>
                    {tt('Kirish')}
                  </Link>
                )}
              </section>
            ))}
        </div>
      </div>
    </StudentShell>
  );
}

import { Navigate, useParams } from 'react-router-dom';
import { CheckSquareIcon, FileTextIcon } from '@/components/ui/Icons';
import { Status } from '@/components/ui/Status';
import { StudentShell } from '@/components/student/StudentShell';
import { Breadcrumbs, ChallengeFacts, PillLink } from '@/components/student/ChallengeParts';
import { DEMO_SUBMISSION, findChallenge, useSubmissions } from '@/data/challenges';
import styles from './ChallengeSolutionPage.module.css';
import { useI18n } from '@/i18n';
import { localizeDate } from '@/data/opportunities';

/** 11 · Submitted receipt and 12 · Reviewed solution. `demo` renders the reviewed design state without storage. */
export function ChallengeSolutionPage({ demo = false }: { demo?: boolean }) {
  const { tt } = useI18n();
  const { id } = useParams();
  const challenge = findChallenge(id);
  const { mine } = useSubmissions();
  const submission = demo ? DEMO_SUBMISSION : id ? mine(id) : undefined;

  if (!challenge) return <Navigate to="/challenges" replace />;
  if (!submission) return <Navigate to={`/challenges/${challenge.id}`} replace />;

  const reviewed = submission.status === 'reviewed';

  return (
    <StudentShell active="challenges">
      <Breadcrumbs
        items={[
          { label: tt('Keyslar'), to: '/challenges' },
          { label: tt(challenge.title), to: `/challenges/${challenge.id}` },
          { label: tt('Mening yechimim') },
        ]}
      />

      <div className={styles.layout}>
        <div className={styles.work}>
          <section className={styles.receipt}>
            <span className={styles.icon} aria-hidden>
              {reviewed ? <FileTextIcon /> : <CheckSquareIcon />}
            </span>
            <Status
              state={reviewed ? 'reviewed' : 'submitted'}
              label={reviewed ? tt('Ko‘rib chiqilgan') : tt('Ko‘rib chiqish kutilmoqda')}
              compact
            />
            <h1 className={styles.title}>{reviewed ? 'Fikr-mulohazangiz tayyor' : 'Yechimingiz yuborildi'}</h1>
            <p className={styles.challenge}>{tt(challenge.title)}</p>
            <p className={styles.meta}>{localizeDate(submission.submittedAt, tt)}</p>
            <p className={styles.lead}>
              {reviewed
                ? tt('Admin yozma fikr-mulohazasi quyida. Uni o‘qing va keyingi topshiriqda qo‘llang.')
                : tt('Admin fikr-mulohazasi ko‘rib chiqilgandan keyin shu yerda paydo bo‘ladi.')}
            </p>
          </section>

          <section className={styles.card}>
            <h2 className={styles.h2}>{tt('Yuborilgan yechim')}</h2>
            <p className={styles.solution}>{tt(submission.text)}</p>
            {submission.fileName && (
              <div className={styles.attachment}>
                <span className={styles.fileIcon} aria-hidden>
                  <FileTextIcon />
                </span>
                <p>{submission.fileName}</p>
              </div>
            )}
          </section>

          {reviewed && submission.feedback && (
            <section className={styles.card}>
              <div className={styles.feedbackHeading}>
                <span className={styles.symbol} aria-hidden>
                  <span className={styles.fileIcon}>
                    <CheckSquareIcon />
                  </span>
                </span>
                <div className={styles.identity}>
                  <h2 className={styles.h2}>{tt('Admin fikri')}</h2>
                  <p className={styles.meta}>{tt('YuksalUp administratori')}</p>
                </div>
                <Status state="reviewed" label={tt(tt('Ko‘rib chiqilgan'))} compact />
              </div>
              <p className={styles.feedback}>{tt(submission.feedback.text)}</p>
              <p className={styles.small}>{localizeDate(submission.feedback.at, tt)}</p>
            </section>
          )}

          <div>
            <PillLink to="/challenges">{tt('Barcha keyslar')}</PillLink>
          </div>
        </div>

        <ChallengeFacts deadline={challenge.deadline} duration={challenge.duration} format={challenge.format}>
          <div>
            <Status
              state={reviewed ? 'reviewed' : 'submitted'}
              label={reviewed ? tt('Ko‘rib chiqilgan') : tt('Yuborilgan')}
              compact
            />
          </div>
        </ChallengeFacts>
      </div>
    </StudentShell>
  );
}

import { Navigate, useParams } from 'react-router-dom';
import { CheckSquareIcon, FileTextIcon } from '@/components/ui/Icons';
import { XIcon } from 'lucide-react';
import { Status } from '@/components/ui/Status';
import { StudentShell } from '@/components/student/StudentShell';
import { Breadcrumbs, ChallengeFacts, PillLink } from '@/components/student/ChallengeParts';
import { DEMO_SUBMISSION, findChallenge, useSubmissions } from '@/data/challenges';
import styles from './ChallengeSolutionPage.module.css';
import { useI18n } from '@/i18n';
import { localizeDate } from '@/data/opportunities';

/** 12 · Submission pending, 13 · accepted, 14 · rejected. `demo` renders the accepted design state without storage. */
export function ChallengeSolutionPage({ demo = false }: { demo?: boolean }) {
  const { tt } = useI18n();
  const { id } = useParams();
  const challenge = findChallenge(id);
  const { mine } = useSubmissions();
  const submission = demo ? DEMO_SUBMISSION : id ? mine(id) : undefined;

  if (!challenge) return <Navigate to="/challenges" replace />;
  if (!submission) return <Navigate to={`/challenges/${challenge.id}`} replace />;

  const state = submission.status;
  const decided = state === 'accepted' || state === 'rejected';
  const title =
    state === 'accepted' ? tt('Yechimingiz qabul qilindi') : state === 'rejected' ? tt('Yechimingiz rad etildi') : tt('Yechimingiz yuborildi');
  const lead = decided
    ? tt('Quyida admin fikr-mulohazasini o‘qing.')
    : tt('Admin fikr-mulohazasi ko‘rib chiqilgandan keyin shu yerda paydo bo‘ladi.');

  return (
    <StudentShell active="challenges">
      <Breadcrumbs items={[{ label: tt('Keyslar'), to: '/challenges' }, { label: tt('Mening yechimim') }]} />

      <div className={styles.layout}>
        <div className={styles.work}>
          <article className={styles.result}>
            <section className={styles.receipt}>
              <span className={styles.icon} aria-hidden>
                {state === 'rejected' ? <XIcon /> : <CheckSquareIcon />}
              </span>
              <Status state={state} compact />
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.challenge}>{tt(challenge.title)}</p>
              <p className={styles.meta}>{localizeDate(submission.submittedAt, tt)}</p>
              <p className={styles.lead}>{lead}</p>
            </section>

            <section className={styles.details}>
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
              {decided && submission.feedback && (
                <>
                  <h2 className={styles.h2}>{tt('Admin fikri')}</h2>
                  <p className={styles.feedback}>{tt(submission.feedback.text)}</p>
                  <p className={styles.small}>{localizeDate(submission.feedback.at, tt)}</p>
                </>
              )}
            </section>
          </article>

          <div>
            <PillLink to="/challenges">{tt('Barcha keyslar')}</PillLink>
          </div>
        </div>

        <ChallengeFacts deadline={challenge.deadline} duration={challenge.duration} format={challenge.format}>
          <div>
            <Status state={state} compact />
          </div>
        </ChallengeFacts>
      </div>
    </StudentShell>
  );
}

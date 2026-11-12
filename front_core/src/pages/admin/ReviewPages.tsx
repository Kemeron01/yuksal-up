import { useState, type FormEvent } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { AdminShell } from '@/components/admin/AdminShell';
import { AdminHeading } from '@/components/admin/AdminParts';
import { TextareaField } from '@/components/admin/EditorParts';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Chip } from '@/components/ui/Chip';
import { CheckSquareIcon, FileTextIcon } from '@/components/ui/Icons';
import { useAuth } from '@/data/auth';
import { Status } from '@/components/ui/Status';
import { findChallenge, useSubmissions, type Submission } from '@/data/challenges';
import styles from './ReviewPages.module.css';
import { useI18n } from '@/i18n';
import { localizeDate } from '@/data/opportunities';

type Filter = 'all' | 'submitted' | 'accepted' | 'rejected';

const reviewPath = (s: Submission) => `/admin/reviews/${encodeURIComponent(s.studentEmail)}/${s.challengeId}`;

/** 10 · Review queue — every solution students have submitted. */
export function ReviewQueuePage() {
  const { tt } = useI18n();
  const { all } = useSubmissions();
  const { accounts } = useAuth();
  const [filter, setFilter] = useState<Filter>('all');
  const items = [...all]
    .sort((a, b) => b.submittedDate.localeCompare(a.submittedDate))
    .filter((s) => filter === 'all' || s.status === filter);

  return (
    <AdminShell active="reviews">
      <AdminHeading eyebrow={tt('O‘QUVCHILAR ISHLARI')} title={tt('Tekshiruv navbati')} text={tt('Har bir ishga aniq va foydali fikr bildiring.')} />
      <div className={styles.filters}>
        {(
          [
            ['all', tt('Barchasi')],
            ['submitted', tt('Kutilmoqda')],
            ['accepted', tt('Qabul qilingan')],
            ['rejected', tt('Rad etilgan')],
          ] as [Filter, string][]
        ).map(([key, label]) => (
          <Chip key={key} label={label} selected={filter === key} onClick={() => setFilter(key)} />
        ))}
      </div>
      {items.length === 0 && <p className={styles.muted}>{tt('Bu holatda ish yo‘q.')}</p>}
      {items.map((s) => (
        <section key={`${s.studentEmail}|${s.challengeId}`} className={styles.card}>
          <div className={styles.row}>
            <Status state={s.status} compact />
            {accounts.find((a) => a.email === s.studentEmail)?.sample && <span className={styles.sample}>{tt('Namuna ish')}</span>}
          </div>
          <h2 className={styles.h2}>{tt(findChallenge(s.challengeId)?.title ?? s.challengeId)}</h2>
          <p className={styles.muted}>
            {s.studentName} · {s.submittedDate}
          </p>
          <p className={styles.body}>{s.fileName ? tt('Matnli javob va {file}', { file: s.fileName }) : tt('Matnli javob')}</p>
          <Button variant="primary" to={reviewPath(s)} slot={[240, '100%']}>
            {s.status !== 'submitted' ? tt('Fikrni ko‘rish →') : tt('Ishni tekshirish →')}
          </Button>
        </section>
      ))}
    </AdminShell>
  );
}

/** 11 · Review solution (feedback form) and 12 · Feedback published (`published`). */
export function ReviewSolutionPage({ published = false }: { published?: boolean }) {
  const { tt } = useI18n();
  const { email, challengeId } = useParams();
  const navigate = useNavigate();
  const { find, review } = useSubmissions();
  const { accounts } = useAuth();
  const submission = email && challengeId ? find(email, challengeId) : undefined;
  const [text, setText] = useState(submission?.feedback?.text ?? '');
  const [error, setError] = useState<string | null>(null);

  if (!submission) return <Navigate to="/admin/reviews" replace />;

  const challenge = findChallenge(submission.challengeId);
  const reviewed = submission.status !== 'submitted';
  const [decision, setDecision] = useState<'accepted' | 'rejected'>(submission.status === 'rejected' ? 'rejected' : 'accepted');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim().length < 10) return setError(tt('Kamida 10 belgi yozing.'));
    setError(null);
    review(submission.studentEmail, submission.challengeId, text.trim(), decision);
    navigate(`${reviewPath(submission)}/published`, { replace: true });
  };

  return (
    <AdminShell active="reviews">
      <Link to="/admin/reviews" className={styles.back}>
        {tt('← Navbatga qaytish')}
      </Link>
      <AdminHeading
        eyebrow={tt('ISHNI TEKSHIRISH')}
        title={tt(challenge?.title ?? submission.challengeId)}
        text={`${submission.studentName} · ${submission.submittedDate}`}
      />
      <div>
        <Status state={submission.status} compact />
      </div>

      {published && reviewed && (
        <section className={styles.confirm} role="status">
          <span className={styles.iconLarge} aria-hidden>
            <CheckSquareIcon />
          </span>
          <h2 className={styles.h2Confirm}>{tt('Fikr e’lon qilindi')}</h2>
          <p className={styles.body}>{tt('Fikr-mulohaza o‘quvchining topshirilgan ishida ko‘rinadi.')}</p>
        </section>
      )}

      <section className={styles.card}>
        <h2 className={styles.h2Large}>{tt('O‘quvchining javobi')}</h2>
        <p className={styles.bodyLarge}>{tt(submission.text)}</p>
        {submission.fileName && (
          <div className={styles.attachment}>
            <span className={styles.icon} aria-hidden>
              <FileTextIcon />
            </span>
            <p className={styles.strong}>{submission.fileName}</p>
            <p className={styles.caption}>{tt('Biriktirilgan PDF')}{accounts.find((a) => a.email === submission.studentEmail)?.sample ? ` · ${tt('Namuna ish')}` : ''}</p>
          </div>
        )}
      </section>

      <form className={styles.card} onSubmit={submit} noValidate>
        <h2 className={styles.h2Large}>{tt('Fikringiz')}</h2>
        <p className={styles.muted}>{tt('Nima yaxshi chiqqani va keyingi qadamni ayting. Fikr o‘quvchiga ko‘rinadi.')}</p>
        <div className={styles.decision}>
          <label className={styles.decisionLabel} htmlFor="review-decision">
            {tt('Qaror')}
          </label>
          <Select
            id="review-decision"
            value={decision}
            options={[
              { value: 'accepted', label: tt('Qabul qilish') },
              { value: 'rejected', label: tt('Rad etish') },
            ]}
            onChange={(v) => setDecision(v as 'accepted' | 'rejected')}
          />
        </div>
        <TextareaField
          label={tt('Fikr-mulohaza (majburiy)')}
          minHeight={170}
          placeholder={tt('Aniq, foydali fikr yozing…')}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <p className={styles.caption}>{tt('Kamida 10 belgi.')}</p>
        {reviewed && submission.feedback && <p className={styles.caption}>Admin · {localizeDate(submission.feedback.at, tt)}</p>}
        {error && <p className={styles.errorText}>{error}</p>}
        <div className={styles.actions}>
          <Button variant="primary" type="submit" slot={[168, '100%']}>
            {reviewed ? tt('Fikrni yangilash') : tt('Fikrni yuborish')}
          </Button>
          <Button variant="secondary" onClick={() => navigate('/admin/reviews')} slot={[140, '100%']}>
            {tt('Bekor qilish')}
          </Button>
        </div>
      </form>
    </AdminShell>
  );
}

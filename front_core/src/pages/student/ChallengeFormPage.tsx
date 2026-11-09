import { useRef, useState, type FormEvent } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { FileTextIcon } from '@/components/ui/Icons';
import { StudentShell } from '@/components/student/StudentShell';
import { Breadcrumbs, ChallengeSteps } from '@/components/student/ChallengeParts';
import { findChallenge, useSubmissions } from '@/data/challenges';
import styles from './ChallengeFormPage.module.css';
import { useI18n } from '@/i18n';
import { localizeDate } from '@/data/opportunities';

const MAX_LENGTH = 6000;
const MAX_PDF = 10 * 1024 * 1024;

/** 10 · Solution form. */
export function ChallengeFormPage() {
  const { tt } = useI18n();
  const { id } = useParams();
  const challenge = findChallenge(id);
  const navigate = useNavigate();
  const { submit } = useSubmissions();
  const [text, setText] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [draftSaved, setDraftSaved] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  if (!challenge) return <Navigate to="/challenges" replace />;

  const onFile = (f: File | undefined) => {
    if (!f) return;
    if (f.type !== 'application/pdf') {
      setError(tt('Faqat PDF fayl yuklash mumkin.'));
      return;
    }
    if (f.size > MAX_PDF) {
      setError(tt('Fayl hajmi 10 MB dan oshmasligi kerak.'));
      return;
    }
    setError(null);
    setFile(f);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return setError(tt('Taklifingizni yozing.'));
    if (!confirmed) return setError(tt('Yechim o‘zingizniki ekanini tasdiqlang.'));
    setError(null);
    submit(challenge.id, text.trim(), file?.name);
    navigate(`/challenges/${challenge.id}/solution`);
  };

  return (
    <StudentShell active="challenges">
      <Breadcrumbs items={[{ label: tt(challenge.title), to: `/challenges/${challenge.id}` }, { label: tt('Yechim yuborish') }]} />

      <div className={styles.workspace}>
        <ChallengeSteps
          current={2}
          title={tt('Yechimingiz')}
          footer={
            <>
              {localizeDate(challenge.deadline[0], tt)}
              <br />
              {challenge.deadline[1]}
            </>
          }
        />

        <form className={styles.form} onSubmit={onSubmit} noValidate>
          <div className={styles.heading}>
            <h1 className={styles.title}>{tt('Sizning yechimingiz')}</h1>
            <p className={styles.lead}>{tt(challenge.title)}</p>
          </div>

          <div className={styles.info}>
            <p>{tt('Muammo, uchta taklif va natijani o‘lchash usulini yozing.')}</p>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="solution-text">
              {tt('Taklifingizni tushuntiring *')}
            </label>
            <textarea
              id="solution-text"
              className={styles.textarea}
              placeholder={tt('Mening taklifim…')}
              maxLength={MAX_LENGTH}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <p className={styles.help}>{tt('O‘z fikrlaringizni aniq va tushunarli ifodalang. {max} belgigacha.', { max: MAX_LENGTH })}</p>
          </div>

          <div className={styles.field}>
            <p className={styles.label}>{tt('Qo‘shimcha PDF · ixtiyoriy')}</p>
            <div className={styles.upload}>
              <span className={styles.uploadIcon} aria-hidden>
                <FileTextIcon />
              </span>
              <input
                ref={fileInput}
                type="file"
                accept="application/pdf"
                hidden
                onChange={(e) => onFile(e.target.files?.[0])}
              />
              <Button variant="secondary" onClick={() => fileInput.current?.click()} className={styles.pick}>
                {file ? tt('Boshqa fayl tanlash') : tt('PDF fayl tanlash')}
              </Button>
              <p className={styles.help}>{file ? file.name : tt('PDF · 10 MB gacha')}</p>
            </div>
          </div>

          <Checkbox
            label={tt('Bu yechim o‘z ishim ekanini tasdiqlayman.')}
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          <div className={styles.actions}>
            <Button variant="secondary" onClick={() => setDraftSaved(true)} className={styles.action}>
              {tt('Qoralamani saqlash')}
            </Button>
            <Button variant="primary" type="submit" className={styles.action}>
              {tt('Yechimni yuborish')}
            </Button>
            {draftSaved && <span className={styles.help}>{tt('Qoralama saqlandi.')}</span>}
          </div>

          <p className={styles.help}>{tt('Yechimingiz YuksalUp ichida yuboriladi va admin tomonidan ko‘rib chiqiladi.')}</p>
        </form>
      </div>
    </StudentShell>
  );
}

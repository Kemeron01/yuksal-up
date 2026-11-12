import { useI18n } from '@/i18n';
import { Status } from '@/components/ui/Status';
import styles from './PageHeading.module.css';

/** Title, intro and the "next step" status pill used at the top of student screens. */
export function PageHeading({ title, text, status = '' }: { title: string; text: string; status?: string }) {
  const { tt } = useI18n();
  return (
    <div className={styles.heading}>
      <div className={styles.copy}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.text}>{text}</p>
      </div>
      {status && <Status state="open" label={tt(status)} compact />}
    </div>
  );
}

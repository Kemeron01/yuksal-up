import { Button } from '@/components/ui/Button';
import { ArrowIcon } from '@/components/ui/Icons';
import { useI18n } from '@/i18n';
import shared from './sections.module.css';
import styles from './CtaBanner.module.css';

export function CtaBanner() {
  const { t } = useI18n();

  return (
    <section className={`${shared.section} ${styles.wrap}`} id="register">
      <div className={styles.banner}>
        <div className={styles.copy}>
          <h2 className={styles.title}>
            {t.cta.title[0]} <br className={styles.br} />
            {t.cta.title[1]}
          </h2>
          <p className={styles.text}>{t.cta.text}</p>
          <Button to="/register" variant="accent" wide slot={[260, 290]}>
            {t.cta.button}
          </Button>
        </div>
        <div className={styles.symbol} aria-hidden>
          <span className={styles.arrow}>
            <ArrowIcon />
          </span>
        </div>
      </div>
    </section>
  );
}

import { SectionHeading } from '@/components/ui/SectionHeading';
import { StepCard } from '@/components/cards/StepCard';
import { useI18n } from '@/i18n';
import shared from './sections.module.css';
import styles from './HowItWorks.module.css';

export function HowItWorks() {
  const { t } = useI18n();

  return (
    <section className={`${shared.section} ${styles.how}`} id="how-it-works">
      <SectionHeading eyebrow={t.how.eyebrow} title={t.how.title} />
      <ol className={styles.steps}>
        {t.how.steps.map((step, i) => (
          <StepCard key={i} number={`0${i + 1}`} title={step.title} text={step.text} />
        ))}
      </ol>
    </section>
  );
}

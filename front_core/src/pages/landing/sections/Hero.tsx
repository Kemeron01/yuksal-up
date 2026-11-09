import { Button } from '@/components/ui/Button';
import { AwardIcon, BookIcon, BriefcaseIcon, DebateIcon, HeartMutedIcon } from '@/components/ui/Icons';
import { CategoryItem } from '@/components/cards/CategoryItem';
import { useI18n } from '@/i18n';
import styles from './Hero.module.css';

export function Hero() {
  const { t } = useI18n();
  const muted = 'var(--muted)';

  return (
    <section className={styles.hero} id="top">
      <h1 className={styles.title}>
        {t.hero.title[0]} <br className={styles.br} />
        {t.hero.title[1]}
      </h1>
      <p className={styles.subtitle}>{t.hero.subtitle}</p>
      <div className={styles.actions}>
        <Button to="/register" variant="primary" wide slot={[212, 184]}>
          {t.hero.register}
        </Button>
        <Button variant="outline" wide slot={[210, 170]} onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth", block: "start" })}>
          {t.hero.howItWorks}
        </Button>
      </div>
      <ul className={styles.categories}>
        <CategoryItem icon={<BriefcaseIcon color={muted} />} label={t.categories.internships} />
        <CategoryItem icon={<HeartMutedIcon />} label={t.categories.volunteering} />
        <CategoryItem icon={<DebateIcon color={muted} />} label={t.categories.debates} />
        <CategoryItem icon={<AwardIcon color={muted} />} label={t.categories.olympiads} />
        <CategoryItem icon={<BookIcon />} label={t.categories.challenges} />
      </ul>
    </section>
  );
}

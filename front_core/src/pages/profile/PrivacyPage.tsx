import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import styles from './PrivacyPage.module.css';
import { useI18n } from '@/i18n';

const SECTIONS = [
  {
    title: 'Qanday ma’lumotlar saqlanadi?',
    text: 'Profil ma’lumotlari, tanlangan qiziqishlar va keys javoblari.',
  },
  {
    title: 'Ma’lumotlaringizdan foydalanish',
    text: 'Qiziqishlaringizga mos imkoniyatlarni topish va yuborgan yechimlaringizni ko‘rib chiqish.',
  },
  {
    title: 'Ma’lumotlaringizni boshqarish',
    text: 'Profil sozlamalarida ma’lumotlaringizni yangilashingiz mumkin.',
  },
];

/** 14 · Privacy */
export function PrivacyPage() {
  const { tt } = useI18n();
  return (
    <AppShell>
      <div className={styles.content}>
        <article className={styles.article}>
          <h1 className={styles.h1}>{tt('Maxfiylik haqida')}</h1>
          <p className={styles.lead}>{tt('YuksalUp foydalanuvchilari uchun maxfiylik ma’lumotlari.')}</p>
          {SECTIONS.map((s) => (
            <section key={s.title} className={styles.section}>
              <h2 className={styles.h2}>{tt(s.title)}</h2>
              <p className={styles.text}>{tt(s.text)}</p>
            </section>
          ))}
          <Button variant="secondary" to="/">
            {tt('Bosh sahifaga qaytish')}
          </Button>
        </article>
      </div>
    </AppShell>
  );
}

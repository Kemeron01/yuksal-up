import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import styles from './PrivacyPage.module.css';
import { useI18n } from '@/i18n';

const SECTIONS = [
  {
    title: 'Hisob ma’lumotlari',
    text: 'Ro‘yxatdan o‘tishda ism, familiya, elektron pochta va parol so‘raladi. Email hisobingizni tasdiqlash va parolni tiklash uchun ishlatiladi.',
  },
  {
    title: 'Profil va qiziqishlar',
    text: 'Sinf, hudud va tanlangan yo‘nalishlar mos imkoniyatlarni topishga yordam beradi. Profil va qiziqishlaringizni istalgan vaqtda yangilashingiz mumkin.',
  },
  {
    title: 'Keys yechimlari',
    text: 'Yechimlar YuksalUp ichida yuboriladi. Administrator yuborilgan ishni ko‘rib chiqadi va yozma fikr-mulohaza qoldiradi.',
  },
  {
    title: 'Tashkilotchi saytlariga o‘tish',
    text: 'Dasturlarga arizalar tashkilotchi saytida topshiriladi. O‘tishdan oldin o‘sha saytning shartlari va maxfiylik ma’lumotlari bilan tanishing.',
  },
  {
    title: 'Sizning tanlovlaringiz',
    text: 'Ro‘yxatdan o‘tishda shaxsiy ma’lumotlarga ishlov berishga rozilik bildirasiz. Qiziqishlar, til va profil ma’lumotlarini hisob sozlamalarida boshqarasiz.',
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
          <p className={styles.lead}>{tt('YuksalUp’da ma’lumotlaringizdan qanday foydalanilishi haqida.')}</p>
          {SECTIONS.map((s) => (
            <section key={s.title} className={styles.section}>
              <h2 className={styles.h2}>{tt(s.title)}</h2>
              <p className={styles.text}>{tt(s.text)}</p>
            </section>
          ))}
          <Button variant="primary" to="/" slot={[256, '100%']}>
            {tt('Bosh sahifaga qaytish')}
          </Button>
        </article>
      </div>
    </AppShell>
  );
}

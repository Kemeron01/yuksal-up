import { Link } from 'react-router-dom';
import { AdminShell } from '@/components/admin/AdminShell';
import { AdminHeading, AdminPanel } from '@/components/admin/AdminParts';
import { Button } from '@/components/ui/Button';
import { Status } from '@/components/ui/Status';
import { OPPORTUNITIES } from '@/data/opportunities';
import { useAdmin } from '@/data/admin';
import { useAuth } from '@/data/auth';
import { useSubmissions } from '@/data/challenges';
import styles from './AdminPages.module.css';
import { useI18n } from '@/i18n';

/** 01 · Dashboard. */
export function DashboardPage() {
  const { tt } = useI18n();
  const { deleted, created } = useAdmin();
  const { accounts } = useAuth();
  const { all } = useSubmissions();
  const students = accounts.filter((a) => a.role === 'student');
  const published =
    OPPORTUNITIES.filter((o) => !deleted.includes(o.id) && !created.some((c) => c.id === o.id)).length +
    created.filter((c) => c.kind === 'opportunity' && c.published).length;
  const waiting = all.filter((x) => x.status === 'submitted').length;
  const recent = [...students].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 2);

  const metrics = [
    { label: tt('Foydalanuvchilar'), value: String(students.length), note: tt('{real} profil + {sample} namuna akkaunt', { real: students.filter((u) => !u.sample).length, sample: students.filter((u) => u.sample).length }) },
    { label: tt('E’lon qilingan imkoniyatlar'), value: String(published), note: tt('Katalogdagi namunaviy dasturlar') },
    { label: tt('Tekshirish kutilmoqda'), value: String(waiting), note: tt('O‘quvchi yuborgan namunaviy ish') },
  ];

  return (
    <AdminShell active="dashboard">
      <AdminHeading eyebrow={tt('BUGUNGI HOLAT')} title={tt('Xayrli kun, admin')} text={tt('YuksalUp hamjamiyati uchun keyingi imkoniyatni yarating.')} />

      <ul className={styles.metrics}>
        {metrics.map((m) => (
          <li key={m.label} className={styles.metric}>
            <p className={styles.muted}>{m.label}</p>
            <p className={styles.metricValue}>{m.value}</p>
            <p className={styles.caption}>{m.note}</p>
          </li>
        ))}
      </ul>

      <AdminPanel title={tt('Keyingi amallar')} text={tt('Hamjamiyat uchun foydali ishlar.')}>
        <div className={styles.actionCard}>
          <div className={styles.actionCopy}>
            <p className={styles.strong}>{tt('Yangi imkoniyatni ulashing')}</p>
            <p className={styles.muted}>{tt('Dastur ma’lumotlari va tashqi ariza havolasini qo‘shing.')}</p>
          </div>
          <Button variant="primary" to="/admin/opportunities/new" slot={[244, '100%']}>
            {tt('Imkoniyat yaratish')}
          </Button>
        </div>
        <div className={styles.actionCard}>
          <div className={styles.actionCopy}>
            <p className={styles.strong}>{tt('O‘quvchilar ishlarini tekshiring')}</p>
            <p className={styles.muted}>{tt('{count} ta ish fikr-mulohazangizni kutmoqda.', { count: waiting })}</p>
          </div>
          <Button variant="secondary" to="/admin/reviews" slot={[244, '100%']}>
            {tt('Navbatni ochish')}
          </Button>
        </div>
      </AdminPanel>

      <AdminPanel title={tt('Yaqinda qo‘shilganlar')}>
        <ul className={styles.recent}>
          {recent.map((u) => (
            <li key={u.email} className={styles.recentRow}>
              <div className={styles.identity}>
                <p className={styles.strong}>{u.name} {u.surname}</p>
                <p className={styles.caption}>{u.email}</p>
              </div>
              <Status state={u.suspended ? 'closed' : 'open'} label={u.suspended ? tt('To‘xtatilgan') : tt('Faol')} compact />
            </li>
          ))}
        </ul>
        <Link to="/admin/users" className={styles.link}>
          {tt('Barcha foydalanuvchilarni ko‘rish →')}
        </Link>
      </AdminPanel>
    </AdminShell>
  );
}

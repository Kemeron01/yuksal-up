import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AdminShell } from '@/components/admin/AdminShell';
import { AdminHeading, AdminPanel } from '@/components/admin/AdminParts';
import { Button } from '@/components/ui/Button';
import { Status } from '@/components/ui/Status';
import { useAuth } from '@/data/auth';
import styles from './AdminPages.module.css';
import { useI18n } from '@/i18n';
import { localizeGrade } from '@/data/opportunities';

/** 03 · User account detail (with the suspend confirmation). */
export function UserDetailPage() {
  const { tt } = useI18n();
  const { id } = useParams();
  const { accounts, setSuspended } = useAuth();
  const user = accounts.find((u) => u.email === id && u.role === 'student');
  const [confirming, setConfirming] = useState(false);

  if (!user) {
    return (
      <AdminShell active="users">
        <Link to="/admin/users" className={styles.link}>
          {tt('← Foydalanuvchilarga qaytish')}
        </Link>
        <AdminHeading eyebrow={tt('AKKAUNT TAFSILOTLARI')} title={tt('Akkaunt topilmadi')} text="" />
      </AdminShell>
    );
  }

  const details: [string, string][] = [
    ['Ism-familiya', `${user.name} ${user.surname}`],
    ['Email', user.email],
    ['Sinf', user.grade ? localizeGrade(user.grade, tt) : '—'],
    ['Hudud', user.region ? tt(user.region) : '—'],
    ['Ro‘yxatdan o‘tgan', user.createdAt],
    ['Akkaunt turi', 'O‘quvchi'],
  ];

  return (
    <AdminShell active="users">
      <Link to="/admin/users" className={styles.link}>
        {tt('← Foydalanuvchilarga qaytish')}
      </Link>
      <AdminHeading eyebrow={tt('AKKAUNT TAFSILOTLARI')} title={`${user.name} ${user.surname}`} text={user.email} />
      <div>
        <Status state={user.suspended ? 'closed' : 'open'} label={user.suspended ? tt('To‘xtatilgan') : tt('Faol')} compact />
      </div>

      <AdminPanel title={tt('Shaxsiy ma’lumotlar')}>
        <dl className={styles.details}>
          {details.map(([k, v]) => (
            <div key={k}>
              <dt>{tt(k)}</dt>
              <dd>{tt(v)}</dd>
            </div>
          ))}
        </dl>
      </AdminPanel>

      <AdminPanel
        title={tt('Akkauntni boshqarish')}
        text={
          user.suspended
            ? tt('Akkaunt to‘xtatilgan. O‘quvchi katalog va yechimlariga kira olmaydi.')
            : tt('Faol hisob o‘quvchiga katalog, saqlangan dasturlar va yechimlariga kirish imkonini beradi.')
        }
      >
        {user.suspended ? (
          <Button variant="primary" onClick={() => setSuspended(user.email, false)} slot={[260, '100%']}>
            {tt('Akkauntni faollashtirish')}
          </Button>
        ) : (
          <Button variant="secondary" onClick={() => setConfirming(true)} slot={[260, '100%']}>
            {tt('Akkauntni to‘xtatish')}
          </Button>
        )}
      </AdminPanel>

      {confirming && !user.suspended && (
        <AdminPanel title={tt('Akkauntni to‘xtatishni tasdiqlang')} tone="yellow" large={false}>
          <p className={styles.bodyLarge}>
            {tt('{name}ning akkaunti “To‘xtatilgan” holatiga o‘tadi. Uni keyin yana faollashtirish mumkin.', { name: `${user.name} ${user.surname}` })}
          </p>
          <div className={styles.buttons}>
            <Button variant="outline" onClick={() => setConfirming(false)} slot={[140, '100%']}>
              {tt('Bekor qilish')}
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setSuspended(user.email, true);
                setConfirming(false);
              }}
              slot={[217, '100%']}
            >
              {tt('To‘xtatishni tasdiqlash')}
            </Button>
          </div>
        </AdminPanel>
      )}
    </AdminShell>
  );
}

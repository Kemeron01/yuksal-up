import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminShell } from '@/components/admin/AdminShell';
import { AdminHeading, AdminRow, AdminSearch, AdminTable } from '@/components/admin/AdminParts';
import { Chip } from '@/components/ui/Chip';
import { Status } from '@/components/ui/Status';
import { useAuth } from '@/data/auth';
import styles from './AdminPages.module.css';
import { useI18n } from '@/i18n';
import { localizeGrade } from '@/data/opportunities';

/** 02 · Users list. */
export function UsersPage() {
  const { tt } = useI18n();
  const { accounts } = useAuth();
  const users = accounts.filter((a) => a.role === 'student');
  const [query, setQuery] = useState('');
  const shown = useMemo(
    () => users.filter((u) => `${u.name} ${u.surname} ${u.email}`.toLowerCase().includes(query.toLowerCase())),
    [users, query],
  );

  return (
    <AdminShell active="users">
      <AdminHeading eyebrow={tt('AKKAUNTLAR')} title={tt('Foydalanuvchilar')} text={tt('Ro‘yxatdan o‘tgan o‘quvchilar va ularning akkaunt holati.')} />
      <AdminSearch placeholder={tt('Ism yoki email orqali qidiring')} onSearch={setQuery} />
      <AdminTable columns="310fr 178fr 130fr 246fr" headers={[tt('Foydalanuvchi'), tt('Sinf / hudud'), tt('Holat'), tt('Amal')]}>
        {shown.map((u) => (
          <AdminRow key={u.email}>
            <div className={styles.identity}>
              <p className={styles.strong}>{u.name} {u.surname}</p>
              <p className={styles.caption}>{u.email}</p>
              {u.sample && <Chip label={tt('Namuna')} asStatic />}
            </div>
            <p className={styles.body}>
              {u.grade ? localizeGrade(u.grade, tt) : '—'} · {u.region ? tt(u.region) : '—'}
            </p>
            <div>
              <Status state={u.suspended ? 'closed' : 'open'} label={u.suspended ? tt('To‘xtatilgan') : tt('Faol')} compact />
            </div>
            <Link to={`/admin/users/${encodeURIComponent(u.email)}`} className={styles.link}>
              {tt('Profilni ochish →')}
            </Link>
          </AdminRow>
        ))}
        {shown.length === 0 && <p className={styles.muted}>{tt('Hech narsa topilmadi.')}</p>}
      </AdminTable>
    </AdminShell>
  );
}

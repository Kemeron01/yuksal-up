import { useMemo, useState } from 'react';
import { Button as UiButton } from '@/components/shadcn/button';
import { Link } from 'react-router-dom';
import { AdminShell } from '@/components/admin/AdminShell';
import { AdminHeading, AdminRow, AdminSearch, AdminTable } from '@/components/admin/AdminParts';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { Button } from '@/components/ui/Button';
import { Status } from '@/components/ui/Status';
import { OPPORTUNITIES } from '@/data/opportunities';
import { useAdmin, type AdminContent } from '@/data/admin';
import styles from './AdminPages.module.css';
import { useI18n } from '@/i18n';

const CATEGORY_LABEL: Record<string, string> = { Olimpiadalar: 'Olimpiada' };

const baseOpportunities = (): AdminContent[] =>
  OPPORTUNITIES.map((o) => ({
    id: o.id,
    kind: 'opportunity',
    title: o.title,
    organizer: o.organization,
    category: CATEGORY_LABEL[o.category] ?? o.category,
    deadline: o.deadline,
    published: true,
  }));

const baseChallenges = (): AdminContent[] => [
  { id: 'library', kind: 'challenge', title: 'Navbatsiz kutubxona', organizer: 'YuksalUp', category: 'Amaliy topshiriq', deadline: '2026-11-15', published: true },
  { id: 'water', kind: 'challenge', title: 'Maktabda har tomchi muhim', organizer: 'YuksalUp', category: 'Amaliy topshiriq', deadline: '2026-11-24', published: true },
  { id: 'welcome', kind: 'challenge', title: 'Yangi o‘quvchi uchun ilk hafta', organizer: 'YuksalUp', category: 'Amaliy topshiriq', deadline: '2026-12-05', published: true },
];

function ContentTable({ kind }: { kind: 'opportunity' | 'challenge' }) {
  const { tt } = useI18n();
  const { deleted, deleteContent, created } = useAdmin();
  const [query, setQuery] = useState('');
  const [toDelete, setToDelete] = useState<AdminContent | null>(null);

  const items = useMemo(() => {
    const base = kind === 'opportunity' ? baseOpportunities() : baseChallenges();
    const merged = [...base.filter((b) => !created.some((c) => c.id === b.id)), ...created.filter((c) => c.kind === kind)];
    return merged
      .filter((i) => !deleted.includes(i.id))
      .filter((i) => `${i.title} ${i.organizer}`.toLowerCase().includes(query.toLowerCase()));
  }, [kind, deleted, created, query]);

  const base = kind === 'opportunity' ? '/admin/opportunities' : '/admin/challenges';

  return (
    <>
      <AdminSearch placeholder={tt('Nomi yoki tashkilot orqali qidiring')} onSearch={setQuery} />
      <AdminTable columns="386fr 144fr 136fr 198fr" headers={[tt('Nomi'), tt('Muddat'), tt('Holat'), tt('Amallar')]}>
        {items.map((i) => (
          <AdminRow key={i.id}>
            <div className={styles.identity}>
              <p className={styles.strong}>{tt(i.title)}</p>
              <p className={styles.caption}>
                {i.organizer} · {tt(i.category)}
              </p>
            </div>
            <p className={styles.body}>
              <span className={styles.mobileLabel}>{tt('Muddat')}</span>
              {i.deadline}
            </p>
            <div>
              <Status state={i.published ? 'open' : 'submitted'} label={i.published ? tt('E’lon qilingan') : tt('Qoralama')} compact />
            </div>
            <div className={styles.actions}>
              <Link to={`${base}/${i.id}/edit`} className={styles.link}>
                {tt('Tahrirlash')}
              </Link>
              <UiButton variant="unstyled" className={styles.linkButton} onClick={() => setToDelete(i)}>
                {tt('O‘chirish')}
              </UiButton>
            </div>
          </AdminRow>
        ))}
        {items.length === 0 && <p className={styles.muted}>{tt('Hech narsa topilmadi.')}</p>}
      </AdminTable>

      {toDelete && (
        <ConfirmDialog
          title={tt('Kontentni o‘chirish?')}
          text={kind === 'opportunity' ? tt('Ushbu imkoniyat katalogdan olib tashlanadi. Davom etishdan oldin tanlovingizni tekshiring.') : tt('Ushbu topshiriq ro‘yxatdan olib tashlanadi. Davom etishdan oldin tanlovingizni tekshiring.')}
          note={
            <>
              <p>{tt(toDelete.title)}</p>
              <p>
                {toDelete.organizer} · {tt('Muddat')}: {toDelete.deadline}
              </p>
            </>
          }
          confirmLabel={tt('O‘chirish')}
          onCancel={() => setToDelete(null)}
          onConfirm={() => {
            deleteContent(toDelete.id);
            setToDelete(null);
          }}
        />
      )}
    </>
  );
}

/** 04 · Opportunity management and 13 · Delete content confirmation (dialog). */
export function AdminOpportunitiesPage() {
  const { tt } = useI18n();
  return (
    <AdminShell active="opportunities">
      <AdminHeading
        eyebrow={tt('KONTENT')}
        title={tt('Imkoniyatlar')}
        text={tt('Dasturlarni yarating, yangilang va katalogni tartibda saqlang.')}
        action={
          <Button variant="primary" to="/admin/opportunities/new" slot={[236, '100%']}>
            {tt('+ Imkoniyat yaratish')}
          </Button>
        }
      />
      <ContentTable kind="opportunity" />
    </AdminShell>
  );
}

/** 05 · Challenge management. */
export function AdminChallengesPage() {
  const { tt } = useI18n();
  return (
    <AdminShell active="challenges">
      <AdminHeading
        eyebrow={tt('KONTENT')}
        title={tt('Topshiriqlar')}
        text={tt('O‘quvchilar mashq qilishi va fikr olishi uchun topshiriqlar.')}
        action={
          <Button variant="primary" to="/admin/challenges/new" slot={[236, '100%']}>
            {tt('+ Topshiriq yaratish')}
          </Button>
        }
      />
      <ContentTable kind="challenge" />
    </AdminShell>
  );
}

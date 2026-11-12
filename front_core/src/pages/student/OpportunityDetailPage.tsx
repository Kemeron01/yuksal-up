import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Chip } from '@/components/ui/Chip';
import { ArrowIcon } from '@/components/ui/Icons';
import { StudentShell } from '@/components/student/StudentShell';
import { formatDeadline, findOpportunity, opportunityAbout } from '@/data/opportunities';
import { useRequireLogin } from '@/components/useRequireLogin';
import { useSaved } from '@/data/saved';
import { Button } from '@/components/ui/Button';
import styles from './OpportunityDetailPage.module.css';
import { useI18n } from '@/i18n';

/** 04 · Opportunity detail, 05 · External application handoff (after "Tashkilot saytida davom etish"). */
export function OpportunityDetailPage() {
  const { tt } = useI18n();
  const { id } = useParams();
  const item = findOpportunity(id);
  const { isSaved, toggle } = useSaved();
  const [handoff, setHandoff] = useState(false);
  const requireLogin = useRequireLogin();

  if (!item) {
    return (
      <StudentShell active="opportunities">
        <p className={styles.crumbs}>
          <Link to="/opportunities">{tt('Imkoniyatlar')}</Link>
        </p>
        <h1 className={styles.title}>{tt('Imkoniyat topilmadi')}</h1>
      </StudentShell>
    );
  }

  const saved = isSaved(item.id);

  return (
    <StudentShell active="opportunities">
      <nav className={styles.crumbs} aria-label={tt('Breadcrumbs')}>
        <Link to="/opportunities">{tt('Imkoniyatlar')}</Link>
        <span>›&nbsp; {tt(item.category)}</span>
      </nav>

      <div className={styles.detail}>
        <article className={styles.article}>
          <div className={styles.heading}>
            <h1 className={styles.title}>{tt(item.title)}</h1>
            <p className={styles.lead}>
              {item.organization} · {tt(item.region)}
            </p>
          </div>

          <div className={styles.tags}>
            <Chip label={tt(item.category)} asStatic />
            <Chip label={tt(item.interest)} asStatic />
            <Chip label={tt(item.grades)} asStatic />
          </div>

          <section className={styles.section}>
            <h2 className={styles.h2}>{tt('Dastur haqida')}</h2>
            <p className={styles.text}>{opportunityAbout(item, tt)}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>{tt('Kimlar uchun?')}</h2>
            <div className={styles.text}>
              <p>{tt('{grades} o‘quvchilari.', { grades: tt(item.grades) })}</p>
              <p aria-hidden>{'\u00a0'}</p>
              <p>{tt('• Yo‘nalishga qiziqish va o‘rganishga tayyorlik.')}</p>
              <p>{tt('• Tashkilotchining to‘liq talablarini rasmiy sahifada tekshiring.')}</p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>{tt('Qanday ariza topshiriladi?')}</h2>
            <div className={styles.text}>
              <p>{tt('1. Dastur shartlari va muddatini o‘qing.')}</p>
              <p>{tt('2. Tashkilotchi saytiga o‘ting.')}</p>
              <p>{tt('3. Arizani o‘sha sahifada yakunlang.')}</p>
            </div>
          </section>

          <div className={styles.rule}>
            <p>{tt('Arizalar tashkilotchi saytida topshiriladi. Bu yerdagi tugmani bosish ariza yuborilganini anglatmaydi.')}</p>
          </div>
        </article>

        <aside className={styles.key}>
          <h2 className={styles.h2}>{tt('Muhim ma’lumotlar')}</h2>
          <dl className={styles.facts}>
            <div>
              <dt>{tt('Oxirgi muddat')}</dt>
              <dd>{formatDeadline(item.deadline, tt)}</dd>
            </div>
            <div>
              <dt>{tt('Boshlanish sanasi')}</dt>
              <dd>{item.startDate ? formatDeadline(item.startDate, tt) : tt('Tashkilotchi saytida')}</dd>
            </div>
            <div>
              <dt>{tt('Format')}</dt>
              <dd>
                {tt(item.format)} · {tt(item.region)}
              </dd>
            </div>
            <div>
              <dt>{tt('Ishtirok narxi')}</dt>
              <dd>{tt(item.price)}</dd>
            </div>
          </dl>

          <Button flush block onClick={() => setHandoff(true)}>
            {tt('Tashkilot saytida davom etish')}
          </Button>
          <Button flush block variant="secondary" onClick={() => requireLogin(() => toggle(item.id))} aria-pressed={saved}>
            {saved ? tt('Saqlangan') : tt('Saqlash')}
          </Button>

          {handoff && (
            <div className={styles.handoff} role="status">
              <span className={styles.arrow} aria-hidden>
                <ArrowIcon />
              </span>
              <p className={styles.handoffTitle}>{tt('Tashqi ariza sahifasiga o‘tish')}</p>
              <p className={styles.handoffText}>
                {tt('Namunaviy dastur uchun haqiqiy ariza havolasi mavjud emas. Arizani tashkilotchi sahifasida yakunlaysiz.')}
              </p>
            </div>
          )}
        </aside>
      </div>
    </StudentShell>
  );
}


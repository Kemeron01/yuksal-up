import { useMemo, useState } from 'react';
import { Button as UiButton } from '@/components/shadcn/button';
import { Link } from 'react-router-dom';
import { StudentShell } from '@/components/student/StudentShell';
import { PageHeading } from '@/components/student/PageHeading';
import { Status } from '@/components/ui/Status';
import { useSaved } from '@/data/saved';
import { Button } from '@/components/ui/Button';
import styles from './CalendarPage.module.css';
import { useI18n } from '@/i18n';

type EventKind = 'deadline' | 'start' | 'challenge';

interface CalendarEvent {
  date: string; // YYYY-MM-DD
  title: string;
  kind: EventKind;
  /** Opportunity id (for the "saved only" filter). */
  opportunityId?: string;
  to: string;
}

const KIND_LABEL: Record<EventKind, string> = {
  deadline: 'Ariza topshirish muddati',
  start: 'Dastur boshlanishi',
  challenge: 'Keys yechimi muddati',
};

const EVENTS: CalendarEvent[] = [
  { date: '2026-11-08', title: 'Mahallamiz uchun yashil hafta', kind: 'deadline', opportunityId: 'green-week', to: '/opportunities/green-week' },
  { date: '2026-11-12', title: 'Yoshlar uchun texnologiya amaliyoti', kind: 'deadline', opportunityId: 'tech-internship', to: '/opportunities/tech-internship' },
  { date: '2026-11-14', title: 'Mahallamiz uchun yashil hafta', kind: 'start', opportunityId: 'green-week', to: '/opportunities/green-week' },
  { date: '2026-11-15', title: 'Navbatsiz kutubxona', kind: 'challenge', to: '/challenges/library' },
  { date: '2026-11-18', title: 'Speak Up: maktablararo debat', kind: 'deadline', opportunityId: 'speak-up', to: '/opportunities/speak-up' },
  { date: '2026-11-20', title: 'Yoshlar uchun texnologiya amaliyoti', kind: 'start', opportunityId: 'tech-internship', to: '/opportunities/tech-internship' },
  { date: '2026-11-21', title: 'Matematika: yangi yechimlar olimpiadasi', kind: 'deadline', opportunityId: 'math-olympiad', to: '/opportunities/math-olympiad' },
  { date: '2026-11-24', title: 'Maktabda har tomchi muhim', kind: 'challenge', to: '/challenges/water' },
  { date: '2026-11-28', title: 'Speak Up: maktablararo debat', kind: 'start', opportunityId: 'speak-up', to: '/opportunities/speak-up' },
  { date: '2026-11-30', title: 'Matematika: yangi yechimlar olimpiadasi', kind: 'start', opportunityId: 'math-olympiad', to: '/opportunities/math-olympiad' },
];

const MONTHS = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];
const MONTHS_GEN = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'];
const WEEKDAYS = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'];

const iso = (y: number, m: number, d: number) => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

/** 13 · Calendar (November 2026 is the design's month; arrows move between months). */
export function CalendarPage() {
  const { tt } = useI18n();
  const { saved } = useSaved();
  const [onlySaved, setOnlySaved] = useState(false);
  const [view, setView] = useState({ year: 2026, month: 10 });
  const [selected, setSelected] = useState('2026-11-12');

  const events = useMemo(
    () => EVENTS.filter((e) => !onlySaved || (e.opportunityId && saved.includes(e.opportunityId))),
    [onlySaved, saved],
  );
  const byDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    events.forEach((e) => map.set(e.date, [...(map.get(e.date) ?? []), e]));
    return map;
  }, [events]);

  const { year, month } = view;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Monday-first offset: JS Sunday=0 → 6
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const cells: (number | null)[] = [...Array(offset).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);

  const monthEvents = events.filter((e) => e.date.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`));
  const selectedEvents = byDate.get(selected) ?? [];
  const [sy, sm, sd] = selected.split('-').map(Number);

  const move = (delta: number) => {
    const d = new Date(year, month + delta, 1);
    setView({ year: d.getFullYear(), month: d.getMonth() });
  };

  return (
    <StudentShell active="calendar">
      <PageHeading title={tt('Taqvim')} text={tt('Muhim sanalar bir joyda. · Asia/Tashkent')} status="" />

      <div className={styles.filter}>
        <Button flush variant={!onlySaved ? 'primary' : 'secondary'} onClick={() => setOnlySaved(false)}>
          {tt('Barcha imkoniyatlar')}
        </Button>
        <Button flush variant={onlySaved ? 'primary' : 'secondary'} onClick={() => setOnlySaved(true)}>
          {tt('Faqat saqlanganlar')}
        </Button>
      </div>

      <div className={styles.top}>
        <section className={styles.calendar} aria-label={`${tt(MONTHS[month])} ${year}`}>
          <div className={styles.monthNav}>
            <h2 className={styles.monthTitle}>
              {tt(MONTHS[month])} {year}
            </h2>
            <div className={styles.arrows}>
              <UiButton variant="unstyled" className={styles.arrow} onClick={() => move(-1)} aria-label={tt('Oldingi oy')}>
                ←
              </UiButton>
              <UiButton variant="unstyled" className={styles.arrow} onClick={() => move(1)} aria-label={tt('Keyingi oy')}>
                →
              </UiButton>
            </div>
          </div>

          <div className={styles.grid} role="grid">
            <div className={styles.week} role="row">
              {WEEKDAYS.map((d0) => { const d = tt(d0); return (
                <div key={d} className={styles.weekday} role="columnheader">
                  {d}
                </div>
              ); })}
            </div>
            {Array.from({ length: cells.length / 7 }, (_, w) => (
              <div key={w} className={styles.week} role="row">
                {cells.slice(w * 7, w * 7 + 7).map((day, i) => {
                  if (!day) return <div key={i} className={styles.blank} role="gridcell" />;
                  const date = iso(year, month, day);
                  const has = byDate.has(date);
                  const isSelected = date === selected;
                  return (
                    <UiButton variant="unstyled"
                      key={i}
                      role="gridcell"
                      className={`${styles.day} ${has ? styles.hasEvent : ''} ${isSelected ? styles.selected : ''}`}
                      aria-pressed={isSelected}
                      onClick={() => setSelected(date)}
                    >
                      <span className={styles.dayNumber}>{day}</span>
                      {has && <span className={styles.dot}>•</span>}
                    </UiButton>
                  );
                })}
              </div>
            ))}
          </div>

          <div className={styles.legend}>
            <Status state="open" label={tt('Ariza muddati')} compact />
            <Status state="submitted" label={tt('Dastur sanasi')} compact />
          </div>
        </section>

        <aside className={styles.selectedDay}>
          <h2 className={styles.dayTitle}>
            {sd} {tt(MONTHS_GEN[sm - 1])} {sy}
          </h2>
          {selectedEvents.length > 0 ? (
            selectedEvents.map((e) => (
              <div key={e.title + e.kind} className={styles.eventBlock}>
                <p className={styles.eventTitle}>{tt(e.title)}</p>
                <p className={styles.eventKind}>{tt(KIND_LABEL[e.kind])}</p>
                <Button flush block to={e.to}>
                  {tt('Batafsil')}
                </Button>
              </div>
            ))
          ) : (
            <p className={styles.eventKind}>{tt('Bu kunda muhim sana yo‘q.')}</p>
          )}
        </aside>
      </div>

      <section className={styles.agenda}>
        <h2 className={styles.agendaTitle}>{tt('Bu oydagi sanalar')}</h2>
        <ul className={styles.agendaList}>
          {monthEvents.map((e) => (
            <li key={e.date + e.title + e.kind}>
              <Link to={e.to} className={styles.agendaItem}>
                <span className={styles.agendaDay}>{Number(e.date.slice(8))}</span>
                <span className={styles.agendaText}>
                  <span className={styles.eventTitle}>{tt(e.title)}</span>
                  <span className={styles.eventKind}>{tt(KIND_LABEL[e.kind])}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </StudentShell>
  );
}

export type OpportunityCategory = 'Amaliyot' | 'Volontyorlik' | 'Debatlar' | 'Olimpiadalar';
export type OpportunityFormat = 'Onlayn' | 'Oflayn';

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  region: string;
  category: OpportunityCategory;
  format: OpportunityFormat;
  price: string;
  /** Interest tag shown on the card and used by the "Qiziqishlar" filter. */
  interest: string;
  grades: string;
  /** ISO date of the application deadline. */
  deadline: string;
  /** Longer description and start date (detail page); falls back to neutral copy. */
  about?: string;
  startDate?: string;
}

export const INTERESTS = ['Texnologiya', 'Jamiyat', 'Ekologiya', 'Liderlik', 'Tillar', 'Fan', 'Ijod'];
export const CATEGORIES: OpportunityCategory[] = ['Amaliyot', 'Volontyorlik', 'Debatlar', 'Olimpiadalar'];
export const REGIONS = ['Barcha hududlar', 'Toshkent', 'Samarqand', 'Onlayn'];
export const FORMATS = ['Barchasi', 'Onlayn', 'Oflayn'] as const;

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: 'green-week',
    title: 'Mahallamiz uchun yashil hafta',
    organization: 'Community Circle',
    region: 'Samarqand',
    category: 'Volontyorlik',
    format: 'Oflayn',
    price: 'Bepul',
    interest: 'Jamiyat',
    grades: '8–11-sinf',
    deadline: '2026-11-08',
  },
  {
    id: 'tech-internship',
    title: 'Yoshlar uchun texnologiya amaliyoti',
    organization: 'Next Step Lab',
    region: 'Toshkent',
    category: 'Amaliyot',
    format: 'Oflayn',
    price: 'Bepul',
    interest: 'Texnologiya',
    grades: '9–11-sinf',
    deadline: '2026-11-12',
    about:
      'Texnologiya jamoasi bilan ishlashni sinab ko‘ring. Dizayn, dasturlash va kichik loyiha yaratish bo‘yicha amaliy mashg‘ulotlarda qatnashing.',
    startDate: '2026-11-20',
  },
  {
    id: 'speak-up',
    title: 'Speak Up: maktablararo debat',
    organization: 'Youth Voices Club',
    region: 'Onlayn',
    category: 'Debatlar',
    format: 'Onlayn',
    price: 'Bepul',
    interest: 'Liderlik',
    grades: '8–11-sinf',
    deadline: '2026-11-18',
  },
  {
    id: 'math-olympiad',
    title: 'Matematika: yangi yechimlar olimpiadasi',
    organization: 'Discovery Academy',
    region: 'Onlayn',
    category: 'Olimpiadalar',
    format: 'Onlayn',
    price: 'Bepul',
    interest: 'Fan',
    grades: '7–11-sinf',
    deadline: '2026-11-21',
  },
  {
    id: 'media-internship',
    title: 'Ijodiy media jamoasida amaliyot',
    organization: 'Story Studio',
    region: 'Onlayn',
    category: 'Amaliyot',
    format: 'Onlayn',
    price: 'Bepul',
    interest: 'Ijod',
    grades: '9–11-sinf',
    deadline: '2026-12-03',
  },
];

export const MONTHS_GEN = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'];

/** "2026-11-08" → "8 noyabr 2026" in the active language (`tt` translates the month name). */
export function formatDeadline(iso: string, tt: (s: string) => string = (s) => s): string {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${tt(MONTHS_GEN[m - 1])} ${y}`;
}

/** Translates the Uzbek month names (and "Toshkent vaqti") inside a stored date line. */
export function localizeDate(text: string, tt: (s: string) => string): string {
  return text
    .replace(new RegExp(`\\b(${MONTHS_GEN.join('|')})\\b`, 'g'), (m) => tt(m))
    .replace('Toshkent vaqti', tt('Toshkent vaqti'));
}

/** "10-sinf" → "Grade 10" / "10 класс"; free-form values pass through `tt`. */
export function localizeGrade(g: string, tt: (s: string, p?: Record<string, string | number>) => string): string {
  const m = /^(\d+)-sinf$/.exec(g.trim());
  return m ? tt('{n}-sinf', { n: m[1] }) : tt(g);
}

export function findOpportunity(id: string | undefined): Opportunity | undefined {
  return OPPORTUNITIES.find((o) => o.id === id);
}

export function opportunityAbout(o: Opportunity, tt: (s: string, p?: Record<string, string | number>) => string = (s) => s): string {
  return o.about
    ? tt(o.about)
    : tt('{title} — {org} tomonidan o‘tkaziladi. To‘liq ma’lumotni tashkilotchi sahifasida ko‘ring.', { title: tt(o.title), org: o.organization });
}

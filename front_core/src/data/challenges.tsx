import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { useAuth } from '@/data/auth';

export interface Challenge {
  id: string;
  title: string;
  author: string;
  summary: string;
  subjects: string[];
  duration: string;
  /** Human readable deadline line shown on cards. */
  deadlineLine: string;
  /** Deadline for the details panel, two lines. */
  deadline: [string, string];
  format: string;
  situation: string;
  tasks: string[];
  criteria: string[];
}

export const CHALLENGES: Challenge[] = [
  {
    id: 'library',
    title: 'Navbatsiz kutubxona',
    author: 'YuksalUp · Namunaviy keys',
    summary:
      '180 nafar o‘quvchiga xizmat ko‘rsatuvchi maktab kutubxonasida kitoblar qog‘ozga qayd etiladi. Navbat tushlik tanaffusining katta qismini oladi. Yangi kompyuterlar sotib olmasdan jarayonni qanday yaxshilagan bo‘lardingiz?',
    subjects: ['Jamiyat', 'Texnologiya'],
    duration: '45–60 daqiqa',
    deadlineLine: '15 noyabr 2026 · 18:00 · Toshkent vaqti',
    deadline: ['15 noyabr 2026 · 18:00', 'Asia/Tashkent'],
    format: 'Matnli javob + ixtiyoriy PDF',
    situation:
      '180 nafar o‘quvchiga xizmat ko‘rsatuvchi maktab kutubxonasida kitoblar qog‘ozga qayd etiladi. Navbat tushlik tanaffusining katta qismini oladi. Yangi kompyuterlar sotib olmasdan jarayonni qanday yaxshilagan bo‘lardingiz?',
    tasks: [
      'Asosiy muammoni o‘z so‘zlaringiz bilan tushuntiring.',
      'Uchta aniq va amaliy yaxshilash taklif qiling.',
      'Natijani qanday o‘lchashingizni ayting.',
    ],
    criteria: ['Aniqlik', 'Amaliylik', 'Asoslangan fikr'],
  },
  {
    id: 'water',
    title: 'Maktabda har tomchi muhim',
    author: 'YuksalUp · Namunaviy keys',
    summary:
      'Maktabda suvdan oqilona foydalanish uchun sodda tashabbus ishlab chiqing. Muammoni aniqlang, uchta yechim taklif qiling va natijani qanday o‘lchashingizni ayting.',
    subjects: ['Ekologiya', 'Fan'],
    duration: '30–45 daqiqa',
    deadlineLine: '24 noyabr 2026 · 18:00 · Toshkent vaqti',
    deadline: ['24 noyabr 2026 · 18:00', 'Asia/Tashkent'],
    format: 'Matnli javob + ixtiyoriy PDF',
    situation:
      'Maktabda suvdan oqilona foydalanish uchun sodda tashabbus ishlab chiqing. Muammoni aniqlang, uchta yechim taklif qiling va natijani qanday o‘lchashingizni ayting.',
    tasks: [
      'Asosiy muammoni o‘z so‘zlaringiz bilan tushuntiring.',
      'Uchta aniq va amaliy yaxshilash taklif qiling.',
      'Natijani qanday o‘lchashingizni ayting.',
    ],
    criteria: ['Aniqlik', 'Amaliylik', 'Asoslangan fikr'],
  },
  {
    id: 'welcome',
    title: 'Yangi o‘quvchi uchun ilk hafta',
    author: 'YuksalUp · Namunaviy keys',
    summary:
      'Yangi o‘quvchining maktabga moslashishini yengillashtiruvchi bir haftalik reja yarating. Hech kim chetda qolmasligi uchun nima qilasiz?',
    subjects: ['Jamiyat', 'Liderlik'],
    duration: '30–45 daqiqa',
    deadlineLine: '5 dekabr 2026 · 18:00 · Toshkent vaqti',
    deadline: ['5 dekabr 2026 · 18:00', 'Asia/Tashkent'],
    format: 'Matnli javob + ixtiyoriy PDF',
    situation:
      'Yangi o‘quvchining maktabga moslashishini yengillashtiruvchi bir haftalik reja yarating. Hech kim chetda qolmasligi uchun nima qilasiz?',
    tasks: [
      'Asosiy muammoni o‘z so‘zlaringiz bilan tushuntiring.',
      'Uchta aniq va amaliy yaxshilash taklif qiling.',
      'Natijani qanday o‘lchashingizni ayting.',
    ],
    criteria: ['Aniqlik', 'Amaliylik', 'Asoslangan fikr'],
  },
];

export function findChallenge(id: string | undefined): Challenge | undefined {
  return CHALLENGES.find((c) => c.id === id);
}

/** submitted = waiting for review; accepted / rejected = the admin's decision. */
export type SubmissionStatus = 'submitted' | 'accepted' | 'rejected';

export interface Submission {
  challengeId: string;
  /** author of the solution */
  studentEmail: string;
  studentName: string;
  text: string;
  fileName?: string;
  submittedAt: string;
  /** ISO date, shown in the admin queue */
  submittedDate: string;
  status: SubmissionStatus;
  feedback?: { text: string; at: string };
}

const keyOf = (email: string, challengeId: string) => `${email}|${challengeId}`;

const DEMO_TEXT =
  'Asosiy muammo — kitobni qaytarish va yangi kitob olish bir navbatda bajariladi.\n\n1. Qaytariladigan kitoblar uchun alohida quti va qisqa qayd varag‘ini qo‘yaman.\n2. Tushlikdan oldin so‘rov varaqalarini yig‘ib, kitoblarni oldindan tayyorlashni taklif qilaman.\n3. Eng gavjum vaqtda ikki nafar o‘quvchi-ko‘ngilli navbatni tartibga soladi.\n\nBir hafta davomida o‘rtacha kutish vaqtini o‘lchayman. Maqsad — navbatni 10 daqiqadan 4 daqiqagacha kamaytirish.';

/** Demo data used by the "reviewed" design screen (12). */
export const DEMO_SUBMISSION: Submission = {
  challengeId: 'library',
  studentEmail: 'demo@example.com',
  studentName: 'Dilnoza Karimova',
  text: DEMO_TEXT,
  fileName: 'kutubxona-rejasi.pdf',
  submittedAt: '24 oktabr 2026 · 14:30 · Asia/Tashkent',
  submittedDate: '2026-10-24',
  status: 'accepted',
  feedback: {
    text:
      'Taklifingiz aniq va amalga oshirish oson. Qaytarilgan kitoblar qanday qayd etilishini qo‘shing va kutish vaqti uchun o‘lchanadigan maqsad belgilang. Bir haftalik sinov davomida o‘quvchilarning fikrini ham yig‘ib boring.',
    at: '25 oktabr 2026 · 10:15 · Asia/Tashkent',
  },
};

/** A sample student's waiting solution, so the admin review queue is not empty. */
const SEED: Record<string, Submission> = {
  [keyOf('madina@example.com', 'library')]: {
    challengeId: 'library',
    studentEmail: 'madina@example.com',
    studentName: 'Madina Karimova',
    text:
      'Kitobni qaytarish va yangi kitob olish uchun alohida navbat tashkil qilardim. O‘quvchilar ro‘yxatini alifbo tartibida tayyorlab, eng gavjum o‘n daqiqada ikki nafar volontyor yordamidan foydalanardim. Tushlikdan oldingi qog‘oz so‘rovnomalar kutubxonachiga kerakli kitoblarni oldindan tayyorlash imkonini beradi. Bir hafta davomida o‘rtacha kutish vaqtini o‘lchab, o‘quvchilardan kitob o‘qishga vaqti yetganini so‘rardim.',
    fileName: 'library-improvement-plan.pdf',
    submittedAt: '24 oktabr 2026 · 14:30 · Asia/Tashkent',
    submittedDate: '2026-10-24',
    status: 'submitted',
  },
};

const KEY = 'yuksalup:submissions:v3';

function read(): Record<string, Submission> {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, Submission & { status: string }>;
      Object.values(parsed).forEach((x) => {
        if ((x.status as string) === 'reviewed') x.status = 'accepted';
      });
      return parsed as Record<string, Submission>;
    }
  } catch {
    /* storage unavailable */
  }
  return SEED;
}

function nowLabel(): string {
  const d = new Date();
  const months = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'];
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} · ${hh}:${mm} · Asia/Tashkent`;
}

interface SubmissionsValue {
  /** every submission of every student (admin queue) */
  all: Submission[];
  /** the signed-in student's own submission for a challenge */
  mine: (challengeId: string) => Submission | undefined;
  submit: (challengeId: string, text: string, fileName?: string) => void;
  /** admin: publish (or update) written feedback */
  review: (studentEmail: string, challengeId: string, feedback: string, decision: 'accepted' | 'rejected') => void;
  find: (studentEmail: string, challengeId: string) => Submission | undefined;
}

const SubmissionsContext = createContext<SubmissionsValue | null>(null);

export function SubmissionsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [map, setMap] = useState<Record<string, Submission>>(read);

  const persist = (next: Record<string, Submission>) => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
    return next;
  };

  const submit = useCallback(
    (challengeId: string, text: string, fileName?: string) => {
      if (!user) return;
      setMap((cur) =>
        persist({
          ...cur,
          [keyOf(user.email, challengeId)]: {
            challengeId,
            studentEmail: user.email,
            studentName: `${user.name} ${user.surname}`,
            text,
            fileName,
            submittedAt: nowLabel(),
            submittedDate: new Date().toISOString().slice(0, 10),
            status: 'submitted',
          },
        }),
      );
    },
    [user],
  );

  const review = useCallback((studentEmail: string, challengeId: string, feedback: string, decision: 'accepted' | 'rejected') => {
    setMap((cur) => {
      const k = keyOf(studentEmail, challengeId);
      const existing = cur[k];
      if (!existing) return cur;
      return persist({ ...cur, [k]: { ...existing, status: decision, feedback: { text: feedback, at: nowLabel() } } });
    });
  }, []);

  const mine = useCallback(
    (challengeId: string) => (user ? map[keyOf(user.email, challengeId)] : undefined),
    [map, user],
  );
  const find = useCallback((email: string, challengeId: string) => map[keyOf(email, challengeId)], [map]);
  const all = useMemo(() => Object.values(map), [map]);

  const value = useMemo(() => ({ all, mine, submit, review, find }), [all, mine, submit, review, find]);
  return <SubmissionsContext.Provider value={value}>{children}</SubmissionsContext.Provider>;
}

export function useSubmissions(): SubmissionsValue {
  const ctx = useContext(SubmissionsContext);
  if (!ctx) throw new Error('useSubmissions must be used within SubmissionsProvider');
  return ctx;
}

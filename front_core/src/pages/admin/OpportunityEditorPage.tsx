import { useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminShell } from '@/components/admin/AdminShell';
import { AdminHeading } from '@/components/admin/AdminParts';
import {
  ContextNote,
  EditorActions,
  EditorCard,
  EditorSteps,
  TextareaField,
  Translations,
  TwoColumns,
} from '@/components/admin/EditorParts';
import { Checkbox } from '@/components/ui/Checkbox';
import { Chip } from '@/components/ui/Chip';
import { Input } from '@/components/ui/Input';
import { CATEGORIES, INTERESTS, findOpportunity } from '@/data/opportunities';
import { useAdmin } from '@/data/admin';
import { Select } from '@/components/ui/Select';
import styles from './AdminPages.module.css';
import { useI18n } from '@/i18n';

const STEPS = ['Asosiy ma’lumotlar', 'Tafsilotlar', 'Tekshirish va e’lon qilish'];

interface Draft {
  name: string;
  organizer: string;
  category: string;
  topics: string[];
  deadline: string;
  grades: string;
  region: string;
  format: string;
  start: string;
  end: string;
  price: string;
  duration: string;
  description: string;
  link: string;
}

const EMPTY: Draft = {
  name: '',
  organizer: '',
  category: 'Amaliyot',
  topics: [],
  deadline: '',
  grades: '',
  region: '',
  format: '',
  start: '',
  end: '',
  price: '',
  duration: '',
  description: '',
  link: '',
};

/** The design's example content (screens 06–08). */
const EXAMPLE: Draft = {
  name: 'Young technology explorers internship',
  organizer: 'Next Step Lab',
  category: 'Amaliyot',
  topics: ['Texnologiya'],
  deadline: '2026-11-12',
  grades: '9–11',
  region: 'Toshkent',
  format: 'Oflayn',
  start: '2026-11-20',
  end: '2026-11-27',
  price: 'Bepul',
  duration: '1 hafta',
  description:
    'Try working with a technology team. Explore design, coding, and building a small project through practical sessions.',
  link: 'https://example.org/apply',
};

function draftFromId(id?: string): Draft {
  if (!id) return EMPTY;
  const o = findOpportunity(id);
  if (!o) return EMPTY;
  if (o.id === 'tech-internship') return EXAMPLE;
  return {
    ...EMPTY,
    name: o.title,
    organizer: o.organization,
    category: o.category === 'Olimpiadalar' ? 'Olimpiada' : o.category,
    topics: [o.interest],
    deadline: o.deadline,
    grades: o.grades.replace('-sinf', ''),
    region: o.region,
    format: o.format,
    price: o.price,
    description: o.about ?? '',
  };
}

/** 06 · Editor step 1, 07 · step 2, 08 · step 3 (preview and publish). Used for both "new" and "edit". */
export function OpportunityEditorPage() {
  const { tt } = useI18n();
  const { id } = useParams();
  const navigate = useNavigate();
  const { saveContent } = useAdmin();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [d, setD] = useState<Draft>(() => draftFromId(id));
  const [error, setError] = useState<string | null>(null);
  const set = (key: keyof Draft) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setD((cur) => ({ ...cur, [key]: e.target.value }));

  const cancel = () => navigate('/admin/opportunities');

  const next = (e: FormEvent) => {
    e.preventDefault();
    if (step === 1 && (!d.name.trim() || !d.organizer.trim())) return setError(tt('Majburiy maydonlarni to‘ldiring.'));
    if (step === 2 && (!d.deadline.trim() || !d.grades.trim() || !d.price.trim() || !d.description.trim() || !d.link.trim()))
      return setError(tt('Majburiy maydonlarni to‘ldiring.'));
    setError(null);
    setStep((s) => (s === 3 ? 3 : ((s + 1) as 1 | 2 | 3)));
  };

  const publish = (e: FormEvent) => {
    e.preventDefault();
    saveContent({
      id: id ?? `new-${Date.now()}`,
      kind: 'opportunity',
      title: d.name,
      organizer: d.organizer,
      category: d.category,
      deadline: d.deadline,
      published: true,
    });
    navigate('/admin/opportunities');
  };

  const toggleTopic = (t: string) =>
    setD((cur) => ({ ...cur, topics: cur.topics.includes(t) ? cur.topics.filter((x) => x !== t) : [...cur.topics, t] }));

  return (
    <AdminShell active="opportunities">
      <AdminHeading
        eyebrow={tt('KONTENT MUHARRIRI')}
        title={id ? tt('Imkoniyatni tahrirlash') : tt('Yangi imkoniyat')}
        text={tt('Aniq ma’lumotlar o‘quvchilarga to‘g‘ri tanlov qilishga yordam beradi.')}
      />
      <EditorSteps current={step} steps={STEPS} />

      {step === 1 && (
        <EditorCard onSubmit={next}>
          <Input label={tt('Asosiy nomi (inglizcha) *')} value={d.name} onChange={set('name')} />
          <TwoColumns>
            <Input label={tt('Tashkilot *')} value={d.organizer} onChange={set('organizer')} />
            <div className={styles.selectField}>
              <label htmlFor="editor-category">{tt('Yo‘nalish')}</label>
              <Select
                id="editor-category"
                value={d.category}
                options={CATEGORIES.map((c) => (c === 'Olimpiadalar' ? 'Olimpiada' : c)).map((c) => ({ value: c, label: tt(c) }))}
                onChange={(category) => setD((cur) => ({ ...cur, category }))}
              />
            </div>
          </TwoColumns>
          <p className={styles.strong}>{tt('Mavzular')}</p>
          <div className={styles.topics}>
            {INTERESTS.map((t) => (
              <Checkbox key={t} label={t} checked={d.topics.includes(t)} onChange={() => toggleTopic(t)} />
            ))}
          </div>
          <Translations title={tt('Nomning tarjimalari')} hint={tt('Bo‘sh qoldirilgan tarjimalarda asosiy nom ko‘rsatiladi.')}>
            <Input label={tt('O‘zbekcha')} />
            <Input label="Русский" />
          </Translations>
          {error && <p className={styles.errorText}>{error}</p>}
          <EditorActions onCancel={cancel} primary={{ label: tt('Davom etish →'), width: 147 }} />
        </EditorCard>
      )}

      {step === 2 && (
        <EditorCard onSubmit={next}>
          <TwoColumns>
            <Input label={tt('Ariza muddati *')} value={d.deadline} onChange={set('deadline')} placeholder="2026-11-12" />
            <Input label={tt('Sinf / yosh talabi *')} value={d.grades} onChange={set('grades')} />
            <Input label={tt('Hudud')} value={d.region} onChange={set('region')} />
            <Input label={tt('Format')} value={d.format} onChange={set('format')} />
            <Input label={tt('Boshlanish sanasi')} value={d.start} onChange={set('start')} />
            <Input label={tt('Tugash sanasi')} value={d.end} onChange={set('end')} />
            <Input label={tt('Narxi *')} value={d.price} onChange={set('price')} />
            <Input label={tt('Davomiyligi')} value={d.duration} onChange={set('duration')} />
          </TwoColumns>
          <TextareaField label={tt('Tavsif (inglizcha) *')} value={d.description} onChange={set('description')} />
          <Input
            label={tt('Tashqi ariza havolasi *')}
            value={d.link}
            onChange={set('link')}
            helperText={tt('O‘quvchi arizani tashkilotchining saytida to‘ldiradi.')}
          />
          <Translations title={tt('Tavsifning tarjimalari')} hint={tt('Bo‘sh qoldirilgan tarjimalarda asosiy tavsif ko‘rsatiladi.')}>
            <TextareaField label={tt('O‘zbekcha')} minHeight={90} />
            <TextareaField label="Русский" minHeight={90} />
          </Translations>
          {error && <p className={styles.errorText}>{error}</p>}
          <EditorActions onCancel={cancel} onBack={() => setStep(1)} primary={{ label: tt('Davom etish →'), width: 147 }} />
        </EditorCard>
      )}

      {step === 3 && (
        <EditorCard onSubmit={publish}>
          <article className={styles.preview}>
            <Chip label={d.category} asStatic />
            <h2 className={styles.previewTitle}>{d.name}</h2>
            <p className={styles.muted}>
              {d.organizer} · {d.region} · {d.price}
            </p>
            <p className={styles.bodyLarge}>{d.description}</p>
            <div className={styles.chips}>
              <Chip label={`Muddat: ${d.deadline}`} asStatic />
              <Chip label={`Sinf: ${d.grades}`} asStatic />
            </div>
            <div className={styles.detail}>
              <p className={styles.caption}>{tt('Ariza havolasi')}</p>
              <p className={styles.bodyLarge}>{d.link}</p>
            </div>
          </article>
          <ContextNote>{tt('E’lon qilingach, kontent katalogda ko‘rinadi. Ma’lumotlarni bir bor tekshiring.')}</ContextNote>
          <EditorActions onCancel={cancel} onBack={() => setStep(2)} primary={{ label: tt('E’lon qilish'), width: 140 }} />
        </EditorCard>
      )}
    </AdminShell>
  );
}

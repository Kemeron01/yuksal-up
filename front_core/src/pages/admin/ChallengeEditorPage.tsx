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
import { Input } from '@/components/ui/Input';
import { findChallenge } from '@/data/challenges';
import { useAdmin } from '@/data/admin';
import styles from './AdminPages.module.css';
import { useI18n } from '@/i18n';

const STEPS = ['Asosiy ma’lumotlar', 'Tafsilotlar', 'Tekshirish va e’lon qilish'];

/** 09 · Challenge editor (new / edit). */
export function ChallengeEditorPage() {
  const { tt } = useI18n();
  const { id } = useParams();
  const challenge = findChallenge(id);
  const navigate = useNavigate();
  const { saveContent } = useAdmin();
  const [form, setForm] = useState({
    deadline: '2026-11-15',
    grades: '7–11',
    region: 'Onlayn',
    format: 'Onlayn',
    brief: challenge?.situation ?? '',
    expected: 'Muammoni qisqacha izohlang. Uchta amaliy taklif va bir haftalik sinov rejasini yuboring. Natijani qanday o‘lchashingizni yozing.',
    criteria: 'Muammoni tushunish; yechimning amaliyligi; resurslardan oqilona foydalanish; o‘lchanadigan natija.',
  });
  const [error, setError] = useState<string | null>(null);
  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.deadline.trim() || !form.grades.trim() || !form.brief.trim() || !form.expected.trim())
      return setError(tt('Majburiy maydonlarni to‘ldiring.'));
    saveContent({
      id: id ?? `challenge-${Date.now()}`,
      kind: 'challenge',
      title: challenge?.title ?? tt('Yangi topshiriq'),
      organizer: 'YuksalUp',
      category: 'Amaliy topshiriq',
      deadline: form.deadline,
      published: true,
    });
    navigate('/admin/challenges');
  };

  return (
    <AdminShell active="challenges">
      <AdminHeading
        eyebrow={tt('KONTENT MUHARRIRI')}
        title={challenge ? tt('Topshiriqni tahrirlash') : tt('Yangi topshiriq')}
        text={tt('Aniq ma’lumotlar o‘quvchilarga to‘g‘ri tanlov qilishga yordam beradi.')}
      />
      <EditorSteps current={2} steps={STEPS} />
      <EditorCard onSubmit={submit}>
        <TwoColumns>
          <Input label={tt('Topshirish muddati *')} value={form.deadline} onChange={set('deadline')} />
          <Input label={tt('Sinf / yosh talabi *')} value={form.grades} onChange={set('grades')} />
          <Input label={tt('Hudud')} value={form.region} onChange={set('region')} />
          <Input label={tt('Format')} value={form.format} onChange={set('format')} />
        </TwoColumns>
        <TextareaField label={tt('Topshiriq bayoni *')} value={form.brief} onChange={set('brief')} />
        <TextareaField label={tt('Kutiladigan natija *')} minHeight={132} value={form.expected} onChange={set('expected')} />
        <TextareaField label={tt('Baholash mezonlari')} minHeight={132} value={form.criteria} onChange={set('criteria')} />
        <ContextNote>{tt('Yechimlar YuksalUp ichida yuboriladi va administrator tomonidan ko‘rib chiqiladi.')}</ContextNote>
        <Translations title={tt('Tavsifning tarjimalari')} hint={tt('Bo‘sh qoldirilgan tarjimalarda asosiy tavsif ko‘rsatiladi.')}>
          <TextareaField label={tt('O‘zbekcha')} minHeight={90} />
          <TextareaField label="Русский" minHeight={90} />
        </Translations>
        {error && <p className={styles.errorText}>{error}</p>}
        <EditorActions
          onCancel={() => navigate('/admin/challenges')}
          onBack={() => navigate('/admin/challenges')}
          primary={{ label: tt('Davom etish →'), width: 147 }}
        />
      </EditorCard>
    </AdminShell>
  );
}

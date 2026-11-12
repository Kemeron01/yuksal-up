import { useState, type FormEvent } from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthLink, FormStack, Hint, PageIntro, StateSymbol } from '@/components/auth/AuthParts';
import { Button } from '@/components/ui/Button';
import { CheckSquareIcon } from '@/components/ui/Icons';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/data/auth';
import { useI18n } from '@/i18n';

/** Profile → "Parolni yangilash": 1 current password, 2 new password (+ mismatch error), 3 done. */
export function PasswordChangePage() {
  const { tt } = useI18n();
  const { checkPassword, changePassword } = useAuth();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [repeat, setRepeat] = useState('');
  const [errors, setErrors] = useState<{ current?: string; next?: string; repeat?: string }>({});

  const checkCurrent = (e: FormEvent) => {
    e.preventDefault();
    if (!current) return setErrors({ current: tt('Parolingizni kiriting.') });
    if (!checkPassword(current)) return setErrors({ current: tt('Joriy parol noto‘g‘ri.') });
    setErrors({});
    setStep(2);
  };

  const save = (e: FormEvent) => {
    e.preventDefault();
    const found: typeof errors = {};
    if (next.length < 8) found.next = tt('Parol kamida 8 ta belgidan iborat bo‘lsin.');
    else if (repeat !== next) found.repeat = tt('Parollar mos kelmadi.');
    if (found.next || found.repeat) return setErrors(found);
    if (!changePassword(current, next)) {
      setStep(1);
      return setErrors({ current: tt('Joriy parol noto‘g‘ri.') });
    }
    setStep(3);
  };

  if (step === 3) {
    return (
      <AuthLayout>
        <StateSymbol tone="success">
          <CheckSquareIcon />
        </StateSymbol>
        <PageIntro title={tt('Parol yangilandi')} text={tt('Parolni o‘zgartirish jarayoni yakunlandi. Bu maketda parollar saqlanmaydi.')} />
        <AuthLink to="/profile/settings">{tt('Sozlamalarga qaytish')}</AuthLink>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      {step === 1 ? (
        <>
          <PageIntro
            caption={tt('1 / 2 · HISOB XAVFSIZLIGI')}
            title={tt('Joriy parolingizni kiriting')}
            text={tt('Yangi parol yaratishdan oldin joriy parolingizni kiriting.')}
          />
          <FormStack onSubmit={checkCurrent}>
            <Input
              label={tt('Joriy parol')}
              type="password"
              placeholder={tt('Joriy parolni kiriting')}
              value={current}
              error={errors.current}
              onChange={(e) => {
                setCurrent(e.target.value);
                setErrors({});
              }}
              autoComplete="current-password"
            />
            <Button variant="primary" type="submit" block>
              {tt('Davom etish')}
            </Button>
          </FormStack>
        </>
      ) : (
        <>
          <PageIntro
            caption={tt('2 / 2 · YANGI PAROL')}
            title={tt('Yangi parol yarating')}
            text={tt('Kamida 8 ta belgidan iborat yangi parol kiriting.')}
          />
          <FormStack onSubmit={save}>
            <Input
              label={tt('Yangi parol')}
              type="password"
              value={next}
              error={errors.next}
              onChange={(e) => {
                setNext(e.target.value);
                setErrors({});
              }}
              autoComplete="new-password"
            />
            <Input
              label={tt('Parolni takrorlang')}
              type="password"
              value={repeat}
              error={errors.repeat}
              onChange={(e) => {
                setRepeat(e.target.value);
                setErrors({});
              }}
              autoComplete="new-password"
            />
            <Button variant="primary" type="submit" block>
              {tt('Parolni yangilash')}
            </Button>
          </FormStack>
        </>
      )}
      <AuthLink to="/profile/settings">{tt('Sozlamalarga qaytish')}</AuthLink>
      <Hint>{tt('Interaktiv maket · Xatlar yuborilmaydi, parollar saqlanmaydi.')}</Hint>
    </AuthLayout>
  );
}

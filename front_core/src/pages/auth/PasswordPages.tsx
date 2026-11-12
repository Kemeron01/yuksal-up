import { useState, type FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthLink, FormStack, Hint, PageIntro, StateSymbol } from '@/components/auth/AuthParts';
import { Button } from '@/components/ui/Button';
import { CheckSquareIcon } from '@/components/ui/Icons';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/data/auth';
import { useI18n } from '@/i18n';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** 04 · Forgot password. */
export function ForgotPasswordPage() {
  const { tt } = useI18n();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) return setError(tt('To‘g‘ri email manzilini kiriting.'));
    navigate('/reset-link-sent', { state: { email: email.trim().toLowerCase() } });
  };

  return (
    <AuthLayout>
      <AuthLink to="/login" center={false}>
        {tt('Kirishga qaytish')}
      </AuthLink>
      <PageIntro title={tt('Parolni tiklash')} text={tt('Hisobingiz uchun ishlatgan elektron pochta manzilini kiriting.')} />
      <FormStack onSubmit={onSubmit}>
        <Input
          label={tt('Elektron pochta')}
          type="email"
          placeholder={tt('you@example.com')}
          value={email}
          error={error}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(undefined);
          }}
          autoComplete="email"
        />
        <Button variant="primary" type="submit" block>
          {tt('Tiklash havolasini yuborish')}
        </Button>
      </FormStack>
      <Hint>{tt('Parolni yangilash uchun email orqali havola olasiz.')}</Hint>
    </AuthLayout>
  );
}

/** 06 · New password (opened from the reset e-mail). */
export function NewPasswordPage() {
  const { tt } = useI18n();
  const navigate = useNavigate();
  const { state } = useLocation() as { state: { email?: string } | null };
  const { resetPassword } = useAuth();
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [errors, setErrors] = useState<{ password?: string; repeat?: string }>({});

  if (!state?.email) return <Navigate to="/forgot-password" replace />;
  const email = state.email;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (password.length < 8) next.password = tt('Parol kamida 8 ta belgidan iborat bo‘lsin.');
    if (repeat !== password) next.repeat = tt('Parollar mos kelmadi.');
    if (next.password || next.repeat) return setErrors(next);
    resetPassword(email, password);
    navigate('/password-reset', { replace: true });
  };

  return (
    <AuthLayout>
      <PageIntro title={tt('Yangi parol yarating')} text={tt('Yangi parolni ikki marta kiriting.')} />
      <FormStack onSubmit={onSubmit}>
        <Input
          label={tt('Yangi parol')}
          type="password"
          placeholder={tt('Kamida 8 ta belgi')}
          value={password}
          error={errors.password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors({});
          }}
          autoComplete="new-password"
        />
        <Input
          label={tt('Parolni takrorlang')}
          type="password"
          placeholder={tt('Parolni qayta kiriting')}
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
      <Hint>{tt('Interaktiv maket · Xatlar yuborilmaydi, parollar saqlanmaydi.')}</Hint>
    </AuthLayout>
  );
}

/** 07 · Password reset success. */
export function PasswordResetSuccessPage() {
  const { tt } = useI18n();
  return (
    <AuthLayout>
      <StateSymbol tone="success">
        <CheckSquareIcon />
      </StateSymbol>
      <PageIntro
        title={tt('Yangi boshlanishga tayyor')}
        text={tt('Parolni yangilashning muvaffaqiyatli holati ko‘rsatildi.')}
      />
      <Button variant="primary" to="/login" block>
        {tt('Kirishga o‘tish')}
      </Button>
      <Hint>{tt('Interaktiv maket · Xatlar yuborilmaydi, parollar saqlanmaydi.')}</Hint>
    </AuthLayout>
  );
}

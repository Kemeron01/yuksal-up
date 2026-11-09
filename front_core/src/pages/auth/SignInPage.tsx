import { useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AccountLink, AuthLink, FormStack, PageIntro } from '@/components/auth/AuthParts';
import { homeFor } from '@/components/RouteGuards';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/data/auth';
import { useI18n } from '@/i18n';

/** 02 · Sign in. */
export function SignInPage() {
  const { tt } = useI18n();
  const navigate = useNavigate();
  const location = useLocation() as { state: { from?: string } | null };
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!email.trim()) next.email = tt('Emailingizni kiriting.');
    if (!password) next.password = tt('Parolingizni kiriting.');
    if (next.email || next.password) return setErrors(next);

    const result = login(email, password);
    if (result.ok) {
      const { account } = result;
      const from = location.state?.from;
      const allowed = from && (account.role === 'admin' ? from.startsWith('/admin') : !from.startsWith('/admin'));
      navigate(allowed ? from : homeFor(account.role, account.interests.length > 0), { replace: true });
      return;
    }
    if (result.reason === 'unverified') return navigate('/verify-email', { state: { email: email.trim().toLowerCase() } });
    if (result.reason === 'suspended') return setErrors({ email: tt('Bu akkaunt to‘xtatilgan. Administrator bilan bog‘laning.') });
    setErrors({ password: tt('Email yoki parol noto‘g‘ri.') });
  };

  return (
    <AuthLayout>
      <PageIntro title={tt('Yana xush kelibsiz')} text={tt('YuksalUp hisobingizga kiring va davom eting.')} />
      <FormStack onSubmit={onSubmit}>
        <Input
          label={tt('Elektron pochta')}
          type="email"
          placeholder={tt('you@example.com')}
          value={email}
          error={errors.email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors({});
          }}
          autoComplete="email"
        />
        <Input
          label={tt('Parol')}
          type="password"
          placeholder="••••••••"
          value={password}
          error={errors.password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors({});
          }}
          autoComplete="current-password"
        />
        <AuthLink to="/forgot-password" center={false}>
          {tt('Parolni unutdingizmi?')}
        </AuthLink>
        <Button variant="primary" type="submit" block>
          {tt('Kirish')}
        </Button>
      </FormStack>
      <AccountLink question={tt('Akkauntingiz yo‘qmi?')} to="/register" label={tt('Ro‘yxatdan o‘tish')} />
    </AuthLayout>
  );
}

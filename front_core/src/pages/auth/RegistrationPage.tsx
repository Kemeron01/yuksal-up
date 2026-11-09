import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AccountLink, AuthLink, FieldRow, FormStack, Notice, PageIntro } from '@/components/auth/AuthParts';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/data/auth';
import styles from './AuthForms.module.css';
import { useI18n } from '@/i18n';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Errors {
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  consent?: string;
  exists?: boolean;
}

/** 01 · Registration (validation errors are the "09 · Registration error" state). */
export function RegistrationPage() {
  const { tt } = useI18n();
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', surname: '', email: '', password: '' });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((cur) => ({ ...cur, [key]: undefined, ...(key === 'email' ? { exists: false } : {}) }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!form.name.trim()) next.name = tt('Ismingizni kiriting.');
    if (!form.surname.trim()) next.surname = tt('Familiyangizni kiriting.');
    if (!EMAIL_RE.test(form.email.trim())) next.email = tt('To‘g‘ri email manzilini kiriting.');
    if (form.password.length < 8) next.password = tt('Parol kamida 8 ta belgidan iborat bo‘lsin.');
    if (!consent) next.consent = tt('Davom etish uchun rozilik bering.');
    if (Object.keys(next).length) return setErrors(next);

    const result = register({ ...form, email: form.email.trim() });
    if (!result.ok) return setErrors({ email: tt('Bu email bilan akkaunt allaqachon mavjud.'), exists: true });
    navigate('/verify-email', { state: { email: form.email.trim().toLowerCase() } });
  };

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <AuthLayout>
      <PageIntro title={tt('Ro‘yxatdan o‘tish')} text={tt('Yangi imkoniyatlar va amaliy keyslar — bir joyda.')} />
      <FormStack onSubmit={onSubmit}>
        {hasErrors && (
          <Notice title={tt('Ma’lumotlarni tekshiring')} text={tt('Belgilangan maydonni tuzating va qayta urinib ko‘ring.')} />
        )}
        <FieldRow>
          <Input label={tt('Ism')} placeholder={tt('Ismingiz')} value={form.name} error={errors.name} onChange={set('name')} autoComplete="given-name" />
          <Input
            label={tt('Familiya')}
            placeholder={tt('Familiyangiz')}
            value={form.surname}
            error={errors.surname}
            onChange={set('surname')}
            autoComplete="family-name"
          />
        </FieldRow>
        <div>
          <Input
            label={tt('Elektron pochta')}
            type="email"
            placeholder={tt('you@example.com')}
            value={form.email}
            error={errors.email}
            onChange={set('email')}
            autoComplete="email"
          />
          {errors.exists && (
            <p className={styles.inline}>
              <Link to="/login">{tt('Kirish')}</Link>
            </p>
          )}
        </div>
        <Input
          label={tt('Parol')}
          type="password"
          placeholder={tt('Kamida 8 ta belgi')}
          value={form.password}
          error={errors.password}
          onChange={set('password')}
          autoComplete="new-password"
        />
        <div>
          <Checkbox
            label={tt('Shaxsiy ma’lumotlarimga ishlov berilishiga roziman.')}
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              setErrors((cur) => ({ ...cur, consent: undefined }));
            }}
          />
          {errors.consent && <p className={styles.error}>{errors.consent}</p>}
        </div>
        <AuthLink to="/privacy" center={false}>
          {tt('Maxfiylik haqida')}
        </AuthLink>
        <Button variant="primary" type="submit" block>
          {tt('Ro‘yxatdan o‘tish')}
        </Button>
      </FormStack>
      <AccountLink question={tt('Akkauntingiz bormi?')} to="/login" label={tt('Kirish')} />
    </AuthLayout>
  );
}

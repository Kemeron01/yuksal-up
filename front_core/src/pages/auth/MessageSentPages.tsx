import { useState } from 'react';
import { Button as UiButton } from '@/components/shadcn/button';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthLink, EmailAddress, Hint, PageIntro, StateSymbol } from '@/components/auth/AuthParts';
import { Button } from '@/components/ui/Button';
import { CalendarSmallIcon, SendIcon } from '@/components/ui/Icons';
import { useAuth } from '@/data/auth';
import styles from './AuthForms.module.css';
import { useI18n } from '@/i18n';

interface MailState {
  email?: string;
}

function useMailState(): MailState {
  const { state } = useLocation() as { state: MailState | null };
  return state ?? {};
}

/** 03 · Email verification. The "Pochtani ochish" button stands in for clicking the link in the e-mail. */
export function VerifyEmailPage() {
  const { tt } = useI18n();
  const { email } = useMailState();
  const { verifyEmail, accountExists } = useAuth();
  const navigate = useNavigate();
  const [resent, setResent] = useState(false);

  if (!email || !accountExists(email)) return <Navigate to="/register" replace />;

  const openLink = () => {
    verifyEmail(email);
    navigate('/onboarding/interests', { replace: true });
  };

  return (
    <AuthLayout>
      <StateSymbol>
        <SendIcon />
      </StateSymbol>
      <PageIntro
        caption={tt('01 / 02 · Hisobni tasdiqlash')}
        title={tt('Pochtangizni tekshiring')}
        text={tt('Tasdiqlash havolasi quyidagi manzilga yuborilishi kerak:')}
      />
      <EmailAddress icon={<SendIcon />} email={email} />
      <p className={styles.demo}>{tt('Haqiqiy ilovada xatdagi havola orqali hisobingizni tasdiqlaysiz. Maketda quyidagi tugma orqali keyingi qadamni ko‘rishingiz mumkin.')}</p>
      <Button variant="primary" onClick={openLink} block>
        {tt('Tasdiqlangan holatni ko‘rish')}
      </Button>
      <div className={styles.linkRow}>
        <UiButton variant="unstyled" className={styles.linkButton} onClick={() => setResent(true)}>
          {tt('Xatni qayta yuborish')}
        </UiButton>
        <span aria-hidden>·</span>
        <AuthLink to="/register">{tt('Emailni o‘zgartirish')}</AuthLink>
      </div>
      {resent && (
        <p className={styles.status} role="status">
          {tt('Xat qayta yuborildi.')}
        </p>
      )}
    </AuthLayout>
  );
}

/** 05 · Reset link sent. */
export function ResetLinkSentPage() {
  const { tt } = useI18n();
  const { email } = useMailState();
  const { accountExists } = useAuth();
  const navigate = useNavigate();
  const [missing, setMissing] = useState(false);
  const [resent, setResent] = useState(false);

  if (!email) return <Navigate to="/forgot-password" replace />;

  const openLink = () => {
    if (accountExists(email)) navigate('/new-password', { state: { email } });
    else setMissing(true);
  };

  return (
    <AuthLayout>
      <StateSymbol>
        <SendIcon />
      </StateSymbol>
      <PageIntro
        title={tt('Pochtangizni tekshiring')}
        text={tt('Parolni tiklash havolasi quyidagi manzilga yuborilishi kerak:')}
      />
      <EmailAddress icon={<SendIcon />} email={email} />
      <Button variant="primary" onClick={openLink} block>
        {tt('Tiklash ekranini ko‘rish')}
      </Button>
      {missing && (
        <p className={styles.status} role="status">
          {tt('Bu email bilan akkaunt topilmadi, xat yuborilmagan.')}
        </p>
      )}
      <div className={styles.linkRow}>
        <UiButton variant="unstyled" className={styles.linkButton} onClick={() => setResent(true)}>
          {tt('Xatni qayta yuborish')}
        </UiButton>
        <span aria-hidden>·</span>
        <AuthLink to="/login">{tt('Kirishga qaytish')}</AuthLink>
      </div>
      {resent && (
        <p className={styles.status} role="status">
          {tt('Xat qayta yuborildi.')}
        </p>
      )}
      <Hint>{tt('Interaktiv maket · Xatlar yuborilmaydi, parollar saqlanmaydi.')}</Hint>
    </AuthLayout>
  );
}

/** 10 · Verification link expired. */
export function LinkExpiredPage() {
  const { tt } = useI18n();
  const { email } = useMailState();
  const navigate = useNavigate();
  if (!email) return <Navigate to="/register" replace />;

  return (
    <AuthLayout>
      <StateSymbol tone="error">
        <CalendarSmallIcon />
      </StateSymbol>
      <PageIntro
        caption={tt('01 / 02 · Hisobni tasdiqlash')}
        title={tt('Havola eskirgan')}
        text={tt('Hisobni tasdiqlash uchun yangi havola so‘rang.')}
      />
      <EmailAddress icon={<SendIcon />} email={email} />
      <Button variant="primary" onClick={() => navigate('/verify-email', { state: { email } })} block>
        {tt('Xatni qayta yuborish')}
      </Button>
      <AuthLink to="/register">{tt('Emailni o‘zgartirish')}</AuthLink>
    </AuthLayout>
  );
}

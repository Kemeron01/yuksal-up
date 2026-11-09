import { useState } from 'react';
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
        text={tt('Hisobingizni tasdiqlash uchun emailingizdagi havolani bosing.')}
      />
      <EmailAddress icon={<SendIcon />} email={email} />
      <Hint>{tt('Tasdiqlash havolasini shu manzilga yubordik. Xat topilmasa, spam jildini ham tekshiring.')}</Hint>
      <Button variant="primary" onClick={openLink} block>
        {tt('Pochtani ochish')}
      </Button>
      <p className={styles.demo}>{tt('Demo rejim: haqiqiy xat yuborilmaydi. Tugma xatdagi tasdiqlash havolasini ochishni imitatsiya qiladi.')}</p>
      <button type="button" className={styles.linkButton} onClick={() => setResent(true)}>
        {tt('Xatni qayta yuborish')}
      </button>
      {resent && (
        <p className={styles.status} role="status">
          {tt('Xat qayta yuborildi.')}
        </p>
      )}
      <AuthLink to="/register">{tt('Emailni o‘zgartirish')}</AuthLink>
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
        title={tt('Keyingi qadam — pochtangizda')}
        text={tt('Agar bu email manziliga bog‘langan hisob bo‘lsa, parolni tiklash havolasi yuboriladi.')}
      />
      <EmailAddress icon={<SendIcon />} email={email} />
      <Button variant="primary" onClick={openLink} block>
        {tt('Pochtani ochish')}
      </Button>
      <p className={styles.demo}>{tt('Demo rejim: tugma xatdagi parolni tiklash havolasini ochishni imitatsiya qiladi.')}</p>
      {missing && (
        <p className={styles.status} role="status">
          {tt('Bu email bilan akkaunt topilmadi, xat yuborilmagan.')}
        </p>
      )}
      <AuthLink to="/login">{tt('Kirishga qaytish')}</AuthLink>
      <Hint>{tt('Xat kelmadimi? Email manzilini tekshiring yoki spam jildiga qarang.')}</Hint>
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
      <StateSymbol>
        <CalendarSmallIcon />
      </StateSymbol>
      <PageIntro
        title={tt('Havola muddati tugagan')}
        text={tt('Tasdiqlash havolasi endi ishlamaydi. Davom etish uchun yangi havola oling.')}
      />
      <EmailAddress icon={<SendIcon />} email={email} />
      <Button variant="primary" onClick={() => navigate('/verify-email', { state: { email } })} block>
        {tt('Yangi havola yuborish')}
      </Button>
      <AuthLink to="/register">{tt('Emailni o‘zgartirish')}</AuthLink>
      <Hint>{tt('Eng so‘nggi yuborilgan xatdagi havoladan foydalaning.')}</Hint>
    </AuthLayout>
  );
}

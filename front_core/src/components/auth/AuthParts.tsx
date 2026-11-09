import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './AuthParts.module.css';

/** Heading block: optional step caption, H2 title and supporting text. */
export function PageIntro({ caption, title, text }: { caption?: string; title: string; text: string }) {
  return (
    <div className={styles.intro}>
      {caption && <p className={styles.caption}>{caption}</p>}
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.text}>{text}</p>
    </div>
  );
}

/** 64px yellow tile with a state icon (sent, success, expired …). */
export function StateSymbol({ children }: { children: ReactNode }) {
  return (
    <span className={styles.symbol} aria-hidden>
      <span className={styles.symbolIcon}>{children}</span>
    </span>
  );
}

/** Bordered card showing the e-mail the message was sent to. */
export function EmailAddress({ icon, email }: { icon: ReactNode; email: string }) {
  return (
    <div className={styles.email}>
      <span className={styles.emailIcon} aria-hidden>
        {icon}
      </span>
      <p className={styles.emailText}>{email}</p>
    </div>
  );
}

export function AuthLink({ to, children, center = true }: { to: string; children: ReactNode; center?: boolean }) {
  return (
    <Link to={to} className={`${styles.link} ${center ? styles.center : ''}`}>
      {children}
    </Link>
  );
}

export function Hint({ children }: { children: ReactNode }) {
  return <p className={styles.hint}>{children}</p>;
}

export function Notice({ title, text }: { title: string; text: string }) {
  return (
    <div className={styles.notice} role="alert">
      <p className={styles.noticeTitle}>{title}</p>
      <p className={styles.text}>{text}</p>
    </div>
  );
}

/** "Akkauntingiz bormi? Kirish" style footer link. */
export function AccountLink({ question, to, label }: { question: string; to: string; label: string }) {
  return (
    <div className={styles.account}>
      <p className={styles.accountQuestion}>{question}</p>
      <Link to={to} className={styles.accountLink}>
        {label}
      </Link>
    </div>
  );
}

export function FormStack({ children, onSubmit }: { children: ReactNode; onSubmit?: (e: React.FormEvent) => void }) {
  return (
    <form className={styles.stack} onSubmit={onSubmit} noValidate>
      {children}
    </form>
  );
}

export function FieldRow({ children }: { children: ReactNode }) {
  return <div className={styles.row}>{children}</div>;
}

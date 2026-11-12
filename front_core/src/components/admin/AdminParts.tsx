import { useState, type FormEvent, type ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import styles from './AdminParts.module.css';
import { useI18n } from '@/i18n';

/** Eyebrow + H1 + text, optional primary action on the right. */
export function AdminHeading({ eyebrow, title, text, action }: { eyebrow: string; title: string; text: string; action?: ReactNode }) {
  return (
    <div className={styles.heading}>
      <div className={styles.headingCopy}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.text}>{text}</p>
      </div>
      {action}
    </div>
  );
}

export function AdminSearch({ placeholder, onSearch }: { placeholder: string; onSearch: (q: string) => void }) {
  const { tt } = useI18n();
  const [draft, setDraft] = useState('');
  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(draft.trim());
  };
  return (
    <form className={styles.search} onSubmit={submit} role="search">
      <div className={styles.searchField}>
        <label className={styles.searchLabel} htmlFor="admin-search">
          {tt('Qidirish')}
        </label>
        <input
          id="admin-search"
          className={styles.searchInput}
          placeholder={placeholder}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
      </div>
      <Button variant="secondary" type="submit" className={styles.searchButton}>
        {tt('Qidirish')}
      </Button>
    </form>
  );
}

/** Wash card holding a table: header row, dividers, rows. `columns` is a CSS grid template. */
export function AdminTable({ columns, headers, children }: { columns: string; headers: string[]; children: ReactNode }) {
  return (
    <div className={styles.table} style={{ '--cols': columns } as React.CSSProperties} role="table">
      <div className={styles.tableHead} role="row">
        {headers.map((h) => (
          <span key={h} role="columnheader">
            {h}
          </span>
        ))}
      </div>
      {children}
    </div>
  );
}

export function AdminRow({ children }: { children: ReactNode }) {
  return (
    <div className={styles.row} role="row">
      {children}
    </div>
  );
}

/** Generic wash/yellow panel with H3 title. */
export function AdminPanel({
  title,
  text,
  tone = 'wash',
  children,
  large = true,
}: {
  title: string;
  text?: string;
  tone?: 'wash' | 'yellow' | 'paper';
  children?: ReactNode;
  large?: boolean;
}) {
  return (
    <section className={`${styles.panel} ${styles[tone]}`}>
      <h2 className={large ? styles.panelTitleLarge : styles.panelTitle}>{title}</h2>
      {text && <p className={styles.panelText}>{text}</p>}
      {children}
    </section>
  );
}

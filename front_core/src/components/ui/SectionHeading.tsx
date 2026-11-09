import type { ReactNode } from 'react';
import { Eyebrow } from './Eyebrow';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  eyebrow?: string;
  /** One string, or two strings rendered as two lines on desktop. */
  title: string | [string, string];
  children?: ReactNode;
}

export function SectionHeading({ eyebrow, title, children }: SectionHeadingProps) {
  return (
    <div className={styles.heading}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className={styles.title}>
        {Array.isArray(title) ? (
          <>
            {title[0]} <br className={styles.br} />
            {title[1]}
          </>
        ) : (
          title
        )}
      </h2>
      {children}
    </div>
  );
}

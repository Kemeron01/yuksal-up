import type { ReactNode } from 'react';
import { Wordmark } from '@/components/brand/Wordmark';
import { Header } from '@/components/layout/Header';
import { SlimFooter } from '@/components/layout/SlimFooter';
import illustration from '@/assets/student-illustration.png';
import styles from './AuthLayout.module.css';
import { useI18n } from '@/i18n';

/**
 * Shared shell of every authentication screen:
 * desktop – guest header, 34/66 navy split card (illustration + white form), slim footer;
 * mobile – header, plain form column, footer.
 */
export function AuthLayout({ children }: { children: ReactNode }) {
  const { tt } = useI18n();
  return (
    <div className={styles.page}>
      <Header wide />
      <main className={styles.content}>
        <div className={styles.split}>
          <aside className={styles.illustration}>
            <p className={styles.tagline}>{tt('Har kun — yangi imkoniyat.')}</p>
            <div className={styles.picture}>
              <img src={illustration} alt="" width={288} height={288} className={styles.image} />
            </div>
            <Wordmark tone="inverse" />
          </aside>
          <section className={styles.form}>
            <div className={styles.formContent}>{children}</div>
          </section>
        </div>
      </main>
      <SlimFooter />
    </div>
  );
}

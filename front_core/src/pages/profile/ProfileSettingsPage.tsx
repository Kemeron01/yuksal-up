import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { LOCALES, useI18n } from '@/i18n';
import type { Locale } from '@/i18n/types';
import { ProfileCard } from './ProfileCard';
import { ProfileLayout } from './ProfileLayout';
import styles from './ProfilePages.module.css';

const LANGUAGE_NAMES: Record<Locale, string> = { uz: 'O‘zbekcha', ru: 'Русский', en: 'English' };

/** 17 · Profile settings: interface language and the password-change flow (/profile/password). */
export function ProfileSettingsPage() {
  const { locale, setLocale, tt } = useI18n();
  const navigate = useNavigate();

  return (
    <ProfileLayout>
      <ProfileCard title={tt('Sozlamalar')}>
        <div className={styles.settingRow}>
          <label className={styles.rowLabel} htmlFor="interface-language">
            {tt('Interfeys tili')}
          </label>
          <div className={styles.langSelect}>
            <Select
              id="interface-language"
              value={locale}
              options={LOCALES.map((code) => ({ value: code, label: LANGUAGE_NAMES[code] }))}
              onChange={(code) => setLocale(code as Locale)}
            />
          </div>
        </div>
        <hr className={styles.divider} />
        <div className={styles.settingRow}>
          <p className={styles.rowLabel}>{tt('Hisob xavfsizligi')}</p>
          <Button variant="secondary" onClick={() => navigate('/profile/password')}>
            {tt('Parolni yangilash')}
          </Button>
        </div>
      </ProfileCard>
      <p className={styles.infoBar}>{tt('Profilingiz boshqa o‘quvchilarga ko‘rsatilmaydi.')}</p>
    </ProfileLayout>
  );
}

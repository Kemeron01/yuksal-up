import { useState } from 'react';
import { Button as UiButton } from '@/components/shadcn/button';
import { ChevronDownIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/shadcn/button';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/shadcn/drawer';
import { Checkbox } from '@/components/ui/Checkbox';
import { Radio } from '@/components/ui/Radio';
import { CATEGORIES, FORMATS, INTERESTS, REGIONS } from '@/data/opportunities';
import styles from './FilterDrawer.module.css';
import { useI18n } from '@/i18n';

export interface Filters {
  keyword: string;
  types: string[];
  /** empty string = any region */
  region: string;
  format: (typeof FORMATS)[number];
  interests: string[];
  freeOnly: boolean;
}

export const EMPTY_FILTERS: Filters = { keyword: '', types: [], region: '', format: 'Barchasi', interests: [], freeOnly: false };

const toggle = (list: string[], name: string) => (list.includes(name) ? list.filter((n) => n !== name) : [...list, name]);

interface FilterDrawerProps {
  open: boolean;
  filters: Filters;
  count: number;
  onChange: (next: Filters) => void;
  onClose: () => void;
}

/** Right-hand filter panel (design 02–04): keyword, type, region picker, format, interests and price. */
export function FilterDrawer({ open, filters, count, onChange, onClose }: FilterDrawerProps) {
  const { tt } = useI18n();
  const [regionOpen, setRegionOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={(next) => !next && onClose()} swipeDirection="right">
      <DrawerContent
        aria-label={tt('Filtrlar')}
        className="[--drawer-inset:10px] rounded-[28px] bg-paper data-[swipe-axis=x]:[--drawer-content-width:100%] data-[swipe-axis=x]:sm:[--drawer-content-width:500px] data-[swipe-direction=right]:rounded-[28px] data-[swipe-direction=right]:border-0 max-sm:data-[swipe-direction=right]:rounded-none max-sm:[--drawer-inset:0px]"
      >
        <DrawerHeader className="flex-row items-center justify-between px-6 pt-5 pb-2">
          <DrawerTitle className="font-[family-name:var(--font-display)] text-2xl leading-[30px] font-medium text-navy">{tt('Filtrlar')}</DrawerTitle>
          <DrawerDescription className="sr-only">{tt('Nomi yoki tavsifi')}</DrawerDescription>
          <DrawerClose render={<Button variant="soft" size="icon" className="size-9" aria-label={tt('Yopish')} />}>
            <XIcon size={20} aria-hidden />
          </DrawerClose>
        </DrawerHeader>

        <div className={styles.body}>
          <div className={styles.field}>
            <label className={styles.legend} htmlFor="filter-keyword">
              {tt('Kalit so‘z')}
            </label>
            <input
              id="filter-keyword"
              className={styles.input}
              value={filters.keyword}
              placeholder={tt('Nomi yoki tavsifi')}
              onChange={(e) => onChange({ ...filters, keyword: e.target.value })}
            />
          </div>

          <fieldset className={styles.group}>
            <legend className={styles.legend}>{tt('Imkoniyat turi')}</legend>
            {CATEGORIES.map((c) => (
              <Checkbox key={c} label={tt(c)} checked={filters.types.includes(c)} onChange={() => onChange({ ...filters, types: toggle(filters.types, c) })} />
            ))}
          </fieldset>

          <div className={styles.field}>
            <span className={styles.legend}>{tt('Hudud')}</span>
            <UiButton variant="unstyled"
              className={`${styles.picker} ${regionOpen ? styles.pickerOpen : ''}`}
              aria-expanded={regionOpen}
              onClick={() => setRegionOpen((v) => !v)}
            >
              <span className={filters.region ? '' : styles.placeholder}>{filters.region ? tt(filters.region) : tt('Hududni tanlang')}</span>
              <ChevronDownIcon size={14} aria-hidden />
            </UiButton>
            {regionOpen && (
              <div className={styles.regions} role="radiogroup" aria-label={tt('Hudud')}>
                {REGIONS.map((r) => (
                  <Radio
                    key={r}
                    name="filter-region"
                    label={tt(r)}
                    checked={filters.region === r}
                    onChange={() => onChange({ ...filters, region: r })}
                  />
                ))}
              </div>
            )}
          </div>

          <fieldset className={styles.group}>
            <legend className={styles.legend}>{tt('Ishtirok formati')}</legend>
            {FORMATS.map((f) => (
              <Radio key={f} name="filter-format" label={tt(f)} checked={filters.format === f} onChange={() => onChange({ ...filters, format: f })} />
            ))}
          </fieldset>

          <fieldset className={styles.group}>
            <legend className={styles.legend}>{tt('Qiziqishlar')}</legend>
            {INTERESTS.map((name) => (
              <Checkbox key={name} label={tt(name)} checked={filters.interests.includes(name)} onChange={() => onChange({ ...filters, interests: toggle(filters.interests, name) })} />
            ))}
          </fieldset>

          <fieldset className={styles.group}>
            <legend className={styles.legend}>{tt('Ishtirok narxi')}</legend>
            <Checkbox label={tt('Faqat bepul')} checked={filters.freeOnly} onChange={() => onChange({ ...filters, freeOnly: !filters.freeOnly })} />
          </fieldset>
        </div>

        <DrawerFooter className="flex-row items-center justify-between px-6 pt-3 pb-5">
          <Button variant="ghost" onClick={() => onChange(EMPTY_FILTERS)}>
            {tt('Tozalash')}
          </Button>
          <DrawerClose render={<Button />}>{tt('{count} ta imkoniyatni ko‘rsatish', { count })}</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

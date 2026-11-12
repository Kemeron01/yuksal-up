import { Link } from 'react-router-dom';
import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import { Button as ShadcnButton } from '@/components/shadcn/button';
import { cn } from '@/lib/utils';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'accent' | 'soft' | 'active';

const VARIANT = {
  primary: 'default',
  secondary: 'secondary',
  outline: 'outline',
  accent: 'accent',
  soft: 'soft',
  active: 'active',
} as const;

interface ButtonProps {
  variant?: ButtonVariant;
  href?: string;
  /** Client-side route; renders a router link instead of a plain anchor. */
  to?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  /** Gives the button the 176px minimum width used by action buttons in the design. */
  wide?: boolean;
  /** Fills the available width (the 8px slot stays around it). */
  block?: boolean;
  /** Width of the 8px-inset slot around the button: [desktop, mobile]. The button is centered inside. */
  slot?: [number | string, number | string];
  className?: string;
  'aria-label'?: string;
  'aria-pressed'?: boolean;
  'aria-expanded'?: boolean;
  'aria-selected'?: boolean;
  role?: string;
  /** Removes the 8px focus-inset slot padding (pills that sit flush in the layout). */
  flush?: boolean;
  state?: unknown;
}

/**
 * App button: the shadcn/ui Button (themed to the design) inside the 8px focus-inset slot.
 * Renders a <button>, a router <Link> (`to`) or an <a> (`href`).
 */
export function Button({
  variant = 'primary',
  href,
  to,
  onClick,
  children,
  type = 'button',
  disabled = false,
  wide = false,
  block = false,
  flush = false,
  state,
  slot,
  className,
  ...aria
}: ButtonProps) {
  const inner = cn(wide && 'min-w-44', block && 'min-w-0 flex-1');
  const toPx = (v: number | string) => (typeof v === 'number' ? `${v}px` : v);
  const slotStyle = slot ? ({ '--slot-d': toPx(slot[0]), '--slot-m': toPx(slot[1]) } as CSSProperties) : undefined;
  const slotClass = [styles.slot, slot ? styles.sized : '', slot && slot[1] === '100%' ? styles.fillMobile : '', block ? styles.block : '', flush ? styles.flush : '', className ?? ''].join(' ');
  const shadcnVariant = VARIANT[variant];

  return (
    <span className={slotClass} style={slotStyle}>
      {to && !disabled ? (
        <ShadcnButton variant={shadcnVariant} className={inner} nativeButton={false} render={<Link to={to} state={state} />} onClick={onClick} {...aria}>
          {children}
        </ShadcnButton>
      ) : href && !disabled ? (
        <ShadcnButton variant={shadcnVariant} className={inner} nativeButton={false} render={<a href={href} />} onClick={onClick} {...aria}>
          {children}
        </ShadcnButton>
      ) : (
        <ShadcnButton variant={shadcnVariant} className={inner} type={type} onClick={onClick} disabled={disabled} {...aria}>
          {children}
        </ShadcnButton>
      )}
    </span>
  );
}

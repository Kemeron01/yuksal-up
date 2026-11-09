import { Link } from 'react-router-dom';
import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'accent' | 'soft' | 'active';

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
}

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
  slot,
  className,
  ...aria
}: ButtonProps) {
  const inner = [styles.button, styles[variant], wide ? styles.wide : '', block ? styles.fill : ''].join(' ');
  const toPx = (v: number | string) => (typeof v === 'number' ? `${v}px` : v);
  const slotStyle = slot
    ? ({ '--slot-d': toPx(slot[0]), '--slot-m': toPx(slot[1]) } as CSSProperties)
    : undefined;
  const slotClass = [styles.slot, slot ? styles.sized : '', block ? styles.block : '', className ?? ''].join(' ');

  return (
    <span className={slotClass} style={slotStyle}>
      {to && !disabled ? (
        <Link className={inner} to={to} onClick={onClick} {...aria}>
          {children}
        </Link>
      ) : href && !disabled ? (
        <a className={inner} href={href} onClick={onClick} {...aria}>
          {children}
        </a>
      ) : (
        <button type={type} className={inner} onClick={onClick} disabled={disabled} {...aria}>
          {children}
        </button>
      )}
    </span>
  );
}

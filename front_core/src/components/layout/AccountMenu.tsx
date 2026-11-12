import { useEffect, useRef, useState } from 'react';
import { Button as UiButton } from '@/components/shadcn/button';
import { Link, useNavigate } from 'react-router-dom';
import { initials, useAuth } from '@/data/auth';
import styles from './AccountMenu.module.css';
import { useI18n } from '@/i18n';

/** Avatar button with a dropdown: profile, admin panel (admins only) and sign out. */
export function AccountMenu() {
  const { tt } = useI18n();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!user) return null;
  const fullName = `${user.name} ${user.surname}`;

  return (
    <div className={styles.root} ref={ref}>
      <UiButton variant="unstyled"
        className={styles.avatar}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={fullName}
        onClick={() => setOpen((v) => !v)}
      >
        {initials(user)}
      </UiButton>
      {open && (
        <div className={styles.menu} role="menu">
          <div className={styles.who}>
            <p className={styles.name}>{fullName}</p>
            <p className={styles.email}>{user.email}</p>
          </div>
          {user.role === 'student' && (
            <Link to="/profile" className={styles.item} role="menuitem" onClick={() => setOpen(false)}>
              {tt('Profil')}
            </Link>
          )}
          {user.role === 'admin' && (
            <Link to="/admin" className={styles.item} role="menuitem" onClick={() => setOpen(false)}>
              {tt('Admin panel')}
            </Link>
          )}
          <UiButton variant="unstyled"
            className={styles.item}
            role="menuitem"
            onClick={() => {
              logout();
              setOpen(false);
              navigate('/', { replace: true });
            }}
          >
            {tt('Chiqish')}
          </UiButton>
        </div>
      )}
    </div>
  );
}
